# تصمیم‌های معماری Zharfa

این فایل تصمیم‌های Class B را از فرض‌های معماری، evidence پلتفرم و gateهای validation جدا می‌کند. تصمیم‌های ثبت‌شده در این Alpha فقط در محدودهٔ نسخهٔ Alpha معتبرند و تا تصویب successor نهایی، به‌تنهایی مجوز shipping نیستند.

## D-2026-10-03-001: D2 Transport for Alpha

- **Class:** B — معماری/transport
- **Date:** 2026-10-03
- **Version:** Architecture Contract Alpha
- **Decision maker:** مالک پروژه
- **Status:** accepted for Alpha

### Question

D2 در Alpha برای ارتباط بین page-side adapter و local service از چه transportی استفاده کند؟

### Options considered

- A — WebSocket loopback
- B — HTTP/JSON control plane همراه با SSE برای progress و eventهای طولانی
- C — HTTP فقط با polling
- D — Native Messaging / Extension Port

### Chosen

**B — HTTP/JSON control plane + SSE progress/event stream**

### Reason

- jobهای تحلیل در Alpha عمدتاً batch هستند، نه streaming دوطرفهٔ کم‌تأخیر؛
- submit، status، result و cancel با HTTP/JSON قابل‌ردیابی و idempotent هستند؛
- SSE برای progress و eventهای طولانی کافی است؛
- debugging و replay ساده‌تر است؛
- همان message schema می‌تواند در آینده برای D3 استفاده شود؛
- WebSocket در صورت تبدیل‌شدن low-latency bidirectional streaming به نیاز سخت، بدون تغییر در core یا `AnalyticsExecutor` می‌تواند به‌عنوان transport دوم افزوده شود.

### Scope boundaries

سه سطح transport از هم جدا هستند:

```text
Page ↔ Worker          postMessage؛ داخلی D1 و بدون local service
Page ↔ Local Service   HTTP/JSON + SSE؛ فقط D2 در Alpha
Page ↔ Cloud           موضوع D3؛ در این تصمیم انتخاب نشده است
```

این تصمیم به local service اجازهٔ دسترسی به endpoint غیرمجاز TSETMC یا دورزدن network policy نمی‌دهد. انتقال D2 فقط برای job، snapshot، result و eventهای مربوط به همان job است.

### Fixed rules for Alpha

- local boundary فقط برای service محلی است و bind خارجی مجاز نیست؛
- endpoint browser-facing در کد hardcode نمی‌شود و از config می‌آید؛
- session token تصادفی و کوتاه‌عمر استفاده می‌شود؛
- Origin validation انجام می‌شود؛
- raw credential در message ارسال نمی‌شود؛
- message schema نسخه‌دار است؛
- `requestId`، `jobId`، `snapshotId`، sequence و acknowledgement ثبت می‌شوند؛
- retry نباید باعث اجرای duplicate ناخواسته شود؛
- eventهای transport در trace ثبت می‌شوند؛
- job lifecycle ماشین حالت صریح دارد:

```text
queued → running → done
                 → failed
                 → cancelled
                 → timed-out
```

- `cancel` idempotent است و slot منابع را آزاد می‌کند؛
- نتیجهٔ partial با `partial: true` و دلیل مشخص علامت می‌خورد و نتیجهٔ کامل محسوب نمی‌شود؛
- هر job روی snapshot immutable و `configHash` مشخص اجرا می‌شود؛
- SSE از event id و `Last-Event-ID` برای reconnect/replay استفاده می‌کند؛
- اگر replay ممکن نباشد، `reset` event صادر می‌شود؛
- خطاها به transient، permanent و user error تفکیک می‌شوند؛
- failure transport نباید snapshot یا verdict را بی‌صدا از بین ببرد؛
- WebSocket در transport پایهٔ Alpha نیست.

### Parameters not decided by this record

این تصمیم دربارهٔ موارد زیر انتخابی انجام نمی‌دهد:

- زبان local service؛
- پورت یا مسیر concrete؛
- authentication implementation نهایی؛
- اندازهٔ نهایی Worker pool؛
- hard-timeout عددی؛
- معماری و transport D3؛
- نام و شمارهٔ successor نهایی.

### Revisit condition

اگر streaming دوطرفهٔ کم‌تأخیر به نیاز سخت محصول تبدیل شود، transport دوم WebSocket با همان message schema و همان semantics job بررسی می‌شود.
