# ¡Cumpleañeros!

El presente proyecto muestra una implementación de un recordador de cumpleaños utilizando arduino y una aplicación web. El objetivo es que el usuario desde la aplicación pueda gestionar distintos cumpleañeros que desea ser notificado el día que cumplan años. Cada usuario cuenta con una cuenta donde se almacenarán sus cumpleañeros en una base de datos.

## Requisitos

El Arduino debe tener instalado Standard Firmata y estar conectado.

## Lista de componentes

* Arduino Uno
* Protoboard 
* Display LCD 16X2
* Potenciómetro
* Buzzer
* Led RGB

## Diagrama

![Diagrama.](https://raw.githubusercontent.com/Esthebam/arduino-final/master/src/assets/diagrama.png?token=AHO6LL6ELNYGM7ITGT6TQKLA7DEPW)

## Instalación

Ejecutar `npm install` para descargar e instalar todas las dependencias.

Ejecutar `npm run dev` para iniciar la aplicación corriendo en modo desarrollo

Ejecutar `npm run arduino:dev` para iniciar la aplicación en modo desarrollo junto con el archivo arduino.js conectándose de forma local.

Ejecutar `npm run arduino` para iniciar la aplicación en modo producción junto con el archivo arduino.js conectándose al servidor indicado en el archivo config.js. Es necesario que la aplicación se encuentre deployada.

## Aplicación

La aplicación se encuentra deployada en https://agile-taiga-96267.herokuapp.com/