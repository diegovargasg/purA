import React, { useState, useEffect } from "react"
import API from "../utils/dao"
import { map } from "lodash"
import { Button } from "react-bootstrap"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"

export function AddModal(props) {
  const [validated, setValidated] = useState(false)

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }

    setValidated(true)
    props.onSaveModal()
  }

  return (
    <Modal show={props.showModalNew}>
      <Modal.Header>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {props.formInputs !== false &&
            map(props.formInputs, (el) => {
              return (
                <Form.Group
                  key={el.label}
                  className="mb-3"
                  controlId="formBasicEmail"
                >
                  <Form.Label>{el.label}</Form.Label>
                  <Form.Control
                    type={el.type}
                    required={el.required}
                    maxlength={el.maxLength}
                  />
                </Form.Group>
              )
            })}
          {props.dropDown !== false && (
            <Form.Select required>
              <option value="">{props.dropDown.label}</option>
              {map(props.dropDown.data, (group) => (
                <option key={group.vehicleId} value={group.vehicleId}>
                  {group.vehicleGroup}
                </option>
              ))}
            </Form.Select>
          )}
        </Form>
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
