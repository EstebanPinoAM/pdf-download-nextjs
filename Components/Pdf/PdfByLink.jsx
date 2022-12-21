import React from "react";
import ReactToPrint from "react-to-print";
import { handlePrintToBase64,handlePrint } from "../../Utils/pfd";
import { Button } from "@progress/kendo-react-buttons";
import { GetRiskName } from "../../Utils/getRiskName";
import { PdfPoliciesComparative } from "./PdfComparative";
import { DataContext } from "../../App";

export default function PdfByLink({oportunity, origin}) {
  const componentRef = React.useRef();
  const buttonRef = React.useRef();
  
  const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
      <div ref={ref}>
        <PdfPoliciesComparative
          origin={origin}
          oportunity={oportunity}
          isExportPDF={true}
        />
      </div>
    );
  });

  React.useEffect(() => {
    if (oportunity && buttonRef.current) {
      buttonRef.current.click();
    }
  }, []);
  
  return (
    <>
      {/* Componente a imprimir */}
      <div style={{ display: "none" }}>
        <ComponentToPrint ref={componentRef} />
      </div>
      <ReactToPrint
        trigger={() => (
          <button
            style={{ display: "none" }}
            ref={buttonRef}
          >
            Imprimir
          </button>
        )}
        content={() => componentRef.current}
        print={(frame) =>
          handlePrintToBase64(frame, GetRiskName(oportunity.risk_in))
        }
        copyStyles={true}
      />
    </>
  );
}
