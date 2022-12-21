import React from "react";
import { Col, Row } from "react-bootstrap";
import { HorizontalCard } from "../Cards/HorizontalCard";

export default function PolicyDetailsHorizontal({ data }) {
  const [policies, setPolicies] = React.useState(data.policy_list);
  
  return (
    <Row className="mx-auto">
      {policies.map((item, index) => {
        return (
          <Col md={12} key={index} style={{ padding: "0 0.8rem" }}>
            <HorizontalCard policy={item} />
          </Col>
        );
      })}
    </Row>
  );
}
