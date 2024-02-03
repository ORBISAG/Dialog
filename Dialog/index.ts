import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { HelloWorld, IHelloWorldProps } from "./HelloWorld";
import * as React from "react";
import { IResult, ResultData, ResultSchema } from "./StaticData";
import { TCallback } from "./Open/dialog";
import { openForm } from "./Open/form";
import { openCustomPage } from "./Open/custompage";


export class Dialog implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    private trigger ?: string;
    private result : IResult  = ResultData;

    /**
     * Empty constructor.
     */
    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
    }


    private afterClose(result: IResult){
        this.result = result;
        this.result.trigger = this.trigger?.toString() ?? "";
        this.notifyOutputChanged();
    }

    private openDialog(context:ComponentFramework.Context<IInputs>, callback: TCallback){
        console.log("Open Dialog now");
        if(context.parameters.type.raw === "Form"){
            openForm(context, callback);
        }
        if(context.parameters.type.raw === "CustomPage"){
            openCustomPage(context, callback);
        }
    }

 
    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        if(this.trigger !== context.parameters.dialogTrigger.raw){                       
            this.trigger = context.parameters.dialogTrigger.raw;
            if(context.updatedProperties.includes("dialogTrigger")){
                this.openDialog(context, this.afterClose.bind(this));               
            }            
        }      
        return React.createElement(
            React.Fragment
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return { 
            result: this.result
        };
    }

    public async getOutputSchema(context: ComponentFramework.Context<IInputs>): Promise<Record<string, unknown>> {
        return Promise.resolve({
            result: ResultSchema
        });
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
