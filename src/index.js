import './style.scss';
// needed for file loader
import ogImg from './images/og.png';

// ************
// HERO TIMECONTROLLER
// ************

(function( HeroTimeController, undefined ) {
  const routine = [
    {
      elem: document.querySelectorAll('.section-hero .headline span.hidden')[0],
      time: 500
    },
    {
      elem: document.querySelectorAll('.section-hero .headline span.hidden')[1],
      time: 800
    },
    {
      elem: document.querySelectorAll('.section-hero .headline span.hidden')[2],
      time: 1100
    },
    {
      elem: document.querySelectorAll('.section-hero .headline span.hidden')[3],
      time: 1400
    },
    {
      elem: document.querySelector('.section-hero .hero-image.hidden'),
      time: 1700
    },
    {
      elem: document.querySelectorAll('.section-hero .copy.hidden')[0],
      time: 1800
    },
    {
      elem: document.querySelectorAll('.section-hero .copy.hidden')[1],
      time: 1900
    },
    {
      elem: document.querySelectorAll('.section-hero .copy.hidden')[2],
      time: 2000
    }
  ];

  //Public Method
  HeroTimeController.init = () => {
    document.querySelector('body').addEventListener('pageReady', () => {
      HeroTimeController.startTime = new Date().getTime();
      window.requestAnimationFrame(step);
    });
  }

  const body = document.querySelector('.body');
  const _event = new Event('HeroTimeControllerComplete');

  let start = undefined;
  let index = 0;

  function step(timestamp) {
    if (start === undefined)
    start = timestamp;
    const elapsed = timestamp - start;

    if (elapsed >= routine[index].time) {
      routine[index].elem.classList.remove('hidden');
      index++;
    }

    if (routine[index]) {
      window.requestAnimationFrame(step);
    } else {
      body.dispatchEvent(_event);
    }
  }
}( document.HeroTimeController = document.HeroTimeController || {} ));

document.HeroTimeController.init();


// ************
// MODAL
// ************

// 3.
const modalOpenLinks = document.querySelectorAll('[data-overlay-link]');
modalOpenLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector(`[data-overlay-name="${link.dataset.overlayLink}"]`).classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
  });
});

// 4.
const closeButtons = document.querySelectorAll('[data-overlay-close]');
closeButtons.forEach((elem) => {
  elem.addEventListener('click', (e) => {
    document.querySelectorAll('overlay.overlay').forEach((elem) => {
      elem.classList.add('hidden');
    });
    document.querySelector('body').classList.remove('modal-open');
  });
});

// 5.
const modalSwitchLinks = document.querySelectorAll('[data-overlay-switch]');
modalSwitchLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('overlay.overlay').forEach((elem) => {
      elem.classList.add('hidden');
    });
    document.querySelector(`[data-overlay-name="${link.dataset.overlaySwitch}"]`).classList.remove('hidden');
  });
});

// ************
// GRID CARD BUILD IN
// ************

(function( ScrollController, undefined ) {
  const scrollTargets = [...document.querySelectorAll('[data-scroll-target]')].map((elem) => {
    return { el: elem, start: elem.dataset.threshold, delay: parseInt(elem.dataset.delay) || 0, done: false };
  });

  //Public Method
  ScrollController.handleScroll = () => {
    scrollTargets.forEach((target) => {
      if (!target.done) {
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
}( document.ScrollController = document.ScrollController || {} ));

window.addEventListener('scroll', () => {
  document.ScrollController.handleScroll();
});
// Call after hero build in complete in case any card elements load on screen
document.querySelector('body').addEventListener('HeroTimeControllerComplete', () => {
  document.ScrollController.handleScroll();
});

// ************
// END
// ************
