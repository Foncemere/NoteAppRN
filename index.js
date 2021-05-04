import { registerRootComponent } from "expo";
import "react-native-gesture-handler";
import App from "./App";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { createStore } from "redux";
import NoteReducer from "./src/reducers/NoteReducer";
import AddNotes from "./src/screens/Note";

const Stack = createStackNavigator();
const store = createStore(NoteReducer);

const main = () => {
  return (
    //provider must be PARENT OF ALL OF ALL
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* take note of the names for the navigator */}
          <Stack.Screen name="Home" component={App} />
          <Stack.Screen name="Note" component={AddNotes} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
registerRootComponent(main);
