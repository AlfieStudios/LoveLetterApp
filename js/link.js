import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/**
 * Link your account with someone else's code
 */
export async function linkWithCode(partnerCode) {
  const myId = localStorage.getItem("userId");

  if (!myId) {
    alert("No user found. Refresh the page.");
    return;
  }

  const usersRef = collection(db, "users");
  const snapshot = await getDocs(usersRef);

  let partnerId = null;

  snapshot.forEach(docSnap => {
    if (docSnap.data().code === partnerCode) {
      partnerId = docSnap.id;
    }
  });

  if (!partnerId) {
    alert("Code not found");
    return;
  }

  // Link both users
  await updateDoc(doc(db, "users", myId), {
    linkedWith: partnerId
  });

  await updateDoc(doc(db, "users", partnerId), {
    linkedWith: myId
  });

  // Go to messages page
  window.location.href = "messages.html";
}
