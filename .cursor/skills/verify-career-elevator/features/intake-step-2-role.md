# Intake step 2 — Role

Step 2 collects role targeting and logistics (`StepRoleFields.tsx`). Section title **Rol y logística**.

## Sub-features

- `intake-s2-targets` — target titles, location, languages, authorization.
- `intake-s2-comp` — compensation floor or **Pay unpublished OK**.

## How to get to it (user POV)

- Complete step 1 and choose **Continue**.
- Direct `/intake` only shows step 2 after step 1 validates (use scripted fill in `drive.mjs`).

## Driving it with Playwright

Preconditions:

- Progress `2 / 3`; section **Rol y logística** visible.

- **Fill required fields.** First target title placeholder **Title 1**, `#work_from_country`, `#languages`, `#work_auth`, `#constraints`, `#timeline`, `#goal_one_liner`, and either `#pay_floor` or check **Pay unpublished OK — I prefer not to share a number**.
- **Proof.** Screenshot `*-intake-step-2.png`.
- **Continue.** Click **Continue**; progress `3 / 3`.

## Gotchas

- At least one target title required; empty second and third slots are fine.
- Constraints max 400 characters; goal one-liner max 280.
