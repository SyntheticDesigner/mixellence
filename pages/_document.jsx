import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head></Head>
        <body>
          <Main />
          <NextScript />
          <div id='modalPortal'/>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
