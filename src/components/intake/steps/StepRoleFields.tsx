import type { FieldKey, IntakeData } from '../../../lib/intakeForm'
import { IntakeField } from '../IntakeField'
import { IntakeSelect } from '../IntakeSelect'
import { Checkbox } from '../../ui/checkbox'
import { Input } from '../../ui/input'
import { Textarea } from '../../ui/textarea'

interface StepFieldsProps {
  form: IntakeData
  fieldHasError: (key: FieldKey) => boolean
  updateField: <K extends FieldKey>(key: K, value: IntakeData[K]) => void
  updateArrayField: (
    key: 'target_titles' | 'industries_prefer' | 'industries_avoid' | 'companies_like',
    index: number,
    value: string,
  ) => void
}

export function StepRoleFields({
  form,
  fieldHasError,
  updateField,
  updateArrayField,
}: StepFieldsProps) {
  return (
    <div className="flex flex-col gap-4">
      <IntakeField label="Target titles (max 3)" required>
        <div className="flex flex-col gap-2">
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
          onChange={(e) => updateField('work_from_country', e.target.value)}
        />
      </IntakeField>

      <IntakeField label="Location mode" htmlFor="location_mode" required>
        <IntakeSelect
          id="location_mode"
          value={form.location_mode}
          hasError={fieldHasError('location_mode')}
          onChange={(e) => updateField('location_mode', e.target.value)}
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
        />
      </IntakeField>

      <IntakeField
        label="Compensation"
        required
        helper="Enter a pay floor or check Pay unpublished OK — one is required."
      >
        <div className="flex flex-col gap-3">
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
  )
}
