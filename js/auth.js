import { auth, db } from "./firebase.js";
import {
  signInAnonymously,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

function generateCode() {
  return Math.random()
    .toString(36)
    .substring(2, 10)
    .toUpperCase();
}

/**
 * Create anonymous account
 */
export async function createAccount() {
  const result = await signInAnonymously(auth);
  const uid = result.user.uid;

  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    await setDoc(userRef, {
      code: generateCode(),
      linkedWith: null,
      createdAt: Date.now()
    });
  }

  window.location.href = "dashboard.html";
}

/**
 * Check login state
 */
export function requireAuth(callback) {
  onAuthStateChanged(auth, user => {
    if (user) callback(user.uid);
    else window.location.href = "index.html";
  });
}
