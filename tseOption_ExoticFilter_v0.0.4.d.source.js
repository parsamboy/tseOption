// tseOption_ExoticFilter_v0.0.4.7.min — قیف هوشمند چندلایه — SUMMARY only
// © ۱۴۰۵ — مؤلف: https://t.me/p75ad — گروه: https://t.me/SmartOptionTSE
// مجوز: Smart-FFA-1.0 (Free Fork with Attribution)
// راه‌اندازی: exoticRun() / exoticDebug() / optLog() / requestPoolUpdateAll()
// رفع مسئولیت: این ابزار صرفاً تحلیلی و اطلاعاتی است؛ تضمین سود نمی‌دهد.

;(function(){
'use strict';

var VERSION_TAG = 'tseOption_ExoticFilter_v0.0.4.7.min';
var BUILD_DATE = '2026-09-29';
var AUTHOR = 'https://t.me/p75ad';
var CONTACT = {author:'https://t.me/p75ad', group:'https://t.me/SmartOptionTSE'};
var DISCLAIMER = 'این ابزار صرفاً تحلیلی و اطلاعاتی است؛ تضمین سود نمی‌دهد و مسئولیت هر تصمیم و معامله تنها بر عهده کاربر است.';
var LICENSE = 'Smart-FFA-1.0 (Free Fork with Attribution)';

// ─── CONFIG ───────────────────────────────────────────────────────────────
var CONFIG = {
    expiryAutoUpdate: true, expiryDate: '1405/07/30', expiry: '1405\\s*[\\/\\.\\-]\\s*0?7',
    expiryJY: 1405, expiryJM: 7, expiryJD: 30,
    view: 0.4, holdDays: 5, volFloor: 25, volCeil: 150, unitGuardX: 8, minPrice: 10, maxSpread: 15, maxCostRT: 12,
    maxThetaPct: 100, maxStalePricePct: 50, maxImbalanceRatio: 20, minDelta: 0, maxDelta: 1,
    moneynessMin: 0, moneynessMax: 0, minDaysLeft: 4, maxLeverage: 30, minLeverage: 0,
    maxTimeValuePct: 100, maxIvPremium: 10, minDteWeight: true, dtePenaltyMax: 15, dtePenaltyDaysMult: 2,
    maxPerGroup: 2, maxTotalRows: 0, minExpRet: 40, coldThreshold: 3, minDepthTrades: 0.5, usePareto: true,
    computeIntervalMs: 15000, enforceMarketHours: false,
    sessionStartHour: 8, sessionStartMin: 525, sessionEndMin: 810, sessionEndHour: 13,
    sessionDays: [0,1,2,3,4,6], marketHolidays: [], tzOffsetMin: 210,
    basePrices: {'اهرم':70000,'وبملت':1300,'خودرو':480,'شستا':900,'خساپا':350,'شپنا':15000,'فملی':8500,'فولاد':7500,'شبندر':12000,'خبهمن':500,'وتجارت':700,'وبصادر':700},
    poolDays: 90, poolMaxDays: 90, poolAutoUpdate: false, poolAuto: true, poolMinObs: 3, poolClamp: 3,
    poolBaseSymbols: ['اهرم','وبملت','خودرو','شستا','خساپا','شپنا','فملی','فولاد','شبندر','خبهمن','وتجارت','وبصادر','ذوب','اخابر','تاصیکو'],
    contractSizes: {'خساپا':1000,'خودرو':1000,'وبملت':1000,'ذوب':1000,'اخابر':1000,'شپنا':1000,'شستا':1000,'وبصادر':1000,'تاصیکو':1000,'وتجارت':1000,'خبهمن':1000,'فملی':1371},
    poolGates: true, poolGateClamp: 2, poolMinGateObs: 20,
    tsetmcCdnUrl: 'https://old.tsetmc.com', blockOnDividendDay: true, useLiveBase: true,
    baseInsCodes: {'فملی':'46348095188555032','فولاد':'18443602267221359','شستا':'13157749938547794','خودرو':'35366681030756042','اهرم':'77458905939487148'},
    liveBaseMaxAge: 300000, blockOnHalt: true, blockOnOrderQueue: true, orderQueueThreshold: 0.005,
    riskFree: 33, useEwma: true, ewmaLambda: 0.94, enforceVolumeBase: false, volumeBaseRatio: 0.5,
    useWeightedDepth: true, depthWeights: [1.0,0.6,0.3],
    debugPanel: false, logReasons: true, allowNewSymbols: true, newSymbolMinObs: 5,
    useScore: true, scoreMin: 35, wER: 35, wIVR: 25, wADX: 15, wLiq: 15, wEdge: 10,
    useIvRank: true, ivRankBuy: 40, ivRankSell: 70, ivHistDays: 90,
    ihNewestFirst: true, abortThreshold: 10, abortThresholdInput: 100,
    exoticEnabled: false, viewMode: 'summary'
};

// ─── STATE ────────────────────────────────────────────────────────────────
var MEM = {}, CONFIG_CACHE = {};
var modelCache = {}, modelCacheOrder = [];
var poolStore = {}, ivHist = {}, poolGatesCache = {};
var liveBaseCache = {}, liveBaseFetching = {};
var pipelineData = {}, layerStats = {}, abortCounts = {};
var rawSamples = {raw:[], errors:[], incomplete:[]};
var totalInput = 0, _dragState = null;

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
function getSymList(k){ var v=getCfg(k); if(Array.isArray(v)) return v; if(typeof v==='string') return v.split(/[,،\n]+/).map(function(s){return s.trim();}).filter(Boolean); return []; }
function normalizePoolSymbols(){ var v=getCfg('poolBaseSymbols'); if(typeof v==='string'){ var arr=getSymList('poolBaseSymbols'); if(arr.length>0) optStore('poolBaseSymbols', arr); return arr; } return getSymList('poolBaseSymbols'); }
function faToEnDigits(s){ return String(s).replace(/[۰-۹]/g, function(d){ return String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)); }).replace(/[٠-٩]/g, function(d){ return String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)); }); }
function optSet(k,v){ if(k==='baseInsCodes'){ try{ _reverseMapCache=null; _reverseMapTime=0; }catch(e){} } optStore(k,v); clearCfgCache(k); }
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
function g2d(gy,gm,gd){ var d=Math.floor((gy+Math.floor((gm-8)/6)+100100)*1461/4)+Math.floor((153*((gm+9)%12)+2)/5)+gd-34840408; d=d-Math.floor(Math.floor((gy+100100+Math.floor((gm-8)/6))/100)*3/4)+752; return d; }
function jalaliToJdn(jy,jm,jd){
    var key=jy+'/'+jm+'/'+jd; if(jdnCache[key]) return jdnCache[key];
    var v;
    try{
        if(jy>1300){ var r=jalCal(jy); v=g2d(r.gy,3,r.march)+(jm-1)*31-Math.floor(jm/7)*(jm-7)+jd-1; }
        else { v=jy*10000+jm*100+jd; }
    }catch(e){ v=jy*10000+jm*100+jd; }
    jdnCache[key]=v; return v;
}
function todayJdn(){ var now=new Date(); var tehranMs=now.getTime()+(210-(-now.getTimezoneOffset()))*60000; return Math.floor(tehranMs/86400000); }
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
function getNextJalaliMonthLastDay(){ var cur=getJalaliNow(); var jy=cur.jy, jm=cur.jm+1; if(jm>12){ jm=1; jy++; } var jd=jalaliMonthDays(jy, jm); return {jy:jy, jm:jm, jd:jd}; }
function updateExpiryToNextMonthLastDay(){
    try{
        var nxt=getNextJalaliMonthLastDay();
        var dateStr=nxt.jy+'/'+pad2(nxt.jm)+'/'+pad2(nxt.jd);
        var monthPat=nxt.jm<10? '0?'+nxt.jm : '0?'+nxt.jm;
        var expiryPat=nxt.jy+'\\s*[\\/\\.\\-]\\s*'+monthPat+'(?!\\d)';
        CONFIG.expiryDate=dateStr; CONFIG.expiry=expiryPat; CONFIG.expiryJY=nxt.jy; CONFIG.expiryJM=nxt.jm; CONFIG.expiryJD=nxt.jd;
        if(getCfg('expiryAutoUpdate')!==false){
            try{ optStore('expiryDate', dateStr); optStore('expiry', expiryPat); optStore('expiryJY', nxt.jy); optStore('expiryJM', nxt.jm); optStore('expiryJD', nxt.jd); }catch(e){}
        }
        return {dateStr:dateStr, pattern:expiryPat, jy:nxt.jy, jm:nxt.jm, jd:nxt.jd};
    }catch(e){ return null; }
}

