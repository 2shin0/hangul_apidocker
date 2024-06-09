//*******************************************************************************************//
/*
/* common function
*/
//*******************************************************************************************//

/*
/* check : moblie, pc 
*/
var filter = "win16|win32|win64|mac|macintel";
var filterType = null;

if (navigator.platform) {
    if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
        filterType = "Moblie";                
    } else {
        filterType = "PC";        
    }
}


/*
* check : browser 
*/
var agent = navigator.userAgent.toLowerCase();
var agentType = (function(agent) {        
   switch (true) {
    // case agent.indexOf("edge") > -1: return "MS Edge";
    // case agent.indexOf("edg/") > -1: return "Edge (chromium based)";    
    case agent.indexOf("edge") > -1: return "Edge";
    case agent.indexOf("edg/") > -1: return "Edge";
    case agent.indexOf("opr") > -1 && !!window.opr: return "Opera";
    case agent.indexOf("chrome") > -1 && !!window.chrome: return "Chrome";
    case agent.indexOf("trident") > -1: return "IE";
    case agent.indexOf("firefox") > -1: return "Firefox";
    case agent.indexOf("safari") > -1: return "Safari";
    default: return "other";
}
})(window.navigator.userAgent.toLowerCase());
console.log(">> " + filterType + ", " + agentType);


/*
* check : Device OS
*/
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },    
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    }, 
    isMac: function() {
        return navigator.userAgent.match(/(macintosh|mac(?=_powerpc)\s)/i);
    },   
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    isWin10 : function () {
        return this.regexCheck(/(edge)\/((\d+)?[\w\.]+)/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    } 
};
// if( isMobile.Android() ) { }  // alert("Android");
// if( isMobile.iOS() ) { }      // alert("iOS");


/*
* Resize , Orientationchange
*/
window.addEventListener("resize", loadOrientation, false);  

function loadOrientation() {                  
    screenscale.responsive.currentContainerSize.containerWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; 
    screenscale.responsive.currentContainerSize.containerHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;             
    screenscale.responsive.setScaleElement(document.querySelector("#container"));                       
}


/*
* check : addEventListener
*/
var isTouch = {
    down: undefined,
    move: undefined,
    up: undefined,
    click: undefined,

    eventSelector: function() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            isTouch.down = "touchstart";
            isTouch.move = "touchmove";
            isTouch.up = "touchend";
            isTouch.click = "click";
        } else {            
            isTouch.down = "mousedown";
            isTouch.move = "mousemove";
            isTouch.up = "mouseup";
            isTouch.click = "click";
        }
    }    
}
isTouch.eventSelector();


// ZOOMVALUE
var ZOOMVALUE = (parent.ZOOMVALUE == undefined) ? 1 : parent.ZOOMVALUE;
var isFactor = 1;


/*
* timeReander : requestAnimationFrame callback
*/
var timeReander = {   
    delay: undefined,  
    begin: undefined,  
    end: undefined,     
    timeRid : null,
    timeIdx : 0,

    animate: function(delay, begin, end) {
        var self = this;            

        self.begin = begin;
        self.end = end;         

        function render() {
            timeRid = window.requestAnimationFrame(render);                                             
            if (timeIdx >= delay) { 
                window.cancelAnimationFrame(timeRid);                   
                renderEnd();
            } else {
                timeIdx ++;                 
            }                          
        }        

        timeIdx = 0;    
        timeRid = window.requestAnimationFrame(render);  
        
        if (self.begin) {
            self.begin();
        }                

        function renderEnd() {               
            if (self.end) {
                self.end();
                timeIdx = 0;            
                timeRid = null;                               
            }                            
        }                         

    }  
}

// timeReander.animate(30,
// function() {      
// },
// function() {  
// });


/*
* sound : effect Sound
*/
var isAudio = {
    audio: new Audio(),
    begin: undefined,
    end: undefined,
    dur: 0,

    isPlaying: function() {
        return this.audio && this.audio.currentTime > 0 && 
        !this.audio.paused && !this.audio.ended && this.audio.readyState > 2;
    },
    play: function(id, ans, begin, end) {
        var self = this;

        if (self.isPlaying() && !ans) {
            self.audio.pause();
            if (self.end) return self.end();
        } else {
            if (self.end) self.end();
        }        

        self.begin = begin;
        self.end = end;                                                        
        
        self.audio.src = "" + id + ".mp3";                     
        self.audio.preload = "none";          
        
        if (agentType !== null) {
            if (isMobile.iOS()) { 
                self.audio.pause(); 
                self.audio.play();                                 
            } else {            
                if (agentType == "chrome") {                      
                    var playPromise = self.audio.play();
                    if (playPromise !== undefined) {
                        playPromise.then(_ => {
                            // Automatic playback started!                         
                        })
                        .catch(error => {                                                    
                        });                        
                    }                                       
                } else {
                    self.audio.play();  
                }                                 
            }
        } else {
            self.audio.play();                                     
        }
        
        self.audio.oncanplaythrough = function() {
            self.dur = self.duration;             
            if (self.begin) { 
                self.begin();                                
            }
        }

        this.audio.onended = function() {
            if (self.end) {
                self.end();                
            }
            self.begin = undefined;
            self.dur = undefined;
            self.end = undefined;            
            self.audio.pause(); 
        }
    }
};
// isAudio.play("common/oksnd", true);


