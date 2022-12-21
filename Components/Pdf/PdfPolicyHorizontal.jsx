import React from "react";
import { Col, Row } from "react-bootstrap";
import { PdfPolicyCard } from "./PdfPolicyCard";
import { PdfPolicyCardInline } from "./PdfPolicyCardInline";

function PdfPolicyDetails({ data }) {
  const [policies, setPolicies] = React.useState(data.policy_list);
  //! Card en linea para prueba de visualizacion (mantener en false)
  const [inline, setInline] = React.useState(false);

  return (
    <Row>
      {policies.map((item, index) => {
        return (
          <Col md={12} key={index} style={{ padding: "0px 0.8rem" }}>
            <PdfPolicyCard policy={item} />
          </Col>
        );
      })}
      {inline && policies.map((item, index) => {
        return (
          <Col md={12} key={index} style={{ padding: "0 0.8rem" }}>
            <PdfPolicyCardInline policy={item} />
          </Col>
        );
      })}
    </Row>
  );
}

export { PdfPolicyDetails };