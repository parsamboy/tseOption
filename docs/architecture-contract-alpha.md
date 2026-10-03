# قرارداد معماری Zharfa Smart Filter — نسخهٔ Alpha

**وضعیت: ALPHA — برای بازبینی و تأیید مالک؛ canonical نیست و مجوز shipping یا تولید کد محصول نیست.**

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

D1، D2 و D3 در این نسخه جهت محصول/معماری هستند؛ زبان سرویس، transport، cloud topology و جزئیات اجرایی آن‌ها هنوز انتخاب نهایی نشده است.

---

## ۴. Core مشترک و deployment-specific adapters

منطق تحلیلی باید از محیط اجرا مستقل طراحی شود و از interfaceهای مفهومی زیر استفاده کند:

- `DataSource`
- `SnapshotStore`
- `AnalyticsExecutor`
- `Compiler`
- `ApplyBridge`
- `EvidenceLedger`

هر deployment implementation مخصوص خود را دارد. Core مشترک نباید به DOM، `window.mw`، localStorage، localhost یا cloud API وابسته باشد.

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
- زبان service، transport، authentication، storage engine و protocol در این نسخه انتخاب نشده‌اند؛
- transport D2 باید در لایهٔ جداگانه تعریف شود و به‌عنوان network surface جدید با v5.0 قاطی نشود.

---

## ۸. D3 — Cloud

D3 مسیر اجرای ابری است.

اصول تأییدشدهٔ D3:

- cloud نباید مستقل و خودسرانه TSETMC را scrape کند؛
- cloud snapshot ارسالی client یا منبعی را مصرف می‌کند که مستقل و مجاز تأیید شده باشد؛
- انتقال دادهٔ بازار، profile و filter با رضایت و policy روشن انجام می‌شود؛
- data residency، retention، deletion، authentication و cloud topology هنوز نهایی نشده‌اند؛
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

جزئیات انتخاب executor، زبان service، protocol و cloud topology هنوز تصمیم نهایی نیستند.

---

## ۱۶. تصمیم‌های باقی‌مانده برای تأیید مالک

این بخش فقط مواردی را نگه می‌دارد که نیازمند انتخاب/تأیید صریح هستند:

1. زبان service محلی D2؛
2. protocol/transport محلی D2؛
3. معماری D3: Serverless، Container، VM یا گزینهٔ دیگر؛
4. نام و شمارهٔ نسخهٔ successor پس از Alpha؛
5. ترتیب نهایی افزودن PARTها و gateها.

هیچ‌کدام از این گزینه‌ها در این Alpha default نیستند.

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

پس از تأیید موارد باقی‌مانده و بسته‌شدن gateهای فنی، successor رسمی با شماره‌ای که مالک تعیین می‌کند نوشته می‌شود. هر کد محصول باید پس از آن، source/min، `node --check`، اسکن ۵۹ trigger، parity و الزامات PART G/H را رعایت کند.

**END OF ARCHITECTURE CONTRACT ALPHA**
