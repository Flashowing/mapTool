(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Cesium~4c89cf16"],{"01c0":function(t,e,i){"use strict";var a=i("535a"),s=i("7d62"),o=i("ddf7"),r=i("9fef");function n(t){t=Object(a["a"])(t,a["a"].EMPTY_OBJECT);const e=Object(r["a"])(t.container);this._container=e;const i=document.createElement("div");i.className="cesium-performanceDisplay";const s=document.createElement("div");s.className="cesium-performanceDisplay-fps",this._fpsText=document.createTextNode(""),s.appendChild(this._fpsText);const n=document.createElement("div");n.className="cesium-performanceDisplay-ms",this._msText=document.createTextNode(""),n.appendChild(this._msText),i.appendChild(n),i.appendChild(s),this._container.appendChild(i),this._lastFpsSampleTime=Object(o["a"])(),this._lastMsSampleTime=Object(o["a"])(),this._fpsFrameCount=0,this._msFrameCount=0,this._throttled=!1;const m=document.createElement("div");m.className="cesium-performanceDisplay-throttled",this._throttledText=document.createTextNode(""),m.appendChild(this._throttledText),i.appendChild(m)}Object.defineProperties(n.prototype,{throttled:{get:function(){return this._throttled},set:function(t){this._throttled!==t&&(this._throttledText.nodeValue=t?"(throttled)":"",this._throttled=t)}}}),n.prototype.update=function(t){const e=Object(o["a"])(),i=Object(a["a"])(t,!0);this._fpsFrameCount++;const s=e-this._lastFpsSampleTime;if(s>1e3){let t="N/A";i&&(t=1e3*this._fpsFrameCount/s|0),this._fpsText.nodeValue=t+" FPS",this._lastFpsSampleTime=e,this._fpsFrameCount=0}this._msFrameCount++;const r=e-this._lastMsSampleTime;if(r>200){let t="N/A";i&&(t=(r/this._msFrameCount).toFixed(2)),this._msText.nodeValue=t+" MS",this._lastMsSampleTime=e,this._msFrameCount=0}},n.prototype.destroy=function(){return Object(s["a"])(this)},e["a"]=n},"2a32":function(t,e,i){"use strict";var a=i("4f04");function s(t){}s.prototype.emit=function(t){a["a"].throwInstantiationError()},e["a"]=s},"3a8e":function(t,e,i){"use strict";var a=i("535a"),s=i("0541"),o=i("f533"),r=i("2c4b"),n=i("d3f9"),m=i("9c89"),c=i("5cb0");function l(t){t=Object(a["a"])(t,a["a"].EMPTY_OBJECT);const e=Object(a["a"])(t.translucent,!0),i=Object(a["a"])(t.closed,!1),s=Object(a["a"])(t.flat,!1),u=s?m["a"]:r["a"],h=s?n["a"]:o["a"],_=s?l.FLAT_VERTEX_FORMAT:l.VERTEX_FORMAT;this.material=void 0,this.translucent=e,this._vertexShaderSource=Object(a["a"])(t.vertexShaderSource,u),this._fragmentShaderSource=Object(a["a"])(t.fragmentShaderSource,h),this._renderState=c["a"].getDefaultRenderState(e,i,t.renderState),this._closed=i,this._vertexFormat=_,this._flat=s,this._faceForward=Object(a["a"])(t.faceForward,!i)}Object.defineProperties(l.prototype,{vertexShaderSource:{get:function(){return this._vertexShaderSource}},fragmentShaderSource:{get:function(){return this._fragmentShaderSource}},renderState:{get:function(){return this._renderState}},closed:{get:function(){return this._closed}},vertexFormat:{get:function(){return this._vertexFormat}},flat:{get:function(){return this._flat}},faceForward:{get:function(){return this._faceForward}}}),l.VERTEX_FORMAT=s["a"].POSITION_AND_NORMAL,l.FLAT_VERTEX_FORMAT=s["a"].POSITION_ONLY,l.prototype.getFragmentShaderSource=c["a"].prototype.getFragmentShaderSource,l.prototype.isTranslucent=c["a"].prototype.isTranslucent,l.prototype.getRenderState=c["a"].prototype.getRenderState,e["a"]=l},"3d28":function(t,e,i){"use strict";var a=i("670c"),s=i("be18"),o=i("bd8d"),r=i("535a"),n=i("2f63"),m=i("7d62"),c=i("21d7"),l=i("5ed2"),u=i("93da"),h=i("52f0"),_=i("8f7c"),d=i("b522"),p=i("bc20");const f=new a["a"](1,1);function b(t){t=Object(r["a"])(t,r["a"].EMPTY_OBJECT),this.show=Object(r["a"])(t.show,!0),this.updateCallback=t.updateCallback,this.loop=Object(r["a"])(t.loop,!0),this.image=Object(r["a"])(t.image,void 0);let e=t.emitter;Object(n["a"])(e)||(e=new d["a"](.5)),this._emitter=e,this._bursts=t.bursts,this._modelMatrix=h["a"].clone(Object(r["a"])(t.modelMatrix,h["a"].IDENTITY)),this._emitterModelMatrix=h["a"].clone(Object(r["a"])(t.emitterModelMatrix,h["a"].IDENTITY)),this._matrixDirty=!0,this._combinedMatrix=new h["a"],this._startColor=o["a"].clone(Object(r["a"])(t.color,Object(r["a"])(t.startColor,o["a"].WHITE))),this._endColor=o["a"].clone(Object(r["a"])(t.color,Object(r["a"])(t.endColor,o["a"].WHITE))),this._startScale=Object(r["a"])(t.scale,Object(r["a"])(t.startScale,1)),this._endScale=Object(r["a"])(t.scale,Object(r["a"])(t.endScale,1)),this._emissionRate=Object(r["a"])(t.emissionRate,5),this._minimumSpeed=Object(r["a"])(t.speed,Object(r["a"])(t.minimumSpeed,1)),this._maximumSpeed=Object(r["a"])(t.speed,Object(r["a"])(t.maximumSpeed,1)),this._minimumParticleLife=Object(r["a"])(t.particleLife,Object(r["a"])(t.minimumParticleLife,5)),this._maximumParticleLife=Object(r["a"])(t.particleLife,Object(r["a"])(t.maximumParticleLife,5)),this._minimumMass=Object(r["a"])(t.mass,Object(r["a"])(t.minimumMass,1)),this._maximumMass=Object(r["a"])(t.mass,Object(r["a"])(t.maximumMass,1)),this._minimumImageSize=a["a"].clone(Object(r["a"])(t.imageSize,Object(r["a"])(t.minimumImageSize,f))),this._maximumImageSize=a["a"].clone(Object(r["a"])(t.imageSize,Object(r["a"])(t.maximumImageSize,f))),this._sizeInMeters=Object(r["a"])(t.sizeInMeters,!1),this._lifetime=Object(r["a"])(t.lifetime,Number.MAX_VALUE),this._billboardCollection=void 0,this._particles=[],this._particlePool=[],this._previousTime=void 0,this._currentTime=0,this._carryOver=0,this._complete=new c["a"],this._isComplete=!1,this._updateParticlePool=!0,this._particleEstimate=0}function g(t){const e=t._emissionRate,i=t._maximumParticleLife;let a=0;const s=t._bursts;if(Object(n["a"])(s)){const t=s.length;for(let e=0;e<t;++e)a+=s[e].maximum}const o=t._billboardCollection,r=t.image,m=Math.ceil(e*i+a),c=t._particles,l=t._particlePool,u=Math.max(m-c.length-l.length,0);for(let n=0;n<u;++n){const t=new p["a"];t._billboard=o.add({image:r}),l.push(t)}t._particleEstimate=m}function O(t){let e=t._particlePool.pop();return Object(n["a"])(e)||(e=new p["a"]),e}function S(t,e){t._particlePool.push(e)}function x(t){const e=t._particles,i=t._particlePool,a=t._billboardCollection,s=e.length,o=i.length,r=t._particleEstimate,n=o-Math.max(r-s-o,0);for(let m=n;m<o;++m){const t=i[m];a.remove(t._billboard)}i.length=n}function j(t){Object(n["a"])(t._billboard)&&(t._billboard.show=!1)}function C(t,e){let i=e._billboard;Object(n["a"])(i)||(i=e._billboard=t._billboardCollection.add({image:e.image})),i.width=e.imageSize.x,i.height=e.imageSize.y,i.position=e.position,i.sizeInMeters=t.sizeInMeters,i.show=!0;const a=u["a"].lerp(e.startColor.red,e.endColor.red,e.normalizedAge),s=u["a"].lerp(e.startColor.green,e.endColor.green,e.normalizedAge),r=u["a"].lerp(e.startColor.blue,e.endColor.blue,e.normalizedAge),m=u["a"].lerp(e.startColor.alpha,e.endColor.alpha,e.normalizedAge);i.color=new o["a"](a,s,r,m),i.scale=u["a"].lerp(e.startScale,e.endScale,e.normalizedAge)}function M(t,e){e.startColor=o["a"].clone(t._startColor,e.startColor),e.endColor=o["a"].clone(t._endColor,e.endColor),e.startScale=t._startScale,e.endScale=t._endScale,e.image=t.image,e.life=u["a"].randomBetween(t._minimumParticleLife,t._maximumParticleLife),e.mass=u["a"].randomBetween(t._minimumMass,t._maximumMass),e.imageSize.x=u["a"].randomBetween(t._minimumImageSize.x,t._maximumImageSize.x),e.imageSize.y=u["a"].randomBetween(t._minimumImageSize.y,t._maximumImageSize.y),e._normalizedAge=0,e._age=0;const i=u["a"].randomBetween(t._minimumSpeed,t._maximumSpeed);s["a"].multiplyByScalar(e.velocity,i,e.velocity),t._particles.push(e)}function T(t,e){if(t._isComplete)return 0;e=u["a"].mod(e,t._lifetime);const i=e*t._emissionRate;let a=Math.floor(i);if(t._carryOver+=i-a,t._carryOver>1&&(a++,t._carryOver-=1),Object(n["a"])(t.bursts)){const e=t.bursts.length;for(let i=0;i<e;i++){const e=t.bursts[i],s=t._currentTime;Object(n["a"])(e)&&!e._complete&&s>e.time&&(a+=u["a"].randomBetween(e.minimum,e.maximum),e._complete=!0)}}return a}Object.defineProperties(b.prototype,{emitter:{get:function(){return this._emitter},set:function(t){this._emitter=t}},bursts:{get:function(){return this._bursts},set:function(t){this._bursts=t,this._updateParticlePool=!0}},modelMatrix:{get:function(){return this._modelMatrix},set:function(t){this._matrixDirty=this._matrixDirty||!h["a"].equals(this._modelMatrix,t),h["a"].clone(t,this._modelMatrix)}},emitterModelMatrix:{get:function(){return this._emitterModelMatrix},set:function(t){this._matrixDirty=this._matrixDirty||!h["a"].equals(this._emitterModelMatrix,t),h["a"].clone(t,this._emitterModelMatrix)}},startColor:{get:function(){return this._startColor},set:function(t){o["a"].clone(t,this._startColor)}},endColor:{get:function(){return this._endColor},set:function(t){o["a"].clone(t,this._endColor)}},startScale:{get:function(){return this._startScale},set:function(t){this._startScale=t}},endScale:{get:function(){return this._endScale},set:function(t){this._endScale=t}},emissionRate:{get:function(){return this._emissionRate},set:function(t){this._emissionRate=t,this._updateParticlePool=!0}},minimumSpeed:{get:function(){return this._minimumSpeed},set:function(t){this._minimumSpeed=t}},maximumSpeed:{get:function(){return this._maximumSpeed},set:function(t){this._maximumSpeed=t}},minimumParticleLife:{get:function(){return this._minimumParticleLife},set:function(t){this._minimumParticleLife=t}},maximumParticleLife:{get:function(){return this._maximumParticleLife},set:function(t){this._maximumParticleLife=t,this._updateParticlePool=!0}},minimumMass:{get:function(){return this._minimumMass},set:function(t){this._minimumMass=t}},maximumMass:{get:function(){return this._maximumMass},set:function(t){this._maximumMass=t}},minimumImageSize:{get:function(){return this._minimumImageSize},set:function(t){this._minimumImageSize=t}},maximumImageSize:{get:function(){return this._maximumImageSize},set:function(t){this._maximumImageSize=t}},sizeInMeters:{get:function(){return this._sizeInMeters},set:function(t){this._sizeInMeters=t}},lifetime:{get:function(){return this._lifetime},set:function(t){this._lifetime=t}},complete:{get:function(){return this._complete}},isComplete:{get:function(){return this._isComplete}}});const y=new s["a"];b.prototype.update=function(t){if(!this.show)return;Object(n["a"])(this._billboardCollection)||(this._billboardCollection=new _["a"]),this._updateParticlePool&&(g(this),this._updateParticlePool=!1);let e=0;this._previousTime&&(e=l["a"].secondsDifference(t.time,this._previousTime)),e<0&&(e=0);const i=this._particles,a=this._emitter,o=this.updateCallback;let r,m,c=i.length;for(r=0;r<c;++r)m=i[r],m.update(e,o)?C(this,m):(j(m),S(this,m),i[r]=i[c-1],--r,--c);i.length=c;const d=T(this,e);if(d>0&&Object(n["a"])(a)){this._matrixDirty&&(this._combinedMatrix=h["a"].multiply(this.modelMatrix,this.emitterModelMatrix,this._combinedMatrix),this._matrixDirty=!1);const t=this._combinedMatrix;for(r=0;r<d;r++)m=O(this),this._emitter.emit(m),s["a"].add(m.position,m.velocity,y),h["a"].multiplyByPoint(t,y,y),m.position=h["a"].multiplyByPoint(t,m.position,m.position),s["a"].subtract(y,m.position,m.velocity),s["a"].normalize(m.velocity,m.velocity),M(this,m),C(this,m)}if(this._billboardCollection.update(t),this._previousTime=l["a"].clone(t.time,this._previousTime),this._currentTime+=e,this._lifetime!==Number.MAX_VALUE&&this._currentTime>this._lifetime)if(this.loop){if(this._currentTime=u["a"].mod(this._currentTime,this._lifetime),this.bursts){const t=this.bursts.length;for(r=0;r<t;r++)this.bursts[r]._complete=!1}}else this._isComplete=!0,this._complete.raiseEvent(this);t.frameNumber%120===0&&x(this)},b.prototype.isDestroyed=function(){return!1},b.prototype.destroy=function(){return this._billboardCollection=this._billboardCollection&&this._billboardCollection.destroy(),Object(m["a"])(this)},e["a"]=b},"8e1d":function(t,e,i){"use strict";var a=i("535a");function s(t){t=Object(a["a"])(t,a["a"].EMPTY_OBJECT),this.time=Object(a["a"])(t.time,0),this.minimum=Object(a["a"])(t.minimum,0),this.maximum=Object(a["a"])(t.maximum,50),this._complete=!1}Object.defineProperties(s.prototype,{complete:{get:function(){return this._complete}}}),e["a"]=s},bc20:function(t,e,i){"use strict";var a=i("670c"),s=i("be18"),o=i("bd8d"),r=i("535a"),n=i("2f63");const m=new a["a"](1,1);function c(t){t=Object(r["a"])(t,r["a"].EMPTY_OBJECT),this.mass=Object(r["a"])(t.mass,1),this.position=s["a"].clone(Object(r["a"])(t.position,s["a"].ZERO)),this.velocity=s["a"].clone(Object(r["a"])(t.velocity,s["a"].ZERO)),this.life=Object(r["a"])(t.life,Number.MAX_VALUE),this.image=t.image,this.startColor=o["a"].clone(Object(r["a"])(t.startColor,o["a"].WHITE)),this.endColor=o["a"].clone(Object(r["a"])(t.endColor,o["a"].WHITE)),this.startScale=Object(r["a"])(t.startScale,1),this.endScale=Object(r["a"])(t.endScale,1),this.imageSize=a["a"].clone(Object(r["a"])(t.imageSize,m)),this._age=0,this._normalizedAge=0,this._billboard=void 0}Object.defineProperties(c.prototype,{age:{get:function(){return this._age}},normalizedAge:{get:function(){return this._normalizedAge}}});const l=new s["a"];c.prototype.update=function(t,e){return s["a"].multiplyByScalar(this.velocity,t,l),s["a"].add(this.position,l,this.position),Object(n["a"])(e)&&e(this,t),this._age+=t,this.life===Number.MAX_VALUE?this._normalizedAge=0:this._normalizedAge=this._age/this.life,this._age<=this.life},e["a"]=c}}]);