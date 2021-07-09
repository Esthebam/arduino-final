const io = require('socket.io-client');
const five = require('johnny-five');
const config = require('./config');

// Connect to the socket server
const socket = io.connect(config.url);

const board = new five.Board();

board.on('ready', function() {

  const led = new five.Led(13); // Set pin 13 for LED

  lcd = new five.LCD({
    // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
    // Arduino pin # 7    8   9   10  11  12
    pins: [7, 8, 9, 10, 11, 12],
    backlight: 6,
    rows: 2,
    cols: 20


    // Options:
    // bitMode: 4 or 8, defaults to 4
    // lines: number of lines, defaults to 2
    // dots: matrix dimensions, defaults to "5x8"
  });

   // Tell the LCD you will use these characters:
   lcd.useChar("check");
   lcd.useChar("heart");
   lcd.useChar("duck");

  // Turn LED on when event led:on is received
  socket.on('led:on', function(){
    lcd.clear().print("Hola");
    lcd.cursor(1, 0);

    // Line 2: I <3 johnny-five
    // lcd.print("I").write(7).print(" johnny-five");
    // can now be written as:
    lcd.print("Como te va ? :duck:");

    led.on();
  });

  // Turn LED off when event led:off is received
  socket.on('led:off', function(){
    lcd.clear().print("Adios");
    lcd.cursor(1, 0);

    // Line 2: I <3 johnny-five
    // lcd.print("I").write(7).print(" johnny-five");
    // can now be written as:
    lcd.print("Suerte :check: :heart:");
    led.off();
  });

});
