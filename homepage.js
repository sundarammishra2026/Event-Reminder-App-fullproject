import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// ✅ Same config (must be identical)
const firebaseConfig = {
  apiKey: "AIzaSyDPmpAh8EdnCxhhFM9pXGjHPAE2FJfU-aM",
  authDomain: "events-6b290.firebaseapp.com",
  projectId: "events-6b290",
  storageBucket: "events-6b290.appspot.com",
  messagingSenderId: "674428679933",
  appId: "1:674428679933:web:bf230921552cb4f6e47094"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
  const uid = localStorage.getItem("loggedInUserId");
  if (user && uid) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      document.getElementById("loggedUserFName").innerText = data.firstName;
      document.getElementById("loggedUserLName").innerText = data.lastName;
      document.getElementById("loggedUserEmail").innerText = data.email;
    }
  } else {
    console.warn("User not logged in or UID missing");
    window.location.href = "index.html"; // redirect if not logged in
  }
});

document.getElementById("logout").addEventListener("click", async () => {
  await signOut(auth);
  localStorage.removeItem("loggedInUserId");
  window.location.href = "index.html";
});
