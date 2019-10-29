import React, { useState } from "react";
import classnames from "classnames";
import { Dot } from "react-animated-dots";

const LoginForm = props => {
  const { error, submitting, onSubmit } = props;
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      className="form"
      onSubmit={e => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
      <h2 className="form-title">Sign in</h2>
      <div className="form-body">
        <div className="form-group">
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <label htmlFor="email" className={classnames(Boolean(email) && "active")}>
            Email <span>*</span>
          </label>
        </div>
        <div className="form-group">
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <label htmlFor="password" className={classnames(Boolean(password) && "active")}>
            Password <span>*</span>
          </label>
        </div>
        {error && <div className="form-errors">{error}</div>}
        <button type="submit" className="form-submit">
          Sign in
          {submitting && <Dot>.</Dot>}
          {submitting && <Dot>.</Dot>}
          {submitting && <Dot>.</Dot>}
        </button>
      </div>
      <style jsx>{`
        .form {
          margin: 80px auto 0 auto;
          background: #212121;
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
        }
        .form-title {
          text-align: center;
          font-weight: 300;
          color: white;
          margin-top: 45px;
          margin-bottom: 45px;
        }
        .form-body {
          display: flex;
          flex-direction: column;
          padding: 0 45px 45px 45px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          margin: 0 15px 30px 15px;
          position: relative;
        }
        .form-group:last-child {
          margin-bottom: 15px;
        }
        .form-group label {
          color: rgba(255, 255, 255, 0.8);
          font-weight: 400;
          font-size: 15px;
          position: absolute;
          top: 8px;
          left: 10px;
          transition: transform 150ms ease-out, font-size 150ms ease-out;
          cursor: text;
          pointer-events: none;
        }
        .form-group label span {
          color: #2196f3;
          position: relative;
          top: -1px;
          left: -1px;
        }
        .form-group label.active {
          transform: translate(-10px, -31px);
          font-size: 12px;
          pointer-events: all;
        }
        .form-group label.active span {
          display: none;
        }
        .form-group input {
          outline: 0;
          padding: 8px;
          border: 1px solid white;
          background: transparent;
          font-size: 16px;
          color: white;
        }
        .form-group input:focus {
          border-color: white;
        }
        .form-group input:focus + label {
          color: white;
        }
        .form-errors {
          margin: -10px 15px 20px 0;
          padding: 0 15px;
          color: #f44336;
          font-size: 14px;
        }
        .form-submit {
          padding: 13px;
          color: white;
          background: #1976d2;
          margin: 0 15px;
          border: none;
          font-size: 14px;
          font-weight: 200;
          transition: filter 150ms ease-out;
          cursor: pointer;
        }
        .form-submit:hover {
          filter: brightness(0.9);
        }
      `}</style>
    </form>
  );
};

LoginForm.defaultProps = {
  error: "",
  submitting: "",
  onSubmit: () => {}
};

export default LoginForm;
