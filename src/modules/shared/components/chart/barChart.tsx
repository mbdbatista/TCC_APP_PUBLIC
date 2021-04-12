import React, { useCallback, useEffect, useRef } from 'react'
import { Chart, ChartData, ChartOptions } from 'chart.js'

export interface BarChartProps {
  data: ChartData
  options: ChartOptions
}

const BarChart = ({ data, options }: BarChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const initChart = useCallback(() => {
    if (!canvasRef.current) {
      return
    }

    const barOptions = {
      ...options,
      responsive: true,
      maintainAspectRatio: true,
      legend: {
        display: false
      }
    }

    new Chart(canvasRef.current, {
      type: 'bar',
      data: data,
      options: barOptions
    })
  }, [data, options])

  useEffect(() => {
    initChart()
  }, [initChart])

  return (
    <canvas ref={canvasRef} className="bar-chart"></canvas>
  )
}

export default BarChart