import gql from "graphql-tag";

export default gql`
  mutation CreateThreadGroup($name: String!) {
    createThreadGroup(name: $name) {
        id
        name
        threads {
            id
            name
        }
    }
  }
`;
