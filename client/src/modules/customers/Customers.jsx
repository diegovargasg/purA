import React, { useState, useEffect } from "react";
import API from "../../utils/dao";
import Table from "react-bootstrap/Table";
import { map } from "lodash";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export function Customers(props) {
  const [customers, setcustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await API.fetchData("customers");
      setcustomers(response.data);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <div className="p-2 px-md-5 mb-4">
      <div className="container-fluid">
        <h3 className="display-6 fw-bold my-5">
          Customers
          <Button className="float-end">
            <FontAwesomeIcon icon={faPlus} className="me-1" />
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
                <tr key={customer.customer_id}>
                  <td>{customer.customer_id}</td>
                  <td>{customer.customer_name}</td>
                  <td>{customer.dealer_name}</td>
                  <td align="right">
                    <Button variant="success" className="me-3">
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                    <Button variant="danger">
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Link className="btn btn-secondary mt-5 float-end" to="/">
          Go Back
        </Link>
      </div>
    </div>
  );
}
