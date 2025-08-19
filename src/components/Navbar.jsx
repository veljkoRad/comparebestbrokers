import { useState, useEffect } from "react";
import {
  Drawer,
  AppBar,
  Box,
  Container,
  IconButton,
  List,
  Link,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../styles/navbarStyled";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleMenuMobile, setToggleMenuMobile] = useState(false);
  const [hoverToggle, setHoverToggle] = useState(null);
  const [menus, setMenus] = useState([]);
  const location = useLocation();

  const toggleNavMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    axios
      .get(
        "https://comparebestbrokers.com/cbb_wp/wp-json/wp-menus/v1/menus/navMenu",
        {}
      )
      .then((response) => {
        const simplifiedPosts = response.data.map((post) => ({
          id: post.ID,
          title: post.post_title,
          url: post.url,
          submenu: post.menu_item_parent,
        }));
        setMenus(simplifiedPosts);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Box sx={{ marginTop: "15px" }}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Drawer
                anchor="top"
                open={toggleMenu}
                onClose={toggleNavMenu}
                sx={{
                  display: { xs: "flex", sm: "none" },
                  alignItems: "flex-end",
                }}
              >
                <IconButton color="secondary"
                  onClick={toggleNavMenu}
                  sx={{
                    padding: "20px",
                    borderRadius: "0",
                    marginLeft: "auto",
                  }}
                >
                  <CloseIcon color="text" fontSize="medium" />
                </IconButton>
                <List sx={{ flexDirection: "column" }}>
                  {/* Mobile view */}
                  {menus
                    .filter((item) => item.submenu === "0") // top-level items
                    .map((item) => (
                      <Box key={item.id}>
                        <ListItem
                          sx={{
                            textTransform: "capitalize",
                            fontWeight: "700",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            setToggleMenuMobile((prev) =>
                              prev === item.id ? null : item.id
                            )
                          }
                        >
                          <Link
                            component={RouterLink}
                            to={item.url}
                            sx={{
                              color: (theme) => theme.palette.text.mobile,
                              textDecoration: "none",
                              fontWeight: 500,
                              width: "100%",
                              '&:focus': {
                                color: (theme) => theme.palette.text.primary,
                                transform: 'translateX(5px)',
                                transition: "transform 0.4s ease",
                              },
                            }}
                          >
                            {item.title}
                          </Link>
                        </ListItem>

                        {/* Submenu items MOBILE */}
                        {menus.filter(
                          (sub) => sub.submenu === item.id.toString()
                        ) &&
                          toggleMenuMobile === item.id && (
                            <List sx={{ paddingLeft: '20px' }}>
                              {menus
                                .filter(
                                  (sub) => sub.submenu === item.id.toString()
                                )
                                .map((sub) => (
                                  <ListItem
                                    key={sub.id}
                                    sx={{
                                      textTransform: "capitalize",
                                      fontWeight: "500",
                                    }}
                                  >
                                    <Link
                                      component={RouterLink}
                                      to={sub.url}
                                      sx={{
                                        color: (theme) =>
                                          theme.palette.text.mobile,
                                        textDecoration: "none",
                                        width: "100%",
                                        fontSize: '14px'
                                      }}
                                    >
                                      {sub.title}
                                    </Link>
                                  </ListItem>
                                ))}
                            </List>
                          )}
                      </Box>
                    ))}
                </List>
              </Drawer>

              <Link component={RouterLink} to='/' >
                <Box component='img' src='/images/cbb-icon.png' height='39px'></Box>
              </Link>

            </Box>

            {/* Desktop view */}
            <Box
              sx={{
                display: "flex",
                flexGrow: 1,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <List sx={{ display: { xs: "none", sm: "flex" } }}>
                {menus
                  .filter((item) => item.submenu === "0") // top-level items
                  .map((item) => {
                    const subMenus = menus.filter(
                      (sub) => sub.submenu === item.id.toString()
                    );

                    return (
                      <Box
                        key={item.id}
                        sx={{
                          position: "relative",
                          height: "64px",
                          display: "flex",
                          alignItems: "center",
                        }}
                        onMouseEnter={() => setHoverToggle(item.id)}
                        onMouseLeave={() => setHoverToggle(null)}
                      >
                        <ListItem
                          sx={{
                            textTransform: "capitalize",
                            fontWeight: "700",
                            cursor: "pointer",
                          }}
                        >
                          <Link
                            component={RouterLink}
                            to={item.url}
                            sx={{
                              color: (theme) => theme.palette.text.primary,
                              textDecoration: "none",
                              height: "100%",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: '16px',
                                color: location.pathname === item.url
                                  ? (theme) => theme.palette.text.secondary
                                  : (theme) => theme.palette.text.primary,
                                '&:hover': {
                                  color: (theme) => theme.palette.text.secondary,
                                  transition: "color 0.3s ease",
                                },
                              }}
                            >
                              {item.title}
                            </Typography>
                          </Link>
                        </ListItem>

                        {subMenus.length > 0 && hoverToggle === item.id && (
                          <List
                            sx={{
                              position: "absolute",
                              top: "100%",
                              left: "50%",
                              transform: "translateX(-50%)",
                              minWidth: "150px",
                              background: (theme) => theme.palette.primary.light,
                              borderRadius: "8px",
                              border: "1px solid #222F43",
                              display: "block",
                              opacity: hoverToggle === item.id ? 1 : 0,
                              transition: "opacity 0.3s ease, transform 0.3s ease",
                              zIndex: 10, // 
                            }}
                          >
                            {subMenus.map((sub) => (
                              <ListItem
                                key={sub.id}
                                sx={{
                                  textTransform: "capitalize",
                                  fontWeight: "500",
                                }}
                              >
                                <Link
                                  component={RouterLink}
                                  to={sub.url}
                                  sx={{
                                    color: (theme) => theme.palette.text.primary,
                                    textDecoration: "none",
                                    whiteSpace: "nowrap",
                                    px: 2,
                                    py: 1,
                                    display: "block",
                                    // ✅ Change 6: added hover background for submenu items
                                    '&:hover': {
                                      backgroundColor: (theme) => theme.palette.primary.main,
                                      color: (theme) => theme.palette.text.secondary,
                                    },
                                  }}
                                >
                                  {sub.title}
                                </Link>
                              </ListItem>
                            ))}
                          </List>
                        )}
                      </Box>
                    );
                  })}
              </List>

              <IconButton
                size="large"
                edge="start"
                color="secondary"
                aria-label="open drawer"
                sx={{ display: { sm: "none" } }}
                onClick={toggleNavMenu}
              >
                <MenuIcon />
              </IconButton>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon color="secondary" />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;
