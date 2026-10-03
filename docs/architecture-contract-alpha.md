# قرارداد معماری Zharfa Smart Filter — نسخهٔ Alpha

**وضعیت: ALPHA — برای بازبینی و تأیید مالک؛ canonical نیست و مجوز shipping یا تولید کد محصول نیست.**

**برچسب بررسی:** این سند candidate برای successor هدف `v6.0` است؛ تا بسته‌شدن gateها و تأیید نهایی، عنوان رسمی آن همچنان `Architecture Contract Alpha` باقی می‌ماند و این برچسب نسخهٔ نهایی را زودتر تعیین نمی‌کند.

این سند فقط تصمیم‌ها و اصلاحاتی را که در بازبینی مالک پذیرفته شده‌اند ثبت می‌کند. انتخاب‌های حل‌نشده در بخش «تصمیم‌های باقی‌مانده» می‌آیند و نباید به‌عنوان default، واقعیت پلتفرم یا مصوبهٔ معماری تفسیر شوند.

مبنای پلتفرم و محدودیت‌های Artifact A، قرارداد canonical v5.0 در commit زیر است:

```text
251db6b0e846e367cc20f0580f798ad5e4c552a3
```

این سند آن قرارداد را بی‌صدا supersede نمی‌کند. هر تعارض فقط پس از تصویب successor رسمی و ثبت در نسخهٔ بعدی حل می‌شود.

---

## ۱. اصل حاکم و سطوح ادعا

هر گزاره باید در یکی از سه سطح ثبت شود:

### ۱.۱ تصمیم محصول — Owner-approved direction

این‌ها جهت محصول‌اند، نه ادعای فنی دربارهٔ رفتار TSETMC:

- سناریوی محصول «اسب تهران + جت جهانی»؛
- حفظ سازگاری عمیق با اکوسیستم TSETMC بدون حذف توان تحلیلی سطح بالا؛
- داشتن سه deployment direction با نام‌های D1، D2 و D3؛
- استفاده از D1 به‌عنوان مسیر Browser-Native و کانال توزیع/بازاریابی؛
- عدم ساده‌سازی مسئله از طریق کوچک‌کردن universe، افزایش اجباری freshness، حذف projection دقیق، یا برگشت خاموش به manual mode؛
- عدم تولید کد محصول تا بسته‌شدن دروازه‌های لازم و تأیید قرارداد successor.

### ۱.۲ فرض معماری — Needs validation

این‌ها مسیرهای معماری پذیرفته‌شده برای بررسی‌اند، اما هنوز واقعیت اثبات‌شدهٔ پلتفرم نیستند:

- استفاده از `mw.AllRows` به‌عنوان primary local-memory adapter برای داده‌های حاضر در MarketWatch؛
- اجرای تحلیل سنگین D1 در Web Worker، با adapter روی main thread؛
- وجود یک core مشترک با adapterهای متفاوت برای D1، D2 و D3؛
- وجود Compute Dispatcher در Artifact B؛
- وجود ماژول‌های GEX/DEX، Vanna/Volga، Flow و Volatility Surface؛
- bridge خودکار و تأییدشده از B به فیلتر A؛
- parity محاسبات بین executorهای متفاوت.

### ۱.۳ واقعیت اثبات‌شده — Contract/platform evidence

این‌ها از قرارداد canonical v5.0 به ارث می‌رسند یا باید با evidence مستقل ثبت شوند:

- رفتار `PrepareFilterCode` و فهرست ۵۹ trigger؛
- row schema و معانی فیلدهای B.5.2 و B.5.3؛
- محدودیت‌های pure، row-only، بدون DOM، timer، network، storage و state برای Artifact A؛
- محدودیت‌های source/min، `node --check`، parity و نبود Terser/Uglify/mangling؛
- endpointهای واقعاً تأییدشده و provenance هر داده؛
- هر ادعای جدید دربارهٔ `mw.AllRows`، `mw.FilterCode` یا `mw.SaveParams` فقط پس از ثبت evidence مربوط.

نبودن یک fixture در sandbox، evidence مالک را خودکار رد نمی‌کند؛ اما provenance `owner-observed` با `contract-verified` یکی نیست.

### ۱.۴ مؤلف، lineage و حقوق قانونی

این Alpha نام و lineage اصلی موجود در artifactهای پروژه را جایگزین یا حذف نمی‌کند. اطلاعات قانونی inherited از سربرگ و LEGAL module موجود در نسخه‌های پروژه است:

- **مؤلف اصلی:** `https://t.me/p75ad`
- **گروه پروژه:** `https://t.me/SmartOptionTSE`
- **lineage:** `tseOptionZharfa` به‌عنوان fork از `tseOption_ExoticFilter v0.0.4.6`؛ هر fork باید lineage upstream را آشکار نگه دارد.
- **مجوز:** `Smart-FFA-1.0 (Free Fork with Attribution)`
- **کپی‌رایت:** `© ۱۴۰۵ — حقوق مؤلف محفوظ است`

