import { useEffect } from "react";
import { isPassAuthSuccessMessage } from "../services/passBridge";
import { useAuthActions } from "../state/context";

export const SignupPassBridgeReceiver = () => {
  const actions = useAuthActions();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || !isPassAuthSuccessMessage(event.data)) {
        return;
      }

      actions.patchSignupIdentity({
        authMethod: event.data.payload.authMethod,
        birthDate: event.data.payload.birthDate,
        gender: event.data.payload.gender,
        isVerified: true,
        name: event.data.payload.name,
        phone: event.data.payload.phone,
        provider: event.data.payload.provider,
        rrnBackFirstDigit: event.data.payload.rrnBackFirstDigit,
        telecom: event.data.payload.telecom,
      });
      actions.setSignupStep(3);
      actions.resetError("signup");
      actions.setStatus("verified");
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [actions]);

  return null;
};
