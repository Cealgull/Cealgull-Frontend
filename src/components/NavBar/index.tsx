import { useRoute } from "@react-navigation/native";
import { NavbarWrapper } from "./NavBarWrapper";
import { NavMyIcon, NavHomeIcon, NavPublishIcon } from "./NavItems";

export const NavBar = () => {
  const route = useRoute();
  const homeFocus: boolean = route.name === "Home" ? true : false;
  const personFocus: boolean = route.name === "Person" ? true : false;
  return (
    <NavbarWrapper>
      <NavHomeIcon focused={homeFocus} />
      <NavPublishIcon />
      <NavMyIcon focused={personFocus} />
    </NavbarWrapper>
  );
};
