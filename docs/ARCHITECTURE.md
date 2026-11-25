# VLEARNIN v2 Architecture & Migration Notes

## 1. Security Model
- **Admin Authentication**: Argon2id password hashing, 32-byte random session tokens stored as SHA-256 hashes in `admin_sessions`, HTTP-only `SameSite=Lax` cookies, and `X-CSRF-Token` validation on all mutating `/api/admin/*` requests.
- **Certificate Verification**: Public verification endpoints (`/api/certificates/verify`, `/api/certificates/public/:token`) are rate-limited, query PostgreSQL directly (never hardcoded), log verification events in `certificate_audit_logs`, and return only credential validity and programme completion metadata (no phone, email, or address PII).

## 2. Migration from Legacy Prototype (`../vlearnin`)
- The existing `../vlearnin` directory was inspected read-only and left completely untouched.
- Reusable imagery was copied into `apps/web/public/images/` alongside newly generated editorial photography.
- No legacy certificate records existed in `../vlearnin`; future legacy imports are supported via `AdminController` and Prisma `certificates` table preserving `certificateId` and `verificationToken`.
