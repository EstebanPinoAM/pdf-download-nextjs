import React from "react";
import { getIconPdf } from "../../Utils/parseIcons";
import splitArrayToPairs from "../../Utils/splitArrayToPairs";
import { Col } from "react-bootstrap";

export function PdfCardInfoVehicle({ coverages }) {
    const fontSize = "7px";
  const [data, setData] = React.useState([
    {
      "Responsabilidad Civil":
        coverages["RESEXT"]?.description || "No disponible",
      icon: getIconPdf(coverages["RESEXT"]?.description),
    },
    {
      "Perdida total daño":
        coverages["DEBPTD"]?.description || "No Disponible",
      icon: getIconPdf(coverages["DEBPTD"]?.description),
    },
    {
      "Perdida parcial daños":
        coverages["DEBPPD"]?.description || "No Disponible",
      icon: getIconPdf(coverages["DEBPPD"]?.description),
    },
    {
      Grúa: coverages["SERGRU"]?.description || "No Cubre",
      icon: getIconPdf(coverages["SERGRU"]?.description),
    },
    {
      "Vehículo de reemplazo": coverages["VEHRPT"]?.description || "No Cubre",
      icon: getIconPdf(coverages["VEHRPT"]?.description),
    },
    {
      "Conductor elegido": coverages["CONELG"]?.description || "No Cubre",
      icon: getIconPdf(coverages["CONELG"]?.description),
    },
  ]);
  // console.log(data);

  return (
    <>
      {splitArrayToPairs(data).map(([obj1, obj2], index) => 
        <Col  key={index}>
          <div
            className="w-100"
            style={{ fontSize: fontSize, marginTop: "0.1em" }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <span style={{ paddingTop: "1px" }}>
                {obj1.icon}
              </span>
              <span style={{color:"var(--gray-color)"}}>
              <strong style={{color:"var(--gray-color)"}}>{Object.keys(obj1)[0]}: </strong><br />
                {obj1[Object.keys(obj1)[0]]}
              </span>
            </div>
          </div>
          <div className="w-100" style={{ fontSize: fontSize}}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <span style={{ paddingTop: "1px" }}>
                {obj2.icon}
              </span>
              <span style={{color:"var(--gray-color)"}}>
              <strong style={{color:"var(--gray-color)"}}>{Object.keys(obj2)[0]}:</strong><br />
                {obj2[Object.keys(obj2)[0]]}
              </span>
            </div>
          </div>
          
        </Col>
      )}
    </>
  );
}
