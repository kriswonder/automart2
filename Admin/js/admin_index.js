let _overlay = document.getElementById("dely");
let _delete = document.getElementById("cnel");
let _done = document.getElementById("nsd");
let _cancel = document.getElementById("njad");
let _addeleted = document.getElementById("addeleted");
let create_ad = document.getElementById("create");
let _save_changes = document.getElementById("savd");

// Show alert
function show_alert(object, action){
    return object.style.display = action;
}

_delete.addEventListener("click", ()=>{
    _overlay.style.display = "block";
});

_done.addEventListener("click", ()=>{
    _overlay.style.display = "none";
    setTimeout(show_alert(_addeleted, "block"), 200)
   
});

_cancel.addEventListener("click", ()=>{
    _overlay.style.display = "none";
});

create_ad.addEventListener("click", ()=>{

    _save_changes.style.display = "block";
});