import { Link } from 'react-router-dom'
import { CtaButton } from '../components/layout/CtaButton'
import { PageLayout } from '../components/layout/PageLayout'
import { Section } from '../components/layout/Section'

export function Landing() {
  return (
    <PageLayout>
      {/* Hero */}
      <Section className="border-b border-border pt-16 sm:pt-24">
        <h1 className="text-3xl font-semibold leading-tight sm:text-4xl sm:leading-tight">
          Career Elevator: a curated list of roles that actually fit your
          experience.
        </h1>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
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
        <p className="mt-6 text-sm italic text-muted-foreground">
          Built by Adonay — a product and UX design mentor who has helped more
          than 3,000 students worldwide, with experience at DesignLab, Crehana,
          CareerFoundry and more.
        </p>
        <div className="mt-8 flex flex-col items-start gap-2">
          <CtaButton />
          <p className="text-sm text-muted-foreground">
            Your Opportunity Sheet, delivered in 3–5 days after intake.
          </p>
        </div>
      </Section>

      {/* Who it's for */}
      <Section title="Who it's for" className="border-b border-border">
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>
            Mid-level product or UX designers who are actively job hunting
          </li>
          <li>
            People who have a CV and a portfolio already, and need direction on
            where to point them
          </li>
          <li>
            Designers who know roughly what they want next but not where it
            exists
          </li>
          <li>Anyone spending more time searching than applying</li>
        </ul>
        <div className="mt-8">
          <h3 className="mb-3 text-base font-semibold">Who it's not for</h3>
          <p className="text-muted-foreground">
            If you're looking for someone to rewrite your portfolio, coach you
            through interviews, or apply on your behalf, this isn't that. It's
            research, done carefully, and handed to you.
          </p>
        </div>
      </Section>

      {/* What's included */}
      <Section title="What's included" className="border-b border-border">
        <div className="space-y-6 text-muted-foreground">
          <div>
            <p className="font-medium text-foreground">
              10–20 matched roles.
            </p>
            <p className="mt-1">
              Open positions aligned to your experience level, your target
              direction, and the constraints you give me (location, remote,
              industry, company size). Each with a link and a short line on why
              it's on your sheet.
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground">Gap notes.</p>
            <p className="mt-1">
              A light read on what these roles keep asking for that your CV
              doesn't currently show — the specific things worth tightening
              before you apply.
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground">Market notes.</p>
            <p className="mt-1">
              What's actually showing up for your target right now: patterns in
              titles, requirements, and how these teams are describing the work.
            </p>
          </div>
          <p>
            Delivered as a clean, readable sheet you can work through at your
            own pace.
          </p>
        </div>
      </Section>

      {/* What's not included */}
      <Section title="What's not included" className="border-b border-border">
        <p className="mb-4 text-muted-foreground">
          Stated plainly so there are no surprises:
        </p>
        <ul className="space-y-4 text-muted-foreground">
          <li>
            <span className="font-medium text-foreground">No 1:1 coaching.</span>{' '}
            The sheet stands on its own. (Coaching exists separately if you ever
            want it — it's not part of this.)
          </li>
          <li>
            <span className="font-medium text-foreground">
              No resume or portfolio rewrite.
            </span>{' '}
            I'll tell you what's thin. Tightening it is your work.
          </li>
          <li>
            <span className="font-medium text-foreground">
              No applying on your behalf.
            </span>{' '}
            You apply. You interview. You decide.
          </li>
          <li>
            <span className="font-medium text-foreground">
              No ongoing updates.
            </span>{' '}
            This is a one-time deliverable, not a subscription. The sheet
            reflects the market at the time it's built.
          </li>
          <li>
            <span className="font-medium text-foreground">
              No guaranteed interviews or offers.
            </span>{' '}
            Nobody can honestly promise that. What you get is better targeting
            and less wasted effort.
          </li>
        </ul>
      </Section>

      {/* How it works */}
      <Section title="How it works" className="border-b border-border">
        <ol className="space-y-6 text-muted-foreground">
          <li>
            <p className="font-medium text-foreground">
              1. You pay and complete the intake.
            </p>
            <p className="mt-1">
              A short form: your CV, your portfolio link, what you're looking
              for, and what you'd rather avoid. It takes about 15 minutes to
              fill out properly.
            </p>
          </li>
          <li>
            <p className="font-medium text-foreground">
              2. I build your Opportunity Sheet.
            </p>
            <p className="mt-1">
              Manual research against your actual profile and goals — not a
              keyword filter or an automated feed.
            </p>
          </li>
          <li>
            <p className="font-medium text-foreground">
              3. You get it in 3–5 days.
            </p>
            <p className="mt-1">
              Counted from a complete intake. If something in your intake is
              unclear, I'll ask before I start, and the clock starts once we're
              aligned.
            </p>
          </li>
        </ol>
      </Section>

      {/* Pricing */}
      <Section title="Pricing" className="border-b border-border">
        <p className="text-2xl font-semibold">$49 — one time.</p>
        <p className="mt-2 text-muted-foreground">
          No subscription, no renewal, nothing recurring. You pay once, you get
          the sheet.
        </p>
        <p className="mt-4 text-muted-foreground">
          Payment via <span className="font-medium text-foreground">PayPal</span>{' '}
          or <span className="font-medium text-foreground">crypto</span>.
        </p>
        <div className="mt-8 flex flex-col items-start gap-2">
          <CtaButton />
          <p className="text-sm text-muted-foreground">
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
      </Section>

      {/* FAQ */}
      <Section title="FAQ" className="border-b border-border">
        <dl className="space-y-8">
          <div>
            <dt className="font-medium text-foreground">
              How current are the roles?
            </dt>
            <dd className="mt-2 text-muted-foreground">
              Every sheet is researched when you order it. Roles are open at the
              time of delivery — job postings move fast, so the sooner you work
              through the sheet, the better.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              What if the roles aren't a good fit?
            </dt>
            <dd className="mt-2 text-muted-foreground">
              That usually means the intake was too vague. The more specific you
              are about direction, constraints, and what you don't want, the
              sharper the sheet. Take the intake seriously and it does its job.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Is this automated?
            </dt>
            <dd className="mt-2 text-muted-foreground">
              No. It's researched and written by hand against your CV and goals.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Where do the roles come from?
            </dt>
            <dd className="mt-2 text-muted-foreground">
              I don't scrape random boards and dump whatever matches a keyword.
              I look in the places serious design hiring actually happens — the
              channels and company surfaces where mid-level product and UX roles
              are posted with real intent. The point of the sheet is trust:
              fewer roles, better sources, so you're not spending a week on
              noise.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Who builds Career Elevator?
            </dt>
            <dd className="mt-2 text-muted-foreground">
              Adonay — product and UX design mentor and career coach. I've helped
              more than 3,000 students around the world, with mentoring and
              teaching experience at DesignLab, Crehana, CareerFoundry and more.
              I mentor designers, and my work keeps me close to how hiring
              decisions actually get made. That's the lens every Opportunity
              Sheet is built through — not a job board, but someone who has spent
              years reading CVs, portfolios, and postings side by side.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Can I get more than one sheet?
            </dt>
            <dd className="mt-2 text-muted-foreground">
              Yes, but there's no need to order them back-to-back. Work through
              the first one, tighten what the gap notes point at, then come back
              if a new sheet would help.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Do you do coaching?
            </dt>
            <dd className="mt-2 text-muted-foreground">
              I do, separately. It's not bundled here and there's no pressure
              to add it. If you want to talk after your sheet lands, you can
              reach out.
            </dd>
          </div>
        </dl>
      </Section>

      {/* Closing */}
      <Section className="pb-16 sm:pb-24">
        <h2 className="text-2xl font-semibold sm:text-3xl">
          Stop searching. Start applying.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Career Elevator gives you an Opportunity Sheet: 10–20 roles matched
          to your experience, with honest notes on your gaps and the market. One
          payment, delivered in 3–5 days. Built by someone who has guided
          3,000+ designers through this exact transition.
        </p>
        <div className="mt-8">
          <CtaButton />
        </div>
      </Section>
    </PageLayout>
  )
}
