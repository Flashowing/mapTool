define(["./Transforms-08771371","./Matrix2-47e98d76","./RuntimeError-8952249c","./defaultValue-81eec7ed","./ComponentDatatype-a15c9a19","./ArcType-fc72c06c","./arrayRemoveDuplicates-dc2f4046","./EllipsoidGeodesic-19e75e11","./EllipsoidRhumbLine-6145377b","./EncodedCartesian3-d9f5c4a4","./GeometryAttribute-64b853f6","./IntersectionTests-bc78300e","./Plane-3f01019d","./WebMercatorProjection-79b3214e","./_commonjsHelpers-3aae1032-26891ab7","./combine-3c023bda","./WebGLConstants-508b9636"],(function(e,t,a,n,i,r,s,o,l,c,u,C,p,d,h,g,f){"use strict";function m(a){a=n.defaultValue(a,n.defaultValue.EMPTY_OBJECT),this._ellipsoid=n.defaultValue(a.ellipsoid,t.Ellipsoid.WGS84),this._rectangle=n.defaultValue(a.rectangle,t.Rectangle.MAX_VALUE),this._projection=new e.GeographicProjection(this._ellipsoid),this._numberOfLevelZeroTilesX=n.defaultValue(a.numberOfLevelZeroTilesX,2),this._numberOfLevelZeroTilesY=n.defaultValue(a.numberOfLevelZeroTilesY,1)}Object.defineProperties(m.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},rectangle:{get:function(){return this._rectangle}},projection:{get:function(){return this._projection}}}),m.prototype.getNumberOfXTilesAtLevel=function(e){return this._numberOfLevelZeroTilesX<<e},m.prototype.getNumberOfYTilesAtLevel=function(e){return this._numberOfLevelZeroTilesY<<e},m.prototype.rectangleToNativeRectangle=function(e,a){const r=i.CesiumMath.toDegrees(e.west),s=i.CesiumMath.toDegrees(e.south),o=i.CesiumMath.toDegrees(e.east),l=i.CesiumMath.toDegrees(e.north);return n.defined(a)?(a.west=r,a.south=s,a.east=o,a.north=l,a):new t.Rectangle(r,s,o,l)},m.prototype.tileXYToNativeRectangle=function(e,t,a,n){const r=this.tileXYToRectangle(e,t,a,n);return r.west=i.CesiumMath.toDegrees(r.west),r.south=i.CesiumMath.toDegrees(r.south),r.east=i.CesiumMath.toDegrees(r.east),r.north=i.CesiumMath.toDegrees(r.north),r},m.prototype.tileXYToRectangle=function(e,a,i,r){const s=this._rectangle,o=this.getNumberOfXTilesAtLevel(i),l=this.getNumberOfYTilesAtLevel(i),c=s.width/o,u=e*c+s.west,C=(e+1)*c+s.west,p=s.height/l,d=s.north-a*p,h=s.north-(a+1)*p;return n.defined(r)||(r=new t.Rectangle(u,h,C,d)),r.west=u,r.south=h,r.east=C,r.north=d,r},m.prototype.positionToTileXY=function(e,a,r){const s=this._rectangle;if(!t.Rectangle.contains(s,e))return;const o=this.getNumberOfXTilesAtLevel(a),l=this.getNumberOfYTilesAtLevel(a),c=s.width/o,u=s.height/l;let C=e.longitude;s.east<s.west&&(C+=i.CesiumMath.TWO_PI);let p=(C-s.west)/c|0;p>=o&&(p=o-1);let d=(s.north-e.latitude)/u|0;return d>=l&&(d=l-1),n.defined(r)?(r.x=p,r.y=d,r):new t.Cartesian2(p,d)};const w=new t.Cartesian3,y=new t.Cartesian3,M=new t.Cartographic,T=new t.Cartesian3,E=new t.Cartesian3,_=new e.BoundingSphere,O=new m,b=[new t.Cartographic,new t.Cartographic,new t.Cartographic,new t.Cartographic],P=new t.Cartesian2,A={};function k(e){t.Cartographic.fromRadians(e.east,e.north,0,b[0]),t.Cartographic.fromRadians(e.west,e.north,0,b[1]),t.Cartographic.fromRadians(e.east,e.south,0,b[2]),t.Cartographic.fromRadians(e.west,e.south,0,b[3]);let a=0,n=0,i=0,r=0;const s=A._terrainHeightsMaxLevel;let o;for(o=0;o<=s;++o){let e=!1;for(let t=0;t<4;++t){const a=b[t];if(O.positionToTileXY(a,o,P),0===t)i=P.x,r=P.y;else if(i!==P.x||r!==P.y){e=!0;break}}if(e)break;a=i,n=r}if(0!==o)return{x:a,y:n,level:o>s?s:o-1}}A.initialize=function(){let t=A._initPromise;return n.defined(t)||(t=e.Resource.fetchJson(e.buildModuleUrl("Assets/approximateTerrainHeights.json")).then((function(e){A._terrainHeights=e})),A._initPromise=t),t},A.getMinimumMaximumHeights=function(e,a){a=n.defaultValue(a,t.Ellipsoid.WGS84);const i=k(e);let r=A._defaultMinTerrainHeight,s=A._defaultMaxTerrainHeight;if(n.defined(i)){const o=`${i.level}-${i.x}-${i.y}`,l=A._terrainHeights[o];n.defined(l)&&(r=l[0],s=l[1]),a.cartographicToCartesian(t.Rectangle.northeast(e,M),w),a.cartographicToCartesian(t.Rectangle.southwest(e,M),y),t.Cartesian3.midpoint(y,w,T);const c=a.scaleToGeodeticSurface(T,E);if(n.defined(c)){const e=t.Cartesian3.distance(T,c);r=Math.min(r,-e)}else r=A._defaultMinTerrainHeight}return r=Math.max(A._defaultMinTerrainHeight,r),{minimumTerrainHeight:r,maximumTerrainHeight:s}},A.getBoundingSphere=function(a,i){i=n.defaultValue(i,t.Ellipsoid.WGS84);const r=k(a);let s=A._defaultMaxTerrainHeight;if(n.defined(r)){const e=`${r.level}-${r.x}-${r.y}`,t=A._terrainHeights[e];n.defined(t)&&(s=t[1])}const o=e.BoundingSphere.fromRectangle3D(a,i,0);return e.BoundingSphere.fromRectangle3D(a,i,s,_),e.BoundingSphere.union(o,_,o)},A._terrainHeightsMaxLevel=6,A._defaultMaxTerrainHeight=9e3,A._defaultMinTerrainHeight=-1e5,A._terrainHeights=void 0,A._initPromise=void 0,Object.defineProperties(A,{initialized:{get:function(){return n.defined(A._terrainHeights)}}});const L=[e.GeographicProjection,d.WebMercatorProjection],S=L.length,x=Math.cos(i.CesiumMath.toRadians(30)),I=Math.cos(i.CesiumMath.toRadians(150));function N(e){const a=(e=n.defaultValue(e,n.defaultValue.EMPTY_OBJECT)).positions;this.width=n.defaultValue(e.width,1),this._positions=a,this.granularity=n.defaultValue(e.granularity,9999),this.loop=n.defaultValue(e.loop,!1),this.arcType=n.defaultValue(e.arcType,r.ArcType.GEODESIC),this._ellipsoid=t.Ellipsoid.WGS84,this._projectionIndex=0,this._workerName="createGroundPolylineGeometry",this._scene3DOnly=!1}Object.defineProperties(N.prototype,{packedLength:{get:function(){return 1+3*this._positions.length+1+1+1+t.Ellipsoid.packedLength+1+1}}}),N.setProjectionAndEllipsoid=function(e,t){let a=0;for(let e=0;e<S;e++)if(t instanceof L[e]){a=e;break}e._projectionIndex=a,e._ellipsoid=t.ellipsoid};const R=new t.Cartesian3,D=new t.Cartesian3,v=new t.Cartesian3;function z(e,a,n,i,r){const s=F(i,e,0,R),o=F(i,e,n,D),l=F(i,a,0,v),c=q(o,s,D),u=q(l,s,v);return t.Cartesian3.cross(u,c,r),t.Cartesian3.normalize(r,r)}const H=new t.Cartographic,j=new t.Cartesian3,B=new t.Cartesian3,V=new t.Cartesian3;function G(e,a,n,i,s,c,u,C,p,d,h){if(0===s)return;let g;c===r.ArcType.GEODESIC?g=new o.EllipsoidGeodesic(e,a,u):c===r.ArcType.RHUMB&&(g=new l.EllipsoidRhumbLine(e,a,u));const f=g.surfaceDistance;if(f<s)return;const m=z(e,a,i,u,V),w=Math.ceil(f/s),y=f/w;let M=y;const T=w-1;let E=C.length;for(let e=0;e<T;e++){const e=g.interpolateUsingSurfaceDistance(M,H),a=F(u,e,n,j),r=F(u,e,i,B);t.Cartesian3.pack(m,C,E),t.Cartesian3.pack(a,p,E),t.Cartesian3.pack(r,d,E),h.push(e.latitude),h.push(e.longitude),E+=3,M+=y}}const Y=new t.Cartographic;function F(e,a,n,i){return t.Cartographic.clone(a,Y),Y.height=n,t.Cartographic.toCartesian(Y,e,i)}function q(e,a,n){return t.Cartesian3.subtract(e,a,n),t.Cartesian3.normalize(n,n),n}function X(e,a,n,i){return i=q(e,a,i),i=t.Cartesian3.cross(i,n,i),i=t.Cartesian3.normalize(i,i),i=t.Cartesian3.cross(n,i,i)}N.pack=function(e,a,i){let r=n.defaultValue(i,0);const s=e._positions,o=s.length;a[r++]=o;for(let e=0;e<o;++e){const n=s[e];t.Cartesian3.pack(n,a,r),r+=3}return a[r++]=e.granularity,a[r++]=e.loop?1:0,a[r++]=e.arcType,t.Ellipsoid.pack(e._ellipsoid,a,r),r+=t.Ellipsoid.packedLength,a[r++]=e._projectionIndex,a[r++]=e._scene3DOnly?1:0,a},N.unpack=function(e,a,i){let r=n.defaultValue(a,0);const s=e[r++],o=new Array(s);for(let a=0;a<s;a++)o[a]=t.Cartesian3.unpack(e,r),r+=3;const l=e[r++],c=1===e[r++],u=e[r++],C=t.Ellipsoid.unpack(e,r);r+=t.Ellipsoid.packedLength;const p=e[r++],d=1===e[r++];return n.defined(i)||(i=new N({positions:o})),i._positions=o,i.granularity=l,i.loop=c,i.arcType=u,i._ellipsoid=C,i._projectionIndex=p,i._scene3DOnly=d,i};const W=new t.Cartesian3,U=new t.Cartesian3,Z=new t.Cartesian3,$=new t.Cartesian3;function J(e,a,n,r,s){const o=q(n,a,$),l=X(e,a,o,W),c=X(r,a,o,U);if(i.CesiumMath.equalsEpsilon(t.Cartesian3.dot(l,c),-1,i.CesiumMath.EPSILON5))return s=t.Cartesian3.cross(o,l,s),s=t.Cartesian3.normalize(s,s);s=t.Cartesian3.add(c,l,s),s=t.Cartesian3.normalize(s,s);const u=t.Cartesian3.cross(o,s,Z);return t.Cartesian3.dot(c,u)<0&&(s=t.Cartesian3.negate(s,s)),s}const Q=p.Plane.fromPointNormal(t.Cartesian3.ZERO,t.Cartesian3.UNIT_Y),K=new t.Cartesian3,ee=new t.Cartesian3,te=new t.Cartesian3,ae=new t.Cartesian3,ne=new t.Cartesian3,ie=new t.Cartesian3,re=new t.Cartographic,se=new t.Cartographic,oe=new t.Cartographic;N.createGeometry=function(a){const o=!a._scene3DOnly;let p=a.loop;const d=a._ellipsoid,h=a.granularity,g=a.arcType,f=new L[a._projectionIndex](d),m=1e3;let w,y;const M=a._positions,T=M.length;let E,_,O,b;2===T&&(p=!1);const P=new l.EllipsoidRhumbLine(void 0,void 0,d);let k,S,I;const N=[M[0]];for(y=0;y<T-1;y++)E=M[y],_=M[y+1],k=C.IntersectionTests.lineSegmentPlane(E,_,Q,ie),!n.defined(k)||t.Cartesian3.equalsEpsilon(k,E,i.CesiumMath.EPSILON7)||t.Cartesian3.equalsEpsilon(k,_,i.CesiumMath.EPSILON7)||(a.arcType===r.ArcType.GEODESIC?N.push(t.Cartesian3.clone(k)):a.arcType===r.ArcType.RHUMB&&(I=d.cartesianToCartographic(k,re).longitude,O=d.cartesianToCartographic(E,re),b=d.cartesianToCartographic(_,se),P.setEndPoints(O,b),S=P.findIntersectionWithLongitude(I,oe),k=d.cartographicToCartesian(S,ie),!n.defined(k)||t.Cartesian3.equalsEpsilon(k,E,i.CesiumMath.EPSILON7)||t.Cartesian3.equalsEpsilon(k,_,i.CesiumMath.EPSILON7)||N.push(t.Cartesian3.clone(k)))),N.push(_);p&&(E=M[T-1],_=M[0],k=C.IntersectionTests.lineSegmentPlane(E,_,Q,ie),!n.defined(k)||t.Cartesian3.equalsEpsilon(k,E,i.CesiumMath.EPSILON7)||t.Cartesian3.equalsEpsilon(k,_,i.CesiumMath.EPSILON7)||(a.arcType===r.ArcType.GEODESIC?N.push(t.Cartesian3.clone(k)):a.arcType===r.ArcType.RHUMB&&(I=d.cartesianToCartographic(k,re).longitude,O=d.cartesianToCartographic(E,re),b=d.cartesianToCartographic(_,se),P.setEndPoints(O,b),S=P.findIntersectionWithLongitude(I,oe),k=d.cartographicToCartesian(S,ie),!n.defined(k)||t.Cartesian3.equalsEpsilon(k,E,i.CesiumMath.EPSILON7)||t.Cartesian3.equalsEpsilon(k,_,i.CesiumMath.EPSILON7)||N.push(t.Cartesian3.clone(k)))));let R=N.length,D=new Array(R);for(y=0;y<R;y++){const e=t.Cartographic.fromCartesian(N[y],d);e.height=0,D[y]=e}if(D=s.arrayRemoveDuplicates(D,t.Cartographic.equalsEpsilon),R=D.length,R<2)return;const v=[],H=[],j=[],B=[];let V=K,Y=ee,X=te,W=ae,U=ne;const Z=D[0],$=D[1];for(V=F(d,D[R-1],0,V),W=F(d,$,0,W),Y=F(d,Z,0,Y),X=F(d,Z,m,X),U=p?J(V,Y,X,W,U):z(Z,$,m,d,U),t.Cartesian3.pack(U,H,0),t.Cartesian3.pack(Y,j,0),t.Cartesian3.pack(X,B,0),v.push(Z.latitude),v.push(Z.longitude),G(Z,$,0,m,h,g,d,H,j,B,v),y=1;y<R-1;++y){V=t.Cartesian3.clone(Y,V),Y=t.Cartesian3.clone(W,Y);const e=D[y];F(d,e,m,X),F(d,D[y+1],0,W),J(V,Y,X,W,U),w=H.length,t.Cartesian3.pack(U,H,w),t.Cartesian3.pack(Y,j,w),t.Cartesian3.pack(X,B,w),v.push(e.latitude),v.push(e.longitude),G(D[y],D[y+1],0,m,h,g,d,H,j,B,v)}const le=D[R-1],ce=D[R-2];if(Y=F(d,le,0,Y),X=F(d,le,m,X),p){const e=D[0];V=F(d,ce,0,V),W=F(d,e,0,W),U=J(V,Y,X,W,U)}else U=z(ce,le,m,d,U);if(w=H.length,t.Cartesian3.pack(U,H,w),t.Cartesian3.pack(Y,j,w),t.Cartesian3.pack(X,B,w),v.push(le.latitude),v.push(le.longitude),p){for(G(le,Z,0,m,h,g,d,H,j,B,v),w=H.length,y=0;y<3;++y)H[w+y]=H[y],j[w+y]=j[y],B[w+y]=B[y];v.push(Z.latitude),v.push(Z.longitude)}return function(a,n,r,s,o,l,C){let p,d;const h=n._ellipsoid,g=r.length/3-1,f=8*g,m=4*f,w=36*g,y=f>65535?new Uint32Array(w):new Uint16Array(w),M=new Float64Array(3*f),T=new Float32Array(m),E=new Float32Array(m),_=new Float32Array(m),O=new Float32Array(m),b=new Float32Array(m);let P,k,L,S;C&&(P=new Float32Array(m),k=new Float32Array(m),L=new Float32Array(m),S=new Float32Array(2*f));const I=l.length/2;let N=0;const R=Ee;R.height=0;const D=_e;D.height=0;let v=Oe,z=be;if(C)for(d=0,p=1;p<I;p++)R.latitude=l[d],R.longitude=l[d+1],D.latitude=l[d+2],D.longitude=l[d+3],v=n.project(R,v),z=n.project(D,z),N+=t.Cartesian3.distance(v,z),d+=2;const H=s.length/3;z=t.Cartesian3.unpack(s,0,z);let j,B=0;for(d=3,p=1;p<H;p++)v=t.Cartesian3.clone(z,v),z=t.Cartesian3.unpack(s,d,z),B+=t.Cartesian3.distance(v,z),d+=3;d=3;let V=0,G=0,Y=0,F=0,X=!1,W=t.Cartesian3.unpack(r,0,Ae),U=t.Cartesian3.unpack(s,0,be),Z=t.Cartesian3.unpack(o,0,Le);if(a){Ce(Z,t.Cartesian3.unpack(r,r.length-6,Pe),W,U)&&(Z=t.Cartesian3.negate(Z,Z))}let $=0,J=0,Q=0;for(p=0;p<g;p++){const e=t.Cartesian3.clone(W,Pe),a=t.Cartesian3.clone(U,Oe);let u,p,g,f,m=t.Cartesian3.clone(Z,ke);if(X&&(m=t.Cartesian3.negate(m,m)),W=t.Cartesian3.unpack(r,d,Ae),U=t.Cartesian3.unpack(s,d,be),Z=t.Cartesian3.unpack(o,d,Le),X=Ce(Z,e,W,U),R.latitude=l[V],R.longitude=l[V+1],D.latitude=l[V+2],D.longitude=l[V+3],C){const e=Te(R,D);u=n.project(R,ve),p=n.project(D,ze);const a=q(p,u,Ue);a.y=Math.abs(a.y),g=He,f=je,0===e||t.Cartesian3.dot(a,t.Cartesian3.UNIT_Y)>x?(g=ge(n,R,m,u,He),f=ge(n,D,Z,p,je)):1===e?(f=ge(n,D,Z,p,je),g.x=0,g.y=i.CesiumMath.sign(R.longitude-Math.abs(D.longitude)),g.z=0):(g=ge(n,R,m,u,He),f.x=0,f.y=i.CesiumMath.sign(R.longitude-D.longitude),f.z=0)}const w=t.Cartesian3.distance(a,U),y=c.EncodedCartesian3.fromCartesian(e,Xe),I=t.Cartesian3.subtract(W,e,Be),v=t.Cartesian3.normalize(I,Ye);let z=t.Cartesian3.subtract(a,e,Ve);z=t.Cartesian3.normalize(z,z);let H=t.Cartesian3.cross(v,z,Ye);H=t.Cartesian3.normalize(H,H);let K=t.Cartesian3.cross(z,m,Fe);K=t.Cartesian3.normalize(K,K);let ee=t.Cartesian3.subtract(U,W,Ge);ee=t.Cartesian3.normalize(ee,ee);let te=t.Cartesian3.cross(Z,ee,qe);te=t.Cartesian3.normalize(te,te);const ae=w/B,ne=$/B;let ie,re,se,oe=0,le=0,ce=0;if(C){oe=t.Cartesian3.distance(u,p),ie=c.EncodedCartesian3.fromCartesian(u,We),re=t.Cartesian3.subtract(p,u,Ue),se=t.Cartesian3.normalize(re,Ze);const e=se.x;se.x=se.y,se.y=-e,le=oe/N,ce=J/N}for(j=0;j<8;j++){const e=F+4*j,a=G+2*j,n=e+3,i=j<4?1:-1,r=2===j||3===j||6===j||7===j?1:-1;t.Cartesian3.pack(y.high,T,e),T[n]=I.x,t.Cartesian3.pack(y.low,E,e),E[n]=I.y,t.Cartesian3.pack(K,_,e),_[n]=I.z,t.Cartesian3.pack(te,O,e),O[n]=ae*i,t.Cartesian3.pack(H,b,e);let s=ne*r;0===s&&r<0&&(s=9),b[n]=s,C&&(P[e]=ie.high.x,P[e+1]=ie.high.y,P[e+2]=ie.low.x,P[e+3]=ie.low.y,L[e]=-g.y,L[e+1]=g.x,L[e+2]=f.y,L[e+3]=-f.x,k[e]=re.x,k[e+1]=re.y,k[e+2]=se.x,k[e+3]=se.y,S[a]=le*i,s=ce*r,0===s&&r<0&&(s=9),S[a+1]=s)}const ue=Re,pe=De,de=Ie,he=Ne,fe=t.Rectangle.fromCartographicArray(Se,xe),me=A.getMinimumMaximumHeights(fe,h),ye=me.minimumTerrainHeight,Ee=me.maximumTerrainHeight;Q+=ye,Q+=Ee,we(e,a,ye,Ee,ue,de),we(W,U,ye,Ee,pe,he);let _e=t.Cartesian3.multiplyByScalar(H,i.CesiumMath.EPSILON5,$e);t.Cartesian3.add(ue,_e,ue),t.Cartesian3.add(pe,_e,pe),t.Cartesian3.add(de,_e,de),t.Cartesian3.add(he,_e,he),Me(ue,pe),Me(de,he),t.Cartesian3.pack(ue,M,Y),t.Cartesian3.pack(pe,M,Y+3),t.Cartesian3.pack(he,M,Y+6),t.Cartesian3.pack(de,M,Y+9),_e=t.Cartesian3.multiplyByScalar(H,-2*i.CesiumMath.EPSILON5,$e),t.Cartesian3.add(ue,_e,ue),t.Cartesian3.add(pe,_e,pe),t.Cartesian3.add(de,_e,de),t.Cartesian3.add(he,_e,he),Me(ue,pe),Me(de,he),t.Cartesian3.pack(ue,M,Y+12),t.Cartesian3.pack(pe,M,Y+15),t.Cartesian3.pack(he,M,Y+18),t.Cartesian3.pack(de,M,Y+21),V+=2,d+=3,G+=16,Y+=24,F+=32,$+=w,J+=oe}d=0;let K=0;for(p=0;p<g;p++){for(j=0;j<Ke;j++)y[d+j]=Qe[j]+K;K+=8,d+=Ke}const ee=Je;e.BoundingSphere.fromVertices(r,t.Cartesian3.ZERO,3,ee[0]),e.BoundingSphere.fromVertices(s,t.Cartesian3.ZERO,3,ee[1]);const te=e.BoundingSphere.fromBoundingSpheres(ee);te.radius+=Q/(2*g);const ae={position:new u.GeometryAttribute({componentDatatype:i.ComponentDatatype.DOUBLE,componentsPerAttribute:3,normalize:!1,values:M}),startHiAndForwardOffsetX:et(T),startLoAndForwardOffsetY:et(E),startNormalAndForwardOffsetZ:et(_),endNormalAndTextureCoordinateNormalizationX:et(O),rightNormalAndTextureCoordinateNormalizationY:et(b)};C&&(ae.startHiLo2D=et(P),ae.offsetAndRight2D=et(k),ae.startEndNormals2D=et(L),ae.texcoordNormalization2D=new u.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:2,normalize:!1,values:S}));return new u.Geometry({attributes:ae,indices:y,boundingSphere:te})}(p,f,j,B,H,v,o)};const le=new t.Cartesian3,ce=new t.Matrix3,ue=new e.Quaternion;function Ce(a,n,r,s){const o=q(r,n,le),l=t.Cartesian3.dot(o,a);if(l>x||l<I){const n=q(s,r,$),o=l<I?i.CesiumMath.PI_OVER_TWO:-i.CesiumMath.PI_OVER_TWO,c=e.Quaternion.fromAxisAngle(n,o,ue),u=t.Matrix3.fromQuaternion(c,ce);return t.Matrix3.multiplyByVector(u,a,a),!0}return!1}const pe=new t.Cartographic,de=new t.Cartesian3,he=new t.Cartesian3;function ge(e,a,n,r,s){const o=t.Cartographic.toCartesian(a,e._ellipsoid,de);let l=t.Cartesian3.add(o,n,he),c=!1;const u=e._ellipsoid;let C=u.cartesianToCartographic(l,pe);Math.abs(a.longitude-C.longitude)>i.CesiumMath.PI_OVER_TWO&&(c=!0,l=t.Cartesian3.subtract(o,n,he),C=u.cartesianToCartographic(l,pe)),C.height=0;const p=e.project(C,s);return(s=t.Cartesian3.subtract(p,r,s)).z=0,s=t.Cartesian3.normalize(s,s),c&&t.Cartesian3.negate(s,s),s}const fe=new t.Cartesian3,me=new t.Cartesian3;function we(e,a,n,i,r,s){const o=t.Cartesian3.subtract(a,e,fe);t.Cartesian3.normalize(o,o);const l=n-0;let c=t.Cartesian3.multiplyByScalar(o,l,me);t.Cartesian3.add(e,c,r);const u=i-1e3;c=t.Cartesian3.multiplyByScalar(o,u,me),t.Cartesian3.add(a,c,s)}const ye=new t.Cartesian3;function Me(e,a){const n=p.Plane.getPointDistance(Q,e),r=p.Plane.getPointDistance(Q,a);let s=ye;i.CesiumMath.equalsEpsilon(n,0,i.CesiumMath.EPSILON2)?(s=q(a,e,s),t.Cartesian3.multiplyByScalar(s,i.CesiumMath.EPSILON2,s),t.Cartesian3.add(e,s,e)):i.CesiumMath.equalsEpsilon(r,0,i.CesiumMath.EPSILON2)&&(s=q(e,a,s),t.Cartesian3.multiplyByScalar(s,i.CesiumMath.EPSILON2,s),t.Cartesian3.add(a,s,a))}function Te(e,t){const a=Math.abs(e.longitude),n=Math.abs(t.longitude);if(i.CesiumMath.equalsEpsilon(a,i.CesiumMath.PI,i.CesiumMath.EPSILON11)){const n=i.CesiumMath.sign(t.longitude);return e.longitude=n*(a-i.CesiumMath.EPSILON11),1}if(i.CesiumMath.equalsEpsilon(n,i.CesiumMath.PI,i.CesiumMath.EPSILON11)){const a=i.CesiumMath.sign(e.longitude);return t.longitude=a*(n-i.CesiumMath.EPSILON11),2}return 0}const Ee=new t.Cartographic,_e=new t.Cartographic,Oe=new t.Cartesian3,be=new t.Cartesian3,Pe=new t.Cartesian3,Ae=new t.Cartesian3,ke=new t.Cartesian3,Le=new t.Cartesian3,Se=[Ee,_e],xe=new t.Rectangle,Ie=new t.Cartesian3,Ne=new t.Cartesian3,Re=new t.Cartesian3,De=new t.Cartesian3,ve=new t.Cartesian3,ze=new t.Cartesian3,He=new t.Cartesian3,je=new t.Cartesian3,Be=new t.Cartesian3,Ve=new t.Cartesian3,Ge=new t.Cartesian3,Ye=new t.Cartesian3,Fe=new t.Cartesian3,qe=new t.Cartesian3,Xe=new c.EncodedCartesian3,We=new c.EncodedCartesian3,Ue=new t.Cartesian3,Ze=new t.Cartesian3,$e=new t.Cartesian3,Je=[new e.BoundingSphere,new e.BoundingSphere],Qe=[0,2,1,0,3,2,0,7,3,0,4,7,0,5,4,0,1,5,5,7,4,5,6,7,5,2,6,5,1,2,3,6,2,3,7,6],Ke=Qe.length;function et(e){return new u.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:4,normalize:!1,values:e})}return N._projectNormal=ge,function(e,t){return A.initialize().then((function(){return n.defined(t)&&(e=N.unpack(e,t)),N.createGeometry(e)}))}}));
