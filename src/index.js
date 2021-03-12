import './style.scss';

// 1.
const headlineWords = document.querySelectorAll('.section-hero .headline span.hidden');
headlineWords.forEach((word, index) => {
  setTimeout(() => {
    word.classList.remove('hidden');
  }, 500 + 300*index);
});

// 2.
const heroImage = document.querySelector('.section-hero .hero-image.hidden');
setTimeout(() => {
  heroImage.classList.remove('hidden');
}, 1700);

// 3.
const links = document.querySelectorAll('[data-overlay-link]');
links.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector(`[data-overlay-name="${link.dataset.overlayLink}"]`).classList.remove('hidden');
  });
});

// 4.
const closeButtons = document.querySelectorAll('[data-overlay-close]');
closeButtons.forEach((elem) => {
  elem.addEventListener('click', (e) => {
    document.querySelectorAll('overlay.overlay').forEach((elem) => {
      elem.classList.add('hidden');
    });
  });
});

// 5.
document.scrollController = {};
document.scrollController.scrollTargets = [...document.querySelectorAll('[data-scroll-target]')].map((elem) => {
  return { el: elem, start: elem.dataset.threshold, delay: parseInt(elem.dataset.delay) || 0, done: false };
});
const handleScroll = (e) => {
  document.scrollController.scrollTargets.forEach((target) => {
    if (!target.done) {
      // console.log( `w.scrollY: ${window.scrollY} -- OST: ${target.el.offsetTop} -- innerHeight: ${window.innerHeight}`);
      if(window.innerHeight +  window.scrollY > target.el.offsetTop + parseInt(target.start.replace('t',''))) {
        // ignore delay in single column viewports
        const delay = window.innerWidth < 768 ? 0 : target.delay;
        setTimeout(()=>{
          target.el.classList.add('active');
        }, delay);

        target.done = true;
      }
    }
  });
}
document.scrollController.handleScroll = () => {
  document.scrollController.scrollTargets.forEach((target) => {
    if (!target.done) {
      // console.log( `w.scrollY: ${window.scrollY} -- OST: ${target.el.offsetTop} -- innerHeight: ${window.innerHeight}`);
      if(window.innerHeight +  window.scrollY > target.el.offsetTop + parseInt(target.start.replace('t',''))) {
        // ignore delay in single column viewports
        const delay = window.innerWidth < 768 ? 0 : target.delay;
        setTimeout(()=>{
          target.el.classList.add('active');
        }, delay);

        target.done = true;
      }
    }
  });
}
window.addEventListener('scroll', () => {
  document.scrollController.handleScroll();
});
// Call once on page init in case any elements load on screen
// delay waits for hero anim to finish
setTimeout(() => {
  document.scrollController.handleScroll();
}, 1700);
