(function(){

var canvas, stage, root;

var close=true;
$(".demon_Btn").click(function(e){
	if(close){
		updateHandler();
	}
	close=!close;
})

function init() {
	canvas = document.getElementById("canvas");
	root = new lib.donghua()

	stage = new createjs.Stage(canvas);
	stage.addChild(root);
	stage.update();
	
	createjs.Ticker.setFPS(lib.properties.fps);
	createjs.Ticker.addEventListener("tick", stage);
	gameInit();
}

var datas=[];

var initX=80,initY=80,space=40;
var islands=[],bridges=[];
var startIsland=null;
var scale=space/50;

init();

function updateHandler(){
	for(var i=0;i<bridges.length;i++){
		bridges[i].setNum(0);
	}
	
	for(var i=0;i<islands.length;i++){
		islands[i].bg.gotoAndStop(0);
		startIsland=null;
	}
	
	root.feedback.gotoAndStop(0);
}

function gameInit(){
	
	generateIslandData(12,12,8)
	drawBackGround();
	createIslands();
	createAndAddBridges();
	root.submit.addEventListener("click",function(){
		submitHandler();
	});
	root.updateBtn.addEventListener("click",function(){
		updateHandler();
	});
}

function generateIslandData(width,height,num){
	var islands=[];
	var subBridges=[];
	
	var firstIsland=[4,6,0];
	islands.push(firstIsland);
	
	while(islands.length<num){
		console.log("bridges");
		console.log(subBridges);
		var index=Math.floor(Math.random()*islands.length);
		var start=islands[index];
		var dir=Math.floor(Math.random()*4);
		
		console.log("islands:"+islands);
		console.log("start:"+start);
		console.log("--------------------------------");
		
		var exist=getSameBridges(dir,start);
		console.log(exist);
		
		if(exist[0]>=2){
			continue;
		}else if(exist[0]>0){
			var end=exist[1];
			end[2]+=1;
			start[2]+=1;
			subBridges.push([start,end]);
			continue;
		}
		
		//up
		if(dir==0&&start[1]>0){	
			var endIndex=Math.floor(Math.random()*start[1]);
			var end=[start[0],endIndex,0]
			if(isExist(end)){
				continue;
			}
			var bridge=[start,end];
			if(hasCross(bridge)){
				continue;
			}else{
				end[2]+=1;
				start[2]+=1;
				islands.push(end);
				subBridges.push(bridge);
			}
		}
		
		//left
		if(dir==1&&start[0]<width){	
			var endIndex=start[0]+Math.floor(Math.random()*(width-start[0]));
			var end=[endIndex,start[1],0]
			if(isExist(end)){
				continue;
			}
			var bridge=[start,end];
			if(hasCross(bridge)){
				continue;
			}else{
				end[2]+=1;
				start[2]+=1;
				islands.push(end);
				subBridges.push(bridge);
			}
		}
		
		//down
		if(dir==2&&start[1]<height){	
			var endIndex=start[1]+Math.floor(Math.random()*(height-start[1]));
			var end=[start[0],endIndex,0];
			if(isExist(end)){
				continue;
			}
			var bridge=[start,end];
			if(hasCross(bridge)){
				continue;
			}else{
				end[2]+=1;
				start[2]+=1;
				islands.push(end);
				subBridges.push(bridge);
			}
		}
		
		//left
		if(dir==3&&start[0]>0){	
			var endIndex=Math.floor(Math.random()*start[0]);
			var end=[endIndex,start[1],0]
			if(isExist(end)){
				continue;
			}
			var bridge=[start,end];
			if(hasCross(bridge)){
				continue;
			}else{
				end[2]+=1;
				start[2]+=1;
				islands.push(end);
				subBridges.push(bridge);
			}
		}
	}
	
	for(var i=0;i<height;i++){
		var arr=[];
		for(var j=0;j<width;j++){
			arr.push(0);
		}
		datas.push(arr);
	}
	
	for(var index=0;index<islands.length;index++){
		datas[islands[index][1]][islands[index][0]]=islands[index][2]
	}
	
	
	function getSameBridges(dir,start){
		var num=0;
		var end=null;
		if(subBridges.length==0){
			return [num,end];
		}
		for(var i=0;i<subBridges.length;i++){
			var bridge=subBridges[i];
			if(bridge[0]==start){
				end=bridge[1];
			}else if(bridge[1]==start){
				end=bridge[0];
			}else{
				continue;
			}
			var up=(dir==0&&start[0]==end[0]&&start[1]>end[1]);
			var right=(dir==1&&start[1]==end[1]&&start[0]<end[0]);
			var down=(dir==2&&start[0]==end[0]&&start[1]<end[1]);
			var left=(dir==3&&start[1]==end[1]&&start[0]>end[0]);
			if(up||right||down||left){
				num++;
			}
		}
		return [num,end];
	}
	
	function hasCross(bridge){
		if(subBridges.length==0){
			return false;
		}
		var mid1,start1,end1,mid2,start2,end2;
		var x1=bridge[0][0];
		var y1=bridge[0][1];
		var x2=bridge[1][0];
		var y2=bridge[1][1];
		if(x1==x2){
			for(var i=0;i<subBridges.length;i++){
				var x3=subBridges[i][0][0];
				var y3=subBridges[i][0][1];
				var x4=subBridges[i][1][0];
				var y4=subBridges[i][1][1];
				if(x3==x4){
					continue;
				}
				if((x1-x3)*(x1-x4)<0&&(y3-y1)*(y3-y2)<0&&subBridges[i].num>0){
					return true;
				}
			}
		}
		
		if(y1==y2){
			for(var i=0;i<subBridges.length;i++){
				var x3=subBridges[i][0][0];
				var y3=subBridges[i][0][1];
				var x4=subBridges[i][1][0];
				var y4=subBridges[i][1][1];
				if(y3==y4){
					continue;
				}
				if((y1-y3)*(y1-y4)<0&&(x3-x1)*(x3-x2)<0&&subBridges[i].num>0){
					return true;
				}
			}
		}
		return false;
	}
	
	function isExist(island){
		for(var i=0;i<islands.length;i++){
			if(island[0]==islands[i][0]&&island[1]==islands[i][1]){
				return true;
			}
		}
		return false;
	}
}

function submitHandler(){
	for(var i=0;i<islands.length;i++){
		
		if(islands[i].bridgeNum!=islands[i].num){
			wrong();
			return;
		}
	}
	right();
	
	function wrong(){
		root.feedback.gotoAndStop(2);
	}
	
	function right(){
		root.feedback.gotoAndStop(1);
	}
}

function drawBackGround(){
	for(var row=0;row<datas.length-1;row++){
		for(var col=0;col<datas[row].length-1;col++){
			var rect=new createjs.Shape();
			rect.graphics.beginStroke("#dddddd");
			rect.graphics.drawRect(initX+col*space,initY+row*space,space,space);
			root.bgCont.addChild(rect);
		}
	}
}

function createIslands(){
	for(var row=0;row<datas.length;row++){
		for(var col=0;col<datas[row].length;col++){
			if(datas[row][col]!=0){
				var island=createjsExtend.createLibMc("Island");
				island.x=initX+col*space;
				island.y=initY+row*space;
				island.scaleX=scale;
				island.scaleY=scale;
				island.row=row;
				island.col=col;
				island.bridgeNum=0;
				island.num=datas[row][col];
				island.txt.text=island.num;
				island.addEventListener("click",function(e){
					var island=e.currentTarget;
					if(island.bridgeNum==island.num){
						return;
					}
					if(startIsland==null){
						island.bg.gotoAndStop(1);
						startIsland=island;
					}else if(startIsland==island){
						island.bg.gotoAndStop(0);
						startIsland=null;
					}else{
						var bridge=null;
						for(var i=0;i<bridges.length;i++){
							if(bridges[i].link.indexOf(startIsland)!=-1&&bridges[i].link.indexOf(island)!=-1){
								bridge=bridges[i];
								break;
							}
						}
						if(bridge==null){
							return;
						}else{
							startIsland.bg.gotoAndStop(0);
							startIsland=null;
							bridge.setState();
						}
					}
				});
				islands.push(island);
				root.addChild(island);
			}
		}
	}
}

function createAndAddBridges(){
	for(var i=0;i<islands.length-1;i++){
		var start=islands[i];
		
		for(var j=i+1;j<islands.length;j++){
			var end=islands[j];
			//left-right
			if(start.row==end.row){
				if(start.col<end.col){
					if(start.right==undefined||start.right.col>end.col){
						start.right=end;
					}
				}else{
					if(start.left==undefined||start.left.col<end.col){
						start.left=end;
					}
				}
			}
			
			//up-down
			if(start.col==end.col){
				if(start.row<end.row){
					if(start.down==undefined||start.down.row>end.row){
						start.down=end;
					}
				}else{
					if(start.up==undefined||start.up.row<end.row){
						start.up=end;
					}
				}
			}
		}
		
		if(start.left!=undefined){
			var bridge1=createBridge(start,start.left);
			bridges.push(bridge1);
			root.bridgeCont.addChild(bridge1);
		}
		if(start.right!=undefined){
			var bridge2=createBridge(start,start.right);
			bridges.push(bridge2);
			root.bridgeCont.addChild(bridge2);
		}
		if(start.up!=undefined){
			var bridge3=createBridge(start,start.up);
			bridges.push(bridge3);
			root.bridgeCont.addChild(bridge3);
		}
		if(start.down!=undefined){
			var bridge4=createBridge(start,start.down);
			bridges.push(bridge4);
			root.bridgeCont.addChild(bridge4);
		}
	}
};

function createBridge(start,end){
	var bridge=new createjs.Container();
	
	var bg=new createjs.Shape();
	bridge.addChild(bg);

	var line=new createjs.Shape();
	bridge.addChild(line);
	
	var space=12;
	bridge.num=0;
	bridge.link=[start,end];
	
	drawLine();
	drawBackGround();
	
	function drawBackGround(){
		bg.graphics.beginFill("#ff000002");
		if(start.row==end.row){
			bg.graphics.drawRect(start.x,start.y-10,Math.abs(end.x-start.x),20);
		}else{
			bg.graphics.drawRect(start.x-10,start.y,20,Math.abs(end.y-start.y));
		}
	}
	
	function drawLine(){
		line.graphics.clear();
		
		if(bridge.num==0){
			return;
		}
		line.graphics.setStrokeStyle(4);
		line.graphics.beginStroke("#000000");
		
		if(bridge.num==1){
			line.graphics.moveTo(start.x,start.y);
			line.graphics.lineTo(end.x,end.y);
		}else if(bridge.num==2){
			if(start.row==end.row){
				line.graphics.moveTo(start.x,start.y-space/2);
				line.graphics.lineTo(end.x,end.y-space/2);
				line.graphics.moveTo(start.x,start.y+space/2);
				line.graphics.lineTo(end.x,end.y+space/2);
			}else{
				line.graphics.moveTo(start.x-space/2,start.y);
				line.graphics.lineTo(end.x-space/2,end.y);
				line.graphics.moveTo(start.x+space/2,start.y);
				line.graphics.lineTo(end.x+space/2,end.y);
			}	
		}
	}
	
	bridge.setNum=function(num){
		var island1=this.link[0];
		var island2=this.link[1];
		island1.bridgeNum-=this.num;
		island2.bridgeNum-=this.num;
		this.num=num;
		island1.bridgeNum+=this.num;
		island2.bridgeNum+=this.num;
		drawLine();
		if(island1.bridgeNum==island1.num){
			island1.bg.gotoAndStop(2);
		}else{
			island1.bg.gotoAndStop(0);
		}
		if(island2.bridgeNum==island2.num){
			island2.bg.gotoAndStop(2);
		}else{
			island2.bg.gotoAndStop(0);
		}
	}
	
	bridge.addEventListener("click",function(e){
		var bridge=e.currentTarget;
		bridge.setState()
	});
	
	bridge.setState=function(){
		if(this.hasCross()){
			return;
		}
		startIsland=null;
		var num=bridge.num;
		var island1=this.link[0];
		var island2=this.link[1];
		if(island1.bridgeNum==island1.num||island2.bridgeNum==island2.num){
				num=0;
		}else{
			num++;
			if(num>2){
				num=0;
			}
		}
		this.setNum(num);	
	}
	
	bridge.hasCross=function(){
		var mid1,start1,end1,mid2,start2,end2;
		var x1=this.link[0].col;
		var y1=this.link[0].row;
		var x2=this.link[1].col;
		var y2=this.link[1].row;
		if(x1==x2){
			for(var i=0;i<bridges.length;i++){
				var x3=bridges[i].link[0].col;
				var y3=bridges[i].link[0].row;
				var x4=bridges[i].link[1].col;
				var y4=bridges[i].link[1].row;
				if(x3==x4){
					continue;
				}
				if((x1-x3)*(x1-x4)<0&&(y3-y1)*(y3-y2)<0&&bridges[i].num>0){
					return true;
				}
			}
		}
		
		if(y1==y2){
			for(var i=0;i<bridges.length;i++){
				var x3=bridges[i].link[0].col;
				var y3=bridges[i].link[0].row;
				var x4=bridges[i].link[1].col;
				var y4=bridges[i].link[1].row;
				if(y3==y4){
					continue;
				}
				if((y1-y3)*(y1-y4)<0&&(x3-x1)*(x3-x2)<0&&bridges[i].num>0){
					return true;
				}
			}
		}
		return false;
	}
	
	return bridge;
}



})();
