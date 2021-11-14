import { sign } from "jsonwebtoken";
async function Init(fileName, type, userId) {
  await fetch("api/database/SaveNewFile", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      fileName,
      type,
      userId,
      filePath: "DB/SavedFiles/" + userId,
    }),
  });
}
export const RegNewUser = async (name, email, password, source) => {
  console.log("reg " + email);
  const starterFiles = ["starter.css", "starter.html", "starter.js"];

  const newToken = sign(email, "f1264b6d-1aa8-444f-8361-5af9b2cd3171");
  console.log("Token");
  console.log(newToken);
  const result = await fetch("/api/RegReq", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ name, email, password, source, newToken }),
  });

  const userData = await (await fetch("api/user/email?email=" + email)).json();
  console.log("USER ADATOK");
  console.log(userData);

  for (const elem of starterFiles) {
    console.log("Creating " + elem);
    const type = elem.split(".").pop();
    Init(elem, type, userData.user.id);
  }
  return await result.json();
};
