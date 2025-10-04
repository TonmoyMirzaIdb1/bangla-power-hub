-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM (
  'Chairman',
  'Managing Director',
  'Director (Generation)',
  'Director (Transmission)',
  'Director (Distribution)',
  'Director (Finance)',
  'Director (HR)',
  'Director (Planning)',
  'GM Generation',
  'GM Transmission',
  'GM Distribution',
  'GM Finance',
  'GM HR',
  'GM Planning',
  'GM Operations',
  'GM Maintenance',
  'GM IT',
  'GM Audit',
  'DGM Generation',
  'DGM Transmission',
  'DGM Distribution',
  'DGM Finance',
  'DGM HR',
  'DGM Planning',
  'DGM Operations',
  'DGM Maintenance',
  'DGM IT',
  'AGM Generation',
  'AGM Transmission',
  'AGM Distribution',
  'AGM Finance',
  'Chief Engineer',
  'Senior Engineer (Electrical)',
  'Senior Engineer (Mechanical)',
  'Senior Engineer (Civil)',
  'Senior Engineer (Control & Instrumentation)',
  'Engineer (Electrical)',
  'Engineer (Mechanical)',
  'Engineer (Civil)',
  'Engineer (Control & Instrumentation)',
  'Engineer (Electronics)',
  'Assistant Engineer (Electrical)',
  'Assistant Engineer (Mechanical)',
  'Plant Operator',
  'Senior Plant Operator',
  'Control Room Operator',
  'Substation Operator',
  'Senior Technician',
  'Technician (Electrical)',
  'Technician (Mechanical)',
  'System Analyst',
  'Financial Officer',
  'HR Officer',
  'Planning Officer',
  'Operations Officer',
  'Maintenance Officer',
  'Safety Officer',
  'Security Officer',
  'Administrative Assistant',
  'Customer'
);

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  assigned_by UUID REFERENCES auth.users(id),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS public.app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles FOR ALL
USING (
  public.has_role(auth.uid(), 'Chairman') OR
  public.has_role(auth.uid(), 'Managing Director')
);

-- Generation data table
CREATE TABLE public.generation_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plant_id UUID REFERENCES public.power_plants(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  output_mw NUMERIC NOT NULL,
  efficiency_percent NUMERIC,
  fuel_consumption NUMERIC,
  status TEXT,
  recorded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

ALTER TABLE public.generation_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Generation data viewable by authenticated users"
ON public.generation_data FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Engineers can insert generation data"
ON public.generation_data FOR INSERT
TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'Engineer (Electrical)') OR
  public.has_role(auth.uid(), 'Senior Engineer (Electrical)') OR
  public.has_role(auth.uid(), 'Chief Engineer')
);

-- Transmission data table
CREATE TABLE public.transmission_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  substation_id UUID REFERENCES public.substations(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  load_mw NUMERIC NOT NULL,
  voltage_kv NUMERIC,
  frequency_hz NUMERIC,
  losses_percent NUMERIC,
  status TEXT,
  recorded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

ALTER TABLE public.transmission_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Transmission data viewable by authenticated users"
ON public.transmission_data FOR SELECT
TO authenticated
USING (true);

-- Distribution data table
CREATE TABLE public.distribution_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feeder_name TEXT NOT NULL,
  region TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  load_mw NUMERIC NOT NULL,
  voltage_kv NUMERIC,
  outage_duration_minutes INTEGER DEFAULT 0,
  customers_affected INTEGER DEFAULT 0,
  status TEXT,
  recorded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

ALTER TABLE public.distribution_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Distribution data viewable by authenticated users"
ON public.distribution_data FOR SELECT
TO authenticated
USING (true);

-- Customer bills table
CREATE TABLE public.customer_bills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  billing_month DATE NOT NULL,
  consumption_kwh NUMERIC NOT NULL,
  amount_bdt NUMERIC NOT NULL,
  due_date DATE NOT NULL,
  paid BOOLEAN DEFAULT false,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

ALTER TABLE public.customer_bills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view their own bills"
ON public.customer_bills FOR SELECT
USING (auth.uid() = customer_id);

CREATE POLICY "Financial officers can manage bills"
ON public.customer_bills FOR ALL
USING (
  public.has_role(auth.uid(), 'Financial Officer') OR
  public.has_role(auth.uid(), 'Director (Finance)')
);

-- Service requests table
CREATE TABLE public.service_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  request_type TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  priority TEXT DEFAULT 'normal',
  assigned_to UUID REFERENCES auth.users(id),
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view their own requests"
ON public.service_requests FOR SELECT
USING (auth.uid() = customer_id OR auth.uid() = assigned_to);

CREATE POLICY "Customers can create requests"
ON public.service_requests FOR INSERT
WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Officers can manage requests"
ON public.service_requests FOR ALL
USING (
  public.has_role(auth.uid(), 'Operations Officer') OR
  public.has_role(auth.uid(), 'Administrative Assistant')
);

-- Incidents table
CREATE TABLE public.incidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  incident_type TEXT NOT NULL,
  severity TEXT NOT NULL,
  location TEXT,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'open',
  reported_by UUID REFERENCES auth.users(id) NOT NULL,
  assigned_to UUID REFERENCES auth.users(id),
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

ALTER TABLE public.incidents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "All authenticated users can view incidents"
ON public.incidents FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Staff can create incidents"
ON public.incidents FOR INSERT
TO authenticated
WITH CHECK (NOT public.has_role(auth.uid(), 'Customer'));

-- Update trigger for updated_at
CREATE TRIGGER update_service_requests_updated_at
BEFORE UPDATE ON public.service_requests
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_incidents_updated_at
BEFORE UPDATE ON public.incidents
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Update handle_new_user function to work with user_roles table
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (id, full_name, email, role, department, hierarchy_level)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'New User'),
    new.email,
    COALESCE((new.raw_user_meta_data->>'role')::public.user_role, 'Administrative Assistant'),
    COALESCE((new.raw_user_meta_data->>'department')::public.department, 'GENERAL ADMINISTRATION'),
    COALESCE((new.raw_user_meta_data->>'hierarchy_level')::INTEGER, 1)
  );
  
  -- Insert role into user_roles table
  IF new.raw_user_meta_data->>'role' IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (new.id, (new.raw_user_meta_data->>'role')::public.app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  ELSE
    -- Default role for customers
    INSERT INTO public.user_roles (user_id, role)
    VALUES (new.id, 'Customer'::public.app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  
  RETURN new;
END;
$$;