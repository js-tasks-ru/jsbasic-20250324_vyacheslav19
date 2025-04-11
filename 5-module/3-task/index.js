function initCarousel() {
  const carouselInner = document.querySelector('.carousel__inner');
  const slides = carouselInner.children;
  const Width = slides[0].offsetWidth;
  const nextArrow = document.querySelector('.carousel__arrow_right');
  const previousArrow = document.querySelector('.carousel__arrow_left');
  let currentSlideNumber = 0;
  const updateArrows = () => {
    if (currentSlideNumber==slides.length-1){
      nextArrow.style.display = 'none';
    }
    else
    {
      nextArrow.style.display = '';
    }
    if (currentSlideNumber==0){
      previousArrow.style.display = 'none';
    }
    else
    {
      previousArrow.style.display = '';
    }
  }
  previousArrow.style.display = 'none';
  nextArrow.addEventListener('click',() =>{
    currentSlideNumber+=1;
      carouselInner.style.transform = `translateX(-${currentSlideNumber*Width}px)`;
      updateArrows();
  })
  previousArrow.addEventListener('click',() =>{
      currentSlideNumber-=1;
      carouselInner.style.transform = `translateX(-${currentSlideNumber*Width}px)`;
      updateArrows();
  })
}
