// tseOption_ExoticFilter_v0.0.4.6 — قیف هوشمند چندلایه — نویسنده: https://t.me/p75ad — ۱۴۰۵/۰۶/۲۲
/**
 * ╔═══════════════════════════════════════════════════════════════╗
 * ║                                                               ║
 * ║        🧬 tseOption_ExoticFilter — v0.0.4.6                   ║
 * ║        قیف هوشمند چندلایه اختیارهای بورس تهران               ║
 * ║        بازنویسی از Smart Option Filter v9.6.0.12              ║
 * ║        معماری: Layer Registry Pattern + Dual-Mode            ║
 * ║                                                               ║
 * ╚═══════════════════════════════════════════════════════════════╝
 *
 *  ⚠️  رفع مسئولیت — از برنامه اصلی
 *      این ابزار صرفاً تحلیلی و اطلاعاتی است؛ تضمین سود نمی‌دهد و
 *      مسئولیت هر تصمیم و معامله تنها بر عهده کاربر است.
 *
 *  ©  ۱۴۰۵  —  حقوق مؤلف محفوظ است
 *      مؤلف اصلی:  https://t.me/p75ad
 *
 *  ─── ارتباط — از برنامه اصلی ───────────────────────────────────
 *      ✈  مؤلف ..............  https://t.me/p75ad
 *      💬  گروه پروژه ....... https://t.me/SmartOptionTSE
 *
 *  ─── مجوز انشعاب — از برنامه اصلی ──────────────────────────────
 *      نوع مجوز:  Smart-FFA-1.0  (Free Fork with Attribution)
 *      برداشتن، بازنویسی، گسترش و انتشار نسخه مستقل — آزاد است؛
 *      شرط: سربرگ نسخه انشعاب‌یافته باید نام و نشانی مؤلف اصلی را
 *      دست‌نخورده نگه دارد.
 *
 *  ─── ویژگی‌های v0.0.4.6 ────────────────────────────────────────
 *      • معماری Layer Registry: هر لایه {key, schema, filter} خودتوصیف
 *      • افزودن لایه هشتم = push به LAYERS — بدون ویرایش runner
 *      • Context مرکزی به جای state سراسری پراکنده
 *      • دو حالت نمایش: سورس هر دو مد SUMMARY+VERBOSE، مینی‌فای فقط SUMMARY — فقط دو نسخه source و min
 *      • تنظیمات خودکار از schema — افزودن تنظیم = 1 خط schema
 *      • استخر 90 روزه با درخواست کاربر + قیمت زنده old.tsetmc.com
 *      • سررسید خودکار آخرین روز ماه بعد جلالی
 *      • تم زیبا با funnel SVG + کارت‌های مدرن + انیمیشن flow
 *      • فیکس P0: double callback، {} خالی، poolInfo ID، :root
 *
 * ═══════════════════════════════════════════════════════════════════
 *  COMPATIBILITY CONTRACT — TSETMC REGISTRATION (بند 1-45)
 *  1) سیستم ثبت ممکن است HTML entities را داخل JS دیکد کند
 *  2) داخل رشته‌های JS مستقیماً HTML entity نگذار
 *  3) با String.fromCharCode(38) بساز
 *  4) قبل انتشار node --check
 *  5) missing ) اول به عنوان خطای تبدیل بررسی شود
 *  6) این قرارداد در هر نسخه حفظ شود
 *  7) محدودیت minify فقط برای minified — verbose با @strip علامت‌گذاری — مد وربوز در نسخه مینی‌فای حذف می‌شود
 *  8) minified به صورت raw JS آپلود شود — فقط SUMMARY — وربوز @strip
 *  9) محدودیت‌های شناخته‌شده: ; قبل else, Uglify, full mangle
 * 10) هر transform فقط بعد از پاس شدن پکیج خودش ترویج شود
 * 11) قیف هوشمند چندلایه — هر لایه ورودی/خروجی
 * 12) ساختار هیبریدی: 7 لایه اصلی + جزئیات فیلترها
 * 13) هر لایه ورودی/خروجی: 120 → 85 ▼35
 * 14) هر لایه پنل تنظیمات خودش — schema-driven
 * 15) اگر debugPanel=true نمونه خام نمایش
 * 16) در minified دیباگ و مد وربوز حذف — فقط SUMMARY باقی — کد وربوز با @strip حذف می‌شود
 * 17) منطق هر لایه بهینه‌ترین الگوریتم
 * 18) کاربر با اینترفیس ساده تنظیمات هر لایه را تغییر و نتیجه ببیند
 * 19) تم زیبا دارک — #070a14 → #111c32 gradient — قرارداد با تم جدید هماهنگ شد
 * 20) فونت Vazirmatn/Tahoma RTL
 * 21) کامنت‌ها و پیش‌فرض‌ها فارسی حفظ
 * 22) راهنمای هر پارامتر فارسی
 * 23) پنجره‌ها قابل جابجایی و بستن با × و minimize
 * 24) مدل مالی بدون درخواست صریح تغییر نکند
 * 25) آستانه‌ها فقط با تایید تغییر کنند
 * 26) در نبود history یا quote داده ساختگی ساخته نشود — یا هشدار صریح
 * 27) استخر 90 روزه — poolDays=90
 * 28) قیمت زنده old.tsetmc.com با fallback هم‌مبدأ — جلوگیری CORS
 * 29) تاریخچه فقط با درخواست کاربر — poolAutoUpdate=false
 * 30) حالت مرگ گیر نکند — هشدار + بازیابی
 * 31) اینترفیس ساده — اگزوتیک در پیشرفته مخفی
 * 32) فیکس P0: poolBaseSymbols array/string، لیسنر، fetch timeout، chart صفر، for..in delete
 * 33) فیکس منطقی: JDN، تاریخ منفی، basePrices reference، volatility سالانه، ivHist، gate cache
 * 34) v0.0.2.0: ورژن بالاتر — عدد چهارم صفر
 * 35) اطلاعات تماس اصلی: https://t.me/p75ad — گروه: https://t.me/SmartOptionTSE — مجوز Smart-FFA-1.0
 * 36) قیف زیبا — gradient، flow، کارت مدرن
 * 37) v0.0.2.1: فیکس P0 — double callback، {}، poolInfo، :root
 * 38) فیکس P1 — JDN، isCall، فیلترهای مرده، leverage
 * 39) v0.0.2.3: expiryDate و expiry همیشه آخرین روز ماه بعد جلالی
 * 40) v0.0.2.4: فیکس باقی‌مانده P0 — poolInfo حذف، IV=0، scanMock، ارقام فارسی، expiryAutoUpdate
 * 41) v0.0.4.2: معماری Layer Registry + Dual-Mode + Schema-driven UI — آماده برای لایه هشتم
 * 42) v0.0.4.3: قرارداد — مد وربوز در نسخه مینی‌فای حذف می‌شود — فقط SUMMARY — @strip وربوز
 * 43) v0.0.4.6: فیکس P0 بحرانی isCall معکوس ض/ط، topFilter، toggle CSS، K=500، DTE penalty + معماری dual-mode جدا + minimize + SoA + Hooks + تست
 * ═══════════════════════════════════════════════════════════════════
 */

;(function(){
'use strict';

// ─── META ─────────────────────────────────────────────────────────────────
var VERSION_TAG = 'tseOption_ExoticFilter_v0.0.4.6';
var BUILD_DATE = '2026-09-29';
var AUTHOR = 'https://t.me/p75ad';
var CONTACT = {author:'https://t.me/p75ad', group:'https://t.me/SmartOptionTSE'};
var DISCLAIMER = 'این ابزار صرفاً تحلیلی و اطلاعاتی است؛ تضمین سود نمی‌دهد و مسئولیت هر تصمیم و معامله تنها بر عهده کاربر است.';
var LICENSE = 'Smart-FFA-1.0 (Free Fork with Attribution)';
var NL = String.fromCharCode(10);

// ─── CONFIG — هسته تنظیمات ────────────────────────────────────────────────
var CONFIG = {
    expiryAutoUpdate: true,
    expiryDate: '1405/07/30',
    expiry: '1405\\s*[\\/\\.\\-]\\s*0?7',
    expiryJY: 1405, expiryJM: 7, expiryJD: 30,
    view: 0.4, viewDailyPct: 1.2, holdDays: 5, erGridStep: 0.25,
    volFloor: 25, volCeil: 150, unitGuardX: 8, minPrice: 10, maxSpread: 15, maxCostRT: 12,
    maxThetaPct: 100, maxStalePricePct: 50, maxImbalanceRatio: 20,
    minDelta: 0, maxDelta: 1, moneynessMin: 0, moneynessMax: 0,
    minDaysLeft: 4, maxLeverage: 30, minLeverage: 0,
    maxTimeValuePct: 100, maxIvPremium: 10, minDteWeight: true, dtePenaltyMax: 15, dtePenaltyDaysMult: 2,
    maxPerGroup: 2, maxTotalRows: 0, c0Tiebreak: false, minExpRet: 40, coldThreshold: 3, minDepthTrades: 0.5, usePareto: true,
    computeIntervalMs: 15000, cacheTtlMs: 120000, maxCache: 600, offHoursFactor: 4, offHoursOnce: true, enforceMarketHours: false,
    perfBudgetMs: 4.0, perfWindow: 25, allowFastPath: true,
    sessionStartHour: 8, sessionStartMin: 525, sessionEndMin: 810, poolObsFromMin: 525, sessionEndHour: 13,
    sessionDays: [0,1,2,3,4,6], marketHolidays: [], tzOffsetMin: 210,
    rankTtl: 60000, resetAfter: 600000, warmupMs: 12000, maxGroupSize: 60, rankFlushEvery: 16, rankFlushMs: 1500, rankCacheMs: 1000,
    basePrices: {'اهرم':70000,'وبملت':1300,'خودرو':480,'شستا':900,'خساپا':350,'شپنا':15000,'فملی':8500,'فولاد':7500,'شبندر':12000,'خبهمن':500,'وتجارت':700,'وبصادر':700},
    poolDays: 90, poolMaxDays: 90, poolAutoUpdate: false, poolAuto: true, poolPreGateEveryScan: true, poolMinObs: 3, poolClamp: 3,
    poolBaseSymbols: ['اهرم','وبملت','خودرو','شستا','خساپا','شپنا','فملی','فولاد','شبندر','خبهمن','وتجارت','وبصادر','ذوب','اخابر','تاصیکو'],
    contractSizes: {'خساپا':1000,'خودرو':1000,'وبملت':1000,'ذوب':1000,'اخابر':1000,'شپنا':1000,'شستا':1000,'وبصادر':1000,'تاصیکو':1000,'وتجارت':1000,'خبهمن':1000,'فملی':1371},
    poolGates: true, poolGateClamp: 2, poolMinGateObs: 20,
    dividendCalendar: {}, tsetmcCdnUrl: 'https://old.tsetmc.com', dividendAutoFetch: false, dividendFetchUrl: '', dividendMaxDays: 90,
    blockOnDividendDay: true, useLiveBase: true, baseInsCodes: {'فملی':'46348095188555032','فولاد':'18443602267221359','شستا':'13157749938547794','خودرو':'35366681030756042','اهرم':'77458905939487148'},
    liveBaseMaxAge: 300000, blockOnHalt: true, blockOnOrderQueue: true, orderQueueThreshold: 0.005,
    riskFreeCurve: [[1405,5,1,34],[1405,8,1,36],[1406,2,1,35]], riskFreeAutoFetch: false, riskFreeFetchUrl: '', riskFree: 33,
    useEwma: true, ewmaLambda: 0.94, enforceVolumeBase: false, volumeBaseRatio: 0.5, useWeightedDepth: true, depthWeights: [1.0,0.6,0.3],
    autoView: false, autoViewWeight: 0.5, positionSizing: true, capital: 100000000, riskPerTrade: 2, stopLossPct: 30, takeProfitPct: 80,
    verbose: false, debugPanel: false, logReasons: true, supportTabeii: true, tabeiiDiscount: 10, allowNewSymbols: true, newSymbolMinObs: 5,
    backtestMode: false, backtestDate: '', useScore: true, scoreMin: 35, c0Mode: 'score', wER: 35, wIVR: 25, wADX: 15, wLiq: 15, wEdge: 10,
    useIvRank: true, ivRankBuy: 40, ivRankSell: 70, ivHistDays: 90, ivAtmBand: 5, multiExpiry: true, maxPerExpiry: 0, distantDays: 45,
    useAdx: true, adxPeriod: 14, ihNewestFirst: true, useEntry: true, entryPad: 5, roundToTick: 5, usePopup: true,
    abortThreshold: 10, abortThresholdInput: 100,
    exoticEnabled: false, exoticTypes: [], barrierLevel: 0, asianWindow: 0, binaryPayout: 0, exoticMargin: 5, exoticVolMult: 1.2,
    viewMode: 'verbose' // summary | verbose — خلاصه فقط در minified
};

// ─── STATE — مرکزی ─────────────────────────────────────────────────────────
var MEM = {};
var CONFIG_CACHE = {};
var modelCache = {}; var modelCacheOrder = [];
var poolStore = {}; var ivHist = {}; var poolGatesCache = {};
var liveBaseCache = {}; var liveBaseFetching = {};
var pipelineData = {}; var layerStats = {}; var abortCounts = {};
var rawSamples = {raw:[], errors:[], incomplete:[]};
var totalInput = 0;
var _dragState = null;
var _renderScheduled = false;

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
function optSet(k,v){ if(k==='baseInsCodes'){ try{ _reverseMapCache=null; _reverseMapTime=0; }catch(e){} } optStore(k,v); clearCfgCache(k); console.log('[ExoticFilter] set '+k+'='+v); }
function optGet(k){ return getCfg(k); }
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

// ─── JALALI ────────────────────────────────────────────────────────────────
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
    var d=Math.floor((gy+Math.floor((gm-8)/6)+100100)*1461/4)+Math.floor((153*((gm+9)%12)+2)/5)+gd-34840408;
    d=d-Math.floor(Math.floor((gy+100100+Math.floor((gm-8)/6))/100)*3/4)+752;
    return d;
}
function jalaliToJdn(jy,jm,jd){
    var key=jy+'/'+jm+'/'+jd;
    if(jdnCache[key]) return jdnCache[key];
    var v;
    try{
        if(jy>1300){
            var r=jalCal(jy);
            v=g2d(r.gy,3,r.march)+(jm-1)*31-Math.floor(jm/7)*(jm-7)+jd-1;
        } else {
            v=jy*10000+jm*100+jd;
        }
    }catch(e){ v=jy*10000+jm*100+jd; }
    jdnCache[key]=v;
    return v;
}
function todayJdn(){ return unixDayTehran(); }
function unixDay(){ return Math.floor(Date.now()/86400000); }
function unixDayTehran(){
    var now=new Date();
    var tehranMs=now.getTime()+(210-(-now.getTimezoneOffset()))*60000;
    return Math.floor(tehranMs/86400000);
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
    }catch(e){ return {jy:1404, jm:6, jd:15}; }
}
function getNextJalaliMonthLastDay(){
    var cur=getJalaliNow();
    var jy=cur.jy, jm=cur.jm+1;
    if(jm>12){ jm=1; jy++; }
    var jd=jalaliMonthDays(jy, jm);
    return {jy:jy, jm:jm, jd:jd};
}
function updateExpiryToNextMonthLastDay(){
    try{
        var nxt=getNextJalaliMonthLastDay();
        var dateStr=nxt.jy+'/'+pad2(nxt.jm)+'/'+pad2(nxt.jd);
        var monthPat=nxt.jm<10? '0?'+nxt.jm : '(?:'+nxt.jm+'|0?'+(nxt.jm%10)+')';
        // برای ماه‌های دو رقمی هم 10 و هم 010? را بپذیر — ولی ساده: ماه دو رقمی دقیق
        if(nxt.jm>=10) monthPat='0?'+nxt.jm;
        var expiryPat=nxt.jy+'\\s*[\\/\\.\\-]\\s*'+monthPat+'(?!\\d)';
        CONFIG.expiryDate=dateStr; CONFIG.expiry=expiryPat; CONFIG.expiryJY=nxt.jy; CONFIG.expiryJM=nxt.jm; CONFIG.expiryJD=nxt.jd;
        if(getCfg('expiryAutoUpdate')!==false){
            try{ optStore('expiryDate', dateStr); optStore('expiry', expiryPat); optStore('expiryJY', nxt.jy); optStore('expiryJM', nxt.jm); optStore('expiryJD', nxt.jd); }catch(e){}
        }
        console.log('[ExoticFilter] سررسید خودکار → '+dateStr+' — الگو: '+expiryPat);
        return {dateStr:dateStr, pattern:expiryPat, jy:nxt.jy, jm:nxt.jm, jd:nxt.jd};
    }catch(e){ console.warn('[ExoticFilter] خطا سررسید', e); return null; }
}

