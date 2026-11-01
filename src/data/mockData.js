// Fake data so the screens match the Figma design.
// Swap these for API calls (the Spring Boot backend) later.

export const currentUser = { name: 'Keith', username: 'keith', email: 'you@example.com' };

export const rooms = [
  { id: 'the-living-room', name: 'the-living-room', isPrivate: true, role: 'OWNER', members: 4, lastMessage: 'Milo: Already here. Kettle’s on.' },
  { id: 'the-daily', name: 'the-daily', isPrivate: false, role: 'MEMBER', members: 12, lastMessage: 'Jules: Anyone seen the new menu?' },
  { id: 'game-night', name: 'game-night', isPrivate: true, role: 'OWNER', members: 6, lastMessage: 'Sam: Friday still works for me.' },
];

export const publicRooms = [
  { id: 'little-wins', description: 'Share the small stuff that went right today.' },
  { id: 'pet-pics', description: 'Photos of pets. That is the whole rule.' },
  { id: 'weekend-plans', description: 'Figure out what everyone is up to.' },
];

export const members = [
  { id: 1, name: 'Keith', letter: 'K', color: 'caramel', role: 'OWNER', isYou: true },
  { id: 2, name: 'Jules', letter: 'J', color: 'clay', role: 'MEMBER' },
  { id: 3, name: 'Milo', letter: 'M', color: 'sage', role: 'MEMBER' },
  { id: 4, name: 'Sam', letter: 'S', color: 'caramel', role: 'MEMBER' },
];

// The message with `flagged: true` is the one the AI moderator hid.
export const messages = [
  { id: 1, name: 'Jules', letter: 'J', color: 'clay', time: '8:04 PM', text: 'Same time, same couch?' },
  { id: 2, name: 'Milo', letter: 'M', color: 'sage', time: '8:05 PM', text: 'Already here. Kettle’s on.' },
  { id: 3, name: 'Sam', letter: 'S', color: 'caramel', time: '8:06 PM', text: 'Two minutes. Save me a seat.' },
  { id: 4, flagged: true, sender: 'Taylor' },
  { id: 5, name: 'Milo', letter: 'M', color: 'sage', time: '8:09 PM', text: 'Bringing the good biscuits.' },
];

export const flaggedMessages = [
  { id: 1, sender: 'Taylor', letter: 'T', color: 'caramel', time: '8:12 PM', reason: 'SPAM', confidence: 94, action: 'HIDDEN', text: 'Free gift cards!! Click this link right now' },
  { id: 2, sender: 'Riley', letter: 'R', color: 'clay', time: '7:48 PM', reason: 'ABUSIVE', confidence: 88, action: 'HIDDEN', text: 'You are all useless, get out of here' },
];

export const moderationLog = [
  { id: 1, user: 'Taylor', time: '8:12 PM', reason: 'SPAM', status: 'PENDING' },
  { id: 2, user: 'Riley', time: '7:48 PM', reason: 'ABUSIVE', status: 'PENDING' },
  { id: 3, user: 'Alex', time: 'Yesterday', reason: 'SPAM', status: 'DELETED' },
  { id: 4, user: 'Jordan', time: 'Mon', reason: 'ABUSIVE', status: 'RESTORED' },
];
