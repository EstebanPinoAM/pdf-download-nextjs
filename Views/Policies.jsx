import * as React from "react";
import PolicyList from "../Components/List/PolicyList";
import { DataContext } from "../App";
import { Button } from "@progress/kendo-react-buttons";
import { useHistory } from "react-router-dom";
import { Row, Spinner } from "react-bootstrap";
import { updateOffersOnCRM } from "../Utils/getOportunity";
import { markFavorite } from "../Utils/markFavorite";
import { PdfPoliciesComparative } from "../Components/Pdf/PdfComparative";
import ReactToPrint from 'react-to-print';
import { handlePrint } from "../Utils/pfd";
import { GetRiskName } from "../Utils/getRiskName";
import  "./Policies.css"

export default function Policies() {
  const componentRef = React.useRef();
  const { context, setContext } = React.useContext(DataContext);
  const [policies, setPolicies] = React.useState(context.policies);
  const [oportunity, setOportunity] = React.useState(context.oportunity);
  const [moveButtonsSave, setMoveButtonsSave] = React.useState(false);
  const [policySelected, setPolicySelected] = React.useState([]);
  const urlSearch = new URLSearchParams(window.parent.location.search)
  const firstLoad = urlSearch.get("first_load")
  const [looking, setLooking] = React.useState(false);
  const [editable, setEditable] = React.useState(true);
  const [changes, setChanges] = React.useState({})
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (firstLoad) {
      setLooking(true)
      setTimeout(() => {
        setLooking(false)
      }, 80000)
    }
  }, [])

  React.useEffect(() => {
    Object.keys (changes).length && setMoveButtonsSave(true);
  }, [changes])

  const toEdit = () => {
    if (!editable) {
      setEditable(false);
    } else {
      setMoveButtonsSave(false);
      if (Object.keys(changes).length > 0) {
        //console.log(changes)
        setLoading(true)
        // if (changes['favorite']) {
        //   markFavorite(changes['favorite']).then((res) => {
        //     delete changes['favorite'];
        //   })
        // }
        updateOffersOnCRM(changes)
          .then(res => {
            //console.log(changes)
            setLoading(false)
            // setEditable(false)
          })
          .catch(res => {
            setLoading(false)
            // setEditable(false)
          })
      }
      // else {
      //   setEditable(false)
      // }
    }
  }

  const changeFavorite = (id_db) => {
    markFavorite(id_db).then((res) => res.json())
    .then((res) =>{
      console.log(res)
    }).catch((err) => {
      console.error(err)
    })
  }

  React.useEffect(() => {
    //console.log(changes);
  }, [changes])

  const history = useHistory();
  const setPolicysSelected = (policies) => {
    setPolicySelected(policies);
    setContext({ ...context, policy_selected: policies });
  };

  const setPolicysSelectedComparative = (policies) => {
    setPolicySelected(policies);
    setContext({ ...context, policy_selected: policies });
    history.push("/comparative");

  };

  const setDetails = (policies) => {
    setPolicySelected(policies);
    setContext({ ...context, policy_detail: policies });
    history.push("/details");
  };

  const toCompare = () => {
    if (policySelected.length > 0) {
      history.push("/comparative");
    }
  };

  const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
      <div ref={ref}>
        <PdfPoliciesComparative origin={"general"} oportunity={oportunity} policy_list={policies} />
      </div>
    )
  })

  return (
    <div className="wrapper principal-font">
      <PolicyList
        setPoliciesCompare={setPolicysSelected}
        setDetails={setDetails}
        changes={changes}
        setChanges={setChanges}
        data={oportunity}
        editable={editable}
        setEditable={setEditable}
        idOportunity={context.id_op}
        policies = {policies}
        setPolicies = {setPolicies}
        changeFavorite={changeFavorite}
      />


      <Row style={{ width: "100%" }} className="text-center mt-3 mb-3">
        {
          firstLoad && looking
            ? <Spinner animation="border" style={{ color: "#4800d1" }} className="mx-auto" />
            : null
        }
      </Row>


      <div style={{display:"none"}}>
        <ComponentToPrint ref={componentRef} />
      </div>

      {
        policies.length > 0 ?
        //  ! height para que los botones no tapen
          <div className="text-center" style={{height: "60px" }}>
            <div className={"text-center" + (moveButtonsSave? " buttons-box" : "")} style={{
              position: "fixed",
              bottom: "0em",
              right: "1em",
              marginRight: "0em",
            }}>

              <span
                onClick={editable ? toEdit : null}
                style={{ marginRight: "1em", padding: "0" }}
              >
                <ReactToPrint
                  trigger={() => {
                    return (
                      <Button
                        className="sec-button mt-2 mb-1 ml-2 mr-2 button-size"
                      >
                        {
                          moveButtonsSave ?
                            "Guardar e imprimir"
                            : "Imprimir"
                        }
                      </Button>
                    )

                  }
                  }
                  content={() => componentRef.current}
                  print={(frame) => handlePrint(frame, GetRiskName(oportunity.risk_in)) }
                />

              </span>
              {
                moveButtonsSave ?
                  <Button
                    className="third-button mt-2 mb-1 mr-2 button-size"
                    style={{ marginRight: "1em", minWidth: "7em" }}
                    onClick={toEdit}
                  >
                    {
                      editable
                        ? loading ? <Spinner size="sm" animation="border" style={{ color: "#4800d1" }} className="mx-auto" /> : "Guardar"
                        : "Organizar Ofertas"
                    }
                  </Button>
                  : null
              }
              {
                editable ?
                  <Button
                    className="mt-2 mb-1 ml-2 sec-button button-size"
                    onClick={() => {toEdit(); setPolicysSelectedComparative(policies) }}
                  >
                    {
                      moveButtonsSave?
                        "Guardar y ver"
                      : "Ver comparativa"
                    }
                  </Button>
                  : null
              }
            </div>
          </div>
        : null
      }
    </div>
  );
}
