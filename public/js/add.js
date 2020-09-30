const getRatioData = () =>
  axios.get("/dashboard/api/add").then((result) => {
    console.log(result.data.datesData);
    return result.data;
  });