import hiIcons from "@iconify-json/heroicons/icons.json";
import tbIcons from "@iconify-json/tabler/icons.json";
import flagIcons from "@iconify-json/flag/icons.json";
import logosIcons from "@iconify-json/logos/icons.json";
import fluentIcons from "@iconify-json/fluent/icons.json";

/**
 * Utility to get icon data from JSON collections.
 * This ensures we only use JSON data as requested and can be easily managed.
 */
function getIcon(collection: any, name: string) {
  const icon = collection.icons[name];
  if (!icon) {
    // Check aliases if not found in main icons
    const alias = collection.aliases?.[name];
    if (alias) {
      return { ...collection.icons[alias.parent], ...alias };
    }
    console.warn(`Icon ${name} not found in collection ${collection.prefix}`);
    return null;
  }
  return {
    body: icon.body,
    width: icon.width || collection.width,
    height: icon.height || collection.height,
  };
}

// Heroicons Solid
export const ICON_CHART_BAR = getIcon(hiIcons, "chart-bar-solid");
export const ICON_USERS = getIcon(hiIcons, "users-solid");
export const ICON_COG = getIcon(hiIcons, "cog-6-tooth-solid");
export const ICON_SHOPPING_BAG = getIcon(hiIcons, "shopping-bag-solid");
export const ICON_CHART_PIE = getIcon(hiIcons, "chart-pie-solid");
export const ICON_BOLT = getIcon(hiIcons, "bolt-solid");
export const ICON_DOCUMENT_TEXT = getIcon(hiIcons, "document-text-solid");
export const ICON_DOCUMENT_CHART = getIcon(hiIcons, "document-chart-bar-solid");
export const ICON_CUBE = getIcon(hiIcons, "cube-solid");
export const ICON_USER_CIRCLE = getIcon(hiIcons, "user-circle-solid");
export const ICON_IDENTIFICATION = getIcon(hiIcons, "identification-solid");
export const ICON_SWATCH = getIcon(hiIcons, "swatch-solid");
export const ICON_SQUARE_3_STACK = getIcon(hiIcons, "square-3-stack-3d-solid");
export const ICON_SHIELD_CHECK = getIcon(hiIcons, "shield-check-solid");
export const ICON_BOOK_OPEN = getIcon(hiIcons, "book-open-solid");
export const ICON_GLOBE_ALT = getIcon(hiIcons, "globe-alt-solid");
export const ICON_HOME = getIcon(hiIcons, "home-solid");
export const ICON_QUESTION = getIcon(hiIcons, "question-mark-circle-solid");
export const ICON_MAGNIFYING_GLASS = getIcon(hiIcons, "magnifying-glass-solid");
export const ICON_LOGOUT = getIcon(hiIcons, "arrow-left-on-rectangle-solid");
export const ICON_USER = getIcon(hiIcons, "user-solid");
export const ICON_BARS_3 = getIcon(hiIcons, "bars-3-solid");
export const ICON_X_MARK = getIcon(hiIcons, "x-mark-solid");
export const ICON_SUN = getIcon(hiIcons, "sun-solid");
export const ICON_MOON = getIcon(hiIcons, "moon-solid");
export const ICON_PAINT_BRUSH = getIcon(hiIcons, "paint-brush-solid");
export const ICON_ARROWS_RIGHT_LEFT = getIcon(hiIcons, "arrows-right-left-solid");
export const ICON_VIEW_COLUMNS = getIcon(hiIcons, "view-columns-solid");
export const ICON_CHEVRON_LEFT = getIcon(hiIcons, "chevron-left-solid");
export const ICON_CHEVRON_DOWN = getIcon(hiIcons, "chevron-down-solid");
export const ICON_CHEVRON_RIGHT = getIcon(hiIcons, "chevron-right-solid");
export const ICON_CHAT_BUBBLE = getIcon(hiIcons, "chat-bubble-left-right-solid");
export const ICON_ENVELOPE = getIcon(hiIcons, "envelope-solid");
export const ICON_ARROW_DOWN = getIcon(hiIcons, "arrow-down-solid");
export const ICON_ARROW_PATH = getIcon(hiIcons, "arrow-path-solid");
export const ICON_TRENDING_UP = getIcon(hiIcons, "arrow-trending-up-solid");
export const ICON_ARROW_DOWN_TRAY = getIcon(hiIcons, "arrow-down-tray-solid");
export const ICON_ARROW_TOP_RIGHT = getIcon(hiIcons, "arrow-top-right-on-square-solid");
export const ICON_ROCKET_LAUNCH = getIcon(hiIcons, "rocket-launch-solid");
export const ICON_LIGHT_BULB = getIcon(hiIcons, "light-bulb-solid");
export const ICON_ARROW_RIGHT = getIcon(hiIcons, "arrow-small-right-solid");
export const ICON_CHECK = getIcon(hiIcons, "check-solid");
export const ICON_ARROWS_EXPAND = getIcon(hiIcons, "arrows-pointing-out-solid");

