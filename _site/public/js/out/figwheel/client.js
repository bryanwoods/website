// Compiled by ClojureScript 1.9.229 {}
goog.provide('figwheel.client');
goog.require('cljs.core');
goog.require('goog.userAgent.product');
goog.require('goog.Uri');
goog.require('cljs.core.async');
goog.require('goog.object');
goog.require('figwheel.client.socket');
goog.require('figwheel.client.file_reloading');
goog.require('clojure.string');
goog.require('figwheel.client.utils');
goog.require('cljs.repl');
goog.require('figwheel.client.heads_up');
goog.require('cljs.reader');
figwheel.client._figwheel_version_ = "0.5.4-5";
figwheel.client.figwheel_repl_print = (function figwheel$client$figwheel_repl_print(var_args){
var args30377 = [];
var len__21234__auto___30380 = arguments.length;
var i__21235__auto___30381 = (0);
while(true){
if((i__21235__auto___30381 < len__21234__auto___30380)){
args30377.push((arguments[i__21235__auto___30381]));

var G__30382 = (i__21235__auto___30381 + (1));
i__21235__auto___30381 = G__30382;
continue;
} else {
}
break;
}

var G__30379 = args30377.length;
switch (G__30379) {
case 2:
return figwheel.client.figwheel_repl_print.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return figwheel.client.figwheel_repl_print.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args30377.length)].join('')));

}
});

figwheel.client.figwheel_repl_print.cljs$core$IFn$_invoke$arity$2 = (function (stream,args){
figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"callback",new cljs.core.Keyword(null,"callback-name","callback-name",336964714),"figwheel-repl-print",new cljs.core.Keyword(null,"content","content",15833224),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"stream","stream",1534941648),stream,new cljs.core.Keyword(null,"args","args",1315556576),args], null)], null));

return null;
});

figwheel.client.figwheel_repl_print.cljs$core$IFn$_invoke$arity$1 = (function (args){
return figwheel.client.figwheel_repl_print.call(null,new cljs.core.Keyword(null,"out","out",-910545517),args);
});

figwheel.client.figwheel_repl_print.cljs$lang$maxFixedArity = 2;

figwheel.client.console_out_print = (function figwheel$client$console_out_print(args){
return console.log.apply(console,cljs.core.into_array.call(null,args));
});
figwheel.client.console_err_print = (function figwheel$client$console_err_print(args){
return console.error.apply(console,cljs.core.into_array.call(null,args));
});
figwheel.client.repl_out_print_fn = (function figwheel$client$repl_out_print_fn(var_args){
var args__21241__auto__ = [];
var len__21234__auto___30385 = arguments.length;
var i__21235__auto___30386 = (0);
while(true){
if((i__21235__auto___30386 < len__21234__auto___30385)){
args__21241__auto__.push((arguments[i__21235__auto___30386]));

var G__30387 = (i__21235__auto___30386 + (1));
i__21235__auto___30386 = G__30387;
continue;
} else {
}
break;
}

var argseq__21242__auto__ = ((((0) < args__21241__auto__.length))?(new cljs.core.IndexedSeq(args__21241__auto__.slice((0)),(0),null)):null);
return figwheel.client.repl_out_print_fn.cljs$core$IFn$_invoke$arity$variadic(argseq__21242__auto__);
});

figwheel.client.repl_out_print_fn.cljs$core$IFn$_invoke$arity$variadic = (function (args){
figwheel.client.console_out_print.call(null,args);

figwheel.client.figwheel_repl_print.call(null,new cljs.core.Keyword(null,"out","out",-910545517),args);

return null;
});

figwheel.client.repl_out_print_fn.cljs$lang$maxFixedArity = (0);

figwheel.client.repl_out_print_fn.cljs$lang$applyTo = (function (seq30384){
return figwheel.client.repl_out_print_fn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq30384));
});

figwheel.client.repl_err_print_fn = (function figwheel$client$repl_err_print_fn(var_args){
var args__21241__auto__ = [];
var len__21234__auto___30389 = arguments.length;
var i__21235__auto___30390 = (0);
while(true){
if((i__21235__auto___30390 < len__21234__auto___30389)){
args__21241__auto__.push((arguments[i__21235__auto___30390]));

var G__30391 = (i__21235__auto___30390 + (1));
i__21235__auto___30390 = G__30391;
continue;
} else {
}
break;
}

var argseq__21242__auto__ = ((((0) < args__21241__auto__.length))?(new cljs.core.IndexedSeq(args__21241__auto__.slice((0)),(0),null)):null);
return figwheel.client.repl_err_print_fn.cljs$core$IFn$_invoke$arity$variadic(argseq__21242__auto__);
});

figwheel.client.repl_err_print_fn.cljs$core$IFn$_invoke$arity$variadic = (function (args){
figwheel.client.console_err_print.call(null,args);

figwheel.client.figwheel_repl_print.call(null,new cljs.core.Keyword(null,"err","err",-2089457205),args);

return null;
});

figwheel.client.repl_err_print_fn.cljs$lang$maxFixedArity = (0);

figwheel.client.repl_err_print_fn.cljs$lang$applyTo = (function (seq30388){
return figwheel.client.repl_err_print_fn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq30388));
});

