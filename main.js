import Lenis from "@studio-freight/lenis";
import { Circ, Power3, gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// copyright year update
const yearSpan = document.querySelector(".reveal .year");

const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

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
createSpan();

// smooth scroll
function lenisScroll() {
  const lenis = new Lenis();

  lenis.on("scroll", (e) => {
    console.log(e);
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}
lenisScroll();

// gsap
gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline();

tl.from(".child span", {
  x: 100,
  duration: 1.4,
  stagger: 0.2,
  ease: Power3.easeInOut,
})
  .to(".parent .child", {
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
    delay: -1,
    duration: 1,
    ease: Circ.easeInOut,
  })
  .to(".green-overlay", {
    height: "0%",
    delay: -0.5,
    duration: 1,
    ease: Circ.easeInOut,
  });
