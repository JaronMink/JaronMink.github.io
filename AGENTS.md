# AGENTS.md

This repository should be maintained as a privacy-respecting website.

## Sensitive Information

- Never add, stage, commit, or push sensitive information to git under any circumstances.
- Sensitive information includes secrets, API keys, tokens, passwords, credentials, private keys, unpublished private data, and anything that is not clearly intended to be public.
- If a file or change is not obviously meant to be public, stop and check with the user before adding it to git.
- If sensitive information is found in a working tree or staged diff, do not commit it. Tell the user and ask how they want to handle cleanup.

## Cross-Website Consistency

This lab website is maintained alongside the personal website in `../personal-website`.

- When changing content that exists on both sites, update both websites in the same work session.
- Publications are shared content. Keep `_data/publications.yml` consistent with `../personal-website/_data/publications.yml` for IDs, order, dates, titles, venues, areas, links, news, and `citation.bibtex`.
- Prefer the personal website publication metadata when the two sites disagree, unless the lab site needs extra metadata for functionality.
- Keep lab-only publication metadata limited and explicit. For example, author objects with `class: lab-member` are allowed on this site so current lab members can be underlined; preserve equal-contribution suffixes with `suffix: "*"`.
- Keep shared files as transferable as possible between the two sites. Prefer the same field names, URL key patterns, citation blocks, and publication IDs. Avoid site-specific shape changes unless they are required by that site's rendering.
- If adding a link through `url_key`, make sure the corresponding key exists in each site's link registry when needed.
- After publication changes, verify both sites build and, when relevant, compare the two publication YAML files for matching IDs and core fields.

## Privacy Rules

- Keep the site as non-privacy-invasive as possible.
- Google Analytics is the only allowed analytics or tracking tool in this repo.
- Do not add any other analytics, tracking pixels, tag managers, ad tech, session replay, heatmaps, chat widgets, A/B testing scripts, or user fingerprinting tools.
- Do not add any third-party scripts or embeds whose main purpose is tracking, profiling, advertising, or cross-site identification.
- If a proposed change would introduce new user-data collection beyond the current Google Analytics setup, do not implement it unless the user explicitly asks for that exact tool.

## Analytics Boundary

- The existing Google Analytics setup may be maintained, adjusted, or removed.
- No other analytics vendor should be introduced alongside or instead of Google Analytics unless the user explicitly requests it.
- Prefer the minimum data collection needed for the site to function.

## Review Guidance

- Treat privacy regressions as important issues.
- When reviewing changes, call out any new script, embed, cookie, network call, or dependency that could increase visitor tracking or data collection.
