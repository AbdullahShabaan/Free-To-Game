import { UiHome } from "./Ui.Module.js";
import { replaceSectionMethod } from "./Details.Module.js";
const categoryCache = {};
class Home {
  constructor() {
    this.getCategory();
    this.handleLoading(true);
    this.getGames("mmorpg").then((games) => {
      categoryCache.mmorpg = games;
      UiHome(games);
      this.handleLoading(false);
      this.getVideo();
    });
  }

  async getGames(category) {
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "0c5e97709bmsh5b3269501ab000cp173a5bjsnf23774facc58",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    try {
      const req = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
        options
      );
      const reqData = await req.json();

      return reqData;
    } catch (e) {
      console.log(e);
    }
  }

  getVideo() {
    const game = document.querySelectorAll(".game-photo");
    game.forEach((e) => {
      const image = e.children[0];
      const video = e.children[1];
      const loader = e.children[2];
      let isVideoPlaying = false;
      e.addEventListener("mouseenter", () => {
        const newSrc = video.querySelector("source").getAttribute("data-src");
        video.querySelector("source").src = `${newSrc}`;
        video.load();
        if (video.readyState >= 2) {
          showVideo();
        } else {
          loader.classList.remove("d-none");
          video.onloadeddata = showVideo;
        }
      });
      e.addEventListener("mouseleave", () => {
        if (isVideoPlaying) {
          video.pause();
          isVideoPlaying = false;
        }
        image.classList.remove("d-none");
        video.classList.add("d-none");
        loader.classList.add("d-none");
      });
      function showVideo() {
        video.classList.remove("d-none");
        image.classList.add("d-none");
        loader.classList.add("d-none");
        video.play();
        isVideoPlaying = true;
      }
    });
  }

  getCategory() {
    const btns = document.querySelectorAll(".navbar-nav .nav-item");
    btns.forEach((b) => {
      b.addEventListener("click", (e) => {
        const category = e.target.dataset.category;
        if (categoryCache[category]) {
          UiHome(categoryCache[category]);
          this.getVideo();
        } else {
          this.handleLoading(true);
          this.getGames(category).then((games) => {
            categoryCache[category] = games;
            UiHome(games);
            this.handleLoading(false);
            this.getVideo();
          });
        }
        this.handleActive(e.target);
      });
    });
  }

  handleActive(e) {
    const btns = document.querySelectorAll(".navbar-nav .nav-item .nav-link");
    btns.forEach((b) => {
      b.classList.remove("active");
    });
    e.classList.add("active");
  }
  handleLoading(status) {
    if (status) {
      replaceSectionMethod("games", "loader-screen");
    } else {
      replaceSectionMethod("loader-screen", "games");
    }
  }
}

export default Home;
