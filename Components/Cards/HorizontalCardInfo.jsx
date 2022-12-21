import React from "react";
import { getIcon } from "../../Utils/parseIcons";
import splitArrayToPairs from "../../Utils/splitArrayToPairs";
import { Col } from "react-bootstrap";

export function CardInfoVehicle({ coverages }) {
  const fontSize = "12px";
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    if (!coverages) return;
    setData([
      {
        "Responsabilidad Civil":
          coverages["RESEXT"]?.description || "No disponible",
        icon: getIcon(coverages["RESEXT"]?.description),
      },
      {
        "Perdida total daño":
          coverages["DEBPTD"]?.description || "No Disponible",
        icon: getIcon(coverages["DEBPTD"]?.description),
      },
      {
        "Perdida parcial daños":
          coverages["DEBPPD"]?.description || "No Disponible",
        icon: getIcon(coverages["DEBPPD"]?.description),
      },
      {
        Grúa: coverages["SERGRU"]?.description || "No Cubre",
        icon: getIcon(coverages["SERGRU"]?.description),
      },
      {
        "Vehículo de reemplazo": coverages["VEHRPT"]?.description || "No Cubre",
        icon: getIcon(coverages["VEHRPT"]?.description),
      },
      {
        "Conductor elegido": coverages["CONELG"]?.description || "No Cubre",
        icon: getIcon(coverages["CONELG"]?.description),
      },
    ]);
  }, [coverages]);
  return (
    <>
      {splitArrayToPairs(data).map(([obj1, obj2], index) => 
        <Col sm className="text-center text-sm-start" key={index}>
          <div
            className="w-100"
            style={{ fontSize: fontSize, marginTop: "0.1em" }}
          >
            <div className="justify-content-center justify-content-sm-start" style={{ display: "flex", flexDirection: "row" }}>
              <span style={{ paddingTop: "1px" }}>
                {obj1.icon}
              </span>
              <span>
                {Object.keys(obj1)[0]}: <br />
                {obj1[Object.keys(obj1)[0]]}
              </span>
            </div>
          </div>
          <div className="w-100" style={{ fontSize: fontSize }}>
            <div className="justify-content-center justify-content-sm-start" style={{ display: "flex", flexDirection: "row" }}>
              <span style={{ paddingTop: "1px" }}>
                {obj2.icon}
              </span>
              <span>
                {Object.keys(obj2)[0]}: <br />
                {obj2[Object.keys(obj2)[0]]}
              </span>
            </div>
          </div>
        </Col>
      )}
    </>
  );
}
