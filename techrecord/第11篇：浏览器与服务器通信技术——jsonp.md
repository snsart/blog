除了使用cros实现跨域资源访问之外，另一种实现跨域资源访问的技术是借助DOM中能够执行跨域请求的功能，在不依赖XHR对象的情况下发送某种请求。比如借助<img>，<script>标签的src属性。其中最流行的是JSONP技术。

一、跨域加载脚本

先看下面一段代码:
```	
function handleResponse(response){
	alert("name:"+response.name+","+"age:"+response.age);
}
			
jsonData={
	name:"xiaoming",
	age:20
}
handleResponse(jsonData);
		
```
上例中，handleResponse方法显然是可以访问jsonData中的数据的。如果我们把上例中5-9行的脚本放在另一台服务器上，命名为json.js，通过script的src属性加载这段脚本。最终的效果和上例是等效的，如下例：

```
function handleResponse(response){
	alert("name:"+response.name+","+"age:"+response.age);
}
//跨域加载json.js脚本				
var script=document.createElement("script");
script.src="http://www.somewhere.com/json.js";
document.body.insertBefore(script,document.body.firstChild);
		
```
放在其他服务器上的json.js脚本

```				
jsonData={
	name:"xiaoming",
	age:20
}
handleResponse(jsonData);
		
```
这样就实现了跨域资源的访问；

二、什么是JSONP

通过script的src属性加载的脚本数据称为JSONP。通过分析上例中的json.js脚本，我们可以发现JSONP有两部分组成：1.json数据，比如上例的jsonData，2.回调函数，比如上例的handleResponse。也可以把JSONP理解为包含在回调函数中的json,比如：
```
handleResponse({
	name:"xiaoming",
	age:20
});
```

三、发送回调函数名

通过上例可知客户端定义的回调函数名称和服务器端jsonp中的回调函数名称必须保持一致。为了增加灵活性，即客户端可以任意定义回调函数名，我们需要请求服务时把回调函数名作为url上的查询字符串发送给服务器，服务器拿到函数名后，再生成jsonp发送回客户端。客户端代码和服务端代码如下：

客户端
```javascript
function handleResponse(response){
	alert("name:"+response.name+","+"age:"+response.age);
}
			
var script=document.createElement("script");
script.src="http://www.test.com/test/test.php?jsoncallback=handleResponse";//函数名作为查询字符串发给服务器
document.body.insertBefore(script,document.body.firstChild);	
```
服务器端php代码
```php
<?php

header('Content-type: application/json');
//获取回调函数名
$jsoncallback = htmlspecialchars($_REQUEST ['jsoncallback']);
//json数据
$json_data = '{
	"name":"xiaoming",
	"age":29
}';
//输出jsonp格式的数据
echo $jsoncallback . "(" . $json_data . ")";

?>

```

四、jsonp的优缺点

通过jsonp可以直接跨域访问响应文本，支持浏览器和服务器之间双向通信，并且不需要定义服务器上的响应头文件。使用jsonp的主要缺点是安全问题，由于jsonp是从其他域加载代码并执行，如果其它域不安全，很可能会在响应中夹带一些恶意代码。因此在使用不是自己维护的服务时，一定要保证它安全可靠。







