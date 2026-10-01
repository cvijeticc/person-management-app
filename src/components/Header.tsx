import { Text } from '@fluentui/react';

function Header() {
  return (
    <header className="header">
      <Text variant="xLarge" styles={{ root: { color: 'white' } }}>
        Evidencija osoba
      </Text>
    </header>
  );
}

export default Header;
