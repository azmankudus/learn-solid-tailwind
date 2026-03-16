import { JSXElement } from "solid-js";
import { Icon } from "@iconify-icon/solid";
import {
  ICON_QUESTION, ICON_LOCK_CLOSED, ICON_KEY,
  ICON_EXCLAMATION_TRIANGLE, ICON_BOLT, ICON_CLOCK, ICON_CLOUD,
  ICON_SERVER, ICON_GLOBE_ALT, ICON_CREDIT_CARD, ICON_SHIELD_EXCLAMATION,
  ICON_NO_SYMBOL, ICON_FACE_FROWN, ICON_PUZZLE_PIECE, ICON_ARCHIVE_BOX,
  ICON_SQUARE_3_STACK, ICON_DOCUMENT_CHART, ICON_TEAPOT, ICON_BEAKER,
  ICON_SCALE, ICON_WRENCH_SCREWDRIVER, ICON_IDENTIFICATION, ICON_HAND_RAISED,
  ICON_LINK, ICON_LINK_SLASH, ICON_ARROW_UP_CIRCLE, ICON_EXCLAMATION_CIRCLE,
  ICON_ROCKET_LAUNCH, ICON_ARROWS_RIGHT_LEFT, ICON_SQUARE_2_STACK, ICON_PLUS,
  ICON_ADJUSTMENTS_HORIZONTAL, ICON_VIEW_COLUMNS, ICON_EYE, ICON_ARROW_PATH
} from "./icons";

export interface ErrorConfig {
  code: string;
  name: string;
  description: string;
  icon: any;
  isServerError: boolean;
}

