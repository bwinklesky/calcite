import Viewpoint from "@arcgis/core/Viewpoint.js";
import SceneView from "@arcgis/core/views/SceneView.js";
import ArcGISMap from "@arcgis/core/Map.js";
import * as colorRamps from "@arcgis/core/smartMapping/symbology/support/colorRamps.js";
import Color from "@arcgis/core/Color.js";
import AlgorithmicColorRamp from "@arcgis/core/rest/support/AlgorithmicColorRamp.js";
import RasterShadedReliefRenderer from "@arcgis/core/renderers/RasterShadedReliefRenderer.js";
import ImageryTileLayer from "@arcgis/core/layers/ImageryTileLayer.js";
import WMSLayer from "@arcgis/core/layers/WMSLayer.js";
import WMTSLayer from "@arcgis/core/layers/WMTSLayer.js";
import ElevationLayer from "@arcgis/core/layers/ElevationLayer.js";
import WebScene from "@arcgis/core/WebScene.js";
import Point from "@arcgis/core/geometry/Point.js";
import BaseElevationLayer from "@arcgis/core/layers/BaseElevationLayer.js";
function changeColorRamp(name) {
    const colors = colorRamps.byName(name);
    return colorRamps.names;
}
const ExaggeratedElevationLayer = new BaseElevationLayer({});
export class EsriScene {
    view;
    map;
    constructor(container) {
        let hillshadeType = "traditional";
        const url = "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer";
        // Esri color ramps - Esri Orange and Purple 3
        // #c67718ff,#fbb664ff,#ffe7c7ff,#987ac3ff,#4e2c7eff
        let colors = ["#c67718ff", "#fbb664ff", "#ffe7c7ff", "#987ac3ff", "#4e2c7eff"];
        var color = colorRamps.byName("Red and Green Extremes 3");
        var colorRamp = new AlgorithmicColorRamp({
            fromColor: new Color(colors[0]),
            toColor: new Color(colors[colors.length - 1])
        });
        console.log(colorRamps.names());
        if (color) {
            colorRamp.fromColor = color.colors[0];
            colorRamp.toColor = color.colors[color.colors.length - 1];
        }
        const renderer = new RasterShadedReliefRenderer({
            altitude: 45, // angle of elevation above the horizon
            azimuth: 315, // position along the horizon
            hillshadeType: 'traditional', // either "traditional" or "multi-directional"
            zFactor: 1.5,
            scalingType: "adjusted",
            colorRamp: colorRamp,
        });
        const hillshadeLayer = new ImageryTileLayer({
            url: url,
            renderer: renderer // set the renderer on the layer
        });
        const layer = new WMSLayer({
            title: "test",
            url: "https://klyk.app/geoserver/mountainmap/wms?service=WMS",
            sublayers: [
                {
                    name: "mountainmap:biking_trails"
                },
                {
                    name: "mountainmap:resorts"
                },
                {
                    name: "mountainmap:ski_trails"
                },
                {
                    name: "mountainmap:trailheads"
                },
                {
                    name: "mountainmap:hearts"
                },
                {
                    name: "mountainmap:skate_parks"
                }
            ]
        });
        const hikingLayer = new WMSLayer({
            url: "https://klyk.app/geoserver/mountainmap/wms?service=WMS",
            sublayers: [
                {
                    name: "mountainmap:hiking_trails"
                }
            ],
            minScale: 200000
        });
        const wmtsLayer = new WMTSLayer({
            url: "https://klyk.app/geoserver/gwc/service/wmts",
            version: "1.1.1",
            activeLayer: {
                id: "mountainmap:hiking_trails"
            }
        });
        var elevation = new ElevationLayer({});
        // Example code to exaggerate elevation in a SceneView
        // Create a custom elevation layer (replace with your custom implementation)
        let scene = new WebScene({
            basemap: 'gray-vector',
        });
        // The scene will now display with exaggerated terrain
        this.map = new ArcGISMap({
            basemap: "gray-vector",
            ground: "world-elevation",
            layers: [hillshadeLayer]
        });
        this.view = new SceneView({
            // An instance of Map or WebScene
            map: this.map,
            container,
            viewpoint: new Viewpoint({
                scale: 20000000,
                targetGeometry: new Point({
                    x: -100, y: 38
                })
            })
            // The id of a DOM element (may also be an actual DOM element)
            //container: "viewDiv"
        });
        this.view.when(() => {
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
        console.log(this.view);
    }
}
//# sourceMappingURL=EsriScene.js.map