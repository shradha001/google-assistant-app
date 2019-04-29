const {
  actionssdk,
  BasicCard,
  Button,
  Carousel,
  Image,
  LinkOutSuggestion,
  List,
  Media,
  Suggestions,
  SimpleResponse
} = require("actions-on-google");

const app = actionssdk({ debug: true });

const intentSuggestions = ["Basic Card", "Carousel", "List", "Suggestions"];

// Constants for list and carousel selection
const SELECTION_KEY_GOOGLE_ALLO = "googleAllo";
const SELECTION_KEY_GOOGLE_HOME = "googleHome";
const SELECTION_KEY_GOOGLE_PIXEL = "googlePixel";
const SELECTION_KEY_ONE = "title";

// Constants for image URLs
const IMG_URL_AOG =
  "https://developers.google.com/actions/images/badges" +
  "/XPM_BADGING_GoogleAssistant_VER.png";
const IMG_URL_GOOGLE_ALLO = "https://allo.google.com/images/allo-logo.png";
const IMG_URL_GOOGLE_HOME =
  "https://lh3.googleusercontent.com" +
  "/Nu3a6F80WfixUqf_ec_vgXy_c0-0r4VLJRXjVFF_X_CIilEu8B9fT35qyTEj_PEsKw";
const IMG_URL_GOOGLE_PIXEL =
  "https://storage.googleapis.com/madebygoog/v1" +
  "/Pixel/Pixel_ColorPicker/Pixel_Device_Angled_Black-720w.png";

// Constants for selected item responses
const SELECTED_ITEM_RESPONSES = {
  [SELECTION_KEY_ONE]: "You selected the first item in the list or carousel",
  [SELECTION_KEY_GOOGLE_HOME]: "You selected the Google Home!",
  [SELECTION_KEY_GOOGLE_PIXEL]: "You selected the Google Home!",
  [SELECTION_KEY_GOOGLE_PIXEL]: "You selected the Google Pixel!",
  [SELECTION_KEY_GOOGLE_ALLO]: "You selected Google Allo!"
};

app.middleware(conv => {
  conv.hasScreen = conv.surface.capabilities.has(
    "actions.capability.SCREEN_OUTPUT"
  );
  conv.hasAudioPlayback = conv.surface.capabilities.has(
    "actions.capability.AUDIO_OUTPUT"
  );
});

// Welcome
app.intent("actions.intent.MAIN", conv => {
  console.log("*************** CALLING MAIN INTENT **********************");
  conv.ask(
    new SimpleResponse({
      speech:
        "Welcome to Sample bot. Demonstrates you basic cards, lists and carousels",
      text:
        "Welcome to Sample bot. Demonstrates you basic cards, lists and carousels"
    })
  );
  conv.ask(new Suggestions(intentSuggestions));
});

// React to a text intent
app.intent("actions.intent.TEXT", (conv, input) => {
  console.log("*************** CALLING TEXT INTENT **********************");
  let userInput = input.toLowerCase();
  console.log("USER INPUT TEXT " + userInput);
  if (userInput === "basic card") {
    showBasicCard(conv);
  } else if (userInput === "list") {
    showList(conv);
  } else if (userInput === "carousel") {
    showCarousel(conv);
  } else if (userInput === "suggestions" || userInput === "suggestion chips") {
    showSuggestions(conv);
  } else if (userInput === "bye") {
    showNormalBye(conv);
  } else if (userInput === "bye card") {
    showByeCard(conv);
  } else if (userInput === "bye response") {
    showByeResponse(conv);
  } else {
    showHelp(conv);
  }
});

// React to list or carousel selection
app.intent("actions.intent.OPTION", (conv, params, option) => {
  let response = "You did not select any item from the list or carousel";
  if (option && SELECTED_ITEM_RESPONSES.hasOwnProperty(option)) {
    response = SELECTED_ITEM_RESPONSES[option];
  } else {
    response = "You selected an unknown item from the list or carousel";
  }
  conv.ask(response);
});

const showBasicCard = function basicCard(conv) {
  if (!conv.hasScreen) {
    conv.ask(
      "Sorry, try this on a screen device or select the " +
        "phone surface in the simulator."
    );
    return;
  }
  conv.ask("Response for basic card.");
  conv.ask(new Suggestions(intentSuggestions));
  // Create a basic card
  conv.ask(
    new BasicCard({
      text: `This is a basic card.  Text in a basic card can include "quotes" and
      most other unicode characters including emoji 📱.  Basic cards also support
      some markdown formatting like *emphasis* or _italics_, **strong** or
      __bold__, and ***bold itallic*** or ___strong emphasis___ as well as other
      things like line  \nbreaks`, // Note the two spaces before '\n' required for
      // a line break to be rendered in the card.
      subtitle: "This is a subtitle",
      title: "Title: this is a title",
      buttons: new Button({
        title: "This is a button",
        url: "https://assistant.google.com/"
      }),
      image: new Image({
        url: IMG_URL_AOG,
        alt: "Image alternate text"
      })
    })
  );
};

