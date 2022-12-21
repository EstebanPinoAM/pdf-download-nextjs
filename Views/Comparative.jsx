import * as React from "react";
import PolicyTable from "../Components/List/PolicyTable";
import { DataContext } from "../App";
import PolicyDetailsHorizontal from "../Components/List/PolicyHorizontal";
import { useHistory } from "react-router-dom";
import { Button } from "@progress/kendo-react-buttons";
import { TermsAndConditions } from "./TermsAndConditions";

const fontSize = "8px";

const ParsePoliciesByStatus = (policies,origin) => {
  const InComparative = [];
  const inResume = [];
  policies.forEach((policy) => {
    if (((policy.view_status == "Recomendada") && InComparative.length <= 4) || (policies.length == 1 && origin == "ver mas")) {
      InComparative.push(policy);
    } else if (policy.view_status == "Visible" || (policy.view_status == "Recomendada" && InComparative.length > 4)) {
      inResume.push(policy);
    }
  });
  return [InComparative, inResume];
};

export default function PoliciesComparative() {
  const { context, setContext } = React.useContext(DataContext);
  const ParsedPolicies = ParsePoliciesByStatus(context.policy_selected,"");
  const RiskIn = context.oportunity.risk_in;
  const [toPrint, setToPrint] = React.useState(true);
  const [policiesComparative, setPoliciesComparative] = React.useState(
    ParsedPolicies[0]
  );
  const [policiesResume, setPoliciesResume] = React.useState(ParsedPolicies[1]);
  const history = useHistory()
  const goBack = () => {
    history.goBack()
  }

  return (
    <React.Fragment>
      <div className="wrapper comparative-font" style={{}}>
        
        {policiesComparative.length !== 0 && (
          <span style={{ color: "var(--title-color)" }}>
            <h6 style={{ marginTop:"5px"}}>
              <strong>Estas son las ofertas recomendadas para tu seguro:</strong>
            </h6>
          </span>
        )}

        <React.Fragment>
          <PolicyTable
            toPrint={toPrint}
            data={{ policy_list: policiesComparative }}
            oportunity={context.oportunity}
            origin="comparativo"
          />
        </React.Fragment>

        {policiesResume.length > 0 && <span style={{ color: "var(--title-color)"}}>
          <h6 style={{ marginTop:"10px"}}>
            <strong>
              Para recomendarte tus mejores opciones, entre otras, también
              tuvimos en cuenta estas otras ofertas:
            </strong>
          </h6>
        </span>}

        {policiesResume.length > 0 ? (
          <PolicyDetailsHorizontal data={{ policy_list: policiesResume }} />
        ) : null}

        <TermsAndConditions fontSize={fontSize} />
      </div>
      <Button
        className="mt-2 mb-1 mx-auto sec-button button-size"
        onClick={goBack}
        style={{
          position: "fixed",
          bottom: "1em",
          right: "2em",
          marginRight: "1em",
        }}
      >
        Volver
      </Button>
    </React.Fragment>
  );
}

export function PolicyDetails() {

  const { context, setContext } = React.useContext(DataContext);
  const ParsedPolicies = ParsePoliciesByStatus(context.policy_detail,"ver mas");
  const RiskIn = context.oportunity.risk_in;
  const [toPrint, setToPrint] = React.useState(true);
  const [policiesComparative, setPoliciesComparative] = React.useState(
    ParsedPolicies[0]
  );
  const [policiesResume, setPoliciesResume] = React.useState(ParsedPolicies[1]);
  const history = useHistory()

  const goBack = () => {
    history.goBack()
  }


  return (
    <div className="wrapper text-center comparative-font">
      {policiesComparative.length > 0 || policiesResume.length>0? (
          <React.Fragment>
            <PolicyTable
              toPrint={toPrint}
              data={{ policy_list: [...policiesComparative,...policiesResume] }}
              oportunity = {context.oportunity}
              origin= {"ver mas"}
            />
          </React.Fragment>
        ) : null}
        
        <Button
          className="mt-2 mb-1 mx-auto sec-button button-size"
          onClick={goBack}
          style={{
            position: "fixed",
            bottom: "1em",
            right: "2em",
            marginRight: "1em",
          }}
        >
          Volver
        </Button>
    </div>
  );
}