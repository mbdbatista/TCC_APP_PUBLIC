import React from 'react'
import { Route, Switch } from "react-router"
import { useRouteMatch } from 'react-router-dom'
import { CreateFishSpeciePage, ListFishSpeciesPage } from '../pages'
import UpdateFishSpecie from '../pages/updateFishSpeciePage'

const FishRoutes = () => {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/create`}>
        <CreateFishSpeciePage />
      </Route>
      <Route path={`${path}/:id`}>
        <UpdateFishSpecie />
      </Route>
      <Route path={`${path}/`}>
        <ListFishSpeciesPage />
      </Route>
    </Switch>
  )
}

export default FishRoutes