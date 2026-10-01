import { Nav, INavStyleProps, INavStyles, INavLink } from "@fluentui/react";

// linkovi se Nav komponenti prosledjuju kao niz grupa
const navGroups = [
  {
    links: [
      { key: "osobe", name: "Osobe", url: "" },
      { key: "izvestaji", name: "Izvestaji", url: "" },
      { key: "podesavanja", name: "Podesavanja", url: "" },
    ],
  },
];

// styles je funkcija da bi se moglo pitati da li je link trenutno aktivan
const navStyles = (props: INavStyleProps): Partial<INavStyles> => ({
  link: {
    backgroundColor: props.isSelected ? "#2c3e50" : "transparent",
    borderLeft: props.isSelected
      ? "4px solid #e67e22"
      : "4px solid transparent",
    selectors: {
      // "&:after": {
      //   borderLeft: "none", // ugasi Fluent-ovu plavu liniju
      // },
      // Promenjena default hover boja na dugmetu
      ".ms-Nav-compositeLink:hover &": {
        backgroundColor: props.isSelected ? "#34495e" : "#dfe6e9",
      },
      ".ms-Nav-linkText": {
        color: props.isSelected ? "white" : "#2c3e50",
        fontWeight: props.isSelected ? "bold" : "normal",
      },
    },
  },
});

interface NavigationProps {
  selectedKey: string;
  onLinkClick: (key: string) => void;
}

function Navigation({ selectedKey, onLinkClick }: NavigationProps) {
  return (
    <div className="navigation">
      <Nav
        groups={navGroups}
        selectedKey={selectedKey}
        onLinkClick={(event?: React.MouseEvent, link?: INavLink) => {
          event?.preventDefault(); // linkovi nemaju pravi url pa ne treba da se stranica osvezava
          if (link?.key) {
            onLinkClick(link.key);
          }
        }}
        styles={navStyles}
      />
    </div>
  );
}

export default Navigation;
