// edge.preload.js - version 0.1.4 - Edge Release 1.0
//
// Copyright (c) 2010. Adobe Systems Incorporated.
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//   * Redistributions of source code must retain the above copyright notice,
//     this list of conditions and the following disclaimer.
//   * Redistributions in binary form must reproduce the above copyright notice,
//     this list of conditions and the following disclaimer in the documentation
//     and/or other materials provided with the distribution.
//   * Neither the name of Adobe Systems Incorporated nor the names of its
//     contributors may be used to endorse or promote products derived from this
//     software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.
//
// Support for Edge preloader. This is copied into a composition's preloader file.

// Modernizr 2.5.3 | MIT & BSD
var testEle = document.createElement( 'div' );
function isSupported( props ) {
    var s = testEle.style, p;
    for ( i = 0; i < props.length; i++ ) {
        p = props[i];
        if ( s[p] !== undefined ) {
            return true;
        }
    }
    return false;
}
function supportsRGBA() {
    testEle.cssText = 'background-color:rgba(150,255,150,.5)';
    var sTest = '' + testEle.style.backgroundColor;
    if(sTest.indexOf('rgba') == 0) {
        return true;
    }
    return false;
}
var hasTransform = isSupported( ['transformProperty', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform'] );
var hasSVG = (!!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect);
var hasRGBA = supportsRGBA();
var hasJSON = window.JSON && window.JSON.parse && window.JSON.stringify;
var readyToPlay = false;

function safeColor(sVal) {
    sVal = '' + sVal;
    if(!hasRGBA && sVal.indexOf('rgba') == 0) {
        var iPos = sVal.lastIndexOf(',');
        if(iPos > 0) {
            sVal = 'rgb(' + sVal.substring(5, iPos) + ')';
        }
    }
    return sVal;
}

AdobeEdge._preloaders = AdobeEdge._preloaders || [];
AdobeEdge._preloaders.push(function () {
    if (filesToLoad) {
        loadResources(filesToLoad);
        filesToLoad=undefined;
    }
});

function doLoadResources() {
    for (var i = 0; i < AdobeEdge._preloaders.length; i++) {
        AdobeEdge._preloaders[i]();
    }
}

AdobeEdge._readyplayers = AdobeEdge._readyplayers || [];
AdobeEdge._readyplayers.push(function () {
    if (readyToPlay) {
        AdobeEdge.okToLaunchComposition(compId);
    }
});

function playWhenReady() {
    AdobeEdge._playWhenReady = true;
    for (var i = 0; i < AdobeEdge._readyplayers.length; i++) {
        AdobeEdge._readyplayers[i]();
    }
}

function edgeCallback( url, result, key ) {
    
    if(htFallbacks[url]) {
        url = htFallbacks[url];
    }
    
    AdobeEdge.preload.got[url] = true;
    if ( url == AdobeEdge.preload.last ) {
        
        if (!AdobeEdge.bootstrapLoading || AdobeEdge._playWhenReady) {    
            AdobeEdge.okToLaunchComposition(compId);
        }
        else {
            readyToPlay = true;
        }
        AdobeEdge.preload.busy = false;
        
        
        // When is this ever positive???
        if ( AdobeEdge.preload.q.length > 0 ) {
            var req = AdobeEdge.preload.q.pop();
            AdobeEdge.requestResources( req.files, req.callback );
        }
    }
}
AdobeEdge.requestResources = AdobeEdge.requestResources || function( files, cb ) {
    AdobeEdge.yepnope.errorTimeout = 4000;
    AdobeEdge.preload.busy = true;
    AdobeEdge.preload.got = AdobeEdge.preload.got || {};
    var i, f, len = files.length, a = [], o;
    for ( i = 0; i < len; i++ ) {
        o = files[i];
        if(typeof o === "string") {
            url = o;
            o = {load: url};
        }
        else {
            url = o.yep || o.load;
            if(o.callback) {
                var fnCb = o.callback;
                o.callback=function(u,r,k){
                    if(fnCb(u,r,k)) {
                        cb(u,r,k);
                    }
                };
            }
        }
        if(!o.callback) {
            o.callback = cb;
        }        
        if ( !AdobeEdge.preload.got[url] ) {
            a.push( o );
            AdobeEdge.preload.last = url;
        }
    }
    if ( a.length ) {
        AdobeEdge.yepnope( a );
    }
}

var filesToLoad, dlContent, preContent, doDelayLoad, signaledLoading, loadingEvt, requiresSVG, htLookup={}, aLoader, aEffectors;

function loadResources( files, delayLoad ) {
    AdobeEdge.preload = AdobeEdge.preload || [];
    AdobeEdge.preload.q = AdobeEdge.preload.q || [];
    if(delayLoad || !isCapable()){
        filesToLoad = files;
        return;
    }
    if ( !AdobeEdge.preload.busy ) {
        AdobeEdge.requestResources( files, edgeCallback );
    } else {
        AdobeEdge.preload.q.push( {files: files, callback: edgeCallback} );
    }
}

function splitUnits(s)
{
	var o = {};
    o.num = parseFloat(s);
    if (typeof(s) == "string") {
		o.units = s.match(/[a-zA-Z%]+$/);
    }
    if(o.units && typeof o.units == 'object')
        o.units = o.units[0];
    return o;
}

function defaultUnits(s)
{
	var val = s;
	if (s !== "auto") {
		var oS = splitUnits(s);
		if (!oS || !oS.units) {
			val = val + "px";
		}
	}
	return val;
}

//find node with class
function findNWC(node, cls) {
    
    if (String(node.className).indexOf(cls) != -1) {
        return node;
    }
    var c = node.childNodes;
    for(var i=0; i<c.length; i++) {
        var ret = findNWC(c[i], cls);
        if(ret != false) {
            return ret;
        }
    }
    return false;
}

function simpleContent(dom, cls, stg) {
	
    var oB = document.getElementsByTagName('body')[0],
        oS = stg || findNWC(oB, compId),
        oN, eN, iL, iT, s, f;
    
    if(!oS) {
        oS = oB;
    }
    else {
        if(oS.style.position != 'absolute' && oS.style.position != 'relative') {
            oS.style.position = 'relative';
        }
    }
    
	for(var i=0;i<dom.length;i++) {
		oN = dom[i];
        if(oN.type == "image") {
            eN = document.createElement("img");
            eN.src=oN.fill[1];
        }
        else {
            eN = document.createElement("div");
        }
        eN.id = oN.id;
        s = eN.style;
        
        if(oN.type == "text") {
            f = oN.font;
            if(f) {
                if(f[0] && f[0] !== "") {
                    s.fontFamily=f[0];
                }
                if(typeof(f[1]) != "object") {
                    f[1] = [f[1]];
                }
                if(!f[1][1]) {
                    f[1][1] = "px";
                }
                if(f[1][0] && f[1][0] !== "") {
                    s.fontSize=f[1][0] + f[1][1];
                }
                if(f[2] && f[2] !== "") {
                    s.color=safeColor(f[2]);
                }
                if(f[3] && f[3] !== "") {
                    s.fontWeight = f[3];
                }
                if(f[4] && f[4] !== "") {
                    s.textDecoration=oN.font[4];
                }
                if(f[5] && f[5] !== "") {
                    s.fontStyle=oN.font[5];
                }
            }
            if(oN.align && oN.align != 'auto') {
                s.textAlign=oN.align;
            }
            if(oN.position) {
                s.position=oN.position;
            }
            if((!oN.rect[2] || oN.rect[2] <= 0) && (!oN.rect[3] || oN.rect[3] <= 0)) {
                s.whiteSpace="nowrap";
            }
            //eN.appendChild(document.createTextNode(oN.text));
            eN.innerHTML = oN.text;
        }
		if(cls) {
			eN.className=cls;
		}
        s.position='absolute';
		
		iL = oN.rect[0];
		iT = oN.rect[1];
		if(oN.transform && oN.transform[0]) {
			var transformX = oN.transform[0][0];
			var oTransformX = splitUnits(transformX);
			if (oTransformX && oTransformX.units) {
				transformX = oTransformX.num; 	
				if (oTransformX.units == "%" && oN.rect[2]) {
					var width = oN.rect[2];
					var oWidth = splitUnits(oN.rect[2]);
					if (oWidth && oWidth.units) {
						width = oWidth.num;
						if (oWidth.units == "%") {
							width = width/100 * oS.offsetWidth;
						}
					}
					transformX = transformX/100 * width;
					if (oS.offsetWidth > 0)
						transformX = transformX/oS.offsetWidth * 100; 
				}
			}
			var oL = splitUnits(iL);
			//if (oL && oL.units) {
            if (oL) {
				iL = oL.num;
			}
			iL += transformX;
			if (!oL.units) oL.units = "px";
			iL = iL + oL.units;
			
            if(oN.transform[0].length > 1) {
				var transformY = oN.transform[0][1];
				var oTransformY = splitUnits(transformY);
				if (oTransformY && oTransformY.units) {
					transformY = oTransformY.num; 	
					if (oTransformY.units == "%" && oN.rect[3]) {
						var height = oN.rect[3];
						var oHeight = splitUnits(oN.rect[3]);
						if (oHeight && oHeight.units) {
							height = oHeight.num;
							if (oHeight.units == "%") {
								height = height/100 * oS.offsetHeight;
							}
						}
						transformY = transformY/100 * height;
						if (oS.offsetHeight > 0)
							transformY = transformY/oS.offsetHeight * 100; 
					}
				}

				var oT = splitUnits(iT);
				//if (oT && oT.units) {
                if (oT) {
					iT = oT.num;
				}
				iT += transformY;
				if (!oT.units) oT.units = "px";
				iT = iT + oT.units;
            }
		}
		
		s.left=defaultUnits(iL);
		s.top=defaultUnits(iT);
		s.width=defaultUnits(oN.rect[2]);
		s.height=defaultUnits(oN.rect[3]);
		if(oN.linkURL) {
            htLookup[eN.id] = oN;
			eN.onclick=function() {
                var oNE = htLookup[this.id];
				if(oNE.linkTarget) {
					window.open(oNE.linkURL, oNE.linkTarget);
				}
				else {
                    window.location.href=oNE.linkURL;
				}
			};
			s.cursor="pointer";
        }
        
        oS.appendChild(eN);
        
        if(oN.c) {
            for(var j=0;j<oN.c.length;j++) {
                simpleContent(oN.c[j], cls, eN);
            }
        }
        
//        oS.appendChild(eN);
	}
}

var fnCycle = function(e) {
    if(!e) {
        e={event:'loading', progress:0}
    }
    else {
        if(fnCycle) {
            setTimeout(fnCycle, 20);
        }
    }
    if(loadingEvt) {
        loadingEvt(e);
    }
};

var aBootcompsLoaded = [];
if(!window.AdobeEdge.bootstrapListeners) {
    window.AdobeEdge.bootstrapListeners=[];
}
window.AdobeEdge.bootstrapCallback=function(fnCallback) {
    window.AdobeEdge.bootstrapListeners.push(fnCallback);
    if(aBootcompsLoaded.length > 0) {
        for(var i=0;i<aBootcompsLoaded.length;i++) {
            fnCallback(aBootcompsLoaded[i]);
        }
    }
};

if(!window.AdobeEdge.preloadComplete) {
	window.AdobeEdge.preloadComplete = {};
}
window.AdobeEdge.preloadComplete[compId]=function(sCompId) {
    AdobeEdge.$_(".edgePreload" + sCompId).css("display", "none");
    fnCycle = null;
    if(loadingEvt) {
        loadingEvt({event:'done', progress:1, reason:'complete'});
    }
    aBootcompsLoaded.push(sCompId);
    var len = window.AdobeEdge.bootstrapListeners.length;
    for (var i = 0; i < len; i++) {
        try {
            window.AdobeEdge.bootstrapListeners[i](sCompId);
        }
        catch(e) {
            console.log("bootstrap error " + e);
        }
    }
};

function isCapable() {
    if(hasTransform) {
        if(requiresSVG && !hasSVG) {
            return false;
        }
        return true;        
    }
    return false;
}


function onDocLoaded( e ) {
    window.AdobeEdge.loaded = true;
    
    fnCycle({event:'begin'});
    
    if(!isCapable()) { 
		if(dlContent && dlContent.dom){
            if(loadingEvt) {
                loadingEvt({event:'done', progress:1, reason:'downlevel'});
            }
			simpleContent(dlContent.dom);
		}
	}
	else {
		if(preContent && preContent.dom){
			simpleContent(preContent.dom, "edgePreload" + compId);
		}
		if(filesToLoad && !signaledLoading){
			loadResources(filesToLoad);
			filesToLoad = undefined;
		}
	}
}
