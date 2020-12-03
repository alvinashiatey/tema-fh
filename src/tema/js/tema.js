import "../sass/tema.scss";

function headingLoc() {
  const image = document.querySelector("#image img");
  const txt = document.getElementById("testing");
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

    navigator.geolocation.watchPosition((data) => {
    console.log(data.coords);
    let opacityRng = range(data.coords.heading, 0, 360, 0, 100);
    let ang = angleFromCoordinate(data.coords.latitude, data.coords.longitude, tema.lat, tema.lon);
      
    image.style.opacity = `${ang}%`;
    txt.textContent = `${data.coords.heading} = ${opacityRng} | ${ang}`;
  }, err => {
      txt.textContent = `Website doesnt have access to your heading`;
      console.log(err)
    });
  
  let gyroscope = new Gyroscope({frequency: 60});
  gyroscope.addEventListener('reading', e => {
  txt.textContent = "Angular velocity along the Z-axis " + gyroscope.z;
  console.log("Angular velocity along the Y-axis " + gyroscope.y);
  console.log("Angular velocity along the Z-axis " + gyroscope.z);
});
gyroscope.start();
  
}

function imgSlider() {
  let counter = 1;
  function move() {
    const container = document.getElementById("image");
    const img = document.createElement("img");
    if (counter <= 100) {
      container.innerHTML = "";
      img.setAttribute("src", `img/t/img_${counter}.png`);
      container.appendChild(img);
      counter++;
    } else {
      counter = 1;
    }
    setTimeout(move, 10000);
  }
  move();
}

function init() {
  imgSlider();
  headingLoc();
}

init();
