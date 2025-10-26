
import { ThemeOptions } from '@mui/material'

export const themeOptions: ThemeOptions = {
  direction: 'ltr',
  spacing: 4,
  components: {
MuiAppBar: { defaultProps: { position: 'sticky' } },
},
  typography: {
    fontFamily: `poppins , sans-serif`,
  },
}
