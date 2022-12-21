import { Grid, GridColumn } from "@progress/kendo-react-grid";
import React from "react";
import { Col, Row } from "react-bootstrap";
import ReactToPrint from 'react-to-print';
import { handlePrint } from "../../Utils/pfd";
import { Button } from "@progress/kendo-react-buttons";
import { Images } from "../../Utils/logos";
import { PdfPoliciesComparative } from "../Pdf/PdfComparative";
import { DataContext } from "../../App";
import { GetRiskName } from "../../Utils/getRiskName";
import { parseIcons } from "../../Utils/parseIcons";




var formatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits:0
});

const fontSize = "12px";

const dictValue = {
  MM_COP: 1000000,
};

const initialFilter = {
  logic: "and",
  filters: [],
};

const parseCoverages = (data) => {
  let otrval = []
  data.coverages.map((item) => {
    data[item.coverage_tag] = item.description || item.desc_tag;
    if (item.tag_group === "OTRVAL") {
      otrval.push(item.description_tag + ": " + item.description)
    }
  });
  data['OTRVAL'] = otrval
  return data;
};

const transposeData = (data) => {
  const newData = [
    { name: "logo" },
    { name: "Datos Principales", type: "group" },
    { name: "Nombre de Producto" },
    { name: "Precio" },
    { name: "Valor Cotizado" },
    { name: "Valido Hasta" },
    { name: "Responsabilidad civil extracontractual", type: "group" },
    { name: "Deducible ante pago de Responsabilidad Civil" },
    { name: "Responsabilidad Civil Extracontractual (Limite Máximo)" },
    { name: "Límite para daños a bienes de terceros" },
    { name: "Límite para lesiones o muerte a una persona" },
    { name: "Límite para lesiones o muerte a dos o más personas" },
    { name: "Responsabilidad civil en exceso" },
    {
      name: "Protección ante daños o hurto sobre el valor asegurado para el momento de un siniestro",
      type: "group",
    },
    { name: "Deducible Pérdida Total Daños" },
    { name: "Deducible Perdida Parcial de Daños" },
    { name: "Deducible Pérdida Total Hurto" },
    { name: "Deducible Pérdida Parcial Hurto" },
    { name: "Eventos de la naturaleza como temblor, terremoto" },
    { name: "Amparo patrimonial" },
    { name: "Garantías de movilidad", type: "group" },
    { name: "Gastos de Transporte por Pérdidas Totales" },
    { name: "Vehículo de reemplazo ante Perdidas Totales" },
    { name: "Vehículo de reemplazo ante Perdidas Parciales" },
    { name: "Asistencias en viaje", type: "group" },
    { name: "Revisión antes de viaje" },
    {
      name: "Carro-Taller para despinchada, envío gasolina, cerrajería o batería",
    },
    { name: "Conductor Elegido" },
    { name: "Servicio de Grúa ante accidente o varada" },
    { name: "Transporte o Custodia del Vehículo reparado o recuperado" },
    {
      name: "Asesoria telefónica y/o en sitio de abogado en caso de accidente",
    },
    { name: "Valores agregados", type: "group" },
    { name: "Valores Agregados" },
  ];
  data.map((item, index) => {
    newData[0][index] = item.manufacturer.toLowerCase();
    newData[2][index] = item.name.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
    newData[3][index] = formatter.format(item.price);
    newData[4][index] = formatter.format(item.amount_quoted)
    newData[5][index] = item.offer_expiration_date
    newData[7][index] = item["DEDRES"] || "NO APLICA";
    newData[8][index] = item["RESEXT"] || "NO APLICA";
    newData[9][index] = item["LITDBT"] || "NO APLICA";
    newData[10][index] = item["LITLMP"] || "NO APLICA";
    newData[11][index] = item["LILMTS"] || "NO APLICA";
    newData[12][index] = item["RESEXC"] || "NO APLICA";
    newData[14][index] = item["DEBPTD"] || "Sin Deducible";
    newData[15][index] = item["DEBPPD"] || "Sin Deducible";
    newData[16][index] = item["DEBPTH"] || "Sin Deducible";
    newData[17][index] = item["DEBPPH"] || "Sin Deducible";
    newData[18][index] = item["EVNNAT"] || "NO";
    newData[19][index] = item["AMPPAT"] || "NO";
    newData[21][index] = item["ASISMO"] || "NO";
    newData[22][index] = item["VEHRPT"] || "NO";
    newData[23][index] = item["VEHRPP"] || "NO";
    newData[25][index] = item["INFTRE"] || "NO";
    newData[26][index] = item["CARDES"] || "NO";
    newData[27][index] = item["CONELG"] || "NO";
    newData[28][index] = item["SERGRU"] || "NO";
    newData[29][index] = item["TRACUS"] || "NO";
    newData[30][index] = item["ASTEAC"] || "NO";
    newData[32][index] = item["OTRVAL"] || "NO";
  });
  return newData;
};

