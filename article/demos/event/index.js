console.log(1245);
function Animal(name,age){
	this.name="纳闷";
	this.age=age;
}

Animal.prototype.shout=function(word){
	console.log(word);
}

console.log(Animal.prototype);

function Bird(){
	
}

Bird.prototype=new Animal();
Bird.prototype.construcor
Bird.prototype.fly=function(){
	console.log("flying......")
}

var b1=new Bird("xiaoming",11);
b1.shout("hello worldbb");
b1.fly();
console.log(b1.name);

var ani=new Animal("animal1",10);
ani.shout("wawawa...");
console.log(ani.name);