export const ICON_STOP = getIcon(hiIcons, "stop-solid");
export const ICON_TABLE_CELLS = getIcon(hiIcons, "table-cells-solid");
export const ICON_QUEUE_LIST = getIcon(hiIcons, "queue-list-solid");
export const ICON_CLOUD = getIcon(hiIcons, "cloud-solid");
export const ICON_SPARKLES = getIcon(hiIcons, "sparkles-solid");
export const ICON_INBOX_STACK = getIcon(hiIcons, "inbox-stack-solid");
export const ICON_SQUARE_2_STACK = getIcon(hiIcons, "square-2-stack-solid");
export const ICON_FIRE = getIcon(hiIcons, "fire-solid");
export const ICON_VIEWFINDER_CIRCLE = getIcon(hiIcons, "viewfinder-circle-solid");
export const ICON_EYE = getIcon(hiIcons, "eye-solid");
export const ICON_CHECK_CIRCLE = getIcon(hiIcons, "check-circle-solid");
export const ICON_CURSOR_ARROW_RAYS = getIcon(hiIcons, "cursor-arrow-rays-solid");
export const ICON_LIST_BULLET = getIcon(hiIcons, "list-bullet-solid");
export const ICON_EXCLAMATION_TRIANGLE = getIcon(hiIcons, "exclamation-triangle-solid");
export const ICON_HASHTAG = getIcon(hiIcons, "hashtag-solid");
export const ICON_MAP = getIcon(hiIcons, "map-solid");
export const ICON_CALENDAR = getIcon(hiIcons, "calendar-solid");
export const ICON_ADJUSTMENTS_HORIZONTAL = getIcon(hiIcons, "adjustments-horizontal-solid");
export const ICON_BEAKER = getIcon(hiIcons, "beaker-solid");
export const ICON_CREDIT_CARD = getIcon(hiIcons, "credit-card-solid");
export const ICON_MAP_PIN = getIcon(hiIcons, "map-pin-solid");
export const ICON_CHART_BAR_SQUARE = getIcon(hiIcons, "chart-bar-square-solid");
export const ICON_HEART = getIcon(hiIcons, "heart-solid");
export const ICON_TRASH = getIcon(hiIcons, "trash-solid");
export const ICON_PLUS = getIcon(hiIcons, "plus-solid");
export const ICON_CLOCK = getIcon(hiIcons, "clock-solid");
export const ICON_NO_SYMBOL = getIcon(hiIcons, "no-symbol-solid");
export const ICON_FACE_FROWN = getIcon(hiIcons, "face-frown-solid");
export const ICON_FACE_SMILE = getIcon(hiIcons, "face-smile-solid");
export const ICON_PUZZLE_PIECE = getIcon(hiIcons, "puzzle-piece-solid");
export const ICON_SHIELD_EXCLAMATION = getIcon(hiIcons, "shield-exclamation-solid");
export const ICON_SCALE = getIcon(hiIcons, "scale-solid");
export const ICON_ARCHIVE_BOX = getIcon(hiIcons, "archive-box-solid");
export const ICON_WRENCH_SCREWDRIVER = getIcon(hiIcons, "wrench-screwdriver-solid");
export const ICON_HAND_RAISED = getIcon(hiIcons, "hand-raised-solid");
export const ICON_LINK = getIcon(hiIcons, "link-solid");
export const ICON_LINK_SLASH = getIcon(hiIcons, "link-slash-solid");
export const ICON_ARROW_UP_CIRCLE = getIcon(hiIcons, "arrow-up-circle-solid");
export const ICON_EXCLAMATION_CIRCLE = getIcon(hiIcons, "exclamation-circle-solid");
export const ICON_INFORMATION_CIRCLE = getIcon(hiIcons, "information-circle-solid");
export const ICON_STAR = getIcon(hiIcons, "star-solid");
export const ICON_MINUS = getIcon(hiIcons, "minus-solid");
export const ICON_EYE_SLASH = getIcon(hiIcons, "eye-slash-solid");
export const ICON_FUNNEL = getIcon(hiIcons, "funnel-solid");
export const ICON_UP_DOWN = getIcon(hiIcons, "arrows-up-down-solid");
export const ICON_PENCIL_SQUARE = getIcon(hiIcons, "pencil-square-solid");
export const ICON_FOLDER_PLUS = getIcon(hiIcons, "folder-plus-solid");
export const ICON_TAG = getIcon(hiIcons, "tag-solid");

