import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { HeartPulse } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Mock Google OAuth login
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    try {
      // Simulating an API call to get a JWT token
      setTimeout(() => {
        // Mock JWT token
        const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsIm5hbWUiOiJKb2huIERvZSIsInBpY3R1cmUiOiJodHRwczovL3JhbmRvbXVzZXIubWUvYXBpL3BvcnRyYWl0cy9tZW4vOC5qcGciLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTk3NzgzOTAyMn0.mjEKzKVQPLTfXBBYI6yJL3MJ-YFU_WV6zCPxX9V0jp0';
        
        login(mockToken);
        navigate('/dashboard');
        setIsLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  // Pulse animation for the logo
  const pulseVariants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.05, 1],
      transition: { 
        duration: 2,
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-secondary-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary-900/20 rounded-full blur-3xl" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary-700/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-60 w-72 h-72 bg-primary-800/20 rounded-full blur-3xl" />
      </div>
      
      {/* Login Container */}
      <motion.div 
        className="relative z-10 m-auto w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="glass-card p-8 backdrop-blur">
          <div className="text-center mb-8">
            <motion.div
              className="mx-auto mb-4 inline-block"
              variants ={pulseVariants}
              initial="initial"
              animate="pulse"
            >
              <HeartPulse className="h-12 w-12 text-primary-500" />
            </motion.div>
            
            <h1 className="text-2xl font-bold text-white">Welcome to Xeno CRM</h1>
            <p className="text-secondary-400 mt-2">Intelligence-driven customer relationships</p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full btn btn-primary relative overflow-hidden group"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                <>
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path 
                        fill="currentColor" 
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path 
                        fill="currentColor" 
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path 
                        fill="currentColor" 
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path 
                        fill="currentColor" 
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                      <path fill="none" d="M1 1h22v22H1z" />
                    </svg>
                    FAST & EASY - Sign in with Google
                  </span>
                  
                  <div className="absolute inset-0 h-full w-full scale-0 rounded-md transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></div>
                </>
              )}
            </button>
            
            <div className="mt-6 text-center text-xs text-secondary-500">
              By signing in, you agree to our 
              <a href="#" className="text-primary-400 hover:text-primary-300 mx-1">Terms of Service</a>
              and
              <a href="#" className="text-primary-400 hover:text-primary-300 ml-1">Privacy Policy</a>
            </div>
          </motion.div>
        </div>
        
        <motion.p 
          className="text-center mt-8 text-sm text-secondary-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          XENO MINI CRM BY HRIDAYA – 2025
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoginPage;