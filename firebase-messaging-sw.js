importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDwo3msu4CHeHgZNh3HZBztm3VfayjjSJw",
  authDomain: "push-notification-projec-21aab.firebaseapp.com",
  projectId: "push-notification-projec-21aab",
  storageBucket: "push-notification-projec-21aab.firebasestorage.app",
  messagingSenderId: "843513264935",
  appId: "1:843513264935:web:a45b46cfb18bf7f6d24702"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
