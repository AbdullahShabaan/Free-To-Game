import { displayDetailsMethod } from "./Ui.Module.js";
const detailsCache = {};
class Details {
  async getGame(id) {
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "0c5e97709bmsh5b3269501ab000cp173a5bjsnf23774facc58",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    try {
      const req = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
        options
      );
      const data = await req.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  handleDetailsCache(id) {
    if (detailsCache[id]) {
      details.replaceSection("games", "details");
      displayDetailsMethod(detailsCache[id]);
    } else {
      details.replaceSection("games", "loader-screen");
      details.getGame(id).then((data) => {
        displayDetailsMethod(data);
        detailsCache[id] = data;
      });
    }
    document.title = "Details Game";
    details.backToHome();
  }

  replaceSection(oldSection, newSection) {
    document.querySelector(`.${oldSection}`).classList.add("d-none");
    document.querySelector(`.${newSection}`).classList.remove("d-none");
  }

  backToHome() {
    const btn = document.querySelector(".btn-close");
    btn.addEventListener("click", () => {
      replaceSectionMethod("details", "games");
      document.title = "Home";
    });
  }
}

const details = new Details();
export const detailsCacheHandeler = details.handleDetailsCache;
export const replaceSectionMethod = details.replaceSection;
