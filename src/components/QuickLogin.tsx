import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { Loader2, ChevronDown, ChevronUp, Shield, Briefcase, Wrench, Users, Zap } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface TestUser {
  email: string;
  password: string;
  role: string;
  icon: React.ReactNode;
}

const userGroups: { label: string; icon: React.ReactNode; users: TestUser[] }[] = [
  {
    label: "Executive",
    icon: <Shield className="h-3 w-3" />,
    users: [
      { email: "chairman@bpdb.gov.bd", password: "Chairman@123", role: "Chairman", icon: <Shield className="h-3 w-3 text-primary" /> },
      { email: "md@bpdb.gov.bd", password: "Director@123", role: "Managing Director", icon: <Shield className="h-3 w-3 text-primary" /> },
    ],
  },
  {
    label: "Directors",
    icon: <Briefcase className="h-3 w-3" />,
    users: [
      { email: "dir.gen@bpdb.gov.bd", password: "Director@123", role: "Director (Gen)", icon: <Zap className="h-3 w-3 text-energy" /> },
      { email: "dir.trans@bpdb.gov.bd", password: "Director@123", role: "Director (Trans)", icon: <Zap className="h-3 w-3 text-energy" /> },
      { email: "dir.dist@bpdb.gov.bd", password: "Director@123", role: "Director (Dist)", icon: <Zap className="h-3 w-3 text-energy" /> },
      { email: "dir.fin@bpdb.gov.bd", password: "Director@123", role: "Director (Finance)", icon: <Briefcase className="h-3 w-3 text-primary" /> },
    ],
  },
  {
    label: "Managers",
    icon: <Users className="h-3 w-3" />,
    users: [
      { email: "gm.gen@bpdb.gov.bd", password: "Manager@123", role: "GM Generation", icon: <Users className="h-3 w-3 text-renewable" /> },
      { email: "gm.trans@bpdb.gov.bd", password: "Manager@123", role: "GM Transmission", icon: <Users className="h-3 w-3 text-renewable" /> },
    ],
  },
  {
    label: "Technical",
    icon: <Wrench className="h-3 w-3" />,
    users: [
      { email: "chief.eng@bpdb.gov.bd", password: "Engineer@123", role: "Chief Engineer", icon: <Wrench className="h-3 w-3 text-primary" /> },
      { email: "eng.elec@bpdb.gov.bd", password: "Engineer@123", role: "Engineer (Elec)", icon: <Wrench className="h-3 w-3 text-energy" /> },
      { email: "sys.analyst@bpdb.gov.bd", password: "Analyst@123", role: "System Analyst", icon: <Wrench className="h-3 w-3 text-renewable" /> },
      { email: "operator@bpdb.gov.bd", password: "Operator@123", role: "Plant Operator", icon: <Wrench className="h-3 w-3 text-gas" /> },
      { email: "technician@bpdb.gov.bd", password: "Technician@1", role: "Technician", icon: <Wrench className="h-3 w-3 text-muted-foreground" /> },
    ],
  },
  {
    label: "Others",
    icon: <Users className="h-3 w-3" />,
    users: [
      { email: "fin.officer@bpdb.gov.bd", password: "Officer@123", role: "Financial Officer", icon: <Briefcase className="h-3 w-3 text-primary" /> },
      { email: "customer@example.com", password: "Customer@123", role: "Customer", icon: <Users className="h-3 w-3 text-muted-foreground" /> },
    ],
  },
];

export const QuickLogin = () => {
  const { t } = useLanguage();
  const [loadingEmail, setLoadingEmail] = useState<string | null>(null);
  const [openGroup, setOpenGroup] = useState<string>("Executive");

  const handleQuickLogin = async (email: string, password: string, role: string) => {
    setLoadingEmail(email);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success(`Logged in as ${role}`);
    } catch (error: any) {
      toast.error(error.message || "Login failed. Run seed-users first.");
    } finally {
      setLoadingEmail(null);
    }
  };

  return (
    <Card className="w-full bg-white/10 backdrop-blur-xl border-white/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-white flex items-center gap-2">
          <Zap className="h-4 w-4" />
          {t('auth.quickLogin')} — 15 Test Users
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 pt-0">
        {userGroups.map((group) => (
          <Collapsible
            key={group.label}
            open={openGroup === group.label}
            onOpenChange={(open) => setOpenGroup(open ? group.label : "")}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full px-2 py-1.5 rounded-md hover:bg-white/10 text-white/90 text-xs font-semibold">
              <span className="flex items-center gap-1.5">{group.icon} {group.label}</span>
              {openGroup === group.label ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="grid grid-cols-2 gap-1 px-1 pb-1">
              {group.users.map((user) => (
                <Button
                  key={user.email}
                  variant="outline"
                  size="sm"
                  disabled={loadingEmail !== null}
                  onClick={() => handleQuickLogin(user.email, user.password, user.role)}
                  className="text-xs h-7 bg-white/5 border-white/20 text-white hover:bg-white/20 flex items-center gap-1 justify-start"
                >
                  {loadingEmail === user.email ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    user.icon
                  )}
                  <span className="truncate">{user.role}</span>
                </Button>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
};
