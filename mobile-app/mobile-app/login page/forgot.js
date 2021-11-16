var forgot = document.getElementById("forgot");
var maincontainer = document.getElementById("main-container");
var popup = document.getElementById("popup");
var resetpass = document.getElementById("resetpass");
var cross = document.getElementById("cross");


    function forgotpass() {

        cross.style.display = "flex";
        popup.style.display = "block";
        resetpass.style.display = "block";
        
    };
    function closeit(d) {

        cross.style.display = "none";
        popup.style.display = "none";
        resetpass.style.display = "none";
       
        
    };