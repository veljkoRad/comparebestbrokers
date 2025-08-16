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
import { Link as RouterLink } from "react-router-dom";
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
  const [underline, setUnderline] = useState(null);

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
    <Box>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar sx={{}}>
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
                <IconButton
                  onClick={toggleNavMenu}
                  sx={{
                    padding: "20px",
                    borderRadius: "0",
                    marginLeft: "auto",
                  }}
                >
                  <CloseIcon color="primary" fontSize="small" />
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
                              color: (theme) => theme.palette.black.main,
                              textDecoration: "none",
                              width: "100%",
                            }}
                          >
                            {item.title}
                          </Link>
                        </ListItem>

                        {/* Render submenu items */}
                        {menus.filter(
                          (sub) => sub.submenu === item.id.toString()
                        ) &&
                          toggleMenuMobile === item.id && (
                            <List>
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
                                          theme.palette.black.main,
                                        textDecoration: "none",
                                        width: "100%",
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

              <Typography variant="h3" noWrap component="div">
                <Link href="/">CBB</Link>
              </Typography>
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
                  .map((item) => (
                    <Box
                      key={item.id}
                      sx={{
                        position: "relative",
                        height: "72px",
                        display: "flex",
                        alignItems: "center",
                        borderBottom:
                          hoverToggle === item.id
                            ? "3px solid #fff"
                            : "3px solid transparent",
                      }}
                      onMouseEnter={() => {
                        setHoverToggle(item.id);
                        setUnderline(true);
                      }}
                      onMouseLeave={() => {
                        setHoverToggle(null);
                        setUnderline(false);
                      }}
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
                            color: (theme) => theme.palette.black.white,
                            textDecoration: "none",
                            height: "100%",
                          }}
                        >
                          {item.title}
                        </Link>
                      </ListItem>

                      {/* Render submenu items */}
                      {menus.filter(
                        (sub) => sub.submenu === item.id.toString()
                      ) &&
                        hoverToggle === item.id && (
                          <List
                            sx={{
                              background: (theme) => theme.palette.white.main,
                              minWidth: "150px",
                              position: "absolute",
                              top: "100%",
                              left: "50%",
                              transform: "translateX(-50%)",
                              borderBottomLeftRadius: "4px",
                              borderBottomRightRadius: "4px",
                              boxShadow: "0px 8px 16px rgba(0,0,0,0.15)",
                              opacity: hoverToggle === item.id ? "1" : "0",
                              transition: "opacity 2s ease, transform 2s ease",
                            }}
                          >
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
                                        theme.palette.black.main,
                                      textDecoration: "none",
                                      whiteSpace: "nowrap",
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
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ display: { sm: "none" } }}
                onClick={toggleNavMenu}
              >
                <MenuIcon />
              </IconButton>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
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
