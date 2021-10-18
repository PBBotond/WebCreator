import RegForm from "../components/RegForm";

/*export const getStaticProps = async () => {
   console.log("Fetching Started");
  const res = await fetch("http://127.0.0.1:3000/api/testApi");
  const data = await res.json();
  return {
    props: { data: data },
  };
};*/
export default function Register() {
  return (
    <div>
      <RegForm />
    </div>
  );
}
