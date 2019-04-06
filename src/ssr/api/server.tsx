import * as express from 'express';
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
import Loadable from 'react-loadable';

const app = express();
const AppFactory = createFactory(App);

const orgIndexHtml = readFileSync(resolve(`./server/${appLocation}/server.txt`)).toString('utf-8');
const versionRegex = /<!--<!\[CDATA\[(.*?)\]\]>-->/;
const version = versionRegex.exec(orgIndexHtml);
// global['document'] = {
//     getElementById: (e) => ({
//         appendChild: (e) => { },
//         removeChild: (e) => { }
//     })
// }
global['window'] = {
    location: {
        pathname: ''
    }
}
global['location'] = global['window']['location'];
global['dataLayer'] = [];


const renderApp = async (req: express.Request, res: express.Response) => {
    const agent = getDeviceType(req.headers['user-agent'])
    const cssPrefix = agent == 'desktop' ? 'desktop' : 'tablet';
    const store = configureStore(reducers({
    }),
        {} //initial state
    );
    const context = { url: req.url };
    const reactAppElement = renderToString(AppFactory({
        history: createMemoryHistory({
            initialEntries: [context.url]
        }),
        store,
    }));
    let htmlStr = orgIndexHtml.toString();
    htmlStr = htmlStr.replace('<!-- __insert_scripts__ -->', `    <script>
        window.__REDUX_STATE__=${JSON.stringify(store.getState())}
        </script>`);
    htmlStr = htmlStr.replace('<div id="root"></div>', `<div id="root">${reactAppElement}</div>`);
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.send(htmlStr);
}
app.use('/server-static', express.static(`./server-static`));
app.get('**', renderApp)
const port = 5000;
Loadable.preloadAll().then(() => {
    app.listen(port);
}).catch(err => {
    console.log(err);
});
var defaultOptions = {
    emptyUserAgentDeviceType: 'desktop',
    unknownUserAgentDeviceType: 'phone',
    botUserAgentDeviceType: 'bot',
    carUserAgentDeviceType: 'car',
    consoleUserAgentDeviceType: 'tv',
    tvUserAgentDeviceType: 'tv',
    parseUserAgent: false
};
export const getDeviceType = (ua) => {
    if (!ua || ua === '') {
        // No user agent.
        return defaultOptions.emptyUserAgentDeviceType;
    }
    // overwrite Flipboard user agent otherwise it's detected as a desktop
    if (ua.match(/FlipboardProxy/i))
        ua = 'FlipboardProxy/1.1;  http://flipboard.com/browserproxy';
    if (ua.match(/Applebot/i))
        ua = 'Applebot/0.1;  http://www.apple.com/go/applebot';
    if (ua.match(/GoogleTV|SmartTV|SMART-TV|Internet TV|NetCast|NETTV|AppleTV|boxee|Kylo|Roku|DLNADOC|hbbtv|CrKey|CE\-HTML/i)) {
        // if user agent is a smart TV - http://goo.gl/FocDk
        return defaultOptions.tvUserAgentDeviceType;
    } else if (ua.match(/Xbox|PLAYSTATION (3|4)|Wii/i)) {
        // if user agent is a TV Based Gaming Console
        return defaultOptions.consoleUserAgentDeviceType;
    } else if (ua.match(/QtCarBrowser/i)) {
        // if the user agent is a car
        return defaultOptions.carUserAgentDeviceType;;
    } else if (ua.match(/Googlebot/i)) {
        // if user agent is a BOT/Crawler/Spider
        return defaultOptions.botUserAgentDeviceType;
    } else if (ua.match(/WhatsApp/i)) {
        // if user agent is a BOT/Crawler/Spider
        return defaultOptions.botUserAgentDeviceType;
    } else if (ua.match(/iP(a|ro)d/i) || (ua.match(/tablet/i) && !ua.match(/RX-34/i)) || ua.match(/FOLIO/i)) {
        // if user agent is a Tablet
        return 'tablet';
    } else if (ua.match(/Linux/i) && ua.match(/Android/i) && !ua.match(/Fennec|mobi|HTC Magic|HTCX06HT|Nexus One|SC-02B|fone 945/i)) {
        // if user agent is an Android Tablet
        return 'tablet';
    } else if (ua.match(/Kindle/i) || (ua.match(/Mac OS/i) && ua.match(/Silk/i)) || (ua.match(/AppleWebKit/i) && ua.match(/Silk/i) && !ua.match(/Playstation Vita/i))) {
        // if user agent is a Kindle or Kindle Fire
        return 'tablet';
    } else if (ua.match(/GT-P10|SC-01C|SHW-M180S|SGH-T849|SCH-I800|SHW-M180L|SPH-P100|SGH-I987|zt180|HTC( Flyer|_Flyer)|Sprint ATP51|ViewPad7|pandigital(sprnova|nova)|Ideos S7|Dell Streak 7|Advent Vega|A101IT|A70BHT|MID7015|Next2|nook/i) || (ua.match(/MB511/i) && ua.match(/RUTEM/i))) {
        // if user agent is a pre Android 3.0 Tablet
        return 'tablet';
    } else if (ua.match(/BOLT|Fennec|Iris|Maemo|Minimo|Mobi|mowser|NetFront|Novarra|Prism|RX-34|Skyfire|Tear|XV6875|XV6975|Google Wireless Transcoder/i)) {
        // if user agent is unique phone User Agent
        return 'phone';
    } else if (ua.match(/Opera/i) && ua.match(/Windows NT 5/i) && ua.match(/HTC|Xda|Mini|Vario|SAMSUNG\-GT\-i8000|SAMSUNG\-SGH\-i9/i)) {
        // if user agent is an odd Opera User Agent - http://goo.gl/nK90K
        return 'phone';
    } else if ((ua.match(/Windows (NT|XP|ME|9)/) && !ua.match(/Phone/i)) && !ua.match(/Bot|Spider|ia_archiver|NewsGator/i) || ua.match(/Win( ?9|NT)/i)) {
        // if user agent is Windows Desktop
        return 'desktop';
    } else if (ua.match(/Macintosh|PowerPC/i) && !ua.match(/Silk|moatbot/i)) {
        // if agent is Mac Desktop
        return 'desktop';
    } else if (ua.match(/Linux/i) && ua.match(/X11/i) && !ua.match(/Charlotte|JobBot/i)) {
        // if user agent is a Linux Desktop
        return 'desktop';
    } else if (ua.match(/CrOS/)) {
        // if user agent is a Chrome Book
        return 'desktop';
    } else if (ua.match(/Solaris|SunOS|BSD/i)) {
        // if user agent is a Solaris, SunOS, BSD Desktop
        return 'desktop';
    } else if (ua.match(/Mozilla\/5\.0 \(\)|jack|Applebot|FlipboardProxy|Go 1.1 package|HTMLParser|simplereach|python-requests|ShowyouBot|MetaURI|nineconnections|(^Java\/[0-9._]*)|Commons-HttpClient|InAGist|HTTP-Java-Client|curl|Wget|Bot|B-O-T|Crawler|Spider|Spyder|Yahoo|ia_archiver|Covario-IDS|findlinks|DataparkSearch|larbin|Mediapartners-Google|NG-Search|Snappy|Teoma|Jeeves|Charlotte|NewsGator|TinEye|Cerberian|SearchSight|Zao|Scrubby|Qseero|PycURL|Pompos|oegp|SBIder|yoogliFetchAgent|yacy|webcollage|VYU2|voyager|updated|truwoGPS|StackRambler|Sqworm|silk|semanticdiscovery|ScoutJet|Nymesis|NetResearchServer|MVAClient|mogimogi|Mnogosearch|Arachmo|Accoona|holmes|htdig|ichiro|webis|LinkWalker|lwp-trivial|facebookexternalhit|monit\/|ELB-HealthChecker\/|JobBot|GoogleCloudMonitoring|GoogleStackdriverMonitoring|gomezagent|apm synthetic agent|ruxitsynthetic|ktxn|khte|ktht|dynatrace/i) && !ua.match(/phone|Playstation/i)) {
        // if user agent is a BOT/Crawler/Spider
        return defaultOptions.botUserAgentDeviceType;
    } else {
        // Otherwise returning the unknown type configured
        return defaultOptions.unknownUserAgentDeviceType;
    }
}