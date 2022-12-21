import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Images } from "../../Utils/logos";
import { getIcon } from "../../Utils/parseIcons";
import { CardInfoVehicle } from "./HorizontalCardInfo";
import "./HorizontalCard.css"
var formatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits:0,
});

const dictValue = {
  MM_COP: 1000000,
};


function HorizontalCard({ policy }) {
  const fontSize = "12px";

  const coverages = {};
  policy.products[0].coverages.map((item, index) => {
    coverages[item.coverage_tag] = item;
  });

  return (
    <Card className="primary-card p-1">
      <Row>
        <Col
          sm
          className="text-center "
          style={{ display: "flex", alignItems: "center" }}
        >
          <div className="text-center mx-auto">
            {policy.products[0].manufacturer ? (
              <img src={Images[policy.products[0].manufacturer.toLowerCase()]} style={{ height:45, width:45, objectFit:"contain" }} />
            ) : null}
            <h6 className="mx-auto bold" style={{ fontSize: "11px", marginBottom: 0 }}>
              {policy.products[0].name.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}
            </h6>
            <h6 style={{ color: "rgb(32, 132, 227)", fontSize: "14px", marginTop: 0 }}>
              {formatter.format(policy.total_price)}
            </h6>
          </div>
        </Col>
        <CardInfoVehicle coverages={coverages}></CardInfoVehicle>
        {/* <Col sm className="text-center text-sm-start">
          <div
            className="w-100"
            style={{
              fontSize: fontSize,
              marginTop: "0.1em",
            }}
          >
            <span>
              {
                getIcon(coverages["RESEXT"]?.description)
              }
              Responsabilidad Civil: <br />
              <span style={{ marginLeft: 14 }}>
                  {coverages["RESEXT"]?.description || "No disponible"}
              </span>
            </span>
          </div>
          <div className="w-100" style={{ fontSize: fontSize }}>
            <span>
              {
                getIcon(coverages["DEBPTD"]?.description)
              }

              Perdida total daño: <br />
              <span style={{ marginLeft: 14 }}>
                {coverages["DEBPTD"]?.description || "No Disponible"}
              </span>
            </span>
          </div>
        </Col>
        <Col sm className="text-center text-sm-start">
          <div
            className="w-100"
            style={{ fontSize: fontSize, marginTop: "0.1em" }}
          >
            <span>
              {
                getIcon(coverages["DEBPPD"]?.description)
              }

              Perdida parcial daños: <br />
              <span style={{ marginLeft: 14 }}>
                {coverages["DEBPPD"]?.description || "No Disponible"}
              </span>
            </span>
          </div>
          <div
            className="w-100"
            style={{
              fontSize: fontSize,
            }}
          >
            <span>
              {
                getIcon(coverages["SERGRU"]?.description)
              }

              Grúa: <br />
              <span style={{ marginLeft: 14 }}>
                {coverages["SERGRU"]?.description || "No Cubre"}
              </span>
            </span>
          </div>
        </Col>
        <Col sm className="text-center text-sm-start">
          <div
            className="w-100"
            style={{ fontSize: fontSize, marginTop: "0.1em" }}
          >
            <div style={{ display: 'flex', flexDirection:"row"}}>
              <span style={{paddingTop:"1px"}}>
                {
                  getIcon(coverages["VEHRPT"]?.description)
                }
              </span>
              <span>
                Vehículo de reemplazo: <br />
                <span style={{ marginLeft: 14 }}>
                  {coverages["VEHRPT"]?.description || "No Cubre"}
                </span>
              </span>
            </div>
          </div>
          <div className="w-100" style={{ fontSize: fontSize }}>
            <div style={{ display: 'flex', flexDirection:"row"}}>
              <span style={{paddingTop:"1px"}}>
                {
                  getIcon(coverages["CONELG"]?.description)
                }
              </span>
              <span>
                Conductor elegido: <br />
                {coverages["CONELG"]?.description || "No Cubre"}
              </span>
            </div>
          </div>
        </Col> */}
      </Row>
    </Card>
  );
}

export { HorizontalCard };
