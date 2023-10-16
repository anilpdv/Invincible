import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";

function App() {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <RouterProvider router={routes}></RouterProvider>
    </MantineProvider>
  );
}

export default App;
