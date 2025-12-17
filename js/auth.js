import { db } from "./firebase.js";
import { doc, setDoc, getDoc } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/**
 * Generate an 8-character code
 */
function generateCode() {
  return Math.random()
    .toString(36)
    .substring(2, 10)
    .toUpperCase();
}

/**
 * Create a user if one doesn't exist
 */
export async function createUser() {
  let userId = localStorage.getItem("userId");
  let code = localStorage.getItem("code");

  // If user already exists, stop
  if (userId && code) return;

  userId = crypto.randomUUID();
  code = generateCode();

  await setDoc(doc(db, "users", userId), {
    code: code,
    linkedWith: null
  });

  localStorage.setItem("userId", userId);
  localStorage.setItem("code", code);
}
