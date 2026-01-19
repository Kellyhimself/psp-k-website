export const metadata = {
  title: 'Privacy Policy | People Salvation Party of Kenya',
  description: 'PSP-K Privacy Policy and Data Protection information.',
}

export default function PrivacyPage() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800">Privacy Policy</h1>
          <p className="text-lg text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              People Salvation Party of Kenya (PSP-K) is committed to protecting your privacy and
              personal data. This Privacy Policy explains how we collect, use, store, and protect
              your personal information in compliance with the Data Protection Act, 2019 of Kenya.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">2. Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you register as a member of PSP-K, we collect the following information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Full name (first name, last name)</li>
              <li>National Identification Number</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Date of birth</li>
              <li>Gender</li>
              <li>Location information (County, Constituency, Ward)</li>
              <li>Physical address (optional)</li>
              <li>Disability status (optional)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">3. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use your personal information for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>To process and maintain your party membership</li>
              <li>To verify your identity and eligibility for membership</li>
              <li>To communicate with you about party activities, events, and updates</li>
              <li>To comply with legal requirements under the Political Parties Act</li>
              <li>To submit membership data to the Office of Registrar of Political Parties (ORPP)</li>
              <li>To verify membership with the Independent Electoral and Boundaries Commission (IEBC) when required</li>
              <li>To generate membership statistics and reports for compliance purposes</li>
              <li>To ensure gender balance and inclusivity as required by law</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">4. Data Sharing</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>
                <strong>Office of Registrar of Political Parties (ORPP):</strong> As required by law
                for party registration and compliance reporting
              </li>
              <li>
                <strong>Independent Electoral and Boundaries Commission (IEBC):</strong> For
                membership verification when required by law
              </li>
              <li>
                <strong>Service Providers:</strong> Third-party services that help us operate our
                website (hosting, email services, etc.), all bound by confidentiality agreements
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              We do not sell, rent, or trade your personal information to third parties for
              marketing purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">5. Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement appropriate technical and organizational measures to protect your personal
              data against unauthorized access, alteration, disclosure, or destruction. This
              includes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Encryption of sensitive data</li>
              <li>Secure storage systems</li>
              <li>Access controls and authentication</li>
              <li>Regular security audits</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">6. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We retain your personal information for as long as necessary to fulfill the purposes
              outlined in this policy, comply with legal obligations, resolve disputes, and enforce
              our agreements. Membership data is retained as required by the Political Parties Act
              and may be kept for the duration of your membership and as required by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">7. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Under the Data Protection Act, 2019, you have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>
                <strong>Access:</strong> Request a copy of your personal data we hold
              </li>
              <li>
                <strong>Correction:</strong> Request correction of inaccurate or incomplete data
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your personal data (subject to
                legal requirements)
              </li>
              <li>
                <strong>Objection:</strong> Object to processing of your personal data
              </li>
              <li>
                <strong>Portability:</strong> Request transfer of your data to another service
                provider
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              To exercise these rights, please contact us at:{' '}
              <a href="mailto:info@psp-k.co.ke" className="text-purple-600 hover:underline">
                info@psp-k.co.ke
              </a>
            </p>
            <p className="text-gray-700 leading-relaxed">
              You can also submit a request online through our{' '}
              <a href="/member/data-request" className="text-purple-600 hover:underline">
                Data Rights Request portal
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">8. Cookies and Tracking</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our website may use cookies and similar tracking technologies to enhance your
              experience. You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">9. Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any
              significant changes by posting the new policy on this page and updating the "Last
              updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">10. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or wish to exercise your rights,
              please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700">
                <strong>People Salvation Party of Kenya (PSP-K)</strong>
                <br />
                Ukombozi House, Ndemi Road, Nairobi
                <br />
                P.O Box 16202-00100
                <br />
                Email:{' '}
                <a href="mailto:info@psp-k.co.ke" className="text-purple-600 hover:underline">
                  info@psp-k.co.ke
                </a>
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">11. Compliance</h2>
            <p className="text-gray-700 leading-relaxed">
              This Privacy Policy is compliant with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4">
              <li>Data Protection Act, 2019 of Kenya</li>
              <li>Political Parties Act, 2011</li>
              <li>Constitution of Kenya, 2010</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

