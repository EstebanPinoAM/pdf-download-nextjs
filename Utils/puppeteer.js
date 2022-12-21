import { renderToStaticMarkup } from "react-dom/server";
import puppeteer from "puppeteer";


export const handlePrintToBase64Doc = async (component) => {
  const footer = `
  <div
    style="
      position: absolute;
      bottom: 10px;
      right: 1.2cm;
    "
  >
    <strong style="font-size: 6px; color:#888888";>
        <span>Generado con Agentemotor-(Impreso el${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()})</span>
    </strong>
  </div>
  `;
  const html = renderToStaticMarkup(component);
  const browser = await puppeteer.launch({
    headless: true,
    args: ["—no-sandbox", "—disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0", timeout: 30000 });
  const pdf = await page.pdf({
    // path:`${Date.now()}.pdf`,
    format: "letter",
    scale: 1.4,
    printBackground: true,
    margin: {top: 38, left: 26, right: 26, bottom: 30},
    displayHeaderFooter:true,
    footerTemplate: `
          <div style="color: #888888; font-size: 6px; padding-top: 5px; padding-right: 55px; text-align: end; width: 100%;">
            <span>Generado con Agentemotor-(Impreso el ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()})</span>
          </div>
        `,
    headerTemplate:"<span></span>",
  });
  await browser.close();
  return pdf;
};
