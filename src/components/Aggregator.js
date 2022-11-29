import React from 'react'
import { Card, Button, DropdownButton } from "react-bootstrap"

export default function Aggregator(props) {
  return (<Card>
              <Card.Body>
                <DropdownButton
                  id="dropdown-button-dark-example1"
                  variant="secondary"
                  menuVariant="dark"
                  title="Sort by:"
                  className="mt-2"
                  onSelect={props.selectSorting}>
                  <Dropdown.Item eventKey="Age"> Age </Dropdown.Item>
                  <Dropdown.Item eventKey="Alphabetical"> Alphabetical </Dropdown.Item>
                </DropdownButton>
                <DropdownButton 
                  id="dropdown-button-dark-example2"
                  variant="secondary"
                  menuVariant="dark"
                  title="Filter by Position:"
                  className="mt-2"
                  onSelect={props.selectFilterPosition}>
                  <Dropdown.Item eventKey="All"> All </Dropdown.Item>
                  <Dropdown.Item eventKey="Vocalist">Vocalist</Dropdown.Item>
                  <Dropdown.Item eventKey="Rapper">Rapper</Dropdown.Item>
                  <Dropdown.Item eventKey="Dancer">Dancer</Dropdown.Item>
                  <Dropdown.Item eventKey="Leader">Leader</Dropdown.Item>
                </DropdownButton>
                <DropdownButton
                  id="dropdown-button-dark-example3"
                  variant="secondary"
                  menuVariant="dark"
                  title="Filter by SubGroups:"
                  className="mt-2"
                  onSelect={props.selectFilterGroup}>
                  <Dropdown.Item eventKey="All"> All </Dropdown.Item>
                  <Dropdown.Item eventKey="NCT DREAM">NCT DREAM</Dropdown.Item>
                  <Dropdown.Item eventKey="NCT 127">NCT 127</Dropdown.Item>
                  <Dropdown.Item eventKey="NCT U">NCT U</Dropdown.Item>
                  <Dropdown.Item eventKey="WayV">WayV</Dropdown.Item>
                  <Dropdown.Item eventKey="NCT 2018">NCT 2018</Dropdown.Item>
                  <Dropdown.Item eventKey="NCT 2020">NCT 2020</Dropdown.Item>
                  <Dropdown.Item eventKey="NCT 2021">NCT 2021</Dropdown.Item>
                </DropdownButton>
                <br/>
                <strong>My Bias List:</strong> 
                {biasList.map(({name, age}) => {
                  props.total += age
                    return (
                    <ListGroup.Item>
                      {name}: {age}
                    </ListGroup.Item>
                  )})}
                  <br/>
                <Button className="btn btn-danger" type="button" onClick={props.handleClearFilter}>Clear Filter</Button>
                </Card.Body>
                <Card.Footer>Average Age of My Bias: {props.totalNum === 0 ? "" : props.total / props.totalNum}</Card.Footer>
              </Card>
              )
}
