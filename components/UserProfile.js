import { useFragment_experimental, gql } from "@apollo/client";

export const UserProfileFragment = gql`
  fragment UserProfile on Query {
    viewer {
      id
      profile {
        profile1
      }
    }
  }
`;

export default function UserProfile() {
  const { complete, data } = useFragment_experimental({
    fragment: UserProfileFragment,
    fragmentName: "UserProfile",
    from: {
      __typename: "Query",
    },
  });

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
