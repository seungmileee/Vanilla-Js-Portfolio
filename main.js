"use strict";

//스크롤 시 네비게이션 바 색 변경
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar_dark");
  } else {
    navbar.classList.remove("navbar_dark");
  }
});

// 네비게이션 바 버튼, 컨택 미 버튼 누를 때 해당 요소로 스크롤

const navbarMenu = document.querySelector(".navbar__menu");

navbarMenu.addEventListener("click", (e) => {
  const target = e.target;
  const link = target.dataset.link;
  if (!link) {
    return;
  }
  scrollIntoView(link);
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

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}