// ─── POOL ─────────────────────────────────────────────────────────────────
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
        }catch(e2){ rawSamples.errors.push({reason:'ls-quota-lost', error:e2.message}); }
    }
}
function binarySearchInsertPos(arr, jdn){
    var lo=0, hi=arr.length;
    while(lo<hi){ var mid=(lo+hi>>1); if(arr[mid].jdn < jdn) lo=mid+1; else hi=mid; }
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
    entry.history.splice(pos,0,newItem);
    var maxDays=getCfg('poolMaxDays')||90;
    if(entry.history.length>maxDays){ var excess=entry.history.length-maxDays; entry.history.splice(0, excess); }
    entry.firstJdn=entry.history[0]? entry.history[0].jdn : jdn;
    entry.lastJdn=entry.history[entry.history.length-1].jdn;
    entry.count=entry.history.length;
    if(_poolBatchMode){ _poolDirty[baseSym]=true; } else { updatePoolStats(baseSym); }
    if(data.iv!=null && data.iv>0){
        if(!ivHist[baseSym]) ivHist[baseSym]=[];
        var posIv=binarySearchInsertPos(ivHist[baseSym], jdn);
        if(posIv<ivHist[baseSym].length && ivHist[baseSym][posIv].jdn===jdn){ ivHist[baseSym][posIv].iv=data.iv; }
        else { ivHist[baseSym].splice(posIv,0,{jdn:jdn, iv:data.iv, dateStr:data.dateStr}); }
        if(ivHist[baseSym].length>getCfg('ivHistDays')) ivHist[baseSym]=ivHist[baseSym].slice(-getCfg('ivHistDays'));
    }
}
function buildReverseMap(){
    var map={};
    try{
        var codes=getCfg('baseInsCodes')||{};
        var keys=Object.keys(codes);
        for(var i=0;i<keys.length;i++){ var base=keys[i], code=codes[base]; if(code) map[code]=base; }
    }catch(e){}
    return map;
}
var _reverseMapCache=null, _reverseMapTime=0;
function getReverseMap(){ var now=Date.now(); if(_reverseMapCache && (now-_reverseMapTime)<60000) return _reverseMapCache; _reverseMapCache=buildReverseMap(); _reverseMapTime=now; return _reverseMapCache; }
function getBaseFromIns(insCode){ var rev=getReverseMap(); return rev[insCode]||null; }
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
var _ivRankCache={}, _ivRankVersion=0;
function getPoolIvRank(baseSym, curIv){
    var hist=ivHist[baseSym];
    if(!hist || hist.length<5) return 50;
    var cacheKey=baseSym+'_'+hist.length+'_'+_ivRankVersion;
    var cached=_ivRankCache[cacheKey];
    var ivs;
    if(cached && cached.ivs){ ivs=cached.ivs; }
    else {
        ivs=hist.map(function(x){return x.iv;}).sort(function(a,b){return a-b;});
        _ivRankCache[cacheKey]={ivs:ivs};
        var keys=Object.keys(_ivRankCache);
        if(keys.length>50) delete _ivRankCache[keys[0]];
    }
    var less=0;
    for(var i=0;i<ivs.length;i++) if(ivs[i]<=curIv) less++;
    return less/ivs.length*100;
}
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
        if(ivHist[s] && ivHist[s].length> (getCfg('ivHistDays')||90)) ivHist[s]=ivHist[s].slice(-getCfg('ivHistDays'));
    }
}
function calibrateGatesFromPool(){
    if(!getCfg('poolGates')) return;
    var allTno=[];
    var keys=Object.keys(poolStore);
    for(var i=0;i<keys.length;i++){
        var st=poolStore[keys[i]].stats;
        if(st && st.avgTno>0) allTno.push(st.avgTno);
    }
    if(allTno.length>= (getCfg('poolMinGateObs')||20)){
        allTno.sort(function(a,b){return a-b;});
        var medTno=allTno[Math.floor(allTno.length/2)];
        poolGatesCache.medianTno=medTno;
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
function getCalibratedMinDepth(){ if(poolGatesCache.calibratedMinDepth && getCfg('poolGates')) return poolGatesCache.calibratedMinDepth; return getCfg('minDepthTrades'); }
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
                addToPool(sym, {price: Math.round(price), jdn: nowJdn, dateStr: dateStr, tno: 10, tvol: 10000});
                updated++;
            } else { skipped++; }
        }
        if(skipped>0) showToast('⚠️ '+skipped+' نماد بدون داده واقعی رد شد', 'warn');
    }
    endPoolBatch(); pruneOldPool(); calibrateGatesFromPool();
    if(showAlert) showToast('🔄 '+updated+' نماد بروز شد', 'success');
    try{ renderLayers(); renderDebug(); }catch(e){}
    return updated;
}
function requestPoolUpdateAll(){ return requestPoolUpdate(null, {showAlert:true}); }
function requestPoolUpdateSingle(){ var sym=prompt('نماد پایه را وارد کنید:', 'خودرو'); if(!sym) return 0; return requestPoolUpdate(sym.trim(), {showAlert:true}); }
function buildPoolHistoryChart(baseSym){
    var entry=poolStore[baseSym];
    if(!entry || !entry.history.length) return '<div style="color:#8b9bb4;font-size:11px;">تاریخچه‌ای برای '+baseSym+' یافت نشد</div>';
    var hist=entry.history.slice(-30);
    if(hist.length<2) return '<div style="color:#8b9bb4;font-size:11px;padding:10px;">داده کافی نیست</div>';
    var maxP=Math.max.apply(null, hist.map(function(h){return h.price;})), minP=Math.min.apply(null, hist.map(function(h){return h.price;}));
    var range=maxP-minP||1;
    var w=400, h=80, pad=10;
    var denom=hist.length>1? (hist.length-1) : 1;
    var points=hist.map(function(row, idx){ var x=pad + (idx/denom)*(w-pad*2); var y=h-pad - ((row.price-minP)/range)*(h-pad*2); return x+','+y; }).join(' ');
    var html='<div style="margin:8px 0;padding:10px;background:#070a14;border-radius:10px;border:1px solid #1e2f4f;"><div style="font-size:11px;margin-bottom:6px;">📈 '+baseSym+' — 30 روز آخر</div>';
    html+='<svg width="'+w+'" height="'+h+'" style="background:#111c32;border-radius:8px;display:block;"><polyline fill="none" stroke="#38bdf8" stroke-width="2" points="'+points+'"/></svg></div>';
    return html;
}

// ─── LIVE PRICE ───────────────────────────────────────────────────────────
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
    } else { fetchUrl=livePath; }
    var _done=false, _timeoutId=null, _controller=null;
    function _finish(val){ if(_done) return; _done=true; if(_timeoutId) clearTimeout(_timeoutId); liveBaseFetching[insCode]=false; if(cb) cb(val); }
    try{ _controller=new AbortController(); }catch(e){ _controller=null; }
    _timeoutId=setTimeout(function(){ try{ if(_controller) _controller.abort(); }catch(e){} _finish(null); }, 8000);
    try{
        if(typeof fetch==='undefined'){ _finish(null); return null; }
        var opts={method:'GET', credentials:'same-origin'};
        if(_controller) opts.signal=_controller.signal;
        fetch(fetchUrl, opts).then(function(resp){
            if(_done) return Promise.reject(new Error('timeout'));
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
                    for(var i=m.length-1;i>=0;i--){ var n=+m[i]; if(n>100 && n<1000000){ price=n; break; } }
                }
            }catch(e){}
            if(price>0){
                liveBaseCache[insCode]={price:price, time:Date.now()};
                var baseSym=getBaseFromIns(insCode);
                if(baseSym){ addToPool(baseSym, {price:price, dateStr:new Date().toISOString().slice(0,10), jdn: todayJdn()}); savePool(); }
                _finish(price);
            } else { _finish(null); }
        }).catch(function(){ if(_done) return; _finish(null); });
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
    function tryDone(){ if(finished) return; if(pending<=0){ finished=true; if(cb) cb(results); } }
    for(var i=0;i<keys.length;i++){
        (function(sym, code){ fetchLiveBase(code, function(price){ if(price) results[sym]=price; pending--; tryDone(); }); })(keys[i], codes[keys[i]]);
    }
    setTimeout(function(){ if(!finished){ finished=true; if(cb) cb(results); } }, 12000);
}
function testCdnAndShow71(){
    var url=getCfg('tsetmcCdnUrl');
    var sameOriginDataUrl='/tsev2/data/InstInfoFast.aspx?i=35366681030756042&c=34';
    fetch(sameOriginDataUrl, {method:'GET', credentials:'same-origin'}).then(function(r){
        alert('🔍 تست CDN\nهم‌مبدأ: '+(r.ok?'✅ OK':'❌ شکست')+'\nآدرس: '+url);
    }).catch(function(e){ alert('هم‌مبدأ شکست: '+e.message); });
}
function autoConfigCdn71(){
    var curOrigin=getCurOrigin();
    var candidates=['', curOrigin, 'https://old.tsetmc.com'];
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
            } else { showToast('هیچ‌کدام OK نشد', 'error'); }
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

