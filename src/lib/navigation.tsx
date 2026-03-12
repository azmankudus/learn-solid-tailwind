import {
  ICON_CHART_BAR, ICON_USERS, ICON_COG, ICON_SHOPPING_BAG,
  ICON_CHART_PIE, ICON_BOLT, ICON_DOCUMENT_CHART,
  ICON_CUBE, ICON_USER_CIRCLE, ICON_IDENTIFICATION, ICON_SWATCH,
  ICON_SQUARE_3_STACK, ICON_SHIELD_CHECK, ICON_BOOK_OPEN, ICON_GLOBE_ALT,
  ICON_HOME, ICON_QUESTION
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
    get label() { return text("menu.management") || "Management"; },
    icon: ICON_CUBE,
    children: [
      { href: "/protected/management/users", get label() { return text("menu.users") || "Users"; }, icon: ICON_USERS },
      { href: "/protected/management/products", get label() { return text("menu.products") || "Products"; }, icon: ICON_SHOPPING_BAG },
    ]
  },
  {
    get label() { return text("menu.analytics") || "Analytics"; },
    icon: ICON_CHART_PIE,
    children: [
      { href: "/protected/analytics/live-data", get label() { return text("menu.liveData") || "Live Data"; }, icon: ICON_BOLT },
      { href: "/protected/analytics/reports", get label() { return text("menu.reports") || "Reports"; }, icon: ICON_DOCUMENT_CHART },
    ]
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
  {
    get label() { return text("menu.testing") || "Testing"; },
    icon: ICON_BOLT,
    children: [
      { href: "/protected/test/scrolling", get label() { return text("menu.scrolling") || "Scrolling"; }, icon: ICON_DOCUMENT_CHART },
      { href: "/protected/test/grid", get label() { return text("menu.gridScrolling") || "Grid Scrolling"; }, icon: ICON_CUBE },
    ]
  },
  {
    label: "Ecommerce",
    icon: ICON_SHOPPING_BAG,
    children: [
      { href: "/protected/ecommerce/orders", label: "Orders", icon: ICON_CUBE },
      { href: "/protected/ecommerce/inventory", label: "Inventory", icon: ICON_SHOPPING_BAG },
      { href: "/protected/ecommerce/customers", label: "Customers", icon: ICON_USERS },
      { href: "/protected/ecommerce/promos", label: "Promotions", icon: ICON_BOLT },
    ]
  },
  {
    label: "Logistics",
    icon: ICON_DOCUMENT_CHART,
    children: [
      { href: "/protected/logistics/shipping", label: "Shipping", icon: ICON_CUBE },
      { href: "/protected/logistics/tracking", label: "Tracking", icon: ICON_BOLT },
      { href: "/protected/logistics/warehouses", label: "Warehouses", icon: ICON_SQUARE_3_STACK },
    ]
  },
  {
    label: "Security",
    icon: ICON_SHIELD_CHECK,
    children: [
      { href: "/protected/security/audit", label: "Audit Logs", icon: ICON_DOCUMENT_CHART },
      { href: "/protected/security/permissions", label: "Permissions", icon: ICON_USERS },
      { href: "/protected/security/threats", label: "Threat Center", icon: ICON_BOLT },
    ]
  },
  {
    label: "Resource Library",
    icon: ICON_BOOK_OPEN,
    children: [
      { href: "/protected/resources/docs", label: "Documentation", icon: ICON_DOCUMENT_CHART },
      { href: "/protected/resources/assets", label: "Asset Manager", icon: ICON_CUBE },
      { href: "/protected/resources/backups", label: "System Backups", icon: ICON_BOLT },
    ]
  },
  {
    label: "Systems Management",
    icon: ICON_COG,
    children: [
      { href: "/protected/systems/status", label: "Server Status", icon: ICON_BOLT },
      { href: "/protected/systems/logs", label: "Error Logs", icon: ICON_DOCUMENT_CHART },
      { href: "/protected/systems/config", label: "Global Config", icon: ICON_COG },
    ]
  },
  {
    label: "Global Expansion",
    icon: ICON_GLOBE_ALT,
    children: [
      { href: "/protected/global/regions", label: "Regions", icon: ICON_CUBE },
      { href: "/protected/global/locales", label: "Localizations", icon: ICON_SWATCH },
    ]
  },
  {
    label: "Human Resources",
    icon: ICON_USERS,
    children: [
      { href: "/protected/hr/employees", label: "Employee List", icon: ICON_USER_CIRCLE },
      { href: "/protected/hr/payroll", label: "Payroll", icon: ICON_SHOPPING_BAG },
    ]
  },
  {
    label: "Financials",
    icon: ICON_CHART_PIE,
    children: [
      { href: "/protected/finance/revenue", label: "Revenue", icon: ICON_BOLT },
      { href: "/protected/finance/expenses", label: "Expenses", icon: ICON_SHOPPING_BAG },
    ]
  },
];
