import Link from "next/dist/client/link";
import LogPage from "../styles/LogPage.module.css";
import React, { Component } from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import { loginIn } from "../lib/auth";

export default class LoginForm extends Component {
  state = {
    email: "",
    password: "",
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  SubmitHandler = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    loginIn(email, password, "Custom");
  };
  render() {
    return (
      <div className={LogPage.container}>
        <div>
          <p className={LogPage.Title}>
            Web <span className={LogPage.loginPSubtitle}>Creator</span>
          </p>
          <form className={LogPage.FormContent} onSubmit={this.SubmitHandler}>
            <input
              type="text"
              name="email"
              placeholder="Email"
              className={LogPage.loginForm}
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={LogPage.loginForm}
              onChange={this.handleChange}
            />
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
}
