import withMiddleware from "@/utils/middleware/withMiddleware.js";
import prisma from "@/utils/prisma";

/**
 * @param {import("next").NextApiRequest} req - The HTTP request object.
 * @param {import("next").NextApiResponse} res - The HTTP response object.
 */
const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const response = await prisma.dayDelivery.findFirst({
        where: { shop: req.user_shop },
      });
      return res.status(200).send(response);
    } catch (e) {
      return res.status(400).send({ text: "Bad request" });
    }
  } else {
    res.status(400).send({ text: "Bad request" });
  }
};

export default withMiddleware("verifyRequest")(handler);
