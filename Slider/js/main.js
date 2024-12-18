
var sliderImages = Array.from(document.querySelectorAll('.slider-container img'));

var slideCount = sliderImages.length; 

var currentSlide = 1;
var slideNumElement = document.getElementById('slide-number');
var nextButtom = document.getElementById('next');
var prevButtom = document.getElementById('prev');

nextButtom.onclick = nextSlide;
prevButtom.onclick = prevSlide;


var paginatElement = document.createElement('ul');
paginatElement.setAttribute('id','pagination-ul');

for (var i = 1 ; i <= slideCount ; i++) {
var paginatItem = document.createElement('li');
paginatItem.setAttribute('data-index',i);
paginatItem.appendChild(document.createTextNode(i));

paginatElement.appendChild(paginatItem);

}

document.getElementById('indicators').appendChild(paginatElement); 

var createdpaginat = document.getElementById('pagination-ul');

var paginatBullets = Array.from(document.querySelectorAll('#pagination-ul li'));

for (var i = 0 ; i < paginatBullets.length ; i++) {
    paginatBullets[i].onclick = function () {
        currentSlide = parseInt(this.getAttribute('data-index'));

        theChecker();
    };
}


theChecker();

function nextSlide () {

    if(nextButtom.classList.contains('disabled')) {
        return false;
    }else {   
    currentSlide++;
    theChecker();
    }
}
function prevSlide () {
    if(prevButtom.classList.contains('disabled')) {
        return false;
    }else {   
    currentSlide--;
    theChecker();
    }

}
function theChecker() {
    slideNumElement.textContent = 'slide #' + (currentSlide) +' of ' + (slideCount);

    removeActives();
    sliderImages[currentSlide - 1].classList.add('active');

    createdpaginat.children[currentSlide - 1].classList.add('active');

    if (currentSlide == 1) {
        prevButtom.classList.add('disabled');
    }else {
        prevButtom.classList.remove('disabled');

    }
    if (currentSlide == slideCount ) {
        nextButtom.classList.add('disabled');
    }else {
        nextButtom.classList.remove('disabled');

    }
}

function removeActives() {
    sliderImages.forEach(function(img) {
        img.classList.remove('active');
    });

    paginatBullets.forEach(function(polit) {
        polit.classList.remove('active');
    });
}