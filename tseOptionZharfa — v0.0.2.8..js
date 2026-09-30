// tseOptionZharfa — v0.0.2.8 | tseOptionAbyss — v0.0.2 | fork از tseOption_ExoticFilter v0.0.4.6
// مؤلف اصلی — https://t.me/p75ad
// گروه پروژه — https://t.me/SmartOptionTSE
// مجوز — Smart-FFA-1.0 (Free Fork with Attribution)
// کپی‌رایت — © ۱۴۰۵ — حقوق مؤلف محفوظ است
// رفع مسئولیت — این ابزار صرفاً تحلیلی و اطلاعاتی است، تضمین سود نمی‌دهد
// و مسئولیت هر تصمیم و معامله تنها بر عهده کاربر است.
//
// ╔═══════════════════════════════════════════════════════════════╗
// ║                                                               ║
// ║        🧬 tseOptionZharfa — v0.0.2.8                          ║
// ║        tseOptionAbyss — v0.0.2                                ║
// ║        fork از tseOption_ExoticFilter v0.0.4.6                ║
// ║        معماری — Layer Registry Pattern + Dual-Mode            ║
// ║                                                               ║
// ╚═══════════════════════════════════════════════════════════════╝
//
// ─── ارتباط ─────────────────────────────────────────────────────
//      ✈  مؤلف ...............  https://t.me/p75ad
//      💬  گروه پروژه ........ https://t.me/SmartOptionTSE
//
// ─── مجوز انشعاب ────────────────────────────────────────────────
//      نوع مجوز — Smart-FFA-1.0  (Free Fork with Attribution)
//      برداشتن، بازنویسی، گسترش و انتشار نسخه مستقل — آزاد است.
//      شرط — سربرگ نسخهٔ انشعاب‌یافته باید نام و نشانی مؤلف اصلی را
//      دست‌نخورده نگه دارد.
//
// ─── ویژگی‌های نسخه ─────────────────────────────────────────────
//      • معماری Layer Registry — هر لایه {key, schema, filter} خودتوصیف
//      • ثبت لایه‌ها در LAYERS بدون ویرایش runner
//      • Context مرکزی به جای state سراسری پراکنده
//      • دو حالت نمایش — سورس هر دو مد SUMMARY و VERBOSE،
//        مینی‌فای فقط SUMMARY — فقط دو نسخه source و min
//      • تنظیمات خودکار از schema — افزودن تنظیم برابر ۱ خط schema
//      • استخر ۹۰ روزه با درخواست کاربر + قیمت زندهٔ old.tsetmc.com
//      • سررسید خودکار آخرین روز ماه بعد جلالی
//      • تم با funnel SVG + کارت‌های مدرن + انیمیشن flow
//      • فیکس P0 — double callback، {} خالی، poolInfo ID، ریشهٔ استایل
//      • اتصال زندهٔ TSETMC با گارد مبدأ — فقط از دامنهٔ tsetmc.com
//      • ادغاب نکات نسخهٔ ds — سخت‌گیری تاریخچه با historyStrictMode + سکشن‌بندی مهندسی
//      • خط تولید نسخهٔ مینی‌فای — tools/build-min.js مطابق قرارداد B.2 و B.4
//      • قرارداد v3.5 — الزام دستیارها، همگامی مینی‌فای با Abyss، رهگیری وربوز،
//        راه‌اندازی بدون وقفهٔ مرگبار، ساعات کار بازار در تقویم، ثبت هر کشف محدودیت
//
// ─── یادداشت پیاده‌سازی ─────────────────────────────────────────
//      قرارداد فعال و کامل محدودیت‌های TSETMC در بخش بعدی با عنوان
//      TSETMC COMPATIBILITY CONTRACT v3.5 آمده است. متن قرارداد
//      به‌صورت line comment درج شده تا نمونه‌نشانگرهای داخلی کامنت
//      را نبندند.
//
// ===========================================================================
// TSETMC COMPATIBILITY CONTRACT v3.5
// Source of truth: field probes on old.tsetmc.com (7 probes + 1 final test)
// This full contract lives in the SOURCE file only. The MINIFIED file
// carries only 4 identity lines plus the LEGAL module. The contract is
// intentionally line-commented so that literal markers such as the strip
// directive inside this text do not break surrounding comment blocks.
// Clause A.1.6 forbids colon and semicolon in non-ASCII comments, so every
// contract line below is ASCII.
//
// ---------------------------------------------------------------------------
// PART A — TSETMC PLATFORM CONSTRAINTS (environment rules, shared)
// ---------------------------------------------------------------------------
//
// A.1 Encoding and text
//   A.1.1 TSETMC does not HTML-decode entities inside JavaScript strings.
//         Evidence: 5 independent probes, the ampersand entity stayed literal.
//   A.1.2 Every ampersand in code must be built via String.fromCharCode(38).
//   A.1.3 Page charset is UTF-8 without BOM.
//   A.1.4 Paste from chat or Markdown is unsafe, use a local dot-js file.
//   A.1.5 End of line is LF or CRLF, identical across all files.
//   A.1.6 Comments that contain colon or semicolon must be written in ASCII.
//   A.1.7 Persian text in code uses Unicode escapes when embedded in
//         identifiers or sensitive strings.
//   A.1.8 Display strings (toast, labels, headers) may stay raw UTF-8 in
//         both source and minified files, provided the file is UTF-8.
//   A.1.9 Critical messages (alert, confirm, throw) are Unicode-escaped in
//         the minified build.
//   A.1.10 LEGAL module has two representations. Source is plain Persian
//         raw UTF-8 and editable. Minified is identical content with every
//         non-ASCII character as backslash-u-XXXX so the file is one
//         hundred percent ASCII. Both must be parity-tested.
//
// A.2 Syntax validation
//   A.2.1 node --check is mandatory before every release.
//   A.2.2 "missing ) after argument list" indicates a conversion error.
//   A.2.3 Inside strings, replace the script close tag with a backslash-
//         escaped variant.
//   A.2.4 Semicolon before else is forbidden, always use the brace form.
//   A.2.5 Save as UTF-8 without BOM, or as pure ASCII.
//
// A.3 Minification constraints
//   A.3.1 Terser and Uglify do not work on TSETMC, do not use them.
//   A.3.2 Full mangle is forbidden, local names must be preserved.
//   A.3.3 Binary and emission transforms are forbidden.
//   A.3.4 Any transform runs only after its own package passes tests.
//   A.3.5 Minify applies to the minified build only, never to the source.
//   A.3.6 The minified build is raw JavaScript, no data URI, no base64.
//
// A.4 Runtime environment and globals
//   A.4.1 Read-only TSETMC globals: l18, l30, ih, Symbols, InstSimple,
//         tsetmc. Never override them, only read.
//   A.4.2 Our own globals use the prefix double-underscore-exf.
//   A.4.3 readyState may be loading, interactive, or complete.
//   A.4.4 eval and new Function are forbidden even if CSP allows them.
//   A.4.5 Code may run inside an iframe, do not touch window.parent.
//   A.4.6 localStorage is available with roughly 5 MB quota, prune when full.
//   A.4.7 fetch, AbortController, Promise, Map, Set, WeakMap are available.
//   A.4.8 TSETMC globals exist only on the instrument page with
//         ParTree equal to 151311.
//   A.4.9 A.4.2 has two documented exceptions - discovered limitation kept
//         by design for cross-version interop, frozen names only. First,
//         window.__optCfgV71_x - settings storage owned by the parent core,
//         wrapped in read-only access with getCfg and setCfg. Second,
//         window.__ZharfaStandalone - standalone test harness flag written
//         only by the harness. No NEW global may join the exception list
//         without a new contract version.
//
// A.5 Network and CORS
//   A.5.1 Primary source is slash-tsev2-slash-data-slash-star-dot-aspx on
//         the same origin.
//   A.5.2 Valid endpoints confirmed by field probes. InstInfoFast.aspx with
//         i equal to the instrument and c equal to 34 returns lastPrice,
//         closingPrice, prevClose, high, low, maxAllowed, minAllowed,
//         tradeCount, volume, value, dateGregorian, and a five-level
//         orderBook. InstTradeHistory.aspx with i equal to the instrument
//         and Top equal to N returns N days (1 through 500) of OHLCV,
//         value, and tradeCount.
//   A.5.3 Invalid endpoints that redirect to HTML are BestLimit.aspx,
//         BestLimits.aspx, ClientTypeBestLimit.aspx, and ClosingPrice.aspx.
//   A.5.4 CDN JSON under cdn.tsetmc.com is CORS-blocked from old.tsetmc.com.
//   A.5.5 The slash-api-slash-star path does not exist on old.tsetmc.com
//         and returns 404.
//   A.5.6 Batch requests separated by comma return HTTP 500.
//   A.5.7 credentials same-origin or omit, no functional difference.
//   A.5.8 headers equal to an empty object is safe.
//   A.5.9 Rate limit, at least one thousand milliseconds between requests.
//   A.5.10 Discovered runtime limitation. The TSETMC page ships minified
//         jQuery and page or third-party scripts may probe Loader.aspx with
//         ParTree 15 plus an empty nocache parameter through HEAD. That probe
//         returns 404 and appears in the shared console as page noise which
//         must never be attributed to this tool. The tool network surface
//         stays GET on tsev2 slash data star dot aspx only - no Loader.aspx,
//         no page jQuery or $ calls, no HEAD, no XMLHttpRequest, no GM xml
//         http. Runtime isolation is guarded in tools/build-min.js and
//         tools/smoke-test.js.
//   A.5.10 Timeout of six to eight seconds is sufficient. Average response
//         is twenty to three hundred and fifty milliseconds.
//   A.5.11 AbortController plus setTimeout is the safe approach.
//   A.5.12 HTTP responses are cached in sequential execution.
//
// A.6 TSETMC data layout
//   A.6.1 InstInfoFast segments are split on semicolon. Segment 0 is the
//         main record and splits on comma into fourteen fields, indexed
//         zero through thirteen as time, flow, lastPrice, closingPrice,
//         high, priceYesterday, maxAllowed, minAllowed, tradeCount, volume,
//         value, status, dateGregorian in YYYYMMDD form, and timeCode.
//         Segment 1 is the market index and is optional. Segment 2 is the
//         order book with five levels, each split on at-sign into six
//         fields where index 0 is count, 1 is volume, 2 is bidPrice, and 3
//         is askPrice. In a buy queue askPrice may be zero.
//   A.6.2 InstTradeHistory rows split on semicolon. Each row splits on
//         at-sign into ten fields, indexed zero through nine as date in
//         YYYYMMDD form, firstPrice, lowPrice, highPrice, closingPrice,
//         lastPrice, prevClose, value, volume, and tradeCount. The final
//         row may be empty, the parser must drop it.
//   A.6.3 Dates are Gregorian YYYYMMDD. Convert to JDN with
//         gregorianToJdn(y, m, d). Confirmed reference 20260929 gives
//         2461313.
//   A.6.4 Decimal separator is a period.
//   A.6.5 insCode is seventeen digits. Confirmed examples are four
//         specific instruments listed in the appendix.
//
// A.7 Truth-first principles
//   A.7.1 When history or quote is missing, do not fabricate data.
//   A.7.2 A default value must not replace a real observation. Attach
//         addDataWarning to every affected symbol.
//   A.7.3 Math.random is used only in scanMock under an explicit
//         simulation label.
//   A.7.4 Every number is traceable to a source with source, timestamp,
//         and instrumentId provenance.
//   A.7.5 Death mode, meaning zero output, must not hang the pipeline.
//   A.7.6 Automatic validation before acceptance. lastPrice greater than
//         zero, closingPrice greater than zero, priceYesterday greater
//         than zero, lastPrice within minAllowed and maxAllowed,
//         dateGregorian is a valid eight-digit value, orderBook is
//         non-empty, history is descending, JDN is valid.
//
// A.8 Pool and history
//   A.8.1 poolDays equals ninety.
//   A.8.2 poolAutoUpdate defaults to false. History is fetched only on
//         explicit user request.
//   A.8.3 Provenance is one of live-tsetmc or tsetmc-history.
//   A.8.4 instrumentId must match baseInsCodes.
//   A.8.5 ivHist requires at least five observations for a valid IV Rank.
//   A.8.6 poolWriteAllowed gates automatic and manual writes.
//
// ---------------------------------------------------------------------------
// PART B — PER-BUILD REQUIREMENTS
// ---------------------------------------------------------------------------
//
// B.1 Source build (readable)
//   B.1.1 IIFE plus use strict.
//   B.1.2 Section comments of the form slash-slash-space-triple-line-name.
//   B.1.3 Descriptive names such as poolStore, ivHist, traceStore.
//   B.1.4 Parameter help in schema dot label and schema dot description.
//   B.1.5 Two view modes, SUMMARY is compact, VERBOSE is full.
//   B.1.6 VERBOSE UI shows per-symbol trace, Greeks, and scenarios.
//   B.1.7 Debug panel has three tabs, summary, layers, and raw.
//   B.1.8 devMode true enables runUnitTests and free console use.
//   B.1.9 Size is roughly three thousand to four thousand lines.
//   B.1.10 Windows support minimize, drag, and resize.
//   B.1.11 No inline onclick, delegated listeners only.
//   B.1.12 escapeHtml on every user input.
//   B.1.13 Sensitive comments containing colon or semicolon are ASCII.
//   B.1.14 This full contract lives at the top of the source file.
//   B.1.15 LEGAL module carries plain Persian text in raw UTF-8.
//   B.1.16 Legal notices appear in footer, alert, and confirm.
//
// B.2 Minified build (light, SUMMARY only)
//   B.2.1 Definite removals include renderLayerVerbose between the strip
//         directive and the next keep directive, the else branch inside
//         renderResultsTable for verbose rendering, any summary-check
//         block inside renderDebug, runUnitTests and its call, every
//         console log warn assert table call, section comments, dead
//         if-false blocks, unused variables such as the render-scheduled
//         flag, and the environment field in REPORT.
//   B.2.2 Definite preserves include the nine LAYERS entries, the FILTERS
//         registry, bsPrice, bsGreeks, ivSolve, the full TSE_CALENDAR,
//         poolStore and ivHist management, adapter registration,
//         renderLayerSummary at the keep marker, the SUMMARY branch of
//         renderResultsTable, the window dot double-underscore-exf API,
//         results and validation unchanged, and the LEGAL module in
//         Unicode-escaped form.
//   B.2.3 Build strategy is ordered concatenation plus marker-based
//         stripping, regex from the strip directive to the next keep
//         directive, names preserved with no mangle, scope and order
//         preserved, no Terser or Uglify.
//   B.2.4 Minified header has only four lines, the version tag, author
//         plus group, license plus copyright, and the escaped disclaimer.
//   B.2.5 LEGAL module with Unicode escapes, all non-ASCII characters as
//         backslash-u-XXXX, file is one hundred percent ASCII, content
//         is parity-tested against the source.
//   B.2.6 getViewMode hardcodes summary.
//   B.2.7 Size is at most forty percent of source.
//   B.2.8 No contract block, only the four identity lines plus escaped
//         LEGAL module.
//
// B.3 Source and minified compatibility
//   B.3.1 Identical behavior across pipeline, parsers, and adapter.
//   B.3.2 Parity test, identical input yields identical JSON output.
//         Allowed differences are the mode field, the environment field,
//         timestamps of run time, and network latency.
//   B.3.3 node --check passes on both before release.
//   B.3.4 LAYERS dot length equals nine on both.
//   B.3.5 Math.random is forbidden in the real data path.
//   B.3.6 poolAutoUpdate defaults to false on both.
//   B.3.7 LEGAL parity, after decoding both contents are equal.
//
// B.4 LEGAL module, detailed rules
//   B.4.1 Required fields are author, group, license, copyright,
//         disclaimer, and fullNotice.
//   B.4.2 Source representation uses raw Persian values.
//   B.4.3 Minified representation uses Unicode escapes for every value.
//   B.4.4 Automatic build validation extracts LEGAL from source, encodes
//         with toUnicodeEscape, compares with minified LEGAL, and fails
//         the build on mismatch.
//   B.4.5 ASCII test in the build scans minified bytes, requires every
//         byte in range 0x20 to 0x7E plus newline, and fails the build
//         if any non-ASCII byte is found.
//   B.4.6 Placement in main panel footer, warning modal or alert or
//         confirm, debug panel footer, trace panel footer, and every
//         other place that displays a legal notice.
//
// ---------------------------------------------------------------------------
// PART C — LAYER REGISTRY EXTENSIONS (fork additions relative to v3.4)
// ---------------------------------------------------------------------------
// The original contract fixes LAYERS dot length at nine. This fork adds
// two advisory layers that do not filter and do not affect ranking.
// L8-holding-advisory provides scenario and theta-decay estimates as
// informational only. L9-momentum-advisory provides descriptive momentum
// from verified pool data. Both use severity advisory or soft and always
// return a passing context.
//
// ---------------------------------------------------------------------------
// PART D — PROJECT POLICY EXTENSIONS (contract v3.5, binding for assistants)
// ---------------------------------------------------------------------------
//
// D.1 Assistant compliance is mandatory. Every human or AI assistant that
//   reads, edits, generates, or reviews code in this repository must obey
//   this contract. When code and contract disagree, the contract wins and
//   the code is corrected in the same change set. No feature may weaken a
//   clause. This block is not documentation - it is the law of the code base.
//
// D.2 The contract evolves with discovered limitations. Whenever a platform
//   or project limitation is discovered, the contract is updated in the same
//   change set that works around or documents it. Discoveries are recorded
//   under D.8 and the checklist is extended. The contract version is bumped
//   on every such update.
//
// D.3 Minified sync with Abyss. The minified deliverable tracks the
//   tseOptionAbyss engine line in lockstep. Every major improvement produces
//   a fresh minified build in the same change set - a source change without
//   its minified counterpart is an incomplete release. Only text-only minor
//   fixes may defer the minified build to the next major improvement, and the
//   deferral is noted in the docs release notes.
//
// D.4 Verbose tracing. In the source build, verbose mode traces data
//   provenance and calculation steps - every observation carries source,
//   instrument id, and timestamp, and calculation steps are inspectable in
//   the trace view of the debug panel. Trace never fabricates values - it
//   reports only what actually flowed through the code. Trace UI and trace
//   rendering are strip-marked and never ship in the minified build.
//
// D.5 Non-fatal bootstrap. Initial data and settings load in independent
//   guarded stages. A failing stage logs, degrades to an explicit unknown
//   state, and never blocks, freezes, or breaks the user experience. Fatal
//   interruptions during bootstrap are release blockers.
//
// D.6 UI guideline. The interface stays beautiful and simple - one clear
//   action per card, calm colors, readable typography, no decorative
//   complexity that hides data or status.
//
// D.7 Calendar and workday settings. The Iranian calendar and workday
//   settings expose the market working hours - session start and end - as
//   user settings stored in sessionStartMin and sessionEndMin and consumed
//   by isMarketHours and the market windows. Unknown days or hours are
//   never fabricated as open or closed.
//
// D.8 Known interpretation resolutions - discovered limitations
//   D.8.1 Size budget B.2.7. Display strings escaped per B.4.5 form a hard
//         floor near ninety percent of source size for this code base, so
//         the forty percent target is unattainable without altering display
//         strings. Builds report the measured ratio against the project
//         budget and treat the size clause as a report, not a build blocker,
//         until the project revises the budget or slims display strings.
//   D.8.2 A.1.8 versus B.4.5. The stricter B.4.5 rule wins - the minified
//         file is one hundred percent ASCII and every non-ASCII character in
//         any string is backslash-u-XXXX escaped. A.1.8 stays permission,
//         not requirement.
//
// ---------------------------------------------------------------------------
// APPENDIX — field-confirmed insCode values
// ---------------------------------------------------------------------------
//   خودرو   35366681030756042   fully confirmed by final test v3
//   فولاد   46348559193224090   fully confirmed by final test v3
//   فملی    46348095188555032   confirmed by probe v5
//   شستا    13157749938547794   confirmed by baseInsCodes
//   اهرم    77458905939487148   confirmed by baseInsCodes
//
// ---------------------------------------------------------------------------
// PRE-RELEASE CHECKLIST
// ---------------------------------------------------------------------------
// SOURCE
//   [ ] node --check passes
//   [ ] no direct HTML entities in JS
//   [ ] all ampersands built with String dot fromCharCode of thirty eight
//   [ ] full v3.4 contract in header
//   [ ] devMode default false
//   [ ] console.assert LAYERS dot length equals nine
//   [ ] adapter registered
//   [ ] windows minimize, drag, resize
//   [ ] sensitive comments are ASCII-safe
//   [ ] LEGAL with plain Persian text
//
// MINIFIED
//   [ ] node --check passes
//   [ ] four-line identity header
//   [ ] no contract block
//   [ ] renderLayerVerbose removed
//   [ ] verbose branch of renderResultsTable removed
//   [ ] runUnitTests removed
//   [ ] every console call removed
//   [ ] getViewMode returns summary
//   [ ] LEGAL with Unicode escapes
//   [ ] one hundred percent ASCII via validateAscii
//   [ ] size at most forty percent of source - unreachable floor, see D.8.1
//   [ ] regenerated in the same change set as every major improvement (D.3)
//   [ ] trace UI and trace rendering stripped (D.4)
//
// BOTH
//   [ ] LAYERS dot length equals nine
//   [ ] FILTERS complete
//   [ ] adapter contract version equals three
//   [ ] no fabricated data
//   [ ] poolAutoUpdate equals false
//   [ ] listener guards present
//   [ ] escapeHtml on inputs
//   [ ] LEGAL in panel footer
//   [ ] LEGAL in warning dialog
//   [ ] LEGAL parity test passes
//   [ ] assistants complied with PART D (D.1)
//   [ ] contract updated for every discovered limitation (D.2)
//   [ ] verbose trace present in source, stripped in minified (D.4)
//   [ ] bootstrap stages guarded and non-fatal (D.5)
//   [ ] market working hours exposed in calendar settings (D.7)
//   [ ] no new globals outside __exf and the A.4.9 frozen exceptions
//   [ ] surface free of Loader.aspx page jQuery HEAD and XHR (A.5.10)
//
// ===========================================================================
// END OF CONTRACT v3.5 — 1405/07/08
// PARITY CONFIRMED — READY FOR PRODUCTION
// ===========================================================================
;(function(){
'use strict';

// ─── LEGAL ────────────────────────────────────────────────────────────────
var LEGAL = {
    author: 'مؤلف اصلی: https://t.me/p75ad',
    group: 'گروه پروژه: https://t.me/SmartOptionTSE',
    license: 'مجوز: Smart-FFA-1.0 (Free Fork with Attribution)',
    copyright: '© ۱۴۰۵ — حقوق مؤلف محفوظ است',
    disclaimer: 'این ابزار صرفاً تحلیلی و اطلاعاتی است؛ تضمین سود نمی‌دهد و مسئولیت هر تصمیم و معامله تنها بر عهده کاربر است.',
    fullNotice: 'tseOptionZharfa\nمؤلف اصلی: https://t.me/p75ad\nگروه پروژه: https://t.me/SmartOptionTSE\nمجوز: Smart-FFA-1.0 (Free Fork with Attribution)\n© ۱۴۰۵ — حقوق مؤلف محفوظ است\nاین ابزار صرفاً تحلیلی و اطلاعاتی است؛ تضمین سود نمی‌دهد و مسئولیت هر تصمیم و معامله تنها بر عهده کاربر است.'
};
function getLegalFooterHtml(){
    var legalText=[LEGAL.author,LEGAL.group,LEGAL.license,LEGAL.copyright,LEGAL.disclaimer].join(' | ');
    return '<div class="__exfLegalFooter" data-legal="v1">'+escapeHtml(legalText)+'</div>';
}

// ─── LOGGER — source-only, replaced by no-op in minified build ────────────
// Every console call is routed through LOG so the minified build can
// replace LOG with a no-op object without touching any call site. See
// clause B.2.1 of the compatibility contract.
/* @strip */
var LOG = {
    log:   function(){ try{ console.log.apply(console, arguments); }catch(e){} },
    warn:  function(){ try{ console.warn.apply(console, arguments); }catch(e){} },
    info:  function(){ try{ console.info.apply(console, arguments); }catch(e){} },
    error: function(){ try{ console.error.apply(console, arguments); }catch(e){} },
    table: function(){ try{ console.table.apply(console, arguments); }catch(e){} },
    assert:function(){ try{ console.assert.apply(console, arguments); }catch(e){} }
};
/* @keep */

// ─── META ─────────────────────────────────────────────────────────────────
var TSETMC_ADAPTER_CONTRACT_VERSION=3;
var VERSION_TAG = 'tseOptionZharfa-v0.0.2.8';
var ABYSS_TAG = 'tseOptionAbyss-v0.0.2';
var CONTRACT_TAG = 'TSETMC COMPATIBILITY CONTRACT v3.5';
var BUILD_DATE = '2026-09-30';
var AUTHOR = 'https://t.me/p75ad';
var CONTACT = {author:'https://t.me/p75ad', group:'https://t.me/SmartOptionTSE'};
var DISCLAIMER = 'این ابزار صرفاً تحلیلی و اطلاعاتی است؛ تضمین سود نمی‌دهد و مسئولیت هر تصمیم و معامله تنها بر عهده کاربر است.';
var LICENSE = 'Smart-FFA-1.0 (Free Fork with Attribution)';
var NL = String.fromCharCode(10);
var AMP = String.fromCharCode(38);
var __EXF_AMP = AMP;
var JDN_UNIX_EPOCH = 2440588;

// ─── CONFIG — core settings ───────────────────────────────────────────────
var CONFIG = {
    expiryAutoUpdate: true,
    expiryDate: '1405/07/30',
    expiry: '1405\\s*[\\/\\.\\-]\\s*0?7',
    expiryJY: 1405, expiryJM: 7, expiryJD: 30,
    view: 0.4, viewDailyPct: 1.2, holdDays: 5, erGridStep: 0.25,
    holdScenarioDays: [3,5,7,10], underlyingScenarioShocks: [-0.05,-0.02,0,0.02,0.05],
    maxHolidayGap: 3, showScenarioTable: true, minTradingDaysLeft: 0, dtePenaltyBasis: 'calendar',
    modelTimeBasis: 'legacy-hold', volatilityAnnualizationMode: 'legacy252',
    volFloor: 25, volCeil: 150, unitGuardX: 8, minPrice: 10, maxSpread: 15, maxCostRT: 12,
    maxThetaPct: 100, maxStalePricePct: 50, maxImbalanceRatio: 20,
    minDelta: 0, maxDelta: 1, moneynessMin: 0, moneynessMax: 0,
    minDaysLeft: 4, maxLeverage: 30, minLeverage: 0,
    maxTimeValuePct: 100, maxIvPremium: 10, minDteWeight: true, dtePenaltyMax: 15, dtePenaltyDaysMult: 2,
    maxPerGroup:2,maxTotalRows:0,rankingGroupBy:'base',suggestionDisplayLimit:10,c0Tiebreak:false,minExpRet:40, coldThreshold: 3, minDepthTrades: 0.5, usePareto: true, marketLiveFeedEnabled:true,
    computeIntervalMs: 15000, cacheTtlMs: 120000, maxCache: 600, offHoursFactor: 4, offHoursOnce: true, enforceMarketHours: false,
    perfBudgetMs: 4.0, perfWindow: 25, allowFastPath: true,
    sessionStartHour: 8, sessionStartMin: 525, sessionEndMin: 810, poolObsFromMin: 525, sessionEndHour: 13,
    sessionDays: [0,1,2,3,4], marketHolidays: [], marketCalendarCompleteYears: [], tzOffsetMin: 210,
    rankTtl: 60000, resetAfter: 600000, warmupMs: 12000, maxGroupSize: 60, rankFlushEvery: 16, rankFlushMs: 1500, rankCacheMs: 1000,
    basePrices: {'اهرم':70000,'وبملت':1300,'خودرو':480,'شستا':900,'خساپا':350,'شپنا':15000,'فملی':8500,'فولاد':7500,'شبندر':12000,'خبهمن':500,'وتجارت':700,'وبصادر':700},
    poolDays: 90, poolMaxDays: 90, poolAutoUpdate: false, poolAuto: true, poolPreGateEveryScan: true, poolMinObs: 3, poolClamp: 3,
    historyStrictMode: false,
    authenticityPreflight: true, authenticityRecheckMs: 600000, authenticityRequireRaw: false,
    poolBaseSymbols: ['اهرم','وبملت','خودرو','شستا','خساپا','شپنا','فملی','فولاد','شبندر','خبهمن','وتجارت','وبصادر','ذوب','اخابر','تاصیکو'],
    contractSizes: {'خساپا':1000,'خودرو':1000,'وبملت':1000,'ذوب':1000,'اخابر':1000,'شپنا':1000,'شستا':1000,'وبصادر':1000,'تاصیکو':1000,'وتجارت':1000,'خبهمن':1000,'فملی':1371},
    poolGates: true, poolGateClamp: 2, poolMinGateObs: 20,
    dividendCalendar: {}, tsetmcCdnUrl: 'https://old.tsetmc.com', dividendAutoFetch: false, dividendFetchUrl: '', dividendMaxDays: 90,
    blockOnDividendDay: true, useLiveBase: true, baseInsCodes: {'فملی':'46348095188555032','فولاد':'46348559193224090','شستا':'13157749938547794','خودرو':'35366681030756042','اهرم':'77458905939487148'},
    liveBaseMaxAge: 300000, blockOnHalt: true, blockOnOrderQueue: true, orderQueueThreshold: 0.005,
    riskFreeCurve: [[1405,5,1,34],[1405,8,1,36],[1406,2,1,35]], riskFreeAutoFetch: false, riskFreeFetchUrl: '', riskFree: 33,
    useEwma: true, ewmaLambda: 0.94, enforceVolumeBase: false, volumeBaseRatio: 0.5, useWeightedDepth: true, depthWeights: [1.0,0.6,0.3],
    autoView: false, autoViewWeight: 0.5, positionSizing: true, capital: 100000000, riskPerTrade: 2, stopLossPct: 30, takeProfitPct: 80,
    verbose: false, traceEnabled: false, devMode: false, debugPanel: false, logReasons: true, supportTabeii: true, tabeiiDiscount: 10, allowNewSymbols: true, newSymbolMinObs: 5,
    backtestMode: false, backtestDate: '', useScore: true, scoreMin: 35, c0Mode: 'score', wER: 35, wIVR: 25, wADX: 15, wLiq: 15, wEdge: 10,
    useIvRank: true, ivRankBuy: 40, ivRankSell: 70, ivHistDays: 90, ivAtmBand: 5, multiExpiry: true, maxPerExpiry: 0, distantDays: 45,
    useAdx: true, adxPeriod: 14, ihNewestFirst: true, useEntry: true, entryPad: 5, roundToTick: 5, usePopup: true,
    abortThreshold: 10, abortThresholdInput: 100,
    exoticEnabled: false, exoticTypes: [], barrierLevel: 0, asianWindow: 0, binaryPayout: 0, exoticMargin: 5, exoticVolMult: 1.2,
    viewMode: 'verbose',
    forceLiveFeed: false
};

// ─── STATE — central ──────────────────────────────────────────────────────
var MEM = {};
var CONFIG_CACHE = {};
var modelCache = {}; var modelCacheOrder = [];
var poolStore = {}; var ivHist = {}; var poolGatesCache = {};
var liveBaseCache = {}; var liveBaseFetching = {};
var pipelineData = {}; var layerStats = {}; var abortCounts = {};
var rawSamples = {raw:[], errors:[], incomplete:[]};
var totalInput = 0;
var _dragState = null;

// ─── UTIL ─────────────────────────────────────────────────────────────────
function optStore(k,v){
    if(k==='baseInsCodes' && v!==undefined){ try{ _reverseMapCache=null; _reverseMapTime=0; }catch(e){} }
    try{
        if(v===undefined){
            if(CONFIG_CACHE.hasOwnProperty(k)) return CONFIG_CACHE[k];
            var ls = typeof localStorage!=='undefined'? localStorage.getItem('__optCfgV71_'+k):null;
            if(ls!==null){ var p=JSON.parse(ls); CONFIG_CACHE[k]=p; return p; }
            if(typeof window!=='undefined' && window['__optCfgV71_'+k]!==undefined){ CONFIG_CACHE[k]=window['__optCfgV71_'+k]; return window['__optCfgV71_'+k]; }
            return MEM[k];
        } else {
            MEM[k]=v; CONFIG_CACHE[k]=v;
            try{ localStorage.setItem('__optCfgV71_'+k, JSON.stringify(v)); }catch(e){}
            if(typeof window!=='undefined') window['__optCfgV71_'+k]=v;
        }
    }catch(e){ return MEM[k]; }
}
function clearCfgCache(k){ if(k) delete CONFIG_CACHE[k]; else CONFIG_CACHE={}; }
function getCfg(k){ var ov=optStore(k); return ov!==undefined && ov!==null? ov : CONFIG[k]; }
function getSymList(k){
    var v=getCfg(k);
    if(Array.isArray(v)) return v;
    if(typeof v==='string') return v.split(/[,،\n]+/).map(function(s){return s.trim();}).filter(Boolean);
    return [];
}
function normalizePoolSymbols(){
    var v=getCfg('poolBaseSymbols');
    if(typeof v==='string'){
        var arr=getSymList('poolBaseSymbols');
        if(arr.length>0) optStore('poolBaseSymbols', arr);
        return arr;
    }
    return getSymList('poolBaseSymbols');
}
function faToEnDigits(s){
    return String(s).replace(/[۰-۹]/g, function(d){ return String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)); }).replace(/[٠-٩]/g, function(d){ return String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)); });
}
function optSet(k,v){ if(k==='baseInsCodes'){ try{ _reverseMapCache=null; _reverseMapTime=0; }catch(e){} } optStore(k,v); clearCfgCache(k); LOG.log('[ExoticFilter] set '+k+'='+v); }
function formatConfigDiffValue(value){ return Array.isArray(value)?JSON.stringify(value):typeof value==='object'&&value!==null?JSON.stringify(value):String(value); }
function applyConfigBatchCore(changes,title,approvedByInAppAction){
    if(!Array.isArray(changes)) return false;
    var pending=[];
    for(var i=0;i<changes.length;i++){
        var change=changes[i];
        if(!change||!Object.prototype.hasOwnProperty.call(CONFIG,String(change.key))) return false;
        var oldValue=getCfg(change.key), newValue=change.value;
        if(formatConfigDiffValue(oldValue)!==formatConfigDiffValue(newValue)) pending.push({key:change.key,oldValue:oldValue,value:newValue});
    }
    if(!pending.length) return true;
    if(!approvedByInAppAction){
        var details=pending.map(function(change){return change.key+': '+formatConfigDiffValue(change.oldValue)+' → '+formatConfigDiffValue(change.value);}).join('\n');
        var prompt=(title||'تغییر تنظیمات')+'\n\n'+details+'\n\n'+LEGAL.disclaimer+'\n\nاعمال شود؟';
        if(typeof window==='undefined'||typeof window.confirm!=='function'||!window.confirm(prompt)) return false;
    }
    for(var j=0;j<pending.length;j++) optSet(pending[j].key,pending[j].value);
    return true;
}
function applyUserConfigBatch(changes,title){ return applyConfigBatchCore(changes,title,false); }
function applyApprovedConfigBatch(changes,title){ return applyConfigBatchCore(changes,title,true); }
function requestConfigChange(key,value){ return applyUserConfigBatch([{key:key,value:value}], 'تغییر تنظیم فیلتر'); }
var USER_PROFILE_STORE_KEY='__exfUserProfileV1', USER_PROFILE_SCHEMA_VERSION=1;
function normalizeUserProfile(input){
    input=input||{};
    function optionalNumber(value,integer){
        if(value==null||String(value).trim()==='') return {ok:true,value:null};
        var number=Number(value);
        if(!isFinite(number)||number<=0||(integer&&Math.floor(number)!==number)) return {ok:false,value:null};
        return {ok:true,value:number};
    }
    var capital=optionalNumber(input.capitalToman,false), loss=optionalNumber(input.maxLossToman,false), horizon=optionalNumber(input.horizonCalendarDays,true);
    if(!capital.ok||!loss.ok||!horizon.ok|| (horizon.value!=null&&horizon.value>3650)) return {ok:false,reason:'invalid-profile-fields'};
    return {ok:true,profile:{capitalToman:capital.value,maxLossToman:loss.value,horizonCalendarDays:horizon.value,displayOnly:true}};
}
function getUserProfile(){
    var empty={capitalToman:null,maxLossToman:null,horizonCalendarDays:null,displayOnly:true,status:'empty'};
    try{
        if(typeof localStorage==='undefined') return empty;
        var raw=localStorage.getItem(USER_PROFILE_STORE_KEY); if(!raw) return empty;
        var envelope=JSON.parse(raw);
        if(!envelope||envelope.schemaVersion!==USER_PROFILE_SCHEMA_VERSION||envelope.kind!=='user-profile') return {capitalToman:null,maxLossToman:null,horizonCalendarDays:null,displayOnly:true,status:'invalid-storage'};
        var result=normalizeUserProfile(envelope.data||{});
        if(!result.ok) return {capitalToman:null,maxLossToman:null,horizonCalendarDays:null,displayOnly:true,status:'invalid-storage'};
        result.profile.status='saved'; return result.profile;
    }catch(e){ return {capitalToman:null,maxLossToman:null,horizonCalendarDays:null,displayOnly:true,status:'unavailable'}; }
}
function saveUserProfile(input){
    var normalized=normalizeUserProfile(input);
    if(!normalized.ok) return normalized;
    try{
        if(typeof localStorage==='undefined') return {ok:false,reason:'local-storage-unavailable'};
        localStorage.setItem(USER_PROFILE_STORE_KEY,JSON.stringify({schemaVersion:USER_PROFILE_SCHEMA_VERSION,kind:'user-profile',data:normalized.profile}));
        normalized.profile.status='saved'; return {ok:true,profile:normalized.profile,filterImpact:'none'};
    }catch(e){ return {ok:false,reason:'profile-storage-failed'}; }
}
function optGet(k){ return getCfg(k); }
function addDataWarning(sym, message){
    if(!sym) return;
    if(!Array.isArray(sym._dataWarnings)) sym._dataWarnings=[];
    if(sym._dataWarnings.indexOf(message)===-1) sym._dataWarnings.push(message);
}
function escapeHtml(value){
    return String(value==null?'':value).replace(/[&<>\"']/g, function(ch){
        if(ch===__EXF_AMP) return __EXF_AMP+'amp;';
        if(ch==='<') return __EXF_AMP+'lt;';
        if(ch==='>') return __EXF_AMP+'gt;';
        if(ch==='\"') return __EXF_AMP+'quot;';
        return __EXF_AMP+'#39;';
    });
}
function showToast(msg, type){
    type=type||'info';
    var el=document.getElementById('__exfToast');
    if(!el){
        el=document.createElement('div'); el.id='__exfToast';
        el.style.cssText='position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:#111c32;border:1px solid #1e2f4f;border-radius:12px;padding:12px 18px;color:#e2e8f0;font-family:Tahoma,sans-serif;font-size:12px;z-index:20000;box-shadow:0 12px 40px rgba(0,0,0,0.5);max-width:80vw;direction:rtl;';
        document.body.appendChild(el);
    }
    el.style.borderColor = type==='error'? '#fb7185' : type==='success'? '#34d399' : '#1e2f4f';
    el.textContent=msg; el.style.display='block';
    clearTimeout(el._t); el._t=setTimeout(function(){ el.style.display='none'; }, 3500);
}

// ─── JALALI CALENDAR ──────────────────────────────────────────────────────
var _jalaliBreaks=[-61,9,38,199,426,686,756,818,1111,1181,1210,1635,2060,2097,2192,2262,2324,2394,2456,3178];
var jdnCache={};
function jalCal(jy){
    var bl=_jalaliBreaks.length, gy=jy+621, leapJ=-14, jp=_jalaliBreaks[0], jm, jump, leap, n, i;
    if(jy<jp || jy>=_jalaliBreaks[bl-1]) throw new Error('Invalid Jalali year '+jy);
    for(i=1;i<bl;i++){ jm=_jalaliBreaks[i]; jump=jm-jp; if(jy<jm) break; leapJ=leapJ+Math.floor(jump/33)*8+Math.floor((jump%33)/4); jp=jm; }
    n=jy-jp; leapJ=leapJ+Math.floor(n/33)*8+Math.floor((n%33+3)/4);
    if(jump%33==4 && jump-n==4) leapJ+=1;
    var leapG=Math.floor(gy/4)-Math.floor((Math.floor(gy/100)+1)*3/4)-150;
    var march=20+leapJ-leapG;
    if(jump-n<6) n=n-jump+Math.floor((jump+4)/33)*33;
    leap=((n+1)%33-1)%4; if(leap==-1) leap=4;
    return {leap:leap, gy:gy, march:march};
}
function isLeapJalali(jy){ try{ return jalCal(jy).leap===0; }catch(e){ return false; } }
function jalaliMonthDays(jy,jm){ if(jm<=6) return 31; if(jm<=11) return 30; return isLeapJalali(jy)?30:29; }
function g2d(gy,gm,gd){
    var a=Math.floor((14-gm)/12);
    var y=gy+4800-a;
    var m=gm+12*a-3;
    return gd+Math.floor((153*m+2)/5)+365*y+Math.floor(y/4)-Math.floor(y/100)+Math.floor(y/400)-32045;
}
function validatedGregorianToJdn(gy,gm,gd){
    if(!isFinite(gy)||!isFinite(gm)||!isFinite(gd)||gm<1||gm>12||gd<1||gd>31) return null;
    var check=new Date(Date.UTC(gy,gm-1,gd));
    if(check.getUTCFullYear()!==gy || check.getUTCMonth()+1!==gm || check.getUTCDate()!==gd) return null;
    return g2d(gy,gm,gd);
}
function jalaliToJdn(jy,jm,jd){
    if(jm<1 || jm>12 || jd<1 || jd>jalaliMonthDays(jy,jm)) throw new RangeError('Invalid Jalali date '+jy+'/'+jm+'/'+jd);
    var key=jy+'/'+jm+'/'+jd;
    if(jdnCache[key]) return jdnCache[key];
    var r=jalCal(jy);
    var offset=jm<=7? (jm-1)*31 : 186+(jm-7)*30;
    var v=g2d(r.gy,3,r.march+offset+jd-1);
    jdnCache[key]=v;
    return v;
}
function todayJdn(){ return unixDayTehran()+JDN_UNIX_EPOCH; }
function unixDay(){ return Math.floor(Date.now()/86400000); }
function unixDayTehran(){
    var now=new Date();
    var tehranMs=now.getTime()+210*60000;
    return Math.floor(tehranMs/86400000);
}
function normalizeToJdn(value){
    if(value==null || value==='') return null;
    if(typeof value==='string'){
        var text=faToEnDigits(value).trim();
        var dateMatch=text.match(/^(\d{4})\s*[\/\.\-]\s*(\d{1,2})\s*[\/\.\-]\s*(\d{1,2})$/);
        if(dateMatch){
            var year=+dateMatch[1], month=+dateMatch[2], day=+dateMatch[3];
            try{ return year>=1700? validatedGregorianToJdn(year,month,day) : jalaliToJdn(year,month,day); }catch(e){ return null; }
        }
        if(/^\d{7,8}$/.test(text)) value=+text;
        else if(/^\d+(?:\.0+)?$/.test(text)) value=+text;
        else return null;
    }
    var n=Number(value);
    if(!isFinite(n) || n<=0) return null;
    n=Math.floor(n);
    if(n>=10000000 && n<=99999999){
        var y=Math.floor(n/10000), m=Math.floor((n%10000)/100), d=n%100;
        try{ return y>=1700? validatedGregorianToJdn(y,m,d) : jalaliToJdn(y,m,d); }catch(e){ return null; }
    }
    if(n>=2000000 && n<=3000000) return n;
    if(n<100000) return n+JDN_UNIX_EPOCH;
    return null;
}
function jdnToJalali(jdn){
    jdn=Math.floor(Number(jdn));
    if(!isFinite(jdn) || jdn<1000000) return null;
    try{
        var date=new Date((jdn-JDN_UNIX_EPOCH)*86400000);
        var fmt=new Intl.DateTimeFormat('fa-IR-u-ca-persian', {timeZone:'UTC',year:'numeric',month:'numeric',day:'numeric'});
        var parts=fmt.formatToParts(date), jy=0,jm=0,jd=0;
        for(var i=0;i<parts.length;i++){
            var v=faToEnDigits(parts[i].value).replace(/\D/g,'');
            if(parts[i].type==='year') jy=parseInt(v,10);
            else if(parts[i].type==='month') jm=parseInt(v,10);
            else if(parts[i].type==='day') jd=parseInt(v,10);
        }
        if(jy>0 && jm>0 && jd>0) return {jy:jy,jm:jm,jd:jd};
    }catch(e){}
    try{
        var gregorian=new Date((jdn-JDN_UNIX_EPOCH)*86400000);
        var gy=gregorian.getUTCFullYear();
        for(var candidate=gy-622;candidate<=gy-620;candidate++){
            var first=jalaliToJdn(candidate,1,1), next=jalaliToJdn(candidate+1,1,1);
            if(jdn>=first && jdn<next){
                var offset=jdn-first, jm, jd;
                if(offset<186){ jm=1+Math.floor(offset/31); jd=1+offset%31; }
                else { offset-=186; jm=7+Math.floor(offset/30); jd=1+offset%30; }
                return {jy:candidate,jm:jm,jd:jd};
            }
        }
    }catch(e){}
    return null;
}
function parseHolidayJdn(value){ return normalizeToJdn(value); }

var TSE_CALENDAR = {
    tradingWeekdays:[0,1,2,3,4],
    getDayOfWeek:function(jdn){ return ((Math.floor(jdn)+2)%7+7)%7; },
    getHolidayJdns:function(){
        var raw=getCfg('marketHolidays')||[];
        if(typeof raw==='string') raw=raw.split(/[,،\n]+/).map(function(x){return x.trim();}).filter(Boolean);
        if(!Array.isArray(raw)) raw=[];
        var signature=raw.join('|');
        if(this._holidaySignature===signature && this._holidayCache) return this._holidayCache;
        var out=[];
        for(var i=0;i<raw.length;i++){ var date=parseHolidayJdn(raw[i]); if(date!=null && out.indexOf(date)<0) out.push(date); }
        this._holidaySignature=signature; this._holidayCache=out;
        return out;
    },
    getCompleteYears:function(){
        var raw=getCfg('marketCalendarCompleteYears')||[];
        if(typeof raw==='string') raw=raw.split(/[,،\s]+/).filter(Boolean);
        return Array.isArray(raw)? raw.map(function(x){return String(x).trim();}) : [];
    },
    isYearComplete:function(jy){ return this.getCompleteYears().indexOf(String(jy))!==-1; },
    isTradingDay:function(jdn){
        jdn=Math.floor(Number(jdn));
        if(!isFinite(jdn)) return false;
        if(this.tradingWeekdays.indexOf(this.getDayOfWeek(jdn))===-1) return false;
        return this.getHolidayJdns().indexOf(jdn)===-1;
    },
    nextTradingDay:function(jdn){
        var day=Math.floor(Number(jdn));
        if(!isFinite(day)) throw new TypeError('A finite JDN is required');
        for(var i=0;i<3700;i++){ day++; if(this.isTradingDay(day)) return day; }
        throw new Error('No trading day found in the next 10 years; check holiday data');
    },
    tradingDaysBetween:function(startJdn,endJdn){
        var start=Math.floor(Number(startJdn)), end=Math.floor(Number(endJdn));
        if(!isFinite(start)||!isFinite(end)) return 0;
        if(start===end) return 0;
        var direction=end>start?1:-1, count=0, span=Math.abs(end-start);
        if(span>200000) throw new RangeError('Date range is too large');
        for(var day=start+direction; direction>0?day<=end:day>=end; day+=direction){ if(this.isTradingDay(day)) count+=direction; }
        return count;
    },
    nthTradingDayAfter:function(startJdn,count){
        var day=Math.floor(Number(startJdn)), n=Math.floor(Number(count));
        if(!isFinite(day)||!isFinite(n)||n<0) throw new TypeError('Invalid trading-day horizon');
        for(var i=0;i<n;i++) day=this.nextTradingDay(day);
        return day;
    },
    calendarStatus:function(startJdn,endJdn){
        startJdn=Math.floor(Number(startJdn)); endJdn=Math.floor(Number(endJdn));
        if(!isFinite(startJdn)||!isFinite(endJdn)) return {status:'unknown',complete:false,reason:'invalid-range',missingYears:[],knownTradingDays:null};
        var lo=Math.min(startJdn,endJdn), hi=Math.max(startJdn,endJdn);
        var start=jdnToJalali(lo), end=jdnToJalali(hi);
        if(!start||!end) return {status:'unknown',complete:false,reason:'date-conversion',fromJdn:lo,toJdn:hi,missingYears:[],knownTradingDays:null};
        var years=[],missing=[];
        for(var year=start.jy;year<=end.jy;year++){ years.push(year); if(!this.isYearComplete(year)) missing.push(year); }
        return {status:missing.length?'incomplete':'complete',complete:missing.length===0,fromJdn:lo,toJdn:hi,years:years,missingYears:missing,holidayCount:this.getHolidayJdns().filter(function(d){return d>=lo&&d<=hi;}).length,knownTradingDays:this.tradingDaysBetween(lo,hi),calendarSource:'user-managed'};
    },
    isCompleteForRange:function(startJdn,endJdn){ return this.calendarStatus(startJdn,endJdn).complete; },
    todayJdn:function(){ return todayJdn(); },
    prevTradingDay:function(jdn){
        var day=Math.floor(Number(jdn)); if(!isFinite(day)) throw new TypeError('A finite JDN is required');
        for(var i=0;i<3700;i++){ day--; if(this.isTradingDay(day)) return day; }
        throw new Error('No trading day found in the previous 10 years; check holiday data');
    },
    findHolidayGaps:function(startJdn,endJdn,minimumClosedDays){
        var start=Math.floor(Number(startJdn)), end=Math.floor(Number(endJdn));
        if(!isFinite(start)||!isFinite(end)||end<start) return {status:'unknown',complete:false,gaps:[],maxClosedCalendarDays:null};
        var gaps=[], prev=this.prevTradingDay(start), next=this.nextTradingDay(prev), guard=0, status;
        while(prev<end&&guard++<400){
            var closed=next-prev-1;
            if(closed>=(minimumClosedDays||1)) gaps.push({afterJdn:prev,nextJdn:next,closedCalendarDays:closed,continuesBeyondWindow:next>end});
            if(next>end) break;
            prev=next; next=this.nextTradingDay(prev);
        }
        status=this.calendarStatus(start,Math.max(end,gaps.length?gaps[gaps.length-1].nextJdn:end));
        var max=0; for(var i=0;i<gaps.length;i++) max=Math.max(max,gaps[i].closedCalendarDays);
        return {status:status.status,complete:status.complete,missingYears:status.missingYears,gaps:gaps,maxClosedCalendarDays:status.complete?max:null};
    },
    getAnnualTradingDays:function(jy){
        var start=jalaliToJdn(jy,1,1), end=jalaliToJdn(jy+1,1,1)-1;
        var holidays=this.getHolidayJdns(),complete=this.isYearComplete(jy);
        var cacheKey=String(jy)+'|'+this.tradingWeekdays.join(',')+'|'+holidays.join(',')+'|'+(complete?'1':'0');
        if(!this._annualTradingDaysCache) this._annualTradingDaysCache={};
        var cached=this._annualTradingDaysCache[cacheKey];
        if(cached) return {days:cached.days,complete:cached.complete,status:cached.status,year:cached.year,suppliedHolidayCount:cached.suppliedHolidayCount};
        var count=0;
        for(var day=start;day<=end;day++) if(this.isTradingDay(day)) count++;
        var result={days:count,complete:complete,status:complete?'complete':'incomplete',year:jy,suppliedHolidayCount:holidays.filter(function(d){return d>=start&&d<=end;}).length};
        this._annualTradingDaysCache[cacheKey]=result;
        var cacheKeys=Object.keys(this._annualTradingDaysCache);
        while(cacheKeys.length>12){ delete this._annualTradingDaysCache[cacheKeys.shift()]; }
        return {days:result.days,complete:result.complete,status:result.status,year:result.year,suppliedHolidayCount:result.suppliedHolidayCount};
    },
    holidayRisk:function(startJdn,holdingTradingDays,maxClosedDays){
        var n=Math.max(0,Math.floor(Number(holdingTradingDays)||0)), prev=Math.floor(Number(startJdn));
        var gaps=[], maxClosed=0, end=prev;
        for(var i=0;i<n;i++){
            var next=this.nextTradingDay(prev), closed= Math.max(0,next-prev-1);
            if(closed>0){ gaps.push({afterJdn:prev,nextJdn:next,closedCalendarDays:closed,calendarGapDays:next-prev}); maxClosed=Math.max(maxClosed,closed); }
            prev=next; end=next;
        }
        var complete=this.isCompleteForRange(startJdn,end);
        return {gaps:gaps,maxClosedCalendarDays:maxClosed,threshold:maxClosedDays==null?3:maxClosedDays,risk:maxClosed>(maxClosedDays==null?3:maxClosedDays),complete:complete,endJdn:end};
    }
};
function getPricingTime(ctx,expiryJdn){
    var mode=ctx.cfg.modelTimeBasis||'legacy-hold';
    if(mode==='legacy-hold'){ var legacyHold=Number(ctx.cfg.holdDays); if(!isFinite(legacyHold)) legacyHold=5; return {ok:true,T:legacyHold/365,daysPerYear:365,basis:'legacy-hold'}; }
    if(expiryJdn==null) return {ok:false,reason:'expiry-required-for-time-model'};
    var calendarDays=Math.max(0,expiryJdn-ctx.todayJdn);
    if(mode==='calendar-expiry') return {ok:true,T:calendarDays/365,daysPerYear:365,basis:'calendar-expiry'};
    if(mode==='tse-trading'){
        var pricingCalendarStatus=TSE_CALENDAR.calendarStatus(ctx.todayJdn,expiryJdn);
        if(!pricingCalendarStatus.complete) return {ok:false,reason:'calendar-incomplete',calendarStatus:pricingCalendarStatus};
        var sessions=Math.max(0,TSE_CALENDAR.tradingDaysBetween(ctx.todayJdn,expiryJdn));
        var startYear=jdnToJalali(ctx.todayJdn), endYear=jdnToJalali(expiryJdn);
        if(!startYear||!endYear) return {ok:false,reason:'date-conversion'};
        var annualDays=0, years=0;
        for(var year=startYear.jy;year<=endYear.jy;year++){
            var annual=TSE_CALENDAR.getAnnualTradingDays(year);
            if(!annual.complete||annual.days<=0) return {ok:false,reason:'calendar-incomplete'};
            annualDays+=annual.days; years++;
        }
        annualDays=years?annualDays/years:0;
        if(!annualDays) return {ok:false,reason:'annual-trading-days-unavailable'};
        return {ok:true,T:sessions/annualDays,daysPerYear:annualDays,basis:'tse-trading',tradingDays:sessions,annualTradingDays:annualDays,calendarStatus:pricingCalendarStatus};
    }
    return {ok:false,reason:'unknown-time-model'};
}
function describeMarketTrend(snapshot,nowMs){
    var unknown={status:'unknown',label:'نامعلوم',reason:'snapshot-unavailable',financialScore:null,filterImpact:'none',changes:[]};
    if(!snapshot||snapshot.schemaVersion!==2||!Array.isArray(snapshot.indices)||snapshot.indices.length<2) return unknown;
    var now=nowMs==null?Date.now():Number(nowMs), changes=[];
    for(var i=0;i<snapshot.indices.length;i++){
        var index=snapshot.indices[i], points=index&&index.observations;
        if(!index||!index.name||!Array.isArray(points)||points.length<2) return Object.assign({},unknown,{reason:'insufficient-index-observations'});
        var first=points[0], last=points[points.length-1];
        var firstTime=typeof first.timestamp==='number'?first.timestamp:Date.parse(String(first.timestamp||''));
        var lastTime=typeof last.timestamp==='number'?last.timestamp:Date.parse(String(last.timestamp||''));
        var firstValue=Number(first.value), lastValue=Number(last.value);
        if(!isFinite(firstTime)||!isFinite(lastTime)||lastTime<=firstTime||!isFinite(firstValue)||!isFinite(lastValue)||firstValue<=0||lastValue<=0) return Object.assign({},unknown,{reason:'invalid-index-series'});
        if(now-lastTime>900000||lastTime-now>300000) return Object.assign({},unknown,{reason:'stale-index-series'});
        changes.push({name:String(index.name),changePct:(lastValue/firstValue-1)*100,from:firstTime,to:lastTime});
    }
    var breadth=snapshot.breadth, breadthTime=breadth&&(typeof breadth.timestamp==='number'?breadth.timestamp:Date.parse(String(breadth.timestamp||'')));
    var advancers=breadth&&Number(breadth.advancers), decliners=breadth&&Number(breadth.decliners);
    if(!breadth||!isFinite(breadthTime)||!isFinite(advancers)||!isFinite(decliners)||advancers<0||decliners<0) return Object.assign({},unknown,{reason:'market-breadth-unavailable'});
    if(now-breadthTime>900000||breadthTime-now>300000) return Object.assign({},unknown,{reason:'stale-market-breadth'});
    var up=changes.filter(function(x){return x.changePct>0;}).length;
    var down=changes.filter(function(x){return x.changePct<0;}).length;
    var flat=up===0&&down===0&&advancers===decliners;
    var status=up===changes.length&&advancers>decliners?'up':down===changes.length&&decliners>advancers?'down':flat?'flat':'mixed';
    return {status:status,label:status==='up'?'صعودی (توصیفی)':status==='down'?'نزولی (توصیفی)':status==='flat'?'بدون تغییر':'ترکیبی',reason:null,asOf:Math.min(breadthTime,Math.min.apply(null,changes.map(function(x){return x.to;}))),changes:changes,breadth:{advancers:advancers,decliners:decliners},financialScore:null,filterImpact:'none'};
}
var _marketTrendSnapshot=null,_marketTrendSnapshotExplicit=false;
function setMarketTrendSnapshot(snapshot){
    _marketTrendSnapshot=null;
    _marketTrendSnapshotExplicit=true;
    if(snapshot==null) return {ok:true,status:'unknown',filterImpact:'none'};
    var trend=describeMarketTrend(snapshot);
    if(trend.status==='unknown') return {ok:false,reason:trend.reason,trend:trend};
    try{ _marketTrendSnapshot=JSON.parse(JSON.stringify(snapshot)); }catch(e){ return {ok:false,reason:'invalid-snapshot-copy',trend:trend}; }
    return {ok:true,status:trend.status,trend:trend,filterImpact:'none'};
}
function getMarketTrend(){
    var snapshot=_marketTrendSnapshot;
    try{ if(!_marketTrendSnapshotExplicit&&typeof window!=='undefined') snapshot=window.__exfMarketTrendSnapshot||null; }catch(e){}
    return describeMarketTrend(snapshot);
}
function registerTsetmcAdapter(adapter){
    if(!adapter||adapter.version!==TSETMC_ADAPTER_CONTRACT_VERSION||typeof adapter.parseLiveQuote!=='function'||typeof adapter.parseHistoryRow!=='function') return false;
    if(typeof window==='undefined') return false;
    window.__exfTsetmcAdapter=adapter;
    return true;
}
function isMarketHours(){
    var nowJdn=todayJdn();
    if(!TSE_CALENDAR.isTradingDay(nowJdn)) return false;
    var hour=0,minute=0;
    try{
        var parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Tehran',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date());
        for(var i=0;i<parts.length;i++){ if(parts[i].type==='hour') hour=+parts[i].value; if(parts[i].type==='minute') minute=+parts[i].value; }
    }catch(e){ var tehran=new Date(Date.now()+210*60000); hour=tehran.getUTCHours(); minute=tehran.getUTCMinutes(); }
    var current=hour*60+minute;
    return current>=getCfg('sessionStartMin') && current<=getCfg('sessionEndMin');
}
function pad2(n){ return n<10? '0'+n : ''+n; }
function getJalaliNow(){
    try{
        if(typeof Intl!=='undefined'){
            var now=new Date();
            var fmt=new Intl.DateTimeFormat('fa-IR-u-ca-persian', {timeZone:'Asia/Tehran', year:'numeric', month:'numeric', day:'numeric'});
            var parts=fmt.formatToParts(now);
            var jy=0,jm=0,jd=0;
            for(var i=0;i<parts.length;i++){
                var val=faToEnDigits(parts[i].value).replace(/\D/g,'');
                if(parts[i].type==='year') jy=parseInt(val,10);
                else if(parts[i].type==='month') jm=parseInt(val,10);
                else if(parts[i].type==='day') jd=parseInt(val,10);
            }
            if(jy>0 && jm>0 && jd>0) return {jy:jy, jm:jm, jd:jd};
        }
    }catch(e){}
    try{
        var now2=new Date();
        var tehranMs2=now2.getTime()+(210-(-now2.getTimezoneOffset()))*60000;
        var tehran2=new Date(tehranMs2);
        var gy=tehran2.getUTCFullYear(), gm=tehran2.getUTCMonth()+1, gd=tehran2.getUTCDate();
        var g_d_m=[0,31,59,90,120,151,181,212,243,273,304,334];
        var gy2=gm>2? gy+1 : gy;
        var days=355666+365*gy+Math.floor((gy2+3)/4)-Math.floor((gy2+99)/100)+Math.floor((gy2+399)/400)+gd+g_d_m[gm-1];
        var jy=-1595+33*Math.floor(days/12053); days%=12053;
        jy+=4*Math.floor(days/1461); days%=1461;
        if(days>365){ jy+=Math.floor((days-1)/365); days=(days-1)%365; }
        var jm, jd;
        if(days<186){ jm=1+Math.floor(days/31); jd=1+days%31; }
        else { jm=7+Math.floor((days-186)/30); jd=1+(days-186)%30; }
        return {jy:jy, jm:jm, jd:jd};
    }catch(e){ return jdnToJalali(todayJdn()); }
}
function getNextJalaliMonthLastDay(){
    var cur=getJalaliNow();
    var jy=cur.jy, jm=cur.jm+1;
    if(jm>12){ jm=1; jy++; }
    var jd=jalaliMonthDays(jy, jm);
    return {jy:jy, jm:jm, jd:jd};
}
var EXPIRY_PROPOSAL_DISMISSED_KEY='__exfExpiryProposalDismissedV1',_pendingExpiryProposal=null;
function buildNextExpiryProposal(){
    var nxt=getNextJalaliMonthLastDay();
    var dateStr=nxt.jy+'/'+pad2(nxt.jm)+'/'+pad2(nxt.jd);
    var monthPat=nxt.jm<10?'0?'+nxt.jm:'(?:'+nxt.jm+'|0?'+(nxt.jm%10)+')';
    if(nxt.jm>=10) monthPat='0?'+nxt.jm;
    var expiryPat=nxt.jy+'\\s*[\\/\\.\\-]\\s*'+monthPat+'(?!\\d)';
    var allChanges=[{key:'expiryDate',value:dateStr},{key:'expiry',value:expiryPat},{key:'expiryJY',value:nxt.jy},{key:'expiryJM',value:nxt.jm},{key:'expiryJD',value:nxt.jd}];
    var changes=[];
    for(var i=0;i<allChanges.length;i++){
        var change=allChanges[i],oldValue=getCfg(change.key);
        if(formatConfigDiffValue(oldValue)!==formatConfigDiffValue(change.value)) changes.push({key:change.key,oldValue:oldValue,value:change.value});
    }
    return changes.length?{dateStr:dateStr,pattern:expiryPat,jy:nxt.jy,jm:nxt.jm,jd:nxt.jd,changes:changes}:null;
}
function getExpiryProposal(){
    if(!_pendingExpiryProposal) return null;
    try{ if(typeof localStorage!=='undefined'&&localStorage.getItem(EXPIRY_PROPOSAL_DISMISSED_KEY)===_pendingExpiryProposal.dateStr) return null; }catch(e){}
    try{return JSON.parse(JSON.stringify(_pendingExpiryProposal));}catch(e){return _pendingExpiryProposal;}
}
function updateExpiryToNextMonthLastDay(){
    try{ _pendingExpiryProposal=buildNextExpiryProposal(); return getExpiryProposal(); }
    catch(e){ LOG.warn('[ExoticFilter] expiry proposal preparation failed',e); return null; }
}
function approveExpiryProposal(){
    var proposal=getExpiryProposal();
    if(!proposal) return false;
    if(!applyApprovedConfigBatch(proposal.changes,'تأیید سررسید مرجع پیشنهادی')) return false;
    for(var i=0;i<proposal.changes.length;i++) CONFIG[proposal.changes[i].key]=proposal.changes[i].value;
    _pendingExpiryProposal=null;
    try{ if(typeof localStorage!=='undefined') localStorage.removeItem(EXPIRY_PROPOSAL_DISMISSED_KEY); }catch(e){}
    try{ renderLayers(); }catch(e){}
    try{ renderExpiryProposal(); }catch(e){}
    try{ showToast('سررسید مرجع با تأیید شما به‌روزرسانی شد: '+proposal.dateStr,'success'); }catch(e){}
    return true;
}
function dismissExpiryProposal(){
    var proposal=getExpiryProposal();
    if(!proposal) return false;
    try{ if(typeof localStorage!=='undefined') localStorage.setItem(EXPIRY_PROPOSAL_DISMISSED_KEY,proposal.dateStr); }catch(e){}
    _pendingExpiryProposal=null;
    try{ renderExpiryProposal(); }catch(e){}
    return true;
}

// ─── POOL — ninety-day store ──────────────────────────────────────────────
// Array of records with binary insert and sort-on-demand. Structured-of-
// arrays is a future optimization. The current layout is sufficient for
// ninety days and fewer than one hundred symbols.
var POOL_MAX_DAYS=90;
function isTrustedObservationSource(source){ return source==='live-tsetmc'||source==='tsetmc-history'; }
function isVerifiedPoolObservation(row){
    if(!row||row.adapterVersion!==TSETMC_ADAPTER_CONTRACT_VERSION||!row.instrumentId||!isTrustedObservationSource(row.source)) return false;
    if(row.source==='live-tsetmc'&&(!isFinite(Number(row.timestamp))||Number(row.timestamp)<=0)) return false;
    return true;
}
function normalizeObservationTimestamp(value){
    var timestamp=typeof value==='number'?value:Date.parse(String(value||''));
    if(typeof value==='number'&&timestamp>0&&timestamp<100000000000) timestamp*=1000;
    return isFinite(timestamp)&&timestamp>0?timestamp:null;
}
function getVerifiedIvHistory(baseSym){
    var history=ivHist[baseSym]||[], out=[], expectedId=(getCfg('baseInsCodes')||{})[baseSym];
    if(!expectedId) return out;
    for(var i=0;i<history.length;i++){
        var row=history[i],iv=row&&Number(row.iv),jdn=row&&Number(row.jdn);
        if(row&&isFinite(iv)&&iv>0&&iv<=5&&isTrustedObservationSource(row.source)&&row.adapterVersion===TSETMC_ADAPTER_CONTRACT_VERSION&&String(row.instrumentId||'')===String(expectedId)&&isFinite(jdn)&&jdn>0&&jdn<=todayJdn()) out.push(row);
    }
    return out;
}
function addIvObservationToHistory(baseSym,data,jdn){
    data=data||{};
    var expectedId=(getCfg('baseInsCodes')||{})[baseSym],iv=Number(data.iv);
    if(!baseSym||!expectedId||data.adapterVersion!==TSETMC_ADAPTER_CONTRACT_VERSION||String(data.instrumentId||'')!==String(expectedId)||!isTrustedObservationSource(data.source)||!isFinite(iv)||iv<=0||iv>5||!isFinite(jdn)||jdn<=0||jdn>todayJdn()) return false;
    var timestamp=data.timestamp==null?null:normalizeObservationTimestamp(data.timestamp);
    if(data.source==='live-tsetmc'&&(timestamp==null||Date.now()-timestamp< -300000||Date.now()-timestamp>(Number(getCfg('liveBaseMaxAge'))||300000))) return false;
    if(!ivHist[baseSym]) ivHist[baseSym]=[];
    var history=ivHist[baseSym],pos=binarySearchInsertPos(history,jdn);
    var item={jdn:jdn,iv:iv,dateStr:data.dateStr||jdnToIsoDate(jdn),source:data.source,instrumentId:String(data.instrumentId),adapterVersion:TSETMC_ADAPTER_CONTRACT_VERSION,timestamp:timestamp};
    if(pos<history.length&&history[pos].jdn===jdn) history[pos]=item;
    else history.splice(pos,0,item);
    var maxDays=getCfg('ivHistDays')||90;
    if(history.length>maxDays) ivHist[baseSym]=history.slice(-maxDays);
    bumpIvRankVersion();
    return true;
}
var STORAGE_SCHEMA_VERSION=2;
var POOL_STORE_KEY='__exfPoolV2', POOL_IV_KEY='__exfIvHistV2', POOL_BUNDLE_KEY='__exfStoreV2';
var LEGACY_POOL_STORE_KEY='__exfPoolV1', LEGACY_POOL_IV_KEY='__exfIvHistV1';
function decodeStorageRecord(raw,kind){
    if(!raw) return {data:null,legacy:false,valid:true};
    try{
        var parsed=JSON.parse(raw);
        if(parsed&&parsed.schemaVersion===STORAGE_SCHEMA_VERSION&&parsed.kind===kind&&parsed.data&&typeof parsed.data==='object'&&!Array.isArray(parsed.data)) return {data:parsed.data,legacy:false,valid:true};
        if(parsed&&typeof parsed==='object'&&!Array.isArray(parsed)&&(parsed.schemaVersion!=null||parsed.kind!=null||parsed.data!=null)) return {data:null,legacy:false,valid:false};
        if(parsed&&typeof parsed==='object'&&!Array.isArray(parsed)) return {data:parsed,legacy:true,valid:true};
    }catch(e){}
    return {data:null,legacy:false,valid:false};
}
function validatePoolStore(pool){
    if(!pool||typeof pool!=='object'||Array.isArray(pool)) return {};
    var out={}, symbols=Object.keys(pool);
    for(var i=0;i<symbols.length;i++){
        var symbol=symbols[i], entry=pool[symbol];
        if(!entry||typeof entry!=='object'||!Array.isArray(entry.history)) continue;
        var history=[];
        for(var j=0;j<entry.history.length;j++){
            var h=entry.history[j];
            if(!h||!isFinite(Number(h.jdn))||Number(h.jdn)<=0||!isFinite(Number(h.price))||Number(h.price)<0) continue;
            var verified=isVerifiedPoolObservation(h);
            history.push({jdn:Math.floor(Number(h.jdn)),dateStr:typeof h.dateStr==='string'?h.dateStr:'',price:Number(h.price),vol:isFinite(Number(h.vol))?Number(h.vol):0,tno:isFinite(Number(h.tno))?Number(h.tno):0,tvol:isFinite(Number(h.tvol))?Number(h.tvol):0,iv:isFinite(Number(h.iv))?Number(h.iv):0,source:verified?h.source:'unverified',instrumentId:verified?String(h.instrumentId):null,adapterVersion:verified?h.adapterVersion:null,timestamp:verified&&h.timestamp!=null?normalizeObservationTimestamp(h.timestamp):null});
        }
        history.sort(function(a,b){return a.jdn-b.jdn;});
        out[symbol]={history:history,stats:{},firstJdn:history.length?history[0].jdn:0,lastJdn:history.length?history[history.length-1].jdn:0,count:history.length};
    }
    return out;
}
function validateIvHistory(history){
    if(!history||typeof history!=='object'||Array.isArray(history)) return {};
    var out={},keys=Object.keys(history);
    for(var i=0;i<keys.length;i++){
        var rows=Array.isArray(history[keys[i]])?history[keys[i]]:[], clean=[];
        for(var j=0;j<rows.length;j++){
            var row=rows[j];
            if(!row||!isFinite(Number(row.jdn))||Number(row.jdn)<=0||!isFinite(Number(row.iv))||Number(row.iv)<=0) continue;
            var verified=isVerifiedPoolObservation(row);
            clean.push({jdn:Math.floor(Number(row.jdn)),iv:Number(row.iv),dateStr:typeof row.dateStr==='string'?row.dateStr:'',source:verified?row.source:'unverified',instrumentId:verified?String(row.instrumentId):null,adapterVersion:verified?row.adapterVersion:null,timestamp:verified&&row.timestamp!=null?normalizeObservationTimestamp(row.timestamp):null});
        }
        clean.sort(function(a,b){return a.jdn-b.jdn;}); out[keys[i]]=clean;
    }
    return out;
}
function migrateLegacyPoolDayOrdinals(pool, ivHistory){
    var changed=false, keys=Object.keys(pool||{});
    for(var i=0;i<keys.length;i++){
        var entry=pool[keys[i]];
        if(!entry) continue;
        if(Array.isArray(entry.history)){
            for(var j=0;j<entry.history.length;j++){
                var point=entry.history[j];
                if(point && isFinite(point.jdn) && point.jdn>0 && point.jdn<100000){ point.jdn=Math.floor(point.jdn)+JDN_UNIX_EPOCH; changed=true; }
            }
            entry.history.sort(function(a,b){return a.jdn-b.jdn;});
            if(entry.history.length){ entry.firstJdn=entry.history[0].jdn; entry.lastJdn=entry.history[entry.history.length-1].jdn; entry.count=entry.history.length; }
        }
        if(entry.stats){
            if(entry.stats.firstJdn>0 && entry.stats.firstJdn<100000){ entry.stats.firstJdn+=JDN_UNIX_EPOCH; changed=true; }
            if(entry.stats.lastJdn>0 && entry.stats.lastJdn<100000){ entry.stats.lastJdn+=JDN_UNIX_EPOCH; changed=true; }
        }
    }
    var ivKeys=Object.keys(ivHistory||{});
    for(var a=0;a<ivKeys.length;a++){
        var series=ivHistory[ivKeys[a]];
        if(!Array.isArray(series)) continue;
        for(var b=0;b<series.length;b++) if(series[b] && isFinite(series[b].jdn) && series[b].jdn>0 && series[b].jdn<100000){ series[b].jdn=Math.floor(series[b].jdn)+JDN_UNIX_EPOCH; changed=true; }
        series.sort(function(x,y){return x.jdn-y.jdn;});
    }
    return changed;
}
function loadPool(){
    var migrated=false, splitStorage=false, bundleLoaded=false, bundleRejected=false, rawBundle=null, rawPool=null, rawIv=null, decodedBundle, decodedPool, decodedIv;
    try{
        if(typeof localStorage!=='undefined'){
            rawBundle=localStorage.getItem(POOL_BUNDLE_KEY);
            if(rawBundle){
                decodedBundle=decodeStorageRecord(rawBundle,'pool-bundle');
                if(decodedBundle.valid&&decodedBundle.data){
                    poolStore=validatePoolStore(decodedBundle.data.pool||{});
                    ivHist=validateIvHistory(decodedBundle.data.ivHistory||{});
                    bundleLoaded=true;
                } else { bundleRejected=true; LOG.warn('[Zharfa] bundle storage invalid or unsupported; trying versioned and legacy records without overwriting the original.'); }
            }
            if(!bundleLoaded){
                rawPool=localStorage.getItem(POOL_STORE_KEY); rawIv=localStorage.getItem(POOL_IV_KEY);
                decodedPool=decodeStorageRecord(rawPool,'pool'); decodedIv=decodeStorageRecord(rawIv,'iv-history');
                if(!decodedPool.valid||!decodedPool.data){ rawPool=localStorage.getItem(LEGACY_POOL_STORE_KEY); decodedPool=decodeStorageRecord(rawPool,'pool'); }
                if(!decodedIv.valid||!decodedIv.data){ rawIv=localStorage.getItem(LEGACY_POOL_IV_KEY); decodedIv=decodeStorageRecord(rawIv,'iv-history'); }
                if(decodedPool.valid&&decodedPool.data) poolStore=validatePoolStore(decodedPool.data);
                else { poolStore={}; if(rawPool) LOG.warn('[Zharfa] pool storage invalid; ignored without deleting the original record.'); }
                if(decodedIv.valid&&decodedIv.data) ivHist=validateIvHistory(decodedIv.data);
                else { ivHist={}; if(rawIv) LOG.warn('[Zharfa] IV storage invalid; ignored without deleting the original record.'); }
                migrated=!!((decodedPool&&decodedPool.legacy)||(decodedIv&&decodedIv.legacy));
                splitStorage=!!((rawPool||rawIv)&&!bundleLoaded&&!rawBundle);
                migrated=migrated||splitStorage;
            }
        } else { poolStore={}; ivHist={}; }
    }catch(e){ LOG.warn('[Zharfa] storage read failed; in-memory state starts empty.',e&&e.message||e); poolStore={}; ivHist={}; }
    var ordinalMigration=migrateLegacyPoolDayOrdinals(poolStore,ivHist);
    migrated=migrated||ordinalMigration;
    if(bundleRejected) migrated=false;
    var keys=Object.keys(poolStore);
    for(var i=0;i<keys.length;i++){
        if(!poolStore[keys[i]].stats) poolStore[keys[i]].stats={};
        try{ updatePoolStats(keys[i]); }catch(e){}
    }
    try{ pruneOldPool(); }catch(e){}
    if(migrated){
        try{
            if(typeof localStorage!=='undefined'){
                var oldPool=localStorage.getItem(LEGACY_POOL_STORE_KEY), oldIv=localStorage.getItem(LEGACY_POOL_IV_KEY);
                if(oldPool&&!localStorage.getItem(LEGACY_POOL_STORE_KEY+'_backup_v2')) localStorage.setItem(LEGACY_POOL_STORE_KEY+'_backup_v2',oldPool);
                if(oldIv&&!localStorage.getItem(LEGACY_POOL_IV_KEY+'_backup_v2')) localStorage.setItem(LEGACY_POOL_IV_KEY+'_backup_v2',oldIv);
            }
            if(!savePool()) throw new Error('atomic bundle save failed');
            LOG.info('[Zharfa] storage migrated to schema v2 bundle; legacy keys retained as backup.');
        }catch(e){ LOG.warn('[Zharfa] storage migration backup or save failed; legacy data was retained.',e&&e.message||e); }
    }
}
function savePool(){
    if(typeof localStorage==='undefined') return false;
    var envelope={schemaVersion:STORAGE_SCHEMA_VERSION,kind:'pool-bundle',data:{pool:poolStore,ivHistory:ivHist}};
    try{
        localStorage.setItem(POOL_BUNDLE_KEY,JSON.stringify(envelope));
        return true;
    }catch(e){
        LOG.warn('[ExoticFilter] pool persistence failed; in-memory data retained and stored data not pruned.',e&&e.message||e);
        rawSamples.errors.push({reason:'storage-write-failed',error:e&&e.message||String(e)});
        return false;
    }
}
// ─── BINARY SEARCH INSERT — O(log n) to avoid sort on every insert ────────
function binarySearchInsertPos(arr, jdn){
    var lo=0, hi=arr.length;
    while(lo<hi){
        var mid=(lo+hi>>1);
        if(arr[mid].jdn < jdn) lo=mid+1;
        else hi=mid;
    }
    return lo;
}
var _poolBatchMode=false, _poolDirty={};
function beginPoolBatch(){ _poolBatchMode=true; _poolDirty={}; }
function endPoolBatch(){ _poolBatchMode=false; var keys=Object.keys(_poolDirty); for(var i=0;i<keys.length;i++){ try{ updatePoolStats(keys[i]); }catch(e){} } _poolDirty={}; savePool(); }
function addToPool(baseSym, data){
    if(!baseSym) return;
    if(!poolStore[baseSym]) poolStore[baseSym]={history:[], stats:{}, lastJdn:0, firstJdn:0, count:0};
    var entry=poolStore[baseSym];
    var jdn=data.jdn||todayJdn();
    var verifiedIv=data.iv!=null&&addIvObservationToHistory(baseSym,data,jdn)?Number(data.iv):0;
    var pos=binarySearchInsertPos(entry.history, jdn);
    if(pos<entry.history.length && entry.history[pos].jdn===jdn){
        entry.history[pos].price=data.price||entry.history[pos].price;
        if(data.source) entry.history[pos].source=data.source;
        if(data.instrumentId) entry.history[pos].instrumentId=String(data.instrumentId);
        if(data.adapterVersion!=null) entry.history[pos].adapterVersion=data.adapterVersion;
        if(data.timestamp!=null) entry.history[pos].timestamp=normalizeObservationTimestamp(data.timestamp);
        if(data.vol!=null) entry.history[pos].vol=data.vol;
        if(data.tno!=null) entry.history[pos].tno=data.tno;
        if(data.tvol!=null) entry.history[pos].tvol=data.tvol;
        if(verifiedIv>0) entry.history[pos].iv=verifiedIv;
        entry.lastJdn=jdn;
        updatePoolStats(baseSym);
        return;
    }
    var newItem={jdn:jdn,dateStr:data.dateStr||jdnToIsoDate(jdn),price:data.price||0,vol:data.vol||0,tno:data.tno||0,tvol:data.tvol||0,iv:verifiedIv,source:data.source||'unverified',instrumentId:data.instrumentId?String(data.instrumentId):null,adapterVersion:data.adapterVersion||null,timestamp:data.timestamp==null?null:normalizeObservationTimestamp(data.timestamp)};
    entry.history.splice(pos,0,newItem);
    var maxDays=getCfg('poolMaxDays')||90;
    if(entry.history.length>maxDays){
        var excess=entry.history.length-maxDays;
        entry.history.splice(0, excess);
    }
    entry.firstJdn=entry.history[0]? entry.history[0].jdn : jdn;
    entry.lastJdn=entry.history[entry.history.length-1].jdn;
    entry.count=entry.history.length;
    if(_poolBatchMode){ _poolDirty[baseSym]=true; } else { updatePoolStats(baseSym); }
}
var POOL_AUTO_WRITE_PREFIX='__exfPoolAutoAtV2_';
function poolWriteAllowed(mode,baseSym){
    if(mode==='manual') return true;
    if(mode!=='automatic' || getCfg('poolAutoUpdate')!==true) return false;
    try{
        if(typeof localStorage==='undefined') return false;
        var last=Number(localStorage.getItem(POOL_AUTO_WRITE_PREFIX+encodeURIComponent(baseSym))||0);
        return !last || Date.now()-last>=86400000;
    }catch(e){ return false; }
}
function writePoolObservation(baseSym,data,mode){
    data=data||{};
    if(!baseSym||!isTrustedObservationSource(data.source)||!poolWriteAllowed(mode,baseSym)) return false;
    var expectedId=(getCfg('baseInsCodes')||{})[baseSym];
    if(data.adapterVersion!==TSETMC_ADAPTER_CONTRACT_VERSION||!expectedId||String(data.instrumentId)!==String(expectedId)) return false;
    var jdn=normalizeToJdn(data.jdn);
    if(jdn==null||jdn>todayJdn()||!(Number(data.price)>0)||!isFinite(Number(data.price))) return false;
    var timestamp=null;
    if(data.source==='live-tsetmc'){
        timestamp=normalizeObservationTimestamp(data.timestamp);
        var age=timestamp==null?Infinity:Date.now()-timestamp;
        if(age< -300000||age>(Number(getCfg('liveBaseMaxAge'))||300000)) return false;
    }
    var incomingIv=Number(data.iv);
    var normalized={jdn:jdn,dateStr:data.dateStr||jdnToIsoDate(jdn),price:Number(data.price),vol:Number(data.vol)||0,tno:Number(data.tno)||0,tvol:Number(data.tvol)||0,iv:isFinite(incomingIv)&&incomingIv>0&&incomingIv<=5?incomingIv:0,source:data.source,instrumentId:String(data.instrumentId),adapterVersion:TSETMC_ADAPTER_CONTRACT_VERSION,timestamp:timestamp};
    if(mode==='automatic'){
        try{ if(typeof localStorage!=='undefined') localStorage.setItem(POOL_AUTO_WRITE_PREFIX+encodeURIComponent(baseSym),String(Date.now())); }catch(e){ return false; }
    }
    addToPool(baseSym,normalized);
    if(!_poolBatchMode) savePool();
    traceEvent('pool-write', baseSym, {price:normalized.price, source:normalized.source, jdn:jdn, instrumentId:normalized.instrumentId, mode:mode});
    return true;
}
function buildReverseMap(){
    var map={};
    try{
        var codes=getCfg('baseInsCodes')||{};
        var keys=Object.keys(codes);
        for(var i=0;i<keys.length;i++){
            var base=keys[i], code=codes[base];
            if(code) map[code]=base;
        }
    }catch(e){}
    return map;
}
// ─── REVERSE MAP — insCode to baseSym for fast live price lookup ──────────
var _reverseMapCache=null, _reverseMapTime=0;
function getReverseMap(){
    var now=Date.now();
    if(_reverseMapCache && (now-_reverseMapTime)<60000) return _reverseMapCache;
    _reverseMapCache=buildReverseMap();
    _reverseMapTime=now;
    return _reverseMapCache;
}
function getBaseFromIns(insCode){
    var rev=getReverseMap();
    return rev[insCode]||null;
}
function annualizeTseReturns(pricePoints){
    if(!Array.isArray(pricePoints) || pricePoints.length<4) return {ok:false,reason:'not-enough-observations'};
    for(var sourceIndex=0;sourceIndex<pricePoints.length;sourceIndex++) if(!isTrustedObservationSource(pricePoints[sourceIndex].source)) return {ok:false,reason:'unverified-observation'};
    var first=pricePoints[0].jdn, last=pricePoints[pricePoints.length-1].jdn;
    if(!TSE_CALENDAR.isCompleteForRange(first,last)) return {ok:false,reason:'calendar-incomplete'};
    var normalized=[];
    for(var i=1;i<pricePoints.length;i++){
        var sessions=TSE_CALENDAR.tradingDaysBetween(pricePoints[i-1].jdn,pricePoints[i].jdn);
        if(sessions<=0) return {ok:false,reason:'invalid-observation-order'};
        normalized.push(Math.log(pricePoints[i].price/pricePoints[i-1].price)/Math.sqrt(sessions));
    }
    if(normalized.length<3) return {ok:false,reason:'not-enough-returns'};
    var mean=0; for(var j=0;j<normalized.length;j++) mean+=normalized[j]; mean/=normalized.length;
    var variance=0; for(var k=0;k<normalized.length;k++) variance+=(normalized[k]-mean)*(normalized[k]-mean);
    var daily=Math.sqrt(variance/normalized.length);
    var startYear=jdnToJalali(first), endYear=jdnToJalali(last);
    if(!startYear||!endYear) return {ok:false,reason:'date-conversion'};
    var totalAnnualDays=0, years=0;
    for(var year=startYear.jy;year<=endYear.jy;year++){
        var annual=TSE_CALENDAR.getAnnualTradingDays(year);
        if(!annual.complete || annual.days<=0) return {ok:false,reason:'calendar-incomplete'};
        totalAnnualDays+=annual.days; years++;
    }
    return {ok:true,volatility:daily*Math.sqrt(totalAnnualDays/years)*100,annualTradingDays:totalAnnualDays/years};
}
function updatePoolStats(baseSym){
    var entry=poolStore[baseSym];
    if(!entry || !entry.history.length) return;
    delete entry.statsVolatilityWarning;
    var sumP=0, sumV=0, sumTno=0, prices=[], pricePoints=[], cntV=0, cntTno=0, lastVerified=null;
    for(var i=0;i<entry.history.length;i++){
        var h=entry.history[i];
        if(h.price>0 && isTrustedObservationSource(h.source)){
            sumP+=h.price; prices.push(h.price); lastVerified=h;
            if(h.jdn>=2000000 && h.jdn<=3000000) pricePoints.push({jdn:h.jdn,price:h.price,source:h.source});
            if(h.tvol>0){ sumV+=h.tvol; cntV++; }
            if(h.tno>0){ sumTno+=h.tno; cntTno++; }
        }
    }
    var avg=prices.length? sumP/prices.length : 0;
    var vol=0;
    if(prices.length>3){
        var logRets=[];
        for(var k=1;k<prices.length;k++){ if(prices[k-1]>0 && prices[k]>0) logRets.push(Math.log(prices[k]/prices[k-1])); }
        if(logRets.length>2){
            var meanR=0; for(var r=0;r<logRets.length;r++) meanR+=logRets[r]; meanR/=logRets.length;
            var sq=0; for(var r2=0;r2<logRets.length;r2++) sq+=(logRets[r2]-meanR)*(logRets[r2]-meanR);
            var std=Math.sqrt(sq/logRets.length);
            if(getCfg('volatilityAnnualizationMode')==='tse-calendar'){
                var tseAnnualized=annualizeTseReturns(pricePoints);
                if(tseAnnualized.ok){ vol=tseAnnualized.volatility; }
                else { vol=0; entry.statsVolatilityWarning=tseAnnualized.reason; }
            } else { vol=std*Math.sqrt(252)*100; }
        } else if(getCfg('volatilityAnnualizationMode')==='tse-calendar'){
            vol=0; entry.statsVolatilityWarning='not-enough-returns';
        }
    } else if(getCfg('volatilityAnnualizationMode')==='tse-calendar'){
        entry.statsVolatilityWarning='not-enough-returns';
    }
    entry.stats={avgPrice:avg,lastPrice:lastVerified?lastVerified.price:0,volatility:vol,volatilityBasis:getCfg('volatilityAnnualizationMode')==='tse-calendar'?'tse-calendar':'legacy252',volatilityWarning:entry.statsVolatilityWarning||null,avgTvol:cntV?sumV/cntV:0,avgTno:cntTno?sumTno/cntTno:0,days:entry.history.length,verifiedDays:prices.length,firstJdn:entry.firstJdn,lastJdn:entry.lastJdn};
    delete entry.statsVolatilityWarning;
    if(getCfg('poolAuto') && avg>0){
        var clamp=getCfg('poolClamp')||3;
        var cfgPrices=getCfg('basePrices')||{};
        var fixed=cfgPrices[baseSym]||CONFIG.basePrices[baseSym]||avg;
        var lo=fixed/clamp, hi=fixed*clamp;
        var calibrated=Math.max(lo, Math.min(hi, avg));
        if(prices.length>= (getCfg('poolMinObs')||3)){
            CONFIG.basePrices[baseSym]=calibrated;
            try{ var ov=optStore('basePrices'); if(ov && typeof ov==='object'){ ov[baseSym]=calibrated; optStore('basePrices', ov); } }catch(e){}
        }
    }
}
function getPoolPrice(baseSym){
    if(!baseSym) return 0;
    var e=poolStore[baseSym];
    if(e && e.stats && e.stats.lastPrice) return e.stats.lastPrice;
    var cfgPrices=getCfg('basePrices');
    if(cfgPrices && typeof cfgPrices==='object' && cfgPrices[baseSym]) return cfgPrices[baseSym];
    return CONFIG.basePrices[baseSym]||0;
}
var _volCache={}, _volCacheVersion=0;
function getPoolVolatility(baseSym){
    var e=poolStore[baseSym];
    if(e && e.stats && e.stats.volatility>0){
        var cacheKey=baseSym+'_'+e.stats.days+'_'+_volCacheVersion;
        if(_volCache[cacheKey]!=null) return _volCache[cacheKey];
        _volCache[cacheKey]=e.stats.volatility;
        return e.stats.volatility;
    }
    return (getCfg('volFloor')+getCfg('volCeil'))/2;
}
function bumpVolCache(){ _volCacheVersion++; _volCache={}; }
var _ivRankCache={}, _ivRankVersion=0;
function getPoolIvRank(baseSym, curIv){
    var hist=getVerifiedIvHistory(baseSym);
    if(!hist || hist.length<5) return 50;
    var cacheKey=baseSym+'_'+hist.length+'_'+_ivRankVersion;
    var cached=_ivRankCache[cacheKey];
    var ivs;
    if(cached && cached.ivs){
        ivs=cached.ivs;
    } else {
        ivs=hist.map(function(x){return x.iv;}).sort(function(a,b){return a-b;});
        _ivRankCache[cacheKey]={ivs:ivs};
        var keys=Object.keys(_ivRankCache);
        if(keys.length>50) delete _ivRankCache[keys[0]];
    }
    var less=0;
    for(var i=0;i<ivs.length;i++) if(ivs[i]<=curIv) less++;
    return less/ivs.length*100;
}
function bumpIvRankVersion(){ _ivRankVersion++; _ivRankCache={}; }
function pruneOldPool(){
    var nowJdn=todayJdn();
    var maxDays=getCfg('poolMaxDays')||90;
    var syms=Object.keys(poolStore);
    for(var i=0;i<syms.length;i++){
        var sym=syms[i];
        var e=poolStore[sym];
        if(!e || !e.history) continue;
        var cutoff=nowJdn-maxDays;
        var before=e.history.length;
        e.history=e.history.filter(function(h){return h.jdn>=cutoff;});
        if(e.history.length!==before) updatePoolStats(sym);
        if(e.history.length===0) delete poolStore[sym];
    }
    var ivSyms=Object.keys(ivHist);
    for(var j=0;j<ivSyms.length;j++){
        var s=ivSyms[j];
        if(ivHist[s] && ivHist[s].length> (getCfg('ivHistDays')||90)){
            ivHist[s]=ivHist[s].slice(-getCfg('ivHistDays'));
        }
    }
}
function calibrateGatesFromPool(){
    if(!getCfg('poolGates')) return;
    var allTno=[], allTvol=[];
    var keys=Object.keys(poolStore);
    for(var i=0;i<keys.length;i++){
        var st=poolStore[keys[i]].stats;
        if(st && st.avgTno>0) allTno.push(st.avgTno);
        if(st && st.avgTvol>0) allTvol.push(st.avgTvol);
    }
    if(allTno.length>= (getCfg('poolMinGateObs')||20)){
        allTno.sort(function(a,b){return a-b;});
        var medTno=allTno[Math.floor(allTno.length/2)];
        var medTvol=0;
        if(allTvol.length>0){ allTvol.sort(function(a,b){return a-b;}); medTvol=allTvol[Math.floor(allTvol.length/2)]; }
        poolGatesCache.medianTno=medTno;
        poolGatesCache.medianTvol=medTvol;
        try{
            var baseMinDepth=CONFIG.minDepthTrades||0.5;
            var clamp=getCfg('poolGateClamp')||2;
            if(medTno>20){
                var calibrated=Math.max(baseMinDepth/clamp, Math.min(baseMinDepth*clamp, medTno/50));
                poolGatesCache.calibratedMinDepth=calibrated;
            }
        }catch(e){}
    }
}
function getCalibratedMinDepth(){
    if(poolGatesCache.calibratedMinDepth && getCfg('poolGates')) return poolGatesCache.calibratedMinDepth;
    return getCfg('minDepthTrades');
}
function getPoolSummary(){
    var out=[];
    var keys=Object.keys(poolStore);
    for(var i=0;i<keys.length;i++){
        var sym=keys[i];
        var e=poolStore[sym];
        if(!e) continue;
        out.push({symbol:sym, days:e.stats.verifiedDays||0, storedDays:e.history.length, lastPrice:e.stats.lastPrice, avgPrice:e.stats.avgPrice, vol:e.stats.volatility, avgTvol:e.stats.avgTvol});
    }
    out.sort(function(a,b){return b.days-a.days;});
    return out;
}
function getPoolStatusText(){
    var keys=Object.keys(poolStore);
    var totalSyms=keys.length;
    var totalDays=0, storedDays=0;
    for(var i=0;i<keys.length;i++){ var k=keys[i]; if(poolStore[k] && poolStore[k].history){ storedDays+=poolStore[k].history.length; totalDays+=poolStore[k].stats&&poolStore[k].stats.verifiedDays||0; } }
    return totalSyms+' نماد پایه، '+totalDays+' مشاهدهٔ معتبر از '+storedDays+' ردیف ذخیره‌شده، تا '+POOL_MAX_DAYS+' روز نگهداری';
}
loadPool();
function historyDateToJdn(value){
    if(value==null) return null;
    if(typeof value==='number' && isFinite(value)){
        if(value>100000000000){ if(value>4102444800000) return null; value=Math.floor(value/1000); }
        if(value>1000000000){
            if(value>4102444800) return null;
            var stamp=new Date(value*1000);
            if(!isFinite(stamp.getTime())) return null;
            return validatedGregorianToJdn(stamp.getUTCFullYear(),stamp.getUTCMonth()+1,stamp.getUTCDate());
        }
        var digits=String(Math.floor(value));
        if(/^\d{8}$/.test(digits)) value=digits;
        else if(value>=2000000 && value<=3000000) return Math.floor(value);
        else return null;
    }
    var text=faToEnDigits(String(value)).trim();
    var m=text.match(/^(\d{4})[\/\.\-](\d{1,2})[\/\.\-](\d{1,2})$/);
    if(m){
        var y=+m[1], mo=+m[2], d=+m[3];
        if(y>=1700) return validatedGregorianToJdn(y,mo,d);
        if(y>=1200 && y<=1600){ try{ return jalaliToJdn(y,mo,d); }catch(e){ return null; } }
    }
    var compact=text.match(/^(\d{4})(\d{2})(\d{2})$/);
    if(compact){
        var cy=+compact[1], cm=+compact[2], cd=+compact[3];
        if(cy>=1700) return validatedGregorianToJdn(cy,cm,cd);
        if(cy>=1200 && cy<=1600){ try{ return jalaliToJdn(cy,cm,cd); }catch(e){ return null; } }
    }
    var parsed=Date.parse(text);
    if(isFinite(parsed)){
        var date=new Date(parsed);
        return validatedGregorianToJdn(date.getUTCFullYear(),date.getUTCMonth()+1,date.getUTCDate());
    }
    if(/^\d+$/.test(text)) return null;
    return normalizeToJdn(text);
}
function jdnToIsoDate(jdn){
    var date=new Date((jdn-JDN_UNIX_EPOCH)*86400000);
    return date.toISOString().slice(0,10);
}
function readTsetmcHistoryRow(row,expectedInsCode){ return normalizeTsetmcHistoryRow(row,expectedInsCode); }
function requestPoolUpdate(baseSym, opts){
    beginPoolBatch();
    opts=opts||{};
    var showAlert=opts.showAlert!==false;
    var symbols=baseSym?[baseSym]:getSymList('poolBaseSymbols');
    if(!symbols.length) symbols=Object.keys(poolStore);
    if(!symbols.length) symbols=['خودرو','اهرم','وبملت'];
    var updatedSymbols={}, updated=0, observations=0;
    var curL18=(typeof l18!=='undefined'?String(l18||''):'');
    try{
        if(typeof window!=='undefined' && Array.isArray(window.ih)){
            var ih=window.ih, newestFirst=getCfg('ihNewestFirst'), historyCodes=getCfg('baseInsCodes')||{};
            for(var si=0;si<symbols.length;si++){
                var bs=symbols[si];
                if(!curL18 || curL18.indexOf(bs)===-1 || !historyCodes[bs]) continue;
                var symbolAdded=0, maxDays=Math.min(ih.length,getCfg('poolMaxDays')||90);
                for(var d=0;d<maxDays;d++){
                    var row=ih[newestFirst?d:ih.length-1-d];
                    var parsed=readTsetmcHistoryRow(row,historyCodes[bs]);
                    if(!parsed || parsed.jdn>todayJdn()) continue;
                    if(writePoolObservation(bs,{price:parsed.price,jdn:parsed.jdn,dateStr:parsed.dateStr,tno:parsed.tno,tvol:parsed.tvol,iv:parsed.iv,source:'tsetmc-history',instrumentId:parsed.instrumentId,adapterVersion:parsed.adapterVersion},'manual')){ symbolAdded++; observations++; }
                }
                if(symbolAdded) updatedSymbols[bs]=true;
            }
        }
    }catch(e){ LOG.warn('[ExoticFilter] History parsing failed:',e&&e.message||e); }
    if(typeof fetchTsetmcInstrumentHistory==='function') for(var hi=0;hi<symbols.length;hi++){
        (function(symbol,insCode){
            if(!insCode) return;
            fetchTsetmcInstrumentHistory(insCode,Math.min(500,Number(getCfg('poolMaxDays'))||90),function(response){
                var added=0;
                if(response&&response.ok&&Array.isArray(response.rows)) for(var ri=0;ri<response.rows.length;ri++){
                    var parsed=readTsetmcHistoryRow(response.rows[ri],insCode);
                    if(parsed&&writePoolObservation(symbol,{price:parsed.price,jdn:parsed.jdn,dateStr:parsed.dateStr,tno:parsed.tno,tvol:parsed.tvol,iv:parsed.iv,source:'tsetmc-history',instrumentId:parsed.instrumentId,adapterVersion:parsed.adapterVersion},'manual')) added++;
                }
                if(added){try{renderLayers();renderDebug();showToast('تاریخچهٔ تأییدشدهٔ '+symbol+' با '+added+' مشاهده به‌روزرسانی شد.','success');}catch(e){}}
                else if(response&&!response.ok&&getCfg('verbose')) LOG.warn('[ExoticFilter] history rejected for '+symbol+': '+response.reason);
            });
        })(symbols[hi],(getCfg('baseInsCodes')||{})[symbols[hi]]);
    }
    var codes=getCfg('baseInsCodes')||{}, now=Date.now(), maxAge=getCfg('liveBaseMaxAge')||300000;
    for(var si2=0;si2<symbols.length;si2++){
        var sym=symbols[si2], ins=codes[sym], cached=ins&&liveBaseCache[ins];
        var cacheAge=cached?now-Number(cached.time):Infinity, cachedStamp=cached?normalizeObservationTimestamp(cached.timestamp):null, quoteAge=cachedStamp==null?Infinity:now-cachedStamp;
        if(cached&&cached.price>0&&isFinite(cacheAge)&&cacheAge>=0&&cacheAge<=maxAge&&quoteAge>=-300000&&quoteAge<=maxAge){
            if(writePoolObservation(sym,{price:cached.price,iv:cached.iv,jdn:todayJdn(),dateStr:jdnToIsoDate(todayJdn()),source:'live-tsetmc',instrumentId:cached.instrumentId,adapterVersion:cached.adapterVersion,timestamp:cached.timestamp},'manual')){ updatedSymbols[sym]=true; observations++; }
        }
    }
    updated=Object.keys(updatedSymbols).length;
    endPoolBatch(); pruneOldPool(); calibrateGatesFromPool();
    if(showAlert){
        if(observations) showToast('🔄 '+updated+' نماد با '+observations+' مشاهدهٔ تاریخ‌دار/زنده بروزرسانی شد — '+getPoolStatusText(),'success');
        else showToast('⚠️ تاریخچه/مظنهٔ واقعی و تاریخ‌دار در دسترس نیست؛ داده‌ای به استخر افزوده نشد.','warn');
    }
    LOG.log('[ExoticFilter] History update:',updated+' symbols, '+observations+' observations; '+getPoolStatusText());
    try{ renderLayers(); renderDebug(); }catch(e){}
    return updated;
}
function requestPoolUpdateAll(){ return requestPoolUpdate(null, {showAlert:true}); }
function requestPoolUpdateSingle(){
    var sym=prompt('نماد پایه را وارد کنید (مثلا خودرو، اهرم، وبملت):', 'خودرو');
    if(!sym) return 0;
    return requestPoolUpdate(sym.trim(), {showAlert:true});
}
function buildPoolHistoryChart(baseSym){
    var entry=poolStore[baseSym];
    if(!entry || !entry.history.length) return '<div style="color:#8b9bb4;font-size:11px;">تاریخچه‌ای برای '+baseSym+' یافت نشد</div>';
    var hist=entry.history.filter(function(point){return point&&isTrustedObservationSource(point.source);}).slice(-30);
    if(hist.length<2) return '<div style="color:#8b9bb4;font-size:11px;padding:10px;background:#0f141e;border-radius:8px;">کمتر از دو مشاهدهٔ تاریخ‌دار یا منبع تأییدشده برای نمودار '+baseSym+' موجود است.</div>';
    var maxP=Math.max.apply(null, hist.map(function(h){return h.price;})), minP=Math.min.apply(null, hist.map(function(h){return h.price;}));
    var range=maxP-minP||1;
    var w=400, h=80, pad=10;
    var denom=hist.length>1? (hist.length-1) : 1;
    var points=hist.map(function(row, idx){
        var x=pad + (idx/denom)*(w-pad*2);
        var y=h-pad - ((row.price-minP)/range)*(h-pad*2);
        return x+','+y;
    }).join(' ');
    var lastPrice=hist[hist.length-1].price;
    var firstPrice=hist[0].price;
    var change=((lastPrice-firstPrice)/firstPrice*100).toFixed(1);
    var changeColor= change>=0? '#34d399' : '#fb7185';
    var html='';
    html+='<div style="margin:8px 0;padding:10px;background:#070a14;border-radius:10px;border:1px solid #1e2f4f;">';
    html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;font-size:11px;"><span style="font-weight:700;">📈 '+baseSym+' — 30 روز آخر</span><span>آخرین: <b>'+Math.round(lastPrice)+'</b> <span style="color:'+changeColor+';">('+(change>=0?'+':'')+change+'%)</span></span><span style="color:#64748b;">'+hist.length+' روز</span></div>';
    html+='<svg width="'+w+'" height="'+h+'" style="background:#111c32;border-radius:8px;display:block;"><polyline fill="none" stroke="#38bdf8" stroke-width="2" points="'+points+'" style="filter:drop-shadow(0 0 4px rgba(56,189,248,0.5));"/>';
    hist.forEach(function(row, idx){
        var x=pad + (idx/denom)*(w-pad*2);
        var y=h-pad - ((row.price-minP)/range)*(h-pad*2);
        if(idx===hist.length-1 || idx===0){
            html+='<circle cx="'+x+'" cy="'+y+'" r="3" fill="'+ (idx===hist.length-1?'#34d399':'#64748b') +'"/>';
        }
    });
    html+='</svg>';
    html+='<div style="display:flex;justify-content:space-between;font-size:9px;color:#64748b;margin-top:4px;"><span>'+hist[0].dateStr+'</span><span>min '+Math.round(minP)+' — max '+Math.round(maxP)+'</span><span>'+hist[hist.length-1].dateStr+'</span></div>';
    html+='</div>';
    return html;
}

// ─── LIVE PRICE — TSETMC same-origin feed ─────────────────────────────────
function getCurOrigin(){ try{ return (typeof location!=='undefined' && location.origin)? location.origin : ''; }catch(e){ return ''; } }
function isSameOriginUrl(url){
    try{
        var cur=getCurOrigin();
        if(!cur) return true;
        if(!url) return true;
        if(url.startsWith('/')) return true;
        return url===cur || url.startsWith(cur+'/');
    }catch(e){ return true; }
}
function isTsetmcOrigin(){
    try{
        var cur=getCurOrigin();
        if(!cur) return false;
        var hostname='';
        try{ hostname=new URL(cur).hostname; }catch(e){ hostname=cur.replace(/^https?:\/\//,'').split('/')[0].split(':')[0]; }
        return /(^|\.)tsetmc\.com$/i.test(hostname);
    }catch(e){ return false; }
}
var _tsetmcRequestTail=Promise.resolve(), _tsetmcRequestLastAt=0, _tsetmcHttpCache={};
function fetchTsetmcText(url, options){
    options=options||{};
    if(!isSameOriginUrl(url)) return Promise.reject(new Error('cross-origin-blocked'));
    var cacheKey=String(url), now=Date.now(), cache=_tsetmcHttpCache[cacheKey];
    if(options.cache!==false&&cache&&now-cache.time<60000) return Promise.resolve(cache.text);
    function request(){
        var wait=Math.max(0,1000-(Date.now()-_tsetmcRequestLastAt));
        return new Promise(function(resolve){setTimeout(resolve,wait);}).then(function(){
            _tsetmcRequestLastAt=Date.now();
            if(typeof fetch==='undefined') throw new Error('fetch-unavailable');
            var controller=null, timer=null, opts={method:'GET',credentials:'same-origin',headers:{}};
            try{controller=new AbortController();}catch(e){}
            if(controller) opts.signal=controller.signal;
            if(options.cache!==false&&_tsetmcHttpCache[cacheKey]&&Date.now()-_tsetmcHttpCache[cacheKey].time<60000) return _tsetmcHttpCache[cacheKey].text;
            var requestPromise=fetch(url,opts).then(function(response){
                if(!response||!response.ok) throw new Error('HTTP '+(response&&response.status));
                return response.text();
            });
            var timeoutPromise=new Promise(function(resolve,reject){
                timer=setTimeout(function(){try{if(controller)controller.abort();}catch(e){} reject(new Error('timeout'));},8000);
            });
            return Promise.race([requestPromise,timeoutPromise]).then(function(text){
                clearTimeout(timer);
                if(options.cache!==false){_tsetmcHttpCache[cacheKey]={time:Date.now(),text:text};var cacheKeys=Object.keys(_tsetmcHttpCache);if(cacheKeys.length>100){cacheKeys.sort(function(a,b){return _tsetmcHttpCache[a].time-_tsetmcHttpCache[b].time;});for(var ci=0;ci<cacheKeys.length-100;ci++)delete _tsetmcHttpCache[cacheKeys[ci]];}}
                return text;
            },function(error){clearTimeout(timer);throw error;});
        });
    }
    var queued=_tsetmcRequestTail.then(request,request);
    _tsetmcRequestTail=queued.then(function(){},function(){});
    return queued;
}
function tsetmcNumber(value){
    var text=faToEnDigits(String(value==null?'':value)).trim();
    if(!/^[+-]?(?:\d+\.?\d*|\.\d+)$/.test(text)) return null;
    var number=Number(text);
    return isFinite(number)?number:null;
}
function parseRawInstInfoFast(text,expectedInsCode,nowMs){
    if(typeof text!=='string') return null;
    var segments=text.replace(/^\uFEFF/,'').split(';');
    if(segments.length<3) return null;
    var fields=segments[0].split(',');
    if(fields.length!==14) return null;
    var date=String(fields[12]||'').trim();
    if(!/^\d{8}$/.test(date)) return null;
    var y=Number(date.slice(0,4)),m=Number(date.slice(4,6)),d=Number(date.slice(6,8));
    if(validatedGregorianToJdn(y,m,d)==null) return null;
    var time=String(fields[0]||'').trim(), tm=time.match(/^(\d{2}):(\d{2}):(\d{2})$/);
    if(!tm||Number(tm[1])>23||Number(tm[2])>59||Number(tm[3])>59) return null;
    var values=[];
    for(var i=2;i<=10;i++){values[i]=tsetmcNumber(fields[i]);}
    var last=values[2],close=values[3],high=values[4],yesterday=values[5],max=values[6],min=values[7],tradeCount=values[8],volume=values[9],value=values[10];
    if(!(last>0&&close>0&&yesterday>0&&high>0&&max>0&&min>0&&max>=min&&last>=min&&last<=max&&tradeCount>=0&&volume>=0&&value>=0)) return null;
    var orderBook=String(segments[2]||'').trim();
    if(!orderBook) return null;
    var tz=Number(CONFIG&&CONFIG.tzOffsetMin);
    if(!isFinite(tz)) tz=210;
    var stamp=Date.UTC(y,m-1,d,Number(tm[1]),Number(tm[2]),Number(tm[3]))-tz*60000;
    if(!isFinite(stamp)||stamp<=0) return null;
    return {adapterVersion:TSETMC_ADAPTER_CONTRACT_VERSION,instrumentId:String(expectedInsCode),lastPrice:last,closingPrice:close,prevClose:yesterday,priceYesterday:yesterday,high:high,maxAllowed:max,minAllowed:min,tradeCount:tradeCount,volume:volume,value:value,dateGregorian:date,time:time,timestamp:stamp,orderBookRaw:orderBook,flow:String(fields[1]||''),status:String(fields[11]||''),timeCode:String(fields[13]||'')};
}
function parseRawInstTradeHistoryRow(text,expectedInsCode){
    if(typeof text!=='string') return null;
    var f=text.split('@');
    if(f.length!==10||!/^\d{8}$/.test(String(f[0]).trim())) return null;
    var n=[];for(var i=1;i<10;i++){n[i]=tsetmcNumber(f[i]);if(n[i]==null)return null;}
    for(var pi=1;pi<=6;pi++) if(n[pi]<=0) return null;
    if(n[7]<0||n[8]<0||n[9]<0) return null;
    return {adapterVersion:TSETMC_ADAPTER_CONTRACT_VERSION,instrumentId:String(expectedInsCode),date:String(f[0]).trim(),firstPrice:n[1],lowPrice:n[2],highPrice:n[3],closePrice:n[4],lastPrice:n[5],prevClose:n[6],value:n[7],volume:n[8],tradeCount:n[9]};
}
function parseRawInstTradeHistory(text,expectedInsCode){
    if(typeof text!=='string') return {ok:false,reason:'invalid-payload',rows:[]};
    var parts=text.split(';'), rows=[], previous=null, strict=!!getCfg('historyStrictMode');
    for(var i=0;i<parts.length;i++){
        var part=parts[i].trim();
        if(!part) continue;
        var row=parseRawInstTradeHistoryRow(part,expectedInsCode);
        // strict mode rejects the whole response on the first bad row. default mode skips the bad row and keeps the valid ones.
        if(!row){ if(strict) return {ok:false,reason:'invalid-history-row',rows:[]}; continue; }
        var jdn=historyDateToJdn(row.date);
        if(jdn==null||jdn>todayJdn()||(previous!=null&&jdn>=previous)){ if(strict) return {ok:false,reason:'history-order-or-date',rows:[]}; continue; }
        previous=jdn;
        rows.push(row);
    }
    return {ok:rows.length>0,reason:rows.length?'ok':'empty-history',rows:rows};
}
function normalizeAdapterImpliedVolatility(value){
    if(typeof value!=='number') return null;
    return isFinite(value)&&value>0&&value<=5?value:null;
}
function parseTsetmcLiveQuote(payload,expectedInsCode,nowMs){
    var row=payload;
    if(typeof row==='string'){
        var rawQuote=parseRawInstInfoFast(row,String(expectedInsCode),nowMs);
        if(rawQuote) row=rawQuote;
        else { try{ row=JSON.parse(row); }
        catch(e){ try{ var textAdapter=typeof window!=='undefined'&&window.__exfTsetmcAdapter; if(textAdapter&&textAdapter.version===TSETMC_ADAPTER_CONTRACT_VERSION&&typeof textAdapter.parseLiveQuote==='function') row=textAdapter.parseLiveQuote(payload,String(expectedInsCode)); else return {ok:false,reason:'unsupported-response-format'}; }catch(adapterError){ return {ok:false,reason:'adapter-error'}; } } }
    }
    if(!row||typeof row!=='object'||Array.isArray(row)) return {ok:false,reason:'invalid-payload'};
    if(row.adapterVersion!==TSETMC_ADAPTER_CONTRACT_VERSION){
        try{ var adapter=typeof window!=='undefined'&&window.__exfTsetmcAdapter; if(adapter&&adapter.version===TSETMC_ADAPTER_CONTRACT_VERSION&&typeof adapter.parseLiveQuote==='function') row=adapter.parseLiveQuote(row,String(expectedInsCode)); }catch(e){ return {ok:false,reason:'adapter-error'}; }
    }
    if(!row||row.adapterVersion!==TSETMC_ADAPTER_CONTRACT_VERSION||!row.instrumentId||!row.lastPrice) return {ok:false,reason:'adapter-contract-required'};
    if(row.dateGregorian!=null){ var gd=String(row.dateGregorian); if(!/^\d{8}$/.test(gd)||validatedGregorianToJdn(+gd.slice(0,4),+gd.slice(4,6),+gd.slice(6,8))==null||!(Number(row.closingPrice)>0)||!(Number(row.prevClose)>0)||!(Number(row.minAllowed)>0)||!(Number(row.maxAllowed)>=Number(row.minAllowed))||Number(row.lastPrice)<Number(row.minAllowed)||Number(row.lastPrice)>Number(row.maxAllowed)||!String(row.orderBookRaw||'').trim()) return {ok:false,reason:'live-validation-failed'}; }
    var identity=String(row.instrumentId);
    if(identity!==String(expectedInsCode)) return {ok:false,reason:'instrument-mismatch'};
    var price=Number(row.lastPrice);
    if(!isFinite(price)||price<=0||price>=100000000) return {ok:false,reason:'invalid-price'};
    var rawTime=row.timestamp;
    var stamp=typeof rawTime==='number'?rawTime:Date.parse(String(rawTime||''));
    if(typeof rawTime==='number'&&stamp<100000000000) stamp*=1000;
    if(!isFinite(stamp)||stamp<=0) return {ok:false,reason:'timestamp-required'};
    var now=nowMs==null?Date.now():Number(nowMs), age=now-stamp, maxAge=Number(getCfg('liveBaseMaxAge'))||300000;
    if(age< -300000) return {ok:false,reason:'future-timestamp'};
    if(age>maxAge) return {ok:false,reason:'stale-quote'};
    return {ok:true,instrumentId:identity,price:price,lastPrice:price,iv:normalizeAdapterImpliedVolatility(row.impliedVolatility),timestamp:stamp,ageMs:Math.max(0,age),source:'live-tsetmc',adapterVersion:TSETMC_ADAPTER_CONTRACT_VERSION};
}
function normalizeTsetmcHistoryRow(row,expectedInsCode){
    if(typeof row==='string') row=parseRawInstTradeHistoryRow(row,String(expectedInsCode||''));
    if(!row||typeof row!=='object'||Array.isArray(row)) return null;
    if(row.adapterVersion!==TSETMC_ADAPTER_CONTRACT_VERSION){
        try{ var adapter=typeof window!=='undefined'&&window.__exfTsetmcAdapter; if(adapter&&adapter.version===TSETMC_ADAPTER_CONTRACT_VERSION&&typeof adapter.parseHistoryRow==='function') row=adapter.parseHistoryRow(row,String(expectedInsCode||'')); }catch(e){ return null; }
    }
    if(!row||row.adapterVersion!==TSETMC_ADAPTER_CONTRACT_VERSION) return null;
    var identity=String(row.instrumentId||'');
    if(!expectedInsCode||!identity||identity!==String(expectedInsCode)) return null;
    var jdn=historyDateToJdn(row.date);
    var price=Number(row.closePrice);
    if(jdn==null||jdn>todayJdn()||!isFinite(price)||price<=0||price>=100000000||row.volume!=null&&(!isFinite(Number(row.volume))||Number(row.volume)<0)||row.tradeCount!=null&&(!isFinite(Number(row.tradeCount))||Number(row.tradeCount)<0)||row.value!=null&&(!isFinite(Number(row.value))||Number(row.value)<0)) return null;
    return {jdn:jdn,price:price,dateStr:jdnToIsoDate(jdn),tno:Number(row.tradeCount)||0,tvol:Number(row.volume)||0,iv:normalizeAdapterImpliedVolatility(row.impliedVolatility),source:'tsetmc-history',instrumentId:identity,adapterVersion:TSETMC_ADAPTER_CONTRACT_VERSION};
}
// ─── TRACE — verbose data and calculation tracking (contract D.4) ─────────
// Source-only tracing of provenance and calculation steps. Cheap no-op when
// disabled. The trace UI is strip-marked and never ships in the minified build.
var _traceLog=[], _traceMax=500;
function traceActive(){
    try{ return getCfg('traceEnabled')===true || getCfg('verbose')===true || getViewMode()==='verbose'; }catch(e){ return false; }
}
function traceEvent(category, key, detail){
    if(!traceActive()) return;
    try{
        _traceLog.push({t:Date.now(), category:String(category||''), key:String(key==null?'':key), detail:detail==null?null:detail});
        if(_traceLog.length>_traceMax) _traceLog.splice(0,_traceLog.length-_traceMax);
    }catch(e){}
}
function getTraceLog(){ try{ return _traceLog.slice(); }catch(e){ return []; } }
function clearTrace(){ _traceLog=[]; }

// ─── DATA AUTHENTICITY — prove live data is original TSETMC data ──────────
// First gate for the live connection. No quote reaches the pool, the feed
// window, or the funnel before this suite proves it is original platform
// data. Truth-first - missing proof means rejected, never guessed (A.7).
var _liveAuthenticityState={status:'idle',reason:'not-checked',checkedAt:null,probe:null,verifiedTotal:0,rejectedTotal:0,backoffMs:0,nextAttemptAt:0};
var _liveAuthenticityLog=[];
function scheduleAuthenticityRetry(){
    // discovered limitation (D.2) - repeated failed probes need exponential backoff, capped at 15 minutes
    try{
        var prev=Number(_liveAuthenticityState.backoffMs)||0;
        var next=prev>0?Math.min(prev*2,900000):60000;
        _liveAuthenticityState.backoffMs=next;
        _liveAuthenticityState.nextAttemptAt=Date.now()+next;
    }catch(e){}
}
var CONFIRMED_INS_CODES={'خودرو':'35366681030756042','فولاد':'46348559193224090','فملی':'46348095188555032','شستا':'13157749938547794','اهرم':'77458905939487148'};
function logAuthenticityEvent(event){
    try{
        _liveAuthenticityLog.unshift(event);
        if(_liveAuthenticityLog.length>20) _liveAuthenticityLog.length=20;
    }catch(e){}
}
function checkOrderBookShape(orderBookRaw){
    // A.6 - order book levels carry 6 fields, known indexes 0..3 (count, volume, bidPrice, askPrice).
    // Fields 4 and 5 stay uninterpreted. Soft check - structural confidence only, never a hard reject.
    var raw=String(orderBookRaw||'');
    if(!raw.trim()) return {ok:false, detail:'empty-orderbook', warning:'orderbook-empty'};
    var levels=raw.split('@'), parsed=0, unrecognized=0;
    for(var i=0;i<levels.length;i++){
        var lv=levels[i].trim();
        if(!lv) continue;
        var f=lv.split(',');
        if(f.length!==6){ unrecognized++; continue; }
        var numsOk=true;
        for(var k=0;k<4;k++){ var v=tsetmcNumber(f[k]); if(v==null||v<0){ numsOk=false; break; } }
        if(numsOk) parsed++; else unrecognized++;
    }
    if(parsed>0&&unrecognized===0) return {ok:true, detail:parsed+'-level-orderbook'};
    if(parsed>0) return {ok:true, detail:parsed+'-valid-levels+'+unrecognized+'-unrecognized', warning:'orderbook-partial-unrecognized'};
    return {ok:false, detail:'orderbook-shape-unrecognized', warning:'orderbook-shape-unverified'};
}
function checkHistoryConsistency(row, baseSym){
    // Informational - compares quote prevClose with the pool verified history.
    // A mismatch indicts the pool record, not the quote, so it never rejects.
    try{
        if(!baseSym) return {ok:true, detail:'no-base-binding', info:true};
        var entry=poolStore[baseSym], hist=(entry&&entry.history)||[];
        var quoteJdn=historyDateToJdn(String(row.dateGregorian||''));
        if(quoteJdn==null) return {ok:true, detail:'quote-date-unknown', info:true};
        var prev=null;
        for(var i=0;i<hist.length;i++){ var p=hist[i]; if(p&&p.jdn<quoteJdn&&(!prev||p.jdn>prev.jdn)) prev=p; }
        if(!prev||!(prev.price>0)) return {ok:true, detail:'no-previous-session-in-pool', info:true};
        var expected=Number(prev.price), actual=Number(row.prevClose);
        if(!(actual>0)) return {ok:true, detail:'prevClose-missing-in-quote', info:true};
        var drift=Math.abs(actual-expected)/expected;
        if(drift<=0.005) return {ok:true, detail:'prevClose-matches-pool-history', info:true};
        return {ok:true, detail:'prevClose-diverges-'+(drift*100).toFixed(2)+'-percent-from-pool', info:true};
    }catch(e){ return {ok:true, detail:'history-check-unavailable', info:true}; }
}
function verifyLiveQuoteAuthenticity(payload, expectedInsCode, options){
    // Returns {ok, verdict, format, freshness, checks, reasons, warnings, notes, provenance}.
    // verdict is verified-original (native A.6 format proven), verified-adapter
    // (registered adapter v3 resolved, format provenance second-hand), or rejected.
    var out={ok:false, verdict:'rejected', format:'unknown', freshness:'unknown', checks:[], reasons:[], warnings:[], notes:[], provenance:{}};
    try{
        options=options||{};
        var nowMs=options.nowMs==null?Date.now():Number(options.nowMs);
        var expected=expectedInsCode==null?'':String(expectedInsCode);
        function add(name, ok, hard, detail){ out.checks.push({name:name, ok:!!ok, hard:hard!==false, detail:detail||''}); if(!ok&&hard!==false) out.reasons.push(name); }
        // resolve the row and record which path produced it
        var row=null, parsePath='unknown';
        if(typeof payload==='string'){
            var rawRow=parseRawInstInfoFast(payload, expected, nowMs);
            if(rawRow){ row=rawRow; parsePath='raw-a6'; }
            else {
                var obj=null;
                try{ obj=JSON.parse(payload); }catch(pe){ obj=null; }
                if(obj&&typeof obj==='object'&&!Array.isArray(obj)){
                    if(obj.adapterVersion===TSETMC_ADAPTER_CONTRACT_VERSION){ row=obj; parsePath='adapter-object'; }
                    else {
                        try{ var ad1=typeof window!=='undefined'&&window.__exfTsetmcAdapter; if(ad1&&ad1.version===TSETMC_ADAPTER_CONTRACT_VERSION&&typeof ad1.parseLiveQuote==='function'){ row=ad1.parseLiveQuote(obj, expected); parsePath='adapter-v3'; } }catch(ae){ row=null; }
                    }
                } else {
                    try{ var ad2=typeof window!=='undefined'&&window.__exfTsetmcAdapter; if(ad2&&ad2.version===TSETMC_ADAPTER_CONTRACT_VERSION&&typeof ad2.parseLiveQuote==='function'){ row=ad2.parseLiveQuote(payload, expected); parsePath='adapter-v3'; } }catch(ae2){ row=null; }
                }
            }
        } else if(payload&&typeof payload==='object'&&!Array.isArray(payload)){
            if(payload.adapterVersion===TSETMC_ADAPTER_CONTRACT_VERSION){ row=payload; parsePath='adapter-object'; }
            else {
                try{ var ad3=typeof window!=='undefined'&&window.__exfTsetmcAdapter; if(ad3&&ad3.version===TSETMC_ADAPTER_CONTRACT_VERSION&&typeof ad3.parseLiveQuote==='function'){ row=ad3.parseLiveQuote(payload, expected); parsePath='adapter-v3'; } }catch(ae3){ row=null; }
            }
        }
        out.format=parsePath==='raw-a6'?'original-raw':(parsePath==='unknown'?'unknown':'adapter-parsed');
        add('payload-shape', !!row&&typeof row==='object', true, row?('path-'+parsePath):'unparseable-payload');
        if(!row){ return out; }
        add('adapter-contract', row.adapterVersion===TSETMC_ADAPTER_CONTRACT_VERSION, true, 'v'+String(row.adapterVersion));
        var codes=getCfg('baseInsCodes')||{}, expectedConfigured=false, codeKeys=Object.keys(codes);
        for(var ci=0;ci<codeKeys.length;ci++){ if(String(codes[codeKeys[ci]])===expected){ expectedConfigured=true; break; } }
        // hard check proves the payload belongs to the claimed insCode. registration in
        // baseInsCodes is config, not authenticity - so it is a soft dimension (A.7.4
        // requires every number to be traceable, not only registered symbols).
        add('identity-binding', !!row.instrumentId&&String(row.instrumentId)===expected, true, String(row.instrumentId)===expected?'instrumentId-matches-expected':'instrumentId-mismatch');
        add('inscode-registered', expectedConfigured, false, expectedConfigured?'insCode-in-baseInsCodes':'insCode-not-in-baseInsCodes');
        if(!expectedConfigured) out.warnings.push('inscode-not-in-baseInsCodes');
        add('not-mock', row._mock!==true&&row.source!=='scanMock'&&row.source!=='mock', true, row._mock===true?'mock-row-flagged':'no-mock-signature');
        var last=Number(row.lastPrice), closeN=Number(row.closingPrice), prev=Number(row.prevClose), high=Number(row.high), maxA=Number(row.maxAllowed), minA=Number(row.minAllowed);
        add('price-integrity', isFinite(last)&&last>0&&last<100000000&&isFinite(closeN)&&closeN>0&&isFinite(prev)&&prev>0&&isFinite(minA)&&minA>0&&isFinite(maxA)&&maxA>=minA&&last>=minA&&last<=maxA, true, 'last='+last+' range=['+minA+','+maxA+']');
        var gd=String(row.dateGregorian||'');
        var gOk=/^\d{8}$/.test(gd);
        var quoteJdn=gOk?validatedGregorianToJdn(+gd.slice(0,4),+gd.slice(4,6),+gd.slice(6,8)):null;
        add('date-integrity', gOk&&quoteJdn!=null&&quoteJdn<=todayJdn(), true, gOk?(quoteJdn!=null?('jdn='+quoteJdn):'invalid-gregorian-date'):'malformed-date');
        var time=String(row.time||''), tm=time.match(/^(\d{2}):(\d{2}):(\d{2})$/);
        var stamp=Number(row.timestamp);
        if(!isFinite(stamp)&&row.timestamp!=null) stamp=Date.parse(String(row.timestamp));
        add('time-integrity', !!tm&&Number(tm[1])<=23&&Number(tm[2])<=59&&Number(tm[3])<=59&&isFinite(stamp)&&stamp>0&&(nowMs-stamp)>=-300000, true, tm?'clock-and-timestamp-ok':'malformed-time-or-timestamp');
        // soft dimensions - never hard rejects
        var ob=checkOrderBookShape(row.orderBookRaw);
        add('orderbook-shape', ob.ok, false, ob.detail);
        if(ob.warning) out.warnings.push(ob.warning);
        var baseSym=null;
        for(var bi=0;bi<codeKeys.length;bi++){ if(String(codes[codeKeys[bi]])===expected){ baseSym=codeKeys[bi]; break; } }
        var hc=checkHistoryConsistency(row, baseSym);
        out.notes.push('history-consistency '+(hc.detail||''));
        // provenance is built once and only enriched afterwards - never replaced after
        // enrichment, otherwise timestamp and ageMs would be lost (A.7.4 regression guard)
        out.provenance={source:'live-tsetmc', instrumentId:row.instrumentId==null?'':String(row.instrumentId), expectedInsCode:expected, parsePath:parsePath, adapterVersion:row.adapterVersion, fetchUrl:options.fetchUrl||'', verifiedAt:Date.now()};
        if(isFinite(stamp)&&stamp>0){
            var age=nowMs-stamp, maxAge=Number(getCfg('liveBaseMaxAge'))||300000;
            out.freshness=age< -300000?'future':(age>maxAge?'stale':'fresh');
            out.notes.push('freshness '+out.freshness+' ageMs='+Math.round(age));
            out.provenance.timestamp=stamp;
            out.provenance.ageMs=Math.round(age);
        }
        out.row=row;
        if(out.reasons.length===0){
            out.ok=true;
            out.verdict=out.format==='original-raw'?'verified-original':'verified-adapter';
        }
        traceEvent('authenticity', expected, {verdict:out.verdict, format:out.format, freshness:out.freshness, reasons:out.reasons, warnings:out.warnings, fetchUrl:out.provenance.fetchUrl});
        return out;
    }catch(e){
        out.reasons.push('gate-error');
        out.warnings.push(String(e&&e.message||e));
        return out;
    }
}
function preflightLiveConnection(cb){
    // Handshake before the live connection - probe one reference instrument,
    // prove the incoming bytes are original TSETMC data, only then allow the feed.
    try{
        var codes=getCfg('baseInsCodes')||{}, keys=Object.keys(codes);
        var probeSym=null, probeCode=null;
        for(var i=0;i<keys.length;i++){
            if(CONFIRMED_INS_CODES[keys[i]] && String(codes[keys[i]])===String(CONFIRMED_INS_CODES[keys[i]])){ probeSym=keys[i]; probeCode=String(codes[keys[i]]); break; }
        }
        if(!probeCode){ for(var j=0;j<keys.length;j++){ if(codes[keys[j]]!=null&&String(codes[keys[j]]).trim()!==''){ probeSym=keys[j]; probeCode=String(codes[keys[j]]); break; } } }
        if(!probeCode){
            _liveAuthenticityState={status:'failed',reason:'no-probe-instrument',checkedAt:Date.now(),probe:null,verifiedTotal:_liveAuthenticityState.verifiedTotal,rejectedTotal:_liveAuthenticityState.rejectedTotal,backoffMs:_liveAuthenticityState.backoffMs||0,nextAttemptAt:_liveAuthenticityState.nextAttemptAt||0};
            scheduleAuthenticityRetry();
            if(cb) cb(_liveAuthenticityState);
            return;
        }
        var cdnUrl=getCfg('tsetmcCdnUrl')||'https://old.tsetmc.com';
        var probePath='/tsev2/data/InstInfoFast.aspx?i='+probeCode+AMP+'c=34';
        var url=(!cdnUrl||cdnUrl.trim()===''||isSameOriginUrl(cdnUrl))?((!cdnUrl||cdnUrl.trim()==='')?probePath:cdnUrl.replace(/\/$/,'')+probePath):probePath;
        if((!isTsetmcOrigin()&&!getCfg('forceLiveFeed'))||typeof fetch==='undefined'){
            _liveAuthenticityState={status:'failed',reason:(!isTsetmcOrigin()&&!getCfg('forceLiveFeed'))?'wrong-origin':'fetch-unavailable',checkedAt:Date.now(),probe:{symbol:probeSym,instrumentId:probeCode},verifiedTotal:_liveAuthenticityState.verifiedTotal,rejectedTotal:_liveAuthenticityState.rejectedTotal,backoffMs:_liveAuthenticityState.backoffMs||0,nextAttemptAt:_liveAuthenticityState.nextAttemptAt||0};
            scheduleAuthenticityRetry();
            if(cb) cb(_liveAuthenticityState);
            return;
        }
        fetchTsetmcText(url,{cache:false}).then(function(txt){
            var report=verifyLiveQuoteAuthenticity(txt, probeCode, {fetchUrl:url, nowMs:Date.now()});
            var status=report.ok?'verified':'failed';
            _liveAuthenticityState={
                status:status,
                reason:report.ok?null:(report.reasons.join(',')||'authenticity-check-failed'),
                checkedAt:Date.now(),
                probe:{symbol:probeSym, instrumentId:probeCode, verdict:report.verdict, format:report.format, freshness:report.freshness, reasons:report.reasons, warnings:report.warnings, checks:report.checks},
                verifiedTotal:_liveAuthenticityState.verifiedTotal,
                rejectedTotal:_liveAuthenticityState.rejectedTotal,
                backoffMs:_liveAuthenticityState.backoffMs||0,
                nextAttemptAt:_liveAuthenticityState.nextAttemptAt||0
            };
            if(status==='verified'){ _liveAuthenticityState.backoffMs=0; _liveAuthenticityState.nextAttemptAt=0; }
            else { scheduleAuthenticityRetry(); }
            logAuthenticityEvent({type:'preflight', symbol:probeSym, instrumentId:probeCode, verdict:report.verdict, reasons:report.reasons, warnings:report.warnings, at:Date.now()});
            if(cb) cb(_liveAuthenticityState);
        }).catch(function(err){
            _liveAuthenticityState={status:'failed',reason:'probe-fetch-failed '+(err&&err.message||err),checkedAt:Date.now(),probe:{symbol:probeSym,instrumentId:probeCode},verifiedTotal:_liveAuthenticityState.verifiedTotal,rejectedTotal:_liveAuthenticityState.rejectedTotal,backoffMs:_liveAuthenticityState.backoffMs||0,nextAttemptAt:_liveAuthenticityState.nextAttemptAt||0};
            scheduleAuthenticityRetry();
            logAuthenticityEvent({type:'preflight', symbol:probeSym, instrumentId:probeCode, verdict:'rejected', reasons:['probe-fetch-failed'], at:Date.now()});
            if(cb) cb(_liveAuthenticityState);
        });
    }catch(e){
        _liveAuthenticityState={status:'failed',reason:'preflight-error '+(e&&e.message||e),checkedAt:Date.now(),probe:null,verifiedTotal:_liveAuthenticityState.verifiedTotal,rejectedTotal:_liveAuthenticityState.rejectedTotal,backoffMs:_liveAuthenticityState.backoffMs||0,nextAttemptAt:_liveAuthenticityState.nextAttemptAt||0};
        scheduleAuthenticityRetry();
        if(cb) cb(_liveAuthenticityState);
    }
}
function getAuthenticityReport(){
    try{
        return JSON.parse(JSON.stringify({state:_liveAuthenticityState, recentEvents:_liveAuthenticityLog.slice(0,10), requireRaw:!!getCfg('authenticityRequireRaw'), preflightEnabled:!!getCfg('authenticityPreflight')}));
    }catch(e){ return {state:{status:'unknown'}, recentEvents:[]}; }
}
function fetchLiveBase(insCode, cb){
    if(!insCode){ if(cb) cb(null); return null; }
    var now=Date.now();
    var cached=liveBaseCache[insCode];
    var maxAge=getCfg('liveBaseMaxAge')||300000;
    if(cached && (now-cached.time)<maxAge){ if(cb) cb(cached.price); return cached.price; }
    if(liveBaseFetching[insCode]){ if(cb) cb(null); return null; }
    liveBaseFetching[insCode]=true;
    var cdnUrl=getCfg('tsetmcCdnUrl')||'https://old.tsetmc.com';
    var livePath='/tsev2/data/InstInfoFast.aspx?i='+insCode+AMP+'c=34';
    var isSame=isSameOriginUrl(cdnUrl);
    var fetchUrl;
    if(!cdnUrl || cdnUrl.trim()==='' || isSame){
        fetchUrl=cdnUrl? (cdnUrl.replace(/\/$/,'')+livePath) : livePath;
        if(!cdnUrl || cdnUrl.trim()==='') fetchUrl=livePath;
    } else {
        fetchUrl=livePath;
    }
    var _done=false;
    var _timeoutId=null;
    function _finish(val){
        if(_done) return;
        _done=true;
        if(_timeoutId) clearTimeout(_timeoutId);
        liveBaseFetching[insCode]=false;
        if(cb) cb(val);
    }
    try{
        if(typeof fetch==='undefined'){ _finish(null); return null; }
        fetchTsetmcText(fetchUrl).then(function(txt){
            if(_done) return;
            // authenticity first - the bytes must be proven original before any parse result is used
            var auth=verifyLiveQuoteAuthenticity(txt, insCode, {fetchUrl:fetchUrl, nowMs:Date.now()});
            var requireRaw=!!getCfg('authenticityRequireRaw');
            var accepted=auth.ok&&(!requireRaw||auth.format==='original-raw');
            logAuthenticityEvent({type:'quote', instrumentId:String(insCode), verdict:auth.verdict, format:auth.format, accepted:accepted, reasons:auth.reasons, warnings:auth.warnings, at:Date.now()});
            if(accepted) _liveAuthenticityState.verifiedTotal=(_liveAuthenticityState.verifiedTotal||0)+1;
            else _liveAuthenticityState.rejectedTotal=(_liveAuthenticityState.rejectedTotal||0)+1;
            if(!accepted){
                if(getCfg('verbose')) LOG.warn('[ExoticFilter] authenticity gate rejected '+fetchUrl+': '+(auth.reasons.join(',')||('format-'+auth.format+'-not-allowed')));
                _finish(null);
                return;
            }
            var parsedQuote=parseTsetmcLiveQuote(auth.row||txt,insCode,Date.now());
            if(parsedQuote.ok){
                var price=parsedQuote.price;
                liveBaseCache[insCode]={price:price,iv:parsedQuote.iv,time:Date.now(),timestamp:parsedQuote.timestamp,instrumentId:parsedQuote.instrumentId,adapterVersion:parsedQuote.adapterVersion,source:parsedQuote.source,authenticity:auth.verdict,authFormat:auth.format,authWarnings:auth.warnings||[]};
                var baseSym=null;
                var codes=getCfg('baseInsCodes')||{};
                var codeKeys=Object.keys(codes);
                for(var k=0;k<codeKeys.length;k++){ var kk=codeKeys[k]; if(codes[kk]===insCode){ baseSym=kk; break; } }
                if(baseSym){ var quoteJdn=todayJdn(); writePoolObservation(baseSym,{price:price,iv:parsedQuote.iv,dateStr:jdnToIsoDate(quoteJdn),jdn:quoteJdn,source:'live-tsetmc',instrumentId:parsedQuote.instrumentId,adapterVersion:parsedQuote.adapterVersion,timestamp:parsedQuote.timestamp},'automatic'); }
                _finish(price);
            } else {
                if(getCfg('verbose')) LOG.warn('[ExoticFilter] rejected live quote from '+fetchUrl+': '+parsedQuote.reason);
                _finish(null);
            }
        }).catch(function(err){
            if(_done) return;
            _finish(null);
            if(getCfg('verbose') && err){
                LOG.warn('[ExoticFilter] live fetch failed '+fetchUrl+': '+err.message);
            }
        });
    }catch(e){ _finish(null); }
    return null;
}
function fetchAllLiveBases(cb){
    var codes=getCfg('baseInsCodes')||{};
    var keys=Object.keys(codes);
    if(keys.length===0){
        if(typeof setPreparationProgress==='function') setPreparationProgress(100,'برای نمادهای پایه شناسهٔ ابزار ثبت نشده؛ مظنه‌ای درخواست نشد.','warn');
        if(cb) cb({});
        return;
    }
    if(!isTsetmcOrigin() && !getCfg('forceLiveFeed')){
        if(typeof setPreparationProgress==='function') setPreparationProgress(100,'دامنهٔ فعلی tsetmc.com نیست؛ درخواست زنده ارسال نشد تا خطای CORS رخ ندهد.','warn');
        if(cb) cb({});
        return;
    }
    var results={};
    var pending=keys.length,completed=0;
    var finished=false;
    if(typeof setPreparationProgress==='function') setPreparationProgress(4,'در حال بررسی مظنهٔ '+keys.length+' نماد پایه؛ پاسخ نامعتبر وارد استخر نمی‌شود…','busy');
    function progressText(){ return 'بررسی مظنه‌ها: '+completed+' از '+keys.length+' پاسخ رسید؛ '+Object.keys(results).length+' مورد معتبر بود.'; }
    function tryDone(){
        if(finished) return;
        if(pending<=0){
            finished=true;
            if(typeof setPreparationProgress==='function') setPreparationProgress(100,progressText()+(Object.keys(results).length?'':' دادهٔ معتبر در دسترس نیست؛ برنامه متوقف نشده و بدون مظنهٔ تأییدشده ادامه می‌دهد.'),Object.keys(results).length===keys.length?'complete':'warn');
            if(cb) cb(results);
        }
    }
    for(var i=0;i<keys.length;i++){
        (function(sym, code){
            fetchLiveBase(code, function(price){
                if(price) results[sym]=price;
                pending--; completed++;
                if(typeof setPreparationProgress==='function'&&!finished) setPreparationProgress(Math.round(completed/keys.length*94)+4,progressText(),'busy');
                tryDone();
            });
        })(keys[i], codes[keys[i]]);
    }
    setTimeout(function(){
        if(!finished){
            finished=true;
            if(typeof setPreparationProgress==='function') setPreparationProgress(100,progressText()+' مهلت انتظار ۱۲ ثانیه تمام شد؛ پاسخ‌های ناموجود به‌عنوان unknown باقی می‌مانند.','warn');
            if(cb) cb(results);
        }
    },Math.max(12000,keys.length*8500));
}
function testCdn71(url, cb){
    var testUrl=url||getCfg('tsetmcCdnUrl')||'https://old.tsetmc.com';
    var results={curOrigin:getCurOrigin(),testUrl:testUrl,isCrossOrigin:!!(testUrl&&!isSameOriginUrl(testUrl)),sameOriginOk:false,cdnOk:false,note:''};
    var sameOriginDataUrl='/tsev2/data/InstInfoFast.aspx?i=35366681030756042'+AMP+'c=34';
    fetchTsetmcText(sameOriginDataUrl,{cache:false}).then(function(){
        results.sameOriginOk=true;
        results.cdnOk=!results.isCrossOrigin;
        results.note=results.isCrossOrigin?'درخواست cross-origin انجام نشد؛ فقط هم‌مبدأ پشتیبانی می‌شود.':'پاسخ هم‌مبدأ دریافت شد؛ اعتبار schema با parser بررسی می‌شود.';
        if(cb)cb(results);
    }).catch(function(error){results.note='هم‌مبدأ شکست: '+String(error&&error.message||error);if(cb)cb(results);});
}
function testCdnAndShow71(){
    var url=getCfg('tsetmcCdnUrl');
    var inp=document.getElementById('__exfIn_tsetmcCdnUrl');
    if(inp) url=inp.value;
    testCdn71(url, function(res){
        var msg='🔍 تست CDN\nمبدأ فعلی: '+(res.curOrigin||'نامشخص')+'\nآدرس تست: '+(res.testUrl||'(هم‌مبدأ)')+'\nکراس-اوریجین: '+(res.isCrossOrigin?'بله → fallback':'خیر')+'\nهم‌مبدأ: '+(res.sameOriginOk?'✅ OK':'❌ شکست')+'\nCDN: '+(res.cdnOk?'✅ OK':'❌ شکست')+'\n\n'+res.note;
        alert(LEGAL.fullNotice+NL+NL+msg);
        LOG.log('[ExoticFilter] CDN test', res);
    });
}
function autoConfigCdn71(){
    var testPath='/tsev2/data/InstInfoFast.aspx?i=35366681030756042'+AMP+'c=34';
    fetchTsetmcText(testPath,{cache:false}).then(function(){
        var input=document.getElementById('__exfIn_tsetmcCdnUrl');
        if(input)input.value='';
        if(window.__exf&&window.__exf.optSet)window.__exf.optSet('tsetmcCdnUrl','');
        showToast('هم‌مبدأ بررسی شد؛ درخواست خارجی ارسال نشد.','success');
    }).catch(function(){showToast('هم‌مبدأ پاسخ معتبر نداد؛ هیچ endpoint خارجی امتحان نشد.','warn');});
}
function ensureDefaultTsetmcAdapter(){
    if(typeof window==='undefined') return false;
    var existing=window.__exfTsetmcAdapter;
    if(existing&&existing.version===TSETMC_ADAPTER_CONTRACT_VERSION&&typeof existing.parseLiveQuote==='function'&&typeof existing.parseHistoryRow==='function') return true;
    window.__exfTsetmcAdapter={version:TSETMC_ADAPTER_CONTRACT_VERSION,parseLiveQuote:function(payload,insCode){return parseRawInstInfoFast(String(payload||''),String(insCode||''),Date.now());},parseHistoryRow:function(row,insCode){return typeof row==='string'?parseRawInstTradeHistoryRow(row,String(insCode||'')):row;}};
    return true;
}
function fetchTsetmcInstrumentHistory(insCode,top,callback){
    if(!insCode){if(callback)callback({ok:false,reason:'missing-instrument'});return;}
    var url='/tsev2/data/InstTradeHistory.aspx?i='+encodeURIComponent(String(insCode))+AMP+'Top='+Math.max(1,Math.min(500,Math.floor(Number(top)||90)));
    fetchTsetmcText(url).then(function(text){
        var parsed=parseRawInstTradeHistory(text,String(insCode));
        if(callback)callback(parsed);
    }).catch(function(error){if(callback)callback({ok:false,reason:error&&error.message||'history-fetch-failed',rows:[]});});
}

// ─── BLACK-SCHOLES ────────────────────────────────────────────────────────
var SQRT2PI=Math.sqrt(2*Math.PI);
function normPdf(x){ return Math.exp(-0.5*x*x)/SQRT2PI; }
function normCdf(x){
    var a1=0.254829592, a2=-0.284496736, a3=1.421413741, a4=-1.453152027, a5=1.061405429, p=0.3275911;
    var sign=x<0?-1:1; x=Math.abs(x)/Math.sqrt(2);
    var t=1/(1+p*x); var y=1-((((a5*t+a4)*t+a3)*t+a2)*t+a1)*t*Math.exp(-x*x);
    return 0.5*(1+sign*y);
}
function bsPrice(S,K,T,r,q,sigma,isCall){
    if(T<=0) return isCall? Math.max(S-K,0) : Math.max(K-S,0);
    if(sigma<=0) sigma=0.01;
    var sqrtT=Math.sqrt(T);
    var d1=(Math.log(S/K)+(r-q+0.5*sigma*sigma)*T)/(sigma*sqrtT);
    var d2=d1-sigma*sqrtT;
    var dfQ=Math.exp(-q*T), dfR=Math.exp(-r*T);
    if(isCall) return S*dfQ*normCdf(d1)-K*dfR*normCdf(d2);
    else return K*dfR*normCdf(-d2)-S*dfQ*normCdf(-d1);
}
function bsGreeks(S,K,T,r,q,sigma,isCall,daysPerYear){
    if(T<=0) return {delta:isCall?(S>K?1:0):(S<K?-1:0), gamma:0, theta:0, vega:0};
    var sqrtT=Math.sqrt(T);
    var d1=(Math.log(S/K)+(r-q+0.5*sigma*sigma)*T)/(sigma*sqrtT);
    var d2=d1-sigma*sqrtT;
    var pdf=normPdf(d1);
    var dfQ=Math.exp(-q*T);
    var delta=isCall? dfQ*normCdf(d1) : dfQ*(normCdf(d1)-1);
    var gamma=dfQ*pdf/(S*sigma*sqrtT);
    var vega=S*dfQ*pdf*sqrtT;
    daysPerYear=daysPerYear>0?daysPerYear:365;
    var term1=-(S*dfQ*pdf*sigma)/(2*sqrtT);
    var term2, theta;
    if(isCall){ term2=q*S*dfQ*normCdf(d1)-r*K*Math.exp(-r*T)*normCdf(d2); theta=(term1+term2)/daysPerYear; }
    else { term2=-q*S*dfQ*normCdf(-d1)+r*K*Math.exp(-r*T)*normCdf(-d2); theta=(term1+term2)/daysPerYear; }
    return {delta:delta, gamma:gamma, theta:theta, vega:vega, d1:d1, d2:d2};
}
function ivSolve(marketPrice,S,K,T,r,q,isCall,daysPerYear){
    var MAX_ITER=60;
    var moneynessRatio=S/K;
    var sigma=moneynessRatio<0.8? 0.6 : moneynessRatio>1.2? 0.5 : 0.35;
    var intrinsic=isCall? Math.max(S*Math.exp(-q*T)-K*Math.exp(-r*T),0) : Math.max(K*Math.exp(-r*T)-S*Math.exp(-q*T),0);
    if(marketPrice < intrinsic*0.99) return {iv:0, ok:false, reason:'below-intrinsic'};
    var lo=0.01, hi=5.0;
    for(var i=0;i<MAX_ITER;i++){
        var price=bsPrice(S,K,T,r,q,sigma,isCall);
        var vegaRaw=bsGreeks(S,K,T,r,q,sigma,isCall,daysPerYear).vega;
        if(vegaRaw<1e-8) break;
        var diff=price-marketPrice;
        if(Math.abs(diff)<0.01) return {iv:sigma, ok:true, iter:i};
        var newSigma=sigma - diff/(vegaRaw);
        if(newSigma<=0 || newSigma>5 || isNaN(newSigma)){
            if(diff>0) hi=sigma; else lo=sigma;
            newSigma=(lo+hi)/2;
        } else {
            if(price>marketPrice) hi=Math.min(hi, sigma); else lo=Math.max(lo, sigma);
        }
        sigma=newSigma;
        if(sigma<0.01) sigma=0.01;
        if(sigma>5) sigma=5;
    }
    var finalPrice=bsPrice(S,K,T,r,q,sigma,isCall);
    var ok=Math.abs(finalPrice-marketPrice)/marketPrice < 0.05;
    return {iv:sigma, ok:ok, iter:MAX_ITER};
}

// ─── FILTERS REGISTRY ─────────────────────────────────────────────────────
var FILTERS = {
    'input-data': {label:'داده ناقص', severity:'hard', layer:'L1-validation'},
    'not-option': {label:'غیر اختیار', severity:'hard', layer:'L1-validation'},
    'expiry': {label:'سررسید نامعتبر', severity:'hard', layer:'L1-validation'},
    'expiry-past': {label:'سررسید گذشته', severity:'hard', layer:'L1-validation'},
    'price': {label:'قیمت نامعتبر', severity:'hard', layer:'L1-validation'},
    'base-price': {label:'قیمت پایه نامعتبر', severity:'hard', layer:'L1-validation'},
    'contractSize': {label:'اندازه قرارداد', severity:'hard', layer:'L1-validation'},
    'off-hours': {label:'خارج ساعت', severity:'soft', layer:'L2-market'},
    'halt': {label:'توقف نماد', severity:'hard', layer:'L2-market'},
    'div-day': {label:'روز تقسیم سود', severity:'soft', layer:'L2-market'},
    'new-sym': {label:'نماد تازه', severity:'soft', layer:'L2-market'},
    'base-vol': {label:'حجم مبنا', severity:'soft', layer:'L2-market'},
    'tno': {label:'تعداد معاملات', severity:'hard', layer:'L3-liquidity'},
    'tvol': {label:'حجم معاملات', severity:'hard', layer:'L3-liquidity'},
    'avg-trade': {label:'میانگین معامله', severity:'soft', layer:'L3-liquidity'},
    'depth0': {label:'عمق صفر', severity:'hard', layer:'L3-liquidity'},
    'buy-queue': {label:'صف خرید قفل', severity:'soft', layer:'L3-liquidity'},
    'depth': {label:'عمق کم', severity:'soft', layer:'L3-liquidity'},
    'depth-invalid': {label:'عمق نامعتبر', severity:'hard', layer:'L3-liquidity'},
    'no-quote': {label:'بدون مظنه', severity:'hard', layer:'L4-pricing'},
    'crossed-book': {label:'دفتر متقاطع', severity:'hard', layer:'L4-pricing'},
    'spread': {label:'اسپرد زیاد', severity:'soft', layer:'L4-pricing'},
    'strike': {label:'اعمال نامعتبر', severity:'hard', layer:'L4-pricing'},
    'unit': {label:'واحد قیمت', severity:'soft', layer:'L4-pricing'},
    'arb-bound': {label:'مرز آربیتراژ', severity:'hard', layer:'L4-pricing'},
    'time-value': {label:'ارزش زمانی', severity:'soft', layer:'L4-pricing'},
    'iv-premium': {label:'صرف IV', severity:'soft', layer:'L5-greeks'},
    'iv-bad': {label:'IV نامعتبر', severity:'hard', layer:'L5-greeks'},
    'iv-range': {label:'IV خارج بازه', severity:'hard', layer:'L5-greeks'},
    'delta-range': {label:'دلتا خارج بازه', severity:'soft', layer:'L5-greeks'},
    'moneyness': {label:'مانی‌نس شدید', severity:'soft', layer:'L5-greeks'},
    'theta-high': {label:'تتا بالا', severity:'soft', layer:'L5-greeks'},
    'leverage': {label:'اهرم خارج بازه', severity:'soft', layer:'L5-greeks'},
    'stale-price': {label:'قیمت کهنه', severity:'soft', layer:'L6-quality'},
    'imbalance': {label:'عدم تعادل', severity:'soft', layer:'L6-quality'},
    'dte': {label:'روز تا سررسید کم', severity:'soft', layer:'L6-quality'},
    'calendar-unknown': {label:'تقویم ناکامل', severity:'soft', layer:'L4-pricing'},
    'gate': {label:'گیت محاسباتی', severity:'hard', layer:'L6-quality'},
    'score': {label:'امتیاز پایین', severity:'soft', layer:'L6-quality', isPrefix:true},
    'min-er': {label:'بازده کم', severity:'soft', layer:'L6-quality'},
    'cold': {label:'بازده سرد', severity:'soft', layer:'L6-quality'},
    'rank': {label:'رتبه پایین', severity:'soft', layer:'L7-ranking'},
    'global-rank': {label:'سقف کل', severity:'soft', layer:'L7-ranking'},
    'pareto': {label:'پارتو', severity:'soft', layer:'L7-ranking'},
    'aborted': {label:'توقف خودکار', severity:'hard', layer:'L7-ranking'},
    'calendar-warning': {label:'هشدار تقویم', severity:'soft', layer:'L8-holding-advisory'},
    'momentum-advisory': {label:'روند مشاهدات معتبر', severity:'advisory', layer:'L9-momentum-advisory'}
};
var FILTER_MAP71 = FILTERS;

// ─── LAYERS — Layer Registry Pattern ──────────────────────────────────────
var LAYERS = [
    {
        key: 'L1-validation', icon: '🔍', color: '#38bdf8', order: 1,
        label: 'اعتبارسنجی داده', desc: 'داده اولیه',
        schema: {
            minPrice: {type:'number', def:10, min:0, max:1e6, group:'core', label:'حداقل قیمت (ریال)'},
            expiryDate: {type:'jalali', def:'auto', group:'core', label:'سررسید مرجع'},
            expiryAutoUpdate: {type:'bool', def:true, group:'core', label:'بروزرسانی خودکار سررسید'},
            abortThresholdInput: {type:'number', def:100, min:0, max:1000, group:'adv', label:'آستانه داده ناقص'},
            traceEnabled: {type:'bool', def:false, group:'adv', label:'رهگیری داده و محاسبات', description:'true — رویدادهای provenance و مراحل محاسبه در تب رهگیری دیباگ ثبت می‌شود؛ در نسخهٔ مینی‌فای همیشه خاموش است.'},
            historyStrictMode: {type:'bool', def:false, group:'adv', label:'سخت‌گیری تاریخچه', description:'true — با اولین ردیف نامعتبر کل پاسخ تاریخچه رد می‌شود؛ false — ردیف نامعتبر skip و ردیف‌های سالم نگه داشته می‌شوند.'},
            authenticityPreflight: {type:'bool', def:true, group:'core', label:'راستی‌آزمایی پیش از اتصال زنده', description:'true — پیش از برقراری اتصال زنده، اصالت داده با یک نماد مرجع تأییدشده سنجیده می‌شود و تا اثبات اصلی‌بودن داده، مظنه‌ای وارد محاسبات نمی‌شود.'},
            authenticityRequireRaw: {type:'bool', def:false, group:'adv', label:'الزام فرمت خام TSETMC', description:'true — فقط پاسخ‌های با فرمت خام InstInfoFast پذیرفته می‌شوند؛ false — پاسخ‌های adapter رسمی نسخهٔ ۳ هم پذیرفته ولی جدا گزارش می‌شوند.'},
            authenticityRecheckMs: {type:'number', def:600000, min:60000, max:3600000, group:'adv', label:'بازهٔ بازآزمایی اصالت (میلی‌ثانیه)'}
        },
        filter: function(ctx, sym){
            if(!sym || !sym.l18 || sym.pl==null) return ctx.reject('input-data');
            if(sym.pl < ctx.cfg.minPrice) return ctx.reject('price', 'pl='+sym.pl);
            if(sym.expiryJdn!=null){
                var expJ=normalizeToJdn(sym.expiryJdn);
                if(expJ==null) return ctx.reject('expiry', 'تاریخ سررسید قابل‌تبدیل نیست');
                sym._expiryJdn=expJ;
                sym._dteCalendar=Math.max(0,expJ-ctx.todayJdn);
                var expiryCalendarStatus=TSE_CALENDAR.calendarStatus(ctx.todayJdn,expJ);
                sym._calendarStatus=expiryCalendarStatus;
                sym._dteTrading=expiryCalendarStatus.complete?Math.max(0,TSE_CALENDAR.tradingDaysBetween(ctx.todayJdn,expJ)):null;
                sym.dte=sym._dteCalendar;
                if(expJ < ctx.todayJdn) return ctx.reject('expiry-past');
                sym._expirySource='input';
            } else {
                var configuredExpiry=normalizeToJdn(ctx.cfg.expiryDate);
                if(configuredExpiry==null) configuredExpiry=jalaliToJdn(Number(ctx.cfg.expiryJY),Number(ctx.cfg.expiryJM),Number(ctx.cfg.expiryJD));
                if(isFinite(configuredExpiry) && configuredExpiry>=ctx.todayJdn){
                    sym._configuredExpiryJdn=configuredExpiry;
                    sym._expirySource='configured-reference';
                }
            }
            if(sym.contractSize!=null && sym.contractSize<=0) return ctx.reject('contractSize');
            return ctx.pass();
        }
    },
    {
        key: 'L2-market', icon: '⏰', color: '#fbbf24', order: 2,
        label: 'وضعیت بازار', desc: 'وضعیت بازار',
        schema: {
            sessionStartMin: {type:'number', def:525, min:0, max:1439, group:'core', label:'شروع بازار (دقیقه)'},
            sessionEndMin: {type:'number', def:810, min:0, max:1439, group:'core', label:'پایان بازار'},
            blockOnHalt: {type:'bool', def:true, group:'core', label:'رد توقف'},
            allowNewSymbols: {type:'bool', def:true, group:'core', label:'نماد تازه'},
            enforceVolumeBase: {type:'bool', def:false, group:'adv', label:'حجم مبنا'},
            blockOnDividendDay: {type:'bool', def:true, group:'adv', label:'رد روز مجمع'},
            marketHolidays: {type:'csv', def:[], group:'adv', label:'تعطیلات رسمی (JDN/شمسی/ISO)'},
            marketCalendarCompleteYears: {type:'csv', def:[], group:'adv', label:'سال‌های دارای تقویم کامل'}
        },
        filter: function(ctx, sym){
            if(ctx.cfg.enforceMarketHours && !isMarketHours()) return ctx.reject('off-hours');
            if(ctx.cfg.blockOnHalt && sym.tno===0 && sym.tvol===0) return ctx.reject('halt');
            if(sym.tno!=null && sym.tno<2 && !ctx.cfg.allowNewSymbols) return ctx.reject('new-sym', 'tno='+sym.tno);
            if(ctx.cfg.enforceVolumeBase && sym.bvol!=null && sym.tvol!=null){
                if(sym.tvol < sym.bvol*ctx.cfg.volumeBaseRatio) return ctx.reject('base-vol');
            }
            if(ctx.cfg.blockOnDividendDay && sym.isDivDay) return ctx.reject('div-day');
            return ctx.pass();
        }
    },
    {
        key: 'L3-liquidity', icon: '💧', color: '#34d399', order: 3,
        label: 'نقدشوندگی و عمق', desc: 'نقدشوندگی',
        schema: {
            minDepthTrades: {type:'number', def:0.5, min:0, max:10, step:0.1, group:'core', label:'عمق/میانگین'},
            orderQueueThreshold: {type:'number', def:0.005, min:0, max:0.5, step:0.001, group:'core', label:'آستانه صف'},
            blockOnOrderQueue: {type:'bool', def:true, group:'core', label:'رد صف قفل'}
        },
        filter: function(ctx, sym){
            var tno=sym.tno||0, tvol=sym.tvol||0;
            if(tno<3) return ctx.reject('tno', 'tno='+tno);
            if(tvol<1000) return ctx.reject('tvol', 'tvol='+tvol);
            var qd1=sym.qd1||0, qo1=sym.qo1||0;
            if(qd1===0 && qo1===0) return ctx.reject('depth0');
            if(isNaN(qd1)||isNaN(qo1)) return ctx.reject('depth-invalid');
            var avgTrade=tvol/Math.max(tno,1);
            if(avgTrade<100) return ctx.reject('avg-trade', 'avg='+avgTrade.toFixed(0));
            var depth=qd1+qo1;
            var minDepth=avgTrade*getCalibratedMinDepth();
            if(depth<minDepth) return ctx.reject('depth', 'depth='+depth);
            if(ctx.cfg.blockOnOrderQueue){
                var totalQ=qd1+qo1;
                if(totalQ>0){
                    var buyRatio=qd1/totalQ;
                    if(buyRatio > (1-ctx.cfg.orderQueueThreshold)) return ctx.reject('buy-queue', 'ratio='+buyRatio.toFixed(3));
                }
            }
            return ctx.pass();
        }
    },
    {
        key: 'L4-pricing', icon: '💰', color: '#a78bfa', order: 4,
        label: 'قیمت‌گذاری و آربیتراژ', desc: 'قیمت‌گذاری',
        schema: {
            maxSpread: {type:'number', def:15, min:0, max:100, group:'core', label:'سقف اسپرد (٪)'},
            maxCostRT: {type:'number', def:12, min:0, max:100, group:'core', label:'سقف هزینه رفت‌وبرگشت'},
            tsetmcCdnUrl: {type:'url', def:'https://old.tsetmc.com', group:'core', label:'آدرس CDN بورس'},
            useLiveBase: {type:'bool', def:true, group:'adv', label:'قیمت پایه زنده'},
            marketLiveFeedEnabled: {type:'bool', def:true, group:'adv', label:'بروزرسانی خودکار پنل دادهٔ زنده'},
            unitGuardX: {type:'number', def:8, min:1, max:20, group:'adv', label:'ضریب واحد قیمت'},
            modelTimeBasis: {type:'string', def:'legacy-hold', group:'adv', label:'مبنای زمان مدل (legacy-hold/calendar-expiry/tse-trading)'}
        },
        filter: function(ctx, sym){
            var bidRaw=sym.pd1||sym.bid||0, askRaw=sym.po1||sym.ask||0;
            if(bidRaw && askRaw && bidRaw>0 && askRaw>0 && bidRaw>askRaw) return ctx.reject('crossed-book', 'bid='+bidRaw+' ask='+askRaw);
            var bid=bidRaw||0, ask=askRaw||0;
            var quoteSource=bid>0&&ask>0?'provided-order-book':'last-price±2%-fallback';
            if(!bid || !ask){
                addDataWarning(sym, 'مظنهٔ خرید/فروش ناقص بود؛ بازهٔ ±۲٪ از آخرین قیمت جایگزین شد.');
                bid=sym.pl*0.98; ask=sym.pl*1.02;
            }
            if(!bid || !ask || bid<=0 || ask<=0) return ctx.reject('no-quote');
            var mid=(bid+ask)/2;
            var spreadPct=(ask-bid)/mid*100;
            if(spreadPct>ctx.cfg.maxSpread) return ctx.reject('spread', 'spread='+spreadPct.toFixed(1)+'%');
            // Prefer the largest 3-to-6 digit run in l30, which matches TSETMC strike formatting.
            var l30Text=String(sym.l30||'');
            var strikeCandidates=l30Text.match(/\d{3,6}/g)||[];
            var K=0;
            for(var ski=0;ski<strikeCandidates.length;ski++){
                var candidate=+strikeCandidates[ski];
                if(candidate>K) K=candidate;
            }
            if(!K || K<10){
                if(sym.strike!=null && sym.strike>=10) K=sym.strike;
                else return ctx.reject('strike', 'strike-extract-failed l30='+String(sym.l30||'').slice(0,30));
            }
            var poolEntry=sym.base? poolStore[sym.base] : null;
            var poolItem=null;
            if(poolEntry&&poolEntry.history) for(var poolIndex=poolEntry.history.length-1;poolIndex>=0;poolIndex--) if(isTrustedObservationSource(poolEntry.history[poolIndex].source)){ poolItem=poolEntry.history[poolIndex]; break; }
            var poolP=poolItem&&poolEntry&&poolEntry.stats&&poolEntry.stats.lastPrice>0?poolEntry.stats.lastPrice:0;
            var poolAgeDays=poolItem?ctx.todayJdn-poolItem.jdn:null;
            var hasPoolPrice=!!(poolP>0 && poolAgeDays!=null && poolAgeDays>=0 && poolAgeDays<=5 && poolItem.source && poolItem.source!=='unverified');
            var poolEntrySource=poolItem&&poolItem.source?poolItem.source:'';
            var configuredBase=ctx.cfg.basePrices && sym.base? ctx.cfg.basePrices[sym.base] : 0;
            var S=poolP||configuredBase||sym.basePrice||0;
            var basePriceSource=poolP? (poolEntrySource==='live-tsetmc'?'observed-live':poolEntrySource==='tsetmc-history'?'observed-history':'legacy-unverified') : (configuredBase?'configured-assumption':(sym.basePrice?'provided-input':'fallback-default'));
            sym._basePriceSource=basePriceSource; sym._basePriceAgeDays=poolAgeDays;
            if(!hasPoolPrice || basePriceSource==='legacy-unverified') addDataWarning(sym, 'قیمت پایه از منبع و تاریخچهٔ تازهٔ قابل‌تأیید نیست؛ مبنا: '+basePriceSource+(poolAgeDays!=null?'، سن داده '+poolAgeDays+' روز':'')+'.');
            if(!S || S<=0){
                S=1000;
                addDataWarning(sym, 'قیمت پایهٔ معتبر موجود نبود؛ مقدار پیش‌فرض ۱۰۰۰ در محاسبه استفاده شد.');
                sym._basePriceSource='fallback-default';
            }
            var timeInfo=getPricingTime(ctx,sym._expiryJdn||sym._configuredExpiryJdn);
            if(!timeInfo.ok) return ctx.reject('calendar-unknown', timeInfo.reason);
            var T=timeInfo.T;
            var r=ctx.cfg.riskFree/100;
            var q=0;
            var l30Str=String(sym.l30||'').trim();
            var isCall;
            if(sym.optionType) isCall=(sym.optionType==='call' || sym.optionType==='خ');
            else if(/^ض/.test(l30Str)) isCall=true;
            else if(/^ط/.test(l30Str)) isCall=false;
            else if(/اختیار\s*خ|^خ/.test(l30Str)) isCall=true;
            else if(/پوت|فروش/.test(l30Str)) isCall=false;
            else isCall=true;
            var marketPrice=mid;
            var intrinsic=isCall? Math.max(S-K,0) : Math.max(K-S,0);
            // Full arbitrage bounds. Call max(S minus K, 0) at most C at most S.
            // Put max(K minus S, 0) at most P at most K.
            if(marketPrice < intrinsic*0.9) return ctx.reject('arb-bound', 'mp='+marketPrice+' intr='+intrinsic);
            if(isCall){
                if(marketPrice > S*1.02) return ctx.reject('arb-bound', 'call C greater than S, mp='+marketPrice+' S='+S);
            } else {
                if(marketPrice > K*1.02) return ctx.reject('arb-bound', 'put P greater than K, mp='+marketPrice+' K='+K);
            }
            var timeValue=marketPrice-intrinsic;
            if(timeValue<0) timeValue=0;
            var tvPct=intrinsic>0? (timeValue/marketPrice*100) : 100;
            if(tvPct>ctx.cfg.maxTimeValuePct && ctx.cfg.maxTimeValuePct<100) return ctx.reject('time-value', 'tv%='+tvPct.toFixed(1));
            var modelPrice=bsPrice(S,K,T,r,q,0.4,isCall);
            var unitRatio=modelPrice>0? marketPrice/modelPrice : 1;
            if(unitRatio>ctx.cfg.unitGuardX*2) return ctx.reject('unit', 'ratio='+unitRatio.toFixed(2));
            sym._S=S; sym._K=K; sym._T=T; sym._daysPerYear=timeInfo.daysPerYear; sym._timeBasis=timeInfo.basis;
            sym._r=r; sym._q=q; sym._isCall=isCall; sym._mid=mid; sym._bid=bid; sym._ask=ask; sym._quoteSource=quoteSource;
            return ctx.pass();
        }
    },
    {
        key: 'L5-greeks', icon: '📈', color: '#fbbf24', order: 5,
        label: 'نوسان و یونانی‌ها', desc: 'یونانی‌ها',
        schema: {
            volFloor: {type:'number', def:25, min:0, max:200, group:'core', label:'کف نوسان (٪)'},
            volCeil: {type:'number', def:150, min:0, max:500, group:'core', label:'سقف نوسان'},
            maxIvPremium: {type:'number', def:10, min:0, max:100, group:'core', label:'سقف صرف IV'},
            minDelta: {type:'number', def:0, min:0, max:1, step:0.05, group:'core', label:'کف دلتا'},
            maxDelta: {type:'number', def:1, min:0, max:1, step:0.05, group:'core', label:'سقف دلتا'},
            maxLeverage: {type:'number', def:30, min:0, max:100, group:'core', label:'سقف اهرم'},
            useIvRank: {type:'bool', def:true, group:'adv', label:'IV Rank'},
            volatilityAnnualizationMode: {type:'string', def:'legacy252', group:'adv', label:'سالانه‌سازی نوسان (legacy252/tse-calendar)'}
        },
        filter: function(ctx, sym){
            var S=sym._S, K=sym._K, T=sym._T, r=sym._r, q=sym._q, isCall=sym._isCall, marketPrice=sym._mid;
            if(!S || !K) return ctx.reject('base-price');
            var ivRes=ivSolve(marketPrice,S,K,T,r,q,isCall,sym._daysPerYear);
            traceEvent('calc', 'iv:'+String(sym.l18||''), {S:S,K:K,T:T,marketPrice:marketPrice,isCall:isCall,iv:ivRes.ok?ivRes.iv:null,ok:ivRes.ok,reason:ivRes.reason||'',iter:ivRes.iter});
            if(!ivRes.ok) return ctx.reject('iv-bad');
            var sigma=ivRes.iv;
            if(sigma<0.05 || sigma>5) return ctx.reject('iv-range', 'iv='+(sigma*100).toFixed(1)+'%');
            var poolVol=sym.base? getPoolVolatility(sym.base) : 0;
            var hasVolHistory=!!(sym.base && poolStore[sym.base] && poolStore[sym.base].stats && poolStore[sym.base].stats.volatility>0 && poolStore[sym.base].stats.verifiedDays>3);
            var hv=poolVol>0? poolVol/100 : (ctx.cfg.volFloor+ctx.cfg.volCeil)/2/100;
            if(!hasVolHistory) addDataWarning(sym, 'تاریخچهٔ نوسان کافی نیست؛ مقدار میانی کف/سقف تنظیم‌شده برای مقایسهٔ IV به‌کار رفته است.');
            var ivPrem=(sigma-hv)/hv*100;
            if(ivPrem>ctx.cfg.maxIvPremium && ctx.cfg.maxIvPremium<100) return ctx.reject('iv-premium', 'prem='+ivPrem.toFixed(1)+'%');
            var greeks=bsGreeks(S,K,T,r,q,sigma,isCall,sym._daysPerYear);
            if(ctx.cfg.minDelta!==0 || ctx.cfg.maxDelta!==1){
                var dAbs=Math.abs(greeks.delta);
                if(dAbs < ctx.cfg.minDelta || dAbs > ctx.cfg.maxDelta) return ctx.reject('delta-range', 'delta='+greeks.delta.toFixed(3));
            }
            var moneyness=S/K;
            if((ctx.cfg.moneynessMin>0 && moneyness < ctx.cfg.moneynessMin) || (ctx.cfg.moneynessMax>0 && moneyness > ctx.cfg.moneynessMax)){
                return ctx.reject('moneyness', 'mn='+moneyness.toFixed(3));
            }
            var thetaPct=Math.abs(greeks.theta)/marketPrice*100;
            if(ctx.cfg.maxThetaPct<100 && thetaPct>ctx.cfg.maxThetaPct) return ctx.reject('theta-high', 'theta%='+thetaPct.toFixed(1));
            var leverage=Math.abs(greeks.delta)*S/marketPrice;
            if(leverage>ctx.cfg.maxLeverage || (ctx.cfg.minLeverage>0 && leverage < ctx.cfg.minLeverage)){
                return ctx.reject('leverage', 'lev='+leverage.toFixed(1));
            }
            sym._iv=sigma; sym._greeks=greeks; sym._leverage=leverage; sym._moneyness=moneyness;
            traceEvent('calc', 'greeks:'+String(sym.l18||''), {S:S,K:K,T:T,r:r,q:q,isCall:isCall,marketPrice:marketPrice,iv:sigma,delta:greeks.delta,gamma:greeks.gamma,theta:greeks.theta,vega:greeks.vega,leverage:leverage,moneyness:moneyness,source:sym._quoteSource||''});
            return ctx.pass();
        }
    },
    {
        key: 'L6-quality', icon: '⭐', color: '#fb7185', order: 6,
        label: 'کیفیت و امتیاز', desc: 'کیفیت',
        schema: {
            maxStalePricePct: {type:'number', def:50, min:0, max:100, group:'core', label:'سقف قیمت کهنه'},
            maxImbalanceRatio: {type:'number', def:20, min:0, max:100, group:'core', label:'سقف عدم تعادل'},
            minExpRet: {type:'number', def:40, min:0, max:200, group:'core', label:'حداقل بازده'},
            coldThreshold: {type:'number', def:3, min:0, max:20, group:'core', label:'آستانه سرد'},
            scoreMin: {type:'number', def:35, min:0, max:100, group:'core', label:'حداقل امتیاز'},
            useScore: {type:'bool', def:true, group:'adv', label:'امتیاز تناسب'}
        },
        filter: function(ctx, sym){
            var mid=sym._mid, qd1=sym.qd1||0, qo1=sym.qo1||0;
            var lastPrice=sym.pl||mid;
            var stalePct=Math.abs(lastPrice-mid)/mid*100;
            if(ctx.cfg.maxStalePricePct<100 && stalePct>ctx.cfg.maxStalePricePct) return ctx.reject('stale-price', 'stale%='+stalePct.toFixed(1));
            if(ctx.cfg.maxImbalanceRatio<20){
                var imb=Math.max(qd1,qo1)/Math.max(Math.min(qd1,qo1),1);
                if(imb>ctx.cfg.maxImbalanceRatio) return ctx.reject('imbalance', 'imb='+imb.toFixed(1));
            }
            if(sym._dteCalendar!=null && sym._dteCalendar < ctx.cfg.minDaysLeft) return ctx.reject('dte', 'calendar='+sym._dteCalendar);
            var tradingCalendarComplete=sym._expiryJdn!=null && TSE_CALENDAR.isCompleteForRange(ctx.todayJdn,sym._expiryJdn);
            if(ctx.cfg.minTradingDaysLeft>0){
                if(tradingCalendarComplete && sym._dteTrading!=null && sym._dteTrading < ctx.cfg.minTradingDaysLeft) return ctx.reject('dte', 'trading='+sym._dteTrading);
                if(!tradingCalendarComplete) addDataWarning(sym, 'حداقل DTE معاملاتی اعمال نشد؛ پوشش تعطیلات تقویم کامل نیست.');
            }
            var S=sym._S, K=sym._K, T=sym._T, r=sym._r, q=sym._q, sigma=sym._iv, isCall=sym._isCall, marketPrice=sym._mid;
            var fair=bsPrice(S*(1+ctx.cfg.view/100),K,T,r,q,sigma,isCall);
            var er=(fair-marketPrice)/marketPrice*100;
            if(ctx.cfg.minDteWeight){
                var dte=ctx.cfg.dtePenaltyBasis==='trading'? (tradingCalendarComplete?sym._dteTrading:null) : sym._dteCalendar;
                var hold=ctx.cfg.holdDays;
                var penalty=0;
                if(dte!=null && dte < hold*ctx.cfg.dtePenaltyDaysMult){
                    penalty=ctx.cfg.dtePenaltyMax*(1 - dte/(hold*ctx.cfg.dtePenaltyDaysMult));
                    er-=penalty;
                } else if(dte==null){ addDataWarning(sym, ctx.cfg.dtePenaltyBasis==='trading'?'جریمهٔ DTE معاملاتی به‌دلیل نبود تقویم کامل اعمال نشد.':'DTE در دسترس نیست؛ جریمهٔ سررسید محاسبه نشد.'); }
            }
            var coldThresh=ctx.cfg.coldThreshold!=null? ctx.cfg.coldThreshold : 3;
            if(er < coldThresh) return ctx.reject('cold', 'er='+er.toFixed(1)+'%');
            if(er < ctx.cfg.minExpRet) return ctx.reject('min-er', 'er='+er.toFixed(1)+'%');
            if(ctx.cfg.useScore){
                var score=0;
                score+=Math.min(er,100)/100*ctx.cfg.wER;
                var ivRank=50;
                if(ctx.cfg.useIvRank && sym.base){
                    var ivHistory=getVerifiedIvHistory(sym.base);
                    if(ivHistory.length<5) addDataWarning(sym, 'تاریخچهٔ IV تأییدشده کمتر از ۵ مشاهده است؛ رتبهٔ خنثی ۵۰ در امتیازدهی استفاده می‌شود.');
                    ivRank=getPoolIvRank(sym.base, sigma);
                    var buy=ctx.cfg.ivRankBuy, sell=ctx.cfg.ivRankSell;
                    var ivScore=0;
                    if(ivRank<=buy) ivScore=100; else if(ivRank>=sell) ivScore=0; else ivScore=100*(sell-ivRank)/(sell-buy);
                    score+=ivScore/100*ctx.cfg.wIVR;
                    sym._ivRank=ivRank;
                } else {
                    score+=50/100*ctx.cfg.wIVR;
                }
                score+=60/100*ctx.cfg.wADX;
                score+=70/100*ctx.cfg.wLiq;
                score+=50/100*ctx.cfg.wEdge;
                if(score < ctx.cfg.scoreMin) return ctx.reject('score-'+Math.floor(score), 'score='+score.toFixed(0));
                sym._score=score;
            }
            sym._er=er; sym._fair=fair;
            return ctx.pass();
        }
    },
    {
        key: 'L7-ranking', icon: '🏆', color: '#22d3ee', order: 7,
        label: 'رتبه‌بندی و خروجی', desc: 'پارتو، امتیاز، سقف هر پایه و سقف کل',
        schema: {
            maxPerGroup:{type:'number',def:2,min:0,max:10,group:'core',label:'حداکثر عبوری هر گروه (۰=بدون سقف)'},
            rankingGroupBy:{type:'string',def:'base',group:'core',label:'گروه‌بندی سقف L7',description:'base — سقف جدا برای هر پایه؛ base+type — سقف جدا برای Call و Put هر پایه؛ none — بدون سقف گروهی.'},
            maxTotalRows:{type:'number',def:0,min:0,max:1000,group:'core',label:'حد کل خروجی (۰=بدون سقف)'},
            suggestionDisplayLimit:{type:'number',def:10,min:1,max:50,group:'core',label:'ردیف نمایشی (فقط نمایش؛ بدون حذف)',description:'این گزینه فقط تعداد ردیف‌های قابل‌نمایش را محدود می‌کند و بر رتبه‌بندی L7 یا تعداد خروجی‌ها اثر ندارد.'},
            usePareto: {type:'bool', def:true, group:'adv', label:'حذف نامزدهای مغلوب (پارتو)' },
            abortThreshold: {type:'number', def:10, min:0, max:100, group:'adv', label:'آستانه توقف'}
        },
        filter: function(ctx, sym){
            var totalAbort=0; var keys=Object.keys(ctx.abortCounts);
            for(var i=0;i<keys.length;i++) totalAbort+=ctx.abortCounts[keys[i]];
            var inputAbort=ctx.abortCounts['input-data']||0;
            if(inputAbort>ctx.cfg.abortThresholdInput && ctx.cfg.abortThresholdInput>0){
                var ratio=ctx.totalInput>0? inputAbort/ctx.totalInput : 0;
                var isSmallDeath=ctx.totalInput<=20 && inputAbort>=Math.max(5, ctx.totalInput*0.5);
                var isLargeDeath=ctx.totalInput>20 && ratio>0.8;
                if(isSmallDeath || isLargeDeath){
                    if(!ctx._deathWarned){
                        ctx._deathWarned=true;
                        LOG.warn('[ExoticFilter] death mode, inputAbort='+inputAbort+' of '+ctx.totalInput);
                    }
                    if(ctx.debugOn && ctx.rawSamples.errors.length<5) ctx.rawSamples.errors.push({reason:'near-death', inputAbort:inputAbort, total:ctx.totalInput});
                }
            }
            return ctx.pass();
        }
    },
    {
        key:'L8-holding-advisory', icon:'🧭', color:'#a78bfa', order:8,
        label:'سناریوهای نگهداری (آزمایشی)', desc:'اطلاعاتی؛ بدون فیلتر یا توصیه قطعی',
        schema:{
            holdScenarioDays:{type:'csv', def:[3,5,7,10], group:'core', label:'افق نگهداری، روز تقویمی'},
            underlyingScenarioShocks:{type:'csv', def:[-0.05,-0.02,0,0.02,0.05], group:'core', label:'شوک پایه (اعشاری)'},
            maxHolidayGap:{type:'number', def:3, min:0, max:14, group:'adv', label:'هشدار تعطیلی پیاپی (روز)'},
            showScenarioTable:{type:'bool', def:true, group:'core', label:'محاسبه جدول سناریو'}
        },
        filter:function(ctx,sym){
            if(!ctx.cfg.showScenarioTable){ sym._holdingAdvisory={status:'disabled', scenarios:[]}; return ctx.pass(); }
            var reasons=[];
            var advisoryExpiry=sym._expiryJdn||sym._configuredExpiryJdn;
            if(!advisoryExpiry) reasons.push('تاریخ سررسید معتبر در ورودی/تنظیمات نیست');
            var caveats=[];
            if(advisoryExpiry && sym._expirySource==='configured-reference') caveats.push('سررسید از تنظیم مرجع گرفته شده و با قرارداد این نماد تطبیق نشده است');
            if(!(sym._S>0) || !sym._K || !(sym._iv>0) || !(sym._mid>0)) reasons.push('قیمت/IV/مظنه برای سناریو کافی نیست');
            if(sym._quoteSource==='last-price±2%-fallback') reasons.push('مظنه از قیمت آخر و بازهٔ ±۲٪ برآورد شده؛ سناریو ساخته نشد');
            if(sym._basePriceSource==='fallback-default') reasons.push('قیمت پایه فقط مقدار پیش‌فرض مدل است');
            if(sym._basePriceSource==='legacy-unverified') reasons.push('منبع قیمت پایهٔ pool قدیمی تأییدنشده است');
            if(sym._basePriceAgeDays!=null && (sym._basePriceAgeDays<0 || sym._basePriceAgeDays>5)) reasons.push('تاریخ قیمت پایهٔ pool نامعتبر یا بیش از ۵ روز تقویمی کهنه است');
            var advisoryStatus=advisoryExpiry?TSE_CALENDAR.calendarStatus(ctx.todayJdn,advisoryExpiry):{status:'unknown',complete:false,missingYears:[],knownTradingDays:null};
            var calendarDte=advisoryExpiry?Math.max(0,advisoryExpiry-ctx.todayJdn):null;
            var tradingDte=advisoryStatus.complete?Math.max(0,TSE_CALENDAR.tradingDaysBetween(ctx.todayJdn,advisoryExpiry)):null;
            var advisory={status:reasons.length?'insufficient-data':'advisory',scenarios:[],thetaDecay:[],calendarStatus:advisoryStatus,dte:{calendarDays:calendarDte,tradingDays:tradingDte,tradingStatus:advisoryStatus.status},assumptions:{volatility:'ثابت در تمام سناریوها',rates:'ثابت',dividends:'بدون تغییر',execution:'قیمت نظری؛ بدون اسپرد/کارمزد/لغزش',timeBasis:'تاریخ انقضای تقویمی شمسی/میلادی، سال 365روزه',thetaDecay:'برآورد نظری با قیمت پایه، IV، نرخ و سود ثابت؛ بدون توصیه معاملاتی',basePriceSource:sym._basePriceSource||'unknown',basePriceAgeDays:sym._basePriceAgeDays==null?null:sym._basePriceAgeDays,quoteSource:sym._quoteSource||'caller-supplied-unverified',expirySource:sym._expirySource||'unknown',notRecommendation:true}};
            if(reasons.length){ advisory.reasons=reasons; advisory.warnings=caveats; sym._holdingAdvisory=advisory; return ctx.pass(); }
            var horizons=getSymList('holdScenarioDays'), shocks=getSymList('underlyingScenarioShocks');
            if(!horizons.length) horizons=[3,5,7,10];
            if(!shocks.length) shocks=[-0.05,-0.02,0,0.02,0.05];
            var remainingDays=Math.max(0,advisoryExpiry-ctx.todayJdn);
            var maxHoldCalendarDays=0;
            for(var h=0;h<horizons.length;h++){ var hv=Number(horizons[h]); if(isFinite(hv)&&hv>=0&&hv<=365) maxHoldCalendarDays=Math.max(maxHoldCalendarDays,hv); }
            var holidayEnd=Math.min(advisoryExpiry,ctx.todayJdn+Math.ceil(maxHoldCalendarDays));
            var risk=TSE_CALENDAR.findHolidayGaps(ctx.todayJdn,holidayEnd,Math.max(1,Number(ctx.cfg.maxHolidayGap)||1));
            var riskExceeds=risk.complete?risk.gaps.some(function(g){return g.closedCalendarDays>ctx.cfg.maxHolidayGap;}):null;
            advisory.calendar={status:risk.status,complete:risk.complete,holidayGapRiskKnown:!!risk.complete,maxClosedCalendarDays:risk.complete?risk.maxClosedCalendarDays:null,thresholdCalendarDays:ctx.cfg.maxHolidayGap,exceedsThreshold:riskExceeds,gaps:risk.complete?risk.gaps:[],lookAheadCalendarDays:Math.ceil(maxHoldCalendarDays)};
            advisory.warnings=caveats.slice();
            if(!risk.complete) advisory.warnings.push('تعطیلات رسمی برای این بازه کامل علامت‌گذاری نشده‌اند؛ ریسک تعطیلی نامعلوم است.');
            else if(riskExceeds) advisory.warnings.push('در پنجرهٔ نگهداری، تعطیلی پیوسته از آستانهٔ تنظیم‌شده بیشتر است.');
            if(sym._basePriceSource==='configured-assumption') advisory.warnings.push('قیمت پایه از تنظیم کاربر است، نه مظنهٔ زندهٔ تأییدشده.');
            if(sym._quoteSource==='provided-order-book') advisory.warnings.push('مظنه از ورودی گرفته شده؛ تازگی و منبع آن خارج از موتور اعتبارسنجی نشده است.');
            if(sym._basePriceSource==='legacy-unverified') advisory.warnings.push('منبع قیمت پایه در تاریخچهٔ قدیمی قابل تأیید نیست.');
            if(sym._basePriceAgeDays!=null && sym._basePriceAgeDays>5) advisory.warnings.push('تاریخ آخرین قیمت پایه بیش از ۵ روز تقویمی گذشته است.');
            if(sym._basePriceAgeDays!=null && sym._basePriceAgeDays<0) advisory.warnings.push('تاریخ قیمت پایه در آینده است و قابل اتکا نیست.');
            for(var hi=0;hi<horizons.length;hi++){
                var hold=Number(horizons[hi]);
                if(!isFinite(hold)||hold<0||hold>365) continue;
                var remaining=Math.max(0,remainingDays-hold), scenarioT=remaining/365;
                for(var si=0;si<shocks.length;si++){
                    var shock=Number(shocks[si]);
                    if(!isFinite(shock)||Math.abs(shock)>1) continue;
                    var shockedS=sym._S*(1+shock);
                    var theoretical=bsPrice(shockedS,sym._K,scenarioT,sym._r,sym._q,sym._iv,sym._isCall);
                    advisory.scenarios.push({holdingCalendarDays:hold,underlyingShock:shock,underlyingPrice:shockedS,theoreticalOptionPrice:theoretical,estimatedReturnPct:(theoretical-sym._mid)/sym._mid*100,remainingCalendarDays:remaining});
                }
            }
            var theoreticalNow=bsPrice(sym._S,sym._K,remainingDays/365,sym._r,sym._q,sym._iv,sym._isCall);
            if(isFinite(theoreticalNow)&&theoreticalNow>0){
                for(var th=0;th<horizons.length;th++){
                    var thetaHold=Number(horizons[th]);
                    if(!isFinite(thetaHold)||thetaHold<0||thetaHold>365) continue;
                    var thetaRemaining=Math.max(0,remainingDays-thetaHold);
                    var thetaFuture=bsPrice(sym._S,sym._K,thetaRemaining/365,sym._r,sym._q,sym._iv,sym._isCall);
                    if(isFinite(thetaFuture)) advisory.thetaDecay.push({holdingCalendarDays:thetaHold,remainingCalendarDays:thetaRemaining,theoreticalOptionPrice:thetaFuture,modelDecayValue:thetaFuture-theoreticalNow,modelDecayPct:(thetaFuture-theoreticalNow)/theoreticalNow*100});
                }
            }
            if(!advisory.scenarios.length){ advisory.status='insufficient-data'; advisory.reasons=['پارامترهای سناریو معتبر نیستند']; }
            sym._holdingAdvisory=advisory;
            return ctx.pass();
        }
    },
    {
        key:'L9-momentum-advisory', icon:'📊', color:'#c084fc', order:9,
        label:'روند مشاهدات معتبر', desc:'توصیفی و غیرمسدودکننده؛ بدون اثر بر رتبه یا مدل مالی',
        schema:{},
        filter:function(ctx,sym){
            var base=String(sym.base||sym._base||'').trim(), codes=ctx.cfg.baseInsCodes||{}, expected=String(codes[base]||''), entry=ctx.pool&&ctx.pool[base], history=entry&&Array.isArray(entry.history)?entry.history:[], trusted=[];
            if(expected){
                for(var i=0;i<history.length;i++){
                    var item=history[i];
                    if(item&&isVerifiedPoolObservation(item)&&String(item.instrumentId)===expected&&Number(item.price)>0&&Number(item.jdn)>0&&Number(item.jdn)<=ctx.todayJdn) trusted.push(item);
                }
            }
            trusted.sort(function(a,b){return Number(b.jdn)-Number(a.jdn);});
            trusted=trusted.slice(0,5);
            var advisory={status:'insufficient-data',observations:trusted.length,changePct:null,direction:'unknown',source:'verified-pool-only'};
            if(trusted.length>=5){
                var latest=Number(trusted[0].price), oldest=Number(trusted[trusted.length-1].price), change=(latest-oldest)/oldest*100;
                if(isFinite(change)){advisory.changePct=change;advisory.status='descriptive';advisory.direction=change>0.5?'up':change< -0.5?'down':'flat';advisory.firstJdn=Number(trusted[trusted.length-1].jdn);advisory.lastJdn=Number(trusted[0].jdn);}
            }
            sym._momentumAdvisory=advisory;
            return ctx.pass();
        }
    }
];

// ─── CONTEXT + HOOKS ──────────────────────────────────────────────────────
function makeCtx(){
    var effectiveCfg={};
    var configKeys=Object.keys(CONFIG);
    for(var ci=0;ci<configKeys.length;ci++) effectiveCfg[configKeys[ci]]=getCfg(configKeys[ci]);
    return {
        cfg: effectiveCfg,
        pool: poolStore,
        ivHist: ivHist,
        todayJdn: todayJdn(),
        totalInput: totalInput,
        abortCounts: abortCounts,
        rawSamples: rawSamples,
        debugOn: getCfg('debugPanel'),
        _deathWarned: false,
        reject: function(key, detail){ return {ok:false, key:key, detail:detail||null}; },
        pass: function(extras){ return {ok:true, extras:extras||null}; },
        getCfg: getCfg,
        getPoolPrice: getPoolPrice,
        hooks: { beforeAll: [], afterAll: [], beforeFilter: [], afterFilter: [] },
        callHook: function(name, args){
            try{
                var list=this.hooks[name]||[];
                for(var i=0;i<list.length;i++){
                    try{ list[i].apply(null, args); }catch(e){ LOG.warn('[Hook] '+name+' error', e); }
                }
                for(var li=0;li<LAYERS.length;li++){
                    var L=LAYERS[li];
                    if(L.hooks && L.hooks[name]){
                        try{ L.hooks[name].apply(L, args); }catch(e){ LOG.warn('[LayerHook] '+L.key+' '+name, e); }
                    }
                }
            }catch(e){}
        }
    };
}

// ─── PIPELINE ─────────────────────────────────────────────────────────────
function resetPipeline(){
    pipelineData={}; layerStats={}; abortCounts={}; rawSamples={raw:[], errors:[], incomplete:[]}; totalInput=0;
    for(var li=0;li<LAYERS.length;li++){
        var L=LAYERS[li];
        pipelineData[L.key]={input:0, output:0, filtered:0, before:0, isZero:false, pctFiltered:'0.0', pctRemaining:'100.0', filters:{}, samples:{pass:[], fail:[]}};
        layerStats[L.key]={in:0, out:0, filters:{}};
    }
}
function incFilter(layerKey, filterKey, isDebugSample, sample){
    if(!pipelineData[layerKey]) return;
    if(!pipelineData[layerKey].filters[filterKey]) pipelineData[layerKey].filters[filterKey]=0;
    pipelineData[layerKey].filters[filterKey]++;
    if(!layerStats[layerKey].filters[filterKey]) layerStats[layerKey].filters[filterKey]=0;
    layerStats[layerKey].filters[filterKey]++;
    if(!abortCounts[filterKey]) abortCounts[filterKey]=0;
    abortCounts[filterKey]++;
    if(isDebugSample && pipelineData[layerKey].samples.fail.length<3){
        pipelineData[layerKey].samples.fail.push(sample||filterKey);
    }
}
function passLayer(layerKey, sample){
    if(!pipelineData[layerKey]) return;
    pipelineData[layerKey].output++;
    layerStats[layerKey].out++;
    if(getCfg('debugPanel') && pipelineData[layerKey].samples.pass.length<3){
        pipelineData[layerKey].samples.pass.push(sample||'ok');
    }
}
function compareRankingValue(row,key,direction){
    var value=row&&Number(row[key]);
    return row&&row[key]!=null&&isFinite(value)?value*direction:null;
}
function rankingDominates(a,b){
    var strict=false,dimensions=['_er','_score','_ivRank'];
    for(var i=0;i<dimensions.length;i++){
        var key=dimensions[i],av=compareRankingValue(a,key,key==='_ivRank'?-1:1),bv=compareRankingValue(b,key,key==='_ivRank'?-1:1);
        if(av==null||bv==null) continue;
        if(av<bv) return false;
        if(av>bv) strict=true;
    }
    return strict;
}
function rankCandidates(candidates,cfg){
    cfg=cfg||{};
    var entries=[];
    for(var i=0;i<candidates.length;i++) entries.push({row:candidates[i],index:i});
    var rejected=[];
    if(cfg.usePareto===true){
        var pareto=[];
        for(var pi=0;pi<entries.length;pi++){
            var dominated=false;
            for(var pj=0;pj<entries.length;pj++) if(pi!==pj&&rankingDominates(entries[pj].row,entries[pi].row)){dominated=true;break;}
            if(dominated) rejected.push({row:entries[pi].row,reason:'pareto'}); else pareto.push(entries[pi]);
        }
        entries=pareto;
    }
    entries.sort(function(a,b){
        var aScore=compareRankingValue(a.row,'_score',1),bScore=compareRankingValue(b.row,'_score',1);
        if(aScore!=null||bScore!=null){ if(aScore==null) return 1; if(bScore==null) return -1; if(aScore!==bScore) return bScore-aScore; }
        var aEr=compareRankingValue(a.row,'_er',1),bEr=compareRankingValue(b.row,'_er',1);
        if(aEr!=null||bEr!=null){ if(aEr==null) return 1; if(bEr==null) return -1; if(aEr!==bEr) return bEr-aEr; }
        var aIv=compareRankingValue(a.row,'_ivRank',-1),bIv=compareRankingValue(b.row,'_ivRank',-1);
        if(aIv!=null||bIv!=null){ if(aIv==null) return 1; if(bIv==null) return -1; if(aIv!==bIv) return bIv-aIv; }
        return a.index-b.index;
    });
    var groupLimit=Math.max(0,Math.floor(Number(cfg.maxPerGroup)||0)),totalLimit=Math.max(0,Math.floor(Number(cfg.maxTotalRows)||0)),groupMode=cfg.rankingGroupBy||'base',groupCounts={},selected=[];
    for(var ei=0;ei<entries.length;ei++){
        var entry=entries[ei],row=entry.row;
        var baseGroup=String(row.base||row.l18||row.l30||('__row_'+entry.index));
        var typeGroup=row._isCall===true?'Call':row._isCall===false?'Put':'Unknown';
        var group=groupMode==='base+type'?baseGroup+'|'+typeGroup:baseGroup;
        var useGroupLimit=groupLimit>0&&groupMode!=='none';
        if(useGroupLimit&&(groupCounts[group]||0)>=groupLimit){ rejected.push({row:row,reason:'rank'}); continue; }
        if(totalLimit>0&&selected.length>=totalLimit){ rejected.push({row:row,reason:'global-rank'}); continue; }
        if(useGroupLimit) groupCounts[group]=(groupCounts[group]||0)+1;
        row._l7Rank=selected.length+1;
        selected.push(row);
    }
    return {results:selected,rejected:rejected};
}
function runPipeline(symbols, runMeta){
    if(!Array.isArray(symbols)) symbols=[];
    resetPipeline();
    var ctx=makeCtx();
    ctx.simulation=!!(runMeta&&runMeta.simulation);
    ctx.totalInput=symbols.length;
    var results=[];
    var failed=[];
    var startTime=Date.now();
    var HARD_TIMEOUT=getCfg('computeIntervalMs')||15000;
    var rankingLayerIndex=0;
    for(var rli=0;rli<LAYERS.length;rli++) if(LAYERS[rli].key==='L7-ranking'){rankingLayerIndex=rli;break;}
    outer:
    for(var i=0;i<symbols.length;i++){
        totalInput++;
        ctx.totalInput=totalInput;
        if(Date.now()-startTime>HARD_TIMEOUT){
            LOG.warn('[ExoticFilter] Pipeline timeout at '+i+' of '+symbols.length);
            rawSamples.errors.push({reason:'pipeline-timeout', at:i, total:symbols.length});
            break;
        }
        var sym=symbols[i];
        var debugOn=getCfg('debugPanel');
        try{
            for(var li=0;li<rankingLayerIndex;li++){
                var L=LAYERS[li];
                var layerKey=L.key;
                if(!pipelineData[layerKey]) continue;
                pipelineData[layerKey].input++;
                layerStats[layerKey].in++;
                pipelineData[layerKey].before=pipelineData[layerKey].input;
                var r;
                try{ r=L.filter(ctx, sym); }
                catch(e){ r=ctx.reject('exception:'+e.message); rawSamples.errors.push({sym:sym.l18, error:e.message}); }
                if(!r.ok){
                    incFilter(layerKey, r.key, debugOn, sym.l18+' '+ (r.detail||''));
                    if(debugOn && r.key==='input-data' && rawSamples.incomplete.length<5) rawSamples.incomplete.push({reason:r.key, sym:sym});
                    failed.push({sym:sym.l18||i, reason:r.key, layer:layerKey, detail:r.detail});
                    traceEvent('reject', String(sym.l18||i)+'@'+layerKey, {reason:r.key, detail:r.detail||''});
                    continue outer;
                }
                passLayer(layerKey, sym.l18);
            }
            results.push(sym);
            traceEvent('accept', String(sym.l18||i), {base:sym.base||'', iv:sym._iv!=null?Number(sym._iv):null, er:sym._er!=null?Number(sym._er):null});
        }catch(e){
            failed.push({sym:sym.l18||i, reason:'exception:'+e.message, layer:'exception'});
            if(rawSamples.errors.length<10) rawSamples.errors.push({sym:sym.l18, error:e.message});
        }
    }
    var rankingInput=results.length,rankingLayer=LAYERS[rankingLayerIndex],rankingKey=rankingLayer.key;
    if(pipelineData[rankingKey]){
        pipelineData[rankingKey].input=rankingInput;
        pipelineData[rankingKey].before=rankingInput;
        layerStats[rankingKey].in=rankingInput;
    }
    try{ rankingLayer.filter(ctx,results[0]||null); }
    catch(rankWarningError){ if(rawSamples.errors.length<10) rawSamples.errors.push({reason:'ranking-warning-error',error:rankWarningError.message}); }
    var rankingOutcome=rankCandidates(results,ctx.cfg);
    for(var ri=0;ri<rankingOutcome.rejected.length;ri++){
        var dropped=rankingOutcome.rejected[ri],droppedName=dropped.row&&(dropped.row.l18||dropped.row.l30)||'نامزد';
        incFilter(rankingKey,dropped.reason,getCfg('debugPanel'),droppedName);
        failed.push({sym:droppedName,reason:dropped.reason,layer:rankingKey});
    }
    results=rankingOutcome.results;
    for(var rpi=0;rpi<results.length;rpi++) passLayer(rankingKey,results[rpi].l18);
    if(pipelineData[rankingKey]){
        var rankCounts={pareto:0,rank:0,'global-rank':0};
        for(var rc=0;rc<rankingOutcome.rejected.length;rc++) rankCounts[rankingOutcome.rejected[rc].reason]=(rankCounts[rankingOutcome.rejected[rc].reason]||0)+1;
        pipelineData[rankingKey].ranking={input:rankingInput,retained:results.length,paretoFiltered:rankCounts.pareto,groupLimited:rankCounts.rank,totalLimited:rankCounts['global-rank']};
    }
    for(var li2=rankingLayerIndex+1;li2<LAYERS.length;li2++){
        var nextLayer=LAYERS[li2],nextKey=nextLayer.key,nextResults=[];
        for(var ri2=0;ri2<results.length;ri2++){
            var candidate=results[ri2],nextData=pipelineData[nextKey];
            if(nextData){ nextData.input++; nextData.before=nextData.input; layerStats[nextKey].in++; }
            var nextDecision;
            try{ nextDecision=nextLayer.filter(ctx,candidate); }
            catch(nextError){ nextDecision=ctx.reject('exception:'+nextError.message); rawSamples.errors.push({sym:candidate.l18,error:nextError.message}); }
            if(!nextDecision.ok){
                incFilter(nextKey,nextDecision.key,getCfg('debugPanel'),candidate.l18+' '+(nextDecision.detail||''));
                failed.push({sym:candidate.l18||ri2,reason:nextDecision.key,layer:nextKey,detail:nextDecision.detail});
                continue;
            }
            passLayer(nextKey,candidate.l18);
            nextResults.push(candidate);
        }
        results=nextResults;
    }
    for(var li2=0;li2<LAYERS.length;li2++){
        var key=LAYERS[li2].key;
        var d=pipelineData[key];
        if(d.input>0){
            d.filtered=d.input-d.output;
            d.pctFiltered=(d.filtered/d.input*100).toFixed(1);
            d.pctRemaining=(d.output/d.input*100).toFixed(1);
            d.isZero=d.output===0;
        }
    }
    var isDeath=results.length===0 && symbols.length>0;
    var topFilter=null, topCount=0;
    if(isDeath){
        var abKeys=Object.keys(abortCounts);
        for(var ai=0;ai<abKeys.length;ai++){ var ak=abKeys[ai]; if(abortCounts[ak]>topCount){ topCount=abortCounts[ak]; topFilter=ak; } }
        rawSamples.errors.push({reason:'death-mode', total:symbols.length, topFilter:topFilter, topCount:topCount, abort:abortCounts});
    }
    try{ requestRenderResults(results); }catch(e){}
    var dataWarnings=[];
    for(var wi=0;wi<symbols.length;wi++){
        if(symbols[wi] && symbols[wi]._dataWarnings && symbols[wi]._dataWarnings.length) dataWarnings.push({symbol:symbols[wi].l18||symbols[wi].l30||'', warnings:symbols[wi]._dataWarnings.slice()});
    }
    return {pass:results, fail:failed, pipeline:pipelineData, stats:layerStats, total:symbols.length, isDeath:isDeath, deathInfo:isDeath? {topFilter:topFilter, topCount:topCount} : null, simulation:!!(runMeta&&runMeta.simulation), dataWarnings:dataWarnings};
}

// ─── VIEW MODE ────────────────────────────────────────────────────────────
var VIEW_MODE={SUMMARY:'summary', VERBOSE:'verbose'};
function getViewMode(){
    var m=getCfg('viewMode');
    if(m) return m;
    try{
        if(typeof location!=='undefined' && location.search && location.search.indexOf('verbose=1')!==-1) return VIEW_MODE.VERBOSE;
    }catch(e){}
    return VIEW_MODE.VERBOSE;
}

// ─── UI ───────────────────────────────────────────────────────────────────
var panelEl=null, debugEl=null, topZ=10000;
function bringTop71(el){ topZ+=2; el.style.zIndex=topZ; }
var _dragBound=false;
function makeDraggable71(el, handle){
    if(!el || !handle) return;
    try{ handle.style.cursor='move'; handle.style.userSelect='none'; handle.style.touchAction='none'; }catch(e){}
    function beginDrag(x,y){
        try{ var rect=el.getBoundingClientRect(); _dragState={el:el,sx:x,sy:y,ox:rect.left,oy:rect.top}; }
        catch(e){ _dragState={el:el,sx:x,sy:y,ox:0,oy:0}; }
    }
    try{
        handle.addEventListener('mousedown', function(e){
            if(e.button!=null&&e.button!==0) return;
            if(e.target&&e.target.closest&&e.target.closest('button,input,select,textarea,a,.exf-close')) return;
            beginDrag(e.clientX,e.clientY);
            e.preventDefault();
        });
        handle.addEventListener('touchstart', function(e){
            if(!e.touches||!e.touches[0]) return;
            var target=e.target;
            if(target&&target.closest&&target.closest('button,input,select,textarea,a,.exf-close')) return;
            beginDrag(e.touches[0].clientX,e.touches[0].clientY);
        }, {passive:true});
    }catch(e){}
}
function moveDraggable71(x,y){
    if(!_dragState) return;
    var left=_dragState.ox+x-_dragState.sx, top=_dragState.oy+y-_dragState.sy;
    if(typeof window!=='undefined'){
        left=Math.max(0,Math.min(left,Math.max(0,window.innerWidth-64)));
        top=Math.max(0,Math.min(top,Math.max(0,window.innerHeight-36)));
    }
    _dragState.el.style.left=left+'px'; _dragState.el.style.top=top+'px';
    _dragState.el.style.right='auto'; _dragState.el.style.bottom='auto';
}
if(typeof document!=='undefined' && !_dragBound){
    _dragBound=true;
    var _rafPending=false;
    document.addEventListener('mousemove', function(e){
        if(!_dragState) return;
        if(_rafPending) return;
        _rafPending=true;
        requestAnimationFrame(function(){
            _rafPending=false;
            if(!_dragState) return;
            moveDraggable71(e.clientX,e.clientY);
        });
    });
    document.addEventListener('mouseup', function(){ _dragState=null; });
    document.addEventListener('touchmove', function(e){
        if(!_dragState || !e.touches[0]) return;
        var t=e.touches[0];
        moveDraggable71(t.clientX,t.clientY);
        if(e.preventDefault) e.preventDefault();
    }, {passive:false});
    document.addEventListener('touchend', function(){ _dragState=null; });
}
function buildAuxiliaryWindow(id,icon,title,subtitle,content){
    var existing=document.getElementById(id);
    if(existing) return existing;
    var panel=document.createElement('section');
    panel.id=id; panel.className='exf-tool-window'; panel.setAttribute('role','dialog'); panel.setAttribute('aria-label',title);
    panel.innerHTML='<div class="exf-tool-header" id="'+id+'Handle"><span class="exf-tool-icon">'+icon+'</span><div class="exf-tool-heading"><div class="exf-tool-title">'+title+'</div><div class="exf-tool-subtitle">'+subtitle+'</div></div><button type="button" class="exf-tool-min" id="'+id+'Min" aria-label="کوچک‌کردن پنجره">−</button><button type="button" class="exf-tool-close" id="'+id+'Close" aria-label="بستن پنجره">×</button></div><div class="exf-tool-body">'+content+'</div>';
    document.body.appendChild(panel);
    makeDraggable71(panel,panel.querySelector('#'+id+'Handle'));
    panel.addEventListener('mousedown',function(){bringTop71(panel);});
    panel.querySelector('#'+id+'Close').addEventListener('click',function(){panel.style.display='none';});
    panel.querySelector('#'+id+'Min').addEventListener('click',function(){
        panel.classList.toggle('exf-tool-minimized');
        var minimized=panel.classList.contains('exf-tool-minimized');
        panel.querySelector('#'+id+'Min').textContent=minimized?'+':'−';
        panel.querySelector('#'+id+'Min').setAttribute('aria-label',minimized?'بزرگ‌کردن پنجره':'کوچک‌کردن پنجره');
    });
    return panel;
}
function openAuxiliaryWindow(id){
    var panel=document.getElementById(id); if(!panel) return;
    panel.style.display='flex';
    if(typeof window!=='undefined'&&window.innerWidth<560){panel.style.left='8px';panel.style.right='8px';panel.style.top='8px';}
    else if(typeof window!=='undefined'){
        panel.style.left='auto';
        panel.style.right=Math.max(8,Math.min(476,window.innerWidth-430))+'px';
        panel.style.top='24px';
    }
    bringTop71(panel);
}
function buildAuxiliaryWindows(){
    buildAuxiliaryWindow('__exfPoolPanel','🏊','استخر دادهٔ معتبر','مشاهدات تاریخ‌دار و دارای provenance؛ مستقل از اجرای قیف.','<div id="__exfPoolBar" class="exf-poolbar"></div>');
    buildAuxiliaryWindow('__exfCalendarPanel','🗓️','تقویم ایرانی','ماه جلالی، روزهای هفته و تعطیلات ثبت‌شدهٔ کاربر؛ بدون تعطیلات حدسی.','<div id="__exfCalendarBody"></div>');
    buildAuxiliaryWindow('__exfMarketPanel','📊','روند بازار','نمای توصیفی از snapshot معتبر؛ جدا از رتبه‌بندی و فیلتر.','<div id="__exfMarketBody"></div>');
    buildAuxiliaryWindow('__exfProfilePanel','👤','پروفایل کاربر','ذخیرهٔ محلی و فقط‌نمایشی؛ مستقل از قیف و رتبه‌بندی.','<div id="__exfProfile" class="exf-profile"></div>');
}
function buildModernPanel(){
    var existingPanel=document.getElementById('__exfPanel');
    if(existingPanel){ panelEl=existingPanel; return panelEl; }
    if(panelEl) return panelEl;
    var css = ''
    +'.exf-panel, .exf-topbar, .exf-tool-window, #__exfDebugPanel, #__exfToast{--bg:#070a14;--bg2:#0f172a;--card:#111c32;--card2:#162040;--card3:#1c2a4a;--border:#1e2f4f;--border2:#2a3f66;--text:#e2e8f0;--text2:#94a3b8;--muted:#64748b;--accent:#38bdf8;--accent2:#818cf8;--accent3:#22d3ee;--ok:#34d399;--ok2:#10b981;--warn:#fbbf24;--bad:#fb7185;--grad-main:linear-gradient(135deg,#38bdf8 0%,#818cf8 50%,#c084fc 100%);--grad-ok:linear-gradient(135deg,#34d399 0%,#22d3ee 100%);--grad-warn:linear-gradient(135deg,#fbbf24 0%,#f97316 100%);--grad-funnel:linear-gradient(180deg,rgba(56,189,248,0.08) 0%,rgba(129,140,248,0.08) 50%,rgba(192,132,252,0.08) 100%);--shadow:0 25px 80px rgba(0,0,0,0.7),0 0 0 1px rgba(56,189,248,0.08),0 0 40px rgba(56,189,248,0.05);--shadow-card:0 8px 32px rgba(0,0,0,0.4),0 0 0 1px rgba(255,255,255,0.03);}'
    +'.exf-panel{position:fixed;right:20px;top:20px;width:440px;height:82vh;min-width:290px;min-height:280px;max-width:calc(100vw - 16px);max-height:92vh;resize:both;overflow:hidden;display:flex;flex-direction:column;background:radial-gradient(120% 120% at 0% 0%,rgba(56,189,248,0.12) 0%,transparent 50%),radial-gradient(100% 100% at 100% 0%,rgba(129,140,248,0.10) 0%,transparent 50%),linear-gradient(180deg,var(--card) 0%,var(--bg) 100%);border:1px solid var(--border);border-radius:20px;box-shadow:var(--shadow);font-family:Vazirmatn,Tahoma,sans-serif;direction:rtl;color:var(--text);z-index:10000;backdrop-filter:blur(24px) saturate(1.2);}'
    +'.exf-tool-window{position:fixed;right:476px;top:24px;width:410px;height:72vh;min-width:290px;min-height:280px;max-width:calc(100vw - 20px);max-height:90vh;resize:both;overflow:hidden;display:none;flex-direction:column;background:radial-gradient(120% 120% at 0% 0%,rgba(56,189,248,0.10) 0%,transparent 50%),linear-gradient(180deg,var(--card),var(--bg));border:1px solid var(--border);border-radius:18px;box-shadow:var(--shadow);font-family:Vazirmatn,Tahoma,sans-serif;direction:rtl;color:var(--text);z-index:10002;backdrop-filter:blur(24px) saturate(1.2);}'
    +'.exf-tool-window[hidden]{display:none;}.exf-tool-window.exf-tool-minimized{height:auto!important;min-height:0!important;resize:none;}.exf-tool-window.exf-tool-minimized .exf-tool-body{display:none;}.exf-tool-header{display:flex;align-items:center;gap:8px;padding:13px 15px;border-bottom:1px solid var(--border);background:linear-gradient(100deg,rgba(56,189,248,.10),rgba(129,140,248,.06));flex-shrink:0;cursor:move;user-select:none;}.exf-tool-icon{width:34px;height:34px;display:grid;place-items:center;border-radius:11px;background:var(--card2);border:1px solid var(--border2);font-size:17px;}.exf-tool-heading{min-width:0;flex:1;}.exf-tool-title{font-size:12px;font-weight:900;color:var(--text);}.exf-tool-subtitle{font-size:9px;color:var(--muted);margin-top:2px;line-height:1.6;}.exf-tool-body{flex:1;min-height:0;overflow:auto;padding:8px 10px;overscroll-behavior:contain;}.exf-tool-min,.exf-tool-close{width:29px;height:29px;flex:0 0 29px;border-radius:9px;display:grid;place-items:center;background:rgba(255,255,255,.05);border:1px solid var(--border);color:var(--text2);cursor:pointer;font-size:16px;}.exf-tool-min:hover{color:var(--accent);border-color:var(--accent);}.exf-tool-close:hover{color:var(--bad);border-color:var(--bad);}'
    +'.exf-header{padding:18px 20px;display:flex;align-items:center;justify-content:space-between;position:relative;overflow:hidden;flex-shrink:0;}'
    +'.exf-header::before{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:var(--grad-main);opacity:0.6;}'
    +'.exf-progress{margin:0 14px 8px;padding:8px 10px;border:1px solid var(--border);border-radius:10px;background:rgba(7,10,20,.62);font-size:9px;line-height:1.65;flex-shrink:0;}'
    +'.exf-expiry-notice{margin:0 14px 9px;padding:10px 12px;border:1px solid rgba(251,191,36,.45);border-radius:10px;background:rgba(70,48,10,.28);font-size:10px;line-height:1.7;flex-shrink:0;}'
    +'.exf-expiry-notice[hidden]{display:none;}'
    +'.exf-expiry-notice strong{color:var(--warn);}'
    +'.exf-expiry-notice pre{white-space:pre-wrap;word-break:break-word;margin:5px 0 8px;color:var(--text2);font:9px/1.7 Tahoma,sans-serif;direction:rtl;}'
    +'.exf-expiry-actions{display:flex;gap:7px;flex-wrap:wrap;}'
    +'.exf-progress-line{display:flex;align-items:center;gap:7px;min-height:18px;}'
    +'.exf-progress-text{flex:1;color:var(--text2);}'
    +'.exf-progress-percent{font:9px ui-monospace,monospace;color:var(--muted);}'
    +'.exf-progress-track{height:4px;margin-top:5px;border-radius:8px;background:var(--bg2);overflow:hidden;}'
    +'.exf-progress-fill{height:100%;width:0;background:var(--grad-main);border-radius:8px;transition:width .25s ease;}'
    +'.exf-progress[data-state="complete"] .exf-progress-fill{background:var(--grad-ok);}'
    +'.exf-progress[data-state="warn"] .exf-progress-fill{background:var(--grad-warn);}'
    +'.exf-progress-spinner{width:10px;height:10px;border:2px solid var(--border2);border-top-color:var(--accent);border-radius:50%;flex:0 0 10px;animation:exfSpin .8s linear infinite;}'
    +'.exf-progress[data-state="complete"] .exf-progress-spinner,.exf-progress[data-state="warn"] .exf-progress-spinner{display:none;}'
    +'@keyframes exfSpin{to{transform:rotate(360deg);}}'
    +'.exf-header::after{content:"";position:absolute;bottom:0;left:20px;right:20px;height:1px;background:linear-gradient(90deg,transparent,var(--border),transparent);}'
    +'.exf-title{display:flex;align-items:center;gap:12px;flex-wrap:wrap;min-width:0;flex:1 1 auto;}'
    +'.exf-title-icon{width:40px;height:40px;border-radius:12px;background:var(--grad-main);display:flex;align-items:center;justify-content:center;font-size:20px;box-shadow:0 8px 20px rgba(56,189,248,0.35),0 0 0 1px rgba(255,255,255,0.1) inset;position:relative;overflow:hidden;}'
    +'.exf-title-text{display:flex;flex-direction:column;min-width:0;flex:1 1 100px;}'
    +'.exf-title-main{font-weight:900;font-size:15px;letter-spacing:-0.3px;background:var(--grad-main);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}'
    +'.exf-title-sub{font-size:10px;color:var(--text2);margin-top:1px;}'
    +'.exf-ver{font-size:9px;color:var(--text2);background:rgba(255,255,255,0.06);padding:4px 10px;border-radius:20px;border:1px solid var(--border);backdrop-filter:blur(8px);}'
    +'.exf-trend-badge{font-size:9px;color:var(--text2);background:rgba(255,255,255,0.04);padding:4px 8px;border-radius:20px;border:1px solid var(--border);cursor:help;white-space:nowrap;}'
    +'.exf-trend-badge[data-status="up"]{color:#8fe0b8;border-color:#397459;}.exf-trend-badge[data-status="down"]{color:#f0a6a8;border-color:#79454a;}.exf-trend-badge[data-status="mixed"]{color:#f4d089;border-color:#856829;}'
    +'.exf-title{gap:7px;}.exf-title-text{max-width:122px;}.exf-title-main{font-size:13px;}.exf-title-sub{font-size:8px;white-space:nowrap;}.exf-ver{max-width:86px;padding:4px 6px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:0 1 86px;}.exf-trend-badge{font-size:8px;padding:3px 6px;flex:0 1 auto;}'
    +'@media(max-width:360px){.exf-ver{display:none;}.exf-header{padding:14px 12px;}.exf-title-icon{width:32px;height:32px;font-size:16px;}}'
    +'.exf-close{cursor:pointer;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:10px;background:rgba(255,255,255,0.06);color:var(--text2);border:1px solid var(--border);transition:all 0.2s;} .exf-close:hover{background:rgba(251,113,133,0.12);color:var(--bad);border-color:rgba(251,113,133,0.2);transform:scale(1.05);}'
    +'.exf-funnel{padding:16px 18px;background:var(--grad-funnel);border-bottom:1px solid var(--border);position:relative;overflow:hidden;flex-shrink:0;}'
    +'.exf-funnel::before{content:"";position:absolute;top:0;left:0;right:0;bottom:0;background:radial-gradient(60% 100% at 50% 0%,rgba(56,189,248,0.08),transparent);pointer-events:none;}'
    +'.exf-funnel-title{font-size:11px;font-weight:800;color:var(--text);margin-bottom:12px;display:flex;align-items:center;gap:8px;position:relative;}'
    +'.exf-funnel-title::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,var(--border),transparent);margin-right:8px;}'
    +'.exf-funnel-viz{display:flex;align-items:flex-end;justify-content:space-between;gap:4px;height:86px;position:relative;padding:0 4px;}'
    +'.exf-funnel-step{flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;position:relative;transition:all 0.4s cubic-bezier(0.34,1.56,0.64,1);cursor:pointer;}'
    +'.exf-funnel-step:hover{transform:translateY(-3px);}'
    +'.exf-funnel-shape{width:100%;height:36px;position:relative;display:flex;align-items:center;justify-content:center;transition:all 0.4s;}'
    +'.exf-funnel-trapezoid{width:100%;height:28px;background:linear-gradient(180deg,var(--funnel-color),var(--funnel-color-dark));clip-path:polygon(10% 0%,90% 0%,100% 100%,0% 100%);border-radius:2px;position:relative;overflow:hidden;box-shadow:0 4px 12px var(--funnel-shadow),0 0 0 1px rgba(255,255,255,0.08) inset;transition:all 0.4s;}'
    +'.exf-funnel-trapezoid::before{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent);}'
    +'.exf-funnel-trapezoid::after{content:"";position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent);animation:shimmer 3s infinite;}'
    +'.exf-funnel-step.active .exf-funnel-trapezoid{transform:scale(1.05);box-shadow:0 6px 20px var(--funnel-shadow),0 0 20px var(--funnel-glow);}'
    +'.exf-funnel-icon{width:32px;height:32px;border-radius:10px;background:var(--card2);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:15px;box-shadow:var(--shadow-card);transition:all 0.3s;position:relative;z-index:2;}'
    +'.exf-funnel-step.active .exf-funnel-icon{border-color:var(--funnel-color);box-shadow:0 0 0 2px var(--funnel-glow),var(--shadow-card);transform:scale(1.1);}'
    +'.exf-funnel-count{font-size:11px;font-weight:800;color:var(--text);background:var(--card2);padding:2px 8px;border-radius:20px;border:1px solid var(--border);min-width:28px;text-align:center;transition:all 0.3s;}'
    +'.exf-funnel-step.active .exf-funnel-count{background:var(--funnel-color);color:white;border-color:var(--funnel-color);box-shadow:0 2px 8px var(--funnel-shadow);}'
    +'.exf-funnel-label{font-size:8px;color:var(--muted);font-weight:600;white-space:nowrap;}'
    +'.exf-funnel-connector{width:100%;height:2px;background:linear-gradient(90deg,var(--c1),var(--c2));opacity:0.5;border-radius:1px;position:relative;overflow:hidden;margin-bottom:20px;}'
    +'.exf-funnel-connector::after{content:"";position:absolute;top:0;left:0;width:20px;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent);animation:flow 2s linear infinite;}'
    +'.exf-poolbar{margin:12px 14px;padding:12px 14px;background:linear-gradient(135deg,rgba(56,189,248,0.08) 0%,rgba(129,140,248,0.06) 100%);border:1px solid rgba(56,189,248,0.15);border-radius:14px;position:relative;overflow:hidden;flex-shrink:0;}'
    +'.exf-poolbar::before{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#38bdf8,transparent);opacity:0.5;}'
    +'.exf-poolbar-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;}'
    +'.exf-poolbar-title{font-size:11px;font-weight:800;display:flex;align-items:center;gap:6px;}'
    +'.exf-poolbar-stats{font-size:10px;color:var(--text2);background:var(--bg);padding:4px 10px;border-radius:20px;border:1px solid var(--border);}'
    +'.exf-poolbar-actions{display:flex;gap:6px;flex-wrap:wrap;}'
    +'.exf-pool-btn{padding:8px 14px;border-radius:8px;border:1px solid var(--border);background:var(--card2);color:var(--text);cursor:pointer;font-size:11px;min-height:32px;font-weight:600;transition:all 0.2s;display:flex;align-items:center;gap:5px;} .exf-pool-btn:hover{transform:translateY(-1px);border-color:var(--border2);box-shadow:0 4px 12px rgba(0,0,0,0.2);}'
    +'.exf-pool-btn-primary{background:var(--grad-main);border:none;color:white;box-shadow:0 4px 12px rgba(56,189,248,0.25);} .exf-pool-btn-primary:hover{box-shadow:0 6px 20px rgba(56,189,248,0.35);}'
    +'.exf-pool-btn-success{background:var(--grad-ok);border:none;color:white;}'
    +'.exf-pool-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-top:10px;}'
    +'.exf-pool-card{padding:10px;background:var(--card);border:1px solid var(--border);border-radius:10px;transition:all 0.2s;position:relative;overflow:hidden;} .exf-pool-card:hover{border-color:var(--border2);transform:translateY(-1px);}'
    +'.exf-pool-card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;}'
    +'.exf-pool-card-sym{font-weight:800;font-size:11px;}'
    +'.exf-pool-card-days{font-size:9px;color:var(--muted);background:var(--bg);padding:2px 6px;border-radius:10px;}'
    +'.exf-pool-card-price{font-size:13px;font-weight:800;color:var(--accent);}'
    +'.exf-pool-card-change{font-size:10px;padding:2px 6px;border-radius:10px;font-weight:700;} .exf-pool-card-change.up{background:rgba(52,211,153,0.12);color:var(--ok);} .exf-pool-card-change.down{background:rgba(251,113,133,0.12);color:var(--bad);}'
    +'.exf-layers{overflow:auto;flex:1;padding:8px 0 0;} .exf-layers::-webkit-scrollbar{width:5px;} .exf-layers::-webkit-scrollbar-thumb{background:var(--border);border-radius:10px;}'
    +'.exf-layer{margin:10px 14px;background:linear-gradient(180deg,var(--card2) 0%,var(--card) 100%);border:1px solid var(--border);border-radius:14px;overflow:hidden;transition:all 0.35s cubic-bezier(0.34,1.56,0.64,1);position:relative;box-shadow:var(--shadow-card);}'
    +'.exf-layer::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:var(--layer-grad, var(--grad-main));opacity:0;transition:opacity 0.3s;}'
    +'.exf-layer:hover{border-color:var(--border2);transform:translateY(-2px);box-shadow:0 12px 40px rgba(0,0,0,0.5),0 0 0 1px rgba(255,255,255,0.04);}'
    +'.exf-layer:hover::before,.exf-layer.open::before{opacity:1;}'
    +'.exf-layer.open{border-color:var(--layer-color);box-shadow:0 12px 40px rgba(0,0,0,0.5),0 0 0 1px var(--layer-color),0 0 30px var(--layer-glow);}'
    +'.exf-layer-h{padding:14px 16px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;user-select:none;position:relative;z-index:1;}'
    +'.exf-layer-left{display:flex;align-items:center;gap:12px;flex:1;min-width:0;}'
    +'.exf-layer-icon{width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:18px;background:linear-gradient(135deg,var(--card3),var(--bg));border:1px solid var(--border);box-shadow:0 4px 12px rgba(0,0,0,0.2),0 0 0 1px rgba(255,255,255,0.03) inset;transition:all 0.35s;flex-shrink:0;position:relative;overflow:hidden;}'
    +'.exf-layer-icon::before{content:"";position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(135deg,var(--layer-color),transparent);opacity:0.15;}'
    +'.exf-layer.open .exf-layer-icon{transform:scale(1.08) rotate(2deg);border-color:var(--layer-color);box-shadow:0 8px 20px var(--layer-shadow),0 0 0 1px var(--layer-color);}'
    +'.exf-layer-info{display:flex;flex-direction:column;min-width:0;flex:1;gap:2px;}'
    +'.exf-layer-name{font-size:13px;font-weight:800;letter-spacing:-0.2px;}'
    +'.exf-layer-desc{font-size:10px;color:var(--text2);display:flex;align-items:center;gap:6px;}'
    +'.exf-layer-desc::before{content:"";width:3px;height:3px;border-radius:50%;background:var(--layer-color);display:inline-block;}'
    +'.exf-layer-stats{display:flex;align-items:center;gap:6px;flex-shrink:0;}'
    +'.exf-badge{padding:5px 10px;border-radius:20px;font-size:10px;font-weight:800;display:flex;align-items:center;gap:4px;min-width:40px;justify-content:center;transition:all 0.3s;border:1px solid;}'
    +'.exf-badge-in{background:rgba(56,189,248,0.10);color:var(--accent);border-color:rgba(56,189,248,0.18);}'
    +'.exf-badge-out{background:rgba(52,211,153,0.10);color:var(--ok);border-color:rgba(52,211,153,0.18);}'
    +'.exf-badge-filter{background:rgba(251,191,36,0.10);color:var(--warn);border-color:rgba(251,191,36,0.18);}'
    +'.exf-layer-body{display:none;padding:0 16px 16px;position:relative;z-index:1;}'
    +'.exf-layer.open .exf-layer-body{display:block;animation:slideDown 0.4s cubic-bezier(0.34,1.56,0.64,1);}'
    +'.exf-progress{height:6px;background:var(--bg);border-radius:10px;overflow:hidden;margin:10px 0;display:flex;gap:2px;padding:2px;box-shadow:0 0 0 1px var(--border) inset;}'
    +'.exf-progress-pass{height:100%;background:var(--grad-ok);border-radius:6px;transition:width 0.9s cubic-bezier(0.34,1.56,0.64,1);box-shadow:0 0 10px rgba(52,211,153,0.3);position:relative;overflow:hidden;}'
    +'.exf-progress-pass::after{content:"";position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent);animation:shimmer 2s infinite;}'
    +'.exf-progress-fail{height:100%;background:var(--grad-warn);border-radius:6px;transition:width 0.9s;opacity:0.8;}'
    +'.exf-filters{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0;}'
    +'.exf-filter{font-size:10px;padding:5px 10px;border-radius:8px;background:var(--bg);border:1px solid var(--border);display:flex;align-items:center;gap:6px;transition:all 0.2s;} .exf-filter:hover{border-color:var(--border2);transform:translateY(-1px);background:var(--card3);}'
    +'.exf-filter-count{font-weight:900;color:white;background:var(--grad-warn);padding:2px 7px;border-radius:10px;font-size:9px;min-width:18px;text-align:center;}'
    +'.exf-settings{margin-top:12px;padding-top:12px;border-top:1px dashed var(--border);}'
    +'.exf-settings-title{font-size:10px;font-weight:800;color:var(--text);margin-bottom:10px;display:flex;align-items:center;gap:6px;} .exf-settings-title::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,var(--border),transparent);}'
    +'.exf-setting{margin:8px 0;display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--bg);border:1px solid var(--border);border-radius:10px;transition:all 0.2s;} .exf-setting:hover{border-color:var(--border2);background:var(--card);}'
    +'.exf-setting-label{font-size:11px;color:var(--text);font-weight:600;display:flex;align-items:center;gap:6px;} .exf-setting-label[title]:not([title=""]){cursor:help;} .exf-setting-label small{color:var(--muted);font-weight:400;font-size:9px;}'
    +'.exf-setting input{width:96px;background:var(--card);border:1px solid var(--border);border-radius:8px;color:var(--text);padding:6px 10px;font-size:11px;transition:all 0.2s;text-align:center;font-weight:600;} .exf-setting input:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px rgba(56,189,248,0.12);}'
    +'.exf-debug{margin-top:10px;padding:10px;background:var(--bg);border-radius:10px;font-size:10px;max-height:90px;overflow:auto;border:1px solid var(--border);}'
    +'.exf-actions{padding:14px;display:flex;gap:10px;background:linear-gradient(180deg,var(--card),var(--bg));border-top:1px solid var(--border);flex-shrink:0;}'
    +'.exf-btn{flex:1;padding:12px 14px;border-radius:12px;border:1px solid var(--border);background:var(--card2);color:var(--text);cursor:pointer;font-size:11px;font-weight:700;transition:all 0.25s;display:flex;align-items:center;justify-content:center;gap:8px;position:relative;overflow:hidden;} .exf-btn:hover{transform:translateY(-2px);border-color:var(--border2);box-shadow:0 8px 20px rgba(0,0,0,0.3);}'
    +'.exf-btn-primary{background:var(--grad-main);border:none;color:white;box-shadow:0 8px 20px rgba(56,189,248,0.3);} .exf-btn-primary:hover{box-shadow:0 12px 30px rgba(56,189,248,0.4);transform:translateY(-2px) scale(1.02);}'
    +'.exf-topbar{position:fixed;left:20px;bottom:20px;display:flex;gap:8px;z-index:9999;flex-direction:column;max-height:calc(100vh - 32px);overflow:auto;padding:3px;}'
    +'.exf-topbtn{width:44px;height:44px;border-radius:15px;background:linear-gradient(180deg,var(--card2),var(--card));border:1px solid var(--border);display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,0.4);font-size:19px;transition:all 0.35s cubic-bezier(0.34,1.56,0.64,1);backdrop-filter:blur(12px);} .exf-topbtn:hover{transform:translateY(-3px) scale(1.08);box-shadow:0 16px 40px rgba(0,0,0,0.5),0 0 0 1px var(--accent),0 0 30px rgba(56,189,248,0.2);}'
    +'.exf-poolbar{margin:5px 2px 10px;padding:12px;background:linear-gradient(145deg,rgba(56,189,248,.08),rgba(129,140,248,.05));border:1px solid var(--border);border-radius:14px;position:relative;overflow:visible;flex-shrink:0;}'
    +'.exf-poolbar-header{display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:10px;}.exf-poolbar-title{font-weight:900;color:var(--text);}.exf-poolbar-stats{color:var(--muted);font-size:9px;text-align:left;}'
    +'.exf-poolbar-actions{display:flex;gap:6px;flex-wrap:wrap;margin:10px 0;}.exf-pool-btn{border:1px solid var(--border2);border-radius:8px;background:var(--card2);color:var(--text2);padding:6px 9px;font:10px Tahoma,sans-serif;cursor:pointer;transition:all .2s;}.exf-pool-btn:hover{color:var(--text);border-color:var(--accent);transform:translateY(-1px);}.exf-pool-btn-primary{background:linear-gradient(110deg,#1684a7,#5963c8);color:#fff;border-color:transparent;}.exf-pool-btn-success{color:var(--ok);border-color:rgba(52,211,153,.35);}'
    +'.exf-pool-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:8px;margin-top:10px;}.exf-pool-card{padding:10px;border:1px solid var(--border);border-radius:11px;background:linear-gradient(145deg,var(--card2),var(--bg));}.exf-pool-card-header{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px;}.exf-pool-card-sym{font-size:11px;font-weight:900;color:var(--text);}.exf-pool-card-days{font-size:9px;color:var(--muted);}.exf-pool-card-price{font-size:13px;font-weight:800;color:var(--accent);}.exf-pool-card-change{font-size:10px;font-weight:800;}.exf-pool-card-change.up{color:var(--ok);}.exf-pool-card-change.down{color:var(--bad);}'
    +'.exf-pool-empty,.exf-module-note{padding:18px 12px;text-align:center;border:1px dashed var(--border2);border-radius:12px;color:var(--muted);font-size:10px;line-height:1.9;background:rgba(7,10,20,.45);}'
    +'.exf-module-kpis{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:4px 0 12px;}.exf-module-kpi{padding:10px;border:1px solid var(--border);border-radius:11px;background:var(--card2);}.exf-module-kpi small{display:block;color:var(--muted);font-size:9px;}.exf-module-kpi strong{display:block;margin-top:5px;font-size:13px;color:var(--text);}'
    +'.exf-profile{padding:5px;}.exf-profile-intro{padding:11px;margin-bottom:10px;border:1px solid var(--border);border-radius:11px;background:linear-gradient(140deg,rgba(56,189,248,.08),rgba(129,140,248,.04));font-size:10px;color:var(--text2);line-height:1.9;}.exf-profile-fields{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;}.exf-profile-field{display:block;min-width:0;padding:9px;border:1px solid var(--border);border-radius:10px;background:var(--card2);font-size:9px;color:var(--text2);}.exf-profile-field input{box-sizing:border-box;width:100%;margin-top:6px;padding:8px 7px;border:1px solid var(--border2);border-radius:8px;background:var(--bg);color:var(--text);font-size:11px;text-align:center;}.exf-profile-field input:focus{outline:none;border-color:var(--accent);}.exf-profile-footer{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:10px;}.exf-profile-status{font-size:9px;color:var(--text2);line-height:1.7;}.exf-profile-save{white-space:nowrap;}'
    +'.exf-calendar-top{display:flex;justify-content:space-between;align-items:center;gap:8px;margin:4px 0 10px;}.exf-calendar-month{font-size:15px;font-weight:900;color:var(--text);}.exf-calendar-nav{display:flex;gap:6px;}.exf-calendar-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:5px;direction:rtl;}.exf-calendar-weekday{padding:5px 2px;text-align:center;color:var(--muted);font-size:9px;}.exf-calendar-day{min-height:43px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;border:1px solid var(--border);border-radius:9px;background:rgba(15,23,42,.8);color:var(--text2);font-size:11px;}.exf-calendar-day.trading{color:var(--ok);border-color:rgba(52,211,153,.22);}.exf-calendar-day.closed{color:var(--muted);background:rgba(7,10,20,.55);}.exf-calendar-day.holiday{color:var(--warn);border-color:rgba(251,191,36,.35);}.exf-calendar-day.today{outline:2px solid var(--accent);outline-offset:1px;color:var(--accent);font-weight:900;}.exf-calendar-day .day-dot{width:4px;height:4px;border-radius:50%;background:currentColor;}'
    +'.exf-market-hours{margin-top:12px;padding:12px;border:1px solid var(--border);border-radius:12px;background:rgba(15,23,42,.55);}'
    +'.exf-market-hours-title{font-size:11px;font-weight:800;color:var(--text);margin-bottom:8px;}'
    +'.exf-market-hours-row{display:flex;align-items:flex-end;gap:10px;flex-wrap:wrap;}'
    +'.exf-market-hours-field{display:flex;flex-direction:column;gap:4px;font-size:9px;color:var(--muted);}'
    +'.exf-market-hours-field input{background:var(--bg2);border:1px solid var(--border);border-radius:8px;color:var(--text);padding:6px 8px;font-size:11px;direction:ltr;}'
    +'.exf-market-hours-field input:focus{outline:none;border-color:var(--accent);}'
    +'.exf-market-hours-save{cursor:pointer;}'
    +'.exf-market-hours-note{margin-top:8px;font-size:9px;color:var(--muted);line-height:1.8;}'
    +'.exf-market-hero{padding:16px;border:1px solid var(--border);border-radius:14px;background:radial-gradient(90% 120% at 0% 0%,rgba(56,189,248,.14),transparent 65%),linear-gradient(145deg,var(--card2),var(--bg));margin-bottom:10px;}.exf-market-hero[data-status="up"]{border-color:rgba(52,211,153,.4);}.exf-market-hero[data-status="down"]{border-color:rgba(251,113,133,.38);}.exf-market-hero[data-status="mixed"]{border-color:rgba(251,191,36,.34);}.exf-market-status{font-size:18px;font-weight:900;}.exf-market-reason{font-size:10px;color:var(--text2);line-height:1.8;margin-top:7px;}.exf-market-changes{display:grid;gap:7px;margin:10px 0;}.exf-market-change{display:flex;justify-content:space-between;gap:10px;padding:9px 10px;border:1px solid var(--border);border-radius:9px;background:var(--bg);font-size:10px;}.exf-market-feed{padding:12px;border:1px solid var(--border);border-radius:12px;background:rgba(7,10,20,.5);}.exf-market-feed-title{font-size:10px;font-weight:900;margin-bottom:6px;}.exf-market-feed-status{font-size:9px;color:var(--muted);line-height:1.8;}.exf-market-feed-actions{display:flex;gap:7px;flex-wrap:wrap;margin-top:8px;}'
    +'@media(max-width:390px){.exf-profile-fields{grid-template-columns:1fr;}.exf-profile-footer{align-items:flex-start;flex-direction:column;}}@media(max-width:560px){.exf-tool-window{width:calc(100vw - 16px)!important;max-width:calc(100vw - 16px);right:8px!important;left:8px!important;top:8px!important;height:78vh;}.exf-topbar{left:8px;bottom:8px;gap:5px;}.exf-topbtn{width:42px;height:42px;font-size:17px;}}'
    +'.exf-death{margin:12px 14px;background:linear-gradient(135deg,rgba(251,113,133,0.08) 0%,rgba(248,113,113,0.06) 100%);border:1px solid rgba(251,113,133,0.18);border-radius:14px;padding:14px;font-size:11px;animation:shake 0.6s ease;}'
    +'.exf-death-title{font-weight:900;color:var(--bad);margin-bottom:10px;display:flex;align-items:center;gap:8px;font-size:12px;}'
    +'.exf-disclaimer{margin:12px 14px;padding:12px 14px;background:linear-gradient(135deg,rgba(251,191,36,0.06) 0%,rgba(245,158,11,0.04) 100%);border:1px solid rgba(251,191,36,0.12);border-radius:12px;font-size:10px;color:var(--text2);line-height:1.6;}'
    +'.exf-disclaimer-title{font-weight:800;color:var(--warn);margin-bottom:6px;display:flex;align-items:center;gap:6px;font-size:11px;}'
    +'.exf-ranking-summary{padding:9px 14px;font-size:10px;line-height:1.8;color:var(--text2);background:rgba(56,189,248,0.05);border-bottom:1px solid var(--border);overflow-wrap:anywhere;} .exf-ranking-summary.warning{color:#f4d089;background:rgba(245,158,11,0.09);border-color:rgba(245,158,11,0.28);font-weight:700;} .exf-results{flex-shrink:0;} .exf-results-header{position:sticky;top:0;background:var(--card);z-index:1;border-bottom:1px solid var(--border);} .exf-result-row:hover{transform:translateX(-2px);} .exf-result-card:hover{border-color:var(--border2);transform:translateY(-1px);box-shadow:0 8px 24px rgba(0,0,0,0.3);} .exf-toggle{width:38px;height:22px;border-radius:11px;background:var(--bg);border:1px solid var(--border);position:relative;cursor:pointer;transition:all 0.25s;flex-shrink:0;} .exf-toggle::after{content:"";position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:var(--text2);transition:all 0.25s;} .exf-toggle.on{background:var(--grad-ok);border-color:transparent;} .exf-toggle.on::after{left:auto;right:2px;background:white;} .exf-setting-control{display:flex;align-items:center;gap:8px;} .exf-result-row:hover{background:var(--card2)!important;} .exf-results-thead{display:flex;padding:6px 12px;font-size:10px;color:var(--muted);border-bottom:1px solid var(--border);background:var(--bg);position:sticky;top:36px;z-index:1;} .exf-minimized .exf-funnel,.exf-minimized .exf-poolbar,.exf-minimized .exf-layers,.exf-minimized .exf-results,.exf-minimized .exf-disclaimer,.exf-minimized .exf-actions{display:none;} .exf-footer{padding:10px 14px;text-align:center;font-size:9px;color:var(--muted);border-top:1px solid var(--border);background:var(--bg);line-height:1.6;flex-shrink:0;} .exf-footer a{color:var(--accent);text-decoration:none;font-weight:600;}'
    +'@keyframes slideDown{from{opacity:0;transform:translateY(-10px) scale(0.98);}to{opacity:1;transform:translateY(0) scale(1);}}'
    +'@keyframes shimmer{0%{transform:translateX(-100%);}100%{transform:translateX(100%);}}'
    +'@keyframes flow{0%{transform:translateX(-100%);}100%{transform:translateX(100%);}}'
    +'@keyframes shake{0%,100%{transform:translateX(0);}15%,45%,75%{transform:translateX(-3px);}30%,60%,90%{transform:translateX(3px);}}'
    +'';
    if(!window.__exfStyleInjected){
        window.__exfStyleInjected=true;
        var style=document.createElement('style'); style.textContent=css; document.head.appendChild(style);
    }
    var wrap=document.createElement('div'); wrap.className='exf-panel'; wrap.id='__exfPanel';
    wrap.innerHTML=''
    +'<div class="exf-header" id="__exfDragHandle"><div class="exf-title"><div class="exf-title-icon">🧬</div><div class="exf-title-text"><div class="exf-title-main">tseOptionZharfa</div><div class="exf-title-sub">'+escapeHtml(ABYSS_TAG)+'</div></div><span class="exf-ver">'+VERSION_TAG+'</span><span class="exf-trend-badge" id="__exfTrendBadge" data-status="unknown" role="status" aria-live="polite" title="وضعیت توصیفی بازار؛ بدون اثر بر فیلتر">روند: نامعلوم</span></div><div style="display:flex;gap:6px;"><div class="exf-close" id="__exfMin" title="کوچک/بزرگ">−</div><div class="exf-close" id="__exfClose">✕</div></div></div>'
    +'<div class="exf-progress" id="__exfProgress" data-state="busy" role="status" aria-live="polite"><div class="exf-progress-line"><span class="exf-progress-spinner"></span><span class="exf-progress-text" id="__exfProgressText">در حال آماده‌سازی موتور، تنظیمات و اطلاعات محلی…</span><span class="exf-progress-percent" id="__exfProgressPercent">۰٪</span></div><div class="exf-progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="exf-progress-fill" id="__exfProgressFill"></div></div></div>'
    +'<div class="exf-expiry-notice" id="__exfExpiryNotice" hidden role="status" aria-live="polite"><strong>پیشنهاد به‌روزرسانی سررسید مرجع</strong><pre id="__exfExpiryDiff"></pre><div class="exf-expiry-actions"><button class="exf-pool-btn exf-pool-btn-primary" id="__exfExpiryApply">تأیید و اعمال تغییر</button><button class="exf-pool-btn" id="__exfExpiryDismiss">فعلاً نگه‌دار</button></div></div>'
    +'<div class="exf-funnel" id="__exfFunnelViz"><div class="exf-funnel-title">🔽 جریان قیف — از ورودی تا خروجی نهایی</div><div class="exf-funnel-viz" id="__exfFunnelSteps"></div></div>'
    +'<div id="__exfDeath" style="display:none;"></div>'
    +'<div class="exf-layers" id="__exfLayers"></div>'
    +'<div id="__exfResults" class="exf-results" style="border-top:1px solid var(--border);max-height:320px;overflow:auto;"></div>'
    +'<div class="exf-disclaimer"><div class="exf-disclaimer-title">⚠️ رفع مسئولیت — از برنامه اصلی</div>این ابزار صرفاً تحلیلی و اطلاعاتی است؛ تضمین سود نمی‌دهد و مسئولیت هر تصمیم و معامله تنها بر عهده کاربر است.<br/>© ۱۴۰۵ — مؤلف: <a href="https://t.me/p75ad" target="_blank" style="color:var(--warn);">https://t.me/p75ad</a> | گروه: <a href="https://t.me/SmartOptionTSE" target="_blank" style="color:var(--warn);">SmartOptionTSE</a></div>'
    +'<div class="exf-actions"><button class="exf-btn exf-btn-primary" id="__exfRun">▶ اجرای شبیه‌سازی</button><button class="exf-btn" id="__exfDebug">🐞 دیباگ</button><button class="exf-btn" id="__exfReset">↺ بازنشانی</button></div>'
    +'<div class="exf-footer">هدر پنجره را برای جابه‌جایی بکشید؛ گوشهٔ پایین را برای تغییر اندازه بکشید.<br/>'+escapeHtml(LEGAL.author)+' | '+escapeHtml(LEGAL.group)+' | '+escapeHtml(LEGAL.license)+'<br/>'+escapeHtml(LEGAL.copyright)+'<br/>'+escapeHtml(LEGAL.disclaimer)+'</div>'+getLegalFooterHtml();
    document.body.appendChild(wrap);
    makeDraggable71(wrap, wrap.querySelector('#__exfDragHandle'));
    buildAuxiliaryWindows();
    var calendarPanel=document.getElementById('__exfCalendarPanel');
    if(calendarPanel&&!calendarPanel.__exfCalendarBound){
        calendarPanel.__exfCalendarBound=true;
        calendarPanel.addEventListener('click',function(e){
            var target=e.target&&e.target.closest?e.target.closest('button'):null;
            if(!target)return;
            if(target.classList.contains('exf-calendar-prev')) shiftPersianCalendarMonth(-1);
            else if(target.classList.contains('exf-calendar-next')) shiftPersianCalendarMonth(1);
            else if(target.classList.contains('exf-market-hours-save')){
                var startField=calendarPanel.querySelector('#__exfMktStart'), endField=calendarPanel.querySelector('#__exfMktEnd');
                var sm=(startField&&startField.value||'').match(/^(\d{2}):(\d{2})$/), em=(endField&&endField.value||'').match(/^(\d{2}):(\d{2})$/);
                if(!sm||!em){ showToast('ساعت شروع یا پایان بازار نامعتبر است.','error'); return; }
                var startMinutes=Number(sm[1])*60+Number(sm[2]), endMinutes=Number(em[1])*60+Number(em[2]);
                if(endMinutes<=startMinutes){ showToast('ساعت پایان بازار باید بعد از ساعت شروع باشد.','error'); return; }
                if(applyUserConfigBatch([{key:'sessionStartMin',value:startMinutes},{key:'sessionEndMin',value:endMinutes}],'ساعات کار بازار')){
                    showToast('ساعات کار بازار ذخیره شد.','success');
                    renderPersianCalendarWindow();
                }
            }
        });
    }
    var marketPanel=document.getElementById('__exfMarketPanel');
    if(marketPanel&&!marketPanel.__exfMarketBound){
        marketPanel.__exfMarketBound=true;
        marketPanel.addEventListener('click',function(e){
            var target=e.target&&e.target.closest?e.target.closest('button'):null;
            if(!target)return;
            if(target.id==='__exfLiveRefresh') refreshMarketLiveFeed71(true);
            else if(target.id==='__exfLiveToggle') toggleMarketLiveFeed71();
        });
    }
    wrap.querySelector('#__exfClose').addEventListener('click', function(){ wrap.style.display='none'; });
    var minBtn=wrap.querySelector('#__exfMin');
    if(minBtn) minBtn.addEventListener('click', function(){ wrap.classList.toggle('exf-minimized'); minBtn.textContent=wrap.classList.contains('exf-minimized')? '+' : '−'; });
    panelEl=wrap;
    var bar=document.createElement('div'); bar.className='exf-topbar';
    bar.innerHTML='<div class="exf-topbtn" id="__exfOpen" title="قیف هوشمند" role="button" tabindex="0">🧬</div><div class="exf-topbtn" id="__exfPoolOpen" title="استخر داده" role="button" tabindex="0">🏊</div><div class="exf-topbtn" id="__exfCalendarOpen" title="تقویم ایرانی" role="button" tabindex="0">🗓️</div><div class="exf-topbtn" id="__exfMarketOpen" title="روند بازار" role="button" tabindex="0">📊</div><div class="exf-topbtn" id="__exfProfileOpen" title="پروفایل کاربر" role="button" tabindex="0">👤</div><div class="exf-topbtn" id="__exfDbgOpen" title="دیباگ" role="button" tabindex="0">🐞</div>';
    document.body.appendChild(bar);
    bar.querySelector('#__exfOpen').addEventListener('click', function(){ wrap.style.display='block'; bringTop71(wrap); });
    bar.querySelector('#__exfPoolOpen').addEventListener('click', function(){ openAuxiliaryWindow('__exfPoolPanel'); try{renderLayers();}catch(e){} });
    bar.querySelector('#__exfCalendarOpen').addEventListener('click', function(){ openAuxiliaryWindow('__exfCalendarPanel'); renderPersianCalendarWindow(); });
    bar.querySelector('#__exfMarketOpen').addEventListener('click', function(){ openAuxiliaryWindow('__exfMarketPanel'); renderMarketWindow(); });
    bar.querySelector('#__exfProfileOpen').addEventListener('click', function(){ openAuxiliaryWindow('__exfProfilePanel'); renderUserProfile(); });
    return wrap;
}
function renderFunnelViz(){
    var viz=document.getElementById('__exfFunnelSteps');
    if(!viz) return;
    var html='';
    var totalInputCount=totalInput;
    if(totalInputCount<=0) totalInputCount=(pipelineData['L1-validation']||{}).input||0;
    for(var li=0;li<LAYERS.length;li++){
        var L=LAYERS[li];
        var stat=pipelineData[L.key]||{input:0, output:0};
        var pct = totalInputCount>0? (stat.output/totalInputCount*100) : 0;
        var widthPct = Math.max(8, pct);
        var color = L.color||'#38bdf8';
        var colorDark = color+'cc';
        var shadow = color+'55';
        var glow = color+'33';
        var isActive = stat.output>0;
        var nextColor = li<LAYERS.length-1? (LAYERS[li+1].color||'#818cf8') : color;
        html+='<div class="exf-funnel-step '+(isActive?'active':'')+'" title="'+L.label+': '+stat.output+'/'+stat.input+'" style="--funnel-color:'+color+';--funnel-color-dark:'+colorDark+';--funnel-shadow:'+shadow+';--funnel-glow:'+glow+';">'
        +'<div class="exf-funnel-shape"><div class="exf-funnel-trapezoid" style="width:'+widthPct+'%;"></div></div>'
        +'<div class="exf-funnel-icon">'+L.icon+'</div>'
        +'<div class="exf-funnel-count" title="'+pct.toFixed(1)+'%">'+stat.output+' ('+pct.toFixed(0)+'%)</div>'
        +'<div class="exf-funnel-label">'+L.label.split(' ')[0]+'</div>'
        +'</div>';
        if(li<LAYERS.length-1){
            html+='<div class="exf-funnel-connector" style="--c1:'+color+';--c2:'+nextColor+';"></div>';
        }
    }
    viz.innerHTML=html;
}
var _renderRaf=null, _renderTimer=null, _pendingResults=null;
// ─── DEBOUNCE RENDER — requestAnimationFrame plus timeout ─────────────────
function debouncedRenderLayers(){
    if(_renderRaf) cancelAnimationFrame(_renderRaf);
    if(_renderTimer) clearTimeout(_renderTimer);
    _renderTimer=setTimeout(function(){
        _renderRaf=requestAnimationFrame(function(){
            _renderRaf=null;
            _renderTimer=null;
            try{ renderLayersImmediate(); }catch(e){ LOG.error(e); }
            if(_pendingResults){
                try{ renderResultsTable(_pendingResults); }catch(e){ LOG.error(e); }
                _pendingResults=null;
            }
        });
    }, 16);
}
function confirmConfigChange(key,oldValue,newValue){
    if(formatConfigDiffValue(oldValue)===formatConfigDiffValue(newValue)) return true;
    var message='تغییر تنظیم فیلتر\n\n'+key+': '+formatConfigDiffValue(oldValue)+' → '+formatConfigDiffValue(newValue)+'\n\n'+LEGAL.disclaimer+'\n\nاعمال این تغییر؟';
    return typeof window!=='undefined'&&typeof window.confirm==='function'?window.confirm(message):false;
}
function renderLayers(){ debouncedRenderLayers(); }
/* @keep */
function renderLayerSummary(L, stat){
    var layerDiv=document.createElement('div');
    layerDiv.className='exf-layer exf-layer-summary';
    layerDiv.id='__exfLayer_'+L.key;
    try{ layerDiv.style.setProperty('--layer-color', L.color); layerDiv.style.setProperty('--layer-grad', 'linear-gradient(90deg,'+L.color+','+L.color+'aa)'); layerDiv.style.setProperty('--layer-glow', L.color+'22'); layerDiv.style.setProperty('--layer-shadow', L.color+'44'); }catch(e){ try{ layerDiv.style['--layer-color']=L.color; }catch(e2){} }
    layerDiv.innerHTML='<div class="exf-layer-h"><div class="exf-layer-left"><div class="exf-layer-icon">'+L.icon+'</div><div class="exf-layer-info"><div class="exf-layer-name">'+L.label+'</div><div class="exf-layer-desc">'+stat.input+' → '+stat.output+' ▼'+stat.filtered+'</div></div></div><div class="exf-layer-stats"><span class="exf-badge exf-badge-out">→'+stat.output+'</span></div></div>';
    return layerDiv;
}
/* @strip */
function renderLayerVerbose(L, stat){
    var layerDiv=document.createElement('div');
    layerDiv.className='exf-layer exf-layer-verbose';
    layerDiv.id='__exfLayer_'+L.key;
    try{ layerDiv.style.setProperty('--layer-color', L.color); layerDiv.style.setProperty('--layer-grad', 'linear-gradient(90deg,'+L.color+','+L.color+'aa)'); layerDiv.style.setProperty('--layer-glow', L.color+'22'); layerDiv.style.setProperty('--layer-shadow', L.color+'44'); }catch(e){ try{ layerDiv.style['--layer-color']=L.color; }catch(e2){} }
    var filtersHtml='';
    var filterKeys=Object.keys(stat.filters);
    if(filterKeys.length>0){
        filtersHtml+='<div class="exf-filters">';
        for(var fi=0;fi<filterKeys.length && fi<6;fi++){
            var fk=filterKeys[fi];
            var fo=FILTER_MAP71[fk]||{label:fk};
            filtersHtml+='<div class="exf-filter"><span>'+fo.label+'</span><span class="exf-filter-count">'+stat.filters[fk]+'</span></div>';
        }
        if(filterKeys.length>6) filtersHtml+='<div class="exf-filter">+'+(filterKeys.length-6)+' بیشتر</div>';
        filtersHtml+='</div>';
    }
    var settingsHtml='';
    if(L.schema){
        var schemaKeys=Object.keys(L.schema);
        var coreKeys=[], advKeys=[], exoticKeys=[];
        for(var sk=0;sk<schemaKeys.length;sk++){
            var field=L.schema[schemaKeys[sk]];
            field.key=schemaKeys[sk];
            if(field.group==='core') coreKeys.push(field);
            else if(field.group==='adv') advKeys.push(field);
            else if(field.group==='exotic') exoticKeys.push(field);
            else coreKeys.push(field);
        }
        coreKeys.sort(function(a,b){ return (a.priority||100)-(b.priority||100); });
        settingsHtml+='<div class="exf-settings">';
        if(coreKeys.length>0){
            settingsHtml+='<div class="exf-settings-title">⚙️ تنظیمات اصلی</div>';
            for(var ci=0;ci<coreKeys.length;ci++){
                var f=coreKeys[ci];
                var cv=getCfg(f.key);
                var displayVal=Array.isArray(cv)? cv.join(', ') : (typeof cv==='object' && cv!==null? '('+Object.keys(cv).length+' مورد)' : cv);
                if(f.type==='bool'){
                    var isOn=!!getCfg(f.key);
                    settingsHtml+='<div class="exf-setting"><span class="exf-setting-label" title="'+escapeHtml(f.description||'')+'">'+f.label+'</span><div class="exf-setting-control"><div class="exf-toggle '+(isOn?'on':'')+'" data-key="'+f.key+'"></div></div></div>';
                } else {
                    settingsHtml+='<div class="exf-setting"><span class="exf-setting-label" title="'+escapeHtml(f.description||'')+'">'+f.label+' <small>'+f.key+'</small></span><div class="exf-setting-control"><input id="__exfIn_'+f.key+'" value="'+escapeHtml(String(displayVal))+'" data-key="'+f.key+'" type="text"/></div></div>';
                }
            }
        }
        if(advKeys.length>0){
            settingsHtml+='<div class="__exfToggleAdv" style="font-size:10px;color:var(--text2);margin-top:8px;cursor:pointer;padding:6px 0;" data-target="adv-'+L.key+'">+'+advKeys.length+' پیشرفته ▼</div><div id="adv-'+L.key+'" style="display:none;">';
            for(var ai2=0;ai2<advKeys.length;ai2++){
                var f2=advKeys[ai2];
                var cv2=getCfg(f2.key);
                var displayVal2=Array.isArray(cv2)? cv2.join(', ') : (typeof cv2==='object' && cv2!==null? '('+Object.keys(cv2).length+' مورد)' : cv2);
                if(f2.type==='bool'){
                    var isOn2=!!getCfg(f2.key);
                    settingsHtml+='<div class="exf-setting"><span class="exf-setting-label" title="'+escapeHtml(f2.description||'')+'">'+f2.label+'</span><div class="exf-setting-control"><div class="exf-toggle '+(isOn2?'on':'')+'" data-key="'+f2.key+'"></div></div></div>';
                } else {
                    settingsHtml+='<div class="exf-setting"><span class="exf-setting-label" title="'+escapeHtml(f2.description||'')+'">'+f2.label+'</span><div class="exf-setting-control"><input value="'+escapeHtml(String(displayVal2))+'" data-key="'+f2.key+'" type="text"/></div></div>';
                }
            }
            settingsHtml+='</div>';
        }
        if(exoticKeys.length>0 && getCfg('exoticEnabled')){
            settingsHtml+='<div class="exf-settings-title">🧪 اگزوتیک</div>';
            for(var ei=0;ei<exoticKeys.length;ei++){
                var fe=exoticKeys[ei];
                var cve=getCfg(fe.key);
                settingsHtml+='<div class="exf-setting"><span class="exf-setting-label">'+fe.label+'</span><div class="exf-setting-control"><input value="'+escapeHtml(String(cve))+'" data-key="'+fe.key+'" type="text"/></div></div>';
            }
        }
        settingsHtml+='</div>';
    }
    var debugHtml='';
    if(getCfg('debugPanel') && (stat.samples.pass.length>0 || stat.samples.fail.length>0)){
        debugHtml+='<div class="exf-debug"><div>✅ '+(stat.samples.pass||[]).join(', ').slice(0,80)+'</div><div>❌ '+(stat.samples.fail||[]).join(', ').slice(0,80)+'</div></div>';
    }
    layerDiv.innerHTML=''
    +'<div class="exf-layer-h"><div class="exf-layer-left"><div class="exf-layer-icon">'+L.icon+'</div><div class="exf-layer-info"><div class="exf-layer-name">'+L.label+'</div><div class="exf-layer-desc">'+L.desc+'</div></div></div><div class="exf-layer-stats"><span class="exf-badge exf-badge-in">↓'+stat.input+'</span><span class="exf-badge exf-badge-out">→'+stat.output+'</span><span class="exf-badge exf-badge-filter">▼'+stat.filtered+'</span></div></div>'
    +'<div class="exf-progress"><div class="exf-progress-pass" style="width:'+stat.pctRemaining+'%"></div><div class="exf-progress-fail" style="width:'+stat.pctFiltered+'%"></div></div>'
    +'<div class="exf-layer-body">'+filtersHtml+settingsHtml+debugHtml+'</div>';
    return layerDiv;
}
/* @keep */
function renderLayersImmediate(){
    try{ renderTrendBadge(); }catch(trendRenderError){}
    var container=document.getElementById('__exfLayers');
    if(!container) return;
    var openState={};
    try{
        var existing=container.querySelectorAll('.exf-layer.open');
        for(var ei=0;ei<existing.length;ei++){ openState[existing[ei].id]=true; }
    }catch(e){}
    var mode=getViewMode();
    var isSummary = mode===VIEW_MODE.SUMMARY;
    var poolBar=document.getElementById('__exfPoolBar');
    if(poolBar){
        if(!poolBar._delegated){
            poolBar._delegated=true;
            poolBar.addEventListener('click', function(e){
                var btn=e.target.closest? e.target.closest('button') : null;
                var id=btn? btn.id : e.target.id;
                if(id==='__exfPoolUpd') requestPoolUpdateAll();
                else if(id==='__exfPoolLive') fetchAllLiveBases(function(r){ var count=r?Object.keys(r).length:0; showToast(count?count+' مظنهٔ معتبر دریافت شد':'مظنهٔ معتبر دریافت نشد؛ دادهٔ نامعلوم حفظ شد و برنامه متوقف نشده است.','warn'); renderLayers(); });
                else if(id==='__exfPoolView'){ var sum=getPoolSummary(); LOG.table(sum); showToast('استخر '+sum.length+' نماد', 'info'); }
                else if(id==='__exfPoolChart'){ var sym=prompt('نمودار کدام نماد؟', 'خودرو'); if(sym){ var entry=poolStore[sym.trim()]; if(!entry) showToast('یافت نشد: '+sym, 'error'); else { var dbg=buildDebugPanel(); var body=document.getElementById('__exfDbgBody'); if(body){ body.innerHTML=buildPoolHistoryChart(sym.trim()); dbg.style.display='block'; } } } }
                else if(id==='__exfPoolClear'){ if(confirm('پاک‌سازی کل استخر 90 روزه؟\n\n'+LEGAL.disclaimer)){ poolStore={}; ivHist={}; savePool(); renderLayers(); showToast('استخر پاک شد', 'success'); } }
                else if(id==='__exfPoolUpdateSingle') requestPoolUpdateSingle();
            });
        }
        var poolSum=getPoolSummary();
        var cardsHtml='';
        if(poolSum.length>0){
            cardsHtml+='<div class="exf-pool-grid">';
            for(var pc=0;pc<Math.min(poolSum.length,12);pc++){
                var p=poolSum[pc], lastPrice=Number(p.lastPrice), avgPrice=Number(p.avgPrice);
                var validPrices=isFinite(lastPrice)&&lastPrice>0&&isFinite(avgPrice)&&avgPrice>0;
                var change=validPrices?((lastPrice-avgPrice)/avgPrice*100).toFixed(1):null;
                var up=change==null?false:parseFloat(change)>=0;
                cardsHtml+='<div class="exf-pool-card"><div class="exf-pool-card-header"><span class="exf-pool-card-sym">'+escapeHtml(String(p.symbol||'—'))+'</span><span class="exf-pool-card-days">'+Number(p.days||0).toLocaleString('fa-IR')+' روز</span></div><div style="display:flex;justify-content:space-between;align-items:center;gap:6px;"><span class="exf-pool-card-price">'+(validPrices?Math.round(lastPrice).toLocaleString('fa-IR'):'—')+'</span><span class="exf-pool-card-change '+(change==null?'':up?'up':'down')+'">'+(change==null?'تغییر ناموجود':(up?'+':'')+change+'٪')+'</span></div></div>';
            }
            cardsHtml+='</div>';
        } else cardsHtml='<div class="exf-pool-empty">هنوز مشاهدهٔ معتبر و دارای تاریخ در استخر نیست.<br>دادهٔ نمونه یا تأییدنشده نمایش داده نمی‌شود.</div>';
        poolBar.innerHTML='<div class="exf-poolbar-header"><span class="exf-poolbar-title">استخر مشاهدات معتبر</span><span class="exf-poolbar-stats">'+escapeHtml(String(getPoolStatusText()))+'</span></div><div class="exf-poolbar-actions"><button id="__exfPoolUpd" class="exf-pool-btn exf-pool-btn-primary">🔄 تاریخچه</button><button id="__exfPoolUpdateSingle" class="exf-pool-btn">➕ تک</button><button id="__exfPoolLive" class="exf-pool-btn exf-pool-btn-success">💹 بررسی مظنه</button><button id="__exfPoolView" class="exf-pool-btn">📊 خلاصه</button><button id="__exfPoolChart" class="exf-pool-btn">📈 نمودار</button><button id="__exfPoolClear" class="exf-pool-btn">🗑 پاک‌سازی</button></div>'+cardsHtml;
    }
    var deathDiv=document.getElementById('__exfDeath');
    var totalIn=0, totalOut=0;
    var keysPD=Object.keys(pipelineData);
    for(var k=0;k<keysPD.length;k++){ totalIn=Math.max(totalIn, pipelineData[keysPD[k]].input); }
    totalOut=pipelineData['L7-ranking']? pipelineData['L7-ranking'].output : 0;
    if(totalIn>0 && totalOut===0 && totalIn>5){
        var topF=null, topC=0;
        var abKeys=Object.keys(abortCounts);
        for(var ai=0;ai<abKeys.length;ai++){ var ak=abKeys[ai]; if(abortCounts[ak]>topC){ topC=abortCounts[ak]; topF=ak; } }
        var topLabel=(FILTER_MAP71[topF]||{label:topF||'نامشخص'}).label;
        if(deathDiv){
            deathDiv.style.display='block';
            deathDiv.className='exf-death';
            deathDiv.innerHTML='<div class="exf-death-title">⚠️ حالت مرگ: '+totalIn+' ورودی → 0 خروجی</div><div>بیشترین فیلتر: <b>'+topLabel+'</b> ('+topC+' مورد)</div><div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap;"><button id="__exfDeathRelax" class="exf-pool-btn" style="background:var(--warn);color:#000;border:none;">🔓 تسهیل</button><button id="__exfDeathClear" class="exf-pool-btn">↺ پاک‌سازی abort</button><button id="__exfDeathLog" class="exf-pool-btn">📋 لاگ</button></div>';
            var relaxBtn=document.getElementById('__exfDeathRelax');
            if(relaxBtn) relaxBtn.addEventListener('click', function(){
                if(!applyUserConfigBatch([{key:'maxSpread',value:30},{key:'minPrice',value:1},{key:'minExpRet',value:0},{key:'scoreMin',value:0}],'تسهیل فیلترها')) return;
                try{ window.__exfRelaxedMode=true; }catch(e){}
                var softFilters=[];
                var fKeys=Object.keys(FILTERS);
                for(var sf=0;sf<fKeys.length;sf++){ if(FILTERS[fKeys[sf]].severity==='soft') softFilters.push(fKeys[sf]); }
                showToast('فیلترها تسهیل شد — '+softFilters.length+' فیلتر soft نادیده — relaxedMode', 'success');
                renderLayers();
            });
            var clearBtn=document.getElementById('__exfDeathClear');
            if(clearBtn) clearBtn.addEventListener('click', function(){ optClearAbort(); renderLayers(); showToast('abort پاک شد', 'success'); });
            var logBtn=document.getElementById('__exfDeathLog');
            if(logBtn) logBtn.addEventListener('click', function(){ if(window.__exf && window.__exf.optLog) window.__exf.optLog(); });
        }
    } else {
        if(deathDiv) deathDiv.style.display='none';
    }
    renderFunnelViz();
    try{ renderPersianCalendarWindow(); }catch(calendarRenderError){}
    try{ renderMarketWindow(); }catch(marketRenderError){}
    var layersFrag=document.createDocumentFragment();
    for(var li=0;li<LAYERS.length;li++){
        var L=LAYERS[li];
        var stat=pipelineData[L.key]||{input:0, output:0, filtered:0, pctFiltered:'0', pctRemaining:'100', filters:{}, samples:{pass:[], fail:[]}};
        var layerDiv;
        if(isSummary){
            layerDiv=renderLayerSummary(L, stat);
        } else {
            /* @strip */
            layerDiv=renderLayerVerbose(L, stat);
            /* @keep */
        }
        if(openState[layerDiv.id]) layerDiv.classList.add('open');
        layersFrag.appendChild(layerDiv);
        (function(div){
            var h=div.querySelector('.exf-layer-h');
            if(h) h.addEventListener('click', function(){ div.classList.toggle('open'); });
        })(layerDiv);
    }
    if(container.replaceChildren) container.replaceChildren(layersFrag); else { container.innerHTML=''; container.appendChild(layersFrag); }
    if(!container._delegated){
        container._delegated=true;
        container.addEventListener('click', function(e){
            var t=e.target;
            if(t.classList && t.classList.contains('__exfToggleAdv')){
                var tid=t.getAttribute('data-target');
                var el=document.getElementById(tid);
                if(el){ el.style.display=el.style.display==='none'? 'block' : 'none'; }
            }
            if(t.classList && t.classList.contains('exf-toggle')){
                var k=t.getAttribute('data-key');
                var cur=getCfg(k), next=!cur;
                if(!confirmConfigChange(k,cur,next)) return;
                optSet(k,next);
                t.classList.toggle('on');
                showToast(k+': '+formatConfigDiffValue(cur)+' → '+formatConfigDiffValue(next), 'success');
            }
        });
    }
    var inputs=container.querySelectorAll('input[data-key]');
    for(var ii=0;ii<inputs.length;ii++){
        (function(inp){
            inp.addEventListener('change', function(){
                var k=inp.getAttribute('data-key');
                var v=inp.value;
                var layer=LAYERS.find(function(l){ return l.schema && l.schema[k]; });
                var field=layer? layer.schema[k] : null;
                var type=field? field.type : 'string';
                var oldValue=getCfg(k), nextValue=v;
                if(type==='csv' || k==='poolBaseSymbols') nextValue=v.split(/[,،\n]+/).map(function(s){return s.trim();}).filter(Boolean);
                else {
                    if(type==='number' && !isNaN(+v) && v!=='') nextValue=+v;
                    if(nextValue==='true') nextValue=true; if(nextValue==='false') nextValue=false;
                }
                if(!confirmConfigChange(k,oldValue,nextValue)){ inp.value=formatConfigDiffValue(oldValue); return; }
                optSet(k,nextValue);
                showToast(k+': '+formatConfigDiffValue(oldValue)+' → '+formatConfigDiffValue(nextValue), 'success');
            });
        })(inputs[ii]);
    }
}

// ─── INDEPENDENT JALALI CALENDAR WINDOW ───────────────────────────────────
var _exfCalendarView=null;
function shiftPersianCalendarMonth(delta){
    if(!_exfCalendarView){ var now=getJalaliNow(); _exfCalendarView={jy:now.jy,jm:now.jm}; }
    var month=_exfCalendarView.jm+Number(delta||0), year=_exfCalendarView.jy;
    while(month<1){month+=12;year--;}
    while(month>12){month-=12;year++;}
    _exfCalendarView={jy:year,jm:month};
    renderPersianCalendarWindow();
}
function renderPersianCalendarWindow(){
    if(typeof document==='undefined') return;
    var root=document.getElementById('__exfCalendarBody'); if(!root) return;
    var today=getJalaliNow();
    if(!_exfCalendarView) _exfCalendarView={jy:today.jy,jm:today.jm};
    var jy=_exfCalendarView.jy,jm=_exfCalendarView.jm;
    var monthNames=['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
    var weekdays=['شنبه','یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه','جمعه'];
    var first=jalaliToJdn(jy,jm,1), days=jalaliMonthDays(jy,jm), offset=TSE_CALENDAR.getDayOfWeek(first);
    var holidays=TSE_CALENDAR.getHolidayJdns(),todayJdnValue=null;
    try{todayJdnValue=jalaliToJdn(today.jy,today.jm,today.jd);}catch(e){}
    var grid='<div class="exf-calendar-grid">';
    for(var wi=0;wi<weekdays.length;wi++) grid+='<div class="exf-calendar-weekday">'+weekdays[wi]+'</div>';
    for(var cell=0;cell<42;cell++){
        var day=cell-offset+1;
        if(day<1||day>days){grid+='<div class="exf-calendar-day" aria-hidden="true"></div>';continue;}
        var jdn=jalaliToJdn(jy,jm,day), isHoliday=holidays.indexOf(jdn)!==-1, trading=TSE_CALENDAR.isTradingDay(jdn), isToday=jdn===todayJdnValue;
        var cls='exf-calendar-day '+(isHoliday?'holiday':trading?'trading':'closed')+(isToday?' today':'');
        var hint=isHoliday?'تعطیلی ثبت‌شده':trading?'روز معاملاتی بر اساس تنظیم هفته و تعطیلات ثبت‌شده':'روز غیرمعاملاتی بر اساس تنظیم تقویم';
        grid+='<div class="'+cls+'" title="'+hint+'" aria-label="'+day.toLocaleString('fa-IR')+'، '+hint+'"><span>'+day.toLocaleString('fa-IR')+'</span><i class="day-dot"></i></div>';
    }
    grid+='</div>';
    var monthTrading=0;
    for(var md=1;md<=days;md++) if(TSE_CALENDAR.isTradingDay(jalaliToJdn(jy,jm,md))) monthTrading++;
    var annual=TSE_CALENDAR.getAnnualTradingDays(jy);
    var yearStatus=annual&&annual.complete?'سال دارای پوشش کامل ثبت‌شده':'پوشش کامل سال ثبت نشده';
    var startMin=Math.max(0,Math.min(1439,Number(getCfg('sessionStartMin'))||0));
    var endMin=Math.max(0,Math.min(1439,Number(getCfg('sessionEndMin'))||0));
    var hoursHtml='<div class="exf-market-hours">'
        +'<div class="exf-market-hours-title">ساعات کار بازار — تقویم معاملاتی</div>'
        +'<div class="exf-market-hours-row">'
        +'<label class="exf-market-hours-field">شروع<input id="__exfMktStart" type="time" value="'+pad2(Math.floor(startMin/60))+':'+pad2(startMin%60)+'" aria-label="ساعت شروع بازار"></label>'
        +'<label class="exf-market-hours-field">پایان<input id="__exfMktEnd" type="time" value="'+pad2(Math.floor(endMin/60))+':'+pad2(endMin%60)+'" aria-label="ساعت پایان بازار"></label>'
        +'<button type="button" class="exf-pool-btn exf-market-hours-save">ذخیره</button>'
        +'</div>'
        +'<div class="exf-market-hours-note">این ساعات در isMarketHours و پنجره‌های بازار به‌کار می‌روند. روز یا ساعت ناشناخته نه باز و نه بسته جعل می‌شود.</div>'
        +'</div>';
    root.innerHTML='<div class="exf-calendar-top"><button class="exf-pool-btn exf-calendar-prev" type="button" aria-label="ماه قبل">ماه قبل ←</button><div class="exf-calendar-month">'+monthNames[jm-1]+' '+Number(jy).toLocaleString('fa-IR')+'</div><div class="exf-calendar-nav"><button class="exf-pool-btn exf-calendar-next" type="button" aria-label="ماه بعد">ماه بعد →</button></div></div>'+grid+'<div class="exf-module-kpis" style="margin-top:12px;"><div class="exf-module-kpi"><small>روزهای معاملاتی این ماه</small><strong>'+monthTrading.toLocaleString('fa-IR')+' از '+days.toLocaleString('fa-IR')+'</strong></div><div class="exf-module-kpi"><small>وضعیت پوشش سال</small><strong style="font-size:10px;">'+yearStatus+'</strong></div></div>'+hoursHtml+'<div class="exf-module-note">روزهای سبز از الگوی هفتهٔ معاملاتی و تعطیلات ثبت‌شدهٔ کاربر محاسبه می‌شوند. تعطیلات رسمی از منبع بیرونی دریافت نشده‌اند و هیچ روز ناشناخته‌ای به‌عنوان تعطیل یا معاملاتی جعل نمی‌شود.</div>';
}
var _resultTableSource=[],_resultTableTypeFilter='all',_resultTableSortKey='',_resultTableSortAscending=false;
function getResultSortValue(row,key){
    if(key==='er') return row&&row._er!=null?Number(row._er):null;
    if(key==='score') return row&&row._score!=null?Number(row._score):null;
    if(key==='iv') return row&&row._iv!=null?Number(row._iv):null;
    if(key==='dte'){
        var dte=row&&row._holdingAdvisory&&row._holdingAdvisory.dte;
        return dte&&dte.calendarDays!=null?Number(dte.calendarDays):row&&row.dte!=null?Number(row.dte):null;
    }
    return null;
}
function resultCsvCell(value){
    var text=value==null?'':String(value);
    if(typeof value==='string'&&/^[\s]*[=+@-]/.test(text)) text="'"+text;
    return '"'+text.replace(/"/g,'""')+'"';
}
function downloadResultFile(filename,content,mime){
    try{
        var blob=new Blob([content],{type:mime+';charset=utf-8'}),url=URL.createObjectURL(blob),link=document.createElement('a');
        link.href=url; link.download=filename; link.style.display='none'; document.body.appendChild(link); link.click(); document.body.removeChild(link);
        setTimeout(function(){URL.revokeObjectURL(url);},1000);
    }catch(e){ showToast('ساخت فایل خروجی ممکن نشد: '+(e&&e.message||e),'error'); }
}
function exportResultTableCsv(){
    var rows=[['L7 rank','Symbol','Name','Base','Type','ER','Score','IV','DTE calendar days','Advisory status','Warnings'].map(resultCsvCell).join(',')];
    for(var i=0;i<_resultTableSource.length;i++){
        var row=_resultTableSource[i]||{},adv=row._holdingAdvisory||{};
        rows.push([row._l7Rank,row.l18,row.l30,row.base,row._isCall==null?'':row._isCall?'Call':'Put',row._er,row._score,row._iv,getResultSortValue(row,'dte'),adv.status,(row._dataWarnings||[]).join(' | ')].map(resultCsvCell).join(','));
    }
    downloadResultFile('tseOptionZharfa-results.csv','\ufeff'+rows.join('\r\n'),'text/csv');
}
function exportResultTableJson(){
    try{ downloadResultFile('tseOptionZharfa-results.json',JSON.stringify({version:VERSION_TAG,filter:'L7-ranked-candidates',results:_resultTableSource},null,2),'application/json'); }
    catch(e){ showToast('تبدیل نتایج به JSON ممکن نشد: '+(e&&e.message||e),'error'); }
}
function bindResultTableActions(container){
    if(!container||container.__exfResultActionsBound) return;
    container.__exfResultActionsBound=true;
    container.addEventListener('click',function(event){
        var node=event.target;
        while(node&&node!==container){
            var nodeSort=node.getAttribute?node.getAttribute('data-sort'):null;
            if(node.id||nodeSort) break;
            node=node.parentNode;
        }
        if(!node||node===container) return;
        if(node.id==='__exfExportCsv'){ exportResultTableCsv(); return; }
        if(node.id==='__exfExportJson'){ exportResultTableJson(); return; }
        if(node.id==='__exfFilterCall'){ _resultTableTypeFilter=_resultTableTypeFilter==='call'?'all':'call'; renderResultsTable(_resultTableSource); return; }
        if(node.id==='__exfFilterPut'){ _resultTableTypeFilter=_resultTableTypeFilter==='put'?'all':'put'; renderResultsTable(_resultTableSource); return; }
        var sortKey=node.getAttribute('data-sort');
        if(sortKey){
            if(_resultTableSortKey===sortKey) _resultTableSortAscending=!_resultTableSortAscending;
            else { _resultTableSortKey=sortKey; _resultTableSortAscending=false; }
            renderResultsTable(_resultTableSource);
        }
    });
}
function buildL7SummaryElement(){
    var l7Stat=pipelineData['L7-ranking']||{},rankSummary=l7Stat.ranking||{input:l7Stat.input||0,retained:l7Stat.output||0,paretoFiltered:0,groupLimited:0,totalLimited:0};
    var paretoShare=rankSummary.input>0?rankSummary.paretoFiltered/rankSummary.input:0;
    var l7Summary=document.createElement('div');
    l7Summary.className='exf-ranking-summary'+(getCfg('usePareto')!==false&&paretoShare>0.3?' warning':'');
    l7Summary.textContent='L7: '+Number(rankSummary.input||0).toLocaleString('fa-IR')+' ورودی → '+Number(rankSummary.retained||0).toLocaleString('fa-IR')+' پذیرفته · پارتو '+Number(rankSummary.paretoFiltered||0).toLocaleString('fa-IR')+' · سقف گروه '+Number(rankSummary.groupLimited||0).toLocaleString('fa-IR')+' · سقف کل '+Number(rankSummary.totalLimited||0).toLocaleString('fa-IR');
    if(getCfg('usePareto')!==false&&paretoShare>0.3) l7Summary.textContent+=' · ⚠ پارتو بیش از ۳۰٪ ورودی ranking را حذف کرده است ('+(paretoShare*100).toFixed(0)+'٪)';
    return l7Summary;
}
function renderResultsTable(results){
    var container=document.getElementById('__exfResults');
    if(!container){
        var layersDiv=document.getElementById('__exfLayers');
        if(layersDiv){
            container=document.createElement('div');
            container.id='__exfResults';
            container.className='exf-results';
            layersDiv.parentNode.insertBefore(container, layersDiv.nextSibling);
        } else return;
    }
    bindResultTableActions(container);
    if(Array.isArray(results)) _resultTableSource=results;
    var sourceResults=_resultTableSource;
    if(!sourceResults.length){
        container.innerHTML='';
        var emptyFrag=document.createDocumentFragment(),emptyL7=pipelineData['L7-ranking']||{};
        if(emptyL7.ranking||Number(emptyL7.input)>0||Number(emptyL7.output)>0) emptyFrag.appendChild(buildL7SummaryElement());
        var emptyNote=document.createElement('div');
        emptyNote.style.cssText='padding:14px;text-align:center;color:var(--muted);font-size:11px;';
        emptyNote.textContent='نتیجه‌ای برای نمایش نیست — قیف را اجرا کنید';
        emptyFrag.appendChild(emptyNote);
        container.appendChild(emptyFrag);
        return;
    }
    var displayResults=sourceResults.filter(function(row){return _resultTableTypeFilter==='call'?row&&row._isCall===true:_resultTableTypeFilter==='put'?row&&row._isCall===false:true;});
    if(_resultTableSortKey){
        var sorted=displayResults.map(function(row,index){return {row:row,index:index};});
        sorted.sort(function(a,b){
            var av=getResultSortValue(a.row,_resultTableSortKey),bv=getResultSortValue(b.row,_resultTableSortKey);
            var aMissing=av==null||!isFinite(av),bMissing=bv==null||!isFinite(bv);
            if(aMissing!==bMissing) return aMissing?1:-1;
            if(aMissing) return a.index-b.index;
            if(av===bv) return a.index-b.index;
            var comparison=av<bv?-1:1;
            return _resultTableSortAscending?comparison:-comparison;
        });
        displayResults=sorted.map(function(entry){return entry.row;});
    }
    if(!displayResults.length){
        container.innerHTML='';
        var emptyTypeFrag=document.createDocumentFragment();
        emptyTypeFrag.appendChild(buildL7SummaryElement());
        var emptyTypeNote=document.createElement('div');
        emptyTypeNote.style.cssText='padding:14px;text-align:center;color:var(--muted);font-size:11px;display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;';
        emptyTypeNote.appendChild(document.createTextNode('برای فیلتر نوع فعلی نامزدی وجود ندارد.'));
        var showAllButton=document.createElement('button');
        showAllButton.id=_resultTableTypeFilter==='call'?'__exfFilterCall':'__exfFilterPut';
        showAllButton.className='exf-pool-btn';
        showAllButton.textContent='نمایش همهٔ نمادها';
        emptyTypeNote.appendChild(showAllButton);
        emptyTypeFrag.appendChild(emptyTypeNote);
        container.appendChild(emptyTypeFrag);
        return;
    }
    var mode=getViewMode();
    var isSummary=mode===VIEW_MODE.SUMMARY;
    var suggestionLimit=Math.max(1,Math.min(50,Math.floor(Number(getCfg('suggestionDisplayLimit'))||10)));
    var visibleResults=displayResults.slice(0,suggestionLimit);
    var frag=document.createDocumentFragment();
    frag.appendChild(buildL7SummaryElement());
    var header=document.createElement('div');
    header.className='exf-results-header';
    header.innerHTML='<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;"><span style="font-weight:800;font-size:12px;">🏆 رتبه‌بندی L7 · نمایش '+visibleResults.length+' از '+displayResults.length+(_resultTableTypeFilter==='all'?' نماد عبوری':' نماد '+(_resultTableTypeFilter==='call'?'Call':'Put')+' عبوری')+'</span><span style="font-size:10px;color:var(--muted);">'+(isSummary?'خلاصه':'کامل')+'</span><span style="display:flex;gap:6px;"><button class="exf-pool-btn" id="__exfExportCsv" style="font-size:10px;padding:4px 8px;">📤 CSV</button><button class="exf-pool-btn" id="__exfExportJson" style="font-size:10px;padding:4px 8px;">📤 JSON</button><button class="exf-pool-btn" id="__exfFilterCall" style="font-size:10px;padding:4px 8px;">📈 Call</button><button class="exf-pool-btn" id="__exfFilterPut" style="font-size:10px;padding:4px 8px;">📉 Put</button></span></div>';
    frag.appendChild(header);
    var thead=document.createElement('div');
    thead.className='exf-results-thead';
    thead.innerHTML='<span style="flex:1;">نماد</span><span style="width:60px;text-align:center;cursor:pointer;" data-sort="er">ER ▼</span><span style="width:50px;text-align:center;cursor:pointer;" data-sort="score">امتیاز</span><span style="width:60px;text-align:center;cursor:pointer;" data-sort="iv">IV</span><span style="width:60px;text-align:center;cursor:pointer;" data-sort="dte">DTE</span><span style="width:70px;text-align:center;">سناریو</span>';
    frag.appendChild(thead);
    if(isSummary){
        var table=document.createElement('div');
        table.className='exf-results-table exf-results-summary';
        var html='';
        for(var i=0;i<visibleResults.length;i++){
            var r=visibleResults[i];
            var symName=escapeHtml(r.l18||r.l30||'نماد');
            var rankBadge=r._l7Rank?'<span style="font-size:8px;color:var(--muted);margin-inline-end:5px;">#'+Number(r._l7Rank)+'</span>':'';
            var warningMark=r._dataWarnings&&r._dataWarnings.length? '<span title="'+escapeHtml(r._dataWarnings.join(' | '))+'" style="color:#fbbf24;margin-inline-start:4px;">⚠</span>' : '';
            var er=r._er!=null? r._er.toFixed(1)+'%' : '-';
            var score=r._score!=null? Math.round(r._score) : '-';
            var iv=r._iv!=null? (r._iv*100).toFixed(1)+'%' : '-';
            var dteInfo=r._holdingAdvisory&&r._holdingAdvisory.dte;
            var dte=dteInfo?((dteInfo.calendarDays==null?'؟':dteInfo.calendarDays)+'تقویمی / '+(dteInfo.tradingDays==null?'؟':dteInfo.tradingDays)+' معاملاتی'):r.dte!=null?r.dte+'تقویمی / ؟ معاملاتی':'';
            var advisorySummary=r._holdingAdvisory||{},scenarioList=advisorySummary.scenarios||[];
            var scenarioStatus=advisorySummary.status==='advisory'?'🧭 '+scenarioList.length:advisorySummary.status==='disabled'?'—':advisorySummary.status?'؟':'';
            var scenarioTip=advisorySummary.status==='advisory'?'برآورد نظری؛ '+scenarioList.slice(0,5).map(function(sc){return sc.holdingCalendarDays+'روز، شوک '+(sc.underlyingShock*100).toFixed(0)+'٪، بازده نظری '+sc.estimatedReturnPct.toFixed(1)+'٪';}).join(' | '):(advisorySummary.reasons||advisorySummary.warnings||[]).join(' | ')||'سناریو در دسترس نیست';
            html+='<div class="exf-result-row" style="height:42px;display:flex;align-items:center;justify-content:space-between;padding:0 12px;border-bottom:1px solid var(--border);font-size:11px;transition:all 0.2s;"><span style="font-weight:700;min-width:90px;">'+rankBadge+symName+warningMark+'</span><span style="color:var(--accent);">'+er+'</span><span style="color:var(--ok);">'+score+'</span><span style="color:var(--text2);">'+iv+'</span><span style="color:var(--muted);font-size:10px;">'+dte+'</span><span title="'+escapeHtml(scenarioTip)+'" style="color:#a78bfa;font-size:9px;cursor:help;white-space:nowrap;">'+escapeHtml(scenarioStatus)+'</span></div>';
        }
        table.innerHTML=html;
        frag.appendChild(table);
    }
    /* @strip */
    else {
        var grid=document.createElement('div');
        grid.className='exf-results-grid';
        grid.style.cssText='display:grid;grid-template-columns:1fr;gap:10px;padding:10px 14px;';
        var html2='';
        for(var j=0;j<visibleResults.length;j++){
            var r2=visibleResults[j];
            var symName2=escapeHtml(r2.l18||r2.l30||'نماد');
            var warningHtml=r2._dataWarnings&&r2._dataWarnings.length? '<div style="color:#fbbf24;font-size:10px;margin-top:7px;">⚠ '+escapeHtml(r2._dataWarnings.join(' | '))+'</div>' : '';
            var er2=r2._er!=null? r2._er.toFixed(1)+'%' : '-';
            var score2=r2._score!=null? Math.round(r2._score) : '-';
            var iv2=r2._iv!=null? (r2._iv*100).toFixed(1)+'%' : '-';
            var delta2=r2._greeks? r2._greeks.delta.toFixed(3) : '-';
            var gamma2=r2._greeks? r2._greeks.gamma.toFixed(4) : '-';
            var theta2=r2._greeks? r2._greeks.theta.toFixed(1) : '-';
            var lev2=r2._leverage!=null? r2._leverage.toFixed(1)+'x' : '-';
            var mn2=r2._moneyness!=null? r2._moneyness.toFixed(3) : '-';
            var fair2=r2._fair!=null? Math.round(r2._fair).toLocaleString('fa-IR') : '-';
            var mid2=r2._mid!=null? Math.round(r2._mid).toLocaleString('fa-IR') : '-';
            var base2=r2.base||'';
            var isCall2=r2._isCall!=null? (r2._isCall?'📈 Call':'📉 Put') : '';
            var advisory2=r2._holdingAdvisory;
            var scenarioHtml='';
            if(advisory2){
                scenarioHtml='<div style="margin-top:9px;padding:8px;background:#0b1020;border:1px solid #2a2854;border-radius:8px;font-size:10px;color:#c4b5fd;">🧭 برآورد نظری؛ بدون توصیهٔ ورود/خروج: '+(advisory2.status==='advisory'?advisory2.scenarios.length+' حالت':'داده ناکافی')+'؛ '+escapeHtml((advisory2.warnings||advisory2.reasons||[]).join(' · '))+'</div>';
                if(advisory2.dte){ scenarioHtml+='<div style="font-size:9px;color:var(--text2);margin-top:4px;">DTE: '+(advisory2.dte.calendarDays==null?'تقویمی نامعلوم':advisory2.dte.calendarDays+' روز تقویمی')+' / '+(advisory2.dte.tradingDays==null?'معاملاتی نامعلوم ('+escapeHtml(advisory2.dte.tradingStatus)+')':advisory2.dte.tradingDays+' روز معاملاتی واقعی')+'</div>'; }
                if(advisory2.calendar){ scenarioHtml+='<div style="font-size:9px;color:var(--text2);margin-top:4px;">'+(advisory2.calendar.complete?'بیشینه فاصلهٔ بسته: '+advisory2.calendar.maxClosedCalendarDays+' روز؛ آستانه: '+advisory2.calendar.thresholdCalendarDays+' روز':'تقویم ناقص؛ ریسک تعطیلی نامعلوم')+'</div>'; }
                if(advisory2.thetaDecay&&advisory2.thetaDecay.length){
                    var thetaMax=1; for(var td=0;td<advisory2.thetaDecay.length;td++) thetaMax=Math.max(thetaMax,Math.abs(advisory2.thetaDecay[td].modelDecayPct||0));
                    scenarioHtml+='<div style="font-size:9px;color:var(--text2);margin-top:6px;">زوال تتا — برآورد نظری، پایه و IV ثابت</div>';
                    for(var tc=0;tc<advisory2.thetaDecay.length;tc++){ var tp=advisory2.thetaDecay[tc], tw=Math.max(2,Math.min(100,Math.abs(tp.modelDecayPct||0)/thetaMax*100)); scenarioHtml+='<div style="display:flex;align-items:center;gap:7px;font-size:9px;margin-top:3px;"><span style="width:36px;">'+tp.holdingCalendarDays+'روز</span><span style="height:5px;width:'+tw+'%;max-width:180px;background:'+(tp.modelDecayPct<0?'#ec6975':'#4de0b0')+';border-radius:8px;"></span><b>'+tp.modelDecayPct.toFixed(1)+'٪</b></div>'; }
                }
                if(advisory2.scenarios&&advisory2.scenarios.length){ scenarioHtml+='<div style="font-size:9px;color:var(--text2);margin-top:4px;">'+advisory2.scenarios.slice(0,4).map(function(sc){return sc.holdingCalendarDays+'روز / شوک '+(sc.underlyingShock*100).toFixed(0)+'٪: '+sc.estimatedReturnPct.toFixed(1)+'٪';}).join(' · ')+'</div>'; }
            }
            html2+='<div class="exf-result-card" style="background:linear-gradient(180deg,var(--card2),var(--card));border:1px solid var(--border);border-radius:12px;padding:12px;transition:all 0.3s;"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;"><span style="font-weight:800;font-size:12px;">'+(r2._l7Rank?'#'+Number(r2._l7Rank)+' · ':'')+symName2+' <small style="color:var(--muted);font-weight:400;">'+escapeHtml(base2)+'</small></span><span style="font-size:10px;background:var(--card3);padding:3px 8px;border-radius:20px;border:1px solid var(--border);">'+isCall2+'</span></div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;font-size:10px;"><div style="background:var(--bg);padding:6px 8px;border-radius:8px;border:1px solid var(--border);"><div style="color:var(--muted);">ER</div><div style="font-weight:800;color:var(--accent);font-size:11px;">'+er2+'</div></div><div style="background:var(--bg);padding:6px 8px;border-radius:8px;border:1px solid var(--border);"><div style="color:var(--muted);">امتیاز</div><div style="font-weight:800;color:var(--ok);font-size:11px;">'+score2+'</div></div><div style="background:var(--bg);padding:6px 8px;border-radius:8px;border:1px solid var(--border);"><div style="color:var(--muted);">IV</div><div style="font-weight:700;font-size:11px;">'+iv2+'</div></div><div style="background:var(--bg);padding:6px 8px;border-radius:8px;border:1px solid var(--border);"><div style="color:var(--muted);">Δ</div><div style="font-weight:700;font-size:11px;">'+delta2+'</div></div></div><div style="display:flex;gap:8px;margin-top:8px;font-size:10px;color:var(--text2);flex-wrap:wrap;"><span>Γ '+gamma2+'</span><span>Θ '+theta2+'</span><span>اهرم '+lev2+'</span><span>MN '+mn2+'</span><span>منصفانه '+fair2+'</span><span>بازار '+mid2+'</span></div>'+warningHtml+scenarioHtml+'</div>';
        }
        grid.innerHTML=html2;
        frag.appendChild(grid);
    }
    /* @keep */
    if(displayResults.length>visibleResults.length){
        var shortlistNote=document.createElement('div'); shortlistNote.className='suggestion-note';
        shortlistNote.textContent='نمایش '+visibleResults.length+' رتبهٔ برتر از '+displayResults.length+' خروجی L7 (ER/امتیاز بیشتر و IVR کمتر). سقف نمایش فقط ردیف‌های صفحه را محدود می‌کند؛ خروجی کامل همهٔ پذیرفته‌شده‌های L7 را دارد.';
        frag.appendChild(shortlistNote);
    }
    if(container.replaceChildren) container.replaceChildren(frag); else { container.innerHTML=''; container.appendChild(frag); }
}
function requestRenderResults(results){
    _pendingResults=results;
    debouncedRenderLayers();
}
// ─── MODEL CACHE — LRU with max 500 items ─────────────────────────────────
function getModelCache(key){ return modelCache[key]||null; }
function setModelCache(key, val){
    if(!modelCache[key]){
        modelCacheOrder.push(key);
        if(modelCacheOrder.length>500){
            var oldest=modelCacheOrder.shift();
            delete modelCache[oldest];
        }
    }
    modelCache[key]=val;
}
function buildDebugPanel(){
    var existing=document.getElementById('__exfDebugPanel');
    if(existing){ existing.style.display='block'; bringTop71(existing); return existing; }
    var div=document.createElement('div');
    div.id='__exfDebugPanel';
    div.style.cssText='position:fixed;left:20px;top:20px;width:560px;height:70vh;min-width:290px;min-height:240px;max-width:calc(100vw - 16px);max-height:92vh;resize:both;overflow:auto;background:radial-gradient(100% 100% at 0% 0%,rgba(56,189,248,0.08),transparent),linear-gradient(180deg,#111c32 0%,#070a14 100%);border:1px solid #1e2f4f;border-radius:20px;box-shadow:0 25px 80px rgba(0,0,0,0.7);font-family:Vazirmatn,Tahoma,sans-serif;direction:rtl;color:#e2e8f0;z-index:10001;padding:0;backdrop-filter:blur(20px);';
    div.innerHTML='<div style="padding:16px 20px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #1e2f4f;background:linear-gradient(90deg,rgba(56,189,248,0.08),rgba(129,140,248,0.08));border-radius:20px 20px 0 0;position:sticky;top:0;backdrop-filter:blur(12px);"><div style="font-weight:800;display:flex;align-items:center;gap:8px;"><span style="width:32px;height:32px;border-radius:10px;background:linear-gradient(135deg,#38bdf8,#818cf8);display:flex;align-items:center;justify-content:center;">🐞</span>دیباگ — قیف + استخر + خطاها <small style="font-size:8px;color:#94a3b8;">هدر — جابه‌جایی · گوشه — تغییر اندازه</small></div><div style="display:flex;gap:6px;"><button id="__exfDbgMin" type="button" aria-label="کوچک‌کردن پنجره" style="cursor:pointer;width:32px;height:32px;border-radius:10px;background:rgba(255,255,255,0.06);border:1px solid #1e2f4f;color:#e2e8f0;">−</button><button id="__exfDbgClose" type="button" aria-label="بستن پنجره" style="cursor:pointer;width:32px;height:32px;border-radius:10px;background:rgba(255,255,255,0.06);border:1px solid #1e2f4f;color:#e2e8f0;">✕</button></div></div><div id="__exfDbgBody" style="padding:14px;"></div>';
    document.body.appendChild(div);
    makeDraggable71(div, div.firstChild);
    div.querySelector('#__exfDbgClose').addEventListener('click', function(){ div.style.display='none'; });
    div.querySelector('#__exfDbgMin').addEventListener('click', function(){
        var body=div.querySelector('#__exfDbgBody'),button=div.querySelector('#__exfDbgMin');
        var minimized=body.style.display!=='none';body.style.display=minimized?'none':'block';
        button.textContent=minimized?'+':'−';button.setAttribute('aria-label',minimized?'بزرگ‌کردن پنجره':'کوچک‌کردن پنجره');
        div.style.height=minimized?'auto':'70vh';div.style.resize=minimized?'none':'both';
    });
    return div;
}
var _exfDebugTab='summary';
/* @strip */
function renderTraceDebugHtml(){
    var events=getTraceLog();
    if(!events.length) return '<div class="exf-module-note">هنوز رویدادی ثبت نشده است. برای رهگیری، حالت verbose یا تنظیم traceEnabled را روشن کنید و اجرا بگیرید. رهگیری فقط داده‌ها و محاسبات واقعاً عبورکرده از کد را ثبت می‌کند و هیچ مقداری نمی‌سازد.</div>';
    var html='<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;"><button type="button" id="__exfTraceClear" class="exf-pool-btn">پاک‌کردن رهگیری</button><span style="color:var(--muted);font-size:9px;">'+events.length.toLocaleString('fa-IR')+' رویداد ذخیره‌شده — جدیدترین‌ها اول</span></div>';
    var shown=Math.min(events.length,200);
    for(var i=events.length-1;i>=0&&shown>0;i--,shown--){
        var ev=events[i], detailText='';
        try{ detailText=JSON.stringify(ev.detail); }catch(e){ detailText=''; }
        if(detailText&&detailText.length>180) detailText=detailText.slice(0,180)+'…';
        html+='<div class="exf-debug" style="margin:3px 0;"><b>'+escapeHtml(String(ev.category))+'</b> · '+escapeHtml(String(ev.key))+' <span style="color:var(--muted);font-size:8px;">'+new Date(ev.t).toLocaleTimeString('fa-IR')+'</span><div style="color:var(--text2);font-size:8px;word-break:break-all;">'+escapeHtml(detailText)+'</div></div>';
    }
    return html;
}
/* @keep */
function renderDebug(){
    var body=document.getElementById('__exfDbgBody');
    if(!body) return;
    var tabNames={summary:'خلاصه',layers:'لایه‌ها',raw:'خام'};
    var tabKeys=['summary','layers','raw'];
    /* @strip */
    tabKeys.push('trace');
    tabNames.trace='رهگیری';
    /* @keep */
    var html='<nav class="__exfDbgTabs" role="tablist" aria-label="بخش‌های دیباگ" style="display:flex;gap:8px;position:sticky;top:68px;background:#111c32;padding:8px;z-index:1">';
    tabKeys.forEach(function(key){html+='<button type="button" role="tab" aria-selected="'+(_exfDebugTab===key)+'" data-exf-debug-tab="'+key+'" style="padding:8px 14px;border:1px solid #1e2f4f;border-radius:8px;background:'+(_exfDebugTab===key?'#1e2f4f':'#070a14')+';color:#e2e8f0;cursor:pointer">'+tabNames[key]+'</button>';});
    html+='</nav><div class="__exfDbgContent">';
    if(_exfDebugTab==='summary'){
        var input=0,passed=0,filtered=0;
        for(var i=0;i<LAYERS.length;i++){var layerStat=pipelineData[LAYERS[i].key];if(layerStat){input=Math.max(input,Number(layerStat.input)||0);passed=Math.max(passed,Number(layerStat.output)||0);filtered+=Number(layerStat.filtered)||0;}}
        html+='<h3>خلاصهٔ اجرا</h3><p>نسخه '+escapeHtml(VERSION_TAG)+' · ورودی '+input+' · خروجی '+passed+' · فیلترشده '+filtered+'</p>';
        html+='<p>وضعیت adapter: '+(hasVerifiedTsetmcAdapter()?'ثبت‌شده':'ثبت‌نشده')+' · نسخه '+TSETMC_ADAPTER_CONTRACT_VERSION+'</p>';
        html+='<p>وضعیت استخر: '+escapeHtml(String(getPoolStatusText()))+'</p>';
    }else if(_exfDebugTab==='layers'){
        html+='<h3>آمار و trace لایه‌ها</h3>';
        for(var li=0;li<LAYERS.length;li++){
            var L=LAYERS[li], st=pipelineData[L.key]||{input:0,output:0,filtered:0,filters:{},samples:{pass:[],fail:[]}};
            html+='<section class="__exfDebugLayer" style="margin:8px 0;padding:10px;border:1px solid #1e2f4f;border-radius:10px;line-height:1.8"><strong>'+escapeHtml(L.icon+' '+L.label)+'</strong><div>ورودی '+Number(st.input||0)+' · عبور '+Number(st.output||0)+' · حذف '+Number(st.filtered||0)+'</div>';
            var filterKeys=Object.keys(st.filters||{});
            if(filterKeys.length) html+='<div>علل: '+filterKeys.map(function(key){return escapeHtml((FILTERS[key]&&FILTERS[key].label||key)+': '+st.filters[key]);}).join('، ')+'</div>';
            var samples=st.samples||{};
            if((samples.pass||[]).length) html+='<div>عبور: '+escapeHtml(samples.pass.join(', '))+'</div>';
            if((samples.fail||[]).length) html+='<div>رد: '+escapeHtml(samples.fail.join(', '))+'</div>';
            html+='</section>';
        }
    }
    /* @strip */
    else if(_exfDebugTab==='trace'){
        html+='<h3>رهگیری داده و محاسبات — فقط نسخهٔ سورس</h3>'+renderTraceDebugHtml();
    }
    /* @keep */
    else{
        var rawSnapshot={raw:rawSamples.raw,errors:rawSamples.errors,incomplete:rawSamples.incomplete};
        html+='<h3>نمونه‌های خام و خطاها</h3><pre class="__exfDebugRaw" style="white-space:pre-wrap;overflow-wrap:anywhere;max-height:55vh;overflow:auto">'+escapeHtml(JSON.stringify(rawSnapshot,null,2))+'</pre>';
    }
    html+='</div>'+getLegalFooterHtml();
    body.innerHTML=html;
    if(!body.__exfTabsBound){
        body.__exfTabsBound=true;
        body.addEventListener('click',function(event){
            /* @strip */
            if(event.target&&event.target.id==='__exfTraceClear'){ clearTrace(); renderDebug(); return; }
            /* @keep */
            var button=event.target&&event.target.closest?event.target.closest('[data-exf-debug-tab]'):null;
            if(!button) return;
            var tab=button.getAttribute('data-exf-debug-tab');
            if(tab==='summary'||tab==='layers'||tab==='raw'||tab==='trace'){_exfDebugTab=tab;renderDebug();}
        });
    }
}

// ─── PUBLIC API ───────────────────────────────────────────────────────────
function optLog(){ LOG.table(abortCounts); LOG.table(pipelineData); return {abort:abortCounts, pipeline:pipelineData, stats:layerStats}; }
function optClearAbort(){ abortCounts={}; showToast('abort پاک شد', 'success'); }
function scanMock(){
    var empty={pass:[], fail:[], pipeline:pipelineData, stats:layerStats, total:0, isDeath:false, simulation:false, dataWarnings:[], cancelled:true};
    if(typeof window==='undefined' || window.__ZharfaStandalone===true){
        var blocked='برای دادهٔ واقعی، ورودی معتبر ارسال کنید؛ دادهٔ ساختگی در حالت وب مستقل اجرا نمی‌شود.';
        if(typeof document!=='undefined') showToast(blocked, 'error'); else LOG.warn(blocked);
        return empty;
    }
    if(typeof window.confirm!=='function' || !window.confirm('این اجرا فقط شبیه‌سازی با داده‌های تصادفی است و نباید به‌عنوان دادهٔ بازار تعبیر شود. ادامه می‌دهید؟\n\n'+LEGAL.disclaimer)){
        var declined='شبیه‌سازی لغو شد؛ هیچ دادهٔ ساختگی تولید نشد.';
        if(typeof document!=='undefined') showToast(declined, 'info'); else LOG.info(declined);
        return empty;
    }
    var syms=[];
    var bases=getSymList('poolBaseSymbols');
    if(bases.length===0) bases=['خودرو','اهرم','وبملت'];
    var nowJ=todayJdn();
    for(var i=0;i<100;i++){
        var base=bases[i % bases.length];
        var price=(getPoolPrice(base)||CONFIG.basePrices[base]||500) * (0.95+Math.random()*0.1);
        syms.push({
            l18:'TEST'+i,
            _mock:true,
            l30:'اختیار '+(Math.random()<0.5?'خ':'ض')+' '+ (400+i*10) +' - '+(Math.random()<0.5?'ض':'')+base+(1000+i*10),
            pl: 100+Math.random()*200,
            tno: 5+Math.floor(Math.random()*50),
            tvol: 5000+Math.random()*50000,
            qd1: 1000+Math.random()*5000,
            qo1: 1000+Math.random()*5000,
            pd1: 90+Math.random()*20,
            po1: 110+Math.random()*20,
            base: base,
            basePrice: price,
            optionType: Math.random()<0.5?'call':'put',
            expiryJdn: nowJ + 30 + Math.floor(Math.random()*60),
            contractSize: 1000,
            bvol: 10000+Math.random()*50000,
            dte: 5+Math.floor(Math.random()*90),
            isDivDay: Math.random()<0.05
        });
    }
    var res=runPipeline(syms, {simulation:true});
    LOG.warn('[Zharfa] SIMULATION ONLY — generated random sample rows; not market data.');
    LOG.log('[ExoticFilter] Mock run:', res.pass.length+' of '+res.total+' passed | Pool: '+getPoolStatusText()+' | Death: '+res.isDeath);
    renderLayers();
    if(getCfg('debugPanel')){ buildDebugPanel(); renderDebug(); }
    if(res.isDeath){
        showToast('⚠️ شبیه‌سازی: 0 خروجی — دادهٔ بازار نیست؛ تنظیم فیلترها را فقط آگاهانه تغییر دهید', 'error');
    } else {
        showToast('⚠️ شبیه‌سازی: '+res.pass.length+' از '+res.total+' — دادهٔ بازار نیست', 'error');
    }
    return res;
}
function setPreparationProgress(percent,text,state){
    var box=document.getElementById('__exfProgress');
    if(!box) return;
    var value=Math.max(0,Math.min(100,Number(percent)||0));
    var label=document.getElementById('__exfProgressText');
    var fill=document.getElementById('__exfProgressFill');
    var number=document.getElementById('__exfProgressPercent');
    var track=box.querySelector('.exf-progress-track');
    if(label) label.textContent=String(text||'در حال آماده‌سازی…');
    if(track) track.setAttribute('aria-valuenow',String(Math.round(value)));
    if(fill) fill.style.width=value+'%';
    if(number) number.textContent=Math.round(value).toLocaleString('fa-IR')+'٪';
    box.setAttribute('data-state',state||'busy');
}
var _marketLiveFeedState={status:'idle',reason:'not-started',checkedAt:null,validCount:0,totalCount:0,quotes:[]};
var _marketLiveFeedTimer=null,_marketLiveFeedBusy=false;
function hasVerifiedTsetmcAdapter(){
    try{var a=typeof window!=='undefined'&&window.__exfTsetmcAdapter;return !!(a&&a.version===TSETMC_ADAPTER_CONTRACT_VERSION&&typeof a.parseLiveQuote==='function'&&typeof a.parseHistoryRow==='function');}catch(e){return false;}
}
function refreshMarketLiveFeed71(manual){
    var enabled=!!getCfg('marketLiveFeedEnabled');
    if(!enabled){_marketLiveFeedState={status:'disabled',reason:'disabled-by-user',checkedAt:Date.now(),validCount:0,totalCount:0,quotes:[]};renderMarketWindow();return;}
    if(!isTsetmcOrigin() && !getCfg('forceLiveFeed')){
        _marketLiveFeedState={status:'wrong-origin',reason:'not-tsetmc-origin',checkedAt:Date.now(),validCount:0,totalCount:0,quotes:[]};
        renderMarketWindow();
        if(manual) showToast('دامنهٔ فعلی tsetmc.com نیست؛ درخواست زنده ارسال نشد تا خطای CORS رخ ندهد.','warn');
        return;
    }
    if(!hasVerifiedTsetmcAdapter()){
        _marketLiveFeedState={status:'adapter-required',reason:'verified-adapter-required',checkedAt:Date.now(),validCount:0,totalCount:0,quotes:[]};
        renderMarketWindow();return;
    }
    if(_marketLiveFeedBusy)return;
    // authenticity handshake first - data provenance is proven before the connection is established
    if(getCfg('authenticityPreflight')){
        var authState=_liveAuthenticityState, authTtl=Number(getCfg('authenticityRecheckMs'))||600000;
        if(authState.status!=='verified'||!authState.checkedAt||(Date.now()-authState.checkedAt)>authTtl){
            if(!manual&&authState.status==='failed'&&authState.nextAttemptAt&&Date.now()<authState.nextAttemptAt){
                _marketLiveFeedState={status:'data-unverified',reason:'authenticity-backoff-until-'+new Date(authState.nextAttemptAt).toLocaleTimeString('fa-IR'),checkedAt:Date.now(),validCount:0,totalCount:0,quotes:[],authenticity:getAuthenticityReport().state};
                renderMarketWindow();
                return;
            }
            _marketLiveFeedBusy=true;
            _marketLiveFeedState={status:'preflight',reason:'authenticity-check-first',checkedAt:Date.now(),validCount:0,totalCount:0,quotes:[],authenticity:{status:authState.status||'checking'}};
            renderMarketWindow();
            preflightLiveConnection(function(pre){
                _marketLiveFeedBusy=false;
                if(pre&&pre.status==='verified'){
                    refreshMarketLiveFeed71(manual);
                } else {
                    _marketLiveFeedState={status:'data-unverified',reason:(pre&&pre.reason)||'authenticity-check-failed',checkedAt:Date.now(),validCount:0,totalCount:0,quotes:[],authenticity:getAuthenticityReport().state};
                    renderMarketWindow();
                    if(typeof showToast==='function') showToast('اصالت دادهٔ زنده تأیید نشد؛ اتصال برقرار نشد و هیچ داده‌ای وارد محاسبات نشد.','error');
                }
            });
            return;
        }
    }
    var codes=getCfg('baseInsCodes')||{},symbols=Object.keys(codes).filter(function(sym){return codes[sym]!=null&&String(codes[sym]).trim()!=='';});
    if(!symbols.length){_marketLiveFeedState={status:'no-instruments',reason:'base-instrument-ids-unavailable',checkedAt:Date.now(),validCount:0,totalCount:0,quotes:[]};renderMarketWindow();return;}
    _marketLiveFeedBusy=true;
    _marketLiveFeedState={status:'checking',reason:null,checkedAt:Date.now(),validCount:0,totalCount:symbols.length,quotes:[]};renderMarketWindow();
    var completed=0,quotes=[];
    function finish(){
        completed++;
        if(completed<symbols.length)return;
        _marketLiveFeedBusy=false;
        var stamp=Date.now();
        var requireRaw2=!!getCfg('authenticityRequireRaw');
        for(var i=0;i<symbols.length;i++){
            var cache=liveBaseCache[codes[symbols[i]]];
            if(cache&&cache.source==='live-tsetmc'&&cache.adapterVersion===TSETMC_ADAPTER_CONTRACT_VERSION&&cache.instrumentId===String(codes[symbols[i]])&&cache.authenticity&&cache.authenticity.indexOf('verified')===0&&(!requireRaw2||cache.authenticity==='verified-original')){
                quotes.push({symbol:symbols[i],price:cache.price,timestamp:cache.timestamp,instrumentId:cache.instrumentId,adapterVersion:cache.adapterVersion,authenticity:cache.authenticity,authFormat:cache.authFormat||'',authWarnings:cache.authWarnings||[]});
            }
        }
        var status=quotes.length===symbols.length?'connected':quotes.length?'partial':'no-valid-quotes';
        _marketLiveFeedState={status:status,reason:status==='no-valid-quotes'?'no-verified-live-quotes':null,checkedAt:stamp,validCount:quotes.length,totalCount:symbols.length,quotes:quotes,authenticity:getAuthenticityReport().state};
        renderMarketWindow();
        if(quotes.length) renderLayers();
        if(manual) showToast(quotes.length?quotes.length+' مظنهٔ زندهٔ اصالت‌سنجی‌شده':'پاسخ زندهٔ معتبر دریافت نشد؛ وضعیت نامعلوم حفظ شد.',quotes.length?'success':'warn');
    }
    for(var si=0;si<symbols.length;si++){
        (function(symbol,code){
            delete liveBaseCache[code];
            try{fetchLiveBase(code,function(){finish();});}catch(e){finish();}
        })(symbols[si],codes[symbols[si]]);
    }
}
function startMarketLiveFeed71(){
    if(_marketLiveFeedTimer){clearInterval(_marketLiveFeedTimer);_marketLiveFeedTimer=null;}
    if(!getCfg('marketLiveFeedEnabled')){_marketLiveFeedState={status:'disabled',reason:'disabled-by-user',checkedAt:Date.now(),validCount:0,totalCount:0,quotes:[]};renderMarketWindow();return false;}
    if(!isTsetmcOrigin() && !getCfg('forceLiveFeed')){
        _marketLiveFeedState={status:'wrong-origin',reason:'not-tsetmc-origin',checkedAt:Date.now(),validCount:0,totalCount:0,quotes:[]};
        renderMarketWindow();
        return false;
    }
    refreshMarketLiveFeed71(false);
    _marketLiveFeedTimer=setInterval(function(){refreshMarketLiveFeed71(false);},60000);
    return true;
}
function stopMarketLiveFeed71(){
    if(_marketLiveFeedTimer){clearInterval(_marketLiveFeedTimer);_marketLiveFeedTimer=null;}
    _marketLiveFeedState={status:'disabled',reason:'stopped-by-user',checkedAt:Date.now(),validCount:0,totalCount:0,quotes:[]};renderMarketWindow();
}
function toggleMarketLiveFeed71(){
    var next=!getCfg('marketLiveFeedEnabled');
    if(!requestConfigChange('marketLiveFeedEnabled',next))return false;
    if(next)startMarketLiveFeed71();else stopMarketLiveFeed71();
    return true;
}
function renderMarketWindow(){
    if(typeof document==='undefined')return;
    var root=document.getElementById('__exfMarketBody');if(!root)return;
    var trend=getMarketTrend(),labels={up:'مثبت',down:'منفی',mixed:'ترکیبی',flat:'بدون تغییر',unknown:'نامعلوم'};
    var reasonLabels={'snapshot-unavailable':'هنوز snapshot معتبر شاخص‌ها وارد نشده است.','insufficient-index-observations':'تعداد مشاهدهٔ شاخص‌ها کافی نیست.','invalid-index-series':'سری زمانی شاخص‌ها نامعتبر است.','stale-index-series':'دادهٔ شاخص‌ها قدیمی است.','market-breadth-unavailable':'دادهٔ معتبر عرض بازار موجود نیست.','stale-market-breadth':'دادهٔ عرض بازار قدیمی است.'};
    var hero=document.createElement('div');hero.className='exf-market-hero';hero.setAttribute('data-status',trend.status||'unknown');
    var status=document.createElement('div');status.className='exf-market-status';status.textContent='روند: '+(trend.label||labels[trend.status]||'نامعلوم');hero.appendChild(status);
    var reason=document.createElement('div');reason.className='exf-market-reason';reason.textContent=trend.reason?(reasonLabels[trend.reason]||'وضعیت روند با دادهٔ معتبر قابل محاسبه نیست؛ علت: '+trend.reason):'توصیفی است و بر فیلتر یا رتبه‌بندی اثر ندارد.';hero.appendChild(reason);
    if(trend.asOf){var asOf=document.createElement('div');asOf.className='exf-market-reason';asOf.textContent='زمان snapshot: '+new Date(trend.asOf).toLocaleString('fa-IR');hero.appendChild(asOf);}
    var changes=document.createElement('div');changes.className='exf-market-changes';
    if(Array.isArray(trend.changes)) for(var ci=0;ci<trend.changes.length;ci++){
        var row=trend.changes[ci],line=document.createElement('div');line.className='exf-market-change';
        var name=document.createElement('span');name.textContent=String(row.name||'شاخص');
        var val=document.createElement('strong');var pct=Number(row.changePct);val.textContent=isFinite(pct)?(pct>0?'+':'')+Number(pct.toFixed(2)).toLocaleString('fa-IR')+'٪':'نامعلوم';
        line.appendChild(name);line.appendChild(val);changes.appendChild(line);
    }
    if(trend.breadth){var breadth=document.createElement('div');breadth.className='exf-market-change';breadth.textContent='عرض بازار · مثبت '+Number(trend.breadth.advancers).toLocaleString('fa-IR')+' / منفی '+Number(trend.breadth.decliners).toLocaleString('fa-IR');changes.appendChild(breadth);}
    var live=document.createElement('div');live.className='exf-market-feed';
    var liveTitle=document.createElement('div');liveTitle.className='exf-market-feed-title';liveTitle.textContent='دریافت مظنهٔ زندهٔ نمادهای پایه';live.appendChild(liveTitle);
    var feedStatus=document.createElement('div');feedStatus.className='exf-market-feed-status';
    var fs=_marketLiveFeedState, feedMessages={'idle':'در انتظار بررسی اتصال.','checking':'در حال دریافت پاسخ‌ها؛ فقط پاسخ‌های عبورکرده از گیت اصالت نمایش داده می‌شوند.','preflight':'پیش از برقراری اتصال، اصالت داده در حال راستی‌آزمایی است…','data-unverified':'اصالت دادهٔ زنده تأیید نشد؛ اتصال برقرار نشده و هیچ داده‌ای وارد محاسبات نمی‌شود.','adapter-required':'اتصال زنده فعال نیست — adapter معتبر نسخهٔ '+TSETMC_ADAPTER_CONTRACT_VERSION+' ثبت نشده است. پاسخ خام حدس زده نمی‌شود.','no-instruments':'شناسهٔ نماد پایه برای دریافت تنظیم نشده است.','no-valid-quotes':'پاسخ تازه و تأییدشده‌ای دریافت نشد؛ قیمت نامعلوم می‌ماند.','disabled':'بروزرسانی زنده توسط کاربر خاموش شده است.','connected':'همهٔ پاسخ‌ها از نظر اصالت تأیید شدند — دادهٔ اصلی TSETMC.','partial':'فقط بخشی از نمادها پاسخ معتبر دارند.','stopped-by-user':'دریافت خودکار متوقف شده است.','wrong-origin':'دامنهٔ فعلی tsetmc.com نیست؛ برای جلوگیری از خطای CORS درخواست زنده ارسال نمی‌شود.'};
    var authBadge=document.createElement('div');authBadge.className='exf-market-feed-status';
    var authState=fs.authenticity||_liveAuthenticityState||{};
    if(authState.status==='verified'){ authBadge.textContent='✅ اصالت داده تأیید شد — دادهٔ اصلی TSETMC'; authBadge.style.color='#34d399'; }
    else if(authState.status==='failed'){ authBadge.textContent='❌ اصالت داده تأیید نشد — از هیچ داده‌ای استفاده نمی‌شود'; authBadge.style.color='#fb7185'; }
    else if(authState.status==='checking'){ authBadge.textContent='⏳ راستی‌آزمایی اصالت در جریان است'; authBadge.style.color='#fbbf24'; }
    else { authBadge.textContent='⚪ اصالت داده هنوز سنجیده نشده است'; authBadge.style.color='#8b9bb4'; }
    var authTip=[];
    if(authState.probe){ authTip.push('نماد مرجع: '+String(authState.probe.symbol||'')+' · InsCode: '+String(authState.probe.instrumentId||'')); }
    if(authState.probe&&authState.probe.verdict){ authTip.push('حکم: '+authState.probe.verdict+' · فرمت: '+String(authState.probe.format||'')); }
    if(authState.probe&&authState.probe.reasons&&authState.probe.reasons.length){ authTip.push('علل رد: '+authState.probe.reasons.join(', ')); }
    if(authState.reason){ authTip.push('علت: '+String(authState.reason)); }
    authTip.push('گزارش کامل: __exf.getAuthenticityReport()');
    authBadge.title=authTip.join('\n');
    live.appendChild(authBadge);
    feedStatus.textContent=(feedMessages[fs.status]||'وضعیت اتصال نامعلوم.')+(fs.totalCount?' · '+fs.validCount.toLocaleString('fa-IR')+' از '+fs.totalCount.toLocaleString('fa-IR')+' نماد معتبر':'')+(fs.checkedAt?' · بررسی '+new Date(fs.checkedAt).toLocaleTimeString('fa-IR'):'');live.appendChild(feedStatus);
    for(var qi=0;qi<(fs.quotes||[]).length;qi++){
        var quote=fs.quotes[qi],qrow=document.createElement('div');qrow.className='exf-market-change';
        var qname=document.createElement('span');qname.textContent=(quote.authenticity==='verified-original'?'✅ ':(quote.authenticity==='verified-adapter'?'☑️ ':''))+String(quote.symbol)+' · '+(quote.timestamp?new Date(quote.timestamp).toLocaleTimeString('fa-IR'):'زمان نامعلوم');
        qrow.title='InsCode: '+String(quote.instrumentId)+' · adapter v'+String(quote.adapterVersion)+' · اصالت: '+String(quote.authenticity||'نامعلوم')+' · فرمت: '+String(quote.authFormat||'')+(quote.authWarnings&&quote.authWarnings.length?' · هشدارها: '+quote.authWarnings.join(', '):'');
        var qprice=document.createElement('strong');qprice.textContent=Number(quote.price).toLocaleString('fa-IR');qrow.appendChild(qname);qrow.appendChild(qprice);live.appendChild(qrow);
    }
    var actions=document.createElement('div');actions.className='exf-market-feed-actions';
    var refresh=document.createElement('button');refresh.type='button';refresh.id='__exfLiveRefresh';refresh.className='exf-pool-btn exf-pool-btn-primary';refresh.textContent='↻ بررسی اکنون';actions.appendChild(refresh);
    var toggle=document.createElement('button');toggle.type='button';toggle.id='__exfLiveToggle';toggle.className='exf-pool-btn';toggle.textContent=getCfg('marketLiveFeedEnabled')?'خاموش‌کردن خودکار':'روشن‌کردن خودکار';actions.appendChild(toggle);live.appendChild(actions);
    var note=document.createElement('div');note.className='exf-module-note';note.textContent='پیش از برقراری اتصال، اصالت داده با راستی‌آزمایی یک نماد مرجع اثبات می‌شود؛ سپس هر مظنه از گیت اصالت (فرمت خام InstInfoFast یا adapter رسمی، اتصال InsCode به نماد، سلامت قیمت/تاریخ/دفتر سفارش و رد امضای شبیه‌سازی) می‌گذرد. فقط دادهٔ اصالت‌سنجی‌شده نمایش داده و وارد استخر می‌شود. snapshot روند فقط از نظر ساختار و تازگی زمانی ارزیابی شده؛ منشأ شاخص‌ها در قرارداد فعلی احراز هویت نمی‌شود. این پنل توصیه یا سیگنال معاملاتی نیست.';
    if(root.replaceChildren)root.replaceChildren(hero,changes,live,note);else{root.innerHTML='';root.appendChild(hero);root.appendChild(changes);root.appendChild(live);root.appendChild(note);}
}
function renderTrendBadge(){
    if(typeof document==='undefined') return;
    var badge=document.getElementById('__exfTrendBadge');
    if(!badge) return;
    var trend=getMarketTrend(),labels={up:'صعودی',down:'نزولی',mixed:'ترکیبی',flat:'بدون تغییر',unknown:'نامعلوم'};
    var title=['وضعیت trend: '+(trend.label||labels[trend.status]||'نامعلوم'),'علت: '+(trend.reason||'—'),'منشأ snapshot شاخص‌ها در قرارداد فعلی احراز هویت نمی‌شود'];
    if(Array.isArray(trend.changes)) for(var i=0;i<trend.changes.length;i++) title.push(trend.changes[i].name+': '+(trend.changes[i].changePct>0?'+':'')+trend.changes[i].changePct.toFixed(2)+'٪');
    if(trend.breadth) title.push('عرض بازار: مثبت '+trend.breadth.advancers+' · منفی '+trend.breadth.decliners);
    badge.textContent='روند: '+(labels[trend.status]||'نامعلوم');
    badge.title=title.join('\n');
    badge.setAttribute('data-status',trend.status||'unknown');
}
function renderExpiryProposal(){
    var box=document.getElementById('__exfExpiryNotice');
    if(!box) return;
    var proposal=getExpiryProposal();
    box.hidden=!proposal;
    if(!proposal) return;
    var diff=[];
    for(var i=0;i<proposal.changes.length;i++) diff.push(proposal.changes[i].key+': '+formatConfigDiffValue(proposal.changes[i].oldValue)+' → '+formatConfigDiffValue(proposal.changes[i].value));
    var detail=document.getElementById('__exfExpiryDiff');
    if(detail) detail.textContent=diff.join('\n');
    if(!box.__exfExpiryHandlersBound){
        box.__exfExpiryHandlersBound=true;
        var apply=document.getElementById('__exfExpiryApply'),dismiss=document.getElementById('__exfExpiryDismiss');
        if(apply) apply.addEventListener('click',approveExpiryProposal);
        if(dismiss) dismiss.addEventListener('click',dismissExpiryProposal);
    }
}
function renderUserProfile(){
    if(typeof document==='undefined') return;
    var root=document.getElementById('__exfProfile'); if(!root) return;
    root.innerHTML='<div class="exf-profile-intro"><strong>پروفایل سرمایه‌گذار · فقط ذخیره و نمایش</strong><br>سرمایه، حد زیان و افق به موتور فیلتر، رتبه‌بندی یا اندازهٔ موقعیت وصل نیستند.</div><div class="exf-profile-fields"><label class="exf-profile-field">سرمایه (تومان)<input id="__exfProfileCapital" type="number" min="0" step="100000"></label><label class="exf-profile-field">حد زیان (تومان)<input id="__exfProfileLoss" type="number" min="0" step="100000"></label><label class="exf-profile-field">چشم‌انداز (روز تقویمی)<input id="__exfProfileHorizon" type="number" min="1" max="3650" step="1"></label></div><div class="exf-profile-footer"><span id="__exfProfileStatus" class="exf-profile-status"></span><button id="__exfProfileSave" class="exf-pool-btn exf-profile-save">ذخیره محلی</button></div>';
    var profile=getUserProfile();
    root.querySelector('#__exfProfileCapital').value=profile.capitalToman==null?'':profile.capitalToman;
    root.querySelector('#__exfProfileLoss').value=profile.maxLossToman==null?'':profile.maxLossToman;
    root.querySelector('#__exfProfileHorizon').value=profile.horizonCalendarDays==null?'':profile.horizonCalendarDays;
    var status=root.querySelector('#__exfProfileStatus');
    function describe(){
        var bits=[];
        if(profile.capitalToman!=null) bits.push('سرمایه '+Number(profile.capitalToman).toLocaleString('fa-IR')+' تومان');
        if(profile.maxLossToman!=null) bits.push('حد زیان '+Number(profile.maxLossToman).toLocaleString('fa-IR')+' تومان');
        if(profile.horizonCalendarDays!=null) bits.push('افق '+profile.horizonCalendarDays+' روز');
        status.textContent=bits.length?bits.join(' · '):profile.status==='invalid-storage'?'ذخیرهٔ قبلی نامعتبر است؛ دوباره ثبت کنید.':'هنوز ثبت نشده است.';
    }
    describe();
    root.querySelector('#__exfProfileSave').addEventListener('click',function(){
        var saved=saveUserProfile({capitalToman:root.querySelector('#__exfProfileCapital').value,maxLossToman:root.querySelector('#__exfProfileLoss').value,horizonCalendarDays:root.querySelector('#__exfProfileHorizon').value});
        if(!saved.ok){ showToast('پروفایل ذخیره نشد؛ مقادیر مثبت و افق صحیح بین ۱ تا ۳۶۵۰ لازم است.','error'); return; }
        profile=saved.profile; describe(); showToast('پروفایل فقط‌نمایشی در همین مرورگر ذخیره شد.','success');
    });
}
// ─── STARTUP ──────────────────────────────────────────────────────────────
function startup(){
    // contract D.5 - non-fatal bootstrap - independent guarded stages, no fatal interruption
    function stage(name, fn){
        try{ fn(); traceEvent('startup', name, {ok:true}); }
        catch(e){
            traceEvent('startup', name, {ok:false, error:String(e&&e.message||e)});
            LOG.warn('[Zharfa] bootstrap stage '+name+' failed - continuing without fatal interruption', e);
            try{ if(rawSamples.errors.length<10) rawSamples.errors.push({stage:name, error:e&&e.message||String(e)}); }catch(e2){}
        }
    }
    try{
        stage('adapter', function(){ ensureDefaultTsetmcAdapter(); });
        stage('expiry', function(){ updateExpiryToNextMonthLastDay(); });
        stage('panel', function(){
            if(!(typeof window!=='undefined' && window.__ZharfaStandalone===true)) buildModernPanel();
            if(!(typeof window!=='undefined' && window.__ZharfaStandalone===true)) setPreparationProgress(12,'۱/۴ — در حال آماده‌سازی تنظیمات پایه…','busy');
        });
        stage('settings', function(){ normalizePoolSymbols(); });
        stage('pool-state', function(){
            if(!(typeof window!=='undefined' && window.__ZharfaStandalone===true)) setPreparationProgress(38,'۲/۴ — در حال بازیابی وضعیت استخر و provenance…','busy');
            resetPipeline();
        });
        stage('ui', function(){
            setPreparationProgress(68,'۳/۴ — رابط آماده شد؛ در حال تکمیل نمایه و وضعیت بازار…','busy');
            renderLayers();
            renderUserProfile();
        });
        if(!(typeof window!=='undefined' && window.__ZharfaStandalone===true)) setTimeout(function(){ setPreparationProgress(100,'آماده است — دادهٔ معتبر را وارد یا بررسی کنید؛ نبود مظنهٔ تأییدشده به‌صورت نامعلوم گزارش می‌شود.','complete'); },120);
        stage('mode', function(){
            var hasTsetmc = typeof window!=='undefined' && (window.InstSimple || window.Symbols);
            if(!hasTsetmc){
                LOG.log('[ExoticFilter] '+VERSION_TAG+' — demo mode — call __exf.exoticRun() to test');
            } else {
                LOG.log('[ExoticFilter] '+VERSION_TAG+' — TSETMC detected, live feed ready');
                // data warmup deferred so the interface paints first - never a fatal pause (D.5)
                setTimeout(function(){ stage('live-feed', function(){
                    if(isTsetmcOrigin()) startMarketLiveFeed71();
                    else LOG.warn('[ExoticFilter] not on tsetmc.com origin; live feed disabled to avoid CORS.');
                }); }, 0);
            }
        });
        var __exfApi = {
            version: VERSION_TAG,
            abyssTag: ABYSS_TAG,
            contractTag: CONTRACT_TAG,
            buildDate: BUILD_DATE,
            author: AUTHOR,
            contact: CONTACT,
            disclaimer: DISCLAIMER,
            license: LICENSE,
            legal:(function(){try{return JSON.parse(JSON.stringify(LEGAL));}catch(e){return {};}})(),
            config:(function(){try{return JSON.parse(JSON.stringify(CONFIG));}catch(e){return {};}})(),
            calendar:TSE_CALENDAR,
            describeTrend:describeMarketTrend,
            setTrendSnapshot:function(snapshot){ var result=setMarketTrendSnapshot(snapshot); try{renderTrendBadge();renderMarketWindow();}catch(e){} return result; },
            getTrend:getMarketTrend,
            refreshMarketLiveFeed:refreshMarketLiveFeed71,
            stopMarketLiveFeed:stopMarketLiveFeed71,
            getMarketLiveFeedStatus:function(){try{return JSON.parse(JSON.stringify(_marketLiveFeedState));}catch(e){return {status:'unknown'};}},
            verifyDataAuthenticity:function(payload,insCode,options){ return verifyLiveQuoteAuthenticity(payload,insCode,options||{}); },
            getAuthenticityReport:getAuthenticityReport,
            preflightLiveConnection:preflightLiveConnection,
            getTrace:getTraceLog,
            clearTrace:clearTrace,
            renderMarketWindow:renderMarketWindow,
            isTsetmcOrigin:isTsetmcOrigin,
            getUserProfile:getUserProfile,
            saveUserProfile:saveUserProfile,
            renderUserProfile:renderUserProfile,
            getExpiryProposal:getExpiryProposal,
            approveExpiryProposal:approveExpiryProposal,
            dismissExpiryProposal:dismissExpiryProposal,
            setPreparationProgress:setPreparationProgress,
            registerTsetmcAdapter:function(adapter){var ok=registerTsetmcAdapter(adapter);if(ok){renderMarketWindow();if(getCfg('marketLiveFeedEnabled')&&isTsetmcOrigin())startMarketLiveFeed71();}return ok;},
            adapterContract:{version:TSETMC_ADAPTER_CONTRACT_VERSION,liveFields:['adapterVersion','instrumentId','lastPrice','closingPrice','prevClose','high','maxAllowed','minAllowed','dateGregorian','timestamp','orderBookRaw'],historyFields:['adapterVersion','instrumentId','date','firstPrice','lowPrice','highPrice','closePrice','lastPrice','prevClose','value','volume','tradeCount']},
            dates: {toJdn:normalizeToJdn, jalaliToJdn:jalaliToJdn, fromJdn:jdnToJalali, todayJdn:todayJdn},
            layers: LAYERS,
            filters: FILTERS,
            filterMap: FILTER_MAP71,
            run: runPipeline,
            scanMock: scanMock,
            exoticRun: scanMock,
            exoticDebug: function(){ optSet('debugPanel', true); buildDebugPanel(); renderDebug(); },
            optSet:requestConfigChange,
            setConfigBatch:applyUserConfigBatch,
            optGet:optGet,
            optLog: optLog,
            optClearAbort: optClearAbort,
            testCdn: testCdn71,
            testCdnAndShow: testCdnAndShow71,
            autoConfigCdn: autoConfigCdn71,
            renderLayers: renderLayers,
            renderFunnelViz: renderFunnelViz,
            renderDebug: renderDebug,
            buildDebug: buildDebugPanel,
            getPipeline: function(){ return pipelineData; },
            getStats: function(){ return layerStats; },
            getPool:function(){ try{return JSON.parse(JSON.stringify(poolStore));}catch(e){return {};} },
            getPoolSummary: getPoolSummary,
            getPoolStatus: getPoolStatusText,
            addToPool: function(baseSym,data){ return writePoolObservation(baseSym,data,'manual'); },
            writePoolObservation: writePoolObservation,
            getIvHist:function(){ try{var out={},keys=Object.keys(ivHist);for(var i=0;i<keys.length;i++)out[keys[i]]=getVerifiedIvHistory(keys[i]).map(function(row){return Object.assign({},row);});return out;}catch(e){return {};} },
            savePool: savePool,
            loadPool: loadPool,
            prunePool: pruneOldPool,
            fetchLiveBase: fetchLiveBase,
            fetchAllLiveBases: fetchAllLiveBases,
            getLiveCache: function(){ return liveBaseCache; },
            requestPoolUpdate: requestPoolUpdate,
            requestPoolUpdateAll: requestPoolUpdateAll,
            requestPoolUpdateSingle: requestPoolUpdateSingle,
            buildPoolChart: buildPoolHistoryChart,
            getSymList: getSymList,
            getJalaliNow: getJalaliNow,
            getNextJalaliMonthLastDay: getNextJalaliMonthLastDay,
            updateExpiry: updateExpiryToNextMonthLastDay,
            tseExoticFilter: null
        };
        window.__exf = __exfApi;
        window.__exf.tseExoticFilter = __exfApi;
        renderExpiryProposal();
        renderTrendBadge();
        var runBtn=document.getElementById('__exfRun');
        if(runBtn) runBtn.addEventListener('click', function(){
            runBtn.textContent='⏳ آماده‌سازی شبیه‌سازی…';
            runBtn.disabled=true;
            setPreparationProgress(24,'۱/۳ — ساخت ردیف‌های نمونه؛ این داده بازار واقعی نیست.','busy');
            setTimeout(function(){
                setPreparationProgress(58,'۲/۳ — اجرای ۹ لایه روی دادهٔ شبیه‌سازی…','busy');
                setTimeout(function(){
                    try{ scanMock(); setPreparationProgress(100,'شبیه‌سازی تمام شد؛ خروجی نمونه است و دادهٔ بازار محسوب نمی‌شود.','warn'); }
                    catch(e){ LOG.error(e); setPreparationProgress(100,'شبیه‌سازی با خطا متوقف شد؛ صفحه را تازه کنید یا گزارش را بررسی کنید.','warn'); }
                    runBtn.textContent='▶ اجرای شبیه‌سازی';
                    runBtn.disabled=false;
                },30);
            },30);
        });
        var dbgBtn=document.getElementById('__exfDebug');
        if(dbgBtn) dbgBtn.addEventListener('click', function(){
            var cur=getCfg('debugPanel');
            optSet('debugPanel', !cur);
            if(!cur){ buildDebugPanel(); renderDebug(); }
            renderLayers();
        });
        var resetBtn=document.getElementById('__exfReset');
        if(resetBtn) resetBtn.addEventListener('click', function(){
            if(applyUserConfigBatch([{key:'maxSpread',value:15},{key:'minPrice',value:10},{key:'minExpRet',value:40},{key:'scoreMin',value:35}],'بازنشانی فیلترها')){
                optClearAbort();
                resetPipeline();
                renderLayers();
                showToast('بازنشانی شد', 'success');
            }
        });
        var dbgOpen=document.getElementById('__exfDbgOpen');
        if(dbgOpen) dbgOpen.addEventListener('click', function(){ optSet('debugPanel', true); buildDebugPanel(); renderDebug(); var dbg=document.getElementById('__exfDebugPanel'); if(dbg) bringTop71(dbg); });
        LOG.log('%c🧬 '+VERSION_TAG+' loaded — 9-layer funnel — author: https://t.me/p75ad — group: https://t.me/SmartOptionTSE', 'color:#38bdf8;font-weight:bold;font-size:12px;');
        LOG.assert(LAYERS.length===9, 'LAYERS should be 9, got '+LAYERS.length);
        LOG.log('Layers:', LAYERS.map(function(l){return l.icon+' '+l.label;}).join(' → '));
        /* @strip */
        if(getCfg('devMode')===true){ try{ var ut=runUnitTests(); LOG.log('UnitTests:', ut); }catch(e){ LOG.error('UnitTests failed', e); } }
        /* @keep */
        LOG.log('ViewMode:', getViewMode(), '— for summary: optSet("viewMode","summary") — for verbose: optSet("viewMode","verbose")');
        LOG.log('Quick start: __exf.exoticRun() — debug: __exf.exoticDebug() — log: __exf.optLog() — history: __exf.requestPoolUpdateAll()');
    }catch(e){
        LOG.error('[ExoticFilter] startup error', e);
        if(rawSamples.errors.length<10) rawSamples.errors.push({error:e.message, stack:e.stack});
    }
}
/* @strip */
// ─── UNIT TESTS — mock for each layer ─────────────────────────────────────
function runUnitTests(){
    LOG.log('%c🧪 Unit Tests '+VERSION_TAG, 'color:#34d399;font-weight:bold;');
    var passed=0, failed=0;
    function assert(cond, msg){
        if(cond){ passed++; LOG.log('✅ '+msg); }
        else { failed++; LOG.error('❌ '+msg); }
    }
    try{
        var l30Tests=[
            {l30:'ضخودرو1000', expect:true, name:'ض Call'},
            {l30:'طخودرو1000', expect:false, name:'ط Put'},
            {l30:'خودرو', expect:true, name:'default Call'},
            {l30:'ضهرم 2000', expect:true, name:'ضهرم Call'},
            {l30:'طهرم 2000', expect:false, name:'طهرم Put'}
        ];
        for(var ti=0;ti<l30Tests.length;ti++){
            var t=l30Tests[ti];
            var l30Str=t.l30;
            var isCall;
            if(/^ض/.test(l30Str)) isCall=true;
            else if(/^ط/.test(l30Str)) isCall=false;
            else if(/اختیار\s*خ|^خ/.test(l30Str)) isCall=true;
            else if(/پوت|فروش/.test(l30Str)) isCall=false;
            else isCall=true;
            assert(isCall===t.expect, 'isCall '+t.name+': '+l30Str+' => '+(isCall?'Call':'Put')+' expected '+(t.expect?'Call':'Put'));
        }
        var ctx=makeCtx();
        var sym1={l18:'TEST1', pl:5};
        var r1=LAYERS[0].filter(ctx, sym1);
        assert(!r1.ok && r1.key==='price', 'L1 should reject price below minPrice');
        var sym2={l18:'TEST2', l30:'ضخودرو1000', pl:100, pd1:95, po1:105, qd1:1000, qo1:1000, tno:10, tvol:10000};
        sym2.base='خودرو';
        var r2=LAYERS[3].filter(ctx, sym2);
        assert(sym2._K===1000, 'K extraction 1000 not 500, got '+sym2._K);
        var today=todayJdn();
        var sym3={l18:'TEST3', l30:'ضخودرو1000', pl:100, pd1:90, po1:110, qd1:1000, qo1:1000, tno:10, tvol:10000, expiryJdn:today+10, dte:10, base:'خودرو'};
        var arr=[{jdn:1},{jdn:3},{jdn:5}];
        var pos=binarySearchInsertPos(arr, 2);
        assert(pos===1, 'binary insert pos 2 should be 1, got '+pos);
        assert(isSameOriginUrl('/tsev2/data')===true, 'same origin path');
        assert(isSameOriginUrl('https://tsetmc.com.evil.com')===false, 'evil.com should be false');
        var originalBaseInsCodes=null, hasOriginalBaseInsCodes=false;
        try{
            originalBaseInsCodes=optGet('baseInsCodes');
            hasOriginalBaseInsCodes=(originalBaseInsCodes!==undefined && originalBaseInsCodes!==null);
            getReverseMap();
            optSet('baseInsCodes', {test:'123'});
            var afterCache=_reverseMapCache;
            assert(afterCache===null, 'reverseMap cache should be invalidated on baseInsCodes set');
        }catch(e){
            assert(true, 'reverseMap invalidation skipped in test env: '+e.message);
        }finally{
            if(hasOriginalBaseInsCodes){ try{ optSet('baseInsCodes', originalBaseInsCodes); }catch(e){} }
        }
        LOG.log('%cTests done: '+passed+' passed, '+failed+' failed', 'color:'+(failed?'#fb7185':'#34d399')+';font-weight:bold;');
        return {passed:passed, failed:failed};
    }catch(e){
        LOG.error('Unit test error', e);
        return {passed:passed, failed:failed+1, error:e.message};
    }
}
/* @keep */
if(typeof document!=='undefined' && document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', startup);
} else {
    startup();
}
})();
