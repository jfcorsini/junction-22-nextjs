import React from "react";
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense

interface ComponentProps {
	//Your component props
}

const MySketch: React.FC<ComponentProps> = (props: ComponentProps) => {
	//See annotations in JS for more information
	class Particle {
		centerY: number
		centerX: number
		r: number
		surfaceR: number
		speed: number
		angle: number
		size: number
		forceOutside: number;
		bounce: number;

		constructor(centerX: number, centerY: number, a: number, surfaceR: number, p5: p5Types) {
			this.centerY = centerY;
			this.centerX = centerX;
			this.r = surfaceR+p5.random(80);
			this.surfaceR = surfaceR;
			this.speed = 0;
			this.angle = a;
			this.size = 0.5+p5.random(1.7);
			this.forceOutside = 0.2;
			this.bounce = this.forceOutside * 5 + p5.random(1.5);
		}

		move(intensity: number) {
			if (this.r > this.surfaceR) {
				this.speed -= this.forceOutside * (this.r/100);
			} else {
				this.speed = this.bounce * intensity;
			}
			this.r += this.speed;
			if (this.r < 0) this.r = 0;
		}

		display(p5: p5Types) {
			p5.strokeWeight(this.size);
			p5.stroke(140, 0, 255);
			const angleDraw = this.angle;// + random(PI/300);
			p5.point(this.centerX + ((this.surfaceR+this.r)*Math.cos(angleDraw)), this.centerY + ((this.surfaceR+this.r)*Math.sin(angleDraw)));
		}
	}

	var count = 1000;
	var particles: Particle[] = [];
	var radius = 70;
	const PI=3.1415
	var intensearea = PI/6;
	const intenseAngles = [0+PI/6, PI/3+PI/6, PI*2/3+PI/6, PI+PI/6, PI*4/3+PI/6, PI*5/3+PI/6];
	const intensities = [2, 1.3, 2.5, 0.5, 2.5, 2.1];
	const intensityBaseline = 0.8;

	const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(500, 800).parent(canvasParentRef);
		p5.colorMode(p5.HSB, 255);
		for (let i = 0; i < count; i++) {
			let angle = ((2*PI)/count)*i+p5.random(2);
			particles.push(new Particle(500/2, 800/2, angle, radius, p5));
		}
	};

	const draw = (p5: p5Types) => {
		p5.background(0);
		for (let i = 0; i < particles.length; i++) {
			var intensity = 1;
			for (const angleIndex in intenseAngles) {
				var targetAngle = intenseAngles[angleIndex];//+p5.random(PI/8);
				if (particles[i].angle < targetAngle+intensearea && particles[i].angle > targetAngle-intensearea) {
					//intensity = 0.03/(abs(particles[i].angle - intenseAngle));
					intensity = intensityBaseline+intensities[angleIndex]*((intensearea-Math.abs(particles[i].angle - targetAngle))/intensearea);
				}
			}
			particles[i].move(intensity);
			particles[i].display(p5);
		}
	};

	return <Sketch setup={setup} draw={draw} />;
};

export default MySketch;
