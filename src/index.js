let now = new Date();
let days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
let day = days[now.getDay()];
let mins = now.getMinutes();
let hours = now.getHours();
let fullDate = `${day} ${hours}:${mins}`;

let h3 = document.querySelector("h3");
h3.innerHTML = fullDate;
