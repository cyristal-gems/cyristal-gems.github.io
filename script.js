const intro = document.querySelector("#intro");
const typewriter = document.querySelector("#typewriter");
const focusCycle = document.querySelector("#focusCycle");
const enterSite = document.querySelector("#enterSite");
const careerCycle = document.querySelector("#careerCycle");
const year = document.querySelector("#year");
const projectCarousel = document.querySelector(".project-grid");
const projectPrev = document.querySelector(".project-control--prev");
const projectNext = document.querySelector(".project-control--next");
const resumeLink = document.querySelector("#resumeLink");
const certFilter = document.querySelector("#certFilter");
const certCards = Array.from(document.querySelectorAll(".cert-card"));
const opportunityButton = document.querySelector("#opportunityButton");
const opportunityModal = document.querySelector("#opportunityModal");
const opportunityCloseButtons = Array.from(document.querySelectorAll("[data-opportunity-close]"));
let projectCards = Array.from(document.querySelectorAll(".project-card"));
let lastOpportunityFocus = null;

document.title = "Cyristal N. Joseph | Portfolio";

const focusAreas = [
  "Cyber Defense + Incident Response",
  "Risk Governance + Assurance",
  "Privacy Operations + Data Protection",
  "Threat Intelligence + Legal Strategy",
];

const careerPaths = [
  "I work at the intersection of cybersecurity and law—where technical evidence shapes legal risk, and legal obligations shape security strategy.",
  "I investigate the breach, trace the evidence, and turn technical findings into action that security teams, leaders, and counsel can defend.",
  "I transform complex privacy and cybersecurity requirements into practical controls that protect data, reduce exposure, and withstand scrutiny.",
];

year.textContent = new Date().getFullYear();

const revealPortfolio = () => {
  if (intro.classList.contains("is-hidden")) {
    return;
  }

  document.body.classList.remove("intro-active");
  intro.classList.add("is-hidden");
  window.setTimeout(() => {
    intro.setAttribute("aria-hidden", "true");
  }, 720);
};

const rotateFocus = () => {
  let index = 0;

  const focusTimer = window.setInterval(async () => {
    if (index >= focusAreas.length - 1) {
      window.clearInterval(focusTimer);
      return;
    }

    index += 1;
    focusCycle.classList.add("is-changing");
    await new Promise((resolve) => window.setTimeout(resolve, 360));
    focusCycle.textContent = focusAreas[index];
    focusCycle.classList.remove("is-changing");
  }, 2800);
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

const isOpportunityDialogOpen = () => opportunityModal && !opportunityModal.hidden;

const getOpportunityFocusableElements = () => {
  if (!opportunityModal) {
    return [];
  }

  return Array.from(
    opportunityModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),
  ).filter((element) => !element.disabled && element.offsetParent !== null);
};

const openOpportunityDialog = () => {
  if (!opportunityModal || isOpportunityDialogOpen()) {
    return;
  }

  lastOpportunityFocus = document.activeElement;
  opportunityModal.hidden = false;
  opportunityButton?.setAttribute("aria-expanded", "true");
  document.body.classList.add("opportunity-dialog-open");
  getOpportunityFocusableElements()[0]?.focus();
};

const closeOpportunityDialog = () => {
  if (!opportunityModal || !isOpportunityDialogOpen()) {
    return;
  }

  opportunityModal.hidden = true;
  opportunityButton?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("opportunity-dialog-open");

  if (lastOpportunityFocus instanceof HTMLElement) {
    lastOpportunityFocus.focus();
  }
};

opportunityButton?.addEventListener("click", openOpportunityDialog);

opportunityCloseButtons.forEach((button) => {
  button.addEventListener("click", closeOpportunityDialog);
});

document.addEventListener("keydown", (event) => {
  if (!isOpportunityDialogOpen()) {
    return;
  }

  if (event.key === "Escape") {
    event.preventDefault();
    closeOpportunityDialog();
    return;
  }

  if (event.key !== "Tab") {
    return;
  }

  const focusableElements = getOpportunityFocusableElements();

  if (!focusableElements.length) {
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
});

const wireProjectCard = (card) => {
  if (card.dataset.ready === "true") {
    return;
  }

  card.dataset.ready = "true";
  card.setAttribute("aria-expanded", "false");

  const projectTitle = card.querySelector("h3")?.textContent.trim();

  if (projectTitle && card.getAttribute("aria-hidden") !== "true") {
    card.setAttribute("aria-label", `${projectTitle}. Select to view project details.`);
  }

  const setFlipped = (shouldFlip) => {
    card.classList.toggle("is-flipped", shouldFlip);
    card.setAttribute("aria-expanded", String(shouldFlip));
  };

  card.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      return;
    }

    setFlipped(!card.classList.contains("is-flipped"));
  });

  card.addEventListener("keydown", (event) => {
    if (event.target.closest("a") || (event.key !== "Enter" && event.key !== " ")) {
      return;
    }

    event.preventDefault();
    setFlipped(!card.classList.contains("is-flipped"));
  });
};

