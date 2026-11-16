import { auth, db } from "./firebase.config.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";


console.log("index.js successfully load ho gayi hai!");

let isAuthenticating = false;

// 1. Security Guard: Check Login Status
onAuthStateChanged(auth, (user) => {
  if (isAuthenticating) return;

  const isDashboard = window.location.pathname.includes("dashboard.html");

  if (user) {
    console.log("User login hai:", user.email);
    if (!isDashboard) {
      window.location.href = "../dashboard/dashboard.html";
    }
  } else {
    console.log("User logout hai");
    if (isDashboard) {
      window.location.href = "../signin/signin.html";
    }
  }
});

// 2. Login Function
const login = (e) => {
  e.preventDefault();
  isAuthenticating = true;

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "../dashboard/dashboard.html";
    })
    .catch((error) => {
      alert("Login Error: " + error.message);
    })
    .finally(() => {
      isAuthenticating = false;
    });
};

// 3. Signup Function
const register = (e) => {
  e.preventDefault();
  isAuthenticating = true;

  const username = document.getElementById("register-name").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: user.email,
        uid: user.uid,
      });

      window.location.href = "../dashboard/dashboard.html";
    })
    .catch((error) => {
      alert("Signup Error: " + error.message);
    })
    .finally(() => {
      isAuthenticating = false;
    });
};

// 4. Logout Function
const logout = () => {
  signOut(auth)
    .then(() => {
      window.location.href = "../signin/signin.html";
    })
    .catch((error) => {
      alert("Logout Error: " + error.message);
    });
};

// 5. Connect Forms & Buttons
document.getElementById("login-form")?.addEventListener("submit", login);
document.getElementById("register-form")?.addEventListener("submit", register);
document.getElementById("logout-btn")?.addEventListener("click", logout);