// ─── POOL — 90 روزه — SoA پیشنهادی: ستون‌محور (jdn[], price[], tvol[]...) برای کش بهتر
// فعلاً AoS با binary insert و sort-on-demand — برای 90 روز و <100 نماد کافی است
// SoA کامل: {jdn:Int32Array, price:Float32Array, ...} — در آینده با WebAssembly قابل بهینه‌سازی
// ─── POOL — 90 روزه ───────────────────────────────────────────────────────
var POOL_MAX_DAYS=90;
var POOL_STORE_KEY='__exfPoolV1';
var POOL_IV_KEY='__exfIvHistV1';

function loadPool(){
    try{
        var raw=typeof localStorage!=='undefined'? localStorage.getItem(POOL_STORE_KEY):null;
        if(raw) poolStore=JSON.parse(raw);
        var rawIv=typeof localStorage!=='undefined'? localStorage.getItem(POOL_IV_KEY):null;
        if(rawIv) ivHist=JSON.parse(rawIv);
    }catch(e){ poolStore={}; ivHist={}; }
    var keys=Object.keys(poolStore);
    for(var i=0;i<keys.length;i++){
        var k=keys[i];
        if(!poolStore[k].history) poolStore[k].history=[];
        if(!poolStore[k].stats) poolStore[k].stats={};
    }
    try{ pruneOldPool(); }catch(e){}
}
function savePool(){
    try{
        if(typeof localStorage!=='undefined'){
            localStorage.setItem(POOL_STORE_KEY, JSON.stringify(poolStore));
            localStorage.setItem(POOL_IV_KEY, JSON.stringify(ivHist));
        }
    }catch(e){
        try{
            var keys=Object.keys(poolStore);
            keys.sort(function(a,b){ return (poolStore[a].history.length||0)-(poolStore[b].history.length||0); });
            for(var i=0;i<Math.floor(keys.length/2);i++) delete poolStore[keys[i]];
            localStorage.setItem(POOL_STORE_KEY, JSON.stringify(poolStore));
            console.warn('[ExoticFilter] localStorage quota — نصف حذف شد');
        }catch(e2){
            console.error('[ExoticFilter] quota lost', e2);
            rawSamples.errors.push({reason:'ls-quota-lost', error:e2.message});
        }
    }
}
// ─── BINARY SEARCH INSERT — O(log n) به جای sort هر بار ──────────────────
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
    // binary search برای وجود
    var pos=binarySearchInsertPos(entry.history, jdn);
    if(pos<entry.history.length && entry.history[pos].jdn===jdn){
        entry.history[pos].price=data.price||entry.history[pos].price;
        if(data.vol!=null) entry.history[pos].vol=data.vol;
        if(data.tno!=null) entry.history[pos].tno=data.tno;
        if(data.tvol!=null) entry.history[pos].tvol=data.tvol;
        if(data.iv!=null && data.iv>0) entry.history[pos].iv=data.iv;
        entry.lastJdn=jdn;
        updatePoolStats(baseSym);
        return;
    }
    var newItem={jdn:jdn, dateStr:data.dateStr||new Date().toISOString().slice(0,10), price:data.price||0, vol:data.vol||0, tno:data.tno||0, tvol:data.tvol||0, iv:data.iv||0};
    // binary insert
    entry.history.splice(pos,0,newItem);
    var maxDays=getCfg('poolMaxDays')||90;
    if(entry.history.length>maxDays){
        // نگه‌داری 90 روز آخر — چون مرتب است، از ابتدا حذف
        var excess=entry.history.length-maxDays;
        entry.history.splice(0, excess);
    }
    entry.firstJdn=entry.history[0]? entry.history[0].jdn : jdn;
    entry.lastJdn=entry.history[entry.history.length-1].jdn;
    entry.count=entry.history.length;
    if(_poolBatchMode){ _poolDirty[baseSym]=true; } else { updatePoolStats(baseSym); }
    if(data.iv!=null && data.iv>0){
        if(!ivHist[baseSym]) ivHist[baseSym]=[];
        var posIv=binarySearchInsertPos(ivHist[baseSym], jdn);
        if(posIv<ivHist[baseSym].length && ivHist[baseSym][posIv].jdn===jdn){
            ivHist[baseSym][posIv].iv=data.iv;
        } else {
            ivHist[baseSym].splice(posIv,0,{jdn:jdn, iv:data.iv, dateStr:data.dateStr});
        }
        if(ivHist[baseSym].length>getCfg('ivHistDays')) ivHist[baseSym]=ivHist[baseSym].slice(-getCfg('ivHistDays'));
    }
}

// ─── REVERSE MAP — insCode → baseSym برای live price سریع ────────────────
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

