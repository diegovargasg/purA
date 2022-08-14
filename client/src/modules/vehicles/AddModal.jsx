import React, { useState } from "react"
import { map, isEmpty } from "lodash"
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
    event.preventDefault()
    event.stopPropagation()

    const form = event.currentTarget
    if (form.checkValidity()) {
      props.onSaveModal({ name, group, customer })
    }
    setValidated(true)
  }

  const handleClose = () => {
    setName("")
    setGroup("")
    setCustomer("")
    setValidated(false)
    props.onCloseModal()
  }

  return (
    <Modal centered show={props.showModalNew} onHide={handleClose}>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              type="number"
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

          <Form.Group className="mt-5">
            {!isEmpty(props.alert) && (
              <Alert variant={props.alert.type}>{props.alert.message}</Alert>
            )}
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
