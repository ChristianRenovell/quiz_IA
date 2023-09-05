import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
      primary: {
        main: '#ffffff',
      },
      secondary: {
        main: '#424141', 
      },
      background: {
        default: '#424141', 
      },
      text: {
        primary: '#241a00', 
      },
    }
  });

  export const themeSelect = createTheme({
    components: {
      MuiFormControl: {
        styleOverrides: {
          root: {
            '& label.Mui-focused': {
              color: '##000000 !important', 
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: '#000000 !important',
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: '#000000',
          },
        },
      },
    },
  });