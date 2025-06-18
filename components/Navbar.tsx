import { Connect, useCurrentFlowUser } from "@onflow/kit";
import navbarStyles from "../styles/Navbar.module.css";
import elementStyles from "../styles/Elements.module.css";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export default function Navbar() {
  // const { user, authenticate, unauthenticate } = useCurrentFlowUser();

  return (
    <div className={navbarStyles.navbar}>
      {/* <Menu>
        <MenuButton>My account</MenuButton>
        <MenuItems anchor="bottom">
          <MenuItem>
            <a className="" href="/settings">
              Settings
            </a>
          </MenuItem>
        </MenuItems>
      </Menu> */}
      <Connect variant="primary" />
      {/* {!user.loggedIn && (
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
      )} */}
    </div>
  );
}
