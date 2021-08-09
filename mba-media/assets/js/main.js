// button tabs

const blocks = document.querySelectorAll(".block-item");
const tabs = document.querySelectorAll(".tab");

const tabActive = document.querySelector(".tab.active");
const bgTab = document.querySelector(".bg-tab");

bgTab.style.left = tabActive.offsetLeft + "px";
bgTab.style.width = tabActive.offsetWidth + "px";

tabs.forEach(function (tab, index) {
  const block = blocks[index];

  tab.onclick = function () {
    document.querySelector(".block-item.active").classList.remove("active");
    document.querySelector(".tab.active").classList.remove("active");

    bgTab.style.left = this.offsetLeft + "px";
    bgTab.style.width = this.offsetWidth + "px";

    this.classList.add("active");
    block.classList.add("active");
  };
});

// slide

const chevronLeft = document.querySelector(
  'ion-icon[name="chevron-back-outline"]'
);
const chevronRight = document.querySelector(
  'ion-icon[name="chevron-forward-outline"]'
);
const slideItem = document.querySelectorAll(".slide-item");
const slideItemActive = document.querySelector(".slide-item.active");

chevronRight.addEventListener("click", function () {
  slideItemActive.classList.remove("active");
  slideItem[1].classList.add("active");
});

chevronLeft.addEventListener("click", function () {
  slideItem[1].classList.remove("active");
  slideItem[0].classList.add("active");
});

// show FAQ

const arrows = document.querySelectorAll(".question-item ion-icon");
const blockDescs = document.querySelectorAll(
  ".question-item .question-description"
);

arrows.forEach(function (arrow, index) {
  const blockDesc = blockDescs[index];

  arrow.onclick = function () {
    blockDesc.classList.toggle("active");
    this.classList.toggle("active");
    
    if (this.name == "arrow-down-outline") {
      arrow.name = "arrow-up-outline";
    } else {
      arrow.name = "arrow-down-outline";
    }
  };
});