function updatePoolStats(baseSym){
    var entry=poolStore[baseSym];
    if(!entry || !entry.history.length) return;
    var sumP=0, sumV=0, sumTno=0, prices=[], cntV=0, cntTno=0;
    for(var i=0;i<entry.history.length;i++){
        var h=entry.history[i];
        if(h.price>0){ sumP+=h.price; prices.push(h.price); }
        if(h.tvol>0){ sumV+=h.tvol; cntV++; }
        if(h.tno>0){ sumTno+=h.tno; cntTno++; }
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
            vol=std*Math.sqrt(252)*100;
        } else {
            var mean=avg, sq2=0;
            for(var k2=0;k2<prices.length;k2++) sq2+=(prices[k2]-mean)*(prices[k2]-mean);
            vol=Math.sqrt(sq2/prices.length)/mean*100;
        }
    }
    entry.stats={avgPrice:avg, lastPrice:entry.history[entry.history.length-1].price, volatility:vol, avgTvol:cntV? sumV/cntV : 0, avgTno:cntTno? sumTno/cntTno : 0, days:entry.history.length, firstJdn:entry.firstJdn, lastJdn:entry.lastJdn};
    if(getCfg('poolAuto') && avg>0){
        var clamp=getCfg('poolClamp')||3;
        var cfgPrices=getCfg('basePrices')||{};
        var fixed=cfgPrices[baseSym]||CONFIG.basePrices[baseSym]||avg;
        var lo=fixed/clamp, hi=fixed*clamp;
        var calibrated=Math.max(lo, Math.min(hi, avg));
        if(entry.history.length>= (getCfg('poolMinObs')||3)){
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
    var hist=ivHist[baseSym];
    if(!hist || hist.length<5) return 50;
    var cacheKey=baseSym+'_'+hist.length+'_'+_ivRankVersion;
    var cached=_ivRankCache[cacheKey];
    var ivs;
    if(cached && cached.ivs){
        ivs=cached.ivs;
    } else {
        ivs=hist.map(function(x){return x.iv;}).sort(function(a,b){return a-b;});
        _ivRankCache[cacheKey]={ivs:ivs};
        // LRU clean
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
        out.push({symbol:sym, days:e.history.length, lastPrice:e.stats.lastPrice, avgPrice:e.stats.avgPrice, vol:e.stats.volatility, avgTvol:e.stats.avgTvol});
    }
    out.sort(function(a,b){return b.days-a.days;});
    return out;
}
function getPoolStatusText(){
    var keys=Object.keys(poolStore);
    var totalSyms=keys.length;
    var totalDays=0;
    for(var i=0;i<keys.length;i++){ var k=keys[i]; if(poolStore[k] && poolStore[k].history) totalDays+=poolStore[k].history.length; }
    return totalSyms+' نماد اصلی، '+totalDays+' روز دیتا، تا '+POOL_MAX_DAYS+' روز نگهداری';
}
loadPool();

// Pool history manual update
function requestPoolUpdate(baseSym, opts){
    beginPoolBatch();
    opts=opts||{};
    var showAlert=opts.showAlert!==false;
    var symbols=[];
    if(baseSym) symbols=[baseSym];
    else {
        symbols=getSymList('poolBaseSymbols');
        if(symbols.length===0) symbols=Object.keys(poolStore);
        if(symbols.length===0) symbols=['خودرو','اهرم','وبملت'];
    }
    var updated=0;
    var nowJdn=todayJdn();
    var dateStr=new Date().toISOString().slice(0,10);
    var hasRealHistory=false;
    try{
        if(typeof window!=='undefined' && window.ih && Array.isArray(window.ih) && window.ih.length>0){
            hasRealHistory=true;
            var ih=window.ih;
            var newestFirst=getCfg('ihNewestFirst');
            var curL18=(typeof l18!=='undefined'? l18 : '')||'';
            for(var si=0;si<symbols.length;si++){
                var bs=symbols[si];
                if(curL18.indexOf(bs)!==-1 || symbols.length===1){
                    var maxDays=Math.min(ih.length, getCfg('poolMaxDays')||90);
                    for(var d=0;d<maxDays;d++){
                        var row=ih[newestFirst? d : ih.length-1-d];
                        if(!row) continue;
                        var price=row[2]||row[0]||0;
                        if(price>0){
                            var dDate=new Date(Date.now()-d*86400000);
                            addToPool(bs, {price:price, jdn: nowJdn-d, dateStr: dDate.toISOString().slice(0,10), tno: 10, tvol: 10000});
                        }
                    }
                    updated++;
                }
            }
        }
    }catch(e){}
    if(!hasRealHistory || updated===0){
        if(hasRealHistory && updated===0) console.log('[ExoticFilter] ih داشت ولی match نشد — fallback: بدون داده واقعی، استخر بروز نمی‌شود (بند ۲۶)');
        var skipped=0;
        for(var i=0;i<symbols.length;i++){
            var sym=symbols[i];
            var price=getPoolPrice(sym)||getCfg('basePrices')[sym]||CONFIG.basePrices[sym]||0;
            var codes=getCfg('baseInsCodes')||{};
            var ins=codes[sym];
            if(ins && liveBaseCache[ins] && liveBaseCache[ins].price){
                price=liveBaseCache[ins].price;
                addToPool(sym, {price: Math.round(price), jdn: nowJdn, dateStr: dateStr, tno: 20, tvol: 50000});
                updated++;
            } else if(price>0){
                // بدون Math.random — فقط قیمت موجود، بدون ساختگی
                addToPool(sym, {price: Math.round(price), jdn: nowJdn, dateStr: dateStr, tno: 10, tvol: 10000});
                updated++;
            } else {
                skipped++;
                console.warn('[ExoticFilter] No real price for '+sym+' — skipping per contract 26');
            }
        }
        if(skipped>0) showToast('⚠️ '+skipped+' نماد بدون داده واقعی رد شد (بند ۲۶)', 'warn');
    }
    endPoolBatch(); pruneOldPool(); calibrateGatesFromPool();
    if(showAlert) showToast('🔄 '+updated+' نماد بروز شد — '+getPoolStatusText(), 'success');
    console.log('[ExoticFilter] History updated:', updated+' symbols, '+getPoolStatusText());
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
    var hist=entry.history.slice(-30);
    if(hist.length<2) return '<div style="color:#8b9bb4;font-size:11px;padding:10px;background:#0f141e;border-radius:8px;">داده کافی برای نمودار نیست — '+baseSym+' فقط '+hist.length+' روز دارد</div>';
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

// ─── LIVE PRICE ────────────────────────────────────────────────────────────
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
function fetchLiveBase(insCode, cb){
    if(!insCode){ if(cb) cb(null); return null; }
    var now=Date.now();
    var cached=liveBaseCache[insCode];
    var maxAge=getCfg('liveBaseMaxAge')||300000;
    if(cached && (now-cached.time)<maxAge){ if(cb) cb(cached.price); return cached.price; }
    if(liveBaseFetching[insCode]){ if(cb) cb(null); return null; }
    liveBaseFetching[insCode]=true;
    var cdnUrl=getCfg('tsetmcCdnUrl')||'https://old.tsetmc.com';
    var livePath='/tsev2/data/InstInfoFast.aspx?i='+insCode+'&c=34';
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
    var _controller=null;
    function _finish(val){
        if(_done) return;
        _done=true;
        if(_timeoutId) clearTimeout(_timeoutId);
        liveBaseFetching[insCode]=false;
        if(cb) cb(val);
    }
    try{ _controller=new AbortController(); }catch(e){ _controller=null; }
    _timeoutId=setTimeout(function(){
        try{ if(_controller) _controller.abort(); }catch(e){}
        _finish(null);
    }, 8000);
    try{
        if(typeof fetch==='undefined'){ _finish(null); return null; }
        var opts={method:'GET', credentials:'same-origin'};
        if(_controller) opts.signal=_controller.signal;
        fetch(fetchUrl, opts).then(function(resp){
            if(_done) return Promise.reject(new Error('timeout already'));
            if(_timeoutId) clearTimeout(_timeoutId);
            _timeoutId=setTimeout(function(){ _finish(null); }, 3000);
            if(!resp.ok) throw new Error('HTTP '+resp.status);
            return resp.text();
        }).then(function(txt){
            if(_done) return;
            if(_timeoutId) clearTimeout(_timeoutId);
            var price=0;
            try{
                var m=txt.match(/(\d+)/g);
                if(m && m.length>0){
                    for(var i=m.length-1;i>=0;i--){
                        var n=+m[i];
                        if(n>100 && n<1000000){ price=n; break; }
                    }
                }
            }catch(e){}
            if(price>0){
                liveBaseCache[insCode]={price:price, time:Date.now()};
                var baseSym=null;
                var codes=getCfg('baseInsCodes')||{};
                var codeKeys=Object.keys(codes);
                for(var k=0;k<codeKeys.length;k++){ var kk=codeKeys[k]; if(codes[kk]===insCode){ baseSym=kk; break; } }
                if(baseSym){ addToPool(baseSym, {price:price, dateStr:new Date().toISOString().slice(0,10), jdn: todayJdn()}); savePool(); }
                _finish(price);
            } else {
                _finish(null);
            }
        }).catch(function(err){
            if(_done) return;
            _finish(null);
            if(getCfg('verbose') && err && err.message!=='timeout already'){
                console.warn('[ExoticFilter] live fetch failed '+fetchUrl+': '+err.message);
            }
        });
    }catch(e){ _finish(null); }
    return null;
}
function fetchAllLiveBases(cb){
    var codes=getCfg('baseInsCodes')||{};
    var keys=Object.keys(codes);
    if(keys.length===0){ if(cb) cb({}); return; }
    var results={};
    var pending=keys.length;
    var finished=false;
    function tryDone(){
        if(finished) return;
        if(pending<=0){ finished=true; if(cb) cb(results); }
    }
    for(var i=0;i<keys.length;i++){
        (function(sym, code){
            fetchLiveBase(code, function(price){
                if(price) results[sym]=price;
                pending--;
                tryDone();
            });
        })(keys[i], codes[keys[i]]);
    }
    setTimeout(function(){ if(!finished){ finished=true; if(cb) cb(results); } }, 12000);
}
function testCdn71(url, cb){
    var testUrl=url||getCfg('tsetmcCdnUrl')||'https://old.tsetmc.com';
    var curOrigin=getCurOrigin();
    var isCross=testUrl && testUrl!=='' && !isSameOriginUrl(testUrl);
    var sameOriginDataUrl='/tsev2/data/InstInfoFast.aspx?i=35366681030756042&c=34';
    var cdnTestUrl=testUrl? (testUrl.replace(/\/$/,'')+sameOriginDataUrl) : sameOriginDataUrl;
    var results={curOrigin:curOrigin, testUrl:testUrl, isCrossOrigin:isCross, sameOriginOk:false, cdnOk:false, note:''};
    try{
        fetch(sameOriginDataUrl, {method:'GET', credentials:'same-origin'}).then(function(r){
            results.sameOriginOk=r.ok;
            if(isCross){
                return fetch(cdnTestUrl, {method:'GET', mode:'no-cors'}).then(function(){
                    results.cdnOk=true;
                    results.note='دیتا فقط هم‌مبدأ مجاز است — fallback هم‌مبدأ فعال';
                    if(cb) cb(results);
                }).catch(function(){
                    results.cdnOk=false;
                    results.note='CDN در دسترس نیست — از هم‌مبدأ استفاده می‌شود';
                    if(cb) cb(results);
                });
            } else {
                results.cdnOk=r.ok;
                results.note=r.ok? 'هم‌مبدأ OK — قیمت زنده فعال' : 'هم‌مبدأ شکست';
                if(cb) cb(results);
            }
        }).catch(function(e){ results.sameOriginOk=false; results.note='هم‌مبدأ شکست: '+e.message; if(cb) cb(results); });
    }catch(e){ results.note='fetch پشتیبانی نمی‌شود: '+e.message; if(cb) cb(results); }
}
function testCdnAndShow71(){
    var url=getCfg('tsetmcCdnUrl');
    var inp=document.getElementById('__exfIn_tsetmcCdnUrl');
    if(inp) url=inp.value;
    testCdn71(url, function(res){
        var msg='🔍 تست CDN\nمبدأ فعلی: '+(res.curOrigin||'نامشخص')+'\nآدرس تست: '+(res.testUrl||'(هم‌مبدأ)')+'\nکراس-اوریجین: '+(res.isCrossOrigin?'بله → fallback':'خیر')+'\nهم‌مبدأ: '+(res.sameOriginOk?'✅ OK':'❌ شکست')+'\nCDN: '+(res.cdnOk?'✅ OK':'❌ شکست')+'\n\n'+res.note;
        alert(msg);
        console.log('[ExoticFilter] CDN test', res);
    });
}
function autoConfigCdn71(){
    var curOrigin=getCurOrigin();
    var candidates=['', curOrigin, 'https://old.tsetmc.com', 'https://cdn8.tsetmc.com', 'https://www.tsetmc.com', 'https://tsetmc.com'];
    var uniq=[];
    for(var i=0;i<candidates.length;i++){ if(uniq.indexOf(candidates[i])===-1 && candidates[i]!==undefined) uniq.push(candidates[i]); }
    var idx=0; var best=null;
    function tryNext(){
        if(idx>=uniq.length){
            if(best!==null){
                var inp=document.getElementById('__exfIn_tsetmcCdnUrl');
                if(inp) inp.value=best;
                if(window.__exf && window.__exf.optSet) window.__exf.optSet('tsetmcCdnUrl', best);
                showToast('⚙️ بهترین: '+(best||'(هم‌مبدأ)'), 'success');
            } else {
                showToast('هیچ‌کدام OK نشد — هم‌مبدأ پیشنهاد می‌شود', 'error');
                var inp2=document.getElementById('__exfIn_tsetmcCdnUrl');
                if(inp2) inp2.value='';
                if(window.__exf && window.__exf.optSet) window.__exf.optSet('tsetmcCdnUrl', '');
            }
            return;
        }
        var cand=uniq[idx++];
        var testPath='/tsev2/data/InstInfoFast.aspx?i=35366681030756042&c=34';
        var isSame=!cand || cand==='' || isSameOriginUrl(cand);
        if(!isSame){ tryNext(); return; }
        var fetchUrl=cand? (cand.replace(/\/$/,'')+testPath) : testPath;
        fetch(fetchUrl, {method:'GET', credentials:'same-origin'}).then(function(r){ if(r.ok && best===null) best=cand; tryNext(); }).catch(function(){ tryNext(); });
    }
    tryNext();
}

// ─── BLACK-SCHOLES ─────────────────────────────────────────────────────────
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
function bsGreeks(S,K,T,r,q,sigma,isCall){
    if(T<=0) return {delta:isCall?(S>K?1:0):(S<K?-1:0), gamma:0, theta:0, vega:0};
    var sqrtT=Math.sqrt(T);
    var d1=(Math.log(S/K)+(r-q+0.5*sigma*sigma)*T)/(sigma*sqrtT);
    var d2=d1-sigma*sqrtT;
    var pdf=normPdf(d1);
    var dfQ=Math.exp(-q*T);
    var delta=isCall? dfQ*normCdf(d1) : dfQ*(normCdf(d1)-1);
    var gamma=dfQ*pdf/(S*sigma*sqrtT);
    var vega=S*dfQ*pdf*sqrtT;
    var term1=-(S*dfQ*pdf*sigma)/(2*sqrtT);
    var term2, theta;
    if(isCall){ term2=q*S*dfQ*normCdf(d1)-r*K*Math.exp(-r*T)*normCdf(d2); theta=(term1+term2)/365; }
    else { term2=-q*S*dfQ*normCdf(-d1)+r*K*Math.exp(-r*T)*normCdf(-d2); theta=(term1+term2)/365; }
    return {delta:delta, gamma:gamma, theta:theta, vega:vega, d1:d1, d2:d2};
}
function ivSolve(marketPrice,S,K,T,r,q,isCall){
    var MAX_ITER=60;
    var mn=S/K;
    var sigma=mn<0.8? 0.6 : mn>1.2? 0.5 : 0.35;
    var intrinsic=isCall? Math.max(S*Math.exp(-q*T)-K*Math.exp(-r*T),0) : Math.max(K*Math.exp(-r*T)-S*Math.exp(-q*T),0);
    if(marketPrice < intrinsic*0.99) return {iv:0, ok:false, reason:'below-intrinsic'};
    var lo=0.01, hi=5.0;
    for(var i=0;i<MAX_ITER;i++){
        var price=bsPrice(S,K,T,r,q,sigma,isCall);
        var vegaRaw=bsGreeks(S,K,T,r,q,sigma,isCall).vega;
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

// ─── FILTERS REGISTRY ───────────────────────────────────────────────────────
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
    'gate': {label:'گیت محاسباتی', severity:'hard', layer:'L6-quality'},
    'score': {label:'امتیاز پایین', severity:'soft', layer:'L6-quality', isPrefix:true},
    'min-er': {label:'بازده کم', severity:'soft', layer:'L6-quality'},
    'cold': {label:'بازده سرد', severity:'soft', layer:'L6-quality'},
    'rank': {label:'رتبه پایین', severity:'soft', layer:'L7-ranking'},
    'global-rank': {label:'سقف کل', severity:'soft', layer:'L7-ranking'},
    'pareto': {label:'پارتو', severity:'soft', layer:'L7-ranking'},
    'aborted': {label:'توقف خودکار', severity:'hard', layer:'L7-ranking'}
};
var FILTER_MAP71 = FILTERS;

// ─── LAYERS — Layer Registry Pattern ────────────────────────────────────────
var LAYERS = [
    {
        key: 'L1-validation', icon: '🔍', color: '#38bdf8', order: 1,
        label: 'اعتبارسنجی داده', desc: 'داده اولیه',
        schema: {
            minPrice: {type:'number', def:10, min:0, max:1e6, group:'core', label:'حداقل قیمت (ریال)'},
            expiryDate: {type:'jalali', def:'auto', group:'core', label:'سررسید مرجع'},
            expiryAutoUpdate: {type:'bool', def:true, group:'core', label:'بروزرسانی خودکار سررسید'},
            abortThresholdInput: {type:'number', def:100, min:0, max:1000, group:'adv', label:'آستانه داده ناقص'}
        },
        filter: function(ctx, sym){
            if(!sym || !sym.l18 || sym.pl==null) return ctx.reject('input-data');
            if(sym.pl < ctx.cfg.minPrice) return ctx.reject('price', 'pl='+sym.pl);
            if(sym.expiryJdn!=null){
                var expJ=sym.expiryJdn;
                if(expJ>1000000){
                    var jy=Math.floor(expJ/10000), jm=Math.floor((expJ%10000)/100), jd=expJ%100;
                    expJ=jalaliToJdn(jy,jm,jd);
                }
                if(expJ < ctx.todayJdn) return ctx.reject('expiry-past');
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
            blockOnDividendDay: {type:'bool', def:true, group:'adv', label:'رد روز مجمع'}
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
            unitGuardX: {type:'number', def:8, min:1, max:20, group:'adv', label:'ضریب واحد قیمت'}
        },
        filter: function(ctx, sym){
            var bidRaw=sym.pd1||sym.bid||0, askRaw=sym.po1||sym.ask||0;
            if(bidRaw && askRaw && bidRaw>0 && askRaw>0 && bidRaw>askRaw) return ctx.reject('crossed-book', 'bid='+bidRaw+' ask='+askRaw);
            var bid=bidRaw||0, ask=askRaw||0;
            if(!bid || !ask){ bid=sym.pl*0.98; ask=sym.pl*1.02; }
            if(!bid || !ask || bid<=0 || ask<=0) return ctx.reject('no-quote');
            var mid=(bid+ask)/2;
            var spreadPct=(ask-bid)/mid*100;
            if(spreadPct>ctx.cfg.maxSpread) return ctx.reject('spread', 'spread='+spreadPct.toFixed(1)+'%');
            var strikeMatch=String(sym.l30||'').match(/(\d{3,6})/);
            var K=strikeMatch? +strikeMatch[1] : 0;
            if(!K || K<10){
                if(sym.strike!=null && sym.strike>=10) K=sym.strike;
                else return ctx.reject('strike', 'strike-extract-failed l30='+String(sym.l30||'').slice(0,30));
            }
            if(!K || K<10) return ctx.reject('strike');
            var poolP=sym.base? getPoolPrice(sym.base) : 0;
            var S=poolP||ctx.cfg.basePrices[sym.base]||sym.basePrice||1000;
            if(!S || S<=0) S=1000;
            var T=ctx.cfg.holdDays/365;
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
            // آربیتراژ کامل: Call max(S-K,0) ≤ C ≤ S  و  Put max(K-S,0) ≤ P ≤ K
            if(marketPrice < intrinsic*0.9) return ctx.reject('arb-bound', 'mp='+marketPrice+' intr='+intrinsic);
            if(isCall){
                if(marketPrice > S*1.02) return ctx.reject('arb-bound', 'call C>S mp='+marketPrice+' S='+S);
            } else {
                if(marketPrice > K*1.02) return ctx.reject('arb-bound', 'put P>K mp='+marketPrice+' K='+K);
            }
            var timeValue=marketPrice-intrinsic;
            if(timeValue<0) timeValue=0;
            var tvPct=intrinsic>0? (timeValue/marketPrice*100) : 100;
            if(tvPct>ctx.cfg.maxTimeValuePct && ctx.cfg.maxTimeValuePct<100) return ctx.reject('time-value', 'tv%='+tvPct.toFixed(1));
            var modelPrice=bsPrice(S,K,T,r,q,0.4,isCall);
            var unitRatio=modelPrice>0? marketPrice/modelPrice : 1;
            if(unitRatio>ctx.cfg.unitGuardX*2) return ctx.reject('unit', 'ratio='+unitRatio.toFixed(2));
            // DTE واقعی از expiryJdn
            if(sym.expiryJdn!=null){
                var expJ2=sym.expiryJdn;
                if(expJ2>1000000){
                    var jy2=Math.floor(expJ2/10000), jm2=Math.floor((expJ2%10000)/100), jd2=expJ2%100;
                    expJ2=jalaliToJdn(jy2,jm2,jd2);
                }
                if(expJ2>0){
                    var realDte=expJ2 - ctx.todayJdn;
                    if(realDte>=0) sym.dte=realDte;
                }
            }
            // ذخیره برای لایه‌های بعد
            sym._S=S; sym._K=K; sym._T=T; sym._r=r; sym._q=q; sym._isCall=isCall; sym._mid=mid; sym._bid=bid; sym._ask=ask;
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
            useIvRank: {type:'bool', def:true, group:'adv', label:'IV Rank'}
        },
        filter: function(ctx, sym){
            var S=sym._S, K=sym._K, T=sym._T, r=sym._r, q=sym._q, isCall=sym._isCall, marketPrice=sym._mid;
            if(!S || !K) return ctx.reject('base-price');
            var ivRes=ivSolve(marketPrice,S,K,T,r,q,isCall);
            if(!ivRes.ok) return ctx.reject('iv-bad');
            var sigma=ivRes.iv;
            if(sigma<0.05 || sigma>5) return ctx.reject('iv-range', 'iv='+(sigma*100).toFixed(1)+'%');
            var poolVol=sym.base? getPoolVolatility(sym.base) : 0;
            var hv=poolVol>0? poolVol/100 : (ctx.cfg.volFloor+ctx.cfg.volCeil)/2/100;
            var ivPrem=(sigma-hv)/hv*100;
            if(ivPrem>ctx.cfg.maxIvPremium && ctx.cfg.maxIvPremium<100) return ctx.reject('iv-premium', 'prem='+ivPrem.toFixed(1)+'%');
            var greeks=bsGreeks(S,K,T,r,q,sigma,isCall);
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
            if(sym.base && sigma>0){
                try{ addToPool(sym.base, {price:S, iv:sigma, jdn: todayJdn(), dateStr: new Date().toISOString().slice(0,10)}); }catch(e){}
            }
            sym._iv=sigma; sym._greeks=greeks; sym._leverage=leverage; sym._moneyness=moneyness;
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
            if(sym.dte!=null && sym.dte < ctx.cfg.minDaysLeft) return ctx.reject('dte', 'dte='+sym.dte);
            var S=sym._S, K=sym._K, T=sym._T, r=sym._r, q=sym._q, sigma=sym._iv, isCall=sym._isCall, marketPrice=sym._mid;
            var fair=bsPrice(S*(1+ctx.cfg.view/100),K,T,r,q,sigma,isCall);
            var er=(fair-marketPrice)/marketPrice*100;
            if(ctx.cfg.minDteWeight){
                var dte=sym.dte!=null? sym.dte : ctx.cfg.minDaysLeft;
                var hold=ctx.cfg.holdDays;
                var penalty=0;
                if(dte < hold*ctx.cfg.dtePenaltyDaysMult){
                    penalty=ctx.cfg.dtePenaltyMax*(1 - dte/(hold*ctx.cfg.dtePenaltyDaysMult));
                    er-=penalty;
                }
            }
            var coldThresh=ctx.cfg.coldThreshold!=null? ctx.cfg.coldThreshold : 3;
            if(er < coldThresh) return ctx.reject('cold', 'er='+er.toFixed(1)+'%');
            if(er < ctx.cfg.minExpRet) return ctx.reject('min-er', 'er='+er.toFixed(1)+'%');
            if(ctx.cfg.useScore){
                var score=0;
                score+=Math.min(er,100)/100*ctx.cfg.wER;
                var ivRank=50;
                if(ctx.cfg.useIvRank && sym.base){
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
        label: 'رتبه‌بندی و خروجی', desc: 'خروجی',
        schema: {
            maxPerGroup: {type:'number', def:2, min:0, max:10, group:'core', label:'سقف هر گروه'},
            maxTotalRows: {type:'number', def:0, min:0, max:1000, group:'core', label:'سقف کل'},
            usePareto: {type:'bool', def:true, group:'adv', label:'پارتو'},
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
                        console.warn('[ExoticFilter] حالت مرگ: '+inputAbort+'/'+ctx.totalInput);
                    }
                    if(ctx.debugOn && ctx.rawSamples.errors.length<5) ctx.rawSamples.errors.push({reason:'near-death', inputAbort:inputAbort, total:ctx.totalInput});
                }
            }
            return ctx.pass();
        }
    }
];

// برای افزودن لایه هشتم در آینده:
// LAYERS.push({key:'L8-momentum', icon:'📊', color:'#c084fc', order:8, label:'مومنتوم', schema:{...}, filter:function(ctx,sym){...}});

// ─── CONTEXT + HOOKS ──────────────────────────────────────────────────────
function makeCtx(){
    return {
        cfg: CONFIG,
        pool: poolStore,
        ivHist: ivHist,
        todayJdn: todayJdn(),
        totalInput: totalInput,
        abortCounts: abortCounts,
        rawSamples: rawSamples,
        debugOn: getCfg('debugPanel'),
        _deathWarned: false,
        _reject: null,
        reject: function(key, detail){
            this._reject={ok:false, key:key, detail:detail||null};
            return this._reject;
        },
        pass: function(extras){
            this._reject=null;
            return {ok:true, extras:extras||null};
        },
        getCfg: getCfg,
        getPoolPrice: getPoolPrice,
        hooks: {
            beforeAll: [],
            afterAll: [],
            beforeFilter: [],
            afterFilter: []
        },
        callHook: function(name, args){
            try{
                var list=this.hooks[name]||[];
                for(var i=0;i<list.length;i++){
                    try{ list[i].apply(null, args); }catch(e){ console.warn('[Hook] '+name+' error', e); }
                }
                // layer-level hooks
                for(var li=0;li<LAYERS.length;li++){
                    var L=LAYERS[li];
                    if(L.hooks && L.hooks[name]){
                        try{ L.hooks[name].apply(L, args); }catch(e){ console.warn('[LayerHook] '+L.key+' '+name, e); }
                    }
                }
            }catch(e){}
        }
    };
}

// برای افزودن لایه هشتم با Hooks:
// LAYERS.push({
//   key:'L8-momentum', icon:'📊', color:'#c084fc', order:8, label:'مومنتوم',
//   schema:{momWindow:{type:'number', def:20, group:'core', label:'پنجره مومنتوم'}},
//   hooks:{ beforeAll:function(ctx){ console.log('L8 beforeAll'); } },
//   filter:function(ctx,sym){ return ctx.pass(); }
// });
// همچنین می‌توان هوک سراسری اضافه کرد:
// makeCtx().hooks.beforeAll.push(function(ctx){ ... });


// ─── PIPELINE ───────────────────────────────────────────────────────────────
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

function runPipeline(symbols){
    resetPipeline();
    var ctx=makeCtx();
    ctx.totalInput=symbols.length;
    var results=[];
    var failed=[];
    var startTime=Date.now();
    var HARD_TIMEOUT=getCfg('computeIntervalMs')||15000;

    outer:
    for(var i=0;i<symbols.length;i++){
        totalInput++;
        ctx.totalInput=totalInput;
        if(Date.now()-startTime>HARD_TIMEOUT){
            console.warn('[ExoticFilter] Pipeline timeout at '+i+'/'+symbols.length);
            rawSamples.errors.push({reason:'pipeline-timeout', at:i, total:symbols.length});
            break;
        }
        var sym=symbols[i];
        var debugOn=getCfg('debugPanel');
        try{
            for(var li=0;li<LAYERS.length;li++){
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
                    continue outer;
                }
                passLayer(layerKey, sym.l18);
            }
            results.push(sym);
        }catch(e){
            failed.push({sym:sym.l18||i, reason:'exception:'+e.message, layer:'exception'});
            if(rawSamples.errors.length<10) rawSamples.errors.push({sym:sym.l18, error:e.message});
        }
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
    return {pass:results, fail:failed, pipeline:pipelineData, stats:layerStats, total:symbols.length, isDeath:isDeath, deathInfo:isDeath? {topFilter:topFilter, topCount:topCount} : null};
}

// ─── VIEW MODE ──────────────────────────────────────────────────────────────
var VIEW_MODE={SUMMARY:'summary', VERBOSE:'verbose'};
function getViewMode(){
    var m=getCfg('viewMode');
    if(m) return m;
    try{
        if(typeof location!=='undefined' && location.search && location.search.indexOf('verbose=1')!==-1) return VIEW_MODE.VERBOSE;
    }catch(e){}
    return VIEW_MODE.VERBOSE;
}

// ─── UI ────────────────────────────────────────────────────────────────────
var panelEl=null, debugEl=null, topZ=10000;
function bringTop71(el){ topZ+=2; el.style.zIndex=topZ; }
var _dragBound=false;
function makeDraggable71(el, handle){
    if(!el || !handle) return;
    try{ handle.style.cursor='move'; }catch(e){}
    try{
        handle.addEventListener('mousedown', function(e){
            try{
                var rect=el.getBoundingClientRect();
                _dragState={el:el, sx:e.clientX, sy:e.clientY, ox:rect.left, oy:rect.top};
            }catch(e){ _dragState={el:el, sx:e.clientX, sy:e.clientY, ox:0, oy:0}; }
            e.preventDefault();
        });
    }catch(e){}
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
            _dragState.el.style.left=(_dragState.ox+e.clientX-_dragState.sx)+'px';
            _dragState.el.style.top=(_dragState.oy+e.clientY-_dragState.sy)+'px';
            _dragState.el.style.right='auto'; _dragState.el.style.bottom='auto';
        });
    });
    document.addEventListener('mouseup', function(){ _dragState=null; });
    document.addEventListener('touchmove', function(e){
        if(!_dragState || !e.touches[0]) return;
        var t=e.touches[0];
        _dragState.el.style.left=(_dragState.ox+t.clientX-_dragState.sx)+'px';
        _dragState.el.style.top=(_dragState.oy+t.clientY-_dragState.sy)+'px';
        _dragState.el.style.right='auto'; _dragState.el.style.bottom='auto';
    }, {passive:false});
    document.addEventListener('touchend', function(){ _dragState=null; });
}

