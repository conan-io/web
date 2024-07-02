// Marketo forms with React: https://github.com/charliedieter/react-marketo-hook
// Modified to support TypeScript

import { useState, useEffect, Dispatch, SetStateAction } from "react";

export interface MarketoProps {
  baseUrl: string;
  munchkinId: string;
  formId: string;
  callback: any;
}

const appendScript = (
  baseUrl: string,
  setScriptLoaded: Dispatch<SetStateAction<boolean>>,
) => {
  if (window.MktoForms2) return setScriptLoaded(true);

  const script = document.createElement("script");
  script.src = `${baseUrl}/js/forms2/js/forms2.min.js`;
  script.onload = () => (window.MktoForms2 ? setScriptLoaded(true) : null);
  document.body.appendChild(script);
};

const useMarketo = (props: MarketoProps) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const { baseUrl, munchkinId, formId, callback } = props;
  useEffect(() => {
    if (scriptLoaded) {
      window.MktoForms2.loadForm(baseUrl, munchkinId, formId, callback);
      return;
    }
    appendScript(baseUrl, setScriptLoaded);
  }, [scriptLoaded, baseUrl, munchkinId, formId, callback]);
};

export const MarketoForm = (props: MarketoProps) => {
  useMarketo(props);
  return <form id={`mktoForm_${props.formId}`} />;
};
