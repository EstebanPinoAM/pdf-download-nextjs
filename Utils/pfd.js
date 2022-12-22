import { renderToStaticMarkup } from "react-dom/server";
import DomParser from "dom-parser";
// import { JSDOM } from "jsdom";

// const getCustomStyles = () => {
//   const style = document.createElement('style');

//   style.textContent = `
//   #wrapper {
//       font-family: Source Sans Pro, Roboto ,sans-serif !important;
//   }
//   .k-grid-container td{
//       font-size: 7px !important;
//   }

//   .k-grid-header td{
//       font-size: 7px !important;
//   }
 
//   .k-grid-container ul {
//       list-style-type: none;
//       margin: 0;
//       padding: 0;
//   }
//   .k-grid-header-wrap img {
//       height: 50px !important;
//   }
//   `;

//   return style;
// }

// const PageTemplateString = () => {
//   return `
//       <div
//         style="
//           position: absolute;
//           bottom: 10px;
//           right: 1.2cm;
//         "
//       >
//         <strong style="font-size: 6px; color:#888888";>
//             <span>Generado con Agentemotor-(Impreso el${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()})</span>
//         </strong>
//       </div>
//       `;
// };

// const exportPDFToBase64 = async (html, pdfName) => {
//   try {
//     const group = await drawDOM(html, {
//       paperSize: "letter",
//       margin: "1cm",
//       scale: 1,
//       landscape: false,
//       fileName: pdfName,
//       template: PageTemplateString,
//     });
//     const dataUri = await exportPDF(group);
//     console.log("dataUri",dataUri)
//     return dataUri.split(";base64,")[1];
//   } catch (e) {
//     console.log(e);
//     return e
//   }
// };

// const handlePrintToBase64 = async (document, pdfName) => {
//     const html = renderToStaticMarkup(document);
//     const root = parse(html);
//   if (document) {
//     // console.log("DOC",root)
//     // const html = document.getElementsByTagName("body")[0];
//     return await exportPDFToBase64(root, pdfName);
//   }
// };

// const exportPDFToBase64index = async(html,pdfName) => {
//     console.log(html)
//     try{
//         drawDOM(html, {
//             paperSize: "letter",
//             margin: "1cm",
//             scale: 1,
//             landscape: false,
//             fileName: pdfName,
//             template:PageTemplateString
//         })
//         .then((group) => {
//             return exportPDF(group);
//         })
//         .then((dataUri) => {
//             const base64 = dataUri.split(";base64,")[1]
//             const linkSource = `data:application/pdf;base64,${base64}`;
//             const downloadLink = document.createElement("a");
//             const fileName = "abc.pdf";
//             downloadLink.href = linkSource;
//             downloadLink.download = fileName;
//             downloadLink.click();
//             window.document.body.appendChild(downloadLink);
//         })
//         .catch(err =>{
//           console.log("err",err)
//         })
//     }
//     catch(e){
//         console.log(e)
//     }
// };

// const exportPDFWithMethod = (html,pdfName) => {
//   try{
//       savePDF(html, {
//           paperSize: "letter",
//           margin: "1cm",
//           scale: 1,
//           landscape: false,
//           fileName: pdfName,
//       });
//   }
//   catch(e){
//       console.log(e)
//   }
// };

// const handlePrintToBase64index = async (printIframe,pdfName) => {
//     console.log("printIframe",printIframe)
//     const document = printIframe.contentDocument;
    
//     console.log("TYPE",typeof document)
//     document.body.appendChild(getCustomStyles());

//     // const browser = await puppeteer.launch({
//     //   headless: true,
//     //   args: ["—no-sandbox", "—disable-setuid-sandbox"]
//     // });
//     // await browser.close();
    
//     if (document) {
//         const html = document.getElementsByTagName('body')[0];
//         console.log("html",html)
//         return await exportPDFToBase64index(html,pdfName);
//     }
// }

const extractName = (doc) => {
  var parser = new DomParser();
  const html = renderToStaticMarkup(doc);
  var dom = parser.parseFromString(html);
  const element = dom.getElementById("pdfName")
  if(!element) return "test" 
  const attributes = element.attributes
  return attributes[2]["value"]
}


export { extractName };
