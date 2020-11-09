import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { sleep } from '../helper/sleep';

function Array({ array, currentIdx, CurrentIdx1, pointerLeft, pointerRight }) {
  return (
    <div className={clsx('w-full flex mt-5 h-full space-x-1')}>
      {array.map((arr, i) => (
        <div
          style={{ height: `${arr}%` }}
          key={i}
          className={clsx(
            currentIdx === i ? 'bg-green-200' : 'bg-red-200',
            pointerLeft === i && 'bg-indigo-500',
            pointerRight === i && 'bg-indigo-500',
            'text-xs flex justify-center',
            CurrentIdx1 === i ? 'bg-blue-200' : 'bg-red-200',
            array.length > 20 ? 'w-6' : 'w-2'
          )}
        >
          {array.length < 51 && arr}
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(50);
  const [currentIdx, setCurrentIdx] = useState(null);
  const [CurrentIdx1, setCurrentIdx1] = useState(null);
  const [sortActive, setSortActive] = useState(false);

  const [pointerLeft, setPointerLeft] = useState(null);
  const [pointerRight, setPointerRight] = useState(null);

  const [target, setTarget] = useState(25);

  useEffect(() => {
    randomArray(50);
  }, []);

  function randomArray(length) {
    const ARRAY_LENGTH = length;
    const tempArr = [];
    for (let i = 0; i < ARRAY_LENGTH; i++) {
      tempArr.push(Math.floor(Math.random() * 50) + 10);
    }

    setArray(tempArr);
  }

  function handleSlider(value) {
    randomArray(value);
  }

  async function bubbleSort() {
    setSortActive(true);
    let isSorted = false;
    let counter = 0;

    while (!isSorted) {
      isSorted = true;
      for (let i = 0; i < array.length - 1 - counter; i++) {
        setCurrentIdx(i);
        await sleep(speed);
        if (array[i] > array[i + 1]) {
          let temp = array[i + 1];
          array[i + 1] = array[i];
          array[i] = temp;
          setCurrentIdx1(i + 1);
          isSorted = false;
        }
      }
      counter++;
    }
    setArray([...array]);
    setSortActive(false);
  }

  async function insertionSort(array) {
    setSortActive(true);
    for (let i = 1; i < array.length; i++) {
      let j = i;
      while (j > 0 && array[j] < array[j - 1]) {
        await sleep(speed);

        setCurrentIdx(j);
        setCurrentIdx1(j - 1);
        const temp = array[j - 1];
        array[j - 1] = array[j];
        array[j] = temp;
        j -= 1;
      }
    }
    setArray([...array]);
    setSortActive(false);
  }

  async function selectionSort(array) {
    setSortActive(true);
    let startIdx = 0;
    while (startIdx < array.length - 1) {
      let smallestIdx = startIdx;

      for (let i = startIdx + 1; i < array.length; i++) {
        setCurrentIdx(i);
        await sleep(speed);

        if (array[smallestIdx] > array[i]) {
          setCurrentIdx1(smallestIdx);
          smallestIdx = i;
        }
      }
      const temp = array[smallestIdx];
      array[smallestIdx] = array[startIdx];
      array[startIdx] = temp;
      startIdx++;
    }
    setArray([...array]);
    setSortActive(false);
  }

  async function binarySearch(array, target) {
    sortArrayHelper(array);

    let left = 0;
    let right = array.length - 1;

    setPointerRight(array.length - 1);
    setPointerLeft(left);

    console.log(array.length);

    while (left <= right) {
      await sleep(speed);
      const middle = Math.floor((left + right) / 2);
      const potentialMatch = array[middle];

      if (potentialMatch === target) {
        setCurrentIdx(middle);
        console.log('TARGET' + middle);
        return middle;
      } else if (target < potentialMatch) {
        right = middle - 1;
        setPointerRight(right);
        console.log('POINTER RIGHT: ' + right);
      } else {
        left = middle + 1;
        setPointerLeft(left);
        console.log('POINTER LEFT: ' + left);
      }
    }
    // currentIdx(null);
    // setPointerRight(null);
    // setPointerLeft(null);
    return -1;
  }

  function sortArrayHelper(array) {
    array.sort((a, b) => a - b);
  }

  return (
    <div>
      <div className='mt-5 flex items-center justify-between  rounded'>
        <div className='flex items-center space-x-5'>
          <div>
            <label className='flex flex-col items-center justify-center'>
              Length of Array
              <input
                onChange={(e) => handleSlider(e.target.value)}
                type='range'
                min='20'
                max='150'
                defaultValue='50'
              />
            </label>
          </div>
          <div>
            <label className='flex flex-col items-center justify-center'>
              Speed of Sort
              <input
                onChange={(e) => setSpeed(e.target.value)}
                type='range'
                min='0'
                max='100'
                defaultValue='50'
              />
            </label>
          </div>
        </div>
        <div>
          <ul className='flex space-x-6'>
            <div className='space-y-2 flex flex-col items-center justify-center'>
              <button
                disabled={sortActive}
                onClick={() => binarySearch(array, target)}
                className={clsx(
                  'bg-orange-500 rounded-lg px-6 py-2 cursor-pointer focus:outline-none',
                  sortActive &&
                    'text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed'
                )}
              >
                Binary Search
              </button>
              <input
                className='bg-gray-200 rounded px-3 py-1 focus:outline-none border border-black'
                type='text'
                placeholder='enter something'
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
            </div>
            <button
              disabled={sortActive}
              onClick={() => bubbleSort(array)}
              className={clsx(
                'bg-indigo-500 rounded-lg px-6 py-2 cursor-pointer focus:outline-none',
                sortActive &&
                  'text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed'
              )}
            >
              Bubble Sort
            </button>
            <button
              disabled={sortActive}
              onClick={() => insertionSort(array)}
              className={clsx(
                'bg-indigo-500 rounded-lg px-6 py-2 cursor-pointer focus:outline-none',
                sortActive &&
                  'text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed'
              )}
            >
              Insertion Sort
            </button>
            <button
              disabled={sortActive}
              onClick={() => selectionSort(array)}
              className={clsx(
                'bg-indigo-500 rounded-lg px-6 py-2 cursor-pointer focus:outline-none',
                sortActive &&
                  'text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed'
              )}
            >
              Selection Sort
            </button>
          </ul>
        </div>
      </div>
      <Array
        array={array}
        currentIdx={currentIdx}
        CurrentIdx1={CurrentIdx1}
        pointerLeft={pointerLeft}
        pointerRight={pointerRight}
      />
    </div>
  );
}
