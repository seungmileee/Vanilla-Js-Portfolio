"use strict";

//스크롤 시 네비게이션 바 색 변경
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", (e) => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar_dark");
  } else {
    navbar.classList.remove("navbar_dark");
  }
});

const toggleBtn = document.querySelector(".navbar__toggle-btn");
toggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

// 네비게이션 바 버튼, 컨택 미 버튼 누를 때 해당 요소로 스크롤

const navbarMenu = document.querySelector(".navbar__menu");

navbarMenu.addEventListener("click", (e) => {
  const target = e.target;
  console.log(target);
  const link = target.dataset.link;
  if (!link) {
    return;
  }
  navbar.classList.remove("open");
  scrollIntoView(link);
  selectNavItem(target);
});

const contactBtn = document.querySelector(".home__contact");

contactBtn.addEventListener("click", (e) => {
  scrollIntoView("#contact");
});

// 스크롤 내릴 때 홈 섹션 내용 점점 더 투명해지도록 만들기
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// 스크롤 시 arrow up 버튼 보이게 만들기
const arrow_up = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrow_up.classList.add("visible");
  } else {
    arrow_up.classList.remove("visible");
  }
});

// arrow up 버튼 클릭 시 홈 버튼으로 올라가기
arrow_up.addEventListener("click", () => {
  scrollIntoView("#home");
});

// 버튼 누르면 filter 동작하게 만들기
const work_btn = document.querySelector(".work__categories");
const work_project = document.querySelector(".work__projects");
const work_proj = document.querySelectorAll(".project");
console.log(work_proj);

work_btn.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter === null) {
    return;
  }

  const target = (e.target.nodeName = "BUTTON"
    ? e.target
    : e.target.parentNode);
  target.classList.remove("selected");
  target.classList.add("selected");

  work_project.classList.add("anime-out");
  setTimeout(() => {
    work_proj.forEach((el) => {
      if (filter === "*" || filter == el.dataset.type) {
        el.classList.remove("none");
      } else {
        el.classList.add("none");
      }
    });

    work_project.classList.remove("anime-out");
  }, 300);
});

const sectionId = [
  "#home",
  "#about",
  "#skills",
  "#work",
  "#testimonials",
  "#contact",
];
const sections = sectionId.map((id) => document.querySelector(id));

const navItems = sectionId.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex = 0;

let selectedNavItems = navItems[0];
function selectNavItem(selected) {
  selectedNavItems.classList.remove("active");
  selectedNavItems = selected;
  selectedNavItems.classList.add("active");
}

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
  selectNavItem(navItems[sectionId.indexOf(selector)]);
}

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      console.log(entry.target.id);
      const index = sectionId.indexOf(`#${entry.target.id}`);
      console.log(index, entry.target.id);

      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener("scroll", () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    Math.round(window.scrollY + window.innerHeight) ===
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});
