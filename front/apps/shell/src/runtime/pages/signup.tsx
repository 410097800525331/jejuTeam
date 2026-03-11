import { SignupApp } from "@front-components/auth";
import { mountIsland } from "./islandMount";

export const mountSignupRuntime = () => {
  mountIsland("jeju-signup-app", <SignupApp />);
};
