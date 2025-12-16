import type { ParagraphFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import { PortableText } from '@portabletext/react';

function cleanString(str: string | undefined): string {
  if (!str) return '';
  return str
    .replace(/[\u200B-\u200D\uFEFF\u202A-\u202E]/g, '')
    .replace(/[\u061C\u180E\u2066-\u2069]/g, '')
    .trim();
}

const portableTextComponents = {
  block: {
    normal: ({ children }: { children: React.ReactNode }) => (
      <p>{children}</p>
    ),
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="font-bold">{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="font-bold">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="font-bold">{children}</h3>
    ),
  },
  marks: {
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong>{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em>{children}</em>
    ),
    underline: ({ children }: { children: React.ReactNode }) => (
      <u>{children}</u>
    ),
  },
};

export default function Paragraph({
  section,
}: {
  section: ParagraphFragmentType;
}) {
  const content = section?.content || [];
  const alignment = cleanString(section?.alignment) || 'text-left';
  const size = cleanString(section?.size) || 'text-base';
  const color = cleanString(section?.color) || '';

  const className = `${size} ${alignment} ${color}`.trim();

  return (
    <div className={className}>
      <PortableText value={content} components={portableTextComponents} />
    </div>
  );
}