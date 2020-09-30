let ratio;
let dates;

const getRatioData = () =>
  axios.get("/dashboard/api/ratioData").then((result) => {
    console.log(result.data.datesData);
    return result.data;
  });

chartIt();

async function chartIt() {
  let result = await getRatioData();
  console.log(result)
  let date = result.datesData;
  let ratio = result.ratioData;
  console.log(ratio, date);
  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: date,
      datasets: [
        {
          label: "# of Votes",
          data: ratio,
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
