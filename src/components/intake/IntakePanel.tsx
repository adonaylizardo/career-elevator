export function IntakePanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[720px] rounded-2xl bg-card px-6 py-8 lg:p-12">
      {children}
    </div>
  )
}
