import { MyPageDashboardApp } from "@front-components/mypage";
import { mountIsland } from "./islandMount";

export const mountMyPageDashboardRuntime = () => {
  mountIsland("mypage-dashboard-root", <MyPageDashboardApp />);
};

