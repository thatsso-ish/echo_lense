import { useState } from 'react';
import { projectTypes, features } from '../../constants/calculator/CalculatorData';
import { FormData } from '../../types/calculator/calculator';

export function useCalculator() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budgetRange: '',
    timeline: '',
    description: '',
    selectedFeatures: [],
  });

  const calculateEstimate = () => {
    const projectType = projectTypes.find((pt) => pt.id === formData.projectType);
    if (!projectType) return 0;

    let total = projectType.basePrice;
    formData.selectedFeatures.forEach((featureId) => {
      const feature = features.find((f) => f.id === featureId);
      if (feature) total += feature.price;
    });

    return total;
  };

  const toggleFeature = (featureId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedFeatures: prev.selectedFeatures.includes(featureId)
        ? prev.selectedFeatures.filter((id) => id !== featureId)
        : [...prev.selectedFeatures, featureId],
    }));
  };

  return {
    step,
    setStep,
    formData,
    setFormData,
    calculateEstimate,
    toggleFeature,
  };
}