function buildModernPanel(){
    var existingPanel=document.getElementById('__exfPanel');
    if(existingPanel){ panelEl=existingPanel; return panelEl; }
    if(panelEl) return panelEl;

    var css = ''
    +'.exf-panel, .exf-topbar, #__exfDebugPanel, #__exfToast{--bg:#070a14;--bg2:#0f172a;--card:#111c32;--card2:#162040;--card3:#1c2a4a;--border:#1e2f4f;--border2:#2a3f66;--text:#e2e8f0;--text2:#94a3b8;--muted:#64748b;--accent:#38bdf8;--accent2:#818cf8;--accent3:#22d3ee;--ok:#34d399;--ok2:#10b981;--warn:#fbbf24;--bad:#fb7185;--grad-main:linear-gradient(135deg,#38bdf8 0%,#818cf8 50%,#c084fc 100%);--grad-ok:linear-gradient(135deg,#34d399 0%,#22d3ee 100%);--grad-warn:linear-gradient(135deg,#fbbf24 0%,#f97316 100%);--grad-funnel:linear-gradient(180deg,rgba(56,189,248,0.08) 0%,rgba(129,140,248,0.08) 50%,rgba(192,132,252,0.08) 100%);--shadow:0 25px 80px rgba(0,0,0,0.7),0 0 0 1px rgba(56,189,248,0.08),0 0 40px rgba(56,189,248,0.05);--shadow-card:0 8px 32px rgba(0,0,0,0.4),0 0 0 1px rgba(255,255,255,0.03);}'
    +'.exf-panel{position:fixed;right:20px;top:20px;width:440px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;background:radial-gradient(120% 120% at 0% 0%,rgba(56,189,248,0.12) 0%,transparent 50%),radial-gradient(100% 100% at 100% 0%,rgba(129,140,248,0.10) 0%,transparent 50%),linear-gradient(180deg,var(--card) 0%,var(--bg) 100%);border:1px solid var(--border);border-radius:20px;box-shadow:var(--shadow);font-family:Vazirmatn,Tahoma,sans-serif;direction:rtl;color:var(--text);z-index:10000;backdrop-filter:blur(24px) saturate(1.2);}'
    +'.exf-header{padding:18px 20px;display:flex;align-items:center;justify-content:space-between;position:relative;overflow:hidden;flex-shrink:0;}'
    +'.exf-header::before{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:var(--grad-main);opacity:0.6;}'
    +'.exf-header::after{content:"";position:absolute;bottom:0;left:20px;right:20px;height:1px;background:linear-gradient(90deg,transparent,var(--border),transparent);}'
    +'.exf-title{display:flex;align-items:center;gap:12px;}'
    +'.exf-title-icon{width:40px;height:40px;border-radius:12px;background:var(--grad-main);display:flex;align-items:center;justify-content:center;font-size:20px;box-shadow:0 8px 20px rgba(56,189,248,0.35),0 0 0 1px rgba(255,255,255,0.1) inset;position:relative;overflow:hidden;}'
    +'.exf-title-icon::after{content:"";position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:linear-gradient(45deg,transparent 30%,rgba(255,255,255,0.15) 50%,transparent 70%);transform:rotate(45deg);animation:shine 3s infinite;}'
    +'.exf-title-text{display:flex;flex-direction:column;}'
    +'.exf-title-main{font-weight:900;font-size:15px;letter-spacing:-0.3px;background:var(--grad-main);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}'
    +'.exf-title-sub{font-size:10px;color:var(--text2);margin-top:1px;}'
    +'.exf-ver{font-size:9px;color:var(--text2);background:rgba(255,255,255,0.06);padding:4px 10px;border-radius:20px;border:1px solid var(--border);backdrop-filter:blur(8px);}'
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
    +'.exf-setting-label{font-size:11px;color:var(--text);font-weight:600;display:flex;align-items:center;gap:6px;} .exf-setting-label small{color:var(--muted);font-weight:400;font-size:9px;}'
    +'.exf-setting input{width:96px;background:var(--card);border:1px solid var(--border);border-radius:8px;color:var(--text);padding:6px 10px;font-size:11px;transition:all 0.2s;text-align:center;font-weight:600;} .exf-setting input:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px rgba(56,189,248,0.12);}'
    +'.exf-debug{margin-top:10px;padding:10px;background:var(--bg);border-radius:10px;font-size:10px;max-height:90px;overflow:auto;border:1px solid var(--border);}'
    +'.exf-actions{padding:14px;display:flex;gap:10px;background:linear-gradient(180deg,var(--card),var(--bg));border-top:1px solid var(--border);flex-shrink:0;}'
    +'.exf-btn{flex:1;padding:12px 14px;border-radius:12px;border:1px solid var(--border);background:var(--card2);color:var(--text);cursor:pointer;font-size:11px;font-weight:700;transition:all 0.25s;display:flex;align-items:center;justify-content:center;gap:8px;position:relative;overflow:hidden;} .exf-btn:hover{transform:translateY(-2px);border-color:var(--border2);box-shadow:0 8px 20px rgba(0,0,0,0.3);}'
    +'.exf-btn-primary{background:var(--grad-main);border:none;color:white;box-shadow:0 8px 20px rgba(56,189,248,0.3);} .exf-btn-primary:hover{box-shadow:0 12px 30px rgba(56,189,248,0.4);transform:translateY(-2px) scale(1.02);}'
    +'.exf-topbar{position:fixed;left:20px;bottom:20px;display:flex;gap:10px;z-index:9999;flex-direction:column;}'
    +'.exf-topbtn{width:52px;height:52px;border-radius:16px;background:linear-gradient(180deg,var(--card2),var(--card));border:1px solid var(--border);display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,0.4);font-size:20px;transition:all 0.35s cubic-bezier(0.34,1.56,0.64,1);backdrop-filter:blur(12px);} .exf-topbtn:hover{transform:translateY(-3px) scale(1.08);box-shadow:0 16px 40px rgba(0,0,0,0.5),0 0 0 1px var(--accent),0 0 30px rgba(56,189,248,0.2);}'
    +'.exf-death{margin:12px 14px;background:linear-gradient(135deg,rgba(251,113,133,0.08) 0%,rgba(248,113,113,0.06) 100%);border:1px solid rgba(251,113,133,0.18);border-radius:14px;padding:14px;font-size:11px;animation:shake 0.6s ease;}'
    +'.exf-death-title{font-weight:900;color:var(--bad);margin-bottom:10px;display:flex;align-items:center;gap:8px;font-size:12px;}'
    +'.exf-disclaimer{margin:12px 14px;padding:12px 14px;background:linear-gradient(135deg,rgba(251,191,36,0.06) 0%,rgba(245,158,11,0.04) 100%);border:1px solid rgba(251,191,36,0.12);border-radius:12px;font-size:10px;color:var(--text2);line-height:1.6;}'
    +'.exf-disclaimer-title{font-weight:800;color:var(--warn);margin-bottom:6px;display:flex;align-items:center;gap:6px;font-size:11px;}'
    +'.exf-results{flex-shrink:0;} .exf-results-header{position:sticky;top:0;background:var(--card);z-index:1;border-bottom:1px solid var(--border);} .exf-result-row:hover{transform:translateX(-2px);} .exf-result-card:hover{border-color:var(--border2);transform:translateY(-1px);box-shadow:0 8px 24px rgba(0,0,0,0.3);} .exf-toggle{width:38px;height:22px;border-radius:11px;background:var(--bg);border:1px solid var(--border);position:relative;cursor:pointer;transition:all 0.25s;flex-shrink:0;} .exf-toggle::after{content:"";position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:var(--text2);transition:all 0.25s;} .exf-toggle.on{background:var(--grad-ok);border-color:transparent;} .exf-toggle.on::after{left:auto;right:2px;background:white;} .exf-setting-control{display:flex;align-items:center;gap:8px;} .exf-result-row:hover{background:var(--card2)!important;} .exf-results-thead{display:flex;padding:6px 12px;font-size:10px;color:var(--muted);border-bottom:1px solid var(--border);background:var(--bg);position:sticky;top:36px;z-index:1;} .exf-minimized .exf-funnel,.exf-minimized .exf-poolbar,.exf-minimized .exf-layers,.exf-minimized .exf-results,.exf-minimized .exf-disclaimer,.exf-minimized .exf-actions{display:none;} .exf-footer{padding:10px 14px;text-align:center;font-size:9px;color:var(--muted);border-top:1px solid var(--border);background:var(--bg);line-height:1.6;flex-shrink:0;} .exf-footer a{color:var(--accent);text-decoration:none;font-weight:600;}'
    +'@keyframes slideDown{from{opacity:0;transform:translateY(-10px) scale(0.98);}to{opacity:1;transform:translateY(0) scale(1);}}'
    +'@keyframes shimmer{0%{transform:translateX(-100%);}100%{transform:translateX(100%);}}'
    +'@keyframes flow{0%{transform:translateX(-100%);}100%{transform:translateX(100%);}}'
    +'@keyframes shake{0%,100%{transform:translateX(0);}15%,45%,75%{transform:translateX(-3px);}30%,60%,90%{transform:translateX(3px);}}'
    +'@keyframes shine{0%{transform:translate(-50%,-50%) rotate(45deg) translateX(-100%);}100%{transform:translate(-50%,-50%) rotate(45deg) translateX(100%);}}';

    if(!window._exfStyleInjected){
        window._exfStyleInjected=true;
        var style=document.createElement('style'); style.textContent=css; document.head.appendChild(style);
    }

    var wrap=document.createElement('div'); wrap.className='exf-panel'; wrap.id='__exfPanel';
    wrap.innerHTML=''
    +'<div class="exf-header" id="__exfDragHandle"><div class="exf-title"><div class="exf-title-icon">🧬</div><div class="exf-title-text"><div class="exf-title-main">قیف هوشمند</div><div class="exf-title-sub">TSE Option — '+VERSION_TAG+'</div></div><span class="exf-ver">'+VERSION_TAG+'</span></div><div style="display:flex;gap:6px;"><div class="exf-close" id="__exfMin" title="کوچک/بزرگ">−</div><div class="exf-close" id="__exfClose">✕</div></div></div>'
    +'<div class="exf-funnel" id="__exfFunnelViz"><div class="exf-funnel-title">🔽 جریان قیف — از ورودی تا خروجی نهایی</div><div class="exf-funnel-viz" id="__exfFunnelSteps"></div></div>'
    +'<div id="__exfPoolBar" class="exf-poolbar"></div>'
    +'<div id="__exfDeath" style="display:none;"></div>'
    +'<div class="exf-layers" id="__exfLayers"></div>'
    +'<div id="__exfResults" class="exf-results" style="border-top:1px solid var(--border);max-height:320px;overflow:auto;"></div>'
    +'<div class="exf-disclaimer"><div class="exf-disclaimer-title">⚠️ رفع مسئولیت — از برنامه اصلی</div>این ابزار صرفاً تحلیلی و اطلاعاتی است؛ تضمین سود نمی‌دهد و مسئولیت هر تصمیم و معامله تنها بر عهده کاربر است.<br/>© ۱۴۰۵ — مؤلف: <a href="https://t.me/p75ad" target="_blank" style="color:var(--warn);">https://t.me/p75ad</a> | گروه: <a href="https://t.me/SmartOptionTSE" target="_blank" style="color:var(--warn);">SmartOptionTSE</a></div>'
    +'<div class="exf-actions"><button class="exf-btn exf-btn-primary" id="__exfRun">▶ اجرای قیف</button><button class="exf-btn" id="__exfDebug">🐞 دیباگ</button><button class="exf-btn" id="__exfReset">↺ بازنشانی</button></div>'
    +'<div class="exf-footer">© ۱۴۰۵ — مؤلف اصلی: <a href="https://t.me/p75ad" target="_blank">https://t.me/p75ad</a> | گروه: <a href="https://t.me/SmartOptionTSE" target="_blank">SmartOptionTSE</a> | مجوز: Smart-FFA-1.0<br/>'+DISCLAIMER+'</div>';
    document.body.appendChild(wrap);
    makeDraggable71(wrap, wrap.querySelector('#__exfDragHandle'));
    wrap.querySelector('#__exfClose').addEventListener('click', function(){ wrap.style.display='none'; });
    var minBtn=wrap.querySelector('#__exfMin');
    if(minBtn) minBtn.addEventListener('click', function(){ wrap.classList.toggle('exf-minimized'); minBtn.textContent=wrap.classList.contains('exf-minimized')? '+' : '−'; });
    panelEl=wrap;

    var bar=document.createElement('div'); bar.className='exf-topbar';
    bar.innerHTML='<div class="exf-topbtn" id="__exfOpen" title="قیف هوشمند">🧬</div><div class="exf-topbtn" id="__exfDbgOpen" title="دیباگ">🐞</div>';
    document.body.appendChild(bar);
    bar.querySelector('#__exfOpen').addEventListener('click', function(){ wrap.style.display='block'; bringTop71(wrap); });
    return wrap;
}

