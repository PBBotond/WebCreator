import Link from "next/dist/client/link";
import { useState } from "react";
import LogPage from "../styles/LogPage.module.css";
import React, { Component } from "react";
import { signIn, signOut, useSession } from "next-auth/client";

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
          </form>
          <input
            type="button"
            value="Login"
            className={LogPage.loginBtn}
            onClick={signIn}
          ></input>
          <div className={LogPage.FormContent}>
            <Link href="/ForgetPassword">Forget Password</Link>
          </div>
        </div>
      </div>
    );
  }
}
