import { LoginApp } from "@front-components/auth";
import { mountIsland } from "./islandMount";

export const mountLoginRuntime = () => {
  mountIsland("jeju-login-app", <LoginApp />);
};

