'use client'

import React, { useState } from 'react'
import './style.css'

const CHART_DATA = [
  { id: "dep-1", name: "Legal", ticketCount: 32, colour: "#3F888F" },
  { id: "dep-2", name: "Sales", ticketCount: 20, colour: "#FFA420" },
  { id: "dep-3", name: "Engineering", ticketCount: 60, colour: "#287233" },
  { id: "dep-4", name: "Manufacturing", ticketCount: 5, colour: "#4E5452" },
  { id: "dep-5", name: "Maintenance", ticketCount: 14, colour: "#642424" },
  { id: "dep-6", name: "Human Resourcing", ticketCount: 35, colour: "#1D1E33" },
  { id: "dep-7", name: "Events", ticketCount: 43, colour: "#E1CC4F" }
];

const BarChartWithCss = () => {
  const [bar, setBar] = useState('')
  const [showChart, setShowChart] = useState(true)

  const handleClick = () => {
    setShowChart(false)
    setBar('')
    setTimeout(() => {
      setShowChart(true)
    }, 1000)
  }

  const maxCount = Math.max(...CHART_DATA.map(({ ticketCount }) => Number(ticketCount)))

  return (
    <main className='container'>
      <div className="button-container">
        <button onClick={handleClick} type="button" className='toggle-button'>Toggle</button>
      </div>

      <div className="chart-container">
        <div className={`chart ${showChart ? 'visible' : 'hidden'}`}>
          {CHART_DATA.map(({ id, name, ticketCount, colour }) => (
            <div 
              key={id} 
              className="bar" 
              style={{ backgroundColor: colour, height: (ticketCount / maxCount * 100) + '%' }}
              onMouseOver={() => setBar(id)}
              onMouseOut={() => setBar('')}
            >
              <div className={`tooltip ${bar === id ? 'visible' : ''}`}>
                <p>{name}</p> - <p>{ticketCount}</p>
              </div>
            </div>
          ))}
          <p className='x-axis-label'>Departments</p>
          <p className='y-axis-label'>No. of tickets</p>
        </div>
      </div>
    </main>
  )
}

export default BarChartWithCss
