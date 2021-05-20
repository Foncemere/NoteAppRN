import "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";

export function addNoteFirebase = firestore()
  .collection("notes")
  .add({
    title: "Hello World",
    description: "The description goes here uwu",
  })
  .then(() => {
    console.log("thingy added");
  });
