import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AuthHeader } from '../components/AuthHeader';
import { LoginForm } from '../components/LoginForm';
import { AuthFooter } from '../components/AuthFooter';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const { signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(formData.email, formData.password, formData.fullName);
      } else {
        await signIn(formData.email, formData.password);
      }
      onNavigate('dashboard');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <AuthHeader isSignUp={isSignUp} />
        <LoginForm
          isSignUp={isSignUp}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          error={error}
          loading={loading}
        />
        <AuthFooter
          isSignUp={isSignUp}
          setIsSignUp={setIsSignUp}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
}
