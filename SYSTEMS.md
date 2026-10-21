# Systems

Where work happens vs. where its records live. Only systems we have named, or that the repo and its git history show we already use, are listed.

**Rule: the conversation is where a task gets worked out, not its record.**

## Where work happens, and where its record lives today

| Activity | Where it happens today | Where its record lives today |
|---|---|---|
| Having the idea | The user's head. | Nowhere. It exists only in the user's head and in the prompt. |
| Writing code | Claude Code, in this working directory, from a short idea the user gives it. | Commit messages and merged pull requests on GitHub (one branch per ticket, merge commits). |
| Running tests | `pnpm test` locally, run by Claude Code and by the user, and `ci.yml` (job `test`) on every pull request and push to `main`. | The pull request's checks and the Actions run history for `ci.yml`. |
| Checking the result | The user, by reading it and running it by hand, and a review of the pull request. | The pull request's review and its checks. |
| Deploying | `deploy-pages.yml` on GitHub Actions: every push to `main` tests, builds and publishes the site to GitHub Pages at https://orchestratedbyalex.github.io/pincer-wordanalyzer-claude/. The build uses the repository secret `REACT_APP_PIXABAY_API_KEY`. | The Actions run history for `deploy-pages.yml` and the commit and merge history. |

This repository is the public repo `pincer-wordanalyzer-claude`, started from a single initial commit; the history of the earlier repo was left behind on purpose. The Pixabay key is baked into the public bundle by Create React App, so it is treated as public (see `README.md`).

## Who

One person (the user) gives Claude Code the ideas, checks the results, and holds everything in their head. No one else needs to find out what was asked or changed.

## What we want to be able to look up later

For each piece of work:
- What was asked for.
- A one-line summary of what Claude Code did.
- Whether it passed the check.

Today only the middle item has a record (commits and merged PRs). What was asked and whether it passed are not recorded.

## Chosen (provisional)

Provisional: to be checked against a real trace in the next step, and changed if the trace shows it does not hold.

- The record is kept in the GitHub repo as issues: one issue per idea. The summary and the check result are added to the issue when the work is done.
- Flow: the user tells Claude Code the idea; Claude Code creates the GitHub issue for it. When the work is done, Claude Code adds the one-line summary and whether it passed the check, and changes the issue's status.
- Three statuses: created, done, and failed. "Failed" marks work that was attempted but did not succeed, so the issue can be picked up again later.
- A "failed" issue goes straight to "done" if the retry passes the check.
- Retries are started by the user naming one specific issue to Claude Code. Claude Code does not pick up failed issues on its own.
- GitHub is reached through the `gh` CLI, not the GitHub MCP server.

## Open questions

- None from the interview. The "Chosen" section is untested until it is run against a real piece of work.
