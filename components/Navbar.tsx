import { useCurrentFlowUser } from "@onflow/kit";
import navbarStyles from "../styles/Navbar.module.css";
import elementStyles from "../styles/Elements.module.css";

export default function Navbar() {
  const { user, authenticate, unauthenticate } = useCurrentFlowUser();

  return (
    <div className={navbarStyles.navbar}>
      {!user.loggedIn && (
        <button onClick={authenticate} className={elementStyles.button}>
          Log In With Wallet
        </button>
      )}
      {user.loggedIn && (
        <>
          <div className={navbarStyles.address}>{user?.addr}</div>
          <button onClick={unauthenticate} className={elementStyles.button}>
            Log Out
          </button>
        </>
      )}
    </div>
  );
}
