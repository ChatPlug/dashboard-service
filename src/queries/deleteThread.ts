import gql from "graphql-tag";

export default gql`
  mutation DeleteThread($id: ID!) {
    deleteThread(id: $id)
  }
`;
