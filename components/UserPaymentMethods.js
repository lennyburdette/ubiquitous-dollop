import { useFragment_experimental, gql } from "@apollo/client";

export const UserPaymentMethodsFragment = gql`
  fragment UserPaymentMethods on Query {
    viewer {
      id
      profile {
        id
        paymentMethods {
          id
          kind
          number
        }
      }
    }
  }
`;

export default function UserPaymentMethods() {
  const { complete, data } = useFragment_experimental({
    fragment: UserPaymentMethodsFragment,
    fragmentName: "UserPaymentMethods",
    from: {
      __typename: "Query",
    },
  });

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
