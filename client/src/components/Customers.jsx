import React, { useState, useEffect } from "react"
import API from "../utils/dao"
import Table from "react-bootstrap/Table"
import { map } from "lodash"
import { Button } from "react-bootstrap"

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
        <h3 class="display-6 fw-bold my-5">
          Customers
          <Button style={{float:"right"}}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-plus"
              viewBox="0 0 16 16"
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
            New Customer
          </Button>
        </h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Customer Name</th>
              <th>Dealer Name</th>
              <th></th>
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
