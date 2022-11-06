import React, { useEffect, useRef } from "react";
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import { mockData } from "../../utils/mock";

interface ComponentProps {
	//Your component props
	//getDateLocation: () => number;
	width: number;
}

const MySketch: React.FC<ComponentProps> = (props: ComponentProps) => {
	var mocks = mockData;

	var currentMockNumber = 0;
	useEffect(() => {
    const interval = setInterval(() => {
      currentMockNumber++;
    }, 4000);
    return () => clearInterval(interval);
  }, []);

	var x = 5
	var ogSpeed = 0.1
	const height = 40
	const width = props.width
	const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(width, height).parent(canvasParentRef);
		p5.colorMode(p5.HSB, 255);
	};

	const draw = (p5: p5Types) => {
		const targetLocation = 5 + ((currentMockNumber * (1 / mockData.length) * (width-10))%(width-10) )
		var speed = ogSpeed * Math.abs(targetLocation-x)
		if (Math.abs(targetLocation-x) > ogSpeed) {
			if (targetLocation > x) x += speed
			else x -= speed
		}
		p5.background(0);
		// line
		p5.strokeWeight(2);
		p5.stroke(140, 0, 255)
    p5.line(0, height/2, width, height/2)

		// start and end
		p5.strokeWeight(4);
		p5.line(0, height/3, 0, 2*height/3)
		p5.line(width, height/3, width, 2*height/3)

		// Marker
		p5.strokeWeight(10);
		p5.point(x, height/2);
		//p5.text(dateNumber, x, height/2)
  }

	return <Sketch setup={setup} draw={draw} />;
};

export default MySketch;