// Tabler Icons
export const ICON_PALETTE = getIcon(tbIcons, "palette");
export const ICON_WINDOW = getIcon(tbIcons, "window");
export const ICON_TEAPOT = getIcon(tbIcons, "teapot");

// Flag Icons
export const ICON_FLAG_US = getIcon(flagIcons, "us-4x3");
export const ICON_FLAG_MY = getIcon(flagIcons, "my-4x3");
export const ICON_FLAG_CN = getIcon(flagIcons, "cn-4x3");
export const ICON_FLAG_KR = getIcon(flagIcons, "kr-4x3");
export const ICON_FLAG_JP = getIcon(flagIcons, "jp-4x3");
export const ICON_FLAG_RU = getIcon(flagIcons, "ru-4x3");
export const ICON_FLAG_SA = getIcon(flagIcons, "sa-4x3");
export const ICON_FLAG_TH = getIcon(flagIcons, "th-4x3");
export const ICON_FLAG_DE = getIcon(flagIcons, "de-4x3");
export const ICON_FLAG_GR = getIcon(flagIcons, "gr-4x3");

// System Additions
export const ICON_SERVER = getIcon(hiIcons, "server-solid");
export const ICON_KEY = getIcon(hiIcons, "key-solid");
export const ICON_USER_PLUS = getIcon(hiIcons, "user-plus-solid");
export const ICON_LOCK_CLOSED = getIcon(hiIcons, "lock-closed-solid");
export const ICON_PLAY = getIcon(hiIcons, "play-solid");
export const ICON_DATABASE = getIcon(hiIcons, "database-solid");
export const ICON_CODE = getIcon(hiIcons, "code-bracket-solid");
export const ICON_ADJUSTMENTS = getIcon(hiIcons, "adjustments-vertical-solid");
export const ICON_LIST = getIcon(hiIcons, "list-bullet-solid");
export const ICON_SEARCH = getIcon(hiIcons, "magnifying-glass-solid");
export const ICON_ACTIVITY = getIcon(hiIcons, "bolt-solid");
export const ICON_BRANCH = getIcon(hiIcons, "swatch-solid");
export const ICON_CUBE_TRANSPARENT = getIcon(hiIcons, "cube-transparent-solid");
export const ICON_TERMINAL = getIcon(hiIcons, "command-line-solid");
export const ICON_KEY_V2 = getIcon(hiIcons, "key-solid");
export const ICON_POWER = getIcon(hiIcons, "power-solid");
export const ICON_PAUSE = getIcon(hiIcons, "pause-solid");
export const ICON_STOP_V2 = getIcon(hiIcons, "stop-circle-solid");
export const ICON_PLUS_CIRCLE = getIcon(hiIcons, "plus-circle-solid");
export const ICON_QUESTION_MARK_CIRCLE = getIcon(hiIcons, "question-mark-circle-solid");
export const ICON_CLIPBOARD_DOCUMENT = getIcon(hiIcons, "clipboard-document-solid");
export const ICON_PLAY_PAUSE = getIcon(hiIcons, "play-pause-solid");

