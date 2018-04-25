/**
 * 
 * @authors Rico Wang
 * @date    2018-04-24 13:43:06
 * @version $Id$
 */
(function(){
    //监听 popup发送的信息；
    message_listener();
    // console.log(chrome.runtime)
    var username = document.getElementById('TPL_username_1');
    var password =   document.getElementById('TPL_password_1');
    var submitStatic = document.getElementById("J_SubmitStatic");
    //判断是子页面还是父页面，子页面则操作子页面input提交请求，如果不是
    var tag  = document.getElementsByTagName('body')[0].getAttribute("name");
    if(tag && tag === 'child'){
        // 自动点击登录按钮
        clickLogin()
    }else{
        // console.log('fuji_block')
    }
    function clickLogin(){
        console.log('login_focus')
        if(submitStatic){
            //设置登录名，登录密码
            username.focus();
            username.value = "oShine";
            password.focus();
            password.value = "oShine";
            //登录
            submitStatic.focus();
            console.log('登录按钮被点击')
        }
        
    }
    /**
    popup -> 
    发送message ->  
    注入的js 监听到后执行callback -> 
    callback 的 sendResponse可以将信息回传给popup ->
    popup 中 chrome.tabs.sendMessage(,,function(response){}) response为上一步 sensendResponse传值
    注：多个回传的 response 只会接受一个 ;
    **/
    function message_listener(){
        chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
            
            if(request.type === 'login'){

            }

        })
    }

    function add_jquery(){
        var script = document.createElement("SCRIPT");
        script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
        script.type = 'text/javascript';
        document.getElementsByTagName("head")[0].appendChild(script);
    }
})()
    


