// ===============================
// Coffee Cafe Script
// ===============================

let latitude = "";
let longitude = "";

const portal = document.getElementById("orderPortal");
const openPortal = document.getElementById("openPortal");
const closePortal = document.getElementById("closePortal");

// Open Popup
openPortal.addEventListener("click", () => {
    portal.style.display = "flex";
});

// Close Popup
closePortal.addEventListener("click", () => {
    portal.style.display = "none";
});

// Close Outside
window.addEventListener("click", (e) => {
    if (e.target === portal) {
        portal.style.display = "none";
    }
});

// Open popup from menu buttons
document.querySelectorAll(".selectBtn").forEach(btn => {
    btn.addEventListener("click", () => {
        portal.style.display = "flex";
    });
});

// ===============================
// Live Location
// ===============================

function getLocation(){

    if(!navigator.geolocation){

        alert("Location not supported.");

        return;

    }

    navigator.geolocation.getCurrentPosition(

        function(position){

            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            document.getElementById("locationText").innerHTML =
            "✅ Location Captured";

        },

        function(){

            alert("Location Permission Denied");

        }

    );

}

// ===============================
// Submit Order
// ===============================

document
.getElementById("orderForm")
.addEventListener("submit", submitOrder);

async function submitOrder(e){

    e.preventDefault();

    const order = {

        item:document.getElementById("item").value,

        quantity:document.getElementById("quantity").value,

        name:document.getElementById("name").value,

        phone:document.getElementById("phone").value,

        address:document.getElementById("address").value,

        payment:document.querySelector(
        'input[name="payment"]:checked'
        ).value,

        latitude,

        longitude

    };

    try{

        const response = await fetch("/order",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(order)

        });

        const data = await response.json();

        if(data.success){

            alert("☕ Order Placed Successfully!");

            document.getElementById("orderForm").reset();

            latitude="";
            longitude="";

            document.getElementById("locationText").innerHTML=
            "Location Not Selected";

            portal.style.display="none";

        }else{

            alert("Order Failed");

        }

    }catch(error){

        console.log(error);

        alert("Server Error");

    }

}
