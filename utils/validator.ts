import Ajv, {JSONSchemaType} from "ajv"

const ajv = new Ajv()

export type DataRequest = {
  model: "sleep" | "hrv"
  timestamp: number;
  value: number;
}

const dataRequestSchema: JSONSchemaType<DataRequest> = {
  type: "object",
  properties: {
    model: { type: "string", enum: ["sleep", "hrv"] },
    timestamp: {type: "integer"},
    value: {type: "number"},
  },
  required: ["model", "timestamp", "value"],
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

