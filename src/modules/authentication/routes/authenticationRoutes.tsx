import React from "react"
import { Redirect, Route, Switch, useHistory } from "react-router-dom"
import { LoginPage, RegisterPage, SocialPage } from "../pages"
import logo from '../../../assets/logo.svg'
import './authenticationRoutes.scss'

const AuthenticationRoutes = () => {
  const { push } = useHistory()

  const redirectToLogin = () => {
    push('/')
  }

  return (
    <div className="authentication-routes">
      <div className="logo-content" onClick={redirectToLogin}>
        <img className="logo" alt="logo" src={logo}></img>
      </div>
      <div className="content">
        <Switch>
          <Route path="/login">
            <LoginPage></LoginPage>
          </Route>
          <Route path="/register">
            <RegisterPage></RegisterPage>
          </Route>
          <Route path="/social">
            <SocialPage></SocialPage>
          </Route>
          <Redirect to="/login" />
        </Switch>
      </div>
    </div>
  )
}
export default AuthenticationRoutes