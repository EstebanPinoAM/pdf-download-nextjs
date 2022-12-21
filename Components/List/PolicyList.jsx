import React from "react";
import { Col, Row } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
/* import { updateOffersOnCRM } from "../../Utils/getOportunity"; */
import PolicyFea from "../Cards/PolicyCard";
import { Alert } from "../Cards/Alert"
import { DataContext } from "../../App";


const socket = new WebSocket("wss://www.agm-dev.com/websocket/") 

export default function PolicyList({ setPoliciesCompare, setDetails, data, idOportunity, editable, setEditable, changes, setChanges,policies, setPolicies, changeFavorite}) {
  const [messages, setMessages] = React.useState([]);
  const [favorite,setFavorite] = React.useState(null);
  const { context,setContext } = React.useContext(DataContext);

   React.useEffect(() => {
    policies.map((policy)=>{
      if(policy.favorite){
        setFavorite(policy.id_db);
      }
    })
   },[])

  const stablishChange = (changs) => {
    setChanges({...changes, ...changs})
  }
  
  const [selected, setSelected] = React.useState([]);
  const [policySelected, setPolicySelected] = React.useState([]);

  React.useEffect(() => {
    setPolicySelected(
      policies.filter((item, index) => selected.includes(index))
    );
    policies.map((policy)=>{
      if(policy.favorite){
        console.log(policy)
        setFavorite(policy.id_db);
      }
    })
  }, [selected]);

  const setDetailsPolicy = (policy) => {
    setDetails([policy]);
  };

  React.useEffect(() => {
    setPoliciesCompare(policySelected);
  }, [policySelected]);

  socket.onmessage = (evt) => {
    try {
      const eventData = JSON.parse(evt.data)
      const {name, data} = eventData
      if (name == "update-policy"){
        if (policies.find(policy=> policy.id_db == data.id_db)=== undefined){
          setPolicies([...policies, data]);
          setContext({...context,policies:[...context.policies,data]});
        }
      }
      if (name == "message-policy"){
        setMessages([...messages,data])
      }
    } catch (e){
      console.log(e);
    }
  }

  //Sockets part
  React.useEffect(() => {
    try {
      socket.send(JSON.stringify({meta: "create_room", roomID: window.location.host+"_crm.lead_"+idOportunity, clientID: uuidv4(), message: ""}))
    } catch (e) {
      console.log(e);
    }
  }, [])

  return (
    <React.Fragment>

    <Row style={{paddingLeft: "12px", paddingTop: "0.4em", textAlign: "center"}}>
      {policies.map((item, index) => {
        return (
          <Col xs={12} sm={6} lg={12} md={12} key={index} className="padding-card">
            <PolicyFea
              policy={item}
              index={index}
              key={index}
              editable={editable}
              selected={selected}
              stablishChange = {stablishChange}
              setDetailsPolicy={setDetailsPolicy}
              setSelected={setSelected}
              favorite={favorite}
              setFavorite = {setFavorite}
              fetchFavorite = {changeFavorite}
              setPolicies = {setPolicies}
              policies = {policies}
            />
          </Col>
        );
      })}
    </Row>
    
    <Row  className="justify-content-center" >
    {
        messages?.map((message, index) => (
            <Alert key={index} message={message} >
            </Alert> 
        ))
    }
    </Row>

    
    
    </React.Fragment>
  );
}
