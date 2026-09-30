import { Stack } from "@fluentui/react";
import "./App.css";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Persons from "./persons";

function App() {
  return (
    <div className="app">
      <Header />
      <Stack horizontal grow={true} className="main">
        <Navigation />
        <Stack.Item
          grow
          className="content"
          styles={{ root: { padding: "20px" } }}
        >
          <Persons />
        </Stack.Item>
      </Stack>
    </div>
  );
}

export default App;
