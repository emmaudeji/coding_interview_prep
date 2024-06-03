"use client"

/**
 * Array of array of boxes
 * 1 represents a box, 0 represents empty space
 * when a box is clicked, it is filled with a color green
 * after all the boxes are filled, it follows the same pattern to unfill the boxes automatically beginning from the first
 * while the boxes are still unfilling you cannot fill a new box
 * the unfilling of each box is after 500ms
 */
import React, { useEffect, useMemo, useState } from 'react';

// Initial grid data
const data = [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
];

const FillingTheBox2: React.FC = () => {
    const boxes = useMemo(() => data.flat(Infinity), []);
    const [filledIndexes, setFilledIndexes] = useState<number[]>([]);
    const [isUnfilling, setIsUnfilling] = useState<boolean>(false);

    // Total number of boxes that can be filled
    const totalFillableBoxes = useMemo(() => boxes.filter(box => box === 1).length, [boxes]);

    // Handles the filling of boxes
    const handleBoxClick = (index: number) => {
        if (boxes[index] === 0 || isUnfilling || filledIndexes.includes(index)) return;
        setFilledIndexes(prev => [...prev, index]);
    };

    // Unfills the boxes one by one
    const unfillBoxes = () => {
        const keys = [...filledIndexes]; // Clone the filledIndexes array to avoid modifying it directly

        const removeNextKey = () => {
            if (keys.length) {
                const currentKey = keys.shift();
                setFilledIndexes(prev => prev.filter(item => item !== currentKey));
                setTimeout(removeNextKey, 500);
            } else {
                setIsUnfilling(false);
            }
        };

        removeNextKey(); // Start the removal process
    };

    // Trigger unfilling when all boxes are filled
    useEffect(() => {
        if (filledIndexes.length === totalFillableBoxes) {
            setIsUnfilling(true);
            setTimeout(() => {
                unfillBoxes();
            }, 100);
        }
    }, [filledIndexes, totalFillableBoxes]);

    console.log({ filledIndexes, totalFillableBoxes });

    return (
        <section className='py-20 mx-auto max-w-2xl flex'>
            <div className="grid grid-cols-3 gap-3">
                {boxes.map((box, index) => (
                    <div
                        key={index}
                        onClick={() => handleBoxClick(index)}
                        className={`w-14 h-14 border transform transition-all duration-300
                            ${box === 0 ? 'invisible' : ''}
                            ${filledIndexes.includes(index) ? 'bg-green-600' : ''}
                            ${isUnfilling ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FillingTheBox2;
