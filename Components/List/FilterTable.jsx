import { Input } from "@progress/kendo-react-inputs";
import React from "react";
import {
  Card,
  Col,
  FormControl,
  FormLabel,
  FormText,
  InputGroup,
  Row,
} from "react-bootstrap";

const initialFilter = (name) => {
  return {
    logic: "and",
    filters: [
      {
        field: "name",
        operator: "contains",
        value: name,
      },
    ],
  };
};

export default function FilterTable() {
  const [name, setName] = React.useState("");

  const onChange = (e) => {
    setName(e.target.value);
    console.log(initialFilter(e.target.value));
  };

  return (
    <Card className="text-center pl-5" style={{ padding: "12px 12px" }}>
      <Col xs={12} className="text-center">
        <InputGroup className="mx-auto text-center">
          <FormLabel>Nombre</FormLabel>
          <Input name="name" className="mb-2" onChange={onChange} />
        </InputGroup>
      </Col>
      <Col xs={12}>
        <InputGroup className="mx-auto text-center">
          <FormLabel>Precio</FormLabel>
          <Input
            className="mb-2"
            onChange={onChange}
            name="min"
            placeholder="Minimo"
          />
          <Input
            className="mb-2"
            onChange={onChange}
            name="max"
            placeholder="Maximo"
          />
        </InputGroup>
      </Col>
    </Card>
  );
}
