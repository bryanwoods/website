// Compiled by ClojureScript 1.9.229 {}
goog.provide('cljs.repl');
goog.require('cljs.core');
goog.require('cljs.spec');
cljs.repl.print_doc = (function cljs$repl$print_doc(p__28229){
var map__28254 = p__28229;
var map__28254__$1 = ((((!((map__28254 == null)))?((((map__28254.cljs$lang$protocol_mask$partition0$ & (64))) || (map__28254.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__28254):map__28254);
var m = map__28254__$1;
var n = cljs.core.get.call(null,map__28254__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var nm = cljs.core.get.call(null,map__28254__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.println.call(null,"-------------------------");

cljs.core.println.call(null,[cljs.core.str((function (){var temp__4657__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__4657__auto__)){
var ns = temp__4657__auto__;
return [cljs.core.str(ns),cljs.core.str("/")].join('');
} else {
return null;
}
})()),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Protocol");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
var seq__28256_28278 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__28257_28279 = null;
var count__28258_28280 = (0);
var i__28259_28281 = (0);
while(true){
if((i__28259_28281 < count__28258_28280)){
var f_28282 = cljs.core._nth.call(null,chunk__28257_28279,i__28259_28281);
cljs.core.println.call(null,"  ",f_28282);

var G__28283 = seq__28256_28278;
var G__28284 = chunk__28257_28279;
var G__28285 = count__28258_28280;
var G__28286 = (i__28259_28281 + (1));
seq__28256_28278 = G__28283;
chunk__28257_28279 = G__28284;
count__28258_28280 = G__28285;
i__28259_28281 = G__28286;
continue;
} else {
var temp__4657__auto___28287 = cljs.core.seq.call(null,seq__28256_28278);
if(temp__4657__auto___28287){
var seq__28256_28288__$1 = temp__4657__auto___28287;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__28256_28288__$1)){
var c__20970__auto___28289 = cljs.core.chunk_first.call(null,seq__28256_28288__$1);
var G__28290 = cljs.core.chunk_rest.call(null,seq__28256_28288__$1);
var G__28291 = c__20970__auto___28289;
var G__28292 = cljs.core.count.call(null,c__20970__auto___28289);
var G__28293 = (0);
seq__28256_28278 = G__28290;
chunk__28257_28279 = G__28291;
count__28258_28280 = G__28292;
i__28259_28281 = G__28293;
continue;
} else {
var f_28294 = cljs.core.first.call(null,seq__28256_28288__$1);
cljs.core.println.call(null,"  ",f_28294);

var G__28295 = cljs.core.next.call(null,seq__28256_28288__$1);
var G__28296 = null;
var G__28297 = (0);
var G__28298 = (0);
seq__28256_28278 = G__28295;
chunk__28257_28279 = G__28296;
count__28258_28280 = G__28297;
i__28259_28281 = G__28298;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_28299 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__20159__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__20159__auto__)){
return or__20159__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.call(null,arglists_28299);
} else {
cljs.core.prn.call(null,((cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first.call(null,arglists_28299)))?cljs.core.second.call(null,arglists_28299):arglists_28299));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Special Form");

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.contains_QMARK_.call(null,m,new cljs.core.Keyword(null,"url","url",276297046))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.call(null,[cljs.core.str("\n  Please see http://clojure.org/"),cljs.core.str(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join(''));
} else {
return null;
}
} else {
return cljs.core.println.call(null,[cljs.core.str("\n  Please see http://clojure.org/special_forms#"),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Macro");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"REPL Special Function");
} else {
}

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
var seq__28260_28300 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__28261_28301 = null;
var count__28262_28302 = (0);
var i__28263_28303 = (0);
while(true){
if((i__28263_28303 < count__28262_28302)){
var vec__28264_28304 = cljs.core._nth.call(null,chunk__28261_28301,i__28263_28303);
var name_28305 = cljs.core.nth.call(null,vec__28264_28304,(0),null);
var map__28267_28306 = cljs.core.nth.call(null,vec__28264_28304,(1),null);
var map__28267_28307__$1 = ((((!((map__28267_28306 == null)))?((((map__28267_28306.cljs$lang$protocol_mask$partition0$ & (64))) || (map__28267_28306.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__28267_28306):map__28267_28306);
var doc_28308 = cljs.core.get.call(null,map__28267_28307__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_28309 = cljs.core.get.call(null,map__28267_28307__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name_28305);

cljs.core.println.call(null," ",arglists_28309);

if(cljs.core.truth_(doc_28308)){
cljs.core.println.call(null," ",doc_28308);
} else {
}

var G__28310 = seq__28260_28300;
var G__28311 = chunk__28261_28301;
var G__28312 = count__28262_28302;
var G__28313 = (i__28263_28303 + (1));
seq__28260_28300 = G__28310;
chunk__28261_28301 = G__28311;
count__28262_28302 = G__28312;
i__28263_28303 = G__28313;
continue;
} else {
var temp__4657__auto___28314 = cljs.core.seq.call(null,seq__28260_28300);
if(temp__4657__auto___28314){
var seq__28260_28315__$1 = temp__4657__auto___28314;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__28260_28315__$1)){
var c__20970__auto___28316 = cljs.core.chunk_first.call(null,seq__28260_28315__$1);
var G__28317 = cljs.core.chunk_rest.call(null,seq__28260_28315__$1);
var G__28318 = c__20970__auto___28316;
var G__28319 = cljs.core.count.call(null,c__20970__auto___28316);
var G__28320 = (0);
seq__28260_28300 = G__28317;
chunk__28261_28301 = G__28318;
count__28262_28302 = G__28319;
i__28263_28303 = G__28320;
continue;
} else {
var vec__28269_28321 = cljs.core.first.call(null,seq__28260_28315__$1);
var name_28322 = cljs.core.nth.call(null,vec__28269_28321,(0),null);
var map__28272_28323 = cljs.core.nth.call(null,vec__28269_28321,(1),null);
var map__28272_28324__$1 = ((((!((map__28272_28323 == null)))?((((map__28272_28323.cljs$lang$protocol_mask$partition0$ & (64))) || (map__28272_28323.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__28272_28323):map__28272_28323);
var doc_28325 = cljs.core.get.call(null,map__28272_28324__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_28326 = cljs.core.get.call(null,map__28272_28324__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name_28322);

cljs.core.println.call(null," ",arglists_28326);

if(cljs.core.truth_(doc_28325)){
cljs.core.println.call(null," ",doc_28325);
} else {
}

var G__28327 = cljs.core.next.call(null,seq__28260_28315__$1);
var G__28328 = null;
var G__28329 = (0);
var G__28330 = (0);
seq__28260_28300 = G__28327;
chunk__28261_28301 = G__28328;
count__28262_28302 = G__28329;
i__28263_28303 = G__28330;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(n)){
var temp__4657__auto__ = cljs.spec.get_spec.call(null,cljs.core.symbol.call(null,[cljs.core.str(cljs.core.ns_name.call(null,n))].join(''),cljs.core.name.call(null,nm)));
if(cljs.core.truth_(temp__4657__auto__)){
var fnspec = temp__4657__auto__;
cljs.core.print.call(null,"Spec");

var seq__28274 = cljs.core.seq.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"fn","fn",-1175266204)], null));
var chunk__28275 = null;
var count__28276 = (0);
var i__28277 = (0);
while(true){
if((i__28277 < count__28276)){
var role = cljs.core._nth.call(null,chunk__28275,i__28277);
var temp__4657__auto___28331__$1 = cljs.core.get.call(null,fnspec,role);
if(cljs.core.truth_(temp__4657__auto___28331__$1)){
var spec_28332 = temp__4657__auto___28331__$1;
cljs.core.print.call(null,[cljs.core.str("\n "),cljs.core.str(cljs.core.name.call(null,role)),cljs.core.str(":")].join(''),cljs.spec.describe.call(null,spec_28332));
} else {
}

var G__28333 = seq__28274;
var G__28334 = chunk__28275;
var G__28335 = count__28276;
var G__28336 = (i__28277 + (1));
seq__28274 = G__28333;
chunk__28275 = G__28334;
count__28276 = G__28335;
i__28277 = G__28336;
continue;
} else {
var temp__4657__auto____$1 = cljs.core.seq.call(null,seq__28274);
if(temp__4657__auto____$1){
var seq__28274__$1 = temp__4657__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__28274__$1)){
var c__20970__auto__ = cljs.core.chunk_first.call(null,seq__28274__$1);
var G__28337 = cljs.core.chunk_rest.call(null,seq__28274__$1);
var G__28338 = c__20970__auto__;
var G__28339 = cljs.core.count.call(null,c__20970__auto__);
var G__28340 = (0);
seq__28274 = G__28337;
chunk__28275 = G__28338;
count__28276 = G__28339;
i__28277 = G__28340;
continue;
} else {
var role = cljs.core.first.call(null,seq__28274__$1);
var temp__4657__auto___28341__$2 = cljs.core.get.call(null,fnspec,role);
if(cljs.core.truth_(temp__4657__auto___28341__$2)){
var spec_28342 = temp__4657__auto___28341__$2;
cljs.core.print.call(null,[cljs.core.str("\n "),cljs.core.str(cljs.core.name.call(null,role)),cljs.core.str(":")].join(''),cljs.spec.describe.call(null,spec_28342));
} else {
}

var G__28343 = cljs.core.next.call(null,seq__28274__$1);
var G__28344 = null;
var G__28345 = (0);
var G__28346 = (0);
seq__28274 = G__28343;
chunk__28275 = G__28344;
count__28276 = G__28345;
i__28277 = G__28346;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
} else {
return null;
}
}
});

//# sourceMappingURL=repl.js.map?rel=1499477032579