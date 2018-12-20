Bridge.prototype=new createjs.Container();
function Bridge(start,end){
	
	var line=new createjs.Shape(),space=12;
	
	this.num=0;
	this.link=[start,end];

	this.init=function(){
		this.addChild(line);
		drawLine.call(this);
		drawBackGround.call(this);
	}
	
	this.init();
	
	function drawBackGround(){
		var bg=new createjs.Shape();
		this.addChild(bg);
		bg.graphics.beginFill("#ff000001");
		if(start.row==end.row){
			bg.graphics.drawRect(start.x,start.y-10,Math.abs(end.x-start.x),20);
		}else{
			bg.graphics.drawRect(start.x-10,start.y,20,Math.abs(end.y-start.y));
		}
	}
	
	function drawLine(){
		line.graphics.clear();
		if(this.num==0){
			return;
		}
		line.graphics.setStrokeStyle(4);
		line.graphics.beginStroke("#000000");
		
		if(this.num==1){
			line.graphics.moveTo(start.x,start.y);
			line.graphics.lineTo(end.x,end.y);
		}else if(this.num==2){
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
	
	this.setNum=function(num){
		var island1=this.link[0];
		var island2=this.link[1];
		island1.bridgeNum-=this.num;
		island2.bridgeNum-=this.num;
		this.num=num;
		island1.bridgeNum+=this.num;
		island2.bridgeNum+=this.num;
		drawLine.call(this);
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
	
	/*
	 * 切换桥的状态;
	 */
	
	this.switchState=function(){
		var num=this.num;
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
	
	/*
	 判断当前桥和其他桥有没有相交；
	 * */
	this.hasCross=function(bridges){
		var mid1,start1,end1,mid2,start2,end2;
		var x1=this.link[0].col;
		var y1=this.link[0].row;
		var x2=this.link[1].col;
		var y2=this.link[1].row;
		if(x1==x2){
			for(var i=0,len=bridges.length;i<len;i++){
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
}