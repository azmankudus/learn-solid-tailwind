import {
  HiSolidChartBar, HiSolidUsers, HiSolidCog6Tooth, HiSolidShoppingBag,
  HiSolidChartPie, HiSolidBolt, HiSolidDocumentChartBar,
  HiSolidCube, HiSolidUserCircle, HiSolidIdentification, HiSolidSwatch,
  HiSolidSquare3Stack3d, HiSolidShieldCheck, HiSolidBookOpen, HiSolidGlobeAlt,
  HiSolidHome, HiSolidQuestionMarkCircle
} from "solid-icons/hi";
import { text } from "./i18n";

export interface NavItem {
  href?: string;
  label: string;
  icon: any;
  children?: NavItem[];
}

export const TOP_NAV_ITEMS: NavItem[] = [
  { href: "/", get label() { return text("nav.home") || "Home"; }, icon: HiSolidHome },
  { href: "/docs", get label() { return text("nav.docs") || "Documentation"; }, icon: HiSolidDocumentChartBar },
  { href: "/help", get label() { return text("nav.help") || "Help"; }, icon: HiSolidQuestionMarkCircle },
];

export const SIDE_NAV_ITEMS: NavItem[] = [
  { href: "/protected", get label() { return text("menu.overview") || "Overview"; }, icon: HiSolidChartBar },
  {
    get label() { return text("menu.management") || "Management"; },
    icon: HiSolidCube,
    children: [
      { href: "/protected/management/users", get label() { return text("menu.users") || "Users"; }, icon: HiSolidUsers },
      { href: "/protected/management/products", get label() { return text("menu.products") || "Products"; }, icon: HiSolidShoppingBag },
    ]
  },
  {
    get label() { return text("menu.analytics") || "Analytics"; },
    icon: HiSolidChartPie,
    children: [
      { href: "/protected/analytics/live-data", get label() { return text("menu.liveData") || "Live Data"; }, icon: HiSolidBolt },
      { href: "/protected/analytics/reports", get label() { return text("menu.reports") || "Reports"; }, icon: HiSolidDocumentChartBar },
    ]
  },
  {
    get label() { return text("menu.profile") || "Profile"; },
    icon: HiSolidUserCircle,
    children: [
      { href: "/protected/profile/details", get label() { return text("menu.details") || "Details"; }, icon: HiSolidIdentification },
      { href: "/protected/profile/appearance", get label() { return text("menu.appearance") || "Appearance"; }, icon: HiSolidSwatch },
    ]
  },
  { href: "/protected/settings", get label() { return text("menu.settings") || "Settings"; }, icon: HiSolidCog6Tooth },
  {
    get label() { return text("menu.testing") || "Testing"; },
    icon: HiSolidBolt,
    children: [
      { href: "/protected/test/scrolling", get label() { return text("menu.scrolling") || "Scrolling"; }, icon: HiSolidDocumentChartBar },
      { href: "/protected/test/grid", get label() { return text("menu.gridScrolling") || "Grid Scrolling"; }, icon: HiSolidCube },
    ]
  },
  {
    label: "Ecommerce",
    icon: HiSolidShoppingBag,
    children: [
      { href: "/protected/ecommerce/orders", label: "Orders", icon: HiSolidCube },
      { href: "/protected/ecommerce/inventory", label: "Inventory", icon: HiSolidShoppingBag },
      { href: "/protected/ecommerce/customers", label: "Customers", icon: HiSolidUsers },
      { href: "/protected/ecommerce/promos", label: "Promotions", icon: HiSolidBolt },
    ]
  },
  {
    label: "Logistics",
    icon: HiSolidDocumentChartBar,
    children: [
      { href: "/protected/logistics/shipping", label: "Shipping", icon: HiSolidCube },
      { href: "/protected/logistics/tracking", label: "Tracking", icon: HiSolidBolt },
      { href: "/protected/logistics/warehouses", label: "Warehouses", icon: HiSolidSquare3Stack3d },
    ]
  },
  {
    label: "Security",
    icon: HiSolidShieldCheck,
    children: [
      { href: "/protected/security/audit", label: "Audit Logs", icon: HiSolidDocumentChartBar },
      { href: "/protected/security/permissions", label: "Permissions", icon: HiSolidUsers },
      { href: "/protected/security/threats", label: "Threat Center", icon: HiSolidBolt },
    ]
  },
  {
    label: "Resource Library",
    icon: HiSolidBookOpen,
    children: [
      { href: "/protected/resources/docs", label: "Documentation", icon: HiSolidDocumentChartBar },
      { href: "/protected/resources/assets", label: "Asset Manager", icon: HiSolidCube },
      { href: "/protected/resources/backups", label: "System Backups", icon: HiSolidBolt },
    ]
  },
  {
    label: "Systems Management",
    icon: HiSolidCog6Tooth,
    children: [
      { href: "/protected/systems/status", label: "Server Status", icon: HiSolidBolt },
      { href: "/protected/systems/logs", label: "Error Logs", icon: HiSolidDocumentChartBar },
      { href: "/protected/systems/config", label: "Global Config", icon: HiSolidCog6Tooth },
    ]
  },
  {
    label: "Global Expansion",
    icon: HiSolidGlobeAlt,
    children: [
      { href: "/protected/global/regions", label: "Regions", icon: HiSolidCube },
      { href: "/protected/global/locales", label: "Localizations", icon: HiSolidSwatch },
    ]
  },
  {
    label: "Human Resources",
    icon: HiSolidUsers,
    children: [
      { href: "/protected/hr/employees", label: "Employee List", icon: HiSolidUserCircle },
      { href: "/protected/hr/payroll", label: "Payroll", icon: HiSolidShoppingBag },
    ]
  },
  {
    label: "Financials",
    icon: HiSolidChartPie,
    children: [
      { href: "/protected/finance/revenue", label: "Revenue", icon: HiSolidBolt },
      { href: "/protected/finance/expenses", label: "Expenses", icon: HiSolidShoppingBag },
    ]
  },
];
