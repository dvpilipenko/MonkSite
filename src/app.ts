import "./style.css";
import { Tick, TickPositionEnum } from "./types";

export class App {
  rightButton: HTMLDivElement;
  leftButton: HTMLDivElement;
  appContainer: HTMLDivElement;
  pagePanel: HTMLDivElement;
  pageLabelRight: HTMLDivElement;
  pageLabelTop: HTMLDivElement;
  description: HTMLDivElement;
  aboutPanel: HTMLDivElement;
  ticks: Tick[];

  constructor() {
    this.ticks = [
      {
        tickDescription: `In january 2011 after a decade of digital we opened the doors to our template.<br>
        Follow our noble eightfold path to digital enlightenment here.`,
        description: "WE ARE BREAKING <br> OUR VOW <br> OF SILENCE",
        descriptionPosition: TickPositionEnum.LeftTop,
        tickLabel: "",
        tickLabelPosition: TickPositionEnum.Top,
        imagePosition: 0,
        isActive: true,
      },
      {
        tickDescription: "Step 1 out of 8 on the path to digital enlightenment",
        description: "TALENT IS GIVEN <br> TRUE SKILL IS<br>EARNED",
        descriptionPosition: TickPositionEnum.Left,
        tickLabel: "1",
        tickLabelPosition: TickPositionEnum.Right,
        imagePosition: -1500,
      },
      {
        tickDescription: "Step 2 out of 8 on the path to digital enlightenment",
        description: "BE FLEXIBLE TO<br>CHANGE AND<br>STURDY IN<br>CONVICTION",
        descriptionPosition: TickPositionEnum.Left,
        tickLabel: "2",
        tickLabelPosition: TickPositionEnum.Right,
        imagePosition: -2500,
      },
      {
        tickDescription: "Step 3 out of 8 on the path to digital enlightenment",
        description: "USE MANY SKILLS<br>YET WORK AS ONE",
        descriptionPosition: TickPositionEnum.Right,
        tickLabel: "3",
        tickLabelPosition: TickPositionEnum.Right,
        imagePosition: -3700,
      },
      {
        tickDescription: "Step 4 out of 8 on the path to digital enlightenment",
        description: "TO MASTER<br>ANYTHING FIND<br>INTEREST IN<br>EVERYTHING",
        descriptionPosition: TickPositionEnum.Right,
        tickLabel: "4",
        tickLabelPosition: TickPositionEnum.Right,
        imagePosition: -5100,
      },
      {
        tickDescription: "Step 5 out of 8 on the path to digital enlightenment",
        description:
          "INDIVIDUALS<br>FLOURISH<br>IF CULTURE<br>AND WISDOM<br>ARE SHARED",
        descriptionPosition: TickPositionEnum.Right,
        tickLabel: "5",
        tickLabelPosition: TickPositionEnum.Right,
        imagePosition: -6600,
      },
      {
        tickDescription: "Step 6 out of 8 on the path to digital enlightenment",
        description: "TRAIN FOR<br>PERFECTION BUT<br>AIM FOR MORE",
        descriptionPosition: TickPositionEnum.Left,
        tickLabel: "6",
        tickLabelPosition: TickPositionEnum.Right,
        imagePosition: -8100,
      },
      {
        tickDescription: "Step 7 out of 8 on the path to digital enlightenment",
        description: "TAKE PRIDE IN YOUR<br>WORK BUT DO NOT<br>SEEK PRAISE",
        descriptionPosition: TickPositionEnum.Left,
        tickLabel: "7",
        tickLabelPosition: TickPositionEnum.Right,
        imagePosition: -10000,
      },
      {
        tickDescription: "Step 8 out of 8 on the path to digital enlightenment",
        description: "TEMPORARY<br>SACRIFICE BRINGS<br>LASTING RESULTS",
        descriptionPosition: TickPositionEnum.Left,
        tickLabel: "8",
        tickLabelPosition: TickPositionEnum.Right,
        imagePosition: -10000,
      },
      {
        tickDescription: "",
        description: "",
        descriptionPosition: TickPositionEnum.Left,
        tickLabel: "",
        tickLabelPosition: TickPositionEnum.Right,
        imagePosition: -11000,
        customOpenCallback: () => {
          this.aboutPanel.style.width = "50%";
        },
        customCloseCallBack: () => {
          this.aboutPanel.style.width = "0%";
        },
      },
    ];
    this.aboutPanel = document.querySelector("#about-panel");
    this.rightButton = document.querySelector("#right-button");
    this.leftButton = document.querySelector("#left-button");
    this.appContainer = document.querySelector("#app-container");
    this.pagePanel = document.querySelector("#page-panel");
    this.pageLabelRight = document.querySelector(
      "#page-panel-right-description"
    );
    this.pageLabelTop = document.querySelector("#page-panel-description");
    this.description = document.querySelector("#description");
    this.renderPagePanel();
    this.initEvents();
  }

  setActiveItem(nextTick: Tick) {
    const prevTick = this.ticks.find((item) => item.isActive);
    if (prevTick.customCloseCallBack) {
      prevTick.customCloseCallBack();
    }

    if (nextTick.customOpenCallback) {
      nextTick.customOpenCallback();
    }
    prevTick.isActive = false;
    nextTick.isActive = true;
    this.renderPagePanel();
  }

  renderPagePanel() {
    this.pagePanel.innerHTML = "";
    this.ticks.forEach((item) => {
      this.pagePanel.append(this.getPageItem(item.tickLabel, item.isActive));

      this.pagePanel.lastChild.addEventListener("click", () => {
        this.setActiveItem(item);
      });

      if (item.isActive) {
        switch (item.tickLabelPosition) {
          case TickPositionEnum.Right:
            this.pageLabelRight.innerHTML = item.tickDescription;
            this.pageLabelTop.innerHTML = "";
            break;
          case TickPositionEnum.Top:
            this.pageLabelRight.innerHTML = "";
            this.pageLabelTop.innerHTML = item.tickDescription;
            break;
        }
        this.description.innerHTML = item.description;
        switch (item.descriptionPosition) {
          case TickPositionEnum.Left:
            this.description.className = "description-left";
            break;
          case TickPositionEnum.Right:
            this.description.className = "description-right";
            break;
          case TickPositionEnum.LeftTop:
            this.description.className = "description-left-top";
            break;
        }
        this.appContainer.style.backgroundPositionX = `${item.imagePosition}px`;
      }
    });
  }

  getPageItem(label: string, isActive: boolean) {
    const page = document.createElement("div") as HTMLDivElement;
    const whiteDiv = document.createElement("div") as HTMLDivElement;
    whiteDiv.className = `page-panel__label ${
      isActive ? "page-panel__select" : ""
    }`;
    page.className = "page-panel__item";
    whiteDiv.innerHTML = label;
    page.append(whiteDiv);
    return page;
  }

  initEvents() {
    this.rightButton.addEventListener(
      "mousedown",
      this.onNavigationButtonClick.bind(this, 1)
    );

    this.leftButton.addEventListener(
      "mousedown",
      this.onNavigationButtonClick.bind(this, -1)
    );
  }

  onNavigationButtonClick(increment: number) {
    const index = this.ticks.findIndex((item) => item.isActive);
    const nextTick = this.ticks[index + increment];
    if (nextTick) {
      this.setActiveItem(nextTick);
    }
  }
}

const app = new App();
