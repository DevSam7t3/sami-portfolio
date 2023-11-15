import { Expo, Linear, Power3, gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap
gsap.registerPlugin(ScrollTrigger);

// updating local time of pakistan
const date = new Date();
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

const navLinks = document.querySelectorAll("nav a");

const navSelector = () => {
  let pathname = window.location.hash;

  if (pathname === "#home" || !pathname) {
    return "#home";
  } else if (pathname === "#about") {
    return "#about";
  } else if (pathname === "#services") {
    return "#service";
  } else if (pathname === "#contact") {
    return "#contact";
  }
};

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    navLinks.forEach((elem) => {
      elem.classList.remove("active");
    });
    link.classList.add("active");
  });
});

// custom cursor
// Shery.mouseFollower({
//   //Parameters are optional.
//   skew: true,
//   ease: "cubic-bezier(0.23, 1, 0.320, 1)",
//   duration: 1,
// });

// cursor magnetic effect
Shery.makeMagnet(".magnet" /* Element to target.*/, {
  //Parameters are optional.
  ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  duration: 1,
});

// loader animation
document.addEventListener("DOMContentLoaded", function () {
  const hashName = navSelector();

  if (hashName) {
    document.querySelector(hashName).scrollIntoView();
  } else {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  const counter3 = document.querySelector(".counter-3");

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 10; j++) {
      const div = document.createElement("div");
      div.className = "num";
      div.textContent = j;
      counter3.appendChild(div);
    }
  }

  const finalDiv = document.createElement("div");
  finalDiv.className = "num";
  finalDiv.textContent = "0";
  counter3.appendChild(finalDiv);

  animate(counter3, 5);
  animate(document.querySelector(".counter-2"), 6);
  animate(document.querySelector(".counter-1"), 2, 4);

  function animate(counter, duration, delay = 0) {
    const numHeight = counter.querySelector(".num").clientHeight;

    const totalDistance =
      (counter.querySelectorAll(".num").length - 1) * numHeight;

    gsap.to(counter, {
      y: -totalDistance,
      duration,
      delay,
      ease: Power2.easeInOut,
    });
  }

  gsap.to(".digit", {
    top: "-150px",
    stagger: {
      amount: 0.25,
    },
    delay: 6,
    duration: 1,
    ease: Power4.easeInOut,
  });

  const loaderTl = gsap.timeline();

  loaderTl
    .from(".loader-1", {
      width: 0,
      duration: 6,
      ease: Power2.easeInOut,
    })
    .from(".loader-2", {
      width: 0,
      duration: 0.1,
      ease: Power2.easeInOut,
    })
    .from(".loader-3", {
      width: 0,
      duration: 0.1,
      ease: Power2.easeInOut,
    })
    .to(".loader", {
      background: "none",
      delay: -6,
      duration: 0.1,
    })
    .to(".num", {
      color: "#14cf93",
      delay: -1.3,
    })
    .to(".loader-1,.loader-2,.loader-3", {
      backgroundColor: "#14cf93",
      delay: -1.3,
    });

  if (loaderTl.isActive() !== true) {
    gsap.to(".loader-1", {
      rotate: -45,
      duration: 0.5,
      delay: 7,
      ease: Power2.easeInOut,
    });
    gsap.to(".loader-3", {
      width: "180px",
      right: 0,
      rotate: -45,
      duration: 0.5,
      delay: 7,
      ease: Power2.easeInOut,
    });
  }

  gsap.to(".loader", {
    scale: 40,
    duration: 1,
    delay: 8,
    ease: Power2.easeInOut,
  });

  gsap.to(".loader", {
    rotate: 45,
    duration: 1,
    delay: 8,
    ease: Power2.easeInOut,
  });
  gsap.to(".loading__screen", {
    opacity: 0,
    delay: 8.2,
    ease: Power1.easeInOut,
  });
});

function skillsAnimation() {
  let currentScroll = 0;
  let isScrollinDown = true;

  let arrows = document.querySelectorAll(".arrow");

  let tween = gsap
    .to(".marquee__part", {
      xPercent: -100,
      repeat: -1,
      duration: 5,
      ease: Linear.easeInOut,
    })
    .totalProgress(0.5);

  gsap.set(".marquee__inner", {
    xPercent: -10,
  });

  window.addEventListener("scroll", function () {
    if (window.scrollY > currentScroll) {
      isScrollinDown = true;
    } else {
      isScrollinDown = false;
    }
    gsap.to(tween, {
      timeScale: isScrollinDown ? 1 : -1,
    });

    arrows.forEach((arrow) => {
      if (isScrollinDown) {
        arrow.classList.remove("active");
      } else {
        arrow.classList.add("active");
      }
    });

    currentScroll = window.scrollY;
  });
}
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

// experiences section
document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 2),
    });
  });
});

// calling functions
animateHero();
createSpan();
valuesSetters();
skillsAnimation();
