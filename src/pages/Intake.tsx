import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageLayout } from '../components/layout/PageLayout'
import { Section } from '../components/layout/Section'
import { buttonVariants } from '../components/ui/button'
import { Checkbox } from '../components/ui/checkbox'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
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

const formEndpoint = import.meta.env.VITE_FORM_ENDPOINT as string | undefined

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

export function Intake() {
  const [showOptional, setShowOptional] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState<IntakeData>({
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
  })

  function updateField<K extends keyof IntakeData>(
    key: K,
    value: IntakeData[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }))
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
  }

  function validate(): string | null {
    if (!form.full_name.trim()) return 'Full name is required.'
    if (!form.email.trim()) return 'Email is required.'
    if (!form.cv_url.trim()) return 'CV URL is required.'
    if (!form.portfolio_url.trim()) return 'Portfolio URL is required.'
    if (!form.linkedin_url.trim()) return 'LinkedIn URL is required.'
    const titles = form.target_titles.filter((t) => t.trim())
    if (titles.length === 0)
      return 'At least one target title is required (max 3).'
    if (titles.length > 3) return 'Maximum 3 target titles allowed.'
    if (!form.work_from_country.trim())
      return 'Work-from country is required.'
    if (!form.location_mode.trim()) return 'Location mode is required.'
    if (!form.languages.trim()) return 'Languages are required.'
    if (!form.work_auth.trim()) return 'Work authorization is required.'
    if (!form.constraints.trim()) return 'Constraints are required.'
    if (form.constraints.length > 400)
      return 'Constraints must be 400 characters or fewer.'
    if (!form.timeline.trim()) return 'Timeline is required.'
    if (!form.goal_one_liner.trim()) return 'Goal one-liner is required.'
    if (form.goal_one_liner.length > 280)
      return 'Goal one-liner must be 280 characters or fewer.'
    if (!form.pay_floor.trim() && !form.pay_unpublished_ok)
      return 'Provide a pay floor or check "Pay unpublished OK".'
    return null
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
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

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
        <Section className="pt-16 sm:pt-24">
          <h1 className="text-2xl font-semibold">Intake received</h1>
          <p className="mt-4 text-muted-foreground">
            {formEndpoint?.trim()
              ? 'Your intake has been submitted. Your Opportunity Sheet will be delivered in 3–5 days after review.'
              : 'Your intake has been downloaded as JSON. Configure VITE_FORM_ENDPOINT to enable direct submission.'}
          </p>
          <Link
            to="/"
            className={cn(buttonVariants({ variant: 'outline' }), 'mt-8 inline-flex')}
          >
            Back to landing
          </Link>
        </Section>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <Section className="pt-16 sm:pt-24">
        <h1 className="text-2xl font-semibold sm:text-3xl">Intake form</h1>
        <p className="mt-4 text-muted-foreground">
          Complete this form after payment. Fields marked with * are required.
          Optional fields are collapsed below — defaults apply if skipped.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-8">
          {/* Required fields */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Required</h2>

            <div className="space-y-2">
              <Label htmlFor="full_name" required>
                Full name
              </Label>
              <Input
                id="full_name"
                value={form.full_name}
                onChange={(e) => updateField('full_name', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" required>
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cv_url" required>
                CV URL
              </Label>
              <Input
                id="cv_url"
                type="url"
                placeholder="https://..."
                value={form.cv_url}
                onChange={(e) => updateField('cv_url', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolio_url" required>
                Portfolio URL
              </Label>
              <Input
                id="portfolio_url"
                type="url"
                placeholder="https://..."
                value={form.portfolio_url}
                onChange={(e) => updateField('portfolio_url', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin_url" required>
                LinkedIn URL
              </Label>
              <Input
                id="linkedin_url"
                type="url"
                placeholder="https://linkedin.com/in/..."
                value={form.linkedin_url}
                onChange={(e) => updateField('linkedin_url', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label required>Target titles (max 3)</Label>
              {[0, 1, 2].map((i) => (
                <Input
                  key={i}
                  placeholder={`Title ${i + 1}`}
                  value={form.target_titles[i]}
                  onChange={(e) =>
                    updateArrayField('target_titles', i, e.target.value)
                  }
                />
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="work_from_country" required>
                Work-from country
              </Label>
              <Input
                id="work_from_country"
                placeholder="e.g. Spain, United States"
                value={form.work_from_country}
                onChange={(e) =>
                  updateField('work_from_country', e.target.value)
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location_mode" required>
                Location mode
              </Label>
              <select
                id="location_mode"
                value={form.location_mode}
                onChange={(e) => updateField('location_mode', e.target.value)}
                className="flex h-10 w-full rounded-[6px] border border-border bg-card px-3 py-2 text-sm"
                required
              >
                <option value="remote-only">Remote only</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">On-site</option>
                <option value="remote-or-hybrid">Remote or hybrid</option>
                <option value="open">Open to any</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="languages" required>
                Languages
              </Label>
              <Input
                id="languages"
                placeholder="e.g. English (fluent), Spanish (native)"
                value={form.languages}
                onChange={(e) => updateField('languages', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="work_auth" required>
                Work authorization
              </Label>
              <Textarea
                id="work_auth"
                placeholder="Visa status, right to work, sponsorship needs..."
                value={form.work_auth}
                onChange={(e) => updateField('work_auth', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="constraints" required>
                Constraints (max 400 chars)
              </Label>
              <Textarea
                id="constraints"
                maxLength={400}
                placeholder="What you'd rather avoid — industries, company types, dealbreakers..."
                value={form.constraints}
                onChange={(e) => updateField('constraints', e.target.value)}
                required
              />
              <p className="text-xs text-muted">
                {form.constraints.length}/400
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeline" required>
                Timeline
              </Label>
              <Input
                id="timeline"
                placeholder="e.g. Available immediately, 4-week notice"
                value={form.timeline}
                onChange={(e) => updateField('timeline', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal_one_liner" required>
                Goal one-liner (max 280 chars)
              </Label>
              <Textarea
                id="goal_one_liner"
                maxLength={280}
                placeholder="What you want next, in one sentence..."
                value={form.goal_one_liner}
                onChange={(e) => updateField('goal_one_liner', e.target.value)}
                required
              />
              <p className="text-xs text-muted">
                {form.goal_one_liner.length}/280
              </p>
            </div>

            <div className="space-y-2">
              <Label required>Compensation</Label>
              <p className="text-xs text-muted-foreground">
                Enter a pay floor or check Pay unpublished OK — one is required.
              </p>
              <Label htmlFor="pay_floor">Pay floor (USD/year)</Label>
              <Input
                id="pay_floor"
                type="text"
                placeholder="e.g. 75000"
                value={form.pay_floor}
                onChange={(e) => updateField('pay_floor', e.target.value)}
              />
              <Checkbox
                id="pay_unpublished_ok"
                name="pay_unpublished_ok"
                label="Pay unpublished OK — I prefer not to share a number"
                checked={form.pay_unpublished_ok}
                onChange={(e) =>
                  updateField('pay_unpublished_ok', e.target.checked)
                }
              />
            </div>
          </div>

          {/* Optional fields — collapsed */}
          <div className="border-t border-border pt-8">
            <button
              type="button"
              onClick={() => setShowOptional(!showOptional)}
              className="flex w-full items-center justify-between text-left text-lg font-semibold"
            >
              Optional fields
              <span className="text-sm font-normal text-muted-foreground">
                {showOptional ? 'Hide' : 'Show'} — defaults apply if skipped
              </span>
            </button>

            {showOptional && (
              <div className="mt-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={form.city}
                    onChange={(e) => updateField('city', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Industries prefer (max 3)</Label>
                  {[0, 1, 2].map((i) => (
                    <Input
                      key={i}
                      placeholder={`Industry ${i + 1}`}
                      value={form.industries_prefer[i]}
                      onChange={(e) =>
                        updateArrayField('industries_prefer', i, e.target.value)
                      }
                    />
                  ))}
                </div>

                <div className="space-y-2">
                  <Label>Industries avoid (max 3)</Label>
                  {[0, 1, 2].map((i) => (
                    <Input
                      key={i}
                      placeholder={`Industry ${i + 1}`}
                      value={form.industries_avoid[i]}
                      onChange={(e) =>
                        updateArrayField('industries_avoid', i, e.target.value)
                      }
                    />
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employment_type">Employment type</Label>
                  <select
                    id="employment_type"
                    value={form.employment_type}
                    onChange={(e) =>
                      updateField('employment_type', e.target.value)
                    }
                    className="flex h-10 w-full rounded-[6px] border border-border bg-card px-3 py-2 text-sm"
                  >
                    <option value="FTE">FTE (default)</option>
                    <option value="contract">Contract</option>
                    <option value="freelance">Freelance</option>
                    <option value="open">Open to any</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="already_applied">
                    Already applied (companies/roles)
                  </Label>
                  <Textarea
                    id="already_applied"
                    placeholder="Roles or companies you've already applied to..."
                    value={form.already_applied}
                    onChange={(e) =>
                      updateField('already_applied', e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notice_period">Notice period</Label>
                  <Input
                    id="notice_period"
                    placeholder="e.g. 2 weeks, 1 month"
                    value={form.notice_period}
                    onChange={(e) =>
                      updateField('notice_period', e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="overlap_hours">
                    Overlap hours (timezone)
                  </Label>
                  <Input
                    id="overlap_hours"
                    placeholder="e.g. 4+ hours with US Eastern"
                    value={form.overlap_hours}
                    onChange={(e) =>
                      updateField('overlap_hours', e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Companies like (max 3)</Label>
                  {[0, 1, 2].map((i) => (
                    <Input
                      key={i}
                      placeholder={`Company ${i + 1}`}
                      value={form.companies_like[i]}
                      onChange={(e) =>
                        updateArrayField('companies_like', i, e.target.value)
                      }
                    />
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="english_level">English level</Label>
                  <select
                    id="english_level"
                    value={form.english_level}
                    onChange={(e) =>
                      updateField('english_level', e.target.value)
                    }
                    className="flex h-10 w-full rounded-[6px] border border-border bg-card px-3 py-2 text-sm"
                  >
                    <option value="">Not specified</option>
                    <option value="native">Native</option>
                    <option value="fluent">Fluent</option>
                    <option value="professional">Professional</option>
                    <option value="conversational">Conversational</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {error && (
            <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {error}
            </p>
          )}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={loading}
              className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}
            >
              {loading ? 'Submitting…' : 'Submit intake'}
            </button>
            <Link
              to="/checkout"
              className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Back to checkout
            </Link>
          </div>
        </form>
      </Section>
    </PageLayout>
  )
}
