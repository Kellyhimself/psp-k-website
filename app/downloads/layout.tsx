import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Downloads | People Salvation Party of Kenya',
  description: 'Download PSP-K official documents including manifesto, ideology, and party resources.',
}

export default function DownloadsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

