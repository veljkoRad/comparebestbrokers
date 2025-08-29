import { useState } from "react";
import { motion } from "framer-motion";
import {
  Autocomplete,
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
  TextField,
} from "@mui/material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  NavbarItemMobile,
  NavbarSubItemMobile,
} from "../styles/navbarStyled";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";



const Navbar = ({ menus, acf, posts, brokers }) => {


  const autoComplete = (
    <Box sx={{ width: 145 }}>
      <Autocomplete
        disablePortal
        freeSolo
        openOnFocus
        options={Array.isArray(posts) && Array.isArray(brokers) ? [
          ...posts.map(post => ({ ...post, type: 'post' })),
          ...brokers.map(broker => ({ ...broker, type: 'broker' })),
        ] : []}
        onChange={(event, newValue) => {
          if (!newValue) return;

          if (typeof newValue === "object") {
            // Navigate based on type
            if (newValue.type === "post" && newValue.slug) {
              navigate(`/blogs/${newValue.slug}`);
            } else if (newValue.type === "broker" && newValue.slug) {
              navigate(`/brokers/${newValue.slug}`);
            }
          } else if (typeof newValue === "string") {
            navigate(`/search?query=${encodeURIComponent(newValue)}`);
          }
        }}
        filterOptions={(options, { inputValue }) =>
          options.filter(option => {
            if (option.type === 'post') {
              return (
                option.title?.toLowerCase().includes(inputValue.toLowerCase()) ||
                option.content?.toLowerCase().includes(inputValue.toLowerCase())
              );
            } else if (option.type === 'broker') {
              return option.name?.toLowerCase().includes(inputValue.toLowerCase());
            }
            return false;
          })
            .slice(0, 5)
        }
        getOptionLabel={option =>
          typeof option === 'string'
            ? option
            : option.type === 'post'
              ? option.title || ''
              : option.type === 'broker'
                ? option.name || ''
                : ''
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            color="secondary"
            size="small"
            focused
            placeholder="Search"
            hiddenLabel
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const input = e.target.value.trim();
                if (input) {
                  navigate(`/search?query=${encodeURIComponent(input)}`);
                }
              }
            }}
            sx={{ width: "100%" }}
          />
        )}
        noOptionsText="No results found"
        ListboxProps={{
          sx: {
            "& .MuiAutocomplete-option": {
              color: "white",
              fontSize: "9px",
            },
          },
        }}
      />
    </Box>
  );

  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleMenuMobile, setToggleMenuMobile] = useState(false);
  const [hoverToggle, setHoverToggle] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // each child fades in after previous
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1 },
    },
  };

  const toggleNavMenu = () => {
    setToggleMenu((prev) => !prev);
  };

  return (
    <Box sx={{ marginTop: "15px" }}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Drawer
                anchor="top"
                open={toggleMenu}
                onClose={() => setToggleMenu(false)}
                sx={{
                  display: { xs: "flex", sm: "none" },
                  alignItems: "flex-end",
                }}
              >
                <IconButton
                  aria-hidden="close menu"
                  color="secondary"
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
                          <NavbarItemMobile
                            component={RouterLink}
                            to={item.url}
                            onClick={() => setToggleMenu(false)}
                          >
                            {item.title}
                          </NavbarItemMobile>
                        </ListItem>

                        {/* Submenu items MOBILE */}
                        {menus.filter(
                          (sub) => sub.submenu === item.id.toString()
                        ) &&
                          toggleMenuMobile === item.id && (
                            <List sx={{ paddingLeft: "20px" }}>
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
                                    <NavbarSubItemMobile
                                      component={RouterLink}
                                      to={sub.url}
                                    >
                                      {sub.title}
                                    </NavbarSubItemMobile>
                                  </ListItem>
                                ))}
                            </List>
                          )}
                      </Box>
                    ))}
                </List>
              </Drawer>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <Link component={RouterLink} to="/">
                  <img
                    alt="logo-image"
                    src={acf.header.logo}
                    height="45px" />
                </Link>
              </motion.div>
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
              <Box
                component={motion.div}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <List sx={{ display: { xs: "none", sm: "flex" } }}>
                  {menus
                    .filter((item) => item.submenu === "0") // top-level items
                    .map((item) => {
                      const subMenus = menus.filter(
                        (sub) => sub.submenu === item.id.toString()
                      );

                      return (
                        <motion.div
                          key={item.id}
                          variants={itemVariants}
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
                                  fontSize: "16px",
                                  color:
                                    location.pathname === item.url
                                      ? (theme) => theme.palette.text.secondary
                                      : (theme) => theme.palette.text.white,
                                  "&:hover": {
                                    color: (theme) =>
                                      theme.palette.text.secondary,
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
                                background: (theme) =>
                                  theme.palette.primary.light,
                                borderRadius: "8px",
                                border: "1px solid #222F43",
                                display: "block",
                                opacity: hoverToggle === item.id ? 1 : 0,
                                transition:
                                  "opacity 0.3s ease, transform 0.3s ease",
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
                                      color: (theme) =>
                                        theme.palette.text.primary,
                                      textDecoration: "none",
                                      whiteSpace: "nowrap",
                                      px: 2,
                                      py: 1,
                                      display: "block",
                                      "&:hover": {
                                        backgroundColor: (theme) =>
                                          theme.palette.primary.main,
                                        color: (theme) =>
                                          theme.palette.text.secondary,
                                      },
                                    }}
                                  >
                                    {sub.title}
                                  </Link>
                                </ListItem>
                              ))}
                            </List>
                          )}
                        </motion.div>
                      );
                    })}
                </List>
              </Box>
              <IconButton
                aria-label="menu toggle"
                size="large"
                edge="start"
                color="secondary"
                aria-label="open drawer"
                sx={{ display: { sm: "none" } }}
                onClick={toggleNavMenu}
              >
                <MenuIcon />
              </IconButton>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {autoComplete}
              </motion.div>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;
