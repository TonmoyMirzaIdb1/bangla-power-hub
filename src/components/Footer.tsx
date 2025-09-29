import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Globe, Clock } from "lucide-react";

const Footer = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Head Office",
      details: ["WASA Bhaban (15th Floor)", "98, Kazi Nazrul Islam Avenue", "Kawran Bazar, Dhaka-1215"]
    },
    {
      icon: Phone,
      title: "Contact Numbers",
      details: ["+880-2-9113313", "+880-2-9114194", "Emergency: 16123"]
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@bpdb.gov.bd", "chairman@bpdb.gov.bd", "md@bpdb.gov.bd"]
    },
    {
      icon: Globe,
      title: "Website",
      details: ["www.bpdb.gov.bd", "Online Services Portal", "Consumer Portal"]
    }
  ];

  const quickLinks = [
    "About BPDB",
    "Power Generation",
    "Distribution Network", 
    "Renewable Energy",
    "Tenders & Notices",
    "Career Opportunities",
    "Consumer Services",
    "Emergency Contacts"
  ];

  const subsidiaries = [
    "DPDC", "DESCO", "WZPDCL", "NWZPDCL", "NESCO", "REB"
  ];

  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {contactInfo.map((info, index) => (
            <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <info.icon className="h-6 w-6 text-energy" />
                  <h3 className="font-semibold text-white">{info.title}</h3>
                </div>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-white/80">
                      {detail}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Links and Subsidiaries */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* About BPDB */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">About BPDB</h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              Bangladesh Power Development Board is the premier organization responsible 
              for power generation, transmission, and distribution across Bangladesh, 
              serving over 165 million people with reliable electricity.
            </p>
            <Button variant="outline-white" size="sm">
              Learn More
            </Button>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
            <div className="grid grid-cols-1 gap-3">
              {quickLinks.map((link, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="text-white/80 hover:text-energy transition-colors text-sm hover:translate-x-1 transform transition-transform duration-200"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Subsidiaries */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Distribution Partners</h3>
            <div className="grid grid-cols-2 gap-3">
              {subsidiaries.map((company, index) => (
                <div 
                  key={index}
                  className="bg-white/10 rounded-lg p-3 text-center hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <span className="text-sm font-medium text-white">{company}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-energy/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-4 w-4 text-energy" />
                <span className="text-sm font-medium text-white">24/7 Emergency</span>
              </div>
              <p className="text-xs text-white/80">
                Power outage emergency hotline available round the clock
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-energy rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">B</span>
                </div>
                <div>
                  <h4 className="font-bold text-white">Bangladesh Power Development Board</h4>
                  <p className="text-xs text-white/70">Ministry of Power, Energy and Mineral Resources</p>
                </div>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm text-white/80">
                © 2024 Bangladesh Power Development Board. All rights reserved.
              </p>
              <p className="text-xs text-white/60 mt-1">
                Government of the People's Republic of Bangladesh
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;