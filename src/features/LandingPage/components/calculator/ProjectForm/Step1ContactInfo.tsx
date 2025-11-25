interface Step1Props {
  formData: any;
  setFormData: (data: any) => void;
}

export default function Step1ContactInfo({ formData, setFormData }: Step1Props) {
  return (
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
  );
}
