import App from "../components/App";
import InfoBox from "../components/InfoBox";
import Header from "../components/Header";
import { initializeApollo, addApolloState } from "../lib/apolloClient";
import { gql } from "@apollo/client";
import User, { UserFragment } from "../components/User";
import UserProfile, { UserProfileFragment } from "../components/UserProfile";
import UserPaymentMethods, {
  UserPaymentMethodsFragment,
} from "../components/UserPaymentMethods";

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

const IndexPage = () => (
  <App>
    <Header />
    <InfoBox>ℹ️ This page shows how to use SSG with Apollo.</InfoBox>
    <User />
    <UserProfile />
    <UserPaymentMethods />
  </App>
);

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: QUERY,
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  });
}

export default IndexPage;
