import { Header } from "./components/header";
import { SearchContact } from "./components/searchcontact";
import { ThemeProvider } from "./providers/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex h-screen w-screen">
        <Header />
        <SearchContact />
      </div>
    </ThemeProvider>
  );
}

export default App;
