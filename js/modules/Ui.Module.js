import {
  detailsCacheHandeler,
  replaceSectionMethod,
} from "./Details.Module.js";
class Ui {
  DisplayHome(dataValues) {
    let data = "";
    dataValues.forEach((game) => {
      const video = game.thumbnail.replace(
        "thumbnail.jpg",
        "videoplayback.webm"
      );
      let games = `<div class="col-md-6 col-lg-3">
                    <div class="card game" 
                     onclick="ui.getId(${game.id})">
                        <div class="pad px-3 pt-3 pb-0 overflow-hidden">
                            <div class="game-photo position-relative">
                                <img src="${
                                  game.thumbnail
                                }" class="card-img-top" alt="
                                ${game.title}">
                                <video  class="d-none h-100 w-100" controled muted>
                                <source data-src="${video}" >
                                </video> 
                                <span class="loader-video position-absolute d-none"></span>
                            </div>
                            <div class="card-body px-0 text-center">
                                <div class="header d-flex justify-content-between">
                                    <h5 class="card-title">${game.title}</h5>
                                    <span class="btn btn-primary btn-sm">Free</span>
                                </div>
                                <p class="card-text opacity-50">${game.short_description.split(
                                  " ",
                                  8
                                )}
                                </p>
                            </div>
                        </div>
                        <div class="card-footer d-flex justify-content-between py-2">
                            <span class="badge badge-color">${game.genre}</span>
                            <span class="badge badge-color">${
                              game.platform
                            }</span>
                        </div>
                    </div>
                </div>`;
      data += games;
    });
    document.getElementById("games").innerHTML = data;
  }

  getId(id) {
    detailsCacheHandeler(id);
  }

  displayDetails(data) {
    const detailsContent = document.getElementById("details-content");
    const { title, description, thumbnail, platform, status, genre, game_url } =
      data;
    replaceSectionMethod("loader-screen", "details");
    let content = ` <div class="col-md-4 photo">
                        <img src="${thumbnail}" class="w-100" alt="${thumbnail}">
                    </div>
                    <div class="col-md-8 info text-white">
                        <h3>Title: ${title}</h3>
                        <p>Category: <span class="badge text-bg-info">${genre}</span></p>
                        <p>Platform: <span class="badge text-bg-info">${platform}</span></p>
                        <p>Status: <span class="badge text-bg-info">${status}</span></p>
                        <p class="small">${description}</p>
                        <a class="btn btn-outline-warning text-white" href="${game_url}">Show Game</a>
                    </div>`;

    detailsContent.innerHTML = content;
  }
}

const ui = new Ui();
window.ui = ui;
export const UiHome = ui.DisplayHome.bind(ui);
export const displayDetailsMethod = ui.displayDetails;

export default Ui;
