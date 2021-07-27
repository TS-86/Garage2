import "./App.css";
//import { MockData } from "./components/MockData";
import { DilbertPage } from "./components/DilbertPage";
import { RobotPage } from "./components/RobotPage";
import { CatPage } from "./components/CatPage";

function App() {
  return (
    <div className="App font-mono">
      <DilbertPage />
      <RobotPage />
      <CatPage />
    </div>
  );
}

export default App;
