import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { CreatePondPage, ListPondPage, UpdatePond } from '../pages'

const PondRoutes = () => {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/create`}>
        <CreatePondPage />
      </Route>
      <Route path={`${path}/:id`}>
        <UpdatePond />
      </Route>
      <Route path={`${path}/`}>
        <ListPondPage />
      </Route>
    </Switch>
  )
}

export default PondRoutes