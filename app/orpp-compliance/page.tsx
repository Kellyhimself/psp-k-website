import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ORPPCompliancePage() {
    return (
        <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-neutral-900">
            <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 shadow-sm rounded-xl">
                <h1 className="text-3xl font-bold text-primary-900 mb-8 border-b pb-4">ORPP Compliance & Membership</h1>

                <section className="mb-8 flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-1">
                        <h2 className="text-2xl font-semibold mb-4 text-primary-800">Office of the Registrar of Political Parties</h2>
                        <p className="mb-4 text-neutral-700 leading-relaxed">
                            The People Salvation Party of Kenya (PSP-K) operates in full compliance with the Political Parties Act and the regulations set forth by the Office of the Registrar of Political Parties (ORPP).
                        </p>
                        <p className="mb-4 text-neutral-700 leading-relaxed">
                            We are committed to transparent, lawful, and inclusive political participation for all Kenyans.
                        </p>
                    </div>
                    {/* Placeholder for ORPP Logo if available in assets, otherwise generic icon or empty */}
                    <div className="w-full md:w-1/3 min-h-[150px] bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-400 text-sm border-2 border-dashed border-neutral-200">
                        ORPP Logo / Banner
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-primary-800">Alternative Registration Methods</h2>
                    <p className="mb-4 text-neutral-700 leading-relaxed">
                        In addition to our website registration, you can check your membership status or register via the official government channels:
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div className="bg-green-50 p-6 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-green-900 text-lg mb-2">USSD *509#</h3>
                            <p className="text-green-800 mb-4">
                                Dial *509# on your mobile phone to access the Political Parties Membership services directly.
                            </p>
                            <ul className="text-sm text-green-700 list-disc pl-4 space-y-1">
                                <li>Check your current party membership</li>
                                <li>Resign from a party</li>
                                <li>Register as a member</li>
                            </ul>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-blue-900 text-lg mb-2">ORPP Portal</h3>
                            <p className="text-blue-800 mb-4">
                                Visit the ORPP Integrated Political Parties Management System (IPPMS) for comprehensive services.
                            </p>
                            <a
                                href="https://orpp.or.ke/index.php/en/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
                            >
                                Visit ORPP Website &rarr;
                            </a>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-primary-800">Our Commitments</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-4 border rounded-lg bg-white">
                            <h4 className="font-bold text-neutral-900 mb-2">Inclusivity</h4>
                            <p className="text-sm text-neutral-600">Compliance with the Two-Thirds Gender Rule and inclusion of Special Interest Groups (Youth, Women, PWDs).</p>
                        </div>
                        <div className="p-4 border rounded-lg bg-white">
                            <h4 className="font-bold text-neutral-900 mb-2">Data Privacy</h4>
                            <p className="text-sm text-neutral-600">Adherence to the Data Protection Act in handling all member information.</p>
                        </div>
                        <div className="p-4 border rounded-lg bg-white">
                            <h4 className="font-bold text-neutral-900 mb-2">Transparency</h4>
                            <p className="text-sm text-neutral-600">Open publication of party notices, financial reports, and list of officials.</p>
                        </div>
                    </div>
                </section>

                <div className="mt-8 pt-6 border-t flex justify-between items-center text-sm text-neutral-500">
                    <Link href="/register" className="text-primary-600 font-semibold hover:underline">Join PSP-K Now</Link>
                    <Link href="/" className="hover:text-primary-700 transition-colors">Return to Home</Link>
                </div>
            </div>
        </div>
    );
}
