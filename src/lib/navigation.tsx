import {
  ICON_CHART_BAR, ICON_USERS, ICON_COG, ICON_SHOPPING_BAG,
  ICON_CHART_PIE, ICON_BOLT, ICON_DOCUMENT_CHART,
  ICON_CUBE, ICON_USER_CIRCLE, ICON_IDENTIFICATION, ICON_SWATCH,
  ICON_SQUARE_3_STACK, ICON_SHIELD_CHECK, ICON_BOOK_OPEN, ICON_GLOBE_ALT,
  ICON_HOME, ICON_QUESTION, ICON_CURSOR_ARROW_RAYS, ICON_QUEUE_LIST,
  ICON_CHECK_CIRCLE, ICON_DOCUMENT_TEXT, ICON_SQUARE_2_STACK,
  ICON_ARROW_DOWN_TRAY, ICON_CALENDAR, ICON_ADJUSTMENTS_HORIZONTAL,
  ICON_CREDIT_CARD, ICON_WINDOW, ICON_CHAT_BUBBLE, ICON_TRENDING_UP,
  ICON_SPARKLES, ICON_CHEVRON_RIGHT, ICON_VIEW_COLUMNS, ICON_TABLE_CELLS,
  ICON_LIST_BULLET, ICON_CHART_BAR_SQUARE, ICON_VIEWFINDER_CIRCLE,
  ICON_MAP, ICON_EXCLAMATION_TRIANGLE, ICON_HASHTAG
} from "./icons";
import { text } from "./i18n";

export interface NavItem {
  href?: string;
  label: string;
  icon: any;
  children?: NavItem[];
}

export const TOP_NAV_ITEMS: NavItem[] = [
  { href: "/", get label() { return text("nav.home") || "Home"; }, icon: ICON_HOME },
  { href: "/docs", get label() { return text("nav.docs") || "Documentation"; }, icon: ICON_DOCUMENT_CHART },
  { href: "/help", get label() { return text("nav.help") || "Help"; }, icon: ICON_QUESTION },
];

