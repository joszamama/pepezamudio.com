---
title: "Finding the Minimum k-Weighted Dominating Set — MATCOM 2024"
description: "Our paper “Finding the Minimum k-Weighted Dominating Sets Using Heuristic Algorithms” was published in Mathematics and Computers in Simulation (MATCOM), a journal by Elsevier focused on mathematical modeling and computat"
date: "2024-09-12"
group: "research"
legacyUrl: "https://jzamudio.com/finding-the-minimum-k-weighted-dominating-set-matcom-2024/"
---

Our paper “Finding the Minimum k-Weighted Dominating Sets Using Heuristic Algorithms” was published in Mathematics and Computers in Simulation (MATCOM), a journal by Elsevier focused on mathematical modeling and computational methods.

The problem we tackle is a generalization of the classical dominating set problem in graph theory. In a standard dominating set, you want to find the smallest subset of vertices such that every other vertex is adjacent to at least one vertex in the set. Our version adds edge weights to the picture: a vertex is only considered “dominated” if the sum of the weights of its connections to vertices in the set meets a minimum threshold K. This makes the problem significantly harder, and to our knowledge, no prior work had studied it in this form.

Since the problem is NP-hard, we developed an Iterated Greedy algorithm to solve it efficiently. The core idea of Iterated Greedy is to start from a good initial solution, partially destroy it, and then reconstruct it using problem-specific heuristics — repeating this process until convergence. We designed and evaluated sixteen variants of this algorithm, combining four different destruction strategies with four reconstruction strategies, and ran extensive experiments on 156 graph instances ranging from 100 to 4,000 vertices.

The results show that our approach finds optimal or near-optimal solutions in a fraction of the time required by exact solvers. For graphs with more than 300 vertices, the Iterated Greedy algorithm consistently outperforms Gurobi, both in solution quality and computation time. On large instances with thousands of vertices, the exact solver times out at 30 minutes while our algorithm finishes in seconds.

This work was carried out during my time as a student researcher at Universidad Pablo de Olavide, under Prof. Alfredo García Hernández-Díaz. Author order is alphabetical; my contributions included software implementation, data curation, visualization, and investigation, as detailed in the CRediT statement. The full paper is available open access via ScienceDirect.

*[(link to the paper in ScienceDirect)](https://github.com/fandango-fuzzer/fandango)*
