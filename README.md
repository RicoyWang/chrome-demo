###介绍
   当一个父级页面通过iframe嵌入了一个子级页面时：
 - 如何通过插件设置子级cookie ，
 - 如何通过插件控制子级页面登录，
 - 登录后如何跳转



 - chrome.cookies.getAll
获取的是包括顶级页面的所有`cookie`
```
chrome.cookies.getAll({'url':"http://127.0.0.1:8887/ss/zi.html"}, function(cookie) {
        console.log(cookie)
        for(i in cookie) {
            name = cookie[i].name;
            value = cookie[i].value;
            cookie_str += (name + "=" + value + ";\n");
        }
        $('cookie').value = cookie_str;
    })
```
 ![](https://upload-images.jianshu.io/upload_images/6095375-0e60d80b01336cc3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- popup 
chrome的callback 函数并不是同步的，也可能是异步；


- 关于监听的response
```
chrome.tabs.sendMessage(tabs[0].id,'message1',function(response) {
            console.log(response);
        })
```
```
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
            sendResponse('it is OK!')
        })
```

`sendResponse`的信息会再popup那处接受，多个监听事件被一起出发时，返回的`response`只有一个