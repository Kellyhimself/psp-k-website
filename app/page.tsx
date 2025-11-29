import Link from 'next/link'
import Image from 'next/image'
import HeroSlider from '@/components/HeroSlider'

export default function Home() {
  return (
    <div>
      {/* Hero Section with Dynamic Slider */}
      <HeroSlider />

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Our Mission</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              To build a government that listens, includes, and empowers every Kenyan. We are
              committed to creating a Kenya where every citizen's voice is heard, respected, and
              shapes the nation's destiny.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Our Vision</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              A Kenya where every citizen's voice is heard, respected, and shapes the nation's
              destiny. We envision a nation built on social liberation, equality, and prosperity
              for all.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">57M+</div>
              <div className="text-lg">Kenya's Estimated Population</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">20Y</div>
              <div className="text-lg">Median Age of Kenya's Population</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">45%</div>
              <div className="text-lg">Current Healthcare Access</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2.3%</div>
              <div className="text-lg">Annual Population Growth</div>
            </div>
          </div>
        </div>
      </section>

      {/* Group Photo Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Our Team</h2>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/groupPhoto.jpg"
                alt="PSP-K Team Members"
                width={1200}
                height={800}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">Join the Movement</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Become a part of the movement for a fair, just, and inclusive Kenya. Register with
            PSP-K today and help shape Kenya's future!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Register Now
            </Link>
            <Link
              href="/volunteer"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Volunteer
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
