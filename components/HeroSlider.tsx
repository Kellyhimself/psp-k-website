'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface FeaturedPost {
  id: string
  title: string
  excerpt: string | null
  content: string | null
  image_url: string | null
  video_url: string | null
  link_url: string | null
  published_at: string | null
}

function getYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\n?#]+)/)
  return m ? m[1] : null
}

function getVimeoId(url: string): string | null {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  return m ? m[1] : null
}

export default function HeroSlider() {
  const [posts, setPosts] = useState<FeaturedPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activePost, setActivePost] = useState<FeaturedPost | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchFeaturedPosts()
  }, [])

  // Close modal on Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setActivePost(null)
  }, [])

  useEffect(() => {
    if (activePost) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [activePost, handleKeyDown])

  async function fetchFeaturedPosts() {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('featured_posts')
        .select('id, title, excerpt, content, image_url, video_url, link_url, published_at')
        .eq('is_published', true)
        .eq('is_featured', true)
        .order('display_order', { ascending: true })
        .order('published_at', { ascending: false })
        .limit(10)

      if (!error && data && data.length > 0) setPosts(data)
      setIsLoading(false)
    } catch {
      setIsLoading(false)
    }
  }

  function scroll(direction: 'left' | 'right') {
    if (!scrollRef.current) return
    const amount = scrollRef.current.clientWidth * 0.75
    scrollRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <>
      {/* ── Static gradient hero ─────────────────────────────── */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-700 to-green-700 text-white py-24 min-h-[52vh] flex items-center">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm uppercase tracking-widest text-white/70 mb-3 font-medium">Meli ya Ukombozi</p>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-5 leading-tight">
            People Salvation<br className="hidden md:block" /> Party of Kenya
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-white/85 leading-relaxed">
            Empowering Every Citizen. Join us in building a Kenya where every voice matters
            and every dream has the opportunity to become reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-purple-700 px-9 py-3 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg"
            >
              Register as Member
            </Link>
            <Link
              href="/volunteer"
              className="border-2 border-white text-white px-9 py-3 rounded-lg font-bold hover:bg-white hover:text-purple-700 transition"
            >
              Join as Volunteer
            </Link>
          </div>
        </div>
      </section>

      {/* ── Latest Updates scrollable strip ──────────────────── */}
      {!isLoading && posts.length > 0 && (
        <section className="py-10 bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4">

            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Latest Updates</h2>
                <p className="text-sm text-gray-500 mt-0.5">News, events &amp; announcements</p>
              </div>
              {posts.length > 3 && (
                <div className="flex gap-2">
                  <button
                    onClick={() => scroll('left')}
                    aria-label="Scroll left"
                    className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => scroll('right')}
                    aria-label="Scroll right"
                    className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {posts.map(post => (
                <article key={post.id} className="flex-shrink-0 w-64 sm:w-72 snap-start">
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow h-full flex flex-col">

                    {/* Clickable thumbnail — always opens the lightbox */}
                    <button
                      onClick={() => setActivePost(post)}
                      className="relative block w-full bg-gray-50 group focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                      style={{ aspectRatio: '3/2' }}
                      aria-label={`View details for ${post.title}`}
                    >
                      {/* Image or video thumbnail */}
                      {post.image_url ? (
                        <Image
                          src={post.image_url}
                          alt={post.title}
                          fill
                          className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                          sizes="(max-width: 640px) 256px, 288px"
                        />
                      ) : post.video_url && getYouTubeId(post.video_url) ? (
                        <Image
                          src={`https://img.youtube.com/vi/${getYouTubeId(post.video_url)}/mqdefault.jpg`}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          sizes="(max-width: 640px) 256px, 288px"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-50 to-green-50">
                          <span className="text-purple-300 text-xs font-semibold tracking-widest uppercase">PSP-K</span>
                        </div>
                      )}

                      {/* Play badge for video posts */}
                      {post.video_url && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="bg-black/60 group-hover:bg-black/75 text-white rounded-full w-10 h-10 flex items-center justify-center transition shadow-lg">
                            <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </span>
                        </span>
                      )}

                      {/* Zoom hint on hover (image-only posts) */}
                      {!post.video_url && (
                        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                          <span className="bg-white/90 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0zM11 8v6M8 11h6" />
                            </svg>
                            View
                          </span>
                        </span>
                      )}
                    </button>

                    {/* Text */}
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 mb-1">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-xs text-gray-500 line-clamp-2 flex-1">{post.excerpt}</p>
                      )}
                      <div className="mt-3 flex items-center gap-3">
                        {/* Always: open lightbox */}
                        <button
                          onClick={() => setActivePost(post)}
                          className="text-xs font-semibold text-purple-600 hover:text-purple-800 hover:underline"
                        >
                          Read more →
                        </button>
                        {/* If external/internal link also available */}
                        {post.link_url && (
                          <Link
                            href={post.link_url}
                            className="text-xs text-gray-400 hover:text-gray-600 hover:underline"
                          >
                            Visit page ↗
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Lightbox Modal ───────────────────────────────────── */}
      {activePost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          onClick={() => setActivePost(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activePost.title}
        >
          <div
            className="relative bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActivePost(null)}
              className="absolute top-3 right-3 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Media: video takes priority over image if both are set */}
            {activePost.video_url ? (
              (() => {
                const ytId = getYouTubeId(activePost.video_url!)
                const vimeoId = getVimeoId(activePost.video_url!)
                if (ytId) return (
                  <div className="w-full flex-shrink-0 bg-black" style={{ aspectRatio: '16/9' }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={activePost.title}
                    />
                  </div>
                )
                if (vimeoId) return (
                  <div className="w-full flex-shrink-0 bg-black" style={{ aspectRatio: '16/9' }}>
                    <iframe
                      src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1`}
                      className="w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      title={activePost.title}
                    />
                  </div>
                )
                return (
                  <div className="w-full flex-shrink-0 bg-black">
                    <video
                      src={activePost.video_url!}
                      controls
                      autoPlay
                      className="w-full max-h-[50vh]"
                    />
                  </div>
                )
              })()
            ) : activePost.image_url ? (
              <div className="relative w-full bg-gray-900 flex-shrink-0" style={{ aspectRatio: '3/2' }}>
                <Image
                  src={activePost.image_url}
                  alt={activePost.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 768px"
                  quality={95}
                  priority
                />
              </div>
            ) : null}

            {/* Post details — scrollable if content is long */}
            <div className="overflow-y-auto flex-1 px-6 py-5">
              <h2 className="text-xl font-bold text-gray-900 leading-snug mb-3">
                {activePost.title}
              </h2>

              {activePost.published_at && (
                <p className="text-xs text-gray-400 mb-3">
                  {new Date(activePost.published_at).toLocaleDateString('en-KE', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </p>
              )}

              {activePost.excerpt && (
                <p className="text-base text-gray-600 mb-4 leading-relaxed font-medium">
                  {activePost.excerpt}
                </p>
              )}

              {activePost.content && (
                <div className="prose prose-sm prose-gray max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                  {activePost.content}
                </div>
              )}

              {activePost.link_url && (
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <Link
                    href={activePost.link_url}
                    className="inline-flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-purple-700 transition"
                    onClick={() => setActivePost(null)}
                  >
                    Visit page
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
