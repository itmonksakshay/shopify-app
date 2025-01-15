import { RequestedTokenType } from "@shopify/shopify-api";
import sessionHandler from "../sessionHandler";
import shopify from "../shopify";
import freshInstall from "../freshInstall";
import prisma from "../prisma";
import { timezoneValues } from "../constatns/timezoneValues";

/**
 * Handles initial load for Shopify app installation.
 * @async
 * @param {Object} context - The context object, including query, session, etc.
 * @returns {Promise<{props: { [key: string]: any } | undefined}>} Object with props for the page component.
 */
const isInitialLoad = async (context) => {
  try {
    const { shop, id_token: idToken } = context.query;

    // Initial Load - Process only if idToken and shop are provided
    if (idToken && shop) {
      const { session: offlineSession } = await shopify.auth.tokenExchange({
        sessionToken: idToken,
        shop,
        requestedTokenType: RequestedTokenType.OfflineAccessToken,
      });

      const { session: onlineSession } = await shopify.auth.tokenExchange({
        sessionToken: idToken,
        shop,
        requestedTokenType: RequestedTokenType.OnlineAccessToken,
      });

      await sessionHandler.storeSession(offlineSession);
      await sessionHandler.storeSession(onlineSession);

      // Check if the store is a fresh install or a reinstall
      const isFreshInstall = await prisma.stores.findFirst({
        where: { shop: onlineSession.shop },
      });

      if (!isFreshInstall || isFreshInstall?.isActive === false) {
        // Handle new install or reinstall
        const shopData = await fetchShopData(onlineSession);

        const storeTimezone =
          timezoneValues.find((item) => item.offset === shopData.timezoneOffset)
            ?.value || ""; // Default to empty string if timezone is not found

        const settingsContent = JSON.stringify({
          defaultCutoffTime: "13:00",
          storeHolidays: [],
          weeklyOffDays: [],
          storeTimezone,
        });

        const countdownWidget = JSON.stringify({
          containerLayout: {
            backgroundColor: "#00ff00",
            width: "100%",
            paddingTop: "10px",
            paddingBotom: "10px",
            borderWidth: "1px",
            borderRadius: "2px",
            borderStyle: "solid",
            borderColor: "#000000",
            overflow: "hidden",
          },
          titleLayout: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderBottomWidth: "1px",
            borderBottomColor: "#000000",
            borderBottomStyle: "solid",
            backgroundColor: "#00ff00",
            color: "#000000",
            paddingTop: "5px",
            paddingBottom: "5px",
            paddingRight: "20px",
            paddingLeft: "20px",
            fontSize: "12px",
            fontWeight: "400",
          },
          dateSubtitleLayout: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderBottomWidth: "1px",
            borderBottomColor: "#000000",
            borderBottomStyle: "solid",
            backgroundColor: "#00ff00",
            color: "#000000",
            paddingTop: "5px",
            paddingBottom: "5px",
            paddingRight: "20px",
            paddingLeft: "20px",
            fontSize: "12px",
            fontWeight: "400",
          },
          globalSettings: {
            title: "Same Day Delivery",
            isTitleActive: true,
            isSubtitleActive: true,
            subtitle: "For Fast Delivery Today",
          },
        });

        // Run the fresh install process
        await freshInstall({
          shop: onlineSession.shop,
          settingsContent,
          countdownWidget,
        });
      }
    } else {
      // Handle case where idToken is missing (the user has visited the page again without params)
      console.log(
        "No idToken or shop in query parameters. Skipping initial load process."
      );
    }

    return {
      props: {
        data: "ok", // This is the success response, can be extended with other data if needed
      },
    };
  } catch (e) {
    if (
      e.message.includes("Failed to parse session token") &&
      process.env.NODE_ENV === "development"
    ) {
      console.warn(
        "JWT Error - happens in dev mode and can be safely ignored, but not in prod."
      );
    } else {
      console.error(`---> An error occurred in isInitialLoad: ${e.message}`, e);
      return {
        props: {
          serverError: true, // Send error flag in response for error handling in frontend
        },
      };
    }
    return {
      props: {
        data: "ok", // This ensures the function returns something even in case of error
      },
    };
  }
};

/**
 * Fetch shop data from Shopify using GraphQL
 * @async
 * @param {Object} session - The session object containing shop details and access token.
 * @returns {Promise<Object>} - Returns the shop data from Shopify API.
 */
const fetchShopData = async (session) => {
  if (!session || !session?.accessToken || !session.shop) {
    throw new Error("Invalid session object passed to fetchShopData");
  }
  const client = new shopify.clients.Graphql({ session });

  try {
    const response = await client.request(`{  shop {
      name
      myshopifyDomain
      currencyCode
      timezoneOffset
      timezoneAbbreviation
    }}`);
    if (response.data?.shop) {
      return response.data.shop;
    }

    throw new Error("No shop data returned from Shopify API.");
  } catch (error) {
    console.error("Error fetching Shopify data:", error);
    throw new Error("Error fetching Shopify data");
  }
};

export default isInitialLoad;
