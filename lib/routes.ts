export function getTasksRoute() {
  return "/tasks";
}

export function getThoughtsRoute() {
  return "/thoughts";
}

export function getLoginRoute() {
  return "/signin";
}

export function getIsUnauthenticatedRoute(url: string) {
  return url.includes(getLoginRoute());
}

export function getRevalidateRoute() {
  return "/revalidate";
}
