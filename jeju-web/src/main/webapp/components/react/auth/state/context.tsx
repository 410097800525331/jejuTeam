import { createContext, useContext, useMemo, useReducer, type ReactNode } from "react";
import { createAuthActions, type AuthActions } from "./actions";
import { createAuthInitialState } from "./initialState";
import { authReducer } from "./reducer";
import type { AuthState } from "./types";

interface AuthProviderProps {
  children: ReactNode;
  savedLoginId?: string;
}

const AuthStateContext = createContext<AuthState | null>(null);
const AuthActionsContext = createContext<AuthActions | null>(null);

export const AuthProvider = ({ children, savedLoginId = "" }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, savedLoginId, createAuthInitialState);

  const actions = useMemo(() => createAuthActions(dispatch), [dispatch]);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthActionsContext.Provider value={actions}>{children}</AuthActionsContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error("useAuthState must be used within AuthProvider");
  }
  return context;
};

export const useAuthActions = () => {
  const context = useContext(AuthActionsContext);
  if (!context) {
    throw new Error("useAuthActions must be used within AuthProvider");
  }
  return context;
};
