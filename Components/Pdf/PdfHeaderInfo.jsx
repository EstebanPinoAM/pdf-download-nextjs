import React from "react";
import { Row, Col } from "react-bootstrap";
import { searchParty } from "../../Utils/searchParty";

var formatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits:0
});

export function PdfHeaderInfoVehicle({ oportunity, justified }) {
  const RiskIn = oportunity.risk_in;
  const getSubtitle = React.useCallback((word) => {
    if(!word) return
    return word.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
  },[])
  //! Información de asegurado y vehículo
  const [vehicleInfo] = React.useState([
    // ! Asegurado
    {
      Asegurado:
        searchParty(oportunity, "Asegurado").party_type === "person" ? (
          <span>
            {searchParty(oportunity, "Asegurado").person.firstname +
              " " +
              searchParty(oportunity, "Asegurado").person.lastname}
          </span>
        ) : (
          <span>{searchParty(oportunity, "Asegurado").organization.name}</span>
        ),
      Identificación:
        RiskIn.parties[0].party_type === "person" ? (
          <span>{RiskIn.parties[0].person?.identification_number}</span>
        ) : (
          <span>{RiskIn.parties[0].organization?.identification_number}</span>
        ),
      Celular:
        searchParty(oportunity, "Asegurado").party_type === "person" ? (
          <span>
            {
              searchParty(oportunity, "Asegurado").person?.contact_data[0]
                ?.contact_info.phone
            }
          </span>
        ) : (
          <span>
            {
              searchParty(oportunity, "Asegurado").organization?.contact_data[0]
                ?.contact_info.phone
            }
          </span>
        ),
      Email:
        searchParty(oportunity, "Asegurado").party_type === "person" ? (
          <span>
            {
              searchParty(oportunity, "Asegurado").person.contact_data[0]
                ?.contact_info?.email
            }
          </span>
        ) : (
          <span>
            {
              searchParty(oportunity, "Asegurado").organization?.contact_data[0]
                ?.contact_info?.email
            }
          </span>
        ),
      Edad:
        RiskIn.parties[0].party_type === "person" ? (
          <span>
            {new Date().getFullYear() -
              new Date(RiskIn.parties[0].person.birht_date).getFullYear()}
          </span>
        ) : (
          <span>NA</span>
        ),
      Género:
        RiskIn.parties[0].party_type === "person" ? (
          <span>{RiskIn.parties[0].person?.gender}</span>
        ) : (
          <span>NA</span>
        ),
    },
    {
      Vehículo: (
        <span>
          {RiskIn.insurable_objects[0].vehicle.brand +
            " " +
            RiskIn.insurable_objects[0].vehicle.line}
        </span>
      ),
      Modelo: <span>{RiskIn.insurable_objects[0].vehicle.model}</span>,
      Placa:
        RiskIn.insurable_objects[0].type == "vehicle" ? (
          <span>{RiskIn.insurable_objects[0].vehicle.plate}</span>
        ) : null,
      Circulación: (
        <span>
          {getSubtitle(RiskIn.ubication.place.city_name)} - {RiskIn.ubication.place.state_name}
        </span>
      ),
      Uso: (
        <span>
          {getSubtitle(RiskIn.insurable_objects[0].vehicle.vehicle_risk.use_type)}
        </span>
      ),
      "Cod Fasecolda": RiskIn.insurable_objects[0].vehicle.codification.code,
      "Val Fasecolda": (
        <span>
          {formatter.format(
            RiskIn.insurable_objects[0].vehicle.vehicle_risk.reference_price
          )}
        </span>
      ),
      "Val Solicitado": 
        RiskIn.insurable_objects[0].vehicle.vehicle_risk.commercial_price !== 
        RiskIn.insurable_objects[0].vehicle.vehicle_risk.reference_price?
        <span>
          {formatter.format(
            RiskIn.insurable_objects[0].vehicle.vehicle_risk.commercial_price
          )}
        </span>:
        null
      ,
      "Val Accesorios": formatter.format(
        RiskIn.insurable_objects[0].vehicle.vehicle_risk.accesories_price
      ),
    },
  ]);
  const fontSize = "6px";
  const fontSizeTitle = "8px";
  const fontSizeSubTitle = "7px";

  return (
    <Row style={{margin:"0.3em 0 0 0", paddingRight:0}}>
      <Col style={{padding:0, margin:0}}>
        {vehicleInfo.map((obj, idx) => (
          <Row key={idx} style={{ fontSize: fontSizeSubTitle, marginTop: "0.5em", paddingRight:0 }}>
            <span
              className={justified ? "" : "text-center"}
              style={{ overflowWrap: "break-word", paddingLeft: "0px" }}
            >
              {Object.entries(obj).map(([key, value], idx) => ( value &&
                <span
                className="header_line_info"
                  key={idx}
                >
                  <span>
                    <strong>{key}: </strong>
                  </span>
                  <span style={{ marginBottom: "0.3em" }}>{value}</span>
                </span>
              ))}
            </span>
          </Row>
        ))}
      </Col>
    </Row>
  );
}
