import Link from "next/dist/client/link";
import LogPage from "../styles/LogPage.module.css";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/client";
import { loginIn } from "../lib/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/router";
import AuthContext from "../DB/ContextStore";
import { useContext } from "react";

export default function LoginForm() {
  const activeUserCont = useContext(AuthContext);
  const route = useRouter();

  // Form validation settings
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  //What happen when the client click on the Login button
  const SubmitHandler = async (event) => {
    const { email, password } = event;
    console.log("Start");
    const result = await loginIn(email, password, "Custom");
    console.log(result);
    if (result.Message === "OK") {
      activeUserCont.SetactiveUser({
        name: result.userName,
        email,
        image: "/DefaultUser.jpg",
      });
      route.push("/");
    }
  };

  //Source of the Login component
  return (
    <div className={LogPage.container}>
      <div>
        <p className={LogPage.Title}>
          Web <span className={LogPage.loginPSubtitle}>Creator</span>
        </p>
        <form
          className={LogPage.FormContent}
          onSubmit={handleSubmit(SubmitHandler)}
        >
          <input
            type="text"
            name="email"
            {...register("email")}
            placeholder="Email"
            className={LogPage.loginForm}
          />
          <div className={LogPage.invalidFeedback}>{errors.email?.message}</div>
          <input
            type="password"
            name="password"
            {...register("password")}
            placeholder="Password"
            className={LogPage.loginForm}
          />
          <div className={LogPage.invalidFeedback}>
            {errors.password?.message}
          </div>
          <input type="submit" value="Login" className={LogPage.loginBtn} />
        </form>
        <div className={LogPage.FormContent}>
          <Link href="/ForgetPassword">Forget Password</Link>
          <br />
          <input
            type="button"
            value="Login with Google"
            onClick={signIn}
            className={LogPage.loginBtn}
          />
          <div>
            <b>Don't have an account?</b>
            <br />
            <Link href="/Register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
