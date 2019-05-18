// login Logic
let username = document.getElementById("username");
let password = document.getElementById("password");
let login = document.getElementById("login");

// Check if username and pasword to match 
function check_(){ 
    if(username.value == "user"){
        return location = "./home.html"
    } if (username.value = "admin") {
        return location = "./admin";
    } else {
        alert("User Not available")
        
    }
}

// Check if tis admin or user logining and redirect to a specific page
login.addEventListener("click", ()=>{
    if(username.value.length > 0 && password.value.length > 0){
        check_();
    } else {
        alert("A field is missing");
    }
});