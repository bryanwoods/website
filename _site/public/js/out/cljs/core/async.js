// Compiled by ClojureScript 1.9.229 {}
goog.provide('cljs.core.async');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.ioc_helpers');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.timers');
cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(var_args){
var args23072 = [];
var len__21234__auto___23078 = arguments.length;
var i__21235__auto___23079 = (0);
while(true){
if((i__21235__auto___23079 < len__21234__auto___23078)){
args23072.push((arguments[i__21235__auto___23079]));

var G__23080 = (i__21235__auto___23079 + (1));
i__21235__auto___23079 = G__23080;
continue;
} else {
}
break;
}

var G__23074 = args23072.length;
switch (G__23074) {
case 1:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args23072.length)].join('')));

}
});

cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1 = (function (f){
return cljs.core.async.fn_handler.call(null,f,true);
});

cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2 = (function (f,blockable){
if(typeof cljs.core.async.t_cljs$core$async23075 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async23075 = (function (f,blockable,meta23076){
this.f = f;
this.blockable = blockable;
this.meta23076 = meta23076;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async23075.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_23077,meta23076__$1){
var self__ = this;
var _23077__$1 = this;
return (new cljs.core.async.t_cljs$core$async23075(self__.f,self__.blockable,meta23076__$1));
});

cljs.core.async.t_cljs$core$async23075.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_23077){
var self__ = this;
var _23077__$1 = this;
return self__.meta23076;
});

cljs.core.async.t_cljs$core$async23075.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async23075.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t_cljs$core$async23075.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
});

cljs.core.async.t_cljs$core$async23075.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
});

cljs.core.async.t_cljs$core$async23075.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"blockable","blockable",-28395259,null),new cljs.core.Symbol(null,"meta23076","meta23076",-395186770,null)], null);
});

cljs.core.async.t_cljs$core$async23075.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async23075.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async23075";

cljs.core.async.t_cljs$core$async23075.cljs$lang$ctorPrWriter = (function (this__20765__auto__,writer__20766__auto__,opt__20767__auto__){
return cljs.core._write.call(null,writer__20766__auto__,"cljs.core.async/t_cljs$core$async23075");
});

cljs.core.async.__GT_t_cljs$core$async23075 = (function cljs$core$async$__GT_t_cljs$core$async23075(f__$1,blockable__$1,meta23076){
return (new cljs.core.async.t_cljs$core$async23075(f__$1,blockable__$1,meta23076));
});

}

return (new cljs.core.async.t_cljs$core$async23075(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
});

cljs.core.async.fn_handler.cljs$lang$maxFixedArity = 2;

/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 *   val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 *   buffered, but oldest elements in buffer will be dropped (not
 *   transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer.call(null,n);
});
/**
 * Returns true if a channel created with buff will never block. That is to say,
 * puts into this buffer will never cause the buffer to be full. 
 */
cljs.core.async.unblocking_buffer_QMARK_ = (function cljs$core$async$unblocking_buffer_QMARK_(buff){
if(!((buff == null))){
if((false) || (buff.cljs$core$async$impl$protocols$UnblockingBuffer$)){
return true;
} else {
if((!buff.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,buff);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,buff);
}
});
/**
 * Creates a channel with an optional buffer, an optional transducer (like (map f),
 *   (filter p) etc or a composition thereof), and an optional exception handler.
 *   If buf-or-n is a number, will create and use a fixed buffer of that size. If a
 *   transducer is supplied a buffer must be specified. ex-handler must be a
 *   fn of one argument - if an exception occurs during transformation it will be called
 *   with the thrown value as an argument, and any non-nil return value will be placed
 *   in the channel.
 */
cljs.core.async.chan = (function cljs$core$async$chan(var_args){
var args23084 = [];
var len__21234__auto___23087 = arguments.length;
var i__21235__auto___23088 = (0);
while(true){
if((i__21235__auto___23088 < len__21234__auto___23087)){
args23084.push((arguments[i__21235__auto___23088]));

var G__23089 = (i__21235__auto___23088 + (1));
i__21235__auto___23088 = G__23089;
continue;
} else {
}
break;
}

var G__23086 = args23084.length;
switch (G__23086) {
case 0:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args23084.length)].join('')));

}
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.chan.call(null,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1 = (function (buf_or_n){
return cljs.core.async.chan.call(null,buf_or_n,null,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2 = (function (buf_or_n,xform){
return cljs.core.async.chan.call(null,buf_or_n,xform,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3 = (function (buf_or_n,xform,ex_handler){
var buf_or_n__$1 = ((cljs.core._EQ_.call(null,buf_or_n,(0)))?null:buf_or_n);
if(cljs.core.truth_(xform)){
if(cljs.core.truth_(buf_or_n__$1)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("buffer must be supplied when transducer is"),cljs.core.str("\n"),cljs.core.str("buf-or-n")].join('')));
}
} else {
}

return cljs.core.async.impl.channels.chan.call(null,((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer.call(null,buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
});

cljs.core.async.chan.cljs$lang$maxFixedArity = 3;

/**
 * Creates a promise channel with an optional transducer, and an optional
 *   exception-handler. A promise channel can take exactly one value that consumers
 *   will receive. Once full, puts complete but val is dropped (no transfer).
 *   Consumers will block until either a value is placed in the channel or the
 *   channel is closed. See chan for the semantics of xform and ex-handler.
 */
cljs.core.async.promise_chan = (function cljs$core$async$promise_chan(var_args){
var args23091 = [];
var len__21234__auto___23094 = arguments.length;
var i__21235__auto___23095 = (0);
while(true){
if((i__21235__auto___23095 < len__21234__auto___23094)){
args23091.push((arguments[i__21235__auto___23095]));

var G__23096 = (i__21235__auto___23095 + (1));
i__21235__auto___23095 = G__23096;
continue;
} else {
}
break;
}

var G__23093 = args23091.length;
switch (G__23093) {
case 0:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args23091.length)].join('')));

}
});

cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.promise_chan.call(null,null);
});

cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1 = (function (xform){
return cljs.core.async.promise_chan.call(null,xform,null);
});

cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2 = (function (xform,ex_handler){
return cljs.core.async.chan.call(null,cljs.core.async.impl.buffers.promise_buffer.call(null),xform,ex_handler);
});

cljs.core.async.promise_chan.cljs$lang$maxFixedArity = 2;

/**
 * Returns a channel that will close after msecs
 */
cljs.core.async.timeout = (function cljs$core$async$timeout(msecs){
return cljs.core.async.impl.timers.timeout.call(null,msecs);
});
/**
 * takes a val from port. Must be called inside a (go ...) block. Will
 *   return nil if closed. Will park if nothing is available.
 *   Returns true unless port is already closed
 */
cljs.core.async._LT__BANG_ = (function cljs$core$async$_LT__BANG_(port){
throw (new Error("<! used not in (go ...) block"));
});
/**
 * Asynchronously takes a val from port, passing to fn1. Will pass nil
 * if closed. If on-caller? (default true) is true, and value is
 * immediately available, will call fn1 on calling thread.
 * Returns nil.
 */
cljs.core.async.take_BANG_ = (function cljs$core$async$take_BANG_(var_args){
var args23098 = [];
var len__21234__auto___23101 = arguments.length;
var i__21235__auto___23102 = (0);
while(true){
if((i__21235__auto___23102 < len__21234__auto___23101)){
args23098.push((arguments[i__21235__auto___23102]));

var G__23103 = (i__21235__auto___23102 + (1));
i__21235__auto___23102 = G__23103;
continue;
} else {
}
break;
}

var G__23100 = args23098.length;
switch (G__23100) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args23098.length)].join('')));

}
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.call(null,port,fn1,true);
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(ret)){
var val_23105 = cljs.core.deref.call(null,ret);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,val_23105);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (val_23105,ret){
return (function (){
return fn1.call(null,val_23105);
});})(val_23105,ret))
);
}
} else {
}

return null;
});

cljs.core.async.take_BANG_.cljs$lang$maxFixedArity = 3;

cljs.core.async.nop = (function cljs$core$async$nop(_){
return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.call(null,cljs.core.async.nop);
/**
 * puts a val into port. nil values are not allowed. Must be called
 *   inside a (go ...) block. Will park if no buffer space is available.
 *   Returns true unless port is already closed.
 */
cljs.core.async._GT__BANG_ = (function cljs$core$async$_GT__BANG_(port,val){
throw (new Error(">! used not in (go ...) block"));
});
/**
 * Asynchronously puts a val into port, calling fn0 (if supplied) when
 * complete. nil values are not allowed. Will throw if closed. If
 * on-caller? (default true) is true, and the put is immediately
 * accepted, will call fn0 on calling thread.  Returns nil.
 */
cljs.core.async.put_BANG_ = (function cljs$core$async$put_BANG_(var_args){
var args23106 = [];
var len__21234__auto___23109 = arguments.length;
var i__21235__auto___23110 = (0);
while(true){
if((i__21235__auto___23110 < len__21234__auto___23109)){
args23106.push((arguments[i__21235__auto___23110]));

var G__23111 = (i__21235__auto___23110 + (1));
i__21235__auto___23110 = G__23111;
continue;
} else {
}
break;
}

var G__23108 = args23106.length;
switch (G__23108) {
case 2:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args23106.length)].join('')));

}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,val){
var temp__4655__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__4655__auto__)){
var ret = temp__4655__auto__;
return cljs.core.deref.call(null,ret);
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.call(null,port,val,fn1,true);
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__4655__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(temp__4655__auto__)){
var retb = temp__4655__auto__;
var ret = cljs.core.deref.call(null,retb);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,ret);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (ret,retb,temp__4655__auto__){
return (function (){
return fn1.call(null,ret);
});})(ret,retb,temp__4655__auto__))
);
}

return ret;
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$lang$maxFixedArity = 4;

cljs.core.async.close_BANG_ = (function cljs$core$async$close_BANG_(port){
return cljs.core.async.impl.protocols.close_BANG_.call(null,port);
});
cljs.core.async.random_array = (function cljs$core$async$random_array(n){
var a = (new Array(n));
var n__21074__auto___23113 = n;
var x_23114 = (0);
while(true){
if((x_23114 < n__21074__auto___23113)){
(a[x_23114] = (0));

var G__23115 = (x_23114 + (1));
x_23114 = G__23115;
continue;
} else {
}
break;
}

var i = (1);
while(true){
if(cljs.core._EQ_.call(null,i,n)){
return a;
} else {
var j = cljs.core.rand_int.call(null,i);
(a[i] = (a[j]));

(a[j] = i);

var G__23116 = (i + (1));
i = G__23116;
continue;
}
break;
}
});
cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.call(null,true);
if(typeof cljs.core.async.t_cljs$core$async23120 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async23120 = (function (alt_flag,flag,meta23121){
this.alt_flag = alt_flag;
this.flag = flag;
this.meta23121 = meta23121;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async23120.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (flag){
return (function (_23122,meta23121__$1){
var self__ = this;
var _23122__$1 = this;
return (new cljs.core.async.t_cljs$core$async23120(self__.alt_flag,self__.flag,meta23121__$1));
});})(flag))
;

cljs.core.async.t_cljs$core$async23120.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (flag){
return (function (_23122){
var self__ = this;
var _23122__$1 = this;
return self__.meta23121;
});})(flag))
;

cljs.core.async.t_cljs$core$async23120.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async23120.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref.call(null,self__.flag);
});})(flag))
;

cljs.core.async.t_cljs$core$async23120.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return true;
});})(flag))
;

cljs.core.async.t_cljs$core$async23120.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.flag,null);

return true;
});})(flag))
;

cljs.core.async.t_cljs$core$async23120.getBasis = ((function (flag){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"alt-flag","alt-flag",-1794972754,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(cljs.core.PersistentVector.EMPTY))], null)),new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta23121","meta23121",-2105680789,null)], null);
});})(flag))
;

cljs.core.async.t_cljs$core$async23120.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async23120.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async23120";

cljs.core.async.t_cljs$core$async23120.cljs$lang$ctorPrWriter = ((function (flag){
return (function (this__20765__auto__,writer__20766__auto__,opt__20767__auto__){
return cljs.core._write.call(null,writer__20766__auto__,"cljs.core.async/t_cljs$core$async23120");
});})(flag))
;

cljs.core.async.__GT_t_cljs$core$async23120 = ((function (flag){
return (function cljs$core$async$alt_flag_$___GT_t_cljs$core$async23120(alt_flag__$1,flag__$1,meta23121){
return (new cljs.core.async.t_cljs$core$async23120(alt_flag__$1,flag__$1,meta23121));
});})(flag))
;

}

return (new cljs.core.async.t_cljs$core$async23120(cljs$core$async$alt_flag,flag,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
if(typeof cljs.core.async.t_cljs$core$async23126 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async23126 = (function (alt_handler,flag,cb,meta23127){
this.alt_handler = alt_handler;
this.flag = flag;
this.cb = cb;
this.meta23127 = meta23127;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async23126.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_23128,meta23127__$1){
var self__ = this;
var _23128__$1 = this;
return (new cljs.core.async.t_cljs$core$async23126(self__.alt_handler,self__.flag,self__.cb,meta23127__$1));
});

cljs.core.async.t_cljs$core$async23126.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_23128){
var self__ = this;
var _23128__$1 = this;
return self__.meta23127;
});

cljs.core.async.t_cljs$core$async23126.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async23126.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});

cljs.core.async.t_cljs$core$async23126.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t_cljs$core$async23126.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit.call(null,self__.flag);

return self__.cb;
});

cljs.core.async.t_cljs$core$async23126.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"alt-handler","alt-handler",963786170,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null)], null)))], null)),new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta23127","meta23127",675899710,null)], null);
});

cljs.core.async.t_cljs$core$async23126.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async23126.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async23126";

cljs.core.async.t_cljs$core$async23126.cljs$lang$ctorPrWriter = (function (this__20765__auto__,writer__20766__auto__,opt__20767__auto__){
return cljs.core._write.call(null,writer__20766__auto__,"cljs.core.async/t_cljs$core$async23126");
});

cljs.core.async.__GT_t_cljs$core$async23126 = (function cljs$core$async$alt_handler_$___GT_t_cljs$core$async23126(alt_handler__$1,flag__$1,cb__$1,meta23127){
return (new cljs.core.async.t_cljs$core$async23126(alt_handler__$1,flag__$1,cb__$1,meta23127));
});

}

