const ACCESS_TOKEN_KEY = 'access_token';

const isObject = (value: unknown): value is Record<string, unknown> => {
      const isArray = Array.isArray(value);
      const isFormData = value instanceof FormData;
      const isObject = typeof value === 'object' && value !== null;

      return !isArray && !isFormData && isObject;
};

const setAccessToken = (token: string | null) => {
      if (token) {
            sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
      } else {
            sessionStorage.removeItem(ACCESS_TOKEN_KEY);
      }
};

const getAccessToken = () => sessionStorage.getItem(ACCESS_TOKEN_KEY);

const clearAccessToken = () => sessionStorage.removeItem(ACCESS_TOKEN_KEY);

export { isObject, setAccessToken, getAccessToken, clearAccessToken };
