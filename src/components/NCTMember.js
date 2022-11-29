import "./NCTMember.css"
import React, { useEffect, useState } from 'react'
import { Card, Button } from "react-bootstrap"

export default function NCTMember(props) {
  const [buttonState, setButtonState] = useState(true);
  useEffect(() => {
    const peopleExistInList = props.biasList.find((element) => element.name === props.name);
    setButtonState(peopleExistInList === undefined)
  }, [])
	function handleAddClick() {
    const peopleInBias = [{name: props.name, age: props.age}];
    const peopleExistInList = props.biasList.find((element) => element.name === props.name);
    if (peopleExistInList === undefined) {
      props.setBiasList(props.biasList.concat(peopleInBias));
      props.setTotalNum(props.totalNum + 1);
      setButtonState(!buttonState);
    }
  }; 

  function handleRemoveClick() {
    const peopleExistInList = props.biasList.findIndex((element) => element.name === props.name);
    if (peopleExistInList !== undefined) {
      props.setTotalNum(props.totalNum - 1);
      let temp = props.biasList
      temp.map((element) => {
        if (temp.indexOf(element) === peopleExistInList) {
          temp.splice(peopleExistInList, 1);
        } else {
          return element;
        }
      })
      props.setBiasList(temp);
      setButtonState(!buttonState);
    }
    
  };
  const addButton = 
    <Button className="btn btn-dark" type="button" onClick={handleAddClick}> 
      Add to My Bias 
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
      </svg>
    </Button>
  const removeButton = 
    <Button className="btn btn-warning" type="button" onClick={handleRemoveClick}> 
    Remove from My Bias
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
    </svg>
    </Button>
  const card = (
    <Card style={{ width: "16rem" , padding:"0.5rem"}}>
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title><strong>{props.name}</strong></Card.Title>
        <Card.Subtitle> <strong>Position:</strong> {props.position} 
          <br/> <strong>Sub-Groups:</strong> {props.group} 
          <br/> <strong>Age:</strong> {props.age}<hr/>
        </Card.Subtitle>
        <Card.Text className="d-flex flex-column align-items-end">
          { buttonState ? addButton : removeButton } 
        </Card.Text>
      </Card.Body>
    </Card>
  );

  return card
}
