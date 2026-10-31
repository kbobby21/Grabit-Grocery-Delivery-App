import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Badge,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  MdHome,
  MdCategory,
  MdShoppingCart,
  MdReceiptLong,
  MdPerson,
} from "react-icons/md";

import PATHS from "../../routes/paths";

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = useSelector((state) => state.cart.items.length);

  return (
    <Paper
      elevation={8}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <BottomNavigation
        value={location.pathname}
        onChange={(event, value) => navigate(value)}
      >
        <BottomNavigationAction
          label="Home"
          value={PATHS.HOME}
          icon={<MdHome size={24} />}
        />

        <BottomNavigationAction
          label="Categories"
          value={PATHS.CATEGORIES}
          icon={<MdCategory size={24} />}
        />

        <BottomNavigationAction
          label="Cart"
          value={PATHS.CART}
          icon={
            <Badge badgeContent={cartCount} color="primary">
              <MdShoppingCart size={24} />
            </Badge>
          }
        />

        <BottomNavigationAction
          label="Orders"
          value={PATHS.ORDERS}
          icon={<MdReceiptLong size={24} />}
        />

        <BottomNavigationAction
          label="Profile"
          value={PATHS.PROFILE}
          icon={<MdPerson size={24} />}
        />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNav;
