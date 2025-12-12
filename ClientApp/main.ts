import "./scss/style.scss";
import 'kendo-ui-core';
import { mapViewModel } from "./viewModels/map.viewModel.js";


export {    
    mapViewModel
}

export function getRootUrl(): string {

    const element = window.document.getElementById("root") as HTMLBaseElement;

    if (element) {
        let url = element.href;

        var slash = url.charAt(url.length - 1);

        if (slash !== "/") {
            url = url + "/";
        }
        //console.log(url);
        return url;
    }

    const l = window.location;
    const protocol = l.protocol;
    const windowLocation = protocol + "//" + l.host + "/";

    return windowLocation;
}


export function getApiUrl(area: string): string {

    const l = window.location;
    const protocol = l.protocol;
    const windowLocation = protocol + "//" + l.host + "/";

    let root: string = getRootUrl();

    if (root !== windowLocation) {
        root = windowLocation;
    }

    const url = root + "api/" + area;

    return url;

}

