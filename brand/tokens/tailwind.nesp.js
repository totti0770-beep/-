/**
 * NESP — Tailwind theme extension
 * منصة الإدارة التنفيذية للخدمات التمريضية · مستشفى جازان التخصصي
 * Merge `theme.extend` into your tailwind.config.js
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        navy:      { DEFAULT: '#102037', deep: '#0B1626', 800: '#18283C' },
        brandblue: { DEFAULT: '#3C78A8', light: '#609CC0', mid: '#4878A8', sky: '#8FC1DB' },
        ink:       '#102037',
        success:   '#2E9E6B',
        warning:   '#E0A030',
        danger:    '#D24B4B',
        info:      '#3C78A8',
      },
      fontFamily: {
        latin:  ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        arabic: ['"IBM Plex Sans Arabic"', '"Noto Kufi Arabic"', 'Tajawal', 'sans-serif'],
      },
      backgroundImage: {
        'nesp-brand':  'linear-gradient(135deg, #609CC0 0%, #3C78A8 55%, #102037 100%)',
        'nesp-navy':   'linear-gradient(160deg, #18283C 0%, #102037 100%)',
        'nesp-silver': 'linear-gradient(135deg, #FFFFFF 0%, #C2CDD8 100%)',
      },
      borderRadius: { sm: '6px', md: '10px', lg: '16px', xl: '24px', pill: '999px' },
      boxShadow: {
        'nesp-sm':  '0 1px 2px rgba(16,32,55,0.08)',
        'nesp-md':  '0 4px 12px rgba(16,32,55,0.12)',
        'nesp-lg':  '0 12px 32px rgba(16,32,55,0.18)',
        'nesp-glow':'0 0 24px rgba(96,156,192,0.35)',
      },
    },
  },
};