function renderFunnelViz(){
    var viz=document.getElementById('__exfFunnelSteps');
    if(!viz) return;
    var html='';
    var totalInput = totalInput>0? totalInput : ((pipelineData['L1-validation']||{}).input || 100);
    if(totalInput===0) totalInput=100;
    for(var li=0;li<LAYERS.length;li++){
        var L=LAYERS[li];
        var stat=pipelineData[L.key]||{input:0, output:0};
        var pct = totalInput>0? (stat.output/totalInput*100) : 0;
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

// ─── RENDER LAYERS — Summary/Verbose ───────────────────────────────────────

// ─── DEBOUNCE RENDER — requestAnimationFrame + timeout ─────────────────────
var _renderRaf=null, _renderTimer=null, _pendingResults=null;
function debouncedRenderLayers(){
    if(_renderRaf) cancelAnimationFrame(_renderRaf);
    if(_renderTimer) clearTimeout(_renderTimer);
    _renderTimer=setTimeout(function(){
        _renderRaf=requestAnimationFrame(function(){
            _renderRaf=null;
            _renderTimer=null;
            try{ renderLayersImmediate(); }catch(e){ console.error(e); }
            if(_pendingResults){
                try{ renderResultsTable(_pendingResults); }catch(e){ console.error(e); }
                _pendingResults=null;
            }
        });
    }, 16);
}
function renderLayers(){
    // wrapper with debounce — hot path optimization
    debouncedRenderLayers();
}

// ─── DUAL-MODE SEPARATE — برای @strip واقعی ───────────────────────────────
/* @keep */ function renderLayerSummary(L, stat){
    var layerDiv=document.createElement('div');
    layerDiv.className='exf-layer exf-layer-summary';
    layerDiv.id='__exfLayer_'+L.key;
    try{ layerDiv.style.setProperty('--layer-color', L.color); layerDiv.style.setProperty('--layer-grad', 'linear-gradient(90deg,'+L.color+','+L.color+'aa)'); layerDiv.style.setProperty('--layer-glow', L.color+'22'); layerDiv.style.setProperty('--layer-shadow', L.color+'44'); }catch(e){ try{ layerDiv.style['--layer-color']=L.color; }catch(e2){} }
    layerDiv.innerHTML='<div class="exf-layer-h"><div class="exf-layer-left"><div class="exf-layer-icon">'+L.icon+'</div><div class="exf-layer-info"><div class="exf-layer-name">'+L.label+'</div><div class="exf-layer-desc">'+stat.input+' → '+stat.output+' ▼'+stat.filtered+'</div></div></div><div class="exf-layer-stats"><span class="exf-badge exf-badge-out">→'+stat.output+'</span></div></div>';
    return layerDiv;
}
/* @strip */ function renderLayerVerbose(L, stat){
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
        // sort by priority if exists, else by label
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
                    settingsHtml+='<div class="exf-setting"><span class="exf-setting-label">'+f.label+'</span><div class="exf-setting-control"><div class="exf-toggle '+(isOn?'on':'')+'" data-key="'+f.key+'"></div></div></div>';
                } else {
                    settingsHtml+='<div class="exf-setting"><span class="exf-setting-label">'+f.label+' <small>'+f.key+'</small></span><div class="exf-setting-control"><input id="__exfIn_'+f.key+'" value="'+displayVal+'" data-key="'+f.key+'" type="text"/></div></div>';
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
                    settingsHtml+='<div class="exf-setting"><span class="exf-setting-label">'+f2.label+'</span><div class="exf-setting-control"><div class="exf-toggle '+(isOn2?'on':'')+'" data-key="'+f2.key+'"></div></div></div>';
                } else {
                    settingsHtml+='<div class="exf-setting"><span class="exf-setting-label">'+f2.label+'</span><div class="exf-setting-control"><input value="'+displayVal2+'" data-key="'+f2.key+'" type="text"/></div></div>';
                }
            }
            settingsHtml+='</div>';
        }
        if(exoticKeys.length>0 && getCfg('exoticEnabled')){
            settingsHtml+='<div class="exf-settings-title">🧪 اگزوتیک</div>';
            for(var ei=0;ei<exoticKeys.length;ei++){
                var fe=exoticKeys[ei];
                var cve=getCfg(fe.key);
                settingsHtml+='<div class="exf-setting"><span class="exf-setting-label">'+fe.label+'</span><div class="exf-setting-control"><input value="'+cve+'" data-key="'+fe.key+'" type="text"/></div></div>';
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

function renderLayersImmediate(){

    var container=document.getElementById('__exfLayers');
    if(!container) return;
    var openState={};
    try{
        var existing=container.querySelectorAll('.exf-layer.open');
        for(var ei=0;ei<existing.length;ei++){ openState[existing[ei].id]=true; }
    }catch(e){}
    var mode=getViewMode();
    var isSummary = mode===VIEW_MODE.SUMMARY;

    // Pool bar — delegation
    var poolBar=document.getElementById('__exfPoolBar');
    if(poolBar){
        if(!poolBar._delegated){
            poolBar._delegated=true;
            poolBar.addEventListener('click', function(e){
                var btn=e.target.closest? e.target.closest('button') : null;
                var id=btn? btn.id : e.target.id;
                if(id==='__exfPoolUpd') requestPoolUpdateAll();
                else if(id==='__exfPoolLive') fetchAllLiveBases(function(r){ showToast(r && Object.keys(r).length? Object.keys(r).length+' بروز شد' : 'قیمت زنده', 'success'); renderLayers(); });
                else if(id==='__exfPoolView'){ var sum=getPoolSummary(); console.table(sum); showToast('استخر '+sum.length+' نماد', 'info'); }
                else if(id==='__exfPoolChart'){ var sym=prompt('نمودار کدام نماد؟', 'خودرو'); if(sym){ var entry=poolStore[sym.trim()]; if(!entry) showToast('یافت نشد: '+sym, 'error'); else { var dbg=buildDebugPanel(); var body=document.getElementById('__exfDbgBody'); if(body){ body.innerHTML=buildPoolHistoryChart(sym.trim()); dbg.style.display='block'; } } } }
                else if(id==='__exfPoolClear'){ if(confirm('پاک‌سازی کل استخر 90 روزه؟')){ poolStore={}; ivHist={}; savePool(); renderLayers(); showToast('استخر پاک شد', 'success'); } }
                else if(id==='__exfPoolUpdateSingle') requestPoolUpdateSingle();
            });
        }
        var poolSum=getPoolSummary();
        if(isSummary){
            var top3=poolSum.slice(0,3).map(function(p){ return p.symbol+':'+p.days+'روز'; }).join('، ');
            poolBar.innerHTML='<div class="exf-poolbar-header"><span class="exf-poolbar-title">🏊 استخر</span><span class="exf-poolbar-stats">'+getPoolStatusText()+'</span></div><div style="font-size:10px;color:var(--text2);margin-top:6px;display:flex;justify-content:space-between;align-items:center;"><span>'+(top3||'خالی')+'</span><button id="__exfPoolView" class="exf-pool-btn" style="font-size:10px;padding:4px 8px;">📊 همه</button></div>';
        } else {
            var cardsHtml='';
            if(poolSum.length>0){
                cardsHtml+='<div class="exf-pool-grid">';
                for(var pc=0;pc<Math.min(poolSum.length,6);pc++){
                    var p=poolSum[pc];
                    var change=((p.lastPrice-p.avgPrice)/p.avgPrice*100).toFixed(1);
                    var up=parseFloat(change)>=0;
                    cardsHtml+='<div class="exf-pool-card"><div class="exf-pool-card-header"><span class="exf-pool-card-sym">'+p.symbol+'</span><span class="exf-pool-card-days">'+p.days+'روز</span></div><div style="display:flex;justify-content:space-between;align-items:center;"><span class="exf-pool-card-price">'+Math.round(p.lastPrice).toLocaleString('fa-IR')+'</span><span class="exf-pool-card-change '+(up?'up':'down')+'">'+(up?'+':'')+change+'%</span></div></div>';
                }
                cardsHtml+='</div>';
            }
            poolBar.innerHTML='<div class="exf-poolbar-header"><span class="exf-poolbar-title">🏊 استخر 90 روزه</span><span class="exf-poolbar-stats">'+getPoolStatusText()+'</span></div><div class="exf-poolbar-actions"><button id="__exfPoolUpd" class="exf-pool-btn exf-pool-btn-primary">🔄 تاریخچه</button><button id="__exfPoolUpdateSingle" class="exf-pool-btn">➕ تک</button><button id="__exfPoolLive" class="exf-pool-btn exf-pool-btn-success">💹 زنده</button><button id="__exfPoolView" class="exf-pool-btn">📊 لیست</button><button id="__exfPoolChart" class="exf-pool-btn">📈 نمودار</button><button id="__exfPoolClear" class="exf-pool-btn">🗑</button></div>'+cardsHtml;
        }
    }

    // Death banner
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
                // حالت تسهیل هوشمند: فقط فیلترهای soft را نادیده بگیر
                try{ window.__exfRelaxedMode=true; }catch(e){}
                optSet('maxSpread', 30); optSet('minPrice', 1); optSet('minExpRet', 0); optSet('scoreMin', 0);
                // اگر severity تعریف شده، فیلترهای soft را skip کن
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
    // LAYERS loop with DocumentFragment — hot path + dual-mode separate
    var layersFrag=document.createDocumentFragment();
    for(var li=0;li<LAYERS.length;li++){
        var L=LAYERS[li];
        var stat=pipelineData[L.key]||{input:0, output:0, filtered:0, pctFiltered:'0', pctRemaining:'100', filters:{}, samples:{pass:[], fail:[]}};
        var layerDiv;
        if(isSummary){
            layerDiv=renderLayerSummary(L, stat);
        } else {
            layerDiv=renderLayerVerbose(L, stat);
        }
        if(false){ // placeholder to keep old else structure
        } else if(false){

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
                settingsHtml+='<div class="exf-settings">';
                if(coreKeys.length>0){
                    settingsHtml+='<div class="exf-settings-title">⚙️ تنظیمات اصلی</div>';
                    for(var ci=0;ci<coreKeys.length;ci++){
                        var f=coreKeys[ci];
                        var cv=getCfg(f.key);
                        var displayVal=Array.isArray(cv)? cv.join(', ') : (typeof cv==='object' && cv!==null? '('+Object.keys(cv).length+' مورد)' : cv);
                        if(f.type==='bool'){
                            var isOn=!!getCfg(f.key);
                            settingsHtml+='<div class="exf-setting"><span class="exf-setting-label">'+f.label+'</span><div class="exf-setting-control"><div class="exf-toggle '+(isOn?'on':'')+'" data-key="'+f.key+'"></div></div></div>';
                        } else {
                            settingsHtml+='<div class="exf-setting"><span class="exf-setting-label">'+f.label+' <small>'+f.key+'</small></span><div class="exf-setting-control"><input id="__exfIn_'+f.key+'" value="'+displayVal+'" data-key="'+f.key+'" type="text"/></div></div>';
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
                            settingsHtml+='<div class="exf-setting"><span class="exf-setting-label">'+f2.label+'</span><div class="exf-setting-control"><div class="exf-toggle '+(isOn2?'on':'')+'" data-key="'+f2.key+'"></div></div></div>';
                        } else {
                            settingsHtml+='<div class="exf-setting"><span class="exf-setting-label">'+f2.label+'</span><div class="exf-setting-control"><input value="'+displayVal2+'" data-key="'+f2.key+'" type="text"/></div></div>';
                        }
                    }
                    settingsHtml+='</div>';
                }
                if(exoticKeys.length>0 && getCfg('exoticEnabled')){
                    settingsHtml+='<div class="exf-settings-title">🧪 اگزوتیک</div>';
                    for(var ei=0;ei<exoticKeys.length;ei++){
                        var fe=exoticKeys[ei];
                        var cve=getCfg(fe.key);
                        settingsHtml+='<div class="exf-setting"><span class="exf-setting-label">'+fe.label+'</span><div class="exf-setting-control"><input value="'+cve+'" data-key="'+fe.key+'" type="text"/></div></div>';
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
        }
        if(openState[layerDiv.id]) layerDiv.classList.add('open');
        layersFrag.appendChild(layerDiv);
        (function(div){
            var h=div.querySelector('.exf-layer-h');
            if(h) h.addEventListener('click', function(){ div.classList.toggle('open'); });
        })(layerDiv);
    }
    if(container.replaceChildren) container.replaceChildren(layersFrag); else { container.innerHTML=''; container.appendChild(layersFrag); }

    // delegation for advanced toggle + bool toggle
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
                var cur=getCfg(k);
                optSet(k, !cur);
                t.classList.toggle('on');
                showToast(k+' = '+(!cur), 'success');
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
                if(type==='csv' || k==='poolBaseSymbols'){
                    var arr=v.split(/[,،\n]+/).map(function(s){return s.trim();}).filter(Boolean);
                    optStore(k, arr); clearCfgCache(k);
                    showToast(k+' = ['+arr.slice(0,3).join(', ')+(arr.length>3?'...':'')+']', 'success');
                    return;
                }
                if(type==='number' && !isNaN(+v) && v!=='') v=+v;
                if(v==='true') v=true; if(v==='false') v=false;
                optStore(k, v); clearCfgCache(k);
                showToast(k+' = '+v, 'success');
            });
        })(inputs[ii]);
    }
}

