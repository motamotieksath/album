// changing certain photo sizes to give the "collage" effect
let effects = new Array();
let current = 0;
effects.push([1, 2, 2],[2, 1, 2], [6, 1, 2]);
for (let i = 8; i <= 11; i++)
    effects.push([i, 1, 2]);
effects.push([15, 1, 2]);
for (let i = 18; i <= 21; i++)
    effects.push([i, 1, 2]);
effects.push([22, 2, 2]);
effects.push([24, 1, 2]);
effects.push([30, 1, 2]);
effects.push([31, 1, 2]);
effects.push([35, 1, 2]);
effects.push([37, 1, 2]);
effects.push([38, 1, 2]);
effects.push([40, 1, 2]);
effects.push([42, 1, 2]);
effects.push([43, 2, 3]);
effects.push([46, 1, 2]);
effects.push([47, 1, 3]);
effects.push([49, 2, 2]);
effects.push([50, 2, 2]);
effects.push([51, 1, 2]);
effects.push([52, 1, 2]);
// --------------------------------------------------


let imageArea = document.querySelector('#imageArea');
let imageViewer = document.querySelector('#imageViewer');
let imageSourceArray = [];
let currentImage = -1;

for (let i = 1; i <= 52; i++)
{
    let imageContainer = document.createElement('div');
    let image = document.createElement('img');
    image.src = `Together/${i}.jpg`;
    imageSourceArray.push(image.src);
    if (current < effects.length && effects[current][0] == i)
    {
        imageContainer.style.gridArea = `span ${effects[current][1]} / span ${effects[current][2]}`;
        current++;
    }
    image.title = i;
    image.addEventListener('click', () => {
        imageViewer.style.display = 'grid';
        let focusImage = document.createElement('img');
        let imageLayer = imageViewer.querySelector('#imageLayer');
        focusImage.src = `Together/${i}.jpg`;
        focusImage.addEventListener('click', () => {
            currentImage = i - 1;
            focusImage.classList.add('heartbeat');
            setTimeout(() => {
                focusImage.classList.remove('heartbeat');
            }, 500);
        });
        imageLayer.replaceChildren();
        imageLayer.appendChild(focusImage);
        imageViewer.focus();

    });
    imageContainer.appendChild(image);
    imageArea.appendChild(imageContainer);
}

let closeImageViewer = imageViewer.querySelector('#closeImageViewer');
closeImageViewer.addEventListener('click', () => {
    imageViewer.style.display = 'none';
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        imageViewer.style.display = 'none';
    }
});


function changeImageForward()
{
    currentImage = (currentImage + 1)%(imageSourceArray.length);
    let imageToChange = imageLayer.querySelector('img');
    if (imageToChange)
        imageToChange.src = imageSourceArray[currentImage];
    imageViewer.focus();
}

function changeImageBackward()
{
    currentImage = (imageSourceArray.length + currentImage - 1)%(imageSourceArray.length);
    let imageToChange = imageLayer.querySelector('img');
    if (imageToChange)
        imageToChange.src = imageSourceArray[currentImage];
    imageViewer.focus();
}

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
        changeImageBackward();
    }
});

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') {
        changeImageForward();
    }
});

const previousPhoto = imageViewer.querySelector('#previousPhoto');
previousPhoto.addEventListener('click', changeImageBackward);

const nextPhoto = imageViewer.querySelector('#nextPhoto');
nextPhoto.addEventListener('click', changeImageForward);