/*
* sound : content audio
*/

// var content_audio_data = undefined;
var ContentAudio = {    
    audio: new Audio(),
    begin: undefined,
    end: undefined,
    cur_obj: undefined,
    playbackRate: 1,
    dur: 0,
    midx: 0,
    cnt: 0,    

    set_rate: function(playbackRate) {
        this.playbackRate = playbackRate;
        // this.audio.playbackRate = playbackRate;        
    },
    set_rate_remote: function(playbackRate) {
        this.playbackRate = playbackRate;
        // this.audio.playbackRate = playbackRate;
    },
    play: function(id, begin, end) {
        var self = this;
        
        if (self.end) self.end();
        if (!self.audio.paused) self.audio.pause();

        self.begin = begin;
        self.end = end;
        
        self.audio.src = "" + id + ".mp3";                
        
        if (agentType !== null) {
            if (isMobile.iOS()) { 
                self.audio.pause(); 
                self.audio.play();                                 
            } else {            
                if (agentType == "chrome") {                      
                    var playPromise = self.audio.play();
                    if (playPromise !== undefined) {
                        playPromise.then(_ => {
                            // Automatic playback started!                         
                        })
                        .catch(error => {                                                    
                        });                        
                    }                                       
                } else {
                    self.audio.play();  
                }                                 
            }
        } else {
            self.audio.play();                                     
        }
       
        self.audio.oncanplaythrough = function() {
            self.dur = self.duration;           
            if (self.begin) {
                self.begin();                
            }            
        }    

        this.audio.onended = function() {            
            if (self.end) {
                self.end();
                
                self.audio.pause(); 
                self.cnt = 0;
                self.midx = 0;                    
                self.begin = undefined;
                self.dur = undefined;
                self.end = undefined;
                self.cnt_obj = undefined;
            }
        }
    },

    mplay: function(objs, begin, end, all) {                
        var self = this;

        self.begin = begin;
        self.end = end;
        self.cnt = objs.length;
        self.midx = 0;
        
        var m_id = objs[self.midx].getAttribute("data-audio_idx");        
        self.cur_obj = objs[self.midx];
        
        self.audio.src = "" + m_id + ".mp3";                   
        
        if (agentType !== null) {
            if (isMobile.iOS()) { 
                self.audio.pause(); 
                self.audio.play();                                 
            } else {            
                if (agentType == "chrome") {                      
                    var playPromise = self.audio.play();
                    if (playPromise !== undefined) {
                        playPromise.then(_ => {
                            // Automatic playback started!                         
                        })
                        .catch(error => {                                                    
                        });                        
                    }                                       
                } else {
                    self.audio.play();  
                }                                 
            }
        } else {
            self.audio.play();                                     
        }

        self.audio.oncanplaythrough = function() {
            self.dur = self.duration;                       
            if (self.begin) {
                currentAudioCnt = self.midx+1;
                self.begin(self.cur_obj);                
            }
        }

        this.audio.onended = function() {
            if (self.end) {
                self.end(self.cur_obj);
                self.midx ++;
                
                if (self.midx < self.cnt) {                    
                    m_id = objs[self.midx].getAttribute("data-audio_idx");

                    self.cur_obj = objs[self.midx];
                    self.audio.src = "" + m_id + ".mp3";
                    self.audio.play();                    
                    self.audio.playbackRate = self.playbackRate;
                }
            }
        }       
    }
}


/*
* animation css (javaScript)
*/
function animateCss(obj, animationName, hideState) { 
    obj.classList.remove(animationName);           
    obj.classList.add(animationName);                  

    // var animationEnd = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";            
    obj.addEventListener("webkitAnimationEnd", _animationEnd, false);
    obj.addEventListener("mozAnimationEnd", _animationEnd, false);
    obj.addEventListener("MSAnimationEnd", _animationEnd, false);
    obj.addEventListener("oanimationend", _animationEnd, false);
    obj.addEventListener("animationend", _animationEnd, false);    
    
    function _animationEnd() {                
        this.removeEventListener("webkitAnimationEnd", _animationEnd, false);
        this.removeEventListener("mozAnimationEnd", _animationEnd, false);
        this.removeEventListener("MSAnimationEnd", _animationEnd, false);
        this.removeEventListener("oanimationend", _animationEnd, false);
        this.removeEventListener("animationend", _animationEnd, false);        
        
        this.classList.remove(animationName);

        if (hideState === true) {
            this.style.display = "none";
        }        
    }              
}
// animateCss(test, "bounceIn", false);    



/*
* animation css (jQuery)
*/
var animateState = false;
$.fn.extend({
    animateCss: function (animationName, end_func) {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      var _cb = end_func;
      this.addClass('animated ' + animationName).one(animationEnd, function() {
        $(this).removeClass('animated ' + animationName);      
        
        animateState = true;
        if( _cb )
            _cb();                     
      });
      return this;
    }
});
$.fn.extend({
    animateHideCss: function (animationName, end_func) {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      var _cb = end_func;      

      this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);
        $(this).hide();

        animateState = true;
        if( _cb )
            _cb();             
      });
      return this;
    }
});
// $(".test").animateCss("bounceIn")
// $(".test").animateHideCss("bounceIn")


/*
* animate easing (jQuery)
*/
jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});

function goToWriteIndex() {
    window.location.href = "/write.html";
}