'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface FloatingMenuProps {
  children: React.ReactNode;
  menuRef: React.RefObject<HTMLDivElement | null>;
  buttonRef: React.RefObject<HTMLElement | null>;
  width?: string;
  className?: string;
  offset?: {
    x?: number;
    y?: number;
  };
  estimatedMenuHeight?: number;
  updateOnScroll?: boolean;
  placement?: 'top' | 'bottom' | 'auto';
}

const FloatingMenu = ({
  children,
  menuRef,
  buttonRef,
  width = '8rem',
  className = '',
  offset = { x: 0, y: 10 },
  estimatedMenuHeight = 80,
  updateOnScroll = true,
  placement = 'auto',
}: FloatingMenuProps) => {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [showAbove, setShowAbove] = useState(false);

  const calculatePosition = () => {
    if (!buttonRef.current) return null;

    const rect = buttonRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const bottomSpace = windowHeight - rect.bottom;
    let shouldShowAbove = showAbove;
    if (placement === 'auto') {
      shouldShowAbove = bottomSpace < estimatedMenuHeight;
    } else {
      shouldShowAbove = placement === 'top';
    }

    setShowAbove(shouldShowAbove);

    const xPos = rect.left - (offset.x || 0);
    let yPos;

    if (shouldShowAbove) {
      yPos = rect.top - estimatedMenuHeight - (offset.y || 0);
    } else {
      yPos = rect.bottom + (offset.y || 0);
    }

    setPosition({
      top: yPos,
      left: xPos,
    });
  };

  useEffect(() => {
    setMounted(true);
    calculatePosition();

    if (updateOnScroll) {
      window.addEventListener('scroll', calculatePosition, true);
      window.addEventListener('resize', calculatePosition);
    }

    return () => {
      setMounted(false);
      if (updateOnScroll) {
        window.removeEventListener('scroll', calculatePosition, true);
        window.removeEventListener('resize', calculatePosition);
      }
    };
  }, [buttonRef, offset.x, offset.y, updateOnScroll, placement]);

  useEffect(() => {
    calculatePosition();
  }, [estimatedMenuHeight, placement]);

  if (!mounted || typeof window === 'undefined') return null;

  return createPortal(
    <div
      ref={menuRef}
      className={`fixed bg-white rounded-md shadow-lg z-50 border border-gray-200 ${className}`}
      style={{
        width,
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      {children}
    </div>,
    document.body,
  );
};

export default FloatingMenu;
