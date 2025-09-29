import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Zap } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ROLES = [
  'Chairman', 'Managing Director', 'Director (Generation)', 'Director (Transmission)',
  'Director (Distribution)', 'Director (Finance)', 'Director (HR)', 'Director (Planning)',
  'GM Generation', 'GM Transmission', 'GM Distribution', 'GM Finance', 'GM HR',
  'GM Planning', 'GM Operations', 'GM Maintenance', 'GM IT', 'GM Audit',
  'DGM Generation', 'DGM Transmission', 'DGM Distribution', 'DGM Finance',
  'DGM HR', 'DGM Planning', 'DGM Operations', 'DGM Maintenance', 'DGM IT',
  'AGM Generation', 'AGM Transmission', 'AGM Distribution', 'AGM Finance',
  'Chief Engineer', 'Senior Engineer (Electrical)', 'Senior Engineer (Mechanical)',
  'Senior Engineer (Civil)', 'Senior Engineer (Control & Instrumentation)',
  'Engineer (Electrical)', 'Engineer (Mechanical)', 'Engineer (Civil)',
  'Engineer (Control & Instrumentation)', 'Engineer (Electronics)',
  'Assistant Engineer (Electrical)', 'Assistant Engineer (Mechanical)',
  'Plant Operator', 'Senior Plant Operator', 'Control Room Operator',
  'Substation Operator', 'Senior Technician', 'Technician (Electrical)',
  'Technician (Mechanical)', 'System Analyst', 'Financial Officer',
  'HR Officer', 'Planning Officer', 'Operations Officer', 'Maintenance Officer',
  'Safety Officer', 'Security Officer', 'Administrative Assistant'
];

const DEPARTMENTS = [
  'GENERATION', 'TRANSMISSION', 'DISTRIBUTION', 'FINANCE & ACCOUNTS', 'HUMAN RESOURCES',
  'PLANNING & DEVELOPMENT', 'MAINTENANCE & ENGINEERING', 'OPERATIONS & CONTROL',
  'INFORMATION TECHNOLOGY', 'AUDIT & INSPECTION', 'PROCUREMENT & LOGISTICS',
  'SAFETY & ENVIRONMENT', 'LEGAL & REGULATORY', 'CORPORATE AFFAIRS',
  'TRAINING & DEVELOPMENT', 'QUALITY ASSURANCE', 'PROJECT MANAGEMENT',
  'RESEARCH & DEVELOPMENT', 'CUSTOMER SERVICES', 'SECURITY SERVICES',
  'TRANSPORT & VEHICLE', 'STORE & INVENTORY', 'CONSTRUCTION & CIVIL',
  'ELECTRICAL MAINTENANCE', 'MECHANICAL MAINTENANCE', 'INSTRUMENTATION & CONTROL',
  'COMMUNICATION & TELECOM', 'COAL HANDLING', 'WATER TREATMENT',
  'LABORATORY SERVICES', 'GENERAL ADMINISTRATION'
];

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    role: '',
    department: '',
    hierarchyLevel: '1',
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;
        
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        navigate('/');
      } else {
        const redirectUrl = `${window.location.origin}/`;
        
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              full_name: formData.fullName,
              role: formData.role,
              department: formData.department,
              hierarchy_level: parseInt(formData.hierarchyLevel),
            },
          },
        });

        if (error) throw error;

        toast({
          title: "Registration successful!",
          description: "You can now log in with your credentials.",
        });
        setIsLogin(true);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-energy to-renewable flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Bangladesh Power Development Board</h1>
          <p className="text-white/80">Powering the Nation</p>
        </div>

        {/* Glassmorphism Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-white/70">
              {isLogin ? 'Enter your credentials to access your dashboard' : 'Register to access the BPDB portal'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-white">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    required={!isLogin}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="text-white">Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => setFormData({ ...formData, role: value })}
                    required={!isLogin}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLES.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department" className="text-white">Department</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => setFormData({ ...formData, department: value })}
                    required={!isLogin}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select your department" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEPARTMENTS.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hierarchyLevel" className="text-white">Hierarchy Level (1-10)</Label>
                  <Input
                    id="hierarchyLevel"
                    type="number"
                    min="1"
                    max="10"
                    required={!isLogin}
                    value={formData.hierarchyLevel}
                    onChange={(e) => setFormData({ ...formData, hierarchyLevel: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
                    placeholder="Your phone number"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
                placeholder="your.email@bpdb.gov.bd"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-primary hover:bg-white/90 font-semibold"
            >
              {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-white/80 hover:text-white text-sm"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
