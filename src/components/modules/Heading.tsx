import { cn } from '@/utils/styles';

interface HeadingProps {
  section: {
    heading?: {
      content?: string;
      level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      size?: string;
      color?: string;
    };
    maxWidth?: string;
  };
}

export default function Heading({ section }: HeadingProps) {
  const heading = section?.heading;

  if (!heading?.content) {
    return null;
  }

  const Tag = heading.level || 'h2';
  const className = cn(heading.size, heading.color, section.maxWidth);

  return (
    <Tag className={className}>
      {heading.content}
    </Tag>
  );
}