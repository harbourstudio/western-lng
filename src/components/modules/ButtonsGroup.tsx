import Link from 'next/link';
import { getLinkByLinkObject } from '@/lib/links';
import { cn } from '@/lib/utils';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';

interface ButtonItem {
  _key: string;
  variant?: 'default' | 'secondary' | 'outline' | 'link' | null;
  icon?: string | null;
  text?: string | null;
  link?: {
    _type?: string;
    type?: string | null;
    external?: string | null;
    href?: string | null;
    internal?: { 
      _type: string; 
      _id?: string;
      slug: string | null;
    } | null;
    openInNewTab?: boolean | null;
  } | null;
}

export default function ButtonsGroup({
  buttons,
  className,
}: {
  buttons: ButtonItem[];
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col md:flex-row gap-6 mt-6', className)}>
      {buttons.map((button) => {
        const href = button.link ? getLinkByLinkObject(button.link) : '';
        
        return (
          <Button
            asChild
            variant={button.variant}
            key={button._key}
            className={cn({
              'has-arrow-left': button.icon === 'arrow-left',
              'has-arrow-right': button.icon === 'arrow-right',
            })}
          >
            <Link
              href={href || '/'}
              target={button.link?.openInNewTab ? '_blank' : '_self'}
            >
              {button.text}
              <ArrowRight />
            </Link>
          </Button>
        );
      })}
    </div>
  );
}