var sendMessage = (tab) => {
    browser.tabs.sendMessage(
    tab.id,                   
    {message:  "Button clicked" }                                
  )
};
  browser.browserAction.onClicked.addListener(sendMessage);
  browser.tabs.onUpdated.addListener(sendMessage);