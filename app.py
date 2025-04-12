from flask import Flask, render_template, request, redirect, url_for
import os
from model_inference import classify_audio  # Import the classify_audio function

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/classify', methods=['POST'])
def classify():
    if 'audio_file' not in request.files:
        return redirect(url_for('home'))
    
    audio_file = request.files['audio_file']
    if audio_file.filename == '':
        return redirect(url_for('home'))

    file_path = os.path.join('static/recordings', audio_file.filename)
    audio_file.save(file_path)

    # Use the classify_audio function from model_inference.py
    class_name, dominant_class, dominant_percentage, image_base64 = classify_audio(file_path)

    return render_template(
        'results.html',
        class_name=class_name,
        dominant_class=dominant_class,
        dominant_percentage=dominant_percentage,
        image=image_base64
    )

if __name__ == '__main__':
    os.makedirs('static/recordings', exist_ok=True)  # Create directory for recordings if not exist
    app.run(debug=True)