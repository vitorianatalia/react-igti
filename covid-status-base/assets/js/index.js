(async () => {
  const api = await axios.create({
    baseURL: "https://api.covid19api.com",
  });

  let summary = await api.get("/summary");

  loadSummary(summary.data);
  createPieChart(summary.data);
  createBarChart(summary.data);
  handleDate(summary.data);
})();

function loadSummary(data) {
  let confirmed = document.getElementById("confirmed");
  let death = document.getElementById("death");
  let recovered = document.getElementById("recovered");

  confirmed.innerText = data.Global.TotalConfirmed.toLocaleString("PT");
  death.innerText = data.Global.TotalDeaths.toLocaleString("PT");
  recovered.innerText = data.Global.TotalRecovered.toLocaleString("PT");
}

function createPieChart(data) {
  let pizza = new Chart(document.getElementById("pizza"), {
    type: "pie",
    data: {
      labels: ["Confirmados", "Mortes", "Recuperados"],
      datasets: [
        {
          data: [
            data.Global.NewConfirmed,
            data.Global.NewDeaths,
            data.Global.NewRecovered,
          ],
          backgroundColor: ["#fe8a71", "#3da4ab", "#f6cd61"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Distribuição de novos casos",
        },
      },
    },
  });
}

function createBarChart(data) {
  const ordened = _.orderBy(data.Countries, ["TotalDeaths"], ["desc"]);

  const top10list = _.take(ordened, 10);

  let top10 = [];
  for (let i = 0; i < 10; i++) {
    top10.push(top10list[i]);
  }

  let countries = [];

  for (let i = 0; i < 10; i++) {
    countries.push(top10[i].Country);
  }

  let tdeaths = [];

  for (let i = 0; i < 10; i++) {
    tdeaths.push(top10[i].TotalDeaths);
  }

  let bar = new Chart(document.getElementById("barras"), {
    type: "bar",
    data: {
      labels: [...countries],
      datasets: [
        {
          data: [...tdeaths],
          backgroundColor: ["#65737e", "#a7adba"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Total de Mortes por País - Top 10",
        },
      },
    },
  });
}

function handleDate(data) {
  let attDate = document.getElementById("date");
  var data = new Date(),
    dia = data.getDate().toString(),
    diaF = dia.length == 1 ? "0" + dia : dia,
    mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
    mesF = mes.length == 1 ? "0" + mes : mes,
    anoF = data.getFullYear();
  attDate.innerText = "Atualizado em: " + diaF + "/" + mesF + "/" + anoF;
}