export const SIDE_NAV_ITEMS: NavItem[] = [
  { href: "/protected/dashboard", get label() { return text("menu.overview") || "Overview"; }, icon: ICON_CHART_BAR },
  {
    label: "Input",
    icon: ICON_CURSOR_ARROW_RAYS,
    children: [
      { href: "/protected/input/buttons", label: "Buttons", icon: ICON_BOLT },
      { href: "/protected/input/dropdown", label: "Dropdown", icon: ICON_QUEUE_LIST },
      { href: "/protected/input/radio", label: "Radio", icon: ICON_CHECK_CIRCLE },
      { href: "/protected/input/textfield", label: "TextField", icon: ICON_DOCUMENT_TEXT },
      { href: "/protected/input/toggle", label: "Toggle", icon: ICON_SQUARE_2_STACK },
      { href: "/protected/input/file", label: "File", icon: ICON_ARROW_DOWN_TRAY },
      { href: "/protected/input/date-time", label: "Date & Time", icon: ICON_CALENDAR },
      { href: "/protected/input/color", label: "Color", icon: ICON_SWATCH },
      { href: "/protected/input/slider", label: "Slider", icon: ICON_ADJUSTMENTS_HORIZONTAL },
    ]
  },
  {
    label: "Display",
    icon: ICON_CUBE,
    children: [
      { href: "/protected/content/card", label: "Card", icon: ICON_CREDIT_CARD },
      { href: "/protected/content/grid", label: "Grid", icon: ICON_SQUARE_3_STACK },
      { href: "/protected/content/modal", label: "Modal", icon: ICON_WINDOW },
      { href: "/protected/content/tooltip", label: "Tooltip", icon: ICON_CHAT_BUBBLE },
      { href: "/protected/content/progress", label: "Progress", icon: ICON_TRENDING_UP },
      { href: "/protected/content/tree", label: "Tree", icon: ICON_QUEUE_LIST },
      { href: "/protected/content/badge", label: "Badge", icon: ICON_SPARKLES },
      { href: "/protected/content/toast", label: "Toast", icon: ICON_BOLT },
      { href: "/protected/content/context", label: "Context", icon: ICON_IDENTIFICATION },
    ]
  },
  {
    label: "Language",
    icon: ICON_GLOBE_ALT,
    href: "/protected/profile/appearance"
  },
  {
    label: "Navigation",
    icon: ICON_SQUARE_3_STACK,
    children: [
      { href: "/protected/navigation/breadcrumb", label: "Breadcrumb", icon: ICON_CHEVRON_RIGHT },
      { href: "/protected/navigation/tabs", label: "Tabs", icon: ICON_SQUARE_2_STACK },
      { href: "/protected/navigation/sidebar", label: "Sidebar", icon: ICON_VIEW_COLUMNS },
    ]
  },
  {
    label: "Data",
    icon: ICON_TABLE_CELLS,
    children: [
      { href: "/protected/data/list", label: "List", icon: ICON_LIST_BULLET },
      { href: "/protected/data/table", label: "Table", icon: ICON_TABLE_CELLS },
    ]
  },
  {
    label: "Chart",
    icon: ICON_CHART_PIE,
    children: [
      { href: "/protected/chart/bar", label: "Bar Chart", icon: ICON_CHART_BAR_SQUARE },
      { href: "/protected/chart/line", label: "Line Chart", icon: ICON_TRENDING_UP },
      { href: "/protected/chart/pie", label: "Pie Chart", icon: ICON_CHART_PIE },
      { href: "/protected/chart/donut", label: "Donut Chart", icon: ICON_VIEWFINDER_CIRCLE },
      { href: "/protected/chart/map", label: "Map Chart", icon: ICON_MAP },
      { href: "/protected/chart/nightangle", label: "Nightingale Chart", icon: ICON_CHART_PIE },
      { href: "/protected/chart/area", label: "Area Chart", icon: ICON_TRENDING_UP },
      { href: "/protected/chart/scatter", label: "Scatter Chart", icon: ICON_SPARKLES },
      { href: "/protected/chart/stackedbar", label: "Stacked Bar Chart", icon: ICON_CHART_BAR_SQUARE },
      { href: "/protected/chart/candlestick", label: "CandleStick Chart", icon: ICON_TRENDING_UP },
      { href: "/protected/chart/radar", label: "Radar Chart", icon: ICON_VIEWFINDER_CIRCLE },
      { href: "/protected/chart/boxplot", label: "BoxPlot Chart", icon: ICON_TABLE_CELLS },
      { href: "/protected/chart/heatmap", label: "HeatMap Chart", icon: ICON_SWATCH },
      { href: "/protected/chart/treemap", label: "TreeMap Chart", icon: ICON_SQUARE_3_STACK },
      { href: "/protected/chart/sunburst", label: "Sunburst Chart", icon: ICON_CUBE },
      { href: "/protected/chart/funnel", label: "Funnel Chart", icon: ICON_IDENTIFICATION },
      { href: "/protected/chart/gauge", label: "Gauge Chart", icon: ICON_BOLT },
    ]
  },
  {
    label: "Error",
    icon: ICON_EXCLAMATION_TRIANGLE,
    children: [
      { href: "/protected/error/404", label: "404 Not Found", icon: ICON_QUESTION },
      { href: "/protected/error/500", label: "500 Server Error", icon: ICON_SHIELD_CHECK },
    ]
  },
  {
    label: "Markdown",
    icon: ICON_HASHTAG,
    href: "/protected/markdown"
  },
  {
    get label() { return text("menu.profile") || "Profile"; },
    icon: ICON_USER_CIRCLE,
    children: [
      { href: "/protected/profile/details", get label() { return text("menu.details") || "Details"; }, icon: ICON_IDENTIFICATION },
      { href: "/protected/profile/appearance", get label() { return text("menu.appearance") || "Appearance"; }, icon: ICON_SWATCH },
    ]
  },
  { href: "/protected/settings", get label() { return text("menu.settings") || "Settings"; }, icon: ICON_COG },
];
