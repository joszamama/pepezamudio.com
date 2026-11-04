---
title: "When the input is a conversation"
description: "How Fandango moved from generating structured files to testing stateful protocol exchanges, with FTP and DNS as examples."
date: "2026-11-04"
group: "projects"
---

A file parser receives an input and returns a result. A protocol endpoint talks back. The second case changes what a test generator has to do: its next message may depend on the response to the previous one.

This was a recurring question after we released Fandango. Could the same grammar and constraint approach we used for structured files also describe a conversation between a client and a server?

With [Fandango 1.1](https://github.com/fandango-fuzzer/fandango), the answer is yes. A specification can describe the messages in an exchange and the relationships between them. Fandango can act as either side, produce a message, read the reply, and continue from the state it reaches. The [FTP example](https://fandango-fuzzer.github.io/FTP.html) shows why this matters: a server's reply can determine a later command or an additional data channel. The [DNS example](https://fandango-fuzzer.github.io/DNS.html) shows the same approach with binary messages and constraints on responses.

There is an important shift in how I think about a test here. For a file, the test case is usually the file. For a protocol, it is the interaction: the messages sent, the responses observed, and the state changes between them. A single valid request may tell you very little if the bug only appears after a particular sequence.

Alexander Liggesmeyer was the main contributor to this part of Fandango. It is a team effort, and the [protocol documentation](https://fandango-fuzzer.github.io/Protocols.html) is a better place to start than this short note if you want to try it yourself.

Reworked from my [earlier announcement on jzamudio.com](https://jzamudio.com/fandango-goes-protocol/) from February 2026.
