# Software reach snapshot

Checked 4 November 2026. These are public, all-time download events and repository stars, not unique users. Counts are a snapshot and should be refreshed before a future CV update.

## GitHub stars

The GitHub API returned 26 public, non-fork repositories under [joszamama](https://github.com/joszamama?tab=repositories) with 5 stars in total, and 10 public, non-fork repositories under the [Fandango project](https://github.com/orgs/fandango-fuzzer/repositories) with 169 stars. Combined: **36 repositories, 174 stars**. Forks are excluded because their stars belong to other projects; private repositories are excluded from the public metric. This includes the Fandango and Fanbase repositories rather than treating them as someone else's work.

## Downloads

[José's PyPI maintainer profile](https://pypi.org/user/jose.zamudio/) lists two projects. [fandango-fuzzer](https://pepy.tech/projects/fandango-fuzzer) has **193,990** all-time downloads and [fanbase](https://pepy.tech/projects/fanbase) has **8,200**, for **202,190** PyPI download events. These counts include automated installations and repeat downloads.

The public [Fandango GitHub Packages listing](https://github.com/orgs/fandango-fuzzer/packages) has one container package, [fanbase-coverage](https://github.com/orgs/fandango-fuzzer/packages/container/package/fanbase-coverage), with **27** recorded downloads. The [personal GitHub Packages listing](https://github.com/joszamama?tab=packages) has no public packages.

All releases of the 36 public, non-fork repositories were checked through the GitHub API. The only assets with downloads were in [Fanbase releases](https://github.com/fandango-fuzzer/fanbase/releases): **36** download events across seven assets. Fandango-RS and Fanbase CLI have release assets but no recorded downloads at this snapshot; the remaining repositories have none. Combined with PyPI and GitHub Packages, the public software download total is **202,253**, shown as **202k+** on About. Repository clones are excluded because a public all-time clone count is unavailable.

GitHub source endpoints: [`/users/joszamama/repos`](https://api.github.com/users/joszamama/repos?per_page=100), [`/orgs/fandango-fuzzer/repos`](https://api.github.com/orgs/fandango-fuzzer/repos?per_page=100), and each repository's `/releases` endpoint. The site stores the per-source counts in `src/lib/data.js`.