حقوق اعلام‌شدهٔ مجوز inherited:

- برداشتن، بازنویسی، گسترش و انتشار نسخهٔ مستقل آزاد است؛
- شرط attribution این است که سربرگ fork نام و نشانی مؤلف اصلی را دست‌نخورده نگه دارد؛
- attribution، شناسهٔ مجوز و lineage نباید حذف، پنهان، جایگزین یا تحریف شوند؛
- fork می‌تواند author و version خود را اضافه کند، اما نمی‌تواند آن‌ها را جایگزین attribution upstream کند.

**رفع مسئولیت قانونی/محصولی:**

> این ابزار صرفاً تحلیلی و اطلاعاتی است؛ تضمین سود نمی‌دهد و مسئولیت هر تصمیم و معامله تنها بر عهده کاربر است.

`fullNotice` inherited که باید در legal module حفظ شود:

```text
tseOptionZharfa
مؤلف اصلی: https://t.me/p75ad
گروه پروژه: https://t.me/SmartOptionTSE
مجوز: Smart-FFA-1.0 (Free Fork with Attribution)
© ۱۴۰۵ — حقوق مؤلف محفوظ است
این ابزار صرفاً تحلیلی و اطلاعاتی است؛ تضمین سود نمی‌دهد و مسئولیت هر تصمیم و معامله تنها بر عهده کاربر است.
```

قواعد delivery حقوقی:

- source متن فارسی را به‌صورت UTF-8 قابل ویرایش نگه می‌دارد؛
- min representation همهٔ نویسه‌های non-ASCII را به Unicode escape تبدیل می‌کند؛
- legal source/min parity اجباری است؛
- legal notice باید در footer پنل و سطوح هشدار/تأیید لازم حاضر باشد؛
- این بخش attribution و disclaimer inherited را ثبت می‌کند و ادعای حقوقی گسترده‌تر از متن مجوز ایجاد نمی‌کند.

---

## ۲. مدل محصول

Zharfa یک محصول واحد است که دو artifact مستقل دارد:

```text
Artifact A — predicate بومی فیلتر TSETMC
Artifact B — پنل، داده، تحلیل، compiler و bridge
```

### ۲.۱ Artifact A

- در مسیر فیلتر `ParTree=15131F` اجرا می‌شود؛
- فقط row جاری را می‌خواند؛
- pure، بی‌حالت و مستقل از فراخوانی‌های دیگر است؛
- DOM، UI، timer، network، storage و state بین فراخوانی‌ها ندارد؛
- verdict آن یا یک projection دقیق و تاریخ‌دار از B است، یا predicate ردیفی‌ای که صریحاً در قرارداد تعریف شده است؛
- هیچ scalar-only fallback، Bloom approximation یا حذف خاموش شناسه‌ها مجاز نیست.

### ۲.۲ Artifact B

- پنل و موتور تحلیلی Zharfa است؛
- دادهٔ معتبر، snapshot، profile هدف، تقویم، pool، history و مدل‌های تحلیلی را مدیریت می‌کند؛
- مسئول provenance، freshness، missing/unknown، compile و bridge است؛
- هیچ داده‌ای را جعل نمی‌کند؛
- ماژول‌های حرفه‌ای را فقط وقتی eligible می‌کند که dependency و منبع دادهٔ آن‌ها معتبر باشد.

### ۲.۳ مرز محصول و پلتفرم

«اسب تهران» به معنی adapterها و محدودیت‌های واقعی TSETMC است. «جت جهانی» به معنی سطح معماری و مدل‌های B است. مدل‌های جهانی به‌صورت runtime داخل Artifact A منتقل نمی‌شوند؛ خروجی آن‌ها فقط از مسیر projection دقیق و ثبت‌شده می‌تواند به A برسد.

---

## ۳. نام‌گذاری deploymentها

برای جلوگیری از تداخل با Artifact A و Artifact B، نام deploymentها این است:

| نام | معنا |
|---|---|
| D1 | Browser-Native |
| D2 | Hybrid با service محلی |
| D3 | Cloud |

در این سند عبارت «Profile A/B/C» برای deployment استفاده نمی‌شود.

D1، D2 و D3 جهت محصول/معماری هستند و mapping زبان آن‌ها در تصمیم `D-2026-10-03-002` برای Alpha ثبت شده است:

```text
D1 = Browser JavaScript + Web Worker
D2 = Node.js LTS local service
D3 = Python cloud executor/service
```

این mapping، cloud topology، packaging، libraryهای عددی یا جزئیات deployment را به‌تنهایی تعیین نمی‌کند.

---

## ۴. Core مشترک و deployment-specific adapters

