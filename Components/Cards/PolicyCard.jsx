//import { Button } from "@progress/kendo-react-buttons";
import { Checkbox } from "@progress/kendo-react-inputs";
import React from "react";
import { Card, Col, FormCheck, FormLabel, Row, Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { Images } from "../../Utils/logos";
import {InfoTriangle} from "../../Utils/parseIcons"
import "./styles.css"


var formatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0
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

const StyleStatus = {
  "Recomendada": "4px solid green",
  "Visible": "4px solid #f7cd1f",
  "Oculta": "4px solid #eee"
}

const dictStatus = {
  "Recomendada": 1,
  "Visible": 2,
  "Oculta": 3
}

export default function PolicyFea({
  policy,
  index,
  selected,
  setSelected,
  setDetailsPolicy,
  editable,
  setPolicies,
  stablishChange,
  favorite,
  policies,
  setFavorite,
  fetchFavorite
}) {
  const coverages = {};
  policy.products[0].coverages.map((item, index) => {
    coverages[item.coverage_tag] = item;
  });
  const nextValue = {
    'Visible':"Oculta",
    'Oculta':"Recomendada",
    'Recomendada':"Visible"
  };
  const eyeIcon = ['fa-eye','fa-eye-slash','fa-star'];
  const iconPerView = {
    "Visible":"fa-eye",
    "Oculta":"fa-eye-slash",
    "Recomendada":"fa-thumbs-up"
  } 
  const [iconVisible,setIconVisible] = React.useState(policy.viewStatus === "Oculta"?1:policy.viewStatus === "Recomendada"?2:0)
  const [viewStatus, setViewStatus] = React.useState(policy.view_status)
  const imageSize = React.useMemo(()=>{
    return "45px"
  },[])
  const wrapperImageSize = React.useMemo(()=>{
    return "60px"
  },[])
  const fontSize = React.useMemo(()=>{
    return "0.85em"
  },[])

  const onSelect = (e, index) => {
    if (e.target.value) {
      setSelected([...selected, index]);
    } else {
      setSelected(selected.filter((item) => item !== index));
    }
  };

  const changeStatus = (e) => {
    const value = e.target?.value || e;
    if(value === viewStatus) return
    // const next = value === viewStatus ? nextValue[value] : value;
    const next = value;
    setViewStatus(next)
    stablishChange({ [policy.id_db]: dictStatus[next] })
    setPolicies(policies.map(policy_iter => {
      if (policy_iter.id_db == policy.id_db) {
        policy_iter.view_status = next;
      }
      return policy_iter;
    }))
  }

  const getPDF = () => {
    window.open(policy.document_reference?.url, '_blank').focus();
  }

  const changeFavorite = (element) => {
    if (element.target.checked) {
      setFavorite(policy.id_db)
      fetchFavorite(policy.id_db)
    }
    else {
      setFavorite(-1)
    }

    // if (element.target.checked) {
    //   setFavorite(policy.id_db)
    //   stablishChange({ "favorite": policy.id_db })
    // }
    // else {
    //   setFavorite(-1)
    //   stablishChange({ "favorite": -1 })
    // }

    // if(element.target.checked){
    //   if(favorite){
    //     element.target.checked = false
    //   }
    //   else{
    //     setFavorite(policy.id_db)
    //     markFavorite(policy.id_db)
    //   }
    // }
    // else{
    //   setFavorite(false)
    // }
  }
  const [info, setInfo] = React.useState(false)
  return (
    <Card className="border-radius pt-0" style={{ borderLeft: viewStatus ? StyleStatus[viewStatus] : "",fontSize: fontSize, backgroundColor: favorite === policy.id_db ? "var(--fav-color)": "#fff"}}>
      <Row className="align-items-center">
        <Col md={7} className="pe-md-0" style={{ fontSize: "0.95em" }} >
          <Row className="mx-auto align-items-center">
            <Col md={4} className="align-items-center mb-0 px-md-1" >
              <Row className="align-items-center w-100 p-md-0 m-md-0">
                <Col xs={5} md={4} className="align-items-center justify-content-center p-md-0">
                  
                  {/* //! imagen en xs y sm */}
                    {/* <div className={"image-wrapper d-inline d-md-none"} style={{position: "absolute", width: "100%",height: wrapperImageSize, zIndex:1, left: "0", top: "0"}}></div> */}
                    <img src={Images[policy.products[0].manufacturer.toLowerCase()]} className="d-inline d-md-none d-lg-none d-xl-none" style={{ maxWidth : "70%",height:imageSize, objectFit:"contain", padding: "3px", zIndex:2, position: "relative"}}/>
                  {/* //! imagen en md en adelante*/}
                    {/* <div className={"image-wrapper d-none d-md-inline"} style={{position: "absolute", width: wrapperImageSize,height: "100%", zIndex:1, left: "0", top: "0"}}></div> */}
                    <img src={Images[policy.products[0].manufacturer.toLowerCase()]} className="d-none d-md-block d-lg-block" style={{ position: 'relative' ,height: imageSize, zIndex:2 ,width : imageSize, objectFit:"contain"}} />
                </Col>
                <Col xs={7} md={8} className="align-items-start text-start">
                  {policy.process_comments && policy.process_comments[0] &&
                    <>
                      <a onClick={() => { setInfo(!info) }}
                        onMouseEnter={() => { setInfo(true) }}
                        onMouseLeave={() => { setInfo(false) }}
                        style={{ textDecoration: "none", zIndex:2, position: "relative" }}>
                        <InfoTriangle style={{  cursor: "pointer", paddingRight:"3px"}} className="fas fa-exclamation-triangle mx-auto"></InfoTriangle>
                      </a>
                      {info ?
                        <div className="p-1 text-center" style={{ backgroundColor: "rgb(0, 0, 0,0.8)",zIndex:5, color: "white", position: "absolute", fontSize: "10px" }}>{policy.process_comments[0]}</div>
                        :
                        null}
                    </>
                  }
                  <div className="text-bold text-center d-inline" style={{  fontWeight: 400, zIndex:2, position: "relative"  }}>
                    {policy.products[0].name.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}
                  </div>
                </Col>
              </Row>
            </Col>
            <Col  md={8} className="align-items-center mb-0 px-2 px-md-0">
              <div style={{textAlign:"start"}}> 
                  <span>
                    <span><strong>RC: </strong>{coverages["RESEXT"]?.description} | </span>
                    <span><strong>DPTD:</strong> {coverages["DEBPTD"]?.description} | </span>
                    <span><strong>DPPD:</strong> {coverages["DEBPPD"]?.description} | </span>
                    <span><strong>Asistencia:</strong>  {coverages["ASIVIA"]?.description || "No Cubre"} | </span>
                    <span><strong>Valor Asegurado:</strong> {formatter.format(policy.amount_quoted)} | </span>
                    <span>
                      <a 
                      style={{ 
                        color: "#007bff",
                        cursor: "pointer",
                        textDecoration: "underline",
                        whiteSpace: "nowrap"
                        }} 
                        onClick={() => setDetailsPolicy(policy)}
                        >
                          Ver mas {">> "}
                        </a>
                      </span> 
                      <div className="d-inline-flex" style={{ float: "right"}}>
                        <span className="redirect-quote-click d-none ms-auto d-md-inline" style={{ whiteSpace: "nowrap" , fontSize: "0.9em", textDecoration: "underline" }}  onClick={()=>{window.parent.location.href = `/web#id=${policy.id_db}&model=sale.order&view_type=form`}} >
                          {"Num.Cot "}{policy.process_id} {">>"}
                        </span>
                      </div>
                  </span>
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={5} className="ps-md-0"  style={{ paddingBottom: "0.1em" }}>
          <Row className="align-items-center w-100 m-0">  
            <Col md={4} xs={7} className="justify-content-center mx-auto mx-md-0 px-1 ps-md-2 pe-md-0 mb-0 mt-1 mt-md-0">
              <h6 style={{ color: "rgb(32, 132, 227)", fontSize: "1.1em", marginBottom: 0, padding: 0 }}>
                <strong>{formatter.format(Math.ceil(policy.total_price / 1000) * 1000)}</strong>
              </h6>
              {policy.financing_installments
                ? <span style={{ fontSize: "0.9em" }}>ó {policy.financing_installments.split("::")[1]}</span>
                : null}
            </Col>
            <Row className="col-md-4 mb-0 mx-md-0 mx-auto mt-1 mt-md-0" style={{padding:0}}>
              {editable ?
                <Row className="col-12 p-md-0 m-md-0">
                  <Col xs={6} md={12} className="d-flex justify-content-center mt-auto mb-auto p-md-0">
                    <Form.Check onChange={changeFavorite}
                      type="checkbox"
                      id="isFavorite"
                      checked={policy.id_db === favorite ? true : false}
                    >
                    </Form.Check>
                    <label style={{margin:0}} className="ms-1">Favorito</label>
                  </Col>
                  <Col xs={6} md={12} className="mt-auto d-md-inline mb-auto p-md-0" style={{whiteSpace: "nowrap"}}>
                    <span style={{ fontSize: "0.9em" }} className="text-muted d-inline">Exp: {policy.offer_expiration_date}</span>
                  </Col>
                </Row>
                :
                <Row className="col-12 d-none d-md-block m-md-0">
                  <Col className="mt-auto mb-auto">
                    <span style={{ fontSize: "0.9em" }} className="text-muted">Exp: {policy.offer_expiration_date}</span>
                  </Col>
                </Row>
              }
            </Row>
            <Col className="d-none  d-sm-none d-md-flex col-md-4 p-md-0 ms-md-0 pe-md-2">
              <Col className="justify-content-start p-0" xs={12}>
              {editable
                  ? <>
                    <Row className="d-flex flex-row flex-nowrap justify-content-center">
                      <Form className="d-flex flex-row flex-nowrap" style={{ marginLeft: "0", padding:0, justifyContent:"space-around"}} onChange={changeStatus} defaultValue={viewStatus} aria-label="Default select example">
                        <Form.Check type={'radio'} name="view_status" id={`inline-radio-1-${policy.id_db}`} className="radio-btn">
                          <Form.Check.Input type={'radio'} name="view_status" value={"Recomendada"} onChange={changeStatus} checked={viewStatus === "Recomendada"}/>
                          <Form.Check.Label>
                            <span style={{color: 'var(--gray-icon-color)'}}>
                              <i className="fa fa-thumbs-up" value={"Recomendada"}></i>
                            </span>
                          </Form.Check.Label>
                        </Form.Check>
                        <Form.Check type={'radio'} name="view_status" id={`inline-radio-2-${policy.id_db}`} className="radio-btn">
                          <Form.Check.Input type={'radio'} name="view_status" value={"Visible"} onChange={changeStatus} checked={viewStatus === "Visible"}/>
                          <Form.Check.Label>
                            <span style={{color: 'var(--gray-icon-color)'}}>
                              <i className="fa fa-eye" value={"Visible"}></i>
                            </span>
                          </Form.Check.Label>
                        </Form.Check>
                        <Form.Check type={'radio'} name="view_status" id={`inline-radio-3-${policy.id_db}`} className="radio-btn">
                          <Form.Check.Input type={'radio'} name="view_status" value={"Oculta"} onChange={changeStatus} checked={viewStatus === "Oculta"}/>
                          <Form.Check.Label>
                            <span style={{color: 'var(--gray-icon-color)'}}>
                              <i className="fa fa-eye-slash" value={"Oculta"}></i>
                            </span>
                          </Form.Check.Label>
                        </Form.Check>
                      </Form>
                    </Row>
                    <Row>
                      <Col>
                      <span style={{ whiteSpace: "nowrap", color:"var(--gray-icon-color)" }}>
                        <span>{viewStatus}</span>
                      </span>
                      </Col>
                    </Row>
                  </> : 
                  <>
                    <Checkbox onChange={(e) => onSelect(e, index)} />
                    <FormCheckLabel style={{ marginLeft: "1em", fontSize: "0.9em" }} className="text-muted">
                      Comparar
                    </FormCheckLabel>
                  </>}
                {/* {editable
                  ? <>
                    <Row className="d-flex flex-row flex-nowrap justify-content-center">
                      <Col xs={3} style={{padding:3, margin:0}}>
                        <Button className="icon_button" disabled={viewStatus === "Recomendada"} onClick={()=>changeStatus("Recomendada")} value={"Recomendada"} variant="light">
                          <i className="fa fa-thumbs-up" value={"Recomendada"}></i>
                        </Button>
                      </Col>
                      <Col xs={3} style={{padding:3, margin:0}}>
                        <Button className="icon_button" disabled={viewStatus === "Visible"} onClick={()=>changeStatus("Visible")} value={"Visible"} variant="light">
                          <i className="fa fa-eye" value={"Visible"}></i>
                        </Button>
                      </Col>
                      <Col xs={3} style={{padding:3, margin:0}}>
                        <Button className="icon_button" disabled={viewStatus === "Oculta"} onClick={()=>changeStatus("Oculta")} value={"Oculta"} variant="light">
                          <i className="fa fa-eye-slash" value={"Oculta"}></i>
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                      <span style={{ whiteSpace: "nowrap" }}>
                        <i className={`fa ${iconPerView[viewStatus]}`}></i>
                        {" "}
                        <span>{viewStatus}</span>
                      </span>
                      </Col>
                    </Row>
                  </> : 
                  <>
                    <Checkbox onChange={(e) => onSelect(e, index)} />
                    <FormCheckLabel style={{ marginLeft: "1em", fontSize: "0.9em" }} className="text-muted">
                      Comparar
                    </FormCheckLabel>
                  </>} */}
              </Col>
            </Col>
            <Row className="align-items-center col-12 m-0 d-md-none">
              {editable
              ? <>
                  <Col className="d-flex flex-nowrap align-items-center justify-content-center" xs={6}>
                    <Form className="d-flex flex-nowrap" style={{ marginLeft: "0", padding:0}} onChange={changeStatus} defaultValue={viewStatus} aria-label="Default select example">
                      <Form.Check type={'radio'} name="view_status" id={`inline-radio-1-${policy.id_db}`} className="radio-btn me-3 me-md-0">
                        <Form.Check.Input type={'radio'} name="view_status" value={"Recomendada"} onChange={changeStatus} checked={viewStatus === "Recomendada"}/>
                        <Form.Check.Label>
                          <span style={{color: 'var(--gray-icon-color)'}}>
                            <i className="fa fa-thumbs-up" value={"Recomendada"}></i>
                          </span>
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check type={'radio'} name="view_status" id={`inline-radio-2-${policy.id_db}`} className="radio-btn me-3 me-md-0">
                        <Form.Check.Input type={'radio'} name="view_status" value={"Visible"} onChange={changeStatus} checked={viewStatus === "Visible"}/>
                        <Form.Check.Label>
                          <span style={{color: 'var(--gray-icon-color)'}}>
                            <i className="fa fa-eye" value={"Visible"}></i>
                          </span>
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check type={'radio'} name="view_status" id={`inline-radio-3-${policy.id_db}`} className="radio-btn">
                        <Form.Check.Input type={'radio'} name="view_status" value={"Oculta"} onChange={changeStatus} checked={viewStatus === "Oculta"}/>
                        <Form.Check.Label>
                          <span style={{color: 'var(--gray-icon-color)'}}>
                            <i className="fa fa-eye-slash" value={"Oculta"}></i>
                          </span>
                        </Form.Check.Label>
                      </Form.Check>
                    </Form>
                  </Col>
                  
                {/* <Col className="d-flex align-items-center justify-content-center" xs={6}>
                  <Row style={{padding:3, margin:0}}>
                    <Button className="icon_button" disabled={viewStatus === "Recomendada"} onClick={()=>changeStatus("Recomendada")} value={"Recomendada"} variant="light">
                      <i className="fa fa-thumbs-up" value={"Recomendada"}></i>
                    </Button>
                  </Row>
                  <Row style={{padding:3, margin:0}}>
                    <Button className="icon_button" disabled={viewStatus === "Visible"} onClick={()=>changeStatus("Visible")} value={"Visible"} variant="light">
                      <i className="fa fa-eye" value={"Visible"}></i>
                    </Button>
                  </Row>
                  <Row style={{padding:3, margin:0}}>
                    <Button className="icon_button" disabled={viewStatus === "Oculta"} onClick={()=>changeStatus("Oculta")} value={"Oculta"} variant="light">
                      <i className="fa fa-eye-slash" value={"Oculta"}></i>
                    </Button>
                  </Row>
                </Col> */}
                <Col xs={6}>
                  <Col>
                  <span style={{ whiteSpace: "nowrap", display: "inline-block", color:"var(--gray-icon-color)" }}>
                    <span>{viewStatus}</span>
                  </span>
                  </Col>
                </Col>
              </> : 
              <>
                <Checkbox onChange={(e) => onSelect(e, index)} />
                <FormCheckLabel style={{ marginLeft: "1em", fontSize: "0.9em" }} className="text-muted">
                  Comparar
                </FormCheckLabel>
              </>}
            </Row>
            <Row className="mx-auto d-md-none">
              {/* <Col className="text-left" xs={2} md={12}>
                {policy.id_db == favorite ?
                  <i style={{ color: "gold" }} className="fa fa-shopping-cart me-2"></i> : null}
                {(viewStatus == "Recomendada")
                  ?
                  <i className="fa fa-thumbs-up"></i>
                  :
                  null
                }
                {(viewStatus == "Visible")
                  ?
                  <i className="fa fa-eye"></i>
                  :
                  null
                }
                {(viewStatus == "Oculta")
                  ?
                  <i className="fa fa-eye-slash"></i>
                  :
                  null
                }
              </Col>
              <Col className="mx-auto text-center" xs={3} md={12}>
                {policy.process_comments && policy.process_comments[0] ?
                  // <React.Fragment>
                  //   <OverlayTrigger
                  //     placement="right"
                  //     overlay={renderTooltip}
                  //   >
                  //     <Button  variant="light" className="d-inline-flex align-items-center" onClick={(e)=>{e.preventDefault();}}><i style={{ color: "gold", cursor: "pointer"}} className="fa fa-info-circle mx-auto"></i></Button>

                  //   </OverlayTrigger>
                  // </React.Fragment>
                  <React.Fragment>
                    <a onClick={() => { setInfo(!info) }}
                      onMouseEnter={() => { setInfo(true) }}
                      onMouseLeave={() => { setInfo(false) }}
                      style={{ textDecoration: "none" }}>
                      <i style={{ color: "gold", cursor: "pointer" }} className="fa fa-info-circle mx-auto"></i>
                    </a>
                    {info ?
                      <div className="p-1 text-center" style={{ backgroundColor: "rgb(0, 0, 0,0.8)",zIndex:5, color: "white", position: "absolute", fontSize: "10px" }}>{policy.process_comments[0]}</div>
                      :
                      null}
                  </React.Fragment>
                  :
                  null}
              </Col> */}
              <Col className="m-0">
                <span className="redirect-quote-click" style={{ fontSize: "0.9em", textDecoration: "underline", float: "right" }}  onClick={()=>{window.parent.location.href = `/web#id=${policy.id_db}&model=sale.order&view_type=form`}} >
                  {"Num.Cot "}{policy.process_id} {">>"}
                </span>
              </Col>
            </Row>
          </Row>
        </Col>


      </Row>
    </Card>
  );
}
