import * as React from 'react';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { createFactory } from 'react';
import { StaticRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom'
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { createReadStream, readFileSync } from 'fs';
import App from './app/App';
import reducers from '@/common/reducers';
import { configureStore } from '@/common/store';
import { createMemoryHistory } from 'history';
import { resolve } from 'path';
const AppFactory = createFactory(App);

global['window'] = {
    location: {
        pathname: ''
    }
}
global['location'] = global['window']['location'];
global['dataLayer'] = [];

interface HelloResponse {
    statusCode: number;
    body: string;
    headers: any;
}

export default async (event: any, txt) => {
    const orgIndexHtml = readFileSync(resolve(`./${appLocation}/server.txt`)).toString('utf-8');
    const versionRegex = /<!--<!\[CDATA\[(.*?)\]\]>-->/;
    const version = versionRegex.exec(orgIndexHtml);
    const { pathParameters, headers } = event;
    if (!pathParameters) { }
    if (!headers) { }
    const { path } = pathParameters;
    const url = path.replace(appLocation, '/');
    const isDesktop = headers['CloudFront-Is-Desktop-Viewer'] == "true";
    const store = configureStore(reducers({
    }), Object.assign({}, {}, {}));
    const reactAppElement = renderToString(AppFactory({
        history: createMemoryHistory({
            initialEntries: [url]
        }),
        store,
    }));
    let htmlStr = orgIndexHtml.toString();
    // htmlStr = htmlStr.replace('<!-- __insert_css__ -->', `<link rel="stylesheet"  href="/static/${appLocation}/style-${agent}.${version[1]}.css" />`);
    htmlStr = htmlStr.replace('<!-- __insert_scripts__ -->', `    <script>
        window.__REDUX_STATE__=${JSON.stringify(store.getState())}
        </script>`);
    htmlStr = htmlStr.replace('<div id="root"></div>', `<div id="root">${reactAppElement}</div>`);
    // res.send(htmlStr);
    const response: HelloResponse = {
        statusCode: 200,
        body: htmlStr,
        headers: {
            'Content-Type': 'text/html'
        }
    };
    return response;
}