import gql from "graphql-tag";

export default gql`
  query LoadInstances {
    instances {
      name
      id
    }
  }
`;
