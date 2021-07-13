const io = require('socket.io-client');
const five = require('johnny-five');

const socket = io.connect('http://localhost:4000');

const board = new five.Board();

board.on('ready', function() {

  const lcd = new five.LCD({
    pins: [7, 8, 9, 10, 11, 12],
    backlight: 6,
    rows: 2,
    cols: 20
  });

  const piezo = new five.Piezo(3);
  const rgb = new five.Led.RGB([6, 5, 4]);
  let index = 0;
  const rainbow = ["FF0000", "FF7F00", "FFFF00", "00FF00", "0000FF", "4B0082", "8F00FF"];

  lcd.useChar("check");

  socket.on('notification:on', data => {
    
      lcd.on();
      lcd.clear().print(`Hoy cumple ${data.edad}:`);
      lcd.cursor(1, 0);
      lcd.print(`${data.nombre} ${data.apellido} :check:`);

      piezo.play({
        song: "C D F D A - A A A A G G G G - - C D F D G - G G G G F F F F - -",
        beats: 1 / 4,
        tempo: 100
      });

      for (let step = 0; step < rainbow.length; step++) {
        rgb.color(rainbow[index++]);
        if (index === rainbow.length) {
          index = 0;
        }
      }
  });

  socket.on('notification:off', function(){
    piezo.off();
    rgb.off();
    lcd.off();
  });

});