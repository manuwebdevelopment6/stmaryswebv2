import { LegalPage } from "@/components/site/LegalPage";

const Terms = () => (
  <LegalPage
    title="Terms of Use"
    kicker="Legal · Terms"
    updated="January 2026"
    intro="These Terms govern your use of the St. Mary's Mixed Junior & Senior School, Bomet website and digital services. By accessing this site, you agree to the terms below."
    sections={[
      {
        id: "acceptance",
        title: "1. Acceptance of terms",
        body: <p>Continued use of this website constitutes acceptance of these Terms and our <a href="/privacy">Privacy Policy</a>. If you do not agree, please discontinue use.</p>,
      },
      {
        id: "use",
        title: "2. Permitted use",
        body: (
          <ul>
            <li>Browsing information about the school, its programmes, and admissions.</li>
            <li>Submitting genuine admission enquiries and applications.</li>
            <li>Accessing the student/parent portal with credentials issued by the school.</li>
            <li>Downloading published past papers for personal academic use.</li>
          </ul>
        ),
      },
      {
        id: "prohibited",
        title: "3. Prohibited conduct",
        body: (
          <ul>
            <li>Attempting to gain unauthorised access to any part of the system.</li>
            <li>Uploading malware, scraping content, or overloading the service.</li>
            <li>Impersonating staff, learners, parents, or partner institutions.</li>
            <li>Re-publishing exam papers or branded media for commercial gain.</li>
          </ul>
        ),
      },
      {
        id: "ip",
        title: "4. Intellectual property",
        body: <p>All content — text, photography, the school crest, logos, and downloadable resources — is the property of St. Mary's Mixed Junior & Senior School or its licensors and is protected by Kenyan and international copyright law.</p>,
      },
      {
        id: "accounts",
        title: "5. User accounts",
        body: <p>Portal accounts are issued to enrolled learners, parents, and staff. You are responsible for safeguarding your password and for all activity under your account. Notify us immediately of any suspected breach.</p>,
      },
      {
        id: "payments",
        title: "6. Fee payments",
        body: <p>Online fee payments are processed via M-Pesa (Daraja) and Stripe. Receipts are issued automatically. Disputes must be raised within 30 days of the transaction.</p>,
      },
      {
        id: "thirdparty",
        title: "7. Third-party links",
        body: <p>Our site may link to external resources (Ministry of Education, KNEC, Diocese, partners). We are not responsible for the content, policies, or availability of those sites.</p>,
      },
      {
        id: "warranty",
        title: "8. Disclaimer & limitation of liability",
        body: <p>The website is provided "as is" without warranty of uninterrupted availability. To the fullest extent permitted by law, the school shall not be liable for indirect or consequential losses arising from use of the site.</p>,
      },
      {
        id: "changes",
        title: "9. Changes to these Terms",
        body: <p>We may revise these Terms from time to time. Material changes will be announced on this page with a new "Last updated" date.</p>,
      },
      {
        id: "law",
        title: "10. Governing law",
        body: <p>These Terms are governed by the laws of the Republic of Kenya. Any dispute shall be subject to the exclusive jurisdiction of the Kenyan courts.</p>,
      },
    ]}
  />
);

export default Terms;
