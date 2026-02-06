
import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-purple-900 mb-8">Terms of Service</h1>
        
        <div className="bg-white rounded-xl shadow-md p-8 md:p-10 space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p>
              Welcome to the People Salvation Party of Kenya (PSP-K). By registering as a member, 
              you agree to abide by the Constitution of Kenya, the Political Parties Act, and the PSP-K Constitution.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Membership Eligibility</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>You must be a Kenyan citizen aged 18 years or above.</li>
              <li>You must not be a member of any other registered political party.</li>
              <li>You must be a registered voter (or eligible to be registered).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Code of Conduct</h2>
            <p>
              Members are expected to uphold the values of the party, maintain peace, and respect the democratic rights of others.
              Hate speech, violence, and discrimination are strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Protection</h2>
            <p>
              Your personal data is collected for the purpose of maintaining the party register as required by law.
              We handle your data in accordance with the Data Protection Act, 2019. 
              Please review our <Link href="/privacy" className="text-purple-600 hover:underline">Privacy Policy</Link> for more details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Resignation</h2>
            <p className="mb-4">
              You have the right to resign from the party at any time. Resignation is a fully automated process
              and <strong>does not require manual approval or processing by the party</strong>. Your resignation
              will be effective immediately upon verification of your identity.
            </p>
            <p className="mb-4">
              You may resign through any of the following methods:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong>USSD:</strong> Dial *509# and follow the prompts to resign from the party.</li>
              <li><strong>ORPP Portal:</strong> Visit <a href="https://ippms.orpp.or.ke" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">ippms.orpp.or.ke</a> to process your resignation online.</li>
              <li><strong>Our Portal:</strong> Use our <Link href="/member/data-request" className="text-purple-600 hover:underline">Data Request Portal</Link> to submit a resignation request with verification.</li>
            </ul>
            <p>
              Upon resignation, your membership record will be updated accordingly in compliance with the
              Political Parties Act and ORPP regulations.
            </p>
          </section>

          <div className="pt-6 border-t border-gray-200">
            <Link href="/register" className="text-purple-600 hover:underline font-medium">
              &larr; Back to Registration
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
