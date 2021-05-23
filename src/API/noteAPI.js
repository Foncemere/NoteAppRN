import "@react-native-firebase/app";
import firestore, { firebase } from "@react-native-firebase/firestore";
import * as NoteActions from "../actions/NoteActions";
import store from "../store";

//asyn needs .then
export function addNoteFirebase(item, onAddSuccess) {
  console.log("Item Received", item);
  firestore()
    .collection("notes")
    .add({
      title: item.title,
      description: item.description,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    //always accept function, this is the callback
    .then((docRef) => onAddSuccess(docRef.id))
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
      //using direct method from the store directly, not using react redux useDispatch

      store.dispatch(NoteActions.deleteThisNote(id));
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
    //using direct method from the store directly, not using react redux useDispatch
    .then(() => store.dispatch(NoteActions.editNote(id, item)))
    .catch((e) => console.log(e));
}