منطق تحلیلی باید از محیط اجرا مستقل طراحی شود و از interfaceهای مفهومی زیر استفاده کند:

- `DataSource`
- `SnapshotStore`
- `AnalyticsExecutor`
- `Compiler`
- `ApplyBridge`
- `EvidenceLedger`

هر deployment implementation مخصوص خود را دارد. در Alpha، D1 با Browser JavaScript/Worker، D2 با Node.js LTS و D3 با Python mapping می‌شود؛ این mapping در `DECISIONS.md` ثبت شده است.

Core مشترک نباید به DOM، `window.mw`، localStorage، localhost یا cloud API وابسته باشد.

استقلال deployment به معنی یکسان‌بودن خودکار نتایج نیست. برابری نتایج فقط پس از تکمیل canonical computation و parity test قابل ادعاست.

---

## ۵. Canonical computation و parity

برای هر executor باید قرارداد محاسباتی مشترک وجود داشته باشد:

- input schema نسخه‌دار؛
- canonical serialization؛
- timezone مشخص `Asia/Tehran`؛
- rounding و decimal policy؛
- semantics دقیق برای missing، stale و unknown؛
- model version در هر خروجی؛
- conventionهای Greeks و volatility؛
- snapshot identity و data age؛
- نبود randomness در مسیر واقعی؛
- fixture مشترک برای زبان‌ها و executorهای مختلف؛
- parity test در هر release.

تا زمانی که این موارد با fixture و تست ثبت نشده‌اند، عبارت «منطق یکسان» فقط هدف معماری است، نه واقعیت contract-verified.

---

## ۶. D1 — Browser-Native

D1 به‌عنوان مسیر Browser-Native و کانال توزیع/بازاریابی ثبت می‌شود.

### ۶.۱ مسیر اجرایی

```text
Main-thread Page Adapter
        │
        ├── خواندن read-only از page memory در صورت اثبات دسترسی
        ├── ساخت snapshot و provenance
        └── پیام نسخه‌دار
                    │
                    ▼
              Web Worker
        ├── تحلیل
        ├── compile
        └── exact projection
                    │
                    ▼
Main-thread Bridge
        ├── UI و diagnostics
        ├── storage adapter
        └── apply confirmation
```

Web Worker مستقیماً به DOM، `window.mw`، `mw.AllRows` یا `localStorage` دسترسی ندارد.

### ۶.۲ storage و privacy

- `localStorage` در main thread قابل استفاده است؛
- Worker برای storage مستقیم باید از سازوکار مناسب مانند IndexedDB یا پیام به storage adapter استفاده کند؛
- D1 به‌صورت پیش‌فرض به service پروژه یا cloud upload ندارد؛
- claim قابل قبول برای D1 عبارت است از **no-server-upload by design**؛
- privacy مطلق تضمین نمی‌شود، زیرا متن filter، شناسه‌های eligible، thresholdها و page state ممکن است برای TSETMC یا scriptهای دارای دسترسی صفحه قابل مشاهده باشند.

### ۶.۳ شبکه

D1 برای acquisition دادهٔ TSETMC از page adapter و منابع مجاز قرارداد استفاده می‌کند. D1 به‌صورت خودکار مجوز استفاده از endpoint غیرمجاز، Loader.aspx، WebSocket یا bypass محدودیت TSETMC را ندارد.

---

## ۷. D2 — Hybrid

D2 مسیر اجرای محلی با service روی دستگاه کاربر است.

اصول تأییدشدهٔ D2:

- acquisition صفحه همچنان از adapter مجاز انجام می‌شود؛
- local service نباید محدودیت TSETMC را دور بزند؛
- داده تا حد امکان روی دستگاه کاربر می‌ماند؛
- انتقال به cloud فقط با انتخاب صریح کاربر مجاز است؛
- transport D2 در Alpha به‌صورت **HTTP/JSON control plane + SSE برای progress و eventهای طولانی** انتخاب شده است؛
- transport D2 یک network surface جدا از acquisition TSETMC است و فقط job، snapshot، result و event مربوط به همان job را منتقل می‌کند؛
- زبان service D2 برای Alpha، Node.js LTS است؛
- پورت concrete، authentication implementation، storage engine و جزئیات packaging هنوز انتخاب نشده‌اند؛
- جزئیات الزامی lifecycle، snapshot، cancel، replay، error taxonomy و Origin در PART U و `DECISIONS.md` ثبت شده‌اند.

---

## ۸. D3 — Cloud

D3 مسیر اجرای ابری است.

اصول تأییدشدهٔ D3:

