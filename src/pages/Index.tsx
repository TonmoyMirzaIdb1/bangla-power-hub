import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PowerGeneration from "@/components/PowerGeneration";
import DistributionNetwork from "@/components/DistributionNetwork";
import RenewableEnergy from "@/components/RenewableEnergy";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <PowerGeneration />
        <DistributionNetwork />
        <RenewableEnergy />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
