// Compiled by ClojureScript 1.9.229 {}
goog.provide('figwheel.client.file_reloading');
goog.require('cljs.core');
goog.require('goog.string');
goog.require('goog.Uri');
goog.require('goog.net.jsloader');
goog.require('cljs.core.async');
goog.require('goog.object');
goog.require('clojure.set');
goog.require('clojure.string');
goog.require('figwheel.client.utils');
if(typeof figwheel.client.file_reloading.figwheel_meta_pragmas !== 'undefined'){
} else {
figwheel.client.file_reloading.figwheel_meta_pragmas = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
figwheel.client.file_reloading.on_jsload_custom_event = (function figwheel$client$file_reloading$on_jsload_custom_event(url){
return figwheel.client.utils.dispatch_custom_event.call(null,"figwheel.js-reload",url);
});
figwheel.client.file_reloading.before_jsload_custom_event = (function figwheel$client$file_reloading$before_jsload_custom_event(files){
return figwheel.client.utils.dispatch_custom_event.call(null,"figwheel.before-js-reload",files);
});
figwheel.client.file_reloading.namespace_file_map_QMARK_ = (function figwheel$client$file_reloading$namespace_file_map_QMARK_(m){
var or__20159__auto__ = (cljs.core.map_QMARK_.call(null,m)) && (typeof new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(m) === 'string') && (((new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(m) == null)) || (typeof new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(m) === 'string')) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(m),new cljs.core.Keyword(null,"namespace","namespace",-377510372)));
if(or__20159__auto__){
return or__20159__auto__;
} else {
cljs.core.println.call(null,"Error not namespace-file-map",cljs.core.pr_str.call(null,m));

return false;
}
});
figwheel.client.file_reloading.add_cache_buster = (function figwheel$client$file_reloading$add_cache_buster(url){

return goog.Uri.parse(url).makeUnique();
});
figwheel.client.file_reloading.name__GT_path = (function figwheel$client$file_reloading$name__GT_path(ns){

return (goog.dependencies_.nameToPath[ns]);
});
figwheel.client.file_reloading.provided_QMARK_ = (function figwheel$client$file_reloading$provided_QMARK_(ns){
return (goog.dependencies_.written[figwheel.client.file_reloading.name__GT_path.call(null,ns)]);
});
figwheel.client.file_reloading.fix_node_request_url = (function figwheel$client$file_reloading$fix_node_request_url(url){

if(cljs.core.truth_(goog.string.startsWith(url,"../"))){
return clojure.string.replace.call(null,url,"../","");
} else {
return [cljs.core.str("goog/"),cljs.core.str(url)].join('');
}
});
figwheel.client.file_reloading.immutable_ns_QMARK_ = (function figwheel$client$file_reloading$immutable_ns_QMARK_(name){
var or__20159__auto__ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 9, ["svgpan.SvgPan",null,"far.out",null,"testDep.bar",null,"someprotopackage.TestPackageTypes",null,"goog",null,"an.existing.path",null,"cljs.core",null,"ns",null,"dup.base",null], null), null).call(null,name);
if(cljs.core.truth_(or__20159__auto__)){
return or__20159__auto__;
} else {
return cljs.core.some.call(null,cljs.core.partial.call(null,goog.string.startsWith,name),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, ["goog.","cljs.","clojure.","fake.","proto2."], null));
}
});
figwheel.client.file_reloading.get_requires = (function figwheel$client$file_reloading$get_requires(ns){
return cljs.core.set.call(null,cljs.core.filter.call(null,(function (p1__25882_SHARP_){
return cljs.core.not.call(null,figwheel.client.file_reloading.immutable_ns_QMARK_.call(null,p1__25882_SHARP_));
}),goog.object.getKeys((goog.dependencies_.requires[figwheel.client.file_reloading.name__GT_path.call(null,ns)]))));
});
if(typeof figwheel.client.file_reloading.dependency_data !== 'undefined'){
} else {
figwheel.client.file_reloading.dependency_data = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pathToName","pathToName",-1236616181),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"dependents","dependents",136812837),cljs.core.PersistentArrayMap.EMPTY], null));
}
figwheel.client.file_reloading.path_to_name_BANG_ = (function figwheel$client$file_reloading$path_to_name_BANG_(path,name){
return cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.dependency_data,cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pathToName","pathToName",-1236616181),path], null),cljs.core.fnil.call(null,clojure.set.union,cljs.core.PersistentHashSet.EMPTY),cljs.core.PersistentHashSet.fromArray([name], true));
});
/**
 * Setup a path to name dependencies map.
 * That goes from path -> #{ ns-names }
 */
figwheel.client.file_reloading.setup_path__GT_name_BANG_ = (function figwheel$client$file_reloading$setup_path__GT_name_BANG_(){
var nameToPath = goog.object.filter(goog.dependencies_.nameToPath,(function (v,k,o){
return goog.string.startsWith(v,"../");
}));
return goog.object.forEach(nameToPath,((function (nameToPath){
return (function (v,k,o){
return figwheel.client.file_reloading.path_to_name_BANG_.call(null,v,k);
});})(nameToPath))
);
});
/**
 * returns a set of namespaces defined by a path
 */
figwheel.client.file_reloading.path__GT_name = (function figwheel$client$file_reloading$path__GT_name(path){
return cljs.core.get_in.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.dependency_data),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pathToName","pathToName",-1236616181),path], null));
});
figwheel.client.file_reloading.name_to_parent_BANG_ = (function figwheel$client$file_reloading$name_to_parent_BANG_(ns,parent_ns){
return cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.dependency_data,cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dependents","dependents",136812837),ns], null),cljs.core.fnil.call(null,clojure.set.union,cljs.core.PersistentHashSet.EMPTY),cljs.core.PersistentHashSet.fromArray([parent_ns], true));
});
/**
 * This reverses the goog.dependencies_.requires for looking up ns-dependents.
 */
