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

export function getForgotPasswordRoute() {
  return "/forgotpassword";
}

export function getPasswordResetRoute() {
  return "/resetpassword";
}

export function getIsUnauthenticatedRoute(url: string) {
  return (
    url.includes(getLoginRoute()) ||
    url.includes(getSignupRoute()) ||
    url.includes(getForgotPasswordRoute()) ||
    url.includes(getPasswordResetRoute())
  );
}

export function getRevalidateRoute() {
  return "/revalidate";
}
