'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

interface VideoUploadProps {
  onUploadComplete: (url: string) => void
  currentVideoUrl?: string
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\n?#]+)/)
  return match ? match[1] : null
}

function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  return match ? match[1] : null
}

function isEmbedUrl(url: string): boolean {
  return !!(getYouTubeId(url) || getVimeoId(url))
}

export default function VideoUpload({ onUploadComplete, currentVideoUrl }: VideoUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string>(currentVideoUrl || '')
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const ytId = videoUrl ? getYouTubeId(videoUrl) : null
  const vimeoId = videoUrl ? getVimeoId(videoUrl) : null
  const isDirectFile = videoUrl && !ytId && !vimeoId

  const handleDragEnter = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true) }
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false) }
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault() }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files && files.length > 0) handleFile(files[0])
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) handleFile(files[0])
  }

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('video/')) {
      setError('Please select a video file (MP4, MOV, WebM, etc.)')
      return
    }
    // Supabase free tier max is 50 MB
    if (file.size > 50 * 1024 * 1024) {
      setError('Video must be under 50 MB. For larger videos, upload to YouTube and paste the URL below.')
      return
    }

    setError(null)
    setIsUploading(true)
    setUploadProgress(10)

    try {
      const supabase = createClient()
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `featured-posts/${fileName}`

      setUploadProgress(30)

      const { error: uploadError } = await supabase.storage
        .from('featured-post-videos')
        .upload(filePath, file, { cacheControl: '3600', upsert: false })

      if (uploadError) throw uploadError

      setUploadProgress(90)

      const { data: { publicUrl } } = supabase.storage
        .from('featured-post-videos')
        .getPublicUrl(filePath)

      setVideoUrl(publicUrl)
      onUploadComplete(publicUrl)
      setUploadProgress(100)
    } catch (err: any) {
      setError(err.message || 'Upload failed. Please try again.')
      setVideoUrl('')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleUrlChange = (url: string) => {
    setVideoUrl(url)
    onUploadComplete(url)
    setError(null)
  }

  const handleRemove = () => {
    setVideoUrl('')
    onUploadComplete('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="space-y-4">

      {/* Drop zone — only shown when no video is set */}
      {!videoUrl && (
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition
            ${isDragging ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'}
            ${isUploading ? 'pointer-events-none opacity-60' : ''}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/mov,video/quicktime,video/webm,video/avi"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isUploading}
          />

          {isUploading ? (
            <div className="space-y-3">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600 mx-auto" />
              <p className="text-sm text-gray-600">Uploading video… {uploadProgress}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-gray-400">Large files may take a moment</p>
            </div>
          ) : (
            <div className="space-y-2">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M15 10l4.553-2.07A1 1 0 0121 8.845v6.31a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
              </svg>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-purple-600">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">MP4, MOV, WebM up to 50 MB</p>
              <p className="text-xs text-gray-400">For videos larger than 50 MB, use the YouTube URL option below</p>
            </div>
          )}
        </div>
      )}

      {/* Preview */}
      {videoUrl && (
        <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-50 relative">
          {ytId && (
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${ytId}`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube preview"
              />
            </div>
          )}
          {vimeoId && (
            <div className="aspect-video">
              <iframe
                src={`https://player.vimeo.com/video/${vimeoId}`}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Vimeo preview"
              />
            </div>
          )}
          {isDirectFile && (
            <video
              src={videoUrl}
              controls
              className="w-full max-h-64 bg-black"
            />
          )}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition shadow"
            aria-label="Remove video"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
          {error}
        </div>
      )}

      {/* YouTube / Vimeo URL input */}
      <div className="border-t pt-4">
        <p className="text-sm font-medium text-gray-700 mb-1">
          {videoUrl ? 'Video URL' : 'Or paste a YouTube / Vimeo URL'}
        </p>
        <input
          type="url"
          value={videoUrl}
          onChange={e => handleUrlChange(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
        />
        <p className="mt-1 text-xs text-gray-400">
          YouTube and Vimeo URLs are embedded directly — no upload needed
        </p>
      </div>
    </div>
  )
}
