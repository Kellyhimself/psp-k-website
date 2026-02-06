import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-neutral-900">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 shadow-sm rounded-xl">
        <h1 className="text-3xl font-bold text-primary-900 mb-8 border-b pb-4">Privacy Policy</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-primary-800">1. Introduction</h2>
          <p className="mb-4 text-neutral-700 leading-relaxed">
            The People Salvation Party of Kenya (PSP-K) is committed to protecting your privacy and ensuring the security of your personal data. This policy outlines how we collect, use, and safeguard your information in compliance with the **Data Protection Act, 2019** and the **Political Parties Act**.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-primary-800">2. Information We Collect</h2>
          <p className="mb-4 text-neutral-700 leading-relaxed">
            We collect information necessary for party membership, legal compliance, and inclusivity. Below is a comprehensive list of all data we collect:
          </p>

          <h3 className="font-semibold text-neutral-800 mt-4 mb-2">Mandatory Information:</h3>
          <ul className="list-disc pl-5 mb-4 text-neutral-700 space-y-1">
            <li><strong>Full Name:</strong> Surname and Other Names</li>
            <li><strong>Contact Information:</strong> Email Address and Phone Number</li>
            <li><strong>Identification:</strong> National ID or Passport Number</li>
            <li><strong>Date of Birth:</strong> To verify age eligibility (must be 18+)</li>
            <li><strong>Sex:</strong> Male or Female</li>
            <li><strong>Location:</strong> County, Constituency, and Ward of residence</li>
          </ul>

          <h3 className="font-semibold text-neutral-800 mt-4 mb-2">Optional Information:</h3>
          <ul className="list-disc pl-5 mb-4 text-neutral-700 space-y-1">
            <li><strong>Religion:</strong> For demographic analysis and ensuring religious diversity representation</li>
            <li><strong>Ethnicity:</strong> For demographic analysis and ensuring ethnic diversity representation in party structures</li>
            <li><strong>Disability Status:</strong> PWD registration number (NCPWD) for inclusivity purposes</li>
            <li><strong>Special Interest Groups (SIG):</strong> Self-identification as Marginalized, Minority, Women, or Youth for representation purposes</li>
            <li><strong>Image Consent:</strong> Your consent for the party to use your photograph in official records, communications, and promotional materials</li>
          </ul>

          <div className="mb-4 text-neutral-700 leading-relaxed font-medium bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <strong>Note on Sensitive Data:</strong> Disclosure of religion, ethnicity, disability status, and SIG membership is <strong>entirely voluntary</strong>. This information is collected solely for:
            <ul className="list-disc pl-5 mt-2 space-y-1 font-normal">
              <li>Ensuring inclusive representation in party leadership and structures</li>
              <li>Compliance with constitutional requirements for diversity</li>
              <li>Providing necessary accommodations for persons with disabilities</li>
              <li>Statistical reporting to regulatory bodies (anonymized)</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-primary-800">3. Purpose of Data Collection</h2>
          <p className="mb-4 text-neutral-700 leading-relaxed">
            Your data is used for:
          </p>
          <ul className="list-disc pl-5 mb-4 text-neutral-700 space-y-1">
            <li>Processing your membership registration.</li>
            <li>Maintaining the Party Membership Register as required by the Office of the Registrar of Political Parties (ORPP).</li>
            <li>Communicating party activities, notices, and updates.</li>
            <li>Statistical analysis to ensure regional and gender balance.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-primary-800">4. Data Subject Rights</h2>
          <p className="mb-4 text-neutral-700 leading-relaxed">
            Under the Data Protection Act, you have the right to:
          </p>
          <ul className="list-disc pl-5 mb-4 text-neutral-700 space-y-1">
            <li><strong>Access:</strong> Request a copy of the data we hold about you.</li>
            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data.</li>
            <li><strong>Deletion:</strong> Request deletion of your data (subject to legal retention requirements).</li>
            <li><strong>Resignation/Withdrawal:</strong> You have the right to resign from the party.</li>
          </ul>
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
            <h3 className="font-semibold text-yellow-900 mb-2">Proof of Request</h3>
            <p className="text-sm text-yellow-800">
              To exercise your rights for data correction or deletion, or to finalize a resignation, we require a <strong>Proof of Request</strong> to verify your identity and intent. This ensures that no unauthorized changes are made to your membership record. Please visit our <Link href="/member/data-request" className="underline font-medium">Data Request Portal</Link> to submit your request securely.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-primary-800">5. Data Retention & Sharing</h2>
          <p className="mb-4 text-neutral-700 leading-relaxed">
            We retain your data only as long as you are a member or as required by law. We do not sell your personal data. We differ to the Office of the Registrar of Political Parties (ORPP) for statutory compliance.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-primary-800">6. Consent</h2>
          <p className="mb-4 text-neutral-700 leading-relaxed">
            By submitting your registration or data, you explicitly consent to the collection and processing of your personal information as described in this policy. You will be asked to confirm this consent before form submission.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-primary-800">7. Contact Us</h2>
          <p className="mb-4 text-neutral-700 leading-relaxed">
            For data protection inquiries, please contact our Data Protection Officer at:{' '}
            <a href="mailto:dpo@psp-kenya.com" className="text-purple-600 hover:underline">dpo@psp-kenya.com</a>
          </p>
          <p className="text-neutral-700 leading-relaxed">
            For general inquiries, visit our <Link href="/contact" className="text-purple-600 hover:underline">Contact Page</Link> or email{' '}
            <a href="mailto:info@psp-kenya.com" className="text-purple-600 hover:underline">info@psp-kenya.com</a>
          </p>
        </section>

        <div className="mt-8 pt-6 border-t flex justify-between items-center text-sm text-neutral-500">
          <p>Last Updated: {new Date().toLocaleDateString()}</p>
          <Link href="/" className="hover:text-primary-700 transition-colors">Return to Home</Link>
        </div>
      </div>
    </div>
  );
}
