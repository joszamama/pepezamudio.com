---
title: "Feature Model Analysis in Constraint-Based Recommender Systems — SPLC 2023"
description: "I’m happy to share that our paper “Analysis Operations on the Run: Feature Model Analysis in Constraint-Based Recommender Systems” was accepted at the 27th ACM International Systems and Software Product Line Conference ("
date: "2023-06-11"
group: "research"
legacyUrl: "https://jzamudio.com/our-paper-accepted-at-splc-2023/"
---

I’m happy to share that our paper “Analysis Operations on the Run: Feature Model Analysis in Constraint-Based Recommender Systems” was accepted at the 27th ACM International Systems and Software Product Line Conference (SPLC 2023), one of the leading venues for research on software product lines and variability modeling.

The motivation behind this work came from a gap we noticed in the field. Feature models are widely used in software product line engineering to describe the variability of a system — what features exist, which ones are mandatory, which are optional, and how they relate to each other. Most of the tools and techniques for analyzing these models, however, are designed for static, offline settings. You load the model, run your analysis, and get a result. That works fine in many contexts, but it breaks down when you need to work with feature models dynamically — for example, inside a recommender system that is reasoning about user preferences in real time.

Our contribution is a set of runtime analysis operations specifically designed for constraint-based recommender systems. These operations allow a system to reason about a feature model on the fly, taking into account the current state of the recommendation process and the constraints that have been established so far. We show that this enables a richer and more flexible form of product configuration, where the system can guide users toward valid and relevant configurations without requiring them to understand the underlying model.

To ground the work in a concrete setting, we built a case study around digital camera recommendation — a domain with enough variability and interdependency between features to make the problem interesting and realistic.

This paper was the result of my research at the Universidad de Sevilla under Prof. David Benavides Cuevas, in collaboration with researchers from TU Graz. It was one of my first conference publications, and presenting it at SPLC was a great introduction to the research community. The full paper is available via the ACM Digital Library.

*[(link to the paper in ACM)](https://dl.acm.org/doi/pdf/10.1145/3579027.3608982)*
