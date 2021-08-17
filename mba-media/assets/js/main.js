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

$(".owl-carousel").owlCarousel({
  stagePadding: 0,
  loop: false,
  margin: 0,
  nav: true,
  dots: false,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  },
}); 

// show FAQ

const arrows = document.querySelectorAll(".question-item ion-icon");
const blockDescs = document.querySelectorAll(
  ".question-item .question-description"
);

const questions = document.querySelectorAll(".question-item");

questions.forEach(function (ques, index) {
  const blockDesc = blockDescs[index];
  const arrow = arrows[index];

  ques.onclick = function() {
      blockDesc.classList.toggle("active");

      if (arrow.name == "arrow-down-outline") {
        arrow.name = "arrow-up-outline";
      } else {
        arrow.name = "arrow-down-outline";
      }
  };

});

// menu mobile
var mobile = document.querySelector('.menu-bar');
var menu = document.querySelector('.header-menu');



mobile.addEventListener('click', function() {
  mobile.classList.toggle('active');
  menu.classList.toggle('active');
});
