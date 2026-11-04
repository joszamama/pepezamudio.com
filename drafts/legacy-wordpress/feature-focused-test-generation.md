---
title: "Feature-Focused Test Generation"
description: "Our paper “Feature-Focused Test Generation” was accepted at ASE 2026! (with Gaetano Sapia, Alexi Turcotte, David Benavides, Marcel Böhme, and Andreas Zeller) If you test complex programs and do specification-based fuzzin"
date: "2026-07-30"
group: "research"
legacyUrl: "https://jzamudio.com/feature-focused-test-generation/"
---

Our paper “Feature-Focused Test Generation” was accepted at [ASE 2026](https://conf.researchr.org/details/ase-2026/ase-2026-research-track/183/Feature-Focused-Test-Generation)! (with Gaetano Sapia, Alexi Turcotte, David Benavides, Marcel Böhme, and Andreas Zeller)

If you test complex programs and do specification-based fuzzing, you have run into this. You spend a week getting a PNG grammar right, with all the chunk types and the constraints that keep the CRCs and lengths consistent, and what you get back is a generator that samples the whole format uniformly, forever. Which is what you asked for, right?

Say the animation handling in your image library just changed and you want to stress it. Your options are bad. You can add constraints to push generation toward APNG, say with [Fandango](https://fandango-fuzzer.github.io/), which costs you throughput because, well, now you need to solve constraints. Or you can generate a large corpus and hope enough of it is animated. Either way, when the campaign finishes, the corpus itself cannot tell you which inputs actually reached the new handler, what else they touched, or which of them were doing the same thing as each other. You have to orchestrate the program under test, measure, and repeat. But the grammar knows that animation is a choice in the format. That information is thrown away the instant generation starts.

Our paper is about exploiting this idea. (Paper summary and a reflection down below)

[Download](/media/feature-focused-test-generation-Compas.pdf)

**Feature models, briefly**

If you are reading this, chances are you have a testing/security background, and part of this paper will be unfamiliar (not if you have a background in product line engineering or software variability and reuse).

A product line is a family of related products built from a common base: the classic examples are Linux kernel configurations and car software, where you have thousands of optional components and rules about which combinations are legal. A feature model is the formal object that describes this. It is a tree of features with mandatory and optional children, groups where you pick exactly one alternative, and cross-tree constraints saying things like “A excludes B”. There is a large body of work on configuring these, propagating constraints, and sampling valid configurations.

Now look at a [FANDANGO specification](https://github.com/fandango-fuzzer/compas/tree/main/evaluation/targets). Alternatives, where the format offers a choice. Optional constructs, present or absent. Where clauses forbidding specific combinations. That is a feature model. It is already written down in every grammar any of us has ever authored; it just has no representation the tooling can act on.

So we extract it. *[Compás](https://github.com/fandango-fuzzer/compas)* (our new tool) walks the grammar and builds the feature model automatically: alternatives become alternative groups, optionals become optional features, and where clauses get lifted into cross-tree exclusions. No annotation required.

Then you configure it. You pick a feature value, constraints propagate, and Compás prunes the grammar into a specialised version we call a *slice*: rules rewritten, dead nonterminals dropped, irrelevant constraints filtered out. A slice pins one choice and leaves everything else varying. It is a strict subset of the original input space, so it cannot generate anything the original grammar would have rejected. Then it hands the slice back to FANDANGO, which generates from it like any other spec.

The output is an ordinary corpus, except every input is labelled with the feature value it was generated for. Most of what follows falls out of that label.

**Results**

Ten specifications across seven libraries: the four Pillow image parsers (GIF, JPEG, PNG, TIFF), Mutagen for MP3, plus zipfile, pypdf, pyelftools, tomllib, and html.parser. None of these are toys. They are the parsers already sitting in your dependency tree.

Slicing does not break anything. Validity, feature diversity, and aggregate line coverage all match the unsliced baseline. Boring by design, and everything after it depends on this: if slicing cost coverage, the rest would just be a trade.

You can aim. Slices reach their intended code region with a mean hit rate of 100%, against 26% for the baseline. The baseline gets there too, eventually, incidentally. The difference is that you can ask.

The map, and the direction that matters. Because every input carries a feature label, you can diff coverage between sibling values of the same feature and isolate the lines that one value triggers and no other does. Across the ten subjects, 80 of 148 feature values had such lines. A few that I like:

- PNG apng covers 109 lines that static never reaches. That is animation support in Pillow, located automatically by a tool that does not know what animation is.
- In pyelftools, four section types come apart cleanly: symtab (+50 exclusive lines), note (+45), dynamic (+36), rela (+29). Four ELF concepts, four disjoint handlers.
- pypdf’s stream filters separate one-to-one: runlength (+21), flate (+14), asciihex (+10), ascii85 (+8).
- In tomllib, array (+23) and inline\_table (+22) each own substantial code, while bool owns four lines. The parser’s complexity is exactly where the format’s complexity is.

But the useful direction is the reverse one. Given a line of code, ask which feature value uniquely covers it. That turns a diff into a test selection: someone touches lines in Pillow’s APNG handler, you look those lines up, and the answer comes back “run the Animation=animated slice.” Nobody in that loop has to know PNG, or know Pillow, to make the call correctly.

Suites collapse, and what survives has a name. Greedy set cover reduces most subjects to one or two slices that retain the aggregate coverage of the entire suite, reaching their regions in up to 18.5x fewer inputs. PNG goes from 29 slices to 1. The reduction is not the interesting part; minimisation research has been shrinking suites for decades. The interesting part is that the survivors are labelled. Instead of a smaller pile of anonymous inputs, TIFF reduces to {ColorMode=gray, ColorMode=y444}, which is a claim about Pillow’s TIFF decoder that you can go and check. ZIP is the nicest case: its two-slice cover spans two independent feature groups, ExtraRecord and ArchiveComment, so the tool is telling you those are the two dimensions of ZIP this parser actually distinguishes.

**Hey, I am a security engineer at CompanyX. Should I care about this?**

Continuous fuzzing infrastructure like OSS-Fuzz, ClusterFuzzLite, or an internal CI fuzzing tier runs thousands of targets forever, and the binding constraint is compute. Today, a commit touching one chunk handler re-triggers the whole target. With an inverted feature-to-code map, the changed lines select the slices, and you re-fuzz the affected feature instead of the entire format.

Crashes arrive pre-labelled. A crash from a slice comes with the feature value that produced it, so the report says “APNG path” before a human opens it. That is free signal for deduplication, triage, and routing to whoever owns that code. When you fix the bug, you can run targeted tests to check for similar test cases, and run a feature-wise slice suite to test for regressions.

Campaigns parallelise naturally. A slice is a smaller grammar with fewer alternatives and fewer constraints to solve, so it converges faster than the full specification, and independent slices run on independent workers with no coordination.

Powerful, right?

**But why don’t you use LLMs for that?**

Glad you asked! (not really). When it works, you cannot say why, and when it fails you cannot say where. If a model hands me a corpus that happens to cover the animation handler, I have no mechanism to point at. I cannot tell you it will do that again next week, on a different format, or say which property of the input made it happen.

Every step in Compás is a transformation you can inspect. Featurization is a grammar traversal with a fixed set of rules. Pruning yields a strict subset of the original configuration space, which is why validity holds by construction rather than by measurement. When a slice misbehaves, there is a specific rule that is wrong and a specific place to fix it. This is also the only reason the traceability result means anything: the map from features to code is trustworthy because both ends are defined rather than inferred. Guessing the mapping and guessing the inputs at the same time gets you a number nobody can act on.

**What I think this opens**

Interaction bugs stop being luck. An APNG frame that is interlaced with a palette that changes between frames, a ZIP whose local header and central directory disagree about the extra field, a TIFF whose compression and colour mode are individually legal and jointly nonsense… Right now you reach those when the search happens to stumble into them. With a feature model you can instead ask for every pair, or every triple, of feature values to be covered by some slice.

Differential testing gets a vocabulary. Run the same feature slice through Pillow, libpng, and stb\_image. Today a differential fuzzer tells you “these two disagree on this blob,” and someone spends an afternoon working out why. With labelled slices, it tells you “these two disagree on iCCP chunk handling,” which is good debugging information. And in a security context, that class of finding is the whole game: polyglot files, parser confusion, request smuggling, and archive-extraction mismatches are all two implementations disagreeing about one feature of one format. Feature slices let you enumerate the disagreements systematically, feature by feature, and know which ones you have checked.

The map doubles as an attack surface map. If you are auditing a dependency you did not write, the feature-to-code map ranks a format’s features by how much code they reach and how isolated that code is. Pillow’s APNG support is 109 lines that nothing else in the library touches. For a first pass on an unfamiliar parser, “which format features own the most exclusive code” is a better reading order than opening the file at line one.

And the one I keep coming back to, from a conversation with Sven Apel and Andreas. We treat a program’s configuration space and its input space as different things. They might not be so different. A CLI flag is input. A config file is input. A web server can be reconfigured by a packet at runtime, so the configuration literally arrives as input. If configuration and input are one space, then the same machinery generates both, and a slice can pin a decoder flag as easily as it pins a chunk type. Your harness stops being a fixed vantage point and becomes another thing you sample.

I am curious what the ASE community makes of this line of thought.

Thank you to my wonderful collaborators. It makes me genuinely happy to see David, Marcel, and Andreas on the same paper. The three of you have shaped how I think about research more than anyone else. This work came out of my research internship at MPI, so Marcel, thank you especially for hosting me for three months, and for your guidance long before that. We first met at the summer school in Singapore, and it was over hotpot with Andreas that we planted the seed of what became Fandango.

---

**My biggest achievement (aka, reflection time)**

Well, I am not sure if this is really my biggest achievement, but it makes me feel incredibly proud. The affiliations are CISPA, the Max Planck Institute for Security and Privacy, and the University of Seville. As far as I can tell from the publication records, it is the first paper the University of Seville has written with CISPA or MPI.

You might think, so what?

When I was an undergrad in Sevilla working for David Benavides, I asked him why we (as in, Spanish researchers) did not collaborate (as much as other nations’ researchers, say, Germans) with the big European research centres (which seem to concentrate across central Europe). It seemed like an obvious thing. This sparked a long conversation, and the summary of that was several reasons.

University of Seville, the place where I got my bachelor’s and master’s, is a nice place. But it lacks resources ([and they plan to cut it even more!](https://www.elcorreoweb.es/sevilla/2026/05/21/universidad-sevilla-recortara-13-millones-130492451.html)). Resources, when put into perspective, look infinite in other countries. Countries where professors typically have a long list of Ph.D. students. They can travel pretty much without budget restrictions. They can purchase top-notch equipment. They might even be able to select the best of the best (students), because the best might want to be in their respective universities.

While I did research in Spain (and I worked for several research groups), I got the impression that if, as a professor, you hire a “bad” student (as in, does not perform too well in terms of publication generation –yeah, not the best metric, but that’s the game), you are doomed. Maybe you had funding for 2 students. Well, 50% of your workforce is slow. In a group of 20 students, one or two might be slower than the rest, but you still got 18 paper printing machines. If you don’t get your papers up, you won’t be able to access top research communities, which spirals into being overlooked entirely.

And knowing the community, it sure does help. You get early feedback about your paper; they can disseminate your research and provide some guidance, or offer collaboration opportunities. Every time I work on a paper, I can send a draft of the submission to some of my friends, as they do too. Friends that are on program committees (don’t worry, they are flagged as conflicts). But this basically means that I get a review before the review. Something that, if you don’t access these communities, might never happen to you.

But there is a worse version of the funding problem that took me longer to see. It is not only that a small group produces less. It is that a small group cannot afford to be wrong. With two students, every project has to work. You pick the safe increment, the “guaranteed” publication, the thing your community already recognises as a contribution. With twenty, you can spend multiple of them on a three-year bet that might just fail, but that is totally fine, because if it works out, congratulations, you just invented a new research field. My advisor, Andreas, has been able to do this a number of times, and he had great success. And to some degree, I think this paper was one of those bets. It is an odd interdisciplinary thing: had it failed in a two-person group, that would have been half the group’s research output for the year. So the funding gap does not just slow people down. It quietly decides which questions they are allowed to ask.

Please, to be clear: none of this is a complaint about Germany, CISPA, my collaborators, or my research group, and it is definitely not a complaint about the people who helped me. I am incredibly grateful for all of it. The uncomfortable part is that I am describing advantages I currently enjoy. I am not evaluated on throughput. I can do interdisciplinary work, learn from areas outside my own, and be wrong without it costing anyone anything that matters. My advisor does not need three more A\* papers to make professor, and is not competing against every researcher in the country for one small grant. That is the freedom a two-person group does not have, and it is one of the reasons this paper exists. I was able to visit the team of Marcel Böhme, where I learnt plenty, at my own pace, with outstanding guidance. Then I still had time to come back, think about different problems where my new skills could contribute, and start this project.

And for that reason, I am happy to say that part of this paper is Sevilla’s.

My biggest advice, if you are a Spanish undergrad considering a Ph.D.: move abroad, if you can. I am aware that “if you can” is carrying a lot of weight in that sentence. But if you can, take the risk. See it with your own eyes. Because if you come back, and I hope you do, you will know exactly what you should fight for.
