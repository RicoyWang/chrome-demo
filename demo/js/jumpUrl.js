/**
 * 
 * @authors Rico Wang
 * @date    2018-04-24 13:43:06
 * @version $Id$
 */
(function(){
    var tag  = document.getElementsByTagName('body')[0].getAttribute("name");
    if(tag && tag === 'child'){
        // console.log('send_ajax')
        turnOtherUrl()
    }else{
        // console.log('fuji_block')
    }
    function turnOtherUrl(){
        chrome.storage.sync.get("jumpUrl", function(data) {
            data['jumpUrl'] && (document.location=data['jumpUrl'])
          });
        
    }
})()
    


