import { createTheme, mergeMantineTheme, DEFAULT_THEME } from "@mantine/core";

const themeOverride = createTheme({
  //   fontFamily: "Poppins, sans-serif",
  //   headings: { fontFamily: "Roboto, sans-serif" },
  primaryColor: "teal",
  colorScheme: "dark",
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);
