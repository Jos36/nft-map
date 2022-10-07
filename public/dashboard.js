/** @format */
import { get, add, getRequests, getUsers, getCompanies } from "./api.js ";
import { statessHead6, statessHead12, statessHead24 } from "./statess.js";

const premuim = [
  [-24, -36],
  [0, -32],
  [-36, -24],
  [-36, -36],
  [-48, -24],
];

function grid() {
  let formType = "person";
  const d3 = window.d3;
  const factor = 100;
  let isLoading = true;
  let data = null;

  function openNav(key) {
    let indicators = document.getElementById("indicators");
    let location = document.getElementById("com_location");
    let name = document.getElementById("com_name");
    let desc = document.getElementById("com_description");
    let slides = document.getElementById("slides");
    let links = document.getElementById("com_links");
    let loader = document.getElementById("loader");
    let landInfo = document.getElementById("landInfo");

    //  open navbar
    document.getElementById("myNav").style.width = "30%";

    //  fetch info from the database for a specific land

    if (key.state) {
      console.log("key", key);
      if (isLoading) {
        landInfo.classList.add("hidden");
      } else {
        loader.classList.add("hidden");
        const lands = key.state[`${key.x},${key.y}`];
        document.getElementById("lands-list").innerHTML = lands
          .map(
            (
              land
            ) => `<div class="m-0 mt-2 blockquote" style="color: greenyellow; min-width:100px;">
          <i class="fa-solid fa-location-dot text-danger"></i>
          <small id="com_location">${land.x},${land.y}</small>
        </div>`
          )
          .join("");
      }
    }

    if (key) {
      if (isLoading) {
        landInfo.classList.add("hidden");
      } else {
        const landInfo = data[`${key.x},${key.y}`];
        console.log(data);
        console.log(landInfo);
        if (landInfo) {
          loader.classList.add("hidden");
          location.textContent = `${key.x},${key.y}`;

          name.textContent = landInfo.name ? landInfo.name : "MetaBitz";
          desc.innerHTML = ` <p>${
            landInfo.description
              ? landInfo.description
              : ` <p> The Metabitz is a community-driven platform where investors can monetize assets, build experiences, networking, business, and negotiation through the cannabis market on the blockchain.</p>
            <p>The Metabitz metaverse compromises to build a MAP made up of 142.000 M2bitz. M2bitz owners can host content and events, stake CBZTOKEN to earn and customize assets, monetize assets and experiences, vote in the metaverse governance, do business, network, and more, everything connected with cannabis marketing. Also, you can trade your M2bitz ownership to get a profit with the valorization in that movement, that is going to the new digital future. Visit our project</p>`
          }</p>`;
          if (landInfo.links[0]) {
            links.innerHTML = ` <a href='${landInfo.links[0]}'>${landInfo.links[0]}</a>`;
          }
          slides.innerHTML = `<div class="carousel-item active"><img src=${
            landInfo.images[0] ? landInfo.images[0] : "/assets/logo.png"
          } width="250px" height="250px" class="d-inline-block " alt=""></div>
                            <div class="carousel-item "><img src=${
                              landInfo.images[1]
                                ? landInfo.images[1]
                                : "/assets/logo.png"
                            } width="250px" height="250px" class="d-inline-block" alt=""></div>
                            <div class="carousel-item "><img src=${
                              landInfo.images[2]
                                ? landInfo.images[2]
                                : "/assets/logo.png"
                            } width="250px" height="250px" class="d-inline-block" alt=""></div>`;

          indicators.innerHTML = `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" class="" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" class="" aria-current="true" aria-label="Slide 1"></button>`;
          video.src = landInfo.videos[0]
            ? landInfo.videos[0]
            : "/assets/video.mp4";
          video.play();
        } else {
          loader.classList.add("hidden");
          location.textContent = `${key.x},${key.y}`;

          name.textContent = "MetaBitz";
          desc.innerHTML = ` <p> The Metabitz is a community-driven platform where investors can monetize assets, build experiences, networking, business, and negotiation through the cannabis market on the blockchain.</p>
                    <p>The Metabitz metaverse compromises to build a MAP made up of 142.000 M2bitz. M2bitz owners can host content and events, stake CBZTOKEN to earn and customize assets, monetize assets and experiences, vote in the metaverse governance, do business, network, and more, everything connected with cannabis marketing. Also, you can trade your M2bitz ownership to get a profit with the valorization in that movement, that is going to the new digital future. Visit our project</p>`;

          slides.innerHTML = `<div class="carousel-item active"><img src="./assets/logo.png" width="250px" height="250px" class="d-inline-block " alt=""></div>
                            <div class="carousel-item "><img src="./assets/logo.png" width="250px" height="250px" class="d-inline-block" alt=""></div>
                            <div class="carousel-item "><img src="./assets/logo.png" width="250px" height="250px" class="d-inline-block" alt=""></div>`;

          indicators.innerHTML = `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" class="" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" class="" aria-current="true" aria-label="Slide 1"></button>`;
          video.src = "/assets/video.mp4";
          video.play();
          return;
        }
      }
    }
  }

  function handleZoom(e) {
    d3.select("svg#mapSvg > g").attr("transform", e.transform);
    d3.select("svg#mapSvgdash > g").attr("transform", e.transform);
  }
  const zoom = d3.zoom().on("zoom", handleZoom);

  const createStates = (number) => {
    const stateRect = {};
    const startPos = window.states[number];
    for (const start of startPos) {
      const rect = [];
      for (let i = 0; i < number; i++) {
        for (let j = 0; j < number; j++) {
          const pos = { x: start[0] + i, y: start[1] + j };
          rect.push(pos);
        }
      }
      stateRect[`${start[0]},${start[1]}`] = rect;
    }
    return stateRect;
  };

  function reset() {
    const grid = d3.select("svg#mapSvg");
    const container = grid.node().getBoundingClientRect();
    const width = container.width;
    const height = container.height;
    const x0 = -150 * factor;
    const x1 = 150 * factor;
    const y0 = -47 * factor;
    const y1 = 48 * factor;

    const aspectWidth = x1 - x0;
    const aspectHeight = y1 - y0;

    const xScale = (width / aspectWidth) * 0.95;
    const yScale = (height / aspectHeight) * 0.98;
    const minScale = Math.min(xScale, yScale);

    const start = d3.zoomIdentity
      .translate(width / 2, height / 2)
      .scale(minScale)
      .translate(-(x0 + x1) / 2, -(y0 + y1) / 2);

    zoom.transform(grid, start);
    grid.call(zoom.transform, start);
  }

  /* Open when someone clicks on the span element */
  let video = document.getElementById("com_video");

  const resetSelections = () => {
    d3.selectAll("rect.square").style("fill", "#04e38b");
    d3.selectAll("rect.square24").style("stroke", "#fff");
    d3.selectAll("rect.square12").style("stroke", "#fff");
    d3.selectAll("rect.square6").style("stroke", "#fff");
  };

  const clickLand = function (e, x, y, rects) {
    e.preventDefault();
    e.stopPropagation();

    jQuery("#view-lands-button").hide();

    var mousePos = e.target.__data__;

    resetSelections();
    d3.select(
      e.target.textContent !== ""
        ? e.target.parentNode.children[0]
        : rects.filter((d, i) => d.x === x * 100 && d.y === y * 100)
            ._groups[0][0]
    ).style("fill", "#FF69B4");

    openNav({ x: mousePos.x / factor, y: mousePos.y / factor, empty: true });
  };

  const clickState = function (e, state = null, rects) {
    jQuery("#view-lands-button").show();
    e.preventDefault();
    e.stopPropagation();
    resetSelections();
    const [x, y] = e.target.__data__;
    d3.select(
      e.target.textContent !== ""
        ? e.target.parentNode.children[0]
        : rects.filter((d, i) => d[0] === x && d[1] === y)._groups[0][0]
    ).style("stroke", "#FF69B4");

    openNav({ x, y, state });
  };

  function drawGrid() {
    const grid = d3
      .select("#mapSvg")
      .style("width", "100vw")
      .style("height", "calc(100vh - 150px)"); // minus the top bar including margin-top

    const data = window.coordinates.map((x) => ({
      x: x[0] * factor,
      y: x[1] * -1 * factor,
    }));

    const states24 = createStates(24);
    const states12 = createStates(12);
    const states6 = createStates(6);
    const states = { ...states24, ...states12, ...states6 };
    const addModal = new bootstrap.Modal(document.getElementById("addModal"), {
      keyboard: false,
    });

    // const square = grid
    //   .call(zoom)
    //   .append("g")
    //   .selectAll(".square")
    //   .data(data)
    //   .enter()
    //   .append("image")
    //   .attr("class", "square")
    //   .attr("xlink:href", "/assets/1.png")
    //   .attr("x", (d) => d.x)
    //   .attr("y", (d) => d.y)
    //   .attr("width", function (d) {
    //     return factor;
    //   })
    //   .attr("height", function (d) {
    //     return factor;
    //   })
    //   .on("click", (e) => {
    //     clickLand(e);
    //     const x = e.target.x.baseVal.value / 100;
    //     const y = e.target.y.baseVal.value / 100;
    //     addModal.show();
    //     let coordinateX = document.getElementById("coordinateX");
    //     let coordinatey = document.getElementById("coordinateY");
    //     coordinateX.value = x;
    //     coordinatey.value = y;
    //   });

    // for drawing rect squares instead of images
    const square = grid
      .call(zoom)
      .append("g")
      .selectAll(".square")
      .data(data)
      .enter()
      .append("g")
      .on("click", (e) => {
        const x = e.target.x.baseVal.value / 100;
        const y = e.target.y.baseVal.value / 100;
        clickLand(e, x, y, square.select("rect"));
        addModal.show();
        let coordinateX = document.getElementById("coordinateX");
        let coordinatey = document.getElementById("coordinateY");
        coordinateX.value = x;
        coordinatey.value = y;
      });

    // for drawing rect squares instead of images

    square
      .append("rect")
      .attr("class", "square")
      .filter((d) => !states[`${d.x},${d.y}`])
      .attr("x", function (d) {
        return d.x;
      })
      .attr("y", function (d) {
        return d.y;
      })
      .attr("width", function (d) {
        return factor;
      })
      .attr("height", function (d) {
        return factor;
      })
      .style("fill", "#04e38b")
      .style("stroke", "#000")
      .style("stroke-width", "5");

    square
      .append("image")
      .attr("class", "square")
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y)
      .attr("width", function (d) {
        return factor - 2.5;
      })
      .attr("height", function (d) {
        return factor - 2.5;
      });

    const group24 = grid
      .select("g")
      .selectAll(".square24")
      .data(window.states[24])
      .enter()
      .append("g")
      .on("click", (e) => {
        clickState(e, states24, group24.select("rect"));
        const [x, y] = e.target.__data__;
        addModal.show();
        let coordinateX = document.getElementById("coordinateX");
        let coordinatey = document.getElementById("coordinateY");
        coordinateX.value = x;
        coordinatey.value = y;
      });

    group24
      .append("rect")
      .attr("class", "square24")
      .attr("x", (d) => d[0] * factor)
      .attr("y", (d) => d[1] * factor)
      .attr("width", function (d) {
        return 24 * factor;
      })
      .attr("height", function (d) {
        return 24 * factor;
      })
      .style("fill", "#23292f")
      .style("stroke", "white")
      .style("stroke-width", "15");

    group24
      .append("image")
      .attr("xlink:href", "/images/24.png")
      .attr("class", "square24")
      .attr("x", (d) => d[0] * factor)
      .attr("y", (d) => d[1] * factor)
      .attr("width", function (d) {
        return 24 * factor;
      })
      .attr("height", function (d) {
        return 24 * factor;
      });

    const group12 = grid
      .select("g")
      .selectAll(".square12")
      .data(window.states[12])
      .enter()
      .append("g")
      .on("click", (e) => {
        clickState(e, states12, group12.select("rect"));
        const [x, y] = e.target.__data__;
        addModal.show();
        let coordinateX = document.getElementById("coordinateX");
        let coordinatey = document.getElementById("coordinateY");
        coordinateX.value = x;
        coordinatey.value = y;
      });

    group12
      .append("rect")
      .attr("class", "square12")
      .attr("x", (d) => d[0] * factor)
      .attr("y", (d) => d[1] * factor)
      .attr("width", function (d) {
        return 12 * factor;
      })
      .attr("height", function (d) {
        return 12 * factor;
      })
      .style("fill", "#23292f")
      .style("stroke", "white")
      .style("stroke-width", "15");

    group12
      .append("image")
      .attr("xlink:href", "/images/12.png")
      .attr("class", "square12")
      .attr("x", (d) => d[0] * factor)
      .attr("y", (d) => d[1] * factor)
      .attr("width", function (d) {
        return 12 * factor;
      })
      .attr("height", function (d) {
        return 12 * factor;
      });

    const group6 = grid
      .select("g")
      .selectAll(".square6")
      .data(window.states[6])
      .enter()
      .append("g")
      .on("click", (e) => {
        clickState(e, states6, group6.select("rect"));
        const [x, y] = e.target.__data__;
        addModal.show();
        let coordinateX = document.getElementById("coordinateX");
        let coordinatey = document.getElementById("coordinateY");
        coordinateX.value = x;
        coordinatey.value = y;
      });

    group6
      .append("rect")
      .attr("class", "square6")
      .attr("x", (d) => d[0] * factor)
      .attr("y", (d) => d[1] * factor)
      .attr("width", function (d) {
        return 6 * factor;
      })
      .attr("height", function (d) {
        return 6 * factor;
      })
      .style("fill", "#23292f")
      .style("stroke", "white")
      .style("stroke-width", "15");
    group6
      .append("image")
      .attr("xlink:href", "/images/6.png")
      .attr("class", "square6")
      .attr("x", (d) => d[0] * factor)
      .attr("y", (d) => d[1] * factor)
      .attr("width", function (d) {
        return 6 * factor;
      })
      .attr("height", function (d) {
        return 6 * factor;
      });
  }

  jQuery("#closebtn").click((e) => {
    video.pause();
    document.getElementById("myNav").style.width = "0%";
  });

  jQuery("#view-lands-button").click((e) => {
    video.pause();
    var landsModal = new bootstrap.Modal(
      document.getElementById("view-lands-modal")
    );
    landsModal.show();
  });

  // draw grid for the first time
  drawGrid();
  reset();

  const fetchData = () => {
    // fetch data and draw images
    get().then((res) => {
      // converting array (response) to object
      let objectData = {};
      for (const index in res) {
        let land = res[index];
        objectData[`${land.coordinates[0]},${land.coordinates[1]}`] = land;
      }
      data = objectData;
      isLoading = false;

      // updating images on the map

      for (const coord in res) {
        for (const group in states) {
          states[group].map((state) => {
            const { coordinates, logo } = res[coord]; // pulling data from response
            const grid = d3.select("svg#mapSvg");
            if (_.isEqual(state, coordinates)) {
              // if the image on 12x12 tile
              if (group == 12) {
                const group12 = grid
                  .select("g")
                  .selectAll(".square12")
                  .filter(
                    (d, i) => d[0] === coordinates[0] && d[1] === coordinates[1]
                  );
                if (logo) {
                  group12.attr("xlink:href", logo);
                  group12.style("fill", "none");
                }
              }

              // if the image on 24x24 tile
              if (group == 24) {
                const group12 = grid
                  .select("g")
                  .selectAll(".square24")
                  .filter(
                    (d, i) => d[0] === coordinates[0] && d[1] === coordinates[1]
                  );
                if (logo) {
                  group12.attr("xlink:href", logo);
                  group12.style("fill", "none");
                }
              }

              // if the image on 6x6 tile
              if (group == 6) {
                const group12 = grid
                  .select("g")
                  .selectAll(".square6")
                  .filter(
                    (d, i) => d[0] === coordinates[0] && d[1] === coordinates[1]
                  );
                if (logo) {
                  group12.attr("xlink:href", logo);
                  group12.style("fill", "none");
                }
              }
            } else {
              const group1 = grid
                .select("g")
                .selectAll(".square")
                .filter((d, i) => {
                  return (
                    d.x === coordinates[0] * 100 && d.y === coordinates[1] * 100
                  );
                });
              if (logo) {
                group1.attr("xlink:href", logo);
                group1.style("fill", "none");
              }
            }
          });
        }
      }
    });
  };

  fetchData();

  const selectAll1 = () => {
    d3.select("svg#mapSvg")
      .select("g")
      .selectAll(".square")
      .style("fill", "#FF69B4");
  };
  const deSelectAll1 = () => {
    d3.select("svg#mapSvg")
      .select("g")
      .selectAll(".square")
      .style("fill", "#04e38b");
  };
  const selectAll6 = () => {
    statessHead6.forEach((landCord) => {
      const land = d3.selectAll(
        `rect[x='${landCord[0] * 100}'][y='${landCord[1] * 100}']`
      );
      d3.select(land._groups[0][1]).style("stroke", "#FF69B4");
      d3.select(land._groups[0][3]).style("stroke", "#FF69B4");
      d3.select(land._groups[0][1]).style("stroke-width", "80");
      d3.select(land._groups[0][3]).style("stroke-width", "80");
    });
  };
  const deSelectAll6 = () => {
    statessHead6.forEach((landCord) => {
      const land = d3.selectAll(
        `rect[x='${landCord[0] * 100}'][y='${landCord[1] * 100}']`
      );

      d3.select(land._groups[0][1]).style("stroke", "#ffffff");
      d3.select(land._groups[0][3]).style("stroke", "#ffffff");
      d3.select(land._groups[0][1]).style("stroke-width", "15");
      d3.select(land._groups[0][3]).style("stroke-width", "15");
    });
  };
  const selectAll12 = () => {
    statessHead12.forEach((landCord) => {
      const land = d3.selectAll(
        `rect[x='${landCord[0] * 100}'][y='${landCord[1] * 100}']`
      );
      d3.select(land._groups[0][1]).style("stroke", "#FF69B4");
      d3.select(land._groups[0][3]).style("stroke", "#FF69B4");
      d3.select(land._groups[0][1]).style("stroke-width", "80");
      d3.select(land._groups[0][3]).style("stroke-width", "80");
    });
  };
  const deSelectAll12 = () => {
    statessHead12.forEach((landCord) => {
      const land = d3.selectAll(
        `rect[x='${landCord[0] * 100}'][y='${landCord[1] * 100}']`
      );

      d3.select(land._groups[0][1]).style("stroke", "#ffffff");
      d3.select(land._groups[0][3]).style("stroke", "#ffffff");
      d3.select(land._groups[0][1]).style("stroke-width", "15");
      d3.select(land._groups[0][3]).style("stroke-width", "15");
    });
  };
  const selectAll24 = () => {
    statessHead24.forEach((landCord) => {
      const land = d3.selectAll(
        `rect[x='${landCord[0] * 100}'][y='${landCord[1] * 100}']`
      );
      d3.select(land._groups[0][1]).style("stroke", "#FF69B4");
      d3.select(land._groups[0][3]).style("stroke", "#FF69B4");
      d3.select(land._groups[0][1]).style("stroke-width", "80");
      d3.select(land._groups[0][3]).style("stroke-width", "80");
    });
  };
  const deSelectAll24 = () => {
    statessHead24.forEach((landCord) => {
      const land = d3.selectAll(
        `rect[x='${landCord[0] * 100}'][y='${landCord[1] * 100}']`
      );

      d3.select(land._groups[0][1]).style("stroke", "#ffffff");
      d3.select(land._groups[0][3]).style("stroke", "#ffffff");
      d3.select(land._groups[0][1]).style("stroke-width", "15");
      d3.select(land._groups[0][3]).style("stroke-width", "15");
    });
  };

  // forsale filter
  const selectForSale = document.getElementById("selectForSale");
  selectForSale.addEventListener("click", (e) => {
    if (e.target.checked) {
      selectAll1();
    } else {
      deSelectAll1();
    }
  });

  // premuim filter
  const selectPremium = document.getElementById("selectPremium");
  selectPremium.addEventListener("click", (e) => {
    if (e.target.checked) {
      premuim.forEach((landCord) => {
        const land = d3.selectAll(
          `rect[x='${landCord[0] * 100}'][y='${landCord[1] * 100}']`
        );
        d3.select(land._groups[0][1]).style("stroke", "#FF69B4");
        d3.select(land._groups[0][3]).style("stroke", "#FF69B4");
        d3.select(land._groups[0][1]).style("stroke-width", "80");
        d3.select(land._groups[0][3]).style("stroke-width", "80");
      });
    } else {
      premuim.forEach((landCord) => {
        const land = d3.selectAll(
          `rect[x='${landCord[0] * 100}'][y='${landCord[1] * 100}']`
        );

        d3.select(land._groups[0][1]).style("stroke", "#ffffff");
        d3.select(land._groups[0][3]).style("stroke", "#ffffff");
        d3.select(land._groups[0][1]).style("stroke-width", "15");
        d3.select(land._groups[0][3]).style("stroke-width", "15");
      });
    }
  });

  // onOpensea filter
  const selectOpensea = document.getElementById("selectOpensea");
  selectOpensea.addEventListener("click", (e) => {
    if (e.target.checked) {
      selectAll1();
      selectAll6();
      selectAll12();
      selectAll24();
    } else {
      deSelectAll1();
      deSelectAll6();
      deSelectAll12();
      deSelectAll24();
    }
  });

  // select1 filter
  const select1 = document.getElementById("select1");
  select1.addEventListener("click", (e) => {
    if (e.target.checked) {
      selectAll1();
    } else {
      deSelectAll1();
    }
  });

  // select6 filter
  const select6 = document.getElementById("select6");
  select6.addEventListener("click", (e) => {
    if (e.target.checked) {
      selectAll6();
    } else {
      deSelectAll6();
    }
  });

  // select12 filter
  const select12 = document.getElementById("select12");
  select12.addEventListener("click", (e) => {
    if (e.target.checked) {
      selectAll12();
    } else {
      deSelectAll12();
    }
  });

  // select24 filter
  const select24 = document.getElementById("select24");
  select24.addEventListener("click", (e) => {
    if (e.target.checked) {
      selectAll24();
    } else {
      deSelectAll24();
    }
  });

  // eth filter
  const selectEth = document.getElementById("selectEth");
  selectEth.addEventListener("click", (e) => {
    if (e.target.checked) {
      selectAll1();
      selectAll6();
      selectAll12();
      selectAll24();
    } else {
      deSelectAll1();
      deSelectAll6();
      deSelectAll12();
      deSelectAll24();
    }
  });

  // selectCoord
  const selectCoord = document.getElementById("applySelectXY");
  selectCoord.addEventListener("click", (e) => {
    deSelectAll1();
    const grid = d3.select("svg#mapSvg");
    const x = document.getElementById("selectX").value;
    const y = document.getElementById("selectY").value;
    const container = grid.node().getBoundingClientRect();
    const width = container.width;
    const height = container.height;
    const start = d3.zoomIdentity
      .translate(width / 2, height / 2)
      .scale(0.4)
      .translate(-x * 100, -y * 100);
    zoom.transform(grid, start);
    grid.call(zoom.transform, start);
    let t = d3.selectAll(`rect[x='${x * 100}'][y='${y * 100}']`);
    d3.select(t._groups[0][1]).style("fill", "#FF69B4");
  });

  // onsubmit form logic
  const form = document.getElementById("add-form");
  document.getElementById("add-form").addEventListener("submit", (e) => {
    e.preventDefault();
    let data = [...e.currentTarget.elements]
      .filter((ele) => ele.type !== "submit")
      .map((ele) => {
        return {
          [ele.getAttribute("name")]:
            ele.type === "file" ? ele.files : ele.value,
        };
      });
    console.log(data);
    let formData = new FormData(form);
    formData.set("coordinateX", data[0].coordinateX);
    formData.set("coordinateY", data[1].coordinateY);
    add(formData);
  });

  //  requests logic

  const addTable = new bootstrap.Modal(document.getElementById("addTable"), {
    keyboard: false,
  });

  document.getElementById("addTableBtn").addEventListener("click", (e) => {
    e.preventDefault();

    console.log("testtt");
    const tbody = document.getElementById("tbody");
    getRequests().then((requests) => {
      tbody.innerHTML = `${requests.map((request) => {
        return `<tr>
        <td>${request.coordinates}</td>
        <td>${request.requestedName}</td>
        <td>${request.requestedDescription} </td>
        <td><img class='img-thumbnail;' style='width:100px' src="${request.requestedLogo}" alt="" /></td>
        <td ><div class='d-flex flex-column'>
        <button onclick='applyRequest("${request._id}")'   class="btn btn-primary float-lg-end"  style='margin-Top:5px' >  Apply</button>
         <button onclick='rejectRequest("${request._id}")'  class="btn btn-danger float-lg-end" style='margin-Top:15px'>  Reject</button></div></td>
      </tr>`;
      })}
     `;
    });

    addTable.show();
  });

  // profiles logic

  const addProfiles = new bootstrap.Modal(
    document.getElementById("addProfiles"),
    {
      keyboard: false,
    }
  );

  // document.getElementById("profiles-button").addEventListener("click", (e) => {
  //   e.preventDefault();
  //   const tbody = document.getElementById("tprofiles");

  //   getUsers().then((users) => {
  //     tbody.innerHTML = `${users.map((user) => {
  //       return `<tr>
  //       <td>${user.name}</td>
  //       <td>${user.username}</td>
  //       <td>${user.email} </td>
  //       <td>${user.location} </td>
  //       <td>${user.company} </td>
  //       <td>${user.role} </td>
  //       <td>${user.website} </td>
  //       <td>${user.bio} </td>
  //       <td>${user.whatAreYouLookingFor.map((l) => {
  //         return `<p>${l}</p>`;
  //       })} </td>
  //       <td>${user.whatTopicsAreYouInterestedIn} </td>
  //       <td><small>${user.wallet}</small> </td>

  //     </tr>`;
  //     })}
  //    `;
  //   });

  //   addProfiles.show();

  //   const profilesTable = document.getElementById("profilesTable");
  //   const person = document.getElementById("person-tab-button");
  //   const company = document.getElementById("company-tab-button");

  //   person.addEventListener("click", (e) => {
  //     e.preventDefault();

  //     company.classList.remove("active");
  //     person.classList.add("active");
  //     formType = "person";

  //     profilesTable.innerHTML = `
  //     <table id="profilesTable" class="table table-striped">
  //     <thead>
  //       <tr>
  //         <th>Name</th>
  //         <th>Username</th>
  //         <th>Email</th>
  //         <th>Location</th>
  //         <th>Company</th>
  //         <th>Role</th>
  //         <th>Website</th>
  //         <th>Bio</th>
  //         <th>Looking for</th>
  //         <th>Interested in</th>
  //         <th>wallet</th>
  //       </tr>
  //     </thead>
  //     <tbody id="tprofiles"></tbody>
  //   </table>
  //     `;

  //     const tbody = document.getElementById("tprofiles");
  //     getUsers().then((users) => {
  //       tbody.innerHTML = `${users.map((user) => {
  //         return `<tr>
  //         <td>${user.name}</td>
  //         <td>${user.username}</td>
  //         <td>${user.email} </td>
  //         <td>${user.location} </td>
  //         <td>${user.company} </td>
  //         <td>${user.role} </td>
  //         <td>${user.website} </td>
  //         <td>${user.bio} </td>
  //         <td>${user.whatAreYouLookingFor.map((l) => {
  //           return `<p>${l}</p>`;
  //         })} </td>
  //         <td>${user.whatTopicsAreYouInterestedIn} </td>
  //         <td><small>${user.wallet}</small> </td>

  //       </tr>`;
  //       })}
  //      `;
  //     });
  //   });

  //   company.addEventListener("click", (e) => {
  //     e.preventDefault();

  //     person.classList.remove("active");
  //     company.classList.add("active");
  //     formType = "company";

  //     profilesTable.innerHTML = `
  //     <table id="profilesTable" class="table table-striped">
  //     <thead>
  //       <tr>
  //         <th>Name</th>
  //         <th>Username</th>
  //         <th>Email</th>
  //         <th>Location</th>
  //         <th>Company</th>
  //         <th>Role</th>
  //         <th>Website</th>
  //         <th>Bio</th>
  //         <th>Looking for</th>
  //         <th>Interested in</th>
  //         <th>Service</th>
  //         <th>wallet</th>
  //       </tr>
  //     </thead>
  //     <tbody id="tprofiles"></tbody>
  //   </table>
  //     `;

  //     const tbody = document.getElementById("tprofiles");
  //     getCompanies().then((users) => {
  //       console.log(users);
  //       tbody.innerHTML = `${users.map((user) => {
  //         return `<tr>
  //         <td>${user.name}</td>
  //         <td>${user.username}</td>
  //         <td>${user.email} </td>
  //         <td>${user.location} </td>
  //         <td>${user.company} </td>
  //         <td>${user.role} </td>
  //         <td>${user.website} </td>
  //         <td>${user.bio} </td>
  //         <td>${user.whatKindOfServiceYouOffer} </td>
  //         <td>${user.whatAreYouLookingFor.map((l) => {
  //           return `<p>${l}</p>`;
  //         })} </td>
  //         <td>${user.whatTopicsAreYouInterestedIn} </td>
  //         <td><small>${user.wallet}</small> </td>

  //       </tr>`;
  //       })}
  //      `;
  //     });
  //   });
  // });

  const darkModeSwitch = document.getElementById("darkMode");
  const nav = document.getElementById("nav");

  darkModeSwitch.addEventListener("click", (e) => {
    if (e.target.checked) {
      nav.classList.remove("navbar-light");
      nav.classList.remove("bg-light");
      nav.classList.add("darkMode");
    } else {
      nav.classList.remove("darkMode");
      nav.classList.add("navbar-light");
      nav.classList.add("bg-light");
    }
  });
}

grid();
