import { useLanguages } from "@/context/lang";
import { isSpanishLang } from "@/utils/is-spanish-lang";
import { SimpleSkeleton } from "./SimpleSkeleton";

/**
 * While `loading`, shows one SimpleSkeleton panel in place of the
 * content. When done, swaps the real children in. No mask, no inert —
 * nothing interactive exists while the panel is up.
 */
const WithSkeleton = ({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) => {
  const { language } = useLanguages();
  const isEs = isSpanishLang(language);
  if (!loading) return <>{children}</>;
  return (
    <div aria-busy="true" className="relative">
      <SimpleSkeleton />
      <span className="sr-only" role="status">
        {isEs ? "Cargando…" : "Loading…"}
      </span>
    </div>
  );
};

export { WithSkeleton };