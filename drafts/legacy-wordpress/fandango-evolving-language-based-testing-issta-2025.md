---
title: "FANDANGO: Evolving Language-Based Testing — ISSTA 2025"
description: "Our paper “FANDANGO: Evolving Language-Based Testing” was published in the Proceedings of the ACM on Software Engineering at ISSTA 2025, co-authored with Marius Smytzek and Andreas Zeller. This is the main research paper"
date: "2025-06-22"
group: "research"
legacyUrl: "https://jzamudio.com/fandango-evolving-language-based-testing-issta-2025/"
---

Our paper “FANDANGO: Evolving Language-Based Testing” was published in the Proceedings of the ACM on Software Engineering at ISSTA 2025, co-authored with Marius Smytzek and Andreas Zeller. This is the main research paper behind the Fandango fuzzer.

Language-based fuzzers work by combining a formal grammar — which defines what valid inputs look like structurally — with constraints that capture semantic requirements, things like “this checksum must match the payload” or “this voltage field must follow a Gaussian distribution and never exceed 20mV.” The leading tool in this space before Fandango was ISLa, which uses symbolic constraint solving to satisfy these constraints. Symbolic solving is precise, but it is also slow — and it restricts you to whatever constraint language the solver supports.

Fandango takes a different approach. Instead of solving constraints symbolically, it uses a genetic algorithm. It starts with a population of random inputs generated from the grammar, evaluates each one against the defined constraints, and iteratively evolves the population through mutations and crossovers — keeping the inputs that best satisfy the constraints and discarding the rest. This is the same logic behind natural selection, applied to test input generation.

The practical consequences are significant. In our experiments, Fandango is faster than ISLa by one to three orders of magnitude, without sacrificing precision. And because constraints in Fandango are written in plain Python rather than a solver-specific language, there are essentially no limits on what you can express. Any Python code, any library, any testing goal — if you can write it in Python, Fandango can use it as a constraint.

This paper was presented at ISSTA 2025 in Trondheim, Norway, to a full lecture hall. It is the foundation for everything else we have built with Fandango since, including protocol fuzzing, GNSS testing, and XML injection detection. The full paper is available open access via the ACM Digital Library.

[(link to the paper in ACM)](https://dl.acm.org/doi/10.1145/3728915)
