var tabID = '';
let status = 'false';

var sendClick = (tab) => {
    
    console.log('sendClick activated on tab ' + tab.id);
    tabID = tab.id;
    browser.tabs.sendMessage(
    tab.id,                   
    {message:  "Button clicked" }                                
  )
  toggleIcon();
};

var toggleIcon = () => {
  if (status === false) {
    browser.browserAction.setIcon({path: "icons/favicon-activated-32x32.png"});
    status = true;
  } else {
    browser.browserAction.setIcon({path: "icons/favicon-32x32.png"});
    status = false;
  }
}


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
  browser.browserAction.onClicked.addListener(sendClick);

  // when navigating to a new url
  // browser.webNavigation.onDOMContentLoaded.addListener(sendUpdated);

    // when opening a new tab
  // browser.tabs.onCreated.addListener(sendCreated);