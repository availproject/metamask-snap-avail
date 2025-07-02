import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    [key: string]: any;
  }
}

// Fix for styled-components ThemeProvider React 18 compatibility
declare module 'styled-components' {
  interface ThemeProviderComponent<T, U = T>
    extends React.ComponentClass<ThemeProviderProps<T, U>> {
    refs: any;
  }
}