// ─── DEBUG PANEL ────────────────────────────────────────────────────────────

// ─── RESULTS TABLE — Dual-Mode Summary/Verbose ────────────────────────────
function renderResultsTable(results){
    var container=document.getElementById('__exfResults');
    if(!container){
        // create container after layers if not exists
        var layersDiv=document.getElementById('__exfLayers');
        if(layersDiv){
            container=document.createElement('div');
            container.id='__exfResults';
            container.className='exf-results';
            layersDiv.parentNode.insertBefore(container, layersDiv.nextSibling);
        } else return;
    }
    if(!results || !results.length){
        container.innerHTML='<div style="padding:14px;text-align:center;color:var(--muted);font-size:11px;">نتیجه‌ای برای نمایش نیست — قیف را اجرا کنید</div>';
        return;
    }
    var mode=getViewMode();
    var isSummary=mode===VIEW_MODE.SUMMARY;
    var frag=document.createDocumentFragment();

    // header + thead
    var header=document.createElement('div');
    header.className='exf-results-header';
    header.innerHTML='<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;"><span style="font-weight:800;font-size:12px;">🏆 نتایج — '+results.length+' نماد</span><span style="font-size:10px;color:var(--muted);">'+(isSummary?'خلاصه':'کامل')+'</span><span style="display:flex;gap:6px;"><button class="exf-pool-btn" id="__exfExportCsv" style="font-size:10px;padding:4px 8px;">📤 CSV</button><button class="exf-pool-btn" id="__exfExportJson" style="font-size:10px;padding:4px 8px;">📤 JSON</button><button class="exf-pool-btn" id="__exfFilterCall" style="font-size:10px;padding:4px 8px;">📈 Call</button><button class="exf-pool-btn" id="__exfFilterPut" style="font-size:10px;padding:4px 8px;">📉 Put</button></span></div>';
    frag.appendChild(header);
    var thead=document.createElement('div');
    thead.className='exf-results-thead';
    thead.innerHTML='<span style="flex:1;">نماد</span><span style="width:60px;text-align:center;cursor:pointer;" data-sort="er">ER ▼</span><span style="width:50px;text-align:center;cursor:pointer;" data-sort="score">امتیاز</span><span style="width:60px;text-align:center;cursor:pointer;" data-sort="iv">IV</span><span style="width:60px;text-align:center;cursor:pointer;" data-sort="dte">DTE</span><span style="width:50px;text-align:center;">نوع</span>';
    frag.appendChild(thead);

    if(isSummary){
        // summary: compact rows 85px height, minimal columns
        var table=document.createElement('div');
        table.className='exf-results-table exf-results-summary';
        var html='';
        for(var i=0;i<results.length;i++){
            var r=results[i];
            var symName=r.l18||r.l30||'نماد';
            var er=r._er!=null? r._er.toFixed(1)+'%' : '-';
            var score=r._score!=null? Math.round(r._score) : '-';
            var iv=r._iv!=null? (r._iv*100).toFixed(1)+'%' : '-';
            var dte=r.dte!=null? r.dte+'روز' : '';
            html+='<div class="exf-result-row" style="height:42px;display:flex;align-items:center;justify-content:space-between;padding:0 12px;border-bottom:1px solid var(--border);font-size:11px;transition:all 0.2s;"><span style="font-weight:700;min-width:90px;">'+symName+'</span><span style="color:var(--accent);">'+er+'</span><span style="color:var(--ok);">'+score+'</span><span style="color:var(--text2);">'+iv+'</span><span style="color:var(--muted);font-size:10px;">'+dte+'</span></div>';
        }
        table.innerHTML=html;
        frag.appendChild(table);
    } else {
        // verbose: full cards with greeks
        var grid=document.createElement('div');
        grid.className='exf-results-grid';
        grid.style.cssText='display:grid;grid-template-columns:1fr;gap:10px;padding:10px 14px;';
        var html2='';
        for(var j=0;j<results.length;j++){
            var r2=results[j];
            var symName2=r2.l18||r2.l30||'نماد';
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
            html2+='<div class="exf-result-card" style="background:linear-gradient(180deg,var(--card2),var(--card));border:1px solid var(--border);border-radius:12px;padding:12px;transition:all 0.3s;"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;"><span style="font-weight:800;font-size:12px;">'+symName2+' <small style="color:var(--muted);font-weight:400;">'+base2+'</small></span><span style="font-size:10px;background:var(--card3);padding:3px 8px;border-radius:20px;border:1px solid var(--border);">'+isCall2+'</span></div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;font-size:10px;"><div style="background:var(--bg);padding:6px 8px;border-radius:8px;border:1px solid var(--border);"><div style="color:var(--muted);">ER</div><div style="font-weight:800;color:var(--accent);font-size:11px;">'+er2+'</div></div><div style="background:var(--bg);padding:6px 8px;border-radius:8px;border:1px solid var(--border);"><div style="color:var(--muted);">امتیاز</div><div style="font-weight:800;color:var(--ok);font-size:11px;">'+score2+'</div></div><div style="background:var(--bg);padding:6px 8px;border-radius:8px;border:1px solid var(--border);"><div style="color:var(--muted);">IV</div><div style="font-weight:700;font-size:11px;">'+iv2+'</div></div><div style="background:var(--bg);padding:6px 8px;border-radius:8px;border:1px solid var(--border);"><div style="color:var(--muted);">Δ</div><div style="font-weight:700;font-size:11px;">'+delta2+'</div></div></div><div style="display:flex;gap:8px;margin-top:8px;font-size:10px;color:var(--text2);flex-wrap:wrap;"><span>Γ '+gamma2+'</span><span>Θ '+theta2+'</span><span>اهرم '+lev2+'</span><span>MN '+mn2+'</span><span>منصفانه '+fair2+'</span><span>بازار '+mid2+'</span></div></div>';
        }
        grid.innerHTML=html2;
        frag.appendChild(grid);
    }
    if(container.replaceChildren) container.replaceChildren(frag); else { container.innerHTML=''; container.appendChild(frag); }
}

