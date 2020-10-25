import { useState } from "react";

export default function LoginScreen({ ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div>
        <div>
          <label htmlFor="">Email</label>
          <input type="email" />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input type="password" />
        </div>
        <div>
          <button type="submit">Log In</button>
        </div>
      </div>
    </>
  );
}
