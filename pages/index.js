//import './assets/odoo.css';
import React from "react";
import { getOportunity, getOportunityClient } from "../Utils/getOportunity";
import { GetRiskName } from "../Utils/getRiskName"
import { PdfPoliciesComparative } from "../Components/Pdf/PdfComparative";
import StaticStyles from "../Components/StaticStyles";

export const DataContext = React.createContext({});

function Index(props) {
  const [oportunity] = React.useState(props.oportunity);
  const [tenant] = React.useState(props.tenant);

  return (
    <div>
      <PdfPoliciesComparative
        origin={""}
        oportunity={oportunity}
        tenant={tenant}
        isExportPDF={true}
      />
      <StaticStyles />
      <span style={{display: 'none'}} id={"pdfName"} name={GetRiskName(oportunity.risk_in)}></span>
    </div>
  );
}

Index.getInitialProps = async function (ctx) {
  const query = ctx.query
  const name = query.id || "730";
  const token = query.token || "42ede136-ee2e-410b-adec-1aa6098ab8b8";
  const tenant = query.tenant || "cencosud.co.agm-dev.com";
  const oportunity = await getOportunityClient(
    `https://${tenant}`,
    name,
    token
  );
  // oportunity.policy_list = oportunity.policy_list.map((policy,idx) =>{
  //   if(idx <= 5) policy.view_status = "Recomendada"
  //   return policy
  // })
  return { oportunity: oportunity, tenant: tenant };
};

export default Index;
