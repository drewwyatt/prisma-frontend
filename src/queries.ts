import gql from "graphql-tag";

export const GET_FEED = gql`
  query FeedFor($email: String!) {
    postsByUser(email: $email) {
      id,
      title,
      published,
      archived
    }
  }
`;

export const PUBLUSH = gql`
  mutation Publish($id: ID!) {
    publish(id: $id) {
      id,
      published
    }
  }
`;

export const UNPUBLUSH = gql`
  mutation Unpublish($id: ID!) {
    unpublish(id: $id) {
      id,
      published
    }
  }
`;

