import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Zap, ArrowLeft, Mail, Lock, User, Phone, Building, Briefcase } from 'lucide-react';
import { QuickLogin } from '@/components/QuickLogin';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from 'zod';
import { Alert, AlertDescription } from '@/components/ui/alert';

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

// Validation schemas
const emailSchema = z.string().email('Invalid email address').min(1, 'Email is required');
const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100, 'Full name is too long'),
  phone: z.string().optional(),
  role: z.string().min(1, 'Role is required'),
  department: z.string().min(1, 'Department is required'),
  hierarchyLevel: z.string().min(1, 'Hierarchy level is required'),
});

export default function Auth() {
  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>('login');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [resetEmailSent, setResetEmailSent] = useState(false);
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
  const { t } = useLanguage();

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };
    
    try {
      if (field === 'email') {
        emailSchema.parse(value);
        delete newErrors.email;
      } else if (field === 'password' && mode === 'signup') {
        passwordSchema.parse(value);
        delete newErrors.password;
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        newErrors[field] = error.errors[0].message;
      }
    }
    
    setErrors(newErrors);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    validateField(field, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      if (mode === 'reset') {
        // Validate email
        const validatedEmail = emailSchema.parse(formData.email);
        
        const { error } = await supabase.auth.resetPasswordForEmail(validatedEmail, {
          redirectTo: `${window.location.origin}/auth?mode=update-password`,
        });

        if (error) throw error;

        setResetEmailSent(true);
        toast({
          title: "Password reset email sent!",
          description: "Check your email for the password reset link.",
        });
      } else if (mode === 'login') {
        // Validate login data
        const validated = loginSchema.parse(formData);
        
        const { error } = await supabase.auth.signInWithPassword({
          email: validated.email,
          password: validated.password,
        });

        if (error) throw error;
        
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        // Navigation is handled by AuthContext based on user role
      } else {
        // Validate signup data
        const validated = signupSchema.parse(formData);
        
        const redirectUrl = `${window.location.origin}/`;
        
        const { error } = await supabase.auth.signUp({
          email: validated.email,
          password: validated.password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              full_name: validated.fullName,
              role: validated.role,
              department: validated.department,
              hierarchy_level: parseInt(validated.hierarchyLevel),
            },
          },
        });

        if (error) throw error;

        toast({
          title: "Registration successful!",
          description: "You can now log in with your credentials.",
        });
        setMode('login');
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: "Please check the form for errors.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "An error occurred. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = mode === 'signup' ? getPasswordStrength(formData.password) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-energy to-renewable flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{t('auth.welcome')}</h1>
          <p className="text-white/80">{t('auth.tagline')}</p>
        </div>

        {/* Quick Login Component */}
        <div className="mb-6">
          <QuickLogin />
        </div>

        {/* Glassmorphism Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20">
          {mode === 'reset' && !resetEmailSent && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => setMode('login')}
              className="text-white hover:text-white/80 mb-4 -ml-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Button>
          )}

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              {mode === 'reset' 
                ? 'Reset Password' 
                : mode === 'login' 
                  ? t('auth.welcomeBack') 
                  : t('auth.createAccount')}
            </h2>
            <p className="text-white/70">
              {mode === 'reset'
                ? 'Enter your email to receive a password reset link'
                : mode === 'login' 
                  ? t('auth.loginDesc') 
                  : t('auth.registerDesc')}
            </p>
          </div>

          {resetEmailSent ? (
            <div className="space-y-4">
              <Alert className="bg-green-500/20 border-green-500/50 text-white">
                <Mail className="h-4 w-4" />
                <AlertDescription>
                  Password reset email sent! Check your inbox at {formData.email}
                </AlertDescription>
              </Alert>
              <Button
                type="button"
                onClick={() => {
                  setMode('login');
                  setResetEmailSent(false);
                }}
                className="w-full bg-white text-primary hover:bg-white/90 font-semibold"
              >
                Back to Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-white flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {t('auth.fullName')}
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 ${errors.fullName ? 'border-red-500' : ''}`}
                      placeholder={t('auth.fullName')}
                    />
                    {errors.fullName && (
                      <p className="text-red-300 text-sm">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-white flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      {t('auth.role')}
                    </Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value) => handleInputChange('role', value)}
                      required
                    >
                      <SelectTrigger className={`bg-white/10 border-white/20 text-white ${errors.role ? 'border-red-500' : ''}`}>
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
                    {errors.role && (
                      <p className="text-red-300 text-sm">{errors.role}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-white flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      {t('auth.department')}
                    </Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) => handleInputChange('department', value)}
                      required
                    >
                      <SelectTrigger className={`bg-white/10 border-white/20 text-white ${errors.department ? 'border-red-500' : ''}`}>
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
                    {errors.department && (
                      <p className="text-red-300 text-sm">{errors.department}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hierarchyLevel" className="text-white">{t('auth.hierarchyLevel')}</Label>
                    <Input
                      id="hierarchyLevel"
                      type="number"
                      min="1"
                      max="10"
                      required
                      value={formData.hierarchyLevel}
                      onChange={(e) => handleInputChange('hierarchyLevel', e.target.value)}
                      className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 ${errors.hierarchyLevel ? 'border-red-500' : ''}`}
                    />
                    {errors.hierarchyLevel && (
                      <p className="text-red-300 text-sm">{errors.hierarchyLevel}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {t('auth.phone')} (Optional)
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
                      placeholder="Your phone number"
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {t('auth.email')}
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="your.email@bpdb.gov.bd"
                />
                {errors.email && (
                  <p className="text-red-300 text-sm">{errors.email}</p>
                )}
              </div>

              {mode !== 'reset' && (
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    {t('auth.password')}
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 pr-10 ${errors.password ? 'border-red-500' : ''}`}
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
                  {errors.password && (
                    <p className="text-red-300 text-sm">{errors.password}</p>
                  )}
                  
                  {/* Password Strength Indicator */}
                  {mode === 'signup' && formData.password && (
                    <div className="space-y-1">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-colors ${
                              i < passwordStrength
                                ? passwordStrength <= 2
                                  ? 'bg-red-500'
                                  : passwordStrength <= 3
                                  ? 'bg-yellow-500'
                                  : 'bg-green-500'
                                : 'bg-white/20'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-white/70">
                        {passwordStrength <= 2 && 'Weak password'}
                        {passwordStrength === 3 && 'Medium password'}
                        {passwordStrength >= 4 && 'Strong password'}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {mode === 'login' && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setMode('reset')}
                    className="text-white/80 hover:text-white text-sm underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-primary hover:bg-white/90 font-semibold"
              >
                {loading 
                  ? t('auth.processing') 
                  : mode === 'reset' 
                    ? 'Send Reset Link' 
                    : mode === 'login' 
                      ? t('auth.signIn') 
                      : t('auth.createAccount')}
              </Button>
            </form>
          )}

          {!resetEmailSent && mode !== 'reset' && (
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'login' ? 'signup' : 'login');
                  setErrors({});
                }}
                className="text-white/80 hover:text-white text-sm"
              >
                {mode === 'login' ? t('auth.noAccount') : t('auth.hasAccount')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
