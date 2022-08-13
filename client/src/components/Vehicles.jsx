import React, { useState, useEffect } from "react"
import API from "../utils/dao"
import Table from "react-bootstrap/Table"
import { map } from "lodash"

export function Vehicles(props) {
  const [vehicles, setvehicles] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await API.fetchData("vehicles")
      setvehicles(response.data)
    }

    fetchData().catch(console.error)
  }, [])

  return (
    <div class="p-2 px-md-5 mb-4">
      <div class="container-fluid">
        <h3 class="display-6 fw-bold my-5">Vehicles</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Vehicle Name</th>
              <th>Group</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {map(vehicles, (vehicle) => {
              return (
                <tr>
                  <td>{vehicle.vehicle_id}</td>
                  <td>{vehicle.vehicle_name}</td>
                  <td>{vehicle.vehicle_group}</td>
                  <td>{vehicle.created}</td>
                  <td>Action</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </div>
  )
}
