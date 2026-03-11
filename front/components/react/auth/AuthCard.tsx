import type { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
}

export const AuthCard = ({ children }: AuthCardProps) => {
  return <div className="user_box inner2 login-card">{children}</div>;
};

