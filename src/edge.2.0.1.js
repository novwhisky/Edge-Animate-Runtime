// Copyright (c) 2011-2013. Adobe Systems Incorporated.
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
// Version 2.0.1


// Filename: edge.js

/* global Zepto: true
*/
/* global jQuery: true
*/
/* global jq: true
*/

window.AdobeEdge = window.AdobeEdge || {};


(function(){
    "use strict";
    var framework = window.AdobeEdge.framework, AdobeEdge = window.AdobeEdge;

    if ( framework) {
        if ( framework === "zepto" ) {
            AdobeEdge.$_ = window.Zepto;
        } else if (framework === "jqmobi") {
            var jq = window.jq;
            AdobeEdge.$_ = jq;
            var canAutoCamelize = function (){
                var ele = document.createElement('div');
                ele.style['background-color'] = "rgb(255, 255, 255)";
                return ele.style.backgroundColor === "rgb(255, 255, 255)";
            }
            // Monkey patch the css method to camel case for FF or others that don't accept hyphens
            if(!canAutoCamelize()){
                var camelize = function(str) {
                    return str.replace(/^-ms-/, "ms-").replace(/-([a-z]|[0-9])/ig, function (s, l) { return String(l).toUpperCase(); });
                };
                jq.fn._css_ = jq.fn.css;
                jq.fn.css = function(attribute, value, obj){
                    var attr = attribute
                    if($.isObject(attribute)){
                        attr = {};
                        for (var j in attribute) {
                            if(attribute.hasOwnProperty(j)){
                                attr[camelize(j)] = attribute[j];
                            }
                        }
                    } else {
                        attr = camelize(attribute);
                    }
                    return this._css_(attr, value, obj);
                };
            }
        } else {
            AdobeEdge.$_ = jQuery;
        }
    }

    if ( framework && (framework === "zepto" || framework === "jqmobi")) {
        $.data = $.data || function(ele, name, data) {
            var dataname = "data-" + name;
            if(typeof data !== 'undefined') {
                ele[dataname] = data;
            }
            else {
                return ele[dataname];
            }
        };
    }
})();

