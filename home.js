const navbar = document.getElementById("navbar");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const cursorGlow = document.querySelector(".cursor-glow");

/* Navbar scroll effect */
window.addEventListener("scroll", () => {
  navbar.classList.toggle(
    "scrolled",
    window.scrollY > 30
  );
}, {
  passive: true
});


/* Mobile menu */
menuBtn.addEventListener("click", () => {

  const open = mobileMenu.classList.toggle("open");

  document.body.classList.toggle(
    "menu-open",
    open
  );

  menuBtn.setAttribute(
    "aria-expanded",
    String(open)
  );

  menuBtn.setAttribute(
    "aria-label",
    open ? "Close menu" : "Open menu"
  );

  const bars = menuBtn.querySelectorAll("span");

  if (open) {

    bars[0].style.transform =
      "translateY(7px) rotate(45deg)";

    bars[1].style.opacity = "0";

    bars[2].style.transform =
      "translateY(-7px) rotate(-45deg)";

  } else {

    bars.forEach(bar => {
      bar.style.transform = "";
      bar.style.opacity = "";
    });

  }

});


/* Close mobile menu after clicking a link */
document.querySelectorAll(".mobile-menu a").forEach(link => {

  link.addEventListener("click", () => {

    mobileMenu.classList.remove("open");

    document.body.classList.remove("menu-open");

    menuBtn.setAttribute(
      "aria-expanded",
      "false"
    );

    menuBtn.setAttribute(
      "aria-label",
      "Open menu"
    );

    menuBtn.querySelectorAll("span").forEach(bar => {
      bar.style.transform = "";
      bar.style.opacity = "";
    });

  });

});


/* Reveal animations */
const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("is-visible");

        observer.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.12
  }
);


document.querySelectorAll(".reveal").forEach(element => {
  observer.observe(element);
});


/* Active navigation section */
const sections = document.querySelectorAll(
  "main section[id]"
);

const navLinks = document.querySelectorAll(
  ".desktop-nav a"
);

const sectionObserver = new IntersectionObserver(
  (entries) => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach(link => {

        link.classList.toggle(
          "active",
          link.getAttribute("href") ===
          `#${entry.target.id}`
        );

      });

    });

  },
  {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0
  }
);


sections.forEach(section => {
  sectionObserver.observe(section);
});


/* Cursor glow */
if (
  window.matchMedia("(pointer: fine)").matches
) {

  window.addEventListener(
    "pointermove",
    event => {

      cursorGlow.style.opacity = "1";

      cursorGlow.style.left =
        `${event.clientX}px`;

      cursorGlow.style.top =
        `${event.clientY}px`;

    },
    {
      passive: true
    }
  );


  document.addEventListener(
    "mouseleave",
    () => {
      cursorGlow.style.opacity = "0";
    }
  );

}


/* Hero card 3D interaction */
const heroVisual =
  document.querySelector(".hero-visual");

if (
  heroVisual &&
  window.matchMedia("(pointer: fine)").matches
) {

  const panel =
    heroVisual.querySelector(".hero-panel");

  heroVisual.addEventListener(
    "pointermove",
    event => {

      const rect =
        heroVisual.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) /
        rect.width - 0.5;

      const y =
        (event.clientY - rect.top) /
        rect.height - 0.5;

      panel.style.transform =
        `perspective(1000px)
         rotateY(${x * 5}deg)
         rotateX(${y * -4}deg)
         translateY(-3px)`;

    }
  );


  heroVisual.addEventListener(
    "pointerleave",
    () => {
      panel.style.transform = "";
    }
  );

}


/* Prevent empty placeholder links */
document
  .querySelectorAll('a[href="#"]')
  .forEach(link => {

    link.addEventListener(
      "click",
      event => {
        event.preventDefault();
      }
    );

  });


/* Smooth close if user presses Escape */
document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape" &&
      mobileMenu.classList.contains("open")
    ) {

      mobileMenu.classList.remove("open");

      document.body.classList.remove(
        "menu-open"
      );

      menuBtn.setAttribute(
        "aria-expanded",
        "false"
      );

      menuBtn.setAttribute(
        "aria-label",
        "Open menu"
      );

      menuBtn.querySelectorAll("span").forEach(bar => {
        bar.style.transform = "";
        bar.style.opacity = "";
      });

    }

  }
);