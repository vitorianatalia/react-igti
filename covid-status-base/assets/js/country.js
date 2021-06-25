(() => {
  document.getElementById("filtro").addEventListener("click", handleFiltro);

  (async () => {
    const api = await axios.create({
      baseURL: "https://api.covid19api.com",
    });

    let countries = await api.get("/countries");

    loadCountries(countries.data);
  })();
})();

function loadCountries(data) {
  let combo = document.getElementById("cmbCountry");

  data.sort((a, b) => {
    let x = a.Country.toUpperCase();
    let y = b.Country.toUpperCase();

    return x === y ? 0 : x > y ? 1 : -1;
  });

  for (index in data) {
    combo.options[combo.options.length] = new Option(
      data[index].Country,
      data[index].Country,
      data[index].Country == "Brazil" ? true : false,
      data[index].Country == "Brazil" ? true : false
    );
  }
}

function handleFiltro() {
  let country = document.getElementById("cmbCountry").value;
  let status = document.getElementById("cmbData").value;

  let startDate = new Date(document.getElementById("date_start").value);
  let endDate = new Date(document.getElementById("date_end").value);

  let start_Date = dateFns.addDays(startDate, -1);
  let end_Date = dateFns.addDays(endDate, +1);

  fetch(`https://api.covid19api.com/total/country/${country}`)
    .then((response) => response.json())
    .then((json) => loadDate(json));

  fetch(
    `https://api.covid19api.com/total/country/${country}/status/${status}?from=${start_Date.toISOString()}&to=${end_Date.toISOString()}`
  )
    .then((response) => response.json())
    .then((json) => createLineChart(json));
}

function loadDate(data) {
  let size = _.last(data);

  document.getElementById("kpiconfirmed").innerText =
    size.Confirmed.toLocaleString("PT");
  document.getElementById("kpideaths").innerText =
    size.Deaths.toLocaleString("PT");
  document.getElementById("kpirecovered").innerText =
    size.Recovered.toLocaleString("PT");
}

function createLineChart(data) {
  let status = data[0].Status;
  let last = _.last(data);
  let first = _.first(data);

  let cases = [];
  for (let i = 1; i < data.length; i++) {
    deltaDaily = data[i].Cases - data[i - 1].Cases;
    cases.push(deltaDaily);
  }

  console.log(cases);

  let date = [];
  for (let i = 1; i < data.length - 1; i++) {
    date.push(data[i].Date);
  }

  let difDates = dateFns.differenceInDays(last.Date, data[0].Date);
  let difCases = last.Cases - first.Cases;
  let mediaCalc = Math.floor(difCases / difDates);

  let media = [];
  for (let i = 0; i < data.length; i++) {
    media.push(mediaCalc);
  }

  let line = new Chart(document.getElementById("linhas"), {
    type: "line",
    data: {
      labels: [...date],
      datasets: [
        {
          data: [...cases],
          label: `Número de ${status}`,
          backgroundColor: ["#ffcc5c"],
          borderColor: ["#ffeead "],
        },

        {
          data: [...media],
          label: `Média de ${status}`,
          backgroundColor: ["#ff6f69"],
          borderColor: ["#fe4a49"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: top,
        },
        title: {
          display: true,
          text: "Curva diária de Covid-19",
        },
      },
    },
  });
}
