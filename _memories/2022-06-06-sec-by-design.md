---
layout: memory
title: Security by Design Principles
---

Quick collection of useful Security by design principles. 

## Least Privilege 

The principle *least privilege* assigns only the minimum necessary rights to software components and individuals. They should only be able to perform their required functions. Its purpose is to minimize the risk by restricting the number of entities and individuals with access to critical systems.

Further readings:
* https://security-and-privacy-reference-architecture.readthedocs.io/en/latest/08-security-principles.html#implement-least-privilege
* https://us-cert.cisa.gov/bsi/articles/knowledge/principles/least-privilege
* https://www.sciencedirect.com/topics/computer-science/principle-of-least-privilege

## Defense in Depth

The principle *defense in depth* refers to an approach in which a variety of security mechanisms are layered on top of each other to protect the confidentiality, integrity, availability, and authenticity of a network and the data it contains. No individual mechanism can prevent all cyber threats. However, they collectively provide protection against a wide range of threats while providing redundancy in the event that one mechanism fails.

Further readings:
* https://security-and-privacy-reference-architecture.readthedocs.io/en/latest/08-security-principles.html#defense-in-depth
* https://us-cert.cisa.gov/bsi/articles/knowledge/principles/defense-in-depth
* https://wiki.owasp.org/index.php/Security_by_Design_Principles#Principle_of_Defense_in_depth

## Fail Securely

The principle *fail securely* involves several actions such as *secure defaults*, *transactional security*, and *sanitizing return values*. As a general rule, whenever your software has to handle an occurring error, do not leak internal information and return into a state where the system is good to serve the next request.

Further readings:
* https://us-cert.cisa.gov/bsi/articles/knowledge/principles/failing-securely
* https://security-and-privacy-reference-architecture.readthedocs.io/en/latest/08-security-principles.html#fail-safe-defaults
* https://owasp.org/www-community/Fail_securely

When implementing this principle:

- Disable all debug output in production that is useful during development.
- Configure middleware like application servers to not return version numbers, stacktrace, and technical error messages.
- When receiving a malformed HTTP request, reject it rather than guessing the intended content.

## No Security by Obscurity

The principle *no security by obscurity* states that the security of a system must be guaranteed, even if the whole design and source-code is publicly available. The most famous example is Kerckhoffs's Principle regarding encryption algorithms: It is easier to keep a key secret than an algorithm. In case the security is compromised, it is easier to replace the key than to fix the algorithm.

Further readings:
* https://us-cert.cisa.gov/bsi/articles/knowledge/principles/never-assuming-that-your-secrets-are-safe
* https://wiki.owasp.org/index.php/Security_by_Design_Principles#Avoid_security_by_obscurity
* https://security-and-privacy-reference-architecture.readthedocs.io/en/latest/08-security-principles.html#avoid-security-by-obscurity
* https://stackoverflow.com/questions/533965/why-is-security-through-obscurity-a-bad-idea
* https://en.wikipedia.org/wiki/Kerckhoffs%27s_principle

## Detect and Record

The principle *detect and record* relies on proper logging activities that provide the basis for several activities including security monitoring, troubleshooting, and forensics.

Further readings:
* https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html
* https://security-and-privacy-reference-architecture.readthedocs.io/en/latest/08-security-principles.html#design-and-implement-audit-mechanisms

## Don't Trust

The principle *don’t trust* refers to the assumption that the environment in which a system resides is insecure. Trust in external systems, code, or people should always be limited and never given loosely. Minimize trust in other systems and always validate/sanitize inputs.

Further readings:
* https://us-cert.cisa.gov/bsi/articles/knowledge/principles/reluctance-to-trust
* https://security-and-privacy-reference-architecture.readthedocs.io/en/latest/08-security-principles.html#dont-trust-infrastructure (Don’t trust infrastructure; Don’t trust services)
* https://wiki.owasp.org/index.php/Security_by_Design_Principles#Don.E2.80.99t_trust_services

## Keep It Simple

The principle *keep it simple* states that the complexity of a system is one factor in evaluating a system’s security. If the design, implementation, or security mechanisms are highly complex, then the likelihood of vulnerabilities is increased.

Further readings:
* https://us-cert.cisa.gov/bsi/articles/knowledge/principles/economy-of-mechanism
* https://security-and-privacy-reference-architecture.readthedocs.io/en/latest/08-security-principles.html#economy-of-mechanism (Economy of mechanism)
* https://wiki.owasp.org/index.php/Security_by_Design_Principles#Keep_security_simple

## Secure the Weakest Link

The principle *secure the weakest link* refers to the fact that attackers prefer the weakest component instead of strongly fortified ones for their attacks. This is why there must be an nearly equal level of security for all components.

Further readings:
* https://youtu.be/4qN3JBGd1g8?t=2464

## Decomposition

The principle *decomposition* describes the approach to logically partition subsystems. It ensures that a subsystem remains self-contained such that a compromise of one subsystem does not result in a compromise of another. By following this principle, a more fine granular approach to [Least Privilege](https://github.com/AppSecure-nrw/security-belts/wiki/Security-by-Design-Principles#least-privilege) and [Don't Trust](https://github.com/AppSecure-nrw/security-belts/wiki/Security-by-Design-Principles#dont-trust) is possible.

Further readings:
* https://security-and-privacy-reference-architecture.readthedocs.io/en/latest/08-security-principles.html#compartmentalise (Compartmentalise)

## Separation of Privilege

The principle *separation of privilege* refers to an approach that combines [Decomposition](https://github.com/AppSecure-nrw/security-belts/wiki/Security-by-Design-Principles#decomposition) and [Least Privilege](https://github.com/AppSecure-nrw/security-belts/wiki/Security-by-Design-Principles#least-privilege), which results in components and accounts with highly limited responsibilities and permissions. If an attacker is able to obtain one permission but not a second, the attacker might not be able to launch a successful attack.

Further readings:
* https://security-and-privacy-reference-architecture.readthedocs.io/en/latest/08-security-principles.html#separation-of-privilege
* https://wiki.owasp.org/index.php/Security_by_Design_Principles#Separation_of_duties

## Use Secure Defaults

The principle *use secure defaults* ensures that components always use secure configurations by default (e.g., when installed).

Further readings:
* https://security-and-privacy-reference-architecture.readthedocs.io/en/latest/08-security-principles.html#establish-secure-defaults
* https://wiki.owasp.org/index.php/Security_by_Design_Principles#Establish_secure_defaults

## Don't Reinvent the Wheel

The principle *don’t reinvent the wheel* states that existing solutions should be preferred over self-developed ones. Using security technologies - like crypto - correctly is hard, correctly implementing them is even harder. Apart from security technologies, this applies to other technologies like parsers, unparsers, data formats, and protocols as well. 

Further readings:
* https://security-and-privacy-reference-architecture.readthedocs.io/en/latest/08-security-principles.html#use-standard-solutions
* https://youtu.be/4qN3JBGd1g8?t=2373
