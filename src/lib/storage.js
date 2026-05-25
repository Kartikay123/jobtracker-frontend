const KEY = 'jt_auth';

export const loadAuthState = () => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
};

export const saveAuthState = (auth) => {
  try {
    localStorage.setItem(
      KEY,
      JSON.stringify({
        user: auth.user,
        token: auth.token,
      }),
    );
  } catch {
    /* quota exceeded or disabled — ignore */
  }
};

export const clearAuthState = () => {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
};
