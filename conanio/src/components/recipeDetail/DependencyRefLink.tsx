import Link from "next/link";

import { parseConanRef } from "@/utils/recipeDetailUtils";
import { recipePathFromReference } from "@/utils/recipeUrls";

/** Recipe reference (`name/version`) → link to Conan Center recipe page. */
export default function DependencyRefLink({ reference }: { reference: string }) {
  const { name, version } = parseConanRef(reference);
  const href = recipePathFromReference(name, version);

  return <Link href={href}>{reference}</Link>;
}
