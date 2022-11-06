import React, { useEffect, useRef } from "react";
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import { getMocks } from "../../utils/mock";

const MySketch = () => {
  var mocks = getMocks();
  const intensitiesRef = useRef<number[]>(Object.values(mocks.nextMock().intensities))
  
  useEffect(() => {
    const interval = setInterval(() => {
      intensitiesRef.current = Object.values(mocks.nextMock().intensities)
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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

	const intensityBaseline = 0.8;

	const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(500, 600).parent(canvasParentRef);
		p5.colorMode(p5.HSB, 255);
		for (let i = 0; i < count; i++) {
			let angle = ((2*PI)/count)*i+p5.random(2);
			particles.push(new Particle(500/2, 600/2, angle, radius, p5));
		}
	};

	const draw = (p5: p5Types) => {
    const intensities = intensitiesRef.current
		p5.background(0);
		for (let i = 0; i < particles.length; i++) {
			var intensity = 1;
			for (const angleIndex in intenseAngles) {
				var targetAngle = intenseAngles[angleIndex];//+p5.random(PI/8);
				if (particles[i].angle < targetAngle+intensearea && particles[i].angle > targetAngle-intensearea) {
					//intensity = 0.03/(abs(particles[i].angle - intenseAngle));
					intensity = intensityBaseline+ 3*intensities[angleIndex]*((intensearea-Math.abs(particles[i].angle - targetAngle))/intensearea);
				}
			}
			particles[i].move(intensity);
			particles[i].display(p5);
		}
	};


	const positions = []
	var parameterTextRadius = 250;

	const parametertexts = [
		"SLEEP",
		"HRV",
		"TEMPERATURE",
		"ACTIVITY",
		"BREATH",
		"WORK",
	];

	for (const angle of intenseAngles) {
		positions.push([500/2+1.1*parameterTextRadius*Math.cos(angle)-75, 600/2+parameterTextRadius*Math.sin(angle)-20])
	}

	return (
		<>
		<div style={{ position: "relative"}}>
			<Sketch setup={setup} draw={draw} />
			<div style={{zIndex: 2}}>
				<p style={{textAlign: "center", width: 150, position: "absolute", color: "white", left: positions[0][0], top: positions[0][1]}}>{parametertexts[0]}</p>
				<p style={{textAlign: "center", width: 150, position: "absolute", color: "white", left: positions[1][0], top: positions[1][1]}}>{parametertexts[1]}</p>
				<p style={{textAlign: "center", width: 150, position: "absolute", color: "white", left: positions[2][0], top: positions[2][1]}}>{parametertexts[2]}</p>
				<p style={{textAlign: "center", width: 150, position: "absolute", color: "white", left: positions[3][0], top: positions[3][1]}}>{parametertexts[3]}</p>
				<p style={{textAlign: "center", width: 150, position: "absolute", color: "white", left: positions[4][0], top: positions[4][1]}}>{parametertexts[4]}</p>
				<p style={{textAlign: "center", width: 150, position: "absolute", color: "white", left: positions[5][0], top: positions[5][1]}}>{parametertexts[5]}</p>
			</div>
		</div>
		</>
	);
};

export default MySketch;
