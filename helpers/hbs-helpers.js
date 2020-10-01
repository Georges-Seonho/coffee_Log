const hbs = require("hbs");
const dayjs = require("dayjs");

hbs.registerHelper("isSameId", function (value1, value2, options) {
  if (value1.toString() === value2.toString()) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper("isSameValue", (val1, val2, options) => {
  if (val1.toString() === val2) return "checked";
});

hbs.registerHelper("isValueIncluded", (val1, val2, options) => {
  if (val1.includes(val2)) return "checked";
});

hbs.registerHelper("formatDateInput", function (date) {
  return dayjs(date).format("YYYY-MM-DD");
});

hbs.registerHelper("formatDate", function (date) {
  return dayjs(date).format("DD/MM/YYYY");
});

hbs.registerHelper("isCurrentURL", (val1, val2, val3, val4, val5, val6, val7, options) => {
  if (val1 === val2) return "active";
  else if (val1 === val3) return "active";
  else if (val1 === val4) return "active";
  else if (val1 === val5) return "active";
  else if (val1 === val6) return "active";
  else if (val1 === val7) return "active";
});