// ─── FILTERS ──────────────────────────────────────────────────────────────
var FILTERS = {
    'input-data':{label:'داده ناقص',severity:'hard'},'not-option':{label:'غیر اختیار',severity:'hard'},
    'expiry':{label:'سررسید نامعتبر',severity:'hard'},'expiry-past':{label:'سررسید گذشته',severity:'hard'},
    'price':{label:'قیمت نامعتبر',severity:'hard'},'base-price':{label:'قیمت پایه',severity:'hard'},
    'contractSize':{label:'اندازه قرارداد',severity:'hard'},'off-hours':{label:'خارج ساعت',severity:'soft'},
    'halt':{label:'توقف نماد',severity:'hard'},'div-day':{label:'روز تقسیم سود',severity:'soft'},
    'new-sym':{label:'نماد تازه',severity:'soft'},'base-vol':{label:'حجم مبنا',severity:'soft'},
    'tno':{label:'تعداد معاملات',severity:'hard'},'tvol':{label:'حجم معاملات',severity:'hard'},
    'avg-trade':{label:'میانگین معامله',severity:'soft'},'depth0':{label:'عمق صفر',severity:'hard'},
    'buy-queue':{label:'صف خرید قفل',severity:'soft'},'depth':{label:'عمق کم',severity:'soft'},
    'depth-invalid':{label:'عمق نامعتبر',severity:'hard'},'no-quote':{label:'بدون مظنه',severity:'hard'},
    'crossed-book':{label:'دفتر متقاطع',severity:'hard'},'spread':{label:'اسپرد زیاد',severity:'soft'},
    'strike':{label:'اعمال نامعتبر',severity:'hard'},'unit':{label:'واحد قیمت',severity:'soft'},
    'arb-bound':{label:'آربیتراژ',severity:'hard'},'time-value':{label:'ارزش زمانی',severity:'soft'},
    'iv-premium':{label:'صرف IV',severity:'soft'},'iv-bad':{label:'IV نامعتبر',severity:'hard'},
    'iv-range':{label:'IV خارج بازه',severity:'hard'},'delta-range':{label:'دلتا خارج بازه',severity:'soft'},
    'moneyness':{label:'مانی‌نس',severity:'soft'},'theta-high':{label:'تتا بالا',severity:'soft'},
    'leverage':{label:'اهرم خارج بازه',severity:'soft'},'stale-price':{label:'قیمت کهنه',severity:'soft'},
    'imbalance':{label:'عدم تعادل',severity:'soft'},'dte':{label:'روز کم',severity:'soft'},
    'gate':{label:'گیت',severity:'hard'},'score':{label:'امتیاز پایین',severity:'soft',isPrefix:true},
    'min-er':{label:'بازده کم',severity:'soft'},'cold':{label:'بازده سرد',severity:'soft'},
    'rank':{label:'رتبه پایین',severity:'soft'},'global-rank':{label:'سقف کل',severity:'soft'},
    'pareto':{label:'پارتو',severity:'soft'},'aborted':{label:'توقف',severity:'hard'}
};
var FILTER_MAP71 = FILTERS;

// ─── LAYERS ───────────────────────────────────────────────────────────────
var LAYERS = [
    { key:'L1-validation', icon:'🔍', color:'#38bdf8', order:1, label:'اعتبارسنجی داده', desc:'داده اولیه',
      schema:{ minPrice:{type:'number',def:10,group:'core',label:'حداقل قیمت (ریال)'}, expiryDate:{type:'jalali',def:'auto',group:'core',label:'سررسید مرجع'}, expiryAutoUpdate:{type:'bool',def:true,group:'core',label:'بروزرسانی خودکار سررسید'}, abortThresholdInput:{type:'number',def:100,group:'adv',label:'آستانه داده ناقص'} },
      filter: function(ctx, sym){
          if(!sym || !sym.l18 || sym.pl==null) return ctx.reject('input-data');
          if(sym.pl < ctx.cfg.minPrice) return ctx.reject('price', 'pl='+sym.pl);
          if(sym.expiryJdn!=null){
              var expJ=sym.expiryJdn;
              if(expJ>1000000){ var jy=Math.floor(expJ/10000), jm=Math.floor((expJ%10000)/100), jd=expJ%100; expJ=jalaliToJdn(jy,jm,jd); }
              if(expJ < ctx.todayJdn) return ctx.reject('expiry-past');
          }
          if(sym.contractSize!=null && sym.contractSize<=0) return ctx.reject('contractSize');
          return ctx.pass();
      }
    },
    { key:'L2-market', icon:'⏰', color:'#fbbf24', order:2, label:'وضعیت بازار', desc:'وضعیت بازار',
      schema:{ blockOnHalt:{type:'bool',def:true,group:'core',label:'رد توقف'}, allowNewSymbols:{type:'bool',def:true,group:'core',label:'نماد تازه'}, blockOnDividendDay:{type:'bool',def:true,group:'adv',label:'رد روز مجمع'} },
      filter: function(ctx, sym){
          if(ctx.cfg.enforceMarketHours && !isMarketHours()) return ctx.reject('off-hours');
          if(ctx.cfg.blockOnHalt && sym.tno===0 && sym.tvol===0) return ctx.reject('halt');
          if(sym.tno!=null && sym.tno<2 && !ctx.cfg.allowNewSymbols) return ctx.reject('new-sym', 'tno='+sym.tno);
          if(ctx.cfg.enforceVolumeBase && sym.bvol!=null && sym.tvol!=null && sym.tvol < sym.bvol*ctx.cfg.volumeBaseRatio) return ctx.reject('base-vol');
          if(ctx.cfg.blockOnDividendDay && sym.isDivDay) return ctx.reject('div-day');
          return ctx.pass();
      }
    },
    { key:'L3-liquidity', icon:'💧', color:'#34d399', order:3, label:'نقدشوندگی و عمق', desc:'نقدشوندگی',
      schema:{ minDepthTrades:{type:'number',def:0.5,group:'core',label:'عمق/میانگین'}, orderQueueThreshold:{type:'number',def:0.005,group:'core',label:'آستانه صف'}, blockOnOrderQueue:{type:'bool',def:true,group:'core',label:'رد صف قفل'} },
      filter: function(ctx, sym){
          var tno=sym.tno||0, tvol=sym.tvol||0;
          if(tno<3) return ctx.reject('tno');
          if(tvol<1000) return ctx.reject('tvol');
          var qd1=sym.qd1||0, qo1=sym.qo1||0;
          if(qd1===0 && qo1===0) return ctx.reject('depth0');
          if(isNaN(qd1)||isNaN(qo1)) return ctx.reject('depth-invalid');
          var avgTrade=tvol/Math.max(tno,1);
          if(avgTrade<100) return ctx.reject('avg-trade');
          var depth=qd1+qo1;
          if(depth<avgTrade*getCalibratedMinDepth()) return ctx.reject('depth');
          if(ctx.cfg.blockOnOrderQueue){
              var totalQ=qd1+qo1;
              if(totalQ>0 && qd1/totalQ > (1-ctx.cfg.orderQueueThreshold)) return ctx.reject('buy-queue');
          }
          return ctx.pass();
      }
    },
    { key:'L4-pricing', icon:'💰', color:'#a78bfa', order:4, label:'قیمت‌گذاری و آربیتراژ', desc:'قیمت‌گذاری',
      schema:{ maxSpread:{type:'number',def:15,group:'core',label:'سقف اسپرد (٪)'}, maxCostRT:{type:'number',def:12,group:'core',label:'سقف هزینه'}, tsetmcCdnUrl:{type:'url',def:'https://old.tsetmc.com',group:'core',label:'آدرس CDN'} },
      filter: function(ctx, sym){
          var bidRaw=sym.pd1||0, askRaw=sym.po1||0;
          if(bidRaw && askRaw && bidRaw>0 && askRaw>0 && bidRaw>askRaw) return ctx.reject('crossed-book');
          var bid=bidRaw||0, ask=askRaw||0;
          if(!bid || !ask){ bid=sym.pl*0.98; ask=sym.pl*1.02; }
          if(!bid || !ask || bid<=0 || ask<=0) return ctx.reject('no-quote');
          var mid=(bid+ask)/2;
          var spreadPct=(ask-bid)/mid*100;
          if(spreadPct>ctx.cfg.maxSpread) return ctx.reject('spread');
          var strikeMatch=String(sym.l30||'').match(/(\d{3,6})/);
          var K=strikeMatch? +strikeMatch[1] : 0;
          if(!K || K<10){ if(sym.strike!=null && sym.strike>=10) K=sym.strike; else return ctx.reject('strike'); }
          var poolP=sym.base? getPoolPrice(sym.base) : 0;
          var S=poolP||ctx.cfg.basePrices[sym.base]||sym.basePrice||1000;
          if(!S || S<=0) S=1000;
          var T=ctx.cfg.holdDays/365;
          var r=ctx.cfg.riskFree/100;
          var l30Str=String(sym.l30||'').trim();
          var isCall;
          if(sym.optionType) isCall=(sym.optionType==='call' || sym.optionType==='خ');
          else if(/^ض/.test(l30Str)) isCall=true;
          else if(/^ط/.test(l30Str)) isCall=false;
          else isCall=true;
          var marketPrice=mid;
          var intrinsic=isCall? Math.max(S-K,0) : Math.max(K-S,0);
          if(marketPrice < intrinsic*0.9) return ctx.reject('arb-bound');
          if(isCall){ if(marketPrice > S*1.02) return ctx.reject('arb-bound'); }
          else { if(marketPrice > K*1.02) return ctx.reject('arb-bound'); }
          var tv=marketPrice-intrinsic; if(tv<0) tv=0;
          var tvPct=intrinsic>0? (tv/marketPrice*100) : 100;
          if(tvPct>ctx.cfg.maxTimeValuePct && ctx.cfg.maxTimeValuePct<100) return ctx.reject('time-value');
          var modelPrice=bsPrice(S,K,T,r,0,0.4,isCall);
          var unitRatio=modelPrice>0? marketPrice/modelPrice : 1;
          if(unitRatio>ctx.cfg.unitGuardX*2) return ctx.reject('unit');
          if(sym.expiryJdn!=null){
              var expJ2=sym.expiryJdn;
              if(expJ2>1000000){ var jy2=Math.floor(expJ2/10000), jm2=Math.floor((expJ2%10000)/100), jd2=expJ2%100; expJ2=jalaliToJdn(jy2,jm2,jd2); }
              if(expJ2>0){ var realDte=expJ2 - ctx.todayJdn; if(realDte>=0) sym.dte=realDte; }
          }
          sym._S=S; sym._K=K; sym._T=T; sym._r=r; sym._q=0; sym._isCall=isCall; sym._mid=mid; sym._bid=bid; sym._ask=ask;
          return ctx.pass();
      }
    },
    { key:'L5-greeks', icon:'📈', color:'#fbbf24', order:5, label:'نوسان و یونانی‌ها', desc:'یونانی‌ها',
      schema:{ volFloor:{type:'number',def:25,group:'core',label:'کف نوسان'}, volCeil:{type:'number',def:150,group:'core',label:'سقف نوسان'}, maxIvPremium:{type:'number',def:10,group:'core',label:'سقف صرف IV'}, maxLeverage:{type:'number',def:30,group:'core',label:'سقف اهرم'} },
      filter: function(ctx, sym){
          var S=sym._S, K=sym._K, T=sym._T, r=sym._r, q=sym._q, isCall=sym._isCall, marketPrice=sym._mid;
          if(!S || !K) return ctx.reject('base-price');
          var ivRes=ivSolve(marketPrice,S,K,T,r,q,isCall);
          if(!ivRes.ok) return ctx.reject('iv-bad');
          var sigma=ivRes.iv;
          if(sigma<0.05 || sigma>5) return ctx.reject('iv-range');
          var poolVol=sym.base? getPoolVolatility(sym.base) : 0;
          var hv=poolVol>0? poolVol/100 : (ctx.cfg.volFloor+ctx.cfg.volCeil)/2/100;
          var ivPrem=(sigma-hv)/hv*100;
          if(ivPrem>ctx.cfg.maxIvPremium && ctx.cfg.maxIvPremium<100) return ctx.reject('iv-premium');
          var greeks=bsGreeks(S,K,T,r,q,sigma,isCall);
          if(ctx.cfg.minDelta!==0 || ctx.cfg.maxDelta!==1){
              var dAbs=Math.abs(greeks.delta);
              if(dAbs < ctx.cfg.minDelta || dAbs > ctx.cfg.maxDelta) return ctx.reject('delta-range');
          }
          var moneyness=S/K;
          if((ctx.cfg.moneynessMin>0 && moneyness < ctx.cfg.moneynessMin) || (ctx.cfg.moneynessMax>0 && moneyness > ctx.cfg.moneynessMax)) return ctx.reject('moneyness');
          var thetaPct=Math.abs(greeks.theta)/marketPrice*100;
          if(ctx.cfg.maxThetaPct<100 && thetaPct>ctx.cfg.maxThetaPct) return ctx.reject('theta-high');
          var leverage=Math.abs(greeks.delta)*S/marketPrice;
          if(leverage>ctx.cfg.maxLeverage || (ctx.cfg.minLeverage>0 && leverage < ctx.cfg.minLeverage)) return ctx.reject('leverage');
          if(sym.base && sigma>0){ try{ addToPool(sym.base, {price:S, iv:sigma, jdn: todayJdn(), dateStr: new Date().toISOString().slice(0,10)}); }catch(e){} }
          sym._iv=sigma; sym._greeks=greeks; sym._leverage=leverage; sym._moneyness=moneyness;
          return ctx.pass();
      }
    },
    { key:'L6-quality', icon:'⭐', color:'#fb7185', order:6, label:'کیفیت و امتیاز', desc:'کیفیت',
      schema:{ maxStalePricePct:{type:'number',def:50,group:'core',label:'سقف قیمت کهنه'}, maxImbalanceRatio:{type:'number',def:20,group:'core',label:'سقف عدم تعادل'}, minExpRet:{type:'number',def:40,group:'core',label:'حداقل بازده'}, coldThreshold:{type:'number',def:3,group:'core',label:'آستانه سرد'}, scoreMin:{type:'number',def:35,group:'core',label:'حداقل امتیاز'} },
      filter: function(ctx, sym){
          var mid=sym._mid, qd1=sym.qd1||0, qo1=sym.qo1||0;
          var lastPrice=sym.pl||mid;
          var stalePct=Math.abs(lastPrice-mid)/mid*100;
          if(ctx.cfg.maxStalePricePct<100 && stalePct>ctx.cfg.maxStalePricePct) return ctx.reject('stale-price');
          if(ctx.cfg.maxImbalanceRatio<20){
              var imb=Math.max(qd1,qo1)/Math.max(Math.min(qd1,qo1),1);
              if(imb>ctx.cfg.maxImbalanceRatio) return ctx.reject('imbalance');
          }
          if(sym.dte!=null && sym.dte < ctx.cfg.minDaysLeft) return ctx.reject('dte');
          var S=sym._S, K=sym._K, T=sym._T, r=sym._r, q=sym._q, sigma=sym._iv, isCall=sym._isCall, marketPrice=sym._mid;
          var fair=bsPrice(S*(1+ctx.cfg.view/100),K,T,r,q,sigma,isCall);
          var er=(fair-marketPrice)/marketPrice*100;
          if(ctx.cfg.minDteWeight){
              var dte=sym.dte!=null? sym.dte : ctx.cfg.minDaysLeft;
              var hold=ctx.cfg.holdDays;
              if(dte < hold*ctx.cfg.dtePenaltyDaysMult){
                  var penalty=ctx.cfg.dtePenaltyMax*(1 - dte/(hold*ctx.cfg.dtePenaltyDaysMult));
                  er-=penalty;
              }
          }
          if(er < ctx.cfg.coldThreshold) return ctx.reject('cold');
          if(er < ctx.cfg.minExpRet) return ctx.reject('min-er');
          if(ctx.cfg.useScore){
              var score=Math.min(er,100)/100*ctx.cfg.wER;
              if(ctx.cfg.useIvRank && sym.base){
                  var ivRank=getPoolIvRank(sym.base, sigma);
                  var buy=ctx.cfg.ivRankBuy, sell=ctx.cfg.ivRankSell;
                  var ivScore=0;
                  if(ivRank<=buy) ivScore=100; else if(ivRank>=sell) ivScore=0; else ivScore=100*(sell-ivRank)/(sell-buy);
                  score+=ivScore/100*ctx.cfg.wIVR;
                  sym._ivRank=ivRank;
              } else { score+=50/100*ctx.cfg.wIVR; }
              score+=60/100*ctx.cfg.wADX;
              score+=70/100*ctx.cfg.wLiq;
              score+=50/100*ctx.cfg.wEdge;
              if(score < ctx.cfg.scoreMin) return ctx.reject('score-'+Math.floor(score));
              sym._score=score;
          }
          sym._er=er; sym._fair=fair;
          return ctx.pass();
      }
    },
    { key:'L7-ranking', icon:'🏆', color:'#22d3ee', order:7, label:'رتبه‌بندی و خروجی', desc:'خروجی',
      schema:{ maxPerGroup:{type:'number',def:2,group:'core',label:'سقف هر گروه'}, maxTotalRows:{type:'number',def:0,group:'core',label:'سقف کل'}, usePareto:{type:'bool',def:true,group:'adv',label:'پارتو'} },
      filter: function(ctx, sym){
          var inputAbort=ctx.abortCounts['input-data']||0;
          if(inputAbort>ctx.cfg.abortThresholdInput && ctx.cfg.abortThresholdInput>0){
              var ratio=ctx.totalInput>0? inputAbort/ctx.totalInput : 0;
              if((ctx.totalInput<=20 && inputAbort>=Math.max(5, ctx.totalInput*0.5)) || (ctx.totalInput>20 && ratio>0.8)){
                  if(!ctx._deathWarned){ ctx._deathWarned=true; }
              }
          }
          return ctx.pass();
      }
    }
];

