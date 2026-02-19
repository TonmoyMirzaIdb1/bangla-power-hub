import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const testUsers = [
  { email: "chairman@bpdb.gov.bd", password: "Chairman@123", fullName: "Dr. Md. Habibur Rahman", role: "Chairman", department: "GENERAL ADMINISTRATION", hierarchy: 10 },
  { email: "md@bpdb.gov.bd", password: "Director@123", fullName: "Engr. Md. Mahbubur Rahman", role: "Managing Director", department: "GENERAL ADMINISTRATION", hierarchy: 9 },
  { email: "dir.gen@bpdb.gov.bd", password: "Director@123", fullName: "Engr. Kamal Hossain", role: "Director (Generation)", department: "GENERATION", hierarchy: 8 },
  { email: "dir.trans@bpdb.gov.bd", password: "Director@123", fullName: "Engr. Nasrin Akhter", role: "Director (Transmission)", department: "TRANSMISSION", hierarchy: 8 },
  { email: "dir.dist@bpdb.gov.bd", password: "Director@123", fullName: "Engr. Rafiq Ahmed", role: "Director (Distribution)", department: "DISTRIBUTION", hierarchy: 8 },
  { email: "dir.fin@bpdb.gov.bd", password: "Director@123", fullName: "Md. Shafiqul Islam", role: "Director (Finance)", department: "FINANCE & ACCOUNTS", hierarchy: 8 },
  { email: "gm.gen@bpdb.gov.bd", password: "Manager@123", fullName: "Engr. Fazlul Haque", role: "GM Generation", department: "GENERATION", hierarchy: 7 },
  { email: "gm.trans@bpdb.gov.bd", password: "Manager@123", fullName: "Engr. Shahidul Islam", role: "GM Transmission", department: "TRANSMISSION", hierarchy: 7 },
  { email: "chief.eng@bpdb.gov.bd", password: "Engineer@123", fullName: "Engr. Abdul Karim", role: "Chief Engineer", department: "MAINTENANCE & ENGINEERING", hierarchy: 7 },
  { email: "eng.elec@bpdb.gov.bd", password: "Engineer@123", fullName: "Engr. Tanvir Ahmed", role: "Engineer (Electrical)", department: "ELECTRICAL MAINTENANCE", hierarchy: 5 },
  { email: "sys.analyst@bpdb.gov.bd", password: "Analyst@123", fullName: "Md. Rezaul Karim", role: "System Analyst", department: "INFORMATION TECHNOLOGY", hierarchy: 5 },
  { email: "operator@bpdb.gov.bd", password: "Operator@123", fullName: "Md. Jamal Uddin", role: "Plant Operator", department: "OPERATIONS & CONTROL", hierarchy: 3 },
  { email: "technician@bpdb.gov.bd", password: "Technician@1", fullName: "Md. Rahim Mia", role: "Technician (Electrical)", department: "ELECTRICAL MAINTENANCE", hierarchy: 3 },
  { email: "fin.officer@bpdb.gov.bd", password: "Officer@123", fullName: "Fatema Begum", role: "Financial Officer", department: "FINANCE & ACCOUNTS", hierarchy: 4 },
  { email: "customer@example.com", password: "Customer@123", fullName: "Md. Aminul Islam", role: "Customer", department: "CUSTOMER SERVICES", hierarchy: 1 },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const results: { email: string; status: string; error?: string }[] = [];

    for (const user of testUsers) {
      try {
        // Check if user exists
        const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
        const exists = existingUsers?.users?.find((u) => u.email === user.email);

        if (exists) {
          results.push({ email: user.email, status: "already_exists" });
          continue;
        }

        const { data, error } = await supabaseAdmin.auth.admin.createUser({
          email: user.email,
          password: user.password,
          email_confirm: true,
          user_metadata: {
            full_name: user.fullName,
            role: user.role,
            department: user.department,
            hierarchy_level: user.hierarchy,
          },
        });

        if (error) {
          results.push({ email: user.email, status: "error", error: error.message });
        } else {
          results.push({ email: user.email, status: "created" });
        }
      } catch (e: any) {
        results.push({ email: user.email, status: "error", error: e.message });
      }
    }

    return new Response(JSON.stringify({ success: true, results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