return (new cljs.core.async.t_cljs$core$async23126(cljs$core$async$alt_handler,flag,cb,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * returns derefable [val port] if immediate, nil if enqueued
 */
cljs.core.async.do_alts = (function cljs$core$async$do_alts(fret,ports,opts){
var flag = cljs.core.async.alt_flag.call(null);
var n = cljs.core.count.call(null,ports);
var idxs = cljs.core.async.random_array.call(null,n);
var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.call(null,ports,idx);
var wport = ((cljs.core.vector_QMARK_.call(null,port))?port.call(null,(0)):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = port.call(null,(1));
return cljs.core.async.impl.protocols.put_BANG_.call(null,wport,val,cljs.core.async.alt_handler.call(null,flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__23129_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__23129_SHARP_,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__23130_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__23130_SHARP_,port], null));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref.call(null,vbox),(function (){var or__20159__auto__ = wport;
if(cljs.core.truth_(or__20159__auto__)){
return or__20159__auto__;
} else {
return port;
}
})()], null));
} else {
var G__23131 = (i + (1));
i = G__23131;
continue;
}
} else {
return null;
}
break;
}
})();
var or__20159__auto__ = ret;
if(cljs.core.truth_(or__20159__auto__)){
return or__20159__auto__;
} else {
if(cljs.core.contains_QMARK_.call(null,opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__4657__auto__ = (function (){var and__20147__auto__ = cljs.core.async.impl.protocols.active_QMARK_.call(null,flag);
if(cljs.core.truth_(and__20147__auto__)){
return cljs.core.async.impl.protocols.commit.call(null,flag);
} else {
return and__20147__auto__;
}
})();
if(cljs.core.truth_(temp__4657__auto__)){
var got = temp__4657__auto__;
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Completes at most one of several channel operations. Must be called
 * inside a (go ...) block. ports is a vector of channel endpoints,
 * which can be either a channel to take from or a vector of
 *   [channel-to-put-to val-to-put], in any combination. Takes will be
 *   made as if by <!, and puts will be made as if by >!. Unless
 *   the :priority option is true, if more than one port operation is
 *   ready a non-deterministic choice will be made. If no operation is
 *   ready and a :default value is supplied, [default-val :default] will
 *   be returned, otherwise alts! will park until the first operation to
 *   become ready completes. Returns [val port] of the completed
 *   operation, where val is the value taken for takes, and a
 *   boolean (true unless already closed, as per put!) for puts.
 * 
 *   opts are passed as :key val ... Supported options:
 * 
 *   :default val - the value to use if none of the operations are immediately ready
 *   :priority true - (default nil) when true, the operations will be tried in order.
 * 
 *   Note: there is no guarantee that the port exps or val exprs will be
 *   used, nor in what order should they be, so they should not be
 *   depended upon for side effects.
 */
cljs.core.async.alts_BANG_ = (function cljs$core$async$alts_BANG_(var_args){
var args__21241__auto__ = [];
var len__21234__auto___23137 = arguments.length;
var i__21235__auto___23138 = (0);
while(true){
if((i__21235__auto___23138 < len__21234__auto___23137)){
args__21241__auto__.push((arguments[i__21235__auto___23138]));

var G__23139 = (i__21235__auto___23138 + (1));
i__21235__auto___23138 = G__23139;
continue;
} else {
}
break;
}

var argseq__21242__auto__ = ((((1) < args__21241__auto__.length))?(new cljs.core.IndexedSeq(args__21241__auto__.slice((1)),(0),null)):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__21242__auto__);
});

cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__23134){
var map__23135 = p__23134;
var map__23135__$1 = ((((!((map__23135 == null)))?((((map__23135.cljs$lang$protocol_mask$partition0$ & (64))) || (map__23135.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__23135):map__23135);
var opts = map__23135__$1;
throw (new Error("alts! used not in (go ...) block"));
});

cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1);

cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq23132){
var G__23133 = cljs.core.first.call(null,seq23132);
var seq23132__$1 = cljs.core.next.call(null,seq23132);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__23133,seq23132__$1);
});

/**
 * Puts a val into port if it's possible to do so immediately.
 *   nil values are not allowed. Never blocks. Returns true if offer succeeds.
 */
cljs.core.async.offer_BANG_ = (function cljs$core$async$offer_BANG_(port,val){
var ret = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref.call(null,ret);
} else {
return null;
}
});
/**
 * Takes a val from port if it's possible to do so immediately.
 *   Never blocks. Returns value if successful, nil otherwise.
 */
cljs.core.async.poll_BANG_ = (function cljs$core$async$poll_BANG_(port){
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref.call(null,ret);
} else {
return null;
}
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(var_args){
var args23140 = [];
var len__21234__auto___23190 = arguments.length;
var i__21235__auto___23191 = (0);
while(true){
if((i__21235__auto___23191 < len__21234__auto___23190)){
args23140.push((arguments[i__21235__auto___23191]));

var G__23192 = (i__21235__auto___23191 + (1));
i__21235__auto___23191 = G__23192;
continue;
} else {
}
break;
}

var G__23142 = args23140.length;
switch (G__23142) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args23140.length)].join('')));

}
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.call(null,from,to,true);
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__23027__auto___23194 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23027__auto___23194){
return (function (){
var f__23028__auto__ = (function (){var switch__22962__auto__ = ((function (c__23027__auto___23194){
return (function (state_23166){
var state_val_23167 = (state_23166[(1)]);
if((state_val_23167 === (7))){
var inst_23162 = (state_23166[(2)]);
var state_23166__$1 = state_23166;
var statearr_23168_23195 = state_23166__$1;
(statearr_23168_23195[(2)] = inst_23162);

(statearr_23168_23195[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23167 === (1))){
var state_23166__$1 = state_23166;
var statearr_23169_23196 = state_23166__$1;
(statearr_23169_23196[(2)] = null);

(statearr_23169_23196[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23167 === (4))){
var inst_23145 = (state_23166[(7)]);
var inst_23145__$1 = (state_23166[(2)]);
var inst_23146 = (inst_23145__$1 == null);
var state_23166__$1 = (function (){var statearr_23170 = state_23166;
(statearr_23170[(7)] = inst_23145__$1);

return statearr_23170;
})();
if(cljs.core.truth_(inst_23146)){
var statearr_23171_23197 = state_23166__$1;
(statearr_23171_23197[(1)] = (5));

} else {
var statearr_23172_23198 = state_23166__$1;
(statearr_23172_23198[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23167 === (13))){
var state_23166__$1 = state_23166;
var statearr_23173_23199 = state_23166__$1;
(statearr_23173_23199[(2)] = null);

(statearr_23173_23199[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23167 === (6))){
var inst_23145 = (state_23166[(7)]);
var state_23166__$1 = state_23166;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_23166__$1,(11),to,inst_23145);
} else {
if((state_val_23167 === (3))){
var inst_23164 = (state_23166[(2)]);
var state_23166__$1 = state_23166;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_23166__$1,inst_23164);
} else {
if((state_val_23167 === (12))){
var state_23166__$1 = state_23166;
var statearr_23174_23200 = state_23166__$1;
(statearr_23174_23200[(2)] = null);

(statearr_23174_23200[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23167 === (2))){
var state_23166__$1 = state_23166;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23166__$1,(4),from);
} else {
if((state_val_23167 === (11))){
var inst_23155 = (state_23166[(2)]);
var state_23166__$1 = state_23166;
if(cljs.core.truth_(inst_23155)){
var statearr_23175_23201 = state_23166__$1;
(statearr_23175_23201[(1)] = (12));

} else {
var statearr_23176_23202 = state_23166__$1;
(statearr_23176_23202[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23167 === (9))){
var state_23166__$1 = state_23166;
var statearr_23177_23203 = state_23166__$1;
(statearr_23177_23203[(2)] = null);

(statearr_23177_23203[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23167 === (5))){
var state_23166__$1 = state_23166;
if(cljs.core.truth_(close_QMARK_)){
var statearr_23178_23204 = state_23166__$1;
(statearr_23178_23204[(1)] = (8));

} else {
var statearr_23179_23205 = state_23166__$1;
(statearr_23179_23205[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23167 === (14))){
var inst_23160 = (state_23166[(2)]);
var state_23166__$1 = state_23166;
var statearr_23180_23206 = state_23166__$1;
(statearr_23180_23206[(2)] = inst_23160);

(statearr_23180_23206[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23167 === (10))){
var inst_23152 = (state_23166[(2)]);
var state_23166__$1 = state_23166;
var statearr_23181_23207 = state_23166__$1;
(statearr_23181_23207[(2)] = inst_23152);

(statearr_23181_23207[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23167 === (8))){
var inst_23149 = cljs.core.async.close_BANG_.call(null,to);
var state_23166__$1 = state_23166;
var statearr_23182_23208 = state_23166__$1;
(statearr_23182_23208[(2)] = inst_23149);

(statearr_23182_23208[(1)] = (10));


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
});})(c__23027__auto___23194))
;
return ((function (switch__22962__auto__,c__23027__auto___23194){
return (function() {
var cljs$core$async$state_machine__22963__auto__ = null;
var cljs$core$async$state_machine__22963__auto____0 = (function (){
var statearr_23186 = [null,null,null,null,null,null,null,null];
(statearr_23186[(0)] = cljs$core$async$state_machine__22963__auto__);

(statearr_23186[(1)] = (1));

return statearr_23186;
});
var cljs$core$async$state_machine__22963__auto____1 = (function (state_23166){
while(true){
var ret_value__22964__auto__ = (function (){try{while(true){
var result__22965__auto__ = switch__22962__auto__.call(null,state_23166);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22965__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22965__auto__;
}
break;
}
}catch (e23187){if((e23187 instanceof Object)){
var ex__22966__auto__ = e23187;
var statearr_23188_23209 = state_23166;
(statearr_23188_23209[(5)] = ex__22966__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23166);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e23187;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22964__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__23210 = state_23166;
state_23166 = G__23210;
continue;
} else {
return ret_value__22964__auto__;
}
break;
}
});
cljs$core$async$state_machine__22963__auto__ = function(state_23166){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__22963__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__22963__auto____1.call(this,state_23166);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__22963__auto____0;
cljs$core$async$state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__22963__auto____1;
return cljs$core$async$state_machine__22963__auto__;
})()
;})(switch__22962__auto__,c__23027__auto___23194))
})();
var state__23029__auto__ = (function (){var statearr_23189 = f__23028__auto__.call(null);
(statearr_23189[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__23027__auto___23194);

return statearr_23189;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23029__auto__);
});})(c__23027__auto___23194))
);


return to;
});

cljs.core.async.pipe.cljs$lang$maxFixedArity = 3;

cljs.core.async.pipeline_STAR_ = (function cljs$core$async$pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){
if((n > (0))){
} else {
throw (new Error("Assert failed: (pos? n)"));
}

var jobs = cljs.core.async.chan.call(null,n);
var results = cljs.core.async.chan.call(null,n);
var process = ((function (jobs,results){
return (function (p__23398){
var vec__23399 = p__23398;
var v = cljs.core.nth.call(null,vec__23399,(0),null);
var p = cljs.core.nth.call(null,vec__23399,(1),null);
var job = vec__23399;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1),xf,ex_handler);
var c__23027__auto___23585 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23027__auto___23585,res,vec__23399,v,p,job,jobs,results){
return (function (){
var f__23028__auto__ = (function (){var switch__22962__auto__ = ((function (c__23027__auto___23585,res,vec__23399,v,p,job,jobs,results){
return (function (state_23406){
var state_val_23407 = (state_23406[(1)]);
if((state_val_23407 === (1))){
var state_23406__$1 = state_23406;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_23406__$1,(2),res,v);
} else {
if((state_val_23407 === (2))){
var inst_23403 = (state_23406[(2)]);
var inst_23404 = cljs.core.async.close_BANG_.call(null,res);
var state_23406__$1 = (function (){var statearr_23408 = state_23406;
(statearr_23408[(7)] = inst_23403);

return statearr_23408;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_23406__$1,inst_23404);
} else {
return null;
}
}
});})(c__23027__auto___23585,res,vec__23399,v,p,job,jobs,results))
;
return ((function (switch__22962__auto__,c__23027__auto___23585,res,vec__23399,v,p,job,jobs,results){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__22963__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__22963__auto____0 = (function (){
var statearr_23412 = [null,null,null,null,null,null,null,null];
(statearr_23412[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__22963__auto__);

(statearr_23412[(1)] = (1));

return statearr_23412;
});
var cljs$core$async$pipeline_STAR__$_state_machine__22963__auto____1 = (function (state_23406){
while(true){
var ret_value__22964__auto__ = (function (){try{while(true){
var result__22965__auto__ = switch__22962__auto__.call(null,state_23406);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22965__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22965__auto__;
}
break;
}
}catch (e23413){if((e23413 instanceof Object)){
var ex__22966__auto__ = e23413;
var statearr_23414_23586 = state_23406;
(statearr_23414_23586[(5)] = ex__22966__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23406);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e23413;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22964__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__23587 = state_23406;
state_23406 = G__23587;
continue;
} else {
return ret_value__22964__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__22963__auto__ = function(state_23406){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__22963__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__22963__auto____1.call(this,state_23406);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__22963__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__22963__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__22963__auto__;
})()
;})(switch__22962__auto__,c__23027__auto___23585,res,vec__23399,v,p,job,jobs,results))
})();
var state__23029__auto__ = (function (){var statearr_23415 = f__23028__auto__.call(null);
(statearr_23415[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__23027__auto___23585);

return statearr_23415;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23029__auto__);
});})(c__23027__auto___23585,res,vec__23399,v,p,job,jobs,results))
);


cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results))
;
var async = ((function (jobs,results,process){
return (function (p__23416){
var vec__23417 = p__23416;
var v = cljs.core.nth.call(null,vec__23417,(0),null);
var p = cljs.core.nth.call(null,vec__23417,(1),null);
var job = vec__23417;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1));
xf.call(null,v,res);

cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results,process))
;
var n__21074__auto___23588 = n;
var __23589 = (0);
while(true){
if((__23589 < n__21074__auto___23588)){
var G__23420_23590 = (((type instanceof cljs.core.Keyword))?type.fqn:null);
switch (G__23420_23590) {
case "compute":
var c__23027__auto___23592 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__23589,c__23027__auto___23592,G__23420_23590,n__21074__auto___23588,jobs,results,process,async){
return (function (){
var f__23028__auto__ = (function (){var switch__22962__auto__ = ((function (__23589,c__23027__auto___23592,G__23420_23590,n__21074__auto___23588,jobs,results,process,async){
return (function (state_23433){
var state_val_23434 = (state_23433[(1)]);
if((state_val_23434 === (1))){
var state_23433__$1 = state_23433;
var statearr_23435_23593 = state_23433__$1;
(statearr_23435_23593[(2)] = null);

(statearr_23435_23593[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23434 === (2))){
var state_23433__$1 = state_23433;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23433__$1,(4),jobs);
} else {
if((state_val_23434 === (3))){
var inst_23431 = (state_23433[(2)]);
var state_23433__$1 = state_23433;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_23433__$1,inst_23431);
} else {
if((state_val_23434 === (4))){
var inst_23423 = (state_23433[(2)]);
var inst_23424 = process.call(null,inst_23423);
var state_23433__$1 = state_23433;
if(cljs.core.truth_(inst_23424)){
var statearr_23436_23594 = state_23433__$1;
(statearr_23436_23594[(1)] = (5));

} else {
var statearr_23437_23595 = state_23433__$1;
(statearr_23437_23595[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23434 === (5))){
var state_23433__$1 = state_23433;
var statearr_23438_23596 = state_23433__$1;
(statearr_23438_23596[(2)] = null);

(statearr_23438_23596[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23434 === (6))){
var state_23433__$1 = state_23433;
var statearr_23439_23597 = state_23433__$1;
(statearr_23439_23597[(2)] = null);

(statearr_23439_23597[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23434 === (7))){
var inst_23429 = (state_23433[(2)]);
var state_23433__$1 = state_23433;
var statearr_23440_23598 = state_23433__$1;
(statearr_23440_23598[(2)] = inst_23429);

(statearr_23440_23598[(1)] = (3));


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
});})(__23589,c__23027__auto___23592,G__23420_23590,n__21074__auto___23588,jobs,results,process,async))
;
return ((function (__23589,switch__22962__auto__,c__23027__auto___23592,G__23420_23590,n__21074__auto___23588,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__22963__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__22963__auto____0 = (function (){
var statearr_23444 = [null,null,null,null,null,null,null];
(statearr_23444[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__22963__auto__);

(statearr_23444[(1)] = (1));

return statearr_23444;
});
var cljs$core$async$pipeline_STAR__$_state_machine__22963__auto____1 = (function (state_23433){
while(true){
var ret_value__22964__auto__ = (function (){try{while(true){
var result__22965__auto__ = switch__22962__auto__.call(null,state_23433);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22965__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22965__auto__;
}
break;
}
}catch (e23445){if((e23445 instanceof Object)){
var ex__22966__auto__ = e23445;
var statearr_23446_23599 = state_23433;
(statearr_23446_23599[(5)] = ex__22966__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23433);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e23445;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22964__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__23600 = state_23433;
state_23433 = G__23600;
continue;
} else {
return ret_value__22964__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__22963__auto__ = function(state_23433){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__22963__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__22963__auto____1.call(this,state_23433);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__22963__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__22963__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__22963__auto__;
})()
;})(__23589,switch__22962__auto__,c__23027__auto___23592,G__23420_23590,n__21074__auto___23588,jobs,results,process,async))
})();
var state__23029__auto__ = (function (){var statearr_23447 = f__23028__auto__.call(null);
(statearr_23447[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__23027__auto___23592);

return statearr_23447;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23029__auto__);
});})(__23589,c__23027__auto___23592,G__23420_23590,n__21074__auto___23588,jobs,results,process,async))
);


break;
case "async":
var c__23027__auto___23601 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__23589,c__23027__auto___23601,G__23420_23590,n__21074__auto___23588,jobs,results,process,async){
return (function (){
var f__23028__auto__ = (function (){var switch__22962__auto__ = ((function (__23589,c__23027__auto___23601,G__23420_23590,n__21074__auto___23588,jobs,results,process,async){
return (function (state_23460){
var state_val_23461 = (state_23460[(1)]);
if((state_val_23461 === (1))){
var state_23460__$1 = state_23460;
var statearr_23462_23602 = state_23460__$1;
(statearr_23462_23602[(2)] = null);

(statearr_23462_23602[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23461 === (2))){
var state_23460__$1 = state_23460;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23460__$1,(4),jobs);
} else {
if((state_val_23461 === (3))){
var inst_23458 = (state_23460[(2)]);
var state_23460__$1 = state_23460;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_23460__$1,inst_23458);
} else {
if((state_val_23461 === (4))){
var inst_23450 = (state_23460[(2)]);
var inst_23451 = async.call(null,inst_23450);
var state_23460__$1 = state_23460;
if(cljs.core.truth_(inst_23451)){
var statearr_23463_23603 = state_23460__$1;
(statearr_23463_23603[(1)] = (5));

} else {
var statearr_23464_23604 = state_23460__$1;
(statearr_23464_23604[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23461 === (5))){
var state_23460__$1 = state_23460;
var statearr_23465_23605 = state_23460__$1;
(statearr_23465_23605[(2)] = null);

(statearr_23465_23605[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23461 === (6))){
var state_23460__$1 = state_23460;
var statearr_23466_23606 = state_23460__$1;
(statearr_23466_23606[(2)] = null);

(statearr_23466_23606[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23461 === (7))){
var inst_23456 = (state_23460[(2)]);
var state_23460__$1 = state_23460;
var statearr_23467_23607 = state_23460__$1;
(statearr_23467_23607[(2)] = inst_23456);

(statearr_23467_23607[(1)] = (3));


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
});})(__23589,c__23027__auto___23601,G__23420_23590,n__21074__auto___23588,jobs,results,process,async))
;
return ((function (__23589,switch__22962__auto__,c__23027__auto___23601,G__23420_23590,n__21074__auto___23588,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__22963__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__22963__auto____0 = (function (){
var statearr_23471 = [null,null,null,null,null,null,null];
(statearr_23471[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__22963__auto__);

(statearr_23471[(1)] = (1));

return statearr_23471;
});
var cljs$core$async$pipeline_STAR__$_state_machine__22963__auto____1 = (function (state_23460){
while(true){
var ret_value__22964__auto__ = (function (){try{while(true){
var result__22965__auto__ = switch__22962__auto__.call(null,state_23460);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22965__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22965__auto__;
}
break;
}
}catch (e23472){if((e23472 instanceof Object)){
var ex__22966__auto__ = e23472;
var statearr_23473_23608 = state_23460;
(statearr_23473_23608[(5)] = ex__22966__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23460);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e23472;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22964__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__23609 = state_23460;
state_23460 = G__23609;
continue;
} else {
return ret_value__22964__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__22963__auto__ = function(state_23460){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__22963__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__22963__auto____1.call(this,state_23460);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__22963__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__22963__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__22963__auto__;
})()
;})(__23589,switch__22962__auto__,c__23027__auto___23601,G__23420_23590,n__21074__auto___23588,jobs,results,process,async))
})();
var state__23029__auto__ = (function (){var statearr_23474 = f__23028__auto__.call(null);
(statearr_23474[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__23027__auto___23601);

return statearr_23474;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23029__auto__);
});})(__23589,c__23027__auto___23601,G__23420_23590,n__21074__auto___23588,jobs,results,process,async))
);


break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(type)].join('')));

}

var G__23610 = (__23589 + (1));
__23589 = G__23610;
continue;
} else {
}
break;
}

var c__23027__auto___23611 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23027__auto___23611,jobs,results,process,async){
return (function (){
var f__23028__auto__ = (function (){var switch__22962__auto__ = ((function (c__23027__auto___23611,jobs,results,process,async){
return (function (state_23496){
var state_val_23497 = (state_23496[(1)]);
if((state_val_23497 === (1))){
var state_23496__$1 = state_23496;
var statearr_23498_23612 = state_23496__$1;
(statearr_23498_23612[(2)] = null);

(statearr_23498_23612[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23497 === (2))){
var state_23496__$1 = state_23496;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23496__$1,(4),from);
} else {
if((state_val_23497 === (3))){
var inst_23494 = (state_23496[(2)]);
var state_23496__$1 = state_23496;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_23496__$1,inst_23494);
} else {
if((state_val_23497 === (4))){
var inst_23477 = (state_23496[(7)]);
var inst_23477__$1 = (state_23496[(2)]);
var inst_23478 = (inst_23477__$1 == null);
var state_23496__$1 = (function (){var statearr_23499 = state_23496;
(statearr_23499[(7)] = inst_23477__$1);

return statearr_23499;
})();
if(cljs.core.truth_(inst_23478)){
var statearr_23500_23613 = state_23496__$1;
(statearr_23500_23613[(1)] = (5));

} else {
var statearr_23501_23614 = state_23496__$1;
(statearr_23501_23614[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23497 === (5))){
var inst_23480 = cljs.core.async.close_BANG_.call(null,jobs);
var state_23496__$1 = state_23496;
var statearr_23502_23615 = state_23496__$1;
(statearr_23502_23615[(2)] = inst_23480);

(statearr_23502_23615[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23497 === (6))){
var inst_23482 = (state_23496[(8)]);
var inst_23477 = (state_23496[(7)]);
var inst_23482__$1 = cljs.core.async.chan.call(null,(1));
var inst_23483 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_23484 = [inst_23477,inst_23482__$1];
var inst_23485 = (new cljs.core.PersistentVector(null,2,(5),inst_23483,inst_23484,null));
var state_23496__$1 = (function (){var statearr_23503 = state_23496;
(statearr_23503[(8)] = inst_23482__$1);

return statearr_23503;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_23496__$1,(8),jobs,inst_23485);
} else {
if((state_val_23497 === (7))){
var inst_23492 = (state_23496[(2)]);
var state_23496__$1 = state_23496;
var statearr_23504_23616 = state_23496__$1;
(statearr_23504_23616[(2)] = inst_23492);

(statearr_23504_23616[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23497 === (8))){
var inst_23482 = (state_23496[(8)]);
var inst_23487 = (state_23496[(2)]);
var state_23496__$1 = (function (){var statearr_23505 = state_23496;
(statearr_23505[(9)] = inst_23487);

return statearr_23505;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_23496__$1,(9),results,inst_23482);
} else {
if((state_val_23497 === (9))){
var inst_23489 = (state_23496[(2)]);
var state_23496__$1 = (function (){var statearr_23506 = state_23496;
(statearr_23506[(10)] = inst_23489);

return statearr_23506;
})();
var statearr_23507_23617 = state_23496__$1;
(statearr_23507_23617[(2)] = null);

(statearr_23507_23617[(1)] = (2));


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
});})(c__23027__auto___23611,jobs,results,process,async))
;
return ((function (switch__22962__auto__,c__23027__auto___23611,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__22963__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__22963__auto____0 = (function (){
var statearr_23511 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_23511[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__22963__auto__);

(statearr_23511[(1)] = (1));

return statearr_23511;
});
var cljs$core$async$pipeline_STAR__$_state_machine__22963__auto____1 = (function (state_23496){
while(true){
var ret_value__22964__auto__ = (function (){try{while(true){
var result__22965__auto__ = switch__22962__auto__.call(null,state_23496);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22965__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22965__auto__;
}
break;
}
}catch (e23512){if((e23512 instanceof Object)){
var ex__22966__auto__ = e23512;
var statearr_23513_23618 = state_23496;
(statearr_23513_23618[(5)] = ex__22966__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23496);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e23512;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22964__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__23619 = state_23496;
state_23496 = G__23619;
continue;
} else {
return ret_value__22964__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__22963__auto__ = function(state_23496){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__22963__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__22963__auto____1.call(this,state_23496);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__22963__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__22963__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__22963__auto__;
})()
;})(switch__22962__auto__,c__23027__auto___23611,jobs,results,process,async))
})();
var state__23029__auto__ = (function (){var statearr_23514 = f__23028__auto__.call(null);
(statearr_23514[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__23027__auto___23611);

return statearr_23514;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23029__auto__);
});})(c__23027__auto___23611,jobs,results,process,async))
);


var c__23027__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23027__auto__,jobs,results,process,async){
return (function (){
var f__23028__auto__ = (function (){var switch__22962__auto__ = ((function (c__23027__auto__,jobs,results,process,async){
return (function (state_23552){
var state_val_23553 = (state_23552[(1)]);
if((state_val_23553 === (7))){
var inst_23548 = (state_23552[(2)]);
var state_23552__$1 = state_23552;
var statearr_23554_23620 = state_23552__$1;
(statearr_23554_23620[(2)] = inst_23548);

(statearr_23554_23620[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23553 === (20))){
var state_23552__$1 = state_23552;
var statearr_23555_23621 = state_23552__$1;
(statearr_23555_23621[(2)] = null);

(statearr_23555_23621[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23553 === (1))){
var state_23552__$1 = state_23552;
var statearr_23556_23622 = state_23552__$1;
(statearr_23556_23622[(2)] = null);

(statearr_23556_23622[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23553 === (4))){
var inst_23517 = (state_23552[(7)]);
var inst_23517__$1 = (state_23552[(2)]);
var inst_23518 = (inst_23517__$1 == null);
var state_23552__$1 = (function (){var statearr_23557 = state_23552;
(statearr_23557[(7)] = inst_23517__$1);

return statearr_23557;
})();
if(cljs.core.truth_(inst_23518)){
var statearr_23558_23623 = state_23552__$1;
(statearr_23558_23623[(1)] = (5));

} else {
var statearr_23559_23624 = state_23552__$1;
(statearr_23559_23624[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23553 === (15))){
var inst_23530 = (state_23552[(8)]);
var state_23552__$1 = state_23552;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_23552__$1,(18),to,inst_23530);
} else {
if((state_val_23553 === (21))){
var inst_23543 = (state_23552[(2)]);
var state_23552__$1 = state_23552;
var statearr_23560_23625 = state_23552__$1;
(statearr_23560_23625[(2)] = inst_23543);

(statearr_23560_23625[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23553 === (13))){
var inst_23545 = (state_23552[(2)]);
var state_23552__$1 = (function (){var statearr_23561 = state_23552;
(statearr_23561[(9)] = inst_23545);

return statearr_23561;
})();
var statearr_23562_23626 = state_23552__$1;
(statearr_23562_23626[(2)] = null);

(statearr_23562_23626[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23553 === (6))){
var inst_23517 = (state_23552[(7)]);
var state_23552__$1 = state_23552;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23552__$1,(11),inst_23517);
} else {
if((state_val_23553 === (17))){
var inst_23538 = (state_23552[(2)]);
var state_23552__$1 = state_23552;
if(cljs.core.truth_(inst_23538)){
var statearr_23563_23627 = state_23552__$1;
(statearr_23563_23627[(1)] = (19));

} else {
var statearr_23564_23628 = state_23552__$1;
(statearr_23564_23628[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23553 === (3))){
var inst_23550 = (state_23552[(2)]);
var state_23552__$1 = state_23552;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_23552__$1,inst_23550);
} else {
if((state_val_23553 === (12))){
var inst_23527 = (state_23552[(10)]);
var state_23552__$1 = state_23552;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23552__$1,(14),inst_23527);
} else {
if((state_val_23553 === (2))){
var state_23552__$1 = state_23552;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23552__$1,(4),results);
} else {
if((state_val_23553 === (19))){
var state_23552__$1 = state_23552;
var statearr_23565_23629 = state_23552__$1;
(statearr_23565_23629[(2)] = null);

(statearr_23565_23629[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23553 === (11))){
var inst_23527 = (state_23552[(2)]);
var state_23552__$1 = (function (){var statearr_23566 = state_23552;
(statearr_23566[(10)] = inst_23527);

return statearr_23566;
})();
var statearr_23567_23630 = state_23552__$1;
(statearr_23567_23630[(2)] = null);

(statearr_23567_23630[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23553 === (9))){
var state_23552__$1 = state_23552;
var statearr_23568_23631 = state_23552__$1;
(statearr_23568_23631[(2)] = null);

(statearr_23568_23631[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23553 === (5))){
var state_23552__$1 = state_23552;
if(cljs.core.truth_(close_QMARK_)){
var statearr_23569_23632 = state_23552__$1;
(statearr_23569_23632[(1)] = (8));

} else {
var statearr_23570_23633 = state_23552__$1;
(statearr_23570_23633[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23553 === (14))){
var inst_23530 = (state_23552[(8)]);
var inst_23532 = (state_23552[(11)]);
var inst_23530__$1 = (state_23552[(2)]);
var inst_23531 = (inst_23530__$1 == null);
var inst_23532__$1 = cljs.core.not.call(null,inst_23531);
var state_23552__$1 = (function (){var statearr_23571 = state_23552;
(statearr_23571[(8)] = inst_23530__$1);

(statearr_23571[(11)] = inst_23532__$1);

return statearr_23571;
})();
if(inst_23532__$1){
var statearr_23572_23634 = state_23552__$1;
(statearr_23572_23634[(1)] = (15));

} else {
var statearr_23573_23635 = state_23552__$1;
(statearr_23573_23635[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23553 === (16))){
var inst_23532 = (state_23552[(11)]);
var state_23552__$1 = state_23552;
var statearr_23574_23636 = state_23552__$1;
(statearr_23574_23636[(2)] = inst_23532);

(statearr_23574_23636[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23553 === (10))){
var inst_23524 = (state_23552[(2)]);
var state_23552__$1 = state_23552;
var statearr_23575_23637 = state_23552__$1;
(statearr_23575_23637[(2)] = inst_23524);

(statearr_23575_23637[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23553 === (18))){
var inst_23535 = (state_23552[(2)]);
var state_23552__$1 = state_23552;
var statearr_23576_23638 = state_23552__$1;
(statearr_23576_23638[(2)] = inst_23535);

(statearr_23576_23638[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23553 === (8))){
var inst_23521 = cljs.core.async.close_BANG_.call(null,to);
var state_23552__$1 = state_23552;
var statearr_23577_23639 = state_23552__$1;
(statearr_23577_23639[(2)] = inst_23521);

(statearr_23577_23639[(1)] = (10));


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
}
}
}
}
});})(c__23027__auto__,jobs,results,process,async))
;
return ((function (switch__22962__auto__,c__23027__auto__,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__22963__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__22963__auto____0 = (function (){
var statearr_23581 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_23581[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__22963__auto__);

(statearr_23581[(1)] = (1));

return statearr_23581;
});
var cljs$core$async$pipeline_STAR__$_state_machine__22963__auto____1 = (function (state_23552){
while(true){
var ret_value__22964__auto__ = (function (){try{while(true){
var result__22965__auto__ = switch__22962__auto__.call(null,state_23552);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22965__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22965__auto__;
}
break;
}
}catch (e23582){if((e23582 instanceof Object)){
var ex__22966__auto__ = e23582;
var statearr_23583_23640 = state_23552;
(statearr_23583_23640[(5)] = ex__22966__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23552);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e23582;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22964__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__23641 = state_23552;
state_23552 = G__23641;
continue;
} else {
return ret_value__22964__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__22963__auto__ = function(state_23552){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__22963__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__22963__auto____1.call(this,state_23552);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__22963__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__22963__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__22963__auto__;
})()
;})(switch__22962__auto__,c__23027__auto__,jobs,results,process,async))
})();
var state__23029__auto__ = (function (){var statearr_23584 = f__23028__auto__.call(null);
(statearr_23584[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__23027__auto__);

return statearr_23584;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23029__auto__);
});})(c__23027__auto__,jobs,results,process,async))
);

return c__23027__auto__;
});
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the async function af, with parallelism n. af
 *   must be a function of two arguments, the first an input value and
 *   the second a channel on which to place the result(s). af must close!
 *   the channel before returning.  The presumption is that af will
 *   return immediately, having launched some asynchronous operation
 *   whose completion/callback will manipulate the result channel. Outputs
 *   will be returned in order relative to  the inputs. By default, the to
 *   channel will be closed when the from channel closes, but can be
 *   determined by the close?  parameter. Will stop consuming the from
 *   channel if the to channel closes.
 */
cljs.core.async.pipeline_async = (function cljs$core$async$pipeline_async(var_args){
var args23642 = [];
var len__21234__auto___23645 = arguments.length;
var i__21235__auto___23646 = (0);
while(true){
if((i__21235__auto___23646 < len__21234__auto___23645)){
args23642.push((arguments[i__21235__auto___23646]));

var G__23647 = (i__21235__auto___23646 + (1));
i__21235__auto___23646 = G__23647;
continue;
} else {
}
break;
}

var G__23644 = args23642.length;
switch (G__23644) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args23642.length)].join('')));

}
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4 = (function (n,to,af,from){
return cljs.core.async.pipeline_async.call(null,n,to,af,from,true);
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5 = (function (n,to,af,from,close_QMARK_){
return cljs.core.async.pipeline_STAR_.call(null,n,to,af,from,close_QMARK_,null,new cljs.core.Keyword(null,"async","async",1050769601));
});

cljs.core.async.pipeline_async.cljs$lang$maxFixedArity = 5;

/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the transducer xf, with parallelism n. Because
 *   it is parallel, the transducer will be applied independently to each
 *   element, not across elements, and may produce zero or more outputs
 *   per input.  Outputs will be returned in order relative to the
 *   inputs. By default, the to channel will be closed when the from
 *   channel closes, but can be determined by the close?  parameter. Will
 *   stop consuming the from channel if the to channel closes.
 * 
 *   Note this is supplied for API compatibility with the Clojure version.
 *   Values of N > 1 will not result in actual concurrency in a
 *   single-threaded runtime.
 */
cljs.core.async.pipeline = (function cljs$core$async$pipeline(var_args){
var args23649 = [];
var len__21234__auto___23652 = arguments.length;
var i__21235__auto___23653 = (0);
while(true){
if((i__21235__auto___23653 < len__21234__auto___23652)){
args23649.push((arguments[i__21235__auto___23653]));

var G__23654 = (i__21235__auto___23653 + (1));
i__21235__auto___23653 = G__23654;
continue;
} else {
}
break;
}

var G__23651 = args23649.length;
switch (G__23651) {
case 4:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args23649.length)].join('')));

}
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4 = (function (n,to,xf,from){
return cljs.core.async.pipeline.call(null,n,to,xf,from,true);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5 = (function (n,to,xf,from,close_QMARK_){
return cljs.core.async.pipeline.call(null,n,to,xf,from,close_QMARK_,null);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6 = (function (n,to,xf,from,close_QMARK_,ex_handler){
return cljs.core.async.pipeline_STAR_.call(null,n,to,xf,from,close_QMARK_,ex_handler,new cljs.core.Keyword(null,"compute","compute",1555393130));
});

cljs.core.async.pipeline.cljs$lang$maxFixedArity = 6;

/**
 * Takes a predicate and a source channel and returns a vector of two
 *   channels, the first of which will contain the values for which the
 *   predicate returned true, the second those for which it returned
 *   false.
 * 
 *   The out channels will be unbuffered by default, or two buf-or-ns can
 *   be supplied. The channels will close after the source channel has
 *   closed.
 */
cljs.core.async.split = (function cljs$core$async$split(var_args){
var args23656 = [];
var len__21234__auto___23709 = arguments.length;
var i__21235__auto___23710 = (0);
while(true){
if((i__21235__auto___23710 < len__21234__auto___23709)){
args23656.push((arguments[i__21235__auto___23710]));

var G__23711 = (i__21235__auto___23710 + (1));
i__21235__auto___23710 = G__23711;
continue;
} else {
}
break;
}

var G__23658 = args23656.length;
switch (G__23658) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args23656.length)].join('')));

}
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.call(null,p,ch,null,null);
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.call(null,t_buf_or_n);
var fc = cljs.core.async.chan.call(null,f_buf_or_n);
var c__23027__auto___23713 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23027__auto___23713,tc,fc){
return (function (){
var f__23028__auto__ = (function (){var switch__22962__auto__ = ((function (c__23027__auto___23713,tc,fc){
return (function (state_23684){
var state_val_23685 = (state_23684[(1)]);
if((state_val_23685 === (7))){
var inst_23680 = (state_23684[(2)]);
var state_23684__$1 = state_23684;
var statearr_23686_23714 = state_23684__$1;
(statearr_23686_23714[(2)] = inst_23680);

(statearr_23686_23714[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23685 === (1))){
var state_23684__$1 = state_23684;
var statearr_23687_23715 = state_23684__$1;
(statearr_23687_23715[(2)] = null);

(statearr_23687_23715[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23685 === (4))){
var inst_23661 = (state_23684[(7)]);
var inst_23661__$1 = (state_23684[(2)]);
var inst_23662 = (inst_23661__$1 == null);
var state_23684__$1 = (function (){var statearr_23688 = state_23684;
(statearr_23688[(7)] = inst_23661__$1);

return statearr_23688;
})();
if(cljs.core.truth_(inst_23662)){
var statearr_23689_23716 = state_23684__$1;
(statearr_23689_23716[(1)] = (5));

} else {
var statearr_23690_23717 = state_23684__$1;
(statearr_23690_23717[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23685 === (13))){
var state_23684__$1 = state_23684;
var statearr_23691_23718 = state_23684__$1;
(statearr_23691_23718[(2)] = null);

(statearr_23691_23718[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23685 === (6))){
var inst_23661 = (state_23684[(7)]);
var inst_23667 = p.call(null,inst_23661);
var state_23684__$1 = state_23684;
if(cljs.core.truth_(inst_23667)){
var statearr_23692_23719 = state_23684__$1;
(statearr_23692_23719[(1)] = (9));

} else {
var statearr_23693_23720 = state_23684__$1;
(statearr_23693_23720[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23685 === (3))){
var inst_23682 = (state_23684[(2)]);
var state_23684__$1 = state_23684;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_23684__$1,inst_23682);
} else {
if((state_val_23685 === (12))){
var state_23684__$1 = state_23684;
var statearr_23694_23721 = state_23684__$1;
(statearr_23694_23721[(2)] = null);

(statearr_23694_23721[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23685 === (2))){
var state_23684__$1 = state_23684;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23684__$1,(4),ch);
} else {
if((state_val_23685 === (11))){
var inst_23661 = (state_23684[(7)]);
var inst_23671 = (state_23684[(2)]);
var state_23684__$1 = state_23684;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_23684__$1,(8),inst_23671,inst_23661);
} else {
if((state_val_23685 === (9))){
var state_23684__$1 = state_23684;
var statearr_23695_23722 = state_23684__$1;
(statearr_23695_23722[(2)] = tc);

(statearr_23695_23722[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23685 === (5))){
var inst_23664 = cljs.core.async.close_BANG_.call(null,tc);
var inst_23665 = cljs.core.async.close_BANG_.call(null,fc);
var state_23684__$1 = (function (){var statearr_23696 = state_23684;
(statearr_23696[(8)] = inst_23664);

return statearr_23696;
})();
var statearr_23697_23723 = state_23684__$1;
(statearr_23697_23723[(2)] = inst_23665);

(statearr_23697_23723[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23685 === (14))){
var inst_23678 = (state_23684[(2)]);
var state_23684__$1 = state_23684;
var statearr_23698_23724 = state_23684__$1;
(statearr_23698_23724[(2)] = inst_23678);

(statearr_23698_23724[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23685 === (10))){
var state_23684__$1 = state_23684;
var statearr_23699_23725 = state_23684__$1;
(statearr_23699_23725[(2)] = fc);

(statearr_23699_23725[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23685 === (8))){
var inst_23673 = (state_23684[(2)]);
var state_23684__$1 = state_23684;
if(cljs.core.truth_(inst_23673)){
var statearr_23700_23726 = state_23684__$1;
(statearr_23700_23726[(1)] = (12));

} else {
var statearr_23701_23727 = state_23684__$1;
(statearr_23701_23727[(1)] = (13));

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
});})(c__23027__auto___23713,tc,fc))
;
return ((function (switch__22962__auto__,c__23027__auto___23713,tc,fc){
return (function() {
var cljs$core$async$state_machine__22963__auto__ = null;
var cljs$core$async$state_machine__22963__auto____0 = (function (){
var statearr_23705 = [null,null,null,null,null,null,null,null,null];
(statearr_23705[(0)] = cljs$core$async$state_machine__22963__auto__);

(statearr_23705[(1)] = (1));

return statearr_23705;
});
var cljs$core$async$state_machine__22963__auto____1 = (function (state_23684){
while(true){
var ret_value__22964__auto__ = (function (){try{while(true){
var result__22965__auto__ = switch__22962__auto__.call(null,state_23684);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22965__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22965__auto__;
}
break;
}
}catch (e23706){if((e23706 instanceof Object)){
var ex__22966__auto__ = e23706;
var statearr_23707_23728 = state_23684;
(statearr_23707_23728[(5)] = ex__22966__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23684);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e23706;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22964__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__23729 = state_23684;
state_23684 = G__23729;
continue;
} else {
return ret_value__22964__auto__;
}
break;
}
});
cljs$core$async$state_machine__22963__auto__ = function(state_23684){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__22963__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__22963__auto____1.call(this,state_23684);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__22963__auto____0;
cljs$core$async$state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__22963__auto____1;
return cljs$core$async$state_machine__22963__auto__;
})()
;})(switch__22962__auto__,c__23027__auto___23713,tc,fc))
})();
var state__23029__auto__ = (function (){var statearr_23708 = f__23028__auto__.call(null);
(statearr_23708[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__23027__auto___23713);

return statearr_23708;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23029__auto__);
});})(c__23027__auto___23713,tc,fc))
);


return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
});

cljs.core.async.split.cljs$lang$maxFixedArity = 4;

/**
 * f should be a function of 2 arguments. Returns a channel containing
 *   the single result of applying f to init and the first item from the
 *   channel, then applying f to that result and the 2nd item, etc. If
 *   the channel closes without yielding items, returns init and f is not
 *   called. ch must close before reduce produces a result.
 */
cljs.core.async.reduce = (function cljs$core$async$reduce(f,init,ch){
var c__23027__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23027__auto__){
return (function (){
var f__23028__auto__ = (function (){var switch__22962__auto__ = ((function (c__23027__auto__){
return (function (state_23793){
var state_val_23794 = (state_23793[(1)]);
if((state_val_23794 === (7))){
var inst_23789 = (state_23793[(2)]);
var state_23793__$1 = state_23793;
var statearr_23795_23816 = state_23793__$1;
(statearr_23795_23816[(2)] = inst_23789);

(statearr_23795_23816[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23794 === (1))){
var inst_23773 = init;
var state_23793__$1 = (function (){var statearr_23796 = state_23793;
(statearr_23796[(7)] = inst_23773);

return statearr_23796;
})();
var statearr_23797_23817 = state_23793__$1;
(statearr_23797_23817[(2)] = null);

(statearr_23797_23817[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23794 === (4))){
var inst_23776 = (state_23793[(8)]);
var inst_23776__$1 = (state_23793[(2)]);
var inst_23777 = (inst_23776__$1 == null);
var state_23793__$1 = (function (){var statearr_23798 = state_23793;
(statearr_23798[(8)] = inst_23776__$1);

return statearr_23798;
})();
if(cljs.core.truth_(inst_23777)){
var statearr_23799_23818 = state_23793__$1;
(statearr_23799_23818[(1)] = (5));

} else {
var statearr_23800_23819 = state_23793__$1;
(statearr_23800_23819[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23794 === (6))){
var inst_23773 = (state_23793[(7)]);
var inst_23780 = (state_23793[(9)]);
var inst_23776 = (state_23793[(8)]);
var inst_23780__$1 = f.call(null,inst_23773,inst_23776);
var inst_23781 = cljs.core.reduced_QMARK_.call(null,inst_23780__$1);
var state_23793__$1 = (function (){var statearr_23801 = state_23793;
(statearr_23801[(9)] = inst_23780__$1);

return statearr_23801;
})();
if(inst_23781){
var statearr_23802_23820 = state_23793__$1;
(statearr_23802_23820[(1)] = (8));

} else {
var statearr_23803_23821 = state_23793__$1;
(statearr_23803_23821[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23794 === (3))){
var inst_23791 = (state_23793[(2)]);
var state_23793__$1 = state_23793;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_23793__$1,inst_23791);
} else {
if((state_val_23794 === (2))){
var state_23793__$1 = state_23793;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23793__$1,(4),ch);
} else {
if((state_val_23794 === (9))){
var inst_23780 = (state_23793[(9)]);
var inst_23773 = inst_23780;
var state_23793__$1 = (function (){var statearr_23804 = state_23793;
(statearr_23804[(7)] = inst_23773);

return statearr_23804;
})();
var statearr_23805_23822 = state_23793__$1;
(statearr_23805_23822[(2)] = null);

(statearr_23805_23822[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23794 === (5))){
var inst_23773 = (state_23793[(7)]);
var state_23793__$1 = state_23793;
var statearr_23806_23823 = state_23793__$1;
(statearr_23806_23823[(2)] = inst_23773);

(statearr_23806_23823[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23794 === (10))){
var inst_23787 = (state_23793[(2)]);
var state_23793__$1 = state_23793;
var statearr_23807_23824 = state_23793__$1;
(statearr_23807_23824[(2)] = inst_23787);

(statearr_23807_23824[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23794 === (8))){
var inst_23780 = (state_23793[(9)]);
var inst_23783 = cljs.core.deref.call(null,inst_23780);
var state_23793__$1 = state_23793;
var statearr_23808_23825 = state_23793__$1;
(statearr_23808_23825[(2)] = inst_23783);

(statearr_23808_23825[(1)] = (10));


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
});})(c__23027__auto__))
;
return ((function (switch__22962__auto__,c__23027__auto__){
return (function() {
var cljs$core$async$reduce_$_state_machine__22963__auto__ = null;
var cljs$core$async$reduce_$_state_machine__22963__auto____0 = (function (){
var statearr_23812 = [null,null,null,null,null,null,null,null,null,null];
(statearr_23812[(0)] = cljs$core$async$reduce_$_state_machine__22963__auto__);

(statearr_23812[(1)] = (1));

return statearr_23812;
});
var cljs$core$async$reduce_$_state_machine__22963__auto____1 = (function (state_23793){
while(true){
var ret_value__22964__auto__ = (function (){try{while(true){
var result__22965__auto__ = switch__22962__auto__.call(null,state_23793);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22965__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22965__auto__;
}
break;
}
}catch (e23813){if((e23813 instanceof Object)){
var ex__22966__auto__ = e23813;
var statearr_23814_23826 = state_23793;
(statearr_23814_23826[(5)] = ex__22966__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23793);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e23813;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22964__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__23827 = state_23793;
state_23793 = G__23827;
continue;
} else {
return ret_value__22964__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__22963__auto__ = function(state_23793){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__22963__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__22963__auto____1.call(this,state_23793);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__22963__auto____0;
cljs$core$async$reduce_$_state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__22963__auto____1;
return cljs$core$async$reduce_$_state_machine__22963__auto__;
})()
;})(switch__22962__auto__,c__23027__auto__))
})();
var state__23029__auto__ = (function (){var statearr_23815 = f__23028__auto__.call(null);
(statearr_23815[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__23027__auto__);

return statearr_23815;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23029__auto__);
});})(c__23027__auto__))
);

return c__23027__auto__;
});
/**
 * Puts the contents of coll into the supplied channel.
 * 
 *   By default the channel will be closed after the items are copied,
 *   but can be determined by the close? parameter.
 * 
 *   Returns a channel which will close after the items are copied.
 */
cljs.core.async.onto_chan = (function cljs$core$async$onto_chan(var_args){
var args23828 = [];
var len__21234__auto___23880 = arguments.length;
var i__21235__auto___23881 = (0);
while(true){
if((i__21235__auto___23881 < len__21234__auto___23880)){
args23828.push((arguments[i__21235__auto___23881]));

var G__23882 = (i__21235__auto___23881 + (1));
i__21235__auto___23881 = G__23882;
continue;
} else {
}
break;
}

var G__23830 = args23828.length;
switch (G__23830) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args23828.length)].join('')));

}
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan.call(null,ch,coll,true);
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__23027__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23027__auto__){
return (function (){
var f__23028__auto__ = (function (){var switch__22962__auto__ = ((function (c__23027__auto__){
return (function (state_23855){
var state_val_23856 = (state_23855[(1)]);
if((state_val_23856 === (7))){
var inst_23837 = (state_23855[(2)]);
var state_23855__$1 = state_23855;
var statearr_23857_23884 = state_23855__$1;
(statearr_23857_23884[(2)] = inst_23837);

(statearr_23857_23884[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23856 === (1))){
var inst_23831 = cljs.core.seq.call(null,coll);
var inst_23832 = inst_23831;
var state_23855__$1 = (function (){var statearr_23858 = state_23855;
(statearr_23858[(7)] = inst_23832);

return statearr_23858;
})();
var statearr_23859_23885 = state_23855__$1;
(statearr_23859_23885[(2)] = null);

(statearr_23859_23885[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23856 === (4))){
var inst_23832 = (state_23855[(7)]);
var inst_23835 = cljs.core.first.call(null,inst_23832);
var state_23855__$1 = state_23855;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_23855__$1,(7),ch,inst_23835);
} else {
if((state_val_23856 === (13))){
var inst_23849 = (state_23855[(2)]);
var state_23855__$1 = state_23855;
var statearr_23860_23886 = state_23855__$1;
(statearr_23860_23886[(2)] = inst_23849);

(statearr_23860_23886[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23856 === (6))){
var inst_23840 = (state_23855[(2)]);
var state_23855__$1 = state_23855;
if(cljs.core.truth_(inst_23840)){
var statearr_23861_23887 = state_23855__$1;
(statearr_23861_23887[(1)] = (8));

} else {
var statearr_23862_23888 = state_23855__$1;
(statearr_23862_23888[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23856 === (3))){
var inst_23853 = (state_23855[(2)]);
var state_23855__$1 = state_23855;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_23855__$1,inst_23853);
} else {
if((state_val_23856 === (12))){
var state_23855__$1 = state_23855;
var statearr_23863_23889 = state_23855__$1;
(statearr_23863_23889[(2)] = null);

(statearr_23863_23889[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23856 === (2))){
var inst_23832 = (state_23855[(7)]);
var state_23855__$1 = state_23855;
if(cljs.core.truth_(inst_23832)){
var statearr_23864_23890 = state_23855__$1;
(statearr_23864_23890[(1)] = (4));

} else {
var statearr_23865_23891 = state_23855__$1;
(statearr_23865_23891[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23856 === (11))){
var inst_23846 = cljs.core.async.close_BANG_.call(null,ch);
var state_23855__$1 = state_23855;
var statearr_23866_23892 = state_23855__$1;
(statearr_23866_23892[(2)] = inst_23846);

(statearr_23866_23892[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23856 === (9))){
var state_23855__$1 = state_23855;
if(cljs.core.truth_(close_QMARK_)){
var statearr_23867_23893 = state_23855__$1;
(statearr_23867_23893[(1)] = (11));

} else {
var statearr_23868_23894 = state_23855__$1;
(statearr_23868_23894[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23856 === (5))){
var inst_23832 = (state_23855[(7)]);
var state_23855__$1 = state_23855;
var statearr_23869_23895 = state_23855__$1;
(statearr_23869_23895[(2)] = inst_23832);

(statearr_23869_23895[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23856 === (10))){
var inst_23851 = (state_23855[(2)]);
var state_23855__$1 = state_23855;
var statearr_23870_23896 = state_23855__$1;
(statearr_23870_23896[(2)] = inst_23851);

(statearr_23870_23896[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23856 === (8))){
var inst_23832 = (state_23855[(7)]);
var inst_23842 = cljs.core.next.call(null,inst_23832);
var inst_23832__$1 = inst_23842;
var state_23855__$1 = (function (){var statearr_23871 = state_23855;
(statearr_23871[(7)] = inst_23832__$1);

return statearr_23871;
})();
var statearr_23872_23897 = state_23855__$1;
(statearr_23872_23897[(2)] = null);

(statearr_23872_23897[(1)] = (2));


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
});})(c__23027__auto__))
;
return ((function (switch__22962__auto__,c__23027__auto__){
return (function() {
var cljs$core$async$state_machine__22963__auto__ = null;
var cljs$core$async$state_machine__22963__auto____0 = (function (){
var statearr_23876 = [null,null,null,null,null,null,null,null];
(statearr_23876[(0)] = cljs$core$async$state_machine__22963__auto__);

(statearr_23876[(1)] = (1));

return statearr_23876;
});
var cljs$core$async$state_machine__22963__auto____1 = (function (state_23855){
while(true){
var ret_value__22964__auto__ = (function (){try{while(true){
var result__22965__auto__ = switch__22962__auto__.call(null,state_23855);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22965__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22965__auto__;
}
break;
}
}catch (e23877){if((e23877 instanceof Object)){
var ex__22966__auto__ = e23877;
var statearr_23878_23898 = state_23855;
(statearr_23878_23898[(5)] = ex__22966__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23855);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e23877;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22964__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__23899 = state_23855;
state_23855 = G__23899;
continue;
} else {
return ret_value__22964__auto__;
}
break;
}
});
cljs$core$async$state_machine__22963__auto__ = function(state_23855){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__22963__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__22963__auto____1.call(this,state_23855);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__22963__auto____0;
cljs$core$async$state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__22963__auto____1;
return cljs$core$async$state_machine__22963__auto__;
})()
;})(switch__22962__auto__,c__23027__auto__))
})();
var state__23029__auto__ = (function (){var statearr_23879 = f__23028__auto__.call(null);
(statearr_23879[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__23027__auto__);

return statearr_23879;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23029__auto__);
});})(c__23027__auto__))
);

return c__23027__auto__;
});

cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3;

/**
 * Creates and returns a channel which contains the contents of coll,
 *   closing when exhausted.
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
var ch = cljs.core.async.chan.call(null,cljs.core.bounded_count.call(null,(100),coll));
cljs.core.async.onto_chan.call(null,ch,coll);

return ch;
});

/**
 * @interface
 */
cljs.core.async.Mux = function(){};

cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((!((_ == null))) && (!((_.cljs$core$async$Mux$muxch_STAR_$arity$1 == null)))){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
var x__20822__auto__ = (((_ == null))?null:_);
var m__20823__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__20822__auto__)]);
if(!((m__20823__auto__ == null))){
return m__20823__auto__.call(null,_);
} else {
var m__20823__auto____$1 = (cljs.core.async.muxch_STAR_["_"]);
if(!((m__20823__auto____$1 == null))){
return m__20823__auto____$1.call(null,_);
} else {
throw cljs.core.missing_protocol.call(null,"Mux.muxch*",_);
}
}
}
});


/**
 * @interface
 */
cljs.core.async.Mult = function(){};

cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((!((m == null))) && (!((m.cljs$core$async$Mult$tap_STAR_$arity$3 == null)))){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
var x__20822__auto__ = (((m == null))?null:m);
var m__20823__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__20822__auto__)]);
if(!((m__20823__auto__ == null))){
return m__20823__auto__.call(null,m,ch,close_QMARK_);
} else {
var m__20823__auto____$1 = (cljs.core.async.tap_STAR_["_"]);
if(!((m__20823__auto____$1 == null))){
return m__20823__auto____$1.call(null,m,ch,close_QMARK_);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.tap*",m);
}
}
}
});

cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mult$untap_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
var x__20822__auto__ = (((m == null))?null:m);
var m__20823__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__20822__auto__)]);
if(!((m__20823__auto__ == null))){
return m__20823__auto__.call(null,m,ch);
} else {
var m__20823__auto____$1 = (cljs.core.async.untap_STAR_["_"]);
if(!((m__20823__auto____$1 == null))){
return m__20823__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap*",m);
}
}
}
});

cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((!((m == null))) && (!((m.cljs$core$async$Mult$untap_all_STAR_$arity$1 == null)))){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
var x__20822__auto__ = (((m == null))?null:m);
var m__20823__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__20822__auto__)]);
if(!((m__20823__auto__ == null))){
return m__20823__auto__.call(null,m);
} else {
var m__20823__auto____$1 = (cljs.core.async.untap_all_STAR_["_"]);
if(!((m__20823__auto____$1 == null))){
return m__20823__auto____$1.call(null,m);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap-all*",m);
}
}
}
});

/**
 * Creates and returns a mult(iple) of the supplied channel. Channels
 *   containing copies of the channel can be created with 'tap', and
 *   detached with 'untap'.
 * 
 *   Each item is distributed to all taps in parallel and synchronously,
 *   i.e. each tap must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow taps from holding up the mult.
 * 
 *   Items received when there are no taps get dropped.
 * 
 *   If a tap puts to a closed channel, it will be removed from the mult.
 */
cljs.core.async.mult = (function cljs$core$async$mult(ch){
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var m = (function (){
if(typeof cljs.core.async.t_cljs$core$async24125 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async24125 = (function (mult,ch,cs,meta24126){
this.mult = mult;
this.ch = ch;
this.cs = cs;
this.meta24126 = meta24126;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async24125.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_24127,meta24126__$1){
var self__ = this;
var _24127__$1 = this;
return (new cljs.core.async.t_cljs$core$async24125(self__.mult,self__.ch,self__.cs,meta24126__$1));
});})(cs))
;

cljs.core.async.t_cljs$core$async24125.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_24127){
var self__ = this;
var _24127__$1 = this;
return self__.meta24126;
});})(cs))
;

cljs.core.async.t_cljs$core$async24125.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async24125.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(cs))
;

cljs.core.async.t_cljs$core$async24125.prototype.cljs$core$async$Mult$ = true;

cljs.core.async.t_cljs$core$async24125.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async24125.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$1);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async24125.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async24125.getBasis = ((function (cs){
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"mult","mult",-1187640995,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Creates and returns a mult(iple) of the supplied channel. Channels\n  containing copies of the channel can be created with 'tap', and\n  detached with 'untap'.\n\n  Each item is distributed to all taps in parallel and synchronously,\n  i.e. each tap must accept before the next item is distributed. Use\n  buffering/windowing to prevent slow taps from holding up the mult.\n\n  Items received when there are no taps get dropped.\n\n  If a tap puts to a closed channel, it will be removed from the mult."], null)),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta24126","meta24126",914741726,null)], null);
});})(cs))
;

cljs.core.async.t_cljs$core$async24125.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async24125.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async24125";

cljs.core.async.t_cljs$core$async24125.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__20765__auto__,writer__20766__auto__,opt__20767__auto__){
return cljs.core._write.call(null,writer__20766__auto__,"cljs.core.async/t_cljs$core$async24125");
});})(cs))
;

cljs.core.async.__GT_t_cljs$core$async24125 = ((function (cs){
return (function cljs$core$async$mult_$___GT_t_cljs$core$async24125(mult__$1,ch__$1,cs__$1,meta24126){
return (new cljs.core.async.t_cljs$core$async24125(mult__$1,ch__$1,cs__$1,meta24126));
});})(cs))
;

}

return (new cljs.core.async.t_cljs$core$async24125(cljs$core$async$mult,ch,cs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var dchan = cljs.core.async.chan.call(null,(1));
var dctr = cljs.core.atom.call(null,null);
var done = ((function (cs,m,dchan,dctr){
return (function (_){
if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.call(null,dchan,true);
} else {
return null;
}
});})(cs,m,dchan,dctr))
;
var c__23027__auto___24350 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23027__auto___24350,cs,m,dchan,dctr,done){
return (function (){
var f__23028__auto__ = (function (){var switch__22962__auto__ = ((function (c__23027__auto___24350,cs,m,dchan,dctr,done){
return (function (state_24262){
var state_val_24263 = (state_24262[(1)]);
if((state_val_24263 === (7))){
var inst_24258 = (state_24262[(2)]);
var state_24262__$1 = state_24262;
var statearr_24264_24351 = state_24262__$1;
(statearr_24264_24351[(2)] = inst_24258);

(statearr_24264_24351[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (20))){
var inst_24161 = (state_24262[(7)]);
var inst_24173 = cljs.core.first.call(null,inst_24161);
var inst_24174 = cljs.core.nth.call(null,inst_24173,(0),null);
var inst_24175 = cljs.core.nth.call(null,inst_24173,(1),null);
var state_24262__$1 = (function (){var statearr_24265 = state_24262;
(statearr_24265[(8)] = inst_24174);

return statearr_24265;
})();
if(cljs.core.truth_(inst_24175)){
var statearr_24266_24352 = state_24262__$1;
(statearr_24266_24352[(1)] = (22));

} else {
var statearr_24267_24353 = state_24262__$1;
(statearr_24267_24353[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (27))){
var inst_24203 = (state_24262[(9)]);
var inst_24210 = (state_24262[(10)]);
var inst_24205 = (state_24262[(11)]);
var inst_24130 = (state_24262[(12)]);
var inst_24210__$1 = cljs.core._nth.call(null,inst_24203,inst_24205);
var inst_24211 = cljs.core.async.put_BANG_.call(null,inst_24210__$1,inst_24130,done);
var state_24262__$1 = (function (){var statearr_24268 = state_24262;
(statearr_24268[(10)] = inst_24210__$1);

return statearr_24268;
})();
if(cljs.core.truth_(inst_24211)){
var statearr_24269_24354 = state_24262__$1;
(statearr_24269_24354[(1)] = (30));

} else {
var statearr_24270_24355 = state_24262__$1;
(statearr_24270_24355[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (1))){
var state_24262__$1 = state_24262;
var statearr_24271_24356 = state_24262__$1;
(statearr_24271_24356[(2)] = null);

(statearr_24271_24356[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (24))){
var inst_24161 = (state_24262[(7)]);
var inst_24180 = (state_24262[(2)]);
var inst_24181 = cljs.core.next.call(null,inst_24161);
var inst_24139 = inst_24181;
var inst_24140 = null;
var inst_24141 = (0);
var inst_24142 = (0);
var state_24262__$1 = (function (){var statearr_24272 = state_24262;
(statearr_24272[(13)] = inst_24142);

(statearr_24272[(14)] = inst_24139);

(statearr_24272[(15)] = inst_24180);

(statearr_24272[(16)] = inst_24141);

(statearr_24272[(17)] = inst_24140);

return statearr_24272;
})();
var statearr_24273_24357 = state_24262__$1;
(statearr_24273_24357[(2)] = null);

(statearr_24273_24357[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (39))){
var state_24262__$1 = state_24262;
var statearr_24277_24358 = state_24262__$1;
(statearr_24277_24358[(2)] = null);

(statearr_24277_24358[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (4))){
var inst_24130 = (state_24262[(12)]);
var inst_24130__$1 = (state_24262[(2)]);
var inst_24131 = (inst_24130__$1 == null);
var state_24262__$1 = (function (){var statearr_24278 = state_24262;
(statearr_24278[(12)] = inst_24130__$1);

return statearr_24278;
})();
if(cljs.core.truth_(inst_24131)){
var statearr_24279_24359 = state_24262__$1;
(statearr_24279_24359[(1)] = (5));

} else {
var statearr_24280_24360 = state_24262__$1;
(statearr_24280_24360[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (15))){
var inst_24142 = (state_24262[(13)]);
var inst_24139 = (state_24262[(14)]);
var inst_24141 = (state_24262[(16)]);
var inst_24140 = (state_24262[(17)]);
var inst_24157 = (state_24262[(2)]);
var inst_24158 = (inst_24142 + (1));
var tmp24274 = inst_24139;
var tmp24275 = inst_24141;
var tmp24276 = inst_24140;
var inst_24139__$1 = tmp24274;
var inst_24140__$1 = tmp24276;
var inst_24141__$1 = tmp24275;
var inst_24142__$1 = inst_24158;
var state_24262__$1 = (function (){var statearr_24281 = state_24262;
(statearr_24281[(13)] = inst_24142__$1);

(statearr_24281[(14)] = inst_24139__$1);

(statearr_24281[(18)] = inst_24157);

(statearr_24281[(16)] = inst_24141__$1);

(statearr_24281[(17)] = inst_24140__$1);

return statearr_24281;
})();
var statearr_24282_24361 = state_24262__$1;
(statearr_24282_24361[(2)] = null);

(statearr_24282_24361[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (21))){
var inst_24184 = (state_24262[(2)]);
var state_24262__$1 = state_24262;
var statearr_24286_24362 = state_24262__$1;
(statearr_24286_24362[(2)] = inst_24184);

(statearr_24286_24362[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (31))){
var inst_24210 = (state_24262[(10)]);
var inst_24214 = done.call(null,null);
var inst_24215 = cljs.core.async.untap_STAR_.call(null,m,inst_24210);
var state_24262__$1 = (function (){var statearr_24287 = state_24262;
(statearr_24287[(19)] = inst_24214);

return statearr_24287;
})();
var statearr_24288_24363 = state_24262__$1;
(statearr_24288_24363[(2)] = inst_24215);

(statearr_24288_24363[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (32))){
var inst_24203 = (state_24262[(9)]);
var inst_24202 = (state_24262[(20)]);
var inst_24204 = (state_24262[(21)]);
var inst_24205 = (state_24262[(11)]);
var inst_24217 = (state_24262[(2)]);
var inst_24218 = (inst_24205 + (1));
var tmp24283 = inst_24203;
var tmp24284 = inst_24202;
var tmp24285 = inst_24204;
var inst_24202__$1 = tmp24284;
var inst_24203__$1 = tmp24283;
var inst_24204__$1 = tmp24285;
var inst_24205__$1 = inst_24218;
var state_24262__$1 = (function (){var statearr_24289 = state_24262;
(statearr_24289[(9)] = inst_24203__$1);

(statearr_24289[(20)] = inst_24202__$1);

(statearr_24289[(21)] = inst_24204__$1);

(statearr_24289[(22)] = inst_24217);

(statearr_24289[(11)] = inst_24205__$1);

return statearr_24289;
})();
var statearr_24290_24364 = state_24262__$1;
(statearr_24290_24364[(2)] = null);

(statearr_24290_24364[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (40))){
var inst_24230 = (state_24262[(23)]);
var inst_24234 = done.call(null,null);
var inst_24235 = cljs.core.async.untap_STAR_.call(null,m,inst_24230);
var state_24262__$1 = (function (){var statearr_24291 = state_24262;
(statearr_24291[(24)] = inst_24234);

return statearr_24291;
})();
var statearr_24292_24365 = state_24262__$1;
(statearr_24292_24365[(2)] = inst_24235);

(statearr_24292_24365[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (33))){
var inst_24221 = (state_24262[(25)]);
var inst_24223 = cljs.core.chunked_seq_QMARK_.call(null,inst_24221);
var state_24262__$1 = state_24262;
if(inst_24223){
var statearr_24293_24366 = state_24262__$1;
(statearr_24293_24366[(1)] = (36));

} else {
var statearr_24294_24367 = state_24262__$1;
(statearr_24294_24367[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (13))){
var inst_24151 = (state_24262[(26)]);
var inst_24154 = cljs.core.async.close_BANG_.call(null,inst_24151);
var state_24262__$1 = state_24262;
var statearr_24295_24368 = state_24262__$1;
(statearr_24295_24368[(2)] = inst_24154);

(statearr_24295_24368[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (22))){
var inst_24174 = (state_24262[(8)]);
var inst_24177 = cljs.core.async.close_BANG_.call(null,inst_24174);
var state_24262__$1 = state_24262;
var statearr_24296_24369 = state_24262__$1;
(statearr_24296_24369[(2)] = inst_24177);

(statearr_24296_24369[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (36))){
var inst_24221 = (state_24262[(25)]);
var inst_24225 = cljs.core.chunk_first.call(null,inst_24221);
var inst_24226 = cljs.core.chunk_rest.call(null,inst_24221);
var inst_24227 = cljs.core.count.call(null,inst_24225);
var inst_24202 = inst_24226;
var inst_24203 = inst_24225;
var inst_24204 = inst_24227;
var inst_24205 = (0);
var state_24262__$1 = (function (){var statearr_24297 = state_24262;
(statearr_24297[(9)] = inst_24203);

(statearr_24297[(20)] = inst_24202);

(statearr_24297[(21)] = inst_24204);

(statearr_24297[(11)] = inst_24205);

return statearr_24297;
})();
var statearr_24298_24370 = state_24262__$1;
(statearr_24298_24370[(2)] = null);

(statearr_24298_24370[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (41))){
var inst_24221 = (state_24262[(25)]);
var inst_24237 = (state_24262[(2)]);
var inst_24238 = cljs.core.next.call(null,inst_24221);
var inst_24202 = inst_24238;
var inst_24203 = null;
var inst_24204 = (0);
var inst_24205 = (0);
var state_24262__$1 = (function (){var statearr_24299 = state_24262;
(statearr_24299[(9)] = inst_24203);

(statearr_24299[(20)] = inst_24202);

(statearr_24299[(21)] = inst_24204);

(statearr_24299[(11)] = inst_24205);

(statearr_24299[(27)] = inst_24237);

return statearr_24299;
})();
var statearr_24300_24371 = state_24262__$1;
(statearr_24300_24371[(2)] = null);

(statearr_24300_24371[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (43))){
var state_24262__$1 = state_24262;
var statearr_24301_24372 = state_24262__$1;
(statearr_24301_24372[(2)] = null);

(statearr_24301_24372[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (29))){
var inst_24246 = (state_24262[(2)]);
var state_24262__$1 = state_24262;
var statearr_24302_24373 = state_24262__$1;
(statearr_24302_24373[(2)] = inst_24246);

(statearr_24302_24373[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (44))){
var inst_24255 = (state_24262[(2)]);
var state_24262__$1 = (function (){var statearr_24303 = state_24262;
(statearr_24303[(28)] = inst_24255);

return statearr_24303;
})();
var statearr_24304_24374 = state_24262__$1;
(statearr_24304_24374[(2)] = null);

(statearr_24304_24374[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (6))){
var inst_24194 = (state_24262[(29)]);
var inst_24193 = cljs.core.deref.call(null,cs);
var inst_24194__$1 = cljs.core.keys.call(null,inst_24193);
var inst_24195 = cljs.core.count.call(null,inst_24194__$1);
var inst_24196 = cljs.core.reset_BANG_.call(null,dctr,inst_24195);
var inst_24201 = cljs.core.seq.call(null,inst_24194__$1);
var inst_24202 = inst_24201;
var inst_24203 = null;
var inst_24204 = (0);
var inst_24205 = (0);
var state_24262__$1 = (function (){var statearr_24305 = state_24262;
(statearr_24305[(9)] = inst_24203);

(statearr_24305[(20)] = inst_24202);

(statearr_24305[(29)] = inst_24194__$1);

(statearr_24305[(30)] = inst_24196);

(statearr_24305[(21)] = inst_24204);

(statearr_24305[(11)] = inst_24205);

return statearr_24305;
})();
var statearr_24306_24375 = state_24262__$1;
(statearr_24306_24375[(2)] = null);

(statearr_24306_24375[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (28))){
var inst_24202 = (state_24262[(20)]);
var inst_24221 = (state_24262[(25)]);
var inst_24221__$1 = cljs.core.seq.call(null,inst_24202);
var state_24262__$1 = (function (){var statearr_24307 = state_24262;
(statearr_24307[(25)] = inst_24221__$1);

return statearr_24307;
})();
if(inst_24221__$1){
var statearr_24308_24376 = state_24262__$1;
(statearr_24308_24376[(1)] = (33));

} else {
var statearr_24309_24377 = state_24262__$1;
(statearr_24309_24377[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (25))){
var inst_24204 = (state_24262[(21)]);
var inst_24205 = (state_24262[(11)]);
var inst_24207 = (inst_24205 < inst_24204);
var inst_24208 = inst_24207;
var state_24262__$1 = state_24262;
if(cljs.core.truth_(inst_24208)){
var statearr_24310_24378 = state_24262__$1;
(statearr_24310_24378[(1)] = (27));

} else {
var statearr_24311_24379 = state_24262__$1;
(statearr_24311_24379[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (34))){
var state_24262__$1 = state_24262;
var statearr_24312_24380 = state_24262__$1;
(statearr_24312_24380[(2)] = null);

(statearr_24312_24380[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (17))){
var state_24262__$1 = state_24262;
var statearr_24313_24381 = state_24262__$1;
(statearr_24313_24381[(2)] = null);

(statearr_24313_24381[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (3))){
var inst_24260 = (state_24262[(2)]);
var state_24262__$1 = state_24262;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24262__$1,inst_24260);
} else {
if((state_val_24263 === (12))){
var inst_24189 = (state_24262[(2)]);
var state_24262__$1 = state_24262;
var statearr_24314_24382 = state_24262__$1;
(statearr_24314_24382[(2)] = inst_24189);

(statearr_24314_24382[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (2))){
var state_24262__$1 = state_24262;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24262__$1,(4),ch);
} else {
if((state_val_24263 === (23))){
var state_24262__$1 = state_24262;
var statearr_24315_24383 = state_24262__$1;
(statearr_24315_24383[(2)] = null);

(statearr_24315_24383[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (35))){
var inst_24244 = (state_24262[(2)]);
var state_24262__$1 = state_24262;
var statearr_24316_24384 = state_24262__$1;
(statearr_24316_24384[(2)] = inst_24244);

(statearr_24316_24384[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (19))){
var inst_24161 = (state_24262[(7)]);
var inst_24165 = cljs.core.chunk_first.call(null,inst_24161);
var inst_24166 = cljs.core.chunk_rest.call(null,inst_24161);
var inst_24167 = cljs.core.count.call(null,inst_24165);
var inst_24139 = inst_24166;
var inst_24140 = inst_24165;
var inst_24141 = inst_24167;
var inst_24142 = (0);
var state_24262__$1 = (function (){var statearr_24317 = state_24262;
(statearr_24317[(13)] = inst_24142);

(statearr_24317[(14)] = inst_24139);

(statearr_24317[(16)] = inst_24141);

(statearr_24317[(17)] = inst_24140);

return statearr_24317;
})();
var statearr_24318_24385 = state_24262__$1;
(statearr_24318_24385[(2)] = null);

(statearr_24318_24385[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (11))){
var inst_24139 = (state_24262[(14)]);
var inst_24161 = (state_24262[(7)]);
var inst_24161__$1 = cljs.core.seq.call(null,inst_24139);
var state_24262__$1 = (function (){var statearr_24319 = state_24262;
(statearr_24319[(7)] = inst_24161__$1);

return statearr_24319;
})();
if(inst_24161__$1){
var statearr_24320_24386 = state_24262__$1;
(statearr_24320_24386[(1)] = (16));

} else {
var statearr_24321_24387 = state_24262__$1;
(statearr_24321_24387[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (9))){
var inst_24191 = (state_24262[(2)]);
var state_24262__$1 = state_24262;
var statearr_24322_24388 = state_24262__$1;
(statearr_24322_24388[(2)] = inst_24191);

(statearr_24322_24388[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (5))){
var inst_24137 = cljs.core.deref.call(null,cs);
var inst_24138 = cljs.core.seq.call(null,inst_24137);
var inst_24139 = inst_24138;
var inst_24140 = null;
var inst_24141 = (0);
var inst_24142 = (0);
var state_24262__$1 = (function (){var statearr_24323 = state_24262;
(statearr_24323[(13)] = inst_24142);

(statearr_24323[(14)] = inst_24139);

(statearr_24323[(16)] = inst_24141);

(statearr_24323[(17)] = inst_24140);

return statearr_24323;
})();
var statearr_24324_24389 = state_24262__$1;
(statearr_24324_24389[(2)] = null);

(statearr_24324_24389[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (14))){
var state_24262__$1 = state_24262;
var statearr_24325_24390 = state_24262__$1;
(statearr_24325_24390[(2)] = null);

(statearr_24325_24390[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (45))){
var inst_24252 = (state_24262[(2)]);
var state_24262__$1 = state_24262;
var statearr_24326_24391 = state_24262__$1;
(statearr_24326_24391[(2)] = inst_24252);

(statearr_24326_24391[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (26))){
var inst_24194 = (state_24262[(29)]);
var inst_24248 = (state_24262[(2)]);
var inst_24249 = cljs.core.seq.call(null,inst_24194);
var state_24262__$1 = (function (){var statearr_24327 = state_24262;
(statearr_24327[(31)] = inst_24248);

return statearr_24327;
})();
if(inst_24249){
var statearr_24328_24392 = state_24262__$1;
(statearr_24328_24392[(1)] = (42));

} else {
var statearr_24329_24393 = state_24262__$1;
(statearr_24329_24393[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (16))){
var inst_24161 = (state_24262[(7)]);
var inst_24163 = cljs.core.chunked_seq_QMARK_.call(null,inst_24161);
var state_24262__$1 = state_24262;
if(inst_24163){
var statearr_24330_24394 = state_24262__$1;
(statearr_24330_24394[(1)] = (19));

} else {
var statearr_24331_24395 = state_24262__$1;
(statearr_24331_24395[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (38))){
var inst_24241 = (state_24262[(2)]);
var state_24262__$1 = state_24262;
var statearr_24332_24396 = state_24262__$1;
(statearr_24332_24396[(2)] = inst_24241);

(statearr_24332_24396[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (30))){
var state_24262__$1 = state_24262;
var statearr_24333_24397 = state_24262__$1;
(statearr_24333_24397[(2)] = null);

(statearr_24333_24397[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (10))){
var inst_24142 = (state_24262[(13)]);
var inst_24140 = (state_24262[(17)]);
var inst_24150 = cljs.core._nth.call(null,inst_24140,inst_24142);
var inst_24151 = cljs.core.nth.call(null,inst_24150,(0),null);
var inst_24152 = cljs.core.nth.call(null,inst_24150,(1),null);
var state_24262__$1 = (function (){var statearr_24334 = state_24262;
(statearr_24334[(26)] = inst_24151);

return statearr_24334;
})();
if(cljs.core.truth_(inst_24152)){
var statearr_24335_24398 = state_24262__$1;
(statearr_24335_24398[(1)] = (13));

} else {
var statearr_24336_24399 = state_24262__$1;
(statearr_24336_24399[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (18))){
var inst_24187 = (state_24262[(2)]);
var state_24262__$1 = state_24262;
var statearr_24337_24400 = state_24262__$1;
(statearr_24337_24400[(2)] = inst_24187);

(statearr_24337_24400[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (42))){
var state_24262__$1 = state_24262;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24262__$1,(45),dchan);
} else {
if((state_val_24263 === (37))){
var inst_24130 = (state_24262[(12)]);
var inst_24230 = (state_24262[(23)]);
var inst_24221 = (state_24262[(25)]);
var inst_24230__$1 = cljs.core.first.call(null,inst_24221);
var inst_24231 = cljs.core.async.put_BANG_.call(null,inst_24230__$1,inst_24130,done);
var state_24262__$1 = (function (){var statearr_24338 = state_24262;
(statearr_24338[(23)] = inst_24230__$1);

return statearr_24338;
})();
if(cljs.core.truth_(inst_24231)){
var statearr_24339_24401 = state_24262__$1;
(statearr_24339_24401[(1)] = (39));

} else {
var statearr_24340_24402 = state_24262__$1;
(statearr_24340_24402[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24263 === (8))){
var inst_24142 = (state_24262[(13)]);
var inst_24141 = (state_24262[(16)]);
var inst_24144 = (inst_24142 < inst_24141);
var inst_24145 = inst_24144;
var state_24262__$1 = state_24262;
if(cljs.core.truth_(inst_24145)){
var statearr_24341_24403 = state_24262__$1;
(statearr_24341_24403[(1)] = (10));

} else {
var statearr_24342_24404 = state_24262__$1;
(statearr_24342_24404[(1)] = (11));

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
});})(c__23027__auto___24350,cs,m,dchan,dctr,done))
;
return ((function (switch__22962__auto__,c__23027__auto___24350,cs,m,dchan,dctr,done){
return (function() {
var cljs$core$async$mult_$_state_machine__22963__auto__ = null;
var cljs$core$async$mult_$_state_machine__22963__auto____0 = (function (){
var statearr_24346 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_24346[(0)] = cljs$core$async$mult_$_state_machine__22963__auto__);

(statearr_24346[(1)] = (1));

return statearr_24346;
});
var cljs$core$async$mult_$_state_machine__22963__auto____1 = (function (state_24262){
while(true){
var ret_value__22964__auto__ = (function (){try{while(true){
var result__22965__auto__ = switch__22962__auto__.call(null,state_24262);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22965__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22965__auto__;
}
break;
}
}catch (e24347){if((e24347 instanceof Object)){
var ex__22966__auto__ = e24347;
var statearr_24348_24405 = state_24262;
(statearr_24348_24405[(5)] = ex__22966__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24262);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e24347;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22964__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__24406 = state_24262;
state_24262 = G__24406;
continue;
} else {
return ret_value__22964__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__22963__auto__ = function(state_24262){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__22963__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__22963__auto____1.call(this,state_24262);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__22963__auto____0;
cljs$core$async$mult_$_state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__22963__auto____1;
return cljs$core$async$mult_$_state_machine__22963__auto__;
})()
;})(switch__22962__auto__,c__23027__auto___24350,cs,m,dchan,dctr,done))
})();
var state__23029__auto__ = (function (){var statearr_24349 = f__23028__auto__.call(null);
(statearr_24349[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__23027__auto___24350);

return statearr_24349;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23029__auto__);
});})(c__23027__auto___24350,cs,m,dchan,dctr,done))
);


return m;
});
/**
 * Copies the mult source onto the supplied channel.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.tap = (function cljs$core$async$tap(var_args){
var args24407 = [];
var len__21234__auto___24410 = arguments.length;
var i__21235__auto___24411 = (0);
while(true){
if((i__21235__auto___24411 < len__21234__auto___24410)){
args24407.push((arguments[i__21235__auto___24411]));

var G__24412 = (i__21235__auto___24411 + (1));
i__21235__auto___24411 = G__24412;
continue;
} else {
}
break;
}

var G__24409 = args24407.length;
switch (G__24409) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args24407.length)].join('')));

}
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2 = (function (mult,ch){
return cljs.core.async.tap.call(null,mult,ch,true);
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3 = (function (mult,ch,close_QMARK_){
cljs.core.async.tap_STAR_.call(null,mult,ch,close_QMARK_);

return ch;
});

cljs.core.async.tap.cljs$lang$maxFixedArity = 3;

/**
 * Disconnects a target channel from a mult
 */
cljs.core.async.untap = (function cljs$core$async$untap(mult,ch){
return cljs.core.async.untap_STAR_.call(null,mult,ch);
});
/**
 * Disconnects all target channels from a mult
 */
cljs.core.async.untap_all = (function cljs$core$async$untap_all(mult){
return cljs.core.async.untap_all_STAR_.call(null,mult);
});

/**
 * @interface
 */
cljs.core.async.Mix = function(){};

cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mix$admix_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
var x__20822__auto__ = (((m == null))?null:m);
var m__20823__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__20822__auto__)]);
if(!((m__20823__auto__ == null))){
return m__20823__auto__.call(null,m,ch);
} else {
var m__20823__auto____$1 = (cljs.core.async.admix_STAR_["_"]);
if(!((m__20823__auto____$1 == null))){
return m__20823__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.admix*",m);
}
}
}
});

cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mix$unmix_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
var x__20822__auto__ = (((m == null))?null:m);
var m__20823__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__20822__auto__)]);
if(!((m__20823__auto__ == null))){
return m__20823__auto__.call(null,m,ch);
} else {
var m__20823__auto____$1 = (cljs.core.async.unmix_STAR_["_"]);
if(!((m__20823__auto____$1 == null))){
return m__20823__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix*",m);
}
}
}
});

cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((!((m == null))) && (!((m.cljs$core$async$Mix$unmix_all_STAR_$arity$1 == null)))){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
var x__20822__auto__ = (((m == null))?null:m);
var m__20823__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__20822__auto__)]);
if(!((m__20823__auto__ == null))){
return m__20823__auto__.call(null,m);
} else {
var m__20823__auto____$1 = (cljs.core.async.unmix_all_STAR_["_"]);
if(!((m__20823__auto____$1 == null))){
return m__20823__auto____$1.call(null,m);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix-all*",m);
}
}
}
});

cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((!((m == null))) && (!((m.cljs$core$async$Mix$toggle_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
var x__20822__auto__ = (((m == null))?null:m);
var m__20823__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__20822__auto__)]);
if(!((m__20823__auto__ == null))){
return m__20823__auto__.call(null,m,state_map);
} else {
var m__20823__auto____$1 = (cljs.core.async.toggle_STAR_["_"]);
if(!((m__20823__auto____$1 == null))){
return m__20823__auto____$1.call(null,m,state_map);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.toggle*",m);
}
}
}
});

cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((!((m == null))) && (!((m.cljs$core$async$Mix$solo_mode_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
var x__20822__auto__ = (((m == null))?null:m);
var m__20823__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__20822__auto__)]);
if(!((m__20823__auto__ == null))){
return m__20823__auto__.call(null,m,mode);
} else {
var m__20823__auto____$1 = (cljs.core.async.solo_mode_STAR_["_"]);
if(!((m__20823__auto____$1 == null))){
return m__20823__auto____$1.call(null,m,mode);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.solo-mode*",m);
}
}
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__21241__auto__ = [];
var len__21234__auto___24424 = arguments.length;
var i__21235__auto___24425 = (0);
while(true){
if((i__21235__auto___24425 < len__21234__auto___24424)){
args__21241__auto__.push((arguments[i__21235__auto___24425]));

var G__24426 = (i__21235__auto___24425 + (1));
i__21235__auto___24425 = G__24426;
continue;
} else {
}
break;
}

var argseq__21242__auto__ = ((((3) < args__21241__auto__.length))?(new cljs.core.IndexedSeq(args__21241__auto__.slice((3)),(0),null)):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__21242__auto__);
});

cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__24418){
var map__24419 = p__24418;
var map__24419__$1 = ((((!((map__24419 == null)))?((((map__24419.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24419.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__24419):map__24419);
var opts = map__24419__$1;
var statearr_24421_24427 = state;
(statearr_24421_24427[cljs.core.async.impl.ioc_helpers.STATE_IDX] = cont_block);


var temp__4657__auto__ = cljs.core.async.do_alts.call(null,((function (map__24419,map__24419__$1,opts){
return (function (val){
var statearr_24422_24428 = state;
(statearr_24422_24428[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state);
});})(map__24419,map__24419__$1,opts))
,ports,opts);
if(cljs.core.truth_(temp__4657__auto__)){
var cb = temp__4657__auto__;
var statearr_24423_24429 = state;
(statearr_24423_24429[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref.call(null,cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
});

cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3);

cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq24414){
var G__24415 = cljs.core.first.call(null,seq24414);
var seq24414__$1 = cljs.core.next.call(null,seq24414);
var G__24416 = cljs.core.first.call(null,seq24414__$1);
var seq24414__$2 = cljs.core.next.call(null,seq24414__$1);
var G__24417 = cljs.core.first.call(null,seq24414__$2);
var seq24414__$3 = cljs.core.next.call(null,seq24414__$2);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__24415,G__24416,G__24417,seq24414__$3);
});

/**
 * Creates and returns a mix of one or more input channels which will
 *   be put on the supplied out channel. Input sources can be added to
 *   the mix with 'admix', and removed with 'unmix'. A mix supports
 *   soloing, muting and pausing multiple inputs atomically using
 *   'toggle', and can solo using either muting or pausing as determined
 *   by 'solo-mode'.
 * 
 *   Each channel can have zero or more boolean modes set via 'toggle':
 * 
 *   :solo - when true, only this (ond other soloed) channel(s) will appear
 *        in the mix output channel. :mute and :pause states of soloed
 *        channels are ignored. If solo-mode is :mute, non-soloed
 *        channels are muted, if :pause, non-soloed channels are
 *        paused.
 * 
 *   :mute - muted channels will have their contents consumed but not included in the mix
 *   :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
 */
cljs.core.async.mix = (function cljs$core$async$mix(out){
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);
var attrs = cljs.core.conj.call(null,solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));
var solo_mode = cljs.core.atom.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646));
var change = cljs.core.async.chan.call(null);
var changed = ((function (cs,solo_modes,attrs,solo_mode,change){
return (function (){
return cljs.core.async.put_BANG_.call(null,change,true);
});})(cs,solo_modes,attrs,solo_mode,change))
;
var pick = ((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (attr,chs){
return cljs.core.reduce_kv.call(null,((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (ret,c,v){
if(cljs.core.truth_(attr.call(null,v))){
return cljs.core.conj.call(null,ret,c);
} else {
return ret;
}
});})(cs,solo_modes,attrs,solo_mode,change,changed))
,cljs.core.PersistentHashSet.EMPTY,chs);
});})(cs,solo_modes,attrs,solo_mode,change,changed))
;
var calc_state = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick){
return (function (){
var chs = cljs.core.deref.call(null,cs);
var mode = cljs.core.deref.call(null,solo_mode);
var solos = pick.call(null,new cljs.core.Keyword(null,"solo","solo",-316350075),chs);
var pauses = pick.call(null,new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.call(null,(((cljs.core._EQ_.call(null,mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && (!(cljs.core.empty_QMARK_.call(null,solos))))?cljs.core.vec.call(null,solos):cljs.core.vec.call(null,cljs.core.remove.call(null,pauses,cljs.core.keys.call(null,chs)))),change)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick))
;
var m = (function (){
if(typeof cljs.core.async.t_cljs$core$async24595 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async24595 = (function (change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta24596){
this.change = change;
this.mix = mix;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta24596 = meta24596;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async24595.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_24597,meta24596__$1){
var self__ = this;
var _24597__$1 = this;
return (new cljs.core.async.t_cljs$core$async24595(self__.change,self__.mix,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta24596__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async24595.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_24597){
var self__ = this;
var _24597__$1 = this;
return self__.meta24596;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async24595.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async24595.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async24595.prototype.cljs$core$async$Mix$ = true;

cljs.core.async.t_cljs$core$async24595.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async24595.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async24595.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async24595.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async24595.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.solo_modes.call(null,mode))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("mode must be one of: "),cljs.core.str(self__.solo_modes)].join('')),cljs.core.str("\n"),cljs.core.str("(solo-modes mode)")].join('')));
}

cljs.core.reset_BANG_.call(null,self__.solo_mode,mode);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async24595.getBasis = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (){
return new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),cljs.core.with_meta(new cljs.core.Symbol(null,"mix","mix",2121373763,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"out","out",729986010,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Creates and returns a mix of one or more input channels which will\n  be put on the supplied out channel. Input sources can be added to\n  the mix with 'admix', and removed with 'unmix'. A mix supports\n  soloing, muting and pausing multiple inputs atomically using\n  'toggle', and can solo using either muting or pausing as determined\n  by 'solo-mode'.\n\n  Each channel can have zero or more boolean modes set via 'toggle':\n\n  :solo - when true, only this (ond other soloed) channel(s) will appear\n          in the mix output channel. :mute and :pause states of soloed\n          channels are ignored. If solo-mode is :mute, non-soloed\n          channels are muted, if :pause, non-soloed channels are\n          paused.\n\n  :mute - muted channels will have their contents consumed but not included in the mix\n  :pause - paused channels will not have their contents consumed (and thus also not included in the mix)\n"], null)),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta24596","meta24596",1979286196,null)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async24595.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async24595.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async24595";

cljs.core.async.t_cljs$core$async24595.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__20765__auto__,writer__20766__auto__,opt__20767__auto__){
return cljs.core._write.call(null,writer__20766__auto__,"cljs.core.async/t_cljs$core$async24595");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.__GT_t_cljs$core$async24595 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function cljs$core$async$mix_$___GT_t_cljs$core$async24595(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta24596){
return (new cljs.core.async.t_cljs$core$async24595(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta24596));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

}

return (new cljs.core.async.t_cljs$core$async24595(change,cljs$core$async$mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__23027__auto___24760 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23027__auto___24760,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (){
var f__23028__auto__ = (function (){var switch__22962__auto__ = ((function (c__23027__auto___24760,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (state_24697){
var state_val_24698 = (state_24697[(1)]);
if((state_val_24698 === (7))){
var inst_24613 = (state_24697[(2)]);
var state_24697__$1 = state_24697;
var statearr_24699_24761 = state_24697__$1;
(statearr_24699_24761[(2)] = inst_24613);

(statearr_24699_24761[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (20))){
var inst_24625 = (state_24697[(7)]);
var state_24697__$1 = state_24697;
var statearr_24700_24762 = state_24697__$1;
(statearr_24700_24762[(2)] = inst_24625);

(statearr_24700_24762[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (27))){
var state_24697__$1 = state_24697;
var statearr_24701_24763 = state_24697__$1;
(statearr_24701_24763[(2)] = null);

(statearr_24701_24763[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (1))){
var inst_24601 = (state_24697[(8)]);
var inst_24601__$1 = calc_state.call(null);
var inst_24603 = (inst_24601__$1 == null);
var inst_24604 = cljs.core.not.call(null,inst_24603);
var state_24697__$1 = (function (){var statearr_24702 = state_24697;
(statearr_24702[(8)] = inst_24601__$1);

return statearr_24702;
})();
if(inst_24604){
var statearr_24703_24764 = state_24697__$1;
(statearr_24703_24764[(1)] = (2));

} else {
var statearr_24704_24765 = state_24697__$1;
(statearr_24704_24765[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (24))){
var inst_24657 = (state_24697[(9)]);
var inst_24671 = (state_24697[(10)]);
var inst_24648 = (state_24697[(11)]);
var inst_24671__$1 = inst_24648.call(null,inst_24657);
var state_24697__$1 = (function (){var statearr_24705 = state_24697;
(statearr_24705[(10)] = inst_24671__$1);

return statearr_24705;
})();
if(cljs.core.truth_(inst_24671__$1)){
var statearr_24706_24766 = state_24697__$1;
(statearr_24706_24766[(1)] = (29));

} else {
var statearr_24707_24767 = state_24697__$1;
(statearr_24707_24767[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (4))){
var inst_24616 = (state_24697[(2)]);
var state_24697__$1 = state_24697;
if(cljs.core.truth_(inst_24616)){
var statearr_24708_24768 = state_24697__$1;
(statearr_24708_24768[(1)] = (8));

} else {
var statearr_24709_24769 = state_24697__$1;
(statearr_24709_24769[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (15))){
var inst_24642 = (state_24697[(2)]);
var state_24697__$1 = state_24697;
if(cljs.core.truth_(inst_24642)){
var statearr_24710_24770 = state_24697__$1;
(statearr_24710_24770[(1)] = (19));

} else {
var statearr_24711_24771 = state_24697__$1;
(statearr_24711_24771[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (21))){
var inst_24647 = (state_24697[(12)]);
var inst_24647__$1 = (state_24697[(2)]);
var inst_24648 = cljs.core.get.call(null,inst_24647__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_24649 = cljs.core.get.call(null,inst_24647__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_24650 = cljs.core.get.call(null,inst_24647__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_24697__$1 = (function (){var statearr_24712 = state_24697;
(statearr_24712[(12)] = inst_24647__$1);

(statearr_24712[(11)] = inst_24648);

(statearr_24712[(13)] = inst_24649);

return statearr_24712;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_24697__$1,(22),inst_24650);
} else {
if((state_val_24698 === (31))){
var inst_24679 = (state_24697[(2)]);
var state_24697__$1 = state_24697;
if(cljs.core.truth_(inst_24679)){
var statearr_24713_24772 = state_24697__$1;
(statearr_24713_24772[(1)] = (32));

} else {
var statearr_24714_24773 = state_24697__$1;
(statearr_24714_24773[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (32))){
var inst_24656 = (state_24697[(14)]);
var state_24697__$1 = state_24697;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24697__$1,(35),out,inst_24656);
} else {
if((state_val_24698 === (33))){
var inst_24647 = (state_24697[(12)]);
var inst_24625 = inst_24647;
var state_24697__$1 = (function (){var statearr_24715 = state_24697;
(statearr_24715[(7)] = inst_24625);

return statearr_24715;
})();
var statearr_24716_24774 = state_24697__$1;
(statearr_24716_24774[(2)] = null);

(statearr_24716_24774[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (13))){
var inst_24625 = (state_24697[(7)]);
var inst_24632 = inst_24625.cljs$lang$protocol_mask$partition0$;
var inst_24633 = (inst_24632 & (64));
var inst_24634 = inst_24625.cljs$core$ISeq$;
var inst_24635 = (inst_24633) || (inst_24634);
var state_24697__$1 = state_24697;
if(cljs.core.truth_(inst_24635)){
var statearr_24717_24775 = state_24697__$1;
(statearr_24717_24775[(1)] = (16));

} else {
var statearr_24718_24776 = state_24697__$1;
(statearr_24718_24776[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (22))){
var inst_24656 = (state_24697[(14)]);
var inst_24657 = (state_24697[(9)]);
var inst_24655 = (state_24697[(2)]);
var inst_24656__$1 = cljs.core.nth.call(null,inst_24655,(0),null);
var inst_24657__$1 = cljs.core.nth.call(null,inst_24655,(1),null);
var inst_24658 = (inst_24656__$1 == null);
var inst_24659 = cljs.core._EQ_.call(null,inst_24657__$1,change);
var inst_24660 = (inst_24658) || (inst_24659);
var state_24697__$1 = (function (){var statearr_24719 = state_24697;
(statearr_24719[(14)] = inst_24656__$1);

(statearr_24719[(9)] = inst_24657__$1);

return statearr_24719;
})();
if(cljs.core.truth_(inst_24660)){
var statearr_24720_24777 = state_24697__$1;
(statearr_24720_24777[(1)] = (23));

} else {
var statearr_24721_24778 = state_24697__$1;
(statearr_24721_24778[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (36))){
var inst_24647 = (state_24697[(12)]);
var inst_24625 = inst_24647;
var state_24697__$1 = (function (){var statearr_24722 = state_24697;
(statearr_24722[(7)] = inst_24625);

return statearr_24722;
})();
var statearr_24723_24779 = state_24697__$1;
(statearr_24723_24779[(2)] = null);

(statearr_24723_24779[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (29))){
var inst_24671 = (state_24697[(10)]);
var state_24697__$1 = state_24697;
var statearr_24724_24780 = state_24697__$1;
(statearr_24724_24780[(2)] = inst_24671);

(statearr_24724_24780[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (6))){
var state_24697__$1 = state_24697;
var statearr_24725_24781 = state_24697__$1;
(statearr_24725_24781[(2)] = false);

(statearr_24725_24781[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (28))){
var inst_24667 = (state_24697[(2)]);
var inst_24668 = calc_state.call(null);
var inst_24625 = inst_24668;
var state_24697__$1 = (function (){var statearr_24726 = state_24697;
(statearr_24726[(15)] = inst_24667);

(statearr_24726[(7)] = inst_24625);

return statearr_24726;
})();
var statearr_24727_24782 = state_24697__$1;
(statearr_24727_24782[(2)] = null);

(statearr_24727_24782[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (25))){
var inst_24693 = (state_24697[(2)]);
var state_24697__$1 = state_24697;
var statearr_24728_24783 = state_24697__$1;
(statearr_24728_24783[(2)] = inst_24693);

(statearr_24728_24783[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (34))){
var inst_24691 = (state_24697[(2)]);
var state_24697__$1 = state_24697;
var statearr_24729_24784 = state_24697__$1;
(statearr_24729_24784[(2)] = inst_24691);

(statearr_24729_24784[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (17))){
var state_24697__$1 = state_24697;
var statearr_24730_24785 = state_24697__$1;
(statearr_24730_24785[(2)] = false);

(statearr_24730_24785[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (3))){
var state_24697__$1 = state_24697;
var statearr_24731_24786 = state_24697__$1;
(statearr_24731_24786[(2)] = false);

(statearr_24731_24786[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (12))){
var inst_24695 = (state_24697[(2)]);
var state_24697__$1 = state_24697;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24697__$1,inst_24695);
} else {
if((state_val_24698 === (2))){
var inst_24601 = (state_24697[(8)]);
var inst_24606 = inst_24601.cljs$lang$protocol_mask$partition0$;
var inst_24607 = (inst_24606 & (64));
var inst_24608 = inst_24601.cljs$core$ISeq$;
var inst_24609 = (inst_24607) || (inst_24608);
var state_24697__$1 = state_24697;
if(cljs.core.truth_(inst_24609)){
var statearr_24732_24787 = state_24697__$1;
(statearr_24732_24787[(1)] = (5));

} else {
var statearr_24733_24788 = state_24697__$1;
(statearr_24733_24788[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (23))){
var inst_24656 = (state_24697[(14)]);
var inst_24662 = (inst_24656 == null);
var state_24697__$1 = state_24697;
if(cljs.core.truth_(inst_24662)){
var statearr_24734_24789 = state_24697__$1;
(statearr_24734_24789[(1)] = (26));

} else {
var statearr_24735_24790 = state_24697__$1;
(statearr_24735_24790[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (35))){
var inst_24682 = (state_24697[(2)]);
var state_24697__$1 = state_24697;
if(cljs.core.truth_(inst_24682)){
var statearr_24736_24791 = state_24697__$1;
(statearr_24736_24791[(1)] = (36));

} else {
var statearr_24737_24792 = state_24697__$1;
(statearr_24737_24792[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (19))){
var inst_24625 = (state_24697[(7)]);
var inst_24644 = cljs.core.apply.call(null,cljs.core.hash_map,inst_24625);
var state_24697__$1 = state_24697;
var statearr_24738_24793 = state_24697__$1;
(statearr_24738_24793[(2)] = inst_24644);

(statearr_24738_24793[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (11))){
var inst_24625 = (state_24697[(7)]);
var inst_24629 = (inst_24625 == null);
var inst_24630 = cljs.core.not.call(null,inst_24629);
var state_24697__$1 = state_24697;
if(inst_24630){
var statearr_24739_24794 = state_24697__$1;
(statearr_24739_24794[(1)] = (13));

} else {
var statearr_24740_24795 = state_24697__$1;
(statearr_24740_24795[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (9))){
var inst_24601 = (state_24697[(8)]);
var state_24697__$1 = state_24697;
var statearr_24741_24796 = state_24697__$1;
(statearr_24741_24796[(2)] = inst_24601);

(statearr_24741_24796[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (5))){
var state_24697__$1 = state_24697;
var statearr_24742_24797 = state_24697__$1;
(statearr_24742_24797[(2)] = true);

(statearr_24742_24797[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (14))){
var state_24697__$1 = state_24697;
var statearr_24743_24798 = state_24697__$1;
(statearr_24743_24798[(2)] = false);

(statearr_24743_24798[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (26))){
var inst_24657 = (state_24697[(9)]);
var inst_24664 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_24657);
var state_24697__$1 = state_24697;
var statearr_24744_24799 = state_24697__$1;
(statearr_24744_24799[(2)] = inst_24664);

(statearr_24744_24799[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (16))){
var state_24697__$1 = state_24697;
var statearr_24745_24800 = state_24697__$1;
(statearr_24745_24800[(2)] = true);

(statearr_24745_24800[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (38))){
var inst_24687 = (state_24697[(2)]);
var state_24697__$1 = state_24697;
var statearr_24746_24801 = state_24697__$1;
(statearr_24746_24801[(2)] = inst_24687);

(statearr_24746_24801[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (30))){
var inst_24657 = (state_24697[(9)]);
var inst_24648 = (state_24697[(11)]);
var inst_24649 = (state_24697[(13)]);
var inst_24674 = cljs.core.empty_QMARK_.call(null,inst_24648);
var inst_24675 = inst_24649.call(null,inst_24657);
var inst_24676 = cljs.core.not.call(null,inst_24675);
var inst_24677 = (inst_24674) && (inst_24676);
var state_24697__$1 = state_24697;
var statearr_24747_24802 = state_24697__$1;
(statearr_24747_24802[(2)] = inst_24677);

(statearr_24747_24802[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (10))){
var inst_24601 = (state_24697[(8)]);
var inst_24621 = (state_24697[(2)]);
var inst_24622 = cljs.core.get.call(null,inst_24621,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_24623 = cljs.core.get.call(null,inst_24621,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_24624 = cljs.core.get.call(null,inst_24621,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_24625 = inst_24601;
var state_24697__$1 = (function (){var statearr_24748 = state_24697;
(statearr_24748[(16)] = inst_24623);

(statearr_24748[(17)] = inst_24624);

(statearr_24748[(18)] = inst_24622);

(statearr_24748[(7)] = inst_24625);

return statearr_24748;
})();
var statearr_24749_24803 = state_24697__$1;
(statearr_24749_24803[(2)] = null);

(statearr_24749_24803[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (18))){
var inst_24639 = (state_24697[(2)]);
var state_24697__$1 = state_24697;
var statearr_24750_24804 = state_24697__$1;
(statearr_24750_24804[(2)] = inst_24639);

(statearr_24750_24804[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (37))){
var state_24697__$1 = state_24697;
var statearr_24751_24805 = state_24697__$1;
(statearr_24751_24805[(2)] = null);

(statearr_24751_24805[(1)] = (38));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24698 === (8))){
var inst_24601 = (state_24697[(8)]);
var inst_24618 = cljs.core.apply.call(null,cljs.core.hash_map,inst_24601);
var state_24697__$1 = state_24697;
var statearr_24752_24806 = state_24697__$1;
(statearr_24752_24806[(2)] = inst_24618);

(statearr_24752_24806[(1)] = (10));


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
});})(c__23027__auto___24760,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
;
return ((function (switch__22962__auto__,c__23027__auto___24760,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function() {
var cljs$core$async$mix_$_state_machine__22963__auto__ = null;
var cljs$core$async$mix_$_state_machine__22963__auto____0 = (function (){
var statearr_24756 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_24756[(0)] = cljs$core$async$mix_$_state_machine__22963__auto__);

(statearr_24756[(1)] = (1));

return statearr_24756;
});
var cljs$core$async$mix_$_state_machine__22963__auto____1 = (function (state_24697){
while(true){
var ret_value__22964__auto__ = (function (){try{while(true){
var result__22965__auto__ = switch__22962__auto__.call(null,state_24697);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22965__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22965__auto__;
}
break;
}
}catch (e24757){if((e24757 instanceof Object)){
var ex__22966__auto__ = e24757;
var statearr_24758_24807 = state_24697;
(statearr_24758_24807[(5)] = ex__22966__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24697);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e24757;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22964__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__24808 = state_24697;
state_24697 = G__24808;
continue;
} else {
return ret_value__22964__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__22963__auto__ = function(state_24697){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__22963__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__22963__auto____1.call(this,state_24697);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__22963__auto____0;
cljs$core$async$mix_$_state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__22963__auto____1;
return cljs$core$async$mix_$_state_machine__22963__auto__;
})()
;})(switch__22962__auto__,c__23027__auto___24760,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
})();
var state__23029__auto__ = (function (){var statearr_24759 = f__23028__auto__.call(null);
(statearr_24759[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__23027__auto___24760);

return statearr_24759;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23029__auto__);
});})(c__23027__auto___24760,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
);


return m;
});
/**
 * Adds ch as an input to the mix
 */
cljs.core.async.admix = (function cljs$core$async$admix(mix,ch){
return cljs.core.async.admix_STAR_.call(null,mix,ch);
});
/**
 * Removes ch as an input to the mix
 */
cljs.core.async.unmix = (function cljs$core$async$unmix(mix,ch){
return cljs.core.async.unmix_STAR_.call(null,mix,ch);
});
/**
 * removes all inputs from the mix
 */
cljs.core.async.unmix_all = (function cljs$core$async$unmix_all(mix){
return cljs.core.async.unmix_all_STAR_.call(null,mix);
});
/**
 * Atomically sets the state(s) of one or more channels in a mix. The
 *   state map is a map of channels -> channel-state-map. A
 *   channel-state-map is a map of attrs -> boolean, where attr is one or
 *   more of :mute, :pause or :solo. Any states supplied are merged with
 *   the current state.
 * 
 *   Note that channels can be added to a mix via toggle, which can be
 *   used to add channels in a particular (e.g. paused) state.
 */
cljs.core.async.toggle = (function cljs$core$async$toggle(mix,state_map){
return cljs.core.async.toggle_STAR_.call(null,mix,state_map);
});
/**
 * Sets the solo mode of the mix. mode must be one of :mute or :pause
 */
cljs.core.async.solo_mode = (function cljs$core$async$solo_mode(mix,mode){
return cljs.core.async.solo_mode_STAR_.call(null,mix,mode);
});

/**
 * @interface
 */
cljs.core.async.Pub = function(){};

cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((!((p == null))) && (!((p.cljs$core$async$Pub$sub_STAR_$arity$4 == null)))){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
var x__20822__auto__ = (((p == null))?null:p);
var m__20823__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__20822__auto__)]);
if(!((m__20823__auto__ == null))){
return m__20823__auto__.call(null,p,v,ch,close_QMARK_);
} else {
var m__20823__auto____$1 = (cljs.core.async.sub_STAR_["_"]);
if(!((m__20823__auto____$1 == null))){
return m__20823__auto____$1.call(null,p,v,ch,close_QMARK_);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.sub*",p);
}
}
}
});

cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_STAR_$arity$3 == null)))){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
var x__20822__auto__ = (((p == null))?null:p);
var m__20823__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__20822__auto__)]);
if(!((m__20823__auto__ == null))){
return m__20823__auto__.call(null,p,v,ch);
} else {
var m__20823__auto____$1 = (cljs.core.async.unsub_STAR_["_"]);
if(!((m__20823__auto____$1 == null))){
return m__20823__auto____$1.call(null,p,v,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var args24809 = [];
var len__21234__auto___24812 = arguments.length;
var i__21235__auto___24813 = (0);
while(true){
if((i__21235__auto___24813 < len__21234__auto___24812)){
args24809.push((arguments[i__21235__auto___24813]));

var G__24814 = (i__21235__auto___24813 + (1));
i__21235__auto___24813 = G__24814;
continue;
} else {
}
break;
}

var G__24811 = args24809.length;
switch (G__24811) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args24809.length)].join('')));

}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$1 == null)))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
var x__20822__auto__ = (((p == null))?null:p);
var m__20823__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__20822__auto__)]);
if(!((m__20823__auto__ == null))){
return m__20823__auto__.call(null,p);
} else {
var m__20823__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(!((m__20823__auto____$1 == null))){
return m__20823__auto____$1.call(null,p);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
var x__20822__auto__ = (((p == null))?null:p);
var m__20823__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__20822__auto__)]);
if(!((m__20823__auto__ == null))){
return m__20823__auto__.call(null,p,v);
} else {
var m__20823__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(!((m__20823__auto____$1 == null))){
return m__20823__auto____$1.call(null,p,v);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_.cljs$lang$maxFixedArity = 2;


/**
 * Creates and returns a pub(lication) of the supplied channel,
 *   partitioned into topics by the topic-fn. topic-fn will be applied to
 *   each value on the channel and the result will determine the 'topic'
 *   on which that value will be put. Channels can be subscribed to
 *   receive copies of topics using 'sub', and unsubscribed using
 *   'unsub'. Each topic will be handled by an internal mult on a
 *   dedicated channel. By default these internal channels are
 *   unbuffered, but a buf-fn can be supplied which, given a topic,
 *   creates a buffer with desired properties.
 * 
 *   Each item is distributed to all subs in parallel and synchronously,
 *   i.e. each sub must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow subs from holding up the pub.
 * 
 *   Items received when there are no matching subs get dropped.
 * 
 *   Note that if buf-fns are used then each topic is handled
 *   asynchronously, i.e. if a channel is subscribed to more than one
 *   topic it should not expect them to be interleaved identically with
 *   the source.
 */
cljs.core.async.pub = (function cljs$core$async$pub(var_args){
var args24817 = [];
var len__21234__auto___24942 = arguments.length;
var i__21235__auto___24943 = (0);
while(true){
if((i__21235__auto___24943 < len__21234__auto___24942)){
args24817.push((arguments[i__21235__auto___24943]));

var G__24944 = (i__21235__auto___24943 + (1));
i__21235__auto___24943 = G__24944;
continue;
} else {
}
break;
}

var G__24819 = args24817.length;
switch (G__24819) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args24817.length)].join('')));

}
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.call(null,ch,topic_fn,cljs.core.constantly.call(null,null));
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var ensure_mult = ((function (mults){
return (function (topic){
var or__20159__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,mults),topic);
if(cljs.core.truth_(or__20159__auto__)){
return or__20159__auto__;
} else {
return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,mults,((function (or__20159__auto__,mults){
return (function (p1__24816_SHARP_){
if(cljs.core.truth_(p1__24816_SHARP_.call(null,topic))){
return p1__24816_SHARP_;
} else {
return cljs.core.assoc.call(null,p1__24816_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__20159__auto__,mults))
),topic);
}
});})(mults))
;
var p = (function (){
if(typeof cljs.core.async.t_cljs$core$async24820 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async24820 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta24821){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta24821 = meta24821;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async24820.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_24822,meta24821__$1){
var self__ = this;
var _24822__$1 = this;
return (new cljs.core.async.t_cljs$core$async24820(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta24821__$1));
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async24820.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_24822){
var self__ = this;
var _24822__$1 = this;
return self__.meta24821;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async24820.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async24820.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async24820.prototype.cljs$core$async$Pub$ = true;

cljs.core.async.t_cljs$core$async24820.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = self__.ensure_mult.call(null,topic);
return cljs.core.async.tap.call(null,m,ch__$1,close_QMARK_);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async24820.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__4657__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,self__.mults),topic);
if(cljs.core.truth_(temp__4657__auto__)){
var m = temp__4657__auto__;
return cljs.core.async.untap.call(null,m,ch__$1);
} else {
return null;
}
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async24820.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async24820.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async24820.getBasis = ((function (mults,ensure_mult){
return (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta24821","meta24821",922568323,null)], null);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async24820.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async24820.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async24820";

cljs.core.async.t_cljs$core$async24820.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__20765__auto__,writer__20766__auto__,opt__20767__auto__){
return cljs.core._write.call(null,writer__20766__auto__,"cljs.core.async/t_cljs$core$async24820");
});})(mults,ensure_mult))
;

cljs.core.async.__GT_t_cljs$core$async24820 = ((function (mults,ensure_mult){
return (function cljs$core$async$__GT_t_cljs$core$async24820(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta24821){
return (new cljs.core.async.t_cljs$core$async24820(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta24821));
});})(mults,ensure_mult))
;

}

return (new cljs.core.async.t_cljs$core$async24820(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__23027__auto___24946 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23027__auto___24946,mults,ensure_mult,p){
return (function (){
var f__23028__auto__ = (function (){var switch__22962__auto__ = ((function (c__23027__auto___24946,mults,ensure_mult,p){
return (function (state_24894){
var state_val_24895 = (state_24894[(1)]);
if((state_val_24895 === (7))){
var inst_24890 = (state_24894[(2)]);
var state_24894__$1 = state_24894;
var statearr_24896_24947 = state_24894__$1;
(statearr_24896_24947[(2)] = inst_24890);

(statearr_24896_24947[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24895 === (20))){
var state_24894__$1 = state_24894;
var statearr_24897_24948 = state_24894__$1;
(statearr_24897_24948[(2)] = null);

(statearr_24897_24948[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24895 === (1))){
var state_24894__$1 = state_24894;
var statearr_24898_24949 = state_24894__$1;
(statearr_24898_24949[(2)] = null);

(statearr_24898_24949[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24895 === (24))){
var inst_24873 = (state_24894[(7)]);
var inst_24882 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_24873);
var state_24894__$1 = state_24894;
var statearr_24899_24950 = state_24894__$1;
(statearr_24899_24950[(2)] = inst_24882);

(statearr_24899_24950[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24895 === (4))){
var inst_24825 = (state_24894[(8)]);
var inst_24825__$1 = (state_24894[(2)]);
var inst_24826 = (inst_24825__$1 == null);
var state_24894__$1 = (function (){var statearr_24900 = state_24894;
(statearr_24900[(8)] = inst_24825__$1);

return statearr_24900;
})();
if(cljs.core.truth_(inst_24826)){
var statearr_24901_24951 = state_24894__$1;
(statearr_24901_24951[(1)] = (5));

} else {
var statearr_24902_24952 = state_24894__$1;
(statearr_24902_24952[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24895 === (15))){
var inst_24867 = (state_24894[(2)]);
var state_24894__$1 = state_24894;
var statearr_24903_24953 = state_24894__$1;
(statearr_24903_24953[(2)] = inst_24867);

(statearr_24903_24953[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24895 === (21))){
var inst_24887 = (state_24894[(2)]);
var state_24894__$1 = (function (){var statearr_24904 = state_24894;
(statearr_24904[(9)] = inst_24887);

return statearr_24904;
})();
var statearr_24905_24954 = state_24894__$1;
(statearr_24905_24954[(2)] = null);

(statearr_24905_24954[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24895 === (13))){
var inst_24849 = (state_24894[(10)]);
var inst_24851 = cljs.core.chunked_seq_QMARK_.call(null,inst_24849);
var state_24894__$1 = state_24894;
if(inst_24851){
var statearr_24906_24955 = state_24894__$1;
(statearr_24906_24955[(1)] = (16));

} else {
var statearr_24907_24956 = state_24894__$1;
(statearr_24907_24956[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24895 === (22))){
var inst_24879 = (state_24894[(2)]);
var state_24894__$1 = state_24894;
if(cljs.core.truth_(inst_24879)){
var statearr_24908_24957 = state_24894__$1;
(statearr_24908_24957[(1)] = (23));

} else {
var statearr_24909_24958 = state_24894__$1;
(statearr_24909_24958[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24895 === (6))){
var inst_24873 = (state_24894[(7)]);
var inst_24875 = (state_24894[(11)]);
var inst_24825 = (state_24894[(8)]);
var inst_24873__$1 = topic_fn.call(null,inst_24825);
var inst_24874 = cljs.core.deref.call(null,mults);
var inst_24875__$1 = cljs.core.get.call(null,inst_24874,inst_24873__$1);
var state_24894__$1 = (function (){var statearr_24910 = state_24894;
(statearr_24910[(7)] = inst_24873__$1);

(statearr_24910[(11)] = inst_24875__$1);

return statearr_24910;
})();
if(cljs.core.truth_(inst_24875__$1)){
var statearr_24911_24959 = state_24894__$1;
(statearr_24911_24959[(1)] = (19));

} else {
var statearr_24912_24960 = state_24894__$1;
(statearr_24912_24960[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24895 === (25))){
var inst_24884 = (state_24894[(2)]);
var state_24894__$1 = state_24894;
var statearr_24913_24961 = state_24894__$1;
(statearr_24913_24961[(2)] = inst_24884);

(statearr_24913_24961[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24895 === (17))){
var inst_24849 = (state_24894[(10)]);
var inst_24858 = cljs.core.first.call(null,inst_24849);
var inst_24859 = cljs.core.async.muxch_STAR_.call(null,inst_24858);
var inst_24860 = cljs.core.async.close_BANG_.call(null,inst_24859);
var inst_24861 = cljs.core.next.call(null,inst_24849);
var inst_24835 = inst_24861;
var inst_24836 = null;
var inst_24837 = (0);
var inst_24838 = (0);
var state_24894__$1 = (function (){var statearr_24914 = state_24894;
(statearr_24914[(12)] = inst_24835);

(statearr_24914[(13)] = inst_24860);

(statearr_24914[(14)] = inst_24836);

(statearr_24914[(15)] = inst_24837);

(statearr_24914[(16)] = inst_24838);

return statearr_24914;
})();
var statearr_24915_24962 = state_24894__$1;
(statearr_24915_24962[(2)] = null);

(statearr_24915_24962[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24895 === (3))){
var inst_24892 = (state_24894[(2)]);
var state_24894__$1 = state_24894;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24894__$1,inst_24892);
} else {
if((state_val_24895 === (12))){
var inst_24869 = (state_24894[(2)]);
var state_24894__$1 = state_24894;
var statearr_24916_24963 = state_24894__$1;
(statearr_24916_24963[(2)] = inst_24869);

(statearr_24916_24963[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24895 === (2))){
var state_24894__$1 = state_24894;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24894__$1,(4),ch);
} else {
if((state_val_24895 === (23))){
var state_24894__$1 = state_24894;
var statearr_24917_24964 = state_24894__$1;
(statearr_24917_24964[(2)] = null);

(statearr_24917_24964[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24895 === (19))){
var inst_24875 = (state_24894[(11)]);
var inst_24825 = (state_24894[(8)]);
var inst_24877 = cljs.core.async.muxch_STAR_.call(null,inst_24875);
var state_24894__$1 = state_24894;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24894__$1,(22),inst_24877,inst_24825);
} else {
if((state_val_24895 === (11))){
var inst_24835 = (state_24894[(12)]);
var inst_24849 = (state_24894[(10)]);
var inst_24849__$1 = cljs.core.seq.call(null,inst_24835);
var state_24894__$1 = (function (){var statearr_24918 = state_24894;
(statearr_24918[(10)] = inst_24849__$1);

return statearr_24918;
})();
if(inst_24849__$1){
var statearr_24919_24965 = state_24894__$1;
(statearr_24919_24965[(1)] = (13));

} else {
var statearr_24920_24966 = state_24894__$1;
(statearr_24920_24966[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24895 === (9))){
var inst_24871 = (state_24894[(2)]);
var state_24894__$1 = state_24894;
var statearr_24921_24967 = state_24894__$1;
(statearr_24921_24967[(2)] = inst_24871);

(statearr_24921_24967[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24895 === (5))){
var inst_24832 = cljs.core.deref.call(null,mults);
var inst_24833 = cljs.core.vals.call(null,inst_24832);
var inst_24834 = cljs.core.seq.call(null,inst_24833);
var inst_24835 = inst_24834;
var inst_24836 = null;
var inst_24837 = (0);
var inst_24838 = (0);
var state_24894__$1 = (function (){var statearr_24922 = state_24894;
(statearr_24922[(12)] = inst_24835);

(statearr_24922[(14)] = inst_24836);

(statearr_24922[(15)] = inst_24837);

(statearr_24922[(16)] = inst_24838);

return statearr_24922;
})();
var statearr_24923_24968 = state_24894__$1;
(statearr_24923_24968[(2)] = null);

(statearr_24923_24968[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24895 === (14))){
var state_24894__$1 = state_24894;
var statearr_24927_24969 = state_24894__$1;
(statearr_24927_24969[(2)] = null);

(statearr_24927_24969[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24895 === (16))){
var inst_24849 = (state_24894[(10)]);
var inst_24853 = cljs.core.chunk_first.call(null,inst_24849);
var inst_24854 = cljs.core.chunk_rest.call(null,inst_24849);
var inst_24855 = cljs.core.count.call(null,inst_24853);
var inst_24835 = inst_24854;
var inst_24836 = inst_24853;
var inst_24837 = inst_24855;
var inst_24838 = (0);
var state_24894__$1 = (function (){var statearr_24928 = state_24894;
(statearr_24928[(12)] = inst_24835);

(statearr_24928[(14)] = inst_24836);

(statearr_24928[(15)] = inst_24837);

(statearr_24928[(16)] = inst_24838);

return statearr_24928;
})();
var statearr_24929_24970 = state_24894__$1;
(statearr_24929_24970[(2)] = null);

(statearr_24929_24970[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24895 === (10))){
var inst_24835 = (state_24894[(12)]);
var inst_24836 = (state_24894[(14)]);
var inst_24837 = (state_24894[(15)]);
var inst_24838 = (state_24894[(16)]);
var inst_24843 = cljs.core._nth.call(null,inst_24836,inst_24838);
var inst_24844 = cljs.core.async.muxch_STAR_.call(null,inst_24843);
var inst_24845 = cljs.core.async.close_BANG_.call(null,inst_24844);
var inst_24846 = (inst_24838 + (1));
var tmp24924 = inst_24835;
var tmp24925 = inst_24836;
var tmp24926 = inst_24837;
var inst_24835__$1 = tmp24924;
var inst_24836__$1 = tmp24925;
var inst_24837__$1 = tmp24926;
var inst_24838__$1 = inst_24846;
var state_24894__$1 = (function (){var statearr_24930 = state_24894;
(statearr_24930[(12)] = inst_24835__$1);

(statearr_24930[(17)] = inst_24845);

(statearr_24930[(14)] = inst_24836__$1);

(statearr_24930[(15)] = inst_24837__$1);

(statearr_24930[(16)] = inst_24838__$1);

return statearr_24930;
})();
var statearr_24931_24971 = state_24894__$1;
(statearr_24931_24971[(2)] = null);

(statearr_24931_24971[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24895 === (18))){
var inst_24864 = (state_24894[(2)]);
var state_24894__$1 = state_24894;
var statearr_24932_24972 = state_24894__$1;
(statearr_24932_24972[(2)] = inst_24864);

(statearr_24932_24972[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24895 === (8))){
var inst_24837 = (state_24894[(15)]);
var inst_24838 = (state_24894[(16)]);
var inst_24840 = (inst_24838 < inst_24837);
var inst_24841 = inst_24840;
var state_24894__$1 = state_24894;
if(cljs.core.truth_(inst_24841)){
var statearr_24933_24973 = state_24894__$1;
(statearr_24933_24973[(1)] = (10));

} else {
var statearr_24934_24974 = state_24894__$1;
(statearr_24934_24974[(1)] = (11));

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
}
}
}
}
}
}
}
}
});})(c__23027__auto___24946,mults,ensure_mult,p))
;
return ((function (switch__22962__auto__,c__23027__auto___24946,mults,ensure_mult,p){
return (function() {
var cljs$core$async$state_machine__22963__auto__ = null;
var cljs$core$async$state_machine__22963__auto____0 = (function (){
var statearr_24938 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_24938[(0)] = cljs$core$async$state_machine__22963__auto__);

(statearr_24938[(1)] = (1));

return statearr_24938;
});
var cljs$core$async$state_machine__22963__auto____1 = (function (state_24894){
while(true){
var ret_value__22964__auto__ = (function (){try{while(true){
var result__22965__auto__ = switch__22962__auto__.call(null,state_24894);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22965__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22965__auto__;
}
break;
}
}catch (e24939){if((e24939 instanceof Object)){
var ex__22966__auto__ = e24939;
var statearr_24940_24975 = state_24894;
(statearr_24940_24975[(5)] = ex__22966__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24894);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e24939;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22964__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__24976 = state_24894;
state_24894 = G__24976;
continue;
} else {
return ret_value__22964__auto__;
}
break;
}
});
cljs$core$async$state_machine__22963__auto__ = function(state_24894){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__22963__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__22963__auto____1.call(this,state_24894);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__22963__auto____0;
cljs$core$async$state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__22963__auto____1;
return cljs$core$async$state_machine__22963__auto__;
})()
;})(switch__22962__auto__,c__23027__auto___24946,mults,ensure_mult,p))
})();
var state__23029__auto__ = (function (){var statearr_24941 = f__23028__auto__.call(null);
(statearr_24941[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__23027__auto___24946);

return statearr_24941;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23029__auto__);
});})(c__23027__auto___24946,mults,ensure_mult,p))
);


return p;
});

cljs.core.async.pub.cljs$lang$maxFixedArity = 3;

/**
 * Subscribes a channel to a topic of a pub.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.sub = (function cljs$core$async$sub(var_args){
var args24977 = [];
var len__21234__auto___24980 = arguments.length;
var i__21235__auto___24981 = (0);
while(true){
if((i__21235__auto___24981 < len__21234__auto___24980)){
args24977.push((arguments[i__21235__auto___24981]));

var G__24982 = (i__21235__auto___24981 + (1));
i__21235__auto___24981 = G__24982;
continue;
} else {
}
break;
}

var G__24979 = args24977.length;
switch (G__24979) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args24977.length)].join('')));

}
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3 = (function (p,topic,ch){
return cljs.core.async.sub.call(null,p,topic,ch,true);
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4 = (function (p,topic,ch,close_QMARK_){
return cljs.core.async.sub_STAR_.call(null,p,topic,ch,close_QMARK_);
});

cljs.core.async.sub.cljs$lang$maxFixedArity = 4;

/**
 * Unsubscribes a channel from a topic of a pub
 */
cljs.core.async.unsub = (function cljs$core$async$unsub(p,topic,ch){
return cljs.core.async.unsub_STAR_.call(null,p,topic,ch);
});
/**
 * Unsubscribes all channels from a pub, or a topic of a pub
 */
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(var_args){
var args24984 = [];
var len__21234__auto___24987 = arguments.length;
var i__21235__auto___24988 = (0);
while(true){
if((i__21235__auto___24988 < len__21234__auto___24987)){
args24984.push((arguments[i__21235__auto___24988]));

var G__24989 = (i__21235__auto___24988 + (1));
i__21235__auto___24988 = G__24989;
continue;
} else {
}
break;
}

var G__24986 = args24984.length;
switch (G__24986) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args24984.length)].join('')));

}
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1 = (function (p){
return cljs.core.async.unsub_all_STAR_.call(null,p);
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2 = (function (p,topic){
return cljs.core.async.unsub_all_STAR_.call(null,p,topic);
});

cljs.core.async.unsub_all.cljs$lang$maxFixedArity = 2;

/**
 * Takes a function and a collection of source channels, and returns a
 *   channel which contains the values produced by applying f to the set
 *   of first items taken from each source channel, followed by applying
 *   f to the set of second items from each channel, until any one of the
 *   channels is closed, at which point the output channel will be
 *   closed. The returned channel will be unbuffered by default, or a
 *   buf-or-n can be supplied
 */
cljs.core.async.map = (function cljs$core$async$map(var_args){
var args24991 = [];
var len__21234__auto___25062 = arguments.length;
var i__21235__auto___25063 = (0);
while(true){
if((i__21235__auto___25063 < len__21234__auto___25062)){
args24991.push((arguments[i__21235__auto___25063]));

var G__25064 = (i__21235__auto___25063 + (1));
i__21235__auto___25063 = G__25064;
continue;
} else {
}
break;
}

var G__24993 = args24991.length;
switch (G__24993) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args24991.length)].join('')));

}
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$2 = (function (f,chs){
return cljs.core.async.map.call(null,f,chs,null);
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$3 = (function (f,chs,buf_or_n){
var chs__$1 = cljs.core.vec.call(null,chs);
var out = cljs.core.async.chan.call(null,buf_or_n);
var cnt = cljs.core.count.call(null,chs__$1);
var rets = cljs.core.object_array.call(null,cnt);
var dchan = cljs.core.async.chan.call(null,(1));
var dctr = cljs.core.atom.call(null,null);
var done = cljs.core.mapv.call(null,((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (i){
return ((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (ret){
(rets[i] = ret);

if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.call(null,dchan,rets.slice((0)));
} else {
return null;
}
});
;})(chs__$1,out,cnt,rets,dchan,dctr))
});})(chs__$1,out,cnt,rets,dchan,dctr))
,cljs.core.range.call(null,cnt));
var c__23027__auto___25066 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23027__auto___25066,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (){
var f__23028__auto__ = (function (){var switch__22962__auto__ = ((function (c__23027__auto___25066,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (state_25032){
var state_val_25033 = (state_25032[(1)]);
if((state_val_25033 === (7))){
var state_25032__$1 = state_25032;
var statearr_25034_25067 = state_25032__$1;
(statearr_25034_25067[(2)] = null);

(statearr_25034_25067[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25033 === (1))){
var state_25032__$1 = state_25032;
var statearr_25035_25068 = state_25032__$1;
(statearr_25035_25068[(2)] = null);

(statearr_25035_25068[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25033 === (4))){
var inst_24996 = (state_25032[(7)]);
var inst_24998 = (inst_24996 < cnt);
var state_25032__$1 = state_25032;
if(cljs.core.truth_(inst_24998)){
var statearr_25036_25069 = state_25032__$1;
(statearr_25036_25069[(1)] = (6));

} else {
var statearr_25037_25070 = state_25032__$1;
(statearr_25037_25070[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25033 === (15))){
var inst_25028 = (state_25032[(2)]);
var state_25032__$1 = state_25032;
var statearr_25038_25071 = state_25032__$1;
(statearr_25038_25071[(2)] = inst_25028);

(statearr_25038_25071[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25033 === (13))){
var inst_25021 = cljs.core.async.close_BANG_.call(null,out);
var state_25032__$1 = state_25032;
var statearr_25039_25072 = state_25032__$1;
(statearr_25039_25072[(2)] = inst_25021);

(statearr_25039_25072[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25033 === (6))){
var state_25032__$1 = state_25032;
var statearr_25040_25073 = state_25032__$1;
(statearr_25040_25073[(2)] = null);

(statearr_25040_25073[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25033 === (3))){
var inst_25030 = (state_25032[(2)]);
var state_25032__$1 = state_25032;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25032__$1,inst_25030);
} else {
if((state_val_25033 === (12))){
var inst_25018 = (state_25032[(8)]);
var inst_25018__$1 = (state_25032[(2)]);
var inst_25019 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_25018__$1);
var state_25032__$1 = (function (){var statearr_25041 = state_25032;
(statearr_25041[(8)] = inst_25018__$1);

return statearr_25041;
})();
if(cljs.core.truth_(inst_25019)){
var statearr_25042_25074 = state_25032__$1;
(statearr_25042_25074[(1)] = (13));

} else {
var statearr_25043_25075 = state_25032__$1;
(statearr_25043_25075[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25033 === (2))){
var inst_24995 = cljs.core.reset_BANG_.call(null,dctr,cnt);
var inst_24996 = (0);
var state_25032__$1 = (function (){var statearr_25044 = state_25032;
(statearr_25044[(9)] = inst_24995);

(statearr_25044[(7)] = inst_24996);

return statearr_25044;
})();
var statearr_25045_25076 = state_25032__$1;
(statearr_25045_25076[(2)] = null);

(statearr_25045_25076[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25033 === (11))){
var inst_24996 = (state_25032[(7)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_25032,(10),Object,null,(9));
var inst_25005 = chs__$1.call(null,inst_24996);
var inst_25006 = done.call(null,inst_24996);
var inst_25007 = cljs.core.async.take_BANG_.call(null,inst_25005,inst_25006);
var state_25032__$1 = state_25032;
var statearr_25046_25077 = state_25032__$1;
(statearr_25046_25077[(2)] = inst_25007);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25032__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25033 === (9))){
var inst_24996 = (state_25032[(7)]);
var inst_25009 = (state_25032[(2)]);
var inst_25010 = (inst_24996 + (1));
var inst_24996__$1 = inst_25010;
var state_25032__$1 = (function (){var statearr_25047 = state_25032;
(statearr_25047[(10)] = inst_25009);

(statearr_25047[(7)] = inst_24996__$1);

return statearr_25047;
})();
var statearr_25048_25078 = state_25032__$1;
(statearr_25048_25078[(2)] = null);

(statearr_25048_25078[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25033 === (5))){
var inst_25016 = (state_25032[(2)]);
var state_25032__$1 = (function (){var statearr_25049 = state_25032;
(statearr_25049[(11)] = inst_25016);

return statearr_25049;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25032__$1,(12),dchan);
} else {
if((state_val_25033 === (14))){
var inst_25018 = (state_25032[(8)]);
var inst_25023 = cljs.core.apply.call(null,f,inst_25018);
var state_25032__$1 = state_25032;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25032__$1,(16),out,inst_25023);
} else {
if((state_val_25033 === (16))){
var inst_25025 = (state_25032[(2)]);
var state_25032__$1 = (function (){var statearr_25050 = state_25032;
(statearr_25050[(12)] = inst_25025);

return statearr_25050;
})();
var statearr_25051_25079 = state_25032__$1;
(statearr_25051_25079[(2)] = null);

(statearr_25051_25079[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25033 === (10))){
var inst_25000 = (state_25032[(2)]);
var inst_25001 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);
var state_25032__$1 = (function (){var statearr_25052 = state_25032;
(statearr_25052[(13)] = inst_25000);

return statearr_25052;
})();
var statearr_25053_25080 = state_25032__$1;
(statearr_25053_25080[(2)] = inst_25001);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25032__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25033 === (8))){
var inst_25014 = (state_25032[(2)]);
var state_25032__$1 = state_25032;
var statearr_25054_25081 = state_25032__$1;
(statearr_25054_25081[(2)] = inst_25014);

(statearr_25054_25081[(1)] = (5));


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
});})(c__23027__auto___25066,chs__$1,out,cnt,rets,dchan,dctr,done))
;
return ((function (switch__22962__auto__,c__23027__auto___25066,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function() {
var cljs$core$async$state_machine__22963__auto__ = null;
var cljs$core$async$state_machine__22963__auto____0 = (function (){
var statearr_25058 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_25058[(0)] = cljs$core$async$state_machine__22963__auto__);

(statearr_25058[(1)] = (1));

return statearr_25058;
});
var cljs$core$async$state_machine__22963__auto____1 = (function (state_25032){
while(true){
var ret_value__22964__auto__ = (function (){try{while(true){
var result__22965__auto__ = switch__22962__auto__.call(null,state_25032);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22965__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22965__auto__;
}
break;
}
}catch (e25059){if((e25059 instanceof Object)){
var ex__22966__auto__ = e25059;
var statearr_25060_25082 = state_25032;
(statearr_25060_25082[(5)] = ex__22966__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25032);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25059;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22964__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25083 = state_25032;
state_25032 = G__25083;
continue;
} else {
return ret_value__22964__auto__;
}
break;
}
});
cljs$core$async$state_machine__22963__auto__ = function(state_25032){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__22963__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__22963__auto____1.call(this,state_25032);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__22963__auto____0;
cljs$core$async$state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__22963__auto____1;
return cljs$core$async$state_machine__22963__auto__;
})()
;})(switch__22962__auto__,c__23027__auto___25066,chs__$1,out,cnt,rets,dchan,dctr,done))
})();
var state__23029__auto__ = (function (){var statearr_25061 = f__23028__auto__.call(null);
(statearr_25061[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__23027__auto___25066);

return statearr_25061;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23029__auto__);
});})(c__23027__auto___25066,chs__$1,out,cnt,rets,dchan,dctr,done))
);


return out;
});

cljs.core.async.map.cljs$lang$maxFixedArity = 3;

/**
 * Takes a collection of source channels and returns a channel which
 *   contains all values taken from them. The returned channel will be
 *   unbuffered by default, or a buf-or-n can be supplied. The channel
 *   will close after all the source channels have closed.
 */
cljs.core.async.merge = (function cljs$core$async$merge(var_args){
var args25085 = [];
var len__21234__auto___25143 = arguments.length;
var i__21235__auto___25144 = (0);
while(true){
if((i__21235__auto___25144 < len__21234__auto___25143)){
args25085.push((arguments[i__21235__auto___25144]));

var G__25145 = (i__21235__auto___25144 + (1));
i__21235__auto___25144 = G__25145;
continue;
} else {
}
break;
}

var G__25087 = args25085.length;
switch (G__25087) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args25085.length)].join('')));

}
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.call(null,chs,null);
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__23027__auto___25147 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23027__auto___25147,out){
return (function (){
var f__23028__auto__ = (function (){var switch__22962__auto__ = ((function (c__23027__auto___25147,out){
return (function (state_25119){
var state_val_25120 = (state_25119[(1)]);
if((state_val_25120 === (7))){
var inst_25098 = (state_25119[(7)]);
var inst_25099 = (state_25119[(8)]);
var inst_25098__$1 = (state_25119[(2)]);
var inst_25099__$1 = cljs.core.nth.call(null,inst_25098__$1,(0),null);
var inst_25100 = cljs.core.nth.call(null,inst_25098__$1,(1),null);
var inst_25101 = (inst_25099__$1 == null);
var state_25119__$1 = (function (){var statearr_25121 = state_25119;
(statearr_25121[(9)] = inst_25100);

(statearr_25121[(7)] = inst_25098__$1);

(statearr_25121[(8)] = inst_25099__$1);

return statearr_25121;
})();
if(cljs.core.truth_(inst_25101)){
var statearr_25122_25148 = state_25119__$1;
(statearr_25122_25148[(1)] = (8));

} else {
var statearr_25123_25149 = state_25119__$1;
(statearr_25123_25149[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25120 === (1))){
var inst_25088 = cljs.core.vec.call(null,chs);
var inst_25089 = inst_25088;
var state_25119__$1 = (function (){var statearr_25124 = state_25119;
(statearr_25124[(10)] = inst_25089);

return statearr_25124;
})();
var statearr_25125_25150 = state_25119__$1;
(statearr_25125_25150[(2)] = null);

(statearr_25125_25150[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25120 === (4))){
var inst_25089 = (state_25119[(10)]);
var state_25119__$1 = state_25119;
return cljs.core.async.ioc_alts_BANG_.call(null,state_25119__$1,(7),inst_25089);
} else {
if((state_val_25120 === (6))){
var inst_25115 = (state_25119[(2)]);
var state_25119__$1 = state_25119;
var statearr_25126_25151 = state_25119__$1;
(statearr_25126_25151[(2)] = inst_25115);

(statearr_25126_25151[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25120 === (3))){
var inst_25117 = (state_25119[(2)]);
var state_25119__$1 = state_25119;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25119__$1,inst_25117);
} else {
if((state_val_25120 === (2))){
var inst_25089 = (state_25119[(10)]);
var inst_25091 = cljs.core.count.call(null,inst_25089);
var inst_25092 = (inst_25091 > (0));
var state_25119__$1 = state_25119;
if(cljs.core.truth_(inst_25092)){
var statearr_25128_25152 = state_25119__$1;
(statearr_25128_25152[(1)] = (4));

} else {
var statearr_25129_25153 = state_25119__$1;
(statearr_25129_25153[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25120 === (11))){
var inst_25089 = (state_25119[(10)]);
var inst_25108 = (state_25119[(2)]);
var tmp25127 = inst_25089;
var inst_25089__$1 = tmp25127;
var state_25119__$1 = (function (){var statearr_25130 = state_25119;
(statearr_25130[(11)] = inst_25108);

(statearr_25130[(10)] = inst_25089__$1);

return statearr_25130;
})();
var statearr_25131_25154 = state_25119__$1;
(statearr_25131_25154[(2)] = null);

(statearr_25131_25154[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25120 === (9))){
var inst_25099 = (state_25119[(8)]);
var state_25119__$1 = state_25119;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25119__$1,(11),out,inst_25099);
} else {
if((state_val_25120 === (5))){
var inst_25113 = cljs.core.async.close_BANG_.call(null,out);
var state_25119__$1 = state_25119;
var statearr_25132_25155 = state_25119__$1;
(statearr_25132_25155[(2)] = inst_25113);

(statearr_25132_25155[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25120 === (10))){
var inst_25111 = (state_25119[(2)]);
var state_25119__$1 = state_25119;
var statearr_25133_25156 = state_25119__$1;
(statearr_25133_25156[(2)] = inst_25111);

(statearr_25133_25156[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25120 === (8))){
var inst_25100 = (state_25119[(9)]);
var inst_25098 = (state_25119[(7)]);
var inst_25099 = (state_25119[(8)]);
var inst_25089 = (state_25119[(10)]);
var inst_25103 = (function (){var cs = inst_25089;
var vec__25094 = inst_25098;
var v = inst_25099;
var c = inst_25100;
return ((function (cs,vec__25094,v,c,inst_25100,inst_25098,inst_25099,inst_25089,state_val_25120,c__23027__auto___25147,out){
return (function (p1__25084_SHARP_){
return cljs.core.not_EQ_.call(null,c,p1__25084_SHARP_);
});
;})(cs,vec__25094,v,c,inst_25100,inst_25098,inst_25099,inst_25089,state_val_25120,c__23027__auto___25147,out))
})();
var inst_25104 = cljs.core.filterv.call(null,inst_25103,inst_25089);
var inst_25089__$1 = inst_25104;
var state_25119__$1 = (function (){var statearr_25134 = state_25119;
(statearr_25134[(10)] = inst_25089__$1);

return statearr_25134;
})();
var statearr_25135_25157 = state_25119__$1;
(statearr_25135_25157[(2)] = null);

(statearr_25135_25157[(1)] = (2));


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
});})(c__23027__auto___25147,out))
;
return ((function (switch__22962__auto__,c__23027__auto___25147,out){
return (function() {
var cljs$core$async$state_machine__22963__auto__ = null;
var cljs$core$async$state_machine__22963__auto____0 = (function (){
var statearr_25139 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_25139[(0)] = cljs$core$async$state_machine__22963__auto__);

(statearr_25139[(1)] = (1));

return statearr_25139;
});
var cljs$core$async$state_machine__22963__auto____1 = (function (state_25119){
while(true){
var ret_value__22964__auto__ = (function (){try{while(true){
var result__22965__auto__ = switch__22962__auto__.call(null,state_25119);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22965__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22965__auto__;
}
break;
}
}catch (e25140){if((e25140 instanceof Object)){
var ex__22966__auto__ = e25140;
var statearr_25141_25158 = state_25119;
(statearr_25141_25158[(5)] = ex__22966__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25119);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25140;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22964__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25159 = state_25119;
state_25119 = G__25159;
continue;
} else {
return ret_value__22964__auto__;
}
break;
}
});
cljs$core$async$state_machine__22963__auto__ = function(state_25119){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__22963__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__22963__auto____1.call(this,state_25119);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__22963__auto____0;
cljs$core$async$state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__22963__auto____1;
return cljs$core$async$state_machine__22963__auto__;
})()
;})(switch__22962__auto__,c__23027__auto___25147,out))
})();
var state__23029__auto__ = (function (){var statearr_25142 = f__23028__auto__.call(null);
(statearr_25142[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__23027__auto___25147);

return statearr_25142;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23029__auto__);
});})(c__23027__auto___25147,out))
);


return out;
});

cljs.core.async.merge.cljs$lang$maxFixedArity = 2;

/**
 * Returns a channel containing the single (collection) result of the
 *   items taken from the channel conjoined to the supplied
 *   collection. ch must close before into produces a result.
 */
cljs.core.async.into = (function cljs$core$async$into(coll,ch){
return cljs.core.async.reduce.call(null,cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 *   The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(var_args){
var args25160 = [];
var len__21234__auto___25209 = arguments.length;
var i__21235__auto___25210 = (0);
while(true){
if((i__21235__auto___25210 < len__21234__auto___25209)){
args25160.push((arguments[i__21235__auto___25210]));

var G__25211 = (i__21235__auto___25210 + (1));
i__21235__auto___25210 = G__25211;
continue;
} else {
}
break;
}

var G__25162 = args25160.length;
switch (G__25162) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args25160.length)].join('')));

}
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.call(null,n,ch,null);
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__23027__auto___25213 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23027__auto___25213,out){
return (function (){
var f__23028__auto__ = (function (){var switch__22962__auto__ = ((function (c__23027__auto___25213,out){
return (function (state_25186){
var state_val_25187 = (state_25186[(1)]);
if((state_val_25187 === (7))){
var inst_25168 = (state_25186[(7)]);
var inst_25168__$1 = (state_25186[(2)]);
var inst_25169 = (inst_25168__$1 == null);
var inst_25170 = cljs.core.not.call(null,inst_25169);
var state_25186__$1 = (function (){var statearr_25188 = state_25186;
(statearr_25188[(7)] = inst_25168__$1);

return statearr_25188;
})();
if(inst_25170){
var statearr_25189_25214 = state_25186__$1;
(statearr_25189_25214[(1)] = (8));

} else {
var statearr_25190_25215 = state_25186__$1;
(statearr_25190_25215[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25187 === (1))){
var inst_25163 = (0);
var state_25186__$1 = (function (){var statearr_25191 = state_25186;
(statearr_25191[(8)] = inst_25163);

return statearr_25191;
})();
var statearr_25192_25216 = state_25186__$1;
(statearr_25192_25216[(2)] = null);

(statearr_25192_25216[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25187 === (4))){
var state_25186__$1 = state_25186;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25186__$1,(7),ch);
} else {
if((state_val_25187 === (6))){
var inst_25181 = (state_25186[(2)]);
var state_25186__$1 = state_25186;
var statearr_25193_25217 = state_25186__$1;
(statearr_25193_25217[(2)] = inst_25181);

(statearr_25193_25217[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25187 === (3))){
var inst_25183 = (state_25186[(2)]);
var inst_25184 = cljs.core.async.close_BANG_.call(null,out);
var state_25186__$1 = (function (){var statearr_25194 = state_25186;
(statearr_25194[(9)] = inst_25183);

return statearr_25194;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25186__$1,inst_25184);
} else {
if((state_val_25187 === (2))){
var inst_25163 = (state_25186[(8)]);
var inst_25165 = (inst_25163 < n);
var state_25186__$1 = state_25186;
if(cljs.core.truth_(inst_25165)){
var statearr_25195_25218 = state_25186__$1;
(statearr_25195_25218[(1)] = (4));

} else {
var statearr_25196_25219 = state_25186__$1;
(statearr_25196_25219[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25187 === (11))){
var inst_25163 = (state_25186[(8)]);
var inst_25173 = (state_25186[(2)]);
var inst_25174 = (inst_25163 + (1));
var inst_25163__$1 = inst_25174;
var state_25186__$1 = (function (){var statearr_25197 = state_25186;
(statearr_25197[(10)] = inst_25173);

(statearr_25197[(8)] = inst_25163__$1);

return statearr_25197;
})();
var statearr_25198_25220 = state_25186__$1;
(statearr_25198_25220[(2)] = null);

(statearr_25198_25220[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25187 === (9))){
var state_25186__$1 = state_25186;
var statearr_25199_25221 = state_25186__$1;
(statearr_25199_25221[(2)] = null);

(statearr_25199_25221[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25187 === (5))){
var state_25186__$1 = state_25186;
var statearr_25200_25222 = state_25186__$1;
(statearr_25200_25222[(2)] = null);

(statearr_25200_25222[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25187 === (10))){
var inst_25178 = (state_25186[(2)]);
var state_25186__$1 = state_25186;
var statearr_25201_25223 = state_25186__$1;
(statearr_25201_25223[(2)] = inst_25178);

(statearr_25201_25223[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25187 === (8))){
var inst_25168 = (state_25186[(7)]);
var state_25186__$1 = state_25186;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25186__$1,(11),out,inst_25168);
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
});})(c__23027__auto___25213,out))
;
return ((function (switch__22962__auto__,c__23027__auto___25213,out){
return (function() {
var cljs$core$async$state_machine__22963__auto__ = null;
var cljs$core$async$state_machine__22963__auto____0 = (function (){
var statearr_25205 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_25205[(0)] = cljs$core$async$state_machine__22963__auto__);

(statearr_25205[(1)] = (1));

return statearr_25205;
});
var cljs$core$async$state_machine__22963__auto____1 = (function (state_25186){
while(true){
var ret_value__22964__auto__ = (function (){try{while(true){
var result__22965__auto__ = switch__22962__auto__.call(null,state_25186);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22965__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22965__auto__;
}
break;
}
}catch (e25206){if((e25206 instanceof Object)){
var ex__22966__auto__ = e25206;
var statearr_25207_25224 = state_25186;
(statearr_25207_25224[(5)] = ex__22966__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25186);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25206;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22964__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25225 = state_25186;
state_25186 = G__25225;
continue;
} else {
return ret_value__22964__auto__;
}
break;
}
});
cljs$core$async$state_machine__22963__auto__ = function(state_25186){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__22963__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__22963__auto____1.call(this,state_25186);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__22963__auto____0;
cljs$core$async$state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__22963__auto____1;
return cljs$core$async$state_machine__22963__auto__;
})()
;})(switch__22962__auto__,c__23027__auto___25213,out))
})();
var state__23029__auto__ = (function (){var statearr_25208 = f__23028__auto__.call(null);
(statearr_25208[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__23027__auto___25213);

return statearr_25208;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23029__auto__);
});})(c__23027__auto___25213,out))
);


return out;
});

cljs.core.async.take.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async25233 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async25233 = (function (map_LT_,f,ch,meta25234){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta25234 = meta25234;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async25233.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_25235,meta25234__$1){
var self__ = this;
var _25235__$1 = this;
return (new cljs.core.async.t_cljs$core$async25233(self__.map_LT_,self__.f,self__.ch,meta25234__$1));
});

cljs.core.async.t_cljs$core$async25233.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_25235){
var self__ = this;
var _25235__$1 = this;
return self__.meta25234;
});

cljs.core.async.t_cljs$core$async25233.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async25233.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async25233.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async25233.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async25233.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){
if(typeof cljs.core.async.t_cljs$core$async25236 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async25236 = (function (map_LT_,f,ch,meta25234,_,fn1,meta25237){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta25234 = meta25234;
this._ = _;
this.fn1 = fn1;
this.meta25237 = meta25237;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async25236.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (___$1){
return (function (_25238,meta25237__$1){
var self__ = this;
var _25238__$1 = this;
return (new cljs.core.async.t_cljs$core$async25236(self__.map_LT_,self__.f,self__.ch,self__.meta25234,self__._,self__.fn1,meta25237__$1));
});})(___$1))
;

cljs.core.async.t_cljs$core$async25236.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (___$1){
return (function (_25238){
var self__ = this;
var _25238__$1 = this;
return self__.meta25237;
});})(___$1))
;

cljs.core.async.t_cljs$core$async25236.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async25236.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});})(___$1))
;

cljs.core.async.t_cljs$core$async25236.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
});})(___$1))
;

cljs.core.async.t_cljs$core$async25236.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);
return ((function (f1,___$2,___$1){
return (function (p1__25226_SHARP_){
return f1.call(null,(((p1__25226_SHARP_ == null))?null:self__.f.call(null,p1__25226_SHARP_)));
});
;})(f1,___$2,___$1))
});})(___$1))
;

cljs.core.async.t_cljs$core$async25236.getBasis = ((function (___$1){
return (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map<","map<",-1235808357,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta25234","meta25234",-441748035,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async25233","cljs.core.async/t_cljs$core$async25233",541385143,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta25237","meta25237",-723400240,null)], null);
});})(___$1))
;

cljs.core.async.t_cljs$core$async25236.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async25236.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async25236";

cljs.core.async.t_cljs$core$async25236.cljs$lang$ctorPrWriter = ((function (___$1){
return (function (this__20765__auto__,writer__20766__auto__,opt__20767__auto__){
return cljs.core._write.call(null,writer__20766__auto__,"cljs.core.async/t_cljs$core$async25236");
});})(___$1))
;

cljs.core.async.__GT_t_cljs$core$async25236 = ((function (___$1){
return (function cljs$core$async$map_LT__$___GT_t_cljs$core$async25236(map_LT___$1,f__$1,ch__$1,meta25234__$1,___$2,fn1__$1,meta25237){
return (new cljs.core.async.t_cljs$core$async25236(map_LT___$1,f__$1,ch__$1,meta25234__$1,___$2,fn1__$1,meta25237));
});})(___$1))
;

}

return (new cljs.core.async.t_cljs$core$async25236(self__.map_LT_,self__.f,self__.ch,self__.meta25234,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY));
})()
);
if(cljs.core.truth_((function (){var and__20147__auto__ = ret;
if(cljs.core.truth_(and__20147__auto__)){
return !((cljs.core.deref.call(null,ret) == null));
} else {
return and__20147__auto__;
}
})())){
return cljs.core.async.impl.channels.box.call(null,self__.f.call(null,cljs.core.deref.call(null,ret)));
} else {
return ret;
}
});

cljs.core.async.t_cljs$core$async25233.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async25233.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
});

cljs.core.async.t_cljs$core$async25233.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map<","map<",-1235808357,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta25234","meta25234",-441748035,null)], null);
});

cljs.core.async.t_cljs$core$async25233.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async25233.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async25233";

cljs.core.async.t_cljs$core$async25233.cljs$lang$ctorPrWriter = (function (this__20765__auto__,writer__20766__auto__,opt__20767__auto__){
return cljs.core._write.call(null,writer__20766__auto__,"cljs.core.async/t_cljs$core$async25233");
});

cljs.core.async.__GT_t_cljs$core$async25233 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async25233(map_LT___$1,f__$1,ch__$1,meta25234){
return (new cljs.core.async.t_cljs$core$async25233(map_LT___$1,f__$1,ch__$1,meta25234));
});

}

return (new cljs.core.async.t_cljs$core$async25233(cljs$core$async$map_LT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async25242 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async25242 = (function (map_GT_,f,ch,meta25243){
this.map_GT_ = map_GT_;
this.f = f;
this.ch = ch;
this.meta25243 = meta25243;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async25242.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_25244,meta25243__$1){
var self__ = this;
var _25244__$1 = this;
return (new cljs.core.async.t_cljs$core$async25242(self__.map_GT_,self__.f,self__.ch,meta25243__$1));
});

cljs.core.async.t_cljs$core$async25242.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_25244){
var self__ = this;
var _25244__$1 = this;
return self__.meta25243;
});

cljs.core.async.t_cljs$core$async25242.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async25242.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async25242.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async25242.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async25242.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async25242.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn1);
});

cljs.core.async.t_cljs$core$async25242.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map>","map>",1676369295,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta25243","meta25243",-396627495,null)], null);
});

cljs.core.async.t_cljs$core$async25242.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async25242.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async25242";

cljs.core.async.t_cljs$core$async25242.cljs$lang$ctorPrWriter = (function (this__20765__auto__,writer__20766__auto__,opt__20767__auto__){
return cljs.core._write.call(null,writer__20766__auto__,"cljs.core.async/t_cljs$core$async25242");
});

cljs.core.async.__GT_t_cljs$core$async25242 = (function cljs$core$async$map_GT__$___GT_t_cljs$core$async25242(map_GT___$1,f__$1,ch__$1,meta25243){
return (new cljs.core.async.t_cljs$core$async25242(map_GT___$1,f__$1,ch__$1,meta25243));
});

}

return (new cljs.core.async.t_cljs$core$async25242(cljs$core$async$map_GT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
if(typeof cljs.core.async.t_cljs$core$async25248 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async25248 = (function (filter_GT_,p,ch,meta25249){
this.filter_GT_ = filter_GT_;
this.p = p;
this.ch = ch;
this.meta25249 = meta25249;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async25248.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_25250,meta25249__$1){
var self__ = this;
var _25250__$1 = this;
return (new cljs.core.async.t_cljs$core$async25248(self__.filter_GT_,self__.p,self__.ch,meta25249__$1));
});

cljs.core.async.t_cljs$core$async25248.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_25250){
var self__ = this;
var _25250__$1 = this;
return self__.meta25249;
});

cljs.core.async.t_cljs$core$async25248.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async25248.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async25248.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async25248.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async25248.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async25248.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async25248.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.p.call(null,val))){
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box.call(null,cljs.core.not.call(null,cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch)));
}
});

cljs.core.async.t_cljs$core$async25248.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"filter>","filter>",-37644455,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta25249","meta25249",1744548114,null)], null);
});

cljs.core.async.t_cljs$core$async25248.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async25248.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async25248";

cljs.core.async.t_cljs$core$async25248.cljs$lang$ctorPrWriter = (function (this__20765__auto__,writer__20766__auto__,opt__20767__auto__){
return cljs.core._write.call(null,writer__20766__auto__,"cljs.core.async/t_cljs$core$async25248");
});

cljs.core.async.__GT_t_cljs$core$async25248 = (function cljs$core$async$filter_GT__$___GT_t_cljs$core$async25248(filter_GT___$1,p__$1,ch__$1,meta25249){
return (new cljs.core.async.t_cljs$core$async25248(filter_GT___$1,p__$1,ch__$1,meta25249));
});

}

return (new cljs.core.async.t_cljs$core$async25248(cljs$core$async$filter_GT_,p,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_GT_ = (function cljs$core$async$remove_GT_(p,ch){
return cljs.core.async.filter_GT_.call(null,cljs.core.complement.call(null,p),ch);
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(var_args){
var args25251 = [];
var len__21234__auto___25295 = arguments.length;
var i__21235__auto___25296 = (0);
while(true){
if((i__21235__auto___25296 < len__21234__auto___25295)){
args25251.push((arguments[i__21235__auto___25296]));

var G__25297 = (i__21235__auto___25296 + (1));
i__21235__auto___25296 = G__25297;
continue;
} else {
}
break;
}

var G__25253 = args25251.length;
switch (G__25253) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args25251.length)].join('')));

}
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.call(null,p,ch,null);
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__23027__auto___25299 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23027__auto___25299,out){
return (function (){
var f__23028__auto__ = (function (){var switch__22962__auto__ = ((function (c__23027__auto___25299,out){
return (function (state_25274){
var state_val_25275 = (state_25274[(1)]);
if((state_val_25275 === (7))){
var inst_25270 = (state_25274[(2)]);
var state_25274__$1 = state_25274;
var statearr_25276_25300 = state_25274__$1;
(statearr_25276_25300[(2)] = inst_25270);

(statearr_25276_25300[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25275 === (1))){
var state_25274__$1 = state_25274;
var statearr_25277_25301 = state_25274__$1;
(statearr_25277_25301[(2)] = null);

(statearr_25277_25301[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25275 === (4))){
var inst_25256 = (state_25274[(7)]);
var inst_25256__$1 = (state_25274[(2)]);
var inst_25257 = (inst_25256__$1 == null);
var state_25274__$1 = (function (){var statearr_25278 = state_25274;
(statearr_25278[(7)] = inst_25256__$1);

return statearr_25278;
})();
if(cljs.core.truth_(inst_25257)){
var statearr_25279_25302 = state_25274__$1;
(statearr_25279_25302[(1)] = (5));

} else {
var statearr_25280_25303 = state_25274__$1;
(statearr_25280_25303[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25275 === (6))){
var inst_25256 = (state_25274[(7)]);
var inst_25261 = p.call(null,inst_25256);
var state_25274__$1 = state_25274;
if(cljs.core.truth_(inst_25261)){
var statearr_25281_25304 = state_25274__$1;
(statearr_25281_25304[(1)] = (8));

} else {
var statearr_25282_25305 = state_25274__$1;
(statearr_25282_25305[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25275 === (3))){
var inst_25272 = (state_25274[(2)]);
var state_25274__$1 = state_25274;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25274__$1,inst_25272);
} else {
if((state_val_25275 === (2))){
var state_25274__$1 = state_25274;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25274__$1,(4),ch);
} else {
if((state_val_25275 === (11))){
var inst_25264 = (state_25274[(2)]);
var state_25274__$1 = state_25274;
var statearr_25283_25306 = state_25274__$1;
(statearr_25283_25306[(2)] = inst_25264);

(statearr_25283_25306[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25275 === (9))){
var state_25274__$1 = state_25274;
var statearr_25284_25307 = state_25274__$1;
(statearr_25284_25307[(2)] = null);

(statearr_25284_25307[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25275 === (5))){
var inst_25259 = cljs.core.async.close_BANG_.call(null,out);
var state_25274__$1 = state_25274;
var statearr_25285_25308 = state_25274__$1;
(statearr_25285_25308[(2)] = inst_25259);

(statearr_25285_25308[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25275 === (10))){
var inst_25267 = (state_25274[(2)]);
var state_25274__$1 = (function (){var statearr_25286 = state_25274;
(statearr_25286[(8)] = inst_25267);

return statearr_25286;
})();
var statearr_25287_25309 = state_25274__$1;
(statearr_25287_25309[(2)] = null);

(statearr_25287_25309[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25275 === (8))){
var inst_25256 = (state_25274[(7)]);
var state_25274__$1 = state_25274;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25274__$1,(11),out,inst_25256);
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
});})(c__23027__auto___25299,out))
;
return ((function (switch__22962__auto__,c__23027__auto___25299,out){
return (function() {
var cljs$core$async$state_machine__22963__auto__ = null;
var cljs$core$async$state_machine__22963__auto____0 = (function (){
var statearr_25291 = [null,null,null,null,null,null,null,null,null];
(statearr_25291[(0)] = cljs$core$async$state_machine__22963__auto__);

(statearr_25291[(1)] = (1));

return statearr_25291;
});
var cljs$core$async$state_machine__22963__auto____1 = (function (state_25274){
while(true){
var ret_value__22964__auto__ = (function (){try{while(true){
var result__22965__auto__ = switch__22962__auto__.call(null,state_25274);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22965__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22965__auto__;
}
break;
}
}catch (e25292){if((e25292 instanceof Object)){
var ex__22966__auto__ = e25292;
var statearr_25293_25310 = state_25274;
(statearr_25293_25310[(5)] = ex__22966__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25274);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25292;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22964__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25311 = state_25274;
state_25274 = G__25311;
continue;
} else {
return ret_value__22964__auto__;
}
break;
}
});
cljs$core$async$state_machine__22963__auto__ = function(state_25274){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__22963__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__22963__auto____1.call(this,state_25274);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__22963__auto____0;
cljs$core$async$state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__22963__auto____1;
return cljs$core$async$state_machine__22963__auto__;
})()
;})(switch__22962__auto__,c__23027__auto___25299,out))
})();
var state__23029__auto__ = (function (){var statearr_25294 = f__23028__auto__.call(null);
(statearr_25294[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__23027__auto___25299);

return statearr_25294;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23029__auto__);
});})(c__23027__auto___25299,out))
);


return out;
});

cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var args25312 = [];
var len__21234__auto___25315 = arguments.length;
var i__21235__auto___25316 = (0);
while(true){
if((i__21235__auto___25316 < len__21234__auto___25315)){
args25312.push((arguments[i__21235__auto___25316]));

var G__25317 = (i__21235__auto___25316 + (1));
i__21235__auto___25316 = G__25317;
continue;
} else {
}
break;
}

var G__25314 = args25312.length;
switch (G__25314) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args25312.length)].join('')));

}
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.remove_LT_.call(null,p,ch,null);
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
return cljs.core.async.filter_LT_.call(null,cljs.core.complement.call(null,p),ch,buf_or_n);
});

cljs.core.async.remove_LT_.cljs$lang$maxFixedArity = 3;

cljs.core.async.mapcat_STAR_ = (function cljs$core$async$mapcat_STAR_(f,in$,out){
var c__23027__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23027__auto__){
return (function (){
var f__23028__auto__ = (function (){var switch__22962__auto__ = ((function (c__23027__auto__){
return (function (state_25484){
var state_val_25485 = (state_25484[(1)]);
if((state_val_25485 === (7))){
var inst_25480 = (state_25484[(2)]);
var state_25484__$1 = state_25484;
var statearr_25486_25527 = state_25484__$1;
(statearr_25486_25527[(2)] = inst_25480);

(statearr_25486_25527[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25485 === (20))){
var inst_25450 = (state_25484[(7)]);
var inst_25461 = (state_25484[(2)]);
var inst_25462 = cljs.core.next.call(null,inst_25450);
var inst_25436 = inst_25462;
var inst_25437 = null;
var inst_25438 = (0);
var inst_25439 = (0);
var state_25484__$1 = (function (){var statearr_25487 = state_25484;
(statearr_25487[(8)] = inst_25461);

(statearr_25487[(9)] = inst_25437);

(statearr_25487[(10)] = inst_25436);

(statearr_25487[(11)] = inst_25438);

(statearr_25487[(12)] = inst_25439);

return statearr_25487;
})();
var statearr_25488_25528 = state_25484__$1;
(statearr_25488_25528[(2)] = null);

(statearr_25488_25528[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25485 === (1))){
var state_25484__$1 = state_25484;
var statearr_25489_25529 = state_25484__$1;
(statearr_25489_25529[(2)] = null);

(statearr_25489_25529[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25485 === (4))){
var inst_25425 = (state_25484[(13)]);
var inst_25425__$1 = (state_25484[(2)]);
var inst_25426 = (inst_25425__$1 == null);
var state_25484__$1 = (function (){var statearr_25490 = state_25484;
(statearr_25490[(13)] = inst_25425__$1);

return statearr_25490;
})();
if(cljs.core.truth_(inst_25426)){
var statearr_25491_25530 = state_25484__$1;
(statearr_25491_25530[(1)] = (5));

} else {
var statearr_25492_25531 = state_25484__$1;
(statearr_25492_25531[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25485 === (15))){
var state_25484__$1 = state_25484;
var statearr_25496_25532 = state_25484__$1;
(statearr_25496_25532[(2)] = null);

(statearr_25496_25532[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25485 === (21))){
var state_25484__$1 = state_25484;
var statearr_25497_25533 = state_25484__$1;
(statearr_25497_25533[(2)] = null);

(statearr_25497_25533[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25485 === (13))){
var inst_25437 = (state_25484[(9)]);
var inst_25436 = (state_25484[(10)]);
var inst_25438 = (state_25484[(11)]);
var inst_25439 = (state_25484[(12)]);
var inst_25446 = (state_25484[(2)]);
var inst_25447 = (inst_25439 + (1));
var tmp25493 = inst_25437;
var tmp25494 = inst_25436;
var tmp25495 = inst_25438;
var inst_25436__$1 = tmp25494;
var inst_25437__$1 = tmp25493;
var inst_25438__$1 = tmp25495;
var inst_25439__$1 = inst_25447;
var state_25484__$1 = (function (){var statearr_25498 = state_25484;
(statearr_25498[(9)] = inst_25437__$1);

(statearr_25498[(10)] = inst_25436__$1);

(statearr_25498[(14)] = inst_25446);

(statearr_25498[(11)] = inst_25438__$1);

(statearr_25498[(12)] = inst_25439__$1);

return statearr_25498;
})();
var statearr_25499_25534 = state_25484__$1;
(statearr_25499_25534[(2)] = null);

(statearr_25499_25534[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25485 === (22))){
var state_25484__$1 = state_25484;
var statearr_25500_25535 = state_25484__$1;
(statearr_25500_25535[(2)] = null);

(statearr_25500_25535[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25485 === (6))){
var inst_25425 = (state_25484[(13)]);
var inst_25434 = f.call(null,inst_25425);
var inst_25435 = cljs.core.seq.call(null,inst_25434);
var inst_25436 = inst_25435;
var inst_25437 = null;
var inst_25438 = (0);
var inst_25439 = (0);
var state_25484__$1 = (function (){var statearr_25501 = state_25484;
(statearr_25501[(9)] = inst_25437);

(statearr_25501[(10)] = inst_25436);

(statearr_25501[(11)] = inst_25438);

(statearr_25501[(12)] = inst_25439);

return statearr_25501;
})();
var statearr_25502_25536 = state_25484__$1;
(statearr_25502_25536[(2)] = null);

(statearr_25502_25536[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25485 === (17))){
var inst_25450 = (state_25484[(7)]);
var inst_25454 = cljs.core.chunk_first.call(null,inst_25450);
var inst_25455 = cljs.core.chunk_rest.call(null,inst_25450);
var inst_25456 = cljs.core.count.call(null,inst_25454);
var inst_25436 = inst_25455;
var inst_25437 = inst_25454;
var inst_25438 = inst_25456;
var inst_25439 = (0);
var state_25484__$1 = (function (){var statearr_25503 = state_25484;
(statearr_25503[(9)] = inst_25437);

(statearr_25503[(10)] = inst_25436);

(statearr_25503[(11)] = inst_25438);

(statearr_25503[(12)] = inst_25439);

return statearr_25503;
})();
var statearr_25504_25537 = state_25484__$1;
(statearr_25504_25537[(2)] = null);

(statearr_25504_25537[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25485 === (3))){
var inst_25482 = (state_25484[(2)]);
var state_25484__$1 = state_25484;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25484__$1,inst_25482);
} else {
if((state_val_25485 === (12))){
var inst_25470 = (state_25484[(2)]);
var state_25484__$1 = state_25484;
var statearr_25505_25538 = state_25484__$1;
(statearr_25505_25538[(2)] = inst_25470);

(statearr_25505_25538[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25485 === (2))){
var state_25484__$1 = state_25484;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25484__$1,(4),in$);
} else {
if((state_val_25485 === (23))){
var inst_25478 = (state_25484[(2)]);
var state_25484__$1 = state_25484;
var statearr_25506_25539 = state_25484__$1;
(statearr_25506_25539[(2)] = inst_25478);

(statearr_25506_25539[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25485 === (19))){
var inst_25465 = (state_25484[(2)]);
var state_25484__$1 = state_25484;
var statearr_25507_25540 = state_25484__$1;
(statearr_25507_25540[(2)] = inst_25465);

(statearr_25507_25540[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25485 === (11))){
var inst_25450 = (state_25484[(7)]);
var inst_25436 = (state_25484[(10)]);
var inst_25450__$1 = cljs.core.seq.call(null,inst_25436);
var state_25484__$1 = (function (){var statearr_25508 = state_25484;
(statearr_25508[(7)] = inst_25450__$1);

return statearr_25508;
})();
if(inst_25450__$1){
var statearr_25509_25541 = state_25484__$1;
(statearr_25509_25541[(1)] = (14));

} else {
var statearr_25510_25542 = state_25484__$1;
(statearr_25510_25542[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25485 === (9))){
var inst_25472 = (state_25484[(2)]);
var inst_25473 = cljs.core.async.impl.protocols.closed_QMARK_.call(null,out);
var state_25484__$1 = (function (){var statearr_25511 = state_25484;
(statearr_25511[(15)] = inst_25472);

return statearr_25511;
})();
if(cljs.core.truth_(inst_25473)){
var statearr_25512_25543 = state_25484__$1;
(statearr_25512_25543[(1)] = (21));

} else {
var statearr_25513_25544 = state_25484__$1;
(statearr_25513_25544[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25485 === (5))){
var inst_25428 = cljs.core.async.close_BANG_.call(null,out);
var state_25484__$1 = state_25484;
var statearr_25514_25545 = state_25484__$1;
(statearr_25514_25545[(2)] = inst_25428);

(statearr_25514_25545[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25485 === (14))){
var inst_25450 = (state_25484[(7)]);
var inst_25452 = cljs.core.chunked_seq_QMARK_.call(null,inst_25450);
var state_25484__$1 = state_25484;
if(inst_25452){
var statearr_25515_25546 = state_25484__$1;
(statearr_25515_25546[(1)] = (17));

} else {
var statearr_25516_25547 = state_25484__$1;
(statearr_25516_25547[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25485 === (16))){
var inst_25468 = (state_25484[(2)]);
var state_25484__$1 = state_25484;
var statearr_25517_25548 = state_25484__$1;
(statearr_25517_25548[(2)] = inst_25468);

(statearr_25517_25548[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25485 === (10))){
var inst_25437 = (state_25484[(9)]);
var inst_25439 = (state_25484[(12)]);
var inst_25444 = cljs.core._nth.call(null,inst_25437,inst_25439);
var state_25484__$1 = state_25484;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25484__$1,(13),out,inst_25444);
} else {
if((state_val_25485 === (18))){
var inst_25450 = (state_25484[(7)]);
var inst_25459 = cljs.core.first.call(null,inst_25450);
var state_25484__$1 = state_25484;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25484__$1,(20),out,inst_25459);
} else {
if((state_val_25485 === (8))){
var inst_25438 = (state_25484[(11)]);
var inst_25439 = (state_25484[(12)]);
var inst_25441 = (inst_25439 < inst_25438);
var inst_25442 = inst_25441;
var state_25484__$1 = state_25484;
if(cljs.core.truth_(inst_25442)){
var statearr_25518_25549 = state_25484__$1;
(statearr_25518_25549[(1)] = (10));

} else {
var statearr_25519_25550 = state_25484__$1;
(statearr_25519_25550[(1)] = (11));

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
}
}
}
}
}
}
});})(c__23027__auto__))
;
return ((function (switch__22962__auto__,c__23027__auto__){
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__22963__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__22963__auto____0 = (function (){
var statearr_25523 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_25523[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__22963__auto__);

(statearr_25523[(1)] = (1));

return statearr_25523;
});
var cljs$core$async$mapcat_STAR__$_state_machine__22963__auto____1 = (function (state_25484){
while(true){
var ret_value__22964__auto__ = (function (){try{while(true){
var result__22965__auto__ = switch__22962__auto__.call(null,state_25484);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22965__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22965__auto__;
}
break;
}
}catch (e25524){if((e25524 instanceof Object)){
var ex__22966__auto__ = e25524;
var statearr_25525_25551 = state_25484;
(statearr_25525_25551[(5)] = ex__22966__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25484);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25524;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22964__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25552 = state_25484;
state_25484 = G__25552;
continue;
} else {
return ret_value__22964__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__22963__auto__ = function(state_25484){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__22963__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__22963__auto____1.call(this,state_25484);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__22963__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__22963__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__22963__auto__;
})()
;})(switch__22962__auto__,c__23027__auto__))
})();
var state__23029__auto__ = (function (){var statearr_25526 = f__23028__auto__.call(null);
(statearr_25526[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__23027__auto__);

return statearr_25526;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23029__auto__);
});})(c__23027__auto__))
);

return c__23027__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var args25553 = [];
var len__21234__auto___25556 = arguments.length;
var i__21235__auto___25557 = (0);
while(true){
if((i__21235__auto___25557 < len__21234__auto___25556)){
args25553.push((arguments[i__21235__auto___25557]));

var G__25558 = (i__21235__auto___25557 + (1));
i__21235__auto___25557 = G__25558;
continue;
} else {
}
break;
}

var G__25555 = args25553.length;
switch (G__25555) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args25553.length)].join('')));

}
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = (function (f,in$){
return cljs.core.async.mapcat_LT_.call(null,f,in$,null);
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = (function (f,in$,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
cljs.core.async.mapcat_STAR_.call(null,f,in$,out);

return out;
});

cljs.core.async.mapcat_LT_.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(var_args){
var args25560 = [];
var len__21234__auto___25563 = arguments.length;
var i__21235__auto___25564 = (0);
while(true){
if((i__21235__auto___25564 < len__21234__auto___25563)){
args25560.push((arguments[i__21235__auto___25564]));

var G__25565 = (i__21235__auto___25564 + (1));
i__21235__auto___25564 = G__25565;
continue;
} else {
}
break;
}

var G__25562 = args25560.length;
switch (G__25562) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args25560.length)].join('')));

}
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = (function (f,out){
return cljs.core.async.mapcat_GT_.call(null,f,out,null);
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = (function (f,out,buf_or_n){
var in$ = cljs.core.async.chan.call(null,buf_or_n);
cljs.core.async.mapcat_STAR_.call(null,f,in$,out);

return in$;
});

cljs.core.async.mapcat_GT_.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.unique = (function cljs$core$async$unique(var_args){
var args25567 = [];
var len__21234__auto___25618 = arguments.length;
var i__21235__auto___25619 = (0);
while(true){
if((i__21235__auto___25619 < len__21234__auto___25618)){
args25567.push((arguments[i__21235__auto___25619]));

var G__25620 = (i__21235__auto___25619 + (1));
i__21235__auto___25619 = G__25620;
continue;
} else {
}
break;
}

var G__25569 = args25567.length;
switch (G__25569) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args25567.length)].join('')));

}
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.call(null,ch,null);
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__23027__auto___25622 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23027__auto___25622,out){
return (function (){
var f__23028__auto__ = (function (){var switch__22962__auto__ = ((function (c__23027__auto___25622,out){
return (function (state_25593){
var state_val_25594 = (state_25593[(1)]);
if((state_val_25594 === (7))){
var inst_25588 = (state_25593[(2)]);
var state_25593__$1 = state_25593;
var statearr_25595_25623 = state_25593__$1;
(statearr_25595_25623[(2)] = inst_25588);

(statearr_25595_25623[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25594 === (1))){
var inst_25570 = null;
var state_25593__$1 = (function (){var statearr_25596 = state_25593;
(statearr_25596[(7)] = inst_25570);

return statearr_25596;
})();
var statearr_25597_25624 = state_25593__$1;
(statearr_25597_25624[(2)] = null);

(statearr_25597_25624[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25594 === (4))){
var inst_25573 = (state_25593[(8)]);
var inst_25573__$1 = (state_25593[(2)]);
var inst_25574 = (inst_25573__$1 == null);
var inst_25575 = cljs.core.not.call(null,inst_25574);
var state_25593__$1 = (function (){var statearr_25598 = state_25593;
(statearr_25598[(8)] = inst_25573__$1);

return statearr_25598;
})();
if(inst_25575){
var statearr_25599_25625 = state_25593__$1;
(statearr_25599_25625[(1)] = (5));

} else {
var statearr_25600_25626 = state_25593__$1;
(statearr_25600_25626[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25594 === (6))){
var state_25593__$1 = state_25593;
var statearr_25601_25627 = state_25593__$1;
(statearr_25601_25627[(2)] = null);

(statearr_25601_25627[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25594 === (3))){
var inst_25590 = (state_25593[(2)]);
var inst_25591 = cljs.core.async.close_BANG_.call(null,out);
var state_25593__$1 = (function (){var statearr_25602 = state_25593;
(statearr_25602[(9)] = inst_25590);

return statearr_25602;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25593__$1,inst_25591);
} else {
if((state_val_25594 === (2))){
var state_25593__$1 = state_25593;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25593__$1,(4),ch);
} else {
if((state_val_25594 === (11))){
var inst_25573 = (state_25593[(8)]);
var inst_25582 = (state_25593[(2)]);
var inst_25570 = inst_25573;
var state_25593__$1 = (function (){var statearr_25603 = state_25593;
(statearr_25603[(7)] = inst_25570);

(statearr_25603[(10)] = inst_25582);

return statearr_25603;
})();
var statearr_25604_25628 = state_25593__$1;
(statearr_25604_25628[(2)] = null);

(statearr_25604_25628[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25594 === (9))){
var inst_25573 = (state_25593[(8)]);
var state_25593__$1 = state_25593;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25593__$1,(11),out,inst_25573);
} else {
if((state_val_25594 === (5))){
var inst_25573 = (state_25593[(8)]);
var inst_25570 = (state_25593[(7)]);
var inst_25577 = cljs.core._EQ_.call(null,inst_25573,inst_25570);
var state_25593__$1 = state_25593;
if(inst_25577){
var statearr_25606_25629 = state_25593__$1;
(statearr_25606_25629[(1)] = (8));

} else {
var statearr_25607_25630 = state_25593__$1;
(statearr_25607_25630[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25594 === (10))){
var inst_25585 = (state_25593[(2)]);
var state_25593__$1 = state_25593;
var statearr_25608_25631 = state_25593__$1;
(statearr_25608_25631[(2)] = inst_25585);

(statearr_25608_25631[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25594 === (8))){
var inst_25570 = (state_25593[(7)]);
var tmp25605 = inst_25570;
var inst_25570__$1 = tmp25605;
var state_25593__$1 = (function (){var statearr_25609 = state_25593;
(statearr_25609[(7)] = inst_25570__$1);

return statearr_25609;
})();
var statearr_25610_25632 = state_25593__$1;
(statearr_25610_25632[(2)] = null);

(statearr_25610_25632[(1)] = (2));


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
});})(c__23027__auto___25622,out))
;
return ((function (switch__22962__auto__,c__23027__auto___25622,out){
return (function() {
var cljs$core$async$state_machine__22963__auto__ = null;
var cljs$core$async$state_machine__22963__auto____0 = (function (){
var statearr_25614 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_25614[(0)] = cljs$core$async$state_machine__22963__auto__);

(statearr_25614[(1)] = (1));

return statearr_25614;
});
var cljs$core$async$state_machine__22963__auto____1 = (function (state_25593){
while(true){
var ret_value__22964__auto__ = (function (){try{while(true){
var result__22965__auto__ = switch__22962__auto__.call(null,state_25593);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22965__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22965__auto__;
}
break;
}
}catch (e25615){if((e25615 instanceof Object)){
var ex__22966__auto__ = e25615;
var statearr_25616_25633 = state_25593;
(statearr_25616_25633[(5)] = ex__22966__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25593);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25615;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22964__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25634 = state_25593;
state_25593 = G__25634;
continue;
} else {
return ret_value__22964__auto__;
}
break;
}
});
cljs$core$async$state_machine__22963__auto__ = function(state_25593){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__22963__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__22963__auto____1.call(this,state_25593);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__22963__auto____0;
cljs$core$async$state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__22963__auto____1;
return cljs$core$async$state_machine__22963__auto__;
})()
;})(switch__22962__auto__,c__23027__auto___25622,out))
})();
var state__23029__auto__ = (function (){var statearr_25617 = f__23028__auto__.call(null);
(statearr_25617[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__23027__auto___25622);

return statearr_25617;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23029__auto__);
});})(c__23027__auto___25622,out))
);


return out;
});

cljs.core.async.unique.cljs$lang$maxFixedArity = 2;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var args25635 = [];
var len__21234__auto___25705 = arguments.length;
var i__21235__auto___25706 = (0);
while(true){
if((i__21235__auto___25706 < len__21234__auto___25705)){
args25635.push((arguments[i__21235__auto___25706]));

var G__25707 = (i__21235__auto___25706 + (1));
i__21235__auto___25706 = G__25707;
continue;
} else {
}
break;
}

var G__25637 = args25635.length;
switch (G__25637) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args25635.length)].join('')));

}
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.call(null,n,ch,null);
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__23027__auto___25709 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23027__auto___25709,out){
return (function (){
var f__23028__auto__ = (function (){var switch__22962__auto__ = ((function (c__23027__auto___25709,out){
return (function (state_25675){
var state_val_25676 = (state_25675[(1)]);
if((state_val_25676 === (7))){
var inst_25671 = (state_25675[(2)]);
var state_25675__$1 = state_25675;
var statearr_25677_25710 = state_25675__$1;
(statearr_25677_25710[(2)] = inst_25671);

(statearr_25677_25710[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25676 === (1))){
var inst_25638 = (new Array(n));
var inst_25639 = inst_25638;
var inst_25640 = (0);
var state_25675__$1 = (function (){var statearr_25678 = state_25675;
(statearr_25678[(7)] = inst_25640);

(statearr_25678[(8)] = inst_25639);

return statearr_25678;
})();
var statearr_25679_25711 = state_25675__$1;
(statearr_25679_25711[(2)] = null);

(statearr_25679_25711[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25676 === (4))){
var inst_25643 = (state_25675[(9)]);
var inst_25643__$1 = (state_25675[(2)]);
var inst_25644 = (inst_25643__$1 == null);
var inst_25645 = cljs.core.not.call(null,inst_25644);
var state_25675__$1 = (function (){var statearr_25680 = state_25675;
(statearr_25680[(9)] = inst_25643__$1);

return statearr_25680;
})();
if(inst_25645){
var statearr_25681_25712 = state_25675__$1;
(statearr_25681_25712[(1)] = (5));

} else {
var statearr_25682_25713 = state_25675__$1;
(statearr_25682_25713[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25676 === (15))){
var inst_25665 = (state_25675[(2)]);
var state_25675__$1 = state_25675;
var statearr_25683_25714 = state_25675__$1;
(statearr_25683_25714[(2)] = inst_25665);

(statearr_25683_25714[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25676 === (13))){
var state_25675__$1 = state_25675;
var statearr_25684_25715 = state_25675__$1;
(statearr_25684_25715[(2)] = null);

(statearr_25684_25715[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25676 === (6))){
var inst_25640 = (state_25675[(7)]);
var inst_25661 = (inst_25640 > (0));
var state_25675__$1 = state_25675;
if(cljs.core.truth_(inst_25661)){
var statearr_25685_25716 = state_25675__$1;
(statearr_25685_25716[(1)] = (12));

} else {
var statearr_25686_25717 = state_25675__$1;
(statearr_25686_25717[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25676 === (3))){
var inst_25673 = (state_25675[(2)]);
var state_25675__$1 = state_25675;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25675__$1,inst_25673);
} else {
if((state_val_25676 === (12))){
var inst_25639 = (state_25675[(8)]);
var inst_25663 = cljs.core.vec.call(null,inst_25639);
var state_25675__$1 = state_25675;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25675__$1,(15),out,inst_25663);
} else {
if((state_val_25676 === (2))){
var state_25675__$1 = state_25675;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25675__$1,(4),ch);
} else {
if((state_val_25676 === (11))){
var inst_25655 = (state_25675[(2)]);
var inst_25656 = (new Array(n));
var inst_25639 = inst_25656;
var inst_25640 = (0);
var state_25675__$1 = (function (){var statearr_25687 = state_25675;
(statearr_25687[(7)] = inst_25640);

(statearr_25687[(8)] = inst_25639);

(statearr_25687[(10)] = inst_25655);

return statearr_25687;
})();
var statearr_25688_25718 = state_25675__$1;
(statearr_25688_25718[(2)] = null);

(statearr_25688_25718[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25676 === (9))){
var inst_25639 = (state_25675[(8)]);
var inst_25653 = cljs.core.vec.call(null,inst_25639);
var state_25675__$1 = state_25675;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25675__$1,(11),out,inst_25653);
} else {
if((state_val_25676 === (5))){
var inst_25640 = (state_25675[(7)]);
var inst_25643 = (state_25675[(9)]);
var inst_25648 = (state_25675[(11)]);
var inst_25639 = (state_25675[(8)]);
var inst_25647 = (inst_25639[inst_25640] = inst_25643);
var inst_25648__$1 = (inst_25640 + (1));
var inst_25649 = (inst_25648__$1 < n);
var state_25675__$1 = (function (){var statearr_25689 = state_25675;
(statearr_25689[(12)] = inst_25647);

(statearr_25689[(11)] = inst_25648__$1);

return statearr_25689;
})();
if(cljs.core.truth_(inst_25649)){
var statearr_25690_25719 = state_25675__$1;
(statearr_25690_25719[(1)] = (8));

} else {
var statearr_25691_25720 = state_25675__$1;
(statearr_25691_25720[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25676 === (14))){
var inst_25668 = (state_25675[(2)]);
var inst_25669 = cljs.core.async.close_BANG_.call(null,out);
var state_25675__$1 = (function (){var statearr_25693 = state_25675;
(statearr_25693[(13)] = inst_25668);

return statearr_25693;
})();
var statearr_25694_25721 = state_25675__$1;
(statearr_25694_25721[(2)] = inst_25669);

(statearr_25694_25721[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25676 === (10))){
var inst_25659 = (state_25675[(2)]);
var state_25675__$1 = state_25675;
var statearr_25695_25722 = state_25675__$1;
(statearr_25695_25722[(2)] = inst_25659);

(statearr_25695_25722[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25676 === (8))){
var inst_25648 = (state_25675[(11)]);
var inst_25639 = (state_25675[(8)]);
var tmp25692 = inst_25639;
var inst_25639__$1 = tmp25692;
var inst_25640 = inst_25648;
var state_25675__$1 = (function (){var statearr_25696 = state_25675;
(statearr_25696[(7)] = inst_25640);

(statearr_25696[(8)] = inst_25639__$1);

return statearr_25696;
})();
var statearr_25697_25723 = state_25675__$1;
(statearr_25697_25723[(2)] = null);

(statearr_25697_25723[(1)] = (2));


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
});})(c__23027__auto___25709,out))
;
return ((function (switch__22962__auto__,c__23027__auto___25709,out){
return (function() {
var cljs$core$async$state_machine__22963__auto__ = null;
var cljs$core$async$state_machine__22963__auto____0 = (function (){
var statearr_25701 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_25701[(0)] = cljs$core$async$state_machine__22963__auto__);

(statearr_25701[(1)] = (1));

return statearr_25701;
});
var cljs$core$async$state_machine__22963__auto____1 = (function (state_25675){
while(true){
var ret_value__22964__auto__ = (function (){try{while(true){
var result__22965__auto__ = switch__22962__auto__.call(null,state_25675);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22965__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22965__auto__;
}
break;
}
}catch (e25702){if((e25702 instanceof Object)){
var ex__22966__auto__ = e25702;
var statearr_25703_25724 = state_25675;
(statearr_25703_25724[(5)] = ex__22966__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25675);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25702;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22964__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25725 = state_25675;
state_25675 = G__25725;
continue;
} else {
return ret_value__22964__auto__;
}
break;
}
});
cljs$core$async$state_machine__22963__auto__ = function(state_25675){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__22963__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__22963__auto____1.call(this,state_25675);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__22963__auto____0;
cljs$core$async$state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__22963__auto____1;
return cljs$core$async$state_machine__22963__auto__;
})()
;})(switch__22962__auto__,c__23027__auto___25709,out))
})();
var state__23029__auto__ = (function (){var statearr_25704 = f__23028__auto__.call(null);
(statearr_25704[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__23027__auto___25709);

return statearr_25704;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23029__auto__);
});})(c__23027__auto___25709,out))
);


return out;
});

cljs.core.async.partition.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var args25726 = [];
var len__21234__auto___25800 = arguments.length;
var i__21235__auto___25801 = (0);
while(true){
if((i__21235__auto___25801 < len__21234__auto___25800)){
args25726.push((arguments[i__21235__auto___25801]));

var G__25802 = (i__21235__auto___25801 + (1));
i__21235__auto___25801 = G__25802;
continue;
} else {
}
break;
}

var G__25728 = args25726.length;
switch (G__25728) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args25726.length)].join('')));

}
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.call(null,f,ch,null);
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__23027__auto___25804 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23027__auto___25804,out){
return (function (){
var f__23028__auto__ = (function (){var switch__22962__auto__ = ((function (c__23027__auto___25804,out){
return (function (state_25770){
var state_val_25771 = (state_25770[(1)]);
if((state_val_25771 === (7))){
var inst_25766 = (state_25770[(2)]);
var state_25770__$1 = state_25770;
var statearr_25772_25805 = state_25770__$1;
(statearr_25772_25805[(2)] = inst_25766);

(statearr_25772_25805[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25771 === (1))){
var inst_25729 = [];
var inst_25730 = inst_25729;
var inst_25731 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_25770__$1 = (function (){var statearr_25773 = state_25770;
(statearr_25773[(7)] = inst_25731);

(statearr_25773[(8)] = inst_25730);

return statearr_25773;
})();
var statearr_25774_25806 = state_25770__$1;
(statearr_25774_25806[(2)] = null);

(statearr_25774_25806[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25771 === (4))){
var inst_25734 = (state_25770[(9)]);
var inst_25734__$1 = (state_25770[(2)]);
var inst_25735 = (inst_25734__$1 == null);
var inst_25736 = cljs.core.not.call(null,inst_25735);
var state_25770__$1 = (function (){var statearr_25775 = state_25770;
(statearr_25775[(9)] = inst_25734__$1);

return statearr_25775;
})();
if(inst_25736){
var statearr_25776_25807 = state_25770__$1;
(statearr_25776_25807[(1)] = (5));

} else {
var statearr_25777_25808 = state_25770__$1;
(statearr_25777_25808[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25771 === (15))){
var inst_25760 = (state_25770[(2)]);
var state_25770__$1 = state_25770;
var statearr_25778_25809 = state_25770__$1;
(statearr_25778_25809[(2)] = inst_25760);

(statearr_25778_25809[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25771 === (13))){
var state_25770__$1 = state_25770;
var statearr_25779_25810 = state_25770__$1;
(statearr_25779_25810[(2)] = null);

(statearr_25779_25810[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25771 === (6))){
var inst_25730 = (state_25770[(8)]);
var inst_25755 = inst_25730.length;
var inst_25756 = (inst_25755 > (0));
var state_25770__$1 = state_25770;
if(cljs.core.truth_(inst_25756)){
var statearr_25780_25811 = state_25770__$1;
(statearr_25780_25811[(1)] = (12));

} else {
var statearr_25781_25812 = state_25770__$1;
(statearr_25781_25812[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25771 === (3))){
var inst_25768 = (state_25770[(2)]);
var state_25770__$1 = state_25770;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25770__$1,inst_25768);
} else {
if((state_val_25771 === (12))){
var inst_25730 = (state_25770[(8)]);
var inst_25758 = cljs.core.vec.call(null,inst_25730);
var state_25770__$1 = state_25770;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25770__$1,(15),out,inst_25758);
} else {
if((state_val_25771 === (2))){
var state_25770__$1 = state_25770;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25770__$1,(4),ch);
} else {
if((state_val_25771 === (11))){
var inst_25734 = (state_25770[(9)]);
var inst_25738 = (state_25770[(10)]);
var inst_25748 = (state_25770[(2)]);
var inst_25749 = [];
var inst_25750 = inst_25749.push(inst_25734);
var inst_25730 = inst_25749;
var inst_25731 = inst_25738;
var state_25770__$1 = (function (){var statearr_25782 = state_25770;
(statearr_25782[(11)] = inst_25748);

(statearr_25782[(7)] = inst_25731);

(statearr_25782[(12)] = inst_25750);

(statearr_25782[(8)] = inst_25730);

return statearr_25782;
})();
var statearr_25783_25813 = state_25770__$1;
(statearr_25783_25813[(2)] = null);

(statearr_25783_25813[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25771 === (9))){
var inst_25730 = (state_25770[(8)]);
var inst_25746 = cljs.core.vec.call(null,inst_25730);
var state_25770__$1 = state_25770;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25770__$1,(11),out,inst_25746);
} else {
if((state_val_25771 === (5))){
var inst_25731 = (state_25770[(7)]);
var inst_25734 = (state_25770[(9)]);
var inst_25738 = (state_25770[(10)]);
var inst_25738__$1 = f.call(null,inst_25734);
var inst_25739 = cljs.core._EQ_.call(null,inst_25738__$1,inst_25731);
var inst_25740 = cljs.core.keyword_identical_QMARK_.call(null,inst_25731,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var inst_25741 = (inst_25739) || (inst_25740);
var state_25770__$1 = (function (){var statearr_25784 = state_25770;
(statearr_25784[(10)] = inst_25738__$1);

return statearr_25784;
})();
if(cljs.core.truth_(inst_25741)){
var statearr_25785_25814 = state_25770__$1;
(statearr_25785_25814[(1)] = (8));

} else {
var statearr_25786_25815 = state_25770__$1;
(statearr_25786_25815[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25771 === (14))){
var inst_25763 = (state_25770[(2)]);
var inst_25764 = cljs.core.async.close_BANG_.call(null,out);
var state_25770__$1 = (function (){var statearr_25788 = state_25770;
(statearr_25788[(13)] = inst_25763);

return statearr_25788;
})();
var statearr_25789_25816 = state_25770__$1;
(statearr_25789_25816[(2)] = inst_25764);

(statearr_25789_25816[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25771 === (10))){
var inst_25753 = (state_25770[(2)]);
var state_25770__$1 = state_25770;
var statearr_25790_25817 = state_25770__$1;
(statearr_25790_25817[(2)] = inst_25753);

(statearr_25790_25817[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25771 === (8))){
var inst_25734 = (state_25770[(9)]);
var inst_25738 = (state_25770[(10)]);
var inst_25730 = (state_25770[(8)]);
var inst_25743 = inst_25730.push(inst_25734);
var tmp25787 = inst_25730;
var inst_25730__$1 = tmp25787;
var inst_25731 = inst_25738;
var state_25770__$1 = (function (){var statearr_25791 = state_25770;
(statearr_25791[(14)] = inst_25743);

(statearr_25791[(7)] = inst_25731);

(statearr_25791[(8)] = inst_25730__$1);

return statearr_25791;
})();
var statearr_25792_25818 = state_25770__$1;
(statearr_25792_25818[(2)] = null);

(statearr_25792_25818[(1)] = (2));


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
});})(c__23027__auto___25804,out))
;
return ((function (switch__22962__auto__,c__23027__auto___25804,out){
return (function() {
var cljs$core$async$state_machine__22963__auto__ = null;
var cljs$core$async$state_machine__22963__auto____0 = (function (){
var statearr_25796 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_25796[(0)] = cljs$core$async$state_machine__22963__auto__);

(statearr_25796[(1)] = (1));

return statearr_25796;
});
var cljs$core$async$state_machine__22963__auto____1 = (function (state_25770){
while(true){
var ret_value__22964__auto__ = (function (){try{while(true){
var result__22965__auto__ = switch__22962__auto__.call(null,state_25770);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22965__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22965__auto__;
}
break;
}
}catch (e25797){if((e25797 instanceof Object)){
var ex__22966__auto__ = e25797;
var statearr_25798_25819 = state_25770;
(statearr_25798_25819[(5)] = ex__22966__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25770);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25797;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22964__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25820 = state_25770;
state_25770 = G__25820;
continue;
} else {
return ret_value__22964__auto__;
}
break;
}
});
cljs$core$async$state_machine__22963__auto__ = function(state_25770){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__22963__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__22963__auto____1.call(this,state_25770);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__22963__auto____0;
cljs$core$async$state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__22963__auto____1;
return cljs$core$async$state_machine__22963__auto__;
})()
;})(switch__22962__auto__,c__23027__auto___25804,out))
})();
var state__23029__auto__ = (function (){var statearr_25799 = f__23028__auto__.call(null);
(statearr_25799[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__23027__auto___25804);

return statearr_25799;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23029__auto__);
});})(c__23027__auto___25804,out))
);


return out;
});

cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3;


//# sourceMappingURL=async.js.map?rel=1499477030291