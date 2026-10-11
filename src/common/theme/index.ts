import { PartialTheme, ComponentsStyles, mergeStyles } from "@fluentui/react";

mergeStyles({
  selectors: {
    ":global(*)": {
      margin: 0,
      padding: 0,
    },
    ":global(html), :global(body), :global(#root)": {
      height: "100%",
    },
  },
});

const componentsStyles: ComponentsStyles = {};

export const defaultTheme: PartialTheme = {
  defaultFontStyle: {
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  palette: {
    themePrimary: "#0059aa",
    themeLighterAlt: "#f2f7fc",
    themeLighter: "#cbdff2",
    themeLight: "#a1c4e6",
    themeTertiary: "#5291cd",
    themeSecondary: "#1668b5",
    themeDarkAlt: "#004f9a",
    themeDark: "#004382",
    themeDarker: "#003160",
    neutralLighterAlt: "#faf9f8",
    neutralLighter: "#f3f2f1",
    neutralLight: "#edebe9",
    neutralQuaternaryAlt: "#e1dfdd",
    neutralQuaternary: "#d0d0d0",
    neutralTertiaryAlt: "#c8c6c4",
    neutralTertiary: "#595959",
    neutralSecondary: "#373737",
    neutralPrimaryAlt: "#2f2f2f",
    neutralPrimary: "#000000",
    neutralDark: "#151515",
    black: "#0b0b0b",
    white: "#ffffff",
  },
  components: { ...componentsStyles },
};
