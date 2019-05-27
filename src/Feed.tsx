import React from 'react';
import { Query, graphql } from 'react-apollo';
import { ApolloError } from 'apollo-client';
import { GET_FEED, PUBLUSH, UNPUBLUSH } from './queries';

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

const Publish =  graphql<{ id: string; }>(PUBLUSH)(({ id, mutate }) => (
  <button onClick={() => mutate && mutate({ variables: { id } })}>Publush</button>
)) as any;

const Unpublish =  graphql<{ id: string; }>(UNPUBLUSH)(({ id, mutate }) => (
  <button onClick={() => mutate && mutate({ variables: { id } })}>Unublush</button>
)) as any;


const List: React.FC<{ data: Data | undefined }> = ({ data }) => {
  if (data && data.postsByUser) {
    return (
      <ul>
        {data.postsByUser.map(({ id, title, published }, idx) =>
          <li key={idx}>
            <strong>id:</strong>  {id}><br />
            <strong>title:</strong>  {title}><br />
            <strong>publushed:</strong>  {published ? '👍' : '👎'}<br />
            <Publish id={id} />
            <Unpublish id={id} />
          </li>
        )}
      </ul>
    )
  }

  return null;
}

const Feed: React.FC = () => (
  <Query<Data> query={GET_FEED} variables={{ email: 'bob@prisma.io' }}>
      {({ error, data }) => (
        <React.Suspense fallback={() => <h1>loading...</h1>}>
          <List data={data} />
          <Error error={error} />
        </React.Suspense>
      )}
    </Query>
);

export default Feed;