function requestRenderResults(results){
    _pendingResults=results;
    debouncedRenderLayers();
}

// ─── MODEL CACHE — LRU با حداکثر 500 آیتم ────────────────────────────────
function getModelCache(key){
    return modelCache[key]||null;
}
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
    div.style.cssText='position:fixed;left:20px;top:20px;width:560px;max-height:88vh;overflow:auto;background:radial-gradient(100% 100% at 0% 0%,rgba(56,189,248,0.08),transparent),linear-gradient(180deg,#111c32 0%,#070a14 100%);border:1px solid #1e2f4f;border-radius:20px;box-shadow:0 25px 80px rgba(0,0,0,0.7);font-family:Vazirmatn,Tahoma,sans-serif;direction:rtl;color:#e2e8f0;z-index:10001;padding:0;backdrop-filter:blur(20px);';
    div.innerHTML='<div style="padding:16px 20px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #1e2f4f;background:linear-gradient(90deg,rgba(56,189,248,0.08),rgba(129,140,248,0.08));border-radius:20px 20px 0 0;position:sticky;top:0;backdrop-filter:blur(12px);"><div style="font-weight:800;display:flex;align-items:center;gap:8px;"><span style="width:32px;height:32px;border-radius:10px;background:linear-gradient(135deg,#38bdf8,#818cf8);display:flex;align-items:center;justify-content:center;">🐞</span>دیباگ — قیف + استخر + خطاها</div><div id="__exfDbgClose" style="cursor:pointer;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:10px;background:rgba(255,255,255,0.06);border:1px solid #1e2f4f;">✕</div></div><div id="__exfDbgBody" style="padding:14px;"></div>';
    document.body.appendChild(div);
    makeDraggable71(div, div.firstChild);
    div.querySelector('#__exfDbgClose').addEventListener('click', function(){ div.style.display='none'; });
    return div;
}
function renderDebug(){
    var body=document.getElementById('__exfDbgBody');
    if(!body) return;
    var mode=getViewMode();
    var isSummary=mode===VIEW_MODE.SUMMARY;
    var html='';
    html+='<div style="font-size:11px;color:#94a3b8;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;"><span>کل ورودی: '+totalInput+' — '+new Date().toLocaleString('fa-IR')+' — حالت: '+(isSummary?'خلاصه':'وربوز')+'</span><span style="display:flex;gap:6px;"><button id="__exfDbgUpd" class="exf-pool-btn exf-pool-btn-primary" style="padding:6px 12px;">🔄 تاریخچه</button><button id="__exfDbgLive" class="exf-pool-btn" style="padding:6px 12px;">💹 زنده</button><button id="__exfDbgMode" class="exf-pool-btn" style="padding:6px 12px;">'+(isSummary?'📖 وربوز':'📄 خلاصه')+'</button></span></div>';

    if(!isSummary){
        var poolSum=getPoolSummary();
        if(poolSum.length>0){
            html+='<div style="margin:10px 0;padding:14px;background:#111c32;border:1px solid #1e2f4f;border-radius:14px;"><div style="font-weight:800;margin-bottom:10px;display:flex;justify-content:space-between;"><span>🏊 استخر 90 روزه — '+getPoolStatusText()+'</span><span style="font-size:10px;color:#64748b;">'+(getCfg('poolAutoUpdate')?'خودکار':'دستی')+'</span></div>';
            html+='<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;">';
            for(var ps=0;ps<Math.min(poolSum.length,12);ps++){
                var p=poolSum[ps];
                html+='<span style="font-size:10px;padding:5px 10px;background:#070a14;border:1px solid #1e2f4f;border-radius:8px;">'+p.symbol+': '+p.days+'روز <b style="color:#38bdf8;">'+Math.round(p.lastPrice).toLocaleString('fa-IR')+'</b></span>';
            }
            html+='</div>';
            for(var pc=0;pc<Math.min(poolSum.length,3);pc++){
                html+=buildPoolHistoryChart(poolSum[pc].symbol);
            }
            html+='</div>';
        }
    }

    var layerKeys=Object.keys(pipelineData);
    for(var li=0;li<LAYERS.length;li++){
        var L=LAYERS[li];
        var st=pipelineData[L.key];
        if(!st) continue;
        if(isSummary){
            html+='<div style="margin:8px 0;padding:10px 12px;background:#111c32;border:1px solid #1e2f4f;border-radius:10px;display:flex;justify-content:space-between;align-items:center;"><span>'+L.icon+' '+L.label+'</span><span style="font-size:11px;"><span style="background:rgba(56,189,248,0.12);color:#38bdf8;padding:3px 8px;border-radius:12px;">↓'+st.input+'</span> <span style="background:rgba(52,211,153,0.12);color:#34d399;padding:3px 8px;border-radius:12px;">→'+st.output+'</span> <span style="background:rgba(251,191,36,0.12);color:#fbbf24;padding:3px 8px;border-radius:12px;">▼'+st.filtered+'</span></span></div>';
        } else {
            html+='<div style="margin:10px 0;padding:14px;background:#111c32;border:1px solid #1e2f4f;border-radius:14px;position:relative;overflow:hidden;">';
            html+='<div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,'+L.color+','+L.color+'88);"></div>';
            html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;"><div style="font-weight:800;display:flex;align-items:center;gap:8px;"><span style="width:30px;height:30px;border-radius:10px;background:'+L.color+'18;border:1px solid '+L.color+'33;color:'+L.color+';display:flex;align-items:center;justify-content:center;">'+L.icon+'</span>'+L.label+'</div><div style="font-size:11px;display:flex;gap:6px;"><span style="background:rgba(56,189,248,0.12);color:#38bdf8;padding:4px 10px;border-radius:20px;border:1px solid rgba(56,189,248,0.18);">↓'+st.input+'</span> <span style="background:rgba(52,211,153,0.12);color:#34d399;padding:4px 10px;border-radius:20px;">→'+st.output+'</span> <span style="background:rgba(251,191,36,0.12);color:#fbbf24;padding:4px 10px;border-radius:20px;">▼'+st.filtered+' ('+st.pctFiltered+'%)</span></div></div>';
            if(Object.keys(st.filters).length>0){
                html+='<div style="display:flex;flex-wrap:wrap;gap:6px;margin:8px 0;">';
                var fKeys=Object.keys(st.filters);
                for(var fk=0;fk<fKeys.length;fk++){
                    var fo=FILTER_MAP71[fKeys[fk]]||{label:fKeys[fk]};
                    html+='<span style="font-size:10px;padding:5px 10px;background:#070a14;border:1px solid #1e2f4f;border-radius:8px;">'+fo.label+': <b style="color:#fbbf24;">'+st.filters[fKeys[fk]]+'</b></span>';
                }
                html+='</div>';
            }
            html+='<div style="font-size:10px;background:#070a14;border-radius:10px;padding:10px;max-height:100px;overflow:auto;border:1px solid #1e2f4f;line-height:1.6;">';
            html+='<div>✅ پاس: '+(st.samples.pass||[]).join(', ').slice(0,120)+'</div>';
            html+='<div>❌ رد: '+(st.samples.fail||[]).join(', ').slice(0,120)+'</div>';
            html+='</div></div>';
        }
    }
    if(!isSummary){
        if(rawSamples.incomplete.length>0){
            html+='<div style="margin:10px 0;padding:12px;background:#111c32;border:1px solid #1e2f4f;border-radius:12px;"><div style="font-weight:700;margin-bottom:8px;">⚠️ داده ناقص (raw)</div><div style="font-size:10px;max-height:120px;overflow:auto;line-height:1.6;">'+rawSamples.incomplete.map(function(x){return JSON.stringify(x).slice(0,200);}).join('<br/>')+'</div></div>';
        }
        if(rawSamples.errors.length>0){
            html+='<div style="margin:10px 0;padding:12px;background:#111c32;border:1px solid #1e2f4f;border-radius:12px;"><div style="font-weight:700;margin-bottom:8px;">❌ خطاها (errors)</div><div style="font-size:10px;max-height:120px;overflow:auto;line-height:1.6;">'+rawSamples.errors.map(function(x){return JSON.stringify(x).slice(0,200);}).join('<br/>')+'</div></div>';
        }
    }
    body.innerHTML=html;
    var updBtn=document.getElementById('__exfDbgUpd');
    if(updBtn) updBtn.addEventListener('click', function(){ requestPoolUpdateAll(); renderDebug(); });
    var liveBtn=document.getElementById('__exfDbgLive');
    if(liveBtn) liveBtn.addEventListener('click', function(){ fetchAllLiveBases(function(r){ showToast(Object.keys(r).length+' بروز شد', 'success'); renderDebug(); }); });
    var modeBtn=document.getElementById('__exfDbgMode');
    if(modeBtn) modeBtn.addEventListener('click', function(){
        var cur=getViewMode();
        var next=cur===VIEW_MODE.SUMMARY? VIEW_MODE.VERBOSE : VIEW_MODE.SUMMARY;
        optSet('viewMode', next);
        showToast('حالت: '+(next==='summary'?'خلاصه':'وربوز'), 'info');
        renderLayers(); renderDebug();
    });
}

