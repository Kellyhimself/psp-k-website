import React from 'react'

export default function FAQPage() {
    const faqs = [
        {
            question: "How do I become a member of PSP-K?",
            answer: "You can register online through this website by visiting the 'Register' page. Alternatively, you can use the USSD code *509# or visit the ORPP portal."
        },
        {
            question: "Is there a fee to join?",
            answer: "Membership registration is currently free. Any voluntary contributions to support the party can be made through our official M-PESA paybill."
        },
        {
            question: "How do I verify my membership status?",
            answer: "Visit the 'Member Check' section under the Membership menu. Enter your National ID number to verify if your record exists in our database."
        },
        {
            question: "How can I resign or leave the party?",
            answer: "To resign, you must submit a formal request via our 'Data Request' portal or through the ORPP website. You will be required to provide a signed resignation letter and proof of identity."
        },
        {
            question: "Is my personal data safe?",
            answer: "Yes. We comply fully with the Data Protection Act of 2019. We strictly use your data for party activities and compliance with the Registrar of Political Parties."
        },
        {
            question: "Does the party support Persons with Disabilities (PWDs)?",
            answer: "Absolutely. We are an inclusive party. We have specific secretariats for PWDs and ensure all our activities and platforms are accessible."
        }
    ]

    return (
        <div className="py-16 bg-white min-h-screen">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center text-gray-900">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-center text-gray-600 mb-12">
                        Common questions about membership, policies, and party operations.
                    </p>

                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <details key={index} className="group p-6 border border-gray-200 rounded-xl bg-gray-50 open:bg-white open:shadow-md transition-all">
                                <summary className="flex justify-between items-center font-semibold cursor-pointer list-none text-gray-800 text-lg">
                                    <span>{faq.question}</span>
                                    <span className="transition group-open:rotate-180">
                                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                    </span>
                                </summary>
                                <div className="text-gray-600 mt-3 group-open:animate-fadeIn leading-relaxed">
                                    {faq.answer}
                                </div>
                            </details>
                        ))}
                    </div>

                    <div className="mt-12 text-center p-8 bg-purple-50 rounded-xl">
                        <h3 className="font-bold text-purple-900 mb-2">Still have questions?</h3>
                        <p className="text-purple-700 mb-4">Our support team is ready to help you.</p>
                        <a href="mailto:info@psp-k.com" className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition">Contact Us</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
