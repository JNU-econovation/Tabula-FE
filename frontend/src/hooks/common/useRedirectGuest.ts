'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthStore } from '@/stores/authStore';

export default function useRedirectGuest() {
  const router = useRouter();
  const { loginType } = AuthStore();

  useEffect(() => {
    if (loginType == null) return;

    if (loginType === 'guest') {
      router.replace('/');
    }
  }, [loginType, router]);

  return { loginType };
}
