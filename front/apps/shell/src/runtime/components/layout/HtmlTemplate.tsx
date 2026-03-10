import { useEffect, useState } from "react";
import { loadTemplate } from "@runtime/utils/template";

interface HtmlTemplateProps {
  path: string;
  basePath: string;
  onLoaded?: () => void;
}

export const HtmlTemplate = ({ path, basePath, onLoaded }: HtmlTemplateProps) => {
  const [html, setHtml] = useState("");

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      try {
        const result = await loadTemplate(path, basePath);
        if (!mounted) {
          return;
        }

        setHtml(result);
        onLoaded?.();
      } catch (error) {
        console.error("[ShellRuntime] template load failed", error);
      }
    };

    run().catch(() => {});

    return () => {
      mounted = false;
    };
  }, [path, basePath, onLoaded]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
