export function IntakePanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[335px] rounded-xl bg-card px-6 py-8 lg:max-w-[720px] lg:rounded-2xl lg:p-12">
      {children}
    </div>
  )
}
