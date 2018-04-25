$(function() {

	// 加载设置
	var defaultConfig = {color: 'white'}; // 默认配置
	chrome.storage.sync.get(defaultConfig, function(items) {
		document.body.style.backgroundColor = items.color;
	});

	// 初始化国际化
	$('#test_i18n').html(chrome.i18n.getMessage("helloWorld"));


});

$('#set').click(e => {
    alert("dd")
    etChildCookies()
});

$('#get').click(e => {
    alert(get_cookie());
});
$('#login').click(e=>{
    login()
})
$('#chrome_message').click(e=>{
    setChildCookies()
})
$('#set_jump_url').click(e=>{
    setJumpUrl()
})
$('#jump_url').click(e=>{
    jumpUrl()
})
// set cookie
function set_cookie(cookie){
    if (!chrome.cookies) {
        chrome.cookies = chrome.experimental.cookies;
    }

	chrome.cookies.set({
		'url': 'url'
	}, function() {
		get_cookie();
	})

    alert("Set cookie successfully!");
}



/**
功能实现部分
**/

// type  
const TYPE = [
    {code : '1' , todo:'getChildUrl'},
    {code : '2' , todo:''},
    {code : '3' , todo:''},

]
//设置登录后跳转页面url
function setJumpUrl(){
    chrome.storage.sync.set({'jumpUrl': 'jump.html'}, function() {
        // 通知保存完成。
        console.log('设置已保存')
      });
      
}
function jumpUrl(){
    chrome.tabs.executeScript(null,  
        {
            file:'js/jumpUrl.js',
            allFrames:true
        });
}
//改写子级cookie cookieObjArr 为对象数组[{name:'',value:''}]
function setChildCookies (cookieObjArr,childPath) {
    var cookie_str = ''
    var childPath = childPath || ''
    sendMessageByType('getChildUrl',function(response){
        chrome.cookies.getAll({url : response}, function(cookie) {
            //测试部分
            // console.log(cookie)
            // //最好知道path值 path 为 url 参数的路径部分
            // //更改测试
            // chrome.cookies.set({
            //     url:response,
            //     name:'username',
            //     path:childPath,
            //     value:'popupgengai'
            // })
            // //查看更改后的结果
            // chrome.cookies.getAll({url : response}, function(cookie) {
            //     console.log(cookie)
            // })
            cookie.map((item)=>{
                if(cookieObjArr && cookieObjArr.length){
                    cookieObjArr.map((nameItem)=>{
                        if(item.name === nameItem.name){
                            chrome.cookies.set({
                                url:response,
                                path:childPath,
                                name:item.name,
                                value:nameItem.value
                            })
                        }
                    })
                }
            })
        })
    })
}

function sendMessageByType (type,fn){
    var responseText = ''
    chrome.tabs.query({
            active:true
        }, function (tabs) {
        //消息的发送后 所有订阅者都能接收不能区分开，添加type字段判断消息发送的类型
        chrome.tabs.sendMessage(tabs[0].id,{type:type},response =>{
            fn(response)
        })
    })
}
// ^上部分为功能代码

/**
以下为测试效果代码
**/
function chrome_message(){
    chrome.tabs.query({
            active:true
        }, function (tabs) {
        //消息的发送后 所有订阅者都能接收不能区分开，添加type字段判断消息发送的类型
        chrome.tabs.sendMessage(tabs[0].id,{type:'testMessage',message:'some to send'},response =>{
            console.log(response)
        })
    })
    login();
}
// get cookie
function get_cookie() {
    var currr_url = "a";
    var cookie_str = "";
    chrome.tabs.query({active:true}, function (tabs) {
        currr_url = tabs[0].url
        chrome.cookies.getAll({url:`${currr_url}`}, function(cookie) {
            console.log(cookie)
            for(i in cookie) {
                name = cookie[i].name;
                value = cookie[i].value;
                cookie_str += (name + "=" + value + ";\n");
            }
            $('cookie').value = cookie_str;
        })
    })    
}
//可用于登录
function login() {  
    // chrome.tabs.executeScript(null,  
    //   {code:"document.getElementById('username').value = '"+username+"' "});  
    // chrome.tabs.executeScript(null,  
    //   {code:"document.getElementById('password').value = '"+password+"' "});  
    // chrome.tabs.executeScript(null,  
    //   {code:"document.getElementById('security').submit()"});  
    chrome.tabs.executeScript(null,  
    {
        file:'js/to_login.js',
        allFrames:true
    });
  // window.close();  
}