import React, { useState, useEffect } from "react"
import API from "../utils/dao"
import Table from "react-bootstrap/Table"
import { map } from "lodash"

export function Customers(props) {
  const [customers, setcustomers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await API.fetchData("customers")
      setcustomers(response.data)
    }

    fetchData().catch(console.error)
  }, [])

  return (
    <div class="p-2 px-md-5 mb-4">
      <div class="container-fluid">
        <h3 class="display-6 fw-bold my-5">Customers</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Customer Name</th>
              <th>Dealer Name</th>
            </tr>
          </thead>
          <tbody>
            {map(customers, (customer) => {
              return (
                <tr>
                  <td>{customer.customer_id}</td>
                  <td>{customer.customer_name}</td>
                  <td>{customer.dealer_name}</td>
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
