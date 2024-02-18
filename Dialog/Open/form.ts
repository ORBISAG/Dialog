import { parse } from "path";
import { IInputs } from "../generated/ManifestTypes";
import { TCallback } from "./dialog";

function removeEmptyString(id: string | null ){
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

    const dataString = removeEmptyString(context.parameters.data?.raw);
    let dataParam = {};    
    try{
        if(dataString != null){
            dataParam = {data: JSON.parse(dataString ?? "{}")};
        }
    }
    catch(e){
        console.error(e);
    }
    const formIdString = removeEmptyString(context.parameters.formId.raw);
    const tabNameString = removeEmptyString(context.parameters.formTabName.raw);
    const formIdParam = formIdString != null ? {formId: formIdString} : {};
    const tabNameParam = tabNameString != null ? {tabName: tabNameString} : {};

    (context.navigation as any).navigateTo({
        pageType: "entityrecord",
        entityId: removeEmptyString(entityId),
        entityName: entityName ?? "", 
        ...dataParam, ...formIdParam, ...tabNameParam
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