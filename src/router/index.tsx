import { useState, useMemo } from "react";
import { Stack, Text } from "@fluentui/react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import PersonsScreen from "../persons";

// TODO: Ukljuci react navigation biblioteku;

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState("home");

  const onChangeCurrentScreen = (key: string) => {
    setCurrentScreen(key);
  };

  const renderCurrentScreen = useMemo(() => {
    switch (currentScreen) {
      case "home":
        return <Text>Home</Text>;
      case "osobe":
        return <PersonsScreen />;
      case "izvestaji":
        return <Text>Izvestaji</Text>;
      case "podesavanja":
        return <Text>Podesavanja</Text>;
      default:
        return <Text>404 Stranica nije pronadjena</Text>;
    }
  }, [currentScreen]);

  return (
    <Stack styles={{ root: { height: "100%" } }}>
      <Header />
      <Stack
        grow={1}
        horizontal={true}
        styles={{ root: { overflow: "hidden" } }}
      >
        <Navigation
          currentScreen={currentScreen}
          onChangeScreen={onChangeCurrentScreen}
        />
        <Stack grow={1} styles={{ root: { overflow: "auto" } }}>
          {renderCurrentScreen}
        </Stack>
      </Stack>
    </Stack>
  );
};
