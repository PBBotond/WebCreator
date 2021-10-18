export const loginIn = async (email, password, source) => {
  console.log("auth " + email);
  console.log(password);
  const result = await fetch("/api/AuthUser", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ email, password, source }),
  });
  return await result.json();
};
