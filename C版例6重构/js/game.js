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

/*
 js是什么？
 * 
 * */

var datas=[
			[0,2,0,0,0,5,0,0,0,0,0,0,0,0,2],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,0,1,0,0,4,0,0,0,0,0,0,0,3,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[5,0,0,0,5,0,0,0,0,0,0,2,0,0,0],
			[0,0,2,0,0,0,4,0,0,2,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,3,0,5,0,4,0,0,0,0,4,0,5,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,2,0,0,0,1,0,0,0,0],
			[0,0,2,0,0,0,0,0,0,0,0,1,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,5,0,0,0,0,2,0,0,0],
			[2,0,0,0,0,0,0,2,0,0,0,0,0,3,0],
			[0,0,4,0,5,0,5,0,0,0,0,0,0,0,3],
];

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
	
	drawBackGround();
	createIslands();
	createBridges();
	root.submit.addEventListener("click",function(){
		submitHandler();
	});
	root.updateBtn.addEventListener("click",function(){
		updateHandler();
	});
}

function submitHandler(){
	
	if(isfinish()){
		right();
	}else{
		wrong();
	}
	
	function isfinish(){
		for(var i=0,len=islands.length;i<len;i++){
			if(islands[i].bridgeNum!=islands[i].num){
				return false;
			}
		}
		return true;
	}
	
	function wrong(){
		root.feedback.gotoAndStop(2);
	}
	
	function right(){
		root.feedback.gotoAndStop(1);
	}

}

//创建背景

function drawBackGround(){
	for(var row=0,len=datas.length-1;row<len;row++){
		for(var col=0,rowlen=datas[row].length-1;col<rowlen;col++){
			var rect=new createjs.Shape();
			rect.graphics.beginStroke("#dddddd");
			rect.graphics.drawRect(initX+col*space,initY+row*space,space,space);
			root.bgCont.addChild(rect);
		}
	}
}

//根据地图数据创建所有的岛；

function createIslands(){
	for(var row=0,len=datas.length;row<len;row++){
		for(var col=0,rowlen=datas[row].length;col<rowlen;col++){
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
					clickIslandHandler(island);
				});
				islands.push(island);
				root.addChild(island);
			}
		}
	}
}

/*
 island点击后会面临2种状态：
 1.点击的岛桥已满;
 2.点击的岛桥未满；
 ————1.第一次点击的岛(startIsland==null);
 ————2.第二次点击的岛，且和第一次点击的岛一样(startIsland!=null);
 ————3.第二次点击的岛，且和第一次点击的岛不一样(startIsland!=null)；
 ————————1.存在链接两个岛的桥，并且和其他桥未相交，则改变此桥的状态；
 ————————2.不存在链接两个岛的桥，返回；
 * */

/*
 
 * 根据输入的岛island查找桥，并改变桥的状态；
 * */

function clickIslandHandler(island){
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
		var bridge=getBridgeWith(startIsland,island);
		if(bridge instanceof Bridge&&!bridge.hasCross(bridges)){
			startIsland.bg.gotoAndStop(0);
			startIsland=null;
			bridge.switchState();
		}
	}
}
/*
 * 查找链接island1和island2的桥，若没有则返回null；
 */
function getBridgeWith(island1,island2){
	var bridge=null;
	for(var i=0,len=bridges.length;i<len;i++){
		if(bridges[i].link.indexOf(island1)!=-1&&bridges[i].link.indexOf(island2)!=-1){
			bridge=bridges[i];
			break;
		}
	}
	return bridge;
}

//根据地图上岛的数据，创建所有的桥

function createBridges(){
	for(var i=0;i<islands.length-1;i++){
		var start=islands[i];
		
		for(var j=i+1,len=islands.length;j<len;j++){//预先定义len可以优化性能，因为islands.length会查找islands所有属性和方法，复杂度为O(n)；
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
			var bridge1=new Bridge(start,start.left);
			bridge1.addEventListener("click",function(e){
				var bridge=e.currentTarget;
				if(!bridge.hasCross(bridges)){
					bridge.switchState()
				}
			});
			bridges.push(bridge1);
			root.bridgeCont.addChild(bridge1);
		}
		if(start.right!=undefined){
			var bridge2=new Bridge(start,start.right);
			bridge2.addEventListener("click",function(e){
				var bridge=e.currentTarget;
				if(!bridge.hasCross(bridges)){
					bridge.switchState()
				}
			});
			bridges.push(bridge2);
			root.bridgeCont.addChild(bridge2);
		}
		if(start.up!=undefined){
			var bridge3=new Bridge(start,start.up);
			bridge3.addEventListener("click",function(e){
				var bridge=e.currentTarget;
				if(!bridge.hasCross(bridges)){
					bridge.switchState()
				}
			});
			bridges.push(bridge3);
			root.bridgeCont.addChild(bridge3);
		}
		if(start.down!=undefined){
			var bridge4=new Bridge(start,start.down);
			bridge4.addEventListener("click",function(e){
				var bridge=e.currentTarget;
				if(!bridge.hasCross(bridges)){
					bridge.switchState()
				}
			});
			bridges.push(bridge4);
			root.bridgeCont.addChild(bridge4);
		}
	}
};

})();
