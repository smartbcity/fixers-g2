import { Router } from "@smartb/g2-providers";
import { Route } from "react-router-dom";
import { AditionalModulesRoutes } from "./AditionalModulesRoutes";

export const AppRouter = () => {
  return (
    <Router>
      <Route exact path="/">
        Home
      </Route>
      <AditionalModulesRoutes />
    </Router>
  );
};