figwheel.client.file_reloading.setup_ns__GT_dependents_BANG_ = (function figwheel$client$file_reloading$setup_ns__GT_dependents_BANG_(){
var requires = goog.object.filter(goog.dependencies_.requires,(function (v,k,o){
return goog.string.startsWith(k,"../");
}));
return goog.object.forEach(requires,((function (requires){
return (function (v,k,_){
return goog.object.forEach(v,((function (requires){
return (function (v_SINGLEQUOTE_,k_SINGLEQUOTE_,___$1){
var seq__25887 = cljs.core.seq.call(null,figwheel.client.file_reloading.path__GT_name.call(null,k));
var chunk__25888 = null;
var count__25889 = (0);
var i__25890 = (0);
while(true){
if((i__25890 < count__25889)){
var n = cljs.core._nth.call(null,chunk__25888,i__25890);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,k_SINGLEQUOTE_,n);

var G__25891 = seq__25887;
var G__25892 = chunk__25888;
var G__25893 = count__25889;
var G__25894 = (i__25890 + (1));
seq__25887 = G__25891;
chunk__25888 = G__25892;
count__25889 = G__25893;
i__25890 = G__25894;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__25887);
if(temp__4657__auto__){
var seq__25887__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__25887__$1)){
var c__20970__auto__ = cljs.core.chunk_first.call(null,seq__25887__$1);
var G__25895 = cljs.core.chunk_rest.call(null,seq__25887__$1);
var G__25896 = c__20970__auto__;
var G__25897 = cljs.core.count.call(null,c__20970__auto__);
var G__25898 = (0);
seq__25887 = G__25895;
chunk__25888 = G__25896;
count__25889 = G__25897;
i__25890 = G__25898;
continue;
} else {
var n = cljs.core.first.call(null,seq__25887__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,k_SINGLEQUOTE_,n);

var G__25899 = cljs.core.next.call(null,seq__25887__$1);
var G__25900 = null;
var G__25901 = (0);
var G__25902 = (0);
seq__25887 = G__25899;
chunk__25888 = G__25900;
count__25889 = G__25901;
i__25890 = G__25902;
continue;
}
} else {
return null;
}
}
break;
}
});})(requires))
);
});})(requires))
);
});
figwheel.client.file_reloading.ns__GT_dependents = (function figwheel$client$file_reloading$ns__GT_dependents(ns){
return cljs.core.get_in.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.dependency_data),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dependents","dependents",136812837),ns], null));
});
figwheel.client.file_reloading.build_topo_sort = (function figwheel$client$file_reloading$build_topo_sort(get_deps){
var get_deps__$1 = cljs.core.memoize.call(null,get_deps);
var topo_sort_helper_STAR_ = ((function (get_deps__$1){
return (function figwheel$client$file_reloading$build_topo_sort_$_topo_sort_helper_STAR_(x,depth,state){
var deps = get_deps__$1.call(null,x);
if(cljs.core.empty_QMARK_.call(null,deps)){
return null;
} else {
return topo_sort_STAR_.call(null,deps,depth,state);
}
});})(get_deps__$1))
;
var topo_sort_STAR_ = ((function (get_deps__$1){
return (function() {
var figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_ = null;
var figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___1 = (function (deps){
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_.call(null,deps,(0),cljs.core.atom.call(null,cljs.core.sorted_map.call(null)));
});
var figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___3 = (function (deps,depth,state){
cljs.core.swap_BANG_.call(null,state,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [depth], null),cljs.core.fnil.call(null,cljs.core.into,cljs.core.PersistentHashSet.EMPTY),deps);

var seq__25953_25964 = cljs.core.seq.call(null,deps);
var chunk__25954_25965 = null;
var count__25955_25966 = (0);
var i__25956_25967 = (0);
while(true){
if((i__25956_25967 < count__25955_25966)){
var dep_25968 = cljs.core._nth.call(null,chunk__25954_25965,i__25956_25967);
topo_sort_helper_STAR_.call(null,dep_25968,(depth + (1)),state);

var G__25969 = seq__25953_25964;
var G__25970 = chunk__25954_25965;
var G__25971 = count__25955_25966;
var G__25972 = (i__25956_25967 + (1));
seq__25953_25964 = G__25969;
chunk__25954_25965 = G__25970;
count__25955_25966 = G__25971;
i__25956_25967 = G__25972;
continue;
} else {
var temp__4657__auto___25973 = cljs.core.seq.call(null,seq__25953_25964);
if(temp__4657__auto___25973){
var seq__25953_25974__$1 = temp__4657__auto___25973;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__25953_25974__$1)){
var c__20970__auto___25975 = cljs.core.chunk_first.call(null,seq__25953_25974__$1);
var G__25976 = cljs.core.chunk_rest.call(null,seq__25953_25974__$1);
var G__25977 = c__20970__auto___25975;
var G__25978 = cljs.core.count.call(null,c__20970__auto___25975);
var G__25979 = (0);
seq__25953_25964 = G__25976;
chunk__25954_25965 = G__25977;
count__25955_25966 = G__25978;
i__25956_25967 = G__25979;
continue;
} else {
var dep_25980 = cljs.core.first.call(null,seq__25953_25974__$1);
topo_sort_helper_STAR_.call(null,dep_25980,(depth + (1)),state);

var G__25981 = cljs.core.next.call(null,seq__25953_25974__$1);
var G__25982 = null;
var G__25983 = (0);
var G__25984 = (0);
seq__25953_25964 = G__25981;
chunk__25954_25965 = G__25982;
count__25955_25966 = G__25983;
i__25956_25967 = G__25984;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.call(null,depth,(0))){
return elim_dups_STAR_.call(null,cljs.core.reverse.call(null,cljs.core.vals.call(null,cljs.core.deref.call(null,state))));
} else {
return null;
}
});
figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_ = function(deps,depth,state){
switch(arguments.length){
case 1:
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___1.call(this,deps);
case 3:
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___3.call(this,deps,depth,state);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___1;
figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_.cljs$core$IFn$_invoke$arity$3 = figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___3;
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_;
})()
;})(get_deps__$1))
;
var elim_dups_STAR_ = ((function (get_deps__$1){
return (function figwheel$client$file_reloading$build_topo_sort_$_elim_dups_STAR_(p__25957){
var vec__25961 = p__25957;
var seq__25962 = cljs.core.seq.call(null,vec__25961);
var first__25963 = cljs.core.first.call(null,seq__25962);
var seq__25962__$1 = cljs.core.next.call(null,seq__25962);
var x = first__25963;
var xs = seq__25962__$1;
if((x == null)){
return cljs.core.List.EMPTY;
} else {
return cljs.core.cons.call(null,x,figwheel$client$file_reloading$build_topo_sort_$_elim_dups_STAR_.call(null,cljs.core.map.call(null,((function (vec__25961,seq__25962,first__25963,seq__25962__$1,x,xs,get_deps__$1){
return (function (p1__25903_SHARP_){
return clojure.set.difference.call(null,p1__25903_SHARP_,x);
});})(vec__25961,seq__25962,first__25963,seq__25962__$1,x,xs,get_deps__$1))
,xs)));
}
});})(get_deps__$1))
;
return topo_sort_STAR_;
});
figwheel.client.file_reloading.get_all_dependencies = (function figwheel$client$file_reloading$get_all_dependencies(ns){
var topo_sort_SINGLEQUOTE_ = figwheel.client.file_reloading.build_topo_sort.call(null,figwheel.client.file_reloading.get_requires);
return cljs.core.apply.call(null,cljs.core.concat,topo_sort_SINGLEQUOTE_.call(null,cljs.core.set.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [ns], null))));
});
figwheel.client.file_reloading.get_all_dependents = (function figwheel$client$file_reloading$get_all_dependents(nss){
var topo_sort_SINGLEQUOTE_ = figwheel.client.file_reloading.build_topo_sort.call(null,figwheel.client.file_reloading.ns__GT_dependents);
return cljs.core.reverse.call(null,cljs.core.apply.call(null,cljs.core.concat,topo_sort_SINGLEQUOTE_.call(null,cljs.core.set.call(null,nss))));
});
figwheel.client.file_reloading.unprovide_BANG_ = (function figwheel$client$file_reloading$unprovide_BANG_(ns){
var path = figwheel.client.file_reloading.name__GT_path.call(null,ns);
goog.object.remove(goog.dependencies_.visited,path);

goog.object.remove(goog.dependencies_.written,path);

return goog.object.remove(goog.dependencies_.written,[cljs.core.str(goog.basePath),cljs.core.str(path)].join(''));
});
figwheel.client.file_reloading.resolve_ns = (function figwheel$client$file_reloading$resolve_ns(ns){
return [cljs.core.str(goog.basePath),cljs.core.str(figwheel.client.file_reloading.name__GT_path.call(null,ns))].join('');
});
figwheel.client.file_reloading.addDependency = (function figwheel$client$file_reloading$addDependency(path,provides,requires){
var seq__25997 = cljs.core.seq.call(null,provides);
var chunk__25998 = null;
var count__25999 = (0);
var i__26000 = (0);
while(true){
if((i__26000 < count__25999)){
var prov = cljs.core._nth.call(null,chunk__25998,i__26000);
figwheel.client.file_reloading.path_to_name_BANG_.call(null,path,prov);

var seq__26001_26009 = cljs.core.seq.call(null,requires);
var chunk__26002_26010 = null;
var count__26003_26011 = (0);
var i__26004_26012 = (0);
while(true){
if((i__26004_26012 < count__26003_26011)){
var req_26013 = cljs.core._nth.call(null,chunk__26002_26010,i__26004_26012);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_26013,prov);

var G__26014 = seq__26001_26009;
var G__26015 = chunk__26002_26010;
var G__26016 = count__26003_26011;
var G__26017 = (i__26004_26012 + (1));
seq__26001_26009 = G__26014;
chunk__26002_26010 = G__26015;
count__26003_26011 = G__26016;
i__26004_26012 = G__26017;
continue;
} else {
var temp__4657__auto___26018 = cljs.core.seq.call(null,seq__26001_26009);
if(temp__4657__auto___26018){
var seq__26001_26019__$1 = temp__4657__auto___26018;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__26001_26019__$1)){
var c__20970__auto___26020 = cljs.core.chunk_first.call(null,seq__26001_26019__$1);
var G__26021 = cljs.core.chunk_rest.call(null,seq__26001_26019__$1);
var G__26022 = c__20970__auto___26020;
var G__26023 = cljs.core.count.call(null,c__20970__auto___26020);
var G__26024 = (0);
seq__26001_26009 = G__26021;
chunk__26002_26010 = G__26022;
count__26003_26011 = G__26023;
i__26004_26012 = G__26024;
continue;
} else {
var req_26025 = cljs.core.first.call(null,seq__26001_26019__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_26025,prov);

var G__26026 = cljs.core.next.call(null,seq__26001_26019__$1);
var G__26027 = null;
var G__26028 = (0);
var G__26029 = (0);
seq__26001_26009 = G__26026;
chunk__26002_26010 = G__26027;
count__26003_26011 = G__26028;
i__26004_26012 = G__26029;
continue;
}
} else {
}
}
break;
}

var G__26030 = seq__25997;
var G__26031 = chunk__25998;
var G__26032 = count__25999;
var G__26033 = (i__26000 + (1));
seq__25997 = G__26030;
chunk__25998 = G__26031;
count__25999 = G__26032;
i__26000 = G__26033;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__25997);
if(temp__4657__auto__){
var seq__25997__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__25997__$1)){
var c__20970__auto__ = cljs.core.chunk_first.call(null,seq__25997__$1);
var G__26034 = cljs.core.chunk_rest.call(null,seq__25997__$1);
var G__26035 = c__20970__auto__;
var G__26036 = cljs.core.count.call(null,c__20970__auto__);
var G__26037 = (0);
seq__25997 = G__26034;
chunk__25998 = G__26035;
count__25999 = G__26036;
i__26000 = G__26037;
continue;
} else {
var prov = cljs.core.first.call(null,seq__25997__$1);
figwheel.client.file_reloading.path_to_name_BANG_.call(null,path,prov);

var seq__26005_26038 = cljs.core.seq.call(null,requires);
var chunk__26006_26039 = null;
var count__26007_26040 = (0);
var i__26008_26041 = (0);
while(true){
if((i__26008_26041 < count__26007_26040)){
var req_26042 = cljs.core._nth.call(null,chunk__26006_26039,i__26008_26041);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_26042,prov);

var G__26043 = seq__26005_26038;
var G__26044 = chunk__26006_26039;
var G__26045 = count__26007_26040;
var G__26046 = (i__26008_26041 + (1));
seq__26005_26038 = G__26043;
chunk__26006_26039 = G__26044;
count__26007_26040 = G__26045;
i__26008_26041 = G__26046;
continue;
} else {
var temp__4657__auto___26047__$1 = cljs.core.seq.call(null,seq__26005_26038);
if(temp__4657__auto___26047__$1){
var seq__26005_26048__$1 = temp__4657__auto___26047__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__26005_26048__$1)){
var c__20970__auto___26049 = cljs.core.chunk_first.call(null,seq__26005_26048__$1);
var G__26050 = cljs.core.chunk_rest.call(null,seq__26005_26048__$1);
var G__26051 = c__20970__auto___26049;
var G__26052 = cljs.core.count.call(null,c__20970__auto___26049);
var G__26053 = (0);
seq__26005_26038 = G__26050;
chunk__26006_26039 = G__26051;
count__26007_26040 = G__26052;
i__26008_26041 = G__26053;
continue;
} else {
var req_26054 = cljs.core.first.call(null,seq__26005_26048__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_26054,prov);

var G__26055 = cljs.core.next.call(null,seq__26005_26048__$1);
var G__26056 = null;
var G__26057 = (0);
var G__26058 = (0);
seq__26005_26038 = G__26055;
chunk__26006_26039 = G__26056;
count__26007_26040 = G__26057;
i__26008_26041 = G__26058;
continue;
}
} else {
}
}
break;
}

