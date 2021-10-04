import LogPage from "../styles/LogPage.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { RegNewUser } from "../lib/reg";
import { useRouter } from "next/router";
export default function RegForm() {
  const route = useRouter();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  const SubmitHandler = async (event) => {
    const { name, email, password } = event;
    console.log(event);
    const result = await RegNewUser(name, email, password, "Custom");
    console.log(result);
    if (result.Message === "New User Created") {
      route.push("/");
    }
  };
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
            name="name"
            {...register("name")}
            placeholder="Name"
            className={LogPage.loginForm}
          />
          <div className="invalid-feedback">{errors.name?.message}</div>
          <input
            type="text"
            name="email"
            {...register("email")}
            placeholder="Email"
            className={LogPage.loginForm}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
          <input
            type="password"
            name="password"
            {...register("password")}
            placeholder="Password"
            className={LogPage.loginForm}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
          <input
            type="password"
            name="confirmPassword"
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            className={LogPage.loginForm}
          />
          <div className="invalid-feedback">
            {errors.confirmPassword?.message}
          </div>
          <input type="submit" value="Register" className={LogPage.loginBtn} />
        </form>
      </div>
    </div>
  );
}
