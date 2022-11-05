import Ajv, {JSONSchemaType} from "ajv"

const ajv = new Ajv()

export type DataRequest = {
  model: "sleep" | "pulse"
  value: number[];
}

const dataRequestSchema: JSONSchemaType<DataRequest> = {
  type: "object",
  properties: {
    model: { type: "string", enum: ["sleep", "pulse"] },
    value: { type: "array", items: { type: "number" } },
  },
  required: ["model", "value"],
  additionalProperties: false
}

const dataRequestValidator = ajv.compile(dataRequestSchema)

export const validateDataRequest = (data: unknown) => {
  if (dataRequestValidator(data)) {
    return data;
  } else {
    throw dataRequestValidator.errors;
  }
}

