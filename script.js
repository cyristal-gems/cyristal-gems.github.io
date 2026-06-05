const intro = document.querySelector("#intro");
const typewriter = document.querySelector("#typewriter");
const focusCycle = document.querySelector("#focusCycle");
const enterSite = document.querySelector("#enterSite");
const careerCycle = document.querySelector("#careerCycle");
const year = document.querySelector("#year");
const navLinks = Array.from(document.querySelectorAll(".nav__links a"));
const sections = Array.from(document.querySelectorAll("main section[id]"));
const projectCarousel = document.querySelector(".project-grid");
const projectPrev = document.querySelector(".project-control--prev");
const projectNext = document.querySelector(".project-control--next");
const resumeLink = document.querySelector("#resumeLink");
let projectCards = Array.from(document.querySelectorAll(".project-card"));

document.title = "Cyristal N. Joseph | Technical Portfolio";

const focusAreas = [
  "Threat Management + Incident Response",
  "Threat Intelligence",
  "Governance, Risk and Compliance",
];

const careerPaths = [
  "I approach security with an investigator's mindset, following signals from first alert to root cause so teams can respond with clarity.",
  "I translate threat intelligence, incident response, and risk insight into practical decisions that strengthen secure operations.",
  "I document patterns, evidence, and lessons learned so each investigation improves detection, resilience, and readiness.",
];

year.textContent = new Date().getFullYear();

const revealPortfolio = () => {
  if (intro.classList.contains("is-hidden")) {
    return;
  }

  intro.classList.add("is-hidden");
  window.setTimeout(() => {
    intro.setAttribute("aria-hidden", "true");
  }, 720);
};

const rotateFocus = () => {
  let index = 0;

  window.setInterval(async () => {
    index = (index + 1) % focusAreas.length;
    focusCycle.classList.add("is-changing");
    await new Promise((resolve) => window.setTimeout(resolve, 360));
    focusCycle.textContent = focusAreas[index];
    focusCycle.classList.remove("is-changing");
  }, 1900);
};

const rotateCareer = () => {
  let index = 0;

  window.setInterval(async () => {
    index = (index + 1) % careerPaths.length;
    careerCycle.classList.add("is-changing");
    await new Promise((resolve) => window.setTimeout(resolve, 360));
    careerCycle.textContent = careerPaths[index];
    careerCycle.classList.remove("is-changing");
  }, 12000);
};

const wireProjectCard = (card) => {
  if (card.dataset.ready === "true") {
    return;
  }

  card.dataset.ready = "true";

  card.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      return;
    }

    card.classList.toggle("is-flipped");
  });

};

projectCards.forEach(wireProjectCard);

document.addEventListener("click", (event) => {
  projectCards.forEach((card) => {
    if (!card.contains(event.target)) {
      card.classList.remove("is-flipped");
    }
  });
});

