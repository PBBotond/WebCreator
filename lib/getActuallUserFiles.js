export const getActualUserFile = async (id) => {
  const result = await fetch("/api/database/user/" + id);
  console.log("RESULT");
  console.log(result);
  return await result.json();
};
