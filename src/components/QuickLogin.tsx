import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

const testUsers = [
  { email: "chairman@bpdb.gov.bd", password: "chairman123", role: "Chairman" },
  { email: "director.gen@bpdb.gov.bd", password: "director123", role: "Director (Generation)" },
  { email: "director.trans@bpdb.gov.bd", password: "director123", role: "Director (Transmission)" },
  { email: "director.dist@bpdb.gov.bd", password: "director123", role: "Director (Distribution)" },
  { email: "customer1@example.com", password: "customer123", role: "Customer" },
  { email: "customer2@example.com", password: "customer123", role: "Customer" },
];

export const QuickLogin = () => {
  const { t } = useLanguage();

  const handleQuickLogin = async (email: string, password: string, role: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast.success(`Logged in as ${role}`);
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-sm">{t('auth.quickLogin')}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        {testUsers.map((user) => (
          <Button
            key={user.email}
            variant="outline"
            size="sm"
            onClick={() => handleQuickLogin(user.email, user.password, user.role)}
            className="text-xs"
          >
            {user.role}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
