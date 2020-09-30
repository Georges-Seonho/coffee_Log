const getWaterData = () =>
  axios.get("/dashboard/api/waterData").then((result) => {
    return result.data;
  });

const getCoffeeQtyData = () =>
  axios.get("/dashboard/api/coffeeQtyData").then((result) => {
    return result.data;
  });

chartIt();

async function chartIt() {
  let waterData = await getWaterData();
  let coffeeQtyData = await getCoffeeQtyData();
  console.log(waterData);
  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: waterData,
      datasets: [
        {
          label: "# of Votes",
          data: coffeeQtyData,
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