projectCards.forEach(wireProjectCard);

document.addEventListener("click", (event) => {
  projectCards.forEach((card) => {
    if (!card.contains(event.target)) {
      card.classList.remove("is-flipped");
      card.setAttribute("aria-expanded", "false");
    }
  });
});

const runProjectCarousel = () => {
  if (!projectCarousel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  let pauseUntil = 0;
  let isProjectHovered = false;
  let isProjectVisible = false;
  let lastTime = null;
  let projectAnimationFrame = null;
  let scrollPosition = projectCarousel.scrollLeft;
  let loopPoint = 0;
  const scrollSpeed = 28;

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
    projectAnimationFrame = null;

    if (!isProjectVisible || document.hidden) {
      lastTime = null;
      return;
    }

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
    projectAnimationFrame = window.requestAnimationFrame(move);
  };

  const requestProjectAnimation = () => {
    if (projectAnimationFrame === null && isProjectVisible && !document.hidden) {
      projectAnimationFrame = window.requestAnimationFrame(move);
    }
  };

  if ("IntersectionObserver" in window) {
    const projectVisibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isProjectVisible = entry.isIntersecting;
        requestProjectAnimation();
      },
      { rootMargin: "160px 0px" },
    );

    projectVisibilityObserver.observe(projectCarousel);
  } else {
    isProjectVisible = true;
    requestProjectAnimation();
  }

  document.addEventListener("visibilitychange", requestProjectAnimation);
};

const runIntro = async () => {
  const introText = typewriter.dataset.text;
  const wait = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));

  typewriter.textContent = "";
  for (let index = 0; index < introText.length; index += 1) {
    typewriter.textContent += introText[index];
    await wait(50);
  }

  intro.classList.add("intro--focus-ready");

  await wait(650);
  intro.classList.add("intro--tagline-ready");

  await wait(950);
  intro.classList.add("intro--enter-ready");
  enterSite.disabled = false;
  rotateFocus();
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

const filterCertifications = () => {
  if (!certFilter || !certCards.length) {
    return;
  }

  const activeCategory = certFilter.value;
  let visibleIndex = 0;

  certCards.forEach((card) => {
    const shouldShow = activeCategory === "all" || card.dataset.category === activeCategory;

    card.classList.toggle("is-filter-hidden", !shouldShow);
    card.setAttribute("aria-hidden", String(!shouldShow));
    card.classList.remove("is-filter-refreshed");

    if (!shouldShow) {
      return;
    }

    card.style.setProperty("--filter-delay", `${Math.min(visibleIndex * 45, 240)}ms`);
    visibleIndex += 1;

    window.requestAnimationFrame(() => {
      card.classList.add("is-filter-refreshed");
    });
  });
};

certFilter?.addEventListener("change", filterCertifications);

const setupScrollReveals = () => {
  const revealGroups = [
    { selector: ".hero__media", reveal: "slide-right" },
    { selector: ".hero__content", reveal: "fade" },
    { selector: ".section__heading", reveal: "fade" },
    { selector: ".section__topline .button", reveal: "slide-left" },
    { selector: ".experience-subtitle", reveal: "fade" },
    { selector: ".experience-carousel", reveal: "fade" },
    { selector: ".cert-filter", reveal: "fade" },
    { selector: ".skill-group", reveal: "zoom", stagger: 80 },
    { selector: ".cert-card", reveal: "zoom", stagger: 65 },
    { selector: ".project-card", reveal: "zoom", stagger: 80 },
    { selector: ".publication-card", reveal: "zoom" },
    { selector: ".contact__icons a", reveal: "zoom", stagger: 75 },
    { selector: ".footer", reveal: "fade" },
  ];
  const revealElements = new Set();

  revealGroups.forEach(({ selector, reveal, stagger = 0 }) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      if (revealElements.has(element)) {
        return;
      }

      element.classList.add("reveal-on-scroll");
      element.dataset.reveal = reveal;
      element.style.setProperty("--reveal-delay", `${Math.min(index * stagger, 420)}ms`);
      revealElements.add(element);
    });
  });

  const elements = Array.from(revealElements);

  if (!elements.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.12,
    },
  );

  elements.forEach((element) => revealObserver.observe(element));
};

runIntro();
rotateCareer();
runProjectCarousel();
setupScrollReveals();
