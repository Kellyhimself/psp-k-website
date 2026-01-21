import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-neutral-900">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 shadow-sm rounded-xl">
        <h1 className="text-3xl font-bold text-primary-900 mb-8 border-b pb-4">Terms of Use</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-primary-800">1. Acceptance of Terms</h2>
          <p className="mb-4 text-neutral-700 leading-relaxed">
            By accessing and using the People Salvation Party of Kenya (PSP-K) website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this websites particular services, you shall be subject to any posted guidelines or rules applicable to such services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-primary-800">2. Party Membership</h2>
          <p className="mb-4 text-neutral-700 leading-relaxed">
            Membership registration is open to eligible Kenyans as defined by the Political Parties Act. By registering, you confirm that the information provided is accurate and truthful. Providing false information may lead to disqualification or removal from the party register.
          </p>
          <p className="mb-4 text-neutral-700 leading-relaxed">
            For resignation or withdrawal from the party, please follow the procedures outlined in our <Link href="/member/data-request" className="text-blue-600 hover:underline">Data/Membership Management</Link> section or consult the Office of the Registrar of Political Parties (ORPP) guidelines.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-primary-800">3. Privacy Policy</h2>
          <p className="mb-4 text-neutral-700 leading-relaxed">
            Your data privacy is important to us. Our use of your personal information is governed by our <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>. We comply with the Data Protection Act of Kenya.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-primary-800">4. User Conduct</h2>
          <p className="mb-4 text-neutral-700 leading-relaxed">
            You agree not to use the website for any unlawful purpose or any purpose prohibited by these Terms. You agree not to use the website in any manner that could damage, disable, overburden, or impair the website or interfere with any other partys use and enjoyment of the website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-primary-800">5. Intellectual Property</h2>
          <p className="mb-4 text-neutral-700 leading-relaxed">
            The content, organization, graphics, design, compilation, and other matters related to the Site are protected under applicable copyrights and other proprietary (including but not limited to intellectual property) rights. The copying, redistribution, use or publication by you of any such matters or any part of the Site is strictly prohibited.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-primary-800">6. Modifications</h2>
          <p className="mb-4 text-neutral-700 leading-relaxed">
            The Party reserves the right to change these Terms of Use at any time. Your continued use of the site after any such changes constitutes your acceptance of the new Terms of Use.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-primary-800">7. Contact Information</h2>
          <p className="mb-4 text-neutral-700 leading-relaxed">
            If you have any questions about these Terms, please contact us at:<br />
            <strong>People Salvation Party of Kenya (PSP-K)</strong><br />
            HQ, MNG Offices, Suite B1, Ground Floor<br />
            Ndemi Road, Kilimani, Nairobi<br />
            P.O Box 1622-00100<br />
            Phone: +254 723 116929<br />
            Email: info@psp-k.com
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
