import { Link } from 'react-router-dom'
import { FaqAccordion } from '../components/landing/FaqAccordion'
import { WhatsIncludedStack } from '../components/landing/WhatsIncludedStack'
import { CtaButton } from '../components/layout/CtaButton'
import { PageLayout } from '../components/layout/PageLayout'
import { Section } from '../components/layout/Section'

const FAQ_ITEMS = [
  {
    question: 'How current are the roles?',
    answer:
      'Every sheet is researched when you order it. Roles are open at the time of delivery — job postings move fast, so the sooner you work through the sheet, the better.',
  },
  {
    question: "What if the roles aren't a good fit?",
    answer:
      "That usually means the intake was too vague. The more specific you are about direction, constraints, and what you don't want, the sharper the sheet. Take the intake seriously and it does its job.",
  },
  {
    question: 'Is this automated?',
    answer:
      "No. It's researched and written by hand against your CV and goals.",
  },
  {
    question: 'Where do the roles come from?',
    answer:
      "I don't scrape random boards and dump whatever matches a keyword. I look in the places serious design hiring actually happens — the channels and company surfaces where mid-level product and UX roles are posted with real intent. The point of the sheet is trust: fewer roles, better sources, so you're not spending a week on noise.",
  },
  {
    question: 'Can I get more than one sheet?',
    answer:
      "Yes, but there's no need to order them back-to-back. Work through the first one, tighten what the gap notes point at, then come back if a new sheet would help.",
  },
  {
    question: 'Do you do coaching?',
    answer:
      "I do, separately. It's not bundled here and there's no pressure to add it. If you want to talk after your sheet lands, you can reach out.",
  },
]

const WHO_FOR_ITEMS = [
  'Mid-level product or UX designers who are actively job hunting',
  'People who have a CV and a portfolio already, and need direction on where to point them',
  'Designers who know roughly what they want next but not where it exists',
  'Anyone spending more time searching than applying',
]

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'You pay and complete the intake.',
    body: "A short form: your CV, your portfolio link, what you're looking for, and what you'd rather avoid. It takes about 15 minutes to fill out properly.",
  },
  {
    step: '2',
    title: 'I build your Opportunity Sheet.',
    body: 'Manual research against your actual profile and goals — not a keyword filter or an automated feed.',
  },
  {
    step: '3',
    title: 'You get it in 3–5 days.',
    body: "Counted from a complete intake. If something in your intake is unclear, I'll ask before I start, and the clock starts once we're aligned.",
  },
]

const NOT_INCLUDED = [
  {
    title: 'No 1:1 coaching.',
    body: "The sheet stands on its own. (Coaching exists separately if you ever want it — it's not part of this.)",
  },
  {
    title: 'No resume or portfolio rewrite.',
    body: "I'll tell you what's thin. Tightening it is your work.",
  },
  {
    title: 'No applying on your behalf.',
    body: 'You apply. You interview. You decide.',
  },
  {
    title: 'No ongoing updates.',
    body: "This is a one-time deliverable, not a subscription. The sheet reflects the market at the time it's built.",
  },
  {
    title: 'No guaranteed interviews or offers.',
    body: "Nobody can honestly promise that. What you get is better targeting and less wasted effort.",
  },
]

