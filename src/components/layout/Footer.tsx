export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <p className="text-sm font-medium text-foreground">Career Elevator</p>
        <p className="font-nav text-[11px] uppercase tracking-wide text-muted-foreground">
          © 2026 Adonay Lizardo · Research, not a job board.
        </p>
      </div>
    </footer>
  )
}
