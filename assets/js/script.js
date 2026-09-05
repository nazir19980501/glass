// DARK MODE

const themeBtn = document.getElementById("themeBtn");
const moon = document.getElementById("moonIcon");
const sun = document.getElementById("sunIcon");

themeBtn.onclick = () => {
  document.documentElement.classList.toggle("dark");
  moon.classList.toggle("hidden");
  sun.classList.toggle("hidden");
};

// MOBILE MENU

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuLines = document.querySelectorAll(".menuLine");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("translate-x-full");
  mobileMenu.classList.toggle("translate-x-0");

  menuLines[0].classList.toggle("rotate-45");
  menuLines[0].classList.toggle("translate-y-2");

  menuLines[1].classList.toggle("opacity-0");

  menuLines[2].classList.toggle("-rotate-45");
  menuLines[2].classList.toggle("-translate-y-2");
});

// NAVBAR SCROLL EFFECT

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("backdrop-blur-xl");
  } else {
    navbar.classList.remove("backdrop-blur-xl");
  }
});

const mobileLinks = document.querySelectorAll(".mobileLink");

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // close menu
    mobileMenu.classList.add("translate-x-full");
    mobileMenu.classList.remove("translate-x-0");

    // reset hamburger icon
    menuLines[0].classList.remove("rotate-45", "translate-y-2");
    menuLines[1].classList.remove("opacity-0");
    menuLines[2].classList.remove("-rotate-45", "-translate-y-2");
  });
});

window.addEventListener("load", () => {
  const loader = document.getElementById("preloader");

  setTimeout(() => {
    loader.classList.add("opacity-0");

    setTimeout(() => {
      loader.style.display = "none";
    }, 1000);
  }, 500);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove(
          "opacity-0",
          "translate-y-20"
        );

        entry.target.classList.add(
          "opacity-100",
          "translate-y-0"
        );
      }
    });
  },
  {
    threshold: 0.15,
  }
);


document.querySelectorAll(".reveal").forEach((el) => {
  observer.observe(el);
});

//secret


