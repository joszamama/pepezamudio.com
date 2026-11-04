---
title: "Personalized Fuzzing: Testing a GNSS Module with Fandango — ISSTA 2025"
description: "Our paper “Personalized Fuzzing: A Case Study with the FANDANGO Fuzzer on a GNSS Module” was published at the 34th ACM SIGSOFT International Symposium on Software Testing and Analysis (ISSTA 2025), co-authored with Steph"
date: "2025-06-11"
group: "research"
legacyUrl: "https://jzamudio.com/personalized-fuzzing-testing-a-gnss-module-with-fandango-issta-2025/"
---

Our paper “Personalized Fuzzing: A Case Study with the FANDANGO Fuzzer on a GNSS Module” was published at the 34th ACM SIGSOFT International Symposium on Software Testing and Analysis (ISSTA 2025), co-authored with Stephan Neuhaus and Andreas Zeller.

GNSS modules — the hardware components responsible for satellite-based positioning in devices like phones, drones, and vehicles — communicate through structured binary protocols with strict format requirements. Testing them is hard. Traditional fuzzers generate too many invalid inputs that get rejected before they can trigger any interesting behavior. Grammar-based fuzzers do better at respecting the format, but they typically have limited control over which parts of the input space get explored.

This paper demonstrates how Fandango handles exactly this kind of challenge. Because Fandango lets you combine a formal grammar with Python constraints, you can precisely specify not just what a valid input looks like, but what properties you want it to have — specific field values, edge case combinations, boundary conditions. In our case study, we used the UBX protocol specification for a real GNSS module to define the input space, then used Fandango’s constraint system to steer generation toward behaviors of interest.

The results show that Fandango produces 100% valid inputs while still exploring meaningful edge cases — something that most fuzzers struggle to do simultaneously. The study also highlights three bugs we uncovered in the module during testing, demonstrating that constraint-guided fuzzing is not just theoretically appealing but practically effective for real hardware targets. The full paper is available open access via the ACM Digital Library.

[(link to the paper in ACM)](https://dl.acm.org/doi/abs/10.1145/3713081.3731722)
