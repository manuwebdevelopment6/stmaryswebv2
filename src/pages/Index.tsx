import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/site/Seo";
import { Hero } from "@/components/sections/Hero";
import { StatsBand } from "@/components/sections/StatsBand";
import { ResultsPreview } from "@/components/sections/ResultsPreview";
import { SchoolLife } from "@/components/sections/SchoolLife";
import { Testimonials } from "@/components/sections/Testimonials";
import { NewsTeaser } from "@/components/sections/NewsTeaser";
import { CtaBand } from "@/components/sections/CtaBand";

const Index = () => (
  <SiteLayout>
    <Seo
      title="St. Mary's Senior School, Bomet — Excellence in Education since 1965"
      description="Premier secondary boarding school in Bomet County, Kenya. KCSE results, Form 1 admissions, fees, AI assistant, and online portals for parents and students."
      canonical={typeof window !== 'undefined' ? window.location.origin + '/' : undefined}
    />
    <Hero />
    <StatsBand />
    <ResultsPreview />
    <SchoolLife />
    <Testimonials />
    <NewsTeaser />
    <CtaBand />
  </SiteLayout>
);

export default Index;
