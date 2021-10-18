import { getSession } from "next-auth/client";
export default async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    res.send({
      content: "Secret Page",
    });
  } else {
    res.send({
      error: "You need a session",
    });
  }
};
