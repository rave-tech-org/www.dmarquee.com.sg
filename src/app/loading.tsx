'use client';

import { Icon } from '@iconify-icon/react';

export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <Icon width={70} className="text-primary" icon="eos-icons:bubble-loading" />
    </main>
  );
}
