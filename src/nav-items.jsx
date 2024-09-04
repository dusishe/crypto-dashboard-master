import { HomeIcon, KeyIcon, SettingsIcon, BarChartIcon, MessageSquareIcon } from "lucide-react";
import Dashboard from "./pages/Dashboard.jsx";
import ApiKeys from "./pages/ApiKeys.jsx";
import TelegramSettings from "./pages/TelegramSettings.jsx";
import AccountSettings from "./pages/AccountSettings.jsx";
import Statistics from "./pages/Statistics.jsx";
import TradingSignals from "./pages/TradingSignals.jsx";
import Login from "./pages/Login.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Dashboard />,
  },
  {
    title: "API Keys",
    to: "/api-keys",
    icon: <KeyIcon className="h-4 w-4" />,
    page: <ApiKeys />,
  },
  {
    title: "Telegram Settings",
    to: "/telegram-settings",
    icon: <MessageSquareIcon className="h-4 w-4" />,
    page: <TelegramSettings />,
  },
  {
    title: "Account Settings",
    to: "/account-settings",
    icon: <SettingsIcon className="h-4 w-4" />,
    page: <AccountSettings />,
  },
  {
    title: "Statistics",
    to: "/statistics",
    icon: <BarChartIcon className="h-4 w-4" />,
    page: <Statistics />,
  },
  {
    title: "Trading Signals",
    to: "/trading-signals",
    icon: <BarChartIcon className="h-4 w-4" />,
    page: <TradingSignals />,
  },
];

export const loginRoute = {
  title: "Login",
  to: "/",
  page: <Login />,
};