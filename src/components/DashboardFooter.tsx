import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

export const DashboardFooter = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">{t('footer.contact')}</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{t('footer.address')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{t('footer.phone')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{t('footer.email')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>{t('footer.website')}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">{t('footer.quickLinks')}</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>{t('footer.careers')}</div>
              <div>{t('footer.tenders')}</div>
              <div>{t('footer.projects')}</div>
              <div>{t('footer.media')}</div>
            </div>
          </div>

          {/* Emergency */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">{t('footer.emergency')}</h3>
            <div className="text-sm text-muted-foreground">
              <div className="font-medium text-energy">+880-2-9560000</div>
              <div className="mt-2">Available 24/7 for emergency support</div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-6 pt-4 text-center text-sm text-muted-foreground">
          {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
};
