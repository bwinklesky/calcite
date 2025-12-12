import Polyline from "@arcgis/core/geometry/Polyline.js";
import { Polygon as AGSPolygon, Point as AGSPoint } from "@arcgis/core/geometry.js";
import WKT from "ol/format/WKT.js";
import Collection from "ol/Collection.js";
const format = new WKT();
class WKObject {
    constructor() {
        this.wellKnownText = null;
        //this.geometry = format.readFeature("POINT(0 0)").getGeometry();
        //this.bob = "bob";
        console.log("test");
    }
    wellKnownText;
    coordinateSystemId;
    isAcceptable(s) {
        return "test";
    }
    getBirthYear() {
        return new Date().getFullYear() - 10;
    }
    getGeometry() {
        console.log(this);
        var format = new WKT();
        var geom = format.readFeature(this.wellKnownText).getGeometry();
        return geom;
    }
    //static getGeometry(wkt?:string): Geometry | undefined {
    //    var format = new WKT();
    //    if(wkt) return format.readFeature(wkt).getGeometry();
    //}
    static getGeometry(wkt) {
        var format = new WKT();
        if (wkt)
            return format.readFeature(wkt.wellKnownText).getGeometry();
    }
    static getAGS(wkt) {
        var format = new WKT();
        var collection = new Collection();
        var poly = new Polyline({ spatialReference: { wkid: 4326 } });
        const obj = format.readFeature(wkt?.wellKnownText);
        const geometryType = obj.getGeometry().getType();
        var geom = obj.getGeometry();
        if (geometryType === 'LineString') {
            var poly = new Polyline({ spatialReference: { wkid: 4326 } });
            const points = [];
            const theGeom = geom;
            for (var item of theGeom.getCoordinates()) {
                const x = item[0];
                const y = item[1];
                points.push(new AGSPoint({ x, y, spatialReference: { wkid: 4326 } }));
            }
            poly.addPath(points);
            return poly;
        }
        else if (geometryType === 'Polygon') {
            var polygon = new AGSPolygon({ spatialReference: { wkid: 4326 } });
            const theGeom = geom;
            const coords = theGeom.getCoordinates();
            for (var coord of coords) {
                const points = [];
                coord.forEach((c) => {
                    const x = c[0];
                    const y = c[1];
                    points.push(new AGSPoint({ x, y, spatialReference: { wkid: 4326 } }));
                });
                polygon.addRing(points);
            }
            console.log(polygon.extent);
            return polygon;
        }
        else {
            alert('bob2');
        }
        console.log(obj.getGeometry());
        const points = [];
        if (wkt)
            return format.readFeature(wkt.wellKnownText).getGeometry();
    }
    toAGS() {
        var collection = new Collection();
        var poly = new Polyline({ spatialReference: { wkid: 4326 } });
        const format = new WKT();
        const obj = format.readFeature(this.wellKnownText);
        const points = [];
        //var geom = obj.getGeometry() as LineString;
        //for (var item of geom.getCoordinates()) {
        //    var x = item[0];
        //    var y = item[1];
        //    points.push(new Point(
        //        { x, y, spatialReference: { wkid: 4326 } }
        //    ));
        //}
        //poly.addPath(points);
        //return poly;
    }
}
export { WKObject };
//# sourceMappingURL=WKObject.js.map