import { NavbarWrapper } from "./NavBarWrapper";
import { NavMyIcon, NavHomeIcon, NavPublishIcon } from "./NavItems";

export const NavBar = () => {
  return (
    <NavbarWrapper>
      <NavHomeIcon />
      <NavPublishIcon />
      <NavMyIcon />
    </NavbarWrapper>
  );
};
