'use client'

import React, { useState } from 'react'
import './style.css'

const CHART_DATA = [
    { id: "dep-1", name: "Legal", ticketCount: 32, colour: "#3F888F" },
    { id: "dep-2", name: "Sales", ticketCount: 20, colour: "#FFA420" },
    { id: "dep-3", name: "Engineering", ticketCount: 60, colour: "#287233" },
    { id: "dep-4", name: "Manufacturing", ticketCount: 5, colour: "#4E5452" },
    { id: "dep-5", name: "Maintenance", ticketCount: 14, colour: "#642424" },
    {
      id: "dep-6",
      name: "Human Resourcing",
      ticketCount: 35,
      colour: "#1D1E33"
    },
    { id: "dep-7", name: "Events", ticketCount: 43, colour: "#E1CC4F" }
  ];

const BarChartSimulation = () => {
    let data = CHART_DATA
    let maxCount =  Math.max(...(data.map(({ticketCount}) => Number(ticketCount)))) 

    const [bar, setBar] = useState('')
    const [showChart, setShowChart] = useState(true)

    const handleClick = () => {
        setShowChart(false)
        setBar('')
        setTimeout(() => {
            setShowChart(true)
            
        }, 1000);
    }

  return (
    <main className='container py-20 flex flex-col justify-center items-center'>
        <div className="flex justify-center w-full pb-8">
            <button onClick={handleClick} type="button" className='py-2 px-4 bg-gray-800 rounded-md text-white'>Toggle</button>
        </div>

        <div className=" w-full sm:w-[800px] h-96 sm:h-[600px] bg-slate-900 text-white p-6 rounded overflow-hidden">
            <div className={` ${showChart ? 'visible translate-y-0 opacity-100' : 'invisible opacity-0 translate-y-20'} transition-all duration-300  w-full h-full  flex gap-2 justify-evenly items-end border-l border-b border-gray-400 px-2 relative`}>
                {
                    CHART_DATA.map(({id,name,ticketCount,colour},i)=>{

                        return (
                            <div onMouseOver={()=>setBar(id)}  key={id} className={` bg-[${colour}]  w-full relative`}
                                style={{
                                    backgroundColor: colour,
                                    height: (ticketCount / maxCount * 100) + '%',
                                }}
                            >
                                <div className={`absolute -top-2 min-w-full z-50 rounded-md  flex  text-center items-center bg-black text-white text-sm p-2 ${bar===id? 'opacity-100 visible' : 'opacity-0 invisible'} trabsform trainsition-all duration-300 ease-in`}>
                                    <p className='shrink-0'>{name}</p>-
                                    <p className='shrink-0'>{ticketCount}</p>
                                </div>
                            </div>
                        )
                    })
                }
                <p className='absolute left-[50%] -bottom-7'>Departments</p>
                <p className='absolute top-[50%] -left-16 -rotate-90 transform'>No. of tickets</p>
            </div>
            
        </div>
    </main>
  )
}

export default BarChartSimulation