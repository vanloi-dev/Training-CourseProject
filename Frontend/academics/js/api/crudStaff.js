const axios = require("axios");


function GetListStaff() {
  axios({
    method: "get",
    url: "localhost:5050/staff",
  })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
}

function CreateStaff() {
    axios({
        method: "post",
        url: "localhost:5050/staff",
      })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
}

function CreateStaff() {
    axios({
        method: "post",
        url: "localhost:5050/staff",
      })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
}