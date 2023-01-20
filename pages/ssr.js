import App from "../components/App";
import InfoBox from "../components/InfoBox";
import Header from "../components/Header";
import { initializeApollo, addApolloState } from "../lib/apolloClient";
import User, { UserFragment } from "../components/User";
import UserProfile, { UserProfileFragment } from "../components/UserProfile";
import UserPaymentMethods, {
  UserPaymentMethodsFragment,
} from "../components/UserPaymentMethods";
import { gql } from "@apollo/client";

const QUERY = gql`
  ${UserFragment}
  ${UserProfileFragment}
  ${UserPaymentMethodsFragment}
  query Index {
    ...User
    ...UserProfile
    ...UserPaymentMethods
  }
`;

const SSRPage = () => (
  <App>
    <Header />
    <InfoBox>ℹ️ This page shows how to use SSR with Apollo.</InfoBox>
    <User />
    <UserProfile />
    <UserPaymentMethods />
  </App>
);

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: QUERY,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}

export default SSRPage;
