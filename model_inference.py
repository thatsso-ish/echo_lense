import os
import librosa
import numpy as np
import tensorflow as tf
import tensorflow_hub as hub
import pickle
import base64
import matplotlib.pyplot as plt
from io import BytesIO
import librosa.display

# Load pre-trained model and label encoder
model = tf.keras.models.load_model('saved_models/hybrid_yamnet.h5')
with open('saved_encoders/ylabel_e.pkl', 'rb') as le_file:
    label_encoder = pickle.load(le_file)

# Load YAMNet model from TensorFlow Hub
yamnet_model = hub.load('https://tfhub.dev/google/yamnet/1')

def extract_yamnet_features(file_path):
    y, sr = librosa.load(file_path, sr=16000)
    waveform = tf.convert_to_tensor(y, dtype=tf.float32)
    _, embeddings, _ = yamnet_model(waveform)
    embedding = np.mean(embeddings, axis=0)
    return embedding, y, sr

def plot_waveform_and_mel_spectrogram(file_path, predicted_class, y, sr):
    if predicted_class != 10:  # Skip 'neutral class'
        plt.figure(figsize=(14, 6))
        plt.subplot(1, 2, 1)
        librosa.display.waveshow(y, sr=sr, alpha=0.6)
        plt.title(f'Waveform - Class: {predicted_class}')
        plt.xlabel('Time (s)')
        plt.ylabel('Amplitude')

        plt.subplot(1, 2, 2)
        mel_spectrogram = librosa.feature.melspectrogram(y=y, sr=sr, n_mels=128, fmax=8000)
        mel_db = librosa.power_to_db(mel_spectrogram, ref=np.max)
        librosa.display.specshow(mel_db, sr=sr, x_axis='time', y_axis='mel', cmap='magma')
        plt.colorbar(format='%+2.0f dB')
        plt.title(f'Mel-spectrogram - Class: {predicted_class}')
        plt.tight_layout()
        
        # Save plot to buffer
        buffer = BytesIO()
        plt.savefig(buffer, format='png', dpi=300, bbox_inches='tight')
        buffer.seek(0)
        image_base64 = base64.b64encode(buffer.read()).decode('utf-8')
        plt.close()
        return image_base64
    return None

def generate_percentage_distribution(predictions):
    distribution = {}
    for i, prob in enumerate(predictions[0]):
        class_name = label_encoder.inverse_transform([i])[0]
        distribution[class_name] = round(prob * 100, 2)
    return dict(sorted(distribution.items(), key=lambda x: x[1], reverse=True))

def classify_audio(file_path):
    features, y, sr = extract_yamnet_features(file_path)
    features = features.reshape(1, -1)
    predictions = model.predict(features)
    predicted_class = np.argmax(predictions, axis=1)
    confidence = np.max(predictions)

    if confidence < 0.2:  # Adjust threshold as needed
        class_name = "Neutral Class"
        predicted_class = 10
    else:
        class_name = label_encoder.inverse_transform(predicted_class)[0]

    # Plot visuals for dominating class
    image_base64 = plot_waveform_and_mel_spectrogram(file_path, predicted_class, y, sr)

    # Generate percentage distribution
    percentage_distribution = generate_percentage_distribution(predictions)

    dominant_class = max(percentage_distribution, key=percentage_distribution.get)
    dominant_percentage = percentage_distribution[dominant_class]

    return class_name, dominant_class, dominant_percentage, image_base64