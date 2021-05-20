import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

export default function App() {
  // must be inside of the context/store Provider
  //must use hooks, useSelector extracts data from store
  const notes = useSelector((store) => store);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {notes.length !== 0 ? (
        <FlatList
          data={notes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.noteGroup}
              //will navigate to a the Note page, also passing in the parameters of all items.
              // param will be used on second argument (navigation , *route ) in Note.js
              onPress={() => navigation.navigate("Note", { ...item })}
            >
              <Text style={styles.title}>{item.itemGiven.title}</Text>
              <Text style={styles.description}>
                {item.itemGiven.description}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text> There are no notes </Text>
      )}
      {/* the button below does not receive a parameter, hence route.param will be undefined */}
      <Button
        title="Add"
        style={styles.button}
        onPress={() => navigation.navigate("Note")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(217, 219, 222)",
    alignItems: "center",
    justifyContent: "center",
  },
  noteGroup: {
    marginTop: 20,
    backgroundColor: "#fff",
    width: 400,
    flex: 1,
    borderWidth: 1,
    borderColor: "#d9dbde",
    borderStyle: "solid",
    alignSelf: "stretch", //--- Will research more on later
  },
  title: {
    fontSize: 20,
    padding: 10,
    color: "black",
  },
  description: {
    padding: 5,
  },
  button: {
    margin: 3,
    padding: 30,
  },
});
