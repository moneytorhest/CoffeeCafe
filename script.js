// Coffee Cafe Script

let latitude = "";
let longitude = "";

const portal = document.getElementById("orderPortal");
const openPortal = document.getElementById("openPortal");
const closePortal = document.getElementById("closePortal");

// Open popup
openPortal.addEventListener("click", () => {
    portal.style.display = "flex";
});

// Close popup
closePortal.addEventListener("click", () => {
    portal.style.display = "none";
});

// Close if clicked outside
window.addEventListener("click", (e) => {
    if (e.target === portal) {
        portal.style.display = "none";
    }
});

// Get Live Location
function getLocation() {

    if (!navigator.geolocation) {
        alert("Location not supported.");
        return;
    }

    navigator.geolocation.getCurrentPosition(

        (position) => {

            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            document.getElementById("locationText").innerHTML =
                "✅ Location Captured<br>" +
                latitude + ", " + longitude;

        },

        () => {
            alert("Location Permission Denied");
        }

    );

}

// Submit Order
document
.getElementById("orderForm")
.addEventListener("submit", submitOrder);

async function submitOrder(e){

    e.preventDefault();

    const order = {

        name: document.getElementById("name").value,

        phone: document.getElementById("phone").value,

        address: document.getElementById("address").value,

        payment: document.querySelector('input[name="payment"]:checked').value,

        latitude,

        longitude

    };

    try{

        const response = await fetch("/order", {

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

            document.getElementById("locationText").innerHTML =
            "Location Not Selected";

            latitude = "";
            longitude = "";

            portal.style.display = "none";

        }else{

            alert("Order Failed");

        }

    }catch(err){

        console.log(err);

        alert("Server Connection Error");

    }

}
