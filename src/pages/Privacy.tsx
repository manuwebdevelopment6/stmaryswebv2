import { LegalPage } from "@/components/site/LegalPage";

const Privacy = () => (
  <LegalPage
    title="Privacy Policy"
    kicker="Legal · Privacy"
    updated="January 2026"
    intro="St. Mary's Mixed Junior & Senior School, Bomet respects the privacy of every learner, parent, guardian, and visitor. This policy explains what information we collect, why we collect it, and how it is protected."
    sections={[
      {
        id: "scope",
        title: "1. Scope of this policy",
        body: (
          <>
            <p>
              This policy applies to information we receive through our website
              (<a href="https://stmaryssenior.ac.ke">stmaryssenior.ac.ke</a>),
              admissions forms, the student portal, email correspondence, and any
              official communication channels operated by the school.
            </p>
            <p>It does not apply to third-party services we link to, which have their own policies.</p>
          </>
        ),
      },
      {
        id: "collected",
        title: "2. Information we collect",
        body: (
          <ul>
            <li><strong>Identity data</strong> — learner and parent names, dates of birth, gender, national ID/birth-certificate numbers.</li>
            <li><strong>Contact data</strong> — postal address, telephone, email.</li>
            <li><strong>Academic data</strong> — KPSEA results, transcripts, attendance, conduct, co-curricular activity.</li>
            <li><strong>Health & welfare data</strong> — medical history relevant to boarding care, dietary requirements, emergency contacts.</li>
            <li><strong>Financial data</strong> — fee payments, M-Pesa/bank transaction references (we never store full card numbers).</li>
            <li><strong>Technical data</strong> — IP address, browser type, pages visited, gathered through privacy-respecting analytics.</li>
          </ul>
        ),
      },
      {
        id: "use",
        title: "3. How we use information",
        body: (
          <ul>
            <li>Processing admissions and managing the learner's enrolment lifecycle.</li>
            <li>Reporting academic progress to parents/guardians and to KNEC/MoE as required.</li>
            <li>Boarding pastoral care, safeguarding, and medical response.</li>
            <li>Fee billing, receipting, and statutory financial reporting.</li>
            <li>Newsletters and event announcements (only with consent — opt-out any time).</li>
            <li>Maintaining the integrity, security, and improvement of our digital services.</li>
          </ul>
        ),
      },
      {
        id: "lawful",
        title: "4. Lawful basis (Kenya Data Protection Act, 2019)",
        body: (
          <p>
            We process personal data on the basis of (a) <strong>consent</strong>,
            (b) performance of a <strong>contract</strong> (the parent–school agreement),
            (c) compliance with a <strong>legal obligation</strong> under the Basic
            Education Act, and (d) the <strong>legitimate interests</strong> of
            safeguarding and continuity of education.
          </p>
        ),
      },
      {
        id: "sharing",
        title: "5. Who we share information with",
        body: (
          <ul>
            <li>Ministry of Education, KNEC, TSC, and the Catholic Diocese of Kericho where lawfully required.</li>
            <li>Approved medical providers in case of emergencies.</li>
            <li>Payment processors (M-Pesa Daraja, Stripe) strictly to settle fees.</li>
            <li>Cloud infrastructure providers under data-processing agreements.</li>
          </ul>
        ),
      },
      {
        id: "retention",
        title: "6. How long we keep data",
        body: (
          <p>
            Active learner records are kept for the duration of enrolment and
            archived for a further <strong>seven (7) years</strong> after
            graduation or transfer for transcript-issuance and audit purposes.
            Marketing data is held only while consent is in place.
          </p>
        ),
      },
      {
        id: "security",
        title: "7. Security measures",
        body: (
          <p>
            All digital records are stored on encrypted, access-controlled
            infrastructure. Physical files are kept in locked cabinets in the
            administration block. Staff handling personal data sign a
            confidentiality undertaking.
          </p>
        ),
      },
      {
        id: "rights",
        title: "8. Your rights",
        body: (
          <ul>
            <li>Access — request a copy of personal data we hold about you or your child.</li>
            <li>Rectification — ask us to correct inaccurate information.</li>
            <li>Erasure — request deletion where there is no overriding legal duty to retain.</li>
            <li>Objection — object to processing based on legitimate interests.</li>
            <li>Withdraw consent — at any time, without affecting prior lawful processing.</li>
          </ul>
        ),
      },
      {
        id: "cookies",
        title: "9. Cookies & analytics",
        body: (
          <p>
            We use a minimal set of strictly-necessary cookies (session, theme
            preference, CSRF) and aggregated, anonymised analytics. We do not
            sell data and do not run third-party advertising trackers.
          </p>
        ),
      },
      {
        id: "children",
        title: "10. Children's data",
        body: (
          <p>
            Almost all our learners are minors. We collect their data only with
            the documented authority of a parent or legal guardian and process
            it strictly for educational and welfare purposes.
          </p>
        ),
      },
      {
        id: "contact",
        title: "11. Contact the Data Protection Officer",
        body: (
          <p>
            St. Mary's Mixed Junior & Senior School, P.O. Box 329-20300, Bomet,
            Kenya. Email <a href="mailto:dpo@stmaryssenior.ac.ke">dpo@stmaryssenior.ac.ke</a>{" "}
            or call <a href="tel:+254721771568">+254 721 771 568</a>.
          </p>
        ),
      },
    ]}
  />
);

export default Privacy;
