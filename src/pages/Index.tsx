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
      title="St. Mary's Mixed Junior & Senior School, Bomet — CBE Excellence Since 1990"
      description="A Catholic Diocese of Kericho school offering exceptional CBE education from Grade 7 through Grade 10. 500+ students, 98% university admission, 35+ years of excellence in Bomet."
      canonical={typeof window !== 'undefined' ? window.location.origin + '/' : undefined}
    />
    <Hero />
    <StatsBand />
    <SchoolLife />
    <ResultsPreview />
    <Testimonials />
    <NewsTeaser />
    <CtaBand />
  </SiteLayout>
);

export default Index;
