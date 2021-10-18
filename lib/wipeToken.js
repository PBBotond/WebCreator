export const wipeToken = async () => {
  console.log("RESULT Wipe Start");
  const result = await fetch("http://localhost:3000/api/WipeToken", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  console.log("RESULT Wipe");
  console.log(result);
  return await result.json();
};
