import gql from "graphql-tag";

export default gql`
  query LoadThreadGroups {
    threadGroups {
      id
      name
      threads {
        id
        originId
        name
        service {
          name
          id
        }
      }
    }
  }
`;
