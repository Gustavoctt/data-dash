import { Navigate, Route, Routes } from "react-router-dom";
import { Asset } from "./pages/Asset";
import { Home } from "./pages/Home";

export function Router() {
  return (
    <Routes>
      <Route path="/asset" element={<Home />} />
      <Route path="/asset/:id" element={<Asset />} />
      <Route path="*" element={<Navigate to="/asset" />} />
    </Routes>
  );
}