const showList = function list(conv) {
  if (!conv.hasScreen) {
    conv.ask(
      "Sorry, try this on a screen device or select the " +
        "phone surface in the simulator."
    );
    return;
  }
  conv.ask("Response for List.");
  conv.ask(new Suggestions(intentSuggestions));
  // Create a list
  conv.ask(
    new List({
      title: "List Title",
      items: {
        // Add the first item to the list
        [SELECTION_KEY_ONE]: {
          synonyms: [
            "synonym of title 1",
            "synonym of title 2",
            "synonym of title 3"
          ],
          title: "Title of First List Item",
          description: "This is a description of a list item.",
          image: new Image({
            url: IMG_URL_AOG,
            alt: "Image alternate text"
          })
        },
        // Add the second item to the list
        [SELECTION_KEY_GOOGLE_HOME]: {
          synonyms: ["Google Home Assistant", "Assistant on the Google Home"],
          title: "Google Home",
          description:
            "Google Home is a voice-activated speaker powered by " +
            "the Google Assistant.",
          image: new Image({
            url: IMG_URL_GOOGLE_HOME,
            alt: "Google Home"
          })
        },
        // Add the third item to the list
        [SELECTION_KEY_GOOGLE_PIXEL]: {
          synonyms: ["Google Pixel XL", "Pixel", "Pixel XL"],
          title: "Google Pixel",
          description: "Pixel. Phone by Google.",
          image: new Image({
            url: IMG_URL_GOOGLE_PIXEL,
            alt: "Google Pixel"
          })
        },
        // Add the last item to the list
        [SELECTION_KEY_GOOGLE_ALLO]: {
          title: "Google Allo",
          synonyms: ["Allo"],
          description:
            "Introducing Google Allo, a smart messaging app that " +
            "helps you say more and do more.",
          image: new Image({
            url: IMG_URL_GOOGLE_ALLO,
            alt: "Google Allo Logo"
          })
        }
      }
    })
  );
};

const showCarousel = function carousel(conv) {
  if (!conv.hasScreen) {
    conv.ask(
      "Sorry, try this on a screen device or select the " +
        "phone surface in the simulator."
    );
    return;
  }
  conv.ask("Response for a carousel.");
  conv.ask(new Suggestions(intentSuggestions));
  // Create a carousel
  conv.ask(
    new Carousel({
      items: {
        // Add the first item to the carousel
        [SELECTION_KEY_ONE]: {
          synonyms: [
            "synonym of title 1",
            "synonym of title 2",
            "synonym of title 3"
          ],
          title: "Title of First Carousel Item",
          description: "This is a description of a carousel item.",
          image: new Image({
            url: IMG_URL_AOG,
            alt: "Image alternate text"
          })
        },
        // Add the second item to the carousel
        [SELECTION_KEY_GOOGLE_HOME]: {
          synonyms: ["Google Home Assistant", "Assistant on the Google Home"],
          title: "Google Home",
          description:
            "Google Home is a voice-activated speaker powered by " +
            "the Google Assistant.",
          image: new Image({
            url: IMG_URL_GOOGLE_HOME,
            alt: "Google Home"
          })
        },
        // Add third item to the carousel
        [SELECTION_KEY_GOOGLE_PIXEL]: {
          synonyms: ["Google Pixel XL", "Pixel", "Pixel XL"],
          title: "Google Pixel",
          description: "Pixel. Phone by Google.",
          image: new Image({
            url: IMG_URL_GOOGLE_PIXEL,
            alt: "Google Pixel"
          })
        },
        // Add last item of the carousel
        [SELECTION_KEY_GOOGLE_ALLO]: {
          title: "Google Allo",
          synonyms: ["Allo"],
          description:
            "Introducing Google Allo, a smart messaging app that " +
            "helps you say more and do more.",
          image: new Image({
            url: IMG_URL_GOOGLE_ALLO,
            alt: "Google Allo Logo"
          })
        }
      }
    })
  );
};

const showSuggestions = function suggestions(conv) {
  if (!conv.hasScreen) {
    conv.ask(
      "Sorry, try this on a screen device or select the " +
        "phone surface in the simulator."
    );
    return;
  }
  conv.ask("Response for suggestions.");
  conv.ask(new Suggestions("Suggestion Chips"));
  conv.ask(new Suggestions(intentSuggestions));
  conv.ask(
    new LinkOutSuggestion({
      name: "Suggestion Link",
      url: "https://assistant.google.com/"
    })
  );
};

const showByeCard = function byeCard(conv) {
  if (!conv.hasScreen) {
    conv.ask(
      "Sorry, try this on a screen device or select the phone " +
        "surface in the simulator."
    );
    return;
  }
  conv.ask("Goodbye!");
  conv.close(
    new BasicCard({
      text: "This is a goodbye card."
    })
  );
};

const showByeResponse = function byeResponse(conv) {
  conv.close(
    new SimpleResponse({
      speech: "Okay see you later",
      text: "OK see you later!"
    })
  );
};

const showNormalBye = function normalBye(conv) {
  conv.close("Okay see you later!");
};

const showHelp = function normalAsk(conv) {
  conv.ask("Ask me to show you a list, carousel, or basic card.");
  conv.ask(new Suggestions(intentSuggestions));
};

const execute = function handleRequestFromGA(req, res) {
  console.log(
    "************ GOT A MESSAGE HOOK FROM GOOGLE ASSISTANT **************"
  );
  app(req, res);
};

module.exports = {
  execute: execute
};
