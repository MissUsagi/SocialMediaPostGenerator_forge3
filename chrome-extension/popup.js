chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  var currentTab = tabs[0].url;
  var url = encodeURIComponent(currentTab);
  var iframe = document.getElementById("myFrame");
  iframe.height = 800;
  iframe.width = 400;
  iframe.src =
    "http://localhost:3000/?extension=true&url=" + url + "&isExtension=true";
  document.body.appendChild(iframe);
});
