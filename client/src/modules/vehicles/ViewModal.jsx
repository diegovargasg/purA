import React from "react"
import { get } from "lodash"
import { Button } from "react-bootstrap"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"

export function ViewModal(props) {
  console.log(props)
  return (
    <Modal centered show={props.showModal}>
      <Form noValidate>
        <Modal.Header>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>
              <b>Vehicle Id:</b> {get(props, "vehicleInfo.vehicle_id", "")}
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              <b>Vehicle Name:</b> {get(props, "vehicleInfo.vehicle_name", "")}
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              <b>Customer Name:</b> {get(props, "vehicleInfo.customer_name", "")}
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-3">
            <b>Data:</b>
            <p>{get(props, "vehicleInfo.data", "")}</p>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>props.onCloseModal()}>Close</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
