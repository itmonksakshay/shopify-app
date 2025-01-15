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
 * @param {string} params.countdownWidget
 */
const freshInstall = async ({ shop, settingsContent, countdownWidget }) => {
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
        shop: shop,
      },
      update: {
        content: settingsContent,
      },
      create: {
        shop: shop,
        content: settingsContent,
      },
    });

    await prisma.countdownWidget
      .upsert({
        where: {
          shop: shop,
        },
        update: {
          content: countdownWidget,
        },
        create: {
          shop: shop,
          content: countdownWidget,
        },
      })
      .then((response) => console.log(response))
      .catch((e) => console.log(e.message, "error"));

    //Other functions start here
  } catch (e) {
    console.error(
      `---> An error occured in freshInstall function: ${e.message}`,
      e
    );
  }
};

export default freshInstall;
