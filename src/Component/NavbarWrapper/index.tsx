import { NavbarWrapper } from "./NavbarWrapper";
import { NavMyIcon, NavHomeIcon, NavPublishIcon } from "./NavIcon";

export const NavBar = () => {
  return (
    <NavbarWrapper>
      <NavHomeIcon />
      <NavPublishIcon />
      <NavMyIcon />
    </NavbarWrapper>
  );
};
