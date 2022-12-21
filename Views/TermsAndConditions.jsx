import React from "react";
import { Col, Row } from "react-bootstrap";

function TermsAndConditions({fontSize, print}) {
    return (
        <Row className="mt-5" style={{ fontSize: fontSize }}>
            <Col xs={12}>
                <span style={{ fontSize: fontSize + 1 }}>
                    IMPORTANTE ó
                </span>
                <p>
                    <span>
                        Esta cotización es provisional y no implica aceptación del
                        riesgo, cuyas condiciones están sujetas a cambios de acuerdo a
                        políticas y parámetros como:
                    </span>
                    
                </p>
                <ul>
                    <li>
                        La Compañía Aseguradora se reserva el derecho de analizar la
                        información contenida en la solicitud de seguro y decidir sobre
                        la aceptación o rechazo del riesgo de acuerdo a su legal
                        criterio.
                    </li>
                    <li>
                        Todos los descuentos técnicos y comerciales aplicados están
                        sujetos a revisión por parte de la Compañía Aseguradora.
                    </li>
                    <li>
                        Estado y valor del vehículo, es dado por la guía de valores
                        Fasecolda, vigente al momento de la cotización y valores de
                        accesorios adicionales, los que sujetos a verificación en el
                        momento de la inspección.
                    </li>
                    <li>
                        Las coberturas aquí descritas son ilustrativas y pueden
                        variar, están sujetas a las políticas de la aseguradora y las
                        coberturas definitivas otorgadas están descritas en la póliza
                        emitida. Unos de los factores por los cuales pueden variar
                        son:
                        <ul>
                            <li>
                                Los cambios de datos del vehículo inicialmente cotizado.{" "}
                            </li>
                            <li>
                                Cambios de datos del asegurado como identificación, edad,
                                género,profesión, actividad, entre otros.
                            </li>
                            <li>Zona de circulación real del vehículo.</li>
                            <li>
                                Verificación de descuentos otorgados de acuerdo a la
                                siniestralidad del vehículo.
                            </li>
                        </ul>
                    </li>
                    <li>
                        Las opciones de financiación esta sujetas a revisión por parte
                        de las compañías aseguradoras.
                    </li>
                    <li>
                        La vigencia de la cotización depende de cada aseguradora o hasta
                        el último día del mes (lo que primero se cumpla).
                    </li>
                    <li>
                        Las coberturas son sujetas a clausulado, condiciones generales y
                        producto de cada compañía.
                    </li>
                </ul>
            </Col>
        </Row>
    );
}

export { TermsAndConditions };