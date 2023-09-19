/**
 * DO NOT REMOVE FILE - Removes Old Rogue CRA Service Worker
 * 
 * 
 * This project was created in 2022 as a progressive web application using create-react-app (CRA).
 * CRA automatically added the service worker in this file, "service-worker.js".
 * In 2023, CRA was considered deprecated, 
 * and so this project was migrated to Vite and the VitePWA plugin was added for simplicity.
 * 
 * However, the VitePWA service worker is added to the bundled project behind the scenes in a different file named "sw.js".
 * Since "service-worker.js" had been deleted, but all past users had "service-worker.js" running,
 * those users would be served an old version of the website indefinitely.
 * When they would visit the website, "service-worker.js" would check for updates to the "service-worker.js" file,
 * but since the file no longer existed, it would be given a 404 error, and thus would never update itself or any project files.
 * 
 * The "sw.js" file had been served for about a month by the time this error was caught, so new users were running "sw.js".
 * Thus, "sw.js" couldn't be swapped to the name "service-worker.js" without causing the same issue but for the new users.
 * 
 * Therefore, this "service-worker.js" file had to be added back to the project, with code to terminate the old CRA service worker.
 * This fix made it so that when past users visit the website, "service-worker.js" detects updates to this file,
 * and when it gets this new code, it is terminated and fetches the updated website, which includes the new "sw.js" service worker.
 * 
 * We can never know for sure when all of the past users have returned and received the new service worker,
 * and so we must keep the file indefinitely to ensure no user gets stuck with the old service worker on an outdated version of the website.
*/

self.addEventListener("install", function(e) {
  self.skipWaiting();
});

self.addEventListener("activate", function(e) {
  self.registration.unregister()
    .then(function() {
      return self.clients.matchAll();
    })
    .then(function(clients) {
      clients.forEach(client => client.navigate(client.url))
    });
});
