import { Circ, Expo, Power3, gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap
gsap.registerPlugin(ScrollTrigger);

// copyright year update
const yearSpan = document.querySelector(".reveal .year");

const date = new Date();
const currentYear = date.getFullYear();
yearSpan.textContent = currentYear;

// updating local time of pakistan
const localTimeHeading = document.querySelector(".local-time");

const localTime = date.toLocaleTimeString([], {
  timeZone: "Asia/karachi",
  hourCycle: "h12",
  hour: "2-digit",
  minute: "2-digit",
});

localTimeHeading.textContent = localTime;

// locomotive initialization
(function () {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
})();

function valuesSetters() {
  gsap.set(".nav a", { y: "-100%", opacity: 0 });
  gsap.set("#home span .child", { y: "100%" });
  gsap.set("#home .row img", { opacity: 0 });

  // set dashoffset value of hero section svg
  document.querySelectorAll("#Visual>g").forEach(function (e) {
    var character = e.childNodes[1].childNodes[1];
    character.style.strokeDasharray = character.getTotalLength() + "px";
    character.style.strokeDashoffset = character.getTotalLength() + "px";
  });
}

function createSpan() {
  document.querySelectorAll(".reveal").forEach((elem) => {
    let spanParent = document.createElement("span");
    let spanChild = document.createElement("span");

    spanParent.classList.add("parent");
    spanChild.classList.add("child");

    spanChild.innerHTML = elem.innerHTML;
    spanParent.appendChild(spanChild);

    elem.innerHTML = "";
    elem.appendChild(spanParent);
  });
}

function loaderAnimation() {
  const tl = gsap.timeline();

  tl.from(".loader .child span", {
    x: 100,
    duration: 1.4,
    stagger: 0.2,
    ease: Power3.easeInOut,
  })
    .to(".loader .parent .child", {
      y: "-100%",
      duration: 1,
      ease: Circ.easeInOut,
    })
    .to(".loader", {
      height: 0,
      duration: 1,
      ease: Circ.easeInOut,
    })
    .to(".green-overlay", {
      height: "100%",
      top: 0,
      delay: -1.5,
      duration: 1,
      ease: Circ.easeInOut,
    })
    .to(".green-overlay", {
      height: "0%",
      delay: -0.5,
      duration: 1,
      ease: Circ.easeInOut,
      onComplete: () => {
        animateHero();
      },
    });
}

function animateSvg() {
  gsap.to("#Visual>g>g>path,#Visual>g>g>polyline", {
    strokeDashoffset: 0,
    duration: 2,
    ease: Expo.easeInOut,
  });
}

function animateHero() {
  const tl = gsap.timeline();

  tl.to(".nav a", {
    y: 0,
    opacity: 1,
    stagger: 0.05,
    ease: Expo.easeInOut,
  })
    .to("#home span .child", {
      y: 0,
      stagger: 0.1,
      duration: 2,
      ease: Expo.easeInOut,
    })
    .to("#home .row img", {
      opacity: 1,
      delay: -0.5,
      ease: Expo.easeInOut,
      onComplete: () => {
        animateSvg();
      },
    });
}
// calling functions
createSpan();
valuesSetters();
loaderAnimation();
