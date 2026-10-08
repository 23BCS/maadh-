// 24x24 stroke icons shared by SVG sections and the hero canvas (replaces emoji).
export const ICONS = {
  patient: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c0-4.4 3.6-7 8-7s8 2.6 8 7',
  doctor: 'M6 3v6a4 4 0 0 0 8 0V3M10 13v2a4 4 0 0 0 8 0v-1.5M18 12a1.8 1.8 0 1 0 0 .01',
  hospital: 'M4 21V6l8-3 8 3v15M2 21h20M12 8v6M9 11h6',
  lab: 'M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M8 15h8',
  pharmacy: 'M10.5 20.5a5 5 0 0 1-7-7l10-10a5 5 0 0 1 7 7zM8.5 8.5l7 7',
  admin: 'M3 10l9-6 9 6M5 10v9M9.5 10v9M14.5 10v9M19 10v9M3 21h18',
  emergency: 'M2 16V7h11v9M13 10h4l4 4v2h-2M2 16h2M8 16h6M7.5 9v4M5.5 11h4M6 18a1.6 1.6 0 1 0 0 .01M17 18a1.6 1.6 0 1 0 0 .01',
  family: 'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20c0-3.3 2.7-5 6-5M16 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM12.5 20c0-3 1.8-5 4.5-5s4.5 2 4.5 5',
};

export const Icon = ({ n, size = 24, stroke = 1.7 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={ICONS[n]} /></svg>
);
