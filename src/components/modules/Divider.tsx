import type { DividerSectionFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';

export default function Divider({ section: { height } }: { section: DividerSectionFragmentType }) {
  return (
    <hr
      className="container mx-auto px-7"
      style={height ? { height: `${height}px` } : undefined}
      >
    </hr>
  );
}
