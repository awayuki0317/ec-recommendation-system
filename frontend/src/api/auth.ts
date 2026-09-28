const API_BASE_URL = "http://localhost:8000";

export type User = {
  id: number;
  email: string;
  is_active: boolean;
};

export type LoginResponse = {
  access_token: string;
  token_type: string;
};

export async function register(
  email: string,
  password: string,
): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("会員登録に失敗しました");
  }

  return response.json();
}

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("ログインに失敗しました");
  }

  return response.json();
}

export async function getMe(
  accessToken: string,
): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("ユーザー情報の取得に失敗しました");
  }

  return response.json();
}