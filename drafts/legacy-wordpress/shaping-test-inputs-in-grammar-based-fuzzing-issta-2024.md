---
title: "Shaping Test Inputs in Grammar-Based Fuzzing — ISSTA 2024"
description: "My paper “Shaping Test Inputs in Grammar-Based Fuzzing” was published at the 33rd ACM SIGSOFT International Symposium on Software Testing and Analysis (ISSTA 2024), one of the top venues for software testing research. Th"
date: "2024-09-11"
group: "research"
legacyUrl: "https://jzamudio.com/shaping-test-inputs-in-grammar-based-fuzzing-issta-2024/"
---

My paper “Shaping Test Inputs in Grammar-Based Fuzzing” was published at the 33rd ACM SIGSOFT International Symposium on Software Testing and Analysis (ISSTA 2024), one of the top venues for software testing research.

The paper starts from a problem that anyone who has used grammar-based fuzzing will recognize: existing fuzzers are biased. When you define a grammar and let a fuzzer loose, it tends to gravitate toward short inputs and particular structural patterns, leaving large portions of the input space unexplored. This matters because the bugs that are hardest to find often live in the corners of the input space — the ones that naive sampling consistently misses.

The core contribution is a first approach to incorporating distribution sampling directly into grammar-based fuzzing. Instead of letting the fuzzer wander freely through the grammar, you can specify how inputs should be distributed across the space — and the fuzzer will generate test cases that actually reflect that distribution. The paper reviews the state of the art, characterizes its limitations, and presents initial findings showing that distribution-aware fuzzing is both feasible and promising.

This was a solo-authored paper and my first publication at a top-tier testing venue. It also laid the groundwork for several ideas that later made it into Fandango — particularly around how to give users control over the shape and distribution of generated inputs. The full paper is available via the ACM Digital Library.

*[(link to the paper in ACM)](https://github.com/fandango-fuzzer/fandango)*
