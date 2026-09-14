import { Link } from 'react-router-dom'
import { CtaButton } from '../components/layout/CtaButton'
import { FaqAccordion } from '../components/layout/FaqAccordion'
import { PageLayout } from '../components/layout/PageLayout'
import { PillarCard } from '../components/layout/PillarCard'
import { Section } from '../components/layout/Section'
import { TrustStrip } from '../components/layout/TrustStrip'

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

export function Landing() {
  return (
    <PageLayout>
      {/* 1. Trust strip */}
      <TrustStrip />

      {/* 2. Hero */}
      <Section className="pt-12 sm:pt-20" wide centered>
        <h1 className="text-balance text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
          Career Elevator: a curated list of roles that actually fit your
          experience.
        </h1>
        <div className="mx-auto mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          <p>
            Career Elevator is a one-time, hand-built research engagement. You
            get the Opportunity Sheet: 10–20 open roles matched to your CV and
            your stated goals, with short notes on where your profile is thin
            and what the market is asking for right now.
          </p>
          <p>
            Built for mid-level product and UX designers who are tired of
            scrolling job boards and applying into the void.
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-sm italic text-muted-foreground">
          Built by Adonay — a product and UX design mentor who has helped more
          than 3,000 students worldwide, with experience at DesignLab, Crehana,
          CareerFoundry and more.
        </p>
        <div className="mt-10 flex flex-col items-center gap-3">
          <CtaButton />
          <p className="font-mono-label text-[10px] text-muted">
            Your Opportunity Sheet, delivered in 3–5 days after intake.
          </p>
        </div>
      </Section>

      {/* 3. Pillars / What you get */}
      <Section title="What's included" wide label="What you get">
        <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
          <PillarCard title="10–20 matched roles." variant="accent">
            <p>
              Open positions aligned to your experience level, your target
              direction, and the constraints you give me (location, remote,
              industry, company size). Each with a link and a short line on why
              it's on your sheet.
            </p>
          </PillarCard>
          <PillarCard title="Gap notes.">
            <p>
              A light read on what these roles keep asking for that your CV
              doesn't currently show — the specific things worth tightening
              before you apply.
            </p>
          </PillarCard>
          <PillarCard title="Market notes.">
            <p>
              What's actually showing up for your target right now: patterns in
              titles, requirements, and how these teams are describing the work.
            </p>
          </PillarCard>
        </div>
        <p className="mt-8 text-center text-muted-foreground">
          Delivered as a clean, readable sheet you can work through at your own
          pace.
        </p>
      </Section>

      {/* 4. Who it's for / Who it's not */}
      <Section wide>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="card-surface p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Who it's for
            </h2>
            <ul className="mt-6 space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-pink mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pink" />
                Mid-level product or UX designers who are actively job hunting
              </li>
              <li className="flex gap-3">
                <span className="text-pink mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pink" />
                People who have a CV and a portfolio already, and need direction
                on where to point them
              </li>
              <li className="flex gap-3">
                <span className="text-pink mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pink" />
                Designers who know roughly what they want next but not where it
                exists
              </li>
              <li className="flex gap-3">
                <span className="text-pink mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pink" />
                Anyone spending more time searching than applying
              </li>
            </ul>
          </div>
          <div className="card-surface halftone-bg-dark p-6 text-white sm:p-8">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Who it's not for
            </h2>
            <p className="mt-6 leading-relaxed text-white/75">
              If you're looking for someone to rewrite your portfolio, coach you
              through interviews, or apply on your behalf, this isn't that. It's
              research, done carefully, and handed to you.
            </p>
          </div>
        </div>
      </Section>

      {/* 5. How it works */}
      <Section title="How it works" wide label="Process">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              step: '01',
              title: 'You pay and complete the intake.',
              body: 'A short form: your CV, your portfolio link, what you\'re looking for, and what you\'d rather avoid. It takes about 15 minutes to fill out properly.',
            },
            {
              step: '02',
              title: 'I build your Opportunity Sheet.',
              body: 'Manual research against your actual profile and goals — not a keyword filter or an automated feed.',
            },
            {
              step: '03',
              title: 'You get it in 3–5 days.',
              body: "Counted from a complete intake. If something in your intake is unclear, I'll ask before I start, and the clock starts once we're aligned.",
            },
          ].map((item) => (
            <div key={item.step} className="card-surface p-6 sm:p-8">
              <span className="font-mono-label text-[10px] text-pink">
                Step {item.step}
              </span>
              <p className="mt-3 font-display text-lg font-bold leading-snug">
                {item.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 6. Boundaries / What's not included */}
      <Section title="What's not included" wide label="Boundaries">
        <p className="mb-6 text-muted-foreground">
          Stated plainly so there are no surprises:
        </p>
        <div className="card-surface divide-y divide-border/60">
          {[
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
              body: 'Nobody can honestly promise that. What you get is better targeting and less wasted effort.',
            },
          ].map((item) => (
            <div key={item.title} className="px-6 py-5 sm:px-8">
              <p className="font-display font-semibold">{item.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 7. Proof */}
      <Section wide label="Proof">
        <div className="card-surface-lg halftone-bg-dark overflow-hidden p-8 sm:p-12">
          <p className="font-mono-label text-[10px] text-pink">
            Who builds Career Elevator?
          </p>
          <p className="mt-6 font-display text-xl font-bold leading-snug text-white sm:text-2xl md:text-3xl">
            Adonay — product and UX design mentor and career coach.
          </p>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/75 sm:text-base">
            I've helped more than 3,000 students around the world, with
            mentoring and teaching experience at DesignLab, Crehana,
            CareerFoundry and more. I mentor designers, and my work keeps me
            close to how hiring decisions actually get made. That's the lens
            every Opportunity Sheet is built through — not a job board, but
            someone who has spent years reading CVs, portfolios, and postings
            side by side.
          </p>
        </div>
      </Section>

      {/* 8. Pricing */}
      <Section title="Pricing" wide label="Simple pricing" id="pricing">
        <div className="card-surface-lg p-8 sm:p-10">
          <p className="font-display text-4xl font-extrabold sm:text-5xl">
            $49 — one time.
          </p>
          <p className="mt-3 text-muted-foreground">
            No subscription, no renewal, nothing recurring. You pay once, you get
            the sheet.
          </p>
          <p className="mt-4 text-muted-foreground">
            Payment via{' '}
            <span className="font-medium text-foreground">PayPal</span> or{' '}
            <span className="font-medium text-foreground">crypto</span>.
          </p>
          <div className="mt-8 flex flex-col items-start gap-3">
            <CtaButton />
            <p className="text-sm text-muted-foreground">
              Prefer to see the intake questions first?{' '}
              <Link
                to="/intake"
                className="font-medium text-foreground underline underline-offset-4 hover:text-pink"
              >
                View the intake form
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>

      {/* 9. FAQ */}
      <Section title="FAQ" wide label="Answers">
        <FaqAccordion items={FAQ_ITEMS} />
      </Section>

      {/* 10. Closing */}
      <Section wide centered className="pb-20 sm:pb-28">
        <div className="card-surface mx-auto max-w-3xl p-8 sm:p-12">
          <h2 className="text-balance text-3xl font-bold sm:text-4xl">
            Stop searching. Start applying.
          </h2>
          <p className="mt-5 text-muted-foreground">
            Career Elevator gives you an Opportunity Sheet: 10–20 roles matched
            to your experience, with honest notes on your gaps and the market. One
            payment, delivered in 3–5 days. Built by someone who has guided 3,000+
            designers through this exact transition.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaButton />
          </div>
        </div>
      </Section>
    </PageLayout>
  )
}
