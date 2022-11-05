import React from "react";
import Sketch from "react-p5";
import IP5 from "p5";

import { getRainbowHSL } from "./colors";

const MAX_ITERATIONS = 1500;
const GOLDEN_RATIO = (Math.sqrt(5) + 1) / 2 - 1;
const GOLDEN_ANGLE = GOLDEN_RATIO * (2 * Math.PI);

interface Props {}

interface State {
  isModalOpen: boolean;
}

type Position = [number, number];

interface Point {
  position: Position;
  radius: number;
}

interface SketchState {
  batchSize: number;
  direction: "in" | "out";
  rotation: number;
  mode: "fill" | "erase";
  iteration: number;
  colorFrom?: IP5.Color;
  colorTo?: IP5.Color;
  points: Point[];
  dimensions: {
    h: number;
    w: number;
  };
}

const SKETCH_INITIAL_STATE: SketchState = {
  batchSize: 0,
  direction: "out",
  mode: "fill",
  iteration: 0,
  colorFrom: undefined,
  colorTo: undefined,
  points: [],
  rotation: 0,
  dimensions: {
    w: 0,
    h: 0
  }
};

export default class App extends React.Component<Props, State> {
  constructor(props: {}) {
    super(props);
    this.draw = this.draw.bind(this);
    this.setup = this.setup.bind(this);
  }

  state: State = {
    isModalOpen: false
  };

  sketch: SketchState = SKETCH_INITIAL_STATE;

  get circleRadius() {
    return this.sketch.dimensions.h * 0.4 - 20;
  }

  get center() {
    return {
      x: this.sketch.dimensions.w / 2,
      y: this.sketch.dimensions.h / 2
    };
  }

  render() {
    return (
      <div>
        <Sketch setup={this.setup} draw={this.draw} />
      </div>
    );
  }

  handleToggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  setup(p5: IP5, parentRef: Element) {
    const [h, w] = [p5.windowWidth / 3, p5.windowWidth / 3];

    this.sketch.dimensions = { h, w };
    this.sketch.colorFrom = p5.color("#A6CF02");
    this.sketch.colorTo = p5.color("#229946");

    p5.createCanvas(w, h).parent(parentRef);
    p5.colorMode(p5.HSL);
    p5.background(0);

    // pre-populate points
    for (let i = 0; i < MAX_ITERATIONS; i++) {
      const radius = 0.01 * i;
      const ratio = i / MAX_ITERATIONS;
      const angle = i * GOLDEN_ANGLE;
      const spiralRadius = ratio * this.circleRadius;

      const position: Position = [
        this.center.x + p5.cos(angle) * spiralRadius,
        this.center.y + p5.sin(angle) * spiralRadius
      ];

      this.sketch.points.push({ position, radius });
    }
  }

  getRandomColor(p5: IP5) {
    return p5.color(
      getRainbowHSL(
        p5.random(0, MAX_ITERATIONS / 2 - 1),
        p5.random(MAX_ITERATIONS / 2, MAX_ITERATIONS),
        MAX_ITERATIONS
      )
    );
  }

  drawInOut(p5: IP5, erase = false) {
    const { iteration, batchSize } = this.sketch;

    for (let i = 0; i < batchSize; ++i) {
      const index = iteration + i;

      this.drawPoint(p5, index, erase);
    }

    this.sketch.iteration += batchSize;
  }

  drawOutIn(p5: IP5, erase = false) {
    const { iteration, batchSize } = this.sketch;

    for (let i = batchSize; i >= 0; --i) {
      const index = iteration - i;

      this.drawPoint(p5, index, erase);
    }

    this.sketch.iteration -= batchSize;
  }

  setRandomColorRangeFillMode(p5: IP5) {
    this.sketch.mode = "fill";
    this.sketch.colorFrom = this.getRandomColor(p5);
    this.sketch.colorTo = this.getRandomColor(p5);
  }

  drawAnimated(p5: IP5) {
    const { iteration, batchSize, direction, mode } = this.sketch;

    const isEraseMode = mode === "erase";

    switch (direction) {
      case "out":
        if (iteration < MAX_ITERATIONS) {
          // timing function ease-in-out-quad
          if (iteration < MAX_ITERATIONS * 0.4 && batchSize < 25) {
            this.sketch.batchSize += 1;
          }

          if (
            iteration >= MAX_ITERATIONS * 0.75 &&
            batchSize > (isEraseMode ? 5 : 15)
          ) {
            this.sketch.batchSize -= 2;
          }

          this.drawInOut(p5, isEraseMode);
        } else {
          this.sketch.batchSize = 0;

          switch (this.sketch.mode) {
            case "fill":
              this.sketch.iteration = 0;
              this.sketch.mode = "erase";
              break;
            case "erase":
              this.sketch.direction = "in";
              this.setRandomColorRangeFillMode(p5);
              break;
          }
        }
        break;
      case "in":
        if (this.sketch.iteration >= 0) {
          // timing function ease-in-out-quad
          if (
            this.sketch.iteration >= MAX_ITERATIONS * 0.75 &&
            this.sketch.batchSize < (isEraseMode ? 25 : 15)
          ) {
            this.sketch.batchSize += 1;
          }

          if (
            this.sketch.iteration < MAX_ITERATIONS * 0.25 &&
            this.sketch.batchSize > 5
          ) {
            this.sketch.batchSize -= 2;
          }

          this.drawOutIn(p5, isEraseMode);
        } else {
          this.sketch.batchSize = 0;

          switch (mode) {
            case "fill":
              this.sketch.iteration = MAX_ITERATIONS;
              this.sketch.mode = "erase";
              break;
            case "erase":
              this.sketch.direction = "out";
              this.setRandomColorRangeFillMode(p5);
              break;
          }
        }
        break;
    }
  }

  drawPoint(p5: IP5, i: number, erase: boolean) {
    const isOutOfBounds = i >= MAX_ITERATIONS || i < 0;

    if (isOutOfBounds) {
      return;
    }

    const point: Point = this.sketch.points[i];

    const [x, y] = point.position;

    p5.ellipse(x, y, point.radius);

    const color = erase
      ? p5.color(0)
      : p5.lerpColor(
          this.sketch.colorFrom ?? p5.color("red"),
          this.sketch.colorTo ?? p5.color("blue"),
          i / MAX_ITERATIONS
        );

    p5.fill(color);
  }

  drawStatic(p5: IP5) {
    this.sketch.points.forEach((_, i) => {
      this.drawPoint(p5, i, false);
    });
  }

  draw(p5: IP5) {
    this.drawAnimated(p5);
  }
}
