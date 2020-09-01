
let canv = document.getElementById("canvas");
let ctx = canv.getContext("2d");

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
let arr = [];
function createArray(){
    for (let i = 0; i < 138; i++){
        //arr[i] = Math.floor(Math.random() * Math.floor(300)) + 10;
        arr[i] = i*3 + 1;
    }
    shuffle(arr);

}

let gap = 5;
let sleepTime = 0;


function update(){
    gap = 5;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);
    createBars();
}

function createBars() {
    for (let i = 0; i < arr.length; i++){
        let barHeight = arr[i];
        ctx.fillStyle = "white";
        ctx.fillRect(gap, canv.height - barHeight, 4, barHeight);
        gap += 5;
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
}

async function swap(arr, i, j) {
    //gap = 5;
    await sleep(sleepTime);
   // ctx.fillStyle = "red";
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

document.getElementById('bubbleSort').addEventListener('click', async function(){
    console.log("clicked");
    sleepTime = 5;
    bubbleSort(arr);
});

document.getElementById('selectionSort').addEventListener('click', async function(){
    console.log("clicked");
    sleepTime = 50;
    selectionSort(arr);
});

document.getElementById('insertionSort').addEventListener('click', async function(){
    sleepTime = 2;
    insertionSort(arr);
});

document.getElementById('reset').addEventListener('click', function() {
    arr = []
    createArray();
    update();
});

createArray();
update();