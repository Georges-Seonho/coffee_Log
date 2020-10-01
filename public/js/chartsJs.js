let ratio;
let dates;

const getRatioData = () =>
  axios.get("/dashboard/api/ratioData").then((result) => {
    return result.data;
  });

chartRatioSatisfaction();

console.log(Chart.defaults);

async function chartRatioSatisfaction() {
  let result = await getRatioData();
  let date = result.datesData;
  let ratio = result.ratioData;
  let rates = result.ratesData;
  const ctx = document.getElementById("myChart").getContext("2d");
  const ratioAndSatisfactionChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: date,
      datasets: [
        {
          label: "coffee/water ratio in %",
          yAxisID: "A",
          data: ratio,
          backgroundColor: ["rgba(241,197,63, 0.2)"],
          borderColor: ["rgba(241,197,63, 1)"],
          borderWidth: 1.5,
        },
        {
          label: "satisfaction on a 5points scale",
          data: rates,
          yAxisID: "B",
          fill: false,
          borderColor: ["rgba(255,62,47, 1)"],
          borderWidth: 1.5,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Coffee/water ratio and satisfaction for each of your logs",
      },
      legend: {
        display: true,
        position: "bottom",
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false,
            },
            id: "A",
            type: "linear",
            position: "left",
            ticks: {
              max: 50,
              min: 0,
              stepSize: 10,
            },
          },
          {
            gridLines: {
              display: false,
            },
            id: "B",
            type: "linear",
            position: "right",
            ticks: {
              max: 5,
              min: 0,
              stepSize: 1,
            },
          },
        ],
      },
    },
  });
}

const getProfilData = () =>
  axios.get("/dashboard/api/profilData").then((result) => {
    return result.data;
  });
getProfilData();
chartFlavorProfil();

async function chartFlavorProfil() {
  let result = await getProfilData();
  let flavorsProfil = result;
  let scale = Math.max(...Object.values(result));
  let { acidic, fruity, floral, burned, sweet, nutty } = flavorsProfil;

  const ctx = document.getElementById("chart2").getContext("2d");
  const flavorProfilChart = new Chart(ctx, {
    type: "radar",
    data: {
      labels: ["Acidic", "Fruity", "Floral", "Burned", "Sweet", "Nutty"],
      datasets: [
        {
          data: [acidic, fruity, floral, burned, sweet, nutty],
          label: "occurrences # for each flavor",
          backgroundColor: ["rgba(255,62,47, 0.1)"],
          borderColor: ["rgba(255,62,47, 1)"],
          borderWidth: 1.5,
        },
      ],
    },
    options: {
      elements: {
        point: {
          backgroundColor: "rgba(255,62,47, 1)",
        },
      },
      tooltips: {
        enabled: false,
      },
      title: {
        display: true,
        text: "Flavors distribution among all your logs",
      },
      legend: {
        display: true,
        position: "bottom",
      },
      scale: {
        angleLines: {
          display: false,
        },
        ticks: {
          suggestedMin: 0,
          suggestedMax: scale,
        },
      },
    },
  });
}
