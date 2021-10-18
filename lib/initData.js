export const InitData = async () => {
  const result = await fetch("http://localhost:3000/api/ResetData", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  console.log("RESULT");
  console.log(result);
  return await result.json();
};
