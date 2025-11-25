import React from 'react';
import { Check } from 'lucide-react';
import { features } from '../../../constants/calculator/CalculatorData';
import { FormData } from '../../../constants/calculator/calculator';

interface FeaturesStepProps {
  formData: FormData;
  toggleFeature: (featureId: string) => void;
}

const FeaturesStep: React.FC<FeaturesStepProps> = ({ formData, toggleFeature }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-light text-white mb-6">Features & Requirements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature) => (
          <button
            key={feature.id}
            type="button"
            onClick={() => toggleFeature(feature.id)}
            className={`p-4 rounded-xl border-2 transition-all text-left flex items-start gap-3 ${
              formData.selectedFeatures.includes(feature.id)
                ? 'border-lime-400 bg-lime-400/10'
                : 'border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                formData.selectedFeatures.includes(feature.id)
                  ? 'bg-lime-400 border-lime-400'
                  : 'border-zinc-700'
              }`}
            >
              {formData.selectedFeatures.includes(feature.id) && (
                <Check size={14} className="text-zinc-900" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-white font-medium">{feature.name}</h3>
              <p className="text-gray-400 text-sm">+${feature.price.toLocaleString()}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeaturesStep;
