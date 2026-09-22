import { useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { cn } from '../../lib/utils'
import { CV_ACCEPT_INPUT } from '../../lib/intakeForm'

interface IntakeCvFieldProps {
  cvUrl: string
  cvFile: File | null
  hasError?: boolean
  onCvUrlChange: (value: string) => void
  onCvFileChange: (file: File | null) => void
}

export function IntakeCvField({
  cvUrl,
  cvFile,
  hasError,
  onCvUrlChange,
  onCvFileChange,
}: IntakeCvFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    onCvFileChange(file)
    e.target.value = ''
  }

  function handleClearFile(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    onCvFileChange(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="flex flex-col gap-2">
      <Label variant="intake" htmlFor="cv_url" required>
        CV
      </Label>

      <div className="flex flex-col gap-2">
        <label
          className={cn(
            'intake-cv-upload relative flex cursor-pointer flex-col items-center justify-center rounded-lg border border-field bg-field px-4',
            hasError && 'intake-field-error',
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept={CV_ACCEPT_INPUT}
            className="sr-only"
            onChange={handleFileChange}
          />
          {cvFile ? (
            <div className="flex w-full items-center justify-between gap-3 py-4">
              <span className="truncate font-body text-[14px] font-medium leading-[1.35] text-foreground">
                {cvFile.name}
              </span>
              <button
                type="button"
                onClick={handleClearFile}
                className="shrink-0 font-body text-[13px] font-light leading-[1.35] text-muted underline underline-offset-2 hover:text-foreground"
              >
                Remove
              </button>
            </div>
          ) : (
            <>
              <span className="font-body text-[14px] font-medium leading-[1.35] text-foreground">
                Upload PDF or DOC
              </span>
              <span className="font-body mt-1 text-[13px] font-light leading-[1.35] text-muted">
                Max 10 MB
              </span>
            </>
          )}
        </label>

        <Input
          id="cv_url"
          type="url"
          variant="intake"
          placeholder="https://drive.google.com/..."
          value={cvUrl}
          hasError={hasError}
          className="h-11 lg:h-12"
          onChange={(e) => onCvUrlChange(e.target.value)}
        />
      </div>

      <p className="font-body text-[13px] font-light leading-[1.4] text-muted">
        PDF/DOC or a link to Drive/Dropbox
      </p>
    </div>
  )
}
