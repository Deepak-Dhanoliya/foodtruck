const BASE_URL = "http://10.0.2.2:5000/api";

export const saveUser = async (data: any) => {
  const res = await fetch(`${BASE_URL}/user/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};
