---
title: "Fandango is Live"
description: "After months of building, testing, and a few too many late nights debugging evolutionary algorithms, Fandango is officially out. Fandango is an open-source fuzzer I’ve been developing as part of my PhD at CISPA Helmholtz"
date: "2025-06-26"
group: "projects"
legacyUrl: "https://jzamudio.com/fandango-is-live/"
---

After months of building, testing, and a few too many late nights debugging evolutionary algorithms, Fandango is officially out.

Fandango is an open-source fuzzer I’ve been developing as part of my PhD at CISPA Helmholtz Center for Information Security. The core idea came from a simple frustration: most fuzzers are either too dumb or too rigid. Random mutation fuzzers throw noise at a program and hope something breaks. Grammar-based fuzzers respect structure but tend to cluster around the same kinds of inputs, leaving large parts of the input space unexplored.

Fandango tries to do better. You describe what valid inputs look like using a formal grammar combined with constraints written in plain Python — things like “this field should be between 0 and 100” or “this checksum should match the payload.” Fandango then uses an evolutionary algorithm to generate a population of inputs that satisfy all of those constraints, iteratively mutating and crossing them over until they’re exactly what you need.

The result is a fuzzer that is expressive enough to handle real-world input formats, fast enough to run at scale, and flexible enough to adapt to whatever testing goal you have in mind.

It ships with two modes: black-box fuzzing directly from a .fan specification file, and mutation of existing inputs for more realistic, coverage-driven test cases. The specification language is intentionally simple — if you know Python, you already know most of it.

Fandango was published at ISSTA 2025, one of the top venues for software testing research. The paper, co-authored with Marius Smytzek and Andreas Zeller, shows that Fandango is one to three orders of magnitude faster than ISLa, the previous state of the art, without sacrificing precision.

The code is open source and lives on GitHub. If you work on fuzzing, security testing, or just want to stress-test something — give it a try, and let us know what you think.

*[(link to the public repository in GitHub)](https://github.com/fandango-fuzzer/fandango)*
