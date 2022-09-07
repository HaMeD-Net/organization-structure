import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import PopOver from "./components/popover/popover";
import TreeSelector from "./pages/tree/index";
import { changeFlag, treeFlag } from "./redux/treeSlice";

function App() {
  const flag = useSelector(treeFlag);

  console.log("App flag: ", flag);
  const dispatch = useDispatch();
  return (
    <div className="App">
      {flag && <PopOver />}
      <TreeSelector />
      <Routes>{/* <Route path="/" element={<login/>} /> */}</Routes>
    </div>
  );
}

export default App;