export function Landing() {
  return (
    <PageLayout transparentHeader>
      {/* Hero */}
      <section className="bg-background px-5 pb-12 pt-10 text-center sm:px-8 sm:pb-14 sm:pt-12 lg:px-10 lg:pb-16 lg:pt-14">
        <div className="mx-auto max-w-[640px]">
          <p className="mb-5 font-nav text-[11px] uppercase tracking-[0.14em] text-pink">
            ONE-TIME RESEARCH ENGAGEMENT
          </p>
          <h1 className="text-[1.75rem] font-semibold leading-[1.14] tracking-tight sm:text-4xl sm:leading-[1.12] lg:text-[2.625rem] lg:leading-[1.1]">
            Career Elevator: a curated list of roles that actually fit your
            experience.
          </h1>
          <div className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
            <p>
              Career Elevator is a one-time, hand-built research engagement. You
              get the Opportunity Sheet: 10–20 open roles matched to your CV and
              your stated goals, with short notes on where your profile is thin
              and what the market is asking for right now.
            </p>
            <p className="italic">
              Built for mid-level product and UX designers who are tired of
              scrolling job boards and applying into the void.
            </p>
          </div>
          <div className="mt-7 flex flex-col items-center gap-2.5">
            <CtaButton className="h-11 px-8 text-xs sm:h-12 sm:px-10 sm:text-sm" />
            <p className="text-xs text-muted-foreground sm:text-sm">
              Your Opportunity Sheet, delivered in 3–5 days after intake.
            </p>
          </div>
        </div>
      </section>

      {/* What's included — scroll-pinned stack (desktop) / compact stack (mobile) */}
      <WhatsIncludedStack />

      {/* Who it's for */}
      <Section
        id="who-its-for"
        title="Who it's for"
        className="bg-card"
        titleClassName="text-xl sm:text-2xl lg:mb-6"
        containerClassName="max-w-[1200px]"
      >
        <div className="max-w-md lg:max-w-lg">
          <ul className="space-y-3">
            {WHO_FOR_ITEMS.map((item) => (
              <li key={item} className="flex gap-3 text-sm sm:text-[15px]">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pink"
                  aria-hidden
                />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-[16px] bg-surface p-5 sm:p-6">
            <h3 className="text-base font-semibold sm:text-lg">
              Who it&apos;s not for
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              If you&apos;re looking for someone to rewrite your portfolio, coach
              you through interviews, or apply on your behalf, this isn&apos;t
              that. It&apos;s research, done carefully, and handed to you.
            </p>
          </div>
        </div>
      </Section>

      {/* How it works */}
      <Section
        id="how-it-works"
        title="How it works"
        className="bg-background"
        titleClassName="text-xl sm:text-2xl"
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {HOW_IT_WORKS.map((item) => (
            <article
              key={item.step}
              className="rounded-[16px] border border-border/70 bg-card p-5 sm:p-6"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-medium text-accent-foreground">
                {item.step}
              </span>
              <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* What's not included */}
      <Section
        title="What's not included"
        className="bg-card"
        titleClassName="text-xl sm:text-2xl"
      >
        <p className="mb-6 text-sm text-muted-foreground sm:text-[15px]">
          Stated plainly so there are no surprises:
        </p>
        <div className="max-w-2xl space-y-5">
          {NOT_INCLUDED.map((item) => (
            <div key={item.title}>
              <p className="text-base font-semibold">{item.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* About */}
      <Section className="bg-background">
        <div className="max-w-xl">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Built by Adonay — not a job board.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
            Adonay — product and UX design mentor and career coach. I&apos;ve
            helped more than 3,000 students around the world, with mentoring and
            teaching experience at DesignLab, Crehana, CareerFoundry and more. I
            mentor designers, and my work keeps me close to how hiring decisions
            actually get made. That&apos;s the lens every Opportunity Sheet is
            built through — not a job board, but someone who has spent years
            reading CVs, portfolios, and postings side by side.
          </p>
        </div>
      </Section>

      {/* Pricing */}
      <Section
        id="pricing"
        title="Pricing"
        className="bg-card"
        titleClassName="text-xl sm:text-2xl"
      >
        <div className="mx-auto max-w-md rounded-[20px] border border-border/70 bg-background p-6 sm:p-8">
          <p className="text-2xl font-semibold sm:text-3xl">$49 — one time.</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            No subscription, no renewal, nothing recurring. You pay once, you
            get the sheet.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Payment via{' '}
            <span className="font-medium text-foreground">PayPal</span> or{' '}
            <span className="font-medium text-foreground">crypto</span>.
          </p>
          <div className="mt-6 flex flex-col items-start gap-2.5">
            <CtaButton size="default" />
            <p className="text-xs text-muted-foreground sm:text-sm">
              Prefer to see the intake questions first?{' '}
              <Link
                to="/intake"
                className="font-medium text-foreground underline underline-offset-4 hover:text-neutral-600"
              >
                View the intake form
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="bg-background">
        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Answers to your questions
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:max-w-[11rem] sm:text-right">
            Need more information?
            <br />
            Feel free to reach out.
          </p>
        </div>
        <FaqAccordion items={FAQ_ITEMS} defaultOpenIndex={1} />
      </Section>

      {/* Closing CTA */}
      <section className="px-5 pb-12 pt-4 sm:px-8 lg:px-10 lg:pb-16">
        <div className="mx-auto max-w-[1200px] rounded-[28px] border border-border/80 bg-surface px-6 py-8 sm:rounded-[32px] sm:px-8 sm:py-10 lg:rounded-[36px] lg:px-10 lg:py-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-lg">
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                Career Elevator gives you an Opportunity Sheet: 10–20 roles
                matched to your experience, with honest notes on your gaps and
                the market. One payment, delivered in 3–5 days. Built by
                someone who has guided 3,000+ designers through this exact
                transition.
              </p>
              <h2 className="text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.05]">
                Stop searching.
                <br />
                Start applying.
              </h2>
            </div>
            <div className="shrink-0 lg:pb-1">
              <CtaButton className="h-11 px-8 text-xs sm:h-12 sm:px-10 sm:text-sm" />
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
