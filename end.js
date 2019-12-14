
// disable all CSS
let cssStatus = true;
const toggleCss = () => {
    const cssCollection = document.styleSheets;
    if (cssStatus === true) {
        for (let i = 1; i < cssCollection.length; i++) {
            cssCollection[i].disabled = false;
            }
        cssStatus = false;
    }
    else {
        for (let i = 1; i < cssCollection.length; i++) {
        cssCollection[i].disabled = true;
        }
        var link = document.createElement('link'); 
        link.rel = 'stylesheet';  
        link.type = 'text/css'; 
        link.href = browser.runtime.getURL("style.css");
        document.documentElement.append(link); 
        cssStatus = true;
    }

}


var setFavicon = function(){
    var nodeList = document.getElementsByTagName("link");
    for (var i = 0; i < nodeList.length; i++)
    {
        if((nodeList[i].getAttribute("rel") == "icon")||(nodeList[i].getAttribute("rel") == "shortcut icon"))
        {
            nodeList[i].setAttribute("href", browser.runtime.getURL("icons/favicon.ico"));
        }
    }     
}

var test = function(mess) {console.log(mess)}; 
browser.runtime.onMessage.addListener(toggleCss);
