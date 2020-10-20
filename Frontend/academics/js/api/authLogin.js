function Login() {
    let payLoad = {
        userName: document.getElementById("uName").value,
        password: document.getElementById("psw").value,
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let arr = JSON.parse(this.responseText);
            localStorage.setItem("accessToken", arr.token);
            window.location.href = "http://localhost/inventory/newFE/product.html";
        }
    };
    xhttp.open("POST", "http://localhost:5050/api/login", true);
    //var cat = localStorage.getItem('myCat');
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(payLoad));
}