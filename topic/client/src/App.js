import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import Header from "./components/Header/Header.jsx";
import Page from "./components/MainPage/Page.jsx";
function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <Header />
        <Page />
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
