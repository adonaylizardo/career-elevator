import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IntakeField } from '../components/intake/IntakeField'
import { IntakeSelect } from '../components/intake/IntakeSelect'
import { IntakeStepHeader } from '../components/intake/IntakeStepHeader'
import { PageLayout } from '../components/layout/PageLayout'
import { Checkbox } from '../components/ui/checkbox'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { cn } from '../lib/utils'

interface IntakeData {
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

type FieldKey = keyof IntakeData

interface ValidationResult {
  summary: string
  fields: FieldKey[]
}

const formEndpoint = import.meta.env.VITE_FORM_ENDPOINT as string | undefined

const INITIAL_FORM: IntakeData = {
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

function downloadJson(data: IntakeData) {
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

function isEmailIncomplete(email: string): boolean {
  const trimmed = email.trim()
  if (!trimmed) return true
  return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
}

function IntakePanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[800px] rounded-[32px] bg-card px-6 py-8 lg:rounded-[48px] lg:px-12 lg:py-12">
      {children}
    </div>
  )
}

export function Intake() {
  const [showOptional, setShowOptional] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Set<FieldKey>>(new Set())
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<IntakeData>(INITIAL_FORM)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    setShowOptional(mq.matches)
    function onChange(e: MediaQueryListEvent) {
      setShowOptional(e.matches)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  function clearFieldError(key: FieldKey) {
    setFieldErrors((prev) => {
      if (!prev.has(key)) return prev
      const next = new Set(prev)
      next.delete(key)
      return next
    })
  }

  function updateField<K extends FieldKey>(key: K, value: IntakeData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    clearFieldError(key)
    if (key === 'pay_floor' || key === 'pay_unpublished_ok') {
      clearFieldError('pay_floor')
    }
  }

  function updateArrayField(
    key: 'target_titles' | 'industries_prefer' | 'industries_avoid' | 'companies_like',
    index: number,
    value: string,
  ) {
    setForm((prev) => {
      const arr = [...prev[key]]
      arr[index] = value
      return { ...prev, [key]: arr }
    })
    clearFieldError(key)
  }

  function fieldHasError(key: FieldKey): boolean {
    return fieldErrors.has(key)
  }

  function validate(): ValidationResult | null {
    const fields: FieldKey[] = []

    if (!form.full_name.trim()) fields.push('full_name')
    if (isEmailIncomplete(form.email)) fields.push('email')
    if (!form.cv_url.trim()) fields.push('cv_url')
    if (!form.portfolio_url.trim()) fields.push('portfolio_url')
    if (!form.linkedin_url.trim()) fields.push('linkedin_url')

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

    if (fields.length === 0) return null

    let summary = 'Please fix the highlighted fields.'
    if (fields.includes('email')) {
      summary += ' Email looks incomplete.'
    }

    return { summary, fields }
  }

  function buildPayload(): IntakeData {
    return {
      ...form,
      target_titles: form.target_titles.filter((t) => t.trim()),
      industries_prefer: form.industries_prefer.filter((t) => t.trim()),
      industries_avoid: form.industries_avoid.filter((t) => t.trim()),
      companies_like: form.companies_like.filter((t) => t.trim()),
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const validation = validate()
    if (validation) {
      setFieldErrors(new Set(validation.fields))
      setError(validation.summary)
      return
    }

    setFieldErrors(new Set())
    setLoading(true)
    const payload = buildPayload()

    if (formEndpoint?.trim()) {
      try {
        const res = await fetch(formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error(`Submission failed (${res.status})`)
        setSubmitted(true)
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Submission failed. Your data will be downloaded instead.',
        )
        downloadJson(payload)
      } finally {
        setLoading(false)
      }
    } else {
      downloadJson(payload)
      setSubmitted(true)
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <PageLayout>
        <div className="bg-background px-5 py-10 lg:px-20 lg:py-16">
          <IntakePanel>
            <h1 className="font-body text-[28px] font-medium leading-[0.95] tracking-[-0.5px] text-foreground lg:text-[40px] lg:leading-[0.9] lg:tracking-[-0.8px]">
              Intake received
            </h1>
            <p className="text-body-muted mt-4">
              {formEndpoint?.trim()
                ? 'Your intake has been submitted. Your Opportunity Sheet will be delivered in 3–5 days after review.'
                : 'Your intake has been downloaded as JSON. Configure VITE_FORM_ENDPOINT to enable direct submission.'}
            </p>
            <Link
              to="/"
              className="intake-submit mt-8 inline-flex no-underline"
            >
              Back to landing
            </Link>
          </IntakePanel>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div className="bg-background px-5 py-10 lg:px-20 lg:py-16">
        <IntakePanel>
          <h1 className="font-body text-[28px] font-medium leading-[0.95] tracking-[-0.5px] text-foreground lg:text-[40px] lg:leading-[0.9] lg:tracking-[-0.8px]">
            Intake form
          </h1>
          <p className="text-body-muted mt-4 text-[15px] leading-[1.35] lg:text-[16px]">
            Complete this form after payment. Fields marked with * are required.
            Optional fields are collapsed below — defaults apply if skipped.
          </p>

          {error && (
            <div
              className="mt-6 rounded-lg border border-accent bg-error-fill px-4 py-3 font-body text-[14px] leading-[1.35] text-foreground"
              role="alert"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8">
            <IntakeStepHeader step={1} title="Required" />

            <div className="flex flex-col gap-4">
              <IntakeField label="Full name" htmlFor="full_name" required>
                <Input
                  id="full_name"
                  variant="intake"
                  placeholder="Your full name"
                  value={form.full_name}
                  hasError={fieldHasError('full_name')}
                  onChange={(e) => updateField('full_name', e.target.value)}
                  required
                />
              </IntakeField>

              <IntakeField label="Email" htmlFor="email" required>
                <Input
                  id="email"
                  type="email"
                  variant="intake"
                  placeholder="you@company.com"
                  value={form.email}
                  hasError={fieldHasError('email')}
                  onChange={(e) => updateField('email', e.target.value)}
                  required
                />
              </IntakeField>

              <IntakeField label="CV URL" htmlFor="cv_url" required>
                <Input
                  id="cv_url"
                  type="url"
                  variant="intake"
                  placeholder="https://..."
                  value={form.cv_url}
                  hasError={fieldHasError('cv_url')}
                  onChange={(e) => updateField('cv_url', e.target.value)}
                  required
                />
              </IntakeField>

              <IntakeField label="Portfolio URL" htmlFor="portfolio_url" required>
                <Input
                  id="portfolio_url"
                  type="url"
                  variant="intake"
                  placeholder="https://..."
                  value={form.portfolio_url}
                  hasError={fieldHasError('portfolio_url')}
                  onChange={(e) => updateField('portfolio_url', e.target.value)}
                  required
                />
              </IntakeField>

              <IntakeField label="LinkedIn URL" htmlFor="linkedin_url" required>
                <Input
                  id="linkedin_url"
                  type="url"
                  variant="intake"
                  placeholder="https://linkedin.com/in/..."
                  value={form.linkedin_url}
                  hasError={fieldHasError('linkedin_url')}
                  onChange={(e) => updateField('linkedin_url', e.target.value)}
                  required
                />
              </IntakeField>

              <IntakeField label="Target titles (max 3)" required>
                <div className="flex flex-col gap-3">
                  {[0, 1, 2].map((i) => (
                    <Input
                      key={i}
                      variant="intake"
                      placeholder={`Title ${i + 1}`}
                      value={form.target_titles[i]}
                      hasError={fieldHasError('target_titles')}
                      onChange={(e) =>
                        updateArrayField('target_titles', i, e.target.value)
                      }
                    />
                  ))}
                </div>
              </IntakeField>

              <IntakeField label="Work-from country" htmlFor="work_from_country" required>
                <Input
                  id="work_from_country"
                  variant="intake"
                  placeholder="e.g. Spain, United States"
                  value={form.work_from_country}
                  hasError={fieldHasError('work_from_country')}
                  onChange={(e) =>
                    updateField('work_from_country', e.target.value)
                  }
                  required
                />
              </IntakeField>

              <IntakeField label="Location mode" htmlFor="location_mode" required>
                <IntakeSelect
                  id="location_mode"
                  value={form.location_mode}
                  hasError={fieldHasError('location_mode')}
                  onChange={(e) => updateField('location_mode', e.target.value)}
                  required
                >
                  <option value="remote-only">Remote only</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="onsite">On-site</option>
                  <option value="remote-or-hybrid">Remote or hybrid</option>
                  <option value="open">Open to any</option>
                </IntakeSelect>
              </IntakeField>

              <IntakeField label="Languages" htmlFor="languages" required>
                <Input
                  id="languages"
                  variant="intake"
                  placeholder="e.g. English (fluent), Spanish (native)"
                  value={form.languages}
                  hasError={fieldHasError('languages')}
                  onChange={(e) => updateField('languages', e.target.value)}
                  required
                />
              </IntakeField>

              <IntakeField label="Work authorization" htmlFor="work_auth" required>
                <Textarea
                  id="work_auth"
                  variant="intake"
                  placeholder="Visa status, right to work, sponsorship needs..."
                  value={form.work_auth}
                  hasError={fieldHasError('work_auth')}
                  onChange={(e) => updateField('work_auth', e.target.value)}
                  required
                />
              </IntakeField>

              <IntakeField
                label="Constraints"
                htmlFor="constraints"
                required
                counter={`${form.constraints.length}/400`}
              >
                <Textarea
                  id="constraints"
                  variant="intake"
                  maxLength={400}
                  placeholder="What you'd rather avoid — industries, company types, dealbreakers..."
                  value={form.constraints}
                  hasError={fieldHasError('constraints')}
                  onChange={(e) => updateField('constraints', e.target.value)}
                  required
                />
              </IntakeField>

              <IntakeField label="Timeline" htmlFor="timeline" required>
                <Input
                  id="timeline"
                  variant="intake"
                  placeholder="e.g. Available immediately, 4-week notice"
                  value={form.timeline}
                  hasError={fieldHasError('timeline')}
                  onChange={(e) => updateField('timeline', e.target.value)}
                  required
                />
              </IntakeField>

              <IntakeField
                label="Goal one-liner"
                htmlFor="goal_one_liner"
                required
                counter={`${form.goal_one_liner.length}/280`}
              >
                <Textarea
                  id="goal_one_liner"
                  variant="intake"
                  maxLength={280}
                  placeholder="What you want next, in one sentence..."
                  value={form.goal_one_liner}
                  hasError={fieldHasError('goal_one_liner')}
                  onChange={(e) => updateField('goal_one_liner', e.target.value)}
                  required
                />
              </IntakeField>

              <IntakeField
                label="Compensation"
                required
                helper="Enter a pay floor or check Pay unpublished OK — one is required."
              >
                <div className="flex flex-col gap-4">
                  <IntakeField label="Pay floor (USD/year)" htmlFor="pay_floor">
                    <Input
                      id="pay_floor"
                      type="text"
                      variant="intake"
                      placeholder="e.g. 75000"
                      value={form.pay_floor}
                      hasError={fieldHasError('pay_floor')}
                      onChange={(e) => updateField('pay_floor', e.target.value)}
                    />
                  </IntakeField>
                  <Checkbox
                    id="pay_unpublished_ok"
                    name="pay_unpublished_ok"
                    variant="intake"
                    label="Pay unpublished OK — I prefer not to share a number"
                    checked={form.pay_unpublished_ok}
                    onChange={(e) =>
                      updateField('pay_unpublished_ok', e.target.checked)
                    }
                  />
                </div>
              </IntakeField>
            </div>

            <div className="mt-8 border-t border-border pt-8">
              <IntakeStepHeader
                step={2}
                title="Optional fields"
                toggleLabel={
                  showOptional
                    ? 'Hide — defaults apply if skipped'
                    : 'Show — defaults apply if skipped'
                }
                onToggle={() => setShowOptional((open) => !open)}
              />

              {showOptional && (
                <div className="flex flex-col gap-4">
                  <IntakeField label="City" htmlFor="city">
                    <Input
                      id="city"
                      variant="intake"
                      value={form.city}
                      onChange={(e) => updateField('city', e.target.value)}
                    />
                  </IntakeField>

                  <IntakeField label="Industries prefer (max 3)">
                    <div className="flex flex-col gap-3">
                      {[0, 1, 2].map((i) => (
                        <Input
                          key={i}
                          variant="intake"
                          placeholder={`Industry ${i + 1}`}
                          value={form.industries_prefer[i]}
                          onChange={(e) =>
                            updateArrayField('industries_prefer', i, e.target.value)
                          }
                        />
                      ))}
                    </div>
                  </IntakeField>

                  <IntakeField label="Industries avoid (max 3)">
                    <div className="flex flex-col gap-3">
                      {[0, 1, 2].map((i) => (
                        <Input
                          key={i}
                          variant="intake"
                          placeholder={`Industry ${i + 1}`}
                          value={form.industries_avoid[i]}
                          onChange={(e) =>
                            updateArrayField('industries_avoid', i, e.target.value)
                          }
                        />
                      ))}
                    </div>
                  </IntakeField>

                  <IntakeField label="Employment type" htmlFor="employment_type">
                    <IntakeSelect
                      id="employment_type"
                      value={form.employment_type}
                      onChange={(e) =>
                        updateField('employment_type', e.target.value)
                      }
                    >
                      <option value="FTE">FTE</option>
                      <option value="contract">Contract</option>
                      <option value="freelance">Freelance</option>
                      <option value="open">Open to any</option>
                    </IntakeSelect>
                  </IntakeField>

                  <IntakeField
                    label="Already applied (companies/roles)"
                    htmlFor="already_applied"
                  >
                    <Textarea
                      id="already_applied"
                      variant="intake"
                      placeholder="Roles or companies you've already applied to..."
                      value={form.already_applied}
                      onChange={(e) =>
                        updateField('already_applied', e.target.value)
                      }
                    />
                  </IntakeField>

                  <IntakeField label="Notice period" htmlFor="notice_period">
                    <Input
                      id="notice_period"
                      variant="intake"
                      placeholder="e.g. 2 weeks, 1 month"
                      value={form.notice_period}
                      onChange={(e) =>
                        updateField('notice_period', e.target.value)
                      }
                    />
                  </IntakeField>

                  <IntakeField label="Overlap hours (timezone)" htmlFor="overlap_hours">
                    <Input
                      id="overlap_hours"
                      variant="intake"
                      placeholder="e.g. 4+ hours with US Eastern"
                      value={form.overlap_hours}
                      onChange={(e) =>
                        updateField('overlap_hours', e.target.value)
                      }
                    />
                  </IntakeField>

                  <IntakeField label="Companies like (max 3)">
                    <div className="flex flex-col gap-3">
                      {[0, 1, 2].map((i) => (
                        <Input
                          key={i}
                          variant="intake"
                          placeholder={`Company ${i + 1}`}
                          value={form.companies_like[i]}
                          onChange={(e) =>
                            updateArrayField('companies_like', i, e.target.value)
                          }
                        />
                      ))}
                    </div>
                  </IntakeField>

                  <IntakeField label="English level" htmlFor="english_level">
                    <IntakeSelect
                      id="english_level"
                      value={form.english_level}
                      onChange={(e) =>
                        updateField('english_level', e.target.value)
                      }
                    >
                      <option value="">Not specified</option>
                      <option value="native">Native</option>
                      <option value="fluent">Fluent</option>
                      <option value="professional">Professional</option>
                      <option value="conversational">Conversational</option>
                    </IntakeSelect>
                  </IntakeField>
                </div>
              )}
            </div>

            <div
              className={cn(
                'mt-6 flex flex-col gap-4 border-t border-border pt-6 lg:mt-6 lg:flex-row lg:items-center lg:gap-6',
              )}
            >
              <button
                type="submit"
                disabled={loading}
                className="intake-submit w-full lg:w-auto"
              >
                {loading ? 'Submitting…' : 'Submit intake'}
              </button>
              <Link
                to="/checkout"
                className="font-body text-center text-[14px] text-foreground underline underline-offset-4 hover:text-muted lg:text-left"
              >
                Back to checkout
              </Link>
            </div>
          </form>
        </IntakePanel>
      </div>
    </PageLayout>
  )
}
