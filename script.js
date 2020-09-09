

const canv = document.getElementById("canvas");
const ctx = canv.getContext("2d");
const slider = document.getElementById("barSlider");
const output = document.getElementById('numBars');
const speedSlider = document.getElementById('speedBar');
const speedOutput = document.getElementById('barSpeed');

const bubbleSortBtn = document.getElementById('bubbleSort');
const selectionSortBtn = document.getElementById('selectionSort');
const insertionSortBtn = document.getElementById('insertionSort');
//const mergeSortBtn = document.getElementById('mergeSort');
const resetBtn = document.getElementById('reset');

const width = canv.width;
const height = canv.height;

output.innerHTML = slider.value;
speedOutput.innerHTML = speedSlider.value + ' ms';

let barNumber = slider.value;
let arr = [];
let barWidth = width / barNumber;
let gap = 0;
let sleepTime = speedSlider.value;

slider.oninput = function() {
    output.innerHTML = this.value;
    barNumber = this.value;
    barWidth = width / barNumber;
    arr = [];
    createArray();
    update();
}

speedSlider.oninput = function(){
    speedOutput.innerHTML = this.value + ' ms';
    sleepTime = this.value;
}

function isSorted(a) {
    for (let i = 0; i < a.length - 1; i++){
        if (a[i] > a [i + 1]) return false;
    }

    return true;
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function createArray(){
    for (let i = 0; i < barNumber; i++){
        arr[i] = (i + 1) * (height/barNumber);
    }
    shuffle(arr);
}

function update(){
    gap = 0;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    createBars();
}

function createBars() {
    for (let i = 0; i < arr.length; i++){
        let barHeight = arr[i];
        ctx.fillStyle = "white";
        ctx.fillRect(gap, height - barHeight, barWidth, barHeight);
        gap += barWidth;
    }
}

async function bubbleSort(unsortedArray) {
    startStopwatch();
    let isSorted = false;
    while (!isSorted){
        isSorted = true;
        for (let i = 0; i < unsortedArray.length -1; i++){
            if (unsortedArray[i] > unsortedArray[i + 1]){
                await swap(unsortedArray, i, i + 1);
                isSorted = false;
            }
        }
    }

    enableBtns();
    endTime = Date.now()
}

async function selectionSort(unsortedArray) {
    startStopwatch();
    for (let x = 0; x < unsortedArray.length; x++) {
        let minimum = x;

        for (let y = x; y < unsortedArray.length; y++) {
            if (unsortedArray[minimum] > unsortedArray[y]){
                minimum = y;
            }
        }

        await swap(unsortedArray, x, minimum);

    }
    enableBtns();
    endTime = Date.now()
}

async function insertionSort(unsortedArray){
    startStopwatch();
    for (let i = 1; i < unsortedArray.length; i++){
        let j = i;
        let toInsert = unsortedArray[i];

        while ((j > 0) && (unsortedArray[j - 1] > toInsert)) {
            await insertSwap(unsortedArray, j, j - 1);
            j--;
        }

        unsortedArray[j] = toInsert;
    }

    update();
    enableBtns();
    endTime = Date.now()
}


async function swap(arr, i, j) {
    await sleep(sleepTime);
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    update();
}

async function insertSwap(arr, i, j){
    await sleep(sleepTime);
    arr[i] = arr[j];
    update();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

bubbleSortBtn.addEventListener('click', async function(){
    if (isSorted(arr)){
        return;
    } else {
        bubbleSort(arr);
        disableBtns();
    }
});

selectionSortBtn.addEventListener('click', async function(){
    if (isSorted(arr)){
        return;
    } else {
        selectionSort(arr);
        disableBtns();
    }
});

insertionSortBtn.addEventListener('click', async function(){
    if (isSorted(arr)){
        return;
    } else {
        insertionSort(arr);
        disableBtns();
    }
});


resetBtn.addEventListener('click', function() {
    startStopwatch();
    endTime = Date.now();
    startTime = Date.now();
    stopwatch.textContent = "Time: 0s";
    arr = []
    createArray();
    enableBtns();
    update();
});

let endTime = null; // set non-null to kill stopwatch
let startTime = null;
const startStopwatch = (() => {
  function paintStopwatch (hInterval) {
    if (startTime !== null) {
      if (endTime === null) {
        stopwatch.textContent = `Time: ${(Date.now() - startTime) / 1000}s`;
        //`Time: ${(Date.now() - startTime) / 1000}s`
      } else {
        stopwatch.textContent = `Time: ${(endTime - startTime) / 1000}s`;
        startTime = null;
      }
    } else {
      clearInterval(hInterval);
    }
  }
  return () => {
    [startTime, endTime] = [Date.now(), null];
    const hInterval = setInterval(() => paintStopwatch(hInterval), 10);
  }
})()



function disableBtns(){
    bubbleSortBtn.disabled = true;
    selectionSortBtn.disabled = true;
    insertionSortBtn.disabled = true;
    slider.disabled = true;
    speedSlider.disabled = true;
}

function enableBtns(){
    bubbleSortBtn.disabled = false;
    selectionSortBtn.disabled = false;
    insertionSortBtn.disabled = false;
    slider.disabled = false;
    speedSlider.disabled = false;
}

createArray();
update();