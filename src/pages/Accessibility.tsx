import { LegalPage } from "@/components/site/LegalPage";

const Accessibility = () => (
  <LegalPage
    title="Accessibility Statement"
    kicker="Inclusion · Accessibility"
    updated="January 2026"
    intro="St. Mary's Mixed Junior & Senior School, Bomet is committed to making our website usable for everyone, including learners, parents, and visitors with disabilities."
    sections={[
      {
        id: "standard",
        title: "Our standard",
        body: <p>We aim to meet <strong>WCAG 2.1 Level AA</strong> for color contrast, keyboard navigation, screen-reader semantics, and motion-reduction preferences.</p>,
      },
      {
        id: "features",
        title: "Built-in accessibility features",
        body: (
          <ul>
            <li>Full keyboard navigation with visible focus rings.</li>
            <li>Skip-to-content link on every page.</li>
            <li>Light and dark themes with sufficient contrast.</li>
            <li>Respect for <code>prefers-reduced-motion</code> — animations are disabled when the OS requests it.</li>
            <li>Descriptive alt text on photographs and meaningful images.</li>
            <li>Semantic landmarks (<code>header</code>, <code>nav</code>, <code>main</code>, <code>footer</code>) for assistive tech.</li>
          </ul>
        ),
      },
      {
        id: "limitations",
        title: "Known limitations",
        body: <p>The Virtual Tour relies on a third-party 360° viewer that is partially keyboard-accessible. We are working to improve this experience.</p>,
      },
      {
        id: "feedback",
        title: "Tell us about a barrier",
        body: <p>If you encounter an accessibility issue, please email <a href="mailto:webmaster@stmaryssenior.ac.ke">webmaster@stmaryssenior.ac.ke</a> or call <a href="tel:+254721771568">+254 721 771 568</a>. We aim to respond within five working days.</p>,
      },
    ]}
  />
);

export default Accessibility;
