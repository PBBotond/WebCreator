import Crypt from "./encrypt";
export const loginIn = async (email, password) => {
  var encripter = new Crypt();
  console.log("auth " + email);
  password = encripter.Encrypt(password);
  console.log(password);
  const result = await fetch("/api/AuthUser", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  console.log(await result.json());
};
