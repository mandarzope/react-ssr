declare namespace JSX {
    interface IntrinsicAttributes {
        classes?: string;
        label?: string;
        name?: string;
        ref?: any;
    }
    interface IntrinsicElements {
        'x-tp': any
    }
}
declare var cdn;
declare var backend;
declare var frontend;
declare var key_id;
declare var $zoho;
declare var version;
declare var appLocation;
declare var basename;
interface ReduxAction {
    type: string;
    payload?: any;
}
interface BooleanFunction {
    (b: boolean): void
}
// interface VoidFunction<T> {
//     (b: T): void
// }
type ControlValue = string | boolean | string[] | any;

interface RouterMatchProp {
    path: string;
    url: string;
    params: any;
    isExact: boolean;
}
interface DeviceTypes {
    ismobile: boolean;
    isdesktop: boolean;
    isandroid: boolean;
    istablet: boolean;
    devicetype: string;
}
declare interface Window {
    __REDUX_STATE__: any,
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
    Intercom: any
    $zoho: any
}
declare module '*.scss' {
    const content: { [className: string]: string };
    export = content;
}
declare module '*.txt' {
    const content: any;
    export default content;
}