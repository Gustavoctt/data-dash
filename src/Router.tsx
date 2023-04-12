import { Asset } from "./pages/Asset";
import { PageUnits } from "./pages/Units";
import { PageUsers } from "./pages/Users";
import { Dashboard } from "./pages/Dashboard";
import { AllAssets } from "./pages/AllAssets";
import { PageCompanies } from "./pages/Companies";
import { Route, Routes } from "react-router-dom";

export function Router() {
  return (
    <Routes>
      <Route path="/asset" element={<AllAssets />} />
      <Route path="/asset/:id" element={<Asset />} />
      <Route path="/users" element={<PageUsers />} />
      <Route path="/companies" element={<PageCompanies />} />
      <Route path="/units" element={<PageUnits />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}
