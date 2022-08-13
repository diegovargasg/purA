import React, { useState, useEffect } from "react"
import API from "../utils/dao"
import Table from "react-bootstrap/Table"
import { map } from "lodash"

export function Dealers(props) {
  const [dealers, setDealers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await API.fetchData("dealers")
      setDealers(response.data)
    }

    fetchData().catch(console.error)
  }, [])

  return (
    <div class="p-2 px-md-5 mb-4">
      <div class="container-fluid">
        <h3 class="display-6 fw-bold my-5">Dealers</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {map(dealers, (dealer) => {
              return (
                <tr>
                  <td>{dealer.dealer_id}</td>
                  <td>{dealer.name}</td>
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
