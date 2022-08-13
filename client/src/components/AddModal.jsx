import React, { useState } from "react"
import { map } from "lodash"
import { Button } from "react-bootstrap"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import Alert from "react-bootstrap/Alert"

export function AddModal(props) {
  const [validated, setValidated] = useState(false)
  const [name, setName] = useState("")
  const [group, setGroup] = useState("")
  const [customer, setCustomer] = useState("")

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }

    setValidated(true)
    props.onSaveModal({ name, group, customer })
  }

  return (
    <Modal show={props.showModalNew}>
      <Modal.Header>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              required
              maxLength={50}
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>CustomerID</Form.Label>
            <Form.Control
              type="text"
              required
              maxLength={50}
              value={customer}
              onChange={(e) => {
                setCustomer(e.target.value)
              }}
            />
          </Form.Group>

          {props.dropDown !== false && (
            <Form.Select
              required
              value={group}
              onChange={(e) => {
                setGroup(e.target.value)
              }}
            >
              <option value="">{props.dropDown.label}</option>
              {map(props.dropDown.data, (group) => (
                <option key={group.vehicleId} value={group.vehicleId}>
                  {group.vehicleGroup}
                </option>
              ))}
            </Form.Select>
          )}
        </Form>
        <Form.Group className="mt-5">
          {props.error !== "" && <Alert variant="danger">{props.error}</Alert>}
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.onCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