- executor/service ابری D3 در Alpha با Python mapping می‌شود؛
- topology اصلی D3 در Alpha، Managed Container است؛
- معماری مفهومی شامل API boundary، Python service، job queue، bounded worker pool و managed storage است؛
- Alpha به Kubernetes الزام ندارد؛
- cloud نباید مستقل و خودسرانه TSETMC را scrape کند؛
- cloud snapshot ارسالی client یا منبعی را مصرف می‌کند که مستقل و مجاز تأیید شده باشد؛
- انتقال دادهٔ بازار، profile و filter با رضایت و policy روشن انجام می‌شود؛
- data residency، retention، deletion، authentication، packaging و cloud provider هنوز نهایی نشده‌اند؛
- parity با D1 و D2 باید با canonical fixture و test اثبات شود.

---

## ۹. `mw.AllRows` و page-memory adapter

`mw.AllRows` در این نسخه **contract-verified محسوب نمی‌شود**. وضعیت آن:

```text
owner-observed / architecture candidate / evidence pending
```

اگر evidence لازم ثبت شود، adapter باید فقط read-only باشد و این موارد را تعیین کند:

- `ParTree` و URL دقیق؛
- دسترسی از page realm؛
- scope و تعریف «همهٔ ردیف‌ها»؛
- key و identity هر رکورد؛
- schema و نوع fieldها؛
- behavior در loading، refresh و error؛
- generation یا timestamp؛
- completeness نسبت به universe مورد ادعا؛
- provenance و hash snapshot.

تا آن زمان، `mw.AllRows` فقط مسیر پیشنهادی برای bulk data است و نباید به‌عنوان کل universe بازار معرفی شود.

داده‌هایی مانند option-chain عمیق، option-to-underlying، multiplier، OI، history، calendar، IV surface و Greeks از `mw.AllRows` به‌صورت خودکار اثبات نمی‌شوند و به منابع یا parserهای جداگانه نیاز دارند.

---

## ۱۰. Universe و relation option

Universe نباید به‌دلیل size، rate یا هزینهٔ تحلیل truncate شود.

تعریف عملیاتی موقت:

```text
U_snapshot = تمام رکوردهای واقعاً موجود در snapshot معتبر
```

این تعریف تا زمان اثبات completeness، ادعای «کل بازار» نیست.

تشخیص option و relation با underlying باید دارای موارد زیر باشد:

- parser نسخه‌دار؛
- fixture اصیل؛
- grammar صریح برای label؛
- handling برای چند numeric run؛
- وضعیت‌های `unknown`, `candidate`, `reported`, `confirmed`, `rejected`؛
- عدم حدس‌زدن در labelهای ناسازگار؛
- provenance برای `baseInsCodes` و هر cross-check.

رکورد unknown از universe حذف نمی‌شود، اما eligible یا confirmed نیز فرض نمی‌شود.

---

## ۱۱. ماژول‌های تحلیلی سطح بالا

ماژول‌های زیر هدف معماری B هستند و تا تکمیل dependency matrix قابلیت shipping محسوب نمی‌شوند:

| ماژول | ورودی‌های لازم | وضعیت Alpha |
|---|---|---|
| GEX/DEX | chain، strike، expiry، OI، multiplier، underlying | منبع chain و multiplier باز است |
| Vanna/Volga | IV معتبر، Greeks، expiry، convention | convention و منبع باز است |
| Flow Scanner | trade history، سمت معامله یا proxy معتبر، timestamp | سمت معامله تعریف نهایی نشده |
| Volatility Surface | chain کامل، IVهای معتبر، quality gates | chain کامل باز است |

این ماژول‌ها نباید با دادهٔ ساختگی، multiplier حدسی یا relation حدسی فعال شوند.

---

## ۱۲. Exact projection از B به A

B باید verdict را در snapshot مشخصی تولید کند. برای snapshot شمارهٔ `k`:

```text
E_k = مجموعهٔ canonical instrument IDهایی که B در snapshot k واجدشرایط اعلام کرده است
```

projection دقیق باید به‌صورت صریح یکی از این دو باشد:

1. عضویت دقیق `row.inscode` در `E_k`؛ یا
2. predicate ردیفی دقیق که جزئی از verdict رسمی B و همان snapshot است.

ترکیب مبهم membership با threshold زنده مجاز نیست.

قواعد ثابت:

- scalar-only fallback مجاز نیست؛
- Bloom یا approximation مجاز نیست؛
- universe برای جا شدن در textarea حذف نمی‌شود؛
- ceiling عددی جدید تا probe واقعی تصویب نمی‌شود؛
- object literal فقط پس از حل تعارض lifecycle/allocation و ثبت evidence مجاز است؛
- emitterهای دقیق و allocation-free مانند decision tree ثابت می‌توانند بررسی شوند؛
- اگر emitter دقیق در ظرفیت ثبت‌شده جا نشود، build نباید خروجی ناقص تولید کند.

A باید با شناسهٔ snapshot، config hash، زمان تولید و وضعیت apply از B تفکیک شود.

---

## ۱۳. Bridge و apply confirmation

وضعیت‌های bridge عبارت‌اند از:

