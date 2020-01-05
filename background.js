var setIcon = (tabId) => {
  browser.browserAction.setIcon({path: "icons/favicon-activated-32x32.png", tabId: tabId});
}

var unsetIcon = (tabId) => {
  browser.browserAction.setIcon({path: "icons/favicon-32x32.png", tabId: tabId});
}

var sendClick = (tab) => {
  browser.tabs.sendMessage(
    tab.id,                   
    {
    action:  "buttonClick", 
    tabId: tab.id 
    }                                
  );
};

var checkStatus = (tab, changeInfo) => {
  console.log('checkStatus activated');
  console.log(changeInfo);
  if (changeInfo.status === "complete") {
    browser.tabs.sendMessage(
      tab,                   
      {action:  "tabUpdated", tabId: tab }                                
    );
  }

};

 var updateIcon = (response) => {
  console.log(response);
  if (response.message === 'setIcon') {
    console.log('should fire setIcon for tab ' + response.tabId);
    setIcon(response.tabId);
  } else if (response.message === 'unSetIcon') {
    console.log('should fire unSetIcon for tab ' + response.tabId);
    unsetIcon(response.tabId);
  }
};  


  browser.browserAction.onClicked.addListener(sendClick);
  browser.tabs.onUpdated.addListener(checkStatus);
  browser.runtime.onMessage.addListener(updateIcon);