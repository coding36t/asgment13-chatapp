import { auth, db } from "../firebase.config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";
import { getDoc, doc } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";

// 1. Navbar mein current logged-in user ka naam show karna
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      document.getElementById("current-user-name").innerText = userDoc.data().username;
    } else {
      document.getElementById("current-user-name").innerText = user.email;
    }
  }
});

// 2. Message Send UI Preview
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");
const chatMessages = document.getElementById("chat-messages");

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = messageInput.value.trim();
  if (!text) return;

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  chatMessages.innerHTML += `
    <div class="align-self-end" style="max-width: 70%;">
      <div class="border rounded p-2 bg-primary text-white">
        <p class="mb-1">${text}</p>
        <div class="text-end small text-white-50">
          <span>${currentTime}</span>
        </div>
      </div>
    </div>
  `;

  messageInput.value = "";
  chatMessages.scrollTop = chatMessages.scrollHeight;
});
