import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

const Code = () => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div>
      <pre>
        <code className="language-jsx  rounded-lg">
{`
import React, { useEffect, useState } from 'react'

type CountryData = {
    [key: string]: string;
}

const data: CountryData = {
    "Nigeria": "Abuja",
    "Ghana": "Accra",
    "South Africa": "Johannesburg",
    "USA": "Los Angeles",
    "India": "Delhi",
    "Russia": "Moscow",
    "China": "Berlin",
}

const CountryGame = () => {
    let list: string[] = Object.entries(data).flat();

    const shuffleArray = (array: string[]) => {
        let shuffledArray = array.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    const [options, setOptions] = useState<string[]>(shuffleArray(list))
    const [selected, setSelected] = useState<string[]>([])
    const [isCorrect, setIsCorrect] = useState(false)
    const [isWrong, setIsWrong] = useState(false)

    const clear = () => {
        setIsCorrect(false)
        setIsWrong(false)
        setSelected([])
    }

    const handleClick = (item: string) => {
        if (selected.length < 2 && !selected.includes(item)) {
            setSelected(prev => [...prev, item]);
        }
    }

    const control = () => {
        if (selected.length === 2) {
            const [first, second] = selected;

            if (data[first] === second || data[second] === first) {
                setIsCorrect(true)
                setTimeout(() => {
                    const filteredList = options.filter(item => !selected.includes(item))
                    setOptions(shuffleArray(filteredList))
                    clear()
                }, 1000);
            } else {
                setIsWrong(true)
                setTimeout(() => {
                    clear()
                }, 1000);
            }
        }
    }

    useEffect(() => {
        control()
    }, [selected])

    if (!options.length) {
        return (
            <h1 className="text-4xl font-bold py-40 mx-auto text-center">CONGRATULATIONS</h1>
        )
    }

    return (
        <div className='mx-auto'>
            <h3 className='text-2xl font-bold text-center pb-10'>Country Capital Game | Microsoft Frontend Interview Question</h3>

            <div className='flex gap-4 max-w-4xl flex-wrap justify-center items-center mx-auto'>
                {
                    options.map((item) => {
                        return (
                            <div className='flex-shrink-0' key={item}>
                                <button
                                    onClick={() => handleClick(item)}
                                    className={\`border border-md rounded-md py-3 px-6 
                                    \${selected.includes(item) && selected.length < 2 ? 
                                            'border-blue-500' : 
                                        selected.includes(item) && isCorrect ? 
                                            'border-[#66cc99]' : 
                                            selected.includes(item) && isWrong ? 
                                                'border-red-500' : 
                                                'border-[#414141]'}\`
                                    }>
                                    {item}
                                </button>
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex gap-6 py-10 justify-center items-center w-full">
                <button className='px-2 border rounded' onClick={clear}>Clear All</button>
                <button className='px-2 border rounded' onClick={() => {
                    clear()
                    setOptions(shuffleArray(list))
                }}>Reset</button>
            </div>
        </div>
    )
}

export default CountryGame
`}
      </code>
      </pre>
    </div>
  )
}

export default Code
