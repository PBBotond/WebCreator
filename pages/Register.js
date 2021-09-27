export const getStaticProps = async () => {
  console.log("Fetching Started");
  const res = await fetch("http://127.0.0.1:3000/api/testApi");
  const data = await res.json();
  return {
    props: { data: data },
  };
};
const Register = ({ data }) => {
  return (
    <div>
      {data.result.map((elem) => (
        <h1>{elem.filePath}</h1>
      ))}
    </div>
  );
};

export default Register;
