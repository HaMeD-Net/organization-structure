import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import TreeSelector from "./pages/tree/index";
import { changeFlag } from "./redux/treeSlice";

function App() {

  const dispatch = useDispatch()
  return <div className="App" onClick={()=> dispatch(changeFlag(false))}>
<TreeSelector />
    <Routes>
      {/* <Route path="/" element={<login/>} /> */}
    </Routes>
  </div>;
}

export default App;
