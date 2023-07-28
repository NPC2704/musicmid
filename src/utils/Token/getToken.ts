const storage = {
  getItem: function (key: string) {
    const token: string | null = localStorage.getItem(`${key}`);

    if (!token) return false;

    return JSON.parse(token);
  },
  setItem: function (key: string, items: object | string) {
    localStorage.setItem(`${key}`, JSON.stringify(items));
  },
  remove: function (key: string) {
    localStorage.removeItem(`${key}`);
  },
};

export const getHeaderToken = () => {
  const token = storage.getItem("token") || "";

  return token
    ? {
        "authentication-token": `Bearer ${token}`,
      }
    : {};
};

export default getHeaderToken;
