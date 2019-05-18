// login Logic
let username = document.getElementById("username");
let password = document.getElementById("password");
let signup = document.getElementById("signup");
let email = document.getElementById("email");

// Check if tis admin or user logining and redirect to a specific page
signup.addEventListener("click", ()=>{
    if(username.value.length > 0 && email.value.length>0 && password.value.length > 0){
        return location="./home.html";
    } else {
        alert("A field is missing");
    }
}); 