import React from "react";
import "./App.css";
import { ClassifierPage } from "./pages/ClassifierPage";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT ?? "",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ClassifierPage />
    </ApolloProvider>
  );
}

export default App;
