import type { ThemeSpec } from "@lifesg/react-design-system/theme";
import { BaseTheme } from "@lifesg/react-design-system/theme";

const theme: ThemeSpec = {
    ...BaseTheme,
    options: {
        color: {
            Primary: "#00ced1",
            PrimaryDark: "#00ced1",
        }
    }
};

export default theme;