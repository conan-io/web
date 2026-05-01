import { useEffect, useState } from "react";

export type MarketoProps = {
  baseUrl: string;
  munchkinId: string;
  formId: string;
  callback: (form: any) => void;
};

type MktoForms2Api = {
  loadForm: (
    baseUrl: string,
    munchkinId: string,
    formId: string,
    callback: (form: any) => void
  ) => void;
};

declare global {
  interface Window {
    MktoForms2?: MktoForms2Api;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function appendScript(baseUrl: string, onLoaded: () => void) {
  if (window.MktoForms2) {
    onLoaded();
    return;
  }

  const existingScript = document.querySelector<HTMLScriptElement>(
    `script[src="${baseUrl}/js/forms2/js/forms2.min.js"]`
  );
  if (existingScript) {
    existingScript.addEventListener("load", onLoaded, { once: true });
    return;
  }

  const script = document.createElement("script");
  script.src = `${baseUrl}/js/forms2/js/forms2.min.js`;
  script.onload = () => {
    if (window.MktoForms2) {
      onLoaded();
    }
  };
  script.onerror = () => {
    // Avoid breaking local/dev rendering if Marketo is unavailable.
    console.warn("Marketo forms script failed to load.");
  };
  document.body.appendChild(script);
}

export default function MarketoForm(props: MarketoProps) {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const { baseUrl, munchkinId, formId, callback } = props;

  useEffect(() => {
    // Same as prod (`conanio/components/useMarketo.tsx`): always load Marketo.
    // Script `onerror` below avoids breaking the page if the CDN is blocked or unreachable.
    if (scriptLoaded) {
      try {
        window.MktoForms2?.loadForm(baseUrl, munchkinId, formId, callback);
      } catch {
        console.warn("Marketo loadForm failed.");
      }
      return;
    }

    appendScript(baseUrl, () => setScriptLoaded(true));
  }, [scriptLoaded, baseUrl, munchkinId, formId, callback]);

  /* Empty shell filled by MktoForms2.loadForm — same id pattern as prod `useMarketo.tsx` */
  return <form id={`mktoForm_${formId}`} />;
}
