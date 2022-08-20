/** @format */
import { get } from "./api.js ";
import {
  stateCoords,
  statesstext,
  statelessCoords,
  statessHead6,
  statessHead12,
  statessHead24,
} from "./statess.js";

function grid() {
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
  }

  const zoom = d3.zoom().on("zoom", handleZoom);

  const createStates = (number) => {
    const stateRect = {};
    const t = [];
    const startPos = window.states[number];
    for (const start of startPos) {
      const rect = [];
      for (let i = 0; i < number; i++) {
        for (let j = 0; j < number; j++) {
          const pos = { x: start[0] + i, y: start[1] + j };
          rect.push(pos);
        }
      }
      t.push(start);

      stateRect[`${start[0]},${start[1]}`] = rect;
    }
    console.log(t);
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

  const clickLand = function (e) {
    e.preventDefault();
    e.stopPropagation();

    jQuery("#view-lands-button").hide();

    var mousePos = e.target.__data__;

    resetSelections();
    d3.select(e.target).style("fill", "#FF69B4");

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

  //TODO: separate d3 functions
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
      .on("click", (e) => clickState(e, states24, group24.select("rect")));

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

    // group24
    //   .append("text")
    //   .attr("x", function (d) {
    //     return d[0] * factor + 2.5 * factor;
    //   })
    //   .attr("y", function (d) {
    //     return d[1] * factor + 11.5 * factor;
    //   })
    //   .style("fill", "white")
    //   .style("font-size", "450px")
    //   .text(function (d) {
    //     return "Available";
    //   });

    // group24
    //   .append("text")
    //   .attr("x", function (d) {
    //     return d[0] * factor + 7 * factor;
    //   })
    //   .attr("y", function (d) {
    //     return d[1] * factor + 15.5 * factor;
    //   })
    //   .style("fill", "white")
    //   .style("font-size", "350px")
    //   .text(function (d) {
    //     return "24x24";
    //   });
    const group12 = grid
      .select("g")
      .selectAll(".square12")
      .data(window.states[12])
      .enter()
      .append("g")
      .on("click", (e) => clickState(e, states12, group12.select("rect")));

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
      .on("click", (e) => clickState(e, states6, group6.select("rect")));

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

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
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

  // var link = document.createElement("a");

  // const ttt = [];
  // window.coordinates.forEach((coord) => {
  //   if (statesstext.includes(`[${coord[0]}, ${-1 * coord[1]}]`)) {
  //     console.log("YEEEEEEEEEEEEEEEEEEEEEEEEEE");
  //   } else {
  //     ttt.push([coord[0], coord[1]]);
  //   }
  // });
  // console.log(ttt);

  // var videoo = document.querySelector("video");
  // var canvas = (window.canvas = document.createElement("canvas"));
  // canvas.width = 480;
  // canvas.height = 360;

  // var edge_constraints = {
  //   videoo: true,
  // };

  // var ff_constraints = {
  //   videoo: {
  //     mediaSource: "window",
  //   },
  // };

  // function handleSuccess(stream) {
  //   window.stream = stream; // make stream available to browser console
  //   videoo.srcObject = stream;
  // }

  // function handleError(error) {
  //   console.log("navigator.getDisplayMedia error: ", error);
  // }

  // if (typeof RTCIceGatherer !== "undefined") {
  //   navigator
  //     .getDisplayMedia(edge_constraints)
  //     .then(handleSuccess)
  //     .catch(handleError);
  // } else if (typeof navigator.mediaDevices.getDisplayMedia !== "undefined") {
  //   navigator.mediaDevices
  //     .getDisplayMedia(edge_constraints)
  //     .then(handleSuccess)
  //     .catch(handleError);
  // } else {
  //   navigator.mediaDevices
  //     .getUserMedia(ff_constraints)
  //     .then(handleSuccess)
  //     .catch(handleError);
  // }

  // var btn = document.getElementById("test");
  // btn.addEventListener(
  //   "click",
  //   function (e) {
  //     e.preventDefault();
  //     e.stopPropagation();

  //     const dataA = statessHead6.map((x) => ({
  //       x: x[0] * factor,
  //       y: x[1] * factor,
  //     }));

  //     dataA.forEach(async (coord, i) => {
  //       setTimeout(async () => {
  //         let x = coord.x;
  //         let y = coord.y;
  //         let t = d3.selectAll(`rect[x='${x}'][y='${y}']`);

  //         // d3.select(t._groups[0][0]).style("fill", "#FF69B4");
  //         d3.select(t._groups[0][0]).style("stroke", "#FF69B4");
  //         // d3.select(t._groups[0][1]).style("stroke-width", "30");
  //         d3.select(t._groups[0][1]).style("stroke", "#FF69B4");

  //         const grid = d3.select("svg#mapSvg");
  //         const container = grid.node().getBoundingClientRect();
  //         const width = container.width;
  //         const height = container.height;
  //         const x0 = -150 * factor;
  //         const x1 = 150 * factor;
  //         const y0 = -47 * factor;
  //         const y1 = 48 * factor;

  //         const aspectWidth = x1 - x0;
  //         const aspectHeight = y1 - y0;

  //         const xScale = (width / aspectWidth) * 0.95;
  //         const yScale = (height / aspectHeight) * 0.98;
  //         const minScale = Math.min(xScale, yScale);

  //         const start = d3.zoomIdentity
  //           .translate(width / 2, height / 2)
  //           .scale(0.4)
  //           // .translate(-x + 1240, -y);
  //           .translate(-x + 1290, -y - 3 * 100);
  //         zoom.transform(grid, start);
  //         grid.call(zoom.transform, start);

  //         // let div = document.getElementById("screenshot");

  //         canvas.width = 630;
  //         canvas.height = 630;

  //         delay(100)
  //           .then(() => {
  //             canvas
  //               .getContext("2d")
  //               .drawImage(
  //                 videoo,
  //                 1290,
  //                 228,
  //                 canvas.width,
  //                 canvas.height,
  //                 0,
  //                 0,
  //                 canvas.width,
  //                 canvas.height
  //               );

  //             const frame = canvas.toDataURL("image/png");
  //             link.download = `${x / 100 + "," + y / 100}.png`;
  //             link.href = frame;
  //             link.click();
  //           })
  //           .then(() => {
  //             // d3.select(t._groups[0][0]).style("fill", "#04e38b");
  //             d3.select(t._groups[0][0]).style("stroke", "#04e38b");
  //             d3.select(t._groups[0][1]).style("stroke", "#04e38b");
  //           });
  //       }, i * 200);
  //     });
  //   },
  //   false
  // );

  // draw grid for the first time
  drawGrid();
  reset();
  // fetch data and draw images

  get().then((res) => {
    data = res;
    isLoading = false;
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
              group12.attr("xlink:href", logo);
              group12.style("fill", "none");
            }

            // if the image on 24x24 tile
            if (group == 24) {
              const group12 = grid
                .select("g")
                .selectAll(".square24")
                .filter(
                  (d, i) => d[0] === coordinates[0] && d[1] === coordinates[1]
                );
              group12.attr("xlink:href", logo);
              group12.style("fill", "none");
            }

            // if the image on 6x6 tile
            if (group == 6) {
              const group12 = grid
                .select("g")
                .selectAll(".square6")
                .filter(
                  (d, i) => d[0] === coordinates[0] && d[1] === coordinates[1]
                );
              group12.attr("xlink:href", logo);
              group12.style("fill", "none");
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
}
grid();
