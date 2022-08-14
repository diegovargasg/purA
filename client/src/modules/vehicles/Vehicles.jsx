import React, { useState, useEffect } from "react"
import API from "../../utils/dao"
import Table from "react-bootstrap/Table"
import { map, get } from "lodash"
import { Button } from "react-bootstrap"
import { AddModal } from "./AddModal"
import { ViewModal } from "./ViewModal"

export function Vehicles(props) {
  const [vehicles, setvehicles] = useState([])
  const [vehicleInfo, setVehicleInfo] = useState({})
  const [showModalNew, setShowModalNew] = useState(false)
  const [showModalView, setShowModalView] = useState(false)
  const [vehicleGroup, setVehicleGroup] = useState([])
  const [alert, setAlert] = useState({})

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

  useEffect(() => {
    fetchData().catch(console.error)
    fetchVehicleGroups().catch(console.error)
  }, [])

  function closeModal() {
    setShowModalNew(false)
    setAlert({})
  }

  async function saveModal(data) {
    try {
      const response = await API.saveData("vehicles", data)
      if (response.status === 200) {
        fetchData().catch(console.error)
        setAlert({ message: "Vehicle successfully saved", type: "success" })
      }
    } catch (e) {
      const validationError = get(e, "response.data.errors.0.msg", "")
      const ServerError = get(e, "response.data.message", "")
      setAlert({ message: `${validationError}${ServerError}`, type: "danger" })
    }
  }

  async function deleteVehicle(id) {
    try {
      const response = await API.deleteData("vehicles", id)
      if (response.status === 200) {
        fetchData().catch(console.error)
      }
    } catch (e) {
      const validationError = get(e, "response.data.errors.0.msg", "")
      const ServerError = get(e, "response.data.message", "")
      // setAlert({ message: `${validationError}${ServerError}`, type: "danger" })
    }
  }

  async function getVehicle(id) {
    try {
      const response = await API.fetchData(`vehicles/${id}`)
      if (response.status === 200) {
        console.log(response)
        setShowModalView(true)
        setVehicleInfo(...response.data)
        fetchData().catch(console.error)
      }
    } catch (e) {
      const validationError = get(e, "response.data.errors.0.msg", "")
      const ServerError = get(e, "response.data.message", "")
      // setAlert({ message: `${validationError}${ServerError}`, type: "danger" })
    }
  }

  function closeModalView() {
    setVehicleInfo(false)
    setShowModalView(false)
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
                  <td style={{ textAlign: "center" }}>
                    <Button variant="success" style={{ marginRight: "10px" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pencil"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                      </svg>
                    </Button>
                    <Button
                      variant="primary"
                      style={{ marginRight: "10px" }}
                      onClick={() => getVehicle(vehicle.vehicle_id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-search"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                      </svg>
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteVehicle(vehicle.vehicle_id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path
                          fillRule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />
                      </svg>
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
      <AddModal
        title="Add new vehicle"
        showModal={showModalNew}
        onCloseModal={closeModal}
        onSaveModal={saveModal}
        dropDown={{ label: "Select a Group", data: vehicleGroup }}
        alert={alert}
      />
      <ViewModal
        title="View vehicle"
        showModal={showModalView}
        vehicleInfo={vehicleInfo}
        onCloseModal={closeModalView}
      />
    </div>
  )
}
