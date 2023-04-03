import { Route, Routes } from "react-router-dom";
import { Asset } from "./pages/Asset";
import { Home } from "./pages/Home";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/asset/:id" element={<Asset />} />
    </Routes>
  );
}
