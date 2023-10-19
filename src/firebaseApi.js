import db from "./firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

const addUser = (user) => {
  const userRef = collection(db, "users");
  getDocs(userRef).then((snapshot) => {
    const users = snapshot.docs.map((doc) => doc.data());
    const userExists = users.some((u) => u.uid === user.uid);
    if (!userExists) {
      addDoc(userRef, user).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      });
    }
  });
};

const addSubscriber = async (uid, subscribeData) => {
  const q = query(collection(db, "users"), where("uid", "==", uid));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    let data = doc.data();
    data.subscribers = [...data.subscribers, subscribeData];
    console.log(data);

    updateDoc(doc.ref, data);
  });
};

export { addUser, addSubscriber };
