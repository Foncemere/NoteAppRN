import React, { useState } from "react";
import { TextInput, StyleSheet, View, Button } from "react-native";
import * as NoteActions from "../actions/NoteActions";
import { useDispatch, useSelector } from "react-redux";

//navigation is is for Navigator, it is needed
//route is the details of navigation
function AddNotes({ navigation, route }) {
  // dispatch hook for function
  const dispatch = useDispatch();

  //useState for temporary placement before sending it
  const [title, settitle] = useState(route.params?.itemGiven?.title || "");
  const [description, setdescription] = useState(
    route.params?.itemGiven?.description || ""
  );

  //new dispathes
  const addNewNote = (note) => {
    dispatch(NoteActions.addNote(note));
  };
  const editNote = (id, note) => {
    dispatch(NoteActions.editNote(id, note));
  };

  const deleteNote = (id) => {
    dispatch(NoteActions.deleteNote(id));
    navigation.goBack();
  };

  function onSaveNote() {
    // because the params may be none (add note) || have the id and itemGiven (edit note)
    // dont use !== as the params may be null and it wont consider null as !==, so use !=
    if (route.params?.id != undefined) {
      //parameter (noteID, item)
      editNote(route.params.id, { title, description });
    } else {
      addNewNote({ title, description });
    }
    navigation.goBack();
  }

  return (
    <>
      {/* button for back */}
      <Button
        title="BACK"
        icon="close"
        size={25}
        color="white"
        // navigates to Home screen
        onPress={() => navigation("Home")}
        style={styles.iconButton}
      />

      <View style={styles.container}>
        <TextInput
          label="Add Note Title here"
          value={title}
          mode="outlined"
          onChangeText={settitle}
          style={styles.title}
        />
        <TextInput
          label="Add Note Description"
          value={description}
          onChangeText={setdescription}
          mode="flat"
          multiline={true}
          style={styles.text}
          scrollEnabled={true}
          returnKeyLabel="done"
          blurOnSubmit={true}
        />
        <Button
          title="Save"
          style={styles.fab}
          small
          icon="check"
          disabled={title == "" ? true : false}
          onPress={() => onSaveNote()}
        />
        <Button
          title="Delete"
          style={styles.fab}
          small
          icon="check"
          // deleteNote needs a parameter of the id
          onPress={() => deleteNote(route.params?.id)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  iconButton: {
    backgroundColor: "#219653",
    position: "absolute",
    right: 0,
    top: 40,
    margin: 10,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  text: {
    height: 300,
    fontSize: 16,
  },
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: "#219653",
  },
});

export default AddNotes;