export const ERROR_CONFIGS: Record<string, ErrorConfig> = {
  "400": {
    code: "400",
    name: "Bad Request",
    description: "The server could not understand the request due to invalid syntax. Please check your input and try again.",
    icon: ICON_EXCLAMATION_TRIANGLE,
    isServerError: false
  },
  "401": {
    code: "401",
    name: "Unauthorized",
    description: "Authentication is required to access this resource. Please log in and try again.",
    icon: ICON_KEY,
    isServerError: false
  },
  "402": {
    code: "402",
    name: "Payment Required",
    description: "This resource requires payment to be accessed. Please complete the transaction to continue.",
    icon: ICON_CREDIT_CARD,
    isServerError: false
  },
  "403": {
    code: "403",
    name: "Forbidden",
    description: "You don't have permission to access this resource. Contact an administrator if you believe this is a mistake.",
    icon: ICON_SHIELD_EXCLAMATION,
    isServerError: false
  },
  "404": {
    code: "404",
    name: "Not Found",
    description: "The page you're looking for doesn't exist or has been moved. It might have been deleted or the URL may be incorrect.",
    icon: ICON_QUESTION,
    isServerError: false
  },
  "405": {
    code: "405",
    name: "Method Not Allowed",
    description: "The request method is not supported for the target resource. Please verify the request and try again.",
    icon: ICON_NO_SYMBOL,
    isServerError: false
  },
  "406": {
    code: "406",
    name: "Not Acceptable",
    description: "The requested resource is only capable of generating content not acceptable according to the Accept headers sent in the request.",
    icon: ICON_FACE_FROWN,
    isServerError: false
  },
  "407": {
    code: "407",
    name: "Proxy Auth Required",
    description: "The client must first authenticate itself with the proxy. Similar to 401, but authentication is needed for a proxy.",
    icon: ICON_IDENTIFICATION,
    isServerError: false
  },
  "408": {
    code: "408",
    name: "Request Timeout",
    description: "The server timed out waiting for the request. Your connection may be slow or the server is under heavy load.",
    icon: ICON_CLOCK,
    isServerError: false
  },
  "409": {
    code: "409",
    name: "Conflict",
    description: "The request could not be completed due to a conflict with the current state of the target resource. This can happen with concurrent edits.",
    icon: ICON_PUZZLE_PIECE,
    isServerError: false
  },
  "410": {
    code: "410",
    name: "Gone",
    description: "The requested resource is no longer available at the server and no forwarding address is known. This condition is expected to be permanent.",
    icon: ICON_ARCHIVE_BOX,
    isServerError: false
  },
  "411": {
    code: "411",
    name: "Length Required",
    description: "The server refuses to accept the request without a defined Content-Length header. Please verify your request.",
    icon: ICON_ADJUSTMENTS_HORIZONTAL,
    isServerError: false
  },
  "412": {
    code: "412",
    name: "Precondition Failed",
    description: "The server does not meet one of the preconditions that the requester put on the request header fields.",
    icon: ICON_HAND_RAISED,
    isServerError: false
  },
  "413": {
    code: "413",
    name: "Payload Too Large",
    description: "The request entity is larger than limits defined by server. Please reduce the size of your request and try again.",
    icon: ICON_SQUARE_3_STACK,
    isServerError: false
  },
  "414": {
    code: "414",
    name: "URI Too Long",
    description: "The URI provided was too long for the server to process. This is often the result of too much data being passed as a query string of a GET request.",
    icon: ICON_LINK,
    isServerError: false
  },
  "415": {
    code: "415",
    name: "Unsupported Media Type",
    description: "The request entity has a media type which the server or resource does not support. For example, uploading an SVG when only JPG is allowed.",
    icon: ICON_DOCUMENT_CHART,
    isServerError: false
  },
  "416": {
    code: "416",
    name: "Range Not Satisfiable",
    description: "The client has asked for a portion of the file, but the server cannot supply that portion. For example, if the client asked for a part of the file that lies beyond the end of the file.",
    icon: ICON_VIEW_COLUMNS,
    isServerError: false
  },
  "417": {
    code: "417",
    name: "Expectation Failed",
    description: "The server cannot meet the requirements of the Expect request-header field. The client expectation was not met.",
    icon: ICON_EYE,
    isServerError: false
  },
  "418": {
    code: "418",
    name: "I'm a teapot",
    description: "Any attempt to brew coffee with a teapot should result in the error code \"418 I'm a teapot\". The resulting entity body MAY be short and stout.",
    icon: ICON_TEAPOT,
    isServerError: false
  },
  "421": {
    code: "421",
    name: "Misdirected Request",
    description: "The request was directed at a server that is not able to produce a response. This can be sent by a server that is not configured to produce responses for the combination of scheme and authority that are included in the request URI.",
    icon: ICON_ARROW_PATH,
    isServerError: false
  },
  "422": {
    code: "422",
    name: "Unprocessable Entity",
    description: "The server understands the content type and syntax of the request but was unable to process the contained instructions. Common for validation errors.",
    icon: ICON_BEAKER,
    isServerError: false
  },
  "423": {
    code: "423",
    name: "Locked",
    description: "The resource that is being accessed is locked. The request must be unlocked or wait for the resource to be available.",
    icon: ICON_LOCK_CLOSED,
    isServerError: false
  },
  "424": {
    code: "424",
    name: "Failed Dependency",
    description: "The request failed because it depended on another action and that action failed. This is common in WebDAV systems.",
    icon: ICON_LINK_SLASH,
    isServerError: false
  },
  "425": {
    code: "425",
    name: "Too Early",
    description: "Indicates that the server is unwilling to risk processing a request that might be replayed.",
    icon: ICON_CLOCK,
    isServerError: false
  },
  "426": {
    code: "426",
    name: "Upgrade Required",
    description: "The client should switch to a different protocol such as TLS/1.0, given in the Upgrade header field.",
    icon: ICON_ARROW_UP_CIRCLE,
    isServerError: false
  },
  "428": {
    code: "428",
    name: "Precondition Required",
    description: "The origin server requires the request to be conditional. Intended to prevent 'the lost update problem'.",
    icon: ICON_EXCLAMATION_CIRCLE,
    isServerError: false
  },
  "429": {
    code: "429",
    name: "Too Many Requests",
    description: "You've sent too many requests in a given amount of time. Please slow down and try again later.",
    icon: ICON_BOLT,
    isServerError: false
  },
  "451": {
    code: "451",
    name: "Unavailable For Legal Reasons",
    description: "Access to this resource is denied due to legal demands. This might be due to censorship or government-mandated blocking.",
    icon: ICON_SCALE,
    isServerError: false
  },
  "500": {
    code: "500",
    name: "Internal Server Error",
    description: "Something went wrong on our end. Our team has been notified and is looking into it.",
    icon: ICON_SERVER,
    isServerError: true
  },
  "501": {
    code: "501",
    name: "Not Implemented",
    description: "The server either does not recognize the request method, or it lacks the ability to fulfill the request. This is usually a temporary state.",
    icon: ICON_WRENCH_SCREWDRIVER,
    isServerError: true
  },
  "502": {
    code: "502",
    name: "Bad Gateway",
    description: "The server received an invalid response from an upstream server. This is usually temporary.",
    icon: ICON_CLOUD,
    isServerError: true
  },
  "503": {
    code: "503",
    name: "Service Unavailable",
    description: "The server is currently unable to handle the request. It may be overloaded or down for maintenance.",
    icon: ICON_GLOBE_ALT,
    isServerError: true
  },
  "504": {
    code: "504",
    name: "Gateway Timeout",
    description: "The server didn't receive a timely response from an upstream server. Please try again in a few moments.",
    icon: ICON_CLOCK,
    isServerError: true
  },
  "505": {
    code: "505",
    name: "HTTP Version Not Supported",
    description: "The server does not support the HTTP protocol version used in the request.",
    icon: ICON_ROCKET_LAUNCH,
    isServerError: true
  },
  "506": {
    code: "506",
    name: "Variant Also Negotiates",
    description: "Transparent content negotiation for the request results in a circular reference.",
    icon: ICON_ARROWS_RIGHT_LEFT,
    isServerError: true
  },
  "507": {
    code: "507",
    name: "Insufficient Storage",
    description: "The server is unable to store the representation needed to complete the request.",
    icon: ICON_SQUARE_2_STACK,
    isServerError: true
  },
  "508": {
    code: "508",
    name: "Loop Detected",
    description: "The server detected an infinite loop while processing the request.",
    icon: ICON_ARROW_PATH,
    isServerError: true
  },
  "510": {
    code: "510",
    name: "Not Extended",
    description: "Further extensions to the request are required for the server to fulfill it.",
    icon: ICON_PLUS,
    isServerError: true
  },
  "511": {
    code: "511",
    name: "Auth Required (Network)",
    description: "The client needs to authenticate to gain network access.",
    icon: ICON_LOCK_CLOSED,
    isServerError: true
  },
  "default": {
    code: "---",
    name: "Unknown Error",
    description: "An unexpected error occurred. Please try again or contact support if the problem persists.",
    icon: ICON_EXCLAMATION_TRIANGLE,
    isServerError: true
  }
};

export function getErrorConfig(code?: string | number): ErrorConfig {
  const codeStr = String(code);
  return ERROR_CONFIGS[codeStr] || ERROR_CONFIGS.default;
}
