'use client';

import { useState } from 'react';
import Link from 'next/link';
import SubscribeModal from '@/components/modules/SubscribeModal';
import type { PortableTextBlock } from 'next-sanity';

interface SubscribeModalData {
  heading?: string | null;
  content?: PortableTextBlock[] | null;
  image?: {
    asset?: { _ref?: string } | null;
    alt?: string | null;
  } | null;
}

interface HeaderActionsProps {
  subscribeModalData?: SubscribeModalData | null;
}

export default function HeaderActions({ subscribeModalData }: HeaderActionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav className="flex gap-2">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="p-2 flex items-center justify-center hover:opacity-80 transition-opacity"
          aria-label="Subscribe to newsletter"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_11259_8583)">
              <path
                d="M2.75 3.875C1.97656 3.875 1.375 4.51953 1.375 5.25V6.96875L9.75391 13.1562C10.4844 13.6719 11.4727 13.6719 12.2031 13.1562L20.625 6.96875V5.25C20.625 4.51953 19.9805 3.875 19.25 3.875H2.75ZM1.375 8.6875V16.25C1.375 17.0234 1.97656 17.625 2.75 17.625H19.25C19.9805 17.625 20.625 17.0234 20.625 16.25V8.6875L13.0195 14.2734C11.8164 15.1328 10.1406 15.1328 8.9375 14.2734L1.375 8.6875ZM0 5.25C0 3.74609 1.20312 2.5 2.75 2.5H19.25C20.7539 2.5 22 3.74609 22 5.25V16.25C22 17.7969 20.7539 19 19.25 19H2.75C1.20312 19 0 17.7969 0 16.25V5.25Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_11259_8583">
                <rect width="22" height="22" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
        <Link
          className="p-2 flex items-center justify-center hover:opacity-80 transition-opacity"
          href="/"
          aria-label="Search"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.5 8.6875C16.5 6.02344 15.0391 3.53125 12.7188 2.15625C10.3555 0.824219 7.47656 0.824219 5.15625 2.15625C2.79297 3.53125 1.375 6.02344 1.375 8.6875C1.375 11.3945 2.79297 13.8867 5.15625 15.2617C7.47656 16.5938 10.3555 16.5938 12.7188 15.2617C15.0391 13.8867 16.5 11.3945 16.5 8.6875ZM14.7383 15.4766C13.1914 16.8516 11.1289 17.625 8.9375 17.625C3.99609 17.625 0 13.6289 0 8.6875C0 3.78906 3.99609 -0.25 8.9375 -0.25C13.8359 -0.25 17.875 3.78906 17.875 8.6875C17.875 10.9219 17.0586 12.9414 15.7266 14.5312L21.7852 20.5898C22.043 20.8477 22.043 21.3203 21.7852 21.5781C21.5273 21.8359 21.0547 21.8359 20.7969 21.5781L14.7383 15.4766Z"
              fill="black"
            />
          </svg>
        </Link>
      </nav>

      <SubscribeModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        data={subscribeModalData}
      />
    </>
  );
}
