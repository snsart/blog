(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 1024,
	height: 768,
	fps: 24,
	color: "#FFFFFF",
	manifest: []
};



// symbols:



(lib.提交 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AjBBcQgJgJAHgIQAQgPAEgcQAAgKALAAQALAAAAANQgBAIgCAIQAJAJALADIAAgsIgqAAQgIAAAAgJIgMAHIAAA2QAAATgUAAIgEAAQgXgBAEgOQAAgIAJAAIACAAIAEAAQAGACAAgGIAAgnIgHADQgKADgDgKQgEgJAKgGIAOgFIAAgjIgNAAQgJAAAAgLQABgLAJgBIAMAAIAAgXQAAgJALgBQALABAAAJIAAAXIAHAAQAHABABALQgBALgIAAIgGAAIAAAcIAHgDQAJgBACAJIByAAQAJABABAJQgBALgJAAIgvAAIAAAKIAtAAQAJABAAAKQAAALgJAAIgtAAIAAAQIARAAIAeAAQAKAAAAAKQAAALgKAAIgPAAIgOAAIgSAAQgngCgMgOIgDADQgGAKgEADQgFAFgFAAQgDAAgDgBgABDBWQgDgLAMgEIAGgCQAmgPATgRQgQgSgFgJQgGgKAJgEQAKgFAHAJQAIAMAKAJQAHgGANgRQAHgIAKAEQAJAGgFAIQgPAVgKAJQAdAYAfAIQAMACgBAJQgDAOgOgEQgmgMghgZQgfAYgnANIgHABQgIAAgDgGgABHAGIAHgGQATgNARgYQAHgIAJAFQAHAFgFALQgeApgWAGQgQgCAHgPgADiAUIgJgKQgVgWgQgMQgKgIAHgJQAIgGAMAHQAWAQASAXQALANgIAHQgFADgDAAQgDAAgDgCgAi0gYIAAgsQgCgRASABIBUAAQARgBgCASIAAApQABATgQgCIhWAAIgDAAQgNAAACgPgAifgdIBIAAIAAgHIhIAAgAifg4IBIAAIAAgHIhIAAgABQgxQgLAAAAgLQAAgKAKgBIBFAAIgEgDQgFgDAAgFQABgJALgBQAHAAALAKQAEAGgDAFIA9AAQAJABACAKQgBALgJAAg");
	this.shape.setTransform(34.8,13.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2290B1").s().rr(-30.6,-12,61.2,24,4.4);
	this.shape_1.setTransform(34.5,13.5,1.126,1.126);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(4));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,69,27.1);


(lib.feedback = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(3));

	// 图层 1
	this.text = new cjs.Text("恭喜完成", "59px 'FZCuYuan-M03'", "#FF0000");
	this.text.textAlign = "center";
	this.text.lineHeight = 61;
	this.text.lineWidth = 279;
	this.text.setTransform(-2,-38.6);
	this.text._off = true;

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1).to({_off:false},0).wait(1).to({text:"请再想想"},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;


(lib.元件2 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.012)").s().p("AryL4IAA3vIXlAAIAAXvg");
	this.shape.setTransform(75.6,76);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,151.1,152.1);


(lib.bg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(3));

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(3,1,1).p("ADmAAQAABfhEBDQhDBEhfAAQheAAhEhEQhDhDAAhfQAAheBDhEQBEhDBeAAQBfAABDBDQBEBEAABeg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AihCiQhEhDAAhfQAAheBEhDQBDhEBeAAQBfAABDBEQBEBDAABeQAABfhEBDQhDBEhfAAQheAAhDhEg");

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#10A8FF").s().p("AihCiQhEhDAAhfQAAheBEhDQBDhEBeAAQBfAABDBEQBEBDAABeQAABfhEBDQhDBEhfAAQheAAhDhEg");

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#A3A3A3").s().p("AihCiQhEhDAAhfQAAheBEhDQBDhEBeAAQBfAABDBEQBEBDAABeQAABfhEBDQhDBEhfAAQheAAhDhEg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape}]},1).to({state:[{t:this.shape_3},{t:this.shape}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-24.5,-24.5,49,49);


