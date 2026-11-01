// Every API call the app makes, grouped like the backend controllers.
import { request } from './client.js';

const send = (method) => (path, body) => request(path, { method, body });
const post = send('POST');
const put = send('PUT');
const del = send('DELETE');

export const authApi = {
  register: (body) => post('/auth/register', body),
  login: (body) => post('/auth/login', body),
};

export const userApi = {
  me: () => request('/users/me'),
  update: (body) => put('/users/me', body),
  stats: () => request('/users/me/stats'),
  remove: () => del('/users/me'),
};

export const roomApi = {
  create: (body) => post('/rooms', body),
  mine: () => request('/rooms'),
  publicRooms: () => request('/rooms/public'),
  get: (id) => request(`/rooms/${id}`),
  update: (id, body) => put(`/rooms/${id}`, body),
  remove: (id) => del(`/rooms/${id}`),
  join: (id) => post(`/rooms/${id}/join`),
  leave: (id) => post(`/rooms/${id}/leave`),
  members: (id) => request(`/rooms/${id}/members`),
  addMember: (id, username) => post(`/rooms/${id}/members`, { username }),
  changeRole: (id, userId, role) => put(`/rooms/${id}/members/${userId}/role`, { role }),
  removeMember: (id, userId) => del(`/rooms/${id}/members/${userId}`),
};

export const messageApi = {
  history: (roomId) => request(`/rooms/${roomId}/messages`),
  send: (roomId, content) => post(`/rooms/${roomId}/messages`, { content }),
};

export const moderationApi = {
  getSettings: (roomId) => request(`/rooms/${roomId}/moderation`),
  updateSettings: (roomId, body) => put(`/rooms/${roomId}/moderation`, body),
  flags: (roomId) => request(`/rooms/${roomId}/moderation/flags`),
  review: (flagId, decision) => put(`/moderation/flags/${flagId}`, { decision }), // APPROVED | RESTORED | DELETED
};
