import { AuthProvider, useAuthState } from "./state/context";
import { StepHeader } from "./StepHeader";
import { SIGNUP_STEP_ITEMS } from "./signup/data";
import { SignupDetailsStep } from "./signup/SignupDetailsStep";
import { SignupPassBridgeReceiver } from "./signup/SignupPassBridgeReceiver";
import { SignupSuccessStep } from "./signup/SignupSuccessStep";
import { SignupTermsStep } from "./signup/SignupTermsStep";
import { SignupVerifyStep } from "./signup/SignupVerifyStep";

const getSignupTitle = (step: number) => {
  if (step === 1) {
    return "약관동의";
  }

  if (step === 2) {
    return "본인인증";
  }

  if (step === 3) {
    return "정보입력";
  }

  return "가입완료";
};

const SignupContent = () => {
  const { signup } = useAuthState();

  return (
    <section className="signup-container">
      <SignupPassBridgeReceiver />
      <StepHeader currentStep={signup.step} steps={SIGNUP_STEP_ITEMS} title={getSignupTitle(signup.step)} />
      <div className="user_form">
        {signup.step === 1 ? <SignupTermsStep /> : null}
        {signup.step === 2 ? <SignupVerifyStep /> : null}
        {signup.step === 3 ? <SignupDetailsStep /> : null}
        {signup.step === 4 ? <SignupSuccessStep /> : null}
      </div>
    </section>
  );
};

export const SignupApp = () => {
  return (
    <AuthProvider>
      <SignupContent />
    </AuthProvider>
  );
};
