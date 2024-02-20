import generateUniqNumber from "../utils/generateUniqNumber.js";
import debug from "debug";
const normalizeCard = async (card) => {
  const logger = debug("app:normalizeCard");
  try {
    let image = {};
    image = {
      ...card.image,
      url:
        card.image.url ||
        "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg",
      alt: card.image.alt || "default card image",
    };
    if (card.image.alt && !card.image.url) {
      image = {
        url: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg",
        alt: "default card image",
      };
    }
    return {
      ...card,
      image,
      address: {
        ...card.address,
        state: card.address.state || undefined,
      },
      web: card.web || undefined,
      zip: card.zip || 0,
      bizNumber: card.bizNumber || (await generateUniqNumber()),
    };
  } catch (err) {
    logger(err);
  }
};

export default normalizeCard;
