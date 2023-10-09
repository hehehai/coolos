export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized")
  }
}

export class NoPermissionError extends Error {
  constructor() {
    super("No Permission")
  }
}

export class BadRequestError extends Error {
  constructor() {
    super("Bad Request")
  }
}

export class NotFoundError extends Error {
  constructor() {
    super("Not Found")
  }
}

export class ServerError extends Error {
  constructor() {
    super("Server Error")
  }
}
