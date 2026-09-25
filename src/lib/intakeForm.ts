export const CV_MAX_BYTES = 10 * 1024 * 1024

export const CV_ACCEPT_INPUT =
  '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'

const CV_ACCEPTED_EXTENSIONS = ['.pdf', '.doc', '.docx']

export interface IntakeData {
  full_name: string
  email: string
  cv_url: string
  portfolio_url: string
  linkedin_url: string
  target_titles: string[]
  work_from_country: string
  location_mode: string
  languages: string
  work_auth: string
  constraints: string
  timeline: string
  goal_one_liner: string
  pay_floor: string
  pay_unpublished_ok: boolean
  city: string
  industries_prefer: string[]
  industries_avoid: string[]
  employment_type: string
  already_applied: string
  notice_period: string
  overlap_hours: string
  companies_like: string[]
  english_level: string
}

export type FieldKey = keyof IntakeData

export interface CvFileMeta {
  name: string
  size: number
  type: string
}

export type IntakePayload = IntakeData & {
  cv_file_meta?: CvFileMeta
}

export interface ValidationResult {
  title: string
  detail?: string
  fields: FieldKey[]
}

export const INITIAL_FORM: IntakeData = {
  full_name: '',
  email: '',
  cv_url: '',
  portfolio_url: '',
  linkedin_url: '',
  target_titles: ['', '', ''],
  work_from_country: '',
  location_mode: 'remote-only',
  languages: '',
  work_auth: '',
  constraints: '',
  timeline: '',
  goal_one_liner: '',
  pay_floor: '',
  pay_unpublished_ok: false,
  city: '',
  industries_prefer: ['', '', ''],
  industries_avoid: ['', '', ''],
  employment_type: 'FTE',
  already_applied: '',
  notice_period: '',
  overlap_hours: '',
  companies_like: ['', '', ''],
  english_level: '',
}

export const STEP1_FIELDS: FieldKey[] = [
  'full_name',
  'email',
  'cv_url',
  'portfolio_url',
  'linkedin_url',
]

export const STEP2_FIELDS: FieldKey[] = [
  'target_titles',
  'work_from_country',
  'location_mode',
  'languages',
  'work_auth',
  'constraints',
  'timeline',
  'goal_one_liner',
  'pay_floor',
]

export function isEmailIncomplete(email: string): boolean {
  const trimmed = email.trim()
  if (!trimmed) return true
  return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
}

function validationMessage(
  fields: FieldKey[],
  detail?: string,
): ValidationResult {
  return {
    title: 'Please fix the highlighted fields.',
    detail:
      detail ??
      (fields.includes('email') ? 'Email looks incomplete.' : undefined),
    fields,
  }
}

export function isCvFileAccepted(file: File): boolean {
  const lowerName = file.name.toLowerCase()
  const hasValidExtension = CV_ACCEPTED_EXTENSIONS.some((ext) =>
    lowerName.endsWith(ext),
  )
  if (hasValidExtension) return true
  return [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ].includes(file.type)
}

export function validateCvFile(file: File): string | null {
  if (!isCvFileAccepted(file)) {
    return 'CV must be a PDF or Word document (.pdf, .doc, .docx).'
  }
  if (file.size > CV_MAX_BYTES) {
    return 'CV must be 10 MB or less.'
  }
  return null
}

export function hasCvProvided(
  form: IntakeData,
  cvFile: File | null,
): boolean {
  return Boolean(form.cv_url.trim() || cvFile)
}

export function validateStep1(
  form: IntakeData,
  cvFile: File | null = null,
): ValidationResult | null {
  const fields: FieldKey[] = []
  if (!form.full_name.trim()) fields.push('full_name')
  if (isEmailIncomplete(form.email)) fields.push('email')

  if (cvFile) {
    const fileError = validateCvFile(cvFile)
    if (fileError) {
      fields.push('cv_url')
      return validationMessage(fields, fileError)
    }
  }

  if (!hasCvProvided(form, cvFile)) fields.push('cv_url')
  if (!form.portfolio_url.trim()) fields.push('portfolio_url')
  if (!form.linkedin_url.trim()) fields.push('linkedin_url')
  return fields.length ? validationMessage(fields) : null
}

export function validateStep2(form: IntakeData): ValidationResult | null {
  const fields: FieldKey[] = []
  const titles = form.target_titles.filter((t) => t.trim())
  if (titles.length === 0 || titles.length > 3) fields.push('target_titles')
  if (!form.work_from_country.trim()) fields.push('work_from_country')
  if (!form.location_mode.trim()) fields.push('location_mode')
  if (!form.languages.trim()) fields.push('languages')
  if (!form.work_auth.trim()) fields.push('work_auth')
  if (!form.constraints.trim() || form.constraints.length > 400) {
    fields.push('constraints')
  }
  if (!form.timeline.trim()) fields.push('timeline')
  if (!form.goal_one_liner.trim() || form.goal_one_liner.length > 280) {
    fields.push('goal_one_liner')
  }
  if (!form.pay_floor.trim() && !form.pay_unpublished_ok) {
    fields.push('pay_floor')
  }
  return fields.length ? validationMessage(fields) : null
}

export function validateAll(
  form: IntakeData,
  cvFile: File | null = null,
): ValidationResult | null {
  return validateStep2(form) ?? validateStep1(form, cvFile)
}

export function buildPayload(
  form: IntakeData,
  cvFile: File | null = null,
): IntakePayload {
  const payload: IntakePayload = {
    ...form,
    target_titles: form.target_titles.filter((t) => t.trim()),
    industries_prefer: form.industries_prefer.filter((t) => t.trim()),
    industries_avoid: form.industries_avoid.filter((t) => t.trim()),
    companies_like: form.companies_like.filter((t) => t.trim()),
  }

  if (cvFile) {
    payload.cv_file_meta = {
      name: cvFile.name,
      size: cvFile.size,
      type: cvFile.type || 'application/octet-stream',
    }
  }

  return payload
}

export function downloadJson(data: IntakePayload) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `career-elevator-intake-${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)
}

function downloadCvFile(cvFile: File) {
  const url = URL.createObjectURL(cvFile)
  const a = document.createElement('a')
  a.href = url
  a.download = cvFile.name
  a.click()
  URL.revokeObjectURL(url)
}

export function downloadIntakePackage(
  payload: IntakePayload,
  cvFile: File | null,
) {
  downloadJson(payload)
  if (cvFile) downloadCvFile(cvFile)
}

export async function submitIntake(
  payload: IntakePayload,
  cvFile: File | null,
  endpoint: string | undefined,
): Promise<void> {
  if (!endpoint?.trim()) {
    downloadIntakePackage(payload, cvFile)
    return
  }

  if (cvFile) {
    const formData = new FormData()
    formData.append('cv_file', cvFile, cvFile.name)
    formData.append('payload', JSON.stringify(payload))
    const res = await fetch(endpoint, { method: 'POST', body: formData })
    if (!res.ok) throw new Error(`Submission failed (${res.status})`)
    return
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Submission failed (${res.status})`)
}

export function earliestInvalidStep(fields: FieldKey[]): 1 | 2 | 3 {
  if (fields.some((f) => STEP1_FIELDS.includes(f))) return 1
  if (fields.some((f) => STEP2_FIELDS.includes(f))) return 2
  return 3
}
