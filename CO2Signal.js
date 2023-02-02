let data;


function setup() {
  createCanvas(windowWidth, windowHeight);
  if (!navigator.geolocation) {
    alert("navigator.geolocation is not available");
  }
  navigator.geolocation.getCurrentPosition(setPos);
  colorMode(RGB);
}


function setPos(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  let url = "https://api.co2signal.com/v1/latest?lon="+lng+"&lat="+lat+"&auth-token=P1CWTJKf8Ea7A9hNXVvyaKCIzLgbYaKg"
    data = loadJSON(url);
}


function draw() {
  background(0);
  
  if (!data) {
    return;
  }
  
  try {
    let ffp = data.data.fossilFuelPercentage;
    let ci = data.data.carbonIntensity;
   // ffp = map(mouseX, 0,500,0,100);
    let calc = map(ffp, 0,100,0, 2*PI);
    let interCol = lerpColor(color(0, 255, 0), color(255, 0, 0), ffp/100+0.125);
    fill(interCol);
    arc(width/2, 175, 200, 200, -HALF_PI,-HALF_PI+calc );
    fill(0);
    circle(width/2, 175, 170);
    fill(255);
    textAlign(CENTER);
    textSize(30);
    text(ci, width/2, 165);
    textSize(15);
    text("\n gCO2eq/kWh", width/2, 180);
  }
  catch (error) {
    console.error(error);
  }
}
