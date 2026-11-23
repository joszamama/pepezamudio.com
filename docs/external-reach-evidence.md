# External project reach snapshot

Checked 23 November 2026 (previous snapshot: 4 November 2026). These counts appear beside each project in the "Fixes, reports & advisories" list on Impact. They describe whole repositories or packages, not the number of affected installations or users. Download events include repeat and automated installations.

## GitHub stars

Stars for the projects with open reports were read from the GitHub API on the same day and are stored in `externalRepositoryReach.stars` in `src/lib/data.js` (55 repositories in all). FFmpeg and file are developed elsewhere; their counts come from the official GitHub mirrors (`FFmpeg/FFmpeg`, `file/file`) and are labeled as mirrors on the page. bfj is hosted on GitLab and shows no star count. FlamaPy's count is the sum of its four repositories listed below.

Projects with merged fixes or published advisories:

| Repository | GitHub stars |
| --- | ---: |
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | 201,695 |
| [EsotericSoftware/kryo](https://github.com/EsotericSoftware/kryo) | 6,551 |
| [J-F-Liu/lopdf](https://github.com/J-F-Liu/lopdf) | 2,297 |
| [py-pdf/pypdf](https://github.com/py-pdf/pypdf) | 10,307 |
| [haraldk/TwelveMonkeys](https://github.com/haraldk/TwelveMonkeys) | 2,156 |
| [cthackers/adm-zip](https://github.com/cthackers/adm-zip) | 2,186 |
| [Agamnentzar/ag-psd](https://github.com/Agamnentzar/ag-psd) | 746 |
| [psd-tools/psd-tools](https://github.com/psd-tools/psd-tools) | 1,489 |
| [rsc/pdf](https://github.com/rsc/pdf) | 533 |
| [harfbuzz/ttf-parser](https://github.com/harfbuzz/ttf-parser) | 798 |
| [flamapy/z3_metamodel](https://github.com/flamapy/z3_metamodel) | 0 |
| [flamapy/flamapy](https://github.com/flamapy/flamapy) | 6 |
| [flamapy/fm_metamodel](https://github.com/flamapy/fm_metamodel) | 3 |
| [flamapy/bdd_metamodel](https://github.com/flamapy/bdd_metamodel) | 2 |
| [Universal-Variability-Language/uvl-parser](https://github.com/Universal-Variability-Language/uvl-parser) | 20 |
| [dignifiedquire/async-tar](https://github.com/dignifiedquire/async-tar) | 83 |

The `rsc/pdf` repository is archived; its star count is still a repository snapshot. The `ttf-parser` entry is an informational unmaintained notice, not a vulnerability report.

## Package downloads

| Repository | Recorded downloads | Period | Source |
| --- | ---: | --- | --- |
| tensorflow/tensorflow | 1,429,076,191 | PyPI, all time | [pepy.tech](https://pepy.tech/projects/tensorflow) |
| J-F-Liu/lopdf | 32,338,263 | crates.io, all time | [crates.io](https://crates.io/crates/lopdf) |
| py-pdf/pypdf | 1,384,934,359 | PyPI, all time | [pepy.tech](https://pepy.tech/projects/pypdf) |
| cthackers/adm-zip | 2,345,214,909 | npm, 10 Jan 2015–23 Nov 2026 | [npm downloads API](https://github.com/npm/registry/blob/main/docs/download-counts.md) |
| Agamnentzar/ag-psd | 7,649,454 | npm, all available history (package published Dec 2015) | [npm downloads API](https://github.com/npm/registry/blob/main/docs/download-counts.md) |
| psd-tools/psd-tools | 17,921,931 | PyPI, all time | [pepy.tech](https://pepy.tech/projects/psd-tools) |
| harfbuzz/ttf-parser | 144,814,506 | crates.io, all time | [crates.io](https://crates.io/crates/ttf-parser) |
| dignifiedquire/async-tar | 9,412,007 | crates.io, all time | [crates.io](https://crates.io/crates/async-tar) |

PyPI figures came from pepy.tech's public `static.pepy.tech/personalized-badge/{project}?period=total&units=NONE` endpoint. Rust figures came from the crates.io API's `crate.downloads` field. npm figures are the sum of annual `downloads/point/{start}:{end}/{package}` queries from 2015 through 23 November 2026. The [npm API documentation](https://github.com/npm/registry/blob/main/docs/download-counts.md#limits) says data begins 10 January 2015. Because adm-zip was published in 2012, its number is a lower bound, not a complete all-time total. ag-psd was first published after the API's start date.

No public lifetime package totals were available for Kryo and TwelveMonkeys on Maven Central or for rsc.io/pdf on Go's module services, so those projects show GitHub stars only.

## Open reports

The 53 open entries are public issues and pull requests that were open on 23 November 2026 (checked through the GitHub API, and by hand on code.ffmpeg.org, bugs.astron.com, GitLab and Launchpad). Private reports are counted on the page but not named.
