//Xinran Shi's week 11 homework for creative coding (p5js)

//tap the button to change the eyes to heart
//twist the potentiometer change the size of the pink cheek and the color of the hair
//(photo resistor) turn the lights on, the background color will change randomly; turn the lights off, the background color will keep black
//(photo resistor) with the lights on, the floating word will change to "It's daytime!"; with the lights off, the floating word will keep "It's dark now"

let serial;                             // variable to hold an instance of the serialport library
let inData;                             // for incoming serial data
let dataMode;
let buttonData;
let potentiometerData;
let sensorPinData;

function setup() {
 createCanvas(700, 700);
 //reference: inspired from the starter code generated from p5.serialcontrol
 serial = new p5.SerialPort();
 serial.list();
 serial.openPort('/dev/tty.usbmodem14101');
 serial.on('connected', serverConnected);
 serial.on('list', gotList);
 serial.on('data', gotData);
 serial.on('error', gotError);
 serial.on('open', gotOpen);
 serial.on('close', gotClose);
}

function draw() {
  // photo resistor's operation, making the background change colors 
  if(sensorPinData>200){
    background(0)
  } else {background(random(0, 255), random(0,255), random(0, 255));
  }
  fill(255);
  textSize(14);
  strokeWeight(2);
  // display the incoming serial data as a string:
  text("sensor value: " + inData, 30, 90);
  text("pot data:" + potentiometerData, 30, 130);
  text("button data: " + buttonData, 30, 170);
  text("sensor pin data: " + sensorPinData, 30, 210)

//title
let myName = "Xinran Shi's Selfie" 
stroke(122,103,238)
  strokeWeight(4);
  fill(0)  
  textStyle(BOLD);
  textSize(35);
  text(myName, 180, 60)
  
  //potentiometer's operation, making the stroke and fill of the hair change colors
  //hair
  stroke(220, 177, potentiometerData);
  fill(potentiometerData, 127, 198);      
  rect(192,130,316,400,80,80,1,1);

  //hat top
  stroke(255,100,30)
  fill(255,100,30)
  ellipse(350,190,340,235);

  //ears
  stroke(255,228,225)
  fill(253,245,230)
  ellipse(200,300,60,60)
  ellipse(500,300,60,60);

  //face
  stroke(255,228,225)
  fill(253,245,230)
    ellipse(350, 300, 300, 300);
  
//neck
  stroke(255,228,225)
  fill(253,245,230)      
  line(300,442,300,500);
  line(400,442,400,500);

  //body
  fill(135,206,235)    
  rect(203,493,300,150,80,80,1,1);

//bottom neck
  stroke(253,245,230)
  fill(253,245,230)  
  rect(303,390,94,110)  
  ellipse(350,500,92,50);

//button
stroke(85,107,47)
fill(255,215,0)
ellipse(355,610,20,20)
ellipse(355,580,20,20)
ellipse(355,550,20,20);

//button's operaction, making the eyes and eyeballs have some changes
if (buttonData == 0) {
  //eyes
stroke(255)
fill(255)
ellipse(280,300,50,50)
ellipse(420,300,50,50);

//eyeballs
stroke(0)
fill(0)
ellipse(280,290,30,30)
ellipse(420,290,30,30);
  //ellipse(300, 300, potentiometerData * 2)
} else {
  //heart eyes
noStroke();
fill(255, 0, 0);
ellipse(270, 290, 30, 30);
ellipse(290, 290, 30, 30);
triangle(259, 300, 301, 300, 280, 320);

noStroke();
fill(255, 0, 0);
ellipse(410, 290, 30, 30);
ellipse(430, 290, 30, 30);
triangle(399, 300, 441, 300, 420, 320);
}

//nose
strokeWeight(4)
stroke(0)
line(350,325,350,350);

//lip
strokeWeight(3)
stroke(205,92,92)
noFill()
ellipse(350,390,50,40);

//moving tongue
let MovingRoute= constrain(mouseX, 340, 360);

fill(255,0,0)
ellipse(MovingRoute,390,30,30);

//hat bottom
stroke(255,100,30)
fill(255,100,30)
rect(190,149,320,100,70,70,1,1);

//hat button
stroke(139,134,130)
fill(0,250,154)
ellipse(350,220,20,20)
ellipse(300,220,20,20)
ellipse(250,220,20,20)
ellipse(200,220,20,20)
ellipse(400,220,20,20)
ellipse(450,220,20,20)
ellipse(500,220,20,20);

//hat decoration 
stroke(139,71,137)
fill(144,238,144)
arc(350, 130, 70, 70, 0, PI + QUARTER_PI, PIE);

//glasses
strokeWeight(4)
stroke (205,201,201)
noFill()
ellipse(280,300,85,85)
ellipse(420,300,85,85);
line(325,300,375,300)  
line(200,290,235,297)
line(465,297,500,290);

//potentiometer's operation, changing the size of the pink cheek
//pink cheek
strokeWeight(3)
stroke(238,92,66)
fill(255,174,185,100)
ellipse(270,370, potentiometerData/3.5,potentiometerData/7)
ellipse(430,370, potentiometerData/3.5,potentiometerData/7);


//floating word
let word = "It's dark now~"
let word2 = "It's daytime!"
if(sensorPinData>200){
  stroke(255, 0, 255)
fill(255,0, 0)
text(word,frameCount % width,450);
} else {stroke(0, 0, 255)
  fill(0, 255, 0)
  textSize(random(15, 45))
  text(word2,frameCount % height,600);
}
}

function gotData() {
  // read a byte from the serial port, convert it to a number:
  // readLine() reads the new value and returns to inString
  let inString = serial.readLine();

 if(inString.length <= 0) return;
//give a value to the dataMode through "if" statement
  if (inString === "potentiometer") {
    dataMode = "potentiometer"
  } else if(inString === "button") {
    dataMode = "button"
  } else if(inString === "sensorPin") {
      dataMode = "sensorPin"
    }
    //use the previous dataMode to give value to "potentiometer", "button" and "sensorPin"
  else if(dataMode === "potentiometer") {
      potentiometerData = inString
    } else if (dataMode === "button") {
      buttonData = inString
    }else if (dataMode === "sensorPin") {
      sensorPinData = inString
    } 
  inData = inString
}

//reference: inspired from the starter code generated from p5.serialcontrol
function serverConnected() {
  print("Connected to Server");
 }

 function gotList(thelist) {
  print("List of Serial Ports:");
  for (let i = 0; i < thelist.length; i++) {
   print(i + " " + thelist[i]);
  }
 }
 
 function gotOpen() {
  print("Serial Port is Open");
 }
 
 function gotClose(){
  print("Serial Port is Closed");
  latestData = "Serial Port is Closed";
 }
 
 function gotError(theerror) {
  print(theerror);
 }