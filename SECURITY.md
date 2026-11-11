# Security policy

## Supported versions

| Version | Supported |
| --- | --- |
| 0.1.x | ✅ |

## Reporting a vulnerability

Please **do not open a public issue** for security problems. Use GitHub's
**private security advisory** on the repository (Security → Advisories → Report a
vulnerability) once the repository is published. Include affected version,
reproduction steps, and impact.

We will acknowledge within 7 days and coordinate a fix and disclosure.

## Security boundaries

- ViralForge never reads model/platform API keys in the browser. Do not add
  `VITE_*` secrets; they are bundled into client code.
- The demo server binds to `127.0.0.1` by default. If you expose it publicly,
  put it behind a reverse proxy and review `allowedHosts`.
- Uploaded media is processed locally; do not process material you do not have
  rights to.
- The project intentionally ships without face-swap capability. PRs that add
  real-person face replacement will be rejected.
- Rendered output carries an AI-generated label; removing it is a product-policy
  violation.

## Dependency policy

- No AGPL dependencies.
- New dependencies need a license review and a clear reason.
- Do not vendor Hypit code; it is under a custom license that restricts
  multi-tenant SaaS and commercial redistribution.
