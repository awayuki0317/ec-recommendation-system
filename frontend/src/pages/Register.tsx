import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { register } from "../api/auth";


function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);

    if (password !== passwordConfirm) {
      setError("パスワードが一致しません");
      return;
    }

    setLoading(true);

    try {
      await register(email, password);

      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("会員登録に失敗しました");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <div className="auth-form">
        <h1>会員登録</h1>

        <form onSubmit={handleSubmit}>
          <label>
            メールアドレス
            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />
          </label>

          <label>
            パスワード
            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />
          </label>

          <label>
            パスワード（確認）
            <input
              type="password"
              value={passwordConfirm}
              onChange={(event) =>
                setPasswordConfirm(event.target.value)
              }
              required
            />
          </label>

          {error && (
            <p className="error-message">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "登録中..." : "会員登録"}
          </button>
        </form>

        <p>
          すでにアカウントをお持ちの方は{" "}
          <Link to="/login">ログイン</Link>
        </p>
      </div>
    </main>
  );
}

export default Register;