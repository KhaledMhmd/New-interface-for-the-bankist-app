"use strict";
const allSections = document.querySelectorAll(".section");
const navLogInButton = document.querySelector(".navLogInButton");
const openAccButton = document.querySelectorAll(".openAccButton");
const modals = document.querySelectorAll(".modal");
const logInModal = document.querySelector(".logInModal");
const signUpModal = document.querySelector(".signUpModal");
const closeModalButton = document.querySelectorAll(".closeModalButton");
const overlay = document.querySelector(".overlay");
const headerSection = document.querySelector(".header");
const nav = document.querySelector(".nav");
const navLinks = document.querySelector(".navLinks");
const learnMoreButton = document.querySelector(".learnMoreButton");
const featuresSection = document.getElementById("featuresSection");
const operationTabsContainer = document.querySelector(".operationTabs");
const operationTabs = document.querySelectorAll(".operationTab");
const operationContent = document.querySelectorAll(".operationContent");
const slider = document.querySelector(".slider");
const allSlides = document.querySelectorAll(".slide");
const sliderButtonLeft = document.querySelector(".sliderButtonLeft");
const sliderButtonRight = document.querySelector(".sliderButtonRight");
const dots = document.querySelector(".dots");

// ------------------------------------------------------------------------------------------------------------------ //

// adding functions to the login and open account buttons

// CLOSING ANY MODAL

const closeModal = function () {
  overlay.classList.add("hidden");
  modals.forEach(function (modal) {
    if (!modal.classList.contains("hidden")) {
      modal.classList.add("hidden");
    }
  });
};
for (let i = 0; i < closeModalButton.length; i++) {
  closeModalButton[i].addEventListener("click", closeModal);
}
overlay.addEventListener("click", closeModal);

// LOGIN MODAL

const showLogInModal = function () {
  logInModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

navLogInButton.addEventListener("click", showLogInModal);

// SIGN UP MODAL

const showSignUpModal = function () {
  signUpModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
for (let i = 0; i < openAccButton.length; i++) {
  openAccButton[i].addEventListener("click", showSignUpModal);
}

// -------------------------------------------------------------------------------------------- //

// adding smooth scrolling when pushing the 'Learn More' button and the navLinks
learnMoreButton.addEventListener("click", function (e) {
  featuresSection.scrollIntoView({ behavior: "smooth" });
});

navLinks.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("navLink")) {
    document
      .querySelector(e.target.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  }
});

// ------------------------------------------------------------------------------------------------------------------ //

// adding events listener for the tabs in operations section

operationTabsContainer.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("operationTab")) {
    operationTabs.forEach((t) => t.classList.remove("operationTabActive"));
    operationContent.forEach((c) =>
      c.classList.remove("operationContentActive")
    );
    e.target.classList.add("operationTabActive");
    document
      .querySelector(`.operationContent${e.target.dataset.tab}`)
      .classList.add("operationContentActive");
  }
});

// ------------------------------------------------------------------------------------------------------------------ //

// adding fade effect to nav tabs
const tabFade = function (e) {
  if (e.target.classList.contains("navLink")) {
    const link = e.target;
    const siblings = link.closest(".navLinks").querySelectorAll(".navLink");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
  }
};

navLinks.addEventListener("mouseover", tabFade.bind(0.5));
navLinks.addEventListener("mouseout", tabFade.bind(1));

// ------------------------------------------------------------------------------------------------------------------ //

// adding intersection observer api to make the nav fixed
// const fixedNavOptions = {
//   root: null,
//   threshold: 0,
// };
// const fixedNav = function (entries) {
//   const [entry] = entries;
//   if (!entry.isIntersecting) {
//     nav.classList.add("fixed");
//   } else {
//     nav.classList.remove("fixed");
//   }
// };
// const headerObserver = new IntersectionObserver(fixedNav, fixedNavOptions);
// headerObserver.observe(headerSection);

// const navHeight = nav.getBoundingClientRect().height;

// const fixedNav = function (entries) {
//   const [entry] = entries;

//   if (!entry.isIntersecting) nav.classList.add("fixed");
//   else nav.classList.remove("fixed");
// };

// const headerObserver = new IntersectionObserver(fixedNav, {
//   root: null,
//   threshold: 0,
//   rootMargin: `-${navHeight}px`,
// });

// headerObserver.observe(headerSection);

// ------------------------------------------------------------------------------------------- //

// adding intersection observer api to make the section appear and transition up smoothly

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("sectionHidden");
  observer.unobserve(entry.target);
};

const revealSectionOptions = {
  root: null,
  threshold: 0.15,
};

const sectionObserver = new IntersectionObserver(
  revealSection,
  revealSectionOptions
);

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("sectionHidden");
});

// ------------------------------------------------------------------------------------------- //

// adding intersection observer api to replace the blurry images with hq ones

const imgTargets = document.querySelectorAll("img[data-src]");

const revealImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazyImage");
  });
  observer.unobserve(entry.target);
};

const revealImgOptions = {
  root: null,
  threshold: 0,
  rootMargin: "200px",
};

const imgObserver = new IntersectionObserver(revealImg, revealImgOptions);

imgTargets.forEach((img) => imgObserver.observe(img));

// ------------------------------------------------------------------------------------------- //

// activating the slider (sliding buttons, sliding dots)

let currentSlide = 0;
const maxSlide = allSlides.length - 1;

// FUNCTIONS

// creating the dots
// const createDots = function () {
//   allSlides.forEach(function (s, i) {
//     dots.insertAdjacentHTML(
//       "beforeend",
//       `<button class="dot" data-slide="${i}"></button>`
//     );
//   });
// };
const createDots = function () {
  allSlides.forEach(function (_, i) {
    dots.insertAdjacentHTML(
      "beforeend",
      `<button class="dot" data-slide="${i}"></button>`
    );
  });
};

// activating selected dot
const activateDot = function (slide) {
  document
    .querySelectorAll(".dot")
    .forEach((dot) => dot.classList.remove("dotActive"));
  document
    .querySelectorAll(`.dot[data-slide="${slide}"]`)
    .forEach((dot) => dot.classList.add("dotActive"));
};

// go to slide function
const goToSlide = function (slide) {
  allSlides.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
goToSlide(0);

// next slide function
const nextSlide = function () {
  if (currentSlide === maxSlide) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

// previous slide function
const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

// initialization functions
const init = function () {
  goToSlide(0);
  createDots();
  activateDot(0);
};
init();

// EVENT HANDLERS
sliderButtonRight.addEventListener("click", nextSlide);
sliderButtonLeft.addEventListener("click", prevSlide);

dots.addEventListener("click", function (e) {
  if (e.target.classList.contains("dot")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});
