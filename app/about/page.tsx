import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'About Us | People Salvation Party of Kenya',
  description: 'Learn about PSP-K, our mission, values, and commitment to building a better Kenya.',
}

export default function AboutPage() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800">About PSP-K</h1>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-purple-600">Who We Are</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              People Salvation Party of Kenya (PSP-K) is a national grassroots social liberal
              party that aims to achieve good governance for economic prosperity and social
              justice. Founded in November 2024, PSP-K is a party of patriots from all walks of
              life united by the belief that every citizen deserves to be heard and respected.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Guided by our philosophy "Meli ya Ukombozi" (Ship of Liberation), we are committed
              to building a government that listens deliberately, acts purposefully, and includes
              every voice in shaping the nation's future.
            </p>
            <div className="rounded-lg overflow-hidden shadow-lg mt-6">
              <Image
                src="/images/groupPhoto.jpg"
                alt="PSP-K Team Members"
                width={1000}
                height={667}
                className="w-full h-auto"
              />
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-purple-600">Our Ideology</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              PSP-K is a social liberal party that believes in the principle of sovereignty of the
              people of Kenya, as anchored in the Constitution. We will faithfully implement
              programs that nurture and support individuals, social development, restore sanity in
              the management of the economy and public affairs of our Nation, and maintain fidelity
              to our constitution.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Political Position:</strong> Center Left
              <br />
              <strong>Ideology:</strong> Social Liberation
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-purple-600">Party Colors</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-purple-600 rounded"></div>
                <div>
                  <h3 className="font-semibold text-lg">Purple</h3>
                  <p className="text-gray-700">
                    Represents a mix of different ideologies and progressive liberal movements,
                    mixing the best ideas that are necessary to move our country forward.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-green-600 rounded"></div>
                <div>
                  <h3 className="font-semibold text-lg">Green</h3>
                  <p className="text-gray-700">
                    Symbolizes our abundance of nature, good health and vitality, harmony and
                    prosperity desirable for all Kenyans.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white border-2 border-gray-300 rounded"></div>
                <div>
                  <h3 className="font-semibold text-lg">White</h3>
                  <p className="text-gray-700">
                    Illuminates new beginning of political purity and peace.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-purple-600">Our Values</h2>
            <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
              <li>Supremacy of Party members</li>
              <li>Social and economic justice</li>
              <li>Respect for constitutionalism and the rule of law</li>
              <li>Respect for individual and people's rights and freedoms</li>
              <li>Freedom with responsibility</li>
              <li>Transparency and accountability</li>
              <li>Zero tolerance to corruption</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-purple-600">Our Commitment</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              PSP-K stands for integrity, justice, equity, and the restoration of dignity for all,
              working tirelessly for a Kenya where hope, opportunity, and unity thrive. Our
              leadership reflects Kenya's diversity and youthful energy, and our structures ensure
              that no one is left behind.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We are committed to work with all Kenyans to develop a National Identity that
              includes the collective aspirations and values of our people, considering our
              diversity, and is rooted in the philosophy of Pan-Africanism and the integration of
              our region and continent.
            </p>
          </section>

          {/* Documents Section */}
          <section className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-purple-600">Party Documents</h2>
            <p className="text-lg text-gray-700 mb-6">
              Download our official party documents to learn more about our ideology, manifesto,
              and vision for Kenya.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <a
                href="/documents/ideology.pdf"
                download="PSP-K-Ideology.pdf"
                className="flex items-center justify-between bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border-2 border-purple-200 hover:border-purple-600"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Party Ideology</h3>
                  <p className="text-gray-600">PSP-K Ideology Document</p>
                  <p className="text-sm text-gray-500 mt-1">September 15, 2024</p>
                </div>
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </a>
              <a
                href="/documents/manifesto.pdf"
                download="PSP-K-Manifesto.pdf"
                className="flex items-center justify-between bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border-2 border-green-200 hover:border-green-600"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Party Manifesto</h3>
                  <p className="text-gray-600">PSP-K Manifesto 2025</p>
                  <p className="text-sm text-gray-500 mt-1">September 15, 2025</p>
                </div>
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </a>
            </div>
            <div className="text-center">
              <Link
                href="/downloads"
                className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                View All Downloads →
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

