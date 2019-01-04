var model="<a>{#demo#}</a><h>{#head#}<h><p>{#info#}<p>";
var data={
	demo:"this is a demo",
	head:"this is head",
	info:"this is info"
}
function formateString(model,data){
	return model.replace(/\{#(\w+)#\}/g,function(match,key){
		return typeof data[dd]===undefined?"":data[dd];
	});
}

formateString(model,data);
