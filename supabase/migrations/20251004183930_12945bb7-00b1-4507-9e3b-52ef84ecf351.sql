-- Insert test user roles for quick login users
-- Note: These will only work if the users already exist in auth.users

-- Insert roles for existing test users (if they exist)
DO $$
DECLARE
  chairman_id UUID;
  dir_gen_id UUID;
  dir_trans_id UUID;
  dir_dist_id UUID;
  customer1_id UUID;
  customer2_id UUID;
BEGIN
  -- Get user IDs by email if they exist
  SELECT id INTO chairman_id FROM auth.users WHERE email = 'chairman@bpdb.gov.bd' LIMIT 1;
  SELECT id INTO dir_gen_id FROM auth.users WHERE email = 'director.gen@bpdb.gov.bd' LIMIT 1;
  SELECT id INTO dir_trans_id FROM auth.users WHERE email = 'director.trans@bpdb.gov.bd' LIMIT 1;
  SELECT id INTO dir_dist_id FROM auth.users WHERE email = 'director.dist@bpdb.gov.bd' LIMIT 1;
  SELECT id INTO customer1_id FROM auth.users WHERE email = 'customer1@example.com' LIMIT 1;
  SELECT id INTO customer2_id FROM auth.users WHERE email = 'customer2@example.com' LIMIT 1;

  -- Insert roles if users exist
  IF chairman_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (chairman_id, 'Chairman') ON CONFLICT DO NOTHING;
  END IF;
  
  IF dir_gen_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (dir_gen_id, 'Director (Generation)') ON CONFLICT DO NOTHING;
  END IF;
  
  IF dir_trans_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (dir_trans_id, 'Director (Transmission)') ON CONFLICT DO NOTHING;
  END IF;
  
  IF dir_dist_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (dir_dist_id, 'Director (Distribution)') ON CONFLICT DO NOTHING;
  END IF;
  
  IF customer1_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (customer1_id, 'Customer') ON CONFLICT DO NOTHING;
  END IF;
  
  IF customer2_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (customer2_id, 'Customer') ON CONFLICT DO NOTHING;
  END IF;
END $$;

-- Insert sample generation data
INSERT INTO public.generation_data (plant_id, output_mw, efficiency_percent, fuel_consumption, status)
SELECT 
  id,
  (capacity_mw * (0.7 + random() * 0.25))::NUMERIC(10,2),
  (85 + random() * 10)::NUMERIC(5,2),
  (capacity_mw * 0.25 * (0.9 + random() * 0.2))::NUMERIC(10,2),
  CASE WHEN random() > 0.1 THEN 'operational' ELSE 'maintenance' END
FROM public.power_plants
WHERE is_active = true
LIMIT 20;

-- Insert sample transmission data
INSERT INTO public.transmission_data (substation_id, load_mw, voltage_kv, frequency_hz, losses_percent, status)
SELECT 
  id,
  (capacity_mva * 0.8 * (0.6 + random() * 0.3))::NUMERIC(10,2),
  CASE 
    WHEN voltage_level LIKE '%400%' THEN 398 + random() * 4
    WHEN voltage_level LIKE '%230%' THEN 228 + random() * 4
    WHEN voltage_level LIKE '%132%' THEN 130 + random() * 4
    ELSE 230
  END::NUMERIC(6,2),
  (49.9 + random() * 0.2)::NUMERIC(4,2),
  (2 + random() * 3)::NUMERIC(4,2),
  CASE WHEN random() > 0.05 THEN 'operational' ELSE 'maintenance' END
FROM public.substations
WHERE is_active = true
LIMIT 20;

-- Insert sample distribution data
INSERT INTO public.distribution_data (feeder_name, region, load_mw, voltage_kv, outage_duration_minutes, customers_affected, status)
VALUES
  ('Dhaka North Feeder 1', 'Dhaka', 45.5, 11.2, 0, 0, 'operational'),
  ('Dhaka South Feeder 2', 'Dhaka', 38.2, 11.0, 15, 120, 'recovered'),
  ('Chittagong East Feeder 1', 'Chittagong', 52.1, 11.3, 0, 0, 'operational'),
  ('Sylhet Central Feeder', 'Sylhet', 28.7, 11.1, 0, 0, 'operational'),
  ('Rajshahi West Feeder 3', 'Rajshahi', 33.4, 10.9, 45, 350, 'maintenance'),
  ('Khulna Industrial Feeder', 'Khulna', 61.8, 11.2, 0, 0, 'operational'),
  ('Barisal South Feeder', 'Barisal', 22.3, 11.0, 0, 0, 'operational'),
  ('Rangpur North Feeder 2', 'Rangpur', 19.8, 11.1, 0, 0, 'operational'),
  ('Mymensingh East Feeder', 'Mymensingh', 26.5, 11.2, 0, 0, 'operational'),
  ('Comilla Central Feeder', 'Comilla', 31.2, 11.0, 0, 0, 'operational');

-- Enable realtime for relevant tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.generation_data;
ALTER PUBLICATION supabase_realtime ADD TABLE public.transmission_data;
ALTER PUBLICATION supabase_realtime ADD TABLE public.distribution_data;
ALTER PUBLICATION supabase_realtime ADD TABLE public.service_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE public.incidents;