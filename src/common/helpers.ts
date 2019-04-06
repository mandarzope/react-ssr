export function sP(e) { e.stopPropagation() };
export const actionCreator = (action) => (payload: any) => ({
    type: action,
    payload: payload
})
const loadedScripts = {

}
export function loadScript(src) {
    if (loadedScripts[src]) return new Promise(function (resolve, reject) {
        resolve();
    })
    return new Promise(function (resolve, reject) {
        var s;
        s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        loadedScripts[src] = s;
        document.head.appendChild(s);
    });
}