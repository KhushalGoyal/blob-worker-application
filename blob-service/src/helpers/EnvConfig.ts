import dotenv from "dotenv";
import * as joi from "joi";

dotenv.config()

const envVarsSchema = joi
    .object()
    .keys({
        NODE_ENV: joi
            .string()
            .valid("production", "development", "test")
            .required(),
        PORT: joi.number().positive().required(),
        SECRET: joi.string().required().description("My api token"),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export default envVars as {
    PORT: number,
    SECRET: string,
    NODE_ENV: string,
}