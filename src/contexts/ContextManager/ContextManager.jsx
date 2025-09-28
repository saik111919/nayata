import { createContext } from "react";

export const ThemeContext = createContext();

const initialThemeState = {
  theme: "system",
  setTheme: () => null,
};
export const ThemeProviderContext = createContext(initialThemeState);
