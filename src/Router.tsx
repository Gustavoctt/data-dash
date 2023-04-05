import { Navigate, Route, Routes } from "react-router-dom";
import { Asset } from "./pages/Asset";
import { PageCompanies } from "./pages/Companies";
import { Home } from "./pages/Home";
import { PageUnits } from "./pages/Units";
import { PageUsers } from "./pages/Users";

export function Router() {
  return (
    <Routes>
      <Route path="/asset" element={<Home />} />
      <Route path="/asset/:id" element={<Asset />} />
      <Route path="/users" element={<PageUsers />} />
      <Route path="/companies" element={<PageCompanies />} />
      <Route path="/units" element={<PageUnits />} />
      <Route path="*" element={<Navigate to="/asset" />} />
    </Routes>
  );
}
