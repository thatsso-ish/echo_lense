import { Sparkles } from 'lucide-react';

export function AuthHeader({ isSignUp }: { isSignUp: boolean }) {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lime-400/10 mb-4">
        <Sparkles className="text-lime-400" size={32} />
      </div>
      <h1 className="text-3xl font-light text-white mb-2">
        {isSignUp ? 'Create Account' : 'Welcome Back'}
      </h1>
      <p className="text-gray-400">
        {isSignUp ? 'Join our creative platform' : 'Sign in to your account'}
      </p>
    </div>
  );
}
