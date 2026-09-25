import type { FieldKey, IntakeData } from '../../../lib/intakeForm'
import { IntakeCvField } from '../IntakeCvField'
import { IntakeField } from '../IntakeField'
import { Input } from '../../ui/input'

interface StepFieldsProps {
  form: IntakeData
  cvFile: File | null
  fieldHasError: (key: FieldKey) => boolean
  updateField: <K extends FieldKey>(key: K, value: IntakeData[K]) => void
  onCvFileChange: (file: File | null) => void
}

export function StepLinksFields({
  form,
  cvFile,
  fieldHasError,
  updateField,
  onCvFileChange,
}: StepFieldsProps) {
  return (
    <div className="flex flex-col gap-4">
      <IntakeField label="Full name" htmlFor="full_name" required>
        <Input
          id="full_name"
          variant="intake"
          placeholder="Your full name"
          value={form.full_name}
          hasError={fieldHasError('full_name')}
          onChange={(e) => updateField('full_name', e.target.value)}
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
        />
      </IntakeField>

      <IntakeCvField
        cvUrl={form.cv_url}
        cvFile={cvFile}
        hasError={fieldHasError('cv_url')}
        onCvUrlChange={(value) => updateField('cv_url', value)}
        onCvFileChange={onCvFileChange}
      />

      <IntakeField label="Portfolio URL" htmlFor="portfolio_url" required>
        <Input
          id="portfolio_url"
          type="url"
          variant="intake"
          placeholder="https://..."
          value={form.portfolio_url}
          hasError={fieldHasError('portfolio_url')}
          onChange={(e) => updateField('portfolio_url', e.target.value)}
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
        />
      </IntakeField>
    </div>
  )
}
