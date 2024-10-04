export default class Formats {
    public static objectToParams(object: {[key: string | number | symbol]: string}){
        let pares = Object.entries(object);
        let paresConRepe = [].concat.apply([], pares.map(
            ([key, val])=>(val instanceof Array ? val.map(v=>[`${key}[]`,v]) :
                val && val.toJSON ? [[key, val.toJSON()]] :
                val instanceof Object ? Object.entries(val).map(([k,v])=>[`${key}[${k}]`,v]) :
                [[key, val]]
            )
        ));
        var up = new URLSearchParams(paresConRepe);
        return up.toString();
    }
}