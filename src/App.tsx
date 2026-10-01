import { useState } from "react";
import { Stack, Text } from "@fluentui/react";
import "./App.css";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Persons from "./persons";

function App() {
  // koja stranica je trenutno otvorena: osobe, izvestaji ili podesavanja
  const [currentPage, setCurrentPage] = useState<string>("osobe");

  return (
    <div className="app">
      <Header />
      <Stack horizontal grow={true} className="main">
        <Navigation selectedKey={currentPage} onLinkClick={setCurrentPage} />
        <Stack.Item
          grow
          className="content"
          styles={{ root: { padding: "20px" } }}
        >
          {currentPage === "osobe" && <Persons />}
          {currentPage === "izvestaji" && (
            <Text variant="xLargePlus">Stranica za izvestaje</Text>
          )}
          {currentPage === "podesavanja" && (
            <Text variant="xLargePlus">Stranica za podesavanje</Text>
          )}
        </Stack.Item>
      </Stack>
    </div>
  );
}

export default App;