(lib.刷新 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ABQBYQgJgEADgLQgIAFgHgFQgGgHAHgIQAKgMAFgOQAFgJAJAFQAIAGgDAJQgHAQgIAKQADgCAFACQANAEgBgGIAAgvIgdAAQgIgBgBgKQABgJAIAAIAdAAIAAgJIgdAAQgIgBgBgKQABgKAIgBIAPAAIgGgWIgFAAQgIAAAAgLQABgKAIgBIAbAAIAAgDIgBgCQgCgJALgCQALgBACAJIABAIIAYAAQAJAAAAAKQAAALgIABIgEAAIgDAMIgDAKIAKAAQAKABAAALQgBAJgKABIgbAAIAAAJIAcAAQAIAAABAIQgBAKgIABIgcAAIAAAyQAAAXgUAAQgJAAgMgEgABpgmIACAHIAKAAIAGgWIgWAAIAEAPgADIBPIAAhbIgPAAIAAASQgBAzgWAXQgJALgJgIQgHgJAJgLQgCAAgFgEIgHgHIgDgEQgGgJAFgGQAHgHAHAGIAOAPQAGgQAAgaIAAhAQgCgVAZACQAHAAAZgEIAPgCQAIABABAKQgBAJgIADQgVAEgWAAQgEABAAADIAAASIAyAAQAIABABAKQgBALgIABIgMAAIAABaQgBAKgKABQgLAAgBgKgAiyBNIAAhIIgHAAIgCADIAAA+QgBAIgJABQgKgBgBgIIAAhEQAAgQARAAIANAAIAAgOIgfAAQgBBCgLAgQgEAKgMgCQgJgEADgLQALghAAgxIAAgzQAAgSAPAAIBOAAQAQgBgBARIAAAdQACAQgRgBIgSAAIAAAOIAOAAQASgCAAAQIAAA/QAAAOgQAAQgNABgDgIIAAAHQAAAKgKABQgKgBgBgKgAidA7QABgDAEAAQAGAAAAgCIAAguQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBAAgBAAIgIAAgAjShAIAAAOIA+AAQABAAAAgBQABAAAAAAQAAAAAAgBQAAAAAAgBIAAgLQAAAAAAgBQAAAAAAAAQAAgBgBAAQAAAAgBAAIg7AAIgDACgAhoBSQgMgDgBgJQACgLALABIADABQAOAFgCgIIAAiGQABgLAKgBQAKABABAKIAACNQACAVgVAAQgIAAgKgDgAh2AiIAAhiQABgKAKgBQALAAAAAKIAABjQAAALgLAAQgKAAgBgLg");
	this.shape.setTransform(34,13.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2290B1").s().rr(-30.6,-12,61.2,24,4.4);
	this.shape_1.setTransform(34.5,13.5,1.126,1.126);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(4));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,69,27.1);


(lib.Island = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// 图层 2
	this.txt = new cjs.Text("8", "30px 'FZCuYuan-M03'");
	this.txt.name = "txt";
	this.txt.textAlign = "center";
	this.txt.lineHeight = 32;
	this.txt.lineWidth = 32;
	this.txt.setTransform(1.3,-16);

	this.timeline.addTween(cjs.Tween.get(this.txt).wait(1));

	// 图层 1
	this.bg = new lib.bg();

	this.timeline.addTween(cjs.Tween.get(this.bg).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-24.5,-24.5,49,49);


// stage content:
(lib.donghua = function() {
	this.initialize();

	// 图层 1
	this.text = new cjs.Text("操作提示：点击两个岛中间的空白或依次点击两个岛进行搭桥", "22px 'FZCuYuan-M03'");
	this.text.lineHeight = 24;
	this.text.lineWidth = 624;
	this.text.setTransform(26,706.1);

	this.feedback = new lib.feedback();
	this.feedback.setTransform(811.1,113.5);

	this.submit = new lib.提交();
	this.submit.setTransform(710.1,587.9,1.088,1.087);
	new cjs.ButtonHelper(this.submit, 0, 1, 2, false, new lib.提交(), 3);

	this.updateBtn = new lib.刷新();
	this.updateBtn.setTransform(838,587.9,1.088,1.087);
	new cjs.ButtonHelper(this.updateBtn, 0, 1, 2, false, new lib.刷新(), 3);

	// 图层 3
	this.bridgeCont = new lib.元件2();
	this.bridgeCont.setTransform(0.4,0,1,1,0,0,0,0.4,0);

	this.bgCont = new lib.元件2();
	this.bgCont.setTransform(0.4,0,1,1,0,0,0,0.4,0);

	this.addChild(this.bgCont,this.bridgeCont,this.updateBtn,this.submit,this.feedback,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(512,384,913,741);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;