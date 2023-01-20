import App from "../components/App";
import InfoBox from "../components/InfoBox";
import Header from "../components/Header";
import User, { UserFragment } from "../components/User";
import UserProfile, { UserProfileFragment } from "../components/UserProfile";
import UserPaymentMethods, {
  UserPaymentMethodsFragment,
} from "../components/UserPaymentMethods";
import { useQuery, gql } from "@apollo/client";

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

const ClientOnlyPage = (props) => {
  const { loading } = useQuery(QUERY);

  if (loading) {
    return <p>loading</p>;
  }

  return (
    <App>
      <Header />
      <InfoBox>
        ℹ️ This page shows how to use Apollo only in the client. If you{" "}
        <a href="/client-only">reload</a> this page, you will see a loader since
        Apollo didn't fetch any data on the server. This is useful when the page
        doesn't have SEO requirements or blocking data fetching requirements.
      </InfoBox>
      <User />
      <UserProfile />
      <UserPaymentMethods />
    </App>
  );
};

export default ClientOnlyPage;
