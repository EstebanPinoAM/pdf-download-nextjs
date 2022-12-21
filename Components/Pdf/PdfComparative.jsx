import * as React from "react";
import { PdfPolicyTable } from "./PdfPolicyTable";
import { Col, Row, Table } from "react-bootstrap";
import { PdfPolicyDetails } from "./PdfPolicyHorizontal";
import { PdfHeaderInfoVehicle } from "./PdfHeaderInfo"
import Image from 'next/image'


const fontSize = "6px";
const fontSizeTitle = "8px";
const fontSizeSubTitle = "7px";
const ParsePoliciesByStatus = (policies, origin) => {
  const InComparative = [];
  const inResume = [];
  policies?.forEach((policy) => {
    if ((policy.view_status == "Recomendada") && InComparative.length <= 4 || (policies.length == 1 && origin == "ver mas")) {
      InComparative.push(policy);
    } else if (policy.view_status == "Visible" || (policy.view_status == "Recomendada" && InComparative.length > 4)) {
      inResume.push(policy);
    }
  });
  return [InComparative, inResume];
};


function PdfPoliciesComparative({ oportunity, tenant, origin, isExportPDF }) {
  const ParsedPolicies = ParsePoliciesByStatus(oportunity.policy_list, origin);
  const [toPrint, setToPrint] = React.useState(true);
  const [policiesComparative, setPoliciesComparative] = React.useState(
    ParsedPolicies[0]
  );
  const [policiesResume, setPoliciesResume] = React.useState(ParsedPolicies[1]);
  const [asessor, setAsessor] = React.useState(`https://${tenant}`);
  const [justified, setJustified] = React.useState(true);
  const str = "default-src 'self'; img-src https://*; child-src 'none';"
  return (
    <React.Fragment>
      <div id="wrapper" className={isExportPDF ? "comparative-font": "container wrapper comparative-font"} style={{}}>
        <Row style={{ marginLeft: "-2px", marginRight: "1px", padding: "2px"}} >
          <Col style={{ margin:0, padding:0}}>
            <Row style={{ margin:0, paddingRight:0, width: "100%"}}>
              {/* //! Imagen */}
              <Col className="justify-content-center" xs={2} style={{ padding: "3px", display: "flex", alignItems: "center", }}>
                {/* //? Imagen comentada */}
                <img
                  width={"auto"}
                  style={{ maxWidth:"100%", maxHeight:"35px" }}
                  // src={Images["liberty"]}
                  src={`${asessor}/web/image?model=res.company&id=1&field=logo`}
                />
                {/* <Image src={`/allianz.png`}  alt={"allianz"} width={30} height={30}/> */}
              </Col>
              {/* //! Info Asesor */}
              <Col style={{ margin:"0.5em 0"}}>
              {/* //!Fila 1 */}
                <Row className="row_header_asessor" style={{ fontSize: fontSizeTitle}}>
                  {oportunity?.broker?.company?.name && <Col className="text-center">
                    <span>
                      <strong>{oportunity?.broker?.company?.name}</strong>
                    </span>
                  </Col>}
                  {oportunity?.broker?.company?.address && <Col className="text-center">
                    <span>
                      <strong>{oportunity?.broker?.company?.address}</strong>
                    </span>
                  </Col>}
                  {oportunity?.broker?.company?.website && <Col className="text-center">
                    <span>
                      <strong><u>{oportunity?.broker?.company?.website}</u></strong>
                    </span>
                  </Col>}
                </Row>
              {/* //!Fila 2 */}
                <Row style={{ fontSize:fontSizeSubTitle, marginTop: "5px"}}>
                  <Col style = {{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
                    <span style={{ whiteSpace: "nowrap" }}>
                        <span><strong>Asesor:{" "}</strong></span>
                        <span>
                          {oportunity?.broker?.name ? oportunity?.broker?.name : ""}
                        </span>
                    </span>        
                    <span style={{ whiteSpace: "nowrap" }}>
                        <span><strong>Email:{" "}</strong></span>
                        <span>
                          {oportunity?.broker?.email ? oportunity?.broker?.email : ""}
                        </span>
                    </span> 
                    <span style={{ whiteSpace: "nowrap" }}>
                        <span><strong>Teléfono:{" "}</strong></span>
                        <span>
                          {oportunity?.broker?.phone ? oportunity?.broker?.phone : ""}
                        </span>
                    </span> 
                    <span style={{ whiteSpace: "nowrap" }}>
                        <span><strong>Celular:{" "}</strong></span>
                        <span>
                          {oportunity?.broker?.phone ? oportunity?.broker?.phone : ""}
                        </span>
                      </span> 
                  </Col>
                </Row>                            
              </Col>
            </Row>
          </Col>
          
          {/* //! Aquí iban los valores de cabecera estaticos */}
          <PdfHeaderInfoVehicle oportunity={oportunity} justified={justified}/>
        </Row>
        {policiesComparative.length !== 0 && (
          <span className="table_text">
              <strong>Estas son las ofertas recomendadas para tu seguro:</strong>
          </span>
        )}
        {policiesComparative.length > 0 ? (
          <div style={{ marginBottom:"30px"}}>

            <PdfPolicyTable
              toPrint={toPrint}
              data={{ policy_list: policiesComparative }}
            />
          </div>
        ) : null}
        {
          policiesResume.length > 0 && 
          <span className="offer_text">
            <strong>
              Para recomendarte tus mejores opciones, entre otras, también
              tuvimos en cuenta estas otras ofertas:
            </strong>
        </span>
        }
        {policiesResume.length > 0
          ? <PdfPolicyDetails data={{ policy_list: policiesResume }} />
          : null}
        <Row className="mt-1" style={{ fontSize: fontSize }}>
          <Col xs={12}>
            <span style={{ fontSize: fontSize + 1 }}>
              <strong style={{ color: "#6a5c5c" }}>IMPORTANTE:</strong>
            </span>
            <p style={{ marginBottom:0}}>
              <span>Esta cotización es provisional y no implica aceptación del
                riesgo, cuyas condiciones están sujetas a cambios de acuerdo a
                políticas y parámetros como:</span>
            </p>
            <ul style={{ marginBottom:0}}>
              <li>
                <span>La Compañía Aseguradora se reserva el derecho de analizar la
                  información contenida en la solicitud de seguro y decidir sobre
                  la aceptación o rechazo del riesgo de acuerdo a su legal
                  criterio.</span>
              </li>
              <li>
                <span>Todos los descuentos técnicos y comerciales aplicados están
                  sujetos a revisión por parte de la Compañía Aseguradora.</span>
              </li>
              <li>
                <span>Estado y valor del vehículo, es dado por la guía de valores
                  Fasecolda, vigente al momento de la cotización y valores de
                  accesorios adicionales, los que sujetos a verificación en el
                  momento de la inspección.</span>
              </li>
                <li>
                  <span>Las coberturas aquí descritas son ilustrativas y pueden
                    variar, están sujetas a las políticas de la aseguradora y las
                    coberturas definitivas otorgadas están descritas en la póliza
                    emitida. Unos de los factores por los cuales pueden variar
                    son:</span>
                  <ul>
                    <li>
                      <span>Los cambios de datos del vehículo inicialmente cotizado.{" "}</span>
                    </li>
                    <li>
                      <span>Cambios de datos del asegurado como identificación, edad, género, profesión, actividad, entre otros.</span>
                    </li>
                    <li><span>Zona de circulación real del vehículo.</span></li>
                    <li>
                      <span>Verificación de descuentos otorgados de acuerdo a la
                        siniestralidad del vehículo.</span>
                    </li>
                  </ul>
                </li>
              <li>
                <span>Las opciones de financiación están sujetas a revisión por parte
                  de las compañías aseguradoras.</span>
              </li>
              <li>
                <span>La vigencia de la cotización depende de cada aseguradora o hasta
                  el último día del mes (lo que primero se cumpla).</span>
              </li>
              <li>
                <span>Las coberturas son sujetas a clausulado, condiciones generales y
                  producto de cada compañía.</span>
              </li>
            </ul>
            {/* <p style={{ marginBottom:0}}>
            <strong style={{ fontSize: fontSize }}>
              Tecnología Agentemotor-(Impresión {new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()})
            </strong>
            </p> */}
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

// {/* //!Info del asegurado */}
// <Row style={{ fontSize:fontSizeSubTitle, marginTop: "1em"}}>
// <span className={justified? "":"text-center"} style={{overflowWrap: "break-word"}}>
//   {/* //?nombre */}
//   <span style={{ whiteSpace: "nowrap" ,paddingRight:"2px", borderRight:"1px solid var(--primary-color)"}}>
//     <span>
//       <strong style={{ color: "#6a5c5c" }}>Asegurado: {" "}</strong>
//     </span>
//     <span style={{ marginBottom: "0.3em" }}>
//       {searchParty(oportunity, "Asegurado").party_type === "person" ? (
//         <i>
//           {searchParty(oportunity, "Asegurado").person.firstname +
//             " " +
//             searchParty(oportunity, "Asegurado").person.lastname}
//         </i>
//       ) : (
//         <i>{searchParty(oportunity, "Asegurado").organization.name}</i>
//       )}
//     </span>
//   </span>
//   {/* //?Identificación */}
//   <span style={{ whiteSpace: "nowrap" ,paddingRight:"2px", paddingLeft:"2px", borderRight:"1px solid var(--primary-color)"}}>
//     <span>
//       <strong style={{ color: "#6a5c5c" }}>Identificación: {" "}</strong>
//     </span>
//     <span style={{ marginBottom: "0.3em" }}>
//       {RiskIn.parties[0].party_type === "person" ? (
//         <i>{RiskIn.parties[0].person?.identification_number}</i>
//       ) : (
//         <i>
//           {
//             RiskIn.parties[0].organization
//               ?.identification_number
//           }
//         </i>
//       )}
//     </span>
//   </span>
//   {/* //?celular */}
//   <span style={{ whiteSpace: "nowrap" ,paddingRight:"2px", paddingLeft:"2px", borderRight:"1px solid var(--primary-color)"}}>
//     <span>
//       <strong style={{ color: "#6a5c5c" }}>Celular: {" "}</strong>
//     </span>
//     <span style={{ marginBottom: "0.3em" }}>
//     {searchParty(oportunity, "Asegurado").party_type === "person" ? (
//       <i>
//         {
//           searchParty(oportunity, "Asegurado").person?.contact_data[0]
//             ?.contact_info.phone
//         }
//       </i>
//     ) : (
//       <i>
//         {
//           searchParty(oportunity, "Asegurado").organization?.contact_data[0]
//             ?.contact_info.phone
//         }
//       </i>
//     )}
//     </span>
//   </span>
//   {/* //?Email */}
//   <span style={{ whiteSpace: "nowrap" ,paddingRight:"2px", paddingLeft:"2px", borderRight:"1px solid var(--primary-color)"}}>
//     <span>
//       <strong style={{ color: "#6a5c5c" }}>Email: {" "}</strong>
//     </span>
//     <span style={{ marginBottom: "0.3em" }}>
//       {searchParty(oportunity, "Asegurado").party_type === "person" ? (
//         <i>
//           {
//             searchParty(oportunity, "Asegurado").person.contact_data[0]
//               ?.contact_info?.email
//           }
//         </i>
//       ) : (
//         <i>
//           {
//             searchParty(oportunity, "Asegurado").organization?.contact_data[0]
//               ?.contact_info?.email
//           }
//         </i>
//       )}
//     </span>
//   </span>
//   {/* //?Edad */}
//   <span style={{ whiteSpace: "nowrap" ,paddingRight:"2px", paddingLeft:"2px", borderRight:"1px solid var(--primary-color)"}}>
//     <span>
//       <strong style={{ color: "#6a5c5c" }}>Edad: {" "}</strong>
//     </span>
//     <span style={{ marginBottom: "0.3em" }}>
//       {RiskIn.parties[0].party_type === "person" ? (
//         <i>{new Date().getFullYear() - new Date(RiskIn.parties[0].person.birht_date).getFullYear()}</i>
//       ) : (
//         <i>NA</i>
//       )}
//     </span>
//   </span>
//   {/* //?Género */}
//   <span style={{ whiteSpace: "nowrap" ,paddingLeft:"2px"}}>
//     <span>
//       <strong style={{ color: "#6a5c5c" }}>Género: {" "}</strong>
//     </span>
//     <span style={{ marginBottom: "0.3em" }}>
//       {RiskIn.parties[0].party_type === "person" ? (
//         <i>{RiskIn.parties[0].person?.gender}</i>
//       ) : (
//         <i>NA</i>
//       )}
//     </span>
//   </span>
// </span>
// </Row>
// {/* //!Info del vehículo */}
// <Row style={{ fontSize:fontSizeSubTitle, marginTop: "1em" }}>
// <span className={justified? "":"text-center"} style={{overflowWrap: "break-word"}}>
//   {/* //?vehiculo */}
//   <span style={{ whiteSpace: "nowrap" ,paddingRight:"2px", borderRight:"1px solid var(--primary-color)"}}>
//     <span>
//       <strong style={{ color: "#6a5c5c" }}>Vehículo: {" "}</strong>
//     </span>
//     <span style={{ marginBottom: "0.3em" }}>
//       <i>
//         {RiskIn.insurable_objects[0].vehicle.brand +
//           " " +
//           RiskIn.insurable_objects[0].vehicle.line}
//       </i>
//     </span>
//   </span>
//   {/* //?Modelo */}
//   <span style={{ whiteSpace: "nowrap" ,paddingRight:"2px", paddingLeft:"2px", borderRight:"1px solid var(--primary-color)"}}>
//     <span>
//       <strong style={{ color: "#6a5c5c" }}>Modelo: {" "}</strong>
//     </span>
//     <span style={{ marginBottom: "0.3em" }}>
//       <i>{RiskIn.insurable_objects[0].vehicle.model}</i>
//     </span>
//   </span>
//   {/* //?Placa */}
//   <span style={{ whiteSpace: "nowrap" ,paddingRight:"2px", paddingLeft:"2px", borderRight:"1px solid var(--primary-color)"}}>
//     <span>
//       <strong style={{ color: "#6a5c5c" }}>Placa: {" "}</strong>
//     </span>
//     <span style={{ marginBottom: "0.3em" }}>
//       {RiskIn.insurable_objects[0].type == "vehicle" ?
//         <i>
//           {RiskIn.insurable_objects[0].vehicle.plate}
//         </i>
//         :
//         null
//       }
//     </span>
//   </span>
//   {/* //?Circulación */}
//   <span style={{ whiteSpace: "nowrap" ,paddingRight:"2px", paddingLeft:"2px", borderRight:"1px solid var(--primary-color)"}}>
//     <span>
//       <strong style={{ color: "#6a5c5c" }}>Circulación: {" "}</strong>
//     </span>
//     <span style={{ marginBottom: "0.3em" }}>
//       <i>
//         {RiskIn.ubication.place.city_name} ({RiskIn.ubication.place.state_name})
//       </i>
//     </span>
//   </span>
//   {/* //?Uso */}
//   <span style={{ whiteSpace: "nowrap" ,paddingRight:"2px", paddingLeft:"2px", borderRight:"1px solid var(--primary-color)"}}>
//     <span>
//       <strong style={{ color: "#6a5c5c" }}>Uso: {" "}</strong>
//     </span>
//     <span style={{ marginBottom: "0.3em" }}>
//       <i>{RiskIn.insurable_objects[0].vehicle.vehicle_risk.use_type.toUpperCase()}</i>
//     </span>
//   </span>
//   {/* //?Cod Fasecolda */}
//   <span style={{ whiteSpace: "nowrap" ,paddingRight:"2px", paddingLeft:"2px", borderRight:"1px solid var(--primary-color)"}}>
//     <span>
//       <strong style={{ color: "#6a5c5c" }}>Cod Fasecolda: {" "}</strong>
//     </span>
//     <span style={{ marginBottom: "0.3em" }}>
//       {RiskIn.insurable_objects[0].vehicle.codification.code}
//     </span>
//   </span>
//   {/* //?Val Fasecolda */}
//   <span style={{ whiteSpace: "nowrap" ,paddingRight:"2px", paddingLeft:"2px", borderRight:"1px solid var(--primary-color)"}}>
//     <span>
//       <strong style={{ color: "#6a5c5c" }}>Val Fasecolda: {" "}</strong>
//     </span>
//     <span style={{ marginBottom: "0.3em" }}>
//       <i>
//         {formatter.format(
//           RiskIn.insurable_objects[0].vehicle.vehicle_risk
//             .reference_price
//         )}
//       </i>
//     </span>
//   </span>
//   {/* //?Val Accesorios */}
//   <span style={{ whiteSpace: "nowrap", paddingLeft:"2px"}}>
//     <span>
//       <strong style={{ color: "#6a5c5c" }}>Val Accesorios: {" "}</strong>
//     </span>
//     <span style={{ marginBottom: "0.3em" }}>
//       {formatter.format(RiskIn.insurable_objects[0].vehicle.vehicle_risk.accesories_price)}
//     </span>
//   </span>
// </span>
// </Row>

export { PdfPoliciesComparative }