```text
generated
written
page-state-observed
applied-confirmed
persisted-confirmed
unconfirmed
error
```

وجود `mw.FilterCode`، `mw.Settings.Filters` و `mw.SaveParams` در این Alpha به‌عنوان owner-observed/candidate ثبت می‌شود، نه API قطعی.

`applied-confirmed` فقط پس از تعیین authoritative page state و probe معتبر صادر می‌شود. نوشتن در textarea، تغییر row count یا return value ناشناخته به‌تنهایی confirmation نیست.

manual mode نباید به‌صورت خاموش fallback شود. اگر مسیر خودکار شکست خورد، وضعیت باید error یا unconfirmed باقی بماند و جزئیات trace شود.

---

## ۱۴. Freshness، bulk و deep path

دو مسیر داده حفظ می‌شوند:

### ۱۴.۱ Bulk path

- منبع بالقوه: page-memory adapter تأییدشده؛
- fieldها فقط پس از schema/evidence معتبر مصرف می‌شوند؛
- freshness از generation/timestamp قابل اتکا گرفته می‌شود؛
- snapshot باید نسبت به mutationهای هم‌زمان پایدار باشد.

### ۱۴.۲ Deep path

- فقط endpointها و parserهای دارای provenance مصرف می‌شوند؛
- scheduler نباید instrumentها را به‌دلیل هزینه حذف کند؛
- timeout، abort، deduplication و backoff لازم است؛
- freshness target کاربر با freshness achieved جدا ثبت می‌شود؛
- stale یا unknown نباید fresh یا eligible فرض شود؛
- option-chain و calendar تا زمان تأیید منبع در وضعیت باز هستند.

`mw.AllRows` کاهش fetch برای bulk را ممکن می‌کند، اما به‌تنهایی trade-off کل داده‌های عمیق را حل‌شده اعلام نمی‌کند.

---

## ۱۵. Compute Dispatcher

Compute Dispatcher فقط در Artifact B قرار می‌گیرد و هرگز وارد Artifact A نمی‌شود.

اصول آن:

- executor انتخاب‌شده باید در trace ثبت شود؛
- dispatcher نباید universe را کوچک کند؛
- نباید approximate را جای exact بنشاند؛
- نباید stale را fresh معرفی کند؛
- نباید deployment را بی‌صدا عوض کند؛
- نباید network policy deployment جاری را دور بزند؛
- شکست ظرفیت باید گزارش شود، نه پنهان.

D1 با Browser JavaScript، D2 با Node.js LTS و D3 با Python در Managed Container mapping شده‌اند. پورت concrete، authentication implementation، packaging، cloud provider و scaling topology هنوز تصمیم نهایی نیستند؛ transport پایهٔ D2 برای Alpha در تصمیم `D-2026-10-03-001` انتخاب شده است.

---

## ۱۶. تصمیم‌های باقی‌مانده برای تأیید مالک

این بخش فقط مواردی را نگه می‌دارد که هنوز نیازمند انتخاب/تأیید صریح هستند. transport D2، mapping زبان‌ها، topology اصلی D3 و policy نسخه در تصمیم‌های `D-2026-10-03-001` تا `D-2026-10-03-004` ثبت شده‌اند و دیگر در این فهرست باز نیستند:

1. ترتیب نهایی افزودن PARTها و gateها.

سند فعلی همچنان بدون شماره و با عنوان `Architecture Contract Alpha` باقی می‌ماند. هدف successor پس از تکمیل پنج تصمیم Class B، `v6.0` است؛ این هدف هنوز مجوز shipping نیست.

---

## ۱۷. دروازه‌های فنی — تصمیم انتخابی نیستند

این موارد در فهرست «تصمیم‌های مالک» نیستند؛ کارهای validation/design هستند که باید پیش از release بسته شوند:

- evidence دامنه و schema `mw.AllRows`؛
- probe `mw.FilterCode` و `mw.SaveParams`؛
- طراحی main-thread/Worker؛
- تعریف دقیق A snapshot؛
- exact projection بدون scalar fallback؛
- ظرفیت واقعی textarea و parser؛
- bridge confirmation؛
- منبع option-chain؛
- option-to-underlying fixture؛
- multiplier و OI؛
- calendar source؛
- canonical computation؛
- parity سه executor؛
- network boundary هر deployment؛
- privacy و data-transfer policy؛
- defaults و evidence ledger؛
- fixtureهای cross-language؛
- تست‌های source/min و invariants قرارداد v5.0.

بسته‌شدن این gateها به معنی انتخاب یک گزینهٔ محصولی نیست؛ به معنی اثبات یا رد فنی همان مسیر انتخاب‌شده است.

---

## ۱۸. وضعیت Alpha و قاعدهٔ تولید

این سند:

