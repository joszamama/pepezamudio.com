---
title: "Compás, and room to take a research risk"
description: "Our feature-focused testing paper was accepted at ASE 2026. The result also made me think about how funding shapes the questions a research group can afford to ask."
date: "2026-11-04"
group: "research"
---

Our paper [“Feature-Focused Test Generation”](https://doi.org/10.1145/3832783.3837479) was accepted at ASE 2026. It is joint work with Gaetano Sapia, Alexi Turcotte, David Benavides, Marcel Böhme, and Andreas Zeller. The project gave us [Compás](https://github.com/fandango-fuzzer/compas), a tool for aiming grammar-based tests at a feature you care about.

Imagine you have a grammar for PNG files and the animation decoder has just changed. A generator can make valid PNGs, but it may spend most of its time on images that never exercise animation. You could constrain every test by hand, or generate a large corpus and hope enough of it reaches the right code. I wanted to make the choice in the grammar useful to the tester.

Compás extracts a feature model from a Fandango specification. Alternatives, optional parts, and constraints become choices the tester can inspect. Pick a feature value—animated PNGs, for example—and Compás produces a smaller specification, a *slice*, for that choice. Fandango can then generate tests from the slice. The tests carry their feature label, which makes it easier to connect an input to the code it exercised.

That connection matters beyond one fuzzing campaign. If a change touches an animation handler, I want to know which tests are relevant without asking someone to recognize the right binary blob by eye. The [paper](https://doi.org/10.1145/3832783.3837479) reports the evaluation; the [author copy](/papers/feature-focused-test-generation.pdf) is here too.

## The part of the acceptance that stayed with me

Seeing the University of Seville, CISPA, and the Max Planck Institute for Security and Privacy on the same paper meant a lot to me. I studied in Seville and now do my PhD at CISPA. This collaboration joined people who shaped how I think about both software engineering and security testing.

It also brought back a conversation I had as an undergraduate with David Benavides. I had wondered why collaborations between Spanish groups and large research centres elsewhere in Europe seemed less common than they could be. There are many reasons, but one has become more concrete to me since moving: the amount of room a group has to try an uncertain idea.

A small group with limited funding may have to choose projects that can produce a paper soon. A larger, better-resourced group can let a researcher spend time learning a new area, take an interdisciplinary bet, and sometimes be wrong. Those choices accumulate. They affect who can travel, who gets early feedback, and which questions are worth attempting in the first place. The funding gap does more than slow people down; it changes what they can afford to ask.

I am describing an advantage I have now. My work with Marcel at MPI gave me time to learn, and the collaboration with David and my colleagues let an unusual idea grow. I am grateful for that freedom. I wish it were less dependent on where a young researcher happens to start. I am proud that part of this paper is Seville’s.

If you are considering a PhD and have the chance to work abroad, I would encourage you to see another research environment for yourself. I know that “if you can” is doing a lot of work in that sentence. For me, the experience changed what I think a research group should be able to offer its students.

This is a shorter, revised version of my [original post on jzamudio.com](https://jzamudio.com/feature-focused-test-generation/) from July 2026.
