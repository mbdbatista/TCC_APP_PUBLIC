import React, { useCallback, useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import reportService from '../../../services/report/report.service'
import BarChart from '../../shared/components/chart/barChart'
import '../styles/components/pondsCreated.scss'

const PondsCreated = () => {
  const [labels, setLabels] = useState<string[]>([])
  const [values, setValues] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  const loadChartData = useCallback(async () => {
    try {
      const result = await reportService.getCreatedPonds({})
      if (result) {
        setLabels(result.data.map(e => e.title))
        setValues(result.data.map(e => e.value))
      }
    } catch (error) { }
    finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadChartData()
  }, [loadChartData])

  const data = {
    labels: labels,
    datasets: [{
      label: 'Quantidade de tanques criados no ano',
      data: values,
      backgroundColor: 'rgba(0, 177, 255, 0.5)',
      borderColor: 'rgba(0, 177, 255, 1)',
      borderWidth: 1
    }]
  }

  const options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }

  const buildLoader = () => {
    return (
      <div className="loading">
        <Loader
          type="Grid"
          visible={loading}
          height={60}
          width={60}
          color='#000000' />
      </div>
    )
  }

  return (
    <div className="ponds-created card">
      <div className="header">
        <h5>Tanques Criados</h5>
      </div>
      {loading
        ? buildLoader()
        : <BarChart data={data} options={options}></BarChart>
      }

    </div>
  )
}


export default PondsCreated