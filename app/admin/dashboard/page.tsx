'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

interface FeaturedPost {
  id: string
  title: string
  excerpt: string
  content: string
  image_url: string | null
  link_url: string | null
  is_featured: boolean
  is_published: boolean
  display_order: number
  published_at: string
  created_at: string
}

interface RegisteredUser {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  id_number: string
  date_of_birth: string
  gender: string
  county: string
  constituency: string
  ward: string
  physical_address: string | null
  disability_status: string | null
  is_kenyan_citizen: boolean
  not_member_of_other_party: boolean
  agree_to_constitution: boolean
  consent_to_data_processing: boolean
  created_at: string
  verification_status: 'pending' | 'approved' | 'rejected'
  membership_number: string | null
  verified_at: string | null
  rejection_reason: string | null
}

import SecuritySettings from '@/components/admin/SecuritySettings'

type TabType = 'posts' | 'users' | 'settings'
type UserFilter = 'all' | 'pending' | 'approved' | 'rejected'

export default function AdminDashboard() {
  const [posts, setPosts] = useState<FeaturedPost[]>([])
  const [users, setUsers] = useState<RegisteredUser[]>([])
  const [activeTab, setActiveTab] = useState<TabType>('posts')
  const [userFilter, setUserFilter] = useState<UserFilter>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)
  const [usersError, setUsersError] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [showRejectModal, setShowRejectModal] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState('')
  const router = useRouter()

  async function checkAuth() {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push('/admin/login')
      return
    }

    const { data: mfaData, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()

    if (!error && mfaData) {
      if (mfaData.currentLevel === 'aal1' && mfaData.nextLevel === 'aal2') {
        router.push('/admin/login')
        return
      }
    }

    setUser(user)
  }

  async function fetchPosts() {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('featured_posts')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching posts:', error)
        return
      }

      setPosts(data || [])
      setIsLoading(false)
    } catch (error) {
      console.error('Error:', error)
      setIsLoading(false)
    }
  }

  async function fetchUsers() {
    setIsLoadingUsers(true)
    try {
      const supabase = createClient()

      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching users:', error)
        const errorMsg = `Error: ${error.message}\n\nCode: ${error.code}`
        setUsersError(errorMsg)
        setIsLoadingUsers(false)
        return
      }

      setUsersError(null)
      setUsers(data || [])
      setIsLoadingUsers(false)
    } catch (error) {
      console.error('Exception fetching users:', error)
      const errorMsg = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      setUsersError(errorMsg)
      setIsLoadingUsers(false)
    }
  }

  useEffect(() => {
    checkAuth()
    fetchPosts()
  }, [])

  useEffect(() => {
    if (activeTab === 'users' && users.length === 0) {
      fetchUsers()
    }
  }, [activeTab, users.length])

  // Filter users based on selected filter
  const filteredUsers = users.filter(u => {
    if (userFilter === 'all') return true
    return u.verification_status === userFilter
  })

  // Count users by status
  const pendingCount = users.filter(u => u.verification_status === 'pending' || !u.verification_status).length
  const approvedCount = users.filter(u => u.verification_status === 'approved').length
  const rejectedCount = users.filter(u => u.verification_status === 'rejected').length

  async function handleApprove(userId: string) {
    if (!confirm('Approve this membership application? A membership number will be generated and the applicant will be notified.')) return

    setProcessingId(userId)
    try {
      const response = await fetch('/api/admin/verify-member', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          memberId: userId,
          action: 'approve'
        })
      })

      const data = await response.json()

      if (data.success) {
        // Refresh users list
        fetchUsers()
        alert(`Member approved! Membership Number: ${data.membershipNumber}`)
      } else {
        alert('Error: ' + (data.message || 'Failed to approve member'))
      }
    } catch (error) {
      alert('Error processing approval')
    } finally {
      setProcessingId(null)
    }
  }

  async function handleReject(userId: string) {
    if (!rejectReason.trim()) {
      alert('Please provide a reason for rejection')
      return
    }

    setProcessingId(userId)
    try {
      const response = await fetch('/api/admin/verify-member', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          memberId: userId,
          action: 'reject',
          reason: rejectReason
        })
      })

      const data = await response.json()

      if (data.success) {
        fetchUsers()
        setShowRejectModal(null)
        setRejectReason('')
        alert('Application rejected. The applicant has been notified.')
      } else {
        alert('Error: ' + (data.message || 'Failed to reject application'))
      }
    } catch (error) {
      alert('Error processing rejection')
    } finally {
      setProcessingId(null)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const supabase = createClient()
      const { error } = await supabase.from('featured_posts').delete().eq('id', id)

      if (error) {
        alert('Error deleting post: ' + error.message)
        return
      }

      fetchPosts()
    } catch (error) {
      alert('Error deleting post')
    }
  }

  async function handleTogglePublish(id: string, currentStatus: boolean) {
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('featured_posts')
        .update({ is_published: !currentStatus })
        .eq('id', id)

      if (error) {
        alert('Error updating post: ' + error.message)
        return
      }

      fetchPosts()
    } catch (error) {
      alert('Error updating post')
    }
  }

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage posts, members, and content</p>
          </div>
          <div className="flex gap-4">
            {activeTab === 'posts' && (
              <Link
                href="/admin/posts/new"
                className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                + New Post
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('posts')}
              className={`${activeTab === 'posts'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition`}
            >
              Featured Posts ({posts.length})
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`${activeTab === 'users'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition flex items-center gap-2`}
            >
              Members ({users.length || '...'})
              {pendingCount > 0 && (
                <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {pendingCount} pending
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`${activeTab === 'settings'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition`}
            >
              Settings
            </button>
          </nav>
        </div>

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <>
            {posts.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-600 mb-4">No posts yet. Create your first featured post!</p>
                <Link
                  href="/admin/posts/new"
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition inline-block"
                >
                  Create First Post
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {posts.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{post.title}</div>
                          {post.excerpt && (
                            <div className="text-sm text-gray-500 truncate max-w-md">{post.excerpt}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {post.is_published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.display_order}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(post.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleTogglePublish(post.id, post.is_published)}
                              className={`${post.is_published ? 'text-orange-600 hover:text-orange-900' : 'text-green-600 hover:text-green-900'}`}
                            >
                              {post.is_published ? 'Unpublish' : 'Publish'}
                            </button>
                            <Link href={`/admin/posts/${post.id}/edit`} className="text-blue-600 hover:text-blue-900">Edit</Link>
                            <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:text-red-900">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <>
            {usersError && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded">
                <div className="flex">
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-red-800">Error Loading Users</h3>
                    <div className="mt-2 text-sm text-red-700 whitespace-pre-line">{usersError}</div>
                  </div>
                </div>
              </div>
            )}

            {isLoadingUsers ? (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading members...</p>
              </div>
            ) : usersError ? null : (
              <>
                {/* Filter Tabs and Stats */}
                <div className="bg-white rounded-lg shadow mb-6">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setUserFilter('all')}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${userFilter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                          All ({users.length})
                        </button>
                        <button
                          onClick={() => setUserFilter('pending')}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${userFilter === 'pending' ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'}`}
                        >
                          Pending ({pendingCount})
                        </button>
                        <button
                          onClick={() => setUserFilter('approved')}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${userFilter === 'approved' ? 'bg-green-600 text-white' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}
                        >
                          Approved ({approvedCount})
                        </button>
                        <button
                          onClick={() => setUserFilter('rejected')}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${userFilter === 'rejected' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-700 hover:bg-red-100'}`}
                        >
                          Rejected ({rejectedCount})
                        </button>
                      </div>
                      <a
                        href="/api/admin/export-registrations"
                        className="inline-flex items-center px-4 py-2 border border-purple-600 text-sm font-medium rounded-lg text-purple-600 bg-white hover:bg-purple-50 transition"
                      >
                        Download CSV for ORPP/IEBC
                      </a>
                    </div>
                  </div>
                </div>

                {filteredUsers.length === 0 ? (
                  <div className="bg-white rounded-lg shadow p-12 text-center">
                    <p className="text-gray-600">No {userFilter === 'all' ? '' : userFilter} members found.</p>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Number</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Membership #</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredUsers.map((member) => (
                            <tr key={member.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {member.first_name} {member.last_name}
                                </div>
                                <div className="text-sm text-gray-500">{member.gender}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{member.email}</div>
                                <div className="text-sm text-gray-500">{member.phone}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 font-mono">{member.id_number}</div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm text-gray-900">{member.county}</div>
                                <div className="text-sm text-gray-500">{member.constituency}, {member.ward}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {(!member.verification_status || member.verification_status === 'pending') && (
                                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                                    Pending
                                  </span>
                                )}
                                {member.verification_status === 'approved' && (
                                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Approved
                                  </span>
                                )}
                                {member.verification_status === 'rejected' && (
                                  <div>
                                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                      Rejected
                                    </span>
                                    {member.rejection_reason && (
                                      <p className="text-xs text-red-600 mt-1 max-w-[150px] truncate" title={member.rejection_reason}>
                                        {member.rejection_reason}
                                      </p>
                                    )}
                                  </div>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {member.membership_number ? (
                                  <span className="text-sm font-mono font-semibold text-purple-600">
                                    {member.membership_number}
                                  </span>
                                ) : (
                                  <span className="text-sm text-gray-400">—</span>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                {(!member.verification_status || member.verification_status === 'pending') && (
                                  <div className="flex justify-end gap-2">
                                    <button
                                      onClick={() => handleApprove(member.id)}
                                      disabled={processingId === member.id}
                                      className="text-green-600 hover:text-green-900 disabled:opacity-50"
                                    >
                                      {processingId === member.id ? 'Processing...' : 'Approve'}
                                    </button>
                                    <button
                                      onClick={() => setShowRejectModal(member.id)}
                                      disabled={processingId === member.id}
                                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                    >
                                      Reject
                                    </button>
                                  </div>
                                )}
                                {member.verification_status === 'approved' && (
                                  <span className="text-gray-400 text-xs">
                                    Verified {member.verified_at ? new Date(member.verified_at).toLocaleDateString() : ''}
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="max-w-4xl mx-auto">
            <SecuritySettings />
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Reject Application</h3>
            <p className="text-sm text-gray-600 mb-4">
              Please provide a reason for rejecting this membership application. This will be sent to the applicant.
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Reason for rejection..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent mb-4"
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => { setShowRejectModal(null); setRejectReason(''); }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReject(showRejectModal)}
                disabled={processingId === showRejectModal || !rejectReason.trim()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {processingId === showRejectModal ? 'Processing...' : 'Reject Application'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
