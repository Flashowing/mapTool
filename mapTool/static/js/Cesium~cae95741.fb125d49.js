(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Cesium~cae95741"],{"195b":function(e,t,n){"use strict";var a=n("e20d"),o=n("a564"),r=n("d289"),d=n("c1f7"),u=n("ef54"),i=n("9693"),s=n("31ef"),c=n("9fb6"),l=n("2f63");const m={name:"CPUStylingPipelineStage",process:function(e,t,n){const m=e.model,f=e.shaderBuilder;f.addVertexLines([a["a"]]),f.addFragmentLines([o["a"]]),f.addDefine("USE_CPU_STYLING",void 0,u["a"].BOTH),Object(l["a"])(m.color)||(f.addUniform("float",s["a"].COLOR_BLEND_UNIFORM_NAME,u["a"].FRAGMENT),e.uniformMap[s["a"].COLOR_BLEND_UNIFORM_NAME]=function(){return d["a"].getColorBlend(m.colorBlendMode,m.colorBlendAmount)}),f.addUniform("bool","model_commandTranslucent",u["a"].BOTH),e.uniformMap.model_commandTranslucent=function(){return e.alphaOptions.pass===r["a"].TRANSLUCENT};const p=m.featureTables[m.featureTableId],T=i["a"].getStyleCommandsNeeded(p.featuresLength,p.batchTexture.translucentFeaturesLength);T!==i["a"].ALL_OPAQUE&&(e.alphaOptions.alphaMode=c["a"].BLEND),e.styleCommandsNeeded=T}};t["a"]=m},"5ecf":function(e,t,n){"use strict";var a=n("2bb9"),o=n("535a");const r={name:"BatchTexturePipelineStage",process:function(e,t,n){const r=e.shaderBuilder,d={},u=e.model,i=u.featureTables[u.featureTableId],s=i.featuresLength;r.addUniform("int","model_featuresLength"),d.model_featuresLength=function(){return s};const c=i.batchTexture;r.addUniform("sampler2D","model_batchTexture"),d.model_batchTexture=function(){return Object(o["a"])(c.batchTexture,c.defaultTexture)},r.addUniform("vec4","model_textureStep"),d.model_textureStep=function(){return c.textureStep},c.textureDimensions.y>1&&(r.addDefine("MULTILINE_BATCH_TEXTURE"),r.addUniform("vec2","model_textureDimensions"),d.model_textureDimensions=function(){return c.textureDimensions}),e.uniformMap=Object(a["a"])(d,e.uniformMap)}};t["a"]=r}}]);