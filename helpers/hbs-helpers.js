const hbs = require("hbs");
const dayjs = require("dayjs");

hbs.registerHelper("formatDate", function (date) {
  return dayjs(date).format("DD/MM/YYYY");
});
