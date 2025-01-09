'use client';

import { Icon } from '@iconify-icon/react';
import Link from 'next/link';
import './styles.scss';

export default function WhatsAppButton() {
  return (
    <Link href="https://wa.me/6590212844" className="whatsapp-button" target="_blank">
      <Icon icon="mdi:whatsapp" width={40} />
    </Link>
  );
}
