/* Service worker : reçoit les notifications push et ouvre la bonne page au clic.
   À placer dans public/sw.js (adresse finale : /sw.js). */

/* On n'accepte que des adresses internes au site (jamais un lien externe) */
function safeUrl(u) {
  return typeof u === "string" && /^\/(?![/\\])/.test(u) ? u : "/";
}

self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = {};
  }

  const title = String(data.title || "MauCode").slice(0, 80);
  const options = {
    body: String(data.body || "").slice(0, 300),
    icon: "/icons/mark-256.png",
    badge: "/icons/mark-128.png",
    data: { url: safeUrl(data.url) },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = new URL(safeUrl(event.notification.data?.url), self.location.origin).href;

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if (c.url === target && "focus" in c) return c.focus();
      }
      return self.clients.openWindow(target);
    })
  );
});