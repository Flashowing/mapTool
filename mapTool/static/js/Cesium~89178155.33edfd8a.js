(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Cesium~89178155"],{cb84:function(t,e,s){"use strict";var a=s("b08e"),o=s("5679"),r=s("be18"),n=s("9889"),i=s("abab"),c=s("535a"),h=s("9c35"),b=s("2f63"),l=s("fdb7"),f=s("2453"),d=s("52f0"),u=s("21d4"),_=s("8bde"),p=s("60e0"),y=s("fa74"),m=s("a7eb"),A=s("aa13"),O=s("a141");const T={UNLOADED:0,LOADING:1,PROCESSING:2,READY:3,FAILED:4},L=_["a"].FeatureIdAttribute;function g(t){t=Object(c["a"])(t,c["a"].EMPTY_OBJECT);const e=t.b3dmResource;let s=t.baseResource;const o=t.arrayBuffer,r=Object(c["a"])(t.byteOffset,0),n=Object(c["a"])(t.releaseGltfJson,!1),i=Object(c["a"])(t.asynchronous,!0),l=Object(c["a"])(t.incrementallyLoadTextures,!0),f=Object(c["a"])(t.upAxis,a["a"].Y),u=Object(c["a"])(t.forwardAxis,a["a"].X),_=Object(c["a"])(t.loadAsTypedArray,!1);s=Object(b["a"])(s)?s:e.clone(),this._b3dmResource=e,this._baseResource=s,this._arrayBuffer=o,this._byteOffset=r,this._releaseGltfJson=n,this._asynchronous=i,this._incrementallyLoadTextures=l,this._upAxis=f,this._forwardAxis=u,this._loadAsTypedArray=_,this._state=T.UNLOADED,this._promise=Object(h["a"])(),this._gltfLoader=void 0,this._batchLength=0,this._propertyTable=void 0,this._batchTable=void 0,this._components=void 0,this._transform=d["a"].IDENTITY}function j(t,e){t.unload(),t._state=T.FAILED;const s="Failed to load b3dm";e=t.getError(s,e),t._promise.reject(e)}function E(t,e){const s=t._batchTable,a=t._batchLength;if(0===a)return;let o;if(Object(b["a"])(s.json))o=Object(y["a"])({count:a,batchTable:s.json,binaryBody:s.binary});else{const t=new m["a"]({name:u["a"].BATCH_TABLE_CLASS_NAME,count:a});o=new l["a"]({schema:{},propertyTables:[t]})}const r=e.scene.nodes,n=r.length;for(let i=0;i<n;i++)I(r[i]);e.structuralMetadata=o}function I(t){const e=t.children.length;for(let a=0;a<e;a++)I(t.children[a]);const s=t.primitives.length;for(let a=0;a<s;a++){const e=t.primitives[a],s=p["a"].getAttributeBySemantic(e,O["a"].FEATURE_ID);if(Object(b["a"])(s)){s.setIndex=0;const t=new L;t.propertyTableId=0,t.setIndex=0,t.positionalLabel="featureId_0",e.featureIds.push(t)}}}Object(b["a"])(Object.create)&&(g.prototype=Object.create(A["a"].prototype),g.prototype.constructor=g),Object.defineProperties(g.prototype,{promise:{get:function(){return this._promise.promise}},texturesLoadedPromise:{get:function(){return this._gltfLoader.texturesLoadedPromise}},cacheKey:{get:function(){}},components:{get:function(){return this._components}}}),g.prototype.load=function(){const t=o["a"].parse(this._arrayBuffer,this._byteOffset);let e=t.batchLength;const s=t.featureTableJson,a=t.featureTableBinary,c=t.batchTableJson,h=t.batchTableBinary,l=new n["a"](s,a);e=l.getGlobalProperty("BATCH_LENGTH"),this._batchLength=e;const u=l.getGlobalProperty("RTC_CENTER",i["a"].FLOAT,3);Object(b["a"])(u)&&(this._transform=d["a"].fromTranslation(r["a"].fromArray(u))),this._batchTable={json:c,binary:h};const _=new f["a"]({typedArray:t.gltf,upAxis:this._upAxis,forwardAxis:this._forwardAxis,gltfResource:this._b3dmResource,baseResource:this._baseResource,releaseGltfJson:this._releaseGltfJson,incrementallyLoadTextures:this._incrementallyLoadTextures,loadAsTypedArray:this._loadAsTypedArray,renameBatchIdSemantic:!0});this._gltfLoader=_,this._state=T.LOADING;const p=this;_.load(),_.promise.then((function(){if(p.isDestroyed())return;const t=_.components;t.transform=p._transform,E(p,t),p._components=t,p._state=T.READY,p._promise.resolve(p)})).catch((function(t){p.isDestroyed()||j(p,t)}))},g.prototype.process=function(t){this._state===T.LOADING&&(this._state=T.PROCESSING),this._state===T.PROCESSING&&this._gltfLoader.process(t)},g.prototype.unload=function(){Object(b["a"])(this._gltfLoader)&&this._gltfLoader.unload(),this._components=void 0},e["a"]=g}}]);