function makeCtx(){
    return {
        cfg: CONFIG, pool: poolStore, ivHist: ivHist, todayJdn: todayJdn(), totalInput: totalInput,
        abortCounts: abortCounts, rawSamples: rawSamples, debugOn: getCfg('debugPanel'),
        _deathWarned: false, _reject: null,
        reject: function(key, detail){ this._reject={ok:false, key:key, detail:detail||null}; return this._reject; },
        pass: function(extras){ this._reject=null; return {ok:true, extras:extras||null}; },
        getCfg: getCfg, getPoolPrice: getPoolPrice,
        hooks: { beforeAll:[], afterAll:[], beforeFilter:[], afterFilter:[] },
        callHook: function(name, args){
            try{
                var list=this.hooks[name]||[];
                for(var i=0;i<list.length;i++){ try{ list[i].apply(null, args); }catch(e){} }
                for(var li=0;li<LAYERS.length;li++){ var L=LAYERS[li]; if(L.hooks && L.hooks[name]){ try{ L.hooks[name].apply(L, args); }catch(e){} } }
            }catch(e){}
        }
    };
}

// ─── PIPELINE ──────────────────────────────────────────────────────────────
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
    if(isDebugSample && pipelineData[layerKey].samples.fail.length<3) pipelineData[layerKey].samples.fail.push(sample||filterKey);
}
function passLayer(layerKey, sample){
    if(!pipelineData[layerKey]) return;
    pipelineData[layerKey].output++;
    layerStats[layerKey].out++;
    if(getCfg('debugPanel') && pipelineData[layerKey].samples.pass.length<3) pipelineData[layerKey].samples.pass.push(sample||'ok');
}
function runPipeline(symbols){
    resetPipeline();
    var ctx=makeCtx();
    ctx.totalInput=symbols.length;
    var results=[], failed=[];
    var startTime=Date.now();
    var HARD_TIMEOUT=getCfg('computeIntervalMs')||15000;
    ctx.callHook('beforeAll', [ctx, symbols]);
    outer:
    for(var i=0;i<symbols.length;i++){
        totalInput++;
        ctx.totalInput=totalInput;
        if(Date.now()-startTime>HARD_TIMEOUT){
            rawSamples.errors.push({reason:'pipeline-timeout', at:i, total:symbols.length});
            break;
        }
        var sym=symbols[i];
        var debugOn=getCfg('debugPanel');
        ctx.callHook('beforeFilter', [ctx, sym]);
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
                    if(window.__exfRelaxedMode && FILTERS[r.key] && FILTERS[r.key].severity==='soft'){
                        passLayer(layerKey, sym.l18+'(relaxed)');
                        continue;
                    }
                    incFilter(layerKey, r.key, debugOn, sym.l18+' '+(r.detail||''));
                    if(debugOn && r.key==='input-data' && rawSamples.incomplete.length<5) rawSamples.incomplete.push({reason:r.key, sym:sym});
                    failed.push({sym:sym.l18||i, reason:r.key, layer:layerKey, detail:r.detail});
                    ctx.callHook('afterFilter', [ctx, sym, r]);
                    continue outer;
                }
                passLayer(layerKey, sym.l18);
            }
            results.push(sym);
        }catch(e){
            failed.push({sym:sym.l18||i, reason:'exception:'+e.message, layer:'exception'});
            if(rawSamples.errors.length<10) rawSamples.errors.push({sym:sym.l18, error:e.message});
        }
        ctx.callHook('afterFilter', [ctx, sym, {ok:true}]);
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
    }
    ctx.callHook('afterAll', [ctx, results]);
    try{ requestRenderResults(results); }catch(e){}
    return {pass:results, fail:failed, pipeline:pipelineData, stats:layerStats, total:symbols.length, isDeath:isDeath, deathInfo:isDeath? {topFilter:topFilter, topCount:topCount}:null};
}

