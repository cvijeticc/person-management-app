import { useCallback } from "react";
import { Nav, INavLinkGroup, INavLink } from "@fluentui/react";

const navGroups: INavLinkGroup[] = [
  {
    links: [
      { key: "osobe", name: "Osobe", url: "" },
      { key: "izvestaji", name: "Izvestaji", url: "" },
      { key: "podesavanja", name: "Podesavanja", url: "" },
    ],
  },
];

type Props = {
  currentScreen: string;
  onChangeScreen: (key: string) => void;
};

const Navigation: React.FC<Props> = ({ currentScreen, onChangeScreen }) => {
  const onLinkClick = useCallback(
    (event?: React.MouseEvent, item?: INavLink) => {
      event?.preventDefault();
      if (item?.key) {
        onChangeScreen(item.key);
      }
    },
    [onChangeScreen],
  );

  return (
    <Nav
      groups={navGroups}
      selectedKey={currentScreen}
      onLinkClick={onLinkClick}
    />
  );
};

export default Navigation;