const rowRender = (trElement, props) => {
  const type = props.dataItem.type;
  const group = {
    backgroundColor: "#acacac36",
    color: "var(--table-color)",
  };

  const defaultStyle = {
    backgroundColor: "#fff",
    borderBottom: "1px solid #eee",
    width: "100%",
    padding: "0.5em",
    color:"#3c4858"
  };

  const trProps = {
    colSpan: "6",
    style: type === "group" ? group : defaultStyle,
    width: "100%",
  };

  const childrens =
    type === "group" ? (
      <React.Fragment>
        <td
          colSpan={props.children.length <= 3 ? props.children.length : 3}
          style={{
            left: 0,
            right: 0,
            backgroundColor: "inherit",
            border: "inherit",
            fontSize: fontSize,
          }}
        >
          <strong><span>{props.dataItem.name}</span></strong>
        </td>
        {props.children.length > 3 ? (
          <td 
          colSpan={props.children.length - 3}
          style={{
            left: 0,
            right: 0,
            backgroundColor: "inherit",
            border: "inherit",
            fontSize: fontSize,
          }}>
          </td>
        ) : null}
      </React.Fragment>
    ) : (
      props.children
    );

  return React.cloneElement(trElement, { ...trProps }, childrens);
};

export default function PolicyTable({ data, toPrint, oportunity,origin }) {
  const {context,setContext} = React.useContext(DataContext);
  const componentRef = React.useRef();
  const [policies, setPolicies] = React.useState(
    data.policy_list.map((item) => {
      item.products[0].amount_quoted = item.amount_quoted
      item.products[0].offer_expiration_date = item.offer_expiration_date
      return item.products[0]
    })
  );

  const [parsedPolicies, setParsedPolicies] = React.useState(
    policies.map((item) => {
      return parseCoverages(item);
    })
  );

  const [dataTranspose, setDataTranspose] = React.useState(
    transposeData(parsedPolicies)
  );

  const Logo = (props) => {
    return (
      <div className="text-center bg-white w-100 h-100">
        {dataTranspose[0][props.field] ? (
          <img
            className="mx-auto"
            style={{ height: "50px", width: "auto", objectFit:"contain" }}
            src={Images[dataTranspose[0][props.field]]}
          />
        ) : (
          <span></span>
        )}
      </div>
    );
  };

  const Group = (props) => {
    return (
      <React.Fragment>
        {props.dataItem.type === "group" ? (
          <td
            className={props.className}
            style={{ padding: "0 0", fontSize: fontSize }}
          >
            <span>{props.dataItem[props.field]}</span>
          </td>
        ) : (
          <td
            style={{
              borderBottom: "1px solid #eee",
              left: 0,
              right: 0,
              borderRight: "none",
              fontSize: fontSize,
            }}
            className={"bg-white w-100 h-100 " + props.className}
          >
            <span>{props.dataItem[props.field]}</span>
          </td>
        )}
      </React.Fragment>
    );
  };

  const PropertiCell = (props) => {
    return (
      <>
        {Array.isArray(props.dataItem[props.field]) ? (
          <td
            style={{
              borderTop: "none",
              borderBottom: "1px solid #eee",
              borderLeft: "none",
              borderRight: "none",
              paddingTop: "0em",
              paddingBottom: "0em",
              fontSize: fontSize,
              overflowWrap: "break-word",
              verticalAlign: "baseline",
            }}
            className="text-center"
          >
            <ul style={{ textAlign: "left" }}>
              {props.dataItem[props.field].map((el) => (
                <li key={el}>{el}</li>
              ))}
            </ul>
          </td>
        ) : (
          <td
            style={{
              borderTop: "none",
              borderBottom: "1px solid #eee",
              borderLeft: "none",
              borderRight: "none",
              paddingTop: "0em",
              paddingBottom: "0em",
              fontSize: fontSize,
              overflowWrap: "break-word",
            }}
            className="text-center"
          >
            <span>
              {parseIcons[props.dataItem[props.field]]
                ? parseIcons[props.dataItem[props.field]]
                : props.dataItem[props.field]}
            </span>
          </td>
        )}
      </>
    );
  };

  const grid = (
    <Grid
      style={{
        maxHeight: toPrint ? null : "100vh",
        minWidth: "100%",
        fontSize: fontSize,
        overflow: "hidden",
      }}
      className="mx-auto"
      headerCellRender={Logo}
      reorderable={true}
      rowRender={rowRender}
      data={dataTranspose.slice(1)}
    >
      <GridColumn
        field="name"
        width={50}
        title="Atributo"
        cell={Group}
      />
      {policies.map((item, index) => {
        return (
          <GridColumn
            key={index}
            headerCell={Logo}
            cell={PropertiCell}
            width={50}
            field={index.toString()}
          />
        );
      })}
    </Grid>
  );


  const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
      <div ref={ref}>
        <PdfPoliciesComparative origin={origin} oportunity={oportunity} policy_list = {data.policy_list}/>
      </div>
    )
  })

  return (
    <React.Fragment>
      {
        policies.length>0?
        <Row>
          {/* Renderizado normal */}
          <Col xs={12} style={{padding:"0 1em 0 1em"}}>
            {grid}
          </Col>

        </Row>
        : null
      }

      {/* Componente a imprimir */}
      <div style={{ display: "none" }}>
        <ComponentToPrint ref={componentRef} />
      </div>
      <ReactToPrint
        trigger={() => <Button
          className="mt-2 mb-1 mx-auto sec-button button-size"
          style={{
            position: "fixed",
            bottom: "1em",
            zIndex: "3",
            right: "8em",
            marginRight: "1em",
          }}
        >
          Imprimir
        </Button>}
        content={() => componentRef.current}
      print= {(frame)=>handlePrint(frame,GetRiskName(context.oportunity.risk_in))  }
      copyStyles={true}
      />

    </React.Fragment>
  );
}