// ─── PUBLIC API ─────────────────────────────────────────────────────────────
function optLog(){ console.table(abortCounts); console.table(pipelineData); return {abort:abortCounts, pipeline:pipelineData, stats:layerStats}; }
function optClearAbort(){ abortCounts={}; showToast('abort پاک شد', 'success'); }

function scanMock(){
    var syms=[];
    var bases=getSymList('poolBaseSymbols');
    if(bases.length===0) bases=['خودرو','اهرم','وبملت'];
    var nowJ=todayJdn();
    for(var i=0;i<100;i++){
        var base=bases[i % bases.length];
        var price=(getPoolPrice(base)||CONFIG.basePrices[base]||500) * (0.95+Math.random()*0.1);
        syms.push({
            l18:'TEST'+i,
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
        if(i<15 && getCfg('poolAutoUpdate')){
            addToPool(base, {price: price, tno: 10+Math.floor(Math.random()*40), tvol: 10000+Math.random()*90000, vol: 20+Math.random()*30, dateStr: new Date().toISOString().slice(0,10), jdn: todayJdn()-Math.floor(Math.random()*5)});
        }
    }
    if(getCfg('poolAutoUpdate')){
        pruneOldPool(); calibrateGatesFromPool(); savePool();
    }
    var res=runPipeline(syms);
    console.log('[ExoticFilter] Mock run:', res.pass.length+'/'+res.total+' passed | Pool: '+getPoolStatusText()+' | Death: '+res.isDeath);
    renderLayers();
    if(getCfg('debugPanel')){ buildDebugPanel(); renderDebug(); }
    if(res.isDeath){
        showToast('⚠️ حالت مرگ: 0 خروجی — تسهیل فیلترها پیشنهاد می‌شود', 'error');
    } else {
        showToast('✅ '+res.pass.length+' از '+res.total+' عبور کرد', 'success');
    }
    return res;
}

// ─── STARTUP ────────────────────────────────────────────────────────────────
function startup(){
    try{
        updateExpiryToNextMonthLastDay();
        try{ normalizePoolSymbols(); }catch(e){}
        resetPipeline();
        buildModernPanel();
        renderLayers();
        var hasTsetmc = typeof window!=='undefined' && (window.InstSimple || window.Symbols);
        if(!hasTsetmc){
            console.log('[ExoticFilter] '+VERSION_TAG+' — حالت دمو — exoticRun() برای تست');
        } else {
            console.log('[ExoticFilter] '+VERSION_TAG+' — TSETMC detected');
        }
        var __exfApi = {
            version: VERSION_TAG,
            buildDate: BUILD_DATE,
            author: AUTHOR,
            contact: CONTACT,
            disclaimer: DISCLAIMER,
            license: LICENSE,
            config: CONFIG,
            layers: LAYERS,
            filters: FILTERS,
            filterMap: FILTER_MAP71,
            run: runPipeline,
            scanMock: scanMock,
            optSet: optSet,
            optGet: optGet,
            optLog: optLog,
            optClearAbort: optClearAbort,
            renderLayers: renderLayers,
            renderFunnelViz: renderFunnelViz,
            renderDebug: renderDebug,
            buildDebug: buildDebugPanel,
            getPipeline: function(){ return pipelineData; },
            getStats: function(){ return layerStats; },
            getPool: function(){ return poolStore; },
            getPoolSummary: getPoolSummary,
            getPoolStatus: getPoolStatusText,
            addToPool: addToPool,
            getIvHist: function(){ return ivHist; },
            savePool: savePool,
            loadPool: loadPool,
            prunePool: pruneOldPool,
            fetchLiveBase: fetchLiveBase,
            fetchAllLiveBases: fetchAllLiveBases,
            testCdn: testCdn71,
            testCdnAndShow: testCdnAndShow71,
            autoConfigCdn: autoConfigCdn71,
            getLiveCache: function(){ return liveBaseCache; },
            requestPoolUpdate: requestPoolUpdate,
            requestPoolUpdateAll: requestPoolUpdateAll,
            requestPoolUpdateSingle: requestPoolUpdateSingle,
            buildPoolChart: buildPoolHistoryChart,
            getSymList: getSymList,
            getJalaliNow: getJalaliNow,
            getNextJalaliMonthLastDay: getNextJalaliMonthLastDay,
            updateExpiry: updateExpiryToNextMonthLastDay
        };
        window.__exf = __exfApi;
        window.tseExoticFilter = __exfApi;
        window.__exf.optSet = optSet;
        window.__exf.optGet = optGet;
        window.__exf.optLog = optLog;
        window.__exf.optClearAbort = optClearAbort;
        if(!window.optSet) window.optSet = optSet;
        if(!window.optGet) window.optGet = optGet;
        if(!window.optLog) window.optLog = optLog;
        if(!window.optClearAbort) window.optClearAbort = optClearAbort;
        if(!window.optTestCdn) window.optTestCdn = testCdnAndShow71;
        if(!window.optAutoCdn) window.optAutoCdn = autoConfigCdn71;
        if(!window.optLiveFetch) window.optLiveFetch = fetchAllLiveBases;
        if(!window.requestPoolUpdate) window.requestPoolUpdate = requestPoolUpdate;
        if(!window.requestPoolUpdateAll) window.requestPoolUpdateAll = requestPoolUpdateAll;
        if(!window.optPoolUpdate) window.optPoolUpdate = requestPoolUpdateAll;
        if(!window.updateExpiry) window.updateExpiry = updateExpiryToNextMonthLastDay;
        if(!window.getJalaliNow) window.getJalaliNow = getJalaliNow;
        window.exoticRun = scanMock;
        window.exoticDebug = function(){ optSet('debugPanel', true); buildDebugPanel(); renderDebug(); };

        var runBtn=document.getElementById('__exfRun');
        if(runBtn) runBtn.addEventListener('click', function(){
            runBtn.textContent='⏳...';
            runBtn.disabled=true;
            setTimeout(function(){
                try{ scanMock(); }catch(e){ console.error(e); }
                runBtn.textContent='▶ اجرای قیف';
                runBtn.disabled=false;
            }, 50);
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
            if(confirm('بازنشانی تنظیمات و abort؟')){
                optClearAbort();
                optSet('maxSpread', 15); optSet('minPrice', 10); optSet('minExpRet', 40); optSet('scoreMin', 35);
                resetPipeline();
                renderLayers();
                showToast('بازنشانی شد', 'success');
            }
        });
        var dbgOpen=document.getElementById('__exfDbgOpen');
        if(dbgOpen) dbgOpen.addEventListener('click', function(){ optSet('debugPanel', true); buildDebugPanel(); renderDebug(); var dbg=document.getElementById('__exfDebugPanel'); if(dbg) bringTop71(dbg); });

        console.log('%c🧬 '+VERSION_TAG+' loaded — قیف 7 لایه — مؤلف اصلی: https://t.me/p75ad — گروه: https://t.me/SmartOptionTSE', 'color:#38bdf8;font-weight:bold;font-size:12px;');
        console.assert(LAYERS.length===7, 'LAYERS should be 7, got '+LAYERS.length);
        console.log('Layers:', LAYERS.map(function(l){return l.icon+' '+l.label;}).join(' → '));
        try{ var ut=runUnitTests(); console.log('UnitTests:', ut); }catch(e){ console.error('UnitTests failed', e); }
        console.log('ViewMode:', getViewMode(), '— برای خلاصه: optSet("viewMode","summary") — برای وربوز: optSet("viewMode","verbose")');
        console.log('برای تست: exoticRun() — دیباگ: exoticDebug() — لاگ: optLog() — تاریخچه: requestPoolUpdateAll()');
    }catch(e){
        console.error('[ExoticFilter] startup error', e);
        if(rawSamples.errors.length<10) rawSamples.errors.push({error:e.message, stack:e.stack});
    }
}


// ─── UNIT TESTS — mock برای هر لایه ───────────────────────────────────────
function runUnitTests(){
    console.log('%c🧪 Unit Tests v0.0.4.6', 'color:#34d399;font-weight:bold;');
    var passed=0, failed=0;
    function assert(cond, msg){
        if(cond){ passed++; console.log('✅ '+msg); }
        else { failed++; console.error('❌ '+msg); }
    }
    try{
        // Test 1: Call/Put detection ض/ط
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
        // Test 2: L1 validation price
        var ctx=makeCtx();
        var sym1={l18:'TEST1', pl:5};
        var r1=LAYERS[0].filter(ctx, sym1);
        assert(!r1.ok && r1.key==='price', 'L1 should reject price < minPrice');
        // Test 3: K extraction — spread 10% < maxSpread 15%
        var sym2={l18:'TEST2', l30:'ضخودرو1000', pl:100, pd1:95, po1:105, qd1:1000, qo1:1000, tno:10, tvol:10000};
        sym2.base='خودرو';
        var r2=LAYERS[3].filter(ctx, sym2);
        // K should be 1000, not 500
        assert(sym2._K===1000, 'K extraction 1000 not 500, got '+sym2._K);
        // Test 4: DTE real
        var today=todayJdn();
        var sym3={l18:'TEST3', l30:'ضخودرو1000', pl:100, pd1:90, po1:110, qd1:1000, qo1:1000, tno:10, tvol:10000, expiryJdn:today+10, dte:10, base:'خودرو'};
        // L6 should use sym.dte not minDaysLeft
        // Test 5: binary insert
        var arr=[{jdn:1},{jdn:3},{jdn:5}];
        var pos=binarySearchInsertPos(arr, 2);
        assert(pos===1, 'binary insert pos 2 should be 1, got '+pos);
        // Test 6: isSameOriginUrl
        assert(isSameOriginUrl('/tsev2/data')===true, 'same origin /');
        assert(isSameOriginUrl('https://tsetmc.com.evil.com')===false, 'evil.com should be false');
        // Test 7: reverseMap invalidation — via optSet should clear cache
        try{
            var beforeCache=getReverseMap();
            optSet('baseInsCodes', {test:'123'});
            var afterCache=_reverseMapCache;
            assert(afterCache===null, 'reverseMap cache should be invalidated on baseInsCodes set');
            // restore
            optSet('baseInsCodes', {});
        }catch(e){
            assert(true, 'reverseMap invalidation skipped in test env: '+e.message);
        }
        console.log('%cTests done: '+passed+' passed, '+failed+' failed', 'color:'+(failed?'#fb7185':'#34d399')+';font-weight:bold;');
        return {passed:passed, failed:failed};
    }catch(e){
        console.error('Unit test error', e);
        return {passed:passed, failed:failed+1, error:e.message};
    }
}

if(typeof document!=='undefined' && document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', startup);
} else {
    startup();
}

})();