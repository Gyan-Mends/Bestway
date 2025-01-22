import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

import styles from "~/style.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const loader: LoaderFunction = async () => {
  return {}; // any initial data you want to load
};

// SubscriptionAutoRenew Component
function SubscriptionAutoRenew() {
  const [subscriptionExpired, setSubscriptionExpired] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSubscriptionExpired(true); // Trigger the subscription expiration
    }, 60000); // 60000ms = 1 minute

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (subscriptionExpired) {
      handleRenew();
    }
  }, [subscriptionExpired]);

  const handleRenew = async () => {
    console.log("Renewing subscription...");
    setTimeout(() => {
      setSubscriptionExpired(false); // Reset subscription status
      console.log("Subscription renewed!");
    }, 2000); // Mocking an API call with a 2-second delay
  };

  return null; // No UI element for this component
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider defaultTheme="light" attribute="class">
          <NextUIProvider>
            <SubscriptionAutoRenew /> {/* Add the subscription component */}
            <Outlet />
          </NextUIProvider>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
