function main() {
  let coordinateX = document.getElementById("coordinateX");
  let coordinatey = document.getElementById("coordinateY");
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");
  canvas.width = document.body.clientWidth;
  canvas.height = 550;
  console.log(document.body.clientHeight);
  var cw = canvas.width;
  var ch = canvas.height;

  const boxSize = 10;

  function getSquare(canvas, e) {
    const transform = context.getTransform();
    const invertedScaleX = 1 / transform.a;
    const invertedScaleY = 1 / transform.d;

    const transformedX =
      invertedScaleX * e.offsetX - invertedScaleX * transform.e;
    const transformedY =
      invertedScaleY * e.offsetY - invertedScaleY * transform.f;

    return {
      x: 1 + Math.floor(transformedX / boxSize) * boxSize,
      y: 1 + Math.floor(transformedY / boxSize) * boxSize,
    };
  }

  function drawGrid() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.scale(scaleFactor, scaleFactor);
    context.translate(panX, panY);

    // get(context);

    let bg = new Image(canvas.width, canvas.height);
    bg.crossOrigin = "anonymous";
    bg.src = `${window.location.protocol}/assets/bg.png`;

    context.beginPath();
    for (var x = 1; x < cw; x += boxSize) {
      context.moveTo(x, 0);
      context.lineTo(x, cw);
    }

    for (var y = 1; y < 10000; y += boxSize) {
      context.moveTo(0, y);
      context.lineTo(10000, y);
    }
    context.closePath();
    context.strokeStyle = "#505861";
    context.lineWidth = 0.6;
    bg.onload = function () {
      context.drawImage(bg, 10, 10, cw, ch);
      context.stroke();
    };
  }

  function fillSquare(context, x, y) {
    context.fillStyle = "#FF69B4";
    context.fillRect(x + 1, y + 1, 8, 8);
  }

  drawGrid(context);

  var addModal = new bootstrap.Modal(document.getElementById("addModal"), {
    keyboard: false,
  });

  let selectedBox = null;
  let restrictArea = [
    "#515765",
    "#000000",
    "#515761",
    "#4d575e",
    "#505a5f",
    "#505961",
    "#505761",
    "#505860",
  ];

  canvas.addEventListener(
    "click",
    function (e) {
      e.preventDefault();
      e.stopPropagation();
      var mousePos = getSquare(canvas, e);
      let key = mousePos.x + "," + mousePos.y;
      // if (coordinates[key]) {
      //   openNav(key);
      //   return false;
      // }
      var pos = findPos(this);
      var x = e.pageX - pos.x;
      var y = e.pageY - pos.y;
      var c = this.getContext("2d");
      var p = c.getImageData(x, y, 1, 1).data;
      var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
      if (selectedBox) {
        context.fillStyle = "#04e38b";
        context.fillRect(
          selectedBox.x + 1,
          selectedBox.y + 1,
          boxSize - 2,
          boxSize - 2
        );
        console.log(selectedBox);
      }
      if (restrictArea.includes(hex)) {
        console.log("restric area");
        return false;
      } else {
        console.log(hex);
        fillSquare(context, mousePos.x, mousePos.y);
        selectedBox = { x: mousePos.x, y: mousePos.y };
        coordinateX.value = mousePos.x;
        coordinatey.value = mousePos.y;
        addModal.show();
      }
    },
    false
  );

  function findPos(obj) {
    var curleft = 0,
      curtop = 0;
    if (obj.offsetParent) {
      do {
        curleft += obj.offsetLeft;
        curtop += obj.offsetTop;
      } while ((obj = obj.offsetParent));
      return { x: curleft, y: curtop };
    }
    return undefined;
  }

  function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
  }

  let video = document.getElementById("com_video");

  function openNav(key) {
    let indicators = document.getElementById("indicators");
    let location = document.getElementById("com_location");
    let name = document.getElementById("com_name");
    let desc = document.getElementById("com_description");
    let slides = document.getElementById("slides");
    let links = document.getElementById("com_links");
    let company = coordinates[key];

    location.textContent = key;
    name.textContent = company.name;
    desc.textContent = company.description;
    video.src = company.videos[0];

    let images = "";
    let indicatorsbtn = "";
    company.images?.map((image, i) => {
      indicatorsbtn += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" class=" ${
        i == 0 ? "active" : ""
      }" aria-current="true" aria-label="Slide 1"></button>`;
      images += `<div class="carousel-item ${
        i == 0 ? "active" : ""
      }"><img src="${image}" alt="..." width="100%" height="250px" class="d-inline-block"></div>`;
    });

    slides.innerHTML = images;
    indicators.innerHTML = indicatorsbtn;

    let linksData = "";
    company.links?.map((link) => {
      linksData += `<a class="link-primary" href="${link}">${link} </a><br>`;
    });
    links.innerHTML = linksData;

    video.src = company.videos[0];

    document.getElementById("myNav").style.width = "30%";
    video.play();
  }
  $("#closebtn").click((e) => {
    console.log("ok");
    video.pause();
    document.getElementById("myNav").style.width = "0%";
  });
}

main();
