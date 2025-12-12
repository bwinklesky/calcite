import { EsriScene } from "../app/EsriScene.js";
import LayerListVM from "@arcgis/core/widgets/LayerList/LayerListViewModel.js";
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import Graphic from "@arcgis/core/Graphic.js";
import Sketch from "@arcgis/core/widgets/Sketch.js";
import LayerList from "@arcgis/core/widgets/LayerList.js";
import WKT from "ol/format/WKT.js";
import { Field } from "../models/Field.js";
import { WKObject } from "../models/WKObject.js";
import { Collection } from "ol";

let scene: EsriScene;

export const mapViewModel = new kendo.data.ObservableObject({
    init: function () {
        scene = new EsriScene("viewDiv");

        const USALayer = new MapImageLayer({
            url: "http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",
            title: "US Sample Data"
        });

        const layerList = new LayerList({
            view: scene.view
        });

        // Adds widget below other elements in the top left corner of the view
        scene.view.ui.add(layerList, {
            position: "top-right"
        });

        //https://services1.arcgis.com/2exN3kG1f2h7coIQ/ArcGIS/rest/services/All_Trails/FeatureServer

        const graphicsLayer = new GraphicsLayer();

        const sketch = new Sketch({
            view: scene.view,
            layer: graphicsLayer
        });

        scene.view.ui.add(sketch, "top-right");


        const pointLayer = new FeatureLayer({
            url: "https://services1.arcgis.com/2exN3kG1f2h7coIQ/ArcGIS/rest/services/All_Trails/FeatureServer",
            // Add a simple symbol for each point
            renderer: {
                type: "simple",
                symbol: {
                    type: "simple-marker",
                    style: "circle",
                    color: "blue",
                    size: "10px"
                }
            }
        });


        //scene.map.add(pointLayer);

        const polygonLayer = new FeatureLayer({
            source: [],
            title: 'Fields',
            geometryType: 'polygon',
            objectIdField: 'ObjectID',
            spatialReference: { wkid: 4326 },
            renderer: {
                type: "simple",
                symbol: {
                    type: 'simple-fill',
                    color: 'blue',
                    outline: {
                        width:10, color:'purple'
                    }
                }
            }
        });
        
        scene.map.add(polygonLayer);

        scene.view.when((e) => {

            console.log(e);

          

        });


        //fieldsDataSource.read({});

        //const sketchVM = new SketchViewModel({
        //    layer: graphicsLayer,
        //    view: scene.view,
        //    defaultCreateOptions: {
        //        hasZ: true  // default value
        //    },
        //    defaultUpdateOptions: {
        //        enableZ: true  // default value
        //    }
        //});
    }
});