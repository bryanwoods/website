// Compiled by ClojureScript 1.9.229 {}
goog.provide('reagent.debug');
goog.require('cljs.core');
reagent.debug.has_console = typeof console !== 'undefined';
reagent.debug.tracking = false;
if(typeof reagent.debug.warnings !== 'undefined'){
} else {
reagent.debug.warnings = cljs.core.atom.call(null,null);
}
if(typeof reagent.debug.track_console !== 'undefined'){
} else {
reagent.debug.track_console = (function (){var o = ({});
o.warn = ((function (o){
return (function() { 
var G__21487__delegate = function (args){
return cljs.core.swap_BANG_.call(null,reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"warn","warn",-436710552)], null),cljs.core.conj,cljs.core.apply.call(null,cljs.core.str,args));
};
var G__21487 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__21488__i = 0, G__21488__a = new Array(arguments.length -  0);
while (G__21488__i < G__21488__a.length) {G__21488__a[G__21488__i] = arguments[G__21488__i + 0]; ++G__21488__i;}
  args = new cljs.core.IndexedSeq(G__21488__a,0);
} 
return G__21487__delegate.call(this,args);};
G__21487.cljs$lang$maxFixedArity = 0;
G__21487.cljs$lang$applyTo = (function (arglist__21489){
var args = cljs.core.seq(arglist__21489);
return G__21487__delegate(args);
});
G__21487.cljs$core$IFn$_invoke$arity$variadic = G__21487__delegate;
return G__21487;
})()
;})(o))
;

o.error = ((function (o){
return (function() { 
var G__21490__delegate = function (args){
return cljs.core.swap_BANG_.call(null,reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"error","error",-978969032)], null),cljs.core.conj,cljs.core.apply.call(null,cljs.core.str,args));
};
var G__21490 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__21491__i = 0, G__21491__a = new Array(arguments.length -  0);
while (G__21491__i < G__21491__a.length) {G__21491__a[G__21491__i] = arguments[G__21491__i + 0]; ++G__21491__i;}
  args = new cljs.core.IndexedSeq(G__21491__a,0);
} 
return G__21490__delegate.call(this,args);};
G__21490.cljs$lang$maxFixedArity = 0;
G__21490.cljs$lang$applyTo = (function (arglist__21492){
var args = cljs.core.seq(arglist__21492);
return G__21490__delegate(args);
});
G__21490.cljs$core$IFn$_invoke$arity$variadic = G__21490__delegate;
return G__21490;
})()
;})(o))
;

return o;
})();
}
reagent.debug.track_warnings = (function reagent$debug$track_warnings(f){
reagent.debug.tracking = true;

cljs.core.reset_BANG_.call(null,reagent.debug.warnings,null);

f.call(null);

var warns = cljs.core.deref.call(null,reagent.debug.warnings);
cljs.core.reset_BANG_.call(null,reagent.debug.warnings,null);

reagent.debug.tracking = false;

return warns;
});

//# sourceMappingURL=debug.js.map?rel=1499477027282