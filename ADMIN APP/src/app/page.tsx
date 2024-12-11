"use client";

import { useEffect, useState } from "react";
import { defaultIcons, defaultImages } from "@/constants/icons";
import { useRouter } from "next/navigation";
import "@/app/styles.css";

export default function Index() {
  const [clientEmail, setClientEmail] = useState("");
  const [privateKeyID, setPrivateKey] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const router = useRouter();

  const serviceAccount = require("../../serviceAccount.json");
  const { private_key_id, client_email } = serviceAccount;

  useEffect(() => {
    function checkEmailAndPasswordFields() {
      if (
        clientEmail &&
        privateKeyID &&
        clientEmail.match("gserviceaccount.com")
      ) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }

    checkEmailAndPasswordFields();
  }, [clientEmail, privateKeyID]);

  function handleSignIn(event: { preventDefault: () => void }) {
    event.preventDefault();

    if (clientEmail === client_email && privateKeyID === private_key_id) {
      router.replace("/dashboard/home");
    }
  }

  return (
    <div className="signin-container">
      <div className="signin-box">
        <div className="image-container">
          <img
            src={defaultImages.loginPageBackground}
            className="login-image"
          />
        </div>

        <form className="signin-form" onSubmit={handleSignIn}>
          <h1>Welcome Back</h1>

          <div className="input-group">
            <img src={defaultIcons.email} className="input-icon" />
            <input
              type="email"
              id="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              required
              placeholder="GService Email"
              className="sign-in-input"
            />
          </div>

          <div className="input-group">
            <img src={defaultIcons.password} className="input-icon" />
            <input
              type="password"
              id="password"
              value={privateKeyID}
              onChange={(e) => setPrivateKey(e.target.value)}
              required
              placeholder="Private Key ID"
              className="sign-in-input"
            />
          </div>

          <button
            className="signin-btn"
            style={isDisabled ? { opacity: 0.25, pointerEvents: "none" } : {}}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
