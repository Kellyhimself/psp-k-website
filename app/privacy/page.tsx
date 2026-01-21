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
            We collect information necessary for party membership and legal compliance, including but not limited to:
          </p>
          <ul className="list-disc pl-5 mb-4 text-neutral-700 space-y-1">
            <li>Name and Contact Information (Email, Phone)</li>
            <li>Identification Number (National ID)</li>
            <li>Voter Registration Details (County, Constituency, Ward)</li>
            <li>Demographic Information (Sex, Date of Birth)</li>
            <li><strong>Optional:</strong> Disability status (PWD Number may be provided voluntarily for inclusivity purposes)</li>
          </ul>
          <p className="mb-4 text-neutral-700 leading-relaxed font-medium bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <strong>Note on Disability Disclosure:</strong> Disclosure of disability status is <strong>not mandatory</strong>. It is collected solely for the purpose of ensuring inclusivity and providing necessary accommodations. You may choose to provide your PWD registration number if you wish to be identified as a Person with Disability.
          </p>
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
            For data protection inquiries, please contact our Data Protection Officer at: [Add Email]
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
