import type { FieldKey, IntakeData } from '../../../lib/intakeForm'
import { IntakeField } from '../IntakeField'
import { IntakeSelect } from '../IntakeSelect'
import { Input } from '../../ui/input'
import { Textarea } from '../../ui/textarea'

interface StepFieldsProps {
  form: IntakeData
  updateField: <K extends FieldKey>(key: K, value: IntakeData[K]) => void
  updateArrayField: (
    key: 'target_titles' | 'industries_prefer' | 'industries_avoid' | 'companies_like',
    index: number,
    value: string,
  ) => void
}

export function StepPreferencesFields({
  form,
  updateField,
  updateArrayField,
}: StepFieldsProps) {
  return (
    <div className="flex flex-col gap-4">
      <IntakeField label="City" htmlFor="city">
        <Input
          id="city"
          variant="intake"
          placeholder="City"
          value={form.city}
          onChange={(e) => updateField('city', e.target.value)}
        />
      </IntakeField>

      <IntakeField label="Industries prefer (max 3)">
        <div className="flex flex-col gap-2">
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
        <div className="flex flex-col gap-2">
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

      <IntakeField label="Companies like (max 3)">
        <div className="flex flex-col gap-2">
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

      <IntakeField label="Employment type" htmlFor="employment_type">
        <IntakeSelect
          id="employment_type"
          value={form.employment_type}
          onChange={(e) => updateField('employment_type', e.target.value)}
        >
          <option value="FTE">FTE</option>
          <option value="contract">Contract</option>
          <option value="freelance">Freelance</option>
          <option value="open">Open to any</option>
        </IntakeSelect>
      </IntakeField>

      <IntakeField label="Already applied" htmlFor="already_applied">
        <Textarea
          id="already_applied"
          variant="intake"
          placeholder="Companies or roles you've already applied to..."
          value={form.already_applied}
          onChange={(e) => updateField('already_applied', e.target.value)}
        />
      </IntakeField>

      <IntakeField label="Notice period" htmlFor="notice_period">
        <Input
          id="notice_period"
          variant="intake"
          placeholder="e.g. 2 weeks"
          value={form.notice_period}
          onChange={(e) => updateField('notice_period', e.target.value)}
        />
      </IntakeField>

      <IntakeField label="Overlap hours (timezone)" htmlFor="overlap_hours">
        <Input
          id="overlap_hours"
          variant="intake"
          placeholder="e.g. 9–12 CET"
          value={form.overlap_hours}
          onChange={(e) => updateField('overlap_hours', e.target.value)}
        />
      </IntakeField>

      <IntakeField label="English level" htmlFor="english_level">
        <IntakeSelect
          id="english_level"
          value={form.english_level}
          onChange={(e) => updateField('english_level', e.target.value)}
        >
          <option value="">Not specified</option>
          <option value="native">Native</option>
          <option value="fluent">Fluent</option>
          <option value="professional">Professional</option>
          <option value="conversational">Conversational</option>
        </IntakeSelect>
      </IntakeField>
    </div>
  )
}
