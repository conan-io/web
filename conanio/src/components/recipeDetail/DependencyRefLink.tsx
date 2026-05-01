import Link from "next/link";

import { parseConanRef } from "@/utils/recipeDetailUtils";

/** Recipe reference (`name/version`) → link to Conan Center recipe page. */
export default function DependencyRefLink({ reference }: { reference: string }) {
  const { name, version } = parseConanRef(reference);
  const href =
    version.length > 0
      ? `/center/recipes/${encodeURIComponent(name)}?version=${encodeURIComponent(version)}`
      : `/center/recipes/${encodeURIComponent(name)}`;

  return <Link href={href}>{reference}</Link>;
}