var G__26059 = cljs.core.next.call(null,seq__25997__$1);
var G__26060 = null;
var G__26061 = (0);
var G__26062 = (0);
seq__25997 = G__26059;
chunk__25998 = G__26060;
count__25999 = G__26061;
i__26000 = G__26062;
continue;
}
} else {
return null;
}
}
break;
}
});
figwheel.client.file_reloading.figwheel_require = (function figwheel$client$file_reloading$figwheel_require(src,reload){
goog.require = figwheel$client$file_reloading$figwheel_require;

if(cljs.core._EQ_.call(null,reload,"reload-all")){
var seq__26067_26071 = cljs.core.seq.call(null,figwheel.client.file_reloading.get_all_dependencies.call(null,src));
var chunk__26068_26072 = null;
var count__26069_26073 = (0);
var i__26070_26074 = (0);
while(true){
if((i__26070_26074 < count__26069_26073)){
var ns_26075 = cljs.core._nth.call(null,chunk__26068_26072,i__26070_26074);
figwheel.client.file_reloading.unprovide_BANG_.call(null,ns_26075);

var G__26076 = seq__26067_26071;
var G__26077 = chunk__26068_26072;
var G__26078 = count__26069_26073;
var G__26079 = (i__26070_26074 + (1));
seq__26067_26071 = G__26076;
chunk__26068_26072 = G__26077;
count__26069_26073 = G__26078;
i__26070_26074 = G__26079;
continue;
} else {
var temp__4657__auto___26080 = cljs.core.seq.call(null,seq__26067_26071);
if(temp__4657__auto___26080){
var seq__26067_26081__$1 = temp__4657__auto___26080;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__26067_26081__$1)){
var c__20970__auto___26082 = cljs.core.chunk_first.call(null,seq__26067_26081__$1);
var G__26083 = cljs.core.chunk_rest.call(null,seq__26067_26081__$1);
var G__26084 = c__20970__auto___26082;
var G__26085 = cljs.core.count.call(null,c__20970__auto___26082);
var G__26086 = (0);
seq__26067_26071 = G__26083;
chunk__26068_26072 = G__26084;
count__26069_26073 = G__26085;
i__26070_26074 = G__26086;
continue;
} else {
var ns_26087 = cljs.core.first.call(null,seq__26067_26081__$1);
figwheel.client.file_reloading.unprovide_BANG_.call(null,ns_26087);

var G__26088 = cljs.core.next.call(null,seq__26067_26081__$1);
var G__26089 = null;
var G__26090 = (0);
var G__26091 = (0);
seq__26067_26071 = G__26088;
chunk__26068_26072 = G__26089;
count__26069_26073 = G__26090;
i__26070_26074 = G__26091;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(reload)){
figwheel.client.file_reloading.unprovide_BANG_.call(null,src);
} else {
}

return goog.require_figwheel_backup_(src);
});
/**
 * Reusable browser REPL bootstrapping. Patches the essential functions
 *   in goog.base to support re-loading of namespaces after page load.
 */
figwheel.client.file_reloading.bootstrap_goog_base = (function figwheel$client$file_reloading$bootstrap_goog_base(){
if(cljs.core.truth_(COMPILED)){
return null;
} else {
goog.require_figwheel_backup_ = (function (){var or__20159__auto__ = goog.require__;
if(cljs.core.truth_(or__20159__auto__)){
return or__20159__auto__;
} else {
return goog.require;
}
})();

goog.isProvided_ = (function (name){
return false;
});

figwheel.client.file_reloading.setup_path__GT_name_BANG_.call(null);

figwheel.client.file_reloading.setup_ns__GT_dependents_BANG_.call(null);

goog.addDependency_figwheel_backup_ = goog.addDependency;

goog.addDependency = (function() { 
var G__26092__delegate = function (args){
cljs.core.apply.call(null,figwheel.client.file_reloading.addDependency,args);

return cljs.core.apply.call(null,goog.addDependency_figwheel_backup_,args);
};
var G__26092 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__26093__i = 0, G__26093__a = new Array(arguments.length -  0);
while (G__26093__i < G__26093__a.length) {G__26093__a[G__26093__i] = arguments[G__26093__i + 0]; ++G__26093__i;}
  args = new cljs.core.IndexedSeq(G__26093__a,0);
} 
return G__26092__delegate.call(this,args);};
G__26092.cljs$lang$maxFixedArity = 0;
G__26092.cljs$lang$applyTo = (function (arglist__26094){
var args = cljs.core.seq(arglist__26094);
return G__26092__delegate(args);
});
G__26092.cljs$core$IFn$_invoke$arity$variadic = G__26092__delegate;
return G__26092;
})()
;

goog.constructNamespace_("cljs.user");

goog.global.CLOSURE_IMPORT_SCRIPT = figwheel.client.file_reloading.queued_file_reload;

return goog.require = figwheel.client.file_reloading.figwheel_require;
}
});
figwheel.client.file_reloading.patch_goog_base = (function figwheel$client$file_reloading$patch_goog_base(){
if(typeof figwheel.client.file_reloading.bootstrapped_cljs !== 'undefined'){
return null;
} else {
figwheel.client.file_reloading.bootstrapped_cljs = (function (){
figwheel.client.file_reloading.bootstrap_goog_base.call(null);

return true;
})()
;
}
});
figwheel.client.file_reloading.reload_file_STAR_ = (function (){var pred__26096 = cljs.core._EQ_;
var expr__26097 = figwheel.client.utils.host_env_QMARK_.call(null);
if(cljs.core.truth_(pred__26096.call(null,new cljs.core.Keyword(null,"node","node",581201198),expr__26097))){
var path_parts = ((function (pred__26096,expr__26097){
return (function (p1__26095_SHARP_){
return clojure.string.split.call(null,p1__26095_SHARP_,/[\/\\]/);
});})(pred__26096,expr__26097))
;
var sep = (cljs.core.truth_(cljs.core.re_matches.call(null,/win.*/,process.platform))?"\\":"/");
var root = clojure.string.join.call(null,sep,cljs.core.pop.call(null,cljs.core.pop.call(null,path_parts.call(null,__dirname))));
return ((function (path_parts,sep,root,pred__26096,expr__26097){
return (function (request_url,callback){

var cache_path = clojure.string.join.call(null,sep,cljs.core.cons.call(null,root,path_parts.call(null,figwheel.client.file_reloading.fix_node_request_url.call(null,request_url))));
(require.cache[cache_path] = null);

return callback.call(null,(function (){try{return require(cache_path);
}catch (e26099){if((e26099 instanceof Error)){
var e = e26099;
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str("Figwheel: Error loading file "),cljs.core.str(cache_path)].join(''));

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),e.stack);

return false;
} else {
throw e26099;

}
}})());
});
;})(path_parts,sep,root,pred__26096,expr__26097))
} else {
if(cljs.core.truth_(pred__26096.call(null,new cljs.core.Keyword(null,"html","html",-998796897),expr__26097))){
return ((function (pred__26096,expr__26097){
return (function (request_url,callback){

var deferred = goog.net.jsloader.load(figwheel.client.file_reloading.add_cache_buster.call(null,request_url),({"cleanupWhenDone": true}));
deferred.addCallback(((function (deferred,pred__26096,expr__26097){
return (function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [true], null));
});})(deferred,pred__26096,expr__26097))
);

return deferred.addErrback(((function (deferred,pred__26096,expr__26097){
return (function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [false], null));
});})(deferred,pred__26096,expr__26097))
);
});
;})(pred__26096,expr__26097))
} else {
return ((function (pred__26096,expr__26097){
return (function (a,b){
throw "Reload not defined for this platform";
});
;})(pred__26096,expr__26097))
}
}
})();
figwheel.client.file_reloading.reload_file = (function figwheel$client$file_reloading$reload_file(p__26100,callback){
var map__26103 = p__26100;
var map__26103__$1 = ((((!((map__26103 == null)))?((((map__26103.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26103.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26103):map__26103);
var file_msg = map__26103__$1;
var request_url = cljs.core.get.call(null,map__26103__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));

figwheel.client.utils.debug_prn.call(null,[cljs.core.str("FigWheel: Attempting to load "),cljs.core.str(request_url)].join(''));

return figwheel.client.file_reloading.reload_file_STAR_.call(null,request_url,((function (map__26103,map__26103__$1,file_msg,request_url){
return (function (success_QMARK_){
if(cljs.core.truth_(success_QMARK_)){
figwheel.client.utils.debug_prn.call(null,[cljs.core.str("FigWheel: Successfully loaded "),cljs.core.str(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.call(null,file_msg,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),true)], null));
} else {
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str("Figwheel: Error loading file "),cljs.core.str(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file_msg], null));
}
});})(map__26103,map__26103__$1,file_msg,request_url))
);
});
if(typeof figwheel.client.file_reloading.reload_chan !== 'undefined'){
} else {
figwheel.client.file_reloading.reload_chan = cljs.core.async.chan.call(null);
}
if(typeof figwheel.client.file_reloading.on_load_callbacks !== 'undefined'){
} else {
figwheel.client.file_reloading.on_load_callbacks = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
if(typeof figwheel.client.file_reloading.dependencies_loaded !== 'undefined'){
} else {
figwheel.client.file_reloading.dependencies_loaded = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
}
figwheel.client.file_reloading.blocking_load = (function figwheel$client$file_reloading$blocking_load(url){
var out = cljs.core.async.chan.call(null);
figwheel.client.file_reloading.reload_file.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"request-url","request-url",2100346596),url], null),((function (out){
return (function (file_msg){
cljs.core.async.put_BANG_.call(null,out,file_msg);

return cljs.core.async.close_BANG_.call(null,out);
});})(out))
);

