import React from 'react'
import FishBreeding from '../components/fishBreeding'
import FishSpeciesCreated from '../components/fishSpeciesCreated'
import PondsCreated from '../components/pondsCreated'
import UsersCreated from '../components/usersCreated'
import '../styles/dashboardPage.scss'

const DashboardPage = () => {
  return (
    <div className="dashboard">
      <div className="header">
        <h3>Relatórios</h3>
      </div>
      <div className="content row">
        <div className="col-md-6">
          <UsersCreated />
        </div>
        <div className="col-md-6">
          <PondsCreated />
        </div>
        <div className="col-md-6">
          <FishSpeciesCreated />
        </div>
        <div className="col-md-6">
          <FishBreeding />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage