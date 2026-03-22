import * as fs from "node:fs";
import * as path from "node:path";
import { getInputCss } from "./diwa-input/input-styles";
import { getComponentCss as getSelectCss } from "./diwa-select/diwa-select-styles";
import { getComponentCss as getSwitchCss } from "./diwa-switch/diwa-switch-styles";
import { getComponentCss as getCheckboxCss } from "./diwa-checkbox/diwa-checkbox-styles";

const inputVariants = [
  "diwa-input-date",
  "diwa-input-email",
  "diwa-input-month",
  "diwa-input-number",
  "diwa-input-password",
  "diwa-input-search",
  "diwa-input-tel",
  "diwa-input-text",
  "diwa-input-time",
  "diwa-input-url",
  "diwa-input-week",
] as const;

describe("Control Height Lock contract", () => {
  test.each(inputVariants)(
    "%s style module uses the shared input style contract",
    (variant) => {
      const rel = path.join(__dirname, variant, `${variant}-styles.ts`);
      const content = fs.readFileSync(rel, "utf8");
      expect(content).toContain("export { getInputCss as getComponentCss } from '../diwa-input/input-styles';");
    },
  );

  test("shared input styles map default/compact wrapper heights to button tokens", () => {
    const defaultCss = getInputCss("none", false, false, false, false, false, false);
    const compactCss = getInputCss("none", false, false, true, false, false, false);

    expect(defaultCss).toContain("min-height: var(--diwa-button-height, var(--diwa-input-height, 40px));");
    expect(compactCss).toContain("min-height: var(--diwa-button-height-sm, 32px);");
    expect(defaultCss).toContain("min-width: var(--diwa-button-height, 40px);");
    expect(compactCss).toContain("min-width: var(--diwa-button-height-sm, 32px);");
  });

  test("select trigger maps default/compact heights to button tokens", () => {
    const css = getSelectCss(false, false, "none", false, false);

    expect(css).toContain("min-height: var(--diwa-button-height, var(--diwa-input-height, 40px));");
    expect(css).toContain("min-height: var(--diwa-button-height-sm, 32px);");
  });

  test("switch wrapper maps default/compact heights to button tokens", () => {
    const defaultCss = getSwitchCss(false, false, false, "end", false);
    const compactCss = getSwitchCss(false, false, false, "end", true);

    expect(defaultCss).toContain("min-height: var(--diwa-button-height, 40px);");
    expect(compactCss).toContain("min-height: var(--diwa-button-height-sm, 32px);");
  });

  test("checkbox wrapper maps default/compact heights to button tokens", () => {
    const defaultCss = getCheckboxCss("none", false, false, false);
    const compactCss = getCheckboxCss("none", false, true, false);

    expect(defaultCss).toContain("min-height: var(--diwa-button-height, 40px);");
    expect(compactCss).toContain("min-height: var(--diwa-button-height-sm, 32px);");
  });
});
