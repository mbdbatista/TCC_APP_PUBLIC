import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useLocation,
  useHistory
} from "react-router-dom";
import logo from '../assets/logo.svg'
import AuthenticationRoutes from "../modules/authentication/routes/authenticationRoutes";
import FishBreedingRoutes from "../modules/fish-breeding/routes/fish-breeding.routes";
import FishRoutes from "../modules/fish/routes/fishRoutes";
import HomeRoutes from "../modules/home/routes/homeRoutes";
import PondRoutes from "../modules/pond/routes/pondRoutes";
import ProfileRoutes from "../modules/profile/routes/profileRoutes";
import Footer from "../modules/shared/components/footer";
import UserRoutes from "../modules/user/routes/userRoutes";
import authenticationService from "../services/authentication/authentication.service";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/home">
          <LoggedRoutes />
        </Route>
        <Route path="/">
          <AuthenticationRoutes />
        </Route>
      </Switch>
    </Router>
  );
}

interface RoutesInterface {
  pathname: string,
  label: string
}

const LoggedRoutes = () => {
  const { path, url } = useRouteMatch()
  const { push } = useHistory()
  const { pathname } = useLocation()
  const [show, setShow] = useState(false)
  const buildRoutes = () => {
    const user = authenticationService.getSession()
    const routes: RoutesInterface[] = [
      {
        label: 'Perfil',
        pathname: 'profile'
      },
      {
        label: 'Usuários',
        pathname: 'user'
      },
      {
        label: 'Tanques',
        pathname: 'pond'
      },
      {
        label: 'Peixes',
        pathname: 'fish'
      },
      {
        label: 'Criação',
        pathname: 'fish-breeding'
      }
    ]

    return routes.map(item => {
      const active = `${url}/${item.pathname}` === pathname
      const customClass = active ? 'nav-item active' : 'nav-item'
      if (user && user.profile) {
        const { profile } = user
        const permission = profile.actions.find(e => e.route === item.pathname)
        if (!permission) {
          return (<div></div>)
        }
      }
      return (
        <li className={customClass} key={item.pathname}>
          <Link to={`${url}/${item.pathname}`} className="nav-link"> {item.label}</Link>
        </li>
      )
    })
  }

  const logout = () => {
    authenticationService.removeSession()
    push('/')
  }

  const handleMenu = () => {
    setShow(!show)
  }

  return (
    <div className="home">
      <nav className="navbar navbar-expand-lg navbar-dark" >
        <div className="container">
          <Link to="/home/dashboard" className="navbar-brand">
            <img src={logo} alt="logo" className="logo"></img>
          </Link>
          <button className="navbar-toggler" type="button" onClick={handleMenu}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="navbar" className={`collapse navbar-collapse ${show ? 'show' : ''}`}>
            <ul className="navbar-nav justify-content-end w-100">
              {buildRoutes()}
              <li className="nav-item">
                <Link to={`/`} className="nav-link" onClick={logout}> Sair</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        <Switch>
          <Route path={`${path}/profile`}>
            <ProfileRoutes />
          </Route>
          <Route path={`${path}/fish`}>
            <FishRoutes />
          </Route>
          <Route path={`${path}/pond`}>
            <PondRoutes />
          </Route>
          <Route path={`${path}/user`}>
            <UserRoutes />
          </Route>
          <Route path={`${path}/fish-breeding`}>
            <FishBreedingRoutes />
          </Route>
          <Route path={`${path}`}>
            <HomeRoutes />
          </Route>
        </Switch>
      </div>
      <br />
      <br />
      <br />
      <Footer></Footer>
    </div>
  )
}

export default Routes
