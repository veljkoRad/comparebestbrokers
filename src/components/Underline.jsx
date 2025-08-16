import { Box } from "@mui/material";

const Underline = () => {
  return (
    <Box
      sx={{
        width: "80px",
        height: "4px",
        background: (theme) => theme.palette.primary.main,
        margin: "8px 0 16px",
      }}
    ></Box>
  );
};

export default Underline;
