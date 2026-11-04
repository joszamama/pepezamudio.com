# External project reach snapshot

Checked 4 November 2026. These counts appear beside selected merged fixes and public advisories on Impact. They describe whole repositories or packages, not the number of affected installations or users. Download events include repeat and automated installations.

| Repository | GitHub stars |
| --- | ---: |
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | 201,301 |
| [EsotericSoftware/kryo](https://github.com/EsotericSoftware/kryo) | 6,548 |
| [J-F-Liu/lopdf](https://github.com/J-F-Liu/lopdf) | 2,292 |
| [py-pdf/pypdf](https://github.com/py-pdf/pypdf) | 10,286 |
| [haraldk/TwelveMonkeys](https://github.com/haraldk/TwelveMonkeys) | 2,153 |
| [cthackers/adm-zip](https://github.com/cthackers/adm-zip) | 2,186 |
| [Agamnentzar/ag-psd](https://github.com/Agamnentzar/ag-psd) | 738 |
| [psd-tools/psd-tools](https://github.com/psd-tools/psd-tools) | 1,485 |
| [rsc/pdf](https://github.com/rsc/pdf) | 532 |
| [harfbuzz/ttf-parser](https://github.com/harfbuzz/ttf-parser) | 797 |

The `rsc/pdf` repository is archived; its star count is still a repository snapshot. The `ttf-parser` entry is an informational unmaintained notice, not a vulnerability report.

## Package downloads

| Repository | Recorded downloads | Period | Source |
| --- | ---: | --- | --- |
| tensorflow/tensorflow | 1,422,177,586 | PyPI, all time | [pepy.tech](https://pepy.tech/projects/tensorflow) |
| J-F-Liu/lopdf | 28,134,865 | crates.io, all time | [crates.io](https://crates.io/crates/lopdf) |
| py-pdf/pypdf | 1,250,723,355 | PyPI, all time | [pepy.tech](https://pepy.tech/projects/pypdf) |
| cthackers/adm-zip | 2,239,254,861 | npm, 10 Jan 2015–3 Nov 2026 | [npm downloads API](https://github.com/npm/registry/blob/main/docs/download-counts.md) |
| Agamnentzar/ag-psd | 5,816,474 | npm, all available history (package published Dec 2015) | [npm downloads API](https://github.com/npm/registry/blob/main/docs/download-counts.md) |
| psd-tools/psd-tools | 15,672,715 | PyPI, all time | [pepy.tech](https://pepy.tech/projects/psd-tools) |
| harfbuzz/ttf-parser | 131,130,300 | crates.io, all time | [crates.io](https://crates.io/crates/ttf-parser) |

PyPI figures came from pepy.tech's public `personalized-badge/{project}?period=TOTAL&units=NONE` endpoint. Rust figures came from the crates.io API's `crate.downloads` field. npm figures are the sum of annual `downloads/point/{start}:{end}/{package}` queries from 2015 through 3 November 2026. The [npm API documentation](https://github.com/npm/registry/blob/main/docs/download-counts.md#limits) says data begins 10 January 2015. Because adm-zip was published in 2012, its number is a lower bound, not a complete all-time total. ag-psd was first published after the API's start date.

No public lifetime package totals were available for Kryo and TwelveMonkeys on Maven Central or for rsc.io/pdf on Go's module services, so those records show GitHub stars only.
