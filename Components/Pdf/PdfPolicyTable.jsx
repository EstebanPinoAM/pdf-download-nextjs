import { Grid, GridColumn } from "@progress/kendo-react-grid";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { Images } from "../../Utils/logos";
import { parseIconsPdf as parseIcons } from "../../Utils/parseIcons";

var formatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits:0,
  maximumFractionDigits:0,
});

const fontSize = "8px";

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
    if (item.tag_group === "OTRVAL"){
      otrval.push(item.description_tag + ": " + item.description)
    }
  });
  otrval.push("Numero de proceso: " + data.process_id)
  data['OTRVAL'] = otrval 
  return data;
};

const transposeData = (data) => {
  const newData = [
    { name: "logo" },
    { name: "Datos Principales", type: "group" },
    { name: "Nombre de Producto" },
    { name: "Precio" },
    { name: "Valor Cotizado"},
    { name: "Valido Hasta"},
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
    { name: "Valores Agregados"},
  ];
  data.map((item, index) => {
    newData[0][index] = item.manufacturer.toLowerCase()
    newData[2][index] = item.name.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    newData[3][index] = <div><span style={{color: "#09f", fontSize: "9px"}}> <strong>{formatter.format(item.price)}</strong></span><br />{item.financing_installments.split("::")[1]}</div>;
    newData[4][index] = formatter.format(item.amount_quoted)
    newData[5][index] = item.offer_expiration_date
    newData[7][index] = item["DEDRES"] || "NO APLICA";
    newData[8][index] = item["RESEXT"] || "NO APLICA";
    newData[9][index] = item["LITDBT"] || "NO APLICA";
    newData[10][index] = item["LITLMP"] || "NO APLICA";
    newData[11][index] = item["LILMTS"] || "NO APLICA";
    newData[12][index] = item["RESEXC"]|| "NO APLICA";
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
    width: "100%",
    padding: "0.5em",
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
          colSpan={props.children.length}
          style={{
            left: 0,
            right: 0,
            backgroundColor: "inherit",
            border: "inherit",
            fontSize: fontSize,
            paddingTop:"0.5em",
            color: "var(--table-color)",
            paddingBottom:"0.5em"
          }}
        >
          <span><strong >{props.dataItem.name}</strong></span>
        </td>
        {/* {props.children.length > 3 ? (
          <td colSpan={props.children.length - 3}></td>
        ) : null} */}
      </React.Fragment>
    ) : (
      props.children
    );

  return React.cloneElement(trElement, { ...trProps }, childrens);
};

function PdfPolicyTable({ data, toPrint }) {
  const [policies, setPolicies] = React.useState(
    data.policy_list.map((item) => {
      item.products[0].amount_quoted = item.amount_quoted
      item.products[0].offer_expiration_date = item.offer_expiration_date
      item.products[0].financing_installments = item.financing_installments
      item.products[0].process_id = item.process_id
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
      <div className="text-center bg-white" style={{paddingTop:0,paddingBottom:0}}>
        {dataTranspose[0][props.field] ? (
          <img
            className="mx-auto"
            style={{ maxHeight:"30px", maxWidth: "30px", objectFit:"contain" }}
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
              left: 0,
              right: 0,
              borderRight: "none",
              fontSize: fontSize,
              // paddingTop:0,
              // paddingBottom:0,
              padding:"2px",
            }}
            className={"bg-white w-100 h-100 " + props.className}
          >
            <span><strong style={{color:"#6a5c5c"}}>{props.dataItem[props.field]}</strong></span>
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
              borderLeft: "none",
              borderRight: "none",
              borderBottom: "none",
              // paddingTop: "0em",
              // paddingBottom: "0em",
              padding: "2px",
              fontSize: fontSize,
              verticalAlign: "baseline",
            }}
            className="text-center"
          >
            <ul style={{ textAlign: "left", marginLeft: 0, padding: 0 }}>
              {props.dataItem[props.field].map((el) => (
                <li key={el} style={{ padding: "2px 0" }}>
                  {el}
                </li>
              ))}
            </ul>
          </td>
        ) : (
          <td
            style={{
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              borderBottom: "none",
              // paddingTop: "0em",
              // paddingBottom: "0em",
              padding: "2px",
              fontSize: fontSize,
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
        locked={true}
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

  return (
    <Row>
      {/* <Col xs={2}>
        <FilterTable />
      </Col> */}
      <Col xs={12}>
        {/* <Filter
          value={filter}
          onChange={onFilterChange}
          fields={[
            {
              name: "name",
              label: "Name",
              filter: TextFilter,
              operators: Operators.text,
            },
          ]}
        /> */}
        {grid}
      </Col>
    </Row>
  );
}

export { PdfPolicyTable }