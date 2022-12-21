import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Images } from "../../Utils/logos";
import { getIconPdf } from "../../Utils/parseIcons";

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

function PdfPolicyCardInline({ policy }) {
  const fontSize = "7px";

  const coverages = {};
  policy.products[0].coverages.map((item, index) => {
    coverages[item.coverage_tag] = item;
  });

  return (
    <Card className="primary-card p-1">
      <Row>
        <Col
          xs={2}
          className="text-center"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div className="text-center mx-auto">
            {policy.products[0].manufacturer ? (
              <img
                src={Images[policy.products[0].manufacturer.toLowerCase()]}
                style={{
                  maxWidth: "80%",
                  height: "25px",
                  objectFit: "contain",
                  padding: "3px",
                }}
              />
            ) : null}
            <h6
              className="mx-auto bold"
              style={{ fontSize: "6px", marginBottom: 0 }}
            >
              {policy.products[0].name
                .toLowerCase()
                .replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                  letter.toUpperCase()
                )}
            </h6>
            <h6
              style={{
                color: "rgb(32, 132, 227)",
                fontSize: "8px",
                marginTop: 0,
                marginBottom: 0,
              }}
            >
              {formatter.format(policy.total_price)}
            </h6>
          </div>
        </Col>
        <Col style={{lineHeight: '10px'}}>
          <span style={{ fontSize: fontSize, overflowWrap: "break-word" }}>
            {/* //?Responsabilidad Civil: */}
            <span
              className="line_info"
            >
              {getIconPdf(coverages["RESEXT"]?.description)}
              <strong style={{ color: "var(--gray-color)" }}>
                Responsabilidad Civil:
              </strong>{" "}
              <span>
                <i>{coverages["RESEXT"]?.description || "No disponible"}</i>
              </span>
            </span>
            {/* //?Perdida total daño: */}
            <span
              className="line_info"
            >
              {getIconPdf(coverages["DEBPTD"]?.description)}
              <strong style={{ color: "var(--gray-color)" }}>
                Perdida total daño:
              </strong>{" "}
              <span>
                <i>{coverages["DEBPTD"]?.description || "No Disponible"}</i>
              </span>
            </span>
            {/* //?Perdida parcial daños: */}
            <span
              className="line_info"
            >
              {getIconPdf(coverages["DEBPPD"]?.description)}
              <strong style={{ color: "var(--gray-color)" }}>
                Perdida parcial daños:
              </strong>{" "}
              <span>
                <i>{coverages["DEBPPD"]?.description || "No Disponible"}</i>
              </span>
            </span>
            {/* //?Grúa: */}
            <span
              className="line_info"
            >
              {getIconPdf(coverages["SERGRU"]?.description)}
              <strong style={{ color: "var(--gray-color)" }}>Grúa:</strong>{" "}
              <span>{coverages["SERGRU"]?.description || "No Cubre"}</span>
            </span>
            {/* //?Vehículo de reemplazo: */}
            <span
              className="line_info"
            >
              {getIconPdf(coverages["VEHRPT"]?.description)}
              <strong style={{ color: "var(--gray-color)" }}>
                Vehículo de reemplazo:
              </strong>{" "}
              <span>{coverages["VEHRPT"]?.description || "No Cubre"}</span>
            </span>
            {/* //?Conductor elegido: */}
            <span
              className="line_info"
            >
              {getIconPdf(coverages["CONELG"]?.description)}
              <strong style={{ color: "var(--gray-color)" }}>
                Conductor elegido:
              </strong>{" "}
              <span>
                {coverages["CONELG"]?.description || "No Cubre"}
              </span>
            </span>
          </span>
        </Col>
      </Row>
    </Card>
  );
}

export { PdfPolicyCardInline };
