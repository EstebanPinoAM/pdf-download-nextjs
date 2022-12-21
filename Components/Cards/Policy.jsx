import { Button } from "@progress/kendo-react-buttons";
import { Checkbox } from "@progress/kendo-react-inputs";
import React from "react";
import { Card, Col, FormCheck, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";

var formatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
});

const dictValue = {
  MM_COP: 1000000,
};

const tagToInt = (tag) => {
  //Conver test to money
  let parts = tag.split(" ");
  const [money, currency] = parts;
  return parseInt(money) * dictValue[currency];
};

const StyleStatus = {
  "Recomendada": "3px solid green",
  "Visible": "3px solid #f7cd1f",
  "Oculta": "3px solid #eee"
}

const dictStatus = {
  "Recomendada": 1,
  "Visible": 2,
  "Oculta": 3
}

export default function Policy({
  policy,
  index,
  selected,
  setSelected,
  setDetailsPolicy,
  editable,
  stablishChange
}) {
  const coverages = {};
  policy.products[0].coverages.map((item, index) => {
    coverages[item.coverage_tag] = item;
  });

  const [viewStatus, setViewStatus] = React.useState(policy.view_status)

  const onSelect = (e, index) => {
    if (e.target.value) {
      setSelected([...selected, index]);
    } else {
      setSelected(selected.filter((item) => item !== index));
    }
  };

  const changeStatus = (e) => {
    setViewStatus(e.target.value)
    stablishChange({[policy.id_db]: dictStatus[e.target.value]})
  }

  const getPDF = () => {
    window.open(policy.document_reference?.url, '_blank').focus();
  }

  return (
    <Card className="shadow border-radius" style={{borderLeft: viewStatus ? StyleStatus[viewStatus] : ""}}>
      {policy.favorite ? 
      <div style={{position: "absolute", top: 3, left: 3, color: "gold", fontSize: "2em"}}>
      <i className="fa fa-shopping-cart"></i>
      </div> : null}
      <div className="mx-auto" style={{ height: 80 }}>
        <img src={policy.products[0].logo} style={{ height: 80 }} />
      </div>
      <h6 className="mx-auto bold text-center" style={{ fontWeight: 700 }}>
        {policy.products[0].name}
      </h6>
      <div
        style={{ marginTop: "0.15em", fontSize: "0.85em" }}
      >
        <Row>
          <Col xs={6}>
            <div className="w-100 text-center">
              <span>
                <i
                  className="fa fa-check"
                  style={{ color: "green", marginRight: 5 }}
                ></i>
                RESEXT:{" "}
                <p style={{ marginLeft: 18 }}>
                  <i>{coverages["RESEXT"]?.description}</i>
                </p>
              </span>
            </div>
          </Col>
          <Col xs={6}>
            <div className="w-100 text-center">
              <span>
                <i
                  className="fa fa-check"
                  style={{ color: "green", marginRight: 5 }}
                ></i>
                DEBPTD:{" "}
                <p style={{ marginLeft: 18 }}>
                  <i>{coverages["DEBPTD"]?.description}</i>
                </p>
              </span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <div className="w-100 text-center">
              <span>
                <i
                  className="fa fa-check"
                  style={{ color: "green", marginRight: 5 }}
                ></i>
                DEBPPD:{" "}
                <p style={{ marginLeft: 18 }}>
                  <i>{coverages["DEBPPD"]?.description}</i>
                </p>
              </span>
            </div>
          </Col>
          <Col xs={6}>
            <div className="w-100 text-center">
              <span>
                <i
                  className={
                    coverages["VEHRPT"]
                      ? "fa fa-check"
                      : "fa fa-times"
                  }
                  style={{
                    color: coverages["VEHRPT"] ? "green" : "red",
                    marginRight: 5,
                  }}
                ></i>
                VEHRPT:{" "}
                <p style={{ marginLeft: 18 }}>
                  {coverages["VEHRPT"]?.description || "No Cubre"}
                </p>
              </span>
            </div>
          </Col>
        </Row>
      </div>
      <div className="mx-auto text-center" style={{ paddingBottom: "1em"}}>
        <Row className="text-center mt-1 mb-1">
          <span className="text-muted mx-auto">Expira: {policy.offer_expiration_date}</span>
        </Row>
        <h6 style={{ color: "rgb(32, 132, 227)", fontSize: "1em" }}>
          {formatter.format(policy.total_price)}
        </h6>
        <Row>
          <Col>
            <Button themeColor="secondary" className="mx-auto" onClick={() => setDetailsPolicy(policy)}>
              VER MAS
            </Button>
          </Col>
        </Row>
        <div className="mt-2">
          <Checkbox onChange={(e) => onSelect(e, index)} />
          <FormCheckLabel style={{ marginLeft: "1em" }} className="text-muted">
            Añadir a Comparativo!
          </FormCheckLabel>
        </div>
        {editable
        ? <div className="mb-3">
            <Form.Control onChange={changeStatus} as="select" size="sm" defaultValue={policy.view_status} className="text-center mt-2" aria-label="Default select example">
              <option value="Recomendada">Recomendada</option>
              <option value="Visible">Visible</option>
              <option value="Oculta">Oculta</option>
            </Form.Control>
          </div> : null}
      </div>
    </Card>
  );
}
