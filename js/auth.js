import { db } from "./firebase.js";
import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/**
 * Generate an 8-character code ONCE
 */
function generateCode() {
  return Math.random()
    .toString(36)
    .substring(2, 10)
    .toUpperCase();
}

/**
 * Create account once, reuse forever
 */
export async function createUser() {
  let userId = localStorage.getItem("userId");

  // Case 1: User already exists → load from DB
  if (userId) {
    const userRef = doc(db, "users", userId);
    const snap = await getDoc(userRef);

    if (snap.exists()) {
      localStorage.setItem("code", snap.data().code);
      return;
    }
  }

  // Case 2: New user → create account
  userId = crypto.randomUUID();
  const code = generateCode();

  await setDoc(doc(db, "users", userId), {
    code: code,
    linkedWith: null
  });

  localStorage.setItem("userId", userId);
  localStorage.setItem("code", code);
}
