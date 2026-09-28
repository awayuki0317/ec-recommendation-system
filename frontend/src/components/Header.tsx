import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";


function Header() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="site-header">
      <Link className="site-title" to="/">
        EC Recommendation System
      </Link>

      <nav className="site-nav">
        <Link to="/">商品一覧</Link>

        {!loading && (
          <>
            {user ? (
              <>
                <span>{user.email}</span>

                <button
                  type="button"
                  onClick={handleLogout}
                >
                  ログアウト
                </button>
              </>
            ) : (
            <>
              <Link to="/login">
                ログイン
              </Link>

              <Link to="/register">
                会員登録
              </Link>
            </>
            )}
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;