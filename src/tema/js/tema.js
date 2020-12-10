import "../sass/tema.scss";
import { gsap } from "gsap/all";

function headingLoc() {
  const image = document.querySelector("#image img");
  const gif_wrapper = document.querySelector(".gif-wrapper");
  const tema = {
    lat: 5.6249375,
    lon: 0.0000625,
  };

  const range = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  };

  function angleFromCoordinate(lat1, lon1, lat2, lon2) {
    var p1 = {
      x: lat1,
      y: lon1,
    };

    var p2 = {
      x: lat2,
      y: lon2,
    };

    var angleDeg = (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;
    return angleDeg;
  }

  navigator.geolocation.watchPosition(
    (data) => {
      console.log(data.coords);
      let opacityRng = range(data.coords.heading, 0, 360, 0, 100);
      let ang = angleFromCoordinate(
        data.coords.latitude,
        data.coords.longitude,
        tema.lat,
        tema.lon
      );

      // image.style.opacity = `${ang}%`;
      // txt.textContent = `${data.coords.heading} = ${opacityRng} | ${ang}`;
    },
    (err) => {
      console.log(err);
    }
  );

  //   let gyroscope = new Gyroscope({frequency: 60});
  //   gyroscope.addEventListener('reading', e => {
  //   txt.textContent = "Angular velocity along the Z-axis " + gyroscope.z;
  //   let opacity_Rng = range(gyroscope.z, -0, 1, 0, 100);
  //   gif_wrapper.style.opacity = `${opacity_Rng}%`;
  // });
  // gyroscope.start();

  window.addEventListener("deviceorientation", function (e) {
    let alpha = e.alpha;
    let beta = e.beta;
    let gamma = e.gamma;
    if (gamma >= 0) {
      gif_wrapper.style.opacity = `${gamma}%`;
    } else {
      gif_wrapper.style.opacity = `${-gamma}%`;
    }
  });
}

function imgSlider() {
  let counter = 1;
  function move() {
    const container = document.getElementById("image");
    const img = document.createElement("img");
    if (counter <= 100) {
      container.innerHTML = "";
      img.classList.add("image_show");
      img.setAttribute("src", `img/t/img_${counter}.png`);
      container.appendChild(img);
      counter++;
    } else {
      counter = 1;
    }
    setTimeout(move, 5000);
  }
  move();
}

function textGen() {
  function createSVG(i, d) {
    let cSVG = document.createElement("object");
    cSVG.type = "image/svg+xml";
    cSVG.data = `img/t/svg/${i}.svg`;
    cSVG.classList.add("type");
    d.insertAdjacentText("beforeend", cSVG);
  }
  let txt = ["Suro nipa", "dromɔ ", "nyame ndae "];
  let svgMap = {
    A: "A.svg",
    B: "B.svg",
    C: "C.svg",
    D: "D.svg",
    E: "E.svg",
    F: "F.svg",
    G: "G.svg",
    H: "H.svg",
    I: "I.svg",
    K: "K.svg",
    L: "L.svg",
    M: "M.svg",
    N: "N.svg",
    O: "O.svg",
    P: "P.svg",
    R: "R.svg",
    S: "S.svg",
    Sp: "Sp.svg",
    U: "U.svg",
  };
  const dynamicHolder = document.querySelector(".dynamic-content");

  for (const s of txt) {
    for (const i of s) {
      console.log(i);
    }
  }
}

function init() {
  textGen();
  imgSlider();
  headingLoc();
}

init();
