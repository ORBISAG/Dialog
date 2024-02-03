
export const ResultSchema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
      "trigger": {
        "type": "string"
      },     
      "values": {
        "type": "array",
        "items":
        {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "entityType": {
              "type": "string"
            },
            "name": {
              "type": "string"
            }
          }
        }
      }
    }
  };
  
  export const ResultData = {
   trigger: "",
   values: [
      {
        id: "79084197-d55b-47fd-a411-15ad1fceb912",
        entityType: "account",
        name: "Coffee House"
      }
    ]
  };

  
  export interface IEntityReference {
    id: string;
    entityType: string;
    name: string;
  }

  export interface IResult {
    trigger: string;
    values: IEntityReference[];
  }