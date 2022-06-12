(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Cesium~b286205d"],{"0a70":function(t,e,n){"use strict";n.d(e,"a",(function(){return m}));var i=n("9c35"),o=n("2f63"),r=n("7d62"),s=n("de66"),c=n("75b2"),a=n("8a39"),u=n("b82e"),l=n("283e"),h=n("7d93"),f=n("5457"),p=n("9c94"),d=n("9a79"),_=n("80f9"),y=n("40ef");function m(t,e,n,r){this._tileset=t,this._tile=e,this._tilesetResource=n,this._contents=[];const s=Object(o["a"])(r.contents)?r.contents:r.content;this._innerContentHeaders=s,this._requestsInFlight=0,this._cancelCount=0;const a=this._innerContentHeaders.length;this._arrayFetchPromises=new Array(a),this._requests=new Array(a),this._innerContentResources=new Array(a),this._serverKeys=new Array(a);for(let i=0;i<a;i++){const t=n.getDerivedResource({url:s[i].uri}),e=c["a"].getServerKey(t.getUrlComponent());this._innerContentResources[i]=t,this._serverKeys[i]=e}this._contentsFetchedPromise=void 0,this._readyPromise=Object(i["a"])()}function g(t,e){t._requestsInFlight+=e,t.tileset.statistics.numberOfPendingRequests+=e}function b(t,e){t._cancelCount++,t._tile._contentState=e,t.tileset.statistics.numberOfPendingRequests-=t._requestsInFlight,t._requestsInFlight=0;const n=t._innerContentHeaders.length;t._arrayFetchPromises=new Array(n)}function P(t){const e={};for(let n=0;n<t.length;n++){const i=t[n];Object(o["a"])(e[i])?e[i]++:e[i]=1}for(const n in e)if(e.hasOwnProperty(n)&&!c["a"].serverHasOpenSlots(n,e[n]))return!1;return c["a"].heapHasOpenSlots(t.length)}function O(t,e,n,i){const o=t._innerContentResources[e].clone(),r=t.tile,c=function(){return r._priority},l=t._serverKeys[e],h=new s["a"]({throttle:!0,throttleByServer:!0,type:u["a"].TILES3D,priorityFunction:c,serverKey:l});return o.request=h,t._requests[e]=h,o.fetchArrayBuffer().then((function(e){if(!(n<t._cancelCount))return g(t,-1),e})).catch((function(r){n<t._cancelCount||(o.request.state!==a["a"].CANCELLED?(g(t,-1),F(t,e,r)):b(t,i))}))}function j(t){const e=t._cancelCount;Promise.all(t._arrayFetchPromises).then((function(n){if(!(e<t._cancelCount))return n.map((function(e,n){if(Object(o["a"])(e))try{return C(t,e,n)}catch(i){return void F(t,n,i)}}))})).then((function(e){Object(o["a"])(e)?(t._contents=e.filter(o["a"]),v(t),Object(o["a"])(t._contentsFetchedPromise)&&t._contentsFetchedPromise.resolve()):Object(o["a"])(t._contentsFetchedPromise)&&(t._contentsFetchedPromise.resolve(),t._contentsFetchedPromise=void 0)})).catch((function(e){Object(o["a"])(t._contentsFetchedPromise)&&t._contentsFetchedPromise.reject(e)}))}function C(t,e,n){const i=Object(y["a"])(e);if(i.contentType===f["a"].EXTERNAL_TILESET)throw new l["a"]("External tilesets are disallowed inside multiple contents");t._disableSkipLevelOfDetail=t._disableSkipLevelOfDetail||i.contentType===f["a"].GEOMETRY||i.contentType===f["a"].VECTOR;const r=t._tileset,s=t._innerContentResources[n],c=t._tile;let a;const u=p["a"][i.contentType];a=Object(o["a"])(i.binaryPayload)?u(r,c,s,i.binaryPayload.buffer,0):u(r,c,s,i.jsonPayload);const m=t._innerContentHeaders[n];if(c.hasImplicitContentMetadata){const t=c.implicitSubtree,e=c.implicitCoordinates;a.metadata=t.getContentMetadataView(e,n)}else c.hasImplicitContent||(a.metadata=Object(d["a"])(r,m));const g=Object(_["a"])(r,m);return Object(o["a"])(g)&&(a.group=new h["a"]({metadata:g})),a}function v(t){const e=t._contents.map((function(t){return t.readyPromise}));Promise.all(e).then((function(){t._readyPromise.resolve(t)})).catch((function(e){t._readyPromise.reject(e)}))}function F(t,e,n){const i=t._tileset,r=t._innerContentResources[e].url,s=Object(o["a"])(n.message)?n.message:n.toString();i.tileFailed.numberOfListeners>0?i.tileFailed.raiseEvent({url:r,message:s}):(console.log("A content failed to load: "+r),console.log("Error: "+s))}Object.defineProperties(m.prototype,{featurePropertiesDirty:{get:function(){const t=this._contents,e=t.length;for(let n=0;n<e;++n)if(t[n].featurePropertiesDirty)return!0;return!1},set:function(t){const e=this._contents,n=e.length;for(let i=0;i<n;++i)e[i].featurePropertiesDirty=t}},featuresLength:{get:function(){return 0}},pointsLength:{get:function(){return 0}},trianglesLength:{get:function(){return 0}},geometryByteLength:{get:function(){return 0}},texturesByteLength:{get:function(){return 0}},batchTableByteLength:{get:function(){return 0}},innerContents:{get:function(){return this._contents}},readyPromise:{get:function(){return this._readyPromise.promise}},tileset:{get:function(){return this._tileset}},tile:{get:function(){return this._tile}},url:{get:function(){}},metadata:{get:function(){},set:function(){}},batchTable:{get:function(){}},group:{get:function(){},set:function(){}},innerContentUrls:{get:function(){return this._innerContentHeaders.map((function(t){return t.uri}))}},contentsFetchedPromise:{get:function(){if(Object(o["a"])(this._contentsFetchedPromise))return this._contentsFetchedPromise.promise}}}),m.prototype.requestInnerContents=function(){if(!P(this._serverKeys))return this._serverKeys.length;const t=this._innerContentHeaders;g(this,t.length);for(let e=0;e<t.length;e++)this._arrayFetchPromises[e]=O(this,e,this._cancelCount,this._tile._contentState);return Object(o["a"])(this._contentsFetchedPromise)||(this._contentsFetchedPromise=Object(i["a"])()),j(this),0},m.prototype.cancelRequests=function(){for(let t=0;t<this._requests.length;t++){const e=this._requests[t];Object(o["a"])(e)&&e.cancel()}},m.prototype.hasProperty=function(t,e){return!1},m.prototype.getFeature=function(t){},m.prototype.applyDebugSettings=function(t,e){const n=this._contents,i=n.length;for(let o=0;o<i;++o)n[o].applyDebugSettings(t,e)},m.prototype.applyStyle=function(t){const e=this._contents,n=e.length;for(let i=0;i<n;++i)e[i].applyStyle(t)},m.prototype.update=function(t,e){const n=this._contents,i=n.length;for(let o=0;o<i;++o)n[o].update(t,e)},m.prototype.isDestroyed=function(){return!1},m.prototype.destroy=function(){const t=this._contents,e=t.length;for(let n=0;n<e;++n)t[n].destroy();return Object(r["a"])(this)}},"377c":function(t,e,n){"use strict";function i(t){}i.prototype.isReady=function(){return!0},i.prototype.shouldDiscardImage=function(t){return!1},e["a"]=i},"9e0b":function(t,e,n){"use strict";var i=n("7229"),o=n("be18"),r=n("535a"),s=n("2f63"),c=n("7d62"),a=n("c52f"),u=n("47a6"),l=n("df07"),h=n("52f0"),f=n("08db"),p=n("f806"),d=n("37eb"),_=n("aea3");function y(t){t=Object(r["a"])(t,r["a"].EMPTY_OBJECT);let e=t.textureUrl;Object(s["a"])(e)||(e=Object(i["a"])("Assets/Textures/moonSmall.jpg")),this.show=Object(r["a"])(t.show,!0),this.textureUrl=e,this._ellipsoid=Object(r["a"])(t.ellipsoid,a["a"].MOON),this.onlySunLighting=Object(r["a"])(t.onlySunLighting,!0),this._ellipsoidPrimitive=new d["a"]({radii:this.ellipsoid.radii,material:_["a"].fromType(_["a"].ImageType),depthTestEnabled:!1,_owner:this}),this._ellipsoidPrimitive.material.translucent=!1,this._axes=new u["a"]}Object.defineProperties(y.prototype,{ellipsoid:{get:function(){return this._ellipsoid}}});const m=new l["a"],g=new l["a"],b=new o["a"],P=[];y.prototype.update=function(t){if(!this.show)return;const e=this._ellipsoidPrimitive;e.material.uniforms.image=this.textureUrl,e.onlySunLighting=this.onlySunLighting;const n=t.time;Object(s["a"])(p["a"].computeIcrfToFixedMatrix(n,m))||p["a"].computeTemeToPseudoFixedMatrix(n,m);const i=this._axes.evaluate(n,g);l["a"].transpose(i,i),l["a"].multiply(m,i,i);const o=f["a"].computeMoonPositionInEarthInertialFrame(n,b);l["a"].multiplyByVector(m,o,o),h["a"].fromRotationTranslation(i,o,e.modelMatrix);const r=t.commandList;return t.commandList=P,P.length=0,e.update(t),t.commandList=r,1===P.length?P[0]:void 0},y.prototype.isDestroyed=function(){return!1},y.prototype.destroy=function(){return this._ellipsoidPrimitive=this._ellipsoidPrimitive&&this._ellipsoidPrimitive.destroy(),Object(c["a"])(this)},e["a"]=y}}]);