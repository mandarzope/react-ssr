declare var dataLayer;
// const EC = 'Micro';
class GTMService {
    constructor() {
        if (typeof dataLayer !== 'undefined' && dataLayer) {
            dataLayer = (<any>window).dataLayer = (<any>window).dataLayer || [];
        }
    }
    track(p: any) { dataLayer.push(p); }
    click(EC, EA, EL, EV, MXTP?, MXSP?) {
        dataLayer.push({
            event: 'Event',
            EC,
            EA,
            EL,
            EV,
            MXTP,
            MXSP
        })
    }
    push(c) {
        dataLayer.push(c)
    }
}
export const gtm = new GTMService();


const utmParams = ["utm_source", "utm_category", "utm_campaign", "utm_medium", "creative", "device", "devicemodel", "target", "placement"];
function getFTParam(name) {
    return localStorage.getItem("utm#ft_" + name);
}
function getLTParam(name) {
    return sessionStorage.getItem("utm#" + name);
}
export const getUTM = () => {
    let params = {};
    for (let i of utmParams) {
        let ft = getFTParam(i);
        let lt = getLTParam(i);
        params[`ft_${i}`] = ft;
        params[i] = lt;
    }
    return params;
}