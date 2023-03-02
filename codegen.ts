import { CodegenConfig } from "@graphql-codegen/cli";
import * as dotenv from "dotenv";
dotenv.config();

const CODEGEN_GRAPHQL_SCHEMA_URL = process.env.REACT_APP_GRAPHQL_ENDPOINT;

const config: CodegenConfig = {
  overwrite: true,
  schema: CODEGEN_GRAPHQL_SCHEMA_URL,
  debug: true,
  verbose: true,
  documents: "src/**/*.graphql",
  generates: {
    "src/generated/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        enumsAsTypes: true,
        useImplementingTypes: true,
        nonOptionalTypename: true,
      },
    },
  },
};

export default config;
