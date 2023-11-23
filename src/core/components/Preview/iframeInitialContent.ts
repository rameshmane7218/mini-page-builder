export const iframeInitialContent = `<!DOCTYPE html>
    <html>
    <head>
        <style>
        @import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,500;1,600;1,700;1,800&display=swap");
        :root {
            --sidebar: 326px;
        
            --black: #000000;
            --white: #ffffff;
            --gray-1: #f3f3f3;
            --gray-2: #d4d4d4;
            --gray-5: #d9d9d9;
            --gray-8: #595959;
            --gray-9: #262626;
            --gray-10: #2d2d2d;
            --blue: #0044c1;
            --border-block-active: #d95409;
        }
        html {
            font-size: 16px;
            font-style: normal;
            scroll-behavior: smooth;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            margin: 0;
        }
        
        html,body,.frame-content {
            height: 100%;
            width: 100%;
            margin: 0;
        } 
        body{
            background: var(--gray-1);
            font-family: "Open Sans", sans-serif;
        }
        body.grabbing * {
            cursor: grabbing !important; 
            user-select: none // without this I get the text cursor in Safari 
        }
        </style>
    </head>
    <body><div id="mountHere" style="height:100%"></div></body>
    </html>`;
