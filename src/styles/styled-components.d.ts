import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string;
    colors: {
      primary: string;
      background: string;
      white: string;
      text: string;
      shadowDark: string;
      shadowLight: string;
      hoverBg: string;
      skeletonBg: string;
      knobBg: string;
      cardBg: string;
    };
    shadows: {
      soft: string;
      softInset: string;
    };
    borderRadius: string;
  }
}
