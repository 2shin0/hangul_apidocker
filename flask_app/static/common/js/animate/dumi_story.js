(function (cjs, an) {		
	
	cjs.dumi_story = function(def) {	
		_dumi_story(def);	
						
		var canvas = def.canvas;			
		var dom_overlay_container = document.querySelector(".dom_overlay_container");
		var comp = AdobeAn.getComposition(def.comp);			
		var lib = comp.getLibrary();			
		var loader = new createjs.LoadQueue(false);

		loader.addEventListener("fileload", function(evt) { handleFileLoad(evt, comp); });
		loader.addEventListener("complete", function(evt) { handleComplete(evt, comp); });			
		loader.loadManifest(lib.properties.manifest);	
				

		function handleFileLoad(evt, comp) {
			var images=comp.getImages();	
			if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }	
		}

		function handleComplete(evt, comp) {				
			var ss = comp.getSpriteSheet();
			var queue = evt.target;
			var ssMetadata = lib.ssMetadata;			

			for ( var i = 0; i < ssMetadata.length; i++ ) {
				ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} );				
			}

			def.exportRoot = new lib.dumi_story_stage();
			def.stage = new lib.Stage(canvas);
			
			def.stage.addChild(def.exportRoot);						
			createjs.Ticker.setFPS(lib.properties.fps);										
			
			createjs.Ticker.addEventListener("tick", def.stage);																				
			// def.exportRoot.instance.loop = false;																					
			def.stage.stop();				

			AdobeAn.compositionLoaded(lib.properties.id);														
		}
	}			
	
	function _dumi_story(def) {					
		var p; // shortcut to reference prototypes
		var lib={};var ss={};var img={};
		lib.ssMetadata = [
				{name:def.name, frames: [[0,0,478,531],[0,533,556,437],[558,301,294,297],[480,0,322,299]]}
		];
		
		
		(lib.AnMovieClip = function(){
			this.actionFrames = [];
			this.ignorePause = false;
			this.gotoAndPlay = function(positionOrLabel){
				cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
			}
			this.play = function(){
				cjs.MovieClip.prototype.play.call(this);
			}
			this.gotoAndStop = function(positionOrLabel){
				cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
			}
			this.stop = function(){
				cjs.MovieClip.prototype.stop.call(this);
			}
		}).prototype = p = new cjs.MovieClip();
		// symbols:
		
		
		
		(lib.CachedBmp_79 = function() {
			this.initialize(ss[def.name]);
			this.gotoAndStop(0);
		}).prototype = p = new cjs.Sprite();
		
		
		
		(lib.CachedBmp_78 = function() {
			this.initialize(ss[def.name]);
			this.gotoAndStop(1);
		}).prototype = p = new cjs.Sprite();
		
		
		
		(lib.CachedBmp_77 = function() {
			this.initialize(ss[def.name]);
			this.gotoAndStop(2);
		}).prototype = p = new cjs.Sprite();
		
		
		
		(lib.CachedBmp_76 = function() {
			this.initialize(ss[def.name]);
			this.gotoAndStop(3);
		}).prototype = p = new cjs.Sprite();
		
		
		
		(lib.듬이손2 = function(mode,startPosition,loop,reversed) {
		if (loop == null) { loop = true; }
		if (reversed == null) { reversed = false; }
			var props = new Object();
			props.mode = mode;
			props.startPosition = startPosition;
			props.labels = {};
			props.loop = loop;
			props.reversed = reversed;
			cjs.MovieClip.apply(this,[props]);
		
			// Layer_1
			this.shape = new cjs.Shape();
			this.shape.graphics.f("#000000").s().p("AjpEBIgBAAQgegdgSgYQAUgfARggIAAAAQBKiPAAi5IAAgTIgCg0IgBgRIAAAAIAAgDQBDgWAAACQAmgLAsADQAcACAgAIQAzAQAWAQIAJAGQBHAhAzBgQA3BkgOBXQgaAqgmgXQgHgLADgNQAOhCgvhUQgqhOgzgWIgFgDQgSgNgMgEQhQgjhLAZIAAAAIAAAAIABAoQAADVheCsQAbAbAjAJQAgAIA3gFQAOgBALAIQALAJABANQADAPgJAMQgKAKgOABIgvADQhXAAg6gyg");
			this.shape.setTransform(1.809,0.0078);
		
			this.shape_1 = new cjs.Shape();
			this.shape_1.graphics.f("#FFFFFF").s().p("Ag+BvQgVgLgUgfQgVghABglQAAgnAagcQBBhJBMAgIAPAJQAcAMAVAnQAWAqgHAhIh/BdIgRABQgZAAgQgJg");
			this.shape_1.setTransform(-1.7993,-0.3944,2.2784,2.2784);
		
			this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));
		
			this._renderFirstFrame();
		
		}).prototype = p = new cjs.MovieClip();
		p.nominalBounds = new cjs.Rectangle(-30.1,-30.7,60.2,61.5);
		
		
		(lib.듬이손1 = function(mode,startPosition,loop,reversed) {
		if (loop == null) { loop = true; }
		if (reversed == null) { reversed = false; }
			var props = new Object();
			props.mode = mode;
			props.startPosition = startPosition;
			props.labels = {};
			props.loop = loop;
			props.reversed = reversed;
			cjs.MovieClip.apply(this,[props]);
		
			// Layer_2
			this.shape = new cjs.Shape();
			this.shape.graphics.f("#000000").s().p("AAlENQgIgLgWglQhiirAAjXIAAgrIAEhDIBDAXQgDAfAAA4QAADlBzCmIgyAuIgFgHg");
			this.shape.setTransform(17.15,-2.25);
		
			this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
		
			// Layer_1
			this.shape_1 = new cjs.Shape();
			this.shape_1.graphics.f("#000000").s().p("AAsEwQgOgBgJgKQgJgLABgPQACgOAKgJQAMgIANABQA2AGAhgIQAigJAcgaQAagdATgbQARAfAUAdQgCARgrAlQg6AyhYAAgAkXBFIACgLQgNhXA1hkQAzhgBHghIAogVQAbgMAWgFIABAAQAegIAggDQAhAAAiAHQAoAIAaASQgCAkAAAlQgbgMgqgQQhGgWhOAiQgLAFgSANIgGADQgyAWgqBNQgvBUANBDQACAIgCAHg");
			this.shape_1.setTransform(-8,11.5,1,1,0,0,0,-6,11.5);
		
			this.shape_2 = new cjs.Shape();
			this.shape_2.graphics.f("#FFFFFF").s().p("AAKEPQisizh1ggQgQhOAzheQAvhZA/gbQASgNARgIQCthKCXCmQA6BAABBaQABBVgvBLQgtBIgwAZQgmATg6AAQgSAAgVgCg");
			this.shape_2.setTransform(1.6114,-0.3295);
		
			this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).wait(1));
		
			this._renderFirstFrame();
		
		}).prototype = p = new cjs.MovieClip();
		p.nominalBounds = new cjs.Rectangle(-30,-30.8,60,61.6);
		
		
		(lib.듬이몸 = function(mode,startPosition,loop,reversed) {
		if (loop == null) { loop = true; }
		if (reversed == null) { reversed = false; }
			var props = new Object();
			props.mode = mode;
			props.startPosition = startPosition;
			props.labels = {};
			props.loop = loop;
			props.reversed = reversed;
			cjs.MovieClip.apply(this,[props]);
		
			// Layer_1
			this.instance = new lib.CachedBmp_79();
			this.instance.setTransform(-119.65,-133,0.5,0.5);
		
			this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));
		
			this._renderFirstFrame();
		
		}).prototype = p = new cjs.MovieClip();
		p.nominalBounds = new cjs.Rectangle(-119.6,-133,239,265.5);
		
		
		(lib.듬이머리말x = function(mode,startPosition,loop,reversed) {
		if (loop == null) { loop = true; }
		if (reversed == null) { reversed = false; }
			var props = new Object();
			props.mode = mode;
			props.startPosition = startPosition;
			props.labels = {};
			props.loop = loop;
			props.reversed = reversed;
			cjs.MovieClip.apply(this,[props]);
		
			// 듬이_입
			this.shape = new cjs.Shape();
			this.shape.graphics.f("#000000").s().p("Ag4AjQgXgPAAgUQAAgUAXgPQAYgOAhAAQAgAAAYAPQAXAPAAAUQAAAUgYAPQgXAOghAAQghAAgXgPg");
			this.shape.setTransform(-0.4203,20.4076,2.2795,2.2795);
		
			this.shape_1 = new cjs.Shape();
			this.shape_1.graphics.f("#000000").s().p("AAAAdQg3AAglgPQgUgIgKgIQgEgFAAgGQAAgGAEgEQAEgFAHAAQAGAAAEAEIAXAMQAgAMAuAAIABAAQA8AAAkgVQAJgGAGAAQAGAAAFAFQAEAFAAAFQgBAMgLACIgCACQgSAKgRAFQghAKgsAAg");
			this.shape_1.setTransform(-0.5413,42.0651,2.2795,2.2795);
		
			this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_1},{t:this.shape}]},40).to({state:[]},1).wait(19));
		
			// Layer_5
			this.shape_2 = new cjs.Shape();
			this.shape_2.graphics.f("#000000").s().p("AAAAhIgBgBIgDAAQgRgDgGgUQgFgTAKgMIAAgBIACgCQAFgFAGgBIAGgBIABAAIAFABQATACAGAXIAAACQADANgEAKIgCADIgDAFIgEADIgBAAQgEACgJABg");
			this.shape_2.setTransform(-31.8415,3.256,2.2795,2.2795,0,0,180);
		
			this.shape_3 = new cjs.Shape();
			this.shape_3.graphics.f("#000000").s().p("AAAAhIgBgBIgDAAQgRgDgGgUQgFgTAKgMIAAgBIACgCQAFgFAGgBIAGgBIABAAIAFABQATACAGAXIAAACQADANgEAKIgCADIgDAFIgEADIgBAAQgEACgJABg");
			this.shape_3.setTransform(32.0915,3.256,2.2795,2.2795);
		
			this.shape_4 = new cjs.Shape();
			this.shape_4.graphics.f("#000000").s().p("AgiAXQgCgGADgFQADgGAGgCIALgDIgKgGQgFgDgBgGQgCgGAEgGQADgFAGgBQAGgBAFADIAkAYQAIAEgBAJQgCAKgJADIgoANIgEAAQgLAAgEgKg");
			this.shape_4.setTransform(-33.1533,2.2359,2.2795,2.2795);
		
			this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2,p:{scaleY:2.2795,y:3.256,skewY:180,x:-31.8415}}]}).to({state:[{t:this.shape_3},{t:this.shape_2,p:{scaleY:1.3815,y:3.292,skewY:180,x:-31.8415}}]},7).to({state:[{t:this.shape_2,p:{scaleY:2.2795,y:3.256,skewY:0,x:32.0915}},{t:this.shape_4}]},2).to({state:[{t:this.shape_3},{t:this.shape_2,p:{scaleY:1.3815,y:3.292,skewY:180,x:-31.8415}}]},8).to({state:[{t:this.shape_3},{t:this.shape_2,p:{scaleY:2.2795,y:3.256,skewY:180,x:-31.8415}}]},2).to({state:[{t:this.shape_3},{t:this.shape_2,p:{scaleY:2.2795,y:3.256,skewY:180,x:-31.8415}}]},21).to({state:[]},1).wait(19));
		
			// Layer_1
			this.instance = new lib.CachedBmp_78();
			this.instance.setTransform(-139.05,-109.25,0.5,0.5);
		
			this.timeline.addTween(cjs.Tween.get(this.instance).wait(40).to({_off:true},1).wait(19));
		
			this._renderFirstFrame();
		
		}).prototype = p = new cjs.MovieClip();
		p.nominalBounds = new cjs.Rectangle(-139,-109.2,278,218.5);
		
		
		(lib.듬이팔2 = function(mode,startPosition,loop,reversed) {
		if (loop == null) { loop = true; }
		if (reversed == null) { reversed = false; }
			var props = new Object();
			props.mode = mode;
			props.startPosition = startPosition;
			props.labels = {};
			props.loop = loop;
			props.reversed = reversed;
			cjs.MovieClip.apply(this,[props]);
		
			// Layer_1
			this.instance = new lib.CachedBmp_77();
			this.instance.setTransform(-73.35,-74.15,0.5,0.5);
		
			this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));
		
			this._renderFirstFrame();
		
		}).prototype = p = new cjs.MovieClip();
		p.nominalBounds = new cjs.Rectangle(-73.3,-74.1,147,148.5);
		
		
		(lib.듬이팔1 = function(mode,startPosition,loop,reversed) {
		if (loop == null) { loop = true; }
		if (reversed == null) { reversed = false; }
			var props = new Object();
			props.mode = mode;
			props.startPosition = startPosition;
			props.labels = {};
			props.loop = loop;
			props.reversed = reversed;
			cjs.MovieClip.apply(this,[props]);
		
			// Layer_1
			this.instance = new lib.CachedBmp_76();
			this.instance.setTransform(-80.4,-69.6,0.5,0.5);
		
			this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));
		
			this._renderFirstFrame();
		
		}).prototype = p = new cjs.MovieClip();
		p.nominalBounds = new cjs.Rectangle(-80.4,-69.6,161,149.5);
		
		
		(lib.dumi_story_re_1 = function(mode,startPosition,loop,reversed) {
		if (loop == null) { loop = true; }
		if (reversed == null) { reversed = false; }
			var props = new Object();
			props.mode = mode;
			props.startPosition = startPosition;
			props.labels = {};
			props.loop = loop;
			props.reversed = reversed;
			cjs.MovieClip.apply(this,[props]);
		
			// 듬이_손1
			this.instance = new lib.듬이손1("synched",0);
			this.instance.setTransform(-126.7,-68.8);
		
			this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:-0.1,regY:-0.1,rotation:-3.4677,x:-129.7,y:-52.75},10).to({regX:0,regY:0,rotation:0,x:-126.7,y:-68.8},10).to({regX:-0.1,regY:-0.1,rotation:3.1962,x:-123.3,y:-67.45},10).to({regX:0,regY:0,rotation:0,x:-126.7,y:-68.8},10).wait(1));
		
			// 듬이_손2
			this.instance_1 = new lib.듬이손2("synched",0);
			this.instance_1.setTransform(126.4,-68.8);
		
			this.timeline.addTween(cjs.Tween.get(this.instance_1).to({rotation:-3.4677,x:123,y:-67.95},10).to({rotation:0,x:126.4,y:-68.8},10).to({rotation:3.1962,x:129.45,y:-53.25},10).to({rotation:0,x:126.4,y:-68.8},10).wait(1));
		
			// 듬이_머리
			this.instance_2 = new lib.듬이머리말x("synched",0);
			this.instance_2.setTransform(-0.05,-16.95,1,1,0,0,0,0,94.5);
		
			this.timeline.addTween(cjs.Tween.get(this.instance_2).to({rotation:-3.4677,y:-8.55,startPosition:10},10).to({rotation:0,y:-16.95,startPosition:20},10).to({regX:0.1,rotation:3.1962,x:0.4,y:-8.5,startPosition:30},10).to({regX:0,rotation:0,x:-0.05,y:-16.95,startPosition:40},10).wait(1));
		
			// 듬이_몸
			this.instance_3 = new lib.듬이몸("synched",0);
			this.instance_3.setTransform(-0.5,216.3,1,1,0,0,0,-0.1,128.2);
		
			this.timeline.addTween(cjs.Tween.get(this.instance_3).to({scaleY:0.9733,y:216.4},10).to({scaleY:1,y:216.3},10).to({scaleY:0.9733,y:216.4},10).to({scaleY:1,y:216.3},10).wait(1));
		
			// 듬이_팔1
			this.instance_4 = new lib.듬이팔1("synched",0);
			this.instance_4.setTransform(-69.95,28.8,1,1,0,0,0,10.6,48.5);
		
			this.timeline.addTween(cjs.Tween.get(this.instance_4).to({regX:10.5,regY:48.4,scaleY:0.9813,rotation:-3.7046,x:-66.55,y:34.3},10).to({regX:10.6,regY:48.5,scaleY:1,rotation:0,x:-69.95,y:28.8},10).to({regX:10.5,regY:48.4,scaleY:0.9813,rotation:3.227,x:-72.8,y:31.5},10).to({regX:10.6,regY:48.5,scaleY:1,rotation:0,x:-69.95,y:28.8},10).wait(1));
		
			// 듬이_팔2
			this.instance_5 = new lib.듬이팔2("synched",0);
			this.instance_5.setTransform(70.45,22.3,1,1,0,0,0,-17.2,37.5);
		
			this.timeline.addTween(cjs.Tween.get(this.instance_5).to({regY:37.4,scaleY:0.9813,rotation:-2.9691,x:71.1,y:22.35},10).to({regY:37.5,scaleY:1,rotation:0,x:70.45,y:22.3},10).to({scaleY:0.9813,rotation:2.9513,x:69.7,y:27.35},10).to({scaleY:1,rotation:0,x:70.45,y:22.3},10).wait(1));
		
			this._renderFirstFrame();
		
		}).prototype = p = new cjs.MovieClip();
		p.nominalBounds = new cjs.Rectangle(-165.3,-220.7,331.4,441.4);
		
		
		// stage content:
		(lib.dumi_story_stage = function(mode,startPosition,loop,reversed) {
		if (loop == null) { loop = true; }
		if (reversed == null) { reversed = false; }
			var props = new Object();
			props.mode = mode;
			props.startPosition = startPosition;
			props.labels = {};
			props.loop = loop;
			props.reversed = reversed;
			cjs.MovieClip.apply(this,[props]);
		
			// dumi_story_re_talk
			this.instance = new lib.dumi_story_re_1();
			this.instance.setTransform(85,119.6,0.5,0.5);
		
			this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));
		
			this._renderFirstFrame();
		
		}).prototype = p = new lib.AnMovieClip();
		p.nominalBounds = new cjs.Rectangle(89.5,124.3,76.19999999999999,105.60000000000001);
		// library properties:
		lib.properties = {
			id: def.comp,
			width: 170,
			height: 230,
			fps: 30,
			color: "#FFFFFF",
			opacity: 1.00,
			manifest: [
				{src:def.src, id:def.name}
			],
			preloads: []
		};
		
		
		
		// bootstrap callback support:
		
		(lib.Stage = function(canvas) {
			createjs.Stage.call(this, canvas);
		}).prototype = p = new createjs.Stage();
		
		p.setAutoPlay = function(autoPlay) {
			this.tickEnabled = autoPlay;
		}
		p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
		p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
		p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
		p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }
		
		p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }
		
		an.bootcompsLoaded = an.bootcompsLoaded || [];
		if(!an.bootstrapListeners) {
			an.bootstrapListeners=[];
		}
		
		an.bootstrapCallback=function(fnCallback) {
			an.bootstrapListeners.push(fnCallback);
			if(an.bootcompsLoaded.length > 0) {
				for(var i=0; i<an.bootcompsLoaded.length; ++i) {
					fnCallback(an.bootcompsLoaded[i]);
				}
			}
		};
		
		an.compositions = an.compositions || {};
		an.compositions[def.comp] = {
			getStage: function() { return exportRoot.stage; },
			getLibrary: function() { return lib; },
			getSpriteSheet: function() { return ss; },
			getImages: function() { return img; }
		};
		
		an.compositionLoaded = function(id) {
			an.bootcompsLoaded.push(id);
			for(var j=0; j<an.bootstrapListeners.length; j++) {
				an.bootstrapListeners[j](id);
			}
		}
		
		an.getComposition = function(id) {
			return an.compositions[id];
		}
		
		
		an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
			var lastW, lastH, lastS=1;		
			window.addEventListener('resize', resizeCanvas);		
			resizeCanvas();		
			function resizeCanvas() {			
				var w = lib.properties.width, h = lib.properties.height;			
				var iw = window.innerWidth, ih=window.innerHeight;			
				var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
				if(isResp) {                
					if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
						sRatio = lastS;                
					}				
					else if(!isScale) {					
						if(iw<w || ih<h)						
							sRatio = Math.min(xRatio, yRatio);				
					}				
					else if(scaleType==1) {					
						sRatio = Math.min(xRatio, yRatio);				
					}				
					else if(scaleType==2) {					
						sRatio = Math.max(xRatio, yRatio);				
					}			
				}
				domContainers[0].width = w * pRatio * sRatio;			
				domContainers[0].height = h * pRatio * sRatio;
				domContainers.forEach(function(container) {				
					container.style.width = w * sRatio + 'px';				
					container.style.height = h * sRatio + 'px';			
				});
				stage.scaleX = pRatio*sRatio;			
				stage.scaleY = pRatio*sRatio;
				lastW = iw; lastH = ih; lastS = sRatio;            
				stage.tickOnUpdate = false;            
				stage.update();            
				stage.tickOnUpdate = true;		
			}
		}
		an.handleSoundStreamOnTick = function(event) {
			if(!event.paused){
				var stageChild = stage.getChildAt(0);
				if(!stageChild.paused || stageChild.ignorePause){
					stageChild.syncStreamSounds();
				}
			}
		}
		an.handleFilterCache = function(event) {
			if(!event.paused){
				var target = event.target;
				if(target){
					if(target.filterCacheList){
						for(var index = 0; index < target.filterCacheList.length ; index++){
							var cacheInst = target.filterCacheList[index];
							if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
								cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
							}
						}
					}
				}
			}
		}					
	}


	/********************************************************************************************************/
	/********************************************************************************************************/
	/********************************************************************************************************/
	/********************************************************************************************************/
	/********************************************************************************************************/	
	cjs.dumi_story_talk = function(def) {				
		_dumi_story_talk(def);	

		var canvas = def.canvas;			
		var dom_overlay_container = document.querySelector(".dom_overlay_container");
		var comp = AdobeAn.getComposition(def.comp);			
		var lib = comp.getLibrary();			
		var loader = new createjs.LoadQueue(false);

		loader.addEventListener("fileload", function(evt) { handleFileLoad(evt, comp); });
		loader.addEventListener("complete", function(evt) { handleComplete(evt, comp); });			
		loader.loadManifest(lib.properties.manifest);	
				

		function handleFileLoad(evt, comp) {
			var images=comp.getImages();	
			if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }	
		}

		function handleComplete(evt, comp) {				
			var ss = comp.getSpriteSheet();
			var queue = evt.target;
			var ssMetadata = lib.ssMetadata;			

			for ( var i = 0; i < ssMetadata.length; i++ ) {
				ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} );				
			}

			def.exportRoot = new lib.dumi_story_talk_stage();
			def.stage = new lib.Stage(canvas);
			
			def.stage.addChild(def.exportRoot);						
			createjs.Ticker.setFPS(lib.properties.fps);										
			
			createjs.Ticker.addEventListener("tick", def.stage);																				
			// def.exportRoot.instance.loop = false;																					
			def.stage.stop();				

			AdobeAn.compositionLoaded(lib.properties.id);														
		}
	}				
	
	function _dumi_story_talk(def) {			
		var p; // shortcut to reference prototypes
		var lib={};var ss={};var img={};
		lib.ssMetadata = [
				{name:def.name, frames: [[0,0,478,531],[0,533,556,437],[558,301,294,297],[480,0,322,299]]}
		];
		
		
		(lib.AnMovieClip = function(){
			this.actionFrames = [];
			this.ignorePause = false;
			this.gotoAndPlay = function(positionOrLabel){
				cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
			}
			this.play = function(){
				cjs.MovieClip.prototype.play.call(this);
			}
			this.gotoAndStop = function(positionOrLabel){
				cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
			}
			this.stop = function(){
				cjs.MovieClip.prototype.stop.call(this);
			}
		}).prototype = p = new cjs.MovieClip();
		// symbols:
		
		
		
		(lib.CachedBmp_75 = function() {
			this.initialize(ss[def.name]);
			this.gotoAndStop(0);
		}).prototype = p = new cjs.Sprite();
		
		
		
		(lib.CachedBmp_74 = function() {
			this.initialize(ss[def.name]);
			this.gotoAndStop(1);
		}).prototype = p = new cjs.Sprite();
		
		
		
		(lib.CachedBmp_73 = function() {
			this.initialize(ss[def.name]);
			this.gotoAndStop(2);
		}).prototype = p = new cjs.Sprite();
		
		
		
		(lib.CachedBmp_72 = function() {
			this.initialize(ss[def.name]);
			this.gotoAndStop(3);
		}).prototype = p = new cjs.Sprite();
		
		
		
		(lib.듬이입 = function(mode,startPosition,loop,reversed) {
		if (loop == null) { loop = true; }
		if (reversed == null) { reversed = false; }
			var props = new Object();
			props.mode = mode;
			props.startPosition = startPosition;
			props.labels = {};
			props.loop = loop;
			props.reversed = reversed;
			cjs.MovieClip.apply(this,[props]);
		
			// Layer_2
			this.shape = new cjs.Shape();
			this.shape.graphics.f("#000000").s().p("Ag4AjQgXgPAAgUQAAgUAXgPQAYgOAhAAQAgAAAYAPQAXAPAAAUQAAAUgYAPQgXAOghAAQghAAgXgPg");
			this.shape.setTransform(-0.0203,-18.2424,2.2795,2.2795);
		
			this.timeline.addTween(cjs.Tween.get(this.shape).wait(30));
		
			// Layer_1
			this.shape_1 = new cjs.Shape();
			this.shape_1.graphics.f("#000000").s().p("AhKA7QgigNgSgWQgWgbAIgjQAHgdAggDQATgCApAIQAaAFAPABQAQgBAagFQAqgIASACQAgAEAHAdQAIAigWAbQgRAWgiANQgiAMgqAAQgpAAghgMgAhvgfQgEAUANAQQANARAcAKQAcAJAhAAQAjAAAcgJQAbgKAOgRQAMgOgEgWQgCgJgQgBQgMAAgiAGQgeAHgSAAQgMAAgjgHQgfgGgNAAQgRAAgDAKg");
			this.shape_1.setTransform(-0.0239,13.388,2.2798,2.2798);
		
			this.shape_2 = new cjs.Shape();
			this.shape_2.graphics.f("#EB7D7D").s().p("AhgAfQgmgbAJgmQAGgaAtAFQAZADAxAJQAWAAA1gMQAtgFAGAaQAJAnglAaQglAZg9AAQg7AAglgZg");
			this.shape_2.setTransform(-0.2772,9.7515,2.2768,2.2768);
		
			this.shape_3 = new cjs.Shape();
			this.shape_3.graphics.f("#000000").s().p("AAAAdQg3AAglgPQgUgIgKgIQgEgFAAgGQAAgGAEgEQAEgFAHAAQAGAAAEAEIAXAMQAgAMAuAAIABAAQA8AAAkgVQAJgGAGAAQAGAAAFAFQAEAFAAAFQgBAMgLACIgCACQgSAKgRAFQghAKgsAAg");
			this.shape_3.setTransform(-0.1413,3.4151,2.2795,2.2795);
		
			this.shape_4 = new cjs.Shape();
			this.shape_4.graphics.f().s("#000000").ss(7,1,1).p("AB6AAQAABGgUAeQgbAqhLAAQhJAAgcgqQgUgeAAhGQAAhCAXghQAegqBEAAQBFAAAeAqQAXAhAABCg");
			this.shape_4.setTransform(-0.175,13.025);
		
			this.shape_5 = new cjs.Shape();
			this.shape_5.graphics.f("#EB6E69").s().p("AhlBkQgUgeAAhGQAAhCAXghQAegqBEAAQBFAAAeAqQAXAhAABCQAABGgUAeQgbAqhLAAQhJAAgcgqg");
			this.shape_5.setTransform(-0.175,13.025);
		
			this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2,p:{scaleX:2.2768,scaleY:2.2768,x:-0.2772,y:9.7515}},{t:this.shape_1}]}).to({state:[{t:this.shape_3}]},5).to({state:[{t:this.shape_5},{t:this.shape_4}]},5).to({state:[{t:this.shape_2,p:{scaleX:2.2766,scaleY:2.2766,x:-0.2932,y:9.512}},{t:this.shape_1}]},5).to({state:[{t:this.shape_3}]},5).to({state:[{t:this.shape_5},{t:this.shape_4}]},5).wait(5));
		
			this._renderFirstFrame();
		
		}).prototype = p = new cjs.MovieClip();
		p.nominalBounds = new cjs.Rectangle(-32.6,-29.6,65.2,60.3);
		
		
		(lib.듬이손2 = function(mode,startPosition,loop,reversed) {
		if (loop == null) { loop = true; }
		if (reversed == null) { reversed = false; }
			var props = new Object();
			props.mode = mode;
			props.startPosition = startPosition;
			props.labels = {};
			props.loop = loop;
			props.reversed = reversed;
			cjs.MovieClip.apply(this,[props]);
		
			// Layer_1
			this.shape = new cjs.Shape();
			this.shape.graphics.f("#000000").s().p("AjpEBIgBAAQgegdgSgYQAUgfARggIAAAAQBKiPAAi5IAAgTIgCg0IgBgRIAAAAIAAgDQBDgWAAACQAmgLAsADQAcACAgAIQAzAQAWAQIAJAGQBHAhAzBgQA3BkgOBXQgaAqgmgXQgHgLADgNQAOhCgvhUQgqhOgzgWIgFgDQgSgNgMgEQhQgjhLAZIAAAAIAAAAIABAoQAADVheCsQAbAbAjAJQAgAIA3gFQAOgBALAIQALAJABANQADAPgJAMQgKAKgOABIgvADQhXAAg6gyg");
			this.shape.setTransform(1.809,0.0078);
		
			this.shape_1 = new cjs.Shape();
			this.shape_1.graphics.f("#FFFFFF").s().p("Ag+BvQgVgLgUgfQgVghABglQAAgnAagcQBBhJBMAgIAPAJQAcAMAVAnQAWAqgHAhIh/BdIgRABQgZAAgQgJg");
			this.shape_1.setTransform(-1.7993,-0.3944,2.2784,2.2784);
		
			this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));
		
			this._renderFirstFrame();
		
		}).prototype = p = new cjs.MovieClip();
		p.nominalBounds = new cjs.Rectangle(-30.1,-30.7,60.2,61.5);
		
		
		(lib.듬이손1 = function(mode,startPosition,loop,reversed) {
		if (loop == null) { loop = true; }
		if (reversed == null) { reversed = false; }
			var props = new Object();
			props.mode = mode;
			props.startPosition = startPosition;
			props.labels = {};
			props.loop = loop;
			props.reversed = reversed;
			cjs.MovieClip.apply(this,[props]);
		
			// Layer_2
			this.shape = new cjs.Shape();
			this.shape.graphics.f("#000000").s().p("AAlENQgIgLgWglQhiirAAjXIAAgrIAEhDIBDAXQgDAfAAA4QAADlBzCmIgyAuIgFgHg");
			this.shape.setTransform(17.15,-2.25);
		
			this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
		
			// Layer_1
			this.shape_1 = new cjs.Shape();
			this.shape_1.graphics.f("#000000").s().p("AAsEwQgOgBgJgKQgJgLABgPQACgOAKgJQAMgIANABQA2AGAhgIQAigJAcgaQAagdATgbQARAfAUAdQgCARgrAlQg6AyhYAAgAkXBFIACgLQgNhXA1hkQAzhgBHghIAogVQAbgMAWgFIABAAQAegIAggDQAhAAAiAHQAoAIAaASQgCAkAAAlQgbgMgqgQQhGgWhOAiQgLAFgSANIgGADQgyAWgqBNQgvBUANBDQACAIgCAHg");
			this.shape_1.setTransform(-8,11.5,1,1,0,0,0,-6,11.5);
		
			this.shape_2 = new cjs.Shape();
			this.shape_2.graphics.f("#FFFFFF").s().p("AAKEPQisizh1ggQgQhOAzheQAvhZA/gbQASgNARgIQCthKCXCmQA6BAABBaQABBVgvBLQgtBIgwAZQgmATg6AAQgSAAgVgCg");
			this.shape_2.setTransform(1.6114,-0.3295);
		
			this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).wait(1));
		
			this._renderFirstFrame();
		
		}).prototype = p = new cjs.MovieClip();
		p.nominalBounds = new cjs.Rectangle(-30,-30.8,60,61.6);
		
		
		(lib.듬이몸 = function(mode,startPosition,loop,reversed) {
		if (loop == null) { loop = true; }
		if (reversed == null) { reversed = false; }
			var props = new Object();
			props.mode = mode;
			props.startPosition = startPosition;
			props.labels = {};
			props.loop = loop;
				props.reversed = reversed;
				cjs.MovieClip.apply(this,[props]);
			
				// Layer_1
				this.instance = new lib.CachedBmp_75();
				this.instance.setTransform(-119.65,-133,0.5,0.5);
			
				this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));
			
				this._renderFirstFrame();
			
			}).prototype = p = new cjs.MovieClip();
			p.nominalBounds = new cjs.Rectangle(-119.6,-133,239,265.5);
			
			
			(lib.듬이팔2 = function(mode,startPosition,loop,reversed) {
			if (loop == null) { loop = true; }
			if (reversed == null) { reversed = false; }
				var props = new Object();
				props.mode = mode;
				props.startPosition = startPosition;
				props.labels = {};
				props.loop = loop;
				props.reversed = reversed;
				cjs.MovieClip.apply(this,[props]);
			
				// Layer_1
				this.instance = new lib.CachedBmp_73();
				this.instance.setTransform(-73.35,-74.15,0.5,0.5);
			
				this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));
			
				this._renderFirstFrame();
			
			}).prototype = p = new cjs.MovieClip();
			p.nominalBounds = new cjs.Rectangle(-73.3,-74.1,147,148.5);
			
			
			(lib.듬이팔1 = function(mode,startPosition,loop,reversed) {
			if (loop == null) { loop = true; }
			if (reversed == null) { reversed = false; }
				var props = new Object();
				props.mode = mode;
				props.startPosition = startPosition;
				props.labels = {};
				props.loop = loop;
				props.reversed = reversed;
				cjs.MovieClip.apply(this,[props]);
			
				// Layer_1
				this.instance = new lib.CachedBmp_72();
				this.instance.setTransform(-80.4,-69.6,0.5,0.5);
			
				this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));
			
				this._renderFirstFrame();
			
			}).prototype = p = new cjs.MovieClip();
			p.nominalBounds = new cjs.Rectangle(-80.4,-69.6,161,149.5);
			
			
			(lib.듬이머리 = function(mode,startPosition,loop,reversed) {
			if (loop == null) { loop = true; }
			if (reversed == null) { reversed = false; }
				var props = new Object();
				props.mode = mode;
				props.startPosition = startPosition;
				props.labels = {};
				props.loop = loop;
				props.reversed = reversed;
				cjs.MovieClip.apply(this,[props]);
			
				// 듬이_입
				this.instance = new lib.듬이입("synched",0);
				this.instance.setTransform(-0.4,38.65);
			
				this.timeline.addTween(cjs.Tween.get(this.instance).wait(39).to({startPosition:9},0).to({_off:true},1).wait(20));
			
				// Layer_5
				this.shape = new cjs.Shape();
				this.shape.graphics.f("#000000").s().p("AAAAhIgBgBIgDAAQgRgDgGgUQgFgTAKgMIAAgBIACgCQAFgFAGgBIAGgBIABAAIAFABQATACAGAXIAAACQADANgEAKIgCADIgDAFIgEADIgBAAQgEACgJABg");
				this.shape.setTransform(-31.8415,3.256,2.2795,2.2795,0,0,180);
			
				this.shape_1 = new cjs.Shape();
				this.shape_1.graphics.f("#000000").s().p("AAAAhIgBgBIgDAAQgRgDgGgUQgFgTAKgMIAAgBIACgCQAFgFAGgBIAGgBIABAAIAFABQATACAGAXIAAACQADANgEAKIgCADIgDAFIgEADIgBAAQgEACgJABg");
				this.shape_1.setTransform(32.0915,3.256,2.2795,2.2795);
			
				this.shape_2 = new cjs.Shape();
				this.shape_2.graphics.f("#000000").s().p("AgiAXQgCgGADgFQADgGAGgCIALgDIgKgGQgFgDgBgGQgCgGAEgGQADgFAGgBQAGgBAFADIAkAYQAIAEgBAJQgCAKgJADIgoANIgEAAQgLAAgEgKg");
				this.shape_2.setTransform(-33.1533,2.2359,2.2795,2.2795);
			
				this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape,p:{scaleY:2.2795,y:3.256,skewY:180,x:-31.8415}}]}).to({state:[{t:this.shape_1},{t:this.shape,p:{scaleY:1.3815,y:3.292,skewY:180,x:-31.8415}}]},7).to({state:[{t:this.shape,p:{scaleY:2.2795,y:3.256,skewY:0,x:32.0915}},{t:this.shape_2}]},2).to({state:[{t:this.shape_1},{t:this.shape,p:{scaleY:1.3815,y:3.292,skewY:180,x:-31.8415}}]},8).to({state:[{t:this.shape_1},{t:this.shape,p:{scaleY:2.2795,y:3.256,skewY:180,x:-31.8415}}]},2).to({state:[{t:this.shape_1},{t:this.shape,p:{scaleY:2.2795,y:3.256,skewY:180,x:-31.8415}}]},20).to({state:[]},1).wait(20));
			
				// Layer_1
				this.instance_1 = new lib.CachedBmp_74();
				this.instance_1.setTransform(-139.05,-109.25,0.5,0.5);
			
				this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(39).to({_off:true},1).wait(20));
			
				this._renderFirstFrame();
			
			}).prototype = p = new cjs.MovieClip();
			p.nominalBounds = new cjs.Rectangle(-139,-109.2,278,218.5);
			
			
			(lib.dumi_story_re_talk_1 = function(mode,startPosition,loop,reversed) {
			if (loop == null) { loop = true; }
			if (reversed == null) { reversed = false; }
				var props = new Object();
				props.mode = mode;
				props.startPosition = startPosition;
				props.labels = {};
				props.loop = loop;
				props.reversed = reversed;
				cjs.MovieClip.apply(this,[props]);
			
				// 듬이_손1
				this.instance = new lib.듬이손1("synched",0);
				this.instance.setTransform(-126.7,-68.8);
			
				this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:-0.1,regY:-0.1,rotation:-3.4677,x:-129.7,y:-52.75},10).to({regX:0,regY:0,rotation:0,x:-126.7,y:-68.8},10).to({regX:-0.1,regY:-0.1,rotation:3.1962,x:-123.3,y:-67.45},10).to({regX:0,regY:0,rotation:0,x:-126.7,y:-68.8},10).wait(1));
			
				// 듬이_손2
				this.instance_1 = new lib.듬이손2("synched",0);
				this.instance_1.setTransform(126.4,-68.8);
			
				this.timeline.addTween(cjs.Tween.get(this.instance_1).to({rotation:-3.4677,x:123,y:-67.95},10).to({rotation:0,x:126.4,y:-68.8},10).to({rotation:3.1962,x:129.45,y:-53.25},10).to({rotation:0,x:126.4,y:-68.8},10).wait(1));
			
				// 듬이_머리
				this.instance_2 = new lib.듬이머리("synched",0);
				this.instance_2.setTransform(-0.05,-16.95,1,1,0,0,0,0,94.5);
			
				this.timeline.addTween(cjs.Tween.get(this.instance_2).to({rotation:-3.4677,y:-8.55,startPosition:10},10).to({rotation:0,y:-16.95,startPosition:20},10).to({regX:0.1,rotation:3.1962,x:0.4,y:-8.5,startPosition:30},10).to({regX:0,rotation:0,x:-0.05,y:-16.95,startPosition:39},10).wait(1));
			
				// 듬이_몸
				this.instance_3 = new lib.듬이몸("synched",0);
				this.instance_3.setTransform(-0.5,216.3,1,1,0,0,0,-0.1,128.2);
			
				this.timeline.addTween(cjs.Tween.get(this.instance_3).to({scaleY:0.9733,y:216.4},10).to({scaleY:1,y:216.3},10).to({scaleY:0.9733,y:216.4},10).to({scaleY:1,y:216.3},10).wait(1));
			
				// 듬이_팔1
				this.instance_4 = new lib.듬이팔1("synched",0);
				this.instance_4.setTransform(-69.95,28.8,1,1,0,0,0,10.6,48.5);
			
				this.timeline.addTween(cjs.Tween.get(this.instance_4).to({regX:10.5,regY:48.4,scaleY:0.9813,rotation:-3.7046,x:-66.55,y:34.3},10).to({regX:10.6,regY:48.5,scaleY:1,rotation:0,x:-69.95,y:28.8},10).to({regX:10.5,regY:48.4,scaleY:0.9813,rotation:3.227,x:-72.8,y:31.5},10).to({regX:10.6,regY:48.5,scaleY:1,rotation:0,x:-69.95,y:28.8},10).wait(1));
			
				// 듬이_팔2
				this.instance_5 = new lib.듬이팔2("synched",0);
				this.instance_5.setTransform(70.45,22.3,1,1,0,0,0,-17.2,37.5);
			
				this.timeline.addTween(cjs.Tween.get(this.instance_5).to({regY:37.4,scaleY:0.9813,rotation:-2.9691,x:71.1,y:22.35},10).to({regY:37.5,scaleY:1,rotation:0,x:70.45,y:22.3},10).to({scaleY:0.9813,rotation:2.9513,x:69.7,y:27.35},10).to({scaleY:1,rotation:0,x:70.45,y:22.3},10).wait(1));
			
				this._renderFirstFrame();
			
			}).prototype = p = new cjs.MovieClip();
			p.nominalBounds = new cjs.Rectangle(-165.3,-220.7,331.4,441.4);
			
			
			// stage content:
			(lib.dumi_story_talk_stage = function(mode,startPosition,loop,reversed) {
			if (loop == null) { loop = true; }
			if (reversed == null) { reversed = false; }
				var props = new Object();
				props.mode = mode;
				props.startPosition = startPosition;
				props.labels = {};
				props.loop = loop;
				props.reversed = reversed;
				cjs.MovieClip.apply(this,[props]);
			
				// dumi_story_re_talk
				this.instance = new lib.dumi_story_re_talk_1();
				this.instance.setTransform(85,119.6,0.5,0.5);
			
				this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));
			
				this._renderFirstFrame();
			
			}).prototype = p = new lib.AnMovieClip();
			p.nominalBounds = new cjs.Rectangle(89.5,124.3,76.19999999999999,105.60000000000001);
			// library properties:
			lib.properties = {
				id: def.comp,
				width: 170,
				height: 230,
				fps: 30,
				color: "#FFFFFF",
				opacity: 1.00,
				manifest: [
					{src:def.src, id:def.name}
				],
				preloads: []
			};
			
			
			
			// bootstrap callback support:
			
			(lib.Stage = function(canvas) {
				createjs.Stage.call(this, canvas);
			}).prototype = p = new createjs.Stage();
			
			p.setAutoPlay = function(autoPlay) {
				this.tickEnabled = autoPlay;
			}
			p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
			p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
			p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
			p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }
			
			p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }
			
			an.bootcompsLoaded = an.bootcompsLoaded || [];
			if(!an.bootstrapListeners) {
				an.bootstrapListeners=[];
			}
			
			an.bootstrapCallback=function(fnCallback) {
				an.bootstrapListeners.push(fnCallback);
				if(an.bootcompsLoaded.length > 0) {
					for(var i=0; i<an.bootcompsLoaded.length; ++i) {
						fnCallback(an.bootcompsLoaded[i]);
					}
				}
			};
			
			an.compositions = an.compositions || {};
			an.compositions[def.comp] = {
				getStage: function() { return exportRoot.stage; },
				getLibrary: function() { return lib; },
				getSpriteSheet: function() { return ss; },
				getImages: function() { return img; }
			};
			
			an.compositionLoaded = function(id) {
				an.bootcompsLoaded.push(id);
				for(var j=0; j<an.bootstrapListeners.length; j++) {
					an.bootstrapListeners[j](id);
				}
			}
			
			an.getComposition = function(id) {
				return an.compositions[id];
			}
			
			
			an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
				var lastW, lastH, lastS=1;		
				window.addEventListener('resize', resizeCanvas);		
				resizeCanvas();		
				function resizeCanvas() {			
					var w = lib.properties.width, h = lib.properties.height;			
					var iw = window.innerWidth, ih=window.innerHeight;			
					var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
					if(isResp) {                
						if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
							sRatio = lastS;                
						}				
						else if(!isScale) {					
							if(iw<w || ih<h)						
								sRatio = Math.min(xRatio, yRatio);				
						}				
						else if(scaleType==1) {					
							sRatio = Math.min(xRatio, yRatio);				
						}				
						else if(scaleType==2) {					
							sRatio = Math.max(xRatio, yRatio);				
						}			
					}
					domContainers[0].width = w * pRatio * sRatio;			
					domContainers[0].height = h * pRatio * sRatio;
					domContainers.forEach(function(container) {				
						container.style.width = w * sRatio + 'px';				
						container.style.height = h * sRatio + 'px';			
					});
					stage.scaleX = pRatio*sRatio;			
					stage.scaleY = pRatio*sRatio;
					lastW = iw; lastH = ih; lastS = sRatio;            
					stage.tickOnUpdate = false;            
					stage.update();            
					stage.tickOnUpdate = true;		
				}
			}
			an.handleSoundStreamOnTick = function(event) {
				if(!event.paused){
					var stageChild = stage.getChildAt(0);
					if(!stageChild.paused || stageChild.ignorePause){
						stageChild.syncStreamSounds();
					}
				}
			}
			an.handleFilterCache = function(event) {
				if(!event.paused){
					var target = event.target;
					if(target){
						if(target.filterCacheList){
							for(var index = 0; index < target.filterCacheList.length ; index++){
								var cacheInst = target.filterCacheList[index];
								if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
									cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
								}
							}
						}
					}
				}
			}							
	}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;