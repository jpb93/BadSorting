
let canv = document.getElementById("canvas");
let ctx = canv.getContext("2d");
let slider = document.getElementById("barSlider");
let output = document.getElementById('numBars');
output.innerHTML = slider.value;
const width = canv.width;
const height = canv.height;
let barNumber = slider.value;
let arr = [];
let barWidth = width / barNumber;
let gap = 0;
let sleepTime = 0;

slider.oninput = function() {
    output.innerHTML = this.value;
    barNumber = this.value;
    barWidth = width / barNumber;
    arr = [];
    createArray();
    update();
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
        //arr[i] = Math.floor(Math.random() * Math.floor(300)) + 10;
        arr[i] = i*3 + 1;
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
}

async function selectionSort(unsortedArray) {
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
}

async function insertionSort(unsortedArray){
    for (let i = 1; i < unsortedArray.length; i++){
        let j = i;
        let toInsert = unsortedArray[i];

        while ((j > 0) && (unsortedArray[j - 1] > toInsert)) {
            //unsortedArray[j] = unsortedArray[j - 1];
            await insertSwap(unsortedArray, j, j - 1);
            j--;
        }

        unsortedArray[j] = toInsert;
    }

    update();
    enableBtns();
}

async function swap(arr, i, j) {
    //gap = 5;
    await sleep(sleepTime);
    // This is garbage
    indexOne = i;
    indexTwo = j;
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    update();
}

async function insertSwap(arr, i, j){
    await sleep(sleepTime);
    // barf
    indexOne = i;
    indexTwo = j;
    arr[i] = arr[j];
    update();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.getElementById('bubbleSort').addEventListener('click', async function(){
    sleepTime = 5;
    bubbleSort(arr);
    disableBtns();
});

document.getElementById('selectionSort').addEventListener('click', async function(){
    sleepTime = 50;
    selectionSort(arr);
    disableBtns();
});

document.getElementById('insertionSort').addEventListener('click', async function(){
    sleepTime = 2;
    insertionSort(arr);
    disableBtns();
});

document.getElementById('reset').addEventListener('click', function() {
    enableBtns();
    arr = []
    createArray();
    update();
    resetIndices();
});

function disableBtns(){
    document.getElementById('bubbleSort').disabled = true;
    document.getElementById('selectionSort').disabled = true;
    document.getElementById('insertionSort').disabled = true;
    slider.disabled = true;
}

function enableBtns(){
    document.getElementById('bubbleSort').disabled = false;
    document.getElementById('selectionSort').disabled = false;
    document.getElementById('insertionSort').disabled = false;
    slider.disabled = false;
}


createArray();
update();