/**
 *
 * Do not remove the Prisma query that upserts the shop to `true`.
 *
 */
import prisma from "./prisma";

/**
 * @async
 * @function freshInstall
 * @param {Object} params - The function parameters container.
 * @param {string} params.shop - The shop URL in the format '*.myshopify.com'.
 * @param {string} params.settingsContent
 */
const freshInstall = async ({ shop, settingsContent }) => {
  try {
    // create a shop entry in stores

    await prisma.stores.upsert({
      where: {
        shop,
      },
      update: {
        shop: shop,
        isActive: true,
      },
      create: {
        shop: shop,
        isActive: true,
      },
    });

    await prisma.dayDelivery.upsert({
      where: {
        shop: onlineSession.shop,
      },
      update: {
        content: settingsContent,
      },
      create: {
        shop: onlineSession.shop,
        content: settingsContent,
      },
    });

    //Other functions start here
  } catch (e) {
    console.error(
      `---> An error occured in freshInstall function: ${e.message}`,
      e
    );
  }
};

export default freshInstall;