// Logos
export const ICON_LOGO_GOOGLE = getIcon(logosIcons, "google-icon");
export const ICON_LOGO_MICROSOFT = getIcon(logosIcons, "microsoft-icon");
export const ICON_LOGO_APPLE = getIcon(logosIcons, "apple");
export const ICON_LOGO_GITHUB = getIcon(logosIcons, "github-icon");
export const ICON_LOGO_LINKEDIN = getIcon(logosIcons, "linkedin-icon");
export const ICON_LOGO_FACEBOOK = getIcon(logosIcons, "facebook");
export const ICON_LOGO_DISCORD = getIcon(logosIcons, "discord-icon");
export const ICON_LOGO_SLACK = getIcon(logosIcons, "slack-icon");
export const ICON_LOGO_OKTA = getIcon(logosIcons, "okta-icon");
export const ICON_LOGO_GITLAB = getIcon(logosIcons, "gitlab-icon");

// Fluent Icons (Direct String Identifiers)
export const ICON_SEARCH_FLUENT = getIcon(fluentIcons, "search-16-regular");
export const ICON_SETTINGS_FLUENT = getIcon(fluentIcons, "settings-16-filled");
export const ICON_THEME_MODE_FLUENT = getIcon(fluentIcons, "dark-theme-20-filled");
export const ICON_LIGHT_MODE_FLUENT = getIcon(fluentIcons, "weather-sunny-16-filled");
export const ICON_DARK_MODE_FLUENT = getIcon(fluentIcons, "weather-moon-16-filled");
export const ICON_LAYOUT_FLUENT = getIcon(fluentIcons, "auto-fit-width-20-filled");
export const ICON_CENTER_FLUENT = getIcon(fluentIcons, "arrow-fit-in-16-filled");
export const ICON_WIDE_FLUENT = getIcon(fluentIcons, "arrow-fit-16-filled");
export const ICON_WINDOW_MODE_FLUENT = getIcon(fluentIcons, "window-16-filled");
export const ICON_FULLSCREEN_FLUENT = getIcon(fluentIcons, "full-screen-maximize-16-filled");
export const ICON_WINDOWED_FLUENT = getIcon(fluentIcons, "full-screen-minimize-16-filled");
export const ICON_COLOR_FLUENT = getIcon(fluentIcons, "color-24-filled");
export const ICON_BG_STYLE_FLUENT = getIcon(fluentIcons, "color-background-20-filled");
export const ICON_CHART_COLOR_FLUENT = getIcon(fluentIcons, "chart-multiple-16-filled");
export const ICON_LANG_FLUENT = getIcon(fluentIcons, "local-language-16-filled");
export const ICON_SAVE = getIcon(hiIcons, "arrow-down-on-square-solid");
export const ICON_FLOPPY = getIcon(fluentIcons, "save-20-filled");
export const ICON_ZOOM_IN_FLUENT = getIcon(fluentIcons, "zoom-in-20-filled");
export const ICON_ZOOM_OUT_FLUENT = getIcon(fluentIcons, "zoom-out-20-filled");
export const ICON_CURSOR_FLOW_FLUENT = getIcon(fluentIcons, "cursor-click-20-filled");

