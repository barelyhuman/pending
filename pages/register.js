import { useState } from "react";

export default function LoginScreen({ ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <>
      <div>
        <div>
          <label htmlFor="">Email</label>
          <input type="email" onKeyUp={handleEmailChange} />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input type="password" onKeyUp={handlePasswordChange} />
        </div>
        <div>
          <label htmlFor="">Confirm Password</label>
          <input type="password" onKeyUp={handleConfirmPasswordChange} />
        </div>
        <div>
          <button type="submit">Log In</button>
        </div>
      </div>
    </>
  );
}
