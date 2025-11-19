    // Create an iframe element
    const iframe = document.createElement('iframe');

    // Set the iframe's source to about:blank
    iframe.setAttribute('src', 'about:blank');

    // Set styling for the iframe to fill the window
    iframe.setAttribute('style', 'position:fixed;top:0;left:0;height:100vh;width:100vw;border:none;');

    // Append the iframe to the document body
    document.body.appendChild(iframe);

    // After the iframe is loaded, inject content into it
    iframe.onload = () => {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Embedded Site</title>
            </head>
            <body>
                <h1>Welcome to the embedded site!</h1>
                <p>This content is loaded inside an about:blank iframe.</p>
                <!-- You can load another site here using an inner iframe or fetch requests -->
            </body>
            </html>
        `);
        iframeDoc.close();
    };