- canonical نیست؛
- v5.0 را بی‌صدا supersede نمی‌کند؛
- به‌تنهایی مجوز تولید Artifact A یا B نیست؛
- مجوز probe زنده یا shipping نیست؛
- defaultهای حل‌نشده را تعیین نمی‌کند؛
- اصل عدم جعل داده و عدم کاهش خاموش دامنه را حفظ می‌کند.

پس از تکمیل پنج تصمیم Class B، successor هدف با عنوان `v6.0` شناخته می‌شود؛ با این حال انتشار یا shipping آن فقط پس از بسته‌شدن gateهای فنی و تأیید نهایی مالک مجاز است. هر کد محصول باید پس از آن، source/min، `node --check`، اسکن ۵۹ trigger، parity و الزامات PART G/H را رعایت کند.

## ۱۹. PART U — Transport Layer Alpha

PART U سه سطح مستقل را تعریف می‌کند. این سه سطح نباید در implementation یا trace با یکدیگر اشتباه شوند:

```text
Page ↔ Worker          postMessage؛ داخلی مرورگر و مربوط به D1
Page ↔ Local Service   HTTP/JSON + SSE؛ مربوط به D2 در Alpha
Page ↔ Cloud           مربوط به D3؛ در Alpha انتخاب نشده
```

### U.1 سطح اول — Page ↔ Worker

- این سطح transport داخلی D1 است؛
- از `postMessage` با message schema نسخه‌دار استفاده می‌کند؛
- به local service یا cloud نیاز ندارد؛
- `snapshotId`، `configHash`، `jobId` و version باید همراه پیام باشند؛
- Worker مستقیماً به DOM، `window.mw` یا `localStorage` دسترسی ندارد؛
- main-thread adapter مالک دسترسی page و storage adapter است؛
- failure و timeout Worker باید به main thread گزارش شود و به‌عنوان موفقیت کامل تفسیر نشود.

### U.2 سطح دوم — Page ↔ Local Service در D2

Transport انتخاب‌شده برای Alpha:

```text
HTTP/JSON control plane + SSE progress/event stream
```

HTTP/JSON برای عملیات زیر استفاده می‌شود:

- submit job؛
- دریافت status؛
- دریافت result؛
- درخواست cancel؛
- انتقال snapshot یا reference معتبر به snapshot؛
- دریافت diagnostics و error detail.

SSE برای موارد زیر استفاده می‌شود:

- progress؛
- state transition؛
- completion؛
- failure؛
- cancellation؛
- timeout؛
- eventهای قابل replay.

WebSocket در transport پایهٔ Alpha نیست. افزودن آن فقط در صورت تبدیل‌شدن bidirectional low-latency streaming به نیاز سخت و پس از تصمیم جدید مجاز است.

### U.3 مرز و امنیت D2

- local service نباید روی interface خارجی bind شود؛
- endpoint browser-facing در کد hardcode نمی‌شود؛
- endpoint از config معتبر می‌آید؛
- D1 مقدار local endpoint ندارد؛
- D2 endpoint محلی خود را از config می‌گیرد؛
- origin درخواست باید بررسی شود؛
- production origin و dev origin باید allowlist جدا داشته باشند؛
- origin ناشناخته یا فاقد policy رد می‌شود؛
- session token تصادفی و کوتاه‌عمر لازم است؛
- raw credential نباید در message حمل شود؛
- transport D2 فقط job، snapshot، result و event همان job را منتقل می‌کند؛
- local service حق استفاده از endpoint غیرمجاز TSETMC، Loader.aspx، bypass یا تغییر globalهای TSETMC را ندارد؛
- این transport policy جایگزین network policy acquisition نمی‌شود.

### U.4 Message envelope

هر پیام D2 باید envelope نسخه‌دار داشته باشد و در صورت ارتباط jobمحور، این شناسه‌ها را حمل کند:

```text
schemaVersion
messageType
requestId
jobId
snapshotId
configHash
sequence
createdAt
payload
```

وجود payload بدون schema version یا بدون هویت snapshot برای job قابل قبول نیست.

Retry باید idempotent باشد. دریافت دوبارهٔ یک `requestId` نباید باعث اجرای دوبارهٔ ناخواستهٔ job شود.

### U.5 Job lifecycle

هر job دقیقاً یکی از stateهای اصلی زیر را دارد:

```text
queued → running → done
                 → failed
                 → cancelled
                 → timed-out
```

قواعد:

- `queued` هنوز اجرا نشده است؛
- `running` منابع اجرایی گرفته است؛
- `done` فقط برای نتیجهٔ کامل و معتبر است؛
- `failed` شامل دلیل و طبقهٔ خطا است؛
- `cancelled` با درخواست cancel ایجاد می‌شود؛
- `timed-out` به‌صراحت از `failed` عادی جدا می‌شود؛
- transition نامعتبر باید رد و trace شود؛
- job نباید هم‌زمان دو state نهایی داشته باشد.

