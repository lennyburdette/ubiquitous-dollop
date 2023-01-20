import { useFragment_experimental, gql } from "@apollo/client";

export const UserFragment = gql`
  fragment User on Query {
    viewer {
      id
      firstName
      lastName
      createdAt
    }
  }
`;

export default function User() {
  const { complete, data } = useFragment_experimental({
    fragment: UserFragment,
    fragmentName: "User",
    from: {
      __typename: "Query",
    },
  });

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
