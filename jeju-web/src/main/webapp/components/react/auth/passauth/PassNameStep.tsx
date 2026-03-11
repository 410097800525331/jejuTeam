import { StatusMessage } from "../StatusMessage";
import { usePassAuthController } from "../hooks/usePassAuthController";

export const PassNameStep = () => {
  const { errorMessage, goToIdentityStep, handleNameChange, passAuth } = usePassAuthController();

  return (
    <div className="pass-screen active">
      <div className="pass-input-group">
        <input id="passNameInput" onChange={handleNameChange} placeholder="이름" type="text" value={passAuth.name} />
      </div>
      <StatusMessage message={errorMessage} tone="error" />
      <button className="pass-next-btn" onClick={goToIdentityStep} type="button">
        다음
      </button>
    </div>
  );
};
