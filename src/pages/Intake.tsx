import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IntakePanel } from '../components/intake/IntakePanel'
import { IntakeProgress } from '../components/intake/IntakeProgress'
import { WizardSectionHeader } from '../components/intake/WizardSectionHeader'
import { StepLinksFields } from '../components/intake/steps/StepLinksFields'
import { StepPreferencesFields } from '../components/intake/steps/StepPreferencesFields'
import { StepRoleFields } from '../components/intake/steps/StepRoleFields'
import { IntakeLayout } from '../components/layout/IntakeLayout'
import { cn } from '../lib/utils'
import {
  type FieldKey,
  type IntakeData,
  type ValidationResult,
  INITIAL_FORM,
  buildPayload,
  downloadIntakePackage,
  earliestInvalidStep,
  submitIntake,
  validateAll,
  validateStep1,
  validateStep2,
} from '../lib/intakeForm'

const formEndpoint = import.meta.env.VITE_FORM_ENDPOINT as string | undefined

type Step = 1 | 2 | 3

const STEP_SUBTITLES: Record<Step, string> = {
  1: 'After payment. Fields marked with * are required.',
  2: 'Required for matching. Fields marked with * are required.',
  3: 'Optional — defaults apply if skipped.',
}

const STEP_SECTIONS: Record<Step, { title: string; hint?: string }> = {
  1: { title: 'Tú y tus links' },
  2: { title: 'Rol y logística' },
  3: {
    title: 'Preferencias',
    hint: 'Optional — defaults apply if skipped',
  },
}

function IntakeErrorAlert({
  title,
  detail,
}: {
  title: string
  detail?: string
}) {
  return (
    <div
      className="intake-error-alert mt-4 rounded-lg px-4 py-3"
      role="alert"
    >
      <p className="font-body text-[14px] font-medium leading-[1.35] text-accent">
        {title}
      </p>
      {detail && (
        <p className="font-body mt-1 text-[14px] font-light leading-[1.35] text-foreground">
          {detail}
        </p>
      )}
    </div>
  )
}

export function Intake() {
  const [step, setStep] = useState<Step>(1)
  const [submitted, setSubmitted] = useState(false)
  const [validationError, setValidationError] =
    useState<ValidationResult | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Set<FieldKey>>(new Set())
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<IntakeData>(INITIAL_FORM)
  const [cvFile, setCvFile] = useState<File | null>(null)

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

  function handleCvFileChange(file: File | null) {
    setCvFile(file)
    clearFieldError('cv_url')
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

  function clearErrors() {
    setValidationError(null)
    setSubmitError(null)
    setFieldErrors(new Set())
  }

  function applyValidation(validation: ValidationResult) {
    setFieldErrors(new Set(validation.fields))
    setValidationError(validation)
  }

  function handleContinue(e: React.FormEvent) {
    e.preventDefault()
    clearErrors()

    if (step === 1) {
      const validation = validateStep1(form, cvFile)
      if (validation) {
        applyValidation(validation)
        return
      }
      setStep(2)
      return
    }

    if (step === 2) {
      const validation = validateStep2(form)
      if (validation) {
        applyValidation(validation)
        return
      }
      setStep(3)
    }
  }

  function handleBack() {
    clearErrors()
    if (step === 2) setStep(1)
    else if (step === 3) setStep(2)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    clearErrors()

    const validation = validateAll(form, cvFile)
    if (validation) {
      applyValidation(validation)
      setStep(earliestInvalidStep(validation.fields))
      return
    }

    setLoading(true)
    const payload = buildPayload(form, cvFile)

    try {
      await submitIntake(payload, cvFile, formEndpoint)
      setSubmitted(true)
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Submission failed. Your data will be downloaded instead.',
      )
      downloadIntakePackage(payload, cvFile)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <IntakeLayout>
        <div className="flex justify-center px-5 py-12 lg:px-0 lg:py-24">
          <IntakePanel>
            <h1 className="font-body text-[28px] font-medium leading-[0.95] tracking-[-0.5px] text-foreground lg:text-[40px] lg:leading-[0.9] lg:tracking-[-0.8px]">
              Intake received
            </h1>
            <p className="text-body-muted mt-4 text-[15px] leading-[1.35] lg:text-[16px]">
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
      </IntakeLayout>
    )
  }

  const section = STEP_SECTIONS[step]

  return (
    <IntakeLayout>
      <div className="flex justify-center px-5 py-12 lg:px-0 lg:py-24">
        <IntakePanel>
          <div className="flex flex-col gap-2 pb-2">
            <IntakeProgress step={step} />

            <h1 className="font-body text-[28px] font-medium leading-[0.95] tracking-[-0.5px] text-foreground lg:text-[40px] lg:leading-[0.9] lg:tracking-[-0.8px]">
              Intake form
            </h1>
            <p className="text-body-muted text-[15px] leading-[1.35] lg:text-[16px]">
              {STEP_SUBTITLES[step]}
            </p>
          </div>

          {validationError && (
            <IntakeErrorAlert
              title={validationError.title}
              detail={validationError.detail}
            />
          )}

          {submitError && (
            <div
              className="intake-error-alert mt-4 rounded-lg px-4 py-3 font-body text-[14px] leading-[1.35]"
              role="alert"
            >
              {submitError}
            </div>
          )}

          <form
            noValidate
            onSubmit={step === 3 ? handleSubmit : handleContinue}
            className={cn(
              validationError || submitError ? 'mt-4' : 'mt-2',
            )}
          >
            <div className="flex flex-col gap-4">
              <WizardSectionHeader
                step={step}
                title={section.title}
                hint={section.hint}
              />

              {step === 1 && (
                <StepLinksFields
                  form={form}
                  cvFile={cvFile}
                  fieldHasError={fieldHasError}
                  updateField={updateField}
                  onCvFileChange={handleCvFileChange}
                />
              )}

              {step === 2 && (
                <StepRoleFields
                  form={form}
                  fieldHasError={fieldHasError}
                  updateField={updateField}
                  updateArrayField={updateArrayField}
                />
              )}

              {step === 3 && (
                <StepPreferencesFields
                  form={form}
                  updateField={updateField}
                  updateArrayField={updateArrayField}
                />
              )}
            </div>

            <div className="flex flex-col items-center gap-4 pt-6 lg:flex-row lg:items-center lg:gap-6">
              <button
                type="submit"
                disabled={loading}
                className="intake-submit w-full lg:w-auto"
              >
                {step === 3
                  ? loading
                    ? 'Submitting…'
                    : 'Submit intake'
                  : 'Continue'}
              </button>

              {step === 1 ? (
                <Link
                  to="/checkout"
                  className="font-body text-center text-[14px] text-foreground underline underline-offset-4 hover:text-muted lg:text-left"
                >
                  Back to checkout
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={handleBack}
                  className="font-body text-center text-[14px] text-foreground underline underline-offset-4 hover:text-muted lg:text-left"
                >
                  Back
                </button>
              )}
            </div>
          </form>
        </IntakePanel>
      </div>
    </IntakeLayout>
  )
}
