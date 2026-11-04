---
title: "Why input distribution matters"
description: "The question behind my ISSTA doctoral symposium paper and UniFuzz: what parts of an input space does a grammar-based fuzzer actually visit?"
date: "2026-11-04"
group: "research"
---

A grammar can describe a wide range of valid inputs while a generator keeps producing a narrow corner of it. If short derivations are easier to reach, a fuzzer may fill a corpus with small, similar examples. Validity alone does not tell me whether I have tested the parts of the format I care about.

That question led to my ISSTA 2024 doctoral symposium paper, [“Shaping Test Inputs in Grammar-Based Fuzzing”](https://doi.org/10.1145/3650212.3685553), and to [UniFuzz](https://github.com/joszamama/unifuzz), an early prototype for generating test suites with chosen distributions. The starting point was simple: if a field or structure matters to a test, I want a way to say how often it should appear.

Consider an input format with an optional branch. A grammar tells the generator that both paths are legal. It does not guarantee that a hundred generated tests will explore both paths in a useful proportion. The distribution of the suite is another testing decision, whether we make it explicitly or let an algorithm make it for us.

UniFuzz experiments with making that decision visible. It combines a grammar with distribution constraints for selected values, then searches for a population of inputs that better matches the chosen shape. The [repository](https://github.com/joszamama/unifuzz) contains the prototype and examples; the [paper copy](/papers/shaping-test-inputs-grammar-based-fuzzing.pdf) explains the research question. This was early work, not a claim that every grammar or distribution can be handled equally well.

I still return to the same question in later projects: what did the generator *actually* exercise? A corpus size is easy to count. The parts of the input space it leaves untouched are harder to see, and often more interesting.

Reworked from my [earlier UniFuzz note](https://jzamudio.com/better-distributed-grammar-based-fuzzing/) and [ISSTA post](https://jzamudio.com/shaping-test-inputs-in-grammar-based-fuzzing-issta-2024/).
