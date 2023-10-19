import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import Router from "./routes";
import { queryClient } from "./queries";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ErrorBoundary>
            <Router />
          </ErrorBoundary>
        </BrowserRouter>
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;
