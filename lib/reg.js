export const RegNewUser = async (name, email, password, source) => {
  console.log("reg " + email);
  console.log(name);
  const result = await fetch("/api/RegReq", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ name, email, password, source }),
  });
  return await result.json();
};
