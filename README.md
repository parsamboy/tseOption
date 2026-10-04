# tseZharfaKavosh v0.1.0.0

Successor governance scaffold for the `tseOptionZharfa` lineage.

**Current status: governance and legal scaffold only — not a
shipping product, not production-ready, and not an executable
release.**

## Scope of this release

`v0.1.0.0` intentionally contains no product implementation.
It does not ship an adapter, core logic, UI, compiler, live
probe, or executable market-data integration. The release is
limited to:

- the Smart-FFA-1.1 license and optional-donation policy;
- the canonical-path governance register;
- the Architecture Contract Alpha candidate;
- the six-layer project scaffold and release metadata.

The owner has recorded authority over the upstream, fork, and
successor scopes in `docs/DECISIONS.md` as
`D-2026-10-04-001`. Optional donation policy is recorded as
`D-2026-10-04-002`.

## Contract status

`docs/architecture-contract-alpha.md` is the active contract
candidate. It is **not** canonical v6.0. The Approval Record is
intentionally empty. No document in this release may be described
as canonical v6.0, shipping, or production-ready until the
remaining gates and real owner approval are recorded.

The previous upstream and historical artifacts retain their own
lineage and notices. Smart-FFA-1.1 applies to this successor scope
only; it does not silently rewrite historical upstream licenses.

## Planned technical order

After governance and approval are complete, the proposed order is:

1. `contracts/01-data-source/spec.md`;
2. an approved `mw.AllRows` probe and its fixture;
3. evidence entry `E-011`;
4. subsequent snapshot, computation, projection, bridge, and release
   gates.

No live probe or product code may be produced or executed before
its approval and associated gates.

## Repository map

- `LICENSE` — Smart-FFA-1.1;
- `DONATION.md` — optional, untracked donation policy;
- `docs/DECISIONS.md` — versioned Class B decision register;
- `docs/PENDING.md` — unresolved decisions and open gates;
- `docs/EVIDENCE_LEDGER.md` — evidence and provenance ledger;
- `docs/V5_CLEANUP.md` — v5 cleanup register;
- `docs/architecture-contract-alpha.md` — current Alpha candidate;
- `contracts/` — six-layer scaffold, with no implementation;
- `tseOptionZharfa-v0.0.4.1.source.js` — historical source artifact.

## Attribution and lineage

Original author: <https://t.me/p75ad>

Project group: <https://t.me/SmartOptionTSE>

Lineage: `tseOption_ExoticFilter v0.0.4.6` → `tseOptionZharfa v0.0.4.1` → `tseZharfaKavosh v0.1.0.0`

Copyright: `© ۱۴۰۵ — حقوق مؤلف محفوظ است`

This software is analytical and informational only. It does not
guarantee profit and does not provide investment advice. Trading
and compliance decisions remain the user's responsibility.

## Development

The repository currently contains historical artifacts and
validation tools in addition to the new governance scaffold. Do
not treat an existing artifact as a v0.1.0.0 product feature
without a corresponding decision, evidence, and release gate.

Development dependencies are declared in `package.json`. No
runtime command is exposed by this governance-only release.
