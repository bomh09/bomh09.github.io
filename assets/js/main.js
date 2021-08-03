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
    [
      zero(now.getDate()),
      zero(now.getMonth() + 1),
      zero(now.getFullYear()),
    ].join("/"),
    [zero(now.getHours()), zero(now.getMinutes())].join(":"),
    now.getHours() >= 12 ? "PM" : "AM",
  ].join(" ");
  document.querySelector("#time").innerHTML = strDateTime;
}, 1000);

// scroll top
$(window).scroll(function () {
  if ($(window).scrollTop() > 200) {
    $(".scroll-top").fadeIn();
  } else {
    $(".scroll-top").fadeOut();
  }
});

$(".scroll-top").click(function () {
  $("html, body").animate({ scrollTop: 0 }, 1000);
});

// search table data city
document.querySelector("#search").onkeyup = function () {
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

// sort table city
window.addEventListener("load", function () {
  var dataTable = [];
  var sortTable = document.getElementsByClassName("sort-table");

  for (let i = 0; i < sortTable.length; i++) {
    setTimeout(function () {
      sortTable[i].setAttribute("data-sort-index", i);
      let tableRows = sortTable[i]
        .getElementsByTagName("tbody")[0]
        .getElementsByTagName("tr");
      for (var j = 0; j < tableRows.length; j++) {
        let tableRowCells = tableRows[j].getElementsByTagName("td");
        for (let k = 0; k < tableRowCells.length; k++) {
          if (dataTable[i] === void 0) {
            dataTable.splice(i, 0, []);
          }
          if (dataTable[i][j] === void 0) {
            dataTable[i].splice(j, 0, []);
          }
          dataTable[i][j].splice(k, 0, tableRowCells[k].innerHTML);
        }
      }
    }, 2000);
    
    let thead = sortTable[i]
      .getElementsByTagName("thead")[0]
      .getElementsByTagName("tr")[0]
      .getElementsByTagName("th");
    for (let m = 0; m < thead.length; m++) {
      let isNum = thead[m].classList.contains("numeric-sort");
      thead[m].setAttribute("data-sort-direction", 0);
      thead[m].setAttribute("data-sort-index", m);
      thead[m].addEventListener("click", function () {
        let colTarget = this.getAttribute("data-sort-direction");
        let m = this.getAttribute("data-sort-index");
        let i = findParent(this, "sort-table").getAttribute("data-sort-index");
  
        if (colTarget == 1) {
          targetColumnHeader(-1, m, thead);
        } else {
          targetColumnHeader(1, m, thead);
        }
  
        dataTable[i] = dataTable[i].sort((a, b) => {
          let x = formatContent(a[m]);
          let y = formatContent(b[m]);
          if (isNum) {
            x = UnFormatStringNum(x);
            y = UnFormatStringNum(y);
          }
          if (x === y) {
            return 0;
          } else {
            if (colTarget == 1) {
              return x > y ? -1 : 1;
            } else {
              return x < y ? -1 : 1;
            }
          }
        });
        RenderSortedTable(sortTable[i], dataTable[i]);
      });
    }
  }
});

function findParent(ele, cls) {
  while ((ele = ele.parentElement) && !ele.classList.contains(cls));
  return ele;
}

function UnFormatStringNum(n) {
  n = n.replace(/[^\d\.-]/g, "");
  return Number(n);
}

function formatContent(string) {
  var span = document.createElement("span");
  span.innerHTML = string.split("<")[0];
  return span.textContent || span.innerText;
}

function targetColumnHeader(target, colIndex, colHeaders) {
  for (let i = 0; i < colHeaders.length; i++) {
    if (i == colIndex) {
      colHeaders[colIndex].setAttribute("data-sort-direction", target);
    } else {
      colHeaders[i].setAttribute("data-sort-direction", 0);
    }
  }
}

function RenderSortedTable(table, data) {
  let tableRows = table
    .getElementsByTagName("tbody")[0]
    .getElementsByTagName("tr");
  for (let i = 0; i < tableRows.length; i++) {
    let tableRowCells = tableRows[i].getElementsByTagName("td");
    for (let cellIndex = 0; cellIndex < tableRowCells.length; cellIndex++) {
      tableRowCells[cellIndex].innerHTML = data[i][cellIndex];
    }
  }
}
