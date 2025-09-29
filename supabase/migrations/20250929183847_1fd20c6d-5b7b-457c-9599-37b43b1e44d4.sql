-- Create enum types for roles, departments, and hierarchy
CREATE TYPE public.user_role AS ENUM (
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
);

CREATE TYPE public.department AS ENUM (
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
);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  role public.user_role NOT NULL,
  department public.department NOT NULL,
  hierarchy_level INTEGER NOT NULL CHECK (hierarchy_level BETWEEN 1 AND 10),
  employee_id TEXT UNIQUE,
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view all active profiles"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "New users can insert their own profile"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role, department, hierarchy_level)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'New User'),
    new.email,
    COALESCE((new.raw_user_meta_data->>'role')::public.user_role, 'Administrative Assistant'),
    COALESCE((new.raw_user_meta_data->>'department')::public.department, 'GENERAL ADMINISTRATION'),
    COALESCE((new.raw_user_meta_data->>'hierarchy_level')::INTEGER, 1)
  );
  RETURN new;
END;
$$;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$;

-- Trigger to update updated_at
CREATE TRIGGER on_profile_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();