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

function validationMessage(fields: FieldKey[]): ValidationResult {
  return {
    title: 'Please fix the highlighted fields.',
    detail: fields.includes('email') ? 'Email looks incomplete.' : undefined,
    fields,
  }
}

export function validateStep1(form: IntakeData): ValidationResult | null {
  const fields: FieldKey[] = []
  if (!form.full_name.trim()) fields.push('full_name')
  if (isEmailIncomplete(form.email)) fields.push('email')
  if (!form.cv_url.trim()) fields.push('cv_url')
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

export function validateAll(form: IntakeData): ValidationResult | null {
  return validateStep2(form) ?? validateStep1(form)
}

export function buildPayload(form: IntakeData): IntakeData {
  return {
    ...form,
    target_titles: form.target_titles.filter((t) => t.trim()),
    industries_prefer: form.industries_prefer.filter((t) => t.trim()),
    industries_avoid: form.industries_avoid.filter((t) => t.trim()),
    companies_like: form.companies_like.filter((t) => t.trim()),
  }
}

export function downloadJson(data: IntakeData) {
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

export function earliestInvalidStep(fields: FieldKey[]): 1 | 2 | 3 {
  if (fields.some((f) => STEP1_FIELDS.includes(f))) return 1
  if (fields.some((f) => STEP2_FIELDS.includes(f))) return 2
  return 3
}
