import { Nav } from '@fluentui/react';

// linkovi se Nav komponenti prosledjuju kao niz grupa
const navGroups = [
  {
    links: [
      { key: 'osobe', name: 'Osobe', url: '' },
      { key: 'izvestaji', name: 'Izvestaji', url: '' },
      { key: 'podesavanja', name: 'Podesavanja', url: '' },
    ],
  },
];

// styles je funkcija da bi se moglo pitati da li je link trenutno aktivan
const navStyles = (props) => ({
  link: {
    backgroundColor: props.isSelected ? '#2c3e50' : 'transparent',
    borderLeft: props.isSelected ? '4px solid #e67e22' : '4px solid transparent',
    // selectors stilizuje element unutar linka (Fluent ga inace oboji svojom bojom)
    selectors: {
      '.ms-Nav-linkText': {
        color: props.isSelected ? 'white' : '#2c3e50',
        fontWeight: props.isSelected ? 'bold' : 'normal',
      },
    },
  },
});

function Navigation() {
  return (
    <div className="navigation">
      <Nav groups={navGroups} selectedKey="osobe" styles={navStyles} />
    </div>
  );
}

export default Navigation;
