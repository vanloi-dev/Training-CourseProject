function Login() {
  axios
    .post("http://localhost:5050/api/login", {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      role: document.getElementById("role").value,
    })
    .then((response) => {
      response;
      window.location.href =
        "http://localhost/Training-CourseProject/Frontend/academics/index.html";

    })
    .catch((response) => {
      window.location.href =
        "http://localhost/Training-CourseProject/Frontend/academics/login.html";
      alert("Username is not found. Invalid login credentials.");
      console.log(response.message);
    });
}
