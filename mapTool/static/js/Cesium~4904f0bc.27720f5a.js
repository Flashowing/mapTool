(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Cesium~4904f0bc"],{"14be":function(t,e,n){"use strict";var r=n("4f04");function i(){r["a"].throwInstantiationError()}Object.defineProperties(i.prototype,{ellipsoid:{get:r["a"].throwInstantiationError}}),i.prototype.project=r["a"].throwInstantiationError,i.prototype.unproject=r["a"].throwInstantiationError,e["a"]=i},7524:function(t,e,n){"use strict";var r=n("535a");function i(t){t=Object(r["a"])(t,0),this._array=new Array(t),this._length=t}Object.defineProperties(i.prototype,{length:{get:function(){return this._length},set:function(t){const e=this._array,n=this._length;if(t<n)for(let r=t;r<n;++r)e[r]=void 0;else t>e.length&&(e.length=t);this._length=t}},values:{get:function(){return this._array}}}),i.prototype.get=function(t){return this._array[t]},i.prototype.set=function(t,e){t>=this._length&&(this.length=t+1),this._array[t]=e},i.prototype.peek=function(){return this._array[this._length-1]},i.prototype.push=function(t){const e=this.length++;this._array[e]=t},i.prototype.pop=function(){if(0===this._length)return;const t=this._array[this._length-1];return--this.length,t},i.prototype.reserve=function(t){t>this._array.length&&(this._array.length=t)},i.prototype.resize=function(t){this.length=t},i.prototype.trim=function(t){t=Object(r["a"])(t,this._length),this._array.length=t},e["a"]=i},7993:function(t,e,n){"use strict";var r=n("be18"),i=n("535a"),o=n("2f63"),s=n("66fb");function a(t){t=Object(i["a"])(t,i["a"].EMPTY_OBJECT);const e=t.points,n=t.times;this._times=n,this._points=e,this._pointType=s["a"].getPointType(e[0]),this._lastTimeIndex=0}Object.defineProperties(a.prototype,{times:{get:function(){return this._times}},points:{get:function(){return this._points}}}),a.prototype.findTimeInterval=s["a"].prototype.findTimeInterval,a.prototype.wrapTime=s["a"].prototype.wrapTime,a.prototype.clampTime=s["a"].prototype.clampTime,a.prototype.evaluate=function(t,e){const n=this.points,i=this.times,s=this._lastTimeIndex=this.findTimeInterval(t,this._lastTimeIndex),a=(t-i[s])/(i[s+1]-i[s]),p=this._pointType;return p===Number?(1-a)*n[s]+a*n[s+1]:(Object(o["a"])(e)||(e=new r["a"]),r["a"].lerp(n[s],n[s+1],a,e))},e["a"]=a},eb20:function(t,e,n){"use strict";var r=n("2f63");const i={type:"Linear",getRequiredDataPoints:function(t){return 2},interpolateOrderZero:function(t,e,n,i,o){let s,a,p;Object(r["a"])(o)||(o=new Array(i));const h=e[0],c=e[1];for(s=0;s<i;s++)a=n[s],p=n[s+i],o[s]=((p-a)*t+c*a-h*p)/(c-h);return o}};e["a"]=i}}]);