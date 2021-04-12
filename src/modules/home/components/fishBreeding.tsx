import React, { useCallback, useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import reportService from '../../../services/report/report.service'
import BarChart from '../../shared/components/chart/barChart'
import '../styles/components/fishBreeding.scss'

const FishBreeding = () => {
  const [labels, setLabels] = useState<string[]>([])
  const [started, setStarted] = useState<number[]>([])
  const [finished, setFinished] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  const loadChartData = useCallback(async () => {
    try {
      const result = await reportService.geFishBreeding({})
      if (result) {
        setLabels(result.fishBreedingFinished.map(e => e.title))
        setStarted(result.fishBreedingStarted.map(e => e.value))
        setFinished(result.fishBreedingFinished.map(e => e.value))
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
    datasets: [
      {
        label: 'Criações de peixe iniciadas',
        data: started,
        backgroundColor: 'rgba(0, 177, 255, 0.5)',
        borderColor: 'rgba(0, 177, 255, 1)',
        borderWidth: 1
      },
      {
        label: 'Criações de peixe finalizadas',
        data: finished,
        backgroundColor: 'rgba(52, 58, 64, 0.5)',
        borderColor: 'rgba(52, 58, 64, 1)',
        borderWidth: 1
      }
    ]
  }

  const options = {
    scales: {
      yAxes: [{
        stacked: true,
        ticks: {
          beginAtZero: true
        }
      }],
      xAxes: [{
        stacked: true,
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
    <div className="fish-breeding card">
      <div className="header">
        <h5>Criação de Peixe</h5>
      </div>
      {loading
        ? buildLoader()
        : <BarChart data={data} options={options}></BarChart>
      }
    </div>
  )
}


export default FishBreeding