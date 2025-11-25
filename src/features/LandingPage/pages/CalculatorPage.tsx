import { Check, ArrowRight } from 'lucide-react';
import { useCalculator } from '../../../shared/hooks/Calculator/useCalculator';
import StepProgress from '../components/calculator/ProjectForm/StepProgress';
import Step1ContactInfo from '../components/calculator/ProjectForm/Step1ContactInfo';
import Step2ProjectType from '../components/calculator/ProjectForm/Step2ProjectType';
import Step3Features from '../components/calculator/ProjectForm/Step3Features';
import Step4BudgetTimeline from '../components/calculator/ProjectForm/Step4BudgetTimeline';
import { CalculatorPageProps } from '../../../shared/types/calculator/CalculatorPageProps';

export default function CalculatorPage({ onNavigate }: CalculatorPageProps) {
  const { step, setStep, formData, setFormData, calculateEstimate, toggleFeature } = useCalculator();

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-light text-white mb-4">
            Project <span className="font-semibold text-lime-400">Calculator</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Get an instant estimate for your project in just a few steps
          </p>
        </div>

        <StepProgress step={step} />

        {step === 1 && <Step1ContactInfo formData={formData} setFormData={setFormData} />}
        {step === 2 && <Step2ProjectType formData={formData} setFormData={setFormData} />}
        {step === 3 && <Step3Features formData={formData} toggleFeature={toggleFeature} />}
        {step === 4 && (
          <Step4BudgetTimeline
            formData={formData}
            setFormData={setFormData}
            calculateEstimate={calculateEstimate}
          />
        )}

        <div className="flex gap-4 mt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-8 py-4 rounded-full border-2 border-zinc-800 text-white hover:border-lime-400 transition-colors font-medium"
            >
              Back
            </button>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              disabled={
                (step === 1 && (!formData.name || !formData.email)) ||
                (step === 2 && !formData.projectType)
              }
              className="flex-1 px-8 py-4 rounded-full bg-lime-400 text-zinc-900 hover:bg-lime-300 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
              <ArrowRight size={20} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="flex-1 px-8 py-4 rounded-full bg-lime-400 text-zinc-900 hover:bg-lime-300 transition-colors font-medium flex items-center justify-center gap-2"
            >
              Finish
              <Check size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
