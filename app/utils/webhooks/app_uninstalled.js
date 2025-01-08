// To create a new webhook, create a new `.js` folder in /utils/webhooks/ and use the project snippet
// `createwebhook` to generate webhook boilerplate

/**
 * @typedef { import("@/_developer/types/2024-10/webhooks.js").APP_UNINSTALLED} AppUninstalled
 */

import prisma from "../prisma.js";

const appUninstallHandler = async (
  topic,
  shop,
  webhookRequestBody,
  webhookId,
  apiVersion
) => {
  try {
    /** @type {AppUninstalled} */
    const webhookBody = JSON.parse(webhookRequestBody);

    await prisma.session.deleteMany({ where: { shop } });
    await prisma.stores.upsert({
      where: { shop: shop },
      update: { isActive: false },
      create: { shop: shop, isActive: false },
    });
    // Step 3: Delete the `countdown_widget` record for the given shop
    await prisma.countdown_widget.delete({
      where: { shop: shop }, // This deletes the countdown_widget record where `shop = "my-shop"`
    });

    // Step 4: Delete the `datepicker_widget` record for the given shop
    await prisma.datepicker_widget.delete({
      where: { shop: shop }, // This deletes the datepicker_widget record where `shop = "my-shop"`
    });
  } catch (e) {
    console.error(e);
  }
};

export default appUninstallHandler;
