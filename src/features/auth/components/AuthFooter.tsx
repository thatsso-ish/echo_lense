interface AuthFooterProps {
  isSignUp: boolean;
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
  onNavigate: (page: string) => void;
}

export function AuthFooter({ isSignUp, setIsSignUp, onNavigate }: AuthFooterProps) {
  return (
    <>
      <div className="mt-6 text-center">
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-gray-400 hover:text-lime-400 transition-colors text-sm"
        >
          {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
        </button>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => onNavigate('home')}
          className="text-gray-500 hover:text-gray-400 transition-colors text-sm"
        >
          Back to Home
        </button>
      </div>
    </>
  );
}
