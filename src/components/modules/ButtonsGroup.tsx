import Link from 'next/link';
import { getLinkByLinkObject } from '@/lib/links';
import type { ButtonFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import { cn } from '@/lib/utils';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';

export default function ButtonsGroup({
  buttons,
  className,
}: {
  buttons: ButtonFragmentType[];
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col md:flex-row gap-6 mt-6', className)}>
      {buttons.map((button) => (
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
            href={button.link ? getLinkByLinkObject(button.link) || '' : ''}
            target={button.link?.openInNewTab ? '_blank' : '_self'}
          >
            {button.text}
            <ArrowRight />
          </Link>
        </Button>
      ))}
    </div>
  );
}