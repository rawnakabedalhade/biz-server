import { createCard, createUser } from "../model/dbAdapter.js";
import generateUniqNumber from "../utils/generateUniqNumber.js";
import debug from "debug";

const initialUsers = async () => {
  let users = [
    {
      name: {
        first: "rawnak",
        last: "shihab",
      },
      phone: "05024711464",
      email: "rawnak@gmail.com",
      password: "$2a$10$rOKmdzSaUFv2OF5giTT/HO.g3t4MujQJl98cAyKbfP11JKInv43PS",
      image: {
        url: "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
        alt: "profile picture",
      },
      address: {
        country: "Israel",
        city: "Iksal",
        street: "Main Street",
        houseNumber: 1234,
        zip: 94107,
      },
      isBusiness: true,
      isAdmin: true,
    },
    {
      name: {
        first: "rawnak2",
        last: "shihab2",
      },
      phone: "05024711462",
      email: "rabed2@gmail.com",
      password: "$2a$10$A./.k3mJpPiBaqxlrBwZG..QaftAJDpnwDiqNcLZtOZwiAErRP57.",
      image: {
        url: "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
        alt: "profile picture",
      },
      address: {
        country: "Israel",
        city: "Iksal",
        street: "Main Street",
        houseNumber: 1234,
        zip: 94107,
      },
      isBusiness: true,
      isAdmin: false,
    },
  ];
  try {
    let bizId = "";
    for (let user of users) {
      let userFromDb = await createUser(user);
      if (!user.isAdmin && user.isBusiness) {
        bizId = userFromDb._id;
      }
    }
    return bizId;
  } catch (err) {
    let logger = debug("app:initialData");
    logger("error from initialUser", err);
  }
};

const initialCards = async (bizId) => {
  let cards = [
    {
      title: "title",
      subtitle: "subtitle",
      description: "description",
      phone: "05024711464",
      email: "r3@gmail.com",
      web: "www.google.com",
      image: {
        url: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        alt: "card default picture",
      },
      address: {
        country: "Israel",
        city: "Iksal",
        street: "Main Street",
        houseNumber: 12,
        zip: 94107,
      },
      bizNumber: await generateUniqNumber(),
      user_id: bizId,
    },
    {
      title: "title2",
      subtitle: "subtitle2",
      description: "description2",
      phone: "05024711462",
      email: "r4@gmail.com",
      web: "www.google.com",
      image: {
        url: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        alt: "card default picture",
      },
      address: {
        country: "Israel",
        city: "Iksal",
        street: "Main Street",
        houseNumber: 12,
        zip: 94107,
      },
      bizNumber: await generateUniqNumber(),
      user_id: bizId,
    },
  ];
  try {
    for (let card of cards) {
      await createCard(card);
    }
  } catch (err) {
    let logger = debug("app:initialData");
    logger("error from initialCards", err);
  }
};
export { initialUsers, initialCards };
