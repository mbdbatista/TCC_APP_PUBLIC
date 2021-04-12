import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { DashboardPage } from '../pages'

const HomeRoutes = () => {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/dashboard`}>
        <DashboardPage />
      </Route>
    </Switch>
  )
}

export default HomeRoutes