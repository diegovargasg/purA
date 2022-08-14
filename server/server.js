const express = require("express")
const { body, param, validationResult } = require("express-validator")
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
  const SelectQuery = `SELECT v.vehicle_id, v.name as vehicle_name, vg.name as vehicle_group, v.created
        FROM vehicle as v, vehicle_group as vg
        WHERE v.vehicle_group_id = vg.vehicle_group_id
        GROUP BY v.vehicle_id ORDER BY v.vehicle_id`
  db.query(SelectQuery, (err, result) => {
    res.send(result)
  })
})

app.get(
  "/vehicles/:id",
  param("id").not().isEmpty().isInt().trim().escape(),
  (req, res) => {
    const SelectQuery = `SELECT vd.vehicle_id, customer_name, n.vehicle_name, vd.data
    FROM 
    (SELECT c.name as customer_name, v.vehicle_id, c.customer_id, v.name as vehicle_name
           FROM customer as c, vehicle as v
           WHERE v.customer_id = c.customer_id AND v.vehicle_id = ${req.params.id}) as n, vehicle_data as vd
    WHERE vd.vehicle_id = n.vehicle_id`
    db.query(SelectQuery, (err, result) => {
      res.send(result)
    })
  }
)

app.post(
  "/vehicles",
  body("name").not().isEmpty().trim().escape(),
  body("customer").not().isEmpty().isInt().trim().escape(),
  body("group").not().isEmpty().trim().escape(),
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const SelectQuery = `INSERT INTO vehicle (name, customer_id, vehicle_group_id, created) VALUES ('${req.body.name}', '${req.body.customer}', '${req.body.group}', NOW());`
    console.log(SelectQuery)
    db.query(SelectQuery, (err, result) => {
      if (err) {
        return res.status(400).json({ error: err, message: err.message })
      }
      return res.send(result)
    })
  }
)

app.delete(
  "/vehicles/:id",
  param("id").not().isEmpty().isInt().trim().escape(),
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const SelectQuery = `DELETE FROM vehicle
            WHERE vehicle_id = ${req.params.id}
            LIMIT 1;`
    console.log(SelectQuery)
    db.query(SelectQuery, (err, result) => {
      if (err) {
        return res.status(400).json({ error: err, message: err.message })
      }
      return res.send(result)
    })
  }
)

app.get("/vehicles/groups", (req, res) => {
  const SelectQuery = `SELECT * from vehicle_group`
  db.query(SelectQuery, (err, result) => {
    res.send(result)
  })
})

app.get("/dealers", (req, res) => {
  const SelectQuery = "SELECT * FROM dealer"
  db.query(SelectQuery, (err, result) => {
    res.send(result)
  })
})

app.get("/customers", (req, res) => {
  const SelectQuery = `SELECT c.customer_id, c.name as customer_name, d.name as dealer_name
    FROM customer as c, dealer as d
    WHERE d.dealer_id = c.dealer_id
    GROUP BY c.customer_id`
  db.query(SelectQuery, (err, result) => {
    res.send(result)
  })
})

app.listen("3001", () => {})
