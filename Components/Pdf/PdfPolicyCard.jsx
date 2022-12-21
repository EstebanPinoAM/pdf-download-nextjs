import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Images } from "../../Utils/logos";
import { getIconPdf } from "../../Utils/parseIcons";
import Image from 'next/image'
import { PdfCardInfoVehicle } from "./PdfCardInfo"
var formatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits:0,
  maximumFractionDigits:0,
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

function PdfPolicyCard({ policy }) {
  const fontSize = "7px";
  const imgSize = React.useMemo(()=>{
    return 31;
  },[])
  const [coverages,] = React.useState(()=>{
    const obj = {};
    policy.products[0].coverages.map((item, index) => {
      obj[item.coverage_tag] = item;
    });
    return obj;
  })
  

  return (
    <Card className="primary-card-pdf p-0">
      <Row>
        <Col xs={2} className="text-center" style={{ display: "flex", alignItems: "center" }}>
          <div className="text-center mx-auto">
            {policy.products[0].manufacturer ? (
              <img src={Images[policy.products[0].manufacturer.toLowerCase()]} style={{ width : imgSize, height:imgSize, objectFit:"contain"}} />
              // <img style={{ width : imgSize, height:imgSize, objectFit:"contain"}} src="data:image/png;base64,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"></img>
            ) : null}
            <h6 className="mx-auto bold" style={{ fontSize: "6px", marginBottom: 0 }}>
              {policy.products[0].name.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}
            </h6>
            <h6 style={{ color: "rgb(32, 132, 227)", fontSize: "8px", marginTop: 0, marginBottom: 0 }}>
              {formatter.format(policy.total_price)}
            </h6>
          </div>
        </Col>
        {/* <Col>
          <div
            className="w-100"
            style={{
              fontSize: fontSize,
              marginTop: "0.1em",
            }}
          >
            <span>
              {
                getIconPdf(coverages["RESEXT"]?.description)
              }
              <strong style={{color:"var(--gray-color)"}}>Responsabilidad Civil:</strong> <br />
              <span style={{ marginLeft: 14 }}>
                  {coverages["RESEXT"]?.description || "No disponible"}
              </span>
            </span>
          </div>
          <div className="w-100" style={{ fontSize: fontSize }}>
            <span>
              {
                getIconPdf(coverages["DEBPTD"]?.description)
              }
              <strong style={{color:"var(--gray-color)"}}>Perdida total daño:</strong> <br />
              <span style={{ marginLeft: 14 }}>
                {coverages["DEBPTD"]?.description || "No Disponible"}
              </span>
            </span>
          </div>
        </Col>
        <Col>
          <div
            className="w-100"
            style={{ fontSize: fontSize, 
              marginTop: "0.1em", }}
          >
            <span>
              {
                getIconPdf(coverages["DEBPPD"]?.description)
              }
              <strong style={{color:"var(--gray-color)"}}>Perdida parcial daños:</strong> <br />
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
                getIconPdf(coverages["SERGRU"]?.description)
              }
              <strong style={{color:"var(--gray-color)"}}>Grúa:</strong> <br />
              <span style={{ marginLeft: 14 }}>
                {coverages["SERGRU"]?.description || "No Cubre"}
              </span>
            </span>
          </div>
        </Col>
        <Col>
          <div
            className="w-100"
            style={{ fontSize: fontSize, 
              marginTop: "0.1em", }}
          >
            <span>
              {
                getIconPdf(coverages["VEHRPT"]?.description)
              }
              <strong style={{color:"var(--gray-color)"}}>Vehículo de reemplazo:</strong> <br />
              <span style={{ marginLeft: 14 }}>
                {coverages["VEHRPT"]?.description || "No Cubre"}
              </span>
            </span>
          </div>
          <div className="w-100" style={{ fontSize: fontSize }}>
            <span>
              {
                getIconPdf(coverages["CONELG"]?.description)
              }
              <strong style={{color:"var(--gray-color)"}}>Conductor elegido:</strong> <br />
              <span style={{ marginLeft: 14 }}>
                {coverages["CONELG"]?.description || "No Cubre"}
              </span>
            </span>
          </div>
        </Col> */}
        <PdfCardInfoVehicle coverages={coverages} ></PdfCardInfoVehicle>
      </Row>
    </Card>
  );
}

export { PdfPolicyCard };
