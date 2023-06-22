const mapping: Record<string, string> = {
  companies: 'company',
  notes: 'note',
  users: 'user',
  'user-interactions': 'user_interaction',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
