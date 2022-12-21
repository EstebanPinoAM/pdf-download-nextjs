import Document, { Html, Head, Main, NextScript } from "next/document";
import { handlePrintToBase64Doc } from "../Utils/puppeteer";
import { getOportunityClient } from "../Utils/getOportunity";
import { extractName } from "../Utils/pfd"
import React from "react";

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const { req, res, query, renderPage } = ctx;
    // Setup
    // const name = "730"
    // const token = "42ede136-ee2e-410b-adec-1aa6098ab8b8"n
    // const tenant = "cencosud.co.agm-dev.com"
    // const oportunity = await getOportunityClient(`https://${tenant}`, name, token)
    const page = await renderPage({
      enhanceApp: (App) => (props) => <App {...props} />,
    });

    const html = <html
    lang="en"
    dangerouslySetInnerHTML={{
      __html: `
          <head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />
            <link rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons">
            <link
              href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;1,200;1,300;1,400;1,600;1,700&amp;display=swap"
              rel="stylesheet">
            <link href="https://fonts.googleapis.com/css2?family=Numans&amp;display=swap" rel="stylesheet">
            <link href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" rel="stylesheet">
          </head>
          <body>
          <div id="__next">
          ${page.html}
          </div>
          </body>
          `,
    }}
  />

    const name = extractName(html)

    const buffer = await handlePrintToBase64Doc(html)
    .catch(function (err) {
      console.log("Error generating pdf", err);
    });
    res.setHeader("Content-disposition", `attachment; filename="${name}.pdf`);
    res.setHeader("Content-Type", "application/pdf");
    res.end(buffer);
    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default CustomDocument;