return out;
});
if(typeof figwheel.client.file_reloading.reloader_loop !== 'undefined'){
} else {
figwheel.client.file_reloading.reloader_loop = (function (){var c__23027__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23027__auto__){
return (function (){
var f__23028__auto__ = (function (){var switch__22962__auto__ = ((function (c__23027__auto__){
return (function (state_26127){
var state_val_26128 = (state_26127[(1)]);
if((state_val_26128 === (7))){
var inst_26123 = (state_26127[(2)]);
var state_26127__$1 = state_26127;
var statearr_26129_26149 = state_26127__$1;
(statearr_26129_26149[(2)] = inst_26123);

(statearr_26129_26149[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26128 === (1))){
var state_26127__$1 = state_26127;
var statearr_26130_26150 = state_26127__$1;
(statearr_26130_26150[(2)] = null);

(statearr_26130_26150[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26128 === (4))){
var inst_26107 = (state_26127[(7)]);
var inst_26107__$1 = (state_26127[(2)]);
var state_26127__$1 = (function (){var statearr_26131 = state_26127;
(statearr_26131[(7)] = inst_26107__$1);

return statearr_26131;
})();
if(cljs.core.truth_(inst_26107__$1)){
var statearr_26132_26151 = state_26127__$1;
(statearr_26132_26151[(1)] = (5));

} else {
var statearr_26133_26152 = state_26127__$1;
(statearr_26133_26152[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26128 === (6))){
var state_26127__$1 = state_26127;
var statearr_26134_26153 = state_26127__$1;
(statearr_26134_26153[(2)] = null);

(statearr_26134_26153[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26128 === (3))){
var inst_26125 = (state_26127[(2)]);
var state_26127__$1 = state_26127;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26127__$1,inst_26125);
} else {
if((state_val_26128 === (2))){
var state_26127__$1 = state_26127;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26127__$1,(4),figwheel.client.file_reloading.reload_chan);
} else {
if((state_val_26128 === (11))){
var inst_26119 = (state_26127[(2)]);
var state_26127__$1 = (function (){var statearr_26135 = state_26127;
(statearr_26135[(8)] = inst_26119);

return statearr_26135;
})();
var statearr_26136_26154 = state_26127__$1;
(statearr_26136_26154[(2)] = null);

(statearr_26136_26154[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26128 === (9))){
var inst_26111 = (state_26127[(9)]);
var inst_26113 = (state_26127[(10)]);
var inst_26115 = inst_26113.call(null,inst_26111);
var state_26127__$1 = state_26127;
var statearr_26137_26155 = state_26127__$1;
(statearr_26137_26155[(2)] = inst_26115);

(statearr_26137_26155[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26128 === (5))){
var inst_26107 = (state_26127[(7)]);
var inst_26109 = figwheel.client.file_reloading.blocking_load.call(null,inst_26107);
var state_26127__$1 = state_26127;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26127__$1,(8),inst_26109);
} else {
if((state_val_26128 === (10))){
var inst_26111 = (state_26127[(9)]);
var inst_26117 = cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.dependencies_loaded,cljs.core.conj,inst_26111);
var state_26127__$1 = state_26127;
var statearr_26138_26156 = state_26127__$1;
(statearr_26138_26156[(2)] = inst_26117);

(statearr_26138_26156[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26128 === (8))){
var inst_26113 = (state_26127[(10)]);
var inst_26107 = (state_26127[(7)]);
var inst_26111 = (state_26127[(2)]);
var inst_26112 = cljs.core.deref.call(null,figwheel.client.file_reloading.on_load_callbacks);
var inst_26113__$1 = cljs.core.get.call(null,inst_26112,inst_26107);
var state_26127__$1 = (function (){var statearr_26139 = state_26127;
(statearr_26139[(9)] = inst_26111);

(statearr_26139[(10)] = inst_26113__$1);

return statearr_26139;
})();
if(cljs.core.truth_(inst_26113__$1)){
var statearr_26140_26157 = state_26127__$1;
(statearr_26140_26157[(1)] = (9));

} else {
var statearr_26141_26158 = state_26127__$1;
(statearr_26141_26158[(1)] = (10));

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
});})(c__23027__auto__))
;
return ((function (switch__22962__auto__,c__23027__auto__){
return (function() {
var figwheel$client$file_reloading$state_machine__22963__auto__ = null;
var figwheel$client$file_reloading$state_machine__22963__auto____0 = (function (){
var statearr_26145 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_26145[(0)] = figwheel$client$file_reloading$state_machine__22963__auto__);

(statearr_26145[(1)] = (1));

return statearr_26145;
});
var figwheel$client$file_reloading$state_machine__22963__auto____1 = (function (state_26127){
while(true){
var ret_value__22964__auto__ = (function (){try{while(true){
var result__22965__auto__ = switch__22962__auto__.call(null,state_26127);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22965__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22965__auto__;
}
break;
}
}catch (e26146){if((e26146 instanceof Object)){
var ex__22966__auto__ = e26146;
var statearr_26147_26159 = state_26127;
(statearr_26147_26159[(5)] = ex__22966__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26127);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26146;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22964__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26160 = state_26127;
state_26127 = G__26160;
continue;
} else {
return ret_value__22964__auto__;
}
break;
}
});
figwheel$client$file_reloading$state_machine__22963__auto__ = function(state_26127){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$state_machine__22963__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$state_machine__22963__auto____1.call(this,state_26127);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$state_machine__22963__auto____0;
figwheel$client$file_reloading$state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$state_machine__22963__auto____1;
return figwheel$client$file_reloading$state_machine__22963__auto__;
})()
;})(switch__22962__auto__,c__23027__auto__))
})();
var state__23029__auto__ = (function (){var statearr_26148 = f__23028__auto__.call(null);
(statearr_26148[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__23027__auto__);

return statearr_26148;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23029__auto__);
});})(c__23027__auto__))
);

return c__23027__auto__;
})();
}
figwheel.client.file_reloading.queued_file_reload = (function figwheel$client$file_reloading$queued_file_reload(url){
return cljs.core.async.put_BANG_.call(null,figwheel.client.file_reloading.reload_chan,url);
});
figwheel.client.file_reloading.require_with_callback = (function figwheel$client$file_reloading$require_with_callback(p__26161,callback){
var map__26164 = p__26161;
var map__26164__$1 = ((((!((map__26164 == null)))?((((map__26164.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26164.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26164):map__26164);
var file_msg = map__26164__$1;
var namespace = cljs.core.get.call(null,map__26164__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var request_url = figwheel.client.file_reloading.resolve_ns.call(null,namespace);
cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.on_load_callbacks,cljs.core.assoc,request_url,((function (request_url,map__26164,map__26164__$1,file_msg,namespace){
return (function (file_msg_SINGLEQUOTE_){
cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.on_load_callbacks,cljs.core.dissoc,request_url);

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.call(null,file_msg,cljs.core.select_keys.call(null,file_msg_SINGLEQUOTE_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375)], null)))], null));
});})(request_url,map__26164,map__26164__$1,file_msg,namespace))
);

return figwheel.client.file_reloading.figwheel_require.call(null,cljs.core.name.call(null,namespace),true);
});
figwheel.client.file_reloading.reload_file_QMARK_ = (function figwheel$client$file_reloading$reload_file_QMARK_(p__26166){
var map__26169 = p__26166;
var map__26169__$1 = ((((!((map__26169 == null)))?((((map__26169.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26169.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26169):map__26169);
var file_msg = map__26169__$1;
var namespace = cljs.core.get.call(null,map__26169__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

var meta_pragmas = cljs.core.get.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas),cljs.core.name.call(null,namespace));
var and__20147__auto__ = cljs.core.not.call(null,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179).cljs$core$IFn$_invoke$arity$1(meta_pragmas));
if(and__20147__auto__){
var or__20159__auto__ = new cljs.core.Keyword(null,"figwheel-always","figwheel-always",799819691).cljs$core$IFn$_invoke$arity$1(meta_pragmas);
if(cljs.core.truth_(or__20159__auto__)){
return or__20159__auto__;
} else {
var or__20159__auto____$1 = new cljs.core.Keyword(null,"figwheel-load","figwheel-load",1316089175).cljs$core$IFn$_invoke$arity$1(meta_pragmas);
if(cljs.core.truth_(or__20159__auto____$1)){
return or__20159__auto____$1;
} else {
return figwheel.client.file_reloading.provided_QMARK_.call(null,cljs.core.name.call(null,namespace));
}
}
} else {
return and__20147__auto__;
}
});
figwheel.client.file_reloading.js_reload = (function figwheel$client$file_reloading$js_reload(p__26171,callback){
var map__26174 = p__26171;
var map__26174__$1 = ((((!((map__26174 == null)))?((((map__26174.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26174.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26174):map__26174);
var file_msg = map__26174__$1;
var request_url = cljs.core.get.call(null,map__26174__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
var namespace = cljs.core.get.call(null,map__26174__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

if(cljs.core.truth_(figwheel.client.file_reloading.reload_file_QMARK_.call(null,file_msg))){
return figwheel.client.file_reloading.require_with_callback.call(null,file_msg,callback);
} else {
figwheel.client.utils.debug_prn.call(null,[cljs.core.str("Figwheel: Not trying to load file "),cljs.core.str(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file_msg], null));
}
});
figwheel.client.file_reloading.reload_js_file = (function figwheel$client$file_reloading$reload_js_file(file_msg){
var out = cljs.core.async.chan.call(null);
figwheel.client.file_reloading.js_reload.call(null,file_msg,((function (out){
return (function (url){
cljs.core.async.put_BANG_.call(null,out,url);

return cljs.core.async.close_BANG_.call(null,out);
});})(out))
);

return out;
});
/**
 * Returns a chanel with one collection of loaded filenames on it.
 */
figwheel.client.file_reloading.load_all_js_files = (function figwheel$client$file_reloading$load_all_js_files(files){
var out = cljs.core.async.chan.call(null);
var c__23027__auto___26278 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23027__auto___26278,out){
return (function (){
var f__23028__auto__ = (function (){var switch__22962__auto__ = ((function (c__23027__auto___26278,out){
return (function (state_26260){
var state_val_26261 = (state_26260[(1)]);
if((state_val_26261 === (1))){
var inst_26234 = cljs.core.seq.call(null,files);
var inst_26235 = cljs.core.first.call(null,inst_26234);
var inst_26236 = cljs.core.next.call(null,inst_26234);
var inst_26237 = files;
var state_26260__$1 = (function (){var statearr_26262 = state_26260;
(statearr_26262[(7)] = inst_26236);

(statearr_26262[(8)] = inst_26237);

(statearr_26262[(9)] = inst_26235);

return statearr_26262;
})();
var statearr_26263_26279 = state_26260__$1;
(statearr_26263_26279[(2)] = null);

(statearr_26263_26279[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26261 === (2))){
var inst_26243 = (state_26260[(10)]);
var inst_26237 = (state_26260[(8)]);
var inst_26242 = cljs.core.seq.call(null,inst_26237);
var inst_26243__$1 = cljs.core.first.call(null,inst_26242);
var inst_26244 = cljs.core.next.call(null,inst_26242);
var inst_26245 = (inst_26243__$1 == null);
var inst_26246 = cljs.core.not.call(null,inst_26245);
var state_26260__$1 = (function (){var statearr_26264 = state_26260;
(statearr_26264[(11)] = inst_26244);

(statearr_26264[(10)] = inst_26243__$1);

return statearr_26264;
})();
if(inst_26246){
var statearr_26265_26280 = state_26260__$1;
(statearr_26265_26280[(1)] = (4));

} else {
var statearr_26266_26281 = state_26260__$1;
(statearr_26266_26281[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26261 === (3))){
var inst_26258 = (state_26260[(2)]);
var state_26260__$1 = state_26260;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26260__$1,inst_26258);
} else {
if((state_val_26261 === (4))){
var inst_26243 = (state_26260[(10)]);
var inst_26248 = figwheel.client.file_reloading.reload_js_file.call(null,inst_26243);
var state_26260__$1 = state_26260;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26260__$1,(7),inst_26248);
} else {
if((state_val_26261 === (5))){
var inst_26254 = cljs.core.async.close_BANG_.call(null,out);
var state_26260__$1 = state_26260;
var statearr_26267_26282 = state_26260__$1;
(statearr_26267_26282[(2)] = inst_26254);

(statearr_26267_26282[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26261 === (6))){
var inst_26256 = (state_26260[(2)]);
var state_26260__$1 = state_26260;
var statearr_26268_26283 = state_26260__$1;
(statearr_26268_26283[(2)] = inst_26256);

(statearr_26268_26283[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26261 === (7))){
var inst_26244 = (state_26260[(11)]);
var inst_26250 = (state_26260[(2)]);
var inst_26251 = cljs.core.async.put_BANG_.call(null,out,inst_26250);
var inst_26237 = inst_26244;
var state_26260__$1 = (function (){var statearr_26269 = state_26260;
(statearr_26269[(12)] = inst_26251);

(statearr_26269[(8)] = inst_26237);

return statearr_26269;
})();
var statearr_26270_26284 = state_26260__$1;
(statearr_26270_26284[(2)] = null);

(statearr_26270_26284[(1)] = (2));


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
});})(c__23027__auto___26278,out))
;
return ((function (switch__22962__auto__,c__23027__auto___26278,out){
return (function() {
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__22963__auto__ = null;
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__22963__auto____0 = (function (){
var statearr_26274 = [null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_26274[(0)] = figwheel$client$file_reloading$load_all_js_files_$_state_machine__22963__auto__);

(statearr_26274[(1)] = (1));

return statearr_26274;
});
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__22963__auto____1 = (function (state_26260){
while(true){
var ret_value__22964__auto__ = (function (){try{while(true){
var result__22965__auto__ = switch__22962__auto__.call(null,state_26260);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22965__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22965__auto__;
}
break;
}
}catch (e26275){if((e26275 instanceof Object)){
var ex__22966__auto__ = e26275;
var statearr_26276_26285 = state_26260;
(statearr_26276_26285[(5)] = ex__22966__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26260);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26275;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22964__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26286 = state_26260;
state_26260 = G__26286;
continue;
} else {
return ret_value__22964__auto__;
}
break;
}
});
figwheel$client$file_reloading$load_all_js_files_$_state_machine__22963__auto__ = function(state_26260){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__22963__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__22963__auto____1.call(this,state_26260);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$load_all_js_files_$_state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__22963__auto____0;
figwheel$client$file_reloading$load_all_js_files_$_state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__22963__auto____1;
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__22963__auto__;
})()
;})(switch__22962__auto__,c__23027__auto___26278,out))
})();
var state__23029__auto__ = (function (){var statearr_26277 = f__23028__auto__.call(null);
(statearr_26277[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__23027__auto___26278);

return statearr_26277;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23029__auto__);
});})(c__23027__auto___26278,out))
);


return cljs.core.async.into.call(null,cljs.core.PersistentVector.EMPTY,out);
});
figwheel.client.file_reloading.eval_body = (function figwheel$client$file_reloading$eval_body(p__26287,opts){
var map__26291 = p__26287;
var map__26291__$1 = ((((!((map__26291 == null)))?((((map__26291.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26291.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26291):map__26291);
var eval_body__$1 = cljs.core.get.call(null,map__26291__$1,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883));
var file = cljs.core.get.call(null,map__26291__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
if(cljs.core.truth_((function (){var and__20147__auto__ = eval_body__$1;
if(cljs.core.truth_(and__20147__auto__)){
return typeof eval_body__$1 === 'string';
} else {
return and__20147__auto__;
}
})())){
var code = eval_body__$1;
try{figwheel.client.utils.debug_prn.call(null,[cljs.core.str("Evaling file "),cljs.core.str(file)].join(''));

return figwheel.client.utils.eval_helper.call(null,code,opts);
}catch (e26293){var e = e26293;
return figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str("Unable to evaluate "),cljs.core.str(file)].join(''));
}} else {
return null;
}
});
figwheel.client.file_reloading.expand_files = (function figwheel$client$file_reloading$expand_files(files){
var deps = figwheel.client.file_reloading.get_all_dependents.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372),files));
return cljs.core.filter.call(null,cljs.core.comp.call(null,cljs.core.not,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, ["figwheel.connect",null], null), null),new cljs.core.Keyword(null,"namespace","namespace",-377510372)),cljs.core.map.call(null,((function (deps){
return (function (n){
var temp__4655__auto__ = cljs.core.first.call(null,cljs.core.filter.call(null,((function (deps){
return (function (p1__26294_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(p1__26294_SHARP_),n);
});})(deps))
,files));
if(cljs.core.truth_(temp__4655__auto__)){
var file_msg = temp__4655__auto__;
return file_msg;
} else {
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"namespace","namespace",-377510372),new cljs.core.Keyword(null,"namespace","namespace",-377510372),n], null);
}
});})(deps))
,deps));
});
figwheel.client.file_reloading.sort_files = (function figwheel$client$file_reloading$sort_files(files){
if((cljs.core.count.call(null,files) <= (1))){
return files;
} else {
var keep_files = cljs.core.set.call(null,cljs.core.keep.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372),files));
return cljs.core.filter.call(null,cljs.core.comp.call(null,keep_files,new cljs.core.Keyword(null,"namespace","namespace",-377510372)),figwheel.client.file_reloading.expand_files.call(null,files));
}
});
figwheel.client.file_reloading.get_figwheel_always = (function figwheel$client$file_reloading$get_figwheel_always(){
return cljs.core.map.call(null,(function (p__26303){
var vec__26304 = p__26303;
var k = cljs.core.nth.call(null,vec__26304,(0),null);
var v = cljs.core.nth.call(null,vec__26304,(1),null);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"namespace","namespace",-377510372),k,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"namespace","namespace",-377510372)], null);
}),cljs.core.filter.call(null,(function (p__26307){
var vec__26308 = p__26307;
var k = cljs.core.nth.call(null,vec__26308,(0),null);
var v = cljs.core.nth.call(null,vec__26308,(1),null);
return new cljs.core.Keyword(null,"figwheel-always","figwheel-always",799819691).cljs$core$IFn$_invoke$arity$1(v);
}),cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas)));
});
figwheel.client.file_reloading.reload_js_files = (function figwheel$client$file_reloading$reload_js_files(p__26314,p__26315){
var map__26562 = p__26314;
var map__26562__$1 = ((((!((map__26562 == null)))?((((map__26562.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26562.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26562):map__26562);
var opts = map__26562__$1;
var before_jsload = cljs.core.get.call(null,map__26562__$1,new cljs.core.Keyword(null,"before-jsload","before-jsload",-847513128));
var on_jsload = cljs.core.get.call(null,map__26562__$1,new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602));
var reload_dependents = cljs.core.get.call(null,map__26562__$1,new cljs.core.Keyword(null,"reload-dependents","reload-dependents",-956865430));
var map__26563 = p__26315;
var map__26563__$1 = ((((!((map__26563 == null)))?((((map__26563.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26563.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26563):map__26563);
var msg = map__26563__$1;
var files = cljs.core.get.call(null,map__26563__$1,new cljs.core.Keyword(null,"files","files",-472457450));
var figwheel_meta = cljs.core.get.call(null,map__26563__$1,new cljs.core.Keyword(null,"figwheel-meta","figwheel-meta",-225970237));
var recompile_dependents = cljs.core.get.call(null,map__26563__$1,new cljs.core.Keyword(null,"recompile-dependents","recompile-dependents",523804171));
if(cljs.core.empty_QMARK_.call(null,figwheel_meta)){
} else {
cljs.core.reset_BANG_.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas,figwheel_meta);
}

var c__23027__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23027__auto__,map__26562,map__26562__$1,opts,before_jsload,on_jsload,reload_dependents,map__26563,map__26563__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (){
var f__23028__auto__ = (function (){var switch__22962__auto__ = ((function (c__23027__auto__,map__26562,map__26562__$1,opts,before_jsload,on_jsload,reload_dependents,map__26563,map__26563__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (state_26716){
var state_val_26717 = (state_26716[(1)]);
if((state_val_26717 === (7))){
var inst_26580 = (state_26716[(7)]);
var inst_26577 = (state_26716[(8)]);
var inst_26579 = (state_26716[(9)]);
var inst_26578 = (state_26716[(10)]);
var inst_26585 = cljs.core._nth.call(null,inst_26578,inst_26580);
var inst_26586 = figwheel.client.file_reloading.eval_body.call(null,inst_26585,opts);
var inst_26587 = (inst_26580 + (1));
var tmp26718 = inst_26577;
var tmp26719 = inst_26579;
var tmp26720 = inst_26578;
var inst_26577__$1 = tmp26718;
var inst_26578__$1 = tmp26720;
var inst_26579__$1 = tmp26719;
var inst_26580__$1 = inst_26587;
var state_26716__$1 = (function (){var statearr_26721 = state_26716;
(statearr_26721[(7)] = inst_26580__$1);

(statearr_26721[(11)] = inst_26586);

(statearr_26721[(8)] = inst_26577__$1);

(statearr_26721[(9)] = inst_26579__$1);

(statearr_26721[(10)] = inst_26578__$1);

return statearr_26721;
})();
var statearr_26722_26808 = state_26716__$1;
(statearr_26722_26808[(2)] = null);

(statearr_26722_26808[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (20))){
var inst_26620 = (state_26716[(12)]);
var inst_26628 = figwheel.client.file_reloading.sort_files.call(null,inst_26620);
var state_26716__$1 = state_26716;
var statearr_26723_26809 = state_26716__$1;
(statearr_26723_26809[(2)] = inst_26628);

(statearr_26723_26809[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (27))){
var state_26716__$1 = state_26716;
var statearr_26724_26810 = state_26716__$1;
(statearr_26724_26810[(2)] = null);

(statearr_26724_26810[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (1))){
var inst_26569 = (state_26716[(13)]);
var inst_26566 = before_jsload.call(null,files);
var inst_26567 = figwheel.client.file_reloading.before_jsload_custom_event.call(null,files);
var inst_26568 = (function (){return ((function (inst_26569,inst_26566,inst_26567,state_val_26717,c__23027__auto__,map__26562,map__26562__$1,opts,before_jsload,on_jsload,reload_dependents,map__26563,map__26563__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__26311_SHARP_){
return new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__26311_SHARP_);
});
;})(inst_26569,inst_26566,inst_26567,state_val_26717,c__23027__auto__,map__26562,map__26562__$1,opts,before_jsload,on_jsload,reload_dependents,map__26563,map__26563__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_26569__$1 = cljs.core.filter.call(null,inst_26568,files);
var inst_26570 = cljs.core.not_empty.call(null,inst_26569__$1);
var state_26716__$1 = (function (){var statearr_26725 = state_26716;
(statearr_26725[(13)] = inst_26569__$1);

(statearr_26725[(14)] = inst_26567);

(statearr_26725[(15)] = inst_26566);

return statearr_26725;
})();
if(cljs.core.truth_(inst_26570)){
var statearr_26726_26811 = state_26716__$1;
(statearr_26726_26811[(1)] = (2));

} else {
var statearr_26727_26812 = state_26716__$1;
(statearr_26727_26812[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (24))){
var state_26716__$1 = state_26716;
var statearr_26728_26813 = state_26716__$1;
(statearr_26728_26813[(2)] = null);

(statearr_26728_26813[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (39))){
var inst_26670 = (state_26716[(16)]);
var state_26716__$1 = state_26716;
var statearr_26729_26814 = state_26716__$1;
(statearr_26729_26814[(2)] = inst_26670);

(statearr_26729_26814[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (46))){
var inst_26711 = (state_26716[(2)]);
var state_26716__$1 = state_26716;
var statearr_26730_26815 = state_26716__$1;
(statearr_26730_26815[(2)] = inst_26711);

(statearr_26730_26815[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (4))){
var inst_26614 = (state_26716[(2)]);
var inst_26615 = cljs.core.List.EMPTY;
var inst_26616 = cljs.core.reset_BANG_.call(null,figwheel.client.file_reloading.dependencies_loaded,inst_26615);
var inst_26617 = (function (){return ((function (inst_26614,inst_26615,inst_26616,state_val_26717,c__23027__auto__,map__26562,map__26562__$1,opts,before_jsload,on_jsload,reload_dependents,map__26563,map__26563__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__26312_SHARP_){
var and__20147__auto__ = new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(p1__26312_SHARP_);
if(cljs.core.truth_(and__20147__auto__)){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__26312_SHARP_));
} else {
return and__20147__auto__;
}
});
;})(inst_26614,inst_26615,inst_26616,state_val_26717,c__23027__auto__,map__26562,map__26562__$1,opts,before_jsload,on_jsload,reload_dependents,map__26563,map__26563__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_26618 = cljs.core.filter.call(null,inst_26617,files);
var inst_26619 = figwheel.client.file_reloading.get_figwheel_always.call(null);
var inst_26620 = cljs.core.concat.call(null,inst_26618,inst_26619);
var state_26716__$1 = (function (){var statearr_26731 = state_26716;
(statearr_26731[(17)] = inst_26614);

(statearr_26731[(12)] = inst_26620);

(statearr_26731[(18)] = inst_26616);

return statearr_26731;
})();
if(cljs.core.truth_(reload_dependents)){
var statearr_26732_26816 = state_26716__$1;
(statearr_26732_26816[(1)] = (16));

} else {
var statearr_26733_26817 = state_26716__$1;
(statearr_26733_26817[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (15))){
var inst_26604 = (state_26716[(2)]);
var state_26716__$1 = state_26716;
var statearr_26734_26818 = state_26716__$1;
(statearr_26734_26818[(2)] = inst_26604);

(statearr_26734_26818[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (21))){
var inst_26630 = (state_26716[(19)]);
var inst_26630__$1 = (state_26716[(2)]);
var inst_26631 = figwheel.client.file_reloading.load_all_js_files.call(null,inst_26630__$1);
var state_26716__$1 = (function (){var statearr_26735 = state_26716;
(statearr_26735[(19)] = inst_26630__$1);

return statearr_26735;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26716__$1,(22),inst_26631);
} else {
if((state_val_26717 === (31))){
var inst_26714 = (state_26716[(2)]);
var state_26716__$1 = state_26716;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26716__$1,inst_26714);
} else {
if((state_val_26717 === (32))){
var inst_26670 = (state_26716[(16)]);
var inst_26675 = inst_26670.cljs$lang$protocol_mask$partition0$;
var inst_26676 = (inst_26675 & (64));
var inst_26677 = inst_26670.cljs$core$ISeq$;
var inst_26678 = (inst_26676) || (inst_26677);
var state_26716__$1 = state_26716;
if(cljs.core.truth_(inst_26678)){
var statearr_26736_26819 = state_26716__$1;
(statearr_26736_26819[(1)] = (35));

} else {
var statearr_26737_26820 = state_26716__$1;
(statearr_26737_26820[(1)] = (36));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (40))){
var inst_26691 = (state_26716[(20)]);
var inst_26690 = (state_26716[(2)]);
var inst_26691__$1 = cljs.core.get.call(null,inst_26690,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179));
var inst_26692 = cljs.core.get.call(null,inst_26690,new cljs.core.Keyword(null,"not-required","not-required",-950359114));
var inst_26693 = cljs.core.not_empty.call(null,inst_26691__$1);
var state_26716__$1 = (function (){var statearr_26738 = state_26716;
(statearr_26738[(21)] = inst_26692);

(statearr_26738[(20)] = inst_26691__$1);

return statearr_26738;
})();
if(cljs.core.truth_(inst_26693)){
var statearr_26739_26821 = state_26716__$1;
(statearr_26739_26821[(1)] = (41));

} else {
var statearr_26740_26822 = state_26716__$1;
(statearr_26740_26822[(1)] = (42));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (33))){
var state_26716__$1 = state_26716;
var statearr_26741_26823 = state_26716__$1;
(statearr_26741_26823[(2)] = false);

(statearr_26741_26823[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (13))){
var inst_26590 = (state_26716[(22)]);
var inst_26594 = cljs.core.chunk_first.call(null,inst_26590);
var inst_26595 = cljs.core.chunk_rest.call(null,inst_26590);
var inst_26596 = cljs.core.count.call(null,inst_26594);
var inst_26577 = inst_26595;
var inst_26578 = inst_26594;
var inst_26579 = inst_26596;
var inst_26580 = (0);
var state_26716__$1 = (function (){var statearr_26742 = state_26716;
(statearr_26742[(7)] = inst_26580);

(statearr_26742[(8)] = inst_26577);

(statearr_26742[(9)] = inst_26579);

(statearr_26742[(10)] = inst_26578);

return statearr_26742;
})();
var statearr_26743_26824 = state_26716__$1;
(statearr_26743_26824[(2)] = null);

(statearr_26743_26824[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (22))){
var inst_26633 = (state_26716[(23)]);
var inst_26630 = (state_26716[(19)]);
var inst_26638 = (state_26716[(24)]);
var inst_26634 = (state_26716[(25)]);
var inst_26633__$1 = (state_26716[(2)]);
var inst_26634__$1 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),inst_26633__$1);
var inst_26635 = (function (){var all_files = inst_26630;
var res_SINGLEQUOTE_ = inst_26633__$1;
var res = inst_26634__$1;
return ((function (all_files,res_SINGLEQUOTE_,res,inst_26633,inst_26630,inst_26638,inst_26634,inst_26633__$1,inst_26634__$1,state_val_26717,c__23027__auto__,map__26562,map__26562__$1,opts,before_jsload,on_jsload,reload_dependents,map__26563,map__26563__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__26313_SHARP_){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375).cljs$core$IFn$_invoke$arity$1(p1__26313_SHARP_));
});
;})(all_files,res_SINGLEQUOTE_,res,inst_26633,inst_26630,inst_26638,inst_26634,inst_26633__$1,inst_26634__$1,state_val_26717,c__23027__auto__,map__26562,map__26562__$1,opts,before_jsload,on_jsload,reload_dependents,map__26563,map__26563__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_26636 = cljs.core.filter.call(null,inst_26635,inst_26633__$1);
var inst_26637 = cljs.core.deref.call(null,figwheel.client.file_reloading.dependencies_loaded);
var inst_26638__$1 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),inst_26637);
var inst_26639 = cljs.core.not_empty.call(null,inst_26638__$1);
var state_26716__$1 = (function (){var statearr_26744 = state_26716;
(statearr_26744[(23)] = inst_26633__$1);

(statearr_26744[(24)] = inst_26638__$1);

(statearr_26744[(26)] = inst_26636);

(statearr_26744[(25)] = inst_26634__$1);

return statearr_26744;
})();
if(cljs.core.truth_(inst_26639)){
var statearr_26745_26825 = state_26716__$1;
(statearr_26745_26825[(1)] = (23));

} else {
var statearr_26746_26826 = state_26716__$1;
(statearr_26746_26826[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (36))){
var state_26716__$1 = state_26716;
var statearr_26747_26827 = state_26716__$1;
(statearr_26747_26827[(2)] = false);

(statearr_26747_26827[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (41))){
var inst_26691 = (state_26716[(20)]);
var inst_26695 = cljs.core.comp.call(null,figwheel.client.file_reloading.name__GT_path,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var inst_26696 = cljs.core.map.call(null,inst_26695,inst_26691);
var inst_26697 = cljs.core.pr_str.call(null,inst_26696);
var inst_26698 = [cljs.core.str("figwheel-no-load meta-data: "),cljs.core.str(inst_26697)].join('');
var inst_26699 = figwheel.client.utils.log.call(null,inst_26698);
var state_26716__$1 = state_26716;
var statearr_26748_26828 = state_26716__$1;
(statearr_26748_26828[(2)] = inst_26699);

(statearr_26748_26828[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (43))){
var inst_26692 = (state_26716[(21)]);
var inst_26702 = (state_26716[(2)]);
var inst_26703 = cljs.core.not_empty.call(null,inst_26692);
var state_26716__$1 = (function (){var statearr_26749 = state_26716;
(statearr_26749[(27)] = inst_26702);

return statearr_26749;
})();
if(cljs.core.truth_(inst_26703)){
var statearr_26750_26829 = state_26716__$1;
(statearr_26750_26829[(1)] = (44));

} else {
var statearr_26751_26830 = state_26716__$1;
(statearr_26751_26830[(1)] = (45));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (29))){
var inst_26633 = (state_26716[(23)]);
var inst_26630 = (state_26716[(19)]);
var inst_26670 = (state_26716[(16)]);
var inst_26638 = (state_26716[(24)]);
var inst_26636 = (state_26716[(26)]);
var inst_26634 = (state_26716[(25)]);
var inst_26666 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: NOT loading these files ");
var inst_26669 = (function (){var all_files = inst_26630;
var res_SINGLEQUOTE_ = inst_26633;
var res = inst_26634;
var files_not_loaded = inst_26636;
var dependencies_that_loaded = inst_26638;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_26633,inst_26630,inst_26670,inst_26638,inst_26636,inst_26634,inst_26666,state_val_26717,c__23027__auto__,map__26562,map__26562__$1,opts,before_jsload,on_jsload,reload_dependents,map__26563,map__26563__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__26668){
var map__26752 = p__26668;
var map__26752__$1 = ((((!((map__26752 == null)))?((((map__26752.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26752.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26752):map__26752);
var namespace = cljs.core.get.call(null,map__26752__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var meta_data = cljs.core.get.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas),cljs.core.name.call(null,namespace));
if((meta_data == null)){
return new cljs.core.Keyword(null,"not-required","not-required",-950359114);
} else {
if(cljs.core.truth_(meta_data.call(null,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179)))){
return new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179);
} else {
return new cljs.core.Keyword(null,"not-required","not-required",-950359114);

}
}
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_26633,inst_26630,inst_26670,inst_26638,inst_26636,inst_26634,inst_26666,state_val_26717,c__23027__auto__,map__26562,map__26562__$1,opts,before_jsload,on_jsload,reload_dependents,map__26563,map__26563__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_26670__$1 = cljs.core.group_by.call(null,inst_26669,inst_26636);
var inst_26672 = (inst_26670__$1 == null);
var inst_26673 = cljs.core.not.call(null,inst_26672);
var state_26716__$1 = (function (){var statearr_26754 = state_26716;
(statearr_26754[(16)] = inst_26670__$1);

(statearr_26754[(28)] = inst_26666);

return statearr_26754;
})();
if(inst_26673){
var statearr_26755_26831 = state_26716__$1;
(statearr_26755_26831[(1)] = (32));

} else {
var statearr_26756_26832 = state_26716__$1;
(statearr_26756_26832[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (44))){
var inst_26692 = (state_26716[(21)]);
var inst_26705 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_26692);
var inst_26706 = cljs.core.pr_str.call(null,inst_26705);
var inst_26707 = [cljs.core.str("not required: "),cljs.core.str(inst_26706)].join('');
var inst_26708 = figwheel.client.utils.log.call(null,inst_26707);
var state_26716__$1 = state_26716;
var statearr_26757_26833 = state_26716__$1;
(statearr_26757_26833[(2)] = inst_26708);

(statearr_26757_26833[(1)] = (46));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (6))){
var inst_26611 = (state_26716[(2)]);
var state_26716__$1 = state_26716;
var statearr_26758_26834 = state_26716__$1;
(statearr_26758_26834[(2)] = inst_26611);

(statearr_26758_26834[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (28))){
var inst_26636 = (state_26716[(26)]);
var inst_26663 = (state_26716[(2)]);
var inst_26664 = cljs.core.not_empty.call(null,inst_26636);
var state_26716__$1 = (function (){var statearr_26759 = state_26716;
(statearr_26759[(29)] = inst_26663);

return statearr_26759;
})();
if(cljs.core.truth_(inst_26664)){
var statearr_26760_26835 = state_26716__$1;
(statearr_26760_26835[(1)] = (29));

} else {
var statearr_26761_26836 = state_26716__$1;
(statearr_26761_26836[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (25))){
var inst_26634 = (state_26716[(25)]);
var inst_26650 = (state_26716[(2)]);
var inst_26651 = cljs.core.not_empty.call(null,inst_26634);
var state_26716__$1 = (function (){var statearr_26762 = state_26716;
(statearr_26762[(30)] = inst_26650);

return statearr_26762;
})();
if(cljs.core.truth_(inst_26651)){
var statearr_26763_26837 = state_26716__$1;
(statearr_26763_26837[(1)] = (26));

} else {
var statearr_26764_26838 = state_26716__$1;
(statearr_26764_26838[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (34))){
var inst_26685 = (state_26716[(2)]);
var state_26716__$1 = state_26716;
if(cljs.core.truth_(inst_26685)){
var statearr_26765_26839 = state_26716__$1;
(statearr_26765_26839[(1)] = (38));

} else {
var statearr_26766_26840 = state_26716__$1;
(statearr_26766_26840[(1)] = (39));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (17))){
var state_26716__$1 = state_26716;
var statearr_26767_26841 = state_26716__$1;
(statearr_26767_26841[(2)] = recompile_dependents);

(statearr_26767_26841[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (3))){
var state_26716__$1 = state_26716;
var statearr_26768_26842 = state_26716__$1;
(statearr_26768_26842[(2)] = null);

(statearr_26768_26842[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (12))){
var inst_26607 = (state_26716[(2)]);
var state_26716__$1 = state_26716;
var statearr_26769_26843 = state_26716__$1;
(statearr_26769_26843[(2)] = inst_26607);

(statearr_26769_26843[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (2))){
var inst_26569 = (state_26716[(13)]);
var inst_26576 = cljs.core.seq.call(null,inst_26569);
var inst_26577 = inst_26576;
var inst_26578 = null;
var inst_26579 = (0);
var inst_26580 = (0);
var state_26716__$1 = (function (){var statearr_26770 = state_26716;
(statearr_26770[(7)] = inst_26580);

(statearr_26770[(8)] = inst_26577);

(statearr_26770[(9)] = inst_26579);

(statearr_26770[(10)] = inst_26578);

return statearr_26770;
})();
var statearr_26771_26844 = state_26716__$1;
(statearr_26771_26844[(2)] = null);

(statearr_26771_26844[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (23))){
var inst_26633 = (state_26716[(23)]);
var inst_26630 = (state_26716[(19)]);
var inst_26638 = (state_26716[(24)]);
var inst_26636 = (state_26716[(26)]);
var inst_26634 = (state_26716[(25)]);
var inst_26641 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded these dependencies");
var inst_26643 = (function (){var all_files = inst_26630;
var res_SINGLEQUOTE_ = inst_26633;
var res = inst_26634;
var files_not_loaded = inst_26636;
var dependencies_that_loaded = inst_26638;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_26633,inst_26630,inst_26638,inst_26636,inst_26634,inst_26641,state_val_26717,c__23027__auto__,map__26562,map__26562__$1,opts,before_jsload,on_jsload,reload_dependents,map__26563,map__26563__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__26642){
var map__26772 = p__26642;
var map__26772__$1 = ((((!((map__26772 == null)))?((((map__26772.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26772.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26772):map__26772);
var request_url = cljs.core.get.call(null,map__26772__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
return clojure.string.replace.call(null,request_url,goog.basePath,"");
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_26633,inst_26630,inst_26638,inst_26636,inst_26634,inst_26641,state_val_26717,c__23027__auto__,map__26562,map__26562__$1,opts,before_jsload,on_jsload,reload_dependents,map__26563,map__26563__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_26644 = cljs.core.reverse.call(null,inst_26638);
var inst_26645 = cljs.core.map.call(null,inst_26643,inst_26644);
var inst_26646 = cljs.core.pr_str.call(null,inst_26645);
var inst_26647 = figwheel.client.utils.log.call(null,inst_26646);
var state_26716__$1 = (function (){var statearr_26774 = state_26716;
(statearr_26774[(31)] = inst_26641);

return statearr_26774;
})();
var statearr_26775_26845 = state_26716__$1;
(statearr_26775_26845[(2)] = inst_26647);

(statearr_26775_26845[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (35))){
var state_26716__$1 = state_26716;
var statearr_26776_26846 = state_26716__$1;
(statearr_26776_26846[(2)] = true);

(statearr_26776_26846[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (19))){
var inst_26620 = (state_26716[(12)]);
var inst_26626 = figwheel.client.file_reloading.expand_files.call(null,inst_26620);
var state_26716__$1 = state_26716;
var statearr_26777_26847 = state_26716__$1;
(statearr_26777_26847[(2)] = inst_26626);

(statearr_26777_26847[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (11))){
var state_26716__$1 = state_26716;
var statearr_26778_26848 = state_26716__$1;
(statearr_26778_26848[(2)] = null);

(statearr_26778_26848[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (9))){
var inst_26609 = (state_26716[(2)]);
var state_26716__$1 = state_26716;
var statearr_26779_26849 = state_26716__$1;
(statearr_26779_26849[(2)] = inst_26609);

(statearr_26779_26849[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (5))){
var inst_26580 = (state_26716[(7)]);
var inst_26579 = (state_26716[(9)]);
var inst_26582 = (inst_26580 < inst_26579);
var inst_26583 = inst_26582;
var state_26716__$1 = state_26716;
if(cljs.core.truth_(inst_26583)){
var statearr_26780_26850 = state_26716__$1;
(statearr_26780_26850[(1)] = (7));

} else {
var statearr_26781_26851 = state_26716__$1;
(statearr_26781_26851[(1)] = (8));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (14))){
var inst_26590 = (state_26716[(22)]);
var inst_26599 = cljs.core.first.call(null,inst_26590);
var inst_26600 = figwheel.client.file_reloading.eval_body.call(null,inst_26599,opts);
var inst_26601 = cljs.core.next.call(null,inst_26590);
var inst_26577 = inst_26601;
var inst_26578 = null;
var inst_26579 = (0);
var inst_26580 = (0);
var state_26716__$1 = (function (){var statearr_26782 = state_26716;
(statearr_26782[(7)] = inst_26580);

(statearr_26782[(32)] = inst_26600);

(statearr_26782[(8)] = inst_26577);

(statearr_26782[(9)] = inst_26579);

(statearr_26782[(10)] = inst_26578);

return statearr_26782;
})();
var statearr_26783_26852 = state_26716__$1;
(statearr_26783_26852[(2)] = null);

(statearr_26783_26852[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (45))){
var state_26716__$1 = state_26716;
var statearr_26784_26853 = state_26716__$1;
(statearr_26784_26853[(2)] = null);

(statearr_26784_26853[(1)] = (46));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (26))){
var inst_26633 = (state_26716[(23)]);
var inst_26630 = (state_26716[(19)]);
var inst_26638 = (state_26716[(24)]);
var inst_26636 = (state_26716[(26)]);
var inst_26634 = (state_26716[(25)]);
var inst_26653 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded these files");
var inst_26655 = (function (){var all_files = inst_26630;
var res_SINGLEQUOTE_ = inst_26633;
var res = inst_26634;
var files_not_loaded = inst_26636;
var dependencies_that_loaded = inst_26638;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_26633,inst_26630,inst_26638,inst_26636,inst_26634,inst_26653,state_val_26717,c__23027__auto__,map__26562,map__26562__$1,opts,before_jsload,on_jsload,reload_dependents,map__26563,map__26563__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__26654){
var map__26785 = p__26654;
var map__26785__$1 = ((((!((map__26785 == null)))?((((map__26785.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26785.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26785):map__26785);
var namespace = cljs.core.get.call(null,map__26785__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var file = cljs.core.get.call(null,map__26785__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
if(cljs.core.truth_(namespace)){
return figwheel.client.file_reloading.name__GT_path.call(null,cljs.core.name.call(null,namespace));
} else {
return file;
}
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_26633,inst_26630,inst_26638,inst_26636,inst_26634,inst_26653,state_val_26717,c__23027__auto__,map__26562,map__26562__$1,opts,before_jsload,on_jsload,reload_dependents,map__26563,map__26563__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_26656 = cljs.core.map.call(null,inst_26655,inst_26634);
var inst_26657 = cljs.core.pr_str.call(null,inst_26656);
var inst_26658 = figwheel.client.utils.log.call(null,inst_26657);
var inst_26659 = (function (){var all_files = inst_26630;
var res_SINGLEQUOTE_ = inst_26633;
var res = inst_26634;
var files_not_loaded = inst_26636;
var dependencies_that_loaded = inst_26638;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_26633,inst_26630,inst_26638,inst_26636,inst_26634,inst_26653,inst_26655,inst_26656,inst_26657,inst_26658,state_val_26717,c__23027__auto__,map__26562,map__26562__$1,opts,before_jsload,on_jsload,reload_dependents,map__26563,map__26563__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (){
figwheel.client.file_reloading.on_jsload_custom_event.call(null,res);

return cljs.core.apply.call(null,on_jsload,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [res], null));
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_26633,inst_26630,inst_26638,inst_26636,inst_26634,inst_26653,inst_26655,inst_26656,inst_26657,inst_26658,state_val_26717,c__23027__auto__,map__26562,map__26562__$1,opts,before_jsload,on_jsload,reload_dependents,map__26563,map__26563__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_26660 = setTimeout(inst_26659,(10));
var state_26716__$1 = (function (){var statearr_26787 = state_26716;
(statearr_26787[(33)] = inst_26653);

(statearr_26787[(34)] = inst_26658);

return statearr_26787;
})();
var statearr_26788_26854 = state_26716__$1;
(statearr_26788_26854[(2)] = inst_26660);

(statearr_26788_26854[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (16))){
var state_26716__$1 = state_26716;
var statearr_26789_26855 = state_26716__$1;
(statearr_26789_26855[(2)] = reload_dependents);

(statearr_26789_26855[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (38))){
var inst_26670 = (state_26716[(16)]);
var inst_26687 = cljs.core.apply.call(null,cljs.core.hash_map,inst_26670);
var state_26716__$1 = state_26716;
var statearr_26790_26856 = state_26716__$1;
(statearr_26790_26856[(2)] = inst_26687);

(statearr_26790_26856[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (30))){
var state_26716__$1 = state_26716;
var statearr_26791_26857 = state_26716__$1;
(statearr_26791_26857[(2)] = null);

(statearr_26791_26857[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (10))){
var inst_26590 = (state_26716[(22)]);
var inst_26592 = cljs.core.chunked_seq_QMARK_.call(null,inst_26590);
var state_26716__$1 = state_26716;
if(inst_26592){
var statearr_26792_26858 = state_26716__$1;
(statearr_26792_26858[(1)] = (13));

} else {
var statearr_26793_26859 = state_26716__$1;
(statearr_26793_26859[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (18))){
var inst_26624 = (state_26716[(2)]);
var state_26716__$1 = state_26716;
if(cljs.core.truth_(inst_26624)){
var statearr_26794_26860 = state_26716__$1;
(statearr_26794_26860[(1)] = (19));

} else {
var statearr_26795_26861 = state_26716__$1;
(statearr_26795_26861[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (42))){
var state_26716__$1 = state_26716;
var statearr_26796_26862 = state_26716__$1;
(statearr_26796_26862[(2)] = null);

(statearr_26796_26862[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (37))){
var inst_26682 = (state_26716[(2)]);
var state_26716__$1 = state_26716;
var statearr_26797_26863 = state_26716__$1;
(statearr_26797_26863[(2)] = inst_26682);

(statearr_26797_26863[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26717 === (8))){
var inst_26590 = (state_26716[(22)]);
var inst_26577 = (state_26716[(8)]);
var inst_26590__$1 = cljs.core.seq.call(null,inst_26577);
var state_26716__$1 = (function (){var statearr_26798 = state_26716;
(statearr_26798[(22)] = inst_26590__$1);

return statearr_26798;
})();
if(inst_26590__$1){
var statearr_26799_26864 = state_26716__$1;
(statearr_26799_26864[(1)] = (10));

} else {
var statearr_26800_26865 = state_26716__$1;
(statearr_26800_26865[(1)] = (11));

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
}
});})(c__23027__auto__,map__26562,map__26562__$1,opts,before_jsload,on_jsload,reload_dependents,map__26563,map__26563__$1,msg,files,figwheel_meta,recompile_dependents))
;
return ((function (switch__22962__auto__,c__23027__auto__,map__26562,map__26562__$1,opts,before_jsload,on_jsload,reload_dependents,map__26563,map__26563__$1,msg,files,figwheel_meta,recompile_dependents){
return (function() {
var figwheel$client$file_reloading$reload_js_files_$_state_machine__22963__auto__ = null;
var figwheel$client$file_reloading$reload_js_files_$_state_machine__22963__auto____0 = (function (){
var statearr_26804 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_26804[(0)] = figwheel$client$file_reloading$reload_js_files_$_state_machine__22963__auto__);

(statearr_26804[(1)] = (1));

return statearr_26804;
});
var figwheel$client$file_reloading$reload_js_files_$_state_machine__22963__auto____1 = (function (state_26716){
while(true){
var ret_value__22964__auto__ = (function (){try{while(true){
var result__22965__auto__ = switch__22962__auto__.call(null,state_26716);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22965__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22965__auto__;
}
break;
}
}catch (e26805){if((e26805 instanceof Object)){
var ex__22966__auto__ = e26805;
var statearr_26806_26866 = state_26716;
(statearr_26806_26866[(5)] = ex__22966__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26716);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26805;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22964__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26867 = state_26716;
state_26716 = G__26867;
continue;
} else {
return ret_value__22964__auto__;
}
break;
}
});
figwheel$client$file_reloading$reload_js_files_$_state_machine__22963__auto__ = function(state_26716){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__22963__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__22963__auto____1.call(this,state_26716);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$reload_js_files_$_state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$reload_js_files_$_state_machine__22963__auto____0;
figwheel$client$file_reloading$reload_js_files_$_state_machine__22963__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$reload_js_files_$_state_machine__22963__auto____1;
return figwheel$client$file_reloading$reload_js_files_$_state_machine__22963__auto__;
})()
;})(switch__22962__auto__,c__23027__auto__,map__26562,map__26562__$1,opts,before_jsload,on_jsload,reload_dependents,map__26563,map__26563__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var state__23029__auto__ = (function (){var statearr_26807 = f__23028__auto__.call(null);
(statearr_26807[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__23027__auto__);

return statearr_26807;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23029__auto__);
});})(c__23027__auto__,map__26562,map__26562__$1,opts,before_jsload,on_jsload,reload_dependents,map__26563,map__26563__$1,msg,files,figwheel_meta,recompile_dependents))
);

return c__23027__auto__;
});
figwheel.client.file_reloading.current_links = (function figwheel$client$file_reloading$current_links(){
return Array.prototype.slice.call(document.getElementsByTagName("link"));
});
figwheel.client.file_reloading.truncate_url = (function figwheel$client$file_reloading$truncate_url(url){
return clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,cljs.core.first.call(null,clojure.string.split.call(null,url,/\?/)),[cljs.core.str(location.protocol),cljs.core.str("//")].join(''),""),".*://",""),/^\/\//,""),/[^\\/]*/,"");
});
figwheel.client.file_reloading.matches_file_QMARK_ = (function figwheel$client$file_reloading$matches_file_QMARK_(p__26870,link){
var map__26873 = p__26870;
var map__26873__$1 = ((((!((map__26873 == null)))?((((map__26873.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26873.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26873):map__26873);
var file = cljs.core.get.call(null,map__26873__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var temp__4657__auto__ = link.href;
if(cljs.core.truth_(temp__4657__auto__)){
var link_href = temp__4657__auto__;
var match = clojure.string.join.call(null,"/",cljs.core.take_while.call(null,cljs.core.identity,cljs.core.map.call(null,((function (link_href,temp__4657__auto__,map__26873,map__26873__$1,file){
return (function (p1__26868_SHARP_,p2__26869_SHARP_){
if(cljs.core._EQ_.call(null,p1__26868_SHARP_,p2__26869_SHARP_)){
return p1__26868_SHARP_;
} else {
return false;
}
});})(link_href,temp__4657__auto__,map__26873,map__26873__$1,file))
,cljs.core.reverse.call(null,clojure.string.split.call(null,file,"/")),cljs.core.reverse.call(null,clojure.string.split.call(null,figwheel.client.file_reloading.truncate_url.call(null,link_href),"/")))));
var match_length = cljs.core.count.call(null,match);
var file_name_length = cljs.core.count.call(null,cljs.core.last.call(null,clojure.string.split.call(null,file,"/")));
if((match_length >= file_name_length)){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"link","link",-1769163468),link,new cljs.core.Keyword(null,"link-href","link-href",-250644450),link_href,new cljs.core.Keyword(null,"match-length","match-length",1101537310),match_length,new cljs.core.Keyword(null,"current-url-length","current-url-length",380404083),cljs.core.count.call(null,figwheel.client.file_reloading.truncate_url.call(null,link_href))], null);
} else {
return null;
}
} else {
return null;
}
});
figwheel.client.file_reloading.get_correct_link = (function figwheel$client$file_reloading$get_correct_link(f_data){
var temp__4657__auto__ = cljs.core.first.call(null,cljs.core.sort_by.call(null,(function (p__26879){
var map__26880 = p__26879;
var map__26880__$1 = ((((!((map__26880 == null)))?((((map__26880.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26880.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26880):map__26880);
var match_length = cljs.core.get.call(null,map__26880__$1,new cljs.core.Keyword(null,"match-length","match-length",1101537310));
var current_url_length = cljs.core.get.call(null,map__26880__$1,new cljs.core.Keyword(null,"current-url-length","current-url-length",380404083));
return (current_url_length - match_length);
}),cljs.core.keep.call(null,(function (p1__26875_SHARP_){
return figwheel.client.file_reloading.matches_file_QMARK_.call(null,f_data,p1__26875_SHARP_);
}),figwheel.client.file_reloading.current_links.call(null))));
if(cljs.core.truth_(temp__4657__auto__)){
var res = temp__4657__auto__;
return new cljs.core.Keyword(null,"link","link",-1769163468).cljs$core$IFn$_invoke$arity$1(res);
} else {
return null;
}
});
figwheel.client.file_reloading.clone_link = (function figwheel$client$file_reloading$clone_link(link,url){
var clone = document.createElement("link");
clone.rel = "stylesheet";

clone.media = link.media;

clone.disabled = link.disabled;

clone.href = figwheel.client.file_reloading.add_cache_buster.call(null,url);

return clone;
});
figwheel.client.file_reloading.create_link = (function figwheel$client$file_reloading$create_link(url){
var link = document.createElement("link");
link.rel = "stylesheet";

link.href = figwheel.client.file_reloading.add_cache_buster.call(null,url);

return link;
});
figwheel.client.file_reloading.add_link_to_doc = (function figwheel$client$file_reloading$add_link_to_doc(var_args){
var args26882 = [];
var len__21234__auto___26885 = arguments.length;
var i__21235__auto___26886 = (0);
while(true){
if((i__21235__auto___26886 < len__21234__auto___26885)){
args26882.push((arguments[i__21235__auto___26886]));

var G__26887 = (i__21235__auto___26886 + (1));
i__21235__auto___26886 = G__26887;
continue;
} else {
}
break;
}

var G__26884 = args26882.length;
switch (G__26884) {
case 1:
return figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26882.length)].join('')));

}
});

figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$1 = (function (new_link){
return (document.getElementsByTagName("head")[(0)]).appendChild(new_link);
});

figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$2 = (function (orig_link,klone){
var parent = orig_link.parentNode;
if(cljs.core._EQ_.call(null,orig_link,parent.lastChild)){
parent.appendChild(klone);
} else {
parent.insertBefore(klone,orig_link.nextSibling);
}

return setTimeout(((function (parent){
return (function (){
return parent.removeChild(orig_link);
});})(parent))
,(300));
});

figwheel.client.file_reloading.add_link_to_doc.cljs$lang$maxFixedArity = 2;

figwheel.client.file_reloading.distictify = (function figwheel$client$file_reloading$distictify(key,seqq){
return cljs.core.vals.call(null,cljs.core.reduce.call(null,(function (p1__26889_SHARP_,p2__26890_SHARP_){
return cljs.core.assoc.call(null,p1__26889_SHARP_,cljs.core.get.call(null,p2__26890_SHARP_,key),p2__26890_SHARP_);
}),cljs.core.PersistentArrayMap.EMPTY,seqq));
});
figwheel.client.file_reloading.reload_css_file = (function figwheel$client$file_reloading$reload_css_file(p__26891){
var map__26894 = p__26891;
var map__26894__$1 = ((((!((map__26894 == null)))?((((map__26894.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26894.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26894):map__26894);
var f_data = map__26894__$1;
var file = cljs.core.get.call(null,map__26894__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var temp__4657__auto__ = figwheel.client.file_reloading.get_correct_link.call(null,f_data);
if(cljs.core.truth_(temp__4657__auto__)){
var link = temp__4657__auto__;
return figwheel.client.file_reloading.add_link_to_doc.call(null,link,figwheel.client.file_reloading.clone_link.call(null,link,link.href));
} else {
return null;
}
});
figwheel.client.file_reloading.reload_css_files = (function figwheel$client$file_reloading$reload_css_files(p__26896,files_msg){
var map__26903 = p__26896;
var map__26903__$1 = ((((!((map__26903 == null)))?((((map__26903.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26903.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26903):map__26903);
var opts = map__26903__$1;
var on_cssload = cljs.core.get.call(null,map__26903__$1,new cljs.core.Keyword(null,"on-cssload","on-cssload",1825432318));
if(cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))){
var seq__26905_26909 = cljs.core.seq.call(null,figwheel.client.file_reloading.distictify.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(files_msg)));
var chunk__26906_26910 = null;
var count__26907_26911 = (0);
var i__26908_26912 = (0);
while(true){
if((i__26908_26912 < count__26907_26911)){
var f_26913 = cljs.core._nth.call(null,chunk__26906_26910,i__26908_26912);
figwheel.client.file_reloading.reload_css_file.call(null,f_26913);

var G__26914 = seq__26905_26909;
var G__26915 = chunk__26906_26910;
var G__26916 = count__26907_26911;
var G__26917 = (i__26908_26912 + (1));
seq__26905_26909 = G__26914;
chunk__26906_26910 = G__26915;
count__26907_26911 = G__26916;
i__26908_26912 = G__26917;
continue;
} else {
var temp__4657__auto___26918 = cljs.core.seq.call(null,seq__26905_26909);
if(temp__4657__auto___26918){
var seq__26905_26919__$1 = temp__4657__auto___26918;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__26905_26919__$1)){
var c__20970__auto___26920 = cljs.core.chunk_first.call(null,seq__26905_26919__$1);
var G__26921 = cljs.core.chunk_rest.call(null,seq__26905_26919__$1);
var G__26922 = c__20970__auto___26920;
var G__26923 = cljs.core.count.call(null,c__20970__auto___26920);
var G__26924 = (0);
seq__26905_26909 = G__26921;
chunk__26906_26910 = G__26922;
count__26907_26911 = G__26923;
i__26908_26912 = G__26924;
continue;
} else {
var f_26925 = cljs.core.first.call(null,seq__26905_26919__$1);
figwheel.client.file_reloading.reload_css_file.call(null,f_26925);

var G__26926 = cljs.core.next.call(null,seq__26905_26919__$1);
var G__26927 = null;
var G__26928 = (0);
var G__26929 = (0);
seq__26905_26909 = G__26926;
chunk__26906_26910 = G__26927;
count__26907_26911 = G__26928;
i__26908_26912 = G__26929;
continue;
}
} else {
}
}
break;
}

return setTimeout(((function (map__26903,map__26903__$1,opts,on_cssload){
return (function (){
return on_cssload.call(null,new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(files_msg));
});})(map__26903,map__26903__$1,opts,on_cssload))
,(100));
} else {
return null;
}
});

//# sourceMappingURL=file_reloading.js.map?rel=1499477030924