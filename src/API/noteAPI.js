import "@react-native-firebase/app";
import firestore, { firebase } from "@react-native-firebase/firestore";
import * as NoteActions from "../actions/NoteActions";
import { useDispatch, useSelector } from "react-redux";

export function addNoteFirebase(item) {
  console.log("Item Received", item);
  firestore()
    .collection("notes")
    .add({
      title: item.title,
      description: item.description,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .catch((error) => console.log(error));
}

export async function getNotesFirebase() {
  //return the list
  const returnedNotes = [];
  const snapshot = await firebase
    .firestore()
    .collection("notes")
    .orderBy("createdAt")
    .get();
  //{ id: 0, itemGiven: { title: "title", description: "hello world" } }
  snapshot.forEach((doc) => {
    returnedNotes.push({ id: doc.id, itemGiven: doc.data() });
  });
  return returnedNotes;
}

export async function deleteNoteFirebase(id) {
  firestore()
    .collection("notes")
    .doc(id)
    .delete()
    .then(() => {
      console.log("Note deleted!");
    })
    .catch((e) => {
      console.log(e);
    });
}

export async function editNoteFirebase(id, item) {
  console.log("id is: ", id);
  firestore()
    .collection("notes")
    .doc(id)
    .set({
      title: item.title,
      description: item.description,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .catch((e) => console.log(e));
}
