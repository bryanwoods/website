// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('reagent.debug');
goog.require('cljs.core');
reagent.debug.has_console = typeof console !== 'undefined';
reagent.debug.tracking = false;
if(typeof reagent.debug.warnings !== 'undefined'){
} else {
reagent.debug.warnings = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null) : cljs.core.atom.call(null,null));
}
if(typeof reagent.debug.track_console !== 'undefined'){
} else {
reagent.debug.track_console = (function (){var o = ({});
o.warn = ((function (o){
return (function() { 
var G__9233__delegate = function (args){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$warn], null),cljs.core.conj,cljs.core.array_seq([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,args)], 0));
};
var G__9233 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__9234__i = 0, G__9234__a = new Array(arguments.length -  0);
while (G__9234__i < G__9234__a.length) {G__9234__a[G__9234__i] = arguments[G__9234__i + 0]; ++G__9234__i;}
  args = new cljs.core.IndexedSeq(G__9234__a,0);
} 
return G__9233__delegate.call(this,args);};
G__9233.cljs$lang$maxFixedArity = 0;
G__9233.cljs$lang$applyTo = (function (arglist__9235){
var args = cljs.core.seq(arglist__9235);
return G__9233__delegate(args);
});
G__9233.cljs$core$IFn$_invoke$arity$variadic = G__9233__delegate;
return G__9233;
})()
;})(o))
;

o.error = ((function (o){
return (function() { 
var G__9236__delegate = function (args){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$error], null),cljs.core.conj,cljs.core.array_seq([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,args)], 0));
};
var G__9236 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__9237__i = 0, G__9237__a = new Array(arguments.length -  0);
while (G__9237__i < G__9237__a.length) {G__9237__a[G__9237__i] = arguments[G__9237__i + 0]; ++G__9237__i;}
  args = new cljs.core.IndexedSeq(G__9237__a,0);
} 
return G__9236__delegate.call(this,args);};
G__9236.cljs$lang$maxFixedArity = 0;
G__9236.cljs$lang$applyTo = (function (arglist__9238){
var args = cljs.core.seq(arglist__9238);
return G__9236__delegate(args);
});
G__9236.cljs$core$IFn$_invoke$arity$variadic = G__9236__delegate;
return G__9236;
})()
;})(o))
;

return o;
})();
}
reagent.debug.track_warnings = (function reagent$debug$track_warnings(f){
reagent.debug.tracking = true;

(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(reagent.debug.warnings,null) : cljs.core.reset_BANG_.call(null,reagent.debug.warnings,null));

(f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null));

var warns = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(reagent.debug.warnings) : cljs.core.deref.call(null,reagent.debug.warnings));
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(reagent.debug.warnings,null) : cljs.core.reset_BANG_.call(null,reagent.debug.warnings,null));

reagent.debug.tracking = false;

return warns;
});
