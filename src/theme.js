import { createTheme, mergeMantineTheme, DEFAULT_THEME } from "@mantine/core";

const themeOverride = createTheme({
  primaryColor: "teal",
  colorScheme: "dark",
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);
