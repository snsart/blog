/*test1*/
var model="<a>{#demo#}</a><h>{#head#}<h><p>{#info#}<p>";
var data={
	demo:"this is a demo",
	head:"this is head",
	info:"this is info"
}
function formateString(model,data){
	return model.replace(/\{#(\w+)#\}/g,function(match,key){
		return typeof data[key]===undefined?"":data[key];
	});
}

formateString(model,data);

/*test2*/

var a={
	xx:"你好11",
	callXX:function(){
		console.log(this.xx);
	}
}
a.callXX();
var b=a.callXX;
