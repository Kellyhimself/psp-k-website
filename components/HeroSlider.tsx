'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface FeaturedPost {
  id: string
  title: string
  excerpt: string
  image_url: string | null
  link_url: string | null
}

export default function HeroSlider() {
  const [posts, setPosts] = useState<FeaturedPost[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedPosts()
  }, [])

  useEffect(() => {
    if (posts.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % posts.length)
      }, 8000) // Change slide every 5 seconds

      return () => clearInterval(interval)
    }
  }, [posts.length])

  async function fetchFeaturedPosts() {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('featured_posts')
        .select('id, title, excerpt, image_url, link_url')
        .eq('is_published', true)
        .eq('is_featured', true)
        .order('display_order', { ascending: true })
        .order('published_at', { ascending: false })
        .limit(5)

      if (error) {
        console.error('Error fetching featured posts:', error)
        // Fallback to default hero if no posts
        setIsLoading(false)
        return
      }

      if (data && data.length > 0) {
        setPosts(data)
      }
      setIsLoading(false)
    } catch (error) {
      console.error('Error:', error)
      setIsLoading(false)
    }
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % posts.length)
  }

  // Default hero content if no featured posts
  const defaultHero = {
    title: 'People Salvation Party of Kenya',
    subtitle: 'Meli ya Ukombozi',
    description:
      'Empowering Every Citizen. Join us in building a Kenya where every voice matters and every dream has the opportunity to become reality.',
  }

  // If loading or no posts, show default hero
  if (isLoading || posts.length === 0) {
    return (
      <section className="relative bg-gradient-to-r from-purple-600 via-green-600 to-white text-white py-20 min-h-[500px] flex items-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{defaultHero.title}</h1>
          <p className="text-2xl md:text-3xl mb-4">{defaultHero.subtitle}</p>
          <p className="text-xl mb-8 max-w-3xl mx-auto">{defaultHero.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Register
            </Link>
            <Link
              href="/volunteer"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition"
            >
              Join Volunteer
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const currentPost = posts[currentIndex]

  return (
    <section className="relative bg-gradient-to-r from-purple-600 via-green-600 to-white text-white min-h-[500px] flex items-center overflow-hidden">
      {/* Background Image Overlay */}
      {currentPost.image_url && (
        <div className="absolute inset-0 z-0">
          <Image
            src={currentPost.image_url}
            alt={currentPost.title}
            fill
            className="object-cover"
            priority={currentIndex === 0}
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/60 via-green-500/50 to-purple-500/70"></div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            {currentPost.title}
          </h1>
          {currentPost.excerpt && (
            <p className="text-xl md:text-2xl mb-6 drop-shadow-md">{currentPost.excerpt}</p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {currentPost.link_url ? (
              <Link
                href={currentPost.link_url}
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
              >
                Learn More
              </Link>
            ) : (
              <>
                <Link
                  href="/register"
                  className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Register
                </Link>
                <Link
                  href="/volunteer"
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition"
                >
                  Join Volunteer
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {posts.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition backdrop-blur-sm"
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {posts.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {posts.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentIndex
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}