figwheel.client.enable_repl_print_BANG_ = (function figwheel$client$enable_repl_print_BANG_(){
cljs.core._STAR_print_newline_STAR_ = false;

cljs.core.set_print_fn_BANG_.call(null,figwheel.client.repl_out_print_fn);

cljs.core.set_print_err_fn_BANG_.call(null,figwheel.client.repl_err_print_fn);

return null;
});
figwheel.client.autoload_QMARK_ = (cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))?(function (){
var pred__30392 = cljs.core._EQ_;
var expr__30393 = (function (){var or__20159__auto__ = (function (){try{if(cljs.core.truth_(typeof localstorage !== 'undefined')){
return localStorage.getItem("figwheel_autoload");
} else {
return null;
}
}catch (e30396){if((e30396 instanceof Error)){
var e = e30396;
return false;
} else {
throw e30396;

}
}})();
if(cljs.core.truth_(or__20159__auto__)){
return or__20159__auto__;
} else {
return "true";
}
})();
if(cljs.core.truth_(pred__30392.call(null,"true",expr__30393))){
return true;
} else {
if(cljs.core.truth_(pred__30392.call(null,"false",expr__30393))){
return false;
} else {
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(expr__30393)].join('')));
}
}
}):(function (){
return true;
}));
figwheel.client.toggle_autoload = (function figwheel$client$toggle_autoload(){
if(cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))){
try{if(cljs.core.truth_(typeof localstorage !== 'undefined')){
localStorage.setItem("figwheel_autoload",cljs.core.not.call(null,figwheel.client.autoload_QMARK_.call(null)));
} else {
}

return figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),[cljs.core.str("Figwheel autoloading "),cljs.core.str((cljs.core.truth_(figwheel.client.autoload_QMARK_.call(null))?"ON":"OFF"))].join(''));
}catch (e30398){if((e30398 instanceof Error)){
var e = e30398;
return figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),[cljs.core.str("Unable to access localStorage")].join(''));
} else {
throw e30398;

}
}} else {
return null;
}
});
goog.exportSymbol('figwheel.client.toggle_autoload', figwheel.client.toggle_autoload);
figwheel.client.get_essential_messages = (function figwheel$client$get_essential_messages(ed){
if(cljs.core.truth_(ed)){
return cljs.core.cons.call(null,cljs.core.select_keys.call(null,ed,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"message","message",-406056002),new cljs.core.Keyword(null,"class","class",-2030961996)], null)),figwheel$client$get_essential_messages.call(null,new cljs.core.Keyword(null,"cause","cause",231901252).cljs$core$IFn$_invoke$arity$1(ed)));
} else {
return null;
}
});
figwheel.client.error_msg_format = (function figwheel$client$error_msg_format(p__30399){
var map__30402 = p__30399;
var map__30402__$1 = ((((!((map__30402 == null)))?((((map__30402.cljs$lang$protocol_mask$partition0$ & (64))) || (map__30402.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30402):map__30402);
var message = cljs.core.get.call(null,map__30402__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var class$ = cljs.core.get.call(null,map__30402__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
return [cljs.core.str(class$),cljs.core.str(" : "),cljs.core.str(message)].join('');
});
figwheel.client.format_messages = cljs.core.comp.call(null,cljs.core.partial.call(null,cljs.core.map,figwheel.client.error_msg_format),figwheel.client.get_essential_messages);
figwheel.client.focus_msgs = (function figwheel$client$focus_msgs(name_set,msg_hist){
return cljs.core.cons.call(null,cljs.core.first.call(null,msg_hist),cljs.core.filter.call(null,cljs.core.comp.call(null,name_set,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863)),cljs.core.rest.call(null,msg_hist)));
});
figwheel.client.reload_file_QMARK__STAR_ = (function figwheel$client$reload_file_QMARK__STAR_(msg_name,opts){
var or__20159__auto__ = new cljs.core.Keyword(null,"load-warninged-code","load-warninged-code",-2030345223).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__20159__auto__)){
return or__20159__auto__;
} else {
return cljs.core.not_EQ_.call(null,msg_name,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356));
}
});
figwheel.client.reload_file_state_QMARK_ = (function figwheel$client$reload_file_state_QMARK_(msg_names,opts){
var and__20147__auto__ = cljs.core._EQ_.call(null,cljs.core.first.call(null,msg_names),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563));
if(and__20147__auto__){
return figwheel.client.reload_file_QMARK__STAR_.call(null,cljs.core.second.call(null,msg_names),opts);
} else {
return and__20147__auto__;
}
});
figwheel.client.block_reload_file_state_QMARK_ = (function figwheel$client$block_reload_file_state_QMARK_(msg_names,opts){
return (cljs.core._EQ_.call(null,cljs.core.first.call(null,msg_names),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563))) && (cljs.core.not.call(null,figwheel.client.reload_file_QMARK__STAR_.call(null,cljs.core.second.call(null,msg_names),opts)));
});
figwheel.client.warning_append_state_QMARK_ = (function figwheel$client$warning_append_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356)], null),cljs.core.take.call(null,(2),msg_names));
});
figwheel.client.warning_state_QMARK_ = (function figwheel$client$warning_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),cljs.core.first.call(null,msg_names));
});
figwheel.client.rewarning_state_QMARK_ = (function figwheel$client$rewarning_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356)], null),cljs.core.take.call(null,(3),msg_names));
});
figwheel.client.compile_fail_state_QMARK_ = (function figwheel$client$compile_fail_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),cljs.core.first.call(null,msg_names));
});
figwheel.client.compile_refail_state_QMARK_ = (function figwheel$client$compile_refail_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289)], null),cljs.core.take.call(null,(2),msg_names));
});
figwheel.client.css_loaded_state_QMARK_ = (function figwheel$client$css_loaded_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"css-files-changed","css-files-changed",720773874),cljs.core.first.call(null,msg_names));
});
figwheel.client.file_reloader_plugin = (function figwheel$client$file_reloader_plugin(opts){
var ch = cljs.core.async.chan.call(null);
var c__23027__auto___30564 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23027__auto___30564,ch){
return (function (){
var f__23028__auto__ = (function (){var switch__22962__auto__ = ((function (c__23027__auto___30564,ch){
return (function (state_30533){
var state_val_30534 = (state_30533[(1)]);
if((state_val_30534 === (7))){
var inst_30529 = (state_30533[(2)]);
var state_30533__$1 = state_30533;
var statearr_30535_30565 = state_30533__$1;
(statearr_30535_30565[(2)] = inst_30529);

(statearr_30535_30565[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30534 === (1))){
var state_30533__$1 = state_30533;
var statearr_30536_30566 = state_30533__$1;
(statearr_30536_30566[(2)] = null);

(statearr_30536_30566[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30534 === (4))){
var inst_30486 = (state_30533[(7)]);
var inst_30486__$1 = (state_30533[(2)]);
var state_30533__$1 = (function (){var statearr_30537 = state_30533;
(statearr_30537[(7)] = inst_30486__$1);

return statearr_30537;
})();
if(cljs.core.truth_(inst_30486__$1)){
var statearr_30538_30567 = state_30533__$1;
(statearr_30538_30567[(1)] = (5));

} else {
var statearr_30539_30568 = state_30533__$1;
(statearr_30539_30568[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30534 === (15))){
var inst_30493 = (state_30533[(8)]);
var inst_30508 = new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(inst_30493);
var inst_30509 = cljs.core.first.call(null,inst_30508);
var inst_30510 = new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(inst_30509);
var inst_30511 = [cljs.core.str("Figwheel: Not loading code with warnings - "),cljs.core.str(inst_30510)].join('');
var inst_30512 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"warn","warn",-436710552),inst_30511);
var state_30533__$1 = state_30533;
var statearr_30540_30569 = state_30533__$1;
(statearr_30540_30569[(2)] = inst_30512);

(statearr_30540_30569[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30534 === (13))){
var inst_30517 = (state_30533[(2)]);
var state_30533__$1 = state_30533;
var statearr_30541_30570 = state_30533__$1;
(statearr_30541_30570[(2)] = inst_30517);

(statearr_30541_30570[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30534 === (6))){
var state_30533__$1 = state_30533;
var statearr_30542_30571 = state_30533__$1;
(statearr_30542_30571[(2)] = null);

(statearr_30542_30571[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30534 === (17))){
var inst_30515 = (state_30533[(2)]);
var state_30533__$1 = state_30533;
var statearr_30543_30572 = state_30533__$1;
(statearr_30543_30572[(2)] = inst_30515);

(statearr_30543_30572[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30534 === (3))){
var inst_30531 = (state_30533[(2)]);
var state_30533__$1 = state_30533;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_30533__$1,inst_30531);
} else {
if((state_val_30534 === (12))){
var inst_30492 = (state_30533[(9)]);
var inst_30506 = figwheel.client.block_reload_file_state_QMARK_.call(null,inst_30492,opts);
var state_30533__$1 = state_30533;
if(cljs.core.truth_(inst_30506)){
var statearr_30544_30573 = state_30533__$1;
(statearr_30544_30573[(1)] = (15));

} else {
var statearr_30545_30574 = state_30533__$1;
(statearr_30545_30574[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30534 === (2))){
var state_30533__$1 = state_30533;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30533__$1,(4),ch);
} else {
if((state_val_30534 === (11))){
var inst_30493 = (state_30533[(8)]);
var inst_30498 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_30499 = figwheel.client.file_reloading.reload_js_files.call(null,opts,inst_30493);
var inst_30500 = cljs.core.async.timeout.call(null,(1000));
var inst_30501 = [inst_30499,inst_30500];
var inst_30502 = (new cljs.core.PersistentVector(null,2,(5),inst_30498,inst_30501,null));
var state_30533__$1 = state_30533;
return cljs.core.async.ioc_alts_BANG_.call(null,state_30533__$1,(14),inst_30502);
} else {
if((state_val_30534 === (9))){
var inst_30493 = (state_30533[(8)]);
var inst_30519 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"warn","warn",-436710552),"Figwheel: code autoloading is OFF");
var inst_30520 = new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(inst_30493);
var inst_30521 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_30520);
var inst_30522 = [cljs.core.str("Not loading: "),cljs.core.str(inst_30521)].join('');
var inst_30523 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),inst_30522);
var state_30533__$1 = (function (){var statearr_30546 = state_30533;
(statearr_30546[(10)] = inst_30519);

return statearr_30546;
})();
var statearr_30547_30575 = state_30533__$1;
(statearr_30547_30575[(2)] = inst_30523);

(statearr_30547_30575[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30534 === (5))){
var inst_30486 = (state_30533[(7)]);
var inst_30488 = [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),null,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),null];
var inst_30489 = (new cljs.core.PersistentArrayMap(null,2,inst_30488,null));
var inst_30490 = (new cljs.core.PersistentHashSet(null,inst_30489,null));
var inst_30491 = figwheel.client.focus_msgs.call(null,inst_30490,inst_30486);
var inst_30492 = cljs.core.map.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863),inst_30491);
var inst_30493 = cljs.core.first.call(null,inst_30491);
var inst_30494 = figwheel.client.autoload_QMARK_.call(null);
var state_30533__$1 = (function (){var statearr_30548 = state_30533;
(statearr_30548[(9)] = inst_30492);

(statearr_30548[(8)] = inst_30493);

return statearr_30548;
})();
if(cljs.core.truth_(inst_30494)){
var statearr_30549_30576 = state_30533__$1;
(statearr_30549_30576[(1)] = (8));

} else {
var statearr_30550_30577 = state_30533__$1;
(statearr_30550_30577[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30534 === (14))){
var inst_30504 = (state_30533[(2)]);
var state_30533__$1 = state_30533;
var statearr_30551_30578 = state_30533__$1;
(statearr_30551_30578[(2)] = inst_30504);

(statearr_30551_30578[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30534 === (16))){
var state_30533__$1 = state_30533;
var statearr_30552_30579 = state_30533__$1;
(statearr_30552_30579[(2)] = null);

(statearr_30552_30579[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30534 === (10))){
var inst_30525 = (state_30533[(2)]);
var state_30533__$1 = (function (){var statearr_30553 = state_30533;
(statearr_30553[(11)] = inst_30525);

return statearr_30553;
})();
var statearr_30554_30580 = state_30533__$1;
(statearr_30554_30580[(2)] = null);

(statearr_30554_30580[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30534 === (8))){
var inst_30492 = (state_30533[(9)]);
var inst_30496 = figwheel.client.reload_file_state_QMARK_.call(null,inst_30492,opts);
var state_30533__$1 = state_30533;
if(cljs.core.truth_(inst_30496)){
var statearr_30555_30581 = state_30533__$1;
(statearr_30555_30581[(1)] = (11));

} else {
var statearr_30556_30582 = state_30533__$1;
(statearr_30556_30582[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__23027__auto___30564,ch))
;
return ((function (switch__22962__auto__,c__23027__auto___30564,ch){
return (function() {
var figwheel$client$file_reloader_plugin_$_state_machine__22963__auto__ = null;
var figwheel$client$file_reloader_plugin_$_state_machine__22963__auto____0 = (function (){
var statearr_30560 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_30560[(0)] = figwheel$client$file_reloader_plugin_$_state_machine__22963__auto__);

(statearr_30560[(1)] = (1));

return statearr_30560;
});
var figwheel$client$file_reloader_plugin_$_state_machine__22963__auto____1 = (function (state_30533){
while(true){
var ret_value__22964__auto__ = (function (){try{while(true){
var result__22965__auto__ = switch__22962__auto__.call(null,state_30533);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22965__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22965__auto__;
}
break;
}
}catch (e30561){if((e30561 instanceof Object)){
var ex__22966__auto__ = e30561;
var statearr_30562_30583 = state_30533;
(statearr_30562_30583[(5)] = ex__22966__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_30533);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e30561;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22964__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__30584 = state_30533;
state_30533 = G__30584;
continue;
} else {
return ret_value__22964__auto__;
}
break;
}
});
figwheel$client$file_reloader_plugin_$_state_machine__22963__auto__ = function(state_30533){
switch(arguments.length){
case 0:
return figwheel$client$file_reloader_plugin_$_state_machine__22963__auto____0.call(this);
case 1:
return figwheel$client$file_reloader_plugin_$_state_machine__22963__auto____1.call(this,state_30533);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloader_plugin_$_state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloader_plugin_$_state_machine__22963__auto____0;
figwheel$client$file_reloader_plugin_$_state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloader_plugin_$_state_machine__22963__auto____1;
return figwheel$client$file_reloader_plugin_$_state_machine__22963__auto__;
})()
;})(switch__22962__auto__,c__23027__auto___30564,ch))
})();
var state__23029__auto__ = (function (){var statearr_30563 = f__23028__auto__.call(null);
(statearr_30563[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__23027__auto___30564);

return statearr_30563;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23029__auto__);
});})(c__23027__auto___30564,ch))
);


return ((function (ch){
return (function (msg_hist){
cljs.core.async.put_BANG_.call(null,ch,msg_hist);

return msg_hist;
});
;})(ch))
});
figwheel.client.truncate_stack_trace = (function figwheel$client$truncate_stack_trace(stack_str){
return cljs.core.take_while.call(null,(function (p1__30585_SHARP_){
return cljs.core.not.call(null,cljs.core.re_matches.call(null,/.*eval_javascript_STAR__STAR_.*/,p1__30585_SHARP_));
}),clojure.string.split_lines.call(null,stack_str));
});
figwheel.client.get_ua_product = (function figwheel$client$get_ua_product(){
if(cljs.core.truth_(figwheel.client.utils.node_env_QMARK_.call(null))){
return new cljs.core.Keyword(null,"chrome","chrome",1718738387);
} else {
if(cljs.core.truth_(goog.userAgent.product.SAFARI)){
return new cljs.core.Keyword(null,"safari","safari",497115653);
} else {
if(cljs.core.truth_(goog.userAgent.product.CHROME)){
return new cljs.core.Keyword(null,"chrome","chrome",1718738387);
} else {
if(cljs.core.truth_(goog.userAgent.product.FIREFOX)){
return new cljs.core.Keyword(null,"firefox","firefox",1283768880);
} else {
if(cljs.core.truth_(goog.userAgent.product.IE)){
return new cljs.core.Keyword(null,"ie","ie",2038473780);
} else {
return null;
}
}
}
}
}
});
var base_path_30588 = figwheel.client.utils.base_url_path.call(null);
figwheel.client.eval_javascript_STAR__STAR_ = ((function (base_path_30588){
return (function figwheel$client$eval_javascript_STAR__STAR_(code,opts,result_handler){
try{figwheel.client.enable_repl_print_BANG_.call(null);

var result_value = figwheel.client.utils.eval_helper.call(null,code,opts);
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"success","success",1890645906),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"value","value",305978217),result_value], null));
}catch (e30587){if((e30587 instanceof Error)){
var e = e30587;
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.pr_str.call(null,e),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"stacktrace","stacktrace",-95588394),clojure.string.join.call(null,"\n",figwheel.client.truncate_stack_trace.call(null,e.stack)),new cljs.core.Keyword(null,"base-path","base-path",495760020),base_path_30588], null));
} else {
var e = e30587;
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.pr_str.call(null,e),new cljs.core.Keyword(null,"stacktrace","stacktrace",-95588394),"No stacktrace available."], null));

}
}finally {figwheel.client.enable_repl_print_BANG_.call(null);
}});})(base_path_30588))
;
/**
 * The REPL can disconnect and reconnect lets ensure cljs.user exists at least.
 */
figwheel.client.ensure_cljs_user = (function figwheel$client$ensure_cljs_user(){
if(cljs.core.truth_(cljs.user)){
return null;
} else {
return cljs.user = ({});
}
});
figwheel.client.repl_plugin = (function figwheel$client$repl_plugin(p__30589){
var map__30598 = p__30589;
var map__30598__$1 = ((((!((map__30598 == null)))?((((map__30598.cljs$lang$protocol_mask$partition0$ & (64))) || (map__30598.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30598):map__30598);
var opts = map__30598__$1;
var build_id = cljs.core.get.call(null,map__30598__$1,new cljs.core.Keyword(null,"build-id","build-id",1642831089));
return ((function (map__30598,map__30598__$1,opts,build_id){
return (function (p__30600){
var vec__30601 = p__30600;
var seq__30602 = cljs.core.seq.call(null,vec__30601);
var first__30603 = cljs.core.first.call(null,seq__30602);
var seq__30602__$1 = cljs.core.next.call(null,seq__30602);
var map__30604 = first__30603;
var map__30604__$1 = ((((!((map__30604 == null)))?((((map__30604.cljs$lang$protocol_mask$partition0$ & (64))) || (map__30604.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30604):map__30604);
var msg = map__30604__$1;
var msg_name = cljs.core.get.call(null,map__30604__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = seq__30602__$1;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"repl-eval","repl-eval",-1784727398),msg_name)){
figwheel.client.ensure_cljs_user.call(null);

return figwheel.client.eval_javascript_STAR__STAR_.call(null,new cljs.core.Keyword(null,"code","code",1586293142).cljs$core$IFn$_invoke$arity$1(msg),opts,((function (vec__30601,seq__30602,first__30603,seq__30602__$1,map__30604,map__30604__$1,msg,msg_name,_,map__30598,map__30598__$1,opts,build_id){
return (function (res){
return figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"callback",new cljs.core.Keyword(null,"callback-name","callback-name",336964714),new cljs.core.Keyword(null,"callback-name","callback-name",336964714).cljs$core$IFn$_invoke$arity$1(msg),new cljs.core.Keyword(null,"content","content",15833224),res], null));
});})(vec__30601,seq__30602,first__30603,seq__30602__$1,map__30604,map__30604__$1,msg,msg_name,_,map__30598,map__30598__$1,opts,build_id))
);
} else {
return null;
}
});
;})(map__30598,map__30598__$1,opts,build_id))
});
figwheel.client.css_reloader_plugin = (function figwheel$client$css_reloader_plugin(opts){
return (function (p__30612){
var vec__30613 = p__30612;
var seq__30614 = cljs.core.seq.call(null,vec__30613);
var first__30615 = cljs.core.first.call(null,seq__30614);
var seq__30614__$1 = cljs.core.next.call(null,seq__30614);
var map__30616 = first__30615;
var map__30616__$1 = ((((!((map__30616 == null)))?((((map__30616.cljs$lang$protocol_mask$partition0$ & (64))) || (map__30616.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30616):map__30616);
var msg = map__30616__$1;
var msg_name = cljs.core.get.call(null,map__30616__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = seq__30614__$1;
if(cljs.core._EQ_.call(null,msg_name,new cljs.core.Keyword(null,"css-files-changed","css-files-changed",720773874))){
return figwheel.client.file_reloading.reload_css_files.call(null,opts,msg);
} else {
return null;
}
});
});
figwheel.client.compile_fail_warning_plugin = (function figwheel$client$compile_fail_warning_plugin(p__30618){
var map__30630 = p__30618;
var map__30630__$1 = ((((!((map__30630 == null)))?((((map__30630.cljs$lang$protocol_mask$partition0$ & (64))) || (map__30630.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30630):map__30630);
var on_compile_warning = cljs.core.get.call(null,map__30630__$1,new cljs.core.Keyword(null,"on-compile-warning","on-compile-warning",-1195585947));
var on_compile_fail = cljs.core.get.call(null,map__30630__$1,new cljs.core.Keyword(null,"on-compile-fail","on-compile-fail",728013036));
return ((function (map__30630,map__30630__$1,on_compile_warning,on_compile_fail){
return (function (p__30632){
var vec__30633 = p__30632;
var seq__30634 = cljs.core.seq.call(null,vec__30633);
var first__30635 = cljs.core.first.call(null,seq__30634);
var seq__30634__$1 = cljs.core.next.call(null,seq__30634);
var map__30636 = first__30635;
var map__30636__$1 = ((((!((map__30636 == null)))?((((map__30636.cljs$lang$protocol_mask$partition0$ & (64))) || (map__30636.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30636):map__30636);
var msg = map__30636__$1;
var msg_name = cljs.core.get.call(null,map__30636__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = seq__30634__$1;
var pred__30638 = cljs.core._EQ_;
var expr__30639 = msg_name;
if(cljs.core.truth_(pred__30638.call(null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),expr__30639))){
return on_compile_warning.call(null,msg);
} else {
if(cljs.core.truth_(pred__30638.call(null,new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),expr__30639))){
return on_compile_fail.call(null,msg);
} else {
return null;
}
}
});
;})(map__30630,map__30630__$1,on_compile_warning,on_compile_fail))
});
figwheel.client.heads_up_plugin_msg_handler = (function figwheel$client$heads_up_plugin_msg_handler(opts,msg_hist_SINGLEQUOTE_){
var msg_hist = figwheel.client.focus_msgs.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),null,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),null], null), null),msg_hist_SINGLEQUOTE_);
var msg_names = cljs.core.map.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863),msg_hist);
var msg = cljs.core.first.call(null,msg_hist);
var c__23027__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23027__auto__,msg_hist,msg_names,msg){
return (function (){
var f__23028__auto__ = (function (){var switch__22962__auto__ = ((function (c__23027__auto__,msg_hist,msg_names,msg){
return (function (state_30847){
var state_val_30848 = (state_30847[(1)]);
if((state_val_30848 === (7))){
var inst_30775 = (state_30847[(2)]);
var state_30847__$1 = state_30847;
if(cljs.core.truth_(inst_30775)){
var statearr_30849_30895 = state_30847__$1;
(statearr_30849_30895[(1)] = (8));

} else {
var statearr_30850_30896 = state_30847__$1;
(statearr_30850_30896[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30848 === (20))){
var inst_30841 = (state_30847[(2)]);
var state_30847__$1 = state_30847;
var statearr_30851_30897 = state_30847__$1;
(statearr_30851_30897[(2)] = inst_30841);

(statearr_30851_30897[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30848 === (27))){
var inst_30837 = (state_30847[(2)]);
var state_30847__$1 = state_30847;
var statearr_30852_30898 = state_30847__$1;
(statearr_30852_30898[(2)] = inst_30837);

(statearr_30852_30898[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30848 === (1))){
var inst_30768 = figwheel.client.reload_file_state_QMARK_.call(null,msg_names,opts);
var state_30847__$1 = state_30847;
if(cljs.core.truth_(inst_30768)){
var statearr_30853_30899 = state_30847__$1;
(statearr_30853_30899[(1)] = (2));

} else {
var statearr_30854_30900 = state_30847__$1;
(statearr_30854_30900[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30848 === (24))){
var inst_30839 = (state_30847[(2)]);
var state_30847__$1 = state_30847;
var statearr_30855_30901 = state_30847__$1;
(statearr_30855_30901[(2)] = inst_30839);

(statearr_30855_30901[(1)] = (20));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30848 === (4))){
var inst_30845 = (state_30847[(2)]);
var state_30847__$1 = state_30847;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_30847__$1,inst_30845);
} else {
if((state_val_30848 === (15))){
var inst_30843 = (state_30847[(2)]);
var state_30847__$1 = state_30847;
var statearr_30856_30902 = state_30847__$1;
(statearr_30856_30902[(2)] = inst_30843);

(statearr_30856_30902[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30848 === (21))){
var inst_30802 = (state_30847[(2)]);
var state_30847__$1 = state_30847;
var statearr_30857_30903 = state_30847__$1;
(statearr_30857_30903[(2)] = inst_30802);

(statearr_30857_30903[(1)] = (20));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30848 === (31))){
var inst_30826 = figwheel.client.css_loaded_state_QMARK_.call(null,msg_names);
var state_30847__$1 = state_30847;
if(cljs.core.truth_(inst_30826)){
var statearr_30858_30904 = state_30847__$1;
(statearr_30858_30904[(1)] = (34));

} else {
var statearr_30859_30905 = state_30847__$1;
(statearr_30859_30905[(1)] = (35));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30848 === (32))){
var inst_30835 = (state_30847[(2)]);
var state_30847__$1 = state_30847;
var statearr_30860_30906 = state_30847__$1;
(statearr_30860_30906[(2)] = inst_30835);

(statearr_30860_30906[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30848 === (33))){
var inst_30824 = (state_30847[(2)]);
var state_30847__$1 = state_30847;
var statearr_30861_30907 = state_30847__$1;
(statearr_30861_30907[(2)] = inst_30824);

(statearr_30861_30907[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30848 === (13))){
var inst_30789 = figwheel.client.heads_up.clear.call(null);
var state_30847__$1 = state_30847;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30847__$1,(16),inst_30789);
} else {
if((state_val_30848 === (22))){
var inst_30806 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_30807 = figwheel.client.heads_up.append_warning_message.call(null,inst_30806);
var state_30847__$1 = state_30847;
var statearr_30862_30908 = state_30847__$1;
(statearr_30862_30908[(2)] = inst_30807);

(statearr_30862_30908[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30848 === (36))){
var inst_30833 = (state_30847[(2)]);
var state_30847__$1 = state_30847;
var statearr_30863_30909 = state_30847__$1;
(statearr_30863_30909[(2)] = inst_30833);

(statearr_30863_30909[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30848 === (29))){
var inst_30817 = (state_30847[(2)]);
var state_30847__$1 = state_30847;
var statearr_30864_30910 = state_30847__$1;
(statearr_30864_30910[(2)] = inst_30817);

(statearr_30864_30910[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30848 === (6))){
var inst_30770 = (state_30847[(7)]);
var state_30847__$1 = state_30847;
var statearr_30865_30911 = state_30847__$1;
(statearr_30865_30911[(2)] = inst_30770);

(statearr_30865_30911[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30848 === (28))){
var inst_30813 = (state_30847[(2)]);
var inst_30814 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_30815 = figwheel.client.heads_up.display_warning.call(null,inst_30814);
var state_30847__$1 = (function (){var statearr_30866 = state_30847;
(statearr_30866[(8)] = inst_30813);

return statearr_30866;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30847__$1,(29),inst_30815);
} else {
if((state_val_30848 === (25))){
var inst_30811 = figwheel.client.heads_up.clear.call(null);
var state_30847__$1 = state_30847;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30847__$1,(28),inst_30811);
} else {
if((state_val_30848 === (34))){
var inst_30828 = figwheel.client.heads_up.flash_loaded.call(null);
var state_30847__$1 = state_30847;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30847__$1,(37),inst_30828);
} else {
if((state_val_30848 === (17))){
var inst_30795 = (state_30847[(2)]);
var state_30847__$1 = state_30847;
var statearr_30867_30912 = state_30847__$1;
(statearr_30867_30912[(2)] = inst_30795);

(statearr_30867_30912[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30848 === (3))){
var inst_30787 = figwheel.client.compile_refail_state_QMARK_.call(null,msg_names);
var state_30847__$1 = state_30847;
if(cljs.core.truth_(inst_30787)){
var statearr_30868_30913 = state_30847__$1;
(statearr_30868_30913[(1)] = (13));

} else {
var statearr_30869_30914 = state_30847__$1;
(statearr_30869_30914[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30848 === (12))){
var inst_30783 = (state_30847[(2)]);
var state_30847__$1 = state_30847;
var statearr_30870_30915 = state_30847__$1;
(statearr_30870_30915[(2)] = inst_30783);

(statearr_30870_30915[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30848 === (2))){
var inst_30770 = (state_30847[(7)]);
var inst_30770__$1 = figwheel.client.autoload_QMARK_.call(null);
var state_30847__$1 = (function (){var statearr_30871 = state_30847;
(statearr_30871[(7)] = inst_30770__$1);

return statearr_30871;
})();
if(cljs.core.truth_(inst_30770__$1)){
var statearr_30872_30916 = state_30847__$1;
(statearr_30872_30916[(1)] = (5));

} else {
var statearr_30873_30917 = state_30847__$1;
(statearr_30873_30917[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30848 === (23))){
var inst_30809 = figwheel.client.rewarning_state_QMARK_.call(null,msg_names);
var state_30847__$1 = state_30847;
if(cljs.core.truth_(inst_30809)){
var statearr_30874_30918 = state_30847__$1;
(statearr_30874_30918[(1)] = (25));

} else {
var statearr_30875_30919 = state_30847__$1;
(statearr_30875_30919[(1)] = (26));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30848 === (35))){
var state_30847__$1 = state_30847;
var statearr_30876_30920 = state_30847__$1;
(statearr_30876_30920[(2)] = null);

(statearr_30876_30920[(1)] = (36));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30848 === (19))){
var inst_30804 = figwheel.client.warning_append_state_QMARK_.call(null,msg_names);
var state_30847__$1 = state_30847;
if(cljs.core.truth_(inst_30804)){
var statearr_30877_30921 = state_30847__$1;
(statearr_30877_30921[(1)] = (22));

} else {
var statearr_30878_30922 = state_30847__$1;
(statearr_30878_30922[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30848 === (11))){
var inst_30779 = (state_30847[(2)]);
var state_30847__$1 = state_30847;
var statearr_30879_30923 = state_30847__$1;
(statearr_30879_30923[(2)] = inst_30779);

(statearr_30879_30923[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30848 === (9))){
var inst_30781 = figwheel.client.heads_up.clear.call(null);
var state_30847__$1 = state_30847;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30847__$1,(12),inst_30781);
} else {
if((state_val_30848 === (5))){
var inst_30772 = new cljs.core.Keyword(null,"autoload","autoload",-354122500).cljs$core$IFn$_invoke$arity$1(opts);
var state_30847__$1 = state_30847;
var statearr_30880_30924 = state_30847__$1;
(statearr_30880_30924[(2)] = inst_30772);

(statearr_30880_30924[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30848 === (14))){
var inst_30797 = figwheel.client.compile_fail_state_QMARK_.call(null,msg_names);
var state_30847__$1 = state_30847;
if(cljs.core.truth_(inst_30797)){
var statearr_30881_30925 = state_30847__$1;
(statearr_30881_30925[(1)] = (18));

} else {
var statearr_30882_30926 = state_30847__$1;
(statearr_30882_30926[(1)] = (19));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30848 === (26))){
var inst_30819 = figwheel.client.warning_state_QMARK_.call(null,msg_names);
var state_30847__$1 = state_30847;
if(cljs.core.truth_(inst_30819)){
var statearr_30883_30927 = state_30847__$1;
(statearr_30883_30927[(1)] = (30));

} else {
var statearr_30884_30928 = state_30847__$1;
(statearr_30884_30928[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30848 === (16))){
var inst_30791 = (state_30847[(2)]);
var inst_30792 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_30793 = figwheel.client.heads_up.display_exception.call(null,inst_30792);
var state_30847__$1 = (function (){var statearr_30885 = state_30847;
(statearr_30885[(9)] = inst_30791);

return statearr_30885;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30847__$1,(17),inst_30793);
} else {
if((state_val_30848 === (30))){
var inst_30821 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_30822 = figwheel.client.heads_up.display_warning.call(null,inst_30821);
var state_30847__$1 = state_30847;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30847__$1,(33),inst_30822);
} else {
if((state_val_30848 === (10))){
var inst_30785 = (state_30847[(2)]);
var state_30847__$1 = state_30847;
var statearr_30886_30929 = state_30847__$1;
(statearr_30886_30929[(2)] = inst_30785);

(statearr_30886_30929[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30848 === (18))){
var inst_30799 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_30800 = figwheel.client.heads_up.display_exception.call(null,inst_30799);
var state_30847__$1 = state_30847;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30847__$1,(21),inst_30800);
} else {
if((state_val_30848 === (37))){
var inst_30830 = (state_30847[(2)]);
var state_30847__$1 = state_30847;
var statearr_30887_30930 = state_30847__$1;
(statearr_30887_30930[(2)] = inst_30830);

(statearr_30887_30930[(1)] = (36));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30848 === (8))){
var inst_30777 = figwheel.client.heads_up.flash_loaded.call(null);
var state_30847__$1 = state_30847;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30847__$1,(11),inst_30777);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__23027__auto__,msg_hist,msg_names,msg))
;
return ((function (switch__22962__auto__,c__23027__auto__,msg_hist,msg_names,msg){
return (function() {
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__22963__auto__ = null;
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__22963__auto____0 = (function (){
var statearr_30891 = [null,null,null,null,null,null,null,null,null,null];
(statearr_30891[(0)] = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__22963__auto__);

(statearr_30891[(1)] = (1));

return statearr_30891;
});
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__22963__auto____1 = (function (state_30847){
while(true){
var ret_value__22964__auto__ = (function (){try{while(true){
var result__22965__auto__ = switch__22962__auto__.call(null,state_30847);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22965__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22965__auto__;
}
break;
}
}catch (e30892){if((e30892 instanceof Object)){
var ex__22966__auto__ = e30892;
var statearr_30893_30931 = state_30847;
(statearr_30893_30931[(5)] = ex__22966__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_30847);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e30892;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22964__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__30932 = state_30847;
state_30847 = G__30932;
continue;
} else {
return ret_value__22964__auto__;
}
break;
}
});
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__22963__auto__ = function(state_30847){
switch(arguments.length){
case 0:
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__22963__auto____0.call(this);
case 1:
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__22963__auto____1.call(this,state_30847);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__22963__auto____0;
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__22963__auto____1;
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__22963__auto__;
})()
;})(switch__22962__auto__,c__23027__auto__,msg_hist,msg_names,msg))
})();
var state__23029__auto__ = (function (){var statearr_30894 = f__23028__auto__.call(null);
(statearr_30894[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__23027__auto__);

return statearr_30894;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23029__auto__);
});})(c__23027__auto__,msg_hist,msg_names,msg))
);

return c__23027__auto__;
});
figwheel.client.heads_up_plugin = (function figwheel$client$heads_up_plugin(opts){
var ch = cljs.core.async.chan.call(null);
figwheel.client.heads_up_config_options_STAR__STAR_ = opts;

var c__23027__auto___30995 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23027__auto___30995,ch){
return (function (){
var f__23028__auto__ = (function (){var switch__22962__auto__ = ((function (c__23027__auto___30995,ch){
return (function (state_30978){
var state_val_30979 = (state_30978[(1)]);
if((state_val_30979 === (1))){
var state_30978__$1 = state_30978;
var statearr_30980_30996 = state_30978__$1;
(statearr_30980_30996[(2)] = null);

(statearr_30980_30996[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30979 === (2))){
var state_30978__$1 = state_30978;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30978__$1,(4),ch);
} else {
if((state_val_30979 === (3))){
var inst_30976 = (state_30978[(2)]);
var state_30978__$1 = state_30978;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_30978__$1,inst_30976);
} else {
if((state_val_30979 === (4))){
var inst_30966 = (state_30978[(7)]);
var inst_30966__$1 = (state_30978[(2)]);
var state_30978__$1 = (function (){var statearr_30981 = state_30978;
(statearr_30981[(7)] = inst_30966__$1);

return statearr_30981;
})();
if(cljs.core.truth_(inst_30966__$1)){
var statearr_30982_30997 = state_30978__$1;
(statearr_30982_30997[(1)] = (5));

} else {
var statearr_30983_30998 = state_30978__$1;
(statearr_30983_30998[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30979 === (5))){
var inst_30966 = (state_30978[(7)]);
var inst_30968 = figwheel.client.heads_up_plugin_msg_handler.call(null,opts,inst_30966);
var state_30978__$1 = state_30978;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30978__$1,(8),inst_30968);
} else {
if((state_val_30979 === (6))){
var state_30978__$1 = state_30978;
var statearr_30984_30999 = state_30978__$1;
(statearr_30984_30999[(2)] = null);

(statearr_30984_30999[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30979 === (7))){
var inst_30974 = (state_30978[(2)]);
var state_30978__$1 = state_30978;
var statearr_30985_31000 = state_30978__$1;
(statearr_30985_31000[(2)] = inst_30974);

(statearr_30985_31000[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30979 === (8))){
var inst_30970 = (state_30978[(2)]);
var state_30978__$1 = (function (){var statearr_30986 = state_30978;
(statearr_30986[(8)] = inst_30970);

return statearr_30986;
})();
var statearr_30987_31001 = state_30978__$1;
(statearr_30987_31001[(2)] = null);

(statearr_30987_31001[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
});})(c__23027__auto___30995,ch))
;
return ((function (switch__22962__auto__,c__23027__auto___30995,ch){
return (function() {
var figwheel$client$heads_up_plugin_$_state_machine__22963__auto__ = null;
var figwheel$client$heads_up_plugin_$_state_machine__22963__auto____0 = (function (){
var statearr_30991 = [null,null,null,null,null,null,null,null,null];
(statearr_30991[(0)] = figwheel$client$heads_up_plugin_$_state_machine__22963__auto__);

(statearr_30991[(1)] = (1));

return statearr_30991;
});
var figwheel$client$heads_up_plugin_$_state_machine__22963__auto____1 = (function (state_30978){
while(true){
var ret_value__22964__auto__ = (function (){try{while(true){
var result__22965__auto__ = switch__22962__auto__.call(null,state_30978);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22965__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22965__auto__;
}
break;
}
}catch (e30992){if((e30992 instanceof Object)){
var ex__22966__auto__ = e30992;
var statearr_30993_31002 = state_30978;
(statearr_30993_31002[(5)] = ex__22966__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_30978);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e30992;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22964__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__31003 = state_30978;
state_30978 = G__31003;
continue;
} else {
return ret_value__22964__auto__;
}
break;
}
});
figwheel$client$heads_up_plugin_$_state_machine__22963__auto__ = function(state_30978){
switch(arguments.length){
case 0:
return figwheel$client$heads_up_plugin_$_state_machine__22963__auto____0.call(this);
case 1:
return figwheel$client$heads_up_plugin_$_state_machine__22963__auto____1.call(this,state_30978);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up_plugin_$_state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up_plugin_$_state_machine__22963__auto____0;
figwheel$client$heads_up_plugin_$_state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up_plugin_$_state_machine__22963__auto____1;
return figwheel$client$heads_up_plugin_$_state_machine__22963__auto__;
})()
;})(switch__22962__auto__,c__23027__auto___30995,ch))
})();
var state__23029__auto__ = (function (){var statearr_30994 = f__23028__auto__.call(null);
(statearr_30994[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__23027__auto___30995);

return statearr_30994;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23029__auto__);
});})(c__23027__auto___30995,ch))
);


figwheel.client.heads_up.ensure_container.call(null);

return ((function (ch){
return (function (msg_hist){
cljs.core.async.put_BANG_.call(null,ch,msg_hist);

return msg_hist;
});
;})(ch))
});
figwheel.client.enforce_project_plugin = (function figwheel$client$enforce_project_plugin(opts){
return (function (msg_hist){
if(((1) < cljs.core.count.call(null,cljs.core.set.call(null,cljs.core.keep.call(null,new cljs.core.Keyword(null,"project-id","project-id",206449307),cljs.core.take.call(null,(5),msg_hist)))))){
figwheel.client.socket.close_BANG_.call(null);

console.error("Figwheel: message received from different project. Shutting socket down.");

if(cljs.core.truth_(new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202).cljs$core$IFn$_invoke$arity$1(opts))){
var c__23027__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23027__auto__){
return (function (){
var f__23028__auto__ = (function (){var switch__22962__auto__ = ((function (c__23027__auto__){
return (function (state_31024){
var state_val_31025 = (state_31024[(1)]);
if((state_val_31025 === (1))){
var inst_31019 = cljs.core.async.timeout.call(null,(3000));
var state_31024__$1 = state_31024;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_31024__$1,(2),inst_31019);
} else {
if((state_val_31025 === (2))){
var inst_31021 = (state_31024[(2)]);
var inst_31022 = figwheel.client.heads_up.display_system_warning.call(null,"Connection from different project","Shutting connection down!!!!!");
var state_31024__$1 = (function (){var statearr_31026 = state_31024;
(statearr_31026[(7)] = inst_31021);

return statearr_31026;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_31024__$1,inst_31022);
} else {
return null;
}
}
});})(c__23027__auto__))
;
return ((function (switch__22962__auto__,c__23027__auto__){
return (function() {
var figwheel$client$enforce_project_plugin_$_state_machine__22963__auto__ = null;
var figwheel$client$enforce_project_plugin_$_state_machine__22963__auto____0 = (function (){
var statearr_31030 = [null,null,null,null,null,null,null,null];
(statearr_31030[(0)] = figwheel$client$enforce_project_plugin_$_state_machine__22963__auto__);

(statearr_31030[(1)] = (1));

return statearr_31030;
});
var figwheel$client$enforce_project_plugin_$_state_machine__22963__auto____1 = (function (state_31024){
while(true){
var ret_value__22964__auto__ = (function (){try{while(true){
var result__22965__auto__ = switch__22962__auto__.call(null,state_31024);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22965__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22965__auto__;
}
break;
}
}catch (e31031){if((e31031 instanceof Object)){
var ex__22966__auto__ = e31031;
var statearr_31032_31034 = state_31024;
(statearr_31032_31034[(5)] = ex__22966__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_31024);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e31031;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22964__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__31035 = state_31024;
state_31024 = G__31035;
continue;
} else {
return ret_value__22964__auto__;
}
break;
}
});
figwheel$client$enforce_project_plugin_$_state_machine__22963__auto__ = function(state_31024){
switch(arguments.length){
case 0:
return figwheel$client$enforce_project_plugin_$_state_machine__22963__auto____0.call(this);
case 1:
return figwheel$client$enforce_project_plugin_$_state_machine__22963__auto____1.call(this,state_31024);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$enforce_project_plugin_$_state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$enforce_project_plugin_$_state_machine__22963__auto____0;
figwheel$client$enforce_project_plugin_$_state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$enforce_project_plugin_$_state_machine__22963__auto____1;
return figwheel$client$enforce_project_plugin_$_state_machine__22963__auto__;
})()
;})(switch__22962__auto__,c__23027__auto__))
})();
var state__23029__auto__ = (function (){var statearr_31033 = f__23028__auto__.call(null);
(statearr_31033[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__23027__auto__);

return statearr_31033;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23029__auto__);
});})(c__23027__auto__))
);

return c__23027__auto__;
} else {
return null;
}
} else {
return null;
}
});
});
figwheel.client.enforce_figwheel_version_plugin = (function figwheel$client$enforce_figwheel_version_plugin(opts){
return (function (msg_hist){
var temp__4657__auto__ = new cljs.core.Keyword(null,"figwheel-version","figwheel-version",1409553832).cljs$core$IFn$_invoke$arity$1(cljs.core.first.call(null,msg_hist));
if(cljs.core.truth_(temp__4657__auto__)){
var figwheel_version = temp__4657__auto__;
if(cljs.core.not_EQ_.call(null,figwheel_version,figwheel.client._figwheel_version_)){
figwheel.client.socket.close_BANG_.call(null);

console.error("Figwheel: message received from different version of Figwheel.");

if(cljs.core.truth_(new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202).cljs$core$IFn$_invoke$arity$1(opts))){
var c__23027__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23027__auto__,figwheel_version,temp__4657__auto__){
return (function (){
var f__23028__auto__ = (function (){var switch__22962__auto__ = ((function (c__23027__auto__,figwheel_version,temp__4657__auto__){
return (function (state_31058){
var state_val_31059 = (state_31058[(1)]);
if((state_val_31059 === (1))){
var inst_31052 = cljs.core.async.timeout.call(null,(2000));
var state_31058__$1 = state_31058;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_31058__$1,(2),inst_31052);
} else {
if((state_val_31059 === (2))){
var inst_31054 = (state_31058[(2)]);
var inst_31055 = [cljs.core.str("Figwheel Client Version \""),cljs.core.str(figwheel.client._figwheel_version_),cljs.core.str("\" is not equal to "),cljs.core.str("Figwheel Sidecar Version \""),cljs.core.str(figwheel_version),cljs.core.str("\""),cljs.core.str(".  Shutting down Websocket Connection!")].join('');
var inst_31056 = figwheel.client.heads_up.display_system_warning.call(null,"Figwheel Client and Server have different versions!!",inst_31055);
var state_31058__$1 = (function (){var statearr_31060 = state_31058;
(statearr_31060[(7)] = inst_31054);

return statearr_31060;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_31058__$1,inst_31056);
} else {
return null;
}
}
});})(c__23027__auto__,figwheel_version,temp__4657__auto__))
;
return ((function (switch__22962__auto__,c__23027__auto__,figwheel_version,temp__4657__auto__){
return (function() {
var figwheel$client$enforce_figwheel_version_plugin_$_state_machine__22963__auto__ = null;
var figwheel$client$enforce_figwheel_version_plugin_$_state_machine__22963__auto____0 = (function (){
var statearr_31064 = [null,null,null,null,null,null,null,null];
(statearr_31064[(0)] = figwheel$client$enforce_figwheel_version_plugin_$_state_machine__22963__auto__);

(statearr_31064[(1)] = (1));

return statearr_31064;
});
var figwheel$client$enforce_figwheel_version_plugin_$_state_machine__22963__auto____1 = (function (state_31058){
while(true){
var ret_value__22964__auto__ = (function (){try{while(true){
var result__22965__auto__ = switch__22962__auto__.call(null,state_31058);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22965__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22965__auto__;
}
break;
}
}catch (e31065){if((e31065 instanceof Object)){
var ex__22966__auto__ = e31065;
var statearr_31066_31068 = state_31058;
(statearr_31066_31068[(5)] = ex__22966__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_31058);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e31065;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22964__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__31069 = state_31058;
state_31058 = G__31069;
continue;
} else {
return ret_value__22964__auto__;
}
break;
}
});
figwheel$client$enforce_figwheel_version_plugin_$_state_machine__22963__auto__ = function(state_31058){
switch(arguments.length){
case 0:
return figwheel$client$enforce_figwheel_version_plugin_$_state_machine__22963__auto____0.call(this);
case 1:
return figwheel$client$enforce_figwheel_version_plugin_$_state_machine__22963__auto____1.call(this,state_31058);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$enforce_figwheel_version_plugin_$_state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$enforce_figwheel_version_plugin_$_state_machine__22963__auto____0;
figwheel$client$enforce_figwheel_version_plugin_$_state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$enforce_figwheel_version_plugin_$_state_machine__22963__auto____1;
return figwheel$client$enforce_figwheel_version_plugin_$_state_machine__22963__auto__;
})()
;})(switch__22962__auto__,c__23027__auto__,figwheel_version,temp__4657__auto__))
})();
var state__23029__auto__ = (function (){var statearr_31067 = f__23028__auto__.call(null);
(statearr_31067[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__23027__auto__);

return statearr_31067;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23029__auto__);
});})(c__23027__auto__,figwheel_version,temp__4657__auto__))
);

return c__23027__auto__;
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
});
});
figwheel.client.default_on_jsload = cljs.core.identity;
figwheel.client.file_line_column = (function figwheel$client$file_line_column(p__31070){
var map__31074 = p__31070;
var map__31074__$1 = ((((!((map__31074 == null)))?((((map__31074.cljs$lang$protocol_mask$partition0$ & (64))) || (map__31074.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31074):map__31074);
var file = cljs.core.get.call(null,map__31074__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var line = cljs.core.get.call(null,map__31074__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column = cljs.core.get.call(null,map__31074__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var G__31076 = "";
var G__31076__$1 = (cljs.core.truth_(file)?[cljs.core.str(G__31076),cljs.core.str("file "),cljs.core.str(file)].join(''):G__31076);
var G__31076__$2 = (cljs.core.truth_(line)?[cljs.core.str(G__31076__$1),cljs.core.str(" at line "),cljs.core.str(line)].join(''):G__31076__$1);
if(cljs.core.truth_((function (){var and__20147__auto__ = line;
if(cljs.core.truth_(and__20147__auto__)){
return column;
} else {
return and__20147__auto__;
}
})())){
return [cljs.core.str(G__31076__$2),cljs.core.str(", column "),cljs.core.str(column)].join('');
} else {
return G__31076__$2;
}
});
figwheel.client.default_on_compile_fail = (function figwheel$client$default_on_compile_fail(p__31077){
var map__31084 = p__31077;
var map__31084__$1 = ((((!((map__31084 == null)))?((((map__31084.cljs$lang$protocol_mask$partition0$ & (64))) || (map__31084.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31084):map__31084);
var ed = map__31084__$1;
var formatted_exception = cljs.core.get.call(null,map__31084__$1,new cljs.core.Keyword(null,"formatted-exception","formatted-exception",-116489026));
var exception_data = cljs.core.get.call(null,map__31084__$1,new cljs.core.Keyword(null,"exception-data","exception-data",-512474886));
var cause = cljs.core.get.call(null,map__31084__$1,new cljs.core.Keyword(null,"cause","cause",231901252));
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: Compile Exception");

var seq__31086_31090 = cljs.core.seq.call(null,figwheel.client.format_messages.call(null,exception_data));
var chunk__31087_31091 = null;
var count__31088_31092 = (0);
var i__31089_31093 = (0);
while(true){
if((i__31089_31093 < count__31088_31092)){
var msg_31094 = cljs.core._nth.call(null,chunk__31087_31091,i__31089_31093);
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),msg_31094);

var G__31095 = seq__31086_31090;
var G__31096 = chunk__31087_31091;
var G__31097 = count__31088_31092;
var G__31098 = (i__31089_31093 + (1));
seq__31086_31090 = G__31095;
chunk__31087_31091 = G__31096;
count__31088_31092 = G__31097;
i__31089_31093 = G__31098;
continue;
} else {
var temp__4657__auto___31099 = cljs.core.seq.call(null,seq__31086_31090);
if(temp__4657__auto___31099){
var seq__31086_31100__$1 = temp__4657__auto___31099;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__31086_31100__$1)){
var c__20970__auto___31101 = cljs.core.chunk_first.call(null,seq__31086_31100__$1);
var G__31102 = cljs.core.chunk_rest.call(null,seq__31086_31100__$1);
var G__31103 = c__20970__auto___31101;
var G__31104 = cljs.core.count.call(null,c__20970__auto___31101);
var G__31105 = (0);
seq__31086_31090 = G__31102;
chunk__31087_31091 = G__31103;
count__31088_31092 = G__31104;
i__31089_31093 = G__31105;
continue;
} else {
var msg_31106 = cljs.core.first.call(null,seq__31086_31100__$1);
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),msg_31106);

var G__31107 = cljs.core.next.call(null,seq__31086_31100__$1);
var G__31108 = null;
var G__31109 = (0);
var G__31110 = (0);
seq__31086_31090 = G__31107;
chunk__31087_31091 = G__31108;
count__31088_31092 = G__31109;
i__31089_31093 = G__31110;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(cause)){
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),[cljs.core.str("Error on "),cljs.core.str(figwheel.client.file_line_column.call(null,ed))].join(''));
} else {
}

return ed;
});
figwheel.client.default_on_compile_warning = (function figwheel$client$default_on_compile_warning(p__31111){
var map__31114 = p__31111;
var map__31114__$1 = ((((!((map__31114 == null)))?((((map__31114.cljs$lang$protocol_mask$partition0$ & (64))) || (map__31114.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31114):map__31114);
var w = map__31114__$1;
var message = cljs.core.get.call(null,map__31114__$1,new cljs.core.Keyword(null,"message","message",-406056002));
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"warn","warn",-436710552),[cljs.core.str("Figwheel: Compile Warning - "),cljs.core.str(new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(message)),cljs.core.str(" in "),cljs.core.str(figwheel.client.file_line_column.call(null,message))].join(''));

return w;
});
figwheel.client.default_before_load = (function figwheel$client$default_before_load(files){
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: notified of file changes");

return files;
});
figwheel.client.default_on_cssload = (function figwheel$client$default_on_cssload(files){
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded CSS files");

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),cljs.core.pr_str.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),files)));

return files;
});
if(typeof figwheel.client.config_defaults !== 'undefined'){
} else {
figwheel.client.config_defaults = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"on-compile-warning","on-compile-warning",-1195585947),new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602),new cljs.core.Keyword(null,"reload-dependents","reload-dependents",-956865430),new cljs.core.Keyword(null,"on-compile-fail","on-compile-fail",728013036),new cljs.core.Keyword(null,"debug","debug",-1608172596),new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202),new cljs.core.Keyword(null,"websocket-url","websocket-url",-490444938),new cljs.core.Keyword(null,"before-jsload","before-jsload",-847513128),new cljs.core.Keyword(null,"load-warninged-code","load-warninged-code",-2030345223),new cljs.core.Keyword(null,"eval-fn","eval-fn",-1111644294),new cljs.core.Keyword(null,"retry-count","retry-count",1936122875),new cljs.core.Keyword(null,"autoload","autoload",-354122500),new cljs.core.Keyword(null,"on-cssload","on-cssload",1825432318)],[new cljs.core.Var(function(){return figwheel.client.default_on_compile_warning;},new cljs.core.Symbol("figwheel.client","default-on-compile-warning","figwheel.client/default-on-compile-warning",584144208,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[new cljs.core.Symbol(null,"figwheel.client","figwheel.client",-538710252,null),new cljs.core.Symbol(null,"default-on-compile-warning","default-on-compile-warning",-18911586,null),"public/js/out/figwheel/client.cljs",33,1,323,323,cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"keys","keys",1068423698),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"message","message",1234475525,null)], null),new cljs.core.Keyword(null,"as","as",1148689641),new cljs.core.Symbol(null,"w","w",1994700528,null)], null)], null)),null,(cljs.core.truth_(figwheel.client.default_on_compile_warning)?figwheel.client.default_on_compile_warning.cljs$lang$test:null)])),figwheel.client.default_on_jsload,true,new cljs.core.Var(function(){return figwheel.client.default_on_compile_fail;},new cljs.core.Symbol("figwheel.client","default-on-compile-fail","figwheel.client/default-on-compile-fail",1384826337,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[new cljs.core.Symbol(null,"figwheel.client","figwheel.client",-538710252,null),new cljs.core.Symbol(null,"default-on-compile-fail","default-on-compile-fail",-158814813,null),"public/js/out/figwheel/client.cljs",30,1,315,315,cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"keys","keys",1068423698),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"formatted-exception","formatted-exception",1524042501,null),new cljs.core.Symbol(null,"exception-data","exception-data",1128056641,null),new cljs.core.Symbol(null,"cause","cause",1872432779,null)], null),new cljs.core.Keyword(null,"as","as",1148689641),new cljs.core.Symbol(null,"ed","ed",2076825751,null)], null)], null)),null,(cljs.core.truth_(figwheel.client.default_on_compile_fail)?figwheel.client.default_on_compile_fail.cljs$lang$test:null)])),false,true,[cljs.core.str("ws://"),cljs.core.str((cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))?location.host:"localhost:3449")),cljs.core.str("/figwheel-ws")].join(''),figwheel.client.default_before_load,false,false,(100),true,figwheel.client.default_on_cssload]);
}
figwheel.client.handle_deprecated_jsload_callback = (function figwheel$client$handle_deprecated_jsload_callback(config){
if(cljs.core.truth_(new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369).cljs$core$IFn$_invoke$arity$1(config))){
return cljs.core.dissoc.call(null,cljs.core.assoc.call(null,config,new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602),new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369).cljs$core$IFn$_invoke$arity$1(config)),new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369));
} else {
return config;
}
});
figwheel.client.fill_url_template = (function figwheel$client$fill_url_template(config){
if(cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))){
return cljs.core.update_in.call(null,config,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"websocket-url","websocket-url",-490444938)], null),(function (x){
return clojure.string.replace.call(null,clojure.string.replace.call(null,x,"[[client-hostname]]",location.hostname),"[[client-port]]",location.port);
}));
} else {
return config;
}
});
figwheel.client.base_plugins = (function figwheel$client$base_plugins(system_options){
var base = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"enforce-project-plugin","enforce-project-plugin",959402899),figwheel.client.enforce_project_plugin,new cljs.core.Keyword(null,"enforce-figwheel-version-plugin","enforce-figwheel-version-plugin",-1916185220),figwheel.client.enforce_figwheel_version_plugin,new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733),figwheel.client.file_reloader_plugin,new cljs.core.Keyword(null,"comp-fail-warning-plugin","comp-fail-warning-plugin",634311),figwheel.client.compile_fail_warning_plugin,new cljs.core.Keyword(null,"css-reloader-plugin","css-reloader-plugin",2002032904),figwheel.client.css_reloader_plugin,new cljs.core.Keyword(null,"repl-plugin","repl-plugin",-1138952371),figwheel.client.repl_plugin], null);
var base__$1 = ((cljs.core.not.call(null,figwheel.client.utils.html_env_QMARK_.call(null)))?cljs.core.select_keys.call(null,base,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733),new cljs.core.Keyword(null,"comp-fail-warning-plugin","comp-fail-warning-plugin",634311),new cljs.core.Keyword(null,"repl-plugin","repl-plugin",-1138952371)], null)):base);
var base__$2 = ((new cljs.core.Keyword(null,"autoload","autoload",-354122500).cljs$core$IFn$_invoke$arity$1(system_options) === false)?cljs.core.dissoc.call(null,base__$1,new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733)):base__$1);
if(cljs.core.truth_((function (){var and__20147__auto__ = new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202).cljs$core$IFn$_invoke$arity$1(system_options);
if(cljs.core.truth_(and__20147__auto__)){
return figwheel.client.utils.html_env_QMARK_.call(null);
} else {
return and__20147__auto__;
}
})())){
return cljs.core.assoc.call(null,base__$2,new cljs.core.Keyword(null,"heads-up-display-plugin","heads-up-display-plugin",1745207501),figwheel.client.heads_up_plugin);
} else {
return base__$2;
}
});
figwheel.client.add_message_watch = (function figwheel$client$add_message_watch(key,callback){
return cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,key,(function (_,___$1,___$2,msg_hist){
return callback.call(null,cljs.core.first.call(null,msg_hist));
}));
});
figwheel.client.add_plugins = (function figwheel$client$add_plugins(plugins,system_options){
var seq__31126 = cljs.core.seq.call(null,plugins);
var chunk__31127 = null;
var count__31128 = (0);
var i__31129 = (0);
while(true){
if((i__31129 < count__31128)){
var vec__31130 = cljs.core._nth.call(null,chunk__31127,i__31129);
var k = cljs.core.nth.call(null,vec__31130,(0),null);
var plugin = cljs.core.nth.call(null,vec__31130,(1),null);
if(cljs.core.truth_(plugin)){
var pl_31136 = plugin.call(null,system_options);
cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,k,((function (seq__31126,chunk__31127,count__31128,i__31129,pl_31136,vec__31130,k,plugin){
return (function (_,___$1,___$2,msg_hist){
return pl_31136.call(null,msg_hist);
});})(seq__31126,chunk__31127,count__31128,i__31129,pl_31136,vec__31130,k,plugin))
);
} else {
}

var G__31137 = seq__31126;
var G__31138 = chunk__31127;
var G__31139 = count__31128;
var G__31140 = (i__31129 + (1));
seq__31126 = G__31137;
chunk__31127 = G__31138;
count__31128 = G__31139;
i__31129 = G__31140;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__31126);
if(temp__4657__auto__){
var seq__31126__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__31126__$1)){
var c__20970__auto__ = cljs.core.chunk_first.call(null,seq__31126__$1);
var G__31141 = cljs.core.chunk_rest.call(null,seq__31126__$1);
var G__31142 = c__20970__auto__;
var G__31143 = cljs.core.count.call(null,c__20970__auto__);
var G__31144 = (0);
seq__31126 = G__31141;
chunk__31127 = G__31142;
count__31128 = G__31143;
i__31129 = G__31144;
continue;
} else {
var vec__31133 = cljs.core.first.call(null,seq__31126__$1);
var k = cljs.core.nth.call(null,vec__31133,(0),null);
var plugin = cljs.core.nth.call(null,vec__31133,(1),null);
if(cljs.core.truth_(plugin)){
var pl_31145 = plugin.call(null,system_options);
cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,k,((function (seq__31126,chunk__31127,count__31128,i__31129,pl_31145,vec__31133,k,plugin,seq__31126__$1,temp__4657__auto__){
return (function (_,___$1,___$2,msg_hist){
return pl_31145.call(null,msg_hist);
});})(seq__31126,chunk__31127,count__31128,i__31129,pl_31145,vec__31133,k,plugin,seq__31126__$1,temp__4657__auto__))
);
} else {
}

var G__31146 = cljs.core.next.call(null,seq__31126__$1);
var G__31147 = null;
var G__31148 = (0);
var G__31149 = (0);
seq__31126 = G__31146;
chunk__31127 = G__31147;
count__31128 = G__31148;
i__31129 = G__31149;
continue;
}
} else {
return null;
}
}
break;
}
});
figwheel.client.start = (function figwheel$client$start(var_args){
var args31150 = [];
var len__21234__auto___31157 = arguments.length;
var i__21235__auto___31158 = (0);
while(true){
if((i__21235__auto___31158 < len__21234__auto___31157)){
args31150.push((arguments[i__21235__auto___31158]));

var G__31159 = (i__21235__auto___31158 + (1));
i__21235__auto___31158 = G__31159;
continue;
} else {
}
break;
}

var G__31152 = args31150.length;
switch (G__31152) {
case 1:
return figwheel.client.start.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 0:
return figwheel.client.start.cljs$core$IFn$_invoke$arity$0();

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args31150.length)].join('')));

}
});

figwheel.client.start.cljs$core$IFn$_invoke$arity$1 = (function (opts){
if((goog.dependencies_ == null)){
return null;
} else {
if(typeof figwheel.client.__figwheel_start_once__ !== 'undefined'){
return null;
} else {
figwheel.client.__figwheel_start_once__ = setTimeout((function (){
var plugins_SINGLEQUOTE_ = new cljs.core.Keyword(null,"plugins","plugins",1900073717).cljs$core$IFn$_invoke$arity$1(opts);
var merge_plugins = new cljs.core.Keyword(null,"merge-plugins","merge-plugins",-1193912370).cljs$core$IFn$_invoke$arity$1(opts);
var system_options = figwheel.client.fill_url_template.call(null,figwheel.client.handle_deprecated_jsload_callback.call(null,cljs.core.merge.call(null,figwheel.client.config_defaults,cljs.core.dissoc.call(null,opts,new cljs.core.Keyword(null,"plugins","plugins",1900073717),new cljs.core.Keyword(null,"merge-plugins","merge-plugins",-1193912370)))));
var plugins = (cljs.core.truth_(plugins_SINGLEQUOTE_)?plugins_SINGLEQUOTE_:cljs.core.merge.call(null,figwheel.client.base_plugins.call(null,system_options),merge_plugins));
figwheel.client.utils._STAR_print_debug_STAR_ = new cljs.core.Keyword(null,"debug","debug",-1608172596).cljs$core$IFn$_invoke$arity$1(opts);

figwheel.client.enable_repl_print_BANG_.call(null);

figwheel.client.add_plugins.call(null,plugins,system_options);

figwheel.client.file_reloading.patch_goog_base.call(null);

var seq__31153_31161 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"initial-messages","initial-messages",2057377771).cljs$core$IFn$_invoke$arity$1(system_options));
var chunk__31154_31162 = null;
var count__31155_31163 = (0);
var i__31156_31164 = (0);
while(true){
if((i__31156_31164 < count__31155_31163)){
var msg_31165 = cljs.core._nth.call(null,chunk__31154_31162,i__31156_31164);
figwheel.client.socket.handle_incoming_message.call(null,msg_31165);

var G__31166 = seq__31153_31161;
var G__31167 = chunk__31154_31162;
var G__31168 = count__31155_31163;
var G__31169 = (i__31156_31164 + (1));
seq__31153_31161 = G__31166;
chunk__31154_31162 = G__31167;
count__31155_31163 = G__31168;
i__31156_31164 = G__31169;
continue;
} else {
var temp__4657__auto___31170 = cljs.core.seq.call(null,seq__31153_31161);
if(temp__4657__auto___31170){
var seq__31153_31171__$1 = temp__4657__auto___31170;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__31153_31171__$1)){
var c__20970__auto___31172 = cljs.core.chunk_first.call(null,seq__31153_31171__$1);
var G__31173 = cljs.core.chunk_rest.call(null,seq__31153_31171__$1);
var G__31174 = c__20970__auto___31172;
var G__31175 = cljs.core.count.call(null,c__20970__auto___31172);
var G__31176 = (0);
seq__31153_31161 = G__31173;
chunk__31154_31162 = G__31174;
count__31155_31163 = G__31175;
i__31156_31164 = G__31176;
continue;
} else {
var msg_31177 = cljs.core.first.call(null,seq__31153_31171__$1);
figwheel.client.socket.handle_incoming_message.call(null,msg_31177);

var G__31178 = cljs.core.next.call(null,seq__31153_31171__$1);
var G__31179 = null;
var G__31180 = (0);
var G__31181 = (0);
seq__31153_31161 = G__31178;
chunk__31154_31162 = G__31179;
count__31155_31163 = G__31180;
i__31156_31164 = G__31181;
continue;
}
} else {
}
}
break;
}

return figwheel.client.socket.open.call(null,system_options);
}));
}
}
});

figwheel.client.start.cljs$core$IFn$_invoke$arity$0 = (function (){
return figwheel.client.start.call(null,cljs.core.PersistentArrayMap.EMPTY);
});

figwheel.client.start.cljs$lang$maxFixedArity = 1;

figwheel.client.watch_and_reload_with_opts = figwheel.client.start;
figwheel.client.watch_and_reload = (function figwheel$client$watch_and_reload(var_args){
var args__21241__auto__ = [];
var len__21234__auto___31186 = arguments.length;
var i__21235__auto___31187 = (0);
while(true){
if((i__21235__auto___31187 < len__21234__auto___31186)){
args__21241__auto__.push((arguments[i__21235__auto___31187]));

var G__31188 = (i__21235__auto___31187 + (1));
i__21235__auto___31187 = G__31188;
continue;
} else {
}
break;
}

var argseq__21242__auto__ = ((((0) < args__21241__auto__.length))?(new cljs.core.IndexedSeq(args__21241__auto__.slice((0)),(0),null)):null);
return figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic(argseq__21242__auto__);
});

figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic = (function (p__31183){
var map__31184 = p__31183;
var map__31184__$1 = ((((!((map__31184 == null)))?((((map__31184.cljs$lang$protocol_mask$partition0$ & (64))) || (map__31184.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31184):map__31184);
var opts = map__31184__$1;
return figwheel.client.start.call(null,opts);
});

figwheel.client.watch_and_reload.cljs$lang$maxFixedArity = (0);

figwheel.client.watch_and_reload.cljs$lang$applyTo = (function (seq31182){
return figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq31182));
});

figwheel.client.fetch_data_from_env = (function figwheel$client$fetch_data_from_env(){
try{return cljs.reader.read_string.call(null,goog.object.get(window,"FIGWHEEL_CLIENT_CONFIGURATION"));
}catch (e31190){if((e31190 instanceof Error)){
var e = e31190;
cljs.core._STAR_print_err_fn_STAR_.call(null,"Unable to load FIGWHEEL_CLIENT_CONFIGURATION from the environment");

return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"autoload","autoload",-354122500),false], null);
} else {
throw e31190;

}
}});
figwheel.client.console_intro_message = "Figwheel has compiled a temporary helper application to your :output-file.\n\nThe code currently in your configured output file does not\nrepresent the code that you are trying to compile.\n\nThis temporary application is intended to help you continue to get\nfeedback from Figwheel until the build you are working on compiles\ncorrectly.\n\nWhen your ClojureScript source code compiles correctly this helper\napplication will auto-reload and pick up your freshly compiled\nClojureScript program.";
figwheel.client.bad_compile_helper_app = (function figwheel$client$bad_compile_helper_app(){
cljs.core.enable_console_print_BANG_.call(null);

var config = figwheel.client.fetch_data_from_env.call(null);
cljs.core.println.call(null,figwheel.client.console_intro_message);

figwheel.client.heads_up.bad_compile_screen.call(null);

if(cljs.core.truth_(goog.dependencies_)){
} else {
goog.dependencies_ = true;
}

figwheel.client.start.call(null,config);

return figwheel.client.add_message_watch.call(null,new cljs.core.Keyword(null,"listen-for-successful-compile","listen-for-successful-compile",-995277603),((function (config){
return (function (p__31194){
var map__31195 = p__31194;
var map__31195__$1 = ((((!((map__31195 == null)))?((((map__31195.cljs$lang$protocol_mask$partition0$ & (64))) || (map__31195.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31195):map__31195);
var msg_name = cljs.core.get.call(null,map__31195__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
if(cljs.core._EQ_.call(null,msg_name,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563))){
return location.href = location.href;
} else {
return null;
}
});})(config))
);
});

//# sourceMappingURL=client.js.map?rel=1499477035541