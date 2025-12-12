/* eslint-disable @typescript-eslint/no-unused-vars */
import EsriConfig from "@arcgis/core/config.js";
import ArcGISMap from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import Polyline from "@arcgis/core/geometry/Polyline.js";
import Point from "@arcgis/core/geometry/Point.js";
import { Collection } from "ol";
import WKT from "ol/format/WKT.js";
EsriConfig.assetsPath = "https://js.arcgis.com/4.32/@arcgis/core/assets/";
EsriConfig.apiKey = "AAPK2ecc83e252294018a265438653dd9cc25DUG27XZzbpWZyhsUauz-x4e3zl8LFZEqy5iP-NBNQRRYSOlkT77xDFsYi2bZY1N";
let view;
let sceneView;
const toAGS = (wkt) => {
    var collection = new Collection();
    var poly = new Polyline({ spatialReference: { wkid: 4326 } });
    const format = new WKT();
    const obj = format.readFeature(wkt);
    const points = [];
    var geom = obj.getGeometry();
    for (var item of geom.getCoordinates()) {
        var x = item[0];
        var y = item[1];
        points.push(new Point({ x, y, spatialReference: { wkid: 4326 } }));
    }
    poly.addPath(points);
    return poly;
};
export class EsriMap {
    map;
    mapView;
    constructor(container) {
        // The scene will now display with exaggerated terrain
        this.map = new ArcGISMap({
            basemap: "satellite"
            //ground: "world-elevation",
            //layers: [hillshadeLayer]
        });
        this.mapView = new MapView({
            container,
            map: this.map
        });
        this.mapView.when((e) => {
            console.log(e);
            //this.view.verticalExaggeration = 2; // Set vertical exaggeration to 2x
        });
        //view.when(function () {
        //    // SceneView is now ready for display and can be used. Here we will
        //    // use goTo to view a particular location at a given zoom level, camera
        //    // heading and tilt.
        //    view.goTo({
        //        center: [-112, 38],
        //        zoom: 13,
        //        heading: 30,
        //        tilt: 60
        //    })
        //})
        //    .catch(function (err) {
        //        // A rejected view indicates a fatal error making it unable to display,
        //        // this usually means that WebGL is not available, or too old.
        //        console.error("SceneView rejected:", err);
        //    });
        //this.view.when(() => {
        //    console.log("Map is loaded");
        //})
    }
}
//# sourceMappingURL=arcgis.js.map