const runProjectCarousel = () => {
  if (!projectCarousel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  let pauseUntil = 0;
  let isProjectHovered = false;
  let lastTime = null;
  let scrollPosition = projectCarousel.scrollLeft;
  let loopPoint = 0;
  const scrollSpeed = 34;

  if (projectCarousel.dataset.loopReady !== "true") {
    const originalCards = Array.from(projectCarousel.querySelectorAll(".project-card"));
    originalCards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.classList.add("project-card--clone");
      clone.dataset.clone = "true";
      clone.dataset.ready = "false";
      clone.setAttribute("aria-hidden", "true");
      clone.tabIndex = -1;
      clone.querySelectorAll("a, button").forEach((element) => {
        element.tabIndex = -1;
      });
      projectCarousel.appendChild(clone);
    });

    projectCarousel.dataset.loopReady = "true";
    projectCards = Array.from(projectCarousel.querySelectorAll(".project-card"));
    projectCards.forEach(wireProjectCard);
  }

  const updateLoopPoint = () => {
    const firstClone = projectCarousel.querySelector('.project-card[data-clone="true"]');
    loopPoint = firstClone ? firstClone.offsetLeft : projectCarousel.scrollWidth - projectCarousel.clientWidth;
  };

  const getCardStep = () => {
    const firstCard = projectCarousel.querySelector(".project-card");
    const styles = window.getComputedStyle(projectCarousel);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0");

    return firstCard ? firstCard.getBoundingClientRect().width + gap : projectCarousel.clientWidth * 0.78;
  };

  const pauseBriefly = () => {
    pauseUntil = Date.now() + 1300;
  };

  const pauseOnProject = () => {
    isProjectHovered = true;
  };

  const resumeAfterProject = () => {
    isProjectHovered = false;
  };

  projectCarousel.addEventListener("pointerdown", pauseBriefly);
  projectCarousel.addEventListener("pointerup", pauseBriefly);
  projectCarousel.addEventListener("touchstart", pauseBriefly, { passive: true });
  projectCarousel.addEventListener("touchend", pauseBriefly);
  projectCarousel.addEventListener("mouseenter", pauseOnProject);
  projectCarousel.addEventListener("mouseleave", resumeAfterProject);

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", pauseOnProject);
    card.addEventListener("mouseleave", resumeAfterProject);
  });

  updateLoopPoint();
  window.addEventListener("resize", updateLoopPoint);

  const scrollByProject = (direction) => {
    pauseBriefly();
    updateLoopPoint();

    if (direction < 0 && projectCarousel.scrollLeft <= 4 && loopPoint > 0) {
      projectCarousel.scrollLeft = Math.max(loopPoint - getCardStep(), 0);
    }

    projectCarousel.scrollBy({
      left: getCardStep() * direction,
      behavior: "smooth",
    });
  };

  projectPrev?.addEventListener("click", () => scrollByProject(-1));
  projectNext?.addEventListener("click", () => scrollByProject(1));

  const move = (time) => {
    const isPaused =
      isProjectHovered ||
      projectCarousel.matches(":hover") ||
      projectCarousel.contains(document.activeElement) ||
      Date.now() < pauseUntil;

    projectCarousel.classList.toggle("is-auto-scrolling", !isPaused);

    if (lastTime === null) {
      lastTime = time;
    }

    if (isPaused) {
      scrollPosition = projectCarousel.scrollLeft;
      if (loopPoint > 0 && scrollPosition >= loopPoint) {
        scrollPosition -= loopPoint;
        projectCarousel.scrollLeft = scrollPosition;
      }
    } else {
      const delta = Math.min(time - lastTime, 48) / 1000;

      scrollPosition += scrollSpeed * delta;

      if (loopPoint > 0 && scrollPosition >= loopPoint) {
        scrollPosition -= loopPoint;
      }

      projectCarousel.scrollLeft = scrollPosition;
    }

    lastTime = time;
    window.requestAnimationFrame(move);
  };

  window.requestAnimationFrame(move);
};

const runIntro = async () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const introText = typewriter.dataset.text;
  const wait = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));

  typewriter.textContent = "";

  if (prefersReducedMotion) {
    typewriter.textContent = introText;
    intro.classList.add("intro--focus-ready", "intro--tagline-ready", "intro--enter-ready");
    return;
  }

  await wait(320);

  for (let index = 0; index < introText.length; index += 1) {
    typewriter.textContent += introText[index];
    await wait(64);
  }

  await wait(260);
  intro.classList.add("intro--focus-ready");
  await wait(520);
  intro.classList.add("intro--tagline-ready");
  await wait(430);
  intro.classList.add("intro--enter-ready");
};

enterSite.addEventListener("click", revealPortfolio);

resumeLink?.addEventListener("click", (event) => {
  event.preventDefault();

  const resumeWindow = window.open(resumeLink.href, "_blank");

  if (resumeWindow) {
    resumeWindow.opener = null;
  } else {
    window.location.href = resumeLink.href;
  }
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-36% 0px -58% 0px" },
  );

  sections.forEach((section) => observer.observe(section));
}

runIntro().then(rotateFocus);
rotateCareer();
runProjectCarousel();
