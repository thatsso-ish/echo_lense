import { useState } from 'react';
import { Check, Sparkles, ArrowRight, DollarSign } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface CalculatorPageProps {
  onNavigate: (page: string) => void;
}

const projectTypes = [
  { id: 'web', name: 'Website', basePrice: 5000 },
  { id: 'mobile', name: 'Mobile App', basePrice: 15000 },
  { id: 'branding', name: 'Branding', basePrice: 3000 },
  { id: 'ui-ux', name: 'UI/UX Design', basePrice: 4000 },
  { id: 'other', name: 'Other', basePrice: 2000 },
];

const features = [
  { id: 'custom-design', name: 'Custom Design', price: 2000 },
  { id: 'responsive', name: 'Responsive Design', price: 1000 },
  { id: 'cms', name: 'Content Management System', price: 3000 },
  { id: 'ecommerce', name: 'E-commerce Functionality', price: 5000 },
  { id: 'auth', name: 'User Authentication', price: 2500 },
  { id: 'api', name: 'API Integration', price: 3000 },
  { id: 'analytics', name: 'Analytics & Tracking', price: 1500 },
  { id: 'seo', name: 'SEO Optimization', price: 1500 },
  { id: 'animations', name: 'Advanced Animations', price: 2000 },
  { id: 'multilingual', name: 'Multi-language Support', price: 2500 },
];

const budgetRanges = [
  '< $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000+',
];

const timelines = [
  '1-2 weeks',
  '2-4 weeks',
  '1-2 months',
  '2-3 months',
  '3+ months',
];

export function CalculatorPage({ onNavigate }: CalculatorPageProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budgetRange: '',
    timeline: '',
    description: '',
    selectedFeatures: [] as string[],
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase.from('calculator_requests').insert({
        name: formData.name,
        email: formData.email,
        company: formData.company || null,
        project_type: formData.projectType as any,
        budget_range: formData.budgetRange,
        timeline: formData.timeline,
        description: formData.description,
        features: formData.selectedFeatures,
        estimated_cost: calculateEstimate(),
        status: 'pending',
      });

      if (!error) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Error submitting request:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-zinc-950 pt-24 pb-16 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-lime-400 flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-zinc-900" />
          </div>
          <h2 className="text-4xl font-light text-white mb-4">
            Request <span className="font-semibold text-lime-400">Received!</span>
          </h2>
          <p className="text-gray-400 text-lg mb-4">
            Thank you for your interest! We've received your project request and will get back to you
            within 24 hours with a detailed proposal.
          </p>
          <p className="text-gray-400 mb-8">
            Estimated project cost: <span className="text-lime-400 text-2xl font-semibold">
              ${calculateEstimate().toLocaleString()}
            </span>
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="px-8 py-4 rounded-full bg-lime-400 text-zinc-900 hover:bg-lime-300 transition-colors font-medium"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

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

        <div className="mb-8 flex justify-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${
                s <= step ? 'bg-lime-400 w-12' : 'bg-zinc-800 w-8'
              }`}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-light text-white mb-6">Contact Information</h2>

              <div>
                <label className="block text-gray-400 mb-2">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-lime-400 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-lime-400 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Company (Optional)</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-lime-400 transition-colors"
                  placeholder="Your Company Inc."
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-light text-white mb-6">Project Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projectTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, projectType: type.id })}
                    className={`p-6 rounded-xl border-2 transition-all text-left ${
                      formData.projectType === type.id
                        ? 'border-lime-400 bg-lime-400/10'
                        : 'border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <h3 className="text-white font-semibold mb-2">{type.name}</h3>
                    <p className="text-gray-400 text-sm">
                      Starting from ${type.basePrice.toLocaleString()}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
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
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-light text-white mb-6">Budget & Timeline</h2>

              <div>
                <label className="block text-gray-400 mb-3">Budget Range *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {budgetRanges.map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => setFormData({ ...formData, budgetRange: range })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.budgetRange === range
                          ? 'border-lime-400 bg-lime-400/10 text-white'
                          : 'border-zinc-800 hover:border-zinc-700 text-gray-400'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-3">Expected Timeline *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {timelines.map((timeline) => (
                    <button
                      key={timeline}
                      type="button"
                      onClick={() => setFormData({ ...formData, timeline })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.timeline === timeline
                          ? 'border-lime-400 bg-lime-400/10 text-white'
                          : 'border-zinc-800 hover:border-zinc-700 text-gray-400'
                      }`}
                    >
                      {timeline}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Project Description *</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-lime-400 transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-lime-400/10 to-emerald-400/10 border border-lime-400/20">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="text-lime-400" size={24} />
                  <h3 className="text-white font-semibold">Estimated Cost</h3>
                </div>
                <p className="text-4xl font-bold text-lime-400">
                  ${calculateEstimate().toLocaleString()}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  This is a preliminary estimate. Final pricing will be provided after consultation.
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-4">
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
                type="submit"
                disabled={
                  submitting ||
                  !formData.budgetRange ||
                  !formData.timeline ||
                  !formData.description
                }
                className="flex-1 px-8 py-4 rounded-full bg-lime-400 text-zinc-900 hover:bg-lime-300 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Request'}
                <Check size={20} />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
