import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { CreateUserPage, ListUsersPage, UpdateUserPage } from '../pages'

const UserRoutes = () => {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/create`}>
        <CreateUserPage />
      </Route>
      <Route path={`${path}/:id`}>
        <UpdateUserPage />
      </Route>
      <Route path={`${path}/`}>
        <ListUsersPage />
      </Route>
    </Switch>
  )
}

export default UserRoutes