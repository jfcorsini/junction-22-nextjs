import React from "react";
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import { map } from "./utils";

const W = 1000
const H = 1000;

class NoisyWaves {
  waves: NoisySine[]
  N: number;

  constructor(xscale: number, yspeed: number, p5: p5Types) {
    this.waves = [];
    this.N = 120;
    for (var i = 0; i < this.N; i++){
      let y_attn = map(i,0,this.N,-H*0.12,H*0.3);
      this.waves.push(new NoisySine(p5, xscale,yspeed,y_attn,i*0.005));
    }
  }

  adjust() {
    for (var i = 0; i < this.N; i++){
      this.waves[i].y_attn = map(i,0,this.N,-H*0.12,H*0.3);
    }
  }

  run() {
    for (var i = 0; i < this.N; i++){
      this.waves[i].display();
    }
  }
}

class NoisySine {
  N: number;
  x_scale: number;
  y_speed: number;
  y_attn: number;
  offset: number;
  p5: p5Types;

  constructor(p5: p5Types, x_scale_: number,y_speed_: number,y_attn_: number,offset_: number) {
    this.p5 = p5
    this.N = 256;
    this.x_scale = x_scale_;
    this.y_speed = y_speed_;
    this.y_attn = y_attn_;
    this.offset = offset_;
  }

  display() {
    var r = 160;
    this.p5.push();
    this.p5.translate(W/2,H/2);
    this.p5.beginShape();
    for (var i = 0; i < this.N; i++){
      let x = this.p5.norm(i,0,this.N)*W/1.34;
      let y_off = this.p5.lerp(-this.y_attn,this.y_attn,this.p5.noise(x*this.x_scale,this.p5.frameCount*this.y_speed + this.offset));
      // let y = (-H/2)+y_off;
      let theta = this.p5.radians(x) + this.p5.PI/2;
      x = r * this.p5.sin(theta);
      let y = r * this.p5.cos(theta)+y_off/1.6;
      if(this.p5.frameCount < 90){y = r * this.p5.cos(theta)+y_off/2};
      if(this.p5.frameCount < 60){y = r * this.p5.cos(theta)+y_off/3.2};
      if(this.p5.frameCount < 30){y = r * this.p5.cos(theta)+y_off/4.8};
      if (y > H/2) {y = y-y_off/16};
      if (y < -H/2) {y = y+y_off/16};
      this.p5.curveVertex(x,y);
    }
    this.p5.endShape();
    // beginShape();
    // ellipse(0, 0, 800, 320);
    // endShape();
    this.p5.pop();
  }
}

const MySketch = () => {
  let waveSys: NoisyWaves;

	//See annotations in JS for more information
	const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(W, H);
    p5.smooth();
    p5.frameRate(30);
    p5.strokeWeight(0.1);
    p5.stroke(255);
    p5.noFill();
    //initialize class with universal x noise scale and noise speed
    waveSys = new NoisyWaves(0.02,0.008, p5);
	};

	const draw = (p5: p5Types) => {
		p5.background(0);
    waveSys.run();
	};

	return (<Sketch setup={setup} draw={draw} />);
};

export default MySketch;