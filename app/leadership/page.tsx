import Image from 'next/image'

export const metadata = {
  title: 'Leadership | People Salvation Party of Kenya',
  description: 'Meet the leadership team of PSP-K.',
}

export default function LeadershipPage() {
  const leaders = [
    {
      name: 'Simon Wakwabubi Wanyonyi',
      role: 'Party Leader & Founder',
      description:
        'Founder and leader of People Salvation Party of Kenya, committed to social liberation and democratic governance.',
    },
  ]

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-800">
            Our Leadership
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leaders.map((leader, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition"
              >
                <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden border-4 border-purple-600">
                  <Image
                    src="/images/leader.jpg"
                    alt={leader.name}
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-center mb-2 text-gray-800">
                  {leader.name}
                </h3>
                <p className="text-purple-600 text-center font-semibold mb-4">{leader.role}</p>
                <p className="text-gray-600 text-center">{leader.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600 mb-4">
              Our leadership reflects Kenya's diversity and youthful energy, ensuring that no one
              is left behind.
            </p>
            <p className="text-gray-500">
              More leadership positions will be announced as the party structure develops.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

