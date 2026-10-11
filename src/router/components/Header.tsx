import { Stack, Text } from "@fluentui/react";

const Header: React.FC = () => {
  return (
    <Stack
      horizontal={true}
      horizontalAlign="space-between"
      verticalAlign="center"
      styles={{ root: { minHeight: 50, backgroundColor: "#333", padding: 10 } }}
    >
      <Stack.Item>
        <Text styles={{ root: { color: "#fff" } }}>Evidencija osoba</Text>
      </Stack.Item>
      <Stack.Item>
        <Text styles={{ root: { color: "#fff" } }}>Logged User</Text>
      </Stack.Item>
    </Stack>
  );
};

export default Header;
