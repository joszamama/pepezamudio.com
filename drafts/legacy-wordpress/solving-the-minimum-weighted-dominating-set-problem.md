---
title: "Solving the Minimum Weighted Dominating Set Problem"
description: "Given a weighted graph, a dominating set is a subset of vertices such that every vertex outside the set is adjacent to at least one vertex inside it, and the sum of incident edge weights meets a minimum threshold K. Find"
date: "2023-07-26"
group: "projects"
legacyUrl: "https://jzamudio.com/solving-the-minimum-weighted-dominating-set-problem/"
---

Given a weighted graph, a dominating set is a subset of vertices such that every vertex outside the set is adjacent to at least one vertex inside it, and the sum of incident edge weights meets a minimum threshold K. Finding the smallest such set is NP-hard.

This project implements an Iterated Greedy algorithm with several variants to solve the problem efficiently, producing optimal or near-optimal solutions in competitive compute time compared to exact solvers. Built in Java with Maven, and exposed as a REST API.

*[(link to the public repository in GitHub)](https://github.com/joszamama/wmdsp-api)*
