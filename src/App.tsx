import { BrowserRouter } from "react-router-dom";
import { Loading } from "./hooks";
import { Router } from "./Router";
import { GlobalStyle } from "./styles/global";

function App() {
  return (
    <Loading.Provider>
      <BrowserRouter>
        <Router />
        <GlobalStyle />
      </BrowserRouter>
    </Loading.Provider>
  );
}

export default App;
