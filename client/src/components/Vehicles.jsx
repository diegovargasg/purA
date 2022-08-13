import React, { useState, useEffect } from "react"
import API from "../utils/dao"
import Table from "react-bootstrap/Table"
import { map } from "lodash"
import { Button } from "react-bootstrap"
import { AddModal } from "./AddModal"

export function Vehicles(props) {
  const [vehicles, setvehicles] = useState([])
  const [showModalNew, setShowModalNew] = useState(false)
  const [vehicleGroup, setVehicleGroup] = useState([])

  const newVehicleFields = [
    { label: "Group name", type: "text", required: true, maxLength: 50 }
  ]

  useEffect(() => {
    const fetchData = async () => {
      const response = await API.fetchData("vehicles")
      setvehicles(response.data)
    }

    const fetchVehicleGroups = async () => {
      const response = await API.fetchData("vehicles/groups")
      const group = []
      map(response.data, (vehicle) => {
        group.push({
          vehicleId: vehicle.vehicle_group_id,
          vehicleGroup: vehicle.name
        })
      })
      setVehicleGroup(group)
    }

    fetchData().catch(console.error)
    fetchVehicleGroups().catch(console.error)
  }, [])

  function closeModal() {
    setShowModalNew(false)
  }

  async function saveModal() {
    API.fetchData("vehicles")
  }

  return (
    <div className="p-2 px-md-5 mb-4">
      <div className="container-fluid">
        <h3 className="display-6 fw-bold my-5">
          Vehicles
          <Button
            style={{ float: "right" }}
            onClick={() => {
              setShowModalNew(true)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-plus"
              viewBox="0 0 16 16"
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
            New Vehicle
          </Button>
        </h3>
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
                <tr key={vehicle.vehicle_id}>
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
      <AddModal
        title="Add new vehicle"
        showModalNew={showModalNew}
        onCloseModal={closeModal}
        onSaveModal={saveModal}
        dropDown={{ label: "Select a Group", data: vehicleGroup }}
        formInputs={newVehicleFields}
      />
    </div>
  )
}
