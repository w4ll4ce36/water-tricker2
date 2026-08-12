self.addEventListener("install", event => {
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener("push", event => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch (_) {}
  event.waitUntil(self.registration.showNotification(
    data.title || "💧 水分管理",
    {body:data.body || "水分補給してる？", tag:data.tag || "water-reminder"}
  ));
});
self.addEventListener("message", event => {
  if (!event.data || event.data.type !== "TEST_NOTIFICATION") return;
  event.waitUntil(self.registration.showNotification("💧 水分管理", {
    body:"通知受信テスト成功！", tag:"water-test"
  }));
});
self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(clients.matchAll({type:"window",includeUncontrolled:true}).then(list=>{
    for(const client of list){if("focus" in client)return client.focus();}
    if(clients.openWindow)return clients.openWindow("./");
  }));
});
