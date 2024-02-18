import { parse } from "path";
import { IInputs } from "../generated/ManifestTypes";
import { TCallback } from "./dialog";

function clearId(id: string | null ){
    if(id==""){
        return null;
    }
    return id;
}

export function openForm(context: ComponentFramework.Context<IInputs>, callback: TCallback){
    const entityName = context.parameters.entityName.raw;
    const entityId = context.parameters.entityId.raw;
    const width = context.parameters.width.raw ?? "500";
    const height = context.parameters.height.raw ?? "500";
    const position = context.parameters.position.raw ?? "Center";

    (context.navigation as any).navigateTo({
        pageType: "entityrecord",
        entityId: clearId(entityId),
        entityName: entityName ?? ""
    }, {
        width: { value : parseInt(width), unit: "px"},
        height: {value: parseInt(height), unit: "px"}, 
        position : position == "Center" ? 1 : 2, 
        target: 2 //dialog
    })  
    .then((value : any)=> {
        const entityReference = value.savedEntityReference as any ?? [];
        callback({
            trigger: "",
            values : entityReference
        })
    }).catch(console.error);



}