import { Link } from 'react-router-dom'
import { FaqAccordion } from '../components/landing/FaqAccordion'
import { WhatsIncludedStack } from '../components/landing/WhatsIncludedStack'
import { CtaButton } from '../components/layout/CtaButton'
import { PageLayout } from '../components/layout/PageLayout'

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
    question: 'Who builds Career Elevator?',
    answer:
      "Adonay — product and UX design mentor and career coach. I've helped more than 3,000 students around the world, with mentoring and teaching experience at DesignLab, Crehana, CareerFoundry and more. I mentor designers, and my work keeps me close to how hiring decisions actually get made. That's the lens every Opportunity Sheet is built through — not a job board, but someone who has spent years reading CVs, portfolios, and postings side by side.",
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
      <section className="bg-background px-6 pb-12 pt-20 text-center lg:px-20 lg:pb-20 lg:pt-[120px]">
        <div className="mx-auto flex max-w-[900px] flex-col items-center gap-5">
          <p className="text-hero-eyebrow uppercase">
            <span className="lg:hidden">ONE-TIME RESEARCH</span>
            <span className="hidden lg:inline">
              ONE-TIME RESEARCH ENGAGEMENT
            </span>
          </p>
          <h1 className="text-hero-h1 max-w-[820px]">
            Career Elevator: a curated list of roles that actually fit your
            experience.
          </h1>
          <div className="flex max-w-[720px] flex-col gap-4">
            <p className="text-hero-body hidden lg:block">
              Get a one-time, hand-built research engagement. You get the
              Opportunity Sheet: 10–20 open roles matched to your CV and your
              stated goals, with short notes on where your profile is thin and
              what the market is asking for right now.
            </p>
            <p className="text-hero-body lg:hidden">
              Career Elevator is a one-time, hand-built research engagement. You
              get the Opportunity Sheet: 10–20 open roles matched to your CV
              and your stated goals, with short notes on where your profile is
              thin and what the market is asking for right now.
            </p>
            <p className="text-hero-audience">
              Built for mid-level product and UX designers who are tired of
              scrolling job boards and applying into the void.
            </p>
          </div>
          <div className="flex w-full max-w-[420px] flex-col items-center gap-2.5 pt-4">
            <CtaButton
              variant="pill"
              className="hidden w-auto justify-center lg:inline-flex"
            />
            <CtaButton
              variant="mobile"
              className="inline-flex w-full justify-center lg:hidden"
            />
            <p className="text-hero-micro">
              Your Opportunity Sheet, delivered in 3–5 days after intake.
            </p>
          </div>
        </div>
      </section>

      <WhatsIncludedStack />

      {/* Who it's for */}
      <section
        id="who-its-for"
        className="bg-card px-5 py-12 lg:px-[120px] lg:py-[96px]"
      >
        <div className="mx-auto flex max-w-[520px] flex-col gap-10">
          <div>
            <h2 className="text-section-title mb-5">Who it&apos;s for</h2>
            <ul className="flex flex-col gap-5">
              {WHO_FOR_ITEMS.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent"
                    aria-hidden
                  />
                  <span className="text-body-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[20px] border border-border bg-background p-7 lg:rounded-[20px]">
            <h3 className="text-section-title mb-4 text-[28px] leading-[0.95] tracking-[-0.5px] lg:text-[40px] lg:leading-[0.9] lg:tracking-[-0.8px]">
              Who it&apos;s not for
            </h3>
            <p className="text-body-muted">
              If you&apos;re looking for someone to rewrite your portfolio,
              coach you through interviews, or apply on your behalf, this
              isn&apos;t that. It&apos;s research, done carefully, and handed
              to you.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="bg-background px-5 py-12 lg:px-[120px] lg:py-[96px]"
      >
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-section-title mb-10">How it works</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {HOW_IT_WORKS.map((item) => (
              <article
                key={item.step}
                className="rounded-[20px] border border-border bg-card p-7"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-badge font-mono text-[12px] font-medium tracking-[0.8px] text-white">
                  {item.step}
                </span>
                <h3 className="text-section-title mt-5 text-[28px] leading-[0.95] tracking-[-0.5px] lg:text-[40px] lg:leading-[0.9] lg:tracking-[-0.8px]">
                  {item.title}
                </h3>
                <p className="text-body-muted mt-4">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What's not included */}
      <section className="bg-card px-5 py-12 lg:px-[120px] lg:py-[96px]">
        <div className="mx-auto max-w-[900px]">
          <h2 className="text-section-title mb-4">What&apos;s not included</h2>
          <p className="text-body-muted mb-8">
            Stated plainly so there are no surprises:
          </p>
          <div className="flex flex-col gap-4">
            {NOT_INCLUDED.map((item) => (
              <div
                key={item.title}
                className="rounded-[12px] px-5 py-4"
              >
                <p className="font-body text-[15px] font-medium leading-[1.4] text-foreground">
                  {item.title}
                </p>
                <p className="text-body-muted mt-1 text-[15px] leading-[1.4]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof / About */}
      <section className="bg-background px-5 py-12 lg:px-[120px] lg:py-[96px]">
        <div className="mx-auto max-w-[900px]">
          <span className="inline-flex rounded-full bg-accent-soft px-3 py-1.5 uppercase">
            <span className="text-about-tag">About</span>
          </span>
          <h2 className="text-section-title mt-7">
            Built by Adonay — not a job board.
          </h2>
          <p className="text-body-muted mt-5 max-w-[760px]">
            Product and UX design mentor and career coach. I&apos;ve helped more
            than 3,000 students around the world, with mentoring and teaching
            experience at DesignLab, Crehana, CareerFoundry and more. I mentor
            designers, and my work keeps me close to how hiring decisions
            actually get made.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="bg-card px-5 py-12 lg:px-[120px] lg:py-[96px]"
      >
        <div className="mx-auto flex max-w-[480px] flex-col items-center gap-7">
          <h2 className="text-section-title">Pricing</h2>
          <div className="w-full rounded-[24px] border border-border p-10 text-center">
            <p className="text-section-title">$49 — one time.</p>
            <p className="text-body-muted mt-4">
              No subscription, no renewal, nothing recurring. You pay once, you
              get the sheet.
            </p>
            <p className="text-body-muted mt-4">
              Payment via PayPal or crypto.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3">
              <CtaButton className="hidden lg:inline-flex" />
              <CtaButton variant="mobile" className="w-full justify-center lg:hidden" />
              <p className="font-body text-[13px] leading-[1.3] text-muted-alt">
                Prefer to see the intake questions first?{' '}
                <Link
                  to="/intake"
                  className="text-foreground underline underline-offset-4"
                >
                  View the intake form
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-background px-5 py-12 lg:px-[120px] lg:py-[96px]">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-section-title">
              Answers to your questions
            </h2>
            <p className="text-body-muted hidden text-right sm:block sm:max-w-[180px]">
              Need more information?
              <br />
              Feel free to reach out.
            </p>
          </div>
          <FaqAccordion items={FAQ_ITEMS} defaultOpenIndex={1} />
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-[#E0E0E0] bg-background px-5 pb-4 pt-6 lg:px-20 lg:pb-6 lg:pt-10">
        <p className="text-body-muted mb-4 text-center text-[12px] lg:hidden">
          © 2026 Adonay Lizardo
        </p>
        <div className="mx-auto flex max-w-[1280px] min-h-[360px] flex-col justify-between gap-8 rounded-[24px] border border-[#E0E0E0] bg-surface p-6 lg:h-[480px] lg:rounded-[32px] lg:p-[60px]">
          <div className="max-w-[575px]">
            <p className="text-close-body">
              Career Elevator gives you an Opportunity Sheet: 10–20 roles
              matched to your experience, with honest notes on your gaps and
              the market. One payment, delivered in 3–5 days.
            </p>
            <p className="text-close-body mt-3 hidden lg:block">
              Built by someone who has guided 3,000+ designers through this
              exact transition.
            </p>
          </div>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="text-close-h2 max-w-[871px]">
              Stop searching.
              <br />
              Start applying.
            </h2>
            <p className="text-close-body lg:hidden">
              One payment, delivered in 3–5 days. Built by someone who has
              guided 3,000+ designers through this exact transition.
            </p>
            <CtaButton
              variant="close"
              className="w-full shrink-0 justify-center lg:w-auto"
            />
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
