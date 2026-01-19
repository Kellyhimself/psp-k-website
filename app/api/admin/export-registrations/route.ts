import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('registrations')
    .select(
      'first_name,last_name,email,phone,id_number,date_of_birth,gender,county,constituency,ward,created_at'
    )
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json(
      { error: 'Failed to fetch registrations', details: error.message },
      { status: 500 }
    )
  }

  const header = [
    'First Name',
    'Last Name',
    'Email',
    'Phone',
    'National ID Number',
    'Date of Birth',
    'Gender',
    'County',
    'Constituency',
    'Ward',
    'Registered At',
  ]

  const rows = (data || []).map((row) => [
    row.first_name ?? '',
    row.last_name ?? '',
    row.email ?? '',
    row.phone ?? '',
    row.id_number ?? '',
    row.date_of_birth ?? '',
    row.gender ?? '',
    row.county ?? '',
    row.constituency ?? '',
    row.ward ?? '',
    row.created_at ?? '',
  ])

  const csvLines = [
    header.join(','),
    ...rows.map((cols) =>
      cols
        .map((value) => {
          const stringValue = String(value ?? '')
          if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
            return `"${stringValue.replace(/"/g, '""')}"`
          }
          return stringValue
        })
        .join(',')
    ),
  ]

  const csv = csvLines.join('\n')

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="pspk-registrations-orpp.csv"',
    },
  })
}

