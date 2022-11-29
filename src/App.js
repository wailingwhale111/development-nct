import React, { useState } from "react";
import './App.css';
import nctData from "./assets/nct-data.json";
import NCTMember from "./components/NCTMember";
import Aggregator from "./components/Aggregator";
import { Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


nctData.forEach((member) => {
  member.image = process.env.PUBLIC_URL + "/" + member.image;
});

function App() {
  const [biasList, setBiasList] = useState([]);
  const [totalNum, setTotalNum] = useState(0);
  const [position, setPosition] = useState("All");
  const [group, setGroup] = useState("All");
  const [sorting, setSorting] = useState("Age");
  
  let total = 0;

  const selectFilterGroup = eventKey => {
    setGroup(eventKey);
  };

  const selectFilterPosition = eventKey => {
    setPosition(eventKey)
  };

  const selectSorting = eventKey => {
    setSorting(eventKey)
  };

  const matchesFilterGroup = member => {
	// all items should be shown when no filter is selected
    if(group === "All" && position ==="All") { 
      return true
    } else if (member.group.includes(group) && position ==="All") {
      return true
    } else if (member.position.includes(position) && group ==="All") {
      return true
    } else if (member.group.includes(group) && member.position.includes(position)) {
      return true
    } else {
      return false
    }
  }

  function handleClearFilter() {
    setGroup("All");
    setPosition("All");
    setSorting("Age");
  }

  let filteredData = nctData.filter(matchesFilterGroup);
  let sortedData = (sorting === "Age" ? filteredData.sort((a, b) => {return b.age - a.age;}) 
    : filteredData.sort((a, b) => {return a.alphabetical - b.alphabetical;}))

  return (
    <div className="App">
      <Container>
        <Row>
          <Col lg={3}>
            <Aggregator
              selectSorting={selectSorting}
              selectFilterPosition={selectFilterPosition}
              selectFilterGroup={selectFilterGroup}
              total={total}
              handleClearFilter={handleClearFilter}
              totalNum={totalNum}
              setTotalNum={setTotalNum}
              biasList={biasList}/>
            {/* <Card>
              <Card.Body>
                <DropdownButton
                  id="dropdown-button-dark-example1"
                  variant="secondary"
                  menuVariant="dark"
                  title="Sort by:"
                  className="mt-2"
                  onSelect={selectSorting}>
                  <Dropdown.Item eventKey="Age"> Age </Dropdown.Item>
                  <Dropdown.Item eventKey="Alphabetical"> Alphabetical </Dropdown.Item>
                </DropdownButton>
                <DropdownButton 
                  id="dropdown-button-dark-example2"
                  variant="secondary"
                  menuVariant="dark"
                  title="Filter by Position:"
                  className="mt-2"
                  onSelect={selectFilterPosition}>
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
                  onSelect={selectFilterGroup}>
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
                  total += age
                    return (
                    <ListGroup.Item>
                      {name}: {age}
                    </ListGroup.Item>
                  )})}
                  <br/>
                <Button className="btn btn-danger" type="button" onClick={handleClearFilter}>Clear Filter</Button>
                </Card.Body>
                <Card.Footer>Average Age of My Bias: {totalNum === 0 ? "" : total / totalNum}</Card.Footer>
              </Card> */}
          </Col>
          <Col>
            <h1><strong>My NCT Universe</strong></h1> 
            <Container>
              <Row>
                {sortedData.map((member, index) => (
                 <Col id={index} className="d-flex justify-content-around align-items-stretch">
                   <NCTMember 
                    key={member.name} 
                    name={member.name} 
                    image={member.image} 
                    position={member.position} 
                    group={member.group}  
                    age={member.age}
                    setBiasList={setBiasList} 
                    biasList={biasList}
                    totalNum={totalNum}
                    setTotalNum={setTotalNum}/>
                </Col>))}
              </Row>
            </Container>
          </Col>
          
        </Row>
      </Container>
    </div>
  );
}

export default App;
