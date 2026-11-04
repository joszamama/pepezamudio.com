---
title: "Better-Distributed Grammar-Based Fuzzing"
description: "UniFuzz is a grammar-based fuzzing tool that generates test suites with better input distribution. Instead of randomly sampling from a grammar (which tends to produce short, repetitive inputs), UniFuzz lets you specify h"
date: "2024-06-13"
group: "projects"
legacyUrl: "https://jzamudio.com/better-distributed-grammar-based-fuzzing/"
---

UniFuzz is a grammar-based fuzzing tool that generates test suites with better input distribution. Instead of randomly sampling from a grammar (which tends to produce short, repetitive inputs), UniFuzz lets you specify how values should be distributed — uniform, normal, or custom — and generates a population that actually covers the input space.

You define a grammar, annotate the fields you want to control with distribution constraints, and UniFuzz handles the rest using an optimization-based approach under the hood.

The repository includes experiments, proof-of-concept modules, and a set of example grammars to get started.

*[(link to the public repository in GitHub)](https://github.com/joszamama/unifuzz)*
