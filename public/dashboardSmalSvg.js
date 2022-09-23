/** @format */
import { get } from "./api.js ";
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

  const zoom = d3.zoom().on("zoom", handleZoom);
  let scroller = document.querySelector("#mapSvgdash");

  scroller.addEventListener("wheel", function (event) {
    console.log(event.wheelDelta);

    if (event.wheelDelta < 0) {
      let transform = d3.select("svg#mapSvg > g").attr("transform");
      console.log(transform);
      let values = transform
        .replace(/[^0-9., ]/g, "")
        .split(/[ ,]+/)
        .join(",")
        .split(",");
      // zoom.scaleBy(grid.transition(), 4);
      console.log(values);
      d3.select("svg#mapSvg > g").attr(
        "transform",
        "translate(" +
          (parseFloat(values[0]) - parseFloat(20)) +
          ", " +
          (parseFloat(values[1]) - parseFloat(20)) +
          ") scale(" +
          (parseFloat(values[2]) - parseFloat(0.01)) +
          ")"
      );
      console.log(d3.select("svg#mapSvg > g").attr("transform"));

      let transform1 = d3.select("svg#mapSvgdash > g").attr("transform");
      let values1 = transform1
        .replace(/[^0-9., ]/g, "")
        .split(/[ ,]+/)
        .join(",")
        .split(",");
      // zoom.scaleBy(grid.transition(), 4);
      d3.select("svg#mapSvgdash > g").attr(
        "transform",
        "translate(" +
          (parseFloat(values1[0]) - parseFloat(20)) +
          ", " +
          (parseFloat(values1[1]) - parseFloat(20)) +
          ") scale(" +
          (parseFloat(values1[2]) - parseFloat(0.01)) +
          ")"
      );
    } else {
      let transform = d3.select("svg#mapSvg > g").attr("transform");
      let values = transform
        .replace(/[^0-9., ]/g, "")
        .split(/[ ,]+/)
        .join(",")
        .split(",");
      // zoom.scaleBy(grid.transition(), 4);
      d3.select("svg#mapSvg > g").attr(
        "transform",
        "translate(" +
          (parseFloat(values[0]) + parseFloat(20)) +
          ", " +
          (parseFloat(values[1]) + parseFloat(20)) +
          ") scale(" +
          (parseFloat(values[2]) + parseFloat(0.01)) +
          ")"
      );

      let transformS = d3.select("svg#mapSvgdash > g").attr("transform");
      let valuesS = transformS
        .replace(/[^0-9., ]/g, "")
        .split(/[ ,]+/)
        .join(",")
        .split(",");
      // zoom.scaleBy(grid.transition(), 4);
      d3.select("svg#mapSvgdash > g").attr(
        "transform",
        "translate(" +
          (parseFloat(valuesS[0]) + parseFloat(20)) +
          ", " +
          (parseFloat(valuesS[1]) + parseFloat(20)) +
          ") scale(" +
          (parseFloat(valuesS[2]) + parseFloat(0.01)) +
          ")"
      );
    }
  });
  function handleZoom(e) {
    console.log("called");
    console.log("abd ", e.transform.y);
    if (
      e.transform.x === parseFloat(69.1199951171875) &&
      e.transform.y === parseFloat(37.46112413533529)
    ) {
      d3.select("svg#mapSvgdash > g").attr(
        "transform",
        "translate(" + 270 + ", " + 120 + ") scale(" + 0.1 + ")"
      );
    }
    // jQuery.selectAll("#range").sortable();

    // }

    //
    //
  }
  d3.selectAll("#range").on("click", function () {
    console.log("wqer");
  });
  d3.selectAll("#range").on("mouseup", function (event) {
    if (
      parseInt(localStorage.getItem("range")) <
      document.getElementById("range").value
    ) {
      localStorage.setItem("range", document.getElementById("range").value);
      let transform = d3.select("svg#mapSvg > g").attr("transform");
      let values = transform
        .replace(/[^0-9., ]/g, "")
        .split(/[ ,]+/)
        .join(",")
        .split(",");
      // zoom.scaleBy(grid.transition(), 4);
      d3.select("svg#mapSvg > g").attr(
        "transform",
        "translate(" +
          (parseFloat(values[0]) - parseFloat(20)) +
          ", " +
          (parseFloat(values[1]) - parseFloat(20)) +
          ") scale(" +
          (parseFloat(values[2]) - parseFloat(0.01)) +
          ")"
      );

      let transform1 = d3.select("svg#mapSvgSmall > g").attr("transform");
      let values1 = transform1
        .replace(/[^0-9., ]/g, "")
        .split(/[ ,]+/)
        .join(",")
        .split(",");
      // zoom.scaleBy(grid.transition(), 4);
      d3.select("svg#mapSvgSmall > g").attr(
        "transform",
        "translate(" +
          (parseFloat(values1[0]) - parseFloat(20)) +
          ", " +
          (parseFloat(values1[1]) - parseFloat(20)) +
          ") scale(" +
          (parseFloat(values1[2]) - parseFloat(0.01)) +
          ")"
      );
    } else {
      localStorage.setItem("range", document.getElementById("range").value);
      let transform = d3.select("svg#mapSvg > g").attr("transform");
      let values = transform
        .replace(/[^0-9., ]/g, "")
        .split(/[ ,]+/)
        .join(",")
        .split(",");
      // zoom.scaleBy(grid.transition(), 4);
      d3.select("svg#mapSvg > g").attr(
        "transform",
        "translate(" +
          (parseFloat(values[0]) + parseFloat(20)) +
          ", " +
          (parseFloat(values[1]) + parseFloat(20)) +
          ") scale(" +
          (parseFloat(values[2]) + parseFloat(0.01)) +
          ")"
      );
      let transform1 = d3.select("svg#mapSvgSmall > g").attr("transform");
      console.log(transform1);
      let values1 = transform1
        .replace(/[^0-9., ]/g, "")
        .split(/[ ,]+/)
        .join(",")
        .split(",");
      // zoom.scaleBy(grid.transition(), 4);
      console.log(values1);
      d3.select("svg#mapSvgSmall > g").attr(
        "transform",
        "translate(" +
          (parseFloat(values1[0]) + parseFloat(20)) +
          ", " +
          (parseFloat(values1[1]) + parseFloat(20)) +
          ") scale(" +
          (parseFloat(values1[2]) + parseFloat(0.01)) +
          ")"
      );
    }
  });

  //

  //
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
    return stateRect;
  };

  function reset() {
    const grid = d3.select("svg#mapSvgdash");
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

  // const resetSelections = () => {
  //   d3.selectAll("rect.square").style("fill", "#04e38b");
  //   d3.selectAll("rect.square24").style("stroke", "#fff");
  //   d3.selectAll("rect.square12").style("stroke", "#fff");
  //   d3.selectAll("rect.square6").style("stroke", "#fff");
  // };

  // const clickLand = function (e) {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   jQuery("#view-lands-button").hide();

  //   var mousePos = e.target.__data__;

  //   resetSelections();
  //   d3.select(e.target).style("fill", "#FF69B4");

  //   openNav({ x: mousePos.x / factor, y: mousePos.y / factor, empty: true });
  // };

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
      .select("#mapSvgdash")
      .style("width", "90vw")
      .style("height", "calc(100vh)") // minus the top bar including margin-top
      .style("transform", "scale(0.1)") // minus the top bar including margin-top
      .style("position", "absolute") // minus the top bar including margin-top
      .style("left", "-40vw") // minus the top bar including margin-top
      .style("top", "-38vh"); // minus the top bar including margin-top

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

    d3.selectAll("#zoom_in").on("click", function () {
      console.log("this is plus button");
      let transform = d3.select("svg#mapSvg > g").attr("transform");
      let values = transform
        .replace(/[^0-9., ]/g, "")
        .split(/[ ,]+/)
        .join(",")
        .split(",");
      // zoom.scaleBy(grid.transition(), 4);
      d3.select("svg#mapSvg > g").attr(
        "transform",
        "translate(" +
          (parseFloat(values[0]) + parseFloat(20)) +
          ", " +
          (parseFloat(values[1]) + parseFloat(20)) +
          ") scale(" +
          (parseFloat(values[2]) + parseFloat(0.01)) +
          ")"
      );
      let transform1 = d3.select("svg#mapSvgdash > g").attr("transform");
      console.log(transform1);
      let values1 = transform1
        .replace(/[^0-9., ]/g, "")
        .split(/[ ,]+/)
        .join(",")
        .split(",");
      // zoom.scaleBy(grid.transition(), 4);
      console.log(values1);
      d3.select("svg#mapSvgdash > g").attr(
        "transform",
        "translate(" +
          (parseFloat(values1[0]) + parseFloat(20)) +
          ", " +
          (parseFloat(values1[1]) + parseFloat(20)) +
          ") scale(" +
          (parseFloat(values1[2]) + parseFloat(0.01)) +
          ")"
      );
    });

    d3.selectAll("#range").on("dragstart", function () {
      console.log("range");
      let transform = d3.select("svg#mapSvg > g").attr("transform");
      let values = transform
        .replace(/[^0-9., ]/g, "")
        .split(/[ ,]+/)
        .join(",")
        .split(",");
      // zoom.scaleBy(grid.transition(), 4);
      d3.select("svg#mapSvg > g").attr(
        "transform",
        "translate(" +
          (parseFloat(values[0]) + parseFloat(20)) +
          ", " +
          (parseFloat(values[1]) + parseFloat(20)) +
          ") scale(" +
          (parseFloat(values[2]) + parseFloat(0.01)) +
          ")"
      );
      let transform1 = d3.select("svg#mapSvgdash > g").attr("transform");
      console.log(transform1);
      let values1 = transform1
        .replace(/[^0-9., ]/g, "")
        .split(/[ ,]+/)
        .join(",")
        .split(",");
      // zoom.scaleBy(grid.transition(), 4);
      console.log(values1);
      d3.select("svg#mapSvgdash > g").attr(
        "transform",
        "translate(" +
          (parseFloat(values1[0]) + parseFloat(20)) +
          ", " +
          (parseFloat(values1[1]) + parseFloat(20)) +
          ") scale(" +
          (parseFloat(values1[2]) + parseFloat(0.01)) +
          ")"
      );
    });

    d3.selectAll("#zoom_out").on("click", function () {
      console.log("this is - button");
      let transform = d3.select("svg#mapSvg > g").attr("transform");
      let values = transform
        .replace(/[^0-9., ]/g, "")
        .split(/[ ,]+/)
        .join(",")
        .split(",");
      // zoom.scaleBy(grid.transition(), 4);
      d3.select("svg#mapSvg > g").attr(
        "transform",
        "translate(" +
          (parseFloat(values[0]) - parseFloat(20)) +
          ", " +
          (parseFloat(values[1]) - parseFloat(20)) +
          ") scale(" +
          (parseFloat(values[2]) - parseFloat(0.01)) +
          ")"
      );

      let transform1 = d3.select("svg#mapSvgdash > g").attr("transform");
      let values1 = transform1
        .replace(/[^0-9., ]/g, "")
        .split(/[ ,]+/)
        .join(",")
        .split(",");
      // zoom.scaleBy(grid.transition(), 4);
      d3.select("svg#mapSvgdash > g").attr(
        "transform",
        "translate(" +
          (parseFloat(values1[0]) - parseFloat(20)) +
          ", " +
          (parseFloat(values1[1]) - parseFloat(20)) +
          ") scale(" +
          (parseFloat(values1[2]) - parseFloat(0.01)) +
          ")"
      );
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
        return 13 * factor;
      })
      .attr("height", function (d) {
        return 13 * factor;
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
        return 13 * factor;
      })
      .attr("height", function (d) {
        return 13 * factor;
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
          const grid = d3.select("svg#mapSvgdash");
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
