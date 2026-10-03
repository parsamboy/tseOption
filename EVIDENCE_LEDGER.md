# Evidence Ledger — Zharfa Alpha

**وضعیت:** قالب و رجیستر evidence برای Alpha؛ canonical نیست و خودِ وجود یک ردیف در این فایل به‌تنهایی ادعای verified بودن نیست.

## ۱. طبقه‌بندی provenance

هر evidence باید یکی از این سطح‌ها را داشته باشد:

- `owner-observed` — مشاهده یا آزمون انجام‌شده توسط مالک؛
- `contract-verified` — در قرارداد canonical یا fixture رسمی ثبت‌شده؛
- `platform-verified` — probe مستقیم پلتفرم با روش و fixture قابل بازتولید؛
- `project-policy` — تصمیم معماری/سیاست محصول، نه واقعیت پلتفرم؛
- `unverified` — گزارش یا فرضی که هنوز evidence کافی ندارد.

`owner-observed` و `contract-verified` قابل جایگزینی با یکدیگر نیستند.

## ۲. schema هر ردیف

| فیلد | معنا |
|---|---|
| `evidenceId` | شناسهٔ پایدار evidence |
| `claim` | گزارهٔ دقیق و محدود، نه عنوان کلی |
| `level` | یکی از سطوح provenance بالا |
| `source` | URL، commit، فایل، capture یا شاهد اصیل |
| `host` | host و page/realm مربوط |
| `parTree` | در صورت ارتباط با TSETMC |
| `capturedAt` | زمان مشاهده با timezone |
| `method` | روش probe، fixture capture یا آزمون |
| `fixtureHash` | hash raw fixture یا artifact |
| `status` | open، accepted، contradicted، superseded |
| `relatedGate` | شناسهٔ gate در `PENDING.md` |
| `ownerApproval` | وضعیت تأیید مالک، در صورت نیاز |
| `notes` | محدودیت دامنه و توضیح تکمیلی |

## ۳. قواعد ثبت

- یک claim باید تا حد امکان یک گزارهٔ قابل آزمون باشد؛
- «در مسیر آزموده‌شده مشاهده نشد» به معنی نبودن قابلیت در همهٔ مسیرها نیست؛
- دادهٔ missing با default جایگزین نمی‌شود؛
- evidence فاقد source یا زمان قابل ردیابی، کامل نیست؛
- raw fixture باید immutable نگه داشته شود و parser/schema version داشته باشد؛
- هر تغییر مؤثر بر contract باید evidence قبلی را supersede یا contradict کند، نه اینکه حذف کند؛
- evidence پروژه برای استفادهٔ محصولی کافی نیست مگر سطح و دامنهٔ آن صریح باشد.

## ۴. رجیستر فعلی

در این Alpha، قالب ledger ثبت شده است. برای `mw.AllRows`، `mw.FilterCode`، `mw.SaveParams`، option label، option-chain و calendar هنوز ردیف contract-verified جدیدی بدون capture/probe معتبر اضافه نشده است.

Baselineهای canonical v5.0 باید با commit و clause مربوط ثبت شوند؛ این فایل جایگزین متن canonical v5.0 نیست.
