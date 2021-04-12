import React from 'react'
import { Route, Switch } from "react-router"
import { useRouteMatch } from 'react-router-dom'
import { ListFishBreedingPage, CreateFishBreedingPage } from '../pages'

const FishBreedingRoutes = () => {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/create`}>
        <CreateFishBreedingPage />
      </Route>
      <Route path={`${path}/:id`}>
        {/* <UpdateFishSpecie /> */}
      </Route>
      <Route path={`${path}/`}>
        <ListFishBreedingPage />
      </Route>
    </Switch>
  )
}

export default FishBreedingRoutes