import { PassAuthApp } from "@front-components/auth";
import { mountIsland } from "./islandMount";

export const mountPassAuthRuntime = () => {
  mountIsland("jeju-pass-auth-app", <PassAuthApp />);
};
