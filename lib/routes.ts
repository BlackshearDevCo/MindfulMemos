export function getTasksRoute() {
  return "/tasks";
}

export function getThoughtsRoute() {
  return "/thoughts";
}

export function getAccountRoute() {
  return "/account";
}

export function getSignupRoute() {
  return "/signup";
}

export function getLoginRoute() {
  return "/signin";
}

export function getIsUnauthenticatedRoute(url: string) {
  return url.includes(getLoginRoute()) || url.includes(getSignupRoute());
}

export function getRevalidateRoute() {
  return "/revalidate";
}
