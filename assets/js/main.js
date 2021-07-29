var apiVietnamese = "https://api-kent.netlify.app/.netlify/functions/api/vn";

function start() {
  getApiVietnamese(getDataCity);
}

start();

function getApiVietnamese() {
  fetch(apiVietnamese)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderApiVietnamese(
        data.total.totalCases,
        data.total.totalRecovered,
        data.total.totalDeaths
      );
      getDataCity(data);
    })
    .catch(function (err) {
      console.log(err);
    });
}

// fetch("https://coronavirus-map.p.rapidapi.com/v1/spots/week?region=vietnam", {
//   method: "GET",
//   headers: {
//     "x-rapidapi-key": "5b161c752amsh65b116e830e5657p12e19bjsne5cb781ffb77",
//     "x-rapidapi-host": "coronavirus-map.p.rapidapi.com",
//   },
// })
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

function renderApiVietnamese(totalCases, totalRecovered, totalDeaths) {
  document.querySelector(".totalCases").innerHTML = `
  <h3>Số ca nhiễm </h3>
  <h1>${Intl.NumberFormat().format(totalCases)}</h1>`;
  document.querySelector(".totalRecovered").innerHTML = `
  <h3>Số ca hồi phục </h3>
  <h1>${Intl.NumberFormat().format(totalRecovered)}</h1>`;
  document.querySelector(".totalDeaths").innerHTML = `
  <h3>Số ca tử vong </h3>
  <h1>${Intl.NumberFormat().format(totalDeaths)}</h1>`;
}

function getDataCity(data) {
  var dataTables = document.querySelector("#data-table");

  for (var i = 0; i <= 62; i++) {
    var tr = document.createElement("tr");
    var city = document.createElement("td");
    var cases = document.createElement("td");
    var recovered = document.createElement("td");
    var deaths = document.createElement("td");

    city.innerHTML = data.detail[i].name;
    cases.innerHTML = Intl.NumberFormat().format(data.detail[i].cases);
    recovered.innerHTML = Intl.NumberFormat().format(data.detail[i].recovered);
    deaths.innerHTML = Intl.NumberFormat().format(data.detail[i].deaths);

    tr.appendChild(city);
    tr.appendChild(cases);
    tr.appendChild(recovered);
    tr.appendChild(deaths);
    dataTables.appendChild(tr);
  }
}

// set dateTime

function zero(num) {
  return num >= 0 && num <= 10 ? "0" + num : num + "";
}

setInterval(function () {
  var now = new Date();
  var strDateTime = [
    [zero(now.getDate()), zero(now.getMonth() + 1), zero(now.getFullYear())].join("/"),
    [zero(now.getHours()), zero(now.getMinutes())].join(":"),
    now.getHours() >= 12 ? "PM" : "AM", 
  ].join(" ");
  document.querySelector("#time").innerHTML = strDateTime;
}, 1000);

// scroll top
$(window).scroll(function() {
  if ($(window).scrollTop() > 200) {
    $('.scroll-top').fadeIn();
  }else {
    $('.scroll-top').fadeOut();
  }
});

$('.scroll-top').click(function() {
  $('html, body').animate({scrollTop: 0}, 1000);
});

// search table data city
document.querySelector("#search").onkeyup = function() {
  var input = document.querySelector("#search");
  var filter = input.value.toUpperCase();
  var table = document.querySelector("#table-city");
  var tr = table.getElementsByTagName("tr");

  for (var i = 0; i < tr.length; i++) {
    var td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      var txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
};
