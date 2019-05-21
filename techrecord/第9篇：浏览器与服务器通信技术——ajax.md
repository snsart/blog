一、 打开一个新的页面
window.open()
方法可接收4个参数：要加载的URL、窗口目标、一个特性字符串以及一个表示新页面是否取代浏览器历史记录中当前加载页面的布尔值。
window.location=url

二、ajax
使用BOM接口从服务器获取数据，获取的是整个页面，得到数据之后需要刷新整个页面。运用ajax技术可以无须刷新页面即可从服务器取得数据。

三. ajax的核心——XMLHttpRequest对象


1. 创建XHR对象
var xhr=new XMLHttpRequest();
2. 启动和发送请求

xhr.open("get","example.php",false);
open方法接受3个参数：要发送的请求的类型，请求的URL和表示是否异步发送请求的布尔值。URL相对于执行代码的当前页面。
xhl.send(null);
send方法接受一个参数，即要作为请求主体发送的数据。如果不需要通过请求主体发送数据，则必须传入null。

3. 处理响应
调用send()之后，请求就会被分派到服务器，等待服务器的响应。在收到响应后，响应的数据会自动填充XHR对象的属性，相关属性简介如下：
responseText:作为响应主体被返回的文本。
responseXML：如果响应内容类型为"text/xml",这个数据将保存包含响应数据的XML DOM文档。
status：响应的HTTP状态说明。一般来说，可以将HTTP状态代码200作为成功的标志，此时可以取得responseText属性的值。状态代码304表示请求的资源并没有被修改，可以使用浏览器缓存中的版本。
statusText:HTTP状态的说明。
```
xhr.open("get","example.php",false);
xhr.send(null);
if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
	alert(xhr.responseText);
}else{
	alert("失败"+xhr.responseText);
}

```
4. 异步获取数据
XHR对象有一个readyState属性，该属性表示请求/响应过程的当前活动阶段。这个属性可取的值如下：
0：未初始化。尚未调用open()方法。
1：启动。已经调用open()方法，但尚未调用send()方法。
3. 发送。已经调用send()方法，但尚未接受到响应。
3. 接受。已经接受到部分响应数据。
4. 完成。已经接受到全部响应数据，而且已经可以在客户端使用了。

只要readyState的属性值改变一次，就会触发一次readystatechange事件。
```
var xhr=new XMLHttpRequest();
xhr.onreadystatechange=function(){
	if(xhr.readyState==4){
		if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
			alert(xhr.responseText);
		}else{
			alert("失败"+xhr.responseText);
		}
	}	
};
xhr.open("get","example.php",true);
xhr.send(null);

```
调用xhr.abort()方法，XHR对象会停止触发事件。

5.get请求
get请求常用于向服务器查询某些信息，可以将查询字符串追加到url的末尾：
```
xhr.open("get","example.php?age=20&name=xiaoming",true);
```
查询字符串中每个参数的名称和值都必须使用encodeURIComponent()进行编码，然后才能放到URL的末尾。下面这个函数可以辅助向现有URL的末尾添加查询字符串参数：
```
function addURLParam(url,name,value){
	url+=(url.indexOf("?")==-1?"?":"&");
	url+=encodeURIComponent(name)+"="+encodeURIComponent(value);
	return url;
}
```
6.POST请求
POST请求，通常用于向服务器发送应该被保存的数据。POST请求的主体可以包含非常多的数据，而且格式不限。如果服务器上的PHP想通过$_POST超级全局变量获取数据，可以使用XHR来模仿表单提交：首先将Content-Type头部信息设置为application/x-www-form-urlencoded，也就是表单提交时的内容类型，其次以适当方式创建一个字符串。
```
xhr.open("post","test.php",true);
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
var data="age=20&name=dongfeng"
xhr.send(data);
```
也可以通过serialize()函数将页面中表单的数据进行序列化，然后通过XHR发送到服务器。
```
xhr.open("post","test.php",true);
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
var form=document.getElementById("user-info");
xhr.send(serialize(form));
```
与get请求相比，POST请求消耗的资源会多一些。从性能角度来看，以发送相同的数据计，Get请求的速度最多可达到POST请求的两倍。

7.FormData
FormData为序列化表单以及创建与表单格式相同的数据提供了便利。使用FromData的方便之处体现在不必明确地在XHR对象上设置请求头部。XHR对象能够识别传入的数据类型是FormData的实例，并配置适当的头部信息。
```
xhr.open("post","test.php",true);
var form=document.getElementById("user-info");
xhr.send(new FormData(form));
```
可以使用append方法向FromData对象中追加数据：
```
var data=new FormData();
data.append("name","snsart");
``

8.进度事件
有以下6个进度事件：
loadstart:在接受到响应数据的第一个字节时触发。
progress:在接受响应期间持续不断的触发。
error:在请求发生错误时触发。
abort：在因为调用abort()方法而终止连接时触发。
load：在接受到完整的响应数据时触发。
loadend:在通信完成或者触发error、abort或load事件后触发。

其中onprogress事件处理程序会接收到一个envent对象，其target属性时XHR对象，并且有三个额外的属性：lengthComputable、position和totalSize。其中，lengthComputable是一个表示进度信息是否可用的布尔值，position表示已经接收的字节数，totalSize表示根据Content-Length响应头部确定的预期字节数。有了这些数据，就可以创建一个进度指示器了：
```
xhr.onprogress=function(event){
	var divStatus=document.getElementById("status");
	if(event.lengthComputable){
		divStatus.innerHTML="接收："+event.position+"总共："+"event.tatalSize"+"字节";
	}
};
xhr.open("get","altevents.php",true);
xhr.send(null);
```

四、jQuery与Ajax
通过 jQuery AJAX 方法，您能够使用 HTTP Get 和 HTTP Post 从远程服务器上请求文本、HTML、XML 或 JSON - 同时您能够把这些外部数据直接载入网页的被选元素中。
编写常规的 AJAX 代码并不容易，因为不同的浏览器对 AJAX 的实现并不相同。这意味着您必须编写额外的代码对浏览器进行测试。不过，jQuery 团队为我们解决了这个难题，我们只需要一行简单的代码，就可以实现 AJAX 功能。
http://www.w3school.com.cn/jquery/jquery_ref_ajax.asp
