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
          <Col lg={3} style={{position: "sticky"}}>
            <Aggregator
              selectSorting={selectSorting}
              selectFilterPosition={selectFilterPosition}
              selectFilterGroup={selectFilterGroup}
              total={total}
              handleClearFilter={handleClearFilter}
              totalNum={totalNum}
              setTotalNum={setTotalNum}
              biasList={biasList}/>
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
