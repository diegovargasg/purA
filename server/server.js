const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")

const db = mysql.createPool({
  host: "mysql_db",
  user: "MYSQL_USER",
  password: "MYSQL_PASSWORD",
  database: "pura"
})

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/vehicles", (req, res) => {
    const SelectQuery = 
        `SELECT v.vehicle_id, v.name as vehicle_name, vg.name as vehicle_group, v.created
        FROM vehicle as v, vehicle_group as vg
        WHERE v.vehicle_group_id = vg.vehicle_group_id
        GROUP BY v.vehicle_id`;
    db.query(SelectQuery, (err, result) => {
      res.send(result)
    })
})

app.get("/vehicles/groups", (req, res) => {
    const SelectQuery = `SELECT * from vehicle_group`;
    db.query(SelectQuery, (err, result) => {
      res.send(result)
    })
})

app.get("/dealers", (req, res) => {
    const SelectQuery = "SELECT * FROM dealer";
    db.query(SelectQuery, (err, result) => {
      res.send(result)
    })
})

app.get("/customers", (req, res) => {
    const SelectQuery = `SELECT c.customer_id, c.name as customer_name, d.name as dealer_name
    FROM customer as c, dealer as d
    WHERE d.dealer_id = c.dealer_id
    GROUP BY c.customer_id`;
    db.query(SelectQuery, (err, result) => {
      res.send(result)
    })
})

app.listen("3001", () => {})
