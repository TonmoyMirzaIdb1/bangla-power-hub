import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  // Role-based redirect after login
  useEffect(() => {
    if (user && !loading) {
      supabase.from('profiles').select('role').eq('id', user.id).single().then(({ data }) => {
        const role = data?.role;
        if (!role) return;
        
        // Executive level
        if (role === 'Chairman') navigate('/dashboard/chairman');
        else if (role === 'Managing Director') navigate('/dashboard/managing-director');
        
        // Director level
        else if (role === 'Director (Generation)') navigate('/dashboard/director/generation');
        else if (role === 'Director (Transmission)') navigate('/dashboard/director/transmission');
        else if (role === 'Director (Distribution)') navigate('/dashboard/director/distribution');
        else if (role === 'Director (Finance)') navigate('/dashboard/director/finance');
        else if (role === 'Director (HR)') navigate('/dashboard/director/hr');
        else if (role === 'Director (Planning)') navigate('/dashboard/director/planning');
        
        // GM level
        else if (role.startsWith('GM ')) {
          const dept = role.replace('GM ', '').toLowerCase();
          navigate(`/dashboard/gm/${dept}`);
        }
        
        // DGM level
        else if (role.startsWith('DGM ')) {
          const dept = role.replace('DGM ', '').toLowerCase();
          navigate(`/dashboard/dgm/${dept}`);
        }
        
        // AGM level
        else if (role.startsWith('AGM ')) {
          const dept = role.replace('AGM ', '').toLowerCase();
          navigate(`/dashboard/agm/${dept}`);
        }
        
        // Engineer level
        else if (role.includes('Engineer')) {
          const specialization = role.includes('Electrical') ? 'electrical' :
                                role.includes('Mechanical') ? 'mechanical' :
                                role.includes('Civil') ? 'civil' :
                                role.includes('Control') ? 'control' : 'general';
          navigate(`/dashboard/engineer/${specialization}`);
        }
        
        // Operator level
        else if (role.includes('Operator')) {
          const type = role.includes('Plant') ? 'plant' :
                      role.includes('Control Room') ? 'control-room' :
                      role.includes('Substation') ? 'substation' : 'general';
          navigate(`/dashboard/operator/${type}`);
        }
        
        // Officer level
        else if (role.includes('Officer')) {
          const dept = role.replace(' Officer', '').toLowerCase();
          navigate(`/dashboard/officer/${dept}`);
        }
        
        // Technician and support staff
        else if (role.includes('Technician') || role.includes('Assistant')) {
          navigate(`/dashboard/officer/technical`);
        }
        
        // Customer
        else navigate('/dashboard/customer');
      });
    }
  }, [user, loading, navigate]);

  return (
    <AuthContext.Provider value={{ user, session, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
