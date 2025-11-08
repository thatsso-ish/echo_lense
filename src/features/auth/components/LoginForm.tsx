interface LoginFormProps {
  isSignUp: boolean;
  formData: { email: string; password: string; fullName: string };
  setFormData: React.Dispatch<React.SetStateAction<{ email: string; password: string; fullName: string }>>;
  handleSubmit: (e: React.FormEvent) => void;
  error: string;
  loading: boolean;
}

export function LoginForm({ isSignUp, formData, setFormData, handleSubmit, error, loading }: LoginFormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isSignUp && (
        <div>
          <label className="block text-gray-400 mb-2 text-sm">Full Name</label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-lime-400 transition-colors"
            placeholder="John Doe"
          />
        </div>
      )}

      <div>
        <label className="block text-gray-400 mb-2 text-sm">Email</label>
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
        <label className="block text-gray-400 mb-2 text-sm">Password</label>
        <input
          type="password"
          required
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-lime-400 transition-colors"
          placeholder="••••••••"
          minLength={6}
        />
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-lime-400 text-zinc-900 hover:bg-lime-300 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
      </button>
    </form>
  );
}
