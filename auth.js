
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

/* -----------------------
   🔴 PUT YOUR CONFIG HERE
------------------------*/
const firebaseConfig = {
  apiKey: "AIzaSyCMZeKrDeizterXGhYZrgD0s7rOxLM5Ehk",
  authDomain: "mamo-blogs.firebaseapp.com",
  projectId: "mamo-blogs",
  appId: "1:451715305858:web:88e04ee4de7402ab327f9b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* -----------------------
   SIGN UP
------------------------*/
const signupBtn = document.getElementById("signupBtn");

if (signupBtn) {
  signupBtn.addEventListener("click", async () => {
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully. You can login now.");
    } catch (err) {
      alert(err.message);
    }
  });
}

/* -----------------------
   LOGIN
------------------------*/
const loginBtn = document.getElementById("adminLoginBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "admin-dashboard.html";
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  });
}

/* -----------------------
   AUTO REDIRECT IF ALREADY LOGGED IN
------------------------*/
onAuthStateChanged(auth, (user) => {
  if (user && window.location.pathname.includes("index.html")) {
    window.location.href = "admin-dashboard.html";
  }
});
