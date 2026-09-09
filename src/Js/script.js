// HERO TYPING ANIMATION
const typingText = document.getElementById("typingText");

if (
  typingText &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const message = typingText.dataset.text || "";
  let typingIndex = 0;

  const typeHeroText = () => {
    if (!document.body.classList.contains("page-ready")) {
      requestAnimationFrame(typeHeroText);
      return;
    }

    if (typingIndex < message.length) {
      typingText.textContent += message.charAt(typingIndex);
      typingIndex++;
      setTimeout(typeHeroText, 75);
    }
  };

  setTimeout(typeHeroText, 850);
} else if (typingText) {
  typingText.textContent = typingText.dataset.text || "";
}


// PRELOADER + INITIAL PAGE ANIMATION
const preloader = document.getElementById("preloader");

const revealPage = () => {
  document.body.classList.remove("is-loading");
  document.body.classList.add("page-ready");

  if (preloader) {
    preloader.classList.add("is-hidden");
    setTimeout(() => preloader.remove(), 800);
  }
};

window.addEventListener("load", () => {
  // Small intentional delay keeps the transition smooth and premium.
  setTimeout(revealPage, 450);
});

// Fallback: never leave the page covered if a remote image/font is slow.
setTimeout(() => {
  if (!document.body.classList.contains("page-ready")) {
    revealPage();
  }
}, 3200);


const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuIcon = document.getElementById("menuIcon");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");

  if (mobileMenu.classList.contains("hidden")) {
    menuIcon.classList.remove("fa-xmark");
    menuIcon.classList.add("fa-bars");
  } else {
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-xmark");
  }
});

document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    menuIcon.classList.remove("fa-xmark");
    menuIcon.classList.add("fa-bars");
  });
});


// NAVBAR SCROLL EFFECT
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 30) {
    navbar.classList.add("shadow-dark");
  } else {
    navbar.classList.remove("shadow-dark");
  }
});


// SCROLL REVEAL
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.12,
  }
);

// Automatic stagger for groups of reveal elements.
document.querySelectorAll("section").forEach((section) => {
  const revealItems = section.querySelectorAll(".fade-up");

  revealItems.forEach((element, index) => {
    element.style.setProperty(
      "--reveal-delay",
      `${Math.min(index * 55, 280)}ms`
    );
  });
});

document
  .querySelectorAll(".fade-up, .reveal-left, .reveal-right")
  .forEach((element) => {
    observer.observe(element);
  });


// SUBTLE HERO PARALLAX (desktop / precise pointers only)
const hero = document.getElementById("home");
const heroVisual = document.querySelector(".hero-visual");

if (
  hero &&
  heroVisual &&
  window.matchMedia("(pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  hero.addEventListener("mousemove", (event) => {
    // Do not interfere with the hero entrance animation.
    if (!document.body.classList.contains("page-ready")) return;

    const rect = hero.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    heroVisual.style.setProperty(
      "--parallax-x",
      `${x * 10}px`
    );

    heroVisual.style.setProperty(
      "--parallax-y",
      `${y * 8}px`
    );
  });

  hero.addEventListener("mouseleave", () => {
    heroVisual.style.setProperty("--parallax-x", "0px");
    heroVisual.style.setProperty("--parallax-y", "0px");
  });
}


// Automatic section scroll animations
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        sectionObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

document.querySelectorAll("section").forEach((section) => {
  section.classList.add("section-reveal");

  section
    .querySelectorAll(
      ":scope > div, :scope > h1, :scope > h2, :scope > h3, :scope > p"
    )
    .forEach((element, index) => {
      if (!element.classList.contains("fade-up")) {
        element.classList.add("section-item-reveal");

        element.style.setProperty(
          "--section-delay",
          `${Math.min(index * 70, 350)}ms`
        );
      }
    });

  sectionObserver.observe(section);
});


// TYPEWRITER FOR EVERY SECTION
const sectionTypingElements = [];

document.querySelectorAll("section").forEach((section) => {
  // Only type section headings (h2/h3).
  // Do NOT select the hero h1 because it contains #typingText.
  const heading = section.querySelector("h2, h3");

  if (!heading) return;

  const originalText = heading.textContent.trim();

  if (!originalText) return;

  heading.dataset.typingText = originalText;
  heading.textContent = "";
  heading.classList.add("section-typing");

  sectionTypingElements.push({
    element: heading,
    text: originalText,
    started: false
  });
});

const startSectionTyping = (item) => {
  if (item.started) return;

  item.started = true;

  let index = 0;

  const type = () => {
    if (index < item.text.length) {
      item.element.textContent += item.text.charAt(index);
      index++;

      setTimeout(type, 55);
    } else {
      item.element.classList.add("is-typing-done");
    }
  };

  type();
};


// Start the typing effect only when each section reaches the viewport.
const typingObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const item = sectionTypingElements.find(
          (candidate) => candidate.element === entry.target
        );

        if (item) {
          startSectionTyping(item);
        }

        typingObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2
  }
);

sectionTypingElements.forEach((item) => {
  typingObserver.observe(item.element);
});


// DEMO CONTACT FORM
const quoteForm = document.getElementById("quoteForm");
const successToast = document.getElementById("successToast");

if (quoteForm && successToast) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    successToast.classList.remove(
      "translate-y-28",
      "opacity-0"
    );

    successToast.classList.add(
      "translate-y-0",
      "opacity-100"
    );

    quoteForm.reset();

    setTimeout(() => {
      successToast.classList.remove(
        "translate-y-0",
        "opacity-100"
      );

      successToast.classList.add(
        "translate-y-28",
        "opacity-0"
      );
    }, 3500);
  });
}


// YEAR
document.getElementById("year").textContent =
  new Date().getFullYear();