// ─── VIEW MODE — hardcoded SUMMARY in min ─────────────────────────────────
var VIEW_MODE={SUMMARY:'summary', VERBOSE:'verbose'};
function getViewMode(){ return VIEW_MODE.SUMMARY; }

// ─── UI ───────────────────────────────────────────────────────────────────
var panelEl=null, topZ=10000;
function bringTop71(el){ topZ+=2; el.style.zIndex=topZ; }
var _dragBound=false;
function makeDraggable71(el, handle){
    if(!el || !handle) return;
    try{ handle.style.cursor='move'; }catch(e){}
    try{
        handle.addEventListener('mousedown', function(e){
            try{ var rect=el.getBoundingClientRect(); _dragState={el:el, sx:e.clientX, sy:e.clientY, ox:rect.left, oy:rect.top}; }catch(e){ _dragState={el:el, sx:e.clientX, sy:e.clientY, ox:0, oy:0}; }
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
    var css=''
    +'.exf-panel,#__exfToast{--bg:#070a14;--card:#111c32;--card2:#162040;--card3:#1c2a4a;--border:#1e2f4f;--border2:#2a3f66;--text:#e2e8f0;--text2:#94a3b8;--muted:#64748b;--accent:#38bdf8;--accent2:#818cf8;--ok:#34d399;--warn:#fbbf24;--bad:#fb7185;--grad-main:linear-gradient(135deg,#38bdf8 0%,#818cf8 50%,#c084fc 100%);--grad-ok:linear-gradient(135deg,#34d399 0%,#22d3ee 100%);--grad-warn:linear-gradient(135deg,#fbbf24 0%,#f97316 100%);--grad-funnel:linear-gradient(180deg,rgba(56,189,248,0.08) 0%,rgba(129,140,248,0.08) 50%,rgba(192,132,252,0.08) 100%);--shadow:0 25px 80px rgba(0,0,0,0.7),0 0 0 1px rgba(56,189,248,0.08);}'
    +'.exf-panel{position:fixed;right:20px;top:20px;width:440px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;background:radial-gradient(120% 120% at 0% 0%,rgba(56,189,248,0.12) 0%,transparent 50%),linear-gradient(180deg,var(--card) 0%,var(--bg) 100%);border:1px solid var(--border);border-radius:20px;box-shadow:var(--shadow);font-family:Vazirmatn,Tahoma,sans-serif;direction:rtl;color:var(--text);z-index:10000;backdrop-filter:blur(24px);}'
    +'.exf-header{padding:18px 20px;display:flex;align-items:center;justify-content:space-between;position:relative;flex-shrink:0;}'
    +'.exf-header::before{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:var(--grad-main);opacity:0.6;}'
    +'.exf-title{display:flex;align-items:center;gap:12px;}'
    +'.exf-title-icon{width:40px;height:40px;border-radius:12px;background:var(--grad-main);display:flex;align-items:center;justify-content:center;font-size:20px;box-shadow:0 8px 20px rgba(56,189,248,0.35);}'
    +'.exf-title-text{display:flex;flex-direction:column;}'
    +'.exf-title-main{font-weight:900;font-size:15px;background:var(--grad-main);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}'
    +'.exf-title-sub{font-size:10px;color:var(--text2);margin-top:1px;}'
    +'.exf-ver{font-size:9px;color:var(--text2);background:rgba(255,255,255,0.06);padding:4px 10px;border-radius:20px;border:1px solid var(--border);}'
    +'.exf-close{cursor:pointer;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:10px;background:rgba(255,255,255,0.06);color:var(--text2);border:1px solid var(--border);transition:all 0.2s;} .exf-close:hover{background:rgba(251,113,133,0.12);color:var(--bad);}'
    +'.exf-funnel{padding:16px 18px;background:var(--grad-funnel);border-bottom:1px solid var(--border);flex-shrink:0;}'
    +'.exf-funnel-title{font-size:11px;font-weight:800;margin-bottom:12px;display:flex;align-items:center;gap:8px;}'
    +'.exf-funnel-viz{display:flex;align-items:flex-end;justify-content:space-between;gap:4px;height:86px;padding:0 4px;}'
    +'.exf-funnel-step{flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;}'
    +'.exf-funnel-shape{width:100%;height:36px;display:flex;align-items:center;justify-content:center;}'
    +'.exf-funnel-trapezoid{width:100%;height:28px;background:linear-gradient(180deg,var(--funnel-color),var(--funnel-color-dark));clip-path:polygon(10% 0%,90% 0%,100% 100%,0% 100%);border-radius:2px;overflow:hidden;box-shadow:0 4px 12px var(--funnel-shadow);}'
    +'.exf-funnel-icon{width:32px;height:32px;border-radius:10px;background:var(--card2);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:15px;}'
    +'.exf-funnel-count{font-size:10px;font-weight:800;background:var(--card2);padding:2px 8px;border-radius:20px;border:1px solid var(--border);min-width:28px;text-align:center;}'
    +'.exf-funnel-step.active .exf-funnel-count{background:var(--funnel-color);color:white;border-color:var(--funnel-color);}'
    +'.exf-funnel-label{font-size:8px;color:var(--muted);font-weight:600;}'
    +'.exf-poolbar{margin:12px 14px;padding:12px 14px;background:linear-gradient(135deg,rgba(56,189,248,0.08) 0%,rgba(129,140,248,0.06) 100%);border:1px solid rgba(56,189,248,0.15);border-radius:14px;flex-shrink:0;}'
    +'.exf-poolbar-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;}'
    +'.exf-poolbar-title{font-size:11px;font-weight:800;}'
    +'.exf-poolbar-stats{font-size:10px;color:var(--text2);background:var(--bg);padding:4px 10px;border-radius:20px;border:1px solid var(--border);}'
    +'.exf-pool-btn{padding:8px 14px;border-radius:8px;border:1px solid var(--border);background:var(--card2);color:var(--text);cursor:pointer;font-size:11px;font-weight:600;transition:all 0.2s;display:flex;align-items:center;gap:5px;} .exf-pool-btn:hover{transform:translateY(-1px);border-color:var(--border2);}'
    +'.exf-pool-btn-primary{background:var(--grad-main);border:none;color:white;}'
    +'.exf-pool-btn-success{background:var(--grad-ok);border:none;color:white;}'
    +'.exf-layers{overflow:auto;flex:1;padding:8px 0 0;} .exf-layers::-webkit-scrollbar{width:5px;} .exf-layers::-webkit-scrollbar-thumb{background:var(--border);border-radius:10px;}'
    +'.exf-layer{margin:10px 14px;background:linear-gradient(180deg,var(--card2),var(--card));border:1px solid var(--border);border-radius:14px;overflow:hidden;transition:all 0.35s;}'
    +'.exf-layer:hover{border-color:var(--border2);}'
    +'.exf-layer-h{padding:14px 16px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;}'
    +'.exf-layer-left{display:flex;align-items:center;gap:12px;flex:1;min-width:0;}'
    +'.exf-layer-icon{width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:18px;background:linear-gradient(135deg,var(--card3),var(--bg));border:1px solid var(--border);flex-shrink:0;}'
    +'.exf-layer-info{display:flex;flex-direction:column;flex:1;gap:2px;}'
    +'.exf-layer-name{font-size:13px;font-weight:800;}'
    +'.exf-layer-desc{font-size:10px;color:var(--text2);}'
    +'.exf-layer-stats{display:flex;align-items:center;gap:6px;flex-shrink:0;}'
    +'.exf-badge{padding:5px 10px;border-radius:20px;font-size:10px;font-weight:800;display:flex;align-items:center;gap:4px;min-width:40px;justify-content:center;border:1px solid;}'
    +'.exf-badge-in{background:rgba(56,189,248,0.10);color:var(--accent);border-color:rgba(56,189,248,0.18);}'
    +'.exf-badge-out{background:rgba(52,211,153,0.10);color:var(--ok);border-color:rgba(52,211,153,0.18);}'
    +'.exf-badge-filter{background:rgba(251,191,36,0.10);color:var(--warn);border-color:rgba(251,191,36,0.18);}'
    +'.exf-actions{padding:14px;display:flex;gap:10px;background:linear-gradient(180deg,var(--card),var(--bg));border-top:1px solid var(--border);flex-shrink:0;}'
    +'.exf-btn{flex:1;padding:12px 14px;border-radius:12px;border:1px solid var(--border);background:var(--card2);color:var(--text);cursor:pointer;font-size:11px;font-weight:700;transition:all 0.25s;display:flex;align-items:center;justify-content:center;gap:8px;} .exf-btn:hover{transform:translateY(-2px);border-color:var(--border2);}'
    +'.exf-btn-primary{background:var(--grad-main);border:none;color:white;}'
    +'.exf-topbar{position:fixed;left:20px;bottom:20px;display:flex;gap:10px;z-index:9999;flex-direction:column;}'
    +'.exf-topbtn{width:52px;height:52px;border-radius:16px;background:linear-gradient(180deg,var(--card2),var(--card));border:1px solid var(--border);display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,0.4);font-size:20px;} .exf-topbtn:hover{transform:translateY(-3px) scale(1.08);}'
    +'.exf-death{margin:12px 14px;background:linear-gradient(135deg,rgba(251,113,133,0.08),rgba(248,113,113,0.06));border:1px solid rgba(251,113,133,0.18);border-radius:14px;padding:14px;font-size:11px;}'
    +'.exf-death-title{font-weight:900;color:var(--bad);margin-bottom:10px;font-size:12px;}'
    +'.exf-disclaimer{margin:12px 14px;padding:12px 14px;background:rgba(251,191,36,0.06);border:1px solid rgba(251,191,36,0.12);border-radius:12px;font-size:10px;color:var(--text2);line-height:1.6;}'
    +'.exf-results{flex-shrink:0;} .exf-results-header{position:sticky;top:0;background:var(--card);z-index:2;border-bottom:1px solid var(--border);} .exf-result-row:hover{background:var(--card2);} .exf-results-thead{display:flex;padding:6px 12px;font-size:10px;color:var(--muted);border-bottom:1px solid var(--border);background:var(--bg);position:sticky;top:44px;z-index:1;} .exf-results-thead span{cursor:pointer;}'
    +'.exf-minimized .exf-funnel,.exf-minimized .exf-poolbar,.exf-minimized .exf-layers,.exf-minimized .exf-results,.exf-minimized .exf-disclaimer,.exf-minimized .exf-actions{display:none;}'
    +'.exf-footer{padding:10px 14px;text-align:center;font-size:9px;color:var(--muted);border-top:1px solid var(--border);background:var(--bg);flex-shrink:0;} .exf-footer a{color:var(--accent);text-decoration:none;}';
    if(!window._exfStyleInjected){ window._exfStyleInjected=true; var style=document.createElement('style'); style.textContent=css; document.head.appendChild(style); }
    var wrap=document.createElement('div'); wrap.className='exf-panel'; wrap.id='__exfPanel';
    wrap.innerHTML='<div class="exf-header" id="__exfDragHandle"><div class="exf-title"><div class="exf-title-icon">🧬</div><div class="exf-title-text"><div class="exf-title-main">قیف هوشمند</div><div class="exf-title-sub">TSE Option — '+VERSION_TAG+'</div></div><span class="exf-ver">min</span></div><div style="display:flex;gap:6px;"><div class="exf-close" id="__exfMin">−</div><div class="exf-close" id="__exfClose">✕</div></div></div>'
    +'<div class="exf-funnel"><div class="exf-funnel-title">🔽 جریان قیف</div><div class="exf-funnel-viz" id="__exfFunnelSteps"></div></div>'
    +'<div id="__exfPoolBar" class="exf-poolbar"></div>'
    +'<div id="__exfDeath" style="display:none;"></div>'
    +'<div class="exf-layers" id="__exfLayers"></div>'
    +'<div id="__exfResults" class="exf-results" style="border-top:1px solid var(--border);max-height:320px;overflow:auto;"></div>'
    +'<div class="exf-disclaimer">⚠️ '+DISCLAIMER+'<br/>© ۱۴۰۵ — <a href="'+AUTHOR+'" target="_blank" style="color:var(--warn);">'+AUTHOR+'</a> | <a href="'+CONTACT.group+'" target="_blank" style="color:var(--warn);">SmartOptionTSE</a></div>'
    +'<div class="exf-actions"><button class="exf-btn exf-btn-primary" id="__exfRun">▶ اجرا</button><button class="exf-btn" id="__exfDebug">🐞 دیباگ</button><button class="exf-btn" id="__exfReset">↺ بازنشانی</button></div>'
    +'<div class="exf-footer">© ۱۴۰۵ — '+AUTHOR+' | '+LICENSE+'</div>';
    document.body.appendChild(wrap);
    makeDraggable71(wrap, wrap.querySelector('#__exfDragHandle'));
    wrap.querySelector('#__exfClose').addEventListener('click', function(){ wrap.style.display='none'; });
    var minBtn=wrap.querySelector('#__exfMin');
    if(minBtn) minBtn.addEventListener('click', function(){ wrap.classList.toggle('exf-minimized'); minBtn.textContent=wrap.classList.contains('exf-minimized')? '+' : '−'; });
    panelEl=wrap;
    var bar=document.createElement('div'); bar.className='exf-topbar';
    bar.innerHTML='<div class="exf-topbtn" id="__exfOpen" title="قیف">🧬</div>';
    document.body.appendChild(bar);
    bar.querySelector('#__exfOpen').addEventListener('click', function(){ wrap.style.display='block'; bringTop71(wrap); });
    return wrap;
}

function renderFunnelViz(){
    var viz=document.getElementById('__exfFunnelSteps');
    if(!viz) return;
    var html='';
    // FIX v0.0.4.7: hoisting — استفاده از totalIn به جای totalInput
    var totalIn = totalInput>0? totalInput : ((pipelineData['L1-validation']||{}).input || 100);
    if(totalIn===0) totalIn=100;
    for(var li=0;li<LAYERS.length;li++){
        var L=LAYERS[li];
        var stat=pipelineData[L.key]||{input:0, output:0};
        var pct = totalIn>0? (stat.output/totalIn*100) : 0;
        var widthPct = Math.max(8, pct);
        var color = L.color||'#38bdf8';
        var isActive = stat.output>0;
        html+='<div class="exf-funnel-step '+(isActive?'active':'')+'" title="'+L.label+': '+stat.output+'/'+stat.input+'" style="--funnel-color:'+color+';--funnel-color-dark:'+color+'cc;--funnel-shadow:'+color+'55;--funnel-glow:'+color+'33;">'
        +'<div class="exf-funnel-shape"><div class="exf-funnel-trapezoid" style="width:'+widthPct+'%;"></div></div>'
        +'<div class="exf-funnel-icon">'+L.icon+'</div>'
        +'<div class="exf-funnel-count" title="'+pct.toFixed(1)+'%">'+stat.output+' ('+pct.toFixed(0)+'%)</div>'
        +'<div class="exf-funnel-label">'+L.label.split(' ')[0]+'</div>'
        +'</div>';
    }
    viz.innerHTML=html;
}

// ─── RENDER ───────────────────────────────────────────────────────────────
var _renderRaf=null, _renderTimer=null, _pendingResults=null;
function debouncedRenderLayers(){
    if(_renderRaf) cancelAnimationFrame(_renderRaf);
    if(_renderTimer) clearTimeout(_renderTimer);
    _renderTimer=setTimeout(function(){
        _renderRaf=requestAnimationFrame(function(){
            _renderRaf=null; _renderTimer=null;
            try{ renderLayersImmediate(); }catch(e){}
            if(_pendingResults){ try{ renderResultsTable(_pendingResults); }catch(e){} _pendingResults=null; }
        });
    }, 16);
}
function renderLayers(){ debouncedRenderLayers(); }

function renderLayerSummary(L, stat){
    var layerDiv=document.createElement('div');
    layerDiv.className='exf-layer exf-layer-summary';
    layerDiv.id='__exfLayer_'+L.key;
    try{ layerDiv.style.setProperty('--layer-color', L.color); }catch(e){}
    layerDiv.innerHTML='<div class="exf-layer-h"><div class="exf-layer-left"><div class="exf-layer-icon">'+L.icon+'</div><div class="exf-layer-info"><div class="exf-layer-name">'+L.label+'</div><div class="exf-layer-desc">'+stat.input+' → '+stat.output+' ▼'+stat.filtered+'</div></div></div><div class="exf-layer-stats"><span class="exf-badge exf-badge-out">→'+stat.output+'</span></div></div>';
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

    var poolBar=document.getElementById('__exfPoolBar');
    if(poolBar){
        if(!poolBar._delegated){
            poolBar._delegated=true;
            poolBar.addEventListener('click', function(e){
                var btn=e.target.closest? e.target.closest('button') : null;
                var id=btn? btn.id : e.target.id;
                if(id==='__exfPoolUpd') requestPoolUpdateAll();
                else if(id==='__exfPoolLive') fetchAllLiveBases(function(r){ showToast(Object.keys(r).length+' بروز شد', 'success'); renderLayers(); });
                else if(id==='__exfPoolView'){ var sum=getPoolSummary(); console.table(sum); showToast('استخر '+sum.length+' نماد', 'info'); }
                else if(id==='__exfPoolClear'){ if(confirm('پاک‌سازی استخر؟')){ poolStore={}; ivHist={}; savePool(); renderLayers(); } }
            });
        }
        var poolSum=getPoolSummary();
        var top3=poolSum.slice(0,3).map(function(p){ return p.symbol+':'+p.days+'روز'; }).join('، ');
        poolBar.innerHTML='<div class="exf-poolbar-header"><span class="exf-poolbar-title">🏊 استخر</span><span class="exf-poolbar-stats">'+getPoolStatusText()+'</span></div><div style="font-size:10px;color:var(--text2);margin-top:6px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;"><span>'+(top3||'خالی')+'</span><span style="display:flex;gap:4px;"><button id="__exfPoolUpd" class="exf-pool-btn exf-pool-btn-primary" style="font-size:10px;padding:4px 8px;">🔄</button><button id="__exfPoolLive" class="exf-pool-btn exf-pool-btn-success" style="font-size:10px;padding:4px 8px;">💹</button><button id="__exfPoolView" class="exf-pool-btn" style="font-size:10px;padding:4px 8px;">📊</button><button id="__exfPoolClear" class="exf-pool-btn" style="font-size:10px;padding:4px 8px;">🗑</button></span></div>';
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
            deathDiv.innerHTML='<div class="exf-death-title">⚠️ حالت مرگ: '+totalIn+' → 0</div><div>بیشترین فیلتر: <b>'+topLabel+'</b> ('+topC+')</div><div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap;"><button id="__exfDeathRelax" class="exf-pool-btn" style="background:var(--warn);color:#000;border:none;">🔓 تسهیل</button><button id="__exfDeathClear" class="exf-pool-btn">↺ پاک‌سازی</button><button id="__exfDeathLog" class="exf-pool-btn">📋 لاگ</button></div>';
            var relaxBtn=document.getElementById('__exfDeathRelax');
            if(relaxBtn) relaxBtn.addEventListener('click', function(){
                try{ window.__exfRelaxedMode=true; }catch(e){}
                optSet('maxSpread', 30); optSet('minPrice', 1); optSet('minExpRet', 0); optSet('scoreMin', 0);
                showToast('حالت تسهیل فعال', 'success'); renderLayers();
            });
            var clearBtn=document.getElementById('__exfDeathClear');
            if(clearBtn) clearBtn.addEventListener('click', function(){ optClearAbort(); renderLayers(); showToast('abort پاک شد', 'success'); });
            var logBtn=document.getElementById('__exfDeathLog');
            if(logBtn) logBtn.addEventListener('click', function(){ if(window.__exf && window.__exf.optLog) window.__exf.optLog(); });
        }
    } else { if(deathDiv) deathDiv.style.display='none'; }

    renderFunnelViz();
    var layersFrag=document.createDocumentFragment();
    for(var li=0;li<LAYERS.length;li++){
        var L=LAYERS[li];
        var stat=pipelineData[L.key]||{input:0, output:0, filtered:0, filters:{}, samples:{pass:[], fail:[]}};
        var layerDiv=renderLayerSummary(L, stat);
        if(openState[layerDiv.id]) layerDiv.classList.add('open');
        layersFrag.appendChild(layerDiv);
        (function(div){ var h=div.querySelector('.exf-layer-h'); if(h) h.addEventListener('click', function(){ div.classList.toggle('open'); }); })(layerDiv);
    }
    if(container.replaceChildren) container.replaceChildren(layersFrag);
    else { container.innerHTML=''; container.appendChild(layersFrag); }
}

// ─── RESULTS TABLE — SUMMARY only ─────────────────────────────────────────
function renderResultsTable(results){
    var container=document.getElementById('__exfResults');
    if(!container){
        var layersDiv=document.getElementById('__exfLayers');
        if(layersDiv){
            container=document.createElement('div'); container.id='__exfResults'; container.className='exf-results';
            layersDiv.parentNode.insertBefore(container, layersDiv.nextSibling);
        } else return;
    }
    if(!results || !results.length){
        container.innerHTML='<div style="padding:14px;text-align:center;color:var(--muted);font-size:11px;">نتیجه‌ای نیست — قیف را اجرا کنید</div>';
        return;
    }
    var frag=document.createDocumentFragment();
    var header=document.createElement('div');
    header.className='exf-results-header';
    header.innerHTML='<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;flex-wrap:wrap;gap:6px;"><span style="font-weight:800;font-size:12px;">🏆 نتایج — '+results.length+' نماد</span><span style="display:flex;gap:6px;flex-wrap:wrap;"><button class="exf-pool-btn" id="__exfExportCsv" style="font-size:10px;padding:4px 8px;">📤 CSV</button><button class="exf-pool-btn" id="__exfExportJson" style="font-size:10px;padding:4px 8px;">📤 JSON</button><button class="exf-pool-btn" id="__exfFilterCall" style="font-size:10px;padding:4px 8px;">📈</button><button class="exf-pool-btn" id="__exfFilterPut" style="font-size:10px;padding:4px 8px;">📉</button><button class="exf-pool-btn" id="__exfFilterAll" style="font-size:10px;padding:4px 8px;">🔄</button></span></div>';
    frag.appendChild(header);
    var thead=document.createElement('div');
    thead.className='exf-results-thead';
    thead.innerHTML='<span style="flex:1;">نماد</span><span style="width:60px;text-align:center;" data-sort="er">ER</span><span style="width:50px;text-align:center;" data-sort="score">امتیاز</span><span style="width:60px;text-align:center;" data-sort="iv">IV</span><span style="width:60px;text-align:center;" data-sort="dte">DTE</span><span style="width:40px;text-align:center;">نوع</span>';
    frag.appendChild(thead);
    var filterMode = window.__exfFilterMode || 'all';
    var displayResults = results;
    if(filterMode==='call') displayResults = results.filter(function(r){ return r._isCall===true; });
    else if(filterMode==='put') displayResults = results.filter(function(r){ return r._isCall===false; });
    if(!displayResults.length){
        var empty=document.createElement('div');
        empty.style.cssText='padding:14px;text-align:center;color:var(--muted);font-size:11px;';
        empty.textContent='با فیلتر فعلی نتیجه‌ای نیست';
        frag.appendChild(empty);
        if(container.replaceChildren) container.replaceChildren(frag);
        else { container.innerHTML=''; container.appendChild(frag); }
        return;
    }
    var table=document.createElement('div');
    table.className='exf-results-table';
    var html='';
    for(var i=0;i<displayResults.length;i++){
        var r=displayResults[i];
        var symName=r.l18||r.l30||'نماد';
        var er=r._er!=null? r._er.toFixed(1)+'%' : '-';
        var score=r._score!=null? Math.round(r._score) : '-';
        var iv=r._iv!=null? (r._iv*100).toFixed(1)+'%' : '-';
        var dte=r.dte!=null? r.dte+'روز' : '-';
        var typeTag=r._isCall===true? '📈' : r._isCall===false? '📉' : '-';
        html+='<div class="exf-result-row" style="height:42px;display:flex;align-items:center;justify-content:space-between;padding:0 12px;border-bottom:1px solid var(--border);font-size:11px;"><span style="font-weight:700;flex:1;">'+symName+'</span><span style="width:60px;text-align:center;color:var(--accent);">'+er+'</span><span style="width:50px;text-align:center;color:var(--ok);">'+score+'</span><span style="width:60px;text-align:center;color:var(--text2);">'+iv+'</span><span style="width:60px;text-align:center;color:var(--muted);font-size:10px;">'+dte+'</span><span style="width:40px;text-align:center;">'+typeTag+'</span></div>';
    }
    table.innerHTML=html;
    frag.appendChild(table);
    if(container.replaceChildren) container.replaceChildren(frag);
    else { container.innerHTML=''; container.appendChild(frag); }
    setTimeout(function(){
        var csvBtn=document.getElementById('__exfExportCsv');
        if(csvBtn) csvBtn.addEventListener('click', function(){
            var rows=[['l18','l30','base','type','er','score','iv','dte','delta','leverage','fair','mid']];
            for(var i=0;i<results.length;i++){
                var r=results[i];
                rows.push([r.l18||'', r.l30||'', r.base||'', (r._isCall?'call':'put'), r._er||0, r._score||0, r._iv||0, r.dte||0, r._greeks?r._greeks.delta:0, r._leverage||0, r._fair||0, r._mid||0]);
            }
            var csv=rows.map(function(row){return row.join(',');}).join('\n');
            try{ if(navigator.clipboard){ navigator.clipboard.writeText(csv); showToast('CSV در clipboard', 'success'); } else { console.log(csv); showToast('CSV در کنسول', 'info'); } }catch(e){ console.log(csv); }
        });
        var jsonBtn=document.getElementById('__exfExportJson');
        if(jsonBtn) jsonBtn.addEventListener('click', function(){
            var clean=results.map(function(r){ return {l18:r.l18, base:r.base, isCall:r._isCall, er:r._er, score:r._score, iv:r._iv, dte:r.dte, delta:r._greeks&&r._greeks.delta, leverage:r._leverage, fair:r._fair, mid:r._mid}; });
            var json=JSON.stringify(clean, null, 2);
            try{ if(navigator.clipboard){ navigator.clipboard.writeText(json); showToast('JSON در clipboard', 'success'); } else { console.log(json); showToast('JSON در کنسول', 'info'); } }catch(e){ console.log(json); }
        });
        var callBtn=document.getElementById('__exfFilterCall');
        if(callBtn) callBtn.addEventListener('click', function(){ window.__exfFilterMode='call'; renderResultsTable(results); });
        var putBtn=document.getElementById('__exfFilterPut');
        if(putBtn) putBtn.addEventListener('click', function(){ window.__exfFilterMode='put'; renderResultsTable(results); });
        var allBtn=document.getElementById('__exfFilterAll');
        if(allBtn) allBtn.addEventListener('click', function(){ window.__exfFilterMode='all'; renderResultsTable(results); });
        var theadEl=container.querySelector('.exf-results-thead');
        if(theadEl && !theadEl._delegated){
            theadEl._delegated=true;
            theadEl.addEventListener('click', function(e){
                var k=e.target.getAttribute('data-sort');
                if(!k) return;
                var keyMap={ er:'_er', score:'_score', iv:'_iv', dte:'dte' };
                var field=keyMap[k]; if(!field) return;
                var dir=(window.__exfSortKey===k && window.__exfSortDir==='desc')? 'asc' : 'desc';
                window.__exfSortKey=k; window.__exfSortDir=dir;
                var sorted=results.slice().sort(function(a,b){ var av=a[field]!=null? a[field] : -Infinity; var bv=b[field]!=null? b[field] : -Infinity; return dir==='desc'? bv-av : av-bv; });
                renderResultsTable(sorted);
            });
        }
    }, 0);
}
function requestRenderResults(results){ _pendingResults=results; debouncedRenderLayers(); }

// ─── DEBUG — SUMMARY only ─────────────────────────────────────────────────
function buildDebugPanel(){
    var existing=document.getElementById('__exfDebugPanel');
    if(existing){ existing.style.display='block'; bringTop71(existing); return existing; }
    var div=document.createElement('div');
    div.id='__exfDebugPanel';
    div.style.cssText='position:fixed;left:20px;top:20px;width:520px;max-height:88vh;overflow:auto;background:linear-gradient(180deg,#111c32 0%,#070a14 100%);border:1px solid #1e2f4f;border-radius:20px;box-shadow:0 25px 80px rgba(0,0,0,0.7);font-family:Vazirmatn,Tahoma,sans-serif;direction:rtl;color:#e2e8f0;z-index:10001;padding:0;';
    div.innerHTML='<div style="padding:16px 20px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #1e2f4f;border-radius:20px 20px 0 0;position:sticky;top:0;background:#111c32;"><div style="font-weight:800;">🐞 دیباگ — SUMMARY</div><div id="__exfDbgClose" style="cursor:pointer;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:10px;background:rgba(255,255,255,0.06);border:1px solid #1e2f4f;">✕</div></div><div id="__exfDbgBody" style="padding:14px;"></div>';
    document.body.appendChild(div);
    makeDraggable71(div, div.firstChild);
    div.querySelector('#__exfDbgClose').addEventListener('click', function(){ div.style.display='none'; });
    return div;
}
function renderDebug(){
    var body=document.getElementById('__exfDbgBody');
    if(!body) return;
    var html='<div style="font-size:11px;color:#94a3b8;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;"><span>کل ورودی: '+totalInput+' — '+new Date().toLocaleString('fa-IR')+'</span><span style="display:flex;gap:6px;"><button id="__exfDbgUpd" class="exf-pool-btn exf-pool-btn-primary" style="padding:6px 12px;">🔄 تاریخچه</button><button id="__exfDbgLive" class="exf-pool-btn" style="padding:6px 12px;">💹 زنده</button></span></div>';
    for(var li=0;li<LAYERS.length;li++){
        var L=LAYERS[li];
        var st=pipelineData[L.key];
        if(!st) continue;
        html+='<div style="margin:8px 0;padding:10px 12px;background:#111c32;border:1px solid #1e2f4f;border-radius:10px;display:flex;justify-content:space-between;align-items:center;font-size:11px;"><span>'+L.icon+' '+L.label+'</span><span><span style="background:rgba(56,189,248,0.12);color:#38bdf8;padding:3px 8px;border-radius:12px;">↓'+st.input+'</span> <span style="background:rgba(52,211,153,0.12);color:#34d399;padding:3px 8px;border-radius:12px;">→'+st.output+'</span> <span style="background:rgba(251,191,36,0.12);color:#fbbf24;padding:3px 8px;border-radius:12px;">▼'+st.filtered+'</span></span></div>';
    }
    body.innerHTML=html;
    var updBtn=document.getElementById('__exfDbgUpd');
    if(updBtn) updBtn.addEventListener('click', function(){ requestPoolUpdateAll(); renderDebug(); });
    var liveBtn=document.getElementById('__exfDbgLive');
    if(liveBtn) liveBtn.addEventListener('click', function(){ fetchAllLiveBases(function(r){ showToast(Object.keys(r).length+' بروز شد', 'success'); renderDebug(); }); });
}

// ─── API ──────────────────────────────────────────────────────────────────
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
        var isCall=Math.random()<0.5;
        syms.push({
            l18:'TEST'+i, l30:(isCall?'ض':'ط')+base+(1000+i*10), pl: 100+Math.random()*200,
            tno: 5+Math.floor(Math.random()*50), tvol: 5000+Math.random()*50000,
            qd1: 1000+Math.random()*5000, qo1: 1000+Math.random()*5000,
            pd1: 90+Math.random()*20, po1: 110+Math.random()*20,
            base: base, basePrice: price, optionType: isCall?'call':'put',
            expiryJdn: nowJ + 30 + Math.floor(Math.random()*60),
            contractSize: 1000, bvol: 10000+Math.random()*50000, isDivDay: Math.random()<0.05
        });
    }
    var res=runPipeline(syms);
    renderLayers();
    if(getCfg('debugPanel')){ buildDebugPanel(); renderDebug(); }
    if(res.isDeath) showToast('⚠️ حالت مرگ: 0 خروجی', 'error');
    else showToast('✅ '+res.pass.length+' از '+res.total, 'success');
    return res;
}

