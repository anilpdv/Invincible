import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes";

function App() {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
