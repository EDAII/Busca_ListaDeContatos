import { Header } from "./components/header";
import { SearchContact } from "./components/searchcontact";
import { useLoadData } from "./hooks/useLoadData";
import { ThemeProvider } from "./providers/theme-provider";

function App() {
  const { data, loading, error } = useLoadData();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex h-screen w-screen">
        <Header />
        <SearchContact data={data} loading={loading} error={error}/>
      </div>
    </ThemeProvider>
  );
}

export default App;
