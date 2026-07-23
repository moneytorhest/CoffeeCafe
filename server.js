const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Receive Order
app.post("/order", (req, res) => {

    const order = req.body;

    console.clear();

    console.log("==================================");
    console.log("☕ NEW COFFEE ORDER");
    console.log("==================================");
    console.log("🥤 Item      :", order.item);
    console.log("🔢 Quantity  :", order.quantity);
    console.log("👤 Name      :", order.name);
    console.log("📞 Phone     :", order.phone);
    console.log("🏠 Address   :", order.address);
    console.log("💳 Payment   :", order.payment);
    console.log("📍 Latitude  :", order.latitude);
    console.log("📍 Longitude :", order.longitude);

    if (order.latitude && order.longitude) {

        console.log(
            "🗺 Google Maps : https://maps.google.com/?q=" +
            order.latitude +
            "," +
            order.longitude
        );

    }

    console.log("🕒 Time :", new Date().toLocaleString());
    console.log("==================================");

    let orders = [];

    if (fs.existsSync("orders.json")) {

        try {

            orders = JSON.parse(
                fs.readFileSync("orders.json")
            );

        } catch {

            orders = [];

        }

    }

    orders.push({

        ...order,
        time: new Date().toLocaleString()

    });

    fs.writeFileSync(
        "orders.json",
        JSON.stringify(orders, null, 2)
    );

    res.json({
        success: true,
        message: "Order Received"
    });

});

// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Start Server
app.listen(PORT, "0.0.0.0", () => {

    console.log("==================================");
    console.log("☕ Coffee Cafe Server Started");
    console.log("🌐 Port :", PORT);
    console.log("==================================");

});
