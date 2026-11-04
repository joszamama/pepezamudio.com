---
title: "Fandango Goes Protocol"
description: "When we released Fandango, the most common question we got was: can it test protocols? It’s a fair ask. A lot of the most interesting and security-critical software out there doesn’t just read a file — it talks. FTP serv"
date: "2026-02-27"
group: "projects"
legacyUrl: "https://jzamudio.com/fandango-goes-protocol/"
---

When we released Fandango, the most common question we got was: can it test protocols?

It’s a fair ask. A lot of the most interesting and security-critical software out there doesn’t just read a file — it talks. FTP servers, DNS resolvers, custom binary protocols — these systems communicate through structured, stateful exchanges where every message depends on what came before. Testing them properly requires a fuzzer that can participate in a conversation, not just generate a document.

Traditional protocol fuzzers exist, but they tend to be brittle. They rely on hardcoded message templates, struggle with stateful behavior, and require a lot of manual effort to set up for each new protocol. We wanted something better.

With Fandango 1.1, protocol fuzzing is now a first-class feature. The idea is the same as always: you write a specification. But now, instead of describing a file format, you describe an exchange — a sequence of messages between a client and a server, with grammars defining the structure of each message and Python constraints capturing the relationships between them. Fandango then acts as either the client or the server, generating dynamic, stateful interactions and systematically exploring the protocol’s behavior.

We’ve tested it on FTP and DNS, two protocols with very different structures and complexity levels, and it works well on both. The same expressive specification language you already know from Fandango carries over completely — no new syntax to learn, no separate tooling to install.

This release is the result of extensive work by the entire Fandango team, but most notably, my good friend Alexander Liggesmeyer, the main contributor to this feature. Protocol fuzzing has historically been one of the harder problems in automated testing and we’re excited to make it a lot more accessible.

The update is live on GitHub and PyPI. If your team works with networked systems or custom protocols, we’d love to hear how it goes.

*[(link to the public repository in GitHub)](https://github.com/fandango-fuzzer/fandango)*
