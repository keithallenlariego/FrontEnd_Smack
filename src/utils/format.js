const avatarColors = ['clay', 'sage', 'caramel'];

// The same person always gets the same avatar color.
export const colorFor = (id) => avatarColors[Number(id) % avatarColors.length];
export const letterOf = (name) => (name?.[0] ?? '?').toUpperCase();
export const timeOf = (iso) => new Date(iso).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
export const dateTimeOf = (iso) => new Date(iso).toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
