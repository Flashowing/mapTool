(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Cesium~81729a69"],{"709a":function(t,n,e){"use strict";function r(t){return t}function i(t){if(null==t)return r;var n,e,i=t.scale[0],a=t.scale[1],o=t.translate[0],s=t.translate[1];return function(t,r){r||(n=e=0);var h=2,c=t.length,l=new Array(c);l[0]=(n+=t[0])*i+o,l[1]=(e+=t[1])*a+s;while(h<c)l[h]=t[h],++h;return l}}function a(t){var n,e=i(t.transform),r=1/0,a=r,o=-r,s=-r;function h(t){t=e(t),t[0]<r&&(r=t[0]),t[0]>o&&(o=t[0]),t[1]<a&&(a=t[1]),t[1]>s&&(s=t[1])}function c(t){switch(t.type){case"GeometryCollection":t.geometries.forEach(c);break;case"Point":h(t.coordinates);break;case"MultiPoint":t.coordinates.forEach(h);break}}for(n in t.arcs.forEach((function(t){var n,i=-1,h=t.length;while(++i<h)n=e(t[i],i),n[0]<r&&(r=n[0]),n[0]>o&&(o=n[0]),n[1]<a&&(a=n[1]),n[1]>s&&(s=n[1])})),t.objects)c(t.objects[n]);return[r,a,o,s]}function o(t,n){var e,r=t.length,i=r-n;while(i<--r)e=t[i],t[i++]=t[r],t[r]=e}function s(t,n){return"string"===typeof n&&(n=t.objects[n]),"GeometryCollection"===n.type?{type:"FeatureCollection",features:n.geometries.map((function(n){return h(t,n)}))}:h(t,n)}function h(t,n){var e=n.id,r=n.bbox,i=null==n.properties?{}:n.properties,a=c(t,n);return null==e&&null==r?{type:"Feature",properties:i,geometry:a}:null==r?{type:"Feature",id:e,properties:i,geometry:a}:{type:"Feature",id:e,bbox:r,properties:i,geometry:a}}function c(t,n){var e=i(t.transform),r=t.arcs;function a(t,n){n.length&&n.pop();for(var i=r[t<0?~t:t],a=0,s=i.length;a<s;++a)n.push(e(i[a],a));t<0&&o(n,s)}function s(t){return e(t)}function h(t){for(var n=[],e=0,r=t.length;e<r;++e)a(t[e],n);return n.length<2&&n.push(n[0]),n}function c(t){var n=h(t);while(n.length<4)n.push(n[0]);return n}function l(t){return t.map(c)}function u(t){var n,e=t.type;switch(e){case"GeometryCollection":return{type:e,geometries:t.geometries.map(u)};case"Point":n=s(t.coordinates);break;case"MultiPoint":n=t.coordinates.map(s);break;case"LineString":n=h(t.arcs);break;case"MultiLineString":n=t.arcs.map(h);break;case"Polygon":n=l(t.arcs);break;case"MultiPolygon":n=t.arcs.map(l);break;default:return null}return{type:e,coordinates:n}}return u(n)}function l(t,n){var e={},r={},i={},a=[],o=-1;function s(n){var e,r=t.arcs[n<0?~n:n],i=r[0];return t.transform?(e=[0,0],r.forEach((function(t){e[0]+=t[0],e[1]+=t[1]}))):e=r[r.length-1],n<0?[e,i]:[i,e]}function h(t,n){for(var r in t){var i=t[r];delete n[i.start],delete i.start,delete i.end,i.forEach((function(t){e[t<0?~t:t]=1})),a.push(i)}}return n.forEach((function(e,r){var i,a=t.arcs[e<0?~e:e];a.length<3&&!a[1][0]&&!a[1][1]&&(i=n[++o],n[o]=e,n[r]=i)})),n.forEach((function(t){var n,e,a=s(t),o=a[0],h=a[1];if(n=i[o])if(delete i[n.end],n.push(t),n.end=h,e=r[h]){delete r[e.start];var c=e===n?n:n.concat(e);r[c.start=n.start]=i[c.end=e.end]=c}else r[n.start]=i[n.end]=n;else if(n=r[h])if(delete r[n.start],n.unshift(t),n.start=o,e=i[o]){delete i[e.end];var l=e===n?n:e.concat(n);r[l.start=e.start]=i[l.end=n.end]=l}else r[n.start]=i[n.end]=n;else n=[t],r[n.start=o]=i[n.end=h]=n})),h(i,r),h(r,i),n.forEach((function(t){e[t<0?~t:t]||a.push([t])})),a}function u(t){return c(t,f.apply(this,arguments))}function f(t,n,e){var r,i,a;if(arguments.length>1)r=m(t,n,e);else for(i=0,r=new Array(a=t.arcs.length);i<a;++i)r[i]=i;return{type:"MultiLineString",arcs:l(t,r)}}function m(t,n,e){var r,i=[],a=[];function o(t){var n=t<0?~t:t;(a[n]||(a[n]=[])).push({i:t,g:r})}function s(t){t.forEach(o)}function h(t){t.forEach(s)}function c(t){t.forEach(h)}function l(t){switch(r=t,t.type){case"GeometryCollection":t.geometries.forEach(l);break;case"LineString":s(t.arcs);break;case"MultiLineString":case"Polygon":h(t.arcs);break;case"MultiPolygon":c(t.arcs);break}}return l(n),a.forEach(null==e?function(t){i.push(t[0].i)}:function(t){e(t[0].g,t[t.length-1].g)&&i.push(t[0].i)}),i}function p(t){var n,e=-1,r=t.length,i=t[r-1],a=0;while(++e<r)n=i,i=t[e],a+=n[0]*i[1]-n[1]*i[0];return Math.abs(a)}function d(t){return c(t,g.apply(this,arguments))}function g(t,n){var e={},r=[],i=[];function a(t){switch(t.type){case"GeometryCollection":t.geometries.forEach(a);break;case"Polygon":o(t.arcs);break;case"MultiPolygon":t.arcs.forEach(o);break}}function o(t){t.forEach((function(n){n.forEach((function(n){(e[n=n<0?~n:n]||(e[n]=[])).push(t)}))})),r.push(t)}function s(n){return p(c(t,{type:"Polygon",arcs:[n]}).coordinates[0])}return n.forEach(a),r.forEach((function(t){if(!t._){var n=[],r=[t];t._=1,i.push(n);while(t=r.pop())n.push(t),t.forEach((function(t){t.forEach((function(t){e[t<0?~t:t].forEach((function(t){t._||(t._=1,r.push(t))}))}))}))}})),r.forEach((function(t){delete t._})),{type:"MultiPolygon",arcs:i.map((function(n){var r,i=[];if(n.forEach((function(t){t.forEach((function(t){t.forEach((function(t){e[t<0?~t:t].length<2&&i.push(t)}))}))})),i=l(t,i),(r=i.length)>1)for(var a,o,h=1,c=s(i[0]);h<r;++h)(a=s(i[h]))>c&&(o=i[0],i[0]=i[h],i[h]=o,c=a);return i})).filter((function(t){return t.length>0}))}}function x(t,n){var e=0,r=t.length;while(e<r){var i=e+r>>>1;t[i]<n?e=i+1:r=i}return e}function M(t){var n={},e=t.map((function(){return[]}));function r(t,e){t.forEach((function(t){t<0&&(t=~t);var r=n[t];r?r.push(e):n[t]=[e]}))}function i(t,n){t.forEach((function(t){r(t,n)}))}function a(t,n){"GeometryCollection"===t.type?t.geometries.forEach((function(t){a(t,n)})):t.type in o&&o[t.type](t.arcs,n)}var o={LineString:r,MultiLineString:i,Polygon:i,MultiPolygon:function(t,n){t.forEach((function(t){i(t,n)}))}};for(var s in t.forEach(a),n)for(var h=n[s],c=h.length,l=0;l<c;++l)for(var u=l+1;u<c;++u){var f,m=h[l],p=h[u];(f=e[m])[s=x(f,p)]!==p&&f.splice(s,0,p),(f=e[p])[s=x(f,m)]!==m&&f.splice(s,0,m)}return e}function b(t){if(null==t)return r;var n,e,i=t.scale[0],a=t.scale[1],o=t.translate[0],s=t.translate[1];return function(t,r){r||(n=e=0);var h=2,c=t.length,l=new Array(c),u=Math.round((t[0]-o)/i),f=Math.round((t[1]-s)/a);l[0]=u-n,n=u,l[1]=f-e,e=f;while(h<c)l[h]=t[h],++h;return l}}function y(t,n){if(t.transform)throw new Error("already quantized");if(n&&n.scale)h=t.bbox;else{if(!((e=Math.floor(n))>=2))throw new Error("n must be ≥2");h=t.bbox||a(t);var e,r=h[0],i=h[1],o=h[2],s=h[3];n={scale:[o-r?(o-r)/(e-1):1,s-i?(s-i)/(e-1):1],translate:[r,i]}}var h,c,l=b(n),u=t.objects,f={};function m(t){return l(t)}function p(t){var n;switch(t.type){case"GeometryCollection":n={type:"GeometryCollection",geometries:t.geometries.map(p)};break;case"Point":n={type:"Point",coordinates:m(t.coordinates)};break;case"MultiPoint":n={type:"MultiPoint",coordinates:t.coordinates.map(m)};break;default:return t}return null!=t.id&&(n.id=t.id),null!=t.bbox&&(n.bbox=t.bbox),null!=t.properties&&(n.properties=t.properties),n}function d(t){var n,e=0,r=1,i=t.length,a=new Array(i);a[0]=l(t[0],0);while(++e<i)((n=l(t[e],e))[0]||n[1])&&(a[r++]=n);return 1===r&&(a[r++]=[0,0]),a.length=r,a}for(c in u)f[c]=p(u[c]);return{type:"Topology",bbox:h,transform:n,objects:f,arcs:t.arcs.map(d)}}e.d(n,"a",(function(){return v}));var v=Object.freeze({__proto__:null,bbox:a,feature:s,mesh:u,meshArcs:f,merge:d,mergeArcs:g,neighbors:M,quantize:y,transform:i,untransform:b})},8283:function(t,n,e){"use strict";function r(t,n,e,r,a){i(t,n,e||0,r||t.length-1,a||o)}function i(t,n,e,r,o){while(r>e){if(r-e>600){var s=r-e+1,h=n-e+1,c=Math.log(s),l=.5*Math.exp(2*c/3),u=.5*Math.sqrt(c*l*(s-l)/s)*(h-s/2<0?-1:1),f=Math.max(e,Math.floor(n-h*l/s+u)),m=Math.min(r,Math.floor(n+(s-h)*l/s+u));i(t,n,f,m,o)}var p=t[n],d=e,g=r;a(t,e,n),o(t[r],p)>0&&a(t,e,r);while(d<g){a(t,d,g),d++,g--;while(o(t[d],p)<0)d++;while(o(t[g],p)>0)g--}0===o(t[e],p)?a(t,e,g):(g++,a(t,g,r)),g<=n&&(e=g+1),n<=g&&(r=g-1)}}function a(t,n,e){var r=t[n];t[n]=t[e],t[e]=r}function o(t,n){return t<n?-1:t>n?1:0}e.d(n,"a",(function(){return s}));class s{constructor(t=9){this._maxEntries=Math.max(4,t),this._minEntries=Math.max(2,Math.ceil(.4*this._maxEntries)),this.clear()}all(){return this._all(this.data,[])}search(t){let n=this.data;const e=[];if(!b(t,n))return e;const r=this.toBBox,i=[];while(n){for(let a=0;a<n.children.length;a++){const o=n.children[a],s=n.leaf?r(o):o;b(t,s)&&(n.leaf?e.push(o):M(t,s)?this._all(o,e):i.push(o))}n=i.pop()}return e}collides(t){let n=this.data;if(!b(t,n))return!1;const e=[];while(n){for(let r=0;r<n.children.length;r++){const i=n.children[r],a=n.leaf?this.toBBox(i):i;if(b(t,a)){if(n.leaf||M(t,a))return!0;e.push(i)}}n=e.pop()}return!1}load(t){if(!t||!t.length)return this;if(t.length<this._minEntries){for(let n=0;n<t.length;n++)this.insert(t[n]);return this}let n=this._build(t.slice(),0,t.length-1,0);if(this.data.children.length)if(this.data.height===n.height)this._splitRoot(this.data,n);else{if(this.data.height<n.height){const t=this.data;this.data=n,n=t}this._insert(n,this.data.height-n.height-1,!0)}else this.data=n;return this}insert(t){return t&&this._insert(t,this.data.height-1),this}clear(){return this.data=y([]),this}remove(t,n){if(!t)return this;let e=this.data;const r=this.toBBox(t),i=[],a=[];let o,s,c;while(e||i.length){if(e||(e=i.pop(),s=i[i.length-1],o=a.pop(),c=!0),e.leaf){const r=h(t,e.children,n);if(-1!==r)return e.children.splice(r,1),i.push(e),this._condense(i),this}c||e.leaf||!M(e,r)?s?(o++,e=s.children[o],c=!1):e=null:(i.push(e),a.push(o),o=0,s=e,e=e.children[0])}return this}toBBox(t){return t}compareMinX(t,n){return t.minX-n.minX}compareMinY(t,n){return t.minY-n.minY}toJSON(){return this.data}fromJSON(t){return this.data=t,this}_all(t,n){const e=[];while(t)t.leaf?n.push(...t.children):e.push(...t.children),t=e.pop();return n}_build(t,n,e,r){const i=e-n+1;let a,o=this._maxEntries;if(i<=o)return a=y(t.slice(n,e+1)),c(a,this.toBBox),a;r||(r=Math.ceil(Math.log(i)/Math.log(o)),o=Math.ceil(i/Math.pow(o,r-1))),a=y([]),a.leaf=!1,a.height=r;const s=Math.ceil(i/o),h=s*Math.ceil(Math.sqrt(o));v(t,n,e,h,this.compareMinX);for(let c=n;c<=e;c+=h){const n=Math.min(c+h-1,e);v(t,c,n,s,this.compareMinY);for(let e=c;e<=n;e+=s){const i=Math.min(e+s-1,n);a.children.push(this._build(t,e,i,r-1))}}return c(a,this.toBBox),a}_chooseSubtree(t,n,e,r){while(1){if(r.push(n),n.leaf||r.length-1===e)break;let i,a=1/0,o=1/0;for(let e=0;e<n.children.length;e++){const r=n.children[e],s=p(r),h=g(t,r)-s;h<o?(o=h,a=s<a?s:a,i=r):h===o&&s<a&&(a=s,i=r)}n=i||n.children[0]}return n}_insert(t,n,e){const r=e?t:this.toBBox(t),i=[],a=this._chooseSubtree(r,this.data,n,i);a.children.push(t),u(a,r);while(n>=0){if(!(i[n].children.length>this._maxEntries))break;this._split(i,n),n--}this._adjustParentBBoxes(r,i,n)}_split(t,n){const e=t[n],r=e.children.length,i=this._minEntries;this._chooseSplitAxis(e,i,r);const a=this._chooseSplitIndex(e,i,r),o=y(e.children.splice(a,e.children.length-a));o.height=e.height,o.leaf=e.leaf,c(e,this.toBBox),c(o,this.toBBox),n?t[n-1].children.push(o):this._splitRoot(e,o)}_splitRoot(t,n){this.data=y([t,n]),this.data.height=t.height+1,this.data.leaf=!1,c(this.data,this.toBBox)}_chooseSplitIndex(t,n,e){let r,i=1/0,a=1/0;for(let o=n;o<=e-n;o++){const n=l(t,0,o,this.toBBox),s=l(t,o,e,this.toBBox),h=x(n,s),c=p(n)+p(s);h<i?(i=h,r=o,a=c<a?c:a):h===i&&c<a&&(a=c,r=o)}return r||e-n}_chooseSplitAxis(t,n,e){const r=t.leaf?this.compareMinX:f,i=t.leaf?this.compareMinY:m,a=this._allDistMargin(t,n,e,r),o=this._allDistMargin(t,n,e,i);a<o&&t.children.sort(r)}_allDistMargin(t,n,e,r){t.children.sort(r);const i=this.toBBox,a=l(t,0,n,i),o=l(t,e-n,e,i);let s=d(a)+d(o);for(let h=n;h<e-n;h++){const n=t.children[h];u(a,t.leaf?i(n):n),s+=d(a)}for(let h=e-n-1;h>=n;h--){const n=t.children[h];u(o,t.leaf?i(n):n),s+=d(o)}return s}_adjustParentBBoxes(t,n,e){for(let r=e;r>=0;r--)u(n[r],t)}_condense(t){for(let n,e=t.length-1;e>=0;e--)0===t[e].children.length?e>0?(n=t[e-1].children,n.splice(n.indexOf(t[e]),1)):this.clear():c(t[e],this.toBBox)}}function h(t,n,e){if(!e)return n.indexOf(t);for(let r=0;r<n.length;r++)if(e(t,n[r]))return r;return-1}function c(t,n){l(t,0,t.children.length,n,t)}function l(t,n,e,r,i){i||(i=y(null)),i.minX=1/0,i.minY=1/0,i.maxX=-1/0,i.maxY=-1/0;for(let a=n;a<e;a++){const n=t.children[a];u(i,t.leaf?r(n):n)}return i}function u(t,n){return t.minX=Math.min(t.minX,n.minX),t.minY=Math.min(t.minY,n.minY),t.maxX=Math.max(t.maxX,n.maxX),t.maxY=Math.max(t.maxY,n.maxY),t}function f(t,n){return t.minX-n.minX}function m(t,n){return t.minY-n.minY}function p(t){return(t.maxX-t.minX)*(t.maxY-t.minY)}function d(t){return t.maxX-t.minX+(t.maxY-t.minY)}function g(t,n){return(Math.max(n.maxX,t.maxX)-Math.min(n.minX,t.minX))*(Math.max(n.maxY,t.maxY)-Math.min(n.minY,t.minY))}function x(t,n){const e=Math.max(t.minX,n.minX),r=Math.max(t.minY,n.minY),i=Math.min(t.maxX,n.maxX),a=Math.min(t.maxY,n.maxY);return Math.max(0,i-e)*Math.max(0,a-r)}function M(t,n){return t.minX<=n.minX&&t.minY<=n.minY&&n.maxX<=t.maxX&&n.maxY<=t.maxY}function b(t,n){return n.minX<=t.maxX&&n.minY<=t.maxY&&n.maxX>=t.minX&&n.maxY>=t.minY}function y(t){return{children:t,height:1,leaf:!0,minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0}}function v(t,n,e,i,a){const o=[n,e];while(o.length){if(e=o.pop(),n=o.pop(),e-n<=i)continue;const s=n+Math.ceil((e-n)/i/2)*i;r(t,s,n,e,a),o.push(n,s,s,e)}}}}]);