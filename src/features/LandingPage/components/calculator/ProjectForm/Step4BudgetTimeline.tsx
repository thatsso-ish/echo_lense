import { budgetRanges, timelines } from '../../../../../shared/constants/calculator/CalculatorData';
import { DollarSign } from 'lucide-react';

export default function Step4BudgetTimeline({ formData, setFormData, calculateEstimate }:any) {
  return (
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
        <p className="text-4xl font-bold text-lime-400">${calculateEstimate().toLocaleString()}</p>
        <p className="text-gray-400 text-sm mt-2">
          This is a preliminary estimate. Final pricing will be provided after consultation.
        </p>
      </div>
    </div>
  );
}
