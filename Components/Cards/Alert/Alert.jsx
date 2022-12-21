import React from "react";
import "./Alert.css";
import { Col, Container } from 'react-bootstrap';


function Alert(props){
    return (
      <Col xs={11} sm={11} md={12}  lg={12} className="Message">
        <Container fluid className="Message-body">
          {props.message}
        </Container>
        {/* <button className="Message-close js-messageClose"><i class="fa fa-times"></i></button> */}
      </Col>

    )
}

export { Alert }