import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { ApolloError } from 'apollo-client';

const GET_FEED = gql`
  {
    postsByUser(email: "bob@prisma.io") {
      id,
      title,
      published,
      archived
    }
  }
`;

type Post = { id: string; title: string; published: boolean; archived: boolean; };

type Data = {
  postsByUser: Post[];
}

const Error: React.FC<{ error: ApolloError | undefined }> = ({error}) => {
  if (error) {
    return <h1>❗️️️️️️{error.message}</h1>;
  }

  return null
}

const List: React.FC<{ data: Data | undefined }> = ({ data }) => {
  if (data && data.postsByUser) {
    return (
      <ul>
        {data.postsByUser.map(({ id, title, published }, idx) =>
          <li key={idx}>
            <strong>id:</strong>  {id}><br />
            <strong>title:</strong>  {title}><br />
            <strong>publushed:</strong>  {published ? '👍' : '👎'}
          </li>
        )}
      </ul>
    )
  }

  return null;
}

const Feed: React.FC = () => (
  <Query<Data> query={GET_FEED}>
      {({ error, data }) => (
        <React.Suspense fallback={() => <h1>loading...</h1>}>
          <List data={data} />
          <Error error={error} />
        </React.Suspense>
      )}
    </Query>
);

export default Feed;
