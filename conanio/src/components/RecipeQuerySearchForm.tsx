import type { ChangeEvent, FormEvent } from "react";

import styles from "@/components/RecipeQuerySearchForm.module.css";

const PLACEHOLDER = "Search a recipe… e.g. zlib, openssl, fmt";

function RecipeQuerySearchIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx={11} cy={11} r={7} />
      <line x1={21} y1={21} x2="16.65" y2="16.65" />
    </svg>
  );
}

/** Enter cue: one vertical on the right, then horizontal left with ← (no extra top bar). */
function RecipeQuerySearchEnterHint() {
  return (
    <span className={styles.enterHint} title="Press Enter to search" aria-label="Press Enter to search">
      <svg className={styles.enterSvg} viewBox="0 0 22 12" fill="none" aria-hidden={true}>
        <path
          d="M16 2.5V9.5H3.25M3.25 9.5L6.05 7.1M3.25 9.5L6.05 11.9"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

type RecipeQuerySearchFormBase = {
  /** Hero on `/center` uses `cc-search`; toolbar uses `search` (global classes in `centerPages.module.css`). */
  formClassName: "cc-search" | "search";
  /** Icon size; defaults 18 for `cc-search`, 16 for `search`. */
  iconSize?: number;
  placeholder?: string;
  /** Enter-key glyph after the field; hide on live search (e.g. `/center/recipes`). Default `true`. */
  showEnterHint?: boolean;
  /** Optional analytics hook called on submit with the query text. */
  onTrackSearchSubmit?: (term: string) => void;
};

type RecipeQuerySearchFormGetProps = RecipeQuerySearchFormBase & {
  mode: "get";
  action?: string;
  method?: "get";
  role?: string;
  "aria-label"?: string;
  autoComplete?: "on" | "off";
  enterKeyHint?: "search";
  defaultValue?: string;
};

type RecipeQuerySearchFormControlledProps = RecipeQuerySearchFormBase & {
  mode: "controlled";
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export type RecipeQuerySearchFormProps = RecipeQuerySearchFormGetProps | RecipeQuerySearchFormControlledProps;

/**
 * Shared ConanCenter recipe query field: magnifying glass, text input, optional Enter hint.
 * Used on `/center`, `/center/recipes`, and `/center/recipes/[recipeName]`.
 */
export default function RecipeQuerySearchForm(props: RecipeQuerySearchFormProps) {
  const {
    formClassName,
    placeholder = PLACEHOLDER,
    iconSize: iconSizeProp,
    showEnterHint = true,
    onTrackSearchSubmit,
  } = props;
  const iconSize = iconSizeProp ?? (formClassName === "cc-search" ? 17 : 14);

  if (props.mode === "controlled") {
    const { value, onChange, onSubmit } = props;
    return (
      <form
        className={formClassName}
        onSubmit={(event) => {
          onTrackSearchSubmit?.(value.trim());
          onSubmit(event);
        }}
      >
        <RecipeQuerySearchIcon size={iconSize} />
        <input
          type="text"
          name="value"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          enterKeyHint="search"
        />
        {showEnterHint ? <RecipeQuerySearchEnterHint /> : null}
      </form>
    );
  }

  const {
    action = "/center/recipes",
    method = "get",
    role,
    "aria-label": ariaLabel,
    autoComplete,
    enterKeyHint,
    defaultValue,
  } = props;

  return (
    <form
      className={formClassName}
      action={action}
      method={method}
      role={role}
      aria-label={ariaLabel}
      onSubmit={(event) => {
        const formData = new FormData(event.currentTarget);
        const raw = formData.get("value");
        const term = typeof raw === "string" ? raw.trim() : "";
        onTrackSearchSubmit?.(term);
      }}
    >
      <RecipeQuerySearchIcon size={iconSize} />
      <input
        type="text"
        name="value"
        placeholder={placeholder}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        enterKeyHint={enterKeyHint}
      />
      {showEnterHint ? <RecipeQuerySearchEnterHint /> : null}
    </form>
  );
}
