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
  identity_type: string
  id_number: string
  date_of_birth: string
  gender: string
  religion: string | null
  ethnicity: string | null
  county: string
  constituency: string
  ward: string
  special_interest_groups: string[] | null
  disability_status: string | null
  pwd_number: string | null
  not_member_of_other_party: boolean
  consent_to_data_processing: boolean
  consent_to_image_use: boolean
  created_at: string
  verification_status: 'pending' | 'approved' | 'rejected'
  membership_number: string | null
  verified_at: string | null
  rejection_reason: string | null
}

import SecuritySettings from '@/components/admin/SecuritySettings'

type TabType = 'posts' | 'users' | 'admins' | 'settings'
type UserFilter = 'all' | 'pending' | 'approved' | 'rejected'

interface AdminProfile {
  id: string
  user_id: string
  email: string
  display_name: string | null
  role: 'content_admin' | 'super_admin'
  created_at: string
}

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
  const [selectedMember, setSelectedMember] = useState<RegisteredUser | null>(null)
  const [rejectInDetail, setRejectInDetail] = useState(false)
  const [rejectReasonDetail, setRejectReasonDetail] = useState('')
  const [adminRole, setAdminRole] = useState<'content_admin' | 'super_admin' | null>(null)
  const [adminUnconfigured, setAdminUnconfigured] = useState(false)
  const [adminsList, setAdminsList] = useState<AdminProfile[]>([])
  const [isLoadingAdmins, setIsLoadingAdmins] = useState(false)
  const [showAddAdminForm, setShowAddAdminForm] = useState(false)
  const [newAdminForm, setNewAdminForm] = useState({ email: '', displayName: '', role: 'content_admin', password: '' })
  const [adminFormError, setAdminFormError] = useState('')
  const [adminFormLoading, setAdminFormLoading] = useState(false)
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

    const { data: profile } = await supabase
      .from('admin_profiles')
      .select('role')
      .eq('user_id', user.id)
      .maybeSingle()

    if (!profile) {
      setAdminRole('super_admin')
      setAdminUnconfigured(true)
    } else {
      setAdminRole(profile.role as 'content_admin' | 'super_admin')
    }
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

  useEffect(() => {
    if (activeTab === 'admins') fetchAdmins()
  }, [activeTab])

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

  function openMemberDetail(member: RegisteredUser) {
    setSelectedMember(member)
    setRejectInDetail(false)
    setRejectReasonDetail('')
  }

  function closeMemberDetail() {
    setSelectedMember(null)
    setRejectInDetail(false)
    setRejectReasonDetail('')
  }

  async function handleApproveFromDetail() {
    if (!selectedMember) return
    if (!confirm('Approve this membership application? A membership number will be generated and the applicant will be notified.')) return

    setProcessingId(selectedMember.id)
    try {
      const response = await fetch('/api/admin/verify-member', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId: selectedMember.id, action: 'approve' })
      })
      const data = await response.json()
      if (data.success) {
        fetchUsers()
        closeMemberDetail()
        alert(`Member approved! Membership Number: ${data.membershipNumber}`)
      } else {
        alert('Error: ' + (data.message || 'Failed to approve member'))
      }
    } catch {
      alert('Error processing approval')
    } finally {
      setProcessingId(null)
    }
  }

  async function handleRejectFromDetail() {
    if (!selectedMember || !rejectReasonDetail.trim()) return

    setProcessingId(selectedMember.id)
    try {
      const response = await fetch('/api/admin/verify-member', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId: selectedMember.id, action: 'reject', reason: rejectReasonDetail })
      })
      const data = await response.json()
      if (data.success) {
        fetchUsers()
        closeMemberDetail()
        alert('Application rejected. The applicant has been notified.')
      } else {
        alert('Error: ' + (data.message || 'Failed to reject application'))
      }
    } catch {
      alert('Error processing rejection')
    } finally {
      setProcessingId(null)
    }
  }

  async function fetchAdmins() {
    setIsLoadingAdmins(true)
    try {
      const response = await fetch('/api/admin/manage-admins')
      const data = await response.json()
      if (data.success) setAdminsList(data.admins)
    } catch {
      console.error('Error fetching admins')
    } finally {
      setIsLoadingAdmins(false)
    }
  }

  async function handleUpdateRole(userId: string, newRole: string) {
    try {
      const response = await fetch('/api/admin/manage-admins', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role: newRole }),
      })
      const data = await response.json()
      if (data.success) fetchAdmins()
      else alert('Error: ' + data.message)
    } catch {
      alert('Error updating role')
    }
  }

  async function handleRemoveAdmin(userId: string) {
    if (!confirm('Remove this admin? They will no longer be able to log in.')) return
    try {
      const response = await fetch('/api/admin/manage-admins', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })
      const data = await response.json()
      if (data.success) fetchAdmins()
      else alert('Error: ' + data.message)
    } catch {
      alert('Error removing admin')
    }
  }

  async function handleAddAdmin() {
    if (!newAdminForm.email || !newAdminForm.password) {
      setAdminFormError('Email and password are required')
      return
    }
    setAdminFormLoading(true)
    setAdminFormError('')
    try {
      const response = await fetch('/api/admin/manage-admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAdminForm),
      })
      const data = await response.json()
      if (data.success) {
        setShowAddAdminForm(false)
        setNewAdminForm({ email: '', displayName: '', role: 'content_admin', password: '' })
        fetchAdmins()
      } else {
        setAdminFormError(data.message || 'Error creating admin')
      }
    } catch {
      setAdminFormError('An unexpected error occurred')
    } finally {
      setAdminFormLoading(false)
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

  const isSuperAdmin = adminRole === 'super_admin'

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">

        {adminUnconfigured && (
          <div className="mb-6 bg-yellow-50 border border-yellow-300 rounded-lg px-5 py-3 flex items-start gap-3">
            <svg className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
            </svg>
            <div className="text-sm">
              <p className="font-semibold text-yellow-800">Admin roles not configured yet</p>
              <p className="text-yellow-700 mt-0.5">
                You have temporary Super Admin access. Go to the <button onClick={() => setActiveTab('admins')} className="underline font-medium">Admins tab</button> to set up role-based access for your team.
              </p>
            </div>
          </div>
        )}

        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Manage posts, members, and content
              {adminRole && (
                <span className={`ml-3 px-2 py-0.5 text-xs font-semibold rounded-full ${isSuperAdmin ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                  {isSuperAdmin ? 'Super Admin' : 'Content Admin'}
                </span>
              )}
            </p>
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
            {isSuperAdmin && (
              <button
                onClick={() => setActiveTab('admins')}
                className={`${activeTab === 'admins'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition`}
              >
                Admins ({adminsList.length || '...'})
              </button>
            )}
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
                            {isSuperAdmin && (
                              <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:text-red-900">Delete</button>
                            )}
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
                                <div className="flex justify-end items-center gap-2">
                                  <button
                                    onClick={() => openMemberDetail(member)}
                                    className="text-purple-600 hover:text-purple-900 font-medium"
                                  >
                                    View
                                  </button>
                                  {(!member.verification_status || member.verification_status === 'pending') && (
                                    <>
                                      <span className="text-gray-300">|</span>
                                      <button
                                        onClick={() => handleApprove(member.id)}
                                        disabled={processingId === member.id}
                                        className="text-green-600 hover:text-green-900 disabled:opacity-50"
                                      >
                                        {processingId === member.id ? 'Processing...' : 'Approve'}
                                      </button>
                                      {isSuperAdmin && (
                                        <button
                                          onClick={() => setShowRejectModal(member.id)}
                                          disabled={processingId === member.id}
                                          className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                        >
                                          Reject
                                        </button>
                                      )}
                                    </>
                                  )}
                                  {member.verification_status === 'approved' && (
                                    <span className="text-gray-400 text-xs">
                                      Verified {member.verified_at ? new Date(member.verified_at).toLocaleDateString() : ''}
                                    </span>
                                  )}
                                </div>
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

        {/* Admins Tab */}
        {activeTab === 'admins' && isSuperAdmin && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Admin Users</h2>
                <p className="text-sm text-gray-500 mt-1">Manage who can access this dashboard and what they can do.</p>
              </div>
              <button
                onClick={() => setShowAddAdminForm(v => !v)}
                className="bg-purple-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition"
              >
                {showAddAdminForm ? 'Cancel' : '+ Add Admin'}
              </button>
            </div>

            {/* Role Legend */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 font-semibold rounded-full text-xs">Super Admin</span>
                <p className="text-gray-600 mt-1">Full access — approve/reject members, delete posts, manage documents, manage admins.</p>
              </div>
              <div>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 font-semibold rounded-full text-xs">Content Admin</span>
                <p className="text-gray-600 mt-1">View members, view documents, write posts. Cannot approve members or delete anything.</p>
              </div>
            </div>

            {/* Add Admin Form */}
            {showAddAdminForm && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                <h3 className="font-semibold text-gray-900">New Admin</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Email *</label>
                    <input
                      type="email"
                      value={newAdminForm.email}
                      onChange={e => setNewAdminForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="admin@psp-kenya.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Display Name</label>
                    <input
                      type="text"
                      value={newAdminForm.displayName}
                      onChange={e => setNewAdminForm(f => ({ ...f, displayName: e.target.value }))}
                      placeholder="e.g. Jane Mwangi"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Temporary Password *</label>
                    <input
                      type="password"
                      value={newAdminForm.password}
                      onChange={e => setNewAdminForm(f => ({ ...f, password: e.target.value }))}
                      placeholder="Min. 8 characters"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Role *</label>
                    <select
                      value={newAdminForm.role}
                      onChange={e => setNewAdminForm(f => ({ ...f, role: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="content_admin">Content Admin</option>
                      <option value="super_admin">Super Admin</option>
                    </select>
                  </div>
                </div>
                {adminFormError && (
                  <p className="text-sm text-red-600">{adminFormError}</p>
                )}
                <div className="flex justify-end">
                  <button
                    onClick={handleAddAdmin}
                    disabled={adminFormLoading}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 disabled:opacity-50"
                  >
                    {adminFormLoading ? 'Creating...' : 'Create Admin'}
                  </button>
                </div>
              </div>
            )}

            {/* Admins List */}
            {isLoadingAdmins ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
              </div>
            ) : adminsList.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-500 text-sm">
                No admin profiles configured yet. Click <strong>+ Add Admin</strong> to get started.
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-100">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Admin</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Added</th>
                      <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {adminsList.map(admin => (
                      <tr key={admin.id} className="hover:bg-gray-50">
                        <td className="px-5 py-4">
                          <p className="text-sm font-medium text-gray-900">{admin.display_name || '—'}</p>
                          <p className="text-xs text-gray-500">{admin.email}</p>
                        </td>
                        <td className="px-5 py-4">
                          <select
                            value={admin.role}
                            onChange={e => handleUpdateRole(admin.user_id, e.target.value)}
                            className={`text-xs font-semibold rounded-full px-2 py-1 border-0 cursor-pointer focus:ring-2 focus:ring-purple-500 ${admin.role === 'super_admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}
                          >
                            <option value="content_admin">Content Admin</option>
                            <option value="super_admin">Super Admin</option>
                          </select>
                        </td>
                        <td className="px-5 py-4 text-xs text-gray-500">
                          {new Date(admin.created_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button
                            onClick={() => handleRemoveAdmin(admin.user_id)}
                            className="text-xs text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="max-w-4xl mx-auto">
            <SecuritySettings />
          </div>
        )}
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">

            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedMember.last_name}, {selectedMember.first_name}
                </h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm text-gray-500">
                    Applied {new Date(selectedMember.created_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                  {(!selectedMember.verification_status || selectedMember.verification_status === 'pending') && (
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-100 text-amber-800">Pending Review</span>
                  )}
                  {selectedMember.verification_status === 'approved' && (
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800">Approved</span>
                  )}
                  {selectedMember.verification_status === 'rejected' && (
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-red-100 text-red-800">Rejected</span>
                  )}
                </div>
              </div>
              <button onClick={closeMemberDetail} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>

            {/* Modal Body — scrollable */}
            <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">

              {/* Identity */}
              <section>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Identity</h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  <div>
                    <p className="text-xs text-gray-500">ID Type</p>
                    <p className="text-sm font-medium text-gray-900">{selectedMember.identity_type || 'National ID'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{selectedMember.identity_type === 'Passport' ? 'Passport Number' : 'National ID Number'}</p>
                    <p className="text-sm font-mono font-semibold text-gray-900">{selectedMember.id_number}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Date of Birth</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(selectedMember.date_of_birth).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}
                      {' '}
                      <span className="text-gray-400 font-normal">
                        (Age {Math.floor((Date.now() - new Date(selectedMember.date_of_birth).getTime()) / (1000 * 60 * 60 * 24 * 365.25))})
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Sex</p>
                    <p className="text-sm font-medium text-gray-900">{selectedMember.gender}</p>
                  </div>
                  {selectedMember.religion && (
                    <div>
                      <p className="text-xs text-gray-500">Religion</p>
                      <p className="text-sm font-medium text-gray-900">{selectedMember.religion}</p>
                    </div>
                  )}
                  {selectedMember.ethnicity && (
                    <div>
                      <p className="text-xs text-gray-500">Ethnicity</p>
                      <p className="text-sm font-medium text-gray-900">{selectedMember.ethnicity}</p>
                    </div>
                  )}
                </div>
              </section>

              <hr className="border-gray-100" />

              {/* Contact */}
              <section>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Contact</h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-900 break-all">{selectedMember.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-medium text-gray-900">{selectedMember.phone}</p>
                  </div>
                </div>
              </section>

              <hr className="border-gray-100" />

              {/* Location */}
              <section>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Location</h3>
                <div className="grid grid-cols-3 gap-x-6 gap-y-3">
                  <div>
                    <p className="text-xs text-gray-500">County</p>
                    <p className="text-sm font-medium text-gray-900">{selectedMember.county}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Constituency</p>
                    <p className="text-sm font-medium text-gray-900">{selectedMember.constituency}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Ward</p>
                    <p className="text-sm font-medium text-gray-900">{selectedMember.ward}</p>
                  </div>
                </div>
              </section>

              <hr className="border-gray-100" />

              {/* Inclusive Support */}
              <section>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Inclusive Support</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Special Interest Groups</p>
                    {selectedMember.special_interest_groups && selectedMember.special_interest_groups.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.special_interest_groups.map(sig => (
                          <span key={sig} className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">{sig}</span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">None selected</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-x-6">
                    <div>
                      <p className="text-xs text-gray-500">Disability Status</p>
                      <p className="text-sm font-medium text-gray-900">{selectedMember.disability_status || 'None declared'}</p>
                    </div>
                    {selectedMember.pwd_number && (
                      <div>
                        <p className="text-xs text-gray-500">NCPWD Number</p>
                        <p className="text-sm font-mono font-medium text-gray-900">{selectedMember.pwd_number}</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              <hr className="border-gray-100" />

              {/* Declarations */}
              <section>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Declarations & Consent</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-4 h-4 rounded flex-shrink-0 flex items-center justify-center ${selectedMember.not_member_of_other_party ? 'bg-green-500' : 'bg-red-400'}`}>
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        {selectedMember.not_member_of_other_party
                          ? <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          : <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />}
                      </svg>
                    </span>
                    <p className="text-sm text-gray-700">Confirmed non-membership of other parties</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-4 h-4 rounded flex-shrink-0 flex items-center justify-center ${selectedMember.consent_to_data_processing ? 'bg-green-500' : 'bg-red-400'}`}>
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        {selectedMember.consent_to_data_processing
                          ? <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          : <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />}
                      </svg>
                    </span>
                    <p className="text-sm text-gray-700">Consented to data processing</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-4 h-4 rounded flex-shrink-0 flex items-center justify-center ${selectedMember.consent_to_image_use ? 'bg-green-500' : 'bg-gray-300'}`}>
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        {selectedMember.consent_to_image_use
                          ? <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          : <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />}
                      </svg>
                    </span>
                    <p className="text-sm text-gray-700">Image use consent <span className="text-gray-400">(optional)</span></p>
                  </div>
                </div>
              </section>

              {/* Membership / Rejection info if already processed */}
              {selectedMember.verification_status === 'approved' && selectedMember.membership_number && (
                <>
                  <hr className="border-gray-100" />
                  <section className="bg-green-50 rounded-lg p-4">
                    <h3 className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-2">Membership</h3>
                    <p className="text-lg font-mono font-bold text-green-800">{selectedMember.membership_number}</p>
                    {selectedMember.verified_at && (
                      <p className="text-xs text-green-600 mt-1">
                        Approved on {new Date(selectedMember.verified_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    )}
                  </section>
                </>
              )}

              {selectedMember.verification_status === 'rejected' && (
                <>
                  <hr className="border-gray-100" />
                  <section className="bg-red-50 rounded-lg p-4">
                    <h3 className="text-xs font-semibold text-red-700 uppercase tracking-wider mb-2">Rejection Reason</h3>
                    <p className="text-sm text-red-800">{selectedMember.rejection_reason || '—'}</p>
                    {selectedMember.verified_at && (
                      <p className="text-xs text-red-500 mt-1">
                        Rejected on {new Date(selectedMember.verified_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    )}
                  </section>
                </>
              )}

              {/* Inline rejection form */}
              {rejectInDetail && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-3">
                  <p className="text-sm font-medium text-red-800">Provide a reason for rejection (this will be emailed to the applicant):</p>
                  <textarea
                    value={rejectReasonDetail}
                    onChange={(e) => setRejectReasonDetail(e.target.value)}
                    placeholder="e.g. Incomplete documentation, ID number mismatch..."
                    rows={3}
                    className="w-full px-3 py-2 border border-red-300 rounded-lg text-sm focus:ring-2 focus:ring-red-400 focus:border-transparent"
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setRejectInDetail(false)}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleRejectFromDetail}
                      disabled={!rejectReasonDetail.trim() || processingId === selectedMember.id}
                      className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                    >
                      {processingId === selectedMember.id ? 'Processing...' : 'Confirm Rejection'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
              <button onClick={closeMemberDetail} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
                Close
              </button>
              {(!selectedMember.verification_status || selectedMember.verification_status === 'pending') && !rejectInDetail && (
                <div className="flex gap-3">
                  {isSuperAdmin && (
                    <button
                      onClick={() => setRejectInDetail(true)}
                      disabled={processingId === selectedMember.id}
                      className="px-5 py-2 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 disabled:opacity-50"
                    >
                      Reject
                    </button>
                  )}
                  <button
                    onClick={handleApproveFromDetail}
                    disabled={processingId === selectedMember.id}
                    className="px-5 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 font-semibold"
                  >
                    {processingId === selectedMember.id ? 'Processing...' : 'Approve Member'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