### U.6 Snapshot immutability

هر job دقیقاً به یک `snapshotId` و `configHash` متصل است.

- snapshot در طول job mutation نمی‌شود؛
- ورود دادهٔ جدید snapshot جدید می‌سازد؛
- دادهٔ جدید job جاری را بی‌صدا تغییر نمی‌دهد؛
- result باید `snapshotId`، `configHash`، model version و زمان تولید را حمل کند؛
- نتیجه‌ای که snapshot آن با درخواست ناسازگار است، eligible برای مصرف نیست.

### U.7 Cancel semantics

- cancel idempotent است؛
- cancel دوباره خطای destructive ایجاد نمی‌کند؛
- cancel باید slot و منابع job را آزاد کند؛
- cancel نتیجهٔ partial را کامل اعلام نمی‌کند؛
- نتیجهٔ partial، اگر تولید شود، باید `partial: true` و `reason: cancelled` داشته باشد؛
- cancel داده را از pool یا snapshot store حذف نمی‌کند؛
- retry کردن cancel‌شده فقط با job جدید و شناسهٔ جدید مجاز است.

### U.8 SSE reconnect و replay

- هر SSE event یک `id` یکتا و monotonic در همان stream دارد؛
- client در reconnect مقدار `Last-Event-ID` را می‌فرستد؛
- server eventهای بعد از آن ID را replay می‌کند؛
- اگر replay window منقضی شده باشد، server یک `reset` event می‌فرستد؛
- client پس از `reset` باید وضعیت snapshot/job را دوباره از control plane بخواند؛
- progress تکراری نباید به‌عنوان اجرای دوبارهٔ job تفسیر شود.

### U.9 Error taxonomy

| دسته | نمونه | رفتار |
|---|---|---|
| `transient` | قطع موقت شبکه یا service unavailable | retry با backoff و idempotency |
| `permanent` | snapshot نامعتبر یا schema ناسازگار | بدون retry خودکار؛ وضعیت failure |
| `user` | پارامتر یا profile نامعتبر | بدون retry؛ بازگشت خطای قابل‌فهم به UI |

هر error باید category، code، message قابل‌نمایش، `requestId` و در صورت ارتباط job، `jobId` داشته باشد.

### U.10 Worker pool و timeout

- اجرای هم‌زمان jobها باید محدود و قابل مشاهده باشد؛
- job اضافی در `queued` می‌ماند مگر priority صریح وجود داشته باشد؛
- مقدار نهایی pool size در این تصمیم انتخاب نشده است؛
- hard timeout برای هر job الزامی است؛
- مقدارهای پیشنهادی ۶۰ ثانیه برای job عادی و حداکثر ۳۰۰ ثانیه برای job سنگین در این Alpha به‌عنوان candidate ثبت می‌شوند، نه default نهایی؛
- timeout باید منابع و slot را آزاد کند؛
- timeout نباید result کامل تولید کند؛
- تغییر timeout فقط از مسیر policy معتبر و قابل trace مجاز است.

### U.11 Browser-facing URL policy

- هیچ URL مربوط به local service در کد browser-facing hardcode نمی‌شود؛
- مقدار endpoint از config می‌آید؛
- D1 endpoint محلی ندارد؛
- D2 endpoint محلی از config می‌آید؛
- D3 endpoint آینده از سازوکار discovery/auth مخصوص خود می‌آید؛
- محیط preview توسعه باید از relative URL و proxy استفاده کند، نه اتصال hardcoded به `localhost` یا `127.0.0.1`.

### U.12 D3

D3 در این Alpha transport انتخاب‌شده ندارد. در هر تصمیم آینده:

- page ↔ cloud باید از page ↔ Worker و page ↔ local service جدا بماند؛
- cloud نباید مستقل TSETMC را scrape کند؛
- message schema مشترک باید حفظ شود؛
- authentication، retention، residency، upload scope و transport باید جداگانه تصویب شوند.

### U.13 Trace و observability

برای هر job و transport باید حداقل این رخدادها قابل ردیابی باشند:

- submit؛
- accepted/queued؛
- running؛
- progress؛
- reconnect؛
- retry؛
- cancel؛
- done؛
- failed؛
- timed-out؛
- reset؛
- result consumed یا rejected به‌دلیل mismatch snapshot.

**PART U در این Alpha transport D2 و lifecycle آن را قطعی می‌کند. D2 با Node.js LTS mapping شده است؛ پورت concrete، packaging، cloud transport و hard-timeout/pool defaults هنوز تصمیم نهایی نیستند.**

---

## ۲۰. ترتیب قرارداد و gateها — Dependency/Gate-Driven

این بخش ترتیب قرارداد و validation را dependency-driven تعریف می‌کند. این ترتیب با ترتیب متنی PARTها یا feature-first یکی نیست.

