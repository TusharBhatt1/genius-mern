import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import ImageGeneration from "./pages/ImageGeneration";
import CodeGeneration from "./pages/CodeGeneration";
import Home from "./pages/Home";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="flex">
        <Sidebar />

        <Routes>
          <Route index element={<Home/>}/>
          <Route path={"/code"} element={<CodeGeneration />} />
          <Route path={"/image"} element={<ImageGeneration />} />
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
