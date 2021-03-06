'use strict';

let ImagesElement = document.getElementById('images-div');
console.log(ImagesElement);
let firstImg = document.createElement('img');
firstImg.setAttribute('src', " ");
firstImg.setAttribute('alt', " ");
firstImg.setAttribute('id', "first");
ImagesElement.appendChild(firstImg);
firstImg.textContent = this.name;
firstImg.textContent = this.source;

let secondImg = document.createElement('img');
secondImg.setAttribute('src', " ");
secondImg.setAttribute('alt', " ");
secondImg.setAttribute('id', "second");
ImagesElement.appendChild(secondImg);
secondImg.textContent = this.name;
secondImg.textContent = this.source;

let thirdImg = document.createElement('img');
thirdImg.setAttribute('src', " ");
thirdImg.setAttribute('alt', " ");
thirdImg.setAttribute('id', "third");
ImagesElement.appendChild(thirdImg);

thirdImg.textContent = this.name;
thirdImg.textContent = this.source;
let maxAttempts = 25;
let userAttemptsCounter = 0;

let firstImageIndex;
let secondImageIndex;
let thirdImageIndex;


let namesArr = [];
let votesArr=[];
let shownArr=[];
function Product(name, source) {
  this.name = name;
  this.source = source;
  this.votes = 0;
  this.shown = 0;
   
  namesArr.push(this.name);
  Product.allProduct.push(this);
  
}
Product.allProduct = [];
Product.picturesArr = [];

// instantces
new Product('bag', 'images/bag.jpg');//0
new Product('banana', 'images/banana.jpg');//1
new Product('bathroom', 'images/bathroom.jpg');//2
new Product('boots', 'images/boots.jpg');//3
new Product('breakfast', 'images/breakfast.jpg');//4
new Product('bubblegum', 'images/bubblegum.jpg');//5
new Product('chair', 'images/chair.jpg');//6
new Product('cthulhu', 'images/cthulhu.jpg');//7
new Product('dog-duck', 'images/dog-duck.jpg');//8
new Product('dragon', 'images/dragon.jpg');//9
new Product('pen', 'images/pen.jpg');//10
new Product('pet-sweep', 'images/pet-sweep.jpg');//11
new Product('scissors', 'images/scissors.jpg');//12
new Product('shark', 'images/shark.jpg');//13
new Product('sweep', 'images/sweep.png');//14
new Product('tauntaun', 'images/tauntaun.jpg');//15
new Product('unicorn', 'images/unicorn.jpg');//16
new Product('usb', 'images/usb.gif');//17
new Product('water-can', 'images/water-can.jpg');//18
new Product('wine-glass', 'images/wine-glass.jpg');//19

console.log(Product.allProduct);


function generateRandomIndex() {
  return Math.floor(Math.random() * Product.allProduct.length);
}
let calShown = 0;
let shownPictures=[];
function renderTwoImages() {

  firstImageIndex = generateRandomIndex();
  secondImageIndex = generateRandomIndex();
  thirdImageIndex = generateRandomIndex();


  while (firstImageIndex === secondImageIndex || firstImageIndex === thirdImageIndex || secondImageIndex === thirdImageIndex || shownPictures.includes(firstImageIndex) || shownPictures.includes(secondImageIndex) || shownPictures.includes(thirdImageIndex) )
  {
    firstImageIndex = generateRandomIndex();
    secondImageIndex = generateRandomIndex();
    thirdImageIndex = generateRandomIndex();
    
  }
  shownPictures=[firstImageIndex,secondImageIndex,thirdImageIndex];



  firstImg.src = Product.allProduct[firstImageIndex].source;
  secondImg.src = Product.allProduct[secondImageIndex].source;
  thirdImg.src = Product.allProduct[thirdImageIndex].source;

  // Product.picturesArr[firstImageIndex].source;
  // Product.picturesArr[secondImageIndex].source;
  // Product.picturesArr[thirdImageIndex].source;


  Product.allProduct[firstImageIndex].shown++;
  Product.allProduct[secondImageIndex].shown++;
  Product.allProduct[thirdImageIndex].shown++;
}
renderTwoImages();

firstImg.addEventListener('click', handleUserClick);
secondImg.addEventListener('click', handleUserClick);
thirdImg.addEventListener('click', handleUserClick);




function handleUserClick(event) {
  console.log(event.target.id);

  userAttemptsCounter++;

  console.log(userAttemptsCounter);

  if (userAttemptsCounter <= maxAttempts) {

    if (event.target.id === 'first') {
      Product.allProduct[firstImageIndex].votes++;
    } else if (event.target.id === 'second') {
      Product.allProduct[secondImageIndex].votes++;
    } else {
      Product.allProduct[thirdImageIndex].votes++;
    }
    console.log(Product.allProduct);
    saveData();
    renderTwoImages();
   

  } else {
    let list = document.getElementById('results-list');


    let productResult;

    for (let i = 0; i < Product.allProduct.length; i++) {
      productResult = document.createElement('li');
      list.appendChild(productResult);
      productResult.textContent = `${Product.allProduct[i].name} has ${Product.allProduct[i].votes} votes and ${Product.allProduct[i].shown} shown`
   }
  
   for (let i = 0; i < Product.allProduct.length; i++) {
    
    votesArr.push(Product.allProduct[i].votes);
    shownArr.push(Product.allProduct[i].shown);
    }
    
     chart();
    firstImg.removeEventListener('click', handleUserClick);
    secondImg.removeEventListener('click', handleUserClick);
    thirdImg.removeEventListener('click', handleUserClick);

    
  }
 
}

function myFunction() {
  let x = document.getElementById("results-list");
  if (x.style.display = "none") {
    x.style.display = "block";
  } else {
    x.style.display === "none";
  }
}
function refresh() {
  window.location.reload("Refresh")
}
function saveData() {
  let arrayString = JSON.stringify(Product.allProduct);
  console.log(arrayString);
  localStorage.setItem("product",arrayString)
  
}

function getData(){
  let data = localStorage.getItem('product')
  console.log(data);
  let productData =JSON.parse(data);
  console.log(productData);
  votesArr = productData; 
  renderTwoImages();
  // chart();
}



function chart() {
  let ctx = document.getElementById('myChart').getContext('2d');
  
  let chart= new Chart(ctx,{
   type: 'bar',
   data:{
      labels: namesArr,
      datasets: [
        {
        label: 'product votes',
        data: votesArr,
        backgroundColor: [
          'rgb(251, 93, 76)',
        ],
  
        borderWidth: 1
      },

      {
        label: 'product shown',
        data: shownArr,
        backgroundColor: [
          'black',
        ],
  
        borderWidth: 1
      }
      
    ]
    },
    options: {}
  });
  
}

//  getData();