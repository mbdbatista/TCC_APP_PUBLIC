import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { AssociateUsersProfilePage, CreateProfilePage, UpdateProfilePage, ListProfilePage } from '../pages'

const ProfileRoutes = () => {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/create`}>
        <CreateProfilePage />
      </Route>
      <Route path={`${path}/:id/users`}>
        <AssociateUsersProfilePage />
      </Route>
      <Route path={`${path}/:id`}>
        <UpdateProfilePage />
      </Route>
      <Route path={`${path}/`}>
        <ListProfilePage />
      </Route>
    </Switch>
  )
}

export default ProfileRoutes