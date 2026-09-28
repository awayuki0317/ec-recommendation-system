import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";


function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      console.error(err);

      setError(
        "メールアドレスまたはパスワードを確認してください",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <div className="auth-form">
        <h1>ログイン</h1>

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

          {error && (
            <p className="error-message">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "ログイン中..." : "ログイン"}
          </button>
        </form>

        <p>
          アカウントをお持ちでない方は{" "}
          <Link to="/register">会員登録</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;