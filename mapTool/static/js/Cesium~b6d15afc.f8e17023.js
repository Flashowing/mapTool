(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Cesium~b6d15afc"],{"3d00":function(e,r,t){"use strict";var s=t("535a"),n=t("2f63"),a=t("a795");function o(e,r,t){let s;try{return s=e(r,t),s}catch(n){return Promise.reject(n)}}function c(e){let r;return function(t){const c=t.data,i=[],f={id:c.id,result:void 0,error:void 0};return Promise.resolve(o(e,c.parameters,i)).then((function(e){f.result=e})).catch((function(e){e instanceof Error?f.error={name:e.name,message:e.message,stack:e.stack}:f.error=e})).finally((function(){Object(n["a"])(r)||(r=Object(s["a"])(self.webkitPostMessage,self.postMessage)),c.canTransferArrayBuffer||(i.length=0);try{r(f,i)}catch(e){f.result=void 0,f.error=`postMessage failed with error: ${Object(a["a"])(e)}\n  with responseMessage: ${JSON.stringify(f)}`,r(f)}}))}}r["a"]=c}}]);