(function($){
    /*jshint strict:false */

    var jQuery = $;
    window.AdobeEdge.jQuery = $;
    jQuery.easing = jQuery.easing || {
        /*! jQuery v1.7.1 jquery.com | jquery.org/license */
        linear: function( p, n, firstNum, diff ) {
            return firstNum + diff * p;
        },
        swing: function( p, n, firstNum, diff ) {
            return ( ( -Math.cos( p*Math.PI ) / 2 ) + 0.5 ) * diff + firstNum;
        }
    };

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright � 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright � 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
    // End jQuery easing

    /**
     @name Edge
     @namespace Edge is the namespace for all classes and methods for the Edge runtime and authortime frameworks
     **/
    window.AdobeEdge = window.AdobeEdge || {};
    if (typeof $.Edge === "undefined"){
        $.Edge = window.AdobeEdge;
    }
    var Edge = $.Edge;
    Edge.version = "2.0.0";
    
    Edge.cloneJSONObject = function(obj)
    {
        var o, v;
        if ($.isArray(obj))
        {
            o = [];
            var i;
            var cnt = obj.length;
            for (i = 0; i < cnt; i++)
            {
                v = obj[i];
                o[i] = (typeof v === "object") ? Edge.cloneJSONObject(v) : v;
            }
        }
        else // isObject
        {
            o = {};
            var p;
            for (p in obj)
            {
                if(p != 'prototype'){
                    v = obj[p];
                    o[p] = (typeof v === "object") ? Edge.cloneJSONObject(v) : v;
                }
            }
        }
        return o;
    };

//
// Notifier
//

    Edge.Notifier = function()
    {
        this.observers = [];
        this.suppressNotifications = 0;
        this.notificationLevel = 0;
    };

    $.extend(Edge.Notifier.prototype, {
        addObserver: function(observer)
        {
            if (!observer)
                return;

            // Make sure the observer isn't already on the list.

            var len = this.observers.length;
            for (var i = 0; i < len; i++)
            {
                if (this.observers[i].observer == observer)
                    return;
            }
            this.observers[len] = {observer: observer};
        },

        removeObserver: function(observer)
        {
            if (!observer)
                return;

            for (var i = 0; i < this.observers.length; i++)
            {
                if (this.observers[i].observer == observer)
                {
                    if(this.notificationLevel === 0){
                        this.observers.splice(i, 1);
                        break;
                    }
                    else{
                        // defer removal
                        this.observers[i].deleted = true;
                    }
                }
            }
        },

        notifyObservers: function(methodName, data)
        {
            if (!methodName)
                return;

            if (!this.suppressNotifications)
            {
                if(!data)
                    data = {};
                data.methodName = methodName;
                this.notificationLevel++; // Defer removals

                // We need to retest length in case of addObserver during notification
                var i;
                for (i = 0; i < this.observers.length; i++)
                {
                    var o = this.observers[i];
                    var obs = o && !o.deleted ? o.observer : undefined;
                    if (obs)
                    {
                        if (typeof obs == "function")
                            obs(methodName, this, data);
                        else if (obs[methodName])
                            obs[methodName](this, data);
                    }
                }

                this.notificationLevel--;
                if (this.notificationLevel === 0) {
                    var len = this.observers.length;
                    // Do deferred removeObserver
                    for (i = len - 1; i >= 0; i--)
                    {
                        if (this.observers[i].deleted)
                            this.observers.splice(i, 1);
                    }
                }
            }
        },

        enableNotifications: function()
        {
            if (--this.suppressNotifications < 0)
            {
                this.suppressNotifications = 0;
                Edge.Debug.reportError("Unbalanced enableNotifications() call!\n");
            }
        },

        disableNotifications: function()
        {
            ++this.suppressNotifications;
        }
    });

    Edge.trimString = function(str) {
        return str.replace(/^\s+|\s+$/g,"");
    };

    var edgeConsole = {};

    edgeConsole.log = function(s){ };
    edgeConsole.trace = function() { };
    if(typeof window.console == "undefined") {
        window.console = edgeConsole;
    }

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

    // check for border-width being in transform-origin or not
    function originIncludesBorders() {
        var ele = document.createElement('div');
        if (document.body != null) {
            document.body.appendChild(ele);
        }
        var ele$ = $(ele);
        ele$.css("left", "-9999px").css("width", "100px");
        ele$.css("transform-origin", "50% 50%").css("-webkit-transform-origin", "50% 50%").css("-moz-transform-origin", "50% 50%").css("-ms-transform-origin", "50% 50%").css("-o-transform-origin", "50% 50%");

        var sOrigin = ele$.css("transform-origin") || ele$.css("-webkit-transform-origin") || ele$.css("-moz-transform-origin") || ele$.css("-ms-transform-origin") || ele$.css("-o-transform-origin");
        ele$.css("border-width", "10px").css("border-style", "solid");
        var sOrigin2 = ele$.css("transform-origin") || ele$.css("-webkit-transform-origin") || ele$.css("-moz-transform-origin") || ele$.css("-ms-transform-origin") || ele$.css("-o-transform-origin");

        if (ele.parentNode != null) {
            ele.parentNode.removeChild(ele);
        }

        return sOrigin != sOrigin2;
    }

    var supported = Edge.supported = Edge.supported || {};
    supported.cssTransform = isSupported( ['transformProperty', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform'] );
    // Use our own detection instead of Modernizr.csstransforms3d
    supported.cssTransform3d = isSupported( ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'] );
    //window.console.log("3d support = " + supported.cssTransform3d);
    supported.originIncludesBorders = originIncludesBorders();
    Edge.isSupported = isSupported;


})( jQuery );


// Filename: edge.timeline.js

(function($, Edge){

// Goals:
//		- Nested Timelines
//		- Support for HTML, SVG, Canvas
//		- Ability to scale durations of nested timelines.

    // Note: all functions or vars prefixed by '_' are to be considered to be non-public and should be only accessed
    // by the defining 'class' and its derived 'classes'.

    "use strict";

    var tweenFactories = {};

    var timelineDefaultConfig = {
        dropFrames: true,
        fps: 60, // msecs
        pauseThreshold: 250
    };

    var tweenDefaultConfig = {
        duration: 500 // msecs
    };

//////////////////////////////////////////////////////////////////////
//
// Animation
//
//////////////////////////////////////////////////////////////////////


    function Animation()
    {
        Edge.Notifier.call(this);
        this.animationID = "animID-" + Animation.nextID++;
    }

    Animation.nextID = 1;

    $.extend(Animation.prototype, Edge.Notifier.prototype, {
        constructor: Animation,

        _setup: function(){},
        _update: function(elapsed, easingConst, context){},
        getDuration: function(){return 0;}
    });

//////////////////////////////////////////////////////////////////////
//
// Trigger
//
//////////////////////////////////////////////////////////////////////


    function Trigger(handler, data, handlerContext)
    {
        Edge.Animation.call(this);
        if(typeof handler === 'function')
            this.handler = handler;
        else if(typeof handler === 'string')
            this.eventType = handler;
        this.handlerContext = handlerContext;
        this.data = data;
        this.isTrigger = true;
    }

    $.extend( Trigger.prototype, Animation.prototype, {
        constructor: Trigger,

        _update: function( elapsed /* , context */ ) {
            if ( !this.fired ) {
                this.fired = true;
                if ( this.handler ) {
                    this.handler.call( this.handlerContext, elapsed, this.data );
                }
                else if ( this.eventType && this.timeline ) {
                    this.timeline.notifyObservers( this.eventType, { elapsed: elapsed, data: this.data } );
                }
            }
        },
        setup: function( timeline, context, position ) {
            var useAutoForExecuteTriggers = typeof context.executeTriggers === "undefined" || context.executeTriggers === null;

            if ( (context.startingFromCurrent && useAutoForExecuteTriggers) || (!useAutoForExecuteTriggers && !context.executeTriggers) ) {
                this.fired = ( (context.playDirection !== "reverse") ? timeline.currentPosition >= position : timeline.currentPosition <= position );
            }
            else {
                this.fired = ( (context.playDirection !== "reverse") ? timeline.currentPosition > position : timeline.currentPosition < position );
            }
            this.timeline = timeline;
        }

    } );


//////////////////////////////////////////////////////////////////////
//
// TimelineObject
//
//////////////////////////////////////////////////////////////////////

    function TimelineObject(animation, position, duration, easing, opts)
    {
        Edge.Notifier.call(this);

        this.animation = animation;
        this.position = 0;  // msecs relative to the start of the timeline.
        this.duration = -1; // The amount of time this object is active within the timeline.
        this.opts = {};
        $.extend( this.opts, opts );
        if (typeof easing === "function")
            this.easing = easing;
        else
            this.easing = easing && $.easing[easing] ? easing : TimelineObject.defaultEasing;

        if (position !== undefined)
            this.position = position;
        if (duration !== undefined)
            this.duration = duration;

        // These properties get set up when the timeline is in play mode.

        this.timeline = null;
        this.dScale = 1;     // The ratio between the animation's duration and the override.
        this.dDuration = 0;
        this.done = false;
    }

    TimelineObject.defaultEasing = "linear";
    $.extend(TimelineObject.prototype, Edge.Notifier.prototype, {
        constructor: TimelineObject,

        _setup: function(timeline, context)
        {
            this.timeline = timeline;
            var oDuration = this.duration;
            var sDuration = null;
            if(this.animation && this.animation.getDuration) {
                sDuration = this.animation.getDuration();
            }
            this.dScale = (oDuration !== -1 && oDuration !== 0) ? sDuration / oDuration : 1;
            this.dDuration = oDuration !== -1 ? oDuration : sDuration;
            this.done = false;
            if (this.animation && this.animation.setup) {
				//context.position = this.position;
                this.animation.setup(timeline, context, this.position);
                //delete context.position;
			}
        },

        _update: function(elapsed, context)
        {
            if (!this.done)
            {
                var e = elapsed;
                var d = this.dDuration;


                if (this.animation) {
                    var easingConst;
                    // Prevent a divide by zero for zero-length tweens.
                    if (d === 0){
                        if (e >= 0)
                            easingConst = 1; // seek anywhere in tween yields toval
                        else
                            easingConst = 0;
                    }
                    else {
                        if (e >= d)
                            e = d;
                        if (e <= 0)
                            e = 0;

                        easingConst = $.easing[this.easing](e/d, e, 0, 1, d);
                    }

                    this.animation.update(e * this.dScale, easingConst, context);
                }

                if (context.playDirection === "reverse" ? e <= 0: e >= d)
                    this.complete();
            }
        },

        complete: function()
        {
            this.done = true;
            if (this.timeline)
                this.timeline._updateComplete(this);
        },

        getPosition: function()
        {
            return this.position;
        },

        setPosition: function(pos)
        {
            this.position = pos;
        },

        getDuration: function()
        {
            return this.duration !== -1 ? this.duration : (this.animation && this.animation.getDuration ? this.animation.getDuration() : 0);
        },

        setDuration: function(duration)
        {
            this.duration = duration >= 0 ? duration : -1;
        }
    });

//////////////////////////////////////////////////////////////////////
//
// Timeline Context
//
//////////////////////////////////////////////////////////////////////

    function TimelineContext(opts)
    {
        this.variables = {};
        if ( opts ) {
            $.extend( this, opts );
        }
    }

//////////////////////////////////////////////////////////////////////
//
// Timeline
//
//////////////////////////////////////////////////////////////////////

    function Timeline(opts)
    {
        Edge.Animation.call(this);

        $.extend(this, Edge.Timeline.config);
        $.extend(this, opts);

        this.timer = 0;
        this.timerStart = 0;
        this.startPosition = 0;
        this.currentPosition = -1;
        this.playing = false;
        this.duration = 0;

        this.interval = 1000 / this.fps;

        this.objects = [];
    }

    Timeline.config = timelineDefaultConfig;
    var timerFuncs = [];

    /**
     Update all timelines driven by an external clock. To use an external clock, pass 'externalClock:true'
     as an option to play() for any timelines to be driven. Then, call this function to update all of them,
     based on whatever external time source you are using.
     @name tick
     @memberOf Edge.Timeline
     @function
     @return nothing
     */
    Timeline.tick = function()
    {
        var funcs = timerFuncs.slice(0);
        timerFuncs = [];
        var len = funcs.length, tickTime = (new Date()).getTime();
        for(var i = 0; i < len; i++){
            var f = funcs[i];
            if ( typeof f !== "undefined" ) {
                f.call( null, tickTime );
            }
        }
    };

    $.extend(Timeline.prototype, Animation.prototype, {

        constructor: Timeline,

        /**
         Play this timeline
         @name play
         @memberOf Edge.Timeline.prototype
         @function
         @param {object} opts Options for running timeline.
         @return nothing
         */
        play: function(opts)
        {
            this.notifyObservers("play");
            this.stop();

            this.sort();
            this.playing = true;
            if( this.context){
                this.context.playDirection = undefined;
                this.context.executeTriggers = undefined;
            }
            var playContext = this.getContext(opts);
            playContext.timeline = this;

            if ( (opts !== undefined) && typeof opts.startPos === "number" && this.currentPosition !== opts.startPos ) {
                playContext.startingFromCurrent = false;
                this.currentPosition = opts.startPos;
            }
            else
            {
                playContext.startingFromCurrent = true;
            }

            this._setup(this, playContext);

            this.timerStart = (new Date()).getTime();
            this.startPosition = this.currentPosition;

            var self = this;
            var timerFunc;
            this.lastUpdateTime = this.timerStart;

            if ( playContext.externalClock ) {
                timerFunc = function(tickTime){
                    self._handleTimer(playContext, timerFunc, tickTime); };
            }
            else {
                timerFunc = function(){
                    self._handleTimer(playContext, timerFunc); };
            }
            this.timerFunc = timerFunc;
			playContext.firstUpdate = true;
            this._handleTimer(playContext, timerFunc);
			playContext.firstUpdate = false;
        },

        /**
         Stop playing this timeline
         @name stop
         @memberOf Edge.Timeline.prototype
         @function
         @return nothing
         */
        stop: function(opts)
        {
            var dontNotify = opts ? opts.dontNotify : false;

            if ( !dontNotify ) {
                this.notifyObservers( "stop" );
            }
            if ( this.timer ) {
                clearTimeout( this.timer );
            }
            this.timer = 0;
            this.timerStart = 0;
            this.playing = false;
            if(this.timerFunc){
                var i;

                for(i = 0; i < timerFuncs.length; i++){
                    if(timerFuncs[i] === this.timerFunc){
                        timerFuncs[i] = undefined;
                    }
                }
            }
        },

        /**
         Seek to a time in this timeline
         @name seek
         @memberOf Edge.Timeline.prototype
         @function
         @param {object} opts Options for running timeline.
         @return nothing
         */
        seek: function(pos, opts)
        {
            this.notifyObservers("seek");
            this.sort();
            this.stop();
            var oldPosition = this.currentPosition;
            if ( typeof pos === "number" ) {
                this.currentPosition = pos;
            }

            var playContext = this.getContext(opts);
            playContext.timeline = this;
            if ( oldPosition === this.currentPosition ) {
                playContext.startingFromCurrent = true;
            }
            else {
                playContext.startingFromCurrent = false;
            }
            this._setup(this, playContext);

            /* Note the extra oldPosition arg in this call to update. That allows optimization of multiple seeks
            *  if _updateSeek supports it
             */
			playContext.firstUpdate = true;
            this._updateSeek(this.currentPosition, 1, playContext, oldPosition);
			playContext.firstUpdate = false;
        },

        /**
         Add a TimelineObject to this timeline
         @name add
         @memberOf Edge.Timeline.prototype
         @function
         @param {Animation} animation Animation to add as a TLO.
         @param {number} position Start position of animation in ms.
         @param {number} duration Duration of animation in ms.
         @param {string} easing Name of easing to use.
         @return nothing
         */
        add: function(animation, position, duration, easing, opts)
        {
            var o = new TimelineObject(animation, position, duration, easing, opts);
            this.objects.push(o);
            this.sorted = false;
        },

        
        sort: function() {
            
            if(!this.sorted) {
                
                //TBD: not sure if we should override this in Motion Path tween or if it is OK for it to be global behavior...
                
                var sortPref = { "width": 1, "height": 2, "-webkit-transform-origin": 3, "transform-origin": 4, "-moz-transform-origin": 5, "-ms-transform-origin": 6, "left": 7, "top": 8, "bottom": 9, "right": 10, "motion": 11 },
                    i,
                    obj,
                    prev;
                
                this.objects.sort(function(a,b){
                    
                    var aniA = a.animation,
                        aniB = b.animation;
                    
                    //this is just defensive, it probably never executes
                    if (!aniA && !aniB) {
                        return a.position - b.position;
                    } else if (!aniA) {
                        return -1;
                    } else if (!aniB) {
                        return 1;
                    }
                    
                    //triggers don't have a property, so they all get grouped together and sorted by position
                    if (!aniA.property && !aniB.property) {
                        return a.position - b.position;
                    } else if (!aniA.property) {
                        return -1;
                    } else if (!aniB.property) {
                        return 1;
                    }
                    
                    var srtA = sortPref[aniA.property],
                        srtB = sortPref[aniB.property];
                    
                    if (aniA.sourceElements !== aniB.sourceElements) {
                        if (aniA.sourceElements > aniB.sourceElements) {
                            return 1;
                        } else {
                            return -1;
                        }
                    }
                    
                    //sorted properties first
                    if (srtA && (!srtB || srtB < srtA)) {
                        return 1;
                    }
                    if(srtB && (!srtA || srtB > srtA)) {
                        return -1;
                    }
                    
                    //sort the transitions within the property
                    return a.position - b.position;
                });
                
                //now link them
                for (var i = 1; i < this.objects.length; i++) {
                    prev = this.objects[i - 1];
                    obj = this.objects[i];
                    
                    if (prev.animation && obj.animation && prev.animation.property === obj.animation.property && prev.animation.sourceElements === obj.animation.sourceElements) {
                        prev.animation._nextObj = obj.animation;
                        obj.animation._prevObj = prev.animation;
                    }
                    else {
                        if (prev.animation) {
                            prev.animation._nextObj = null;
                        }
                        if (obj.animation) {
                            obj.animation._prevObj = null;
                        }
                    }
                }
                
                this.sorted = true;
            }            
        },
        /**
         Get the duration of a timeline
         @name getDuration
         @memberOf Edge.Timeline.prototype
         @function
         @return Duration of the timeline in milliseconds
         */
        getDuration: function()
        {
            var duration = 0;
            var objs = this.objects;
            var ocnt = this.objects.length;
            var m = Math.max;
            for (var i = 0; i < ocnt; i++)
            {
                var o = objs[i];
                duration = m(duration, o.position + o.getDuration());
            }
            return duration;
        },
        /**
         Get the current position of a timeline
         @name getCurrentPosition
         @memberOf Edge.Timeline.prototype
         @function
         @return Position of the timeline in milliseconds
         */
        getCurrentPosition: function()
        {
            return this.currentPosition;
        },

        getContext: function( opts ) {
            if ( this.context ) {
                $.extend( this.context, opts );
            }
            else {
                this.context = new TimelineContext( opts );
            }
            return this.context;
        },
        _update: function(elapsed, easingConst, context)
        {
            this.sort();

			this.currentContext = context;
            this.notifyObservers("preUpdate", { elapsed: elapsed, easingConst: easingConst });

            var objs = this.objects, triggers = this.triggers;
            var ocnt = objs.length, tcnt = triggers.length;
            var forward = context.playDirection !== "reverse";
            this.currentDirection = forward ? "forward" :"reverse";
            var updatedTweens = false, j, okToProceed = true;
            var executeTriggers = context.executeTriggers;
            // possible values for executeTriggers is true, false, or either null or undefined to be auto
            var useAutoForExecuteTriggers = typeof executeTriggers === "undefined" || typeof executeTriggers === "null";
            var o, p, directionMatches;
            //first fire triggers - they have potential to reset the clock
            for ( var i = 0; i < tcnt; i++ ) {
                var t = triggers[forward ? i : tcnt - i - 1];
                var shouldAutoFire = t.animation.isTrigger &&
                        !(context.startingFromCurrent && context.firstUpdate);
                if ( (useAutoForExecuteTriggers && shouldAutoFire || executeTriggers || !context.firstUpdate)  &&
                        (!t.animation.fired) &&
                        (forward ? elapsed >= t.position : elapsed <= t.position + t.duration) ) {
                    var pos = this.currentPosition = t.position;
                    var state = this._getState();
                    
                    //now update all the transitions
                    for ( j = 0; j < ocnt; j++ ) {
                        o = objs[forward ? j : ocnt - j - 1];
                        directionMatches = (forward && !o.opts.reverseOnly) || (!forward && !o.opts.forwardOnly);
                        if ( directionMatches && !o.animation.isTrigger && (forward ? pos >= o.position : pos <= o.position + o.duration) ) {
                            p = pos - o.position;
                            if (!p && !o.duration && !forward)
                                p--;
                            o._update( p, context );
                        }
                    }
                    updatedTweens = true;
                    // Fire the trigger
                    t.animation._update(pos, context); // Pass in real total elapsed time

                    if(!this._equalState(state)) {
                        // Trigger changed the timeline state
                        okToProceed = false;
                        break;
                    }
                }
            }
            if( !updatedTweens ) {
                // No triggers fired
                for ( j = 0; j < ocnt; j++ ) {
                    o = objs[forward ? j : ocnt - j - 1];
                    directionMatches = (forward && !o.opts.reverseOnly) || (!forward && !o.opts.forwardOnly);
                    if ( directionMatches && !o.animation.isTrigger && (forward ? elapsed >= o.position : elapsed <= o.position + o.duration) ) {
                        p = elapsed - o.position;
                        if (!p && !o.duration && !forward)
                            p--;
                        o._update( p, context );
                    }
                }
            }

            this.notifyObservers("postUpdate", { elapsed: elapsed, easingConst: easingConst, context: context });
            this.notifyObservers("update", { elapsed: elapsed, easingConst: easingConst });
			this.currentContext = null;
            return okToProceed;
        },

        _getState: function() {
            return {pos: this.currentPosition, dir: this.context.playDirection, playing: this.playing};
        },

        _equalState: function(state) {
            var statePlaying = !!state.playing, thisPlaying = !!this.playing;   // Coerce to a boolean
                                                                                // If you do the negation in the expression, JsHint complains
                                                                                // about confusing use of ! and there's no switch to turn it off
            return state.pos ===  this.currentPosition && state.dir === this.context.playDirection && statePlaying === thisPlaying;
        },

        _handleTimer: function(context, timerFunc, tickTime)
        {
            tickTime = tickTime || (new Date()).getTime();
            var ms = tickTime - this.timerStart;
            if(tickTime - this.lastUpdateTime > this.pauseThreshold) {
                // We must have missed some updates, probably because the browser suspended us while the tab was hidden
                this.timerStart += tickTime - this.lastUpdateTime + this.interval;
                ms = tickTime - this.timerStart;
            }
            var reversed = context.playDirection === "reverse";
            var elapsed = this.startPosition + (reversed ? -ms : ms);
            if ( !this.playing ) {
                return;
            }

            elapsed =  Math.max(0, Math.min(elapsed, this.duration));
            this.currentPosition = elapsed;
			var okToProceed = this._update(elapsed, 1, context);
            this.lastUpdateTime = tickTime || (new Date()).getTime();

			reversed = context.playDirection === "reverse";
            if (!reversed ? this.currentPosition < this.duration : this.currentPosition > 0)
            {
                if ( okToProceed && this.playing ) {
                    if ( context.externalClock ) {
                        timerFuncs.push( timerFunc );
                    }
                    else {
                        this.timer = setTimeout( timerFunc, this.interval );
                    }
                }
            }
            else{
                this.stop();
                this.notifyObservers("complete", { elapsed: ms });
            }
        },

        _setup: function(timeline, context)
        {
            Edge.Animation.prototype._setup.call(this, timeline);

            this.triggers = [];
            var animations = this.objects;
            var alen = this.objects.length;
            for (var i = 0; i < alen; i++)
            {
                var a = animations[i];
                a._done = false;
                a._setup(this, context);
                if(a.animation.isTrigger) {
                    this.triggers.push(a);
                }
            }

            this.duration = this.getDuration();
        },

        _updateComplete: function(timelineObj)
        {
            timelineObj._done = true;
        }
    });

    Timeline.prototype._updateSeek = Timeline.prototype._update;

////////////////////////////////////

    Edge.Animation = Animation;
    Edge.TimelineObject = TimelineObject;
    Edge.Timeline = Timeline;


    /**
     Create a new timeline
     @name createTimeline
     @memberOf Edge.Timeline
     @function
     @param {object} opts Options for timeline.
     @return new Timeline
     */
    Edge.Timeline.createTimeline = function(opts) {
        return new Edge.Timeline(opts);
    };

    /**
     Create a new tween
     @name createTimeline
     @memberOf Edge.Timeline
     @function
     @param {string or ident} tweenType Type of tween as registered by addTweenType.
     @param {variable}  tweenData Data for tween - depends upon tween type
     @return new tween Animation - precise type depends on tweenType
     */
    Edge.Timeline.createTween = function(tweenType)
    {
        var factory = tweenFactories[tweenType];
        if (factory)
            return factory.func.apply(factory.context, Array.prototype.slice.call(arguments, 1));

        return null;
    };


    /**
     Add a new Tween type factory
     @name createTimeline
     @memberOf Edge.Timeline
     @function
     @param {object} opts Options for timeline.
     @return nothing
     */
    Edge.Timeline.addTweenType = function(tweenType, factoryFunc, context)
    {
        tweenFactories[tweenType] = { func: factoryFunc, context: context };
    };

    /**
     Create a new Trigger
     @name createTrigger
     @memberOf Edge.Timeline
     @function
     @param {string or function} handler Either the name of the event to fire, or a handler function to be called.
     @return new Trigger
     */
    Edge.Timeline.createTrigger = function(handler, data)
    {
        var handlerContext = arguments[arguments.length - 1];
        return new Trigger(handler, data, handlerContext);
    };

    /**
     Create a new timeline from JSON data
     @name createTimeline
     @memberOf Edge.Timeline
     @function
     @param {arr} opts Array of TLO JSON objects for timeline.
     @return new Timeline
     */
    Edge.Timeline.createTimelineFromData = function(arr)
    {
        var tl = jQuery.Edge.Timeline.createTimeline();

        var alen = arr.length;
        for (var i = 0; i < alen; i++)
        {
            var d = arr[i];
            var s = null;
            if (d.timeline) {
                s = Edge.Timeline.createTimelineFromData(d.timeline);
            }
            else if(d.tween) {
                s = Edge.Timeline.createTween.apply(null, d.tween);
            }
            else if(d.trigger) {
                var args = d.trigger.slice(0, 2);
                args.push(this);
                s = Edge.Timeline.createTrigger.apply(null, args);
            }

            if ( s ) {
                tl.add( s, d.position, d.duration, d.easing, d.opts );
            }
        }

        return tl;
    };

})(jQuery, window.AdobeEdge);

// Filename: edge.property-tween.js

(function($, Edge){

// Builtin tween types handled by PropertyTween - other type requires a subclass that overloads setValue.
    var tweenTypes = { style: 0, attribute: 1, property: 2 };

    /**
     @name Edge.PropertyTween
     @class Animation for a single property on a set of elements.
     This class is designed to be extended. In particular, overriding setValue, getValue  will
     enable the animation of your own properties. Overriding  getElementSet or resolveElementSelector will permit
     application to arbitrary objects or object sets.
     Note that only the methods likely to be overridden by derived classes are documented.

     **/

    /**
     PropertyTween constructor
     @name PropertyTween
     @memberOf Edge.PropertyTween
     @function
     @param {string or ident} tweenType Type of tween as registered by addTweenType.
     @param {string, jQuery object, DOM element, or object}  elements The object or objects to be tweened. Strings will be $'d
     @param {string or ident} property Property, data member or attribute name
     @param {string, number or array} val Value to animate to
     @param {object} opts Additional tween-type specific options
     @return nothing
     */

    function PropertyTween(tweenType, elements, property, val, opts) {
        Edge.Animation.call(this);

        this.name = "prop tween";
        this.elements = elements;
        this.sourceElements = elements;
        this.deferElementResolution = true;
        this.tweenType = tweenTypes[tweenType];
        this.updateTriggered = false;
        this.property = property;
        this.fromValue = undefined;
        this.toValue = val;
        this.duration = 1000; // msecs
        this.valueTemplate = null;
        this.tokens = null;
        this.fromValues = null;

        if (opts)
            $.extend(this, opts);

        // We need to force a deferred resolution of our element set
        // if we were given a selector that contains a placeholder
        // reference.

        this.deferElementResolution = this.deferElementResolution || (typeof elements == "string" && elements.search(/\$\{[^\{\}]+\}/) != -1);

        if (!this.deferElementResolution)
            this.elements = this.resolveElementSelector(elements);

        // Convert all "to" values specified into an array of objects
        // that specify the value and unit to drive to.

        var values = this.toValues = [];
        var valueArray = this.parseValue(val);

        if (!$.isArray(val))
            val = [ val ];

        if (!valueArray || valueArray.length === 0) {
            valueArray = val;
        }

        var i, v;
        var len = valueArray.length;
        for (i = 0; i < len; i++)
        {
            v = valueArray[i];
            //v = PropertyTween.substituteVariables(v, opts); // This should be done at setupForAnimation time, in the context
            var o = {};
            if (typeof v == 'string') {
                o.value = parseFloat(v.replace(/[a-zA-Z%]+$/,""));
                o.unit = v.replace(/^-?[0-9]*(\.[0-9]+)?/, "");
				if(isNaN(o.value)) {
					o.value = v;
					o.unit = "";
				}
            }
            else {
                if (typeof v == 'number')
                    v = parseFloat(v);
                o.value = v;
                o.unit = "";
            }
            values.push(o);
        }

        //if (val.length > 1 && !this.valueTemplate)
        //    alert("Multiple values specified for attribute tween, but no template was provided!");

        //if (val.length > 1 && (!this.fromValue || !$.isArray(this.fromValue)))
        //    alert("Multiple values specified for attribute tween, but no from values specified!");

        var len;
        if (this.fromValue)
        {
            var fvs = this.fromValues = [];

            var parsedValues = this.parseValue(this.fromValue);
            if (parsedValues && parsedValues.length > 0) {
                this.fromValue = parsedValues;
            }
            // If any "from" values were specified and we could not parse them, convert them into an
            // array of numeric values.
            else if (!$.isArray(this.fromValue)) {
                this.fromValue = [ this.fromValue ];
            }

            len = this.fromValue.length;
            for (i = 0; i < len; i++)
            {
                v = this.fromValue[i];
                if (typeof v == 'string') {
                    fvs[i] = parseFloat(v.replace(/[a-zA-Z%]+$/,""));
					if(isNaN(fvs[i])) {
						fvs[i] = v;
					}
			}
                else {
                    if (typeof v == 'number')
                        v = parseFloat(v);
                    fvs[i] = v;
                }
            }
        }

        // Make sure filter is an array and convert strings to functions
        if (this.filter){
            if(!$.isArray(this.filter))
                this.filter = [ this.filter ];
            var f = this.filter;
            len= f.length;
            for(i=0; i<len; i++){
                if(typeof f[i] == 'string')
                    f[i] = Math[f[i]];
                if(typeof f[i] != 'function')
                    f[i] = null;
            }
        }


        if (this.valueTemplate)
            this.tokens = this.parseTemplate(this.valueTemplate);
    }

    var isWebkit = ( 'webkitAppearance' in document.documentElement.style );

    PropertyTween.Token = function(value, isPlaceholder)
    {
        this.value = value;
        this.isPlaceholder = isPlaceholder;
    };

    PropertyTween.parseVariableName = function(str)
    {
    	var varName = str;
    	if (typeof str == "string" && str.search(/\$\{/) != -1){
            var start = str.search(/\$\{/);
            var end = str.search(/\}/);
            varName = str.slice(start + 2, end);
            //if (!varName)
            //    alert("Invalid variable name: " + varName);

            if (typeof varName == "string") {
                varName = Edge.trimString(varName);
                varName = varName.replace(/[\"\']/g, "");
            }
		}
    	return varName;
    };
    
    /**
     Substitute variables into string
     @name substituteVariable
     @memberOf Edge.PropertyTween
     @function
     @param {string} s String to be substituted into - left unchanged. Tokens of form '${var}' will be substituted from entry for 'var' in variables
     @param {object}  variables Dictionary of substitution values
     @return Substituted string
     */
    PropertyTween.substituteVariables = function(s, variables)
    {
        var  str = s;
        while (variables && typeof str == "string" && str.search(/\$\{/) != -1)
        {
        	var varName = PropertyTween.parseVariableName(str);

            if (typeof variables[varName] == "undefined") {
                //console.log("Animation variable ${" + varName + "} is undefined!");
                str = undefined;
            }
            else
            	str = str.replace(/\$\{[^\}]*\}/, variables[varName]);
        }
        return str;
    };

    $.extend(PropertyTween.prototype, Edge.Animation.prototype, {
        constructor: PropertyTween,
        
        setup: function(timeline, context)
        {
            this.updateTriggered = false;
        },

        update: function(elapsed, easingConst, context)
        {
            var elements = this.getElementSet(context);

            if (!this.updateTriggered)
            {
                this.updateTriggered = true;
                this.setupForAnimation(context);
            }

            var tween = this;
            var tt = this.tweenType;
            var prop = this.property;

            var i;
            elements.each(function(){
                // We only want to tween if the property data has a
                // matching animation id. If the ids don't match, that
                // means another animation has started which is modifying
                // this same property.

                var td = tween.getPropertyTweenData(this, tt, prop);
                if (td.animationID != tween.animationID)
                    return;

                var fvs = td.fromValues;
                var tvs = td.toValues;
                var tkns = td.tokens;
                var filters = tween.filter;

                var cnt = fvs.length;
                var results = [];

                for (i = 0; i < cnt; i++)
                {
                    var f = fvs[i];
                    var t = tvs[i];
					var v;
					if(typeof f == "string") {
						v = (easingConst==0 && tween.duration > 0)? f : t.value;
					}
					else {
						v = (f + ((t.value - f) * easingConst));
					}
                    if ( filters && filters[i] ) {
                        v = filters[i]( v , tween, this, prop, t.unit, elapsed, context);
                    }
                    if ( typeof v === "number" && v < 1 ) {
                        // protect against exponential notation
                        v = v.toFixed( 6 );
                    }
                    results.push(v + t.unit);
                }

                var val = "";

                var formattedValue = tween.formatValue(results);

                if (formattedValue.length > 0) {
                    val = formattedValue;
                }
                else if (tkns)
                {
                    var tlen = tkns.length;
                    var a = [];
                    for (i = 0; i < tlen; i++)
                    {
                        var o = tkns[i];
                        if (o.isPlaceholder)
                            a.push(results[o.value]);
                        else
                            a.push(o.value);
                    }

                    val = a.join("");
                }
                else {
                    val = results.join("");
                }

                //console.log(this.id + ": " + prop + " = " + val);
                tween.setValue.call(this, tt, prop, val);
                tween.notifyObservers("onUpdate", { elapsed: elapsed, easingConst: easingConst, property: prop, value: val, element: this });
            });

        },
        /**
         Set a value for a property on an animated object. Override this method for a custom property
         @name setValue
         @memberOf Edge.PropertyTween
         @function
         @param (animated object) this Note that setValue is called for each animated object/property pair
         @param {integer} tt Type of tween. Undefined for tweenTypes not defined in the tweenTypes object
         @param {string}  prop The name of the property
         @param {any} val New value. Type depends on what the animated property is
         @return nothing
         */
        setValue: function (tt, prop, val) {
            switch (tt) {
                case 0:
                    $(this).css(prop, val);
                    if( isWebkit && prop === 'background-size' ) {
                        $(this).css('-webkit-background-size', val);
                    }
                    break;
                case 1:
                    this.setAttribute(prop, val);
                    break;
                case 2:
                    this[prop] = val;
                    break;
            }
        },

        getDuration: function(){ return this.duration; },

        /**
         Resolve the tween's selector (this.elements) to the set of objects to be animated by this tween.
         Override this method to use a custom lookup method.
         @name resolveElementSelector
         @memberOf Edge.PropertyTween
         @function
         @param (object) context Current animation context
         @return {jQuery object} jQuery object containing the actual objects or DOM elements
         */
        resolveElementSelector: function(context)
        {
            var ele = PropertyTween.substituteVariables(this.elements, context.variables);
            if(!ele)
                ele = this.elements;
            if(/^\${/.test(ele))
                ele = "bad_selector";
            return $(ele);
        },

        getElementSet: function(context)
        {
            // The actual set of elements each tween operates on is cached in the
            // context passed into the update() method. This is done because the
            // same timeline can be invoked with different variables that change
            // what each animation operates on.

            var id = this.animationID;
            if (!context.animData) context.animData = {};

            var animData = context.animData[id];
            if (!animData)
                animData = context.animData[id] = this.deferElementResolution ? this.resolveElementSelector(context) : this.elements;

            return animData;
        },

        /**
         Get the current value for a property on an animated object. Note that this is called with this set to the
         animated object, not a PropertyTween. Override this method for a custom property
         @name getValue
         @memberOf Edge.PropertyTween
         @function
         @param (animated object) this Note that getValue is called for each animated object/property pair
         @param {string}  prop The name of the property
         @param {integer} tt Type of tween. Undefined for tweenTypes not defined in the tweenTypes object
         @return {any} val Current value. Type depends on what the animated property is
         */
        getValue:function (prop, tt) {
            var fv;
            switch (tt) {
                case 0:
                    fv = $(this).css(prop);
                    break;
                case 1:
                    fv = this.getAttribute(prop);
                    break;
                case 2:
                    fv = this[prop] + "";
                    break;
            }
            return fv;
        },
        setupForAnimation: function(context)
        {
            // This function needs to get called just before the tween starts
            // to make sure we don't disable other tween animations that run
            // before this one.

            var tween = this;
            var tt = this.tweenType;
            var prop = this.property;
            var elements = this.getElementSet(context);
            elements.each(function(){
                var d = tween.getPropertyTweenData(this, tt, prop);
                d.animationID = tween.animationID;
                d.toValues = tween.toValues;
                d.tokens = tween.tokens;

                // There's a big assumption being made here, which is that
                // if there is a valueTemplate in use, which is the only case
                // where we can have multiple toValues, the tween fromValues
                // property will be non-null.

                // The above comment is not true for color tweens anymore.
                // They are not templated values but they do have an array of values.

                if (tween.fromValues)
                    d.fromValues = tween.fromValues;
                else
                {
                    var fv = tween.getValue.call(this, prop, tt);
                    if (fv === undefined)
                        fv = "0";

                    var fromValues = tween.parseValue(fv);

                    if (fromValues && fromValues.length > 0) {
                        var fvs = d.fromValues = [];

                        var fromLen = fromValues.length;
                        for (var i = 0; i < fromLen; i++)
                        {
                            var v = fromValues[i];
                            if (typeof v == 'string')
                                fvs[i] = parseFloat(v.replace(/[a-zA-Z%]+$/,""));
                            else {
                                fvs[i] = v; // hope it's a number
                            }
							if(isNaN(fvs[i])) {
								fvs[i] = v;
							}
                        }
                    }
                    else
                        d.fromValues = [ parseFloat(fv.replace(/[a-zA-Z%]+$/,"")) ];

                }
            });
        },

        parseTemplate: function(templateStr)
        {
            var tlen = templateStr.length;
            var results = [];
            var startIndex = 0;
            var re = /@@[0-9]+@@/g;
            var m = null;
            while (startIndex < tlen && (m = re.exec(templateStr)))
            {
                if (m.index != startIndex)
                    results.push(new PropertyTween.Token(templateStr.substring(startIndex, m.index), false));
                results.push(new PropertyTween.Token(parseInt(m[0].replace(/@@/g, ""), 10), true));
                startIndex = re.lastIndex;
            }

            if (startIndex < tlen)
                results.push(new PropertyTween.Token(templateStr.substring(startIndex, tlen), false));

            return results;
        },
        /**
         Parse the from and to values into an array of values. Override this function to provide custom
         formats. When overriding this method, the formatValue method should also be implemented.
         @name parseValue
         @memberOf Edge.PropertyTween
         @function
         @param {val}  prop value The value of the property
         @return {Array} Array of values for a property.
         */
        parseValue: function(val) {
            return [];
        },
        /**
         Format the given array of values into a string that can be used as a css property value. Invoked
         by update to get the formatted string value. Used in conjunction with parseValue.
         @name formatValue
         @memberOf Edge.PropertyTween
         @function
         @param {values}  Array of values of a property.
         @return {string} Formatted string value.
         */
        formatValue: function(values) {
            return "";
        },
        getPropertyTweenData: function(ele, tweenType, propertyName)
        {
            // The data for a tween is stored on each element, with a key
            // of "tweenData". The stored data is actually a dictionary
            // of dictionaries, where the outer dictionary is indexed by
            // tween type, and the dictionary for that type uses property
            // names as the index/key. The structure of the data stored
            // for each property is as follows:
            //
            //		tweenData = {
            //			style: {
            //				opacity: {
            //					animationID: <animation/tween id>,
            //					fromValues: [ ... ],
            //					toValues: [ ... ],
            //					tokens: [ ... ]
            //				}
            //			},
            //
            //			attribute: {
            //				// Data for attribute tweens are stored in this
            //				// dictionary. Like the style example above, the key
            //				// is the attribute name, and the value is an object
            //				// exactly like the one used in the style case above.
            //			},
            //
            //			property: {
            //				// Data for property tweens are stored in this
            //				// dictionary. Like the style example above, the key
            //				// is the property name, and the value is an object
            //				// exactly like the one used in the style case above.
            //			}
            //		}

            var td = $.data(ele, "tweenData");
            if (!td)
            {
                td = {};
                $.data(ele, "tweenData", td);
            }

            var tt = td[tweenType];
            if (!tt)
                tt = td[tweenType] = {};

            var data = tt[propertyName];
            if (!data)
                data = tt[propertyName] = { animationID: -1 };
            return data;
        }
    });

    Edge.PropertyTween = PropertyTween;

    Edge.Timeline.addTweenType("style", function(ele, prop, val, opts){ return new PropertyTween("style", ele, prop, val, opts); });
    Edge.Timeline.addTweenType("attribute", function(ele, prop, val, opts){ return new PropertyTween("attribute", ele, prop, val, opts); });
    Edge.Timeline.addTweenType("property", function(ele, prop, val, opts){ return new PropertyTween("property", ele, prop, val, opts); });


})(jQuery, AdobeEdge);

/// Filename: edge.transform-tween.js
//
/***
 @name TransformTween
 @class Defines a tween that can separately animate the components of a CSS3 3d transform (later
 improvements are planned to support 2d transforms on browsers that don't support 3d). This defines a tween type of
 "transform' which permits the separate animation of the following transform properties:
 translateX, translateY, translateZ, rotateX, rotateY, rotateZ, skewX, skewY, scaleX, scaleY, and scaleZ.
 The individual component functions are combined in a single transform on each update, in the order just listed.
 */

(function(jQuery, Edge, PropertyTween){
    /*jshint strict:false */
    /*jshint curly:false */

    var $ = jQuery;

    // Predeclarations
    var UpdateFinalizer;
    var Matrix4x4;

    var asin = Math.asin;
    var sin = Math.sin;
    var cos = Math.cos;
    var tan = Math.tan;
    var atan2 = Math.atan2;

    var deg2Rad =  Math.PI/180.0;
    var rad2Deg = 180.0/Math.PI;

    function TransformTween(tweenType, elements, property, val, opts) {
        Edge.PropertyTween.call(this, tweenType, elements, property, val, opts);
        this.name = "transformTween";

    }

    TransformTween.removeData = function(ele)
    {
        var data = $.data(ele, TransformTween.dataName);
        if(data){
            if ( data.timeline ) {
                UpdateFinalizer.unRegister( data.timeline, data.id );
            }
            $(ele).removeData(ele, TransformTween.dataName);
        }
    };

    var getNumber = function(numWithUnits)
    {
        var num = 0;
        if (typeof numWithUnits === 'string')
            num = parseFloat(numWithUnits.replace(/[a-zA-Z%]+$/,""));
        else if(typeof numWithUnits === 'number')
            num = numWithUnits;
        return num;
    };
    TransformTween.getNumber = getNumber;

    var splitUnits = function (s)
    {
        var o = {};
        o.num = parseFloat(s);
        o.units = String(s).match(/[a-zA-Z%]+$/);
        return o;
    };
	TransformTween.splitUnits = splitUnits;

    var formatNumber = function(num)
    {
        if(num !== 0 && Math.abs(num) < 1e-6)
            return num.toFixed(6);
        return num.toString();
    };

    function combineTranslation(parentDim, translate1, translate2) {
        if(typeof translate1 === 'undefined') {
            return translate2;
        }
        if(typeof translate2 === 'undefined') {
            return translate1;
        }
        var number1 = getNumber(translate1), number2 = getNumber(translate2);
        if(!number1) {
            return translate2;
        }
        if(!number2) {
            return translate1;
        }

        var units1 = splitUnits(translate1).units, units2 = splitUnits(translate2).units;

        var units = units1;

        if( units1 !== units2) {

            if(units1 === '%') {
                units = units2;
                number1 = number1 / 100 * parentDim;
            }
            if(units2 === '%') {
                number2 = number2 / 100 * parentDim;
            }
        }
        return number1 + number2 + units;
    }

    var htRedrawDivTimer = {};
        
    function doCounterScale($ele, fScaleX, fScaleY) {
        
        var iTimeout = 50;
        var fnDoTimeout;
        
        fnDoTimeout = function () {
            var iMSNow = (new Date()).getMilliseconds(),
                origW,
                origH,
                trackSize;
            if ((iMSNow - htRedrawDivTimer[$ele[0]]) < iTimeout) {
                setTimeout(fnDoTimeout, iTimeout);
            }
            else {
                //set transfrom origin to 0,0
                $ele.css("-webkit-transform-origin", "0% 0%");
                
                trackSize = $ele.data("eg-track-size");
                if (!trackSize) {
                    trackSize = {
                        scaleX: 1.0,
                        scaleY: 1.0,
                        width: $ele.width(),
                        height: $ele.height()
                    };
                }
                
                origW = $ele.width() / trackSize.scaleX;
                origH = $ele.height() / trackSize.scaleY;
                
                $ele.css("width", origW * fScaleX);
                $ele.css("height", origH * fScaleY);
                
                trackSize.scaleX = fScaleX;
                trackSize.scaleY = fScaleY;
                $ele.data("eg-track-size", trackSize);
                
                var data = $ele.data(TransformTween.dataName);
                if (!data) {
                    // Get the current values on the element and save
                    data = TransformTween.buildTransformData($ele);
                    $ele.data(TransformTween.dataName, data);
                }
                
                data.scaleX = 1.0/fScaleX;
                data.scaleY = 1.0/fScaleY;
                TransformTween.applyTransform( $ele, data, data.tween, {} );
            }
        };
        
        if(!htRedrawDivTimer[$ele[0]]) {
            setTimeout(fnDoTimeout, iTimeout);
        }
        htRedrawDivTimer[$ele[0]] = (new Date()).getMilliseconds();
    }
    
    TransformTween.applyTransform = function( ele, data, tween, opts ) {
        var $ele = $( ele );

        if(typeof window.AdobeEdge.applyCount !== "undefined")
            window.AdobeEdge.applyCount++;

        var isWebkit = ( 'webkitAppearance' in document.documentElement.style );
        var val, forceZ = true;
        var prop;
        if ( opts ) {
            forceZ = !opts.dontForceZ;
        }

        var translateX = combineTranslation( 1, data.translateX, data.motionTranslateX);
        var translateY = combineTranslation( 1, data.translateY, data.motionTranslateY);
        var rotateZ = combineTranslation ( 1, data.rotateZ, data.motionRotateZ);

        var supports3d = Edge.supported.cssTransform3d;

        if ( isWebkit ) {
            // Z transforms make some Android browsers sick, so don't write out unless necessary
            val = "translate(" + translateX + "," + translateY + ")";
            var num = getNumber( data.translateZ );
            if ( (num !== 0 || forceZ) && supports3d ) {
                val += " translateZ(" + data.translateZ + ")";
            }
            val += " rotate(" + rotateZ + ") "; // don't call it rotateZ - android gets ill

            if ( supports3d ) {
                num = getNumber( data.rotateY );
                if ( num !== 0 ) {
                    val += " rotateY(" + data.rotateY + ")";
                }

                num = getNumber( data.rotateX );
                if ( num !== 0 ) {
                    val += " rotateX(" + data.rotateX + ")";
                }
            }

            if ( data.skewX && data.skewX !== "0deg" ) {
                val += " skewX(" + data.skewX + ") ";
            }
            if ( data.skewY && data.skewY !== "0deg" ) {
                val += " skewY(" + data.skewY + ") ";
            }

            val += " scale(" + data.scaleX + "," + data.scaleY + ") ";

            num = getNumber( data.scaleZ );
            if ( num !== 1 && supports3d ) {
                val += " scaleZ(" + data.scaleZ + ")";
            }


            var ua = navigator.userAgent;

            // Don't do this in tool!
            if(!window.edge_authoring_mode && supports3d)   {
                $ele.css('-webkit-transform-style', 'preserve-3d');
            }

            $ele.css( '-webkit-transform', val );

            if ( tween && tween.observers.length ) {
                tween.notifyObservers( "onUpdate", { elapsed: 0, easingConst: 0, property: prop, value: val, element: $ele[0] } );
            }
            
            if(!window.edge_authoring_mode) {
                if ((data.scaleX > 1 || data.scaleY > 1) && $ele.hasClass("eg-svg-holder")) {
                    $ele.children(".eg-svg-image.eg-counter-scale").each(function (i, eleChild) {
                        var $eleChild = $(eleChild);
                        doCounterScale($eleChild, data.scaleX, data.scaleY);
                    });
                }
            }

        } else {
            var rotateY = getNumber( data.rotateY ), rotateX = getNumber( data.rotateX );
            var scaleX = data.scaleX * cos( deg2Rad * rotateY ), scaleY = data.scaleY * cos( deg2Rad * rotateX );

            val = "translate(" + translateX + "," + translateY + ")";
            val += " rotate(" + rotateZ + ")";
            if ( data.skewX && data.skewX !== "0deg" ) {
                val += " skewX(" + data.skewX + ") ";
            }
            if ( data.skewY && data.skewY !== "0deg" ) {
                val += " skewY(" + data.skewY + ") ";
            }
            val += " scale(" + scaleX + "," + scaleY + ")";

            $ele.css( '-moz-transform', val );

            $ele.css( '-o-transform', val );

            $ele.css( '-ms-transform', val );// This is here in case MS changes ie9 for bug 8346

            $ele.css( 'msTransform', val ); // work around jquery bug #8346 - IE9 uses wrong camelcase
            if ( tween && tween.observers.length ) {
                tween.notifyObservers( "onUpdate", { elapsed: 0, easingConst: 0, property: prop, value: val, element: $ele[0] } );
            }
        }
        $ele.css("transform", val);
    };


    TransformTween.dataName = "EdgeTransformData";
    var TransformIdRoot = "transform_";
    var TransformId = 1;
    $.extend(TransformTween.prototype, PropertyTween.prototype, {

        constructor: TransformTween,
        
        setup: function(timeline, context)
        {
            this.updateTriggered = false;
        },
        setValue: function (tt, prop, val) {
            var data = $.data(this, TransformTween.dataName);
            data[prop] = val;
        },
        getValue:function (prop, tt) {
            var data = $.data(this, TransformTween.dataName);
        },
        setupForAnimation: function(context) {
            var elements = this.getElementSet(context);
            var tween = this;
            elements.each(function() {
                var data = $.data(this, TransformTween.dataName);
                if (!data) {
                    // Get the current values on the element and save
                    data = tween.buildTransformData(this);
                    $.data(this, TransformTween.dataName, data);
                }
            });

            PropertyTween.prototype.setupForAnimation.call(this, context);

        },
        update: function(elapsed, easingConst, context)
        {
            PropertyTween.prototype.update.call(this, elapsed, easingConst, context);
            var elements = this.getElementSet(context);
            var tween = this;
            var prop = this.property;
            var tt = this.tweenType;
			
            elements.each(function(){
                // We only want to tween if the property data has a
                // matching animation id. If the ids don't match, that
                // means another animation has started which is modifying
                // this same property.

                var td = tween.getPropertyTweenData(this, tt, prop);
                if ( td.animationID !== tween.animationID ) {
                    return;
                }

                var data = $.data(this, TransformTween.dataName);
                data.timeline = context.timeline;
                data.tween = tween;
                UpdateFinalizer.Register(context.timeline, data.id, data);
            });
        },
        buildTransformData: function(ele){

            var data = Edge.parseCanonicalTransform(ele);
            if(data === null){
                data = {};
                var props = Edge.getTransformProps(ele);
                data.translateX = "0px";
                data.translateY = "0px";
                data.translateZ = "0px";
                data.scaleX = 1;
                data.scaleY = 1;
                data.scaleZ = 1;
                data.rotateX = "0deg";
                data.rotateY = "0deg";
                data.rotateZ = "0deg";
                data.skewXZ = 0;
                data.skewXY = 0;
                data.skewYZ = 0;
                data.skewX = '0deg';
                data.skewY = '0deg';
                if(data.matrix)
                    delete data.matrix;
                if(props){
                    data.translateX = formatNumber(props.translation[0]) + 'px';
                    data.translateY = formatNumber(props.translation[1]) + 'px';
                    data.translateZ = formatNumber(props.translation[2]) + 'px';
                    data.scaleX = formatNumber(props.scale[0]);
                    data.scaleY = formatNumber(props.scale[1]);
                    data.scaleZ = formatNumber(props.scale[2]);
                    data.rotateX = formatNumber(props.rotation[0] * rad2Deg) + 'deg';
                    data.rotateY = formatNumber(props.rotation[1] * rad2Deg) + 'deg';
                    data.rotateZ = formatNumber(props.rotation[2] * rad2Deg) + 'deg';
                    data.skewXY = props.skew[0];
                    data.skewXZ = props.skew[1];
                    data.skewYZ = props.skew[2];
                    data.skewX = formatNumber(Math.atan(props.skew[0]) * rad2Deg) + 'deg';
                }
            }
            if ( data === null ) {
                data = {};
            }

            data.id = TransformIdRoot + TransformId++;
            data.element = ele;
            data.onFinalUpdate = UpdateFinalizer.prototype._applyTransform;

            return data;
        },
        buildDefaultTransformData: function( ele ) {
            var data = {};
            data.translateX = "0px";
            data.translateY = "0px";
            data.translateZ = "0px";
            data.scaleX = 1;
            data.scaleY = 1;
            data.scaleZ = 1;
            data.rotateX = "0deg";
            data.rotateY = "0deg";
            data.rotateZ = "0deg";
            data.skewXZ = 0;
            data.skewXY = 0;
            data.skewYZ = 0;
            data.skewX = '0deg';
            data.skewY = '0deg';

            data.id = TransformIdRoot + TransformId++;
            data.element = ele;
            data.onFinalUpdate = UpdateFinalizer.prototype._applyTransform;

            return data;
        }
        // End of TransformTween extend
    });

    var getTransform = function(ele)
    {
        var isWebkit = ( 'webkitAppearance' in document.documentElement.style ),
            $ele = $(ele),
            style = $ele[0].style;


        var xform;
        if(isWebkit) {
            xform = $ele.get(0).style.webkitTransform;
            if(!xform)
                xform = $ele.css("-webkit-transform");
        }

        if(xform) {
            return xform;
        }

        xform = $ele.get(0).style.msTransform;
        if(!xform)
            xform = $ele.css("-ms-transform");
        if(!xform)
            xform = $ele.css("msTransform");
        if(!xform)
            xform = style.MozTransform;
        if(!xform)
            xform = style["-moz-transform"];
        if(!xform)
            xform = $ele.css("-moz-transform");
        if(!xform)
            xform = style.oTransform;
        if(!xform)
            xform = $ele.css("-o-transform");
        if(!xform)
            xform = style.transform;
        if(!xform)
            xform = $ele.css("transform");

        return xform || "";
    };

    var getTransformProps = function(ele, xformString)
    {
        var xform = typeof xformString === 'string' ? xformString : Edge.getTransform(ele);

        var isWebkit = ( 'webkitAppearance' in document.documentElement.style );

        var m;
        if(xform && xform !== 'none' && isWebkit){

            var cssM = new Edge.CSSMatrix();
            cssM.setMatrixValue(xform);
            m = Matrix4x4.fromCSSMatrix(cssM);
        }
        else if(xform && xform !== 'none'){

            m = Matrix4x4.fromCSSMatrixString(xform);
        }

        else {
            return undefined;
        }
        return Edge.decomposeTransform(m);
    };

    var canonOrder = {
        translate3d : 0,
        translate : 0,
        translateX : 0,
        translateY : 0,
        translateZ : 0,
        rotate : 1,
        rotateZ : 1,
        rotateX : 1,
        rotateY : 1,
        rotate3d : 1,
        skew: 2,
        skewX: 2,
        skewY: 2,
        scale3d: 3,
        scale: 3,
        scaleX: 3,
        scaleY: 3,
        scaleZ: 3,
        perspective: 4
    };
    var parseCanonicalTransform = function(ele, xformString)
    {
        var xform = typeof xformString === 'string' ? xformString : Edge.getTransform(ele);

        var re = /(\w+\s*\([^\)]*\))/g;
        var funcs = xform.match(re);

        if( !funcs )
            return null;

        var found = {};
        var hiWater = 0;
        var data = {};
        data.translateX = "0px";
        data.translateY = "0px";
        data.translateZ = "0px";
        data.scaleX = 1;
        data.scaleY = 1;
        data.scaleZ = 1;
        data.rotateX = "0deg";
        data.rotateY = "0deg";
        data.rotateZ = "0deg";
        data.skewXZ = 0;
        data.skewXY = 0;
        data.skewYZ = 0;
        data.skewX = '0deg';
        data.skewY = '0deg';

        var i;
        for(i = 0; i < funcs.length; i++){
            var func = funcs[i].match(/\w+/);
            if (found[func[0]] || canonOrder[func[0]] < hiWater){
                return null;
            }
            var params = funcs[i].match(/\([^\)]*\)/);
            params = params[0].replace(/[\(\)]/g, '');
            params = params.split(',');
            var angle;
            switch(func[0])
            {
                case('matrix'):
                    return null;
                case('translate3d'):
                    data.translateX = params[0];
                    data.translateY = params.length > 1 ? params[1] : '0px';
                    data.translateZ = params.length > 2 ? params[2] : '0px';

                    found.translate3d = found.translate = found.translateX = found.translateY = found.translateZ = true;
                    break;
                case('translate'):
                    data.translateX = params[0];
                    data.translateY = params.length > 1 ? params[1] : '0px';

                    found.translate3d = found.translate = found.translateX = found.translateY = true;
                    break;
                case('translateX'):
                    data.translateX = params[0];

                    found.translate3d = found.translate = found.translateX =  true;
                    break;
                case('translateY'):
                    data.translateY = params[0];

                    found.translate3d = found.translate = found.translateY = true;
                    break;
                case('translateZ'):
                    data.translateZ = params[0];

                    found.translate3d = found.translateZ = true;
                    break;
                case('rotate3d'):
                    found.rotate3d = found.rotate = found.rotateX = found.rotateY = found.rotateZ = true;
                    return null;
                case('rotateX'):
                    data.rotateX = params[0];
                    found.rotate3d = found.rotateX = true;
                    break;
                case('rotateY'):
                    data.rotateY = params[0];
                    found.rotate3d = found.rotateY = true;
                    break;
                case('rotateZ'):
                case('rotate'):
                    data.rotateZ = params[0];
                    found.rotate3d = found.rotate = found.rotateZ = true;
                    break;
                case('skew'):
                    data.skewX = params[0];
                    data.skewY = params.length > 1 ? params[1] : '0px';
                    found.skew = found.skewX = found.skewY = true;
                    break;
                case('skewX'):
                    data.skewX = params[0];
                    found.skew = found.skewX  = true;
                    break;
                case('skewY'):
                    data.skewY = params[0];
                    found.skew = found.skewY = true;
                    break;
                case('scale3d'):
                     // Note that according to spec y and z default to 1 in scale3d, but y defaults to the x value in scale!
                    data.scaleX = params[0];
                    data.scaleY = params.length > 1 ? params[1] : 1;
                    data.scaleZ = params.length > 2 ? params[2] : 1;

                    found.scale3d = found.scale = found.scaleX = found.scaleY = found.scaleZ = true;
                    break;
                case('scale'):
                    data.scaleX = params[0];
                    data.scaleY = params.length > 1 ? params[1] : params[0];
                    found.scale = found.scaleX = found.scaleY = true;
                    break;
                case('scaleX'):
                    data.scaleX = params[0];
                    found.scale3d = found.scale = found.scaleX = true;
                    break;
                case('scaleY'):
                    data.scaleY = params[0];
                    found.scale3d = found.scale = found.scaleY = true;
                    break;
                case('scaleZ'):
                    data.scaleZ = params[0];
                    found.scale3d = found.scaleZ = true;
                    break;
                case('perspective'):
                    found.perspective = true;
                    break;
            }
        }
        return data;
    };

    var forceGPU = function( ele ) {
        var isWebkit = ( 'webkitAppearance' in document.documentElement.style );
        if (isWebkit) {
            var transform = $(ele).css('-webkit-transform');
            if (!transform.match("/translateZ/") && !transform.match("/matrix3d/")) {
                $(ele).css('-webkit-transform', transform + ' translateZ(0)');
            }
        }
    };

    Edge.getTransformProps = getTransformProps;
    Edge.getTransform = getTransform;
    Edge.parseCanonicalTransform = parseCanonicalTransform;
    Edge.TransformTween = TransformTween;
    Edge.forceGPU = forceGPU;

    /** @name UpdateFinalizer
     @description Register a set of handlers added by tweens (or other objects) during an update to be called when a timeline
     update is final. At the conclusion of the     update, all handlers are removed.
     When the timeline is complete, this UpdateFinalizer is removed.

     */

    UpdateFinalizer = function(timeline){
        this.handlers = {};
        this.timeline = timeline;
    };

    UpdateFinalizer.Register = function(timeline, id, handlerObject){
        var finalizer = timeline.updateFinalizer;
        if(typeof finalizer === 'undefined'){
            finalizer = new UpdateFinalizer(timeline);
            timeline.updateFinalizer = finalizer;
            timeline.addObserver(finalizer);
        }
        finalizer.handlers[id] = handlerObject;
    };

    UpdateFinalizer.unRegister = function(timeline, id){		
        var finalizer = timeline.updateFinalizer;
        if(typeof finalizer !== 'undefined') {
            delete finalizer.handlers[id];
		}
    };

    $.extend(UpdateFinalizer.prototype, {
        _finalizeUpdate : function(elapsed, context){
            var data = {elapsed:elapsed, context:context};
            var methodName = "onFinalUpdate";
            var h;
            for(h in this.handlers){
                if(this.handlers.hasOwnProperty(h)){
                    var obj = this.handlers[h];
                    // Note that we call the handler function with 'this' set to the handler object
                    if (obj[methodName])
                        obj[methodName](data);
                }
            }
			
			this.handlers = {};
        },
        // Called by timeline notifyObservers
        postUpdate: function(tween, data){
            this._finalizeUpdate(data.elapsed, data.context);
        },
        // Called by timeline notifyObservers
        complete: function(data){
            if(this.timeline) {
                this.timeline.removeObserver(this);
			}
            this.timeline.updateFinalizer = undefined;
        },
        _applyTransform : function(updateData){
            // Note that this is called with 'this' set to the handler object
            var data = $.data(this.element, TransformTween.dataName);
            if ( data && updateData ) {
                TransformTween.applyTransform( this.element, data, data.tween, updateData.context );
            }
        }

    });

    TransformTween.UpdateFinalizer = UpdateFinalizer;

    /* Linear algebra stuff to support transform manipulation */
    /*global  WebKitCSSMatrix: false,  MozCSSMatrix: false, CSSMatrix : false */
    if(typeof CSSMatrix === 'undefined'){
        if(typeof WebKitCSSMatrix !== 'undefined')
            Edge.CSSMatrix = WebKitCSSMatrix;
        else if(typeof MozCSSMatrix !== 'undefined')
            Edge.CSSMatrix = MozCSSMatrix;
    }
    else {
        Edge.CSSMatrix = CSSMatrix;
    }

    var innerProd = function(a, b)
    {
        var sum = 0;
        var len = a.length;
        for(var i=0; i<len; i++){
            sum += a[i] * b[i];
        }
        return sum;
    };
    var vector3Length = function(x, y, z)
    {
        return Math.sqrt(x * x + y * y + z * z);

    };
    var vectorNorm = function(v)
    {
        var sum = 0;
        var len = v.length;
        for(var i=0; i<len; i++){
            sum += v[i] * v[i];
        }
        return Math.sqrt(sum);
    };
    var vectorNormalize = function(v)
    {
        var len = v.length;
        var norm = vectorNorm(v);
        var w = new Array(len);
        if(norm === 0)
            norm = 1;
        for(var i=0; i<len; i++){
            w[i] = v[i]/norm;
        }
        return w;
    };
    var combine = function(a, b, ascl, bscl)
    {
        // see the CSS 2d Transform spec
        var result = new Array(3);
        result[0] = (ascl * a[0]) + (bscl * b[0]);
        result[1] = (ascl * a[1]) + (bscl * b[1]);
        result[2] = (ascl * a[2]) + (bscl * b[2]);
        return result;
    };


    var vector3Cross = function(a, b)
    {
        // For 1-based, the formula is :
        //(a2b3 - a3b2, a3b1 - a1b3, a1b2 - a2b1)
        var result = new Array(3);
        if(a.length !== 3 || b.length !== 3)
            return null;

        result[0] = a[1] * b[2] - a[2] * b[1];
        result[1] = a[2] * b[0] - a[0] * b[2];
        result[2] = a[0] * b[1] - a[1] * b[0];
        return result;
    };

    Matrix4x4 = function(other){
        var i, j;
        if(other){
            for(i=0; i<4; i++){
                this[i] = new Array(4);
                for(j=0; j<4; j++)
                    this[i][j] = other[i][j];
            }
        } else {
            for(i=0; i<4; i++){
                this[i] = new Array(4);
                for(j=0; j<4; j++)
                    this[i][j] = 0;
                this[i][i] = 1;
            }
        }
        this.size = 4;
    };

    Matrix4x4.fromCSSMatrix = function (m)
    {
        var result = new Matrix4x4();

        result[0][0] = m.m11;
        result[0][1] = m.m12;
        result[0][2] = m.m13;
        result[0][3] = m.m14;
        result[1][0] = m.m21;
        result[1][1] = m.m22;
        result[1][2] = m.m23;
        result[1][3] = m.m24;
        result[2][0] = m.m31;
        result[2][1] = m.m32;
        result[2][2] = m.m33;
        result[2][3] = m.m34;
        result[3][0] = m.m41;
        result[3][1] = m.m42;
        result[3][2] = m.m43;
        result[3][3] = m.m44;
        return result;
    };



    var angleToRadians = function(s)
    {
        s = s.toLowerCase();
        if(typeof s !== 'string')
            return 0;
        var o = splitUnits(s);
        if(o.units === 'deg')
            o.num *= deg2Rad;
        return o.num;
    };

    Matrix4x4.fromCSSMatrixString = function (s)
    {
        var result = new Matrix4x4();

        var re = /(\w+\s*\([^\)]*\))/g;
        var funcs = s.match(re);

        if(typeof funcs === 'undefined' || funcs === null)
            return result;

        var i;
        for(i = 0; i < funcs.length; i++){
            var func = funcs[i].match(/\w+/);
            var params = funcs[i].match(/\([^\)]*\)/);
            params = params[0].replace(/[\(\)]/g, '');
            params = params.split(',');
            var angle;
            var x, y, z, d, sx, sy, sz, scale;

            switch(func[0])
            {
                case('matrix'):
                    var temp = new Matrix4x4();
                    if(params.length === 6){
                        temp[0][0] = parseFloat(params[0]);
                        temp[0][1] = parseFloat(params[1]);
                        temp[1][0] = parseFloat(params[2]);
                        temp[1][1] = parseFloat(params[3]);
                        temp[3][0] = parseFloat(params[4]);
                        temp[3][1] = parseFloat(params[5]);
                        result.preMultiplyBy(temp);
                    }
                    break;
                case('translate3d'):
                    x = splitUnits(params[0]).num;
                    y = params.length > 1 ? splitUnits(params[1]).num : 0;
                    z = params.length > 2 ? splitUnits(params[2]).num : 0;
                    result.translate3d(x, y, z);
                    break;
                case('translate'):
                    x = splitUnits(params[0]).num;
                    y = params.length > 1 ? splitUnits(params[1]).num : 0;
                    result.translate3d(x, y, 0);
                    break;
                case('translateX'):
                    d = splitUnits(params[0]).num;
                    result.translate3d(d, 0, 0);
                    break;
                case('translateY'):
                    d = splitUnits(params[0]).num;
                    result.translate3d(0, d, 0);
                    break;
                case('translateZ'):
                    d = splitUnits(params[0]).num;
                    result.translate3d(0, 0, d);
                    break;
                case('rotate3d'):
                    if(params.length >= 3){
                        x = splitUnits(params[0]).num;
                        y = splitUnits(params[1]).num;
                        z = splitUnits(params[2]).num;
                        angle = angleToRadians(params[3]);
                        result.rotate3d(x, y, z, angle, true);
                    }
                    break;
                case('rotateX'):
                    angle = angleToRadians(params[0]);
                    result.rotateX(angle);
                    break;
                case('rotateY'):
                    angle = angleToRadians(params[0]);
                    result.rotateY(angle);
                    break;
                case('rotateZ'):
                case('rotate'):
                    angle = angleToRadians(params[0]);
                    result.rotateZ(angle);
                    break;
                case('skew'):
                    var angleX = angleToRadians(params[0]);
                    var angleY = angleToRadians(params[1]);
                    result.skew(angleX, angleY);
                    break;
                case('skewX'):
                    angle = angleToRadians(params[0]);
                    result.skew(angle, 0);
                    break;
                case('skewY'):
                    angle = angleToRadians(params[0]);
                    result.skew(0, angle);
                    break;
                case('scale3d'):
                    sx = parseFloat(params[0]);
                    sy = params.length > 1 ? parseFloat(params[1]) : 1;
                    sz = params.length > 2 ? parseFloat(params[2]) : 1;
                    result.scale(sx, sy, sz);
                    break;
                case('scale'):
                    sx = parseFloat(params[0]);
                    sy = params.length > 1 ? parseFloat(params[1]) : 1;
                    result.scale(sx, sy, 1);
                    break;
                case('scaleX'):
                    scale = parseFloat(params[0]);
                    result.scale(scale, 1, 1);
                    break;
                case('scaleY'):
                    scale = parseFloat(params[0]);
                    result.scale(1, scale, 1);
                    break;
                case('scaleZ'):
                    scale = parseFloat(params[0]);
                    result.scale(1, 1, scale);
                    break;
                case('perspective'):
                    d = parseFloat(params[0]);
                    result.perspective(d);
                    break;
            }
        }

        return result;
    };

    $.extend(Matrix4x4.prototype, {
        identity : function()
        {
            for(var i=0; i<4; i++){
                this[i] = new Array(4);
                for(var j=0; j<4; j++)
                    this[i][j] = 0;
                this[i][i] = 1;
            }
            return this;
        },
        determinant : function(){
            var m00 = this[0][0];
            var m01 = this[0][1];
            var m02 = this[0][2];
            var m03 = this[0][3];
            var m10 = this[1][0];
            var m11 = this[1][1];
            var m12 = this[1][2];
            var m13 = this[1][3];
            var m20 = this[2][0];
            var m21 = this[2][1];
            var m22 = this[2][2];
            var m23 = this[2][3];
            var m30 = this[3][0];
            var m31 = this[3][1];
            var m32 = this[3][2];
            var m33 = this[3][3];


            // THis could be faster - we need to factor out some of the
            // multiplies we do multiple times

            var det = m03 * m12 * m21 * m30 - m02 * m13 * m21 * m30-
                    m03 * m11 * m22 * m30+m01 * m13 * m22 * m30+
                    m02 * m11 * m23 * m30-m01 * m12 * m23 * m30-
                    m03 * m12 * m20 * m31+m02 * m13 * m20 * m31+
                    m03 * m10 * m22 * m31-m00 * m13 * m22 * m31-
                    m02 * m10 * m23 * m31+m00 * m12 * m23 * m31+
                    m03 * m11 * m20 * m32-m01 * m13 * m20 * m32-
                    m03 * m10 * m21 * m32+m00 * m13 * m21 * m32+
                    m01 * m10 * m23 * m32-m00 * m11 * m23 * m32-
                    m02 * m11 * m20 * m33+m01 * m12 * m20 * m33+
                    m02 * m10 * m21 * m33-m00 * m12 * m21 * m33-
                    m01 * m10 * m22 * m33+m00 * m11 * m22 * m33;
            return det;
        },

        normalizeTransform: function() // Normalize in place
        {
            // Normalize the matrix.
            if (this[3][3] === 0)
                return false;

            for (var i = 0; i < 4; i++)
                for (var j = 0; j < 4; j++)
                    this[i][j] /= this[3][3];
            return true;
        },
        transpose: function()
        {
            var m = new Matrix4x4();

            for (var i = 0; i < 4; i++)
                for (var j = 0; j < 4; j++)
                    m[i][j] = this[j][i];
            return m;
        },
        
        toCSSMatrix: function()
        {
            var m = new Edge.CSSMatrix();

            m.m11 = this[0][0];
            m.m12 = this[0][1];
            m.m13 = this[0][2];
            m.m14 = this[0][3];
            m.m21 = this[1][0];
            m.m22 = this[1][1];
            m.m23 = this[1][2];
            m.m24 = this[1][3];
            m.m31 = this[2][0];
            m.m32 = this[2][1];
            m.m33 = this[2][2];
            m.m34 = this[2][3];
            m.m41 = this[3][0];
            m.m42 = this[3][1];
            m.m43 = this[3][2];
            m.m44 = this[3][3];
            return m;
        },

        _inverse : function()
        {
            // Unimplemented by default
            return this;
        },
        // This depends on CSSMatrix.inverse being defined OR adding _inverse from edge.matrix.js
        // It will return essentially nonsense if one of those isn't done.
        // However the only time we call this function is if there is perspective defined.
        // We can only get perspective if 3d transforms are supported, and all browsers (so far)
        // that support 3d also supply a CSSMatrix with inverse() defined.
        inverse: function()
        {
            //var testOurInverse = _inverse(); // dead code?

            if(Edge.CSSMatrix !== undefined){
                var m = this.toCSSMatrix();
                var result = m.inverse();
                return Matrix4x4.fromCSSMatrix(result);
            }
            return this._inverse();
        },


        rotate3d : function (x, y, z, angle, angleIsRadians){
            var rotate = new Edge.Matrix4x4();
            if(!angleIsRadians)
                angle *= deg2Rad;

            if (angle) {
                var s;
                var c;

                var len = vector3Length(x, y, z);
                if (len !== 0) {
                    x = x / len;
                    y = y / len;
                    z = z / len;

                    s = sin(angle);
                    c = cos(angle);
                    /* From the CSS3 spec:
                     This function is equivalent to
                     matrix3d(
                     1 + (1-cos(angle))*(x*x-1), -z*sin(angle)+(1-cos(angle))*x*y, y*sin(angle)+(1-cos(angle))*x*z, 0,
                     z*sin(angle)+(1-cos(angle))*x*y, 1 + (1-cos(angle))*(y*y-1), -x*sin(angle)+(1-cos(angle))*y*z, 0,
                     -y*sin(angle)+(1-cos(angle))*x*z, x*sin(angle)+(1-cos(angle))*y*z, 1 + (1-cos(angle))*(z*z-1), 0,
                     0, 0, 0, 1) (this is in column-major order )
                     */

                    rotate[0][0] = 1 + (1-c)*(x*x-1);
                    rotate[1][0] = -z*s+(1-c)*x*y;
                    rotate[2][0] = y*s+(1-c)*x*z;
                    rotate[3][0] = 0;
                    rotate[0][1] = z*s+(1-c)*x*y;
                    rotate[1][1] = 1 + (1-c)*(y*y-1);
                    rotate[2][1] = -x*s+(1-c)*y*z;
                    rotate[3][1] = 0;
                    rotate[0][2] = -y*s+(1-c)*x*z;
                    rotate[1][2] = x*s+(1-c)*y*z;
                    rotate[2][2] = 1 + (1-c)*(z*z-1);
                    rotate[3][2] = 0;
                    rotate[0][3] = 0;
                    rotate[1][3] = 0;
                    rotate[2][3] = 0;
                    rotate[3][3] = 1;
                }
            }

            return this.preMultiplyBy(rotate);
        },

        rotateX : function (degreesF)
        {
            return this.rotate3d(1, 0, 0, degreesF);
        },

        rotateY : function(degreesF)
        {
            return this.rotate3d(0, 1, 0, degreesF);
        },

        rotateZ : function(degreesF)
        {
            return this.rotate3d(0, 0, 1, degreesF);
        },

        translate3d : function(x, y, z)
        {
            var translate  = new Edge.Matrix4x4();
			
            translate[3][0] += x;
            translate[3][1] += y;
            translate[3][2] += z;
			
            return this.preMultiplyBy(translate);
        },
        /*
         --! scale the the matrix by a specified amount  Note that this
         --! operation is additive
         --! @param scaleX (number) the horizontal scale
         --! @param scaleY (number) the vertical scale
         --! @return (table) self
         */

        scale: function(scaleX, scaleY, scaleZ)
        {
            if ( (scaleX !== 1.0) || (scaleY !== 1.0)  || (scaleZ !== 1.0) )
            {
                var scale = new Edge.Matrix4x4();

                scale[0][0] = scaleX;
                scale[1][1] = scaleY;
                scale[2][2] = scaleZ;

                return this.preMultiplyBy(scale);
            }
            return this;
        },

        skew: function(angleX, angleY, angleIsRadians)
        {
            if(!angleIsRadians){
                angleX *= deg2Rad;
                angleY *= deg2Rad;
            }
            if(angleX !== 0){
                var skewX = new Edge.Matrix4x4();
                skewX[1][0] = tan(angleX);
                this.preMultiplyBy(skewX);
            }
            if(angleY !== 0){
                var skewY = new Edge.Matrix4x4();
                skewY[0][1] = tan(angleY);
                this.preMultiplyBy(skewY);
            }
            return this;
        },

        perspective: function(d)
        {

            if(d !== 0){
                var persp = new Edge.Matrix4x4();
                persp[2][3] = 1/d;
                this.preMultiplyBy(persp);

            }
            return this;
        },
        /*
         --! skew the the matrix by a set of skew factors.  Note that this
         --! operation is additive
         --! @param skew - skew factors XY,XZ,YZ
         --! @return (table) self
         */

        skewByFactors : function(skewXY,skewXZ,skewYZ)
        {
            var temp = new Edge.Matrix4x4();

            temp[2][1] = skewYZ;
            this.preMultiplyBy(temp);

            temp.identity();
            temp[2][0] = skewYZ;
            this.preMultiplyBy(temp);

            temp.identity();
            temp[1][0] = skewYZ;
            this.preMultiplyBy(temp);

            return this;
        },

        applyPerspective: function (perspX, perspY, perspZ, perspW)
        {
            var temp = new Edge.Matrix4x4();

            temp[0][3] = perspX;
            temp[1][3] = perspY;
            temp[2][3] = perspZ;
            temp[3][3] = perspW;

            this.preMultiplyBy(temp);

            return this;
        },

        preMultiplyBy : function (other){
            // We do it inline with locals to save loops and lookups
            // Tedious but faster execution
            var a00=other[0][0];
            var a01=other[0][1];
            var a02=other[0][2];
            var a03=other[0][3];
            var a10=other[1][0];
            var a11=other[1][1];
            var a12=other[1][2];
            var a13=other[1][3];
            var a20=other[2][0];
            var a21=other[2][1];
            var a22=other[2][2];
            var a23=other[2][3];
            var a30=other[3][0];
            var a31=other[3][1];
            var a32=other[3][2];
            var a33=other[3][3];

            var b00=this[0][0];
            var b01=this[0][1];
            var b02=this[0][2];
            var b03=this[0][3];
            var b10=this[1][0];
            var b11=this[1][1];
            var b12=this[1][2];
            var b13=this[1][3];
            var b20=this[2][0];
            var b21=this[2][1];
            var b22=this[2][2];
            var b23=this[2][3];
            var b30=this[3][0];
            var b31=this[3][1];
            var b32=this[3][2];
            var b33=this[3][3];

            this[0][0] = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
            this[0][1] = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
            this[0][2] = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
            this[0][3] = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33;

            this[1][0] = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30;
            this[1][1] = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31;
            this[1][2] = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32;
            this[1][3] = a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33;

            this[2][0] = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30;
            this[2][1] = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31;
            this[2][2] = a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32;
            this[2][3] = a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33;

            this[3][0] = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30;
            this[3][1] = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31;
            this[3][2] = a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32;
            this[3][3] = a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33;

            return this;
        }

    });
    Edge.Matrix4x4 = Matrix4x4;


    Edge.decomposeTransform = function(inMatrix)
    {
        // fields will be : translation, rotation, scale, skew, perspective
        var returnValue;
        var mtrx = new Matrix4x4(inMatrix);

        if(!mtrx.normalizeTransform())
            return null;

        // perspectiveMatrix is used to solve for perspective, but it also provides
        // an easy way to test for singularity of the upper 3x3 component.

        var perspectiveMatrix = new Matrix4x4(inMatrix);

        for (var i = 0; i < 3; i++)
            perspectiveMatrix[i][3] = 0;

        perspectiveMatrix[3][3] = 1;

        if (perspectiveMatrix.determinant(perspectiveMatrix) === 0){
            if (window.edge_authoring_mode) {
                window.alert("Bad perspective matrix");
            }
            return null;
        }

        // First, isolate perspective.
        var rightHandSide = new Array(4);
        var perspective = new Array(4);
        // rightHandSide is the right hand side of the equation.
        if (mtrx[0][ 3] !== 0 || mtrx[1][3] !== 0 || mtrx[2][3] !== 0) {
            rightHandSide[0] = mtrx[0][3];
            rightHandSide[1] = mtrx[1][3];
            rightHandSide[2] = mtrx[2][3];
            rightHandSide[3] = mtrx[3][3];

            // Solve the equation by inverting perspectiveMatrix and multiplying
            // rightHandSide by the inverse.
            var inversePerspectiveMatrix = perspectiveMatrix.inverse();
            if(!inversePerspectiveMatrix)
                return false; // shouldn't happen because we already checked determinant

            var transposedInversePerspectiveMatrix = inversePerspectiveMatrix.transpose();
            perspective = transposedInversePerspectiveMatrix.rightMultiply(rightHandSide);

            // Clear the perspective partition
            mtrx[0][3] = mtrx[1][3] = mtrx[2][3] = 0;
            mtrx[3][3] = 1;
        }

        else{
            // No perspective.
            perspective[0] = perspective[1] = perspective[2] = 0;
            perspective[3] = 1;
        }

        // Next take care of translation
        var translation = new Array(3);
        translation[0] = mtrx[3][0];
        mtrx[3][0] = 0;
        translation[1] = mtrx[3][1];
        mtrx[3][1] = 0;
        translation[2] = mtrx[3][2];
        mtrx[3][2] = 0;

        // Now get scale and shear. 'row' is a 3 element array of 3 component vectors
        var row = new Array(3);
        row[0] = new Array(3);
        row[1] = new Array(3);
        row[2] = new Array(3);

        for (var j = 0; j < 3; j++){
            row[j][0] = mtrx[j][0];
            row[j][1] = mtrx[j][1];
            row[j][2] = mtrx[j][2];
        }

        // Compute X scale factor and normalize first row.
        var scale = new Array(3);
        scale[0] = vectorNorm(row[0]);
        row[0] = vectorNormalize(row[0]);


        // Compute XY shear factor and make 2nd row orthogonal to 1st.
        var skew = new Array(3);
        skew[0] = innerProd(row[0], row[1]);
        row[1] = combine(row[1], row[0], 1.0, -skew[0]);

        // Now, compute Y scale and normalize 2nd row.
        scale[1] = vectorNorm(row[1]);
        row[1] = vectorNormalize(row[1]);
        if(scale[1] !== 0){
            skew[0] /= scale[1];
        }


        // Compute XZ and YZ shears, orthogonalize 3rd row
        skew[1] = innerProd(row[0], row[2]);
        row[2] = combine(row[2], row[0], 1.0, -skew[1]);
        skew[2] = innerProd(row[1], row[2]);
        row[2] = combine(row[2], row[1], 1.0, -skew[2]);

        // Next][ get Z scale and normalize 3rd row.
        scale[2] = vectorNorm(row[2]);
        if(scale[2] !== 0) {
            row[2] = vectorNormalize(row[2]);
        }
        if(scale[2] !== 0){
            skew[1] /= scale[2];
            skew[2] /= scale[2];
        }

        // At this point][ the matrix [in rows] is orthonormal.
        // Check for a coordinate system flip.  If the determinant
        // is -1][ then negate the matrix and the scaling factors.
        var pdum3 = vector3Cross(row[1], row[2]);
        if (innerProd(row[0], pdum3) < 0){

            for (var k = 0; k < 3; k++) {
                scale[k] *= -1; // THIS IS WRONG IN THE SPEC! See the original gem for their correct version
                // http://tog.acm.org/resources/GraphicsGems/gemsii/unmatrix.c
                row[k][0] *= -1;
                row[k][1] *= -1;
                row[k][2] *= -1;
            }
        }
        // Now, get the rotations ou
        var rotation = new Array(3);
        rotation[1] = asin(-row[0][2]);
        if (cos(rotation[1]) !== 0){
            rotation[0] = atan2(row[1][2], row[2][2]);
            rotation[2] = atan2(row[0][1], row[0][0]);
        }
        else{
            rotation[0] = atan2(-row[2][0], row[1][1]);
            rotation[2] = 0;
        }

        returnValue = {translation:translation, rotation:rotation, scale:scale, skew:skew, perspective: perspective};
        return returnValue;
    };


    Edge.Timeline.addTweenType("transform", function(ele, prop, val, opts){ return new TransformTween("transform", ele, prop, val, opts); });

})(jQuery, AdobeEdge, AdobeEdge.PropertyTween);

/// Filename: edge.color-tween.js

/***
 @name ColorTween
 @class Defines a tween that can animate the background-color and color properties in rgb or hsl color space.
 This defines a tween type of "color' which can parse color properties in RGB or HSL css formats and convert them
 to the desired animation color space - HSL or RGB. (It is also planned to later support color names as css property
 values.
 */

(function(jQuery, Edge, PropertyTween){

    var $ = jQuery;

    var supportTested = false, supportRGB = false, supportHSL = false, supportRGBA = false, supportHSLA = false;

    function testSupport() {
        if(!supportTested){

            var ele = document.createElement("div"), $ele = $(ele), val;
            $ele.css("background-color", "transparent");
            var transparent = $ele.css("background-color");
            $ele.css("background-color", "rgb(100, 100, 100)");
            val = $ele.css("background-color");
            supportRGB = val != transparent;

            $ele.css("background-color", "transparent");
            $ele.css("background-color", "hsl(100, 100%, 100%)");
            val = $ele.css("background-color");
            supportHSL = val != transparent;

            $ele.css("background-color", "transparent");
            $ele.css("background-color", "rgba(100, 100, 100,.5)");
            val = $ele.css("background-color");
            supportRGBA = val != transparent;

            $ele.css("background-color", "transparent");
            $ele.css("background-color", "hsla(100, 100%, 100%, .5)");
            val = $ele.css("background-color");
            supportHSLA = val != transparent;

            supportTested = true;
        }
    }

    function ColorTween(tweenType, elements, property, val, opts) {
        Edge.PropertyTween.call(this, tweenType, elements, property, val, opts);
        this.name = "colorTween";
        testSupport();
    }

    $.extend(ColorTween.prototype, PropertyTween.prototype, {

        constructor: ColorTween,

        getValue: function (prop, tt) {
            var fv = $(this).css(prop);
            return fv;
        },
        setValue: function (tt, prop, val) {
            $(this).css(prop, val);
        },
        parseValue: function(val) {
            var colorValueObj = Edge.parseColorValue(val);

            if (!colorValueObj || !colorValueObj.colorFunction || !colorValueObj.values)
                return;

            var values = colorValueObj.values;

            var colorFn = colorValueObj.colorFunction;

            var patternRGB = /rgb/gi;
            var patternHSL = /hsl/gi;
            var valueRGB, valueHSL, opacity;

            if (colorFn.match(patternRGB)) {
                if (this.animationColorSpace && this.animationColorSpace == 'HSL') {
                    valueRGB = {r:values[0], g:values[1], b:values[2]};
                    valueHSL = Edge.rgbToHSL(valueRGB);
                    if (!valueHSL) {
                        values = [];
                    }
                    else if (values.length > 3) {
                        opacity = values[3];
                        values = [valueHSL.h, valueHSL.s, valueHSL.l, opacity];
                    }
                    else {
                        values = [valueHSL.h, valueHSL.s, valueHSL.l];
                    }
                }
                else if (!this.animationColorSpace) {
                    this.animationColorSpace = 'RGB';
                }
                else if (this.animationColorSpace != 'RGB') {
                    //Unexpected value, Not yet implemented
                    return values;
                }
            }
            else if (colorFn.match(patternHSL)){ //HSL
                if (this.animationColorSpace && this.animationColorSpace == 'RGB') {
                    valueHSL = {h:values[0], s:values[1], l:values[2]};
                    valueRGB = Edge.hslToRGB(valueHSL);
                    if (!valueRGB) {
                        values = [];
                    }
                    else if (values.length > 3) {
                        opacity = values[3];
                        values = [valueRGB.r, valueRGB.g, valueRGB.b, opacity];
                    }
                    else {
                        values = [valueRGB.r, valueRGB.g, valueRGB.b];
                    }
                }
                else if (!this.animationColorSpace) {
                    this.animationColorSpace = 'HSL';
                }
                else if (this.animationColorSpace != 'HSL') {
                    //Unexpected value, Not yet implemented
                    return values;
                }

            }

            if (values.length == 3) {
                values[3] = 1; // Normalize to rgba or hsla, set the opacity to 1
            }

            return values;
        },
        formatValue: function(values) {
            testSupport();
            if (!values)
                return;

            var formattedValue;
            var colorFn;
            if (this.animationColorSpace == 'HSL' && supportHSLA) {
                colorFn = 'hsl';
                if (values.length == 4 && supportHSLA) {
                    formattedValue = colorFn + 'a(' + values[0] + ','+ values[1] + '%,' + values[2] + '%,' + values[3] + ')';
                }
                else {
                    formattedValue = colorFn + '(' + values[0] + ','+ values[1] + '%,' + values[2] + '%)';
                }
            }
            else if(supportRGBA) {
                colorFn = 'rgb';
                if (values.length == 4 && supportRGBA) {
                    formattedValue = colorFn + 'a(' + values[0] + '%,'+ values[1] + '%,' + values[2] + '%,' + values[3] + ')';
                }
                else {
                    formattedValue = colorFn + '(' + values[0] + '%,'+ values[1] + '%,' + values[2] + '%)';
                }
            }
            else {
                // Downlevel support
                var r = values[0], g = values[1], b = values[2];
                if(this.animationColorSpace == 'HSL') {
                    var rgb = Edge.hslToRGB({h: values[0], g: values[1], b: values[2]});
                    r = rgb.r;
                    g = rgb.g;
                    b = rgb.b;
                }
                r *= 255 / 100;
                g *= 255 / 100;
                b *= 255 / 100;
                var val = Math.floor(r) * 256 * 256 + Math.floor(g) * 256 + Math.floor(b);
                formattedValue = "#" + val.toString(16);
            }
            return formattedValue;
        }
    });

    Edge.ColorTween = ColorTween;

    Edge.Color = { formatValue: ColorTween.prototype.formatValue, parseValue: ColorTween.prototype.parseValue };

    Edge.parseColorValue = function(val) {
        if (!val)
            return;

        var values = [];

        var colorFn;
        var params;

        // Tests for #ffffff
        var colorExpHex6 = /^\s*#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})\s*$/;
        // Tests for #fff
        var colorExpHex3 = /^\s*#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])\s*$/;

        if ( (params = colorExpHex6.exec(val)) ) {
            values = [((parseInt(params[1],16))/255)*100, ((parseInt(params[2],16))/255)*100, ((parseInt(params[3],16))/255)*100];
            colorFn = 'rgb';
        }
        else if ( (params = colorExpHex3.exec(val)) ) {
            values = [((parseInt(params[1]+params[1],16))/255)*100, ((parseInt(params[2]+params[2],16))/255)*100, ((parseInt(params[3]+params[3],16))/255)*100];
            colorFn = 'rgb';
        }
		else if ( val == "transparent" ) {
			values = [0,0,0,0];
			colorFn = 'rgb';
		}

        if (!colorFn) {
            colorFn = val.toString().match(/\w+/);
            if($.isArray(colorFn)) {
                colorFn = colorFn[0];
            }
            else if (!colorFn)
                colorFn = "";

            params = val.toString().match(/\([^\)]*\)/);

            if (params && params.length > 0)
                params = params[0].replace(/[\(\)]/g, '');
        }

        var patternRGB = /rgb/gi;
        var patternHSL = /hsl/gi;
        var i;

        if (values.length === 0) {
            if (colorFn.match(patternRGB)) {
                //Tests for % or ints
                // Test for numbers
                var splitParams = /^\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*(?:,\s*([0-9](?:\.[0-9]+)?)\s*)?$/.exec(params);
                if (splitParams && splitParams.length >= 4) {
                    for (i=0;i<3;i++) {
                        // if the number is an integer (from 0 -255) normalize to percent
                        values[i] = (splitParams[i+1]/255) * 100;
                    }
                    if (splitParams.length > 4) {
                        if (!splitParams[4])
                            splitParams[4] = 1;
                        values[3] = splitParams[4]; // opacity
                    }
                }
                else {
                    // Tests for float %
                    params = /^\s*([0-9]{1,3}(?:\.[0-9]+)?)\s*%\s*,\s*([0-9]{1,3}(?:\.[0-9]+)?)\s*%\s*,\s*([0-9]{1,3}(?:\.[0-9]+)?)\s*%\s*(?:,\s*([0-9](?:\.[0-9]+)?)\s*)?$/.exec(params);
                    if (params && params.length >= 4) {
                        /// Get rid of any unnecessary data captured
                        if (params.length >= 5) {
                            params.length = 5;
                            if (!params[4])
                                params[4] = 1;
                        }
                        for (i=0;i<(params.length-1);i++) {
                            // if the number is a percentage copy it as is
                            values[i] = params[i+1];
                        }
                    }
                }

            }
            else if (colorFn.match(patternHSL)){ //HSL
                params = /^\s*([0-9]{1,3}(?:\.[0-9]+)?)\s*,\s*([0-9]{1,3}(?:\.[0-9]+)?)\s*%\s*,\s*([0-9]{1,3}(?:\.[0-9]+)?)\s*%\s*(?:,\s*([0-9](?:\.[0-9]+)?)\s*)?$/.exec(params);
                if (params && params.length >= 4) {
                    /// Get rid of any unnecessary data captured
                    if (params.length >= 5) {
                        params.length = 5;
                        if (!params[4])
                            params[4] = 1;
                    }
                    for (i=0;i<(params.length-1);i++) {
                        values[i] = params[i+1];
                    }
                }
            }
        }

        // Round to 4 decimal places
        if (values) {
            for (i=0; i<values.length;i++)
                values[i] = (Math.round(values[i]*10000))/10000;
        }

        var colorValueObj = {colorFunction: colorFn, values:values};

        return colorValueObj;
    };

    var oneThird = 1.0 / 3.0;
    var oneSixth = 1.0 / 6.0;
    var twoThirds = 2.0 / 3.0;

    var normalizeColorComponent = function(c)
    {
        if( c < 0.0 )
            return c + 1.0;
        else if( c > 1 )
            return c - 1.0;
        else
            return c;
    };

    var rgbComponentFromIntermediate = function( p, q, multiplier, tC )
    {
        if( tC < oneSixth )
            return p + multiplier * tC;
        else if( tC < 0.5 )
            return q;
        else if( tC < twoThirds )
            return p + multiplier * ( twoThirds - tC );
        else
            return p;
    };

    /** @name hslToRGB
     Assumes hsl values as (deg, %, %). Returns rgb as percentage
     */
    Edge.hslToRGB = function(hsl)
    {
        if (hsl === null || hsl.s < 0 || hsl.s > 100 || hsl.l < 0 || hsl.l > 100)
            return null;

        // Normalize the hue
        while (hsl.h > 360)
            hsl.h = hsl.h - 360;

        while (hsl.h < 0)
            hsl.h = 360 + hsl.h;

        var rgb = {};

        var h = hsl.h/360;
        var s = hsl.s/100;
        var l = hsl.l/100;

        if (s === 0) {
            rgb.r = rgb.g = rgb.b = l;
        }
        else {
            var q;
            if (l <= 0.5) {
                q = l * (1 + s);
            }
            else {
                q = l + s - (l * s);
            }

            var p = 2.0 * l - q;

            var tR = normalizeColorComponent( h + oneThird );
            var tG = normalizeColorComponent( h );
            var tB = normalizeColorComponent( h - oneThird );

            var multiplier = ( q - p ) * 6.0;

            rgb.r = rgbComponentFromIntermediate( p, q, multiplier, tR );
            rgb.g = rgbComponentFromIntermediate( p, q, multiplier, tG );
            rgb.b = rgbComponentFromIntermediate( p, q, multiplier, tB );
        }

        rgb.r = Math.min(rgb.r*100, 100);
        rgb.g = Math.min(rgb.g*100, 100);
        rgb.b = Math.min(rgb.b*100, 100);

        // Round to 4 decimal places
        rgb.r = (Math.round(rgb.r*10000))/10000;
        rgb.g = (Math.round(rgb.g*10000))/10000;
        rgb.b = (Math.round(rgb.b*10000))/10000;

        return rgb;
    };

    /** @name rgbToHSL
     Assumes rgb values as a percentage. Returns hsl as (deg, %,%)
     */
    Edge.rgbToHSL = function(rgb)
    {
        if (rgb === null || rgb.r < 0 || rgb.r > 100 || rgb.g < 0 || rgb.g > 100 || rgb.b < 0 || rgb.b > 100)
            return null;

        var hsl = {h: 0, s: 0, l: 0 };

        var r = rgb.r/100;
        var g = rgb.g/100;
        var b = rgb.b/100;

        var maxColor = Math.max(r,g,b);
        var minColor = Math.min(r,g,b);

        hsl.l = (maxColor + minColor)/2.0;

        // If the max and min colors are the same (ie the color is some kind of grey), S is defined to be 0,
        // and H is undefined but in programs usually written as 0
        if (maxColor > minColor && hsl.l > 0.0) {

			var colorDiff = maxColor - minColor;
			if (hsl.l <= 0.5) {
				hsl.s = colorDiff/(maxColor + minColor);
			}
			else {
				hsl.s = colorDiff/(2.0 - maxColor - minColor);
			}
	
			if (maxColor == b) {
				hsl.h = 4.0 + (r - g)/colorDiff;
			}
			else if (maxColor == g) {
				hsl.h = 2.0 + (b - r)/colorDiff;
			}
			else {  // maxColor == r
				hsl.h = (g - b)/colorDiff;
			}
	
			// Normalize hue
			hsl.h *= 60;
			if (hsl.h>360)
				hsl.h = hsl.h - 360;
			else if (hsl.h < 0)
				hsl.h = 360 + hsl.h;
		}

        hsl.s = Math.min(hsl.s*100,100);
        hsl.l = Math.min(hsl.l*100,100);

        // Round to 4 decimal places
        hsl.h = (Math.round(hsl.h*10000))/10000;
        hsl.s = (Math.round(hsl.s*10000))/10000;
        hsl.l = (Math.round(hsl.l*10000))/10000;

        return hsl;
    };

    Edge.colorToSupported = function( val ) {
        testSupport();
        if ( !supportRGBA && /rgba/.test( val ) || !supportRGB && /rgb/.test( val ) || !supportHSLA && /hsla/.test( val ) || !supportHSL && /hsl/.test( val ) ) {
            // Downlevel support
            var result = Edge.parseColorValue( val ), values = result.values;
            if(values.length >= 4 && values[3] < .5) {
                return 'transparent';
            }
            var r = values[0], g = values[1], b = values[2];
            if ( /hsl/.test( val ) ) {
                var rgb = Edge.hslToRGB( {h: values[0], g: values[1], b: values[2]} );
                r = rgb.r;
                g = rgb.g;
                b = rgb.b;
            }
            r *= 255 / 100;
            g *= 255 / 100;
            b *= 255 / 100;
            r = Math.floor(r);
            g = Math.floor(g);
            b = Math.floor(b);
            r = (r > 15 ? "" : "0") + r.toString(16);
            g = (g > 15 ? "" : "0") + g.toString(16);
            b = (b > 15 ? "" : "0") + b.toString(16);
            val = "#" + r + g + b;
        }
        return val;
    }

    Edge.Timeline.addTweenType("color", function(ele, prop, val, opts){ return new ColorTween("color", ele, prop, val, opts); });

})(jQuery, AdobeEdge, AdobeEdge.PropertyTween);

/// Filename: edge.subproperty-tween.js

/***
 @name SubpropertyTween
 @class Defines a complex tween that can animate the multiple sub-properties of a complex CSS property.
 This defines a tween type of "subproperty' which can parse multiple properties with multiple types.
 */

(function (jQuery, Edge, PropertyTween, ColorTween) {

    var $ = jQuery;

    var propTemplates = {
        'box-shadow': {
            def: 'box-shadow',
            '-webkit-box-shadow': ["boxShadow.color", "boxShadow.offsetH", "boxShadow.offsetV", "boxShadow.blur", "boxShadow.spread", "boxShadow.inset"],
            '-moz-box-shadow': ["boxShadow.color", "boxShadow.offsetH", "boxShadow.offsetV", "boxShadow.blur", "boxShadow.spread", "boxShadow.inset"],
            'box-shadow': ["boxShadow.color", "boxShadow.offsetH", "boxShadow.offsetV", "boxShadow.blur", "boxShadow.spread", "boxShadow.inset"]
        },
        'text-shadow': {
            def: 'text-shadow',
            'text-shadow': ["textShadow.color", "textShadow.offsetH", "textShadow.offsetV", "textShadow.blur"]
        },
        'filter': {
            def: '-webkit-filter',
            '-webkit-filter': ["filter.invert", "filter.hue-rotate", "filter.contrast", "filter.saturate", "filter.brightness", "filter.sepia", "filter.grayscale", "filter.blur", "filter.drop-shadow.color", "filter.drop-shadow.offsetH", "filter.drop-shadow.offsetV", "filter.drop-shadow.blur"],
            '-moz-filter': ["filter.invert", "filter.hue-rotate", "filter.contrast", "filter.saturate", "filter.brightness", "filter.sepia", "filter.grayscale", "filter.blur", "filter.drop-shadow.color", "filter.drop-shadow.offsetH", "filter.drop-shadow.offsetV", "filter.drop-shadow.blur"],
            'filter': ["filter.invert", "filter.hue-rotate", "filter.contrast", "filter.saturate", "filter.brightness", "filter.sepia", "filter.grayscale", "filter.blur", "filter.drop-shadow.color", "filter.drop-shadow.offsetH", "filter.drop-shadow.offsetV", "filter.drop-shadow.blur"]
        }
    };

    var subpropLookup = {
        'boxShadow.offsetH': {cssProp: "box-shadow", type: "style", def: "0px"},
        'boxShadow.offsetV': {cssProp: "box-shadow", type: "style", def: "0px"},
        'boxShadow.blur': {cssProp: "box-shadow", type: "style", def: "0px"},
        'boxShadow.spread': {cssProp: "box-shadow", type: "style", def: "0px"},
        'boxShadow.color': {cssProp: "box-shadow", type: "color", def: "rgba(0,0,0,0)"},
        'boxShadow.inset': {cssProp: "box-shadow", def: ""},
        'textShadow.offsetH': {cssProp: "text-shadow", type: "style", def: "0px"},
        'textShadow.offsetV': {cssProp: "text-shadow", type: "style", def: "0px"},
        'textShadow.blur': {cssProp: "text-shadow", type: "style", def: "0px"},
        'textShadow.color': {cssProp: "text-shadow", type: "color", def: "rgba(0,0,0,0)"},
        'filter.drop-shadow.color': {cssProp: "filter", type: "color", def: "rgba(0,0,0,0)", strReplace:"drop-shadow(%1", combinedNum:4},
        'filter.drop-shadow.offsetH': {cssProp: "filter", type: "style", def: "0px"},
        'filter.drop-shadow.offsetV': {cssProp: "filter", type: "style", def: "0px"},
        'filter.drop-shadow.blur': {cssProp: "filter", type: "style", def: "0px", strReplace:"%1)"},
        'filter.grayscale': {cssProp: "filter", type: "style", def: "0", strReplace:"grayscale(%1)"},
        'filter.sepia': {cssProp: "filter", type: "style", def: "0", strReplace:"sepia(%1)"},
        'filter.saturate': {cssProp: "filter", type: "style", def: "1", strReplace:"saturate(%1)"},
        'filter.hue-rotate': {cssProp: "filter", type: "style", def: "0deg", strReplace:"hue-rotate(%1)"},
        'filter.invert': {cssProp: "filter", type: "style", def: "0", strReplace:"invert(%1)"},
        'filter.brightness': {cssProp: "filter", type: "style", def: "0", strReplace:"brightness(%1)"},
        'filter.contrast': {cssProp: "filter", type: "style", def: "1", strReplace:"contrast(%1)"},
        'filter.blur': {cssProp: "filter", type: "style", def: "0px", strReplace:"blur(%1)"}
    };

    var subpropertyId = 1;
    var funcs = {
        setValue: function (tt, prop, val) {
            var data = $.data(this, subpropLookup[prop].cssProp);
            data[prop] = val;
        },
        getValue: function (prop, tt) {
            var data = $.data(this, subpropLookup[prop].cssProp);
        },
        setupForAnimation: function (context) {
            var elements = this.getElementSet(context);
            var tween = this;
            elements.each(function () {
                var data = $.data(this, tween.superProperty);
                if (!data) {
                    // Get the current values on the element and save
                    data = tween.buildProp(this);
                    $.data(this, tween.superProperty, data);
                }
            });

            PropertyTween.prototype.setupForAnimation.call(this, context);
        },
        buildProp: function (ele) {
            var i;
            var data = {};
            var props = Edge.getSubProps(ele, this.superProperty);

            // add the retrieved values
            for (i in props) {
                if (props.hasOwnProperty(i)) {
                    data[i] = props[i];
                }
            }

            if (data === null) {
                data = {};
            }

            data.id = this.superProperty + subpropertyId;
            subpropertyId += 1;
            data.element = ele;
            data.prop = this.superProperty;
            data.onFinalUpdate = $.Edge.TransformTween.UpdateFinalizer.prototype._applySubproperty;

            return data;
        },
        update: function (elapsed, easingConst, context) {
            PropertyTween.prototype.update.call(this, elapsed, easingConst, context);
            var elements = this.getElementSet(context);
            var tween = this;
            var prop = this.property;
            var tt = this.tweenType;

            elements.each(function () {
                // We only want to tween if the property data has a
                // matching animation id. If the ids don't match, that
                // means another animation has started which is modifying
                // this same property.

                var td = tween.getPropertyTweenData(this, tt, prop);
                if (td.animationID !== tween.animationID) {
                    return;
                }

                var data = $.data(this, tween.superProperty);
                data.timeline = context.timeline;
                data.tween = tween;
                $.Edge.TransformTween.UpdateFinalizer.Register(context.timeline, data.id, data);
            });
        }
    };

    function SubpropertyTween(tweenType, elements, property, val, opts) {
        if (subpropLookup[property] !== null) {
            this.superProperty = subpropLookup[property].cssProp;
            tweenType = subpropLookup[property].type;
            if (tweenType === "color") {
                $.extend(this, ColorTween.prototype, funcs);
                ColorTween.call(this, tweenType, elements, property, val, opts);
            } else {
                $.extend(this, PropertyTween.prototype, funcs);
                Edge.PropertyTween.call(this, tweenType, elements, property, val, opts);
            }
        }
        this.name = "subpropertyTween";
    }

    $.extend(SubpropertyTween.prototype, {
        constructor: SubpropertyTween,

        buildDefaultProps: function (ele, subprops) {
            var propName, j;
            var data = {};

            for (propName in subprops) {
                if (subprops.hasOwnProperty(propName)) {
                    data[propName] = {};
                    if (subprops.hasOwnProperty(propName)) {
                        var props = propTemplates[propName][propTemplates[propName].def];
                        for (j in props) {
                            if (props.hasOwnProperty(j)) {
                                data[propName][props[j]] = subpropLookup[props[j]].def;
                            }
                        }
                        data[propName].prop = propName;
                        data[propName].id = propName + subpropertyId;
                        subpropertyId += 1;
                        data[propName].element = ele;
                        data[propName].onFinalUpdate = $.Edge.TransformTween.UpdateFinalizer.prototype._applySubproperty;
                    }
                }
            }

            return data;
        }
    });

    var decomposeSubprops = function (style, prop, propOrder) {
        // Just in case there is a color property, we need to strip out the spaces first...
        style = style.replace(/,\s*/g, ",");
        var styles = style.split(" ");
        var returnValue = [];
        var i;
        for (i = 0; i < propOrder.length; i += 1) {
            returnValue[propOrder[i]] = styles[i] || subpropLookup[propOrder[i]].def;
        }
        return returnValue;
    };

    var getSubProps = function (ele, prop) {
        var $ele = $(ele);
        var style, i;
        for (i in propTemplates[prop]) {
            if (propTemplates[prop].hasOwnProperty(i)) {
                style = $ele.css(i);
                if (style && style !== "") {
                    return decomposeSubprops(style, prop, propTemplates[prop][i]);
                }
            }
        }

        return [];
    };
    Edge.getSubProps = getSubProps;

    var getSubType = function (s) {
        if (subpropLookup[s] !== null) {
            return subpropLookup[s].type;
        }
    };
    SubpropertyTween.getSubType = getSubType;

    var getStyle = function (s) {
        if (subpropLookup[s] !== null) {
            return subpropLookup[s].cssProp;
        }
    };
    SubpropertyTween.getStyle = getStyle;

    SubpropertyTween.applySubproperty = function (ele, data, tween, opts) {
        var $ele = $(ele);
        var val, prop, i, subVal;

        if (typeof AdobeEdge.applyCount !== "undefined") {
            AdobeEdge.applyCount++;
        }
        // Set up the CSS string to set
        // loop through all the browser specific css props and set them
        for (prop in propTemplates[data.prop]) {
            if (prop !== "def" && propTemplates[data.prop].hasOwnProperty(prop)) {
                val = "";
                var combinedSubIsDefault = true;
                for (i = 0; i < propTemplates[data.prop][prop].length; i += 1) {
                    subVal = data[propTemplates[data.prop][prop][i]];
                    if ("combinedNum" in subpropLookup[propTemplates[data.prop][prop][i]]) {
                        combinedSubIsDefault = true;
                        for (var j = i; j < i + subpropLookup[propTemplates[data.prop][prop][i]].combinedNum; j++) {
                            if (data[propTemplates[data.prop][prop][j]] != subpropLookup[propTemplates[data.prop][prop][j]].def) {
                                combinedSubIsDefault = false;
                            }
                        }
                    }
                    if (!propTemplates[data.prop][prop][i].match(/^filter./) || (subVal != subpropLookup[propTemplates[data.prop][prop][i]].def || !combinedSubIsDefault)) {
                        if ("strReplace" in subpropLookup[propTemplates[data.prop][prop][i]]) {
                            subVal = subpropLookup[propTemplates[data.prop][prop][i]].strReplace.replace("%1", subVal);
                        }
                        val += subVal;
                        if (i !== propTemplates[data.prop][prop].length - 1) {
                            val += " ";
                        }
                    }
                }
                if ((window.edge_authoring_mode && prop === propTemplates[data.prop].def) || !window.edge_authoring_mode) {
                    $ele.css(prop, val);
                }
            }
        }

        if (tween && tween.observers.length) {
            tween.notifyObservers("onUpdate", {elapsed: 0, easingConst: 0, property: prop, value: val, element: $ele[0]});
        }
    };

    $.extend($.Edge.TransformTween.UpdateFinalizer.prototype, {
        _applySubproperty : function (updateData) {
            // Note that this is called with 'this' set to the handler object
            var data = $.data(this.element, this.prop);
            if (data && updateData) {
                SubpropertyTween.applySubproperty(this.element, data, data.tween, updateData.context);
            }
        }
    });

    Edge.SubpropertyTween = SubpropertyTween;

    Edge.Timeline.addTweenType("subproperty", function (ele, prop, val, opts) { return new SubpropertyTween("subproperty", ele, prop, val, opts); });

})(jQuery, AdobeEdge, AdobeEdge.PropertyTween, AdobeEdge.ColorTween);

// Filename: edge.gradient-tween.js
/***
 @name GradientTween
 @class Defines a tween that can animate the background-image gradients.
 This defines a tween type of 'gradient' which can parse gradient properties.
 */

(function(jQuery, Edge, PropertyTween){

    var $ = jQuery;

    var tweenTypes = { gradient: 0 };

    function GradientTween(tweenType, elements, property, val, opts) {
        var ci = null;
        if (val.length >= 2 && $.isArray(val[1]) && opts.fromValue.length >= 2 && $.isArray(opts.fromValue[1])) { // linear gradient
            ci = 1;
        }
        else if (val.length >= 2 && $.isArray(val[4]) && opts.fromValue.length >= 2 && $.isArray(opts.fromValue[4])) { // radial gradient
            ci = 4;
        }
        if (ci) {
            // Generate color stops when one of the tween ends has less than the other
            // Note:  For now, just duplicate the final color stop to get to the final set of colorstops.
            //        We might decide we need to interpolate values to get an approximate value at an interim position.
            var lt = opts.fromValue[ci].length < val[ci].length ? opts.fromValue[ci] : val[ci];
            var gt = lt == val[ci] ? opts.fromValue[ci] : val[ci];

            for(i=lt.length;i<gt.length;i++)
                lt[i] = lt[i-1];
        }
        Edge.PropertyTween.call(this, tweenType, elements, property, val, opts);
        this.name = "GradientTween";
        this.tweenType = tweenTypes[tweenType];
    }

    $.extend(GradientTween.prototype, PropertyTween.prototype, {

        constructor: GradientTween,

        setupForAnimation: function (context) {
            var elements = this.getElementSet(context);
            elements.each(function () {
                Edge.forceGPU(this);
            });

            PropertyTween.prototype.setupForAnimation.call(this, context);
        },
        getValue: function (prop, tt) {
            var fv = $(this).css(prop);
            return fv;
        },
        setValuePre: function (tt, prop, val) {
            $(this).css(prop, '-webkit-' + val);
            $(this).css(prop, '-moz-' + val);
            $(this).css(prop, '-ms-' + val);
            $(this).css(prop, '-o-' + val);
        },
        setValue: function (tt, prop, val) {
            $(this).css(prop, val);
        },
        update: function(elapsed, easingConst, context)
        {
            var elements = this.getElementSet(context);

            if (!this.updateTriggered)
            {
                this.updateTriggered = true;
                this.setupForAnimation(context);
            }

            var tween = this;
            var tt = this.tweenType;
            var prop = this.property;

            var i;
            elements.each(function(){
                // We only want to tween if the property data has a
                // matching animation id. If the ids don't match, that
                // means another animation has started which is modifying
                // this same property.

                var td = tween.getPropertyTweenData(this, tt, prop);
                if (td.animationID != tween.animationID)
                    return;

                var fvs = td.fromValues;
                var tvs = td.toValues;
                var tkns = td.tokens;
                var filters = tween.filter;

                var cnt = fvs.length;
                var results = [];

                for (i = 0; i < cnt; i++)
                {
                    var f = fvs[i];
                    var t = tvs[i];
                    var v;
                    if(typeof f == "string") {
                        v = (easingConst==0 && tween.duration > 0)? f : t.value;
                    }
                    else {
                        v = (f + ((t.value - f) * easingConst));
                    }
                    if ( filters && filters[i] ) {
                        v = filters[i]( v , tween, this, prop, t.unit, elapsed, context);
                    }
                    if ( typeof v === "number" && v < 1 ) {
                        // protect against exponential notation
                        v = v.toFixed( 6 );
                    }
                    results.push(v + t.unit);
                }

                var valPre = tween.formatValuePre(results);
                var val = tween.formatValue(results);

                tween.setValuePre.call(this, tt, prop, valPre);
                tween.setValue.call(this, tt, prop, val);
                tween.notifyObservers("onUpdate", { elapsed: elapsed, easingConst: easingConst, property: prop, value: '-webkit-' + valPre, element: this });
            });

        },
        parseValue: function(val) {
            if (!val || val.length < 2)
                return;
            if (typeof(val) == "string")
                val = JSON.parse(val);
            function getStopPosition(colorstops, index) {
                if (colorstops[index].length > 1) {
                    return colorstops[index][1];
                }
                else {
                    var colorstopPosition;
                   if (i === 0) { // If this color is the first color, then we know it's at position 0%
                        colorstopPosition = 0;
                    }
                    else if (i === colorstops.length-1) { // If this color is the last color, then we know it's at position 100%
                        colorstopPosition = 100;
                    }
                    else { // If this color is in the middle, then we average the two adjacent stops
                         colorstopPosition = (getStopPosition(colorstops, i-1) + getStopPosition(colorstops, i+1)) / 2;
                    }
                    colorstops[i].push(colorstopPosition);
                    return colorstopPosition;
                }
            }

            var angle = null;
            var colorstops = null;
            var centerPoint = null;
            var ellipse = null;
            var extent = null;
            var colorstopValues = [];
            var repeating = false;
            if ($.isArray(val[1])) { // Linear Gradient
                angle = val[0];
                colorstops = val[1];
                if (val[2])
                    repeating = val[2];
            }
            else { // Radial Gradient
                centerPoint = [val[0], val[1]];
                ellipse = val[2];
                extent = val[3];
                colorstops = val[4];
                if (val[5])
                    repeating = val[5];
            }

            for (i=0;i<(colorstops.length);i++) {
                var parsedColor = Edge.Color.parseValue(colorstops[i][0]);
                if (parsedColor) {
                    colorstopValues = colorstopValues.concat(parsedColor);
                    colorstopValues.push(getStopPosition(colorstops, i));
                }
            }

            var gradientValueObj = {angle: angle, colorstops:colorstopValues, centerPoint: centerPoint, ellipse: ellipse, extent: extent, repeating: repeating};

            if (!gradientValueObj || !gradientValueObj.colorstops)
                return;

            var values = [];
            if (gradientValueObj.angle)
                values = values.concat(gradientValueObj.angle);
            else if (gradientValueObj.centerPoint) {
                values = values.concat(gradientValueObj.centerPoint);
                values = values.concat([gradientValueObj.ellipse, gradientValueObj.extent]);
            }
            values = values.concat(gradientValueObj.colorstops);

            return values.concat(gradientValueObj.repeating);
        },
        formatValue: function(values) {
            return Edge.formatGradient(values, false);
        },
        formatValuePre: function(values) {
            return Edge.formatGradient(values, true);
        }
    });

    Edge.GradientTween = GradientTween;

    Edge.Gradient = { parseValue: GradientTween.prototype.parseValue };

    Edge.formatGradient = function(values, isPrefixed) {
        if (!values)
            return;
        var formattedValue = "";
        var colorstopIndex = null;

        if (values.length % 5 == 2) { // Linear Gradient
            // [0] - angle
            // [1-n]*5 - color stops
            colorstopIndex = 1;

            formattedValue += "linear-gradient(";
            formattedValue += (isPrefixed ? values[0] : (450 - values[0]) % 360) + 'deg,';
        }
        else { // values.length % 5 == 4 // Radial Gradient
            colorstopIndex = 4;
            formattedValue += "radial-gradient(";
            if (isPrefixed)
                formattedValue += values[0] + "% " + values[1] + "%," + (values[2] == 1 ? "ellipse" : "circle") + " " + values[3] + ",";
            else
                formattedValue += values[3] + " " + (values[2] == 1 ? "ellipse" : "circle") + " at " + values[0] + "% " + values[1] + "%,";
        }

        // repeating
        if (values[values.length-1] == 1)
            formattedValue = "repeating-" + formattedValue;

        // Format color stops
        if (values.length < 12 || (values.length - colorstopIndex - 1) % 5 !== 0) // 1 for the angle, 4 per color and 1 for the stop x 2 colors = 11
            return;

        var numberOfColors = Math.floor((values.length - colorstopIndex - 1) / 5);
        for (i=0;i<numberOfColors;i++) {
            var firstIndex = i * 5 + colorstopIndex;
            formattedValue += Edge.Color.formatValue(values.slice(firstIndex, firstIndex+4)); // format the color using the color-tween formatting code
            if (values[firstIndex+4] !== -1)
                formattedValue += " " + values[firstIndex+4] + '%'; // add the stop
            if (i != numberOfColors-1)
                formattedValue += ',';
        }
        formattedValue += ")"; // close the gradient function

        return formattedValue;
    };

    Edge.Timeline.addTweenType("gradient", function(ele, prop, val, opts){ return new GradientTween("gradient", ele, prop, val, opts); });

})(jQuery, AdobeEdge, AdobeEdge.PropertyTween);

/// Filename: edge.motion-tween.js
/***
    @name MotionTween
    @class Defines a tween that can animate an object along a path described by a cubic spline
    Currently only supports top, left of ap'd elements
 */

(function($, Edge){
    "use strict";

    var TransformTween = Edge.TransformTween,
        UpdateFinalizer = TransformTween.UpdateFinalizer,
        splitUnits = TransformTween.splitUnits;

    if (typeof $.Edge === "undefined" || typeof $.Edge.Timeline === "undefined" || typeof $.Edge.PropertyTween === "undefined") {
        return;
    }

    (function (css) {
        $.prototype.css = function (k, v) {
            var r = css.apply(this, arguments),
                cache,
                kc,
                camelize = function(str) {
                    return str.replace(/^-ms-/, "ms-").replace(/-([a-z]|[0-9])/ig, function (s, l) { return String(l).toUpperCase(); });
                };
            if (arguments.length > 1) {
                kc = camelize(k);
                $(this).each(function (e) {
                    cache = $.data(this, 'css_cache') || {};
                    if (cache[kc] !== v) {
                        cache[kc] = v;
                        $.data(this, 'css_cache', cache);
                        // if property is width or height or something that can affect width or height, dirty width or height

                        // update the units used for width/height
                        if (k === "width") {
                            $.data(this, "u_w", (splitUnits(v)).units);
                        } else if (k === "height") {
                            $.data(this, "u_h", (splitUnits(v)).units);
                        }

                        var uw = $.data(this, 'u_w'),
                            uh = $.data(this, 'u_h'),
                            mbp = k.match(/^margin/) !== null || k.match(/^padding/) !== null || k.match(/^border/) !== null;
                        if (mbp || uw === undefined || uw === null || k === "width") {
                            $.data(this, 'cw_d', 1);
                        }
                        if (mbp || k === "height") {
                            $.data(this, 'ch_d', 1);
                        }
                    }
                });
                return this;
            }
            return r;
        };
    }($.prototype.css));

    (function (width) {
        $.prototype.width = function () {
            var ele = this[0],
                w = $.data(ele, 'cw'),
                dirty = $.data(ele, 'cw_d') == 1 || $.data(ele, 'cw_d') === undefined,
                managed = Edge.Symbol.get(ele) || $.data(ele, 'domDef'),
                isBody = ele.nodeType === 1 && ele.tagName === 'BODY';

            // We don't support % yet, so if the width is in percent, get it fresh everytime
            dirty = dirty || $.data(ele, 'u_w') == "%";

            if (!managed || isBody || dirty || w === undefined || w === null || ele == ele.window || ele.nodeType === 9) {
                w = width.apply(this, arguments);
                $.data(ele, 'cw', w); // cw = cached width
                $.data(ele, 'cw_d', 0); // cw_d = cached width dirty
            }
            return w;
        };
    }($.prototype.width));

    (function (height) {
        $.prototype.height = function () {
            var ele = this[0],
                h = $.data(ele, 'ch'),
                dirty = $.data(ele, 'ch_d') == 1 || $.data(ele, 'ch_d') === undefined,
                managed = Edge.Symbol.get(ele) || $.data(ele, 'domDef'),
                isBody = ele.nodeType === 1 && ele.tagName === 'BODY';

            // We don't support % yet, so if the height is in percent, get it fresh everytime
            dirty = dirty || $.data(ele, 'u_h') == "%";

            if (!managed || isBody || dirty || h === undefined || h === null || ele == ele.window || ele.nodeType === 9) {
                h = height.apply(this, arguments);
                $.data(ele, 'ch', h); // ch = cached height
                $.data(ele, 'ch_d', 0); // cw_d = cached height dirty
            }
            return h;
        };
    }($.prototype.height));

    function MotionTween(tweenType, elements, path, keyframes, opts) {
        TransformTween.call(this, tweenType, elements, 'motion', undefined, opts);
        
        this.name = "motionTween";
        this.path = path;
        if(path && path.length > 1 && path[0].length < 6){
            path[0][4] = path[0][5] = 0; // append lowerdx
            path[path.length - 1].splice(2, 0, 0, 0); // insert upperdx
        }

        this.keyframes = [];
    }

    var formatNumber = function(num)
    {
        if(num !== 0 && Math.abs(num) < 1e-6)
            return num.toFixed(6);
        return num.toString();
    };

    function cubic ( s0, s1, b ) {
        // see http://en.wikipedia.org/wiki/Hermite_curve
        // s = { x, y, upperdx/db, upperdy/db, lowerdx/db, lowerdy/db, l }
        var o = {};
        try {
            if ( s0[0] === s1[0] && s0[1] === s1[1]) {
                o.x = s1[0];
                o.y = s1[1];
                return o;
            }
        }
        catch (e) {
            //debugger;
        }

        var b2 = b * b,
            b3 = b2 * b,
            h00 = 2 * b3 - 3 * b2 + 1,
            h10 = b3 - 2 * b2 + b,
            h01 = -2 * b3 + 3 * b2,
            h11 = b3 - b2;
        /*  For comparison to article ref'd above:
            x0 = s0[0]
            y0 = s0[1]
            x1 = s1[0]
            y1 = s1[1]
            m0x = s0[2];
            m0y = s0[3];
            m1x = s1[4];
            m1y = s1[5];
         */
        o.x = h00 * s0[0] + h10 * s0[2] + h01 * s1[0] + h11 * s1[4];
        o.y = h00 * s0[1] + h10 * s0[3] + h01 * s1[1] + h11 * s1[5];
        return o;
    }

    function derivative(s0, s1, b) {

        // see http://en.wikipedia.org/wiki/Hermite_curve
        // LUA: s = { t, x, y, udx/dt, udy/dt, lowerdx, lowerdy, l }
        // s = { x, y, upperdx/db, upperdy/db, lowerdx/db, lowerdy/db, l }
        var o = {};

        if (s0[0] === s1[0] && s0[1] === s1[1]) {
            o.dx = 0;
            o.dy = 0;
            return o;
        }

        var b2 = b * b,
            h00 = 6 * b2 - 6 * b,
            h10 = 3 * b2 - 4 * b + 1,
            h01 = -6 * b2 + 6 * b,
            h11 = 3 * b2 - 2 * b,
            m0x = s0[2],
            m0y = s0[3],
            m1x = s1[4],
            m1y = s1[5];

        o.dx = h00 * s0[0] + h10 * m0x + h01 * s1[0] + h11 * m1x;
        o.dy = h00 * s0[1] + h10 * m0y + h01 * s1[1] + h11 * m1y;
        return o;
    }

    function distance2( pt1, pt2 ) {
        var dx = pt1.x - pt2.x;
        var dy = pt1.y - pt2.y;
        return Math.sqrt( dx * dx + dy * dy );
    }

    function dot2( pt1, pt2 ) {
        return pt1.x * pt2.x + pt1.y * pt2.y;
    }

    function refinePoints( s0, s1, points, startIndex, tolerance ) {
        var baseB = Math.floor( points[startIndex].b );

        var b = (points[startIndex].b + points[startIndex + 1].b) / 2 - baseB;
        var val = cubic( s0, s1, b );
        var linearPoint = {x : (points[startIndex].x + points[startIndex + 1].x) / 2, y : (points[startIndex].y + points[startIndex + 1].y) / 2};

        var inserted = 0;
        if ( distance2( linearPoint, val ) > tolerance ) {
            // subdivide and recurse
            val.b = b + baseB;
            points.splice( startIndex + 1, 0, val );
            inserted = refinePoints( s0, s1, points, startIndex + 1, tolerance );
            inserted = inserted + refinePoints( s0, s1, points, startIndex, tolerance ) + 1;
        }
        return inserted;
    }

    function createEasingTable(points) {
        // convert points of a curve in (0,0)-(1,1) to be a lookup table from t to easing value
        var minStep = 1;
        var i;
        for( i = 0; i < points.length - 1; i++ ) {
            if (points[i + 1].x - points[i].x > 0 ) {
                minStep = Math.min(minStep, points[i + 1].x - points[i].x);
            }
        }
        var numSteps = Math.ceil(1 / minStep);
        var step = 1 / numSteps;
        var easingTable = [];
        easingTable[0] = {t : 0, e : 0};
        var index = 0;
        for( i = 0; i < numSteps; i++ ) {
            var t = i * step;
            while (t > points[index + 1].x && index < points.length - 2 ) {
                index++;
            }
            var e = points[index + 1].y;
            if ((points[index + 1].x - points[index].x) > 0 ) {
                e = points[index].y + (t - points[index].x) * (points[index + 1].y - points[index].y)/ (points[index + 1].x - points[index].x);
            }
            easingTable[i] = {t : t, e : e};
        }
        if (easingTable[easingTable.length - 1].t < 1 ){
            easingTable[easingTable.length] = {t : 1, e : 1};
        }
        return easingTable;
    }

    function isStraightLine( points, toleranceInRadians ) {
        var len = distance2( points[points.length - 1], points[0] );
        var i;
        var pt2 = {x:points[points.length - 1].x - points[0].x, y:points[points.length - 1].y - points[0].y};
        for ( i = 1; i < points.length - 1; i++ ) {
            var pt1 = {x:points[i].x - points[0].x, y:points[i].y - points[0].y};
            var dot = dot2( pt1, pt2 );
            var denom = len * distance2( points[i], points[0] );
            if ( Math.abs( Math.acos( dot / denom ) ) > toleranceInRadians ) {
                return false;
            }
        }
        return true;
    }

    function setUpEasings( aKfs ) {
        var i, j;
        for ( i = 0; i < aKfs.length - 1; i++ ) {
            // convert from bezier to hermite
            var s0 = [0, 0, aKfs[i].upper.x * 3, aKfs[i].upper.y * 3, aKfs[i].lower.x * 3, aKfs[i].lower.y * 3];
            var s1 = [1, 1, aKfs[i + 1].upper.x * 3, aKfs[i + 1].upper.y * 3, (1 - aKfs[i + 1].lower.x) * 3, (1 - aKfs[i + 1].lower.y) * 3];
            var points = [];
            for ( j = 0; j < 5; j++ ) {
                var b = j / 4;
                var o = { b:b };
                var val = cubic( s0, s1, b );
                o.x = val.x;
                o.y = val.y;
                o.b = b;
                points[j] = o;
            }
            if ( isStraightLine( points, 0.005 ) ) {
                // discard unneeded intermediate points
                points.splice( 1, 3 );
            }
            else {
                for ( j = 0; j < 4; j++ ) {
                    var k = 3 - j;
                    refinePoints( s0, s1, points, k, 0.01 );
                }
            }
            aKfs[i].easingTable = createEasingTable( points );
        }
    }

    $.extend(MotionTween.prototype, TransformTween.prototype, {
        constructor: MotionTween,

        setup: function()
        {
            this.updateTriggered = false;
        },
        /*setValue: use the inherited one from TransformTween */
        getValue:function () {
        },
        setupForAnimation: function(context) {
            TransformTween.prototype.setupForAnimation.call(this, context);
            if(!this.points) {
                this.setUpPoints();
                this.setUpLen2bMap();
                setUpEasings(this.keyframes);
            }
            if (!this.deltas && !window.edge_authoring_mode) {
                var elements = this.getElementSet(context);
                elements.each(function() {
                    var $this = $(this),
                        propX = $.data(this, "p_x") || "left",
                        propY = $.data(this, "p_y") || "top",
                        parentEle = this.parentElement,
                        $parent = $(parentEle),
                        deltaX = +parseFloat($this.css(propX)) || 0,
                        deltaY = +parseFloat($this.css(propY)) || 0;

                    if ($.data(this, "u_x") === "%") {
                        deltaX = (deltaX / 100) * +$parent.width();
                    }
                    if ($.data(this, "u_y") === "%") {
                        deltaY = (deltaY / 100) * +$parent.height();
                    }

                    $.data(this, "deltaX", deltaX);
                    $.data(this, "deltaY", deltaY);
                    $this.css(propX, "0px").css(propY, "0px");
                });
                this.deltas = true;
            }

            var firstT = this,
                dxy0;

            while (firstT._prevObj) {
                //ignore "filler" transitions
                if (firstT._prevObj.path.length == 2 && (firstT._prevObj.path[0][0] === firstT._prevObj.path[1][0] && firstT._prevObj.path[0][1] === firstT._prevObj.path[1][1])) {
                    break;
                }
                firstT = firstT._prevObj;
            }

            dxy0 = derivative(firstT.path[0], firstT.path[1], 0.000001);
            this._deltaRotate = Math.atan2(dxy0.dx, dxy0.dy) * 180/Math.PI;
        },
        computeEasing: function(ms){
            var aKfs = this.keyframes;
            var t = ms  / this.getDuration();
            var index = 0, i;
            for (i = 0; i < aKfs.length - 1; i++ ){
                index = i;
                if (t <= aKfs[i + 1].t ){
                    break;
                }
            }
            var easingTable = aKfs[index].easingTable;
            var segLen = aKfs[index + 1].l - aKfs[index].l;
            var segDuration = aKfs[index + 1].t - aKfs[index].t;

            // lookup e in the table, interpolating linearly
            t = (t  - aKfs[index].t) / segDuration;
            var tableIndex = Math.floor(t / (easingTable[1].t - easingTable[0].t));
            tableIndex = Math.min(easingTable.length - 2, Math.max(tableIndex, 0));
            // e is easing per segment
            var e = easingTable[tableIndex].e + (t - easingTable[tableIndex].t) * (easingTable[tableIndex + 1].e - easingTable[tableIndex].e) / (easingTable[tableIndex + 1].t - easingTable[tableIndex].t);
            return aKfs[index].l + e * segLen;

        },

        originInPx: function (ele$) {

            var sOrigin,
                aOrigin,
                oOrigin = {},
                w = ele$.width(),
                h = ele$.height(),
                bdlW,
                bdtW,
                originXp,
                originYp;
            sOrigin = ele$.css("transform-origin") || ele$.css("-webkit-transform-origin") || ele$.css("-moz-transform-origin") || ele$.css("-ms-transform-origin") || ele$.css("-o-transform-origin") || "10% 10%" || "50% 50%";

            aOrigin = sOrigin.split(" ");
            if (aOrigin[0].indexOf("%") > 0) {
                originXp = parseFloat(aOrigin[0].substring(0, aOrigin[0].length - 1)) / 100;
                originYp = parseFloat(aOrigin[1].substring(0, aOrigin[1].length - 1)) / 100;
                oOrigin.x = w * originXp;
                oOrigin.y = h * originYp;
            }
            else {
                //already in pixels...
                oOrigin.x = parseFloat(aOrigin[0].substring(0, aOrigin[0].length - 2));
                oOrigin.y = parseFloat(aOrigin[1].substring(0, aOrigin[1].length - 2));
            }

            if (!Edge.supported.originIncludesBorders) {
                originXp = originXp || oOrigin.x / w;
                originYp = originYp || oOrigin.y / h;

                //adjust for border
                bdlW = splitUnits(ele$.css("border-left-width")).num + splitUnits(ele$.css("border-right-width")).num || 0;
                bdlW = bdlW * originXp;
                bdtW = splitUnits(ele$.css("border-top-width")).num + splitUnits(ele$.css("border-bottom-width")).num || 0;
                bdtW = bdtW * originYp;
                oOrigin.x += bdlW;
                oOrigin.y += bdtW;
            }

            return oOrigin;
        },

        update: function(elapsed, easingConst, context) {

            if (!this.updateTriggered) {
                this.updateTriggered = true;
                this.setupForAnimation(context);
            }

            var elements = this.getElementSet(context),
                tween = this,
                prop = this.property,
                tt = this.tweenType,
                e = easingConst,
                seg = this._findSegment(e),
                path = this.path,
                b = this._easeToB( e ),
                len = this.points[this.points.length - 1].l,
                deltaB,
                angle,
                overshoot;

            b = b - seg;
            b = Math.min(1.0, Math.max(0, b));
            deltaB = Math.max(0.000001, Math.min(0.999999, b));

            var o = cubic(path[seg], path[seg + 1], b),
                deltaXY = derivative(path[seg], path[seg + 1], deltaB),
                rotation1 = Math.atan2(deltaXY.dx, deltaXY.dy) * 180 / Math.PI,
                rotation,
                skipRotation;
            
            if (this._prevObj && path.length === 2 && path[0][0] === path[1][0] && path[0][1] === path[1][1]) {
                skipRotation = true;
                rotation = 0;//we don't know what it really is, this path shouldn't change it
            }
            else {
                rotation = (this._deltaRotate - rotation1);
            }
            
            if (e < 0 || e > 1) {
                angle = Math.atan2(deltaXY.dy, deltaXY.dx);
                overshoot = (e > 1) ? e - 1 : e;
                o.x += Math.cos(angle) * len * overshoot;
                o.y += Math.sin(angle) * len * overshoot;
            }

            elements.each( function (  ) {
                // We only want to tween if the property data has a
                // matching animation id. If the ids don't match, that
                // means another animation has started which is modifying
                // this same property.

                var $this = $(this),
                    oOrigin,
                    td = tween.getPropertyTweenData(this, tt, prop),
                    data = $.data(this, TransformTween.dataName),
                    parentEle = this.parentElement,
                    $parent,
                    parentW,
                    parentH;

                data.tween = tween;

                if (td.animationID !== tween.animationID) {
                    return;
                }

                oOrigin = tween.originInPx($this);

                //step 1: calculate the offset of the origin point from the corner
                var propX = $.data(this, "p_x") || "left",
                    propY = $.data(this, "p_y") || "top",
                    valX = o.x,
                    valY = o.y,
                    uX = $.data(this, "u_x") || "px",
                    uY = $.data(this, "u_y") || "px",
                    deltaX = /*$.data(this, "deltaX") ||*/ 0,
                    deltaY = /*$.data(this, "deltaY") ||*/ 0,
                    pushToTranslate = !window.edge_authoring_mode,
                    doAutoRotate = $.data(this, "doAutoOrient");

                doAutoRotate = doAutoRotate === "true" ? true : doAutoRotate === "false" ? false : doAutoRotate;
                
                if (pushToTranslate) {

                    $parent = $(parentEle);
                    parentW = $parent.width();
                    parentH = $parent.height();

                    //if in % then we need to calculate value in px
                    if (uX === "%") {
                        valX = (valX / 100.0) * parentW;
                    }
                    if (uY === "%") {
                        valY = (valY / 100.0) * parentH;
                    }
                }

                valX = valX + (propX === "right" ? oOrigin.x : -1 * oOrigin.x);
                valY = valY + (propY === "bottom" ? oOrigin.y : -1 * oOrigin.y);

                if (pushToTranslate) {
                    valX = valX + deltaX;
                    valY = valY + deltaY;
                }

                valX = formatNumber(valX);
                valY = formatNumber(valY);
                
                if (!skipRotation) {
                    if (!doAutoRotate) {
                        rotation = 0;
                    }
                    rotation = Math.round(rotation, 5);
                    $.data(this, "motionRotateZ", rotation + "deg");
                    tween.setValue.call(this, undefined, "motionRotateZ", rotation + "deg");
                    UpdateFinalizer.Register(context.timeline, data.id, data);
                }
                
                if (!pushToTranslate) {
                    $(this).css(propX, valX + uX);
                    tween.notifyObservers("onUpdate", { elapsed: elapsed, easingConst: easingConst, property: propX, value: valX + uX, element: data.tween });
                    $(this).css(propY, valY + uY);
                    tween.notifyObservers("onUpdate", { elapsed: elapsed, easingConst: easingConst, property: propY, value: valY + uY, element: this });
                } else {
                    tween.setValue.call(this, undefined, "motionTranslateX", valX + "px");
                    tween.setValue.call(this, undefined, "motionTranslateY", valY + "px");
                    
                    UpdateFinalizer.Register(context.timeline, data.id, data);
                }
            });

        },
        _findSegment : function(e) {
            var b = this.len2b(e * this.points[this.points.length - 1].l);
            b = Math.floor(b);
            return Math.min(Math.max(b, 0), this.path.length - 2);
        },
        // Return the b value for whole curve
        _easeToB : function(e){
			return this.len2b(e * this.points[this.points.length - 1].l);
        },
        setUpLen2bMap : function() {
            var len = 0;
            var points = this.points;
            for (var i = 0; i < points.length - 1; i++) {
                points[i].l = len;
                len = len + distance2(points[i], points[i + 1]);
            }
            points[points.length - 1].l = len;
            var totalLength = len;
            var numTicks = (this.getDuration() * 60) / 1000.0;
            var lenPerTick = totalLength / numTicks;
            this.len2bStep = lenPerTick;

            len = 0;
            var len2bMap = this.len2bMap =  [];
            var index = 0;
            if ( totalLength > 0 ) {
                while ( len <= totalLength ) {
                    while ( index < points.length - 1 && len > points[index + 1].l ) {
                        index = index + 1;
                    }
                    if ( index >= points.length - 1 ) {
                        break;
                    }
                    // assume samples are dense enough to do linear interpolation
                    var b = points[index].b + (len - points[index].l) * (points[index + 1].b - points[index].b) / (points[index + 1].l - points[index].l);
                    len2bMap.push( {l:len, b:b} );

                    len = len + lenPerTick;
                }
                if ( len2bMap[len2bMap.length - 1].b < points[points.length - 1].b ) {
                    len2bMap.push( {l:points[points.length - 1].l, b:points[points.length - 1].b} );
                }
            }
            else {
                // Special case for 0 length
                len2bMap.push( {l:0, b:points[0].b} );
            }
        },

        setUpPoints:function () {
            var curve = this.path;
            this.points = [];
            var tolerance = 2;
            var i, j;

            for ( i = 0; i < curve.length - 1; i++ ) {
                for (  j = 0; j < 5; j++ ) {
                    if ( j < 4 || i === curve.length - 2 )  {
                        var b = j / 4;
                        var o = { b:i + b };
                        var val = cubic( curve[i], curve[i + 1], b );
                        o.x = val.x;
                        o.y = val.y;

                        this.points.push(o);
                    }
                }
            }
            for ( i = 1; i < curve.length; i++ ) {
                var seg = curve.length - i - 1;
                for ( j = 0; j < 4; j++ ) {
                    var k = 3 - j + seg * 4;
                    refinePoints( curve[seg], curve[seg+1], this.points, k, tolerance );
                }
            }
            return this.points;
        },

        len2b:function ( len ) {
            if ( !this.len2bMap ) {
                this.setUpLen2bMap();
            }

            var len2bMap = this.len2bMap,
                index = Math.min(Math.max(0, Math.floor(len / this.len2bStep)), this.len2bMap.length - 2),
                b;

            if (len2bMap.length === 0) {
                return 0;
            }
            if (len2bMap.length === 1) {
                return len2bMap[0].b;
            }
            b = (len - len2bMap[index].l) * (len2bMap[index + 1].b - len2bMap[index].b) / (len2bMap[index + 1].l - len2bMap[index].l) + len2bMap[index].b;

            return b;
        }
    });

    Edge.Timeline.addTweenType("motion", function(ele, val, keyframes, opts){ return new MotionTween("motion", ele, val, keyframes, opts); });
    Edge.MotionTween = MotionTween;

})(jQuery, AdobeEdge);

// Filename: edge.symbol.js

(function( $, Edge ) {
    /*jshint strict:false */
     /*jshint curly:false */

    var triggerDict = Edge.triggerDict = {
        // These are intended to be called with 'this' being a symbol
        "element": function( actionFunc, selector, triggerEvent/*, triggerData*/ ) {
            if ( actionFunc ) {
                if ( selector === "document" ) {
                    this.$( document ).bind( triggerEvent, actionFunc );
                } else if ( selector === "window" ) {
                    this.$( window ).bind( triggerEvent, actionFunc );
                }
                else {
                    this.$( selector ).bind( triggerEvent, actionFunc );
                }
            }
        },
        "timeline": function( actionFunc, timelineName, triggerEvent/*, triggerData*/ ) {
            if ( actionFunc && timelineName ) {
                var tld = this.getTimelineData( timelineName ),
                        toState = tld.toState,
                        fromState = tld.fromState;
                var tlProxy = {};

                tlProxy[triggerEvent] = actionFunc;

                var tl = this._getTimeline( timelineName, toState, fromState );
                tl.addObserver( tlProxy );
            }
        },
        "symbol": function( actionFunc, objectName, triggerEvent/*, triggerData*/ ) {
            if ( actionFunc ) {
                var symProxy = {};
                symProxy[triggerEvent] = actionFunc;
                this.addObserver( symProxy );
            }
        }

    };

    function setSymbol(ele, sym){
        ele.edgeSymbol = sym;
    }
    function getSymbol(ele) {
        return ele ? ele.edgeSymbol : undefined;
    }
    /**
     @name Edge.Symbol
     @class The primary public api for the Edge runtime framework.
     Edge.Symbol is a 'Widget' attached to a node which owns all the
     Symbol-like behavior, including states, timelines and actions
     **/
    var Symbol = Edge.Symbol = function( ele, opts ) {
        Edge.Notifier.call( this );

        $.extend( this, Edge.Symbol.config );

        this.widgetEventPrefix = "edgeSym_";
        this.element = null;
        this.options = { data: null, initialState : null};

        this.effectors = {};
        this.states = {};
        this.timelines = {};
        this.timelineCache = {};
        this.timelineStateMap = {};
        this.autoPlay = {};
        this.defaultBaseState = "Base State";
        this.baseState = null;
		this.symbolBaseStateOverrides = null;
		
        this._init( ele, opts );
    };

    Edge.symbol = Symbol;   // Keep lowercase as an alias for now - but its use is deprecated

    Edge.Symbol.config = Edge.Symbol.config || {};

    var PropertyTween = Edge.PropertyTween;
    var substituteVariables = PropertyTween.substituteVariables;
    Symbol._substituteVariables = substituteVariables;
    var parseVariableName = PropertyTween.parseVariableName;
    Symbol._parseVariableName = parseVariableName;

    /**
     @name symbolInstances
     @description The list of all instances of Edge symbols
     @private
     **/
    var symbolInstances;

    /**
     The global dictionary of all Symbol definitions
     @private
     **/
    var symbolDefns = Edge.symbolDefns = {};
    
    var baseDataName = 'edgeBaseData';
    Edge.baseDataName = baseDataName;

    function createSimpleMotionPathData(selector, beginPt, endPt, start, duration) {
        var delX = endPt.x - beginPt.x, delY = endPt.y - beginPt.y;
        var len = Math.sqrt(delX * delX + delY + delY);
        return {id:"generated", tween: [ "motion", selector, [[beginPt.x, beginPt.y,0,0,0,0,0],[endPt.x, endPt.y,0,0,0,0,len]], [[0,0],[0,0]]], position: start, duration: duration};
    }

    function isOpera() {
        if(typeof Symbol.isOpera === 'undefined') {
            Symbol.isOpera = /Opera/.test(navigator.userAgent);
        }
        return Symbol.isOpera;
    }
    // Symbol private methods - use "call(this, ...)" to call these
    // By making them functions rather than properties on prototype Closure compiler can minify the names

    // Predeclare for jsHint
    var _getSymbolVars, _reIdDOMElements, _getParentSymbol, _processNestedSymbols, _getActionCallbackFunc, _buildStateForCache, _applyRules, _getCachedTimeline,
            _makeTimelineKey, _isParameterizedActorTL, _isParameterizedActorState, _rememberBaseState, _createSymbolChild, _addChildSymbol;

    function _createEvent( opts ) {
        var e = { Symbol: this, element: this.element, performDefaultAction: true };
        $.extend( e, opts );
        return e;
    }
    
    function _makeDefaultVariables() {
        var vars = {};
        var variables = this.options.data.variables;
        if ( variables ) {
            var varName;
            for ( varName in variables ) {
                if ( variables.hasOwnProperty( varName ) ) {
                    vars[varName] = variables[varName].defaultValue;
                }
            }
        }
        
        $.extend( vars, _getSymbolVars.call(this) );

        return vars;
    }
    
    function _injectMarkup ( htmlMarkup, opts ) {
        var markup = htmlMarkup;
        var evt = _createEvent.call(this, {markup: markup} );
        this.notifyObservers( "onPreInjectMarkup", evt );
        markup = evt.markup;
        var postEvt = _createEvent.call(this, {markup: markup} );
        if ( !evt.performDefaultAction ) {
            this.notifyObservers( "onPostInjectMarkup", postEvt );
            return;
        }
        var i;
        var variables = this.variableValues;
        var content = this.options.data.content;
        if ( !markup && content ) {
            if ( content.ref ) {
                markup = "";
                $( content.ref ).each( function( i, ele ) {
                    markup += $( ele ).html();
                } );
            } else if ( content.markup ) {
                markup = content.markup;
            } else if ( content.dom ) {
                var DeclareMarkup = Edge.DeclareMarkup;  // From edge.declare.js 
                if ( DeclareMarkup ) {

                    var aDom = content.dom;
                    var aSymbolInstances = content.symbolInstances;
                    //if (this.options.opts && this.options.opts.regenerateID === true) {
                    if ( true ) {
                        // Re Id Symbol content before instantiating to avoid id duplication
                        // for multiple instances of the same Symbol. Excludes the stage.
                        
                        aDom = JSON.parse( JSON.stringify( content.dom ) );
                        aSymbolInstances = [];
                        if ( content.symbolInstances ) {
                            aSymbolInstances = JSON.parse( JSON.stringify( content.symbolInstances ) );
                        }
                        var domLength = aDom.length;
                        for ( i = 0; i < domLength; i++ ) {
                            _reIdDOMElements.call( this, aDom[i], aSymbolInstances );
                        }
                    }
                    DeclareMarkup.DOMNodeSeek( $( this.element )[0], this.getSymbolTypeName() );

                    DeclareMarkup.renderDOM( aDom, $( this.element )[0], variables, this.getSymbolTypeName(), aSymbolInstances, this.composition );
                    if ( this.idLookup ) {
                        var sel;
                        for ( sel in this.idLookup ) {
                            if ( this.idLookup.hasOwnProperty( sel ) ) {
                                $( sel ).data( "originalId", this.idLookup[sel] );
                                $( sel ).data( "symParent", this );
                            }
                        }
                    }
                    if ( aSymbolInstances && aSymbolInstances.length > 0 ) {
                        _processNestedSymbols.call( this, aSymbolInstances );
                    }
                    DeclareMarkup.DOMNodeCompleted( $( this.element )[0] );
                }
            }
        }
        if ( markup ) {
            markup = substituteVariables( markup, variables );
            $( markup ).appendTo( this.element );
        }
        this.notifyObservers( "onPostInjectMarkup", postEvt );
    }

    _processNestedSymbols = function( aSymbolInstances ) {
        if ( !aSymbolInstances ) {
            return;
        }

        this.aSymbolInstances = [];
        var instLen = aSymbolInstances.length;
        for ( var i = 0; i < instLen; i++ ) {
            // Selector is currently Id since the DOM code depends on a unique id
            var symbolInstanceElementSelector = '#' + aSymbolInstances[i].id;
            if ( $( symbolInstanceElementSelector )[0] && this.composition ) {
				var aBaseStateProperties = this._getSelectorBaseState(symbolInstanceElementSelector);
                this.composition.convertElementToSymbol( symbolInstanceElementSelector, aSymbolInstances[i].symbolName, {autoPlay:aSymbolInstances[i].autoPlay, variables:aSymbolInstances[i].variables, symbolBaseState:aBaseStateProperties} );
                this.aSymbolInstances.push( symbolInstanceElementSelector );
            }
        }
    };

    _reIdDOMElements = function( oN, aSymbolInstances ) {
        if ( !oN ) {
            return;
        }

        var eleId = $( this.element )[0].id;
        var nodeId = oN.id;
        if ( !nodeId || nodeId === "" ) {
            nodeId = Symbol._makeUniqueID();
        }
        var keyId = "_" + nodeId;
        var newNodeId = eleId + "_" + nodeId;
        var instLen = aSymbolInstances.length;
        for ( var i = 0; i < instLen; i++ ) {
            if ( aSymbolInstances[i].id === oN.id ) {
                aSymbolInstances[i].id = newNodeId;
            }
        }

        this.idLookup = this.idLookup || {};
        this.idLookup["#" + newNodeId] = nodeId;
        this.setVariable( keyId, "#" + newNodeId );

        oN.oldId = oN.id;
        oN.id = newNodeId;

        if ( oN.c ) {
            var objLen = oN.c.length;
            for ( var j = 0; j < objLen; j++ ) {
                _reIdDOMElements.call(this, oN.c[j], aSymbolInstances );
            }
        }

    };

    _getParentSymbol = function() {
        return Symbol.getParentSymbol(this.element);
    };

    _addChildSymbol = function(oSymbolInstance) {
        if (!oSymbolInstance)
            return;
        
        if (!this.aSymbolInstances)
            this.aSymbolInstances = [];
 
        this.aSymbolInstances.push(oSymbolInstance.getSymbolElement());
    };
 
    function _mapTweenNames(tw) {
        if(!tw.tween && tw.tw !== null && typeof tw.tw !=="undefined") {
            tw.tween = tw.tw;
            tw.tw = undefined;
        }
        if(tw.tween && tw.tween.length > 3) {
            var op = tw.tween[4];
            if(op) {
                if(!op.fromValue && op.f !== null) {
                    op.fromValue = op.f;
                    op.f = undefined;
                }
                if(!op.valueTemplate && op.vt !== null) {
                    op.valueTemplate = op.vt;
                    op.vt = undefined;
                }
            }
        }
        
        if(!tw.position && tw.p !== null && typeof tw.p !=="undefined") {
            tw.position = tw.p;
            tw.p = undefined;
        }
        if(!tw.duration && tw.d !== null && typeof tw.d !=="undefined") {
            tw.duration = tw.d;
            tw.d = undefined;
        }
        if(!tw.easing && tw.e !== null && typeof tw.e !=="undefined") {
            tw.easing = tw.e;
            tw.e = undefined;
        }
        if(!tw.trigger && tw.tr !== null && typeof tw.tr !=="undefined") {
            tw.trigger = tw.tr;
            tw.tr = undefined;
        }
    }
    
        
    function _createTimelineSetFromData( tlData, stateData ) {
        this.states = stateData;
        this.timelines = tlData;
        this.baseState = this.options.data.baseState;
        if ( !this.baseState ) {
            this.baseState = "Base State";
        }

        var sym = this;

        var _effectorFilter = function( valIn, oTw, ele, sProp, sUnits, elapsed, context ) {
            var selEle = "#" + ele.id;
            var oInsp = sym.effectors[selEle];
            if (ele) {
                var msDur = oTw.duration;
                var delta = Edge.Effectors.applyDelta( sym, sProp, ele, valIn, sym.effectors[selEle], msDur, oTw, elapsed, context);
                if ( delta ) {
                    valIn += delta;
                }
            }
            return valIn;
        };

        for ( var tln in this.timelines ) {
            if ( this.timelines.hasOwnProperty( tln )) {
                var tl = this.timelines[tln];

                for ( var i = 0; i < tl.timeline.length; i++ ) {
                    var tw = tl.timeline[i];

                    if ( sym.effectors ) {
                        if ( tw.tween && tw.tween.length > 2 ) {
                            var sel = tw.tween[1];
                            var prop = tw.tween[2];
                            var opt = tw.tween[4];
                           
                            //see if we need to add a filter!
                            var sId = substituteVariables( sel, sym.variableValues );
                            if ( sym.effectors[sId] ) {

                                if ( Edge.Effectors.affectsProperty( sym, prop, sym.effectors[sId] ) ) {
                                    opt.filter = _effectorFilter;
                                }
                            }
                        }
                    }
                }
            }
        }

        return this;
    }


    function _addBindingFromData ( bd ) {
        var td = bd[0];
        if ( td[0] === 'element' ) {
            var newEle = substituteVariables( td[1], this.variableValues );
            if ( newEle !== td[1] ) {
                td = Edge.cloneJSONObject( td );
                td[1] = newEle;
            }
        }
        var tfunc = triggerDict[td[0]];
        if ( tfunc ) {
            var afunc = _getActionCallbackFunc.call( this, td[0], td[1], bd.slice( 1 ) );
            if ( afunc ) {
                tfunc.apply( this, [ afunc ].concat( td.slice( 1 ) ) );
            }
        }
    }

    function _addBindingsFromData( bindingData ) {
        var cnt = bindingData.length;
        for ( var i = 0; i < cnt; i++ ) {
            var bd = bindingData[i];
            _addBindingFromData.call( this,  bd );
        }
    }

    _getActionCallbackFunc = function( eventType, selectorOrTL, funcName ) {
        var f = this[funcName[0]];
        var self = this;
        function dispatchError(sym, args){

            if(args.length >= 2 && typeof args[0] === 'object' && typeof args[1] === 'object' && args[1].type !== 'onError') {
                var evt;
                evt = $.Event( "onError" );
                if(self){
                    evt.compId = self.getComposition().compId;
                }
                evt.originalEvent = args[1];
                $( document ).triggerHandler( evt );
            }
            window.console.log("Javascript error in event handler! Event Type = " + eventType);
        }

        if ( typeof f === "function" ) {
            var args = funcName.slice( 1 );
            if ( eventType === 'element' ) {
                return function() {
                    var args;
                    try {
                        args = Array.prototype.slice.call( arguments );
                        args.unshift( self );
                        if(args.length >= 2 && typeof args[0] === 'object' && typeof args[1] === 'object' && args[1].type === 'compositionReady') {
                            // This is a hack but need a fix for multiple compositionReady messages when there are multiple comps in a page
                            if(typeof args[1].compId === 'string' && typeof args[0].composition === 'object' && args[1].compId !== args[0].composition.compId) {
                                return null;
                            }
                        }
                        return f.apply( self, args );
                    }
                    catch( err ) {
                        dispatchError(self, args);
                        return undefined;
                    }
                };
            } else if ( eventType === 'timeline' ) {
                var tlName = selectorOrTL;
                return function( tl, data ) {
                    var args;
                    try {
                        var e;
                        if ( data && data.methodName && /^trig_/.test( data.methodName ) ) {
                            // Triggers fire custom timeline events
                            e = $.Event( "trigger" );
                        }
                        else {
                            e = $.Event( eventType );
                        }
                        if ( data ) {
                            $.extend( e, data );
                        }
                        e.timeline = tl;
                        args = Array.prototype.slice.call( arguments );
                        args.splice( 0, 0, e, tlName );
                        args.unshift( self );
                        return f.apply( self, args );
                    }
                    catch( err ) {
                        dispatchError(self, args);
                        return undefined;
                    }
                };
            } else if (eventType === 'symbol' ) {
                return function ( sym, data ) {
                    var args;
                    try {
                        var e, variableValue;
                        if ( data && data.methodName ) {
                            e = $.Event( data.methodName );
                        }
                        else {
                            e = $.Event( eventType );
                        }

                        if ( data ) {
                            $.extend( e, data );
                            if ( data.variableValue ) {
                                variableValue = data.variableValue;
                            }
                        }

                        args = Array.prototype.slice.call( arguments );
                        args.splice( 0, 0, e, variableValue );
                        args.unshift( self );
                        return f.apply( self, args );
                    }
                    catch ( err ) {
                        dispatchError( self, args );
                        return undefined;
                    }
                };
            }
        }
        return null;
    };

    function _addActionsFromData( actionData ) {
        $.extend( this, actionData ); // this puts the actions right on object - this makes aSymbol.anAction() work and you can use 'this'
    }

    _getSymbolVars = function(){
        return { symbolSelector : '#' + $( this.element )[0].id };
    };

    function _goToInitialState() {
         var opts = {variables: this.variableValues };
         var autoPlay; // global
         var stateName = this.options.data.initialState;
         if ( !stateName ) {
             stateName = this.options.data.baseState;
         }
         if ( !Symbol.useCSSAnimation ) {
             if ( stateName ) {
                 var rules = _buildStateForCache.call( this, null, stateName, opts );
                 _applyRules.call( this, rules );
             }
             else {
                 for ( var tlName in this.timelines ) {
                     if ( this.timelines.hasOwnProperty( tlName ) ) {
                         autoPlay = this.getAutoPlay( tlName );
                         if ( typeof autoPlay === 'undefined' ) {
                             var tld = this.getTimelineData( tlName );
                             if ( tld ) {
                                 autoPlay = tld.autoPlay;
                             }
                         }
                         if ( typeof autoPlay === 'undefined' || autoPlay === "true" || autoPlay === true ) {
                             this.seekTimeline( tlName, 0 );
                         }
                     }
                 }
             }
         }
     }
    
     function _getDefltTL() {
         return "Default Timeline";
     }

    function _preNotify( eventName, tlName, options ) {
        var o = {}; // shallow copy the options
        $.extend( o, options );
        var evt = _createEvent.call( this, { tlName: tlName, tlOptions: o } );
        this.notifyObservers( eventName, evt );
        if ( !evt.performDefaultAction ) {
            o = evt.tlOptions;
            var postEvt = { Symbol: this, timelineName: tlName, tlOptions: o, performDefaultAction: true };
            eventName = eventName.replace( /onPre/, 'onPost' );
            this.notifyObservers( eventName, postEvt );
            return undefined;
        }
        return evt.tlOptions;
    }

    function _posToNum( tlName, posInMsOrLabel ) {
        if ( typeof posInMsOrLabel === "string" ) {

            var tld = this.getTimelineData( tlName );
            if ( !tld || !tld.labels ) {
                return 0;
            }
            return tld.labels[posInMsOrLabel];
        }
        return posInMsOrLabel;
    }

    function _getTimelineWithOwnStates( timelineName ) {
        var tld = this.getTimelineData( timelineName );
        if ( !tld ) {
            return null;
        }

        return this._getTimeline( timelineName, tld.toState, tld.fromState );
    }

    function _stop( tlName, opts ) {
        var tl = _getTimelineWithOwnStates.call( this, tlName );
        if ( tl ) {
            tl.stop( opts );
        }
    }
    
    function _saveObservers( tlName ) {
        var tld = this.timelines[tlName];
        var tl = _getCachedTimeline.call( this, tlName, tld.toState, tld.fromState );
        if ( tl ) {

            if ( !this.timelineObservers ) {
                this.timelineObservers = {};
            }

            this.timelineObservers[tlName] = tl.observers.slice( 0 );
        }
    }

    function _restoreObservers( tlName, tl ) {
        if ( this.timelineObservers && this.timelineObservers[tlName] ) {

            var obs = this.timelineObservers[tlName];
            if ( obs ) {
                var i;
                var cnt = obs.length;
                for ( i = 0; i < cnt; i++ ) {
                    tl.addObserver( obs[i].observer );
                }

            }
        }
    }

    function _isCacheDirty( tlName ) {
         var tlKey = _makeTimelineKey.call( this, tlName );
         /*jshint eqnull:true */
         return this.timelineCache[tlKey] == null;
     }

    function  _getStateData( stateName ) {
         return this.states[stateName];
     }

     _makeTimelineKey = function( timelineName, toState, fromState ) {
         var tld = null;
         if ( !toState || !fromState ) {
             tld = this.getTimelineData( timelineName );
         }
         if ( tld ) {
             if ( !toState ) {
                 toState = tld.toState;
             }
             if ( !fromState ) {
                 fromState = tld.fromState;
             }
         }
         return timelineName + "-" + (toState ? toState : "") + "-" + (fromState ? fromState : "");
     };

    function _dirtyTimeline( tlName ) {

        var tld = this.timelines[tlName];
        var tl = _getCachedTimeline.call( this, tlName, tld.toState, tld.fromState );
        if ( tl && tl.updateFinalizer) {
            if(tl.updateFinalizer) {
                tl.removeObserver(tl.updateFinalizer);
            }
        }

        _saveObservers.call( this, tlName );
        var tlKey = _makeTimelineKey.call( this, tlName );
        this.timelineCache[tlKey] = null;
        this.timelineStateMap = {};
        this.fromStateCache = null;
        this.toStateCache = null;
    }

    function _getBaseStateData() {
        // Need to think about when to dirty this
        if ( !this.baseState ) {
            var state;
            for ( state in this.states ) {
                if ( this.states[state].baseState ) {
                    this.baseState = state;
                    return _getStateData.call( this, this.baseState );
                }
            }
        } else {
            return _getStateData.call( this, this.baseState );
        }
        return _getStateData.call( this, this.defaultBaseState );
    }

	function _getSymbolBaseStateOverrides() {
		return this.symbolBaseStateOverrides;
    }

	function _getStateSelector(selector) {
		if (typeof selector !== "string")
			return selector;
	
		if (this.idLookup && this.idLookup[selector]) {
			selector = "${_" + this.idLookup[selector] + "}";
		}
		else if ( selector.search( /\$\{/ ) === -1 ) {
			if (selector.search( /\#/) !== -1) {
				var ele = this.$(selector);
				if (ele && ele.get(0) && ele.get(0).id) {
					selector = ele.get(0).id;
				}
			}
			selector = "${_" + selector + "}";
		}
		return selector;
	}

    function _mergeBaseState( stateData ) {
        var state = Edge.cloneJSONObject( _getBaseStateData.call( this ) );
        for ( var selector in stateData ) {
            if ( stateData.hasOwnProperty( selector ) ) {
                if ( !state[selector] ) {
                    state[selector] = [];
                }
                state[selector] = state[selector].concat( stateData[selector] );
            }
        }
        return state;
    }

    _getCachedTimeline = function( timelineName, toState, fromState ) {
        var tlKey = _makeTimelineKey.call( this, timelineName, toState, fromState );
        return this.timelineCache[tlKey];
    };



    function efxUpdate(sym, timeline, data, bPost) {
        var timelineInfo = { timeline: timeline, data: data }, oCollector, fxInst, e, sel;

        for ( sel in sym.effectors ) {
            if ( sym.effectors.hasOwnProperty( sel ) ) {
                e = sym.$( sel );
                if ( e ) {
                    oCollector = {};
                    e.data( "efxCollector", oCollector );

                    fxInst = $( e ).data( "efxInst" );
                    while ( fxInst ) {
                        if ( !bPost ) {
                            fxInst.effector.preRender( e[0], fxInst, oCollector, timelineInfo );
                        }
                        else {
                            fxInst.effector.postRender( e[0], fxInst, oCollector, timelineInfo );
                        }
                        fxInst = fxInst.nextInst;
                    }
                }
            }
        }
    }

    // This function does not have to use .call
    function _createTimelineFromData( arr ) {
         var tl = Edge.Timeline.createTimeline();

        //add a listener to the timeline...
        var sym = this;
        if(Edge.Effectors) {
            tl.addObserver({
                "preUpdate": function(timeline, data) {
                    efxUpdate(sym, timeline, data, false);
                },
                "postUpdate": function(timeline, data) {
                    efxUpdate(sym, timeline, data, true);
                }
            });
        }
        
         var alen = arr.length;
         for ( var i = 0; i < alen; i++ ) {
             var d = arr[i];
             var s = null;
             if ( d.timeline ) {
                 s = _createTimelineFromData.call( this, d.timeline );
             }
             else if ( d.tween ) {
                 s = Edge.Timeline.createTween.apply( null, d.tween );
             }
             else if ( d.trigger ) {
                 var args = d.trigger.slice( 0, 2 );
                 args.push( this );
                 s = Edge.Timeline.createTrigger.apply( null, args );
             }

             if ( s ) {
                 tl.add( s, d.position, d.duration, d.easing, d.opts );
             }
         }

         return tl;
     }

     _buildStateForCache = function( timelineName, stateName, opts ) {
         var cache = {};
         if ( !stateName ) {
             return undefined;
         }
         var state = this.states[stateName];
         if ( !state ) {
             return;
         }
         var tdict = {};
         var i;
         var sel;
         var o;

         if ( timelineName ) {
             var tld = this.getTimelineData( timelineName ).timeline;
             var cnt = tld.length;

             for ( i = 0; i < cnt; i++ ) {
                 o = tld[i];
                 if ( o.tween ) {
                     sel = substituteVariables( o.tween[1], this.variableValues );
                     var t = o.tween[0] + ":" + sel + ":" + o.tween[2];
                     if ( !tdict[t] ) {
                         tdict[t] = [];
                     }
                     tdict[t].push( o );
                 }
             }
         }
         for ( var r in state ) {
             if ( r !== 'prototype' ) {
                 var rule = state[r];
                 for ( i = 0; i < rule.length; i++ ) {
					var decl = rule[i];
					if (r == "${symbolSelector}" && this._getBaseStateName() == stateName &&
						this._symbolBaseStateHasOverride(decl[0], decl[1])) {
						continue;
					}
                     sel = substituteVariables( r, this.variableValues );
                     var key = decl[0] + ":" + sel + ":" + decl[1];
                     if ( (decl[0] === 'style' || decl[0] === 'transform' || decl[0] === 'color' || decl[0] === 'subproperty' || decl[0] === 'gradient')/* && !tdict[key]*/ ) {
                         if ( !cache[sel] ) {
                             cache[sel] = [];
                         }
                         var value = decl[2];
                         if ( decl[3] && decl[3].valueTemplate ) {
                             var tokens = PropertyTween.prototype.parseTemplate.call( null, decl[3].valueTemplate );

                             if ( tokens ) {
                                 var tlen = tokens.length;
                                 var a = [];
                                 var vals = decl[2];
                                 if ( !$.isArray( vals ) ) {
                                     vals = [vals];
                                 }
                                 for ( var j = 0; j < tlen; j++ ) {
                                     o = tokens[j];
                                     if ( o.isPlaceholder ) {
                                         a.push( vals[o.value] );
                                     }
                                     else {
                                         a.push( o.value );
                                     }
                                 }

                                 value = a.join( "" );
                             }
                             else {
                                 value = decl[2].join( "" );
                             }
                         }
                         cache[sel].push( {decl:decl, value:value} );
                     }
                 }
             }
         }
         return cache;
     };

    function _ensureState( timelineName, stateType, opts ) {
         // stateType is 'toState' or 'fromState' or 'initialState'
         var cacheName = stateType + "Cache";
         if ( !this[cacheName] ) {
             this[cacheName] = {};
         }
         var rules = null;
         if ( !this[cacheName][timelineName] ) {
             var stateName = this.getTimelineData( timelineName )[stateType];
             rules = _buildStateForCache.call( this, timelineName, stateName, opts );
             // Can't cache states with parameterized actors
             if ( !_isParameterizedActorTL.call( this, timelineName ) && !_isParameterizedActorState.call( this, stateName ) ) {
                 this[cacheName][timelineName] = rules;
             }
         } else {
             rules = this[cacheName][timelineName];
         }

         _applyRules.call(this, rules, opts ); // Maybe rules should be an object with apply method?
     }

    _applyRules = function( rules, options ) {
         var sym = this;
         var transform;
         var subprops;
        var isWebkit = ( 'webkitAppearance' in document.documentElement.style );
         var _applyXformToEle = function() {
             var $this = $( this );
             var transformFull = {};

             var data =  $.data( this, Edge.TransformTween.dataName);
             data = data || Edge.TransformTween.prototype.buildTransformData.call( null, this );
             $.extend( transformFull, data, transform );

             $.data( this, Edge.TransformTween.dataName, transformFull );
             var dontForceZ = false;
             if ( options ) {
                 dontForceZ = options.dontForceZ;
             }
             Edge.TransformTween.applyTransform( $this, transformFull, undefined, {dontForceZ: !sym.gpuAccelerate} );
             var vis = $.data( this, 'ui_visibility' );
             if ( vis ) {
                 $this.css( 'visibility', vis );
             }
         };
         var _applySubpropToEle = function() {
             var $this = $( this );
             var subpropFull = {};

             var data =  Edge.SubpropertyTween.prototype.buildDefaultProps.call( null, this, subprops );

             $.extend( subpropFull, data );
             for (var prop in subprops) {
                 if (subprops.hasOwnProperty(prop)) {
                     if(subpropFull[prop]){
                         $.extend(subpropFull[prop], subprops[prop]);
                     } else {
                         subpropFull[prop] = subprops[prop];
                     }
                 }
             }

             for (var prop in subprops) {
                 if (subprops.hasOwnProperty(prop)) {
                     $.data( this, prop, subpropFull[prop] );
                     Edge.SubpropertyTween.applySubproperty( $this, subpropFull[prop], undefined, {} );
                 }
             }
         };

         for ( var sel in rules ) {
             if ( rules.hasOwnProperty( sel ) ) {
                 var rule = rules[sel];
                 var cnt = rule.length;
                 transform = null;
                 subprops = null;
                 for ( var i = 0; i < cnt; i++ ) {
                     var decl = rule[i].decl;
                     var prop = decl[1];
                     if ( decl[0] === "transform" ) {
                         if ( !transform ) {
                             transform = {};
                         }
                         transform[prop] = rule[i].value;
                     }
                     else if (decl[0] === "subproperty" ) {
                         if ( !subprops ) {
                            subprops = {};
                         }
                         var superProp = Edge.SubpropertyTween.getStyle(prop);
                         if ( !subprops[superProp] ) {
                            subprops[superProp] = {};
                         }
                         // get super property for prop and create sub-array
                         subprops[superProp][prop] = rule[i].value;
                     }
                     else {
                         decl = rule[i].decl;
                         var value = rule[i].value;
                         if(decl[0] === "color") {
                             value = Edge.colorToSupported(value);
                         }
                         if(decl[0] === "gradient") {
                            var parsedValue = Edge.Gradient.parseValue(value);
                            value = Edge.formatGradient(parsedValue, true);
                            $( sel ).css( prop, "-webkit-" + value );
                            $( sel ).css( prop, "-moz-" + value );
                            $( sel ).css( prop, "-ms-" + value );
                            $( sel ).css( prop, "-o-" + value );
                            value = Edge.formatGradient(parsedValue, false);
                            $( sel ).css( prop, value );
                            Edge.forceGPU(sel);
                         }
                         else {
                            $( sel ).css( prop, value );
                         }
                         if( isWebkit && prop === 'background-size' ) {
                             $( sel ).css('-webkit-background-size', value);
                     }
                 }
                 }
                 if ( transform && Edge.TransformTween ) {
                     $( sel ).each( _applyXformToEle );
                 }
                 if ( subprops && Edge.SubpropertyTween ) {
                     $( sel ).each( _applySubpropToEle );
                 }
             }
         }
     };

     function _ensureFromState( timelineName, opts ) {
         _ensureState.call( this, timelineName, 'fromState', opts );
     }

    function  _ensureToState( timelineName, opts ) {
         _ensureState.call( this, timelineName, 'toState', opts );
     }

    function _seek( timelineName, pos, opts ) {
         var isCacheDirty = _isCacheDirty.call( this, timelineName );
         var tld = this.getTimelineData( timelineName );
         if ( !tld ) {
             return;
         }
         var toState = tld.toState;
         
         // If a timeline reference was passed in or found by statename lookup, create a timeline
         // and seek it.
         var oldState = tld.fromState; // Force a start state if the timeline has one
         if ( !opts ) {
             opts = {};
         }

         if ( !isCacheDirty && opts.skipFromState ) {
             opts.assumeStateUnchanged = true;      // Tell the timeline that we haven't messed with it, so it can optimize
         } else {
             _ensureFromState.call( this, timelineName, opts );
             opts.assumeStateUnchanged = false;
         }
         
         var duration = 0;
         if ( timelineName ) {
             
             var tl = this._getTimeline( timelineName, toState, oldState );
             if ( tl ) {
                 duration = tl.getDuration();
    
                 tl.seek( pos, opts );
             }
             
         }

     }
     function _rememberBaseStateForTimeline( tlname ) {
         if ( tlname ) {
             var tlData = this.getTimelineData( tlname );
             if ( !tlData ) {
                 return;
             }
             var tld = tlData.timeline;
             var cnt = tld.length;

             for ( var i = 0; i < cnt; i++ ) {
                 var o = tld[i];
                 if ( o.tween ) {
                     var sel = substituteVariables( o.tween[1], this.variableValues );
                     _rememberBaseState.call( this, sel );
                 }
             }
         }
     }


    _rememberBaseState = function( ele ) {
        var $ele = $( ele );
        $ele.each( function() {
            var data = $.data( this, baseDataName );
            if ( !data ) {
                data = {};
                $.data( this, baseDataName, data );
                data.transformData = Edge.TransformTween.prototype.buildTransformData.call( null, this );
            }
        } );
    };

    _isParameterizedActorTL = function( timelineName ) {
        var tld = this.getTimelineData( timelineName ).timeline;
        var cnt = tld.length;
        for ( var i = 0; i < cnt; i++ ) {
            var o = tld[i];
            if ( o.tween ) {
                if ( typeof o.tween[1] === "string" ) {
                    if ( o.tween[1].search( /\$\{/ ) !== -1 ) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    _isParameterizedActorState = function ( stateName ) {
        if ( !stateName ) {
            return false;
        }
        var state = this.states[stateName];
        if ( !state ) {
            return false;
        }
        for ( var sel in state ) {
            if ( state.hasOwnProperty( sel ) ) {
                if ( sel.search( /\$\{/ ) !== -1 ) {
                    return true;
                }
            }
        }
        return false;
    };

    function _notifyVariableBindings( varName ) {
        if ( !varName ) {
            return;
        }
        // process bindings
        var value = this.getVariable( varName );
        var evt = _createEvent.call( this, {variableValue:value} );
        this.notifyObservers( "variableChanged:" + varName, evt );
    }

    function _isReverse( opts ) {
        return typeof(opts) === 'object' && typeof(opts.playDirection) === 'string' && opts.playDirection === 'reverse';
    }
                            
    // Use extend to define public api
    $.extend( Symbol.prototype, Edge.Notifier.prototype, {
        constructor: Symbol,

        _init: function( ele, opts ) { // ele must be a single element - ok to be a $ of length 1
			var i;
			if ( opts ) {
                $.extend( this.options, opts );
                if ( $.isArray( opts.observers ) && opts.observers.length ) {
                    var obsLen = opts.observers.length;
                    for ( i = 0; i < obsLen; i++ ) {
                        this.addObserver( opts.observers[i] );
                    }
                }
            }
            if ( !this.options.data ) {
                return null;
            }
            this.element = ele;
            this.composition = this.options.composition;

            var evt = _createEvent.call(this);
            this.notifyObservers( "onPreSymbolInit", evt );
            var postEvt = _createEvent.call(this);
            if ( !evt.performDefaultAction ) {
                this.notifyObservers( "onPostSymbolInit", postEvt );
                return;
            }

            var $ele = $( ele );
            setSymbol( ele[0], this );
            if ( !$ele[0].id ) {
                $ele[0].id = Symbol._makeUniqueID();
            }

            var symbol = this;

            var data = this.options.data;
            this.variableValues = _makeDefaultVariables.call(this);
            $.extend( this.variableValues, this.options.variables );
            if (this.options.opts) {
                $.extend( this.variableValues, this.options.opts.variables );
            }

            var symVars = _getSymbolVars.call(this);
            this.setVariable( "_Stage", symVars.symbolSelector );
            this.setVariable( "_stage", symVars.symbolSelector );
            this.setVariable( "_" + $ele[0].id, symVars.symbolSelector );

            $ele.find( '*' ).each( function( i, e ) {
                if ( e.id ) {
                    symbol.setVariable( "_" + e.id, "#" + e.id );
                }
            } );
            
            this.symbolBaseStateOverrides = this.options.opts.symbolBaseState;
            
            if ( data.content ) {
                _injectMarkup.call(this);
            }
            if ( data.actions ) {
                _addActionsFromData.call( this, data.actions );
            }
            if (data.effectors) {
                this.effectors = {};
                for (var sFx in data.effectors) {
                    if(data.effectors.hasOwnProperty(sFx)) {
                        this.effectors[substituteVariables( sFx, this.variableValues )] = data.effectors[sFx];
                    }
                }
            }
            if ( data.timelines ) {
                _createTimelineSetFromData.call( this, data.timelines, data.states );
            }
            if ( data.bindings && data.bindings.length ) {
                _addBindingsFromData.call( this, data.bindings );
            }

            if ( typeof this.options.opts.autoPlay === 'object' ) {
                var tlName;
                for ( tlName in this.options.opts.autoPlay ) {
                    if ( this.options.opts.autoPlay.hasOwnProperty( tlName ) ) {
                        this.setAutoPlay( this.options.opts.autoPlay[tlName], tlName );
                    }
                }
            }

            var e = $ele[0];
            
            var isBody = e.nodeName === "BODY";
            this.stageIsBody = isBody;
            if ( data.content && data.content.dom && !isBody ) {
                var position = $ele.css( 'position' );
                if ( position !== 'absolute' && position !== 'relative' ) {
                    $ele.css( 'position', 'relative' );
                }
            }

            this.gpuAccelerate = data.gpuAccelerate;
            if ( typeof(this.gpuAccelerate) === "undefined" ) {
                this.gpuAccelerate = true;
            }
            this.gpuAccelerate = this.gpuAccelerate && Edge.supported.cssTransform3d;
            
            var ua = navigator.userAgent;
            var isWebkit = ( 'webkitAppearance' in document.documentElement.style );
            if(/Macintosh/.test(ua) || (isWebkit && /Windows NT/.test(ua)) ) {
                this.gpuAccelerate = false; // Just too many bugs in desktop Chrome
            }
            if(/Macintosh/.test(ua) && /Safari/.test(ua) && !/Chrome/.test(ua) && /Version\/5\.1/.test(ua))  {
                // bug 3302919 - positioning won't update if also transformed unless you turn on gpu for Safari 5.1
                this.gpuAccelerate = true;
            }
            
            var matches = /Version\/(\d+)/.exec(ua);
            if(/Macintosh/.test(ua) && /Safari/.test(ua) && !/Chrome/.test(ua)  )  {
                // bug 3327444 - bad rendering on some machines (retina only?) with safari 6
                if (matches && matches.length > 1 && matches[1]) {
                    if (parseInt(matches[1], 10) >= 6) {
                this.gpuAccelerate = true;
            }
                }
            }
            
            matches = /Chrome\/(\d+)/.exec(ua);
            if(matches && matches.length > 1 && matches[1])  {
                // bug 3328175 - bad rendering on Chrome 21
                if(parseInt(matches[1], 10) >= 21) {
                this.gpuAccelerate = true;
            }
            }
            if(isWebkit && (/iPad/.test(ua) || /iPod/.test(ua) || /iPhone/.test(ua) ))  {
                // bug 3312000 - positioning won't update if also transformed unless you turn on gpu for Safari 5.1
                // We don't have anewer version yet, so we won't check version number
                // This also prevents crashing when you change left in % on one element while transforming others
                this.gpuAccelerate = true;
            }

            // now calling _goToInitialState in coordination with callReadyList
            if(this.getComposition().compReadyCalled) {
                _goToInitialState.call(this);
            }

            var wkt = $ele[0].style.webkitTransform;
            if ( this.gpuAccelerate && $ele[0].style && (typeof(wkt) === "undefined" || wkt === "" || wkt === "none") ) {   
                $ele[0].style.webkitTransform = "translateZ(0)";
            }
            else if(!$ele[0].style.zIndex && window.edge_authoring_mode) {
                $ele[0].style.zIndex = 0;
            }
            
            this.notifyObservers( "onPostSymbolInit", postEvt );
            this.notifyObservers( "creationComplete", postEvt );

            return this;
        },

       _flushCache : function() {
           
            var tld = this.timelines;
            var tlName;
            for ( tlName in tld ) {
                if ( tld.hasOwnProperty( tlName ) ) {
                    _dirtyTimeline.call( this, tlName );
                }
            }
        },

        /**
         Play a timeline from the beginning.
         @name play
         @memberOf Edge.Symbol.prototype
         @function
         @param pos Position to start, in Ms or label. Defaults to current position if null or undefined
         @param executeTriggers Whether to fire triggers on first update; true to always fire, false for never, and null or undefined for auto
         **/
        play: function( pos, executeTriggers, options ) {
            var tlName = _getDefltTL.call(this);
            _stop.call( this, tlName, { dontNotify : true } );
            return this.playTimeline( tlName, pos, executeTriggers, options );
        },
        /**
         Play a timeline from the position, or optionally, the current pos.
         @name play
         @memberOf Edge.Symbol.prototype
         @function
         @param tlName Timeline to play
         @param pos Position to start, in Ms or label. Defaults to current position if null or undefined
         @param options Play options
         **/
        playTimeline: function( tlName, pos, executeTriggers, options ) {
            var sym = this;
            var o = _preNotify.call( sym, "onPreSymbolPlay", tlName, options );
            if ( typeof(o) === undefined ) {
                return;
            }

            pos = _posToNum.call( this, tlName, pos );

            var opts;
            if ( typeof tlName === 'string' ) {
                if ( sym.timelines ) {
                    var tl = _getTimelineWithOwnStates.call(sym, tlName );
                    if ( tl ) {
                        if(typeof pos === "undefined" || pos === null){
                            if(tl.getCurrentPosition() >= tl.getDuration()){
                                pos = 0;
                            }
                        }
                        _rememberBaseStateForTimeline.call( sym, tlName );

                        opts = options || {};
                        $.extend(opts, { variables: sym.variableValues, startPos: pos});
                        opts.executeTriggers = executeTriggers;
                        $.extend( opts, o );
                        tl.currentDirection = "forward";
                    }
                    sym._play( tlName, opts );
                }
            }

            var postEvt = _createEvent.call( sym, { timeline: tlName, tlOptions: opts } );
            sym.notifyObservers( "onPostSymbolPlay", postEvt );

            return this;
        },

        /**
         Play the default timeline in reverse from a position.
         @name playReverse
         @memberOf Edge.Symbol.prototype
         @function
         @param pos Position to play from. Default is current position, pass -1 to start at end
         @param executeTriggers Whether to fire triggers on first update; true to always fire, false for never, and null or undefined for auto

         **/
        playReverse: function( pos, executeTriggers, opts ) {
            return this.playTimelineReverse( _getDefltTL.call(this), pos, executeTriggers, opts );
        },
        /**
         Play a timeline in reverse from the a position.
         @name playTimelineReverse
         @memberOf Edge.Symbol.prototype
         @function
         @param tlName Timeline to play
         **/
        playTimelineReverse: function( tlName, pos, executeTriggers, options ) {
            var sym = this;
            var o = _preNotify.call( sym, "onPreSymbolPlayReverse", tlName, options );
            if ( typeof(o) === undefined ) {
                return;
            }

            options = options || {};
            Symbol.startClock();
            options.externalClock = true;
            pos = _posToNum.call( sym, tlName, pos );

            if ( typeof(tlName) === 'string' ) {
                var tl = _getTimelineWithOwnStates.call( sym, tlName );

                if ( typeof pos === "undefined" || pos === null ) {
                    pos = tl.currentPosition;
                    if ( pos === 0 ) {
                        pos = tl.getDuration();
                    }
                }
                var opts = { variables: sym.variableValues, playDirection: 'reverse', startPos:pos };
                $.extend( opts, o );
                opts.executeTriggers = executeTriggers;

                tl.currentDirection = "reverse";
                tl.play( opts );
            }

            var postEvt = _createEvent(sym, { timeline: tlName, tlOptions: o } );
            sym.notifyObservers( "onPostSymbolPlayReverse", postEvt );
            return this;
        },


        /**
         Seek the default timeline to a position.
         @name seek
         @memberOf Edge.Symbol.prototype
         @function
         @param pos Position to seek, in milliseconds
         @return - null
         **/
        seek: function( pos, options ) {
            return this.seekTimeline( _getDefltTL.call(this), pos, options );
        },
        /**
         Seek a timeline to a position.
         @name seekTimeline
         @memberOf Edge.Symbol.prototype
         @function
         @param tlName Timeline to seek
         @param pos Position to seek, in milliseconds
         @return - null
         **/
        seekTimeline: function( tlName, pos, options ) {
            var o = _preNotify.call(this,  "onPreSymbolSeek", tlName, options );
            if ( typeof(o) === undefined ) {
                return null;
            }

            pos = _posToNum.call( this, tlName, pos );

            if ( typeof tlName === 'string' ) {
                _rememberBaseStateForTimeline.call( this, tlName );
                var opts = {variables: this.variableValues };
                $.extend( opts, o );
                if ( this.timelines ) {
                    // _seek can handle undefined pos
                    _seek.call( this, tlName, pos, opts );

                }
            }
            var postEvt = _createEvent.call(this, { timeline: tlName, tlOptions: o } );
            this.notifyObservers( "onPostSymbolSeek", postEvt );

            return null;
        },

        /**
         Stop the default timeline at its current position.
         @name stop
         @memberOf Edge.Symbol.prototype
         @function
         @return - null
         **/
        stop: function( pos, options ) {
            return this.stopTimeline( _getDefltTL.call(this), pos, options );
        },
        /**
         Stop a timeline at its current position.
         @name stopTimeline
         @memberOf Edge.Symbol.prototype
         @function
         @param tlName Timeline to stop
         @return - null
         **/
        stopTimeline: function( tlName, pos, options ) {
            var sym = this;
            var o = _preNotify.call( sym, "onPreSymbolStop", tlName, options );
            if ( typeof(o) === undefined ) {
                return null;
            }

            if ( typeof tlName === 'string' ) {
                var opts = {variables: sym.variableValues };
                $.extend( opts, o );
                if ( sym.timelines ) {
                    if ( typeof pos === "undefined" ) {
                        _stop.call( this, tlName );
                    }
                    else {
                        if ( typeof pos === "string" ) {
                            pos = _posToNum.call( sym, tlName, pos );
                        }
                        _seek.call( sym, tlName, pos, opts );
                    }
                }
            }
        },
        /**
         Get the default timeline playhead position
         @name getPosition
         @memberOf Edge.Symbol.prototype
         @function
         @return The current playhead position of the default timeline, undefined if there is no default timeline.
         */
        getPosition: function() {
            return this.getTimelinePosition( _getDefltTL.call(this) );
        },
        /**
         Get the  playhead position for the specified timeline
         @name getPosition
         @memberOf Edge.Symbol.prototype
         @function
         @param tlName Name of the timeline to be queried
         @return The current playhead position of the specified timeline, undefined if there is no default timeline.
         */
        getTimelinePosition: function( tlName ) {
            if ( typeof tlName !== "string" ) {
                return undefined;
            }
            var tl = _getTimelineWithOwnStates.call( this, tlName );
            if ( tl ) {
                return tl.getCurrentPosition();
            }

            return undefined;
        },
        /**
         Get the default timeline duration
         @name getDuration
         @memberOf Edge.Symbol.prototype
         @function
         @return The duration of the default timeline, undefined if there is no default timeline.
         */
        getDuration: function() {
            return this.getTimelineDuration( _getDefltTL.call(this) );
        },
        /**
         Get the duration of the specified timeline
         @name getDuration
         @memberOf Edge.Symbol.prototype
         @function
         @param tlName Name of the timeline to be queried
         @return The duration of the specified timeline, undefined if there is no default timeline.
         */
        getTimelineDuration: function( tlName ) {
            if ( typeof tlName !== "string" ) {
                return undefined;
            }
            var tl = _getTimelineWithOwnStates.call( this, tlName );
            if ( tl ) {
                return tl.getDuration();
            }

            return undefined;
        },
        /**
         Determine whether the default timeline is playing
         @name isPlaying
         @memberOf Edge.Symbol.prototype
         @function
         @return Whether the default timeline is playing.
         */
        isPlaying: function() {
            return this.isTimelinePlaying( _getDefltTL.call(this) );
        },
        /**
         Determine whether the specified timeline is playing
         @name isPlaying
         @memberOf Edge.Symbol.prototype
         @function
         @param tlName Name of the timeline to be queried
         @return Whether the specified timeline is playing
         */
        isTimelinePlaying: function( tlName ) {
            if ( typeof tlName !== "string" ) {
                return undefined;
            }
            var tl = _getTimelineWithOwnStates.call( this, tlName );
            if ( !tl.playing ) {
                return false;
            }
            return true;
        },
        /**
         Determine whether the default timeline play direction is reverse
         @name isPlayDirectionReverse
         @memberOf Edge.Symbol.prototype
         @function
         @return Whether the default timeline play direction is reverse.
         */
        isPlayDirectionReverse: function() {
            return this.isTimelinePlayDirectionReverse( _getDefltTL.call(this) );
        },
        /**
         Determine whether the specified timeline is being used with play direction is reverse
         @name isPlayDirectionReverse
         @memberOf Edge.Symbol.prototype
         @function
         @param tlName Name of the timeline to be queried
         @return Whether the default timeline play direction is reverse.
         */
        isTimelinePlayDirectionReverse: function( tlName ) {
            if ( typeof tlName !== "string" ) {
                return undefined;
            }
            var tl = _getTimelineWithOwnStates.call( this, tlName );

            if ( tl.currentContext ) {
                if ( tl.currentContext.playDirection === "reverse" ) {
                    return true;
                }
            }
            else {
                //if the timeline is not in the process of an update, report the last direction played
                if ( tl.currentDirection === "reverse" ) {
                    return true;
                }
            }
            return false;
        },

        /**
         Determine whether the specified timeline is being used with play direction is reverse
         @name getLabelPosition
         @memberOf Edge.Symbol.prototype
         @function
         @param label Label to be queried
         @return Position of label in milliseconds.
         */
        getLabelPosition: function( label ) {
            return _posToNum.call( this, _getDefltTL.call(this), label );
        },

        lookupSelector: function( eleName ) {
            if ( typeof eleName !== "string" ) {
                return undefined;
            }
            try {
                return substituteVariables( "${_" + eleName + "}", this.variableValues );
            }
            catch( e ) {

            }
        },
        getComposition : function() {
            return this.composition;
        },

        /**
         Get the corresponding DOM element node for this Symbol
         @memberOf Edge.Symbol.prototype
         @function
         @return The DOM element node corresponding to this instance.
         @deprecated Use getSymbolElement instead
         */
        getSymbolElementNode: function() {
            return $( this.element )[0];
        },

        /**
         Get the corresponding jQuery element object for this Symbol
         @memberOf Edge.Symbol.prototype
         @function
         @return The jQuery element object corresponding to this instance.
         */
        getSymbolElement: function() {
            return $( this.element );
        },

        /**
         Get the Symbol name for this instance
         @name getSymbolTypeName
         @memberOf Edge.Symbol.prototype
         @function
         @return The name of the Symbol type to which this instance belongs.
         */
        getSymbolTypeName : function() {
            return this.options.data.typeName;
        },

        /**
         Set autoPlay for the given timeline for this instance. Overrides
         the autoPlay setting for the timeline in the symbol's definition.
         @name setAutoPlay
         @memberOf Edge.Symbol.prototype
         @function
         @param {boolean} autoPlay true if timeline should be autoPlayed on
         symbol instance creation or false
         @param {string} timelineName
         */
        setAutoPlay: function( autoPlay, timelineName ) {
            if ( !timelineName || timelineName.length === 0 ) {
                timelineName = _getDefltTL.call(this);
            }
            // Disable instance level autoPlay
            this.autoPlay[timelineName] = undefined; //autoPlay;
        },

        /**
         Get the autoPlay setting for the given timeline for this instance.
         This only returns the autoPlay value at the instance level if it was set
         else it is 'undefined'
         @name getAutoPlay
         @memberOf Edge.Symbol.prototype
         @function
         @param {string} timelineName
         @return "true", true, "false", false or 'undefined'
         */
        getAutoPlay: function( timelineName ) {
            if ( !timelineName || timelineName.length === 0 ) {
                timelineName = _getDefltTL.call(this);
            }
            return this.autoPlay[timelineName];
        },

        // This is called from Composition, so really shouldn't have an _
        _playAuto: function( bPlayNestedInstances ) {
            for ( var tlName in this.timelines ) {
                if ( this.timelines.hasOwnProperty( tlName ) ) {
                    var autoPlay = this.getAutoPlay( tlName );
                    if ( typeof autoPlay === 'undefined' ) {
                        var tld = this.getTimelineData( tlName );
                        if ( tld ) {
                            autoPlay = tld.autoPlay;
                        }
                    }

                    if ( typeof autoPlay === 'undefined' || autoPlay === "true" || autoPlay === true ) {
                        this.playTimeline( tlName, 0, undefined, { firstUpdate:true } );
                    }
                }
            }
            if ( bPlayNestedInstances && this.aSymbolInstances ) {
                var instLen = this.aSymbolInstances.length, i;
                for ( i = 0; i < instLen; i++ ) {
                    var instanceSelector = this.aSymbolInstances[i];
                    var childSymbol = Symbol.get( instanceSelector );
                    if ( childSymbol ) {
                        childSymbol._playAuto( bPlayNestedInstances );
                    }
                }
            }

        },

        /**
         Get a variable from this instance
         @name getVariable
         @memberOf Edge.Symbol.prototype
         @function
         @param {string} variable Name of the variable to fetch.
         @return The value of the variable.
         */
        getVariable: function( varName ) {
            return  this.variableValues[varName];
        },

        /**
         Set a variable on this instance
         @name setVariable
         @memberOf Edge.Symbol.prototype
         @function
         @param {string} variable Name of the variable to set. The variable does not have to be predefined by the Symbol.
         @param value The value to set
         */
        setVariable: function( varName, value ) {
            this.variableValues[varName] = value;
            
            // process bindings
            _notifyVariableBindings.call(this, varName);
        },

        destroy: function() {
            setSymbol( $(this.ele)[0], undefined );
            return this;
        },


        getTimelineData: function( timelineName ) {
            return this.timelines[timelineName];
        },

        // functions called from authoring as well as during runtime but 
        // are not public APIs
		_getBaseStateName: function() {
			var baseState = this.options.data.baseState;
			if ( !baseState ) {
				baseState = this.defaultBaseState;
			}
			return baseState;
		},

		_getSelectorBaseState: function( selector ) {
			selector = _getStateSelector.call(this, selector);
			var baseState = this._getBaseStateName();
			var aBaseStateProperties = null;
			if (this.options.data.states && this.options.data.states[baseState]) {
				aBaseStateProperties = this.options.data.states[baseState][selector];
			}
			return aBaseStateProperties;
		},

		_symbolBaseStateHasOverride: function (propertyType, propertyName) {
		
			if (this.symbolBaseStateOverrides) {
				for (var i=0; i<this.symbolBaseStateOverrides.length; i++) {
					if (this.symbolBaseStateOverrides[i][0] == propertyType && 
						this.symbolBaseStateOverrides[i][1] == propertyName) {
						return true;
					}
				}
			}
			return false;
		},

        // Called from authoring layer so needs to be available as method
        _getTimeline: function( timelineName, toState, fromState ) {
            var tlKey = _makeTimelineKey.call( this, timelineName, toState, fromState );
            if ( this.timelineCache[tlKey] ) {
                return this.timelineCache[tlKey];
            }

            if ( !this.getTimelineData( timelineName ) ) {
                return null;
            }

            var tld = this.getTimelineData( timelineName ).timeline;
            if ( toState || fromState ) {
                tld = Edge.cloneJSONObject( tld );
            }
            else {
                // Clean out any injected tweens
                for ( var ii = tld.length - 1; ii >= 0; ii--) {
                    if (tld[ii].id === 'injected') {
                        tld.splice(ii, 1);
                    }
                }
            }

            var cnt = tld.length;
            var sdict = {};
            var tdict = {};
            var t, o, duration = 0, s, d, last;

            for ( var i = 0; i < cnt; i++ ) {
                o = tld[i];
                
                if ( o.tween ) {
                    s = o.tween[1];
                    if ( !sdict[s] ) {
                        sdict[s] = [];
                    }
                    sdict[s].push( o );

                    t = o.tween[0] + ":" + o.tween[1] + ":" + (o.tween[0] === 'motion' ? 'location' : o.tween[2]);
                    if ( !tdict[t] ) {
                        tdict[t] = [];
                    }
                    tdict[t].push( o );
                }
                if ( o.tween || o.trigger ) {
                    d = o.duration || 0;
                    duration = Math.max( duration, o.position + d );
                }
            }

            var cmp = function( a, b ) {
                return a.position - b.position;
            };
            for ( t in tdict ) {
                if ( tdict.hasOwnProperty( t ) ) {
                    tdict[t].sort( cmp );
                }
            }

            // Predeclare vars for JSHint
            var selector, props, objs, numProps;
            var p, ttype, pname, pval;
            var j, k, newO;

            if ( toState ) {
                // Apply the toState to the timeline data.
                toState = _mergeBaseState.call( this, _getStateData.call( this, toState ) );
                for ( selector in toState ) {
                    if ( toState.hasOwnProperty( t ) ) {
                        props = toState[selector];
                        objs = sdict[selector];
                        numProps = props.length;

                        for ( j = 0; j < numProps; j++ ) {
                            p = props[j];
                            ttype = p[0];
                            pname = p[1];
                            pval = p[2];

                            var lo = null;
                            last = -1;
                            cnt = objs.length;
                            for ( k = 0; objs && k < cnt; k++ ) {
                                o = objs[k];
                                t = o.tween;
                                if ( t[0] === ttype && t[2] === pname && (last === -1 || (o.position + o.duration) > last) ) {
                                    lo = o;
                                    last = o.position + o.duration;
                                }
                            }
                        }
                    }
                }
            }

            var fromDict = {};

            if ( fromState ) {
                // Apply the fromState to the timeline data.

                fromState = _getStateData.call( this, fromState );
                for ( selector in fromState ) {
                    if ( fromState.hasOwnProperty( selector ) ) {
                        props = fromState[selector];
                        objs = sdict[selector];
                        numProps = props.length;

                        for ( j = 0; j < numProps; j++ ) {
                            p = props[j];
                            ttype = p[0];
                            pname = p[1];
                            pval = p[2];

                            if (selector === "${symbolSelector}" && this._symbolBaseStateHasOverride(ttype, pname)) {
								continue;
							}

                            var key = ttype + ":" + selector + ":" + pname;
                            fromDict[key] = pval;

                            var fo = null;
                            var start = -1;
                            cnt = 0;
                            if ( objs ) {
                                cnt = objs.length;
                            }
                            for ( k = 0; objs && k < cnt; k++ ) {
                                o = objs[k];
                                t = o.tween;
                                if ( t[0] === ttype && t[2] === pname && (start === -1 || o.position < start) ) {
                                    fo = o;
                                    start = o.position;
                                }
                            }
                            if ( fo ) {
                                var fromUndefined = fo.tween.length < 4 || !fo.tween[4] || typeof fo.tween[4].fromValue === 'undefined';
                                if ( fromUndefined  ) {
                                    if ( !fo.tween[4] ) {
                                        fo.tween[4] = {};
                                    }
                                    fo.tween[4].fromValue = pval;
                                }
                            }
                        }
                    }
                }
            }

            var isDeterminate = true;
            var val;
            if ( isDeterminate) {
                for ( t in tdict ) {
                    if ( tdict.hasOwnProperty( t ) ) {
                        if ( tdict[t][0].position > 0 ) {
                            val = fromDict[t];
                            if(tdict[t][0].tween && tdict[t][0].tween[0] === "motion"){
                                o = tdict[t][0];
                                var x = o.tween[2][0][0];
                                var y = o.tween[2][0][1];
                                newO = createSimpleMotionPathData(o.tween[1], {x : x, y : y}, {x : x, y : y},  0, Math.max(0, o.position - 1));
                                newO.id = 'injected';
                                tld.push( newO );
                            }
                            else if ( val !== undefined ) {
                                o = Edge.cloneJSONObject( tdict[t][0] );
                                o.tween[3] = o.tween[4].fromValue = val;
                                var pos = o.position;
                                o.position = 0;
                                o.duration = 0;
                                o.id = 'injected';
                                tld.push( o );
                            }
                        }
                        last = tdict[t].length - 1;
                        if ( last >= 0 ) {
                            o = tdict[t][last];
                            var endTime = o.position +  o.duration;
                            if ( endTime < duration ) {
                                newO = Edge.cloneJSONObject( tdict[t][last] );
                                if (newO.tween[4]) {
                                    newO.tween[4].fromValue = o.tween[3];
                                }
                                newO.position = duration;
                                newO.duration = 0;
                                newO.id = 'injected';
                                newO.opts = newO.opts || {};
                                newO.opts.reverseOnly = true;
                                tld.push( newO );
                            }
                        }
                    }
                }
            }

            // Append a dummy tween if the declared timeline duration is greater than the final tween or trigger
            var tldef = this.getTimelineData( timelineName );
            if ( typeof(tldef.duration) === 'number' && duration < tldef.duration ) {
                o = { id: "rest", tween: [ "style", "${_Stage}", "-edge_resting", '100%', { fromValue: '0%'}], position: duration, duration: tldef.duration - duration };
                tld.push( o );
            }
            var tl = _createTimelineFromData.call( this, tld );
            _restoreObservers.call( this, timelineName, tl );   // restore the observers saved when prior cached version was flushed
            this.timelineCache[tlKey] = tl;
            return tl;
        },

        _play: function( timelineName, opts ) {
            Symbol.startClock();
            opts.externalClock = true;
            opts.dontForceZ = !this.gpuAccelerate;
            var tld = this.getTimelineData( timelineName );
            if ( !tld ) {
                return;
            }
            var toState = tld.toState;

            if ( timelineName ) {
                var tl = _getTimelineWithOwnStates.call(this, timelineName );
                if ( tl ) {
                    if ( toState && !_isReverse.call( this, opts ) ) {
                        if ( !this.tlPlayHandler ) {
                            var self = this;
                            this.tlPlayHandler = {};
                            this.tlPlayHandler.onComplete = function() {
                                _ensureToState.call( self, this.timelineName, this.opts );
                                this.tl.removeObserver( self.tlPlayHandler );
                            };
                        }
                        $.extend( this.tlPlayHandler, {tl: tl, timelineName:timelineName, opts: opts} );
                        tl.addObserver( this.tlPlayHandler );
                    }
                    tl.play( opts );
                }
            }
        },
        
        _executeSymbolAction: function( e, data ) {
            if ( typeof data !== "object" || data.length < 3 ) {
                return;
            }

            var actionFunction = data[0];
            var symInstanceSelector = data[1];
            var symInstance = Edge.Symbol.get( this.$( symInstanceSelector ) );
            if ( !symInstance || !actionFunction ) {
                return;
            }

            var args = data[2];
            if ( !args || typeof args !== "object" ) {
                args = null;
            }

            symInstance[actionFunction].apply( symInstance, args );
        },
        //Alias for _executeSymbolAction used when writing minified content
        eSA: function(e, data) {
            this._executeSymbolAction(e, data);
        },
        
        _executeMediaAction: function( e, data ) {
            if ( typeof data !== "object" || data.length < 3 ) {
                return;
            }

            var actionFunction = data[0];
            var medInstanceSelector = data[1];
            var medInstance = this.$( medInstanceSelector )[0];
            if ( !medInstance || !actionFunction ) {
                return;
            }

            var args = data[2];
            if ( !args || typeof args !== "object" ) {
                args = null;
            }

            if ( actionFunction === "play" ) {
                if ( args && args.length > 0 && typeof args[0] === "number" ) {
                    medInstance.currentTime=args[0];
                }
                medInstance.play();
            }
            else if ( actionFunction === "pause" ) {
                medInstance.pause();
            }
        },
        //Alias for _executeSymbolAction used when writing minified content
        eMA: function(e, data) {
            this._executeMediaAction(e, data);
        },

        createChildSymbol: function (symbolName, parentSelector, index, variables) {
            if (!symbolName || !parentSelector || symbolName === this.getSymbolTypeName())
                return;
            var parentEle = this.$(parentSelector), 
                aSymbolInstances;
            if (!parentEle || !parentEle[0])
                return;
            
            aSymbolInstances = _createSymbolChild.call(this.getComposition(), symbolName, parentEle, index, variables);
            if (aSymbolInstances) {
                _addChildSymbol.call(this, aSymbolInstances[0]);
                return aSymbolInstances[0];
            }
        },
        
        // Remove this instance from its element
        // and the global list of instances. It will be eligible for gc as soon
        // as user code lets go of references.
        deleteSymbol: function( opts ) {
            opts = opts || {};
            var symbolInstances;
            if ( this.composition ) {
                symbolInstances = this.composition.getSymbols();
            }

            if ( !symbolInstances ) {
                return;
            }

            var evt = _createEvent.call(this, {  } );
            this.notifyObservers( 'onPreRemove', evt );
            this.notifyObservers( 'beforeDeletion', evt );
            if ( !evt.performDefaultAction ) {
                return;
            }

            var i, instLen, instanceSelector;
            // Remove all nested symbol instances
            if ( this.aSymbolInstances ) {
                instLen = this.aSymbolInstances.length;
                while ( this.aSymbolInstances.length > 0 ) {
                    instanceSelector = this.aSymbolInstances[0];
                    this.aSymbolInstances.splice( 0, 1 );
                    this.composition.removeSymbol( instanceSelector, opts );
                }
            }

            if ( this.timelines ) {
				for ( var tlName in this.timelines ) {
					if ( this.timelines.hasOwnProperty( tlName )) {
						_stop.call( this, tlName );
					}
				}
            }

            var parentSymbol = this.getParentSymbol();
            if (parentSymbol && parentSymbol.aSymbolInstances) {
                instLen = parentSymbol.aSymbolInstances.length;
                for ( i = 0; i < instLen; i++ ) {
                    instanceSelector = parentSymbol.aSymbolInstances[i];
                    if (parentSymbol.getSymbol(instanceSelector) === this) {
						parentSymbol.aSymbolInstances.splice( i, 1 );
						break;
                    }
                }
            }
            
   			if ( this.idLookup ) {
				var sel;
				for ( sel in this.idLookup ) {
					if ( this.idLookup.hasOwnProperty( sel ) ) {
						$( sel ).removeData( "symParent");
					}
				}
			}

            var ele = this.element;
            setSymbol( $(ele)[0], undefined );

            if ( opts._keepElement ) {
                $( ele ).empty();
            }
            else {
                $( ele ).remove();
            }

            var len = symbolInstances.length;
            for ( i = len; i >= 0; i-- ) {
                if ( symbolInstances[i] === this ) {
                    symbolInstances.splice( i, 1 );
                    break;
                }
            }
            this.element = null;
            this.notifyObservers( 'onPostRemove', evt );
            this.observers = [];
        },
        getSymbol: function( selector ) {
            var $ele = this.$( selector );
            return Symbol.get( $ele );
        },
        getChildSymbols: function() {
            var aChildSymbols = [];
            if ( this.aSymbolInstances ) {
                for ( var i = 0; i < this.aSymbolInstances.length; i++ ) {
                    var childInstanceSelector = this.aSymbolInstances[i];
                    var childSymbol = this.getSymbol( childInstanceSelector );
                    if ( childSymbol ) {
                        aChildSymbols.push( childSymbol );
                    }
                }
            }
            return aChildSymbols;
        },
        getParentSymbol: function() {
            return _getParentSymbol.call(this);
        },
       $: function( selector ) {
            var ele = selector;
            if ( typeof selector === 'string' ) {
                if ( selector.search( /\$\{/ ) === -1 ) {
                    ele = this.lookupSelector( selector );
                    if ( typeof ele === "undefined" ) {
                        ele = selector;
                    }
                }
                else {
                    ele = substituteVariables( selector, this.variableValues );
                }
            }

            var $ele = $( ele );
            return $ele;
        }

    } );

    /**
     Get a parameter this instance
     @name getParameter
     @memberOf Edge.Symbol.prototype
     @function
     @param {string} param Name of the parameter to fetch.
     @return The value of the parameter.
     @deprecated Use sym.getVariable instead.
     */
    Symbol.prototype.getParameter = Symbol.prototype.getVariable;

    /**
     Set a parameter this instance
     @name setParameter
     @memberOf Edge.Symbol.prototype
     @function
     @param {string} param Name of the parameter to set. The parameter does not have to be predefined by the Symbol.
     @param value The value to set
     @deprecated Use sym.setVariable instead
     */
    Symbol.prototype.setParameter = Symbol.prototype.setVariable;
    

    Symbol.get = function( ele ) {    // return the Symbol for an element
        return getSymbol($(ele)[0]);
    };
    Symbol.getDefaultEasing = function( ele ) {
        return Edge.TimelineObject.defaultEasing;
    };
    Symbol.getParentSymbol = function( ele ) {
        var parents = $( ele ).parents();
        var parentLen = parents.length;
        for ( var i = 0; i < parentLen; i++ ) {
            var sym = Symbol.get( parents[i] );
            if ( sym ) {
                return sym;
            }
        }
        return null;
    };
 
    Symbol.startClock = function() {
        if ( !Symbol.timerFunc ) {
            
            var t = 1000 / Edge.Timeline.config.fps;
             Symbol.requestAnimationFrame = window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    window.oRequestAnimationFrame;
            var ua = navigator.userAgent;
            var isWebkit = ( 'webkitAppearance' in document.documentElement.style );
            if (isWebkit && (window.self !== window.top) && (/iPad/.test(ua) || /iPod/.test(ua) || /iPhone/.test(ua) )) {
                // Bug 3362603 - iOS 6 didn't implement RAF correctly for multiple iframes in page
                // If they fix it in 7 we can special case this for versions
                // Note that (window.self === window.top) tests if we are in iFrame
                Symbol.requestAnimationFrame = null;
            }
            Symbol.requestAnimationFrame = Symbol.requestAnimationFrame ||
                    function( cb ) {
                        window.setTimeout( cb, t );
                    };
            
            Symbol.timerFunc = function() {
                Edge.Timeline.tick();
                Symbol.requestAnimationFrame.call( window, Symbol.timerFunc );
            };
            Symbol.requestAnimationFrame.call(window, Symbol.timerFunc );
        }
    };

    var bindHelper = function( compId, symbolName, elementOrTimelineSelector, eventName, eventFunction, bindType, apiName ) {
        var symbolDefn = Edge.getCompositionSymbolDefns( compId )[symbolName];
        if ( !symbolDefn ) {
            Edge.logError( "$.Edge.Symbol." + apiName + ": symbol not found" );
            return;
        }

        if ( !symbolDefn.actions ) {
            symbolDefn.actions = {};
        }

        var name = Symbol._makeUniqueID();

        symbolDefn.actions[name] = eventFunction;

        if ( !symbolDefn.bindings ) {
            symbolDefn.bindings = [];
        }
        var bd = [
            [bindType, elementOrTimelineSelector, eventName],
            name
        ];
        symbolDefn.bindings.push( bd );

        //patch any existing symbols
        /*jshint eqeqeq:false */
        /*jshint eqnull:true */
        if ( null == Edge.compositions ) {
            return;
        }

        var theComp = Edge.compositions[compId];
        if ( null == theComp ) {
            return;
        }

        var aSymbolInstances = theComp.getSymbols();
        if ( null == aSymbolInstances ) {
            return;
        }

        var instLen = aSymbolInstances.length;
        var symbolInstance;
        for ( var i = 0; i < instLen; i++ ) {
            symbolInstance = aSymbolInstances[i];
            var currSymName = symbolInstance.getSymbolTypeName();
            if ( symbolName === currSymName ) {
                var aActions = {};
                aActions[name] = eventFunction;
                _addActionsFromData.call( symbolInstance, aActions );
                _addBindingFromData.call( symbolInstance, bd );
            }
        }
    };

    Symbol.bindElementAction = function ( compId, symbolName, elementSelector, eventName, eventFunction ) {
        bindHelper( compId, symbolName, elementSelector, eventName, eventFunction, 'element', 'bindElementAction' );
    };

    Symbol.bindTimelineAction = function ( compId, symbolName, timelineName, eventName, eventFunction ) {
        bindHelper( compId, symbolName, timelineName, eventName, eventFunction, 'timeline', 'bindTimelineAction' );
    };

    Symbol.bindTriggerAction = function( compId, symbolName, timelineName, delay, triggerFunction ) {
        var symbolDef = Edge.getCompositionSymbolDefns( compId )[symbolName];
        if ( !symbolDef ) {
            Edge.logError( "$.Edge.Symbol.bindTriggerAction: symbol not found" );
            return;
        }

        var tl = symbolDef.timelines[timelineName].timeline;

        if ( !tl ) {
            Edge.logError( "$.Edge.Symbol.bindTriggerAction: timeline not found" );
            return;
        }

        var customEventName = "trig_" + Edge.Symbol._makeUniqueID();
        var tlod = { trigger: [ customEventName, timelineName ], position : delay, duration: 0, id: customEventName };
        tl.push( tlod );

        bindHelper( compId, symbolName, timelineName, customEventName, triggerFunction, 'timeline', 'bindTriggerAction' );
    };
    
    Symbol.bindSymbolAction = function ( compId, symbolName, eventName, eventFunction) {
        bindHelper( compId, symbolName, "", eventName, eventFunction, 'symbol', 'bindSymbolAction' );
    };

    Symbol.bindVariableAction = function (compId, symbolName, varName, eventFunction) {
        var eventName = "variableChanged:" + varName;
        bindHelper( compId, symbolName, "", eventName, eventFunction, 'symbol', 'bindVariableAction' );
    };

    Symbol.bindVariableActionToSymbol = function (sym, varName, actionFunc) {
        var symbolInstance = Symbol.get(sym);
        if (!symbolInstance)
            return;

        varName = Symbol._parseVariableName(varName);
        
        var eventName = "variableChanged:" + varName;
        var name = Symbol._makeUniqueID();

        var bd = [
            ["symbol", "", eventName],
            name
        ];
        
        var aActions = {};
        aActions[name] = actionFunc;
        _addActionsFromData.call( symbolInstance, aActions );
        _addBindingFromData.call( symbolInstance, bd );
    };
    
    var uniqueID = (new Date()).getTime();
    var makeUniqueID = function() {
        var id = 'eid_' + uniqueID++;
        while ( $( '#' + id ).length > 0 )
            id = 'eid_' + uniqueID++;
        return id;
    };
    Symbol._makeUniqueID = makeUniqueID;

    Edge.importSymbolDefinitions = function() {};
    
    Edge.registerFonts = function( fonts ) {
        if ( !fonts ) {
            return;
        }
        var iTKPos, iTKEnd, eleTK, fnTypeKitInit, bFontExists, bEWF;
        if ( !Edge.fonts ) {
            Edge.fonts = {};
        }
        for ( var fontName in fonts ) {
            if ( fonts.hasOwnProperty( fontName ) ) {
                if ( !Edge.fonts[fontName] ) {

                    var sInclude = fonts[fontName];

                    if ( sInclude && sInclude !== "" ) {

                        //see if Edge.fonts already has this include... if so we don't need to instantiate it again...
                        bFontExists = false;
                        for ( var sExistingFont in Edge.fonts ) {
                            if ( Edge.fonts.hasOwnProperty( sExistingFont ) ) {
                                if ( Edge.fonts[sExistingFont] === sInclude ) {
                                    bFontExists = true;
                                }
                            }
                        }

                        if ( !bFontExists ) {
                            Edge.fonts[fontName] = sInclude;

                            /*
                             <script type="text/javascript" src="//use.typekit.com/pza4jbg.js"></script>
                             <script type="text/javascript">try{Typekit.load();}catch(e){}</script>
                             */
                            iTKPos = sInclude.indexOf( "//use.typekit.com/" );
                            if (iTKPos < 0) {
                                iTKPos = sInclude.indexOf( "//use.typekit.net/" );
                            }
                            if (iTKPos < 0) {
                                iTKPos = sInclude.indexOf( "//use.edgefonts.net/" );
                                bEWF = (iTKPos > 0);
                                window._adobewebfontsappname_ = "Animate";
                            }
                            
                            if (iTKPos > 0) {
                                
                                iTKEnd = sInclude.indexOf( "\"", iTKPos + 1 );
                                if ( iTKEnd > 0 ) {
                                    var sTKURL = sInclude.substring( iTKPos, iTKEnd );
                                    
                                    if (bEWF && window.location.protocol === 'file:') {
                                        sTKURL = "http:" + sTKURL;
                                    }

                                    eleTK = document.createElement( "script" );
                                    eleTK.src = sTKURL;
                                    eleTK.type = "text/javascript";
                                    document.getElementsByTagName( "head" )[0].appendChild( eleTK );
                                    if (!bEWF) {
                                        fnTypeKitInit = function () {
                                            try {
                                                window.Typekit.load();
                                            }
                                            catch ( e ) {
                                                setTimeout( fnTypeKitInit, 100 );
                                            }
                                        };
                                        setTimeout( fnTypeKitInit, 100 );
                                    }
                                }
                            }
                            else if(sInclude.indexOf("<script") < 0) {
                                //for non-script includes - we can just append to the head
                                $( 'head' ).append( sInclude );
                            }
                            else {
                                //we can try to eval their script...
                                var iScriptStart = sInclude.indexOf(">");
                                var iScriptEnd = sInclude.indexOf("</script>");
                                
                                if (iScriptStart > 0 && iScriptEnd > 0) {
                                    var sScript = sInclude.substring(iScriptStart + 1, iScriptEnd);
                                    try { window.eval(sScript); } catch(exFnt) {}
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    

    var _Nx=0;
    function nx() { return "dg" + (++_Nx); }
                                        
    //in support of condensed timeline declaration
    Edge.P = function(_p,_st,_tt,_vt,_u) {
                var o=this, v=_st, sU='';
                o.p = _p;
                o.tt = _tt || "style";
                /*jshint eqnull:true */
                if(_u || _u === "") {
                    o.u = _u;
                }
                else if(!o.u && o.u !== "") {
                    o.u = 'px';
                }
                if(typeof(_st) === "number") {
                    sU = o.u;
                    v = _st+sU;
                }
                o.vt = _vt;
        
                 /*jshint eqeqeq:false */
                 /*jshint eqnull:true */
                if(_st != null) {
                    if(!o.st[o.s]) {
                        o.st[o.s] = [];
                    }
                    if(o.vt) {
                        o.st[o.s][o.st[o.s].length]=[o.tt, o.p, v, {valueTemplate:o.vt}];
                    }
                    else {
                        o.st[o.s][o.st[o.s].length]=[o.tt, o.p, v];
                    }
                    o.last=_st;
                }
                return o;
             };
    Edge.T = function(_p,_t,_d,_e,_f) {
                var oF = {}, o = this;
                var sU = '', fv=_f, v=_t;
                if(!fv && fv !== 0) {
                    fv = o.last;
                }
                if(typeof(_t) === "number") {
                    sU = o.u;
                    if(fv || fv === 0) {
                        fv= fv + sU;
                    }
                    v = _t + sU;
                }
                if(fv || fv === 0) {
                    oF.f=fv;
                }
                if(o.vt) {
                    oF.vt=o.vt;
                }
                if(!_e) {
                    _e=o.lastE;
                }
                if(!_e) {
                    _e = "linear";
                }
                
                 /*jshint eqeqeq:false */
                 /*jshint eqnull:true */
                if(_d == null) { _d = 0; }
                
                if (o.tt === "motion") {
                    o.tl[o.tl.length] = { id:nx(), tw:[o.tt, o.s, v],p:Math.floor(_p*1000),d:Math.floor(_d*1000),e: _e};
                }
                else {
                    o.tl[o.tl.length] = { id:nx(), tw:[o.tt, o.s, o.p, v, oF ],p:Math.floor(_p*1000),d:Math.floor(_d*1000),e: _e};
                }
                o.last=_t;
                o.lastE=_e;
                return o;
            };
    Edge.A = function(_s, _tl, _st) {
                if(!_tl) {
                    _tl = this.tl;
                    _st = this.st;
                }
                return { tl:_tl, st:_st, s:_s, A:Edge.A, P:Edge.P, T:Edge.T};
            };

    Edge.compositions = Edge.compositions || {};
    Edge.compositionDefns = Edge.compositionDefns || {};
    Edge.compositionFonts = Edge.compositionFonts || {};
    Edge.compositionReadyHandler = Edge.compositionReadyHandler || {};

    Edge.registerSymbolDefns = function ( compId, symbolData ) {
        if ( !compId || compId.length <= 0 || !Edge.compositionDefns[compId] ) {
            return;
        }

        var symbolName, tlName, i, tw;
        for ( symbolName in symbolData ) {
            if ( symbolData.hasOwnProperty( symbolName ) ) {
                var oD = symbolData[symbolName];
                oD.typeName = symbolName;
                 /*jshint eqeqeq:false */
                 /*jshint eqnull:true */

                //patch short names...
                if ( oD.v ) {
                    oD.version = oD.v;
                }
                if ( oD.v ) {
                    oD.minimumCompatibleVersion = oD.mv;
                }
                if ( oD.b ) {
                    oD.build = oD.b;
                }
                if ( oD.bS ) {
                    oD.baseState = oD.bS;
                }
                if ( oD.iS ) {
                    oD.initialState = oD.iS;
                }
                if ( oD.gpu != null ) {
                    oD.gpuAccelerate = oD.gpu;
                }
                if ( oD.rI != null ) {
                    oD.resizeInstances = oD.rI;
                }
                if ( oD.cn ) {
                    oD.content = oD.cn;
                }
                if ( oD.content ) {
                    var oDC = oD.content;
                    if ( oDC.sI != null ) {
                        oDC.symbolInstances = oD.content.sI;
                    }
                    if ( oDC.symbolInstances ) {
                        for ( var iS = 0; iS < oDC.symbolInstances.length; iS++ ) {
                            var oSI = oDC.symbolInstances[iS];
                            if ( oSI.sN != null ) {
                                oSI.symbolName = oSI.sN;
                            }
                            if ( oSI.a != null ) {
                                oSI.autoPlay = oSI.a;
                            }
                            if ( oSI.x != null ) {
                                oSI.variables = oSI.x;
                            }
                        }
                    }
                }

                if ( oD.x ) {
                    oD.variables = oD.x;
                }
                if ( oD.s ) {
                    oD.states = oD.s;
                }
                if ( oD.tl ) {
                    oD.timelines = oD.tl;
                }
                for ( tlName in oD.timelines ) {
                    if ( oD.timelines.hasOwnProperty( tlName ) ) {
                        var oTL = oD.timelines[tlName];
                        if ( oTL.fS ) {
                            oTL.fromState = oTL.fS;
                        }
                        if ( oTL.tS ) {
                            oTL.toState = oTL.tS;
                        }
                        if ( oTL.d != null ) {
                            oTL.duration = oTL.d;
                        }
                        if ( oTL.a != null ) {
                            oTL.autoPlay = oTL.a;
                        }
                        if ( oTL.l ) {
                            oTL.labels = oTL.l;
                        }
                        if ( oTL.tt ) {
                            oTL.timeline = oTL.tt;
                        }
                        for (i = 0; i < oTL.timeline.length; i++ ) {
                            tw = oTL.timeline[i];
                            _mapTweenNames(tw);
                        }
                    }
                }
            }
        }
    };
    
    Edge.getPxValue = function(val) {
        if (!val) {
            return 0;
        }   
        if (typeof(val) === "number") {
            return val;
        }
        var pos = val.indexOf("px");
        if (pos > 0) {
            return parseFloat(val.substring(0, pos));
        }
        return parseFloat(val);
    };
    
    Edge.mapContentToTranslate = function(aDom, htManagedIDs, htHasPxAni, htLeft, htTop) {
        var i,
            oN,
            sId;
        
        for (i=0; i<aDom.length; i++) {
            oN = aDom[i];
            sId = "${_" + oN.id + "}";
            
            if (htHasPxAni[sId]) {
                
                htManagedIDs[sId] = true;
            
                if (!oN.rect) {
                    oN.rect = oN.r;
                    oN.r = undefined;
                    if (!oN.rect) {
                        oN.rect = [0,0,0,0];
                    }
                }
                
                if (oN.rect) {
                    
                    if (!oN.transform) {
                        oN.transform = oN.tf;
                        oN.tf = undefined;
                        if (!oN.transform) {
                            oN.transform = [];
                        }
                    }
                    if (!oN.transform[0]) {
                        oN.transform[0] = [0,0];
                    }
                    
                    if (Edge.isPx(oN.rect[0])) {
                        oN.transform[0][0] = Edge.getPxValue(oN.rect[0]);
                        htLeft[sId] = oN.transform[0][0];
                        oN.rect[0] = "0px";
                    }
                    
                    if (Edge.isPx(oN.rect[1])) {
                        oN.transform[0][1] = Edge.getPxValue(oN.rect[1]);
                        htTop[sId] = oN.transform[0][1];
                        oN.rect[1] = "0px";
                    }
                }
            }
                
            if (oN.children) {
                Edge.mapContentToTranslate(oN.children, htManagedIDs, htHasPxAni, htLeft, htTop);
            }
            else if(oN.c) {
                Edge.mapContentToTranslate(oN.c, htManagedIDs, htHasPxAni, htLeft, htTop);
            }
        }
    };
    
    Edge.isPx = function(val) {
        if (val && typeof(val) === "string" && (val.indexOf("%") > 0 || val.indexOf("em") > 0 || val === "auto" || val === "null")) {
            return false;
        }
        return true;
    };
    
    Edge.mapSymToTranslate = function(sym) {
        var sStateName,
            oState,
            sActorName,
            aKeyframes,
            aNewKeyframes,
            i,
            sNewPropName,
            aKF,
            sTimelineName,
            oTimeline,
            aTimeline,
            oTween,
            htLeft = {},
            htTop = {},
            bHasLeft,
            bHasTop,
            bHasTxfm,
            htManagedIDs = {},
            htHasPxAni = {};
        
        
        //timelines
        if ( sym.timelines ) {
            for ( sTimelineName in sym.timelines ) {
                if ( sym.timelines.hasOwnProperty( sTimelineName ) ) {
                    oTimeline = sym.timelines[sTimelineName];                
                    aTimeline = oTimeline.timeline;
                    if ( aTimeline ) {
                        for ( i = 0; i < aTimeline.length; i++ ) {
                            oTween = aTimeline[i].tween;
                            if (!oTween || (oTween[2] != "left" && oTween[2] != "top") || !Edge.isPx(oTween[3])) {
                                continue;
                            }
                            htHasPxAni[oTween[1]] = true;
                        }
                    }
                }
            }
        }
        
        if (sym.content && sym.content.dom) {
            Edge.mapContentToTranslate(sym.content.dom, htManagedIDs, htHasPxAni, htLeft, htTop);
        }
            
        for (sStateName in sym.states) {
            if (sym.states.hasOwnProperty(sStateName)) {
                oState = sym.states[sStateName];
                
                for (sActorName in oState) {
                    if (oState.hasOwnProperty(sActorName) && htManagedIDs[sActorName]) {
                        aKeyframes = oState[sActorName];
                        
                        aNewKeyframes = [];
                        
                        bHasTxfm = false;
                        bHasLeft = false;
                        bHasTop = false;
                        for (i=0;i<aKeyframes.length;i++) {
                            aKF = aKeyframes[i];
                            if ((aKF[1] === "left" || aKF[1] === "top") && Edge.isPx(aKF[2])) {
                                bHasTxfm = true;
                                if (aKeyframes[i][1] === "left") {
                                    sNewPropName = "translateX";
                                    bHasLeft = true;
                                }
                                if (aKeyframes[i][1] === "top") {
                                    sNewPropName = "translateY";
                                    bHasTop = true;
                                }
                                aKF = [];
                                aKF[0] = "transform";
                                aKF[1] = sNewPropName;
                                aKF[2] = Edge.getPxValue(aKeyframes[i][2]) + "px";
                                aNewKeyframes[aNewKeyframes.length] = aKF;
                            }
                            else {
                                if (aKF[0] === "transform") {
                                    bHasTxfm = true;
                                }
                                aNewKeyframes[aNewKeyframes.length] = aKeyframes[i];
                            }
                        }
                        
                        if (bHasTxfm) {
                            if (!bHasLeft && htLeft[sActorName]) {
                                aNewKeyframes[aNewKeyframes.length] = ["transform", "translateX", Edge.getPxValue(htLeft[sActorName]) + "px"];
                            }
                            if (!bHasTop && htTop[sActorName]) {
                                aNewKeyframes[aNewKeyframes.length] = ["transform", "translateY",  Edge.getPxValue(htTop[sActorName]) + "px"];
                            }
                        }
                        
                        oState[sActorName] = aNewKeyframes;
                    }
                }
            }
        }
        
        //timelines
        if ( sym.timelines ) {
            for ( sTimelineName in sym.timelines ) {
                if ( sym.timelines.hasOwnProperty( sTimelineName ) ) {
                    oTimeline = sym.timelines[sTimelineName];                
                    aTimeline = oTimeline.timeline;
                    if ( aTimeline ) {
                        for ( i = 0; i < aTimeline.length; i++ ) {
                            oTween = aTimeline[i].tween;
                            if (!oTween || (oTween[2] != "left" && oTween[2] != "top") || !Edge.isPx(oTween[3])) {
                                continue;
                            }
                            if (!htManagedIDs[oTween[1]]) {
                                continue;
                            }
                            
                            if (oTween[2] === "left") {
                                sNewPropName = "translateX";
                            }
                            else if (oTween[2] === "top") {
                                sNewPropName = "translateY";
                            }
                            
                            oTween[0] = "transform";
                            oTween[2] = sNewPropName;
                        }        
                    }
                }
            }
        }
    };
    
    Edge.mapToTranslate = function (symbolData) {
        var sym;
        if (!window.edge_authoring_mode) {
            for ( symName in symbolData ) {
                if ( symbolData.hasOwnProperty( symName ) ) {
                    Edge.mapSymToTranslate(symbolData[symName]);
                }
            }
        }
    };
    
    /*
    An Edge composition definition is the set of Symbol definitions for a composition.
    You can have multiple Composition instances for each CompositionDefn
    */
    Edge.registerCompositionDefn = function( compId, symbolData, fonts, resources ) {
        if (window.edge_authoring_mode && window.edge_symbol_import_mode && window.edge_comp_id) {
            Edge.importSymbolDefinitions(window.edge_comp_id, symbolData, fonts, resources);
            return;
        }
        if ( compId && compId.length > 0 && !Edge.compositionDefns[compId] ) {
            // Overwriting not permitted - since there are APIs that alter the definition, this could lead to nasty
            // bugs if somebody includes a js file twice.
            
            Edge.compositionDefns[compId] = {symbolData:symbolData, resources: resources, readyToLaunch: false};
            Edge.registerSymbolDefns(compId, symbolData);

            Edge.mapToTranslate(symbolData);
            
            Edge.compositionFonts[compId] = fonts;
            Edge.registerFonts( fonts );
        }
    };

    function getCompositionSymbolDefns( compId ) {
        return Edge.compositionDefns[compId].symbolData;
    }

    Edge.getCompositionSymbolDefns = getCompositionSymbolDefns;

    function getCompositionResources( compId ) {
        return Edge.compositionDefns[compId].resources;
    }

    Edge.getCompositionResources = getCompositionResources;

    Edge.getComposition = function( compId ) {
        if ( !compId ) {
            return;
        }
        return Edge.compositions[compId];
    };

    Edge.registerCompositionReadyHandler = function( compId, fn, opts ) {
        opts = opts || {};
        if ( window.edge_authoring_mode && !(opts._tool || window.edge_remote_authoring) ) {
            return;
        }
        if ( !compId || !fn ) {
            return;
        }
        if ( Edge.compositions[compId] ) {
            Edge.compositions.ready( fn );
        }
        else {
            Edge.compositionReadyHandler[compId] = Edge.compositionReadyHandler[compId] || [];
            var handlers = Edge.compositionReadyHandler[compId];
            handlers.push( fn );
        }
    };

    // Composition private methods - use "call(this, ...)" to call these
    // By making them functions rather than properties on prototype Closure compiler can minify the names
    _createSymbolChild = function(symbolName, parentSelector, index, variables) {
        if ( !symbolName || !parentSelector ) {
            return;
        }
        if ( !this.symbolInstances || !this.symbolDefns[symbolName] ) {
            return;
        }
        var createdSymbolInstances = [];
        var $parentSelector = $( parentSelector );
        var comp = this;
        $parentSelector.each( function() {
            var $this = $( this );
            var newEle = document.createElement( 'div' );
            if ( (index || index === 0) && $this.children().eq( index )[0] ) {
                var $children = $this.children();
                if ( index < 0 ) {
                    $children.eq( index ).after( newEle );
                }
                else {
                    $children.eq( index ).before( newEle );
                }
            }
            else {
                $this.append( newEle );
            }
            // Disabled as input to control autoPlay at instance level
            var autoPlayTimelines;

            var opts = {}, autoPlay;
            if ( autoPlayTimelines && typeof autoPlayTimelines === 'object' ) {
                opts.autoPlay = autoPlayTimelines;
            }
            else if ( typeof autoPlayTimelines === 'string' ) {
                if ( autoPlayTimelines === "false" ) {
                    autoPlay = false;
                }
                else if ( autoPlayTimelines === "true" ) {
                    autoPlay = true;
                }
            }
            else {
                autoPlay = autoPlayTimelines;
            }
            opts.variables = variables;
            var symbInstance = comp.convertElementToSymbol( newEle, symbolName, opts );
            if ( symbInstance ) {
                if ( typeof autoPlay === 'boolean' ) {
                    symbInstance.setAutoPlay( autoPlay );
                }

                //go through and display any of the items that are supposed to be displayed
                comp.instanceReady( symbInstance );

                createdSymbolInstances.push( symbInstance );
            }
        } );

        if ( this.readyCalled ) {
            for ( var i = 0; i < createdSymbolInstances.length; i++ ) {
                createdSymbolInstances[i]._playAuto( true );
            }
        }
        return createdSymbolInstances;
    };
    
    var addIdsToTimelines;
    /*
     An Edge.Composition object is a composition, or to put it another way, a self-contained animation. You can have multiple Edge
     objects in a page. Each has its own set of Symbol definitions, instances, and is attached to a node (the stage)
     in the DOM. You can have multiple Composition instances for each CompositionDefn
     */
    var Composition = Edge.Composition = function( compId, attachments, opts ) {
        opts = opts || {};
        //no-op when running inside a tool, unless called by the tool or on a remote
        if ( window.edge_authoring_mode && !(opts._tool || window.edge_remote_authoring) ) {
            return;
        }
        Edge.Notifier.call( this );
        $.extend( this, Edge.Composition.config );
        $.extend( this, opts );

        /*jshint undef:false */
        var className = "." + compId,
                $ele,
                bHasSymbolsWithAttachments = false,
                i = 0,
                symbolName, symbolInstance,
                comp = this,
                readyHandlers = Edge.compositionReadyHandler[compId],
                resources = Edge.compositionDefns[compId].resources;
                symbolData = this.symbolDefns = getCompositionSymbolDefns( compId );
        this.compId = compId;

        var evt = this._createEvent();
        this.notifyObservers( "onPreCompInit", evt );
        var postEvt = this._createEvent();
        if ( !evt.performDefaultAction ) {
            this.notifyObservers( "onPostCompInit", postEvt );
            return;
        }

        this.symbolInstances = [];
        this.imageRequestCount = 0;
        this.imageRequestList = [];
        this.readyList = [];
        this.readyCalled = false; // refers to our $.ready handler, not our ready fn
        this.$loadCalled = window.AdobeEdge.loaded;
        Edge.compositions[compId] = this; // We only support one comp for each defn at this time
        this.compReadyCalled = false;

        if (resources) {
            for (i=0; i<resources.length; i++) {
                this.requestImage(resources[i]);
            }
        }


        addIdsToTimelines( symbolDefns );   // make sure every tl object has a unique id

        for ( symbolName in attachments ) {
            if ( attachments.hasOwnProperty( symbolName ) ) {
                $ele = $( attachments[symbolName] );
                if ( $ele.size() > 0 ) {
                    bHasSymbolsWithAttachments = true;
                    break;
                }
            }
        }

        if ( !bHasSymbolsWithAttachments ) {
            var oBody = $( 'body' );
            $( oBody ).addClass( compId );
        }

        for ( symbolName in attachments ) {
            if ( attachments.hasOwnProperty( symbolName ) ) {
            $ele = $( attachments[symbolName] );
            /*jshint loopfunc: true */
            $ele.each( function() {
                symbolInstance = comp.convertElementToSymbol( this, symbolName );
            } );
        }
        }

        if ( window.AdobeEdge.loaded ) {
            if ( comp.imageRequestCount <= 0 ) {
                comp.callReadyList();
            }
        }
        else {
            $( window ).load( function() {
                comp.$loadCalled = true;
                if ( comp.imageRequestCount <= 0 ) {
                    comp.callReadyList();
                }
            } );
        }
        if ( readyHandlers ) {
            for ( i = 0; i < readyHandlers.length; i++ ) {
                this.ready( readyHandlers[i] );
            }
        }
        this.notifyObservers( "onPostCompInit", postEvt );

    };

    Edge.Composition.config = Edge.Composition.config || {};

    $.extend( Composition.prototype, Edge.Notifier.prototype, {
        // Public (published) API
        play: function( _tool ) {

            //no-op when running inside a tool, unless called by the tool
            if ( window.edge_authoring_mode && !_tool ) {
                return;
            }

            if ( typeof Edge.autoPlay === 'undefined' || Edge.autoPlay ) {
                var cnt = this.symbolInstances.length;
                for ( var i = 0; i < cnt; i++ ) {
                    var sym = this.symbolInstances[i];
                    sym._playAuto();
                }
            }
        },
        getSymbols: function(symbolName) {
            if (!symbolName) {  
                return this.symbolInstances;
            }
            
            var instances = [];
            if ( !this.symbolInstances ) {
                return instances;
            }
            if ( this.symbolDefns.hasOwnProperty( symbolName ) ) {
                var cnt = this.symbolInstances.length;
                for ( var i = 0; i < cnt; i++ ) {
                    if ( this.symbolInstances[i].getSymbolTypeName() === symbolName ) {
                        instances.push( this.symbolInstances[i] );
                    }
                }
            }
            return instances;
        },
        ready: function( fn ) {
            if ( this.readyCalled ) {
                fn.call();
            }
            else {
                if ( this.readyList ) {
                    this.readyList.push( fn );
                }
            }
        },
        getCompId: function() {
            return this.compId;
        },
        // end public api

        requestImage : function( imageURL ) {
            if(isOpera()) {
                // Opera 12 has a bug that it doesn't call load handlers for svg imgs
                if(/\.svg$/.test(imageURL)){
                    return null;
                }
            }
            this.imageRequestCount++;
            var comp = this,
                img = new Image(),
                $img = $(img);
            
            this.imageRequestList.push( img );
            function handler() {
                $img.unbind("load");
            	$img.unbind("error");
            	for (var i=0; i<comp.imageRequestList.length; i++) {
            		if (comp.imageRequestList[i] === img) {
            			comp.imageRequestList.splice(i, 1);
            			break;
            		}
            	}
                comp.imageRequestCount--;
                if ( comp.imageRequestCount <= 0 && comp.$loadCalled ) {
                    setTimeout( function() {
                        comp.callReadyList();
                    }, 0 );
                }
            }
            
            $img.load( handler );
            $img.error( handler );
            img.src = imageURL;
            return null;
        },
        restoreDisplay:function( ele, bInner ) {
            var sym = this;
			
			if(!bInner) {
				$(".edgeLoad-" + sym.compId).each( function( i, eleChild ) {
					$( eleChild ).removeClass("edgeLoad-" + sym.compId);
					
					var dispOrig = $( eleChild ).data( 'dispOrig' );
					if(typeof dispOrig !== "undefined") {
						eleChild.style.display = dispOrig;
					}
				} );
			}
        },
        installEffectors:function($ele, inst, bInner) {
            
            var aE = inst.effectors;
            var sym = this;
            var ele = $ele[0] || $ele;
            
            if(!bInner && aE && aE["#" + ele.id]) {
                Edge.Effectors.attach(sym, ele, aE["#" + ele.id]);
            }
            $( ele ).children().each( function( i, eleChild ) {
                if(aE && aE["#" + eleChild.id]) {
                    Edge.Effectors.attach(sym, eleChild, aE["#" + eleChild.id]);
                }
                sym.installEffectors(eleChild, inst, true);
            } );
        },
        instanceReady:function( symInst ) {
            
            var stg = $( symInst.element );
            if ( stg ) {
                if(Edge.Effectors) {
                    this.installEffectors( stg, symInst );
                }
                this.restoreDisplay( stg );
            }
        },
        callReadyList: function() {
            if(this.readyCalled){
                return;
            }
            this.imageRequestList = [];
            this.readyCalled = true;

            // Let the preloader know we're ready to go
            if ( Edge.preloadComplete && Edge.preloadComplete[this.compId] ) {
                Edge.preloadComplete[this.compId]( [this.compId] );
            }

            for ( var i = 0; i < this.symbolInstances.length; i++ ) {
                _goToInitialState.call(this.symbolInstances[i]);
                this.instanceReady( this.symbolInstances[i] );
            }

            var evt;
            // Fire compositionReady before we do any readyHandlers, since
            // readyList includes autoplay
            if ( !this.compReadyCalled ) {
                this.compReadyCalled = true;
                evt = $.Event( "compositionReady" );
                evt.compId = this.getCompId();
                $( document ).trigger( evt );
            }


            while ( this.readyList.length > 0 ) {
                this.readyList.shift().call();
            }

            // 'loaded' is deprecated and not documented as of Preview 4
            evt = $.Event( "loaded" );
            evt.compId = this.getCompId();
            $( document ).trigger( evt );

        },
        getStage: function() {
            return Symbol.get( $( "." + this.getCompId() ) );
        },
        createSymbolChild: function( symbolName, parentSelector, index, variables ) {
            var aSymbols = _createSymbolChild.call(this, symbolName, parentSelector, index, variables);
            if (aSymbols && aSymbols.length > 0) {
                var parentSymbol = Symbol.get(parentSelector);
                if (!parentSymbol)
                    parentSymbol = Symbol.getParentSymbol(parentSelector);
                if (parentSymbol) {
                    for(var i=0;i< aSymbols.length;i++) {
                        _addChildSymbol.call(parentSymbol, aSymbols[i]);
                    }
                }   
            }
            return aSymbols;
        },
        convertElementToSymbol: function( sSelector, sSymName, opts ) {
            if ( !sSelector || !$( sSelector ) ) {
                return;
            }

            if ( !this.symbolInstances || !this.symbolDefns[sSymName] ) {
                return;
            }

            opts = opts || {};
            opts.regenerateID = opts.regenerateID || true;
            var symbInstance = new Symbol( $( sSelector ), { data: this.symbolDefns[sSymName], composition: this, opts: opts} );
            this.symbolInstances.push( symbInstance );

            return symbInstance;
        },
        removeSymbol: function( sSelector, opts ) {
            if ( !this.symbolInstances ) {
                return;
            }

            var symInstance = Symbol.get( sSelector );
            if ( symInstance ) {
                symInstance.deleteSymbol( opts );
            }
        },
        _createEvent: function( opts ) {
            var e = { composition: this, compId: this.compId, performDefaultAction: true };
            $.extend( e, opts );
            return e;
        }

    } );

    function launchComposition( compId ) {
        var comp;
        var defn = Edge.compositionDefns[compId];
    
        if ( defn && !(defn.launched) && defn.okToLaunch && defn.launchCalled ) {
            defn.launched = true;

            if ( !window.edge_authoring_mode || window.edge_remote_authoring ) {
                if ( !window.edge_remote_authoring ) {
                    comp = new Edge.Composition( compId, {stage: "." + compId}, {} );
                } else {
                    //Edge.autoPlay = false;
                    comp = new Edge.Composition( compId, {stage: "." + compId}, {} );
                    window.BYOD.initialize();
                }

                // Some versions of Webkit browsers have  bugs where one element
                // which has no transform does not respond correctly if it has a sib that is transformed
                // Known properties are:
                // clip in Safari 534 and Chrome 535
                // cursor in Safari 534
                var isWebkit = ( 'webkitAppearance' in document.documentElement.style );
                if ( isWebkit && !comp.getStage().stageIsBody) {
                    var doc = document;
                    var styleEle = doc.createElement( 'style' );
                    var head = $( "head" )[0];
                    if ( head ) {
                        head.insertBefore( styleEle, head.firstChild ); // doc.styleSheets.length - 1
                        var sel = "." + compId + ", ." + compId + " *";
                        if ( typeof doc.styleSheets[0] !== "undefined" ) {
                            doc.styleSheets[0].insertRule( sel + "{-webkit-transform:translateX(0px);}", 0 );
                        }
                    }
                }

                /** * Adobe Edge Timeline Launch */
                comp.ready( function() {
                    if ( !window.edge_authoring_mode || window.edge_remote_authoring ) {
                        comp.play();
                    }
                } );
            }
            else {

            }

            /* comp = new Edge.Composition(compId, {stage: "." + compId}, {});
             comp.ready(function() {
             comp.play();
             });*/
        }
    }

    Edge.launchComposition = function( compId ) {
        var defn = Edge.compositionDefns[compId];
        if ( defn ) {
            defn.launchCalled = true;
            launchComposition( compId );
        }
    };
    Edge.okToLaunchComposition = function( compId ) {
        var defn = Edge.compositionDefns[compId];
        if ( defn ) {
            defn.okToLaunch = true;
            launchComposition( compId );
        }
    };

    addIdsToTimelines = function( symbolDefns ) {
        for ( var symbolName in symbolDefns ) {
            if ( symbolDefns.hasOwnProperty( symbolName ) ) {
                if ( symbolDefns[symbolName].timelines ) {
                    for ( var tlName in symbolDefns[symbolName].timelines ) {
                        if ( symbolDefns[symbolName].timelines.hasOwnProperty( tlName ) ) {
                            var tl = symbolDefns[symbolName].timelines[tlName].timeline;
                            var cnt = tl.length;
                            for ( var i = 0; i < cnt; i++ ) {
                                var obj = tl[i];
                                if ( !obj.id ) {
                                    obj.id = makeUniqueID();
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    Edge.play = function( _tool ) {

        //no-op when running inside a tool, unless called by the tool
        if ( window.edge_authoring_mode && !_tool ) {
            return;
        }

        if ( typeof Edge.autoPlay === 'undefined' || Edge.autoPlay ) {
            var cnt = this.symbolInstances.length;
            for ( var i = 0; i < cnt; i++ ) {
                var sym = symbolInstances[i];
                var autoPlay = sym.options.data.autoPlay;
                if ( typeof autoPlay === "string" && autoPlay !== "true" ) {
                    sym.play( autoPlay );
                } else if ( typeof autoPlay === "undefined" || autoPlay === true || autoPlay === "true" ) {
                    sym.play( "Default Timeline" ); // Play default for now until tool is updated to populate autoPlay
                }
            }
        }
    };

// Logging to external logger
    /**
     * Log a debug message to an external logger app. Only functional in authoring environment
     * @param msg Message to log
     */
    Edge.logDebug = function( msg ) {
    };
    /**
     * Log an info message to an external logger app. Only functional in authoring environment
     * @param msg Message to log
     */
    Edge.logInfo = function( msg ) {
    };
    /**
     * Log a warning message to an external logger app. Only functional in authoring environment
     * @param msg Message to log
     */
    Edge.logWarn = function( msg ) {
    };
    /**
     * Log an error message to an external logger app. Only functional in authoring environment
     * @param msg Message to log
     */
    Edge.logError = function( msg ) {
    };
    /**
     * Log a fatal error message to an external logger app. Only functional in authoring environment
     * @param msg Message to log
     */
    Edge.logFatal = function( msg ) {
    };

})( jQuery, AdobeEdge );

// Filename: edge.touch.js
/*
* http://jquerymobile.com
*
* Copyright 2010, 2013 jQuery Foundation, Inc. and other contributors
* Released under the MIT license.
* http://jquery.org/license
*
*/

(function( $, window, undefined ) {
	// add new event shortcuts
	$.each( ( "touchstart touchmove touchend " +
		"swipe swipeleft swiperight " ).split( " " ), function( i, name ) {

		$.fn[ name ] = function( fn ) {
			return fn ? this.bind( name, fn ) : this.trigger( name );
		};

		// jQuery < 1.8
		if ( $.attrFn ) {
			$.attrFn[ name ] = true;
		}
	});

	var supportTouch = "ontouchend" in document; // $.mobile.support.touch,
        msTouch = !supportTouch && window.navigator.msPointerEnabled;
		touchStartEvent = supportTouch ? "touchstart" : "mousedown",
		touchStopEvent = supportTouch ? "touchend" : "mouseup",
		touchMoveEvent = supportTouch ? "touchmove" : "mousemove";

	function triggerCustomEvent( obj, eventType, event ) {
		var originalType = event.type;
		event.type = eventType;
		$.event.handle.call( obj, event );
		event.type = originalType;
	}

	// also handles swipeleft, swiperight
	$.event.special.swipe = {
		scrollSupressionThreshold: 30, // More than this horizontal displacement, and we will suppress scrolling.

		durationThreshold: 1000, // More time than this, and it isn't a swipe.

		horizontalDistanceThreshold: 30,  // Swipe horizontal displacement must be more than this.

		verticalDistanceThreshold: 75,  // Swipe vertical displacement must be less than this.

		setup: function() {
			var thisObject = this,
				$this = $( thisObject );

            if(msTouch) {
                $this.css("-ms-touch-action", "pan-y pinch-zoom double-tap-zoom");
            }
			$this.bind( touchStartEvent, function( event ) {
				var data = event.originalEvent.touches ?
						event.originalEvent.touches[ 0 ] : event,
					start = {
						time: ( new Date() ).getTime(),
						coords: [ data.pageX, data.pageY ],
						origin: $( event.target )
					},
					stop;

				function moveHandler( event ) {

					if ( !start ) {
						return;
					}

					var data = event.originalEvent.touches ?
						event.originalEvent.touches[ 0 ] : event;

					stop = {
						time: ( new Date() ).getTime(),
						coords: [ data.pageX, data.pageY ]
					};

					// prevent scrolling
					if ( Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.swipe.scrollSupressionThreshold ) {
						event.preventDefault();
					}
				}

				$this.bind( touchMoveEvent, moveHandler )
					.one( touchStopEvent, function( event ) {
						$this.unbind( touchMoveEvent, moveHandler );

						if ( start && stop ) {
							if ( stop.time - start.time < $.event.special.swipe.durationThreshold &&
								Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.swipe.horizontalDistanceThreshold &&
								Math.abs( start.coords[ 1 ] - stop.coords[ 1 ] ) < $.event.special.swipe.verticalDistanceThreshold ) {

								$this.trigger( "swipe" )
									.trigger( start.coords[0] > stop.coords[ 0 ] ? "swipeleft" : "swiperight" );
							}
						}
						start = stop = undefined;
					});
			});
		}
	};
	$.each({
		swipeleft: "swipe",
		swiperight: "swipe"
	}, function( event, sourceEvent ) {

		$.event.special[ event ] = {
			setup: function() {
				$( this ).bind( sourceEvent, $.noop );
			}
		};
	});

})( jQuery, this );

// Filename: edge.declare.js

(function ($, Edge) {
    
    "use strict";

    if (typeof Edge.DeclareMarkup !== "undefined") {
        return;
    }

    var DeclareMarkup = function () {

        // Predeclarations
        var normalizeDomNode, substituteVariables, bindContentPropertyVariable;
        var Stage;
        var Shape;

        var PropertyTween = Edge.PropertyTween;
        var TransformTween = Edge.TransformTween;
        var splitUnits = TransformTween.splitUnits;
        var getNumber = TransformTween.getNumber;
        var longShortNames = [
            ["children", "c"],
            ["rect", "r"],
            ["sizeRange", "sr"],
            ["borderRadius", "br"],
            ["clip", "cl"],
            ["alt", "al"],
            ["title", "tt"],
            ["tabindex", "ti"],
            ["controls", "cn"],
            ["source", "sr"],
            ["cursor", "cu"],
            ["autoplay", "ap"],
            ["loop", "lp"],
            ["font", "n"],
            ["transform", "tf"],
            ["boxShadow", "sh"],
            ["textShadow", "ts"],
            ["opacity", "o"],
            ["userClass", "uc"],
            ["stroke", "s"],
            ["fill", "f"],
            ["display", "v"],
            ["filter", "fi"]
        ];
        substituteVariables = function ( str, variables ) {
            var val = str;
            if ( str && variables ) {
                val = PropertyTween.substituteVariables( str, variables );
                if ( typeof val === "undefined" ) {
                    val = str;
                }
            }
            return val;
        };

        function setElementStyle( ele, styleName, value ) {
            if ( $( ele ).get( 0 ) ) {
                $( ele ).css( styleName, value );
            }
        }

        function setElementAttr( ele, attrName, value ) {
            if ( $( ele ).get( 0 ) ) {
                $( ele ).attr( attrName, value );
            }
        }

        bindContentPropertyVariable = function(variables, varName, eleNode, propName, actionFunc, valueFunc) {
            var value = substituteVariables(varName, variables);

            var _setProp = function(sym, e, varValue) {
                if (valueFunc)
                    varValue = valueFunc(varValue);
                actionFunc(eleNode, propName, varValue);
            };

            if (value && value != varName && !window.edge_authoring_mode) {
                if (!DeclareMarkup.nodeVariableBindings[varName])
                    DeclareMarkup.nodeVariableBindings[varName] = [];

                DeclareMarkup.nodeVariableBindings[varName].push(
                        {ele: eleNode, action:_setProp} );
            }

            _setProp(null, null, value);
            return value;
        };

        function formatUnits(value) {
            var oValue;
            if (value == "auto") {
                return value;
            }
            if (typeof value === "string") {
                oValue = splitUnits(value);
            }
            if (!oValue || !oValue.units) {
                value = value + "px";
            }
            return value;
        }
        
        function trackSVG($eleNew, url, eleParent, counterScale) {
            
            var sURL = url.toLowerCase(),
                $parent;
            if(sURL.match("\.svg$") || sURL.match("\.svg?")) {
                
                $eleNew.addClass("eg-svg-image");
                if (counterScale) {
                    $eleNew.addClass("eg-counter-scale");
                }

                while (eleParent) {
                    $parent = $(eleParent);
                    if (!$parent.hasClass("eg-svg-holder")) {
                        $parent.addClass("eg-svg-holder");
                    }
                    eleParent = eleParent.parentNode;
                }
            }
        }
        
        function _setIfNotNull($ele, prop, val, negOk) {
            if(val || (negOk && val === 0)) {
                var valNum = getNumber(val);    
                if (negOk || valNum > 0 || val === "auto") {
                    $ele.css(prop, formatUnits(val));
                }
            }
        }
        
        function doCreateElement(sType, sId, oN, eleParent, iIndex, comp, variables) {

            var eleNew = document.getElementById(sId);
            var bCreated = false;
            if(!eleNew) {
                bCreated = true;
                eleNew = document.createElement(sType);
            }
            eleNew.id = sId;
            eleNew.style.position="absolute";
            var $eleNew = $(eleNew);
            
            //stash the dom definition on the element
            $eleNew.data("domDef", oN);
            
            $eleNew.addClass(sId + "_id");
            
            if(bCreated) {
                
                if(oN.display) {
                    eleNew.style.display = oN.display;
                }
                
                if(!window.edge_authoring_mode) {
                    $eleNew.data("dispOrig", eleNew.style.display);
                    eleNew.style.display = 'none';
                    $eleNew.addClass("edgeLoad-" + comp.compId);
                }
            }
            
            if (oN.className) {
                $eleNew.addClass(oN.className);
            }
            
            //force zero margin
            $eleNew.css("margin", "0px");

            var valNum = 0;
            //rect == [left, top, width, height, right, bottom]
            var oN_rect = oN.rect;
            _setIfNotNull($eleNew, "left", oN_rect[0], true);
            _setIfNotNull($eleNew, "top", oN_rect[1], true);
            _setIfNotNull($eleNew, "width", oN_rect[2]);
            _setIfNotNull($eleNew, "height", oN_rect[3]);
            _setIfNotNull($eleNew, "right", oN_rect[4], true);
            _setIfNotNull($eleNew, "bottom", oN_rect[5], true);

            var u_x = "px", u_y = "px", p_x = "left", p_y = "top";
            if (oN_rect[0] == "auto") {
                u_x = (splitUnits(oN_rect[4])).units || u_x;
                p_x = "right";
            } else {
                u_x = (splitUnits(oN_rect[0])).units || u_x;
            }
            if (oN_rect[1] == "auto") {
                u_y = (splitUnits(oN_rect[5])).units || u_y;
                p_y = "bottom";
            } else {
                u_y = (splitUnits(oN_rect[1])).units || u_y;
            }
            $eleNew.data("u_x", u_x);
            $eleNew.data("u_y", u_y);
            $eleNew.data("p_x", p_x);
            $eleNew.data("p_y", p_y);

            //sizeRange=["min-width", "max-width", "min-height", "max-height"]
            if (oN.sizeRange) {
                _setIfNotNull($eleNew, "min-width", oN.sizeRange[0]);
                _setIfNotNull($eleNew, "max-width", oN.sizeRange[1]);
                _setIfNotNull($eleNew, "min-height", oN.sizeRange[2]);
                _setIfNotNull($eleNew, "max-height", oN.sizeRange[3]);
            }
            if(oN.overflow) {
                $eleNew.css("overflow", oN.overflow);
                if(oN.overflow == "hidden" || oN.overflow == "scroll") {
                    $eleNew.css("text-overflow", "clip");
                }
            }
            
            if(oN.autoOrient) {
                $.data($eleNew[0], "doAutoOrient", "true");
            }
            
            //clip (cl)
            if(oN.cl) {
                if(oN.cl.length == 1) {
                    $eleNew.css("clip", oN.cl[0]);
                }
                else {
                     $eleNew.css("clip", "rect(" + oN.cl[0] + "px " + oN.cl[1] + "px" + oN.cl[2] + "px " + oN.cl[3] + ")");
                }
            }
            
            //controls (cn)
            if(oN.cn) {
                $eleNew.attr("controls", oN.cn);
            }
            
            //alt (al)
            if(oN.al) {
                $eleNew.attr("alt", oN.al);
            }
            
            //title (tt)
            if(oN.tt) {
                $eleNew.attr("title", oN.tt);
            }
            
            //tabindex (ti)
            if(oN.ti) {
                $eleNew.attr("tabindex", oN.ti);
            }
            
            //autoplay (ap)
            if(oN.ap) {
                $eleNew.attr("autoplay", oN.ap);
            }
            
            //loop (lp)
            if(oN.lp) {
                $eleNew.attr("loop", oN.lp);
            }
            
            //source (sr)
            if(oN.sr) {
                if(oN.sr.length == 1) {
                    $eleNew.attr("src", oN.sr[0]);
                }
                else {
                    for(var iS=0;iS<oN.sr.length;iS++) {
                        var eleSrc = document.createElement("source");
                        $(eleSrc).attr("src",oN.sr[iS]);
                        eleNew.appendChild(eleSrc);
                    }
                }
            }
            
            //cursor (cu)
            if(oN.cu) {
                $eleNew.css("cursor", oN.cu);
            }
            
            // User defined class
            if(oN.uc) {
                $eleNew.addClass(oN.uc);
            }

            //borderRadius (br) = [ topLeft, topRight, bottomRight, bottomLeft ]  (pass strings like "3px 4px")
            if(oN.br) {
                if(oN.br.length == 1) {
                    $eleNew.css("border-radius", formatUnits(oN.br[0]));
                }
                else {
                    //then we have an array of 4 value pairs
                    $eleNew.css("border-top-left-radius", oN.br[0]);
                    $eleNew.css("border-top-right-radius", oN.br[1]);
                    $eleNew.css("border-bottom-right-radius", oN.br[2]);
                    $eleNew.css("border-bottom-left-radius", oN.br[3]);
                }
            }


            //text, align, font are handled elsewhere (for text only)
            //shape is handled elsewhere (for shape only)
            //transform (tf) = [ [translateX, translateY, translateZ], [rotateZ, rotateX, rotateY], [skewX, skewY], [scaleX, scaleY, scaleZ], [originX, originY] ]
            if(oN.tf) {
                
                var tf = [];
                //map of sub-arrays and their default values
                var aMap=[[3,0],[3,0],[2,0],[3,1],[2,'50%']];
                for(var iM=0;iM<aMap.length;iM++) {
                    tf[iM]=[];
                    if(!oN.tf[iM]) oN.tf[iM] = [];
                    for(var iV=0;iV<aMap[iM][0];iV++) {
                        if(!oN.tf[iM][iV]) oN.tf[iM][iV] = aMap[iM][1];
                        tf[iM][iV] = oN.tf[iM][iV];
                    }
                }

                //set the origin
                var val;
                if(typeof(tf[4][0]) == "string") {
                    val = tf[4][0] + " " + tf[4][1];
                }
                else {
                    val = tf[4][0] + "px " + tf[4][1] + "px";
                }
                $eleNew.css("-webkit-transform-origin", val);
                $eleNew.css("-moz-transform-origin", val);
                $eleNew.css("-ms-transform-origin", val);
                $eleNew.css("-o-transform-origin", val);
                $eleNew.css("transform-origin", val);

                if ( 'webkitAppearance' in document.documentElement.style ) {
                    var transforms = "";
                    if ( tf[0][2] != 0 ) {
                        transforms += "translate3d(" + formatUnits(tf[0][0]) + "," + formatUnits(tf[0][1]) + "," + formatUnits(tf[0][2]) + ")";
                    }
                    else {
                        transforms += "translate(" + formatUnits(tf[0][0]) + "," + formatUnits(tf[0][1]) + ")";
                    }
                    if ( tf[1][1] != 0 || tf[1][2] != 0 ) {
                        transforms += " rotateZ(" + tf[1][0] + "deg)";
                        transforms += " rotateX(" + tf[1][0] + "deg)";
                        transforms += " rotateY(" + tf[1][0] + "deg)";
                    }
                    else {
                        transforms += " rotate(" + tf[1][0] + "deg)";
                    }
                    transforms += " skewX(" + tf[2][0] + "deg skewY(" + tf[2][1] + "deg)";
                    if ( tf[3][2] != 1 ) {
                        transforms += " scale3d(" + tf[3][0] + "," + tf[3][1] + "," + tf[3][2] + ")";
                    }
                    else {
                        transforms += " scale(" + tf[3][0] + "," + tf[3][1] + ")";
                    }

                    $( eleNew ).css( "-webkit-transform", transforms );
                }
                else {
                    val = "translate(" + formatUnits(tf[0][0]) + "," + formatUnits(tf[0][1]) + ") rotate(" + tf[1][0] + "deg)  skewX(" + tf[2][0] + "deg) skewY(" + tf[2][1] + "deg) scale(" + tf[3][0] + "," + oN.tf[3][1] + ")";
                    $eleNew.css("-moz-transform", val);
                    $eleNew.css("-ms-transform", val);
                    $eleNew.css("-o-transform", val);
                    $eleNew.css("transform", val);
                }
            }

            //boxShadow (sh)
            if(oN.boxShadow) {
                var oN_boxShadow = oN.boxShadow;
                var val = oN_boxShadow[0] + " " + oN_boxShadow[1] + "px " + oN_boxShadow[2] + "px " + oN_boxShadow[3] + "px " + oN_boxShadow[4] + "px " + oN_boxShadow[5];
                $eleNew.css("-webkit-box-shadow", val);
                $eleNew.css("-moz-box-shadow", val);
                $eleNew.css("box-shadow", val);
            }

            //textShadow (ts)
            if(oN.textShadow) {
                var oN_textShadow = oN.textShadow;
                var val = oN_textShadow[0] + " " + oN_textShadow[1] + "px " + oN_textShadow[2] + "px " + oN_textShadow[3] + "px ";
                $eleNew.css("text-shadow", val);
            }

            //filter (fi)
              //filter (fi) = ["filter.invert", "filter.hue-rotate", "filter.contrast", "filter.saturate", "filter.brightness", "filter.sepia", "filter.grayscale", "filter.blur", "filter.drop-shadow.color", "filter.drop-shadow.offsetH", "filter.drop-shadow.offsetV", "filter.drop-shadow.blur"]
           if(oN.filter) {
                var oN_filter = oN.filter;
                var val = "";
                if (oN_filter[0] !== 0) {
                    val += "invert(" + oN_filter[0] + ") ";
                }
                if (oN_filter[1] !== 0) {
                    val += "hue-rotate(" + oN_filter[1] + "deg) ";
                }
                if (oN_filter[2] !== 1) {
                    val += "contrast(" + oN_filter[2] + ") ";
                }
                if (oN_filter[3] !== 1) {
                    val += "saturate(" + oN_filter[3] + ") ";
                }
                if (oN_filter[4] !== 0) {
                    val += "brightness(" + oN_filter[4] + ") ";
                }
                if (oN_filter[5] !== 0) {
                    val += "sepia(" + oN_filter[5] + ") ";
                }
                if (oN_filter[6] !== 0) {
                    val += "grayscale(" + oN_filter[6] + ") ";
                }
                if (oN_filter[7] !== 0) {
                    val += "blur(" + oN_filter[7] + "px) ";
                }

                var dsColor = Edge.Color.parseValue(oN_filter[8]);
                var colorDefault = true;
                for (var i=1;i<dsColor.length-1;i++) {
                    if (dsColor[i] !== 0) {
                        colorDefault = false;
                        break;
                    }
                }

                if (!colorDefault || oN_filter[9] !== 0 || oN_filter[10] !== 0 || oN_filter[11] !== 0) {
                    val += "drop-shadow(" + oN_filter[8] + " " + oN_filter[9] + "px " + oN_filter[10] + "px " + oN_filter[11] + "px)";
                }

                $eleNew.css("-webkit-filter", val);
                $eleNew.css("-moz-filter", val);
                $eleNew.css("filter", val);
            }

            //opacity (o)
            if(oN.opacity) {
                $eleNew.css("opacity", oN.opacity);
            }

            //stroke (s) = [thickness, color, style]
            if(oN.stroke) {
                var oN_stroke = oN.stroke;
                var strokeThickness = oN_stroke[0];
                if(!strokeThickness) strokeThickness = 0;
                var aStrokeColor = oN_stroke[1];
                if(!aStrokeColor)
                    aStrokeColor = ["rgba(0,0,0,0)"];
                else if(typeof(aStrokeColor) == "string")
                    aStrokeColor = [aStrokeColor];
                var strokeStyle = oN_stroke[2];
                if(!strokeStyle) strokeStyle = "none";

                $eleNew.css("border", "" + strokeThickness + "px " + strokeStyle + " " + Edge.colorToSupported(aStrokeColor[0]));
            }

            //fill (f) = [color, image, mask, repeatingImage]
            if(oN.fill) {
                var oN_fill = oN.fill;
                var fillColor = oN_fill[0];
                if(typeof(fillColor) == "string")
                    fillColor = [fillColor];

                var fillType = oN_fill[1];
                if(!fillType || $.isArray(fillType)) fillType = "solid";
                
                if(fillType == "solid") {
                    if(fillColor)
                        $eleNew.css("background-color", Edge.colorToSupported(fillColor[0]));
                }

                //image
                if(oN_fill[1]) {
                    if ($.isArray(oN_fill[1])) {
                        if ($.isArray(oN_fill[1][1])) {
                            
                            // linear-gradient = [angle, [colorstops], repeating (optional)]
                            var sValue = "linear-gradient(" + oN_fill[1][0];
                            var tValue = "linear-gradient(" + ((450 - oN_fill[1][0]) % 360);
                            var value = "deg,";
                            for (var i=0;i<(oN_fill[1][1].length);i++) {
                                var colorstop = oN_fill[1][1][i];
                                if ($.isArray(colorstop)) {
                                    value += Edge.colorToSupported(colorstop[0]);
                                    if (colorstop[1])
                                        value += " " + colorstop[1] + "%";
                                }
                                if (i < oN_fill[1][1].length - 1)
                                    value += ",";
                            }
                            value += ")";

                            if (oN_fill[1][2]) {
                                tValue = "repeating-" + tValue;
                                sValue = "repeating-" + sValue;
                            }
                            $eleNew.css("background-image", "-webkit-" + sValue + value);
                            $eleNew.css("background-image", "-moz-" + sValue + value);
                            $eleNew.css("background-image", "-ms-" + sValue + value);
                            $eleNew.css("background-image", "-o-" + sValue + value);
                            $eleNew.css("background-image", tValue + value);
                            Edge.forceGPU(eleNew);
                        }
                        else if (oN_fill[1][4] && $.isArray(oN_fill[1][4])) {
                            // radial-gradient = [positionX, positionY, ellipse boolean, extent, [colorstops], repeating (optional)]
                            var sValue = "radial-gradient(" + oN_fill[1][0] + "% " + oN_fill[1][1] + "%,";
                            sValue += oN_fill[1][2] ? "ellipse " : "circle ";
                            sValue += oN_fill[1][3] + ","; // extent
                            var tValue = "radial-gradient(";
                            tValue += oN_fill[1][3] + " "; // extent
                            tValue += oN_fill[1][2] ? " ellipse at " : " circle at ";
                            tValue += oN_fill[1][0] + "% " + oN_fill[1][1] + "%,";

                            var value = "";
                            for (var i=0;i<(oN_fill[1][4].length);i++) {
                                var colorstop = oN_fill[1][4][i];
                                if ($.isArray(colorstop)) {
                                    value += Edge.colorToSupported(colorstop[0]);
                                    if (colorstop[1])
                                        value += " " + colorstop[1] + "%";
                                }
                                if (i < oN_fill[1][4].length - 1)
                                    value += ",";
                            }
                            value += ")";

                            if (oN_fill[1][5])
                                sValue = "repeating-" + sValue;

                            $eleNew.css("background-image", "-webkit-" + sValue + value);
                            $eleNew.css("background-image", "-moz-" + sValue + value);
                            $eleNew.css("background-image", "-ms-" + sValue + value);
                            $eleNew.css("background-image", "-o-" + sValue + value);
                            $eleNew.css("background-image", tValue + value);
                            Edge.forceGPU(eleNew);
                        }
                    }
                    else {
                        //image source = [src, positionX (optional, defaults to 0), positionY (optional, defaults to 0), repeat (optional, defaults to false), attachment (optional, 'scroll' | 'fixed' defaults to 'scroll')]
                        var imgSource = oN_fill[1];
                        if(typeof(imgSource) == "string")
                            imgSource = [imgSource];
                        else if(typeof(imgSource) == "object") {
                            //lookup the image in the source table using the screen profile name
                            var img = imgSource[window.EdgeScreenProfile.name];
                            if(!img) img = imgSource["default"];
                            imgSource = img;
                        }

                        var imgSrc;
                        if(oN.tag && oN.tag == "img") {
                            if(imgSource[0]) {
                                imgSrc = bindContentPropertyVariable(variables, imgSource[0], eleNew, "src", setElementAttr);
                                comp.requestImage(imgSrc);
                            }
                        }
                        else {
                            if(imgSource[0]) {
                                $eleNew.css("background-size", "100% 100%");//try to avoid scaling images with transform scale
                                $eleNew.css("-webkit-background-size", "100% 100%");//try to avoid scaling images with transform scale
                                imgSrc = bindContentPropertyVariable(variables, imgSource[0], eleNew, "background-image", setElementStyle, function(value) {
                                    if (value) {
                                        value = value.replace("'", "\\'");
                                        
                                        trackSVG($eleNew, value, eleParent, oN.counterScale);
                                        return "url(" + value + ")";
                                    }
                                    else
                                        return value;
                                });
     
                                if(oN_fill[2] || oN_fill[3]) {
                                    var oValue, units = "px";
                                    if (oN_fill[2] && typeof oN_fill[2] == 'string') {
                                        oValue = splitUnits(oN_fill[2]);
                                    }
                                    else if(typeof oN_fill[3] == 'string') {
                                        oValue = splitUnits(oN_fill[3]);
                                    }
                                    if (oValue && oValue.units && oValue.units[0])
                                        units = oValue.units[0];
                                    if(!oN_fill[2]) oN_fill[2] = "0" + units;
                                    if(!oN_fill[3]) oN_fill[3] = "0" + units;
                                    $eleNew.css("background-position", formatUnits(oN_fill[2]) + " " + formatUnits(oN_fill[3]));
                                }
                                if(oN_fill[4] || oN_fill[5]) {
                                    var propValue = "";
                                    if (!oN_fill[4]) {
                                        oN_fill[4] = oN_fill[5];
                                    }
                                    if (typeof oN_fill[4] == 'string') {
                                        if (oN_fill[4] !== 'auto') {
                                            oN_fill[4] =  formatUnits(oN_fill[4]);
                                        }
                                        propValue = oN_fill[4];
                                    }
                                    if (typeof oN_fill[5] == 'string') {
                                        if (oN_fill[5] !== 'auto') {
                                            oN_fill[5] =  formatUnits(oN_fill[5]);
                                        }
                                        propValue = propValue + " " + oN_fill[5];
                                    }
                                    $eleNew.css("background-size", propValue);
                                }
                               comp.requestImage(imgSrc);
                            }
                             if(!oN_fill[6]) {
                                $eleNew.css("background-repeat", "no-repeat");
                            }
                            if(oN_fill[7] && oN_fill[7] != "scroll") {
                                $eleNew.css("background-attachment", oN_fill[7]);
                            }
                        }
                    }
                }
            }

            // Prevent highlighting in Webkit mobile
            $eleNew.css("-webkit-tap-highlight-color", "rgba(0, 0, 0, 0)");

            if(eleParent && bCreated) {

                if(!eleParent.appendChild) {
                    return eleNew;
                }

                if(eleParent.firstChild && iIndex >= 0 && eleParent.children && iIndex < eleParent.children.length) {
                    eleParent.insertBefore(eleNew, eleParent.children[iIndex]);
                }
                else {
                    eleParent.appendChild(eleNew);
                }
            }

            return eleNew;
        }

        function createElement(sId, oN, eleParent, variables, iIndex, comp, onCreateFn) {
            
            normalizeDomNode(oN, variables);

            var eleNew = null;
            
            var sTag = "div";
            if(oN.tag) sTag = oN.tag;
            
            switch(oN.t) {
                case 'def'://definition
                    break;
                case 'rect'://rect
                case 'ellipse'://ellipse
                case 'canvas'://ellipse
                case 'group':
                    eleNew = doCreateElement(sTag, sId, oN, eleParent, iIndex, comp, variables, onCreateFn);
                    break;
                case 'image'://image
                    eleNew = doCreateElement(sTag, sId, oN, eleParent, iIndex, comp, variables, onCreateFn);
                    break;
                case 'video':
                case 'audio':
                    eleNew = doCreateElement(sTag, sId, oN, eleParent, iIndex, comp, variables, onCreateFn);
                    DeclareMarkup.DOMMediaNodeCreated(eleNew);
                    break;
                case 'text':
                    eleNew = doCreateElement(sTag, sId, oN, eleParent, iIndex, comp, variables, onCreateFn);
                    var $eleNew = $(eleNew);
                    //add font styles
                    if(oN.font) {
                        var oN_font = oN.font;
                        if(oN_font[0] && oN_font[0] !== "") $eleNew.css("font-family", oN_font[0]);
                        if(typeof(oN_font[1]) != "object") oN_font[1] = [oN_font[1]];
                        if(!oN_font[1][1]) oN_font[1][1] = "px";
                        if(oN_font[1][0] && oN_font[1][0] !== "") $eleNew.css("font-size", oN_font[1][0] + oN_font[1][1]);
                        if(oN_font[2] && oN_font[2] !== "") $eleNew.css("color", Edge.colorToSupported(oN_font[2]));
                        if(oN_font[3] && oN_font[3] !== "") $eleNew.css("font-weight", oN_font[3]);
                        if(oN_font[4] && oN_font[4] !== "") $eleNew.css("text-decoration", oN_font[4]);
                        if(oN_font[5] && oN_font[5] !== "") $eleNew.css("font-style", oN_font[5]);
                    }
                    if(oN.align) {
                        $eleNew.css("text-align", oN.align);
                    }

                    //if it is not relative we don't clip properly when using scroll
                    if(oN.position) {
                        eleNew.style.position=oN.position;
                    }

                    if((!oN.rect[2] || oN.rect[2] <= 0) && (!oN.rect[3] || oN.rect[3] <= 0)) {
                        $eleNew.css("white-space", "nowrap");
                    }
                    
                    eleNew.appendChild(document.createTextNode(''));
                    bindContentPropertyVariable(variables, oN.text, eleNew, "text", function(ele, propName, value) {
                        if ($(ele).get(0)) {    
                            $(ele).html(value);
                        }
                    });

                    break;
                default:
                    break;
            }
            return eleNew;
        }

        function buildSceneGraphNode(sId, oN, oParent, eleParent, variables, iIndex, comp) {
            iIndex = iIndex || 0;
            var eleNew = createElement(sId, oN, eleParent, variables, iIndex, comp);
            if(eleNew) {
                if (DeclareMarkup.nodeSymbolInstanceLookup[sId])
                    DeclareMarkup.DOMNodeStarted(eleNew, eleParent, oN, 
                        DeclareMarkup.nodeSymbolInstanceLookup[sId].symbolName, 
                        DeclareMarkup.nodeSymbolInstanceLookup[sId].autoPlay,
                        DeclareMarkup.nodeSymbolInstanceLookup[sId].variables);
                else
                    DeclareMarkup.DOMNodeStarted(eleNew, eleParent, oN);
                if(oN.c) {
                    for(var iC=0;iC<oN.c.length;iC++) {
                        var oChild = oN.c[iC];
                        var sChildId = oChild.id;
                        buildSceneGraphNode(sChildId, oChild, oN, eleNew, variables, iC, comp);
                    }
                }
                DeclareMarkup.DOMNodeCompleted(eleNew);
            }
            return eleNew;
        }

        function renderDOM(dom, eleParent, variables, symbolName, symbolInstances, composition) {

            DeclareMarkup.nodeVariableBindings = {};

            var i;
            for(i=0;i<dom.length;i++) {
                normalizeDomNode(dom[i], variables);
            }

            DeclareMarkup.nodeSymbolInstanceLookup = {};
            if (symbolInstances) {
                for (i = 0; i < symbolInstances.length; i++) {
                    DeclareMarkup.nodeSymbolInstanceLookup[symbolInstances[i].id] = symbolInstances[i];
                }
            }

            for(i=0;i<dom.length;i++) {
                if(!dom[i]) continue;
                var eleNew = buildSceneGraphNode(dom[i].id, dom[i], null, null, variables, 0, composition);
                if(!eleNew) continue;

                //attach the node to the DOM after everything is built
                eleParent.appendChild(eleNew);
            }
            
            for (var varName in DeclareMarkup.nodeVariableBindings) {
                if ( DeclareMarkup.nodeVariableBindings.hasOwnProperty( varName ) ) {
                    var aBindings = DeclareMarkup.nodeVariableBindings[varName];
                    for (i=0; i<aBindings.length; i++) {
                        Edge.Symbol.bindVariableActionToSymbol(eleParent, varName, aBindings[i].action);
                    }
                }
            }
        }

        normalizeDomNode = function(oN, variables) {
            if(oN.type) oN.t = oN.type;
            if(oN.t) {
                oN.t = oN.t.toLowerCase();
            }
            oN.type = oN.t;
            if(oN.cs) {
                oN.className = oN.cs;
            }

            var i, len = longShortNames.length;
            for ( i = 0; i < len; i++) {
                if(oN[longShortNames[i][0]]){
                    oN[longShortNames[i][1]] = oN[longShortNames[i][0]];
                }
                oN[longShortNames[i][0]] = oN[longShortNames[i][1]];
            }

            if(!oN.rect) { oN.rect = oN.r = []; }
            while(oN.rect.length < 4) {
                oN.rect[oN.rect.length] = 0;
            }

            if(oN.tf) {
                //x,y,rotate,skewX,skewY,scaleX,scaleY,scaleZ
                while(oN.tf.length < 5) {
                    oN.tf[oN.tf.length] = 0;
                }
                while(oN.transform.length < 8) {
                    oN.tf[oN.tf.length] = 1;
                }
            }

        };

        function DOMNodeSeek(eleParent) {}
        function DOMNodeReset() {}
        function DOMNodeStarted() {}
        function DOMNodeCompleted() {}
        function DOMMediaNodeCreated() {}

        
        return {
            stageLookup: {},
            nodeLookup: {},
            nodeSymbolInstanceLookup: {},
            DOMNodeSeek: DOMNodeSeek,
            DOMNodeReset: DOMNodeReset,
            DOMNodeStarted: DOMNodeStarted,
            DOMNodeCompleted: DOMNodeCompleted,
            DOMMediaNodeCreated: DOMMediaNodeCreated,
            renderDOM: renderDOM,
            buildSceneGraphNode: buildSceneGraphNode,
            createElement: createElement
        };
    }();
    Edge.DeclareMarkup = DeclareMarkup;
})(jQuery, AdobeEdge);



