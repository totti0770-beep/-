/**
 * NESP Official Logo Lockup
 * منصة الإدارة التنفيذية للخدمات التمريضية
 * Nursing Executive Services Management Platform
 * مستشفى جازان التخصصي · Jazan Specialist Hospital
 *
 * Usage:
 *   <NespLogo variant="navy" />      full lockup on navy
 *   <NespLogo variant="light" />     full lockup on white
 *   <NespLogo mark="white" wordmark={false} />   mark only
 *
 * Place mark-white-transparent.png / mark-blue-transparent.png
 * in the same assets folder and adjust `markSrc`.
 */
import React from 'react';

const MARKS = {
  white: '/assets/nesp/mark-white-transparent.png',
  blue:  '/assets/nesp/mark-blue-transparent.png',
};

export default function NespLogo({
  variant = 'navy',        // 'navy' | 'light'
  mark,                    // override: 'white' | 'blue'
  wordmark = true,
  size = 220,              // mark width in px
  className = '',
}) {
  const onNavy = variant === 'navy';
  const markKey = mark || (onNavy ? 'white' : 'blue');
  const textColor = onNavy ? '#FBFCFC' : '#102037';
  const subColor  = onNavy ? '#C2CDD8' : '#3E4A5A';

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        padding: 24,
        background: onNavy
          ? 'linear-gradient(160deg,#18283C 0%,#102037 100%)'
          : '#FBFCFC',
        borderRadius: 24,
      }}
    >
      <img
        src={MARKS[markKey]}
        alt="NESP star mark"
        width={size}
        style={{ display: 'block' }}
      />
      {wordmark && (
        <div style={{ textAlign: 'center', lineHeight: 1.2 }}>
          <div style={{
            fontFamily: "'Poppins','Inter',sans-serif",
            fontWeight: 700, fontSize: size * 0.18, color: textColor,
            letterSpacing: '-0.5px',
          }}>
            Nursing <span style={{ fontWeight: 500 }}>Platform</span>
          </div>
          <div dir="rtl" style={{
            fontFamily: "'IBM Plex Sans Arabic','Noto Kufi Arabic',sans-serif",
            fontWeight: 600, fontSize: size * 0.095, color: textColor, marginTop: 8,
          }}>
            منصة الإدارة التنفيذية للخدمات التمريضية
          </div>
          <div dir="rtl" style={{
            fontFamily: "'IBM Plex Sans Arabic','Noto Kufi Arabic',sans-serif",
            fontWeight: 400, fontSize: size * 0.075, color: subColor, marginTop: 4,
          }}>
            مستشفى جازان التخصصي
          </div>
        </div>
      )}
    </div>
  );
}