### V.1 مرحلهٔ ۱.الف — Governance پایه

این مرحله فقط ساختار پایه را تثبیت می‌کند:

- سه سطح ادعا؛
- ساختار `DECISIONS.md`؛
- ساختار `PENDING.md`؛
- ساختار `EVIDENCE_LEDGER.md`؛
- ساختار `V5_CLEANUP.md`؛
- Artifact A و Artifact B؛
- D1، D2 و D3؛
- Alpha بدون شماره.

این مرحله ادعای جدید platform را تأیید نمی‌کند.

### V.2 مرحلهٔ ۱.ب — تصمیم‌های بنیادین

تصمیم‌های transport D2، runtime mapping، D3 topology، version policy و gate order در `DECISIONS.md` ثبت شده‌اند. دامنهٔ دقیق قابلیت‌های Alpha همچنان باید به‌صورت جداگانه و صریح تعیین شود؛ فهرست in/out پیشنهادی بدون تأیید مالک مصوبه نیست.

### V.3 مرحلهٔ ۲+۳ — Data و Transport به‌صورت co-design

دو شاخه پس از governance می‌توانند موازی طراحی شوند:

#### شاخهٔ Data

- PART K: endpoint، freshness، timeout، provenance و scheduler؛
- PART R: `mw.AllRows`، scope، schema و universe؛
- evidence و fixture مربوط به page memory؛
- option label و option-to-underlying parser؛
- sourceهای chain، calendar، OI و multiplier.

#### شاخهٔ Transport

- PART T: D1، D2 و D3؛
- PART U: Page ↔ Worker، Page ↔ Local Service و Page ↔ Cloud؛
- message schema؛
- job lifecycle، snapshot immutability، cancel، replay و error taxonomy؛
- network boundary.

نقطهٔ تلاقی دو شاخه، canonical snapshot/message schema است. هیچ شاخه‌ای بدون توافق این schema به implementation نهایی نمی‌رسد.

### V.4 مرحلهٔ ۴ — Snapshot و canonical computation

- schema نسخه‌دار؛
- canonical serialization؛
- timezone، rounding و decimal policy؛
- missing/unknown semantics؛
- model version؛
- snapshot identity و data age.

### V.5 مرحلهٔ ۵.الف — اولین مدل

اولین مدل باید هم‌زمان این سه خروجی را داشته باشد:

- implementation؛
- parity test بین executorهای موجود؛
- no-fabrication test با fixture ناقص.

Parity و no-fabrication از این مرحله به بعد gateهای پیوسته‌اند، نه تست‌هایی که فقط در انتهای release اجرا شوند.

### V.6 مرحلهٔ ۵.ب تا ۵.ز — مدل‌های مستقل

مدل‌ها بر اساس dependency خود به زیرمرحله‌های مستقل تقسیم می‌شوند:

- ۵.ب — Greeks و IV؛
- ۵.ج — GARCH؛
- ۵.د — Spread؛
- ۵.ه — SVI؛
- ۵.و — GEX/DEX؛
- ۵.ز — Flow؛
- ۵.ح — Volatility Surface.

هر زیرمرحله باید dependency، parity و no-fabrication test مخصوص خود را داشته باشد.

### V.7 مرحلهٔ ۶ — Exact projection

پس از تعریف verdict B، compiler دقیق A، capacity و cost آن بررسی می‌شوند. هیچ projectionی پیش از snapshot semantics و اولین مدل معتبر به‌عنوان verdict کامل معرفی نمی‌شود.

### V.8 مرحلهٔ ۷ — Bridge

Bridge پس از آماده‌شدن exact projection بررسی می‌شود، چون generated text باید پیش از apply confirmation معنای ثابت داشته باشد.

### V.9 مرحلهٔ ۸ — UI، dispatcher و defaults

Profile/executor indicator، freshness، apply state، dispatcher، pool policy، timeout policy، defaults و data-transfer policy در این مرحله تکمیل می‌شوند.

### V.10 مرحلهٔ ۹ — Release gates

ترتیب فشردهٔ gateها:

```text
1  Governance پایه
2  تصمیم‌های بنیادین
3  mw.AllRows evidence + fixture
4  option/universe/parser evidence + fixture
5  snapshot + canonical computation
6  اولین مدل + parity + no-fabrication
7  chain source
8  calendar source
9  OI source
10 multiplier source
11 سایر مدل‌ها با parity و no-fabrication
12 exact A projection + capacity
13 bridge confirmation
14 source/min/release tests
15 owner approval و target v6.0
```

`V5_CLEANUP.md` register اصلاحات v5.0 است و v5.0 را بی‌صدا تغییر نمی‌دهد. هر dependency جدید می‌تواند gateهای downstream وابسته را دوباره باز کند.

**END OF ARCHITECTURE CONTRACT ALPHA**
