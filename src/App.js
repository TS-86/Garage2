import "./App.css";
import { MockData } from "./components/MockData";
import { CatPage } from "./components/CatPage";

function App() {
  return (
    <div className="App font-mono">
      <MockData />
      <CatPage />
    </div>
  );
}

export default App;
