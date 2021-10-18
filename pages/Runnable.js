import { parse } from "node-html-parser";
import { ReactDOM, render } from "react";
export const getStaticProps = async () => {
  console.log("Fetching Started");
  const res = await fetch("http://127.0.0.1:3000/api/getSavedData");
  const data = await res.json();
  var separetedPage = data.data;
  /* if (data.data.includes("<body>")) {
    separetedPage = data.data.split("<body>")[1].split("</body>")[0].trim();
    separetedPage = separetedPage.replace("\r\n", "");
    // separetedPage = "<>" + separetedPage + "</>";
    console.log(separetedPage);
  }*/

  console.log(separetedPage);
  return {
    props: { data: separetedPage },
  };
};
const Runnable = ({ data }) => {
  //console.log(data);
  return <div dangerouslySetInnerHTML={{ __html: data }}></div>;
};
export default Runnable;
