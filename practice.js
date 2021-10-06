"use strict";

class Car {
  constructor(brand, year) {
    this.brand = brand;
    this.year = year;
    this.speed = 0;
  }

  myLibrary = [];
  get brand() {
    return this._brand;
  }

  a() {
    this.myLibrary.push(this);
  }
  set brand(value) {
    if (value.length < 4) {
      console.log("Too Short");
      return;
    }
    this._brand = value;
  }

  get year() {
    return this._year;
  }

  set year(value) {
    this._year = value;
  }

  accelerate() {
    this.speed += 10;
  }

  brake() {
    this.speed -= 20;
  }
}

const car = new Car("BMW", 2020);

car.brand = "Benz";
car.year = 2199;

car.accelerate();
car.accelerate();
car.accelerate();
car.accelerate();
car.accelerate();
car.accelerate();
car.accelerate();

console.log(car);
