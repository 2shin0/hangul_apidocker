/**
 * content activity
 */
function fnContent() { 
    var cv = this;    

    this.filterType = filterType;
    this.agentType = agentType;
    this.vIdx = 0;          
    this.pIdx = 0;      
    this.fIdx = 0;
    this.timeRequestId = null;              
    this.STATE_auto = true;      
    this.STATE_advice = false;    
    this.STATE_audio = false;   	            
    this.STATE_audio_user = false;   	            
    this.STATE_audioCharacter = false;    	
    this.STATE_complete = false;            
    this.STATE_popup = false;
    this.AUDIO_bgm = null;      
    this.AUDIO_p = null;        
    this.AUDIO_user = null;
    this.AUDIO_time = null;
    this.AUDIO_src = undefined;
    this.ANI_state = null;           
    this.ANI_basics = null;       
    this.ANI_basics_node = null;  
    this.ANI_talk = null;          
    this.ANI_talk_node = null;                  
    
    this.ani_canvas = document.querySelectorAll(".ani_canvas");
    this.btn_all = document.querySelectorAll(".btn");    
    this.btn_prev = document.querySelector("#btn_prev");      
    this.btn_next = document.querySelector("#btn_next"); 
    this.btn_finish = document.querySelector("#btn_finish");     
    this.btn_bgm = document.querySelector("#btn_bgm");       
    this.btn_end = document.querySelector("#btn_end");    

    this.thum_container = document.querySelector("#thum_container");          
    this.popup_container = document.querySelector("#popup_container");        
    this.thum = document.querySelectorAll("#thum_container .thum");            
    this.popup = document.querySelectorAll("#popup_container .popup");              
    this.text = document.querySelectorAll(".page .text");         

    this.popupSrc = "images/popup";
    this.soundBgm = "../common/sound/bgm_Lets_go_picnic"; 
    this.soundClick = "../common/sound/effClick2";              
    

    //**************************************************************************************//
    /**
     * init
     */
    cv.init = function() {                       
        for (var i = 0; i < frameAnimation.length; i++) {   
            let _frame = frameAnimation[i].canvas.parentNode;                                
            
            if (_frame.getAttribute("data-ani") == "basics") {
                cv.ANI_basics = frameAnimation[i];
                cv.ANI_basics_node = frameAnimation[i].canvas.parentNode;
            } 
            else if (_frame.getAttribute("data-ani") == "talk") {
                cv.ANI_talk = frameAnimation[i];
                cv.ANI_talk_node = frameAnimation[i].canvas.parentNode;
            }       
        }         

        for (var i = 0; i < cv.thum.length; i++) {              
            cv.thum[i].classList.add("grayscale"); 
            cv.thum[i].classList.add("pointNone"); 
            cv.thum[i].addEventListener(isTouch.click, cv.eventThum, false);                            
        }                                 
        cv.btn_finish.addEventListener(isTouch.click, cv.eventFinish, false);                                  
                        
        cv.transContents(1);                 
                        
        // cv.popup_container.classList.add("block");     
        // cv.popup[3].classList.add("block");              
    };           

    
    cv.transContents = function(idx) {
        let _check = idx;
        if (_check == 0) {
            cv.audioCharacter();   
        } else {
            document.querySelector("body").addEventListener(isTouch.click, removeEvent, false);
            function removeEvent() {
                this.removeEventListener(isTouch.click, removeEvent, false);                 
                cv.audioCharacter();                                   
            }                            
        }        
    }    
    
    // 페이지가 로드될 때 실행
window.onload = function() {
    // cv.transContents 함수 호출
    cv.transContents(0);
};

// 새로고침 이벤트 감지
window.onbeforeunload = function() {
    // cv.transContents 함수 호출
    cv.transContents(0);
};
    
    /*
     * content : setAnimation
    */    
    cv.setAnimation = function(state) { 
        let _state = state;           
        switch(_state) {                
            case "basics":   
                cv.ANI_basics_node.classList.remove("hidden"); 
                cv.ANI_basics.exportRoot.instance.gotoAndPlay(0);     
                cv.ANI_basics.stage.play();                       

                cv.ANI_talk_node.classList.add("hidden"); 
                cv.ANI_talk.exportRoot.instance.gotoAndPlay(0);     
                cv.ANI_talk.stage.stop();                                  
                break;
        
            case "talk":                               
                cv.ANI_basics_node.classList.add("hidden"); 
                cv.ANI_basics.exportRoot.instance.gotoAndPlay(0);     
                cv.ANI_basics.stage.stop();                       

                cv.ANI_talk_node.classList.remove("hidden"); 
                cv.ANI_talk.exportRoot.instance.gotoAndPlay(0);     
                cv.ANI_talk.stage.play();   
                break;  
                
            case "stop":  
                cv.ANI_basics_node.classList.remove("hidden"); 
                cv.ANI_basics.exportRoot.instance.gotoAndPlay(0);     
                cv.ANI_basics.stage.stop();                       

                cv.ANI_talk_node.classList.add("hidden"); 
                cv.ANI_talk.exportRoot.instance.gotoAndPlay(0);     
                cv.ANI_talk.stage.stop();                
                break;                                               
        }                
    }


    /**
     * content : audio character
     */
    cv.audioCharacter = function() {
        cv.stopContentSound();                     
        cv.stopTimeReander();                  
        
        let _state = false;        
        let _audio = cv.ANI_talk_node.getAttribute("data-audio-idx"); 
        setTimeout(function () {                                       
            cv.setAnimation("talk");       
        }, 100);
        cv.STATE_audioCharacter = true;
        cv.STATE_audio = true;
                
        ContentAudio.play(_audio,
        function() {                           
            _state = true;
        },
        function() {      
            _state = false;            
            if (_state === false) {
                cv.setAnimation("basics");  
                cv.STATE_audioCharacter = false;
                cv.STATE_audio = false;                
                
                if (cv.STATE_complete === false) {
                    if (cv.pIdx == 0) {
                        cv.thum[cv.pIdx].classList.remove("grayscale");
                        cv.thum[cv.pIdx].classList.remove("pointNone");
                        cv.thum[cv.pIdx].classList.add("active");     
                        animateCss(cv.thum[cv.pIdx], "frame_bounceIn");  
    
                        let _inset = document.createElement("span");                                                
                        _inset.className = "inset";        
                        cv.thum[cv.pIdx].appendChild(_inset);
                    }                                                
                    setTimeout(function () {
                        cv.thum[cv.pIdx].classList.remove("grayscale"); 
                        cv.thum[cv.pIdx].classList.remove("pointNone");                 
                    }, 100);                
                }                                
            }            
        });        
    };  


    /**
     * content : audio
     */
    cv.audioListener = function(idx) {
        cv.stopContentSound();                     
        cv.stopTimeReander();            
        
        let _state = false;        
        let _audio = cv.popup[idx].getAttribute("data-audio-idx");
        cv.STATE_audioCharacter = false;   
        cv.STATE_audio = true;                      
        
        ContentAudio.play(_audio,
        function() {                           
            _state = true;
        },
        function() {      
            _state = false;            
            if (_state === false) {      
                cv.STATE_audio = false;          
                setTimeout(function () {
                    // console.log((cv.pIdx+1) + ", " + cv.thum.length); 
                    cv.completeCheck(idx);               
                }, 1500);
            }            
        });        
    }; 
    
    
    /**
     * addEvent : Thum
     */
    cv.eventThum = function(i) {                           
        let self = this;
        self.removeEventListener(isTouch.click, cv.eventThum, false);         
        self.addEventListener(isTouch.click, cv.eventThum, false); 
        isAudio.play(cv.soundClick, true);                  
        
        let _wrap = cv.wrap;                
        function fnIndex(ul, li) {        
            let lis = cv.thum;
            for (var i=0, len=lis.length; i<len; i++) {
                if (li === lis[i]) {
                    return i;
                }
            }
        }       
        setTimeout(function () {                    
            cv.audioListener(fnIndex(_wrap, self));                       
        }, 200);
        cv.setAnimation("stop");

        cv.popup_container.classList.add("block"); 
        cv.popup[fnIndex(_wrap, self)].classList.add("block");    
        cv.fIdx = fnIndex(_wrap, self); 
        cv.STATE_popup = true;                     
        
        if (cv.STATE_complete === false) {
            cv.thum[cv.pIdx].querySelector(".inset").remove();                            
            
            let _page = cv.popup[cv.fIdx].querySelector(".pImg img");         
            let _path = cv.popupSrc + (cv.pIdx+1);        
            _page.setAttribute("src", _path + ".webp");              
        }
        else {
            cv.btn_finish.classList.remove("frame_btn_noti"); 
            
            let _page = cv.popup[cv.fIdx].querySelector(".pImg img");         
            let _path = cv.popupSrc + (cv.fIdx+1);          
            _page.setAttribute("src", _path + ".webp");              
        }        
    };
    

    /**
     * content : complete check
     */
    cv.completeCheck = function(idx) {
        cv.popup[idx].classList.remove("block");
        cv.popup_container.classList.remove("block"); 
        cv.STATE_popup = false;        

        if (cv.STATE_complete === false) {
            for (var i = 0; i < cv.thum.length; i++) {   
                cv.thum[i].classList.add("grayscale");           
                cv.thum[i].classList.add("pointNone"); 
            }            
    
            let _page = cv.popup[cv.pIdx].querySelector(".pImg img");         
            let _path = cv.popupSrc + (cv.pIdx+1);        
            _page.setAttribute("src", _path + ".png");  
            
            let _inset = document.createElement("span");                                                
            _inset.className = "inset";        
                    
            if ((cv.pIdx+1) === cv.thum.length) {              
                cv.STATE_complete = true;
                cv.btn_finish.classList.add("block");                         
                animateCss(cv.btn_finish, "frame_bounceIn"); 
                cv.btn_finish.classList.add("frame_btn_noti");                         
    
                cv.pIdx = 0;                                
                for (var i = 0; i < cv.thum.length; i++) {   
                    cv.thum[i].classList.remove("grayscale");
                    cv.thum[i].classList.remove("pointNone");
                    cv.thum[i].classList.add("active");  
                } 
            } 
            else {            
                cv.pIdx ++;                                
                cv.thum[cv.pIdx].appendChild(_inset);
                cv.thum[cv.pIdx].classList.remove("grayscale");         
                animateCss(cv.thum[cv.pIdx], "frame_bounceIn");
                setTimeout(function () {                
                    cv.thum[cv.pIdx].classList.remove("pointNone");         
                }, 400);            
            }            
            cv.setAnimation("basics");
        }
        else {
            for (var i = 0; i < cv.thum.length; i++) {   
                cv.thum[i].classList.remove("grayscale");
                cv.thum[i].classList.remove("pointNone");
                cv.thum[i].classList.add("active");  
            } 

            let _page = cv.popup[cv.fIdx].querySelector(".pImg img");         
            let _path = cv.popupSrc + (cv.fIdx+1);          
            _page.setAttribute("src", _path + ".png");  

            cv.btn_finish.classList.add("frame_btn_noti"); 
            cv.setAnimation("basics");
        }        
    }        


    /**
     * content : next Finish 
     */
     cv.eventFinish = function() {
        let self = this;
        self.removeEventListener(isTouch.click, cv.eventFinish, false);         
        self.addEventListener(isTouch.click, cv.eventFinish, false); 
        isAudio.play(cv.soundClick, true); 

        cv.setAnimation("stop");        
        window.HybridApp.completeContents();
        window.HybridApp.nextMenu();
    }    
    

    /**
     * bgm sound
    */    
    cv.bgmSound = function() {          
        cv.AUDIO_bgm = new Audio;                        
        cv.AUDIO_bgm.id = "audio_bgm";        
        cv.AUDIO_bgm.src = cv.soundBgm + ".mp3";
        cv.AUDIO_bgm.volume = 0.4;
        cv.AUDIO_bgm.loop = true;
        cv.AUDIO_bgm.load();                  
        // cv.AUDIO_bgm.play();                     
    };              
    
    /**
     * stopContentSound
    */      
    cv.stopContentSound = function() {
        ContentAudio.begin = undefined;
        ContentAudio.dur = undefined;
        ContentAudio.end = undefined;
        ContentAudio.cnt_obj = undefined;
        ContentAudio.cnt = 0;
        ContentAudio.midx = 0;    
        ContentAudio.audio.pause();                               
    };   
    
    /**
     * stopTimeReander
    */          
    cv.stopTimeReander = function() {           
        window.cancelAnimationFrame(timeReander.timeRid);	
        timeReander.delay = undefined;  
        timeReander.begin = undefined;  
        timeReander.end = undefined;            
        timeReander.timeIdx = 0;
        timeReander.timeRid = null;    
    };    
    
    
    /*
     * 플레이어 deactive 상태 호출 : Pause
    */    
    window.onPauseContents = function() {                         
        cv.setAnimation("stop");                        
        if (ContentAudio.audio.paused === false) {
            ContentAudio.audio.pause();
            cv.AUDIO_src = ContentAudio.audio.src;
            cv.AUDIO_time = ContentAudio.audio.currentTime;                                                    
        }          
    }
    
    /*
     * 플레이어 active 상태 호출 : Resume
    */
    window.onResumeContents = function() {  
        // console.log("STATE_audio : " + cv.STATE_audio); 
        // console.log("STATE_audio_user : " + cv.STATE_audio_user); 

        if (cv.STATE_audio === true && cv.AUDIO_src !== undefined) {                                
            ContentAudio.audio.src = cv.AUDIO_src;
            ContentAudio.audio.currentTime = cv.AUDIO_time;                
            ContentAudio.audio.play();            
            cv.AUDIO_src = undefined;

            if (cv.STATE_popup === false) {
                cv.setAnimation("talk");                        
            }            
        } 
        else {
            cv.setAnimation("basics");                        
        }      
    }    

};


/* 
* new content activity 
*/
var fnContent = new fnContent();
fnContent.init();



