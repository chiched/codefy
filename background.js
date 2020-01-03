var tabID = '';
let status = false;

var sendClick = (tab) => {
    tabID = tab.id;
    browser.tabs.sendMessage(
    tab.id,                   
    {action:  "buttonClick" }                                
  );
  toggleIcon();
};

var toggleIcon = () => {
  if (status === false) {
    setIcon();
  } else if (status === true) {
    unsetIcon();
  }
}
var setIcon = () => {
  browser.browserAction.setIcon({path: "icons/favicon-activated-32x32.png"});
  status = true;
}
var unsetIcon = () => {
  browser.browserAction.setIcon({path: "icons/favicon-32x32.png"});
  status = false;
}
var checkStatus = (tab) => {
  browser.tabs.sendMessage(
  tab.tabId,                   
  {action:  "newTab" }                                
).then(response => {
    if (response.response === true) {
      setIcon();
    } else {
      unsetIcon();
    }
});
};

  browser.browserAction.onClicked.addListener(sendClick);
  browser.tabs.onActivated.addListener(checkStatus);

  // browser.runtime.onMessage.addListener(toggleIcon);
  // when navigating to a new url
  // browser.webNavigation.onDOMContentLoaded.addListener(sendUpdated);

    // when opening a new tab
  // browser.tabs.onCreated.addListener(sendCreated);

// var sendUpdated = (tab) => {
//   console.log('sendUpdated activated');
//   browser.tabs.sendMessage(
//     tab.tabId,                   
//   {message:  "Tab updated" }                                
// )
// };

// var sendCreated = (tab) => {
//   console.log('sendCreated activated');
//   browser.tabs.sendMessage(
//   tab.id,                   
//   {message:  "Tab created" }                                
// )
// };