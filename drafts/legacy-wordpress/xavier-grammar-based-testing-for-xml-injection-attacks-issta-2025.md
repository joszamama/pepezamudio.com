---
title: "XAVIER: Grammar-Based Testing for XML Injection Attacks — ISSTA 2025"
description: "Our paper “XAVIER: Grammar-Based Testing for XML Injection Attacks” was published at the 34th ACM SIGSOFT International Symposium on Software Testing and Analysis (ISSTA 2025), co-authored with Paul Kalbitzer and Andreas"
date: "2025-06-11"
group: "research"
legacyUrl: "https://jzamudio.com/xavier-grammar-based-testing-for-xml-injection-attacks-issta-2025/"
---

Our paper “XAVIER: Grammar-Based Testing for XML Injection Attacks” was published at the 34th ACM SIGSOFT International Symposium on Software Testing and Analysis (ISSTA 2025), co-authored with Paul Kalbitzer and Andreas Zeller.

Web services handle some of the most sensitive operations on the internet — banking, e-commerce, authentication — and they are also prime targets for injection attacks. XML injection attacks work by embedding malicious content into XML messages sent to a web service, potentially manipulating its behavior in ways the developers never intended. Despite the severity of the risk, testing for these vulnerabilities is still largely a manual process, and existing automated tools either miss parts of the service under test or require expensive commercial licenses.

XAVIER tackles this by taking a grammar-based approach. Given a WSDL specification — the standard description file that defines what a web service does and what inputs it accepts — XAVIER automatically constructs XML messages that reflect the service’s actual structure and functionality, then systematically crafts injection payloads to probe for vulnerabilities. Because it derives its test cases directly from the service specification, it can cover the full range of inputs the service is designed to handle, rather than relying on a fixed set of hand-crafted attack patterns.

In our evaluation, XAVIER performs equally or better than SOAPUI PRO, the current state-of-the-art commercial tool. Unlike SOAPUI PRO, XAVIER is fully open source and designed to be extensible, making it a practical platform for future research in web service security testing. The full paper is available via the ACM Digital Library.

*[(link to the paper in ACM)](https://dl.acm.org/doi/abs/10.1145/3713081.3731736)*
