(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Cesium~b03c70c2"],{"283e":function(e,t,r){"use strict";var n=r("2f63");function o(e){let t;this.name="RuntimeError",this.message=e;try{throw new Error}catch(r){t=r.stack}this.stack=t}Object(n["a"])(Object.create)&&(o.prototype=Object.create(Error.prototype),o.prototype.constructor=o),o.prototype.toString=function(){let e=`${this.name}: ${this.message}`;return Object(n["a"])(this.stack)&&(e+="\n"+this.stack.toString()),e},t["a"]=o},"4ca2":function(e,t,r){"use strict";var n=r("2f63"),o=r("fa2f");function s(e,t,r){this.statusCode=e,this.response=t,this.responseHeaders=r,"string"===typeof this.responseHeaders&&(this.responseHeaders=Object(o["a"])(this.responseHeaders))}s.prototype.toString=function(){let e="Request has failed.";return Object(n["a"])(this.statusCode)&&(e+=" Status Code: "+this.statusCode),e},t["a"]=s},"75b2":function(e,t,r){"use strict";var n=r("881b"),o=r("535a"),s=r("9c35"),i=r("2f63"),c=r("21d7"),a=r("6a30"),u=r("96e8"),l=r("166e"),p=r("8a39");function f(e,t){return e.priority-t.priority}const h={numberOfAttemptedRequests:0,numberOfActiveRequests:0,numberOfCancelledRequests:0,numberOfCancelledActiveRequests:0,numberOfFailedRequests:0,numberOfActiveRequestsEver:0,lastNumberOfActiveRequests:0};let m=20;const d=new a["a"]({comparator:f});d.maximumLength=m,d.reserve(m);const b=[];let y={};const O="undefined"!==typeof document?new n["a"](document.location.href):new n["a"],g=new c["a"];function v(){}function A(e){Object(i["a"])(e.priorityFunction)&&(e.priority=e.priorityFunction())}function j(e){return e.state===p["a"].UNISSUED&&(e.state=p["a"].ISSUED,e.deferred=Object(s["a"])()),e.deferred.promise}function q(e){return function(t){if(e.state===p["a"].CANCELLED)return;const r=e.deferred;--h.numberOfActiveRequests,--y[e.serverKey],g.raiseEvent(),e.state=p["a"].RECEIVED,e.deferred=void 0,r.resolve(t)}}function I(e){return function(t){e.state!==p["a"].CANCELLED&&(++h.numberOfFailedRequests,--h.numberOfActiveRequests,--y[e.serverKey],g.raiseEvent(t),e.state=p["a"].FAILED,e.deferred.reject(t))}}function w(e){const t=j(e);return e.state=p["a"].ACTIVE,b.push(e),++h.numberOfActiveRequests,++h.numberOfActiveRequestsEver,++y[e.serverKey],e.requestFunction().then(q(e)).catch(I(e)),t}function C(e){const t=e.state===p["a"].ACTIVE;if(e.state=p["a"].CANCELLED,++h.numberOfCancelledRequests,Object(i["a"])(e.deferred)){const t=e.deferred;e.deferred=void 0,t.reject()}t&&(--h.numberOfActiveRequests,--y[e.serverKey],++h.numberOfCancelledActiveRequests),Object(i["a"])(e.cancelFunction)&&e.cancelFunction()}function S(){v.debugShowStatistics&&(0===h.numberOfActiveRequests&&h.lastNumberOfActiveRequests>0&&(h.numberOfAttemptedRequests>0&&(console.log("Number of attempted requests: "+h.numberOfAttemptedRequests),h.numberOfAttemptedRequests=0),h.numberOfCancelledRequests>0&&(console.log("Number of cancelled requests: "+h.numberOfCancelledRequests),h.numberOfCancelledRequests=0),h.numberOfCancelledActiveRequests>0&&(console.log("Number of cancelled active requests: "+h.numberOfCancelledActiveRequests),h.numberOfCancelledActiveRequests=0),h.numberOfFailedRequests>0&&(console.log("Number of failed requests: "+h.numberOfFailedRequests),h.numberOfFailedRequests=0)),h.lastNumberOfActiveRequests=h.numberOfActiveRequests)}v.maximumRequests=50,v.maximumRequestsPerServer=6,v.requestsByServer={"api.cesium.com:443":18,"assets.cesium.com:443":18},v.throttleRequests=!0,v.debugShowStatistics=!1,v.requestCompletedEvent=g,Object.defineProperties(v,{statistics:{get:function(){return h}},priorityHeapLength:{get:function(){return m},set:function(e){if(e<m)while(d.length>e){const e=d.pop();C(e)}m=e,d.maximumLength=e,d.reserve(e)}}}),v.serverHasOpenSlots=function(e,t){t=Object(o["a"])(t,1);const r=Object(o["a"])(v.requestsByServer[e],v.maximumRequestsPerServer),n=y[e]+t<=r;return n},v.heapHasOpenSlots=function(e){const t=d.length+e<=m;return t},v.update=function(){let e,t,r=0;const n=b.length;for(e=0;e<n;++e)t=b[e],t.cancelled&&C(t),t.state===p["a"].ACTIVE?r>0&&(b[e-r]=t):++r;b.length-=r;const o=d.internalArray,s=d.length;for(e=0;e<s;++e)A(o[e]);d.resort();const i=Math.max(v.maximumRequests-b.length,0);let c=0;while(c<i&&d.length>0)t=d.pop(),t.cancelled?C(t):!t.throttleByServer||v.serverHasOpenSlots(t.serverKey)?(w(t),++c):C(t);S()},v.getServerKey=function(e){let t=new n["a"](e);""===t.scheme()&&(t=new n["a"](e).absoluteTo(O),t.normalize());let r=t.authority();/:/.test(r)||(r=`${r}:${"https"===t.scheme()?"443":"80"}`);const o=y[r];return Object(i["a"])(o)||(y[r]=0),r},v.request=function(e){if(Object(l["a"])(e.url)||Object(u["a"])(e.url))return g.raiseEvent(),e.state=p["a"].RECEIVED,e.requestFunction();if(++h.numberOfAttemptedRequests,Object(i["a"])(e.serverKey)||(e.serverKey=v.getServerKey(e.url)),v.throttleRequests&&e.throttleByServer&&!v.serverHasOpenSlots(e.serverKey))return;if(!v.throttleRequests||!e.throttle)return w(e);if(b.length>=v.maximumRequests)return;A(e);const t=d.insert(e);if(Object(i["a"])(t)){if(t===e)return;C(t)}return j(e)},v.clearForSpecs=function(){while(d.length>0){const e=d.pop();C(e)}const e=b.length;for(let t=0;t<e;++t)C(b[t]);b.length=0,y={},h.numberOfAttemptedRequests=0,h.numberOfActiveRequests=0,h.numberOfCancelledRequests=0,h.numberOfCancelledActiveRequests=0,h.numberOfFailedRequests=0,h.numberOfActiveRequestsEver=0,h.lastNumberOfActiveRequests=0},v.numberOfActiveRequestsByServer=function(e){return y[e]},v.requestHeap=d,t["a"]=v},"8a39":function(e,t,r){"use strict";const n={UNISSUED:0,ISSUED:1,ACTIVE:2,RECEIVED:3,CANCELLED:4,FAILED:5};t["a"]=Object.freeze(n)},b82e:function(e,t,r){"use strict";const n={TERRAIN:0,IMAGERY:1,TILES3D:2,OTHER:3};t["a"]=Object.freeze(n)},d4ed:function(e,t,r){"use strict";var n=r("881b"),o=r("de5b"),s=r("d4da"),i=r("dc1c"),c=r("2bb9"),a=r("535a"),u=r("9c35"),l=r("2f63"),p=r("a734"),f=r("1a99"),h=r("1f30"),m=r("2720"),d=r("96e8"),b=r("083c"),y=r("166e"),O=r("0e68"),g=r("93da"),v=r("0569"),A=r("c0fd"),j=r("de66"),q=r("4ca2"),I=r("75b2"),w=r("8a39"),C=r("283e"),S=r("3e445");const E=function(){try{const e=new XMLHttpRequest;return e.open("GET","#",!0),e.responseType="blob","blob"===e.responseType}catch(e){return!1}}();function R(e,t,r,n){const o=e.query();if(0===o.length)return{};let s;if(-1===o.indexOf("=")){const e={};e[o]=void 0,s=e}else s=Object(A["a"])(o);t._queryParameters=r?P(s,t._queryParameters,n):s,e.search("")}function T(e,t){const r=t._queryParameters,n=Object.keys(r);1!==n.length||Object(l["a"])(r[n[0]])?e.search(Object(v["a"])(r)):e.search(n[0])}function _(e,t){return Object(l["a"])(e)?Object(l["a"])(e.clone)?e.clone():Object(i["a"])(e):t}function B(e){if(e.state===w["a"].ISSUED||e.state===w["a"].ACTIVE)throw new C["a"]("The Resource is already being fetched.");e.state=w["a"].UNISSUED,e.deferred=void 0}function P(e,t,r){if(!r)return Object(c["a"])(e,t);const n=Object(i["a"])(e,!0);for(const o in t)if(t.hasOwnProperty(o)){let e=n[o];const r=t[o];Object(l["a"])(e)?(Array.isArray(e)||(e=n[o]=[e]),n[o]=e.concat(r)):n[o]=Array.isArray(r)?r.slice():r}return n}function F(e){e=Object(a["a"])(e,a["a"].EMPTY_OBJECT),"string"===typeof e&&(e={url:e}),this._url=void 0,this._templateValues=_(e.templateValues,{}),this._queryParameters=_(e.queryParameters,{}),this.headers=_(e.headers,{}),this.request=Object(a["a"])(e.request,new j["a"]),this.proxy=e.proxy,this.retryCallback=e.retryCallback,this.retryAttempts=Object(a["a"])(e.retryAttempts,0),this._retryCount=0;const t=new n["a"](e.url);R(t,this,!0,!0),t.fragment(""),this._url=t.toString()}let U;function k(e){const t=e.resource,r=e.flipY,n=e.skipColorSpaceConversion,o=e.preferImageBitmap,s=t.request;s.url=t.url,s.requestFunction=function(){let e=!1;t.isDataUri||t.isBlobUri||(e=t.isCrossOriginUrl);const i=Object(u["a"])();return F._Implementations.createImage(s,e,i,r,n,o),i.promise};const i=I["a"].request(s);if(Object(l["a"])(i))return i.catch((function(e){return s.state!==w["a"].FAILED?Promise.reject(e):t.retryOnError(e).then((function(i){return i?(s.state=w["a"].UNISSUED,s.deferred=void 0,k({resource:t,flipY:r,skipColorSpaceConversion:n,preferImageBitmap:o})):Promise.reject(e)}))}))}function D(e,t,r){const n={};n[t]=r,e.setQueryParameters(n);const o=e.request;o.url=e.url,o.requestFunction=function(){const t=Object(u["a"])();return window[r]=function(e){t.resolve(e);try{delete window[r]}catch(n){window[r]=void 0}},F._Implementations.loadAndExecuteScript(e.url,r,t),t.promise};const s=I["a"].request(o);if(Object(l["a"])(s))return s.catch((function(n){return o.state!==w["a"].FAILED?Promise.reject(n):e.retryOnError(n).then((function(s){return s?(o.state=w["a"].UNISSUED,o.deferred=void 0,D(e,t,r)):Promise.reject(n)}))}))}F.createIfNeeded=function(e){return e instanceof F?e.getDerivedResource({request:e.request}):"string"!==typeof e?e:new F({url:e})},F.supportsImageBitmapOptions=function(){if(Object(l["a"])(U))return U;if("function"!==typeof createImageBitmap)return U=Promise.resolve(!1),U;const e="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAABGdBTUEAAE4g3rEiDgAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAADElEQVQI12Ng6GAAAAEUAIngE3ZiAAAAAElFTkSuQmCC";return U=F.fetchBlob({url:e}).then((function(e){const t={imageOrientation:"flipY",premultiplyAlpha:"none",colorSpaceConversion:"none"};return Promise.all([createImageBitmap(e,t),createImageBitmap(e)])})).then((function(e){const t=Object(m["a"])(e[0]),r=Object(m["a"])(e[1]);return t[1]!==r[1]})).catch((function(){return!1})),U},Object.defineProperties(F,{isBlobSupported:{get:function(){return E}}}),Object.defineProperties(F.prototype,{queryParameters:{get:function(){return this._queryParameters}},templateValues:{get:function(){return this._templateValues}},url:{get:function(){return this.getUrlComponent(!0,!0)},set:function(e){const t=new n["a"](e);R(t,this,!1),t.fragment(""),this._url=t.toString()}},extension:{get:function(){return Object(h["a"])(this._url)}},isDataUri:{get:function(){return Object(y["a"])(this._url)}},isBlobUri:{get:function(){return Object(d["a"])(this._url)}},isCrossOriginUrl:{get:function(){return Object(b["a"])(this._url)}},hasHeaders:{get:function(){return Object.keys(this.headers).length>0}}}),F.prototype.toString=function(){return this.getUrlComponent(!0,!0)},F.prototype.getUrlComponent=function(e,t){if(this.isDataUri)return this._url;const r=new n["a"](this._url);e&&T(r,this);let o=r.toString().replace(/%7B/g,"{").replace(/%7D/g,"}");const s=this._templateValues;return o=o.replace(/{(.*?)}/g,(function(e,t){const r=s[t];return Object(l["a"])(r)?encodeURIComponent(r):e})),t&&Object(l["a"])(this.proxy)&&(o=this.proxy.getURL(o)),o},F.prototype.setQueryParameters=function(e,t){this._queryParameters=t?P(this._queryParameters,e,!1):P(e,this._queryParameters,!1)},F.prototype.appendQueryParameters=function(e){this._queryParameters=P(e,this._queryParameters,!0)},F.prototype.setTemplateValues=function(e,t){this._templateValues=t?Object(c["a"])(this._templateValues,e):Object(c["a"])(e,this._templateValues)},F.prototype.getDerivedResource=function(e){const t=this.clone();if(t._retryCount=0,Object(l["a"])(e.url)){const r=new n["a"](e.url),o=Object(a["a"])(e.preserveQueryParameters,!1);R(r,t,!0,o),r.fragment(""),""!==r.scheme()?t._url=r.toString():t._url=r.absoluteTo(new n["a"](Object(p["a"])(this._url))).toString()}return Object(l["a"])(e.queryParameters)&&(t._queryParameters=Object(c["a"])(e.queryParameters,t._queryParameters)),Object(l["a"])(e.templateValues)&&(t._templateValues=Object(c["a"])(e.templateValues,t.templateValues)),Object(l["a"])(e.headers)&&(t.headers=Object(c["a"])(e.headers,t.headers)),Object(l["a"])(e.proxy)&&(t.proxy=e.proxy),Object(l["a"])(e.request)&&(t.request=e.request),Object(l["a"])(e.retryCallback)&&(t.retryCallback=e.retryCallback),Object(l["a"])(e.retryAttempts)&&(t.retryAttempts=e.retryAttempts),t},F.prototype.retryOnError=function(e){const t=this.retryCallback;if("function"!==typeof t||this._retryCount>=this.retryAttempts)return Promise.resolve(!1);const r=this;return Promise.resolve(t(this,e)).then((function(e){return++r._retryCount,e}))},F.prototype.clone=function(e){return Object(l["a"])(e)||(e=new F({url:this._url})),e._url=this._url,e._queryParameters=Object(i["a"])(this._queryParameters),e._templateValues=Object(i["a"])(this._templateValues),e.headers=Object(i["a"])(this.headers),e.proxy=this.proxy,e.retryCallback=this.retryCallback,e.retryAttempts=this.retryAttempts,e._retryCount=0,e.request=this.request.clone(),e},F.prototype.getBaseUri=function(e){return Object(f["a"])(this.getUrlComponent(e),e)},F.prototype.appendForwardSlash=function(){this._url=Object(o["a"])(this._url)},F.prototype.fetchArrayBuffer=function(){return this.fetch({responseType:"arraybuffer"})},F.fetchArrayBuffer=function(e){const t=new F(e);return t.fetchArrayBuffer()},F.prototype.fetchBlob=function(){return this.fetch({responseType:"blob"})},F.fetchBlob=function(e){const t=new F(e);return t.fetchBlob()},F.prototype.fetchImage=function(e){e=Object(a["a"])(e,a["a"].EMPTY_OBJECT);const t=Object(a["a"])(e.preferImageBitmap,!1),r=Object(a["a"])(e.preferBlob,!1),n=Object(a["a"])(e.flipY,!1),o=Object(a["a"])(e.skipColorSpaceConversion,!1);if(B(this.request),!E||this.isDataUri||this.isBlobUri||!this.hasHeaders&&!r)return k({resource:this,flipY:n,skipColorSpaceConversion:o,preferImageBitmap:t});const s=this.fetchBlob();if(!Object(l["a"])(s))return;let i,c,u,p;return F.supportsImageBitmapOptions().then((function(e){return i=e,c=i&&t,s})).then((function(e){if(!Object(l["a"])(e))return;if(p=e,c)return F.createImageBitmapFromBlob(e,{flipY:n,premultiplyAlpha:!1,skipColorSpaceConversion:o});const t=window.URL.createObjectURL(e);return u=new F({url:t}),k({resource:u,flipY:n,skipColorSpaceConversion:o,preferImageBitmap:!1})})).then((function(e){if(Object(l["a"])(e))return e.blob=p,c||window.URL.revokeObjectURL(u.url),e})).catch((function(e){return Object(l["a"])(u)&&window.URL.revokeObjectURL(u.url),e.blob=p,Promise.reject(e)}))},F.fetchImage=function(e){const t=new F(e);return t.fetchImage({flipY:e.flipY,skipColorSpaceConversion:e.skipColorSpaceConversion,preferBlob:e.preferBlob,preferImageBitmap:e.preferImageBitmap})},F.prototype.fetchText=function(){return this.fetch({responseType:"text"})},F.fetchText=function(e){const t=new F(e);return t.fetchText()},F.prototype.fetchJson=function(){const e=this.fetch({responseType:"text",headers:{Accept:"application/json,*/*;q=0.01"}});if(Object(l["a"])(e))return e.then((function(e){if(Object(l["a"])(e))return JSON.parse(e)}))},F.fetchJson=function(e){const t=new F(e);return t.fetchJson()},F.prototype.fetchXML=function(){return this.fetch({responseType:"document",overrideMimeType:"text/xml"})},F.fetchXML=function(e){const t=new F(e);return t.fetchXML()},F.prototype.fetchJsonp=function(e){let t;e=Object(a["a"])(e,"callback"),B(this.request);do{t="loadJsonp"+g["a"].nextRandomNumber().toString().substring(2,8)}while(Object(l["a"])(window[t]));return D(this,e,t)},F.fetchJsonp=function(e){const t=new F(e);return t.fetchJsonp(e.callbackParameterName)},F.prototype._makeRequest=function(e){const t=this;B(t.request);const r=t.request;r.url=t.url,r.requestFunction=function(){const n=e.responseType,o=Object(c["a"])(e.headers,t.headers),s=e.overrideMimeType,i=e.method,a=e.data,p=Object(u["a"])(),f=F._Implementations.loadWithXhr(t.url,n,i,a,o,p,s);return Object(l["a"])(f)&&Object(l["a"])(f.abort)&&(r.cancelFunction=function(){f.abort()}),p.promise};const n=I["a"].request(r);if(Object(l["a"])(n))return n.then((function(e){return r.cancelFunction=void 0,e})).catch((function(n){return r.cancelFunction=void 0,r.state!==w["a"].FAILED?Promise.reject(n):t.retryOnError(n).then((function(o){return o?(r.state=w["a"].UNISSUED,r.deferred=void 0,t.fetch(e)):Promise.reject(n)}))}))};const x=/^data:(.*?)(;base64)?,(.*)$/;function L(e,t){const r=decodeURIComponent(t);return e?atob(r):r}function N(e,t){const r=L(e,t),n=new ArrayBuffer(r.length),o=new Uint8Array(n);for(let s=0;s<r.length;s++)o[s]=r.charCodeAt(s);return n}function M(e,t){t=Object(a["a"])(t,"");const r=e[1],n=!!e[2],o=e[3];let s,i;switch(t){case"":case"text":return L(n,o);case"arraybuffer":return N(n,o);case"blob":return s=N(n,o),new Blob([s],{type:r});case"document":return i=new DOMParser,i.parseFromString(L(n,o),r);case"json":return JSON.parse(L(n,o));default:}}function V(e,t){switch(t){case"text":return e.toString("utf8");case"json":return JSON.parse(e.toString("utf8"));default:return new Uint8Array(e).buffer}}function H(e,t,n,o,s,i,c){const a=r("0b16").parse(e),u=(a.protocol,r("3e8f")),l=r("3e8f"),p={protocol:a.protocol,hostname:a.hostname,port:a.port,path:a.path,query:a.query,method:n,headers:s};u.request(p).on("response",(function(e){if(e.statusCode<200||e.statusCode>=300)return void i.reject(new q["a"](e.statusCode,e,e.headers));const r=[];e.on("data",(function(e){r.push(e)})),e.on("end",(function(){const n=Buffer.concat(r);"gzip"===e.headers["content-encoding"]?l.gunzip(n,(function(e,r){e?i.reject(new C["a"]("Error decompressing response.")):i.resolve(V(r,t))})):i.resolve(V(n,t))}))})).on("error",(function(e){i.reject(new q["a"])})).end()}F.prototype.fetch=function(e){return e=_(e,{}),e.method="GET",this._makeRequest(e)},F.fetch=function(e){const t=new F(e);return t.fetch({responseType:e.responseType,overrideMimeType:e.overrideMimeType})},F.prototype.delete=function(e){return e=_(e,{}),e.method="DELETE",this._makeRequest(e)},F.delete=function(e){const t=new F(e);return t.delete({responseType:e.responseType,overrideMimeType:e.overrideMimeType,data:e.data})},F.prototype.head=function(e){return e=_(e,{}),e.method="HEAD",this._makeRequest(e)},F.head=function(e){const t=new F(e);return t.head({responseType:e.responseType,overrideMimeType:e.overrideMimeType})},F.prototype.options=function(e){return e=_(e,{}),e.method="OPTIONS",this._makeRequest(e)},F.options=function(e){const t=new F(e);return t.options({responseType:e.responseType,overrideMimeType:e.overrideMimeType})},F.prototype.post=function(e,t){return s["a"].defined("data",e),t=_(t,{}),t.method="POST",t.data=e,this._makeRequest(t)},F.post=function(e){const t=new F(e);return t.post(e.data,{responseType:e.responseType,overrideMimeType:e.overrideMimeType})},F.prototype.put=function(e,t){return s["a"].defined("data",e),t=_(t,{}),t.method="PUT",t.data=e,this._makeRequest(t)},F.put=function(e){const t=new F(e);return t.put(e.data,{responseType:e.responseType,overrideMimeType:e.overrideMimeType})},F.prototype.patch=function(e,t){return s["a"].defined("data",e),t=_(t,{}),t.method="PATCH",t.data=e,this._makeRequest(t)},F.patch=function(e){const t=new F(e);return t.patch(e.data,{responseType:e.responseType,overrideMimeType:e.overrideMimeType})},F._Implementations={},F._Implementations.loadImageElement=function(e,t,r){const n=new Image;n.onload=function(){0===n.naturalWidth&&0===n.naturalHeight&&0===n.width&&0===n.height&&(n.width=300,n.height=150),r.resolve(n)},n.onerror=function(e){r.reject(e)},t&&(S["a"].contains(e)?n.crossOrigin="use-credentials":n.crossOrigin=""),n.src=e},F._Implementations.createImage=function(e,t,r,n,o,s){const i=e.url;F.supportsImageBitmapOptions().then((function(c){if(!c||!s)return void F._Implementations.loadImageElement(i,t,r);const a="blob",p="GET",f=Object(u["a"])(),h=F._Implementations.loadWithXhr(i,a,p,void 0,void 0,f,void 0,void 0,void 0);return Object(l["a"])(h)&&Object(l["a"])(h.abort)&&(e.cancelFunction=function(){h.abort()}),f.promise.then((function(e){if(Object(l["a"])(e))return F.createImageBitmapFromBlob(e,{flipY:n,premultiplyAlpha:!1,skipColorSpaceConversion:o});r.reject(new C["a"](`Successfully retrieved ${i} but it contained no content.`))})).then((function(e){r.resolve(e)}))})).catch((function(e){r.reject(e)}))},F.createImageBitmapFromBlob=function(e,t){return s["a"].defined("options",t),s["a"].typeOf.bool("options.flipY",t.flipY),s["a"].typeOf.bool("options.premultiplyAlpha",t.premultiplyAlpha),s["a"].typeOf.bool("options.skipColorSpaceConversion",t.skipColorSpaceConversion),createImageBitmap(e,{imageOrientation:t.flipY?"flipY":"none",premultiplyAlpha:t.premultiplyAlpha?"premultiply":"none",colorSpaceConversion:t.skipColorSpaceConversion?"none":"default"})};const J="undefined"===typeof XMLHttpRequest;F._Implementations.loadWithXhr=function(e,t,r,n,o,s,i){const c=x.exec(e);if(null!==c)return void s.resolve(M(c,t));if(J)return void H(e,t,r,n,o,s,i);const a=new XMLHttpRequest;if(S["a"].contains(e)&&(a.withCredentials=!0),a.open(r,e,!0),Object(l["a"])(i)&&Object(l["a"])(a.overrideMimeType)&&a.overrideMimeType(i),Object(l["a"])(o))for(const l in o)o.hasOwnProperty(l)&&a.setRequestHeader(l,o[l]);Object(l["a"])(t)&&(a.responseType=t);let u=!1;return"string"===typeof e&&(u=0===e.indexOf("file://")||"undefined"!==typeof window&&"file://"===window.location.origin),a.onload=function(){if((a.status<200||a.status>=300)&&(!u||0!==a.status))return void s.reject(new q["a"](a.status,a.response,a.getAllResponseHeaders()));const e=a.response,n=a.responseType;if("HEAD"===r||"OPTIONS"===r){const e=a.getAllResponseHeaders(),t=e.trim().split(/[\r\n]+/),r={};return t.forEach((function(e){const t=e.split(": "),n=t.shift();r[n]=t.join(": ")})),void s.resolve(r)}if(204===a.status)s.resolve();else if(!Object(l["a"])(e)||Object(l["a"])(t)&&n!==t)if("json"===t&&"string"===typeof e)try{s.resolve(JSON.parse(e))}catch(o){s.reject(o)}else(""===n||"document"===n)&&Object(l["a"])(a.responseXML)&&a.responseXML.hasChildNodes()?s.resolve(a.responseXML):""!==n&&"text"!==n||!Object(l["a"])(a.responseText)?s.reject(new C["a"]("Invalid XMLHttpRequest response type.")):s.resolve(a.responseText);else s.resolve(e)},a.onerror=function(e){s.reject(new q["a"])},a.send(n),a},F._Implementations.loadAndExecuteScript=function(e,t,r){return Object(O["a"])(e,t).catch((function(e){r.reject(e)}))},F._DefaultImplementations={},F._DefaultImplementations.createImage=F._Implementations.createImage,F._DefaultImplementations.loadWithXhr=F._Implementations.loadWithXhr,F._DefaultImplementations.loadAndExecuteScript=F._Implementations.loadAndExecuteScript,F.DEFAULT=Object.freeze(new F({url:"undefined"===typeof document?"":document.location.href.split("?")[0]})),t["a"]=F},de66:function(e,t,r){"use strict";var n=r("535a"),o=r("2f63"),s=r("8a39"),i=r("b82e");function c(e){e=Object(n["a"])(e,n["a"].EMPTY_OBJECT);const t=Object(n["a"])(e.throttleByServer,!1),r=Object(n["a"])(e.throttle,!1);this.url=e.url,this.requestFunction=e.requestFunction,this.cancelFunction=e.cancelFunction,this.priorityFunction=e.priorityFunction,this.priority=Object(n["a"])(e.priority,0),this.throttle=r,this.throttleByServer=t,this.type=Object(n["a"])(e.type,i["a"].OTHER),this.serverKey=void 0,this.state=s["a"].UNISSUED,this.deferred=void 0,this.cancelled=!1}c.prototype.cancel=function(){this.cancelled=!0},c.prototype.clone=function(e){return Object(o["a"])(e)?(e.url=this.url,e.requestFunction=this.requestFunction,e.cancelFunction=this.cancelFunction,e.priorityFunction=this.priorityFunction,e.priority=this.priority,e.throttle=this.throttle,e.throttleByServer=this.throttleByServer,e.type=this.type,e.serverKey=this.serverKey,e.state=this.RequestState.UNISSUED,e.deferred=void 0,e.cancelled=!1,e):new c(this)},t["a"]=c},e994:function(e,t,r){"use strict";var n=r("be18"),o=r("bef8"),s=r("535a"),i=r("c52f"),c=r("5e57"),a=r("283e");const u=30,l=1<<u,p=1<<u+1>>>0,f=2*u+1,h=4,m=[],d=[],b=[[0,1,3,2],[0,2,3,1],[3,2,0,1],[3,1,0,2]],y=1,O=2,g=[y,0,0,y|O];function v(e){if(!c["a"].supportsBigInt())throw new a["a"]("S2 required BigInt support");this._cellId=e,this._level=v.getLevel(e)}function A(e,t){const r=q(e,t);return w(r[0],r[1],r[2])}function j(e,t,r){const n=I(e,t),o=R([n[1],n[2]],t),s=r>>1&1;return C(n[0],o[0][s^1&r],o[1][s])}function q(e,t){const r=I(e),n=r[0],o=r[1],s=r[2],i=30===t,c=!i&&(BigInt(o)^e>>BigInt(2))&BigInt(1),a=i?1:c?2:0,u=(o<<1)+a,l=(s<<1)+a;return[n,u,l]}function I(e){0===m.length&&P();const t=Number(e>>BigInt(f));let r=t&y;const n=(1<<h)-1;let o=0,s=0;for(let i=7;i>=0;i--){const t=7===i?u-7*h:h,c=(1<<2*t)-1;r+=Number(e>>BigInt(2*i*h+1)&BigInt(c))<<2,r=d[r];const a=i*h;o+=r>>h+2<<a,s+=(r>>2&n)<<a,r&=y|O}return[t,o,s]}function w(e,t,r){const n=E(t),o=E(r),s=S(n),i=S(o);return C(e,s,i)}function C(e,t,r){switch(e){case 0:return new n["a"](1,t,r);case 1:return new n["a"](-t,1,r);case 2:return new n["a"](-t,-r,1);case 3:return new n["a"](-1,-r,-t);case 4:return new n["a"](r,-1,-t);default:return new n["a"](r,t,-1)}}function S(e){return e>=.5?1/3*(4*e*e-1):1/3*(1-4*(1-e)*(1-e))}function E(e){return 1/p*e}function R(e,t){const r=[[],[]],n=T(t);for(let o=0;o<2;++o){const t=e[o]&-n,s=t+n;r[o][0]=S(_(t)),r[o][1]=S(_(s))}return r}function T(e){return 1<<u-e>>>0}function _(e){return 1/l*e}function B(e,t,r,n,o,s){if(e===h){const e=(t<<h)+r;m[(e<<2)+n]=(o<<2)+s,d[(o<<2)+n]=(e<<2)+s}else{e++,t<<=1,r<<=1,o<<=2;const i=b[s];B(e,t+(i[0]>>1),r+(1&i[0]),n,o,s^g[0]),B(e,t+(i[1]>>1),r+(1&i[1]),n,o+1,s^g[1]),B(e,t+(i[2]>>1),r+(1&i[2]),n,o+2,s^g[2]),B(e,t+(i[3]>>1),r+(1&i[3]),n,o+3,s^g[3])}}function P(){B(0,0,0,0,0,0),B(0,0,0,y,0,y),B(0,0,0,O,0,O),B(0,0,0,y|O,0,y|O)}function F(e){return e&~e+BigInt(1)}function U(e){return BigInt(1)<<BigInt(2*(u-e))}v.fromToken=function(e){return new v(v.getIdFromToken(e))},v.isValidId=function(e){if(e<=0)return!1;if(e>>BigInt(f)>5)return!1;const t=e&~e+BigInt(1);return!!(t&BigInt("0x1555555555555555"))},v.isValidToken=function(e){return!!/^[0-9a-fA-F]{1,16}$/.test(e)&&v.isValidId(v.getIdFromToken(e))},v.getIdFromToken=function(e){return BigInt("0x"+e+"0".repeat(16-e.length))},v.getTokenFromId=function(e){const t=Math.floor(D(e)/4),r=e.toString(16).replace(/0*$/,""),n=Array(17-t-r.length).join("0");return n+r},v.getLevel=function(e){let t=0;while(e!==BigInt(0)){if(e&BigInt(1))break;t++,e>>=BigInt(1)}return u-(t>>1)},v.prototype.getChild=function(e){const t=F(this._cellId)>>BigInt(2),r=this._cellId+BigInt(2*e+1-4)*t;return new v(r)},v.prototype.getParent=function(){const e=F(this._cellId)<<BigInt(2);return new v(this._cellId&~e+BigInt(1)|e)},v.prototype.getParentAtLevel=function(e){const t=U(e);return new v(this._cellId&-t|t)},v.prototype.getCenter=function(e){e=Object(s["a"])(e,i["a"].WGS84);let t=A(this._cellId,this._level);t=n["a"].normalize(t,t);const r=new o["a"].fromCartesian(t,i["a"].UNIT_SPHERE);return o["a"].toCartesian(r,e,new n["a"])},v.prototype.getVertex=function(e,t){t=Object(s["a"])(t,i["a"].WGS84);let r=j(this._cellId,this._level,e);r=n["a"].normalize(r,r);const c=new o["a"].fromCartesian(r,i["a"].UNIT_SPHERE);return o["a"].toCartesian(c,t,new n["a"])},v.fromFacePositionLevel=function(e,t,r){const n=(e<4?"0":"")+(e<2?"0":"")+e.toString(2),o=t.toString(2),s=Array(2*r-o.length+1).join("0"),i=Array(f-2*r).join("0"),c=BigInt(`0b${n}${s}${o}1${i}`);return new v(c)};const k=[64,0,1,39,2,15,40,23,3,12,16,59,41,19,24,54,4,64,13,10,17,62,60,28,42,30,20,51,25,44,55,47,5,32,65,38,14,22,11,58,18,53,63,9,61,27,29,50,43,46,31,37,21,57,52,8,26,49,45,36,56,7,48,35,6,34,33,0];function D(e){return k[(-e&e)%BigInt(67)]}t["a"]=v}}]);