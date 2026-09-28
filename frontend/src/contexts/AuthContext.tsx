import {
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";
  import type { ReactNode } from "react";
  
  import {
    getMe,
    login as loginApi,
  } from "../api/auth";
  import type { User } from "../api/auth";
  
  
  type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
  };
  
  
  const AuthContext = createContext<AuthContextType | undefined>(
    undefined,
  );
  
  
  export function AuthProvider({
    children,
  }: {
    children: ReactNode;
  }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function restoreLogin() {
        const token = localStorage.getItem("access_token");
  
        if (!token) {
          setLoading(false);
          return;
        }
  
        try {
          const currentUser = await getMe(token);
          setUser(currentUser);
        } catch (error) {
          console.error(error);
          localStorage.removeItem("access_token");
          setUser(null);
        } finally {
          setLoading(false);
        }
      }
  
      restoreLogin();
    }, []);
  
    async function login(
      email: string,
      password: string,
    ) {
      const result = await loginApi(email, password);
  
      localStorage.setItem(
        "access_token",
        result.access_token,
      );
  
      try {
        const currentUser = await getMe(result.access_token);
        setUser(currentUser);
      } catch (error) {
        localStorage.removeItem("access_token");
        setUser(null);
        throw error;
      }
    }
  
    function logout() {
      localStorage.removeItem("access_token");
      setUser(null);
    }
  
    return (
      <AuthContext.Provider
        value={{
          user,
          loading,
          login,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
  
  
  export function useAuth() {
    const context = useContext(AuthContext);
  
    if (context === undefined) {
      throw new Error(
        "useAuth must be used within an AuthProvider",
      );
    }
  
    return context;
  }