// ─── STARTUP ──────────────────────────────────────────────────────────────
function startup(){
    try{
        updateExpiryToNextMonthLastDay();
        try{ normalizePoolSymbols(); }catch(e){}
        resetPipeline();
        buildModernPanel();
        renderLayers();
        var __exfApi = {
            version: VERSION_TAG, buildDate: BUILD_DATE, author: AUTHOR, contact: CONTACT,
            disclaimer: DISCLAIMER, license: LICENSE, config: CONFIG, layers: LAYERS, filters: FILTERS,
            filterMap: FILTER_MAP71, run: runPipeline, scanMock: scanMock,
            optSet: optSet, optGet: optGet, optLog: optLog, optClearAbort: optClearAbort,
            renderLayers: renderLayers, renderFunnelViz: renderFunnelViz, renderDebug: renderDebug,
            buildDebug: buildDebugPanel,
            getPipeline: function(){ return pipelineData; },
            getStats: function(){ return layerStats; },
            getPool: function(){ return poolStore; },
            getPoolSummary: getPoolSummary, getPoolStatus: getPoolStatusText, addToPool: addToPool,
            savePool: savePool, loadPool: loadPool, prunePool: pruneOldPool,
            fetchLiveBase: fetchLiveBase, fetchAllLiveBases: fetchAllLiveBases,
            testCdnAndShow: testCdnAndShow71, autoConfigCdn: autoConfigCdn71,
            requestPoolUpdate: requestPoolUpdate, requestPoolUpdateAll: requestPoolUpdateAll,
            requestPoolUpdateSingle: requestPoolUpdateSingle,
            getJalaliNow: getJalaliNow, updateExpiry: updateExpiryToNextMonthLastDay
        };
        window.__exf = __exfApi;
        window.tseExoticFilter = __exfApi;
        if(!window.optSet) window.optSet = optSet;
        if(!window.optGet) window.optGet = optGet;
        if(!window.optLog) window.optLog = optLog;
        if(!window.optClearAbort) window.optClearAbort = optClearAbort;
        if(!window.requestPoolUpdateAll) window.requestPoolUpdateAll = requestPoolUpdateAll;
        window.exoticRun = scanMock;
        window.exoticDebug = function(){ optSet('debugPanel', true); buildDebugPanel(); renderDebug(); };

        var runBtn=document.getElementById('__exfRun');
        if(runBtn) runBtn.addEventListener('click', function(){
            runBtn.textContent='⏳...'; runBtn.disabled=true;
            setTimeout(function(){ try{ scanMock(); }catch(e){} runBtn.textContent='▶ اجرا'; runBtn.disabled=false; }, 50);
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
            if(confirm('بازنشانی؟')){
                optClearAbort();
                optSet('maxSpread', 15); optSet('minPrice', 10); optSet('minExpRet', 40); optSet('scoreMin', 35);
                try{ window.__exfRelaxedMode=false; }catch(e){}
                resetPipeline();
                renderLayers();
                showToast('بازنشانی شد', 'success');
            }
        });
        console.log('[ExoticFilter] '+VERSION_TAG+' loaded — 7 layers — '+AUTHOR);
    }catch(e){ console.error('[ExoticFilter] startup error', e); }
}

if(typeof document!=='undefined' && document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', startup);
} else { startup(); }

})();