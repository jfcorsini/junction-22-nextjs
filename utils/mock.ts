
export type Intensities = {
  sleep: number;
  hrv: number;
  temp: number;
  activity: number;
  respiratory: number;
  workHours: number;
}

type Mock = {
  date: number;
  intensities: Intensities;
  value: Intensities;
}

export const getMocks = () => {
  let counter = 0;

  return {
    nextMock: () => {
      counter++;
      return mockData[counter % mockData.length];
    }
  }
}

export const mockData: Mock[] = [
  {
    date: 1,
    value: {
      sleep: 8,
      hrv: 66,
      temp: 36.6,
      activity: 25,
      respiratory: 17,
      workHours: 8,
    },
    intensities: {
      sleep: 0.0,
      hrv: 0.0,
      temp: 0.0,
      activity: 0.2,
      respiratory: 0.0,
      workHours: 0.1,
    }
  },
  {
    date: 2,
    value: {
      sleep: 8,
      hrv: 66,
      temp: 36.6,
      activity: 27,
      respiratory: 18,
      workHours: 8.2,
    },
    intensities: {
      sleep: 0.0,
      hrv: 0.0,
      temp: 0.0,
      activity: 0.2,
      respiratory: 0.1,
      workHours: 0.1,
    }
  },
  {
    date: 3,
    value: {
      sleep: 8,
      hrv: 66,
      temp: 36.6,
      activity: 22,
      respiratory: 16,
      workHours: 8.5,
    },
    intensities: {
      sleep: 0.0,
      hrv: 0.0,
      temp: 0.0,
      activity: 0.3,
      respiratory: 0.1,
      workHours: 0.1,
    }
  },
  {
    date: 4,
    value: {
      sleep: 8,
      hrv: 66,
      temp: 36.6,
      activity: 25,
      respiratory: 17,
      workHours: 9,
    },
    intensities: {
      sleep: 0.0,
      hrv: 0.0,
      temp: 0.0,
      activity: 0.2,
      respiratory: 0.0,
      workHours: 0.2,
    }
  },
  {
    date: 5,
    value: {
      sleep: 8,
      hrv: 66,
      temp: 36.6,
      activity: 18,
      respiratory: 18,
      workHours: 9,
    },
    intensities: {
      sleep: 0.0,
      hrv: 0.0,
      temp: 0.0,
      activity: 0.4,
      respiratory: 0.1,
      workHours: 0.2,
    }
  },
  {
    date: 6,
    value: {
      sleep: 5,
      hrv: 66,
      temp: 36.6,
      activity: 20,
      respiratory: 16,
      workHours: 9,
    },
    intensities: {
      sleep: 0.4,
      hrv: 0.0,
      temp: 0.0,
      activity: 0.4,
      respiratory: 0.1,
      workHours: 0.2,
    }
  },
  {
    date: 7,
    value: {
      sleep: 3,
      hrv: 66,
      temp: 36.6,
      activity: 15,
      respiratory: 17,
      workHours: 8.5,
    },
    intensities: {
      sleep: 0.6,
      hrv: 0.0,
      temp: 0.0,
      activity: 0.5,
      respiratory: 0.0,
      workHours: 0.1,
    }
  },
  {
    date: 8,
    value: {
      sleep: 3,
      hrv: 66,
      temp: 37.5,
      activity: 18,
      respiratory: 18,
      workHours: 8.5,
    },
    intensities: {
      sleep: 0.6,
      hrv: 0.0,
      temp: 0.0,
      activity: 0.4,
      respiratory: 0.1,
      workHours: 0.1,
    }
  },
  {
    date: 9,
    value: {
      sleep: 5,
      hrv: 75,
      temp: 38,
      activity: 17,
      respiratory: 22,
      workHours: 8.2,
    },
    intensities: {
      sleep: 0.4,
      hrv: 0.1,
      temp: 0.0,
      activity: 0.5,
      respiratory: 0.3,
      workHours: 0.1,
    }
  },
  {
    date: 10,
    value: {
      sleep: 8,
      hrv: 85,
      temp: 37.5,
      activity: 25,
      respiratory: 23,
      workHours: 7.5,
    },
    intensities: {
      sleep: 0.0,
      hrv: 0.3,
      temp: 0.0,
      activity: 0.2,
      respiratory: 0.4,
      workHours: 0.0,
    }
  },
  {
    date: 11,
    value: {
      sleep: 8,
      hrv: 85,
      temp: 36.6,
      activity: 20,
      respiratory: 24,
      workHours: 7.5,
    },
    intensities: {
      sleep: 0.0,
      hrv: 0.3,
      temp: 0.0,
      activity: 0.4,
      respiratory: 0.4,
      workHours: 0.0,
    }
  },
  {
    date: 12,
    value: {
      sleep: 8,
      hrv: 82,
      temp: 36.6,
      activity: 23,
      respiratory: 22,
      workHours: 8.3,
    },
    intensities: {
      sleep: 0.0,
      hrv: 0.2,
      temp: 0.0,
      activity: 0.3,
      respiratory: 0.3,
      workHours: 0.1,
    }
  },
  {
    date: 13,
    value: {
      sleep: 6,
      hrv: 80,
      temp: 36.6,
      activity: 16,
      respiratory: 23,
      workHours: 8.7,
    },
    intensities: {
      sleep: 0.3,
      hrv: 0.2,
      temp: 0.0,
      activity: 0.5,
      respiratory: 0.4,
      workHours: 0.2,
    }
  },
  {
    date: 14,
    value: {
      sleep: 4,
      hrv: 78,
      temp: 36.6,
      activity: 18,
      respiratory: 24,
      workHours: 9.5,
    },
    intensities: {
      sleep: 0.5,
      hrv: 0.2,
      temp: 0.0,
      activity: 0.4,
      respiratory: 0.4,
      workHours: 0.3,
    }
  },
  {
    date: 15,
    value: {
      sleep: 6,
      hrv: 72,
      temp: 36.6,
      activity: 16,
      respiratory: 22,
      workHours: 8.7,
    },
    intensities: {
      sleep: 0.3,
      hrv: 0.1,
      temp: 0.0,
      activity: 0.5,
      respiratory: 0.3,
      workHours: 0.2,
    }
  },
  {
    date: 16,
    value: {
      sleep: 8,
      hrv: 66,
      temp: 36.6,
      activity: 19,
      respiratory: 17,
      workHours: 8.3,
    },
    intensities: {
      sleep: 0.0,
      hrv: 0.0,
      temp: 0.0,
      activity: 0.4,
      respiratory: 0.0,
      workHours: 0.1,
    }
  },
  {
    date: 17,
    value: {
      sleep: 8,
      hrv: 85,
      temp: 36.6,
      activity: 12,
      respiratory: 18,
      workHours: 7.5,
    },
    intensities: {
      sleep: 0.0,
      hrv: 0.3,
      temp: 0.0,
      activity: 0.6,
      respiratory: 0.1,
      workHours: 0.0,
    }
  },
  {
    date: 18,
    value: {
      sleep: 7,
      hrv: 95,
      temp: 36.6,
      activity: 64,
      respiratory: 22,
      workHours: 10,
    },
    intensities: {
      sleep: 0.1,
      hrv: 0.4,
      temp: 0.0,
      activity: 1.0,
      respiratory: 0.3,
      workHours: 0.3,
    }
  },
  {
    date: 19,
    value: {
      sleep: 2,
      hrv: 105,
      temp: 36.6,
      activity: 27,
      respiratory: 23,
      workHours: 8.5,
    },
    intensities: {
      sleep: 0.8,
      hrv: 0.6,
      temp: 0.0,
      activity: 0.2,
      respiratory: 0.4,
      workHours: 0.1,
    }
  },
  {
    date: 20,
    value: {
      sleep: 5,
      hrv: 95,
      temp: 36.6,
      activity: 30,
      respiratory: 24,
      workHours: 7.5,
    },
    intensities: {
      sleep: 0.4,
      hrv: 0.4,
      temp: 0.0,
      activity: 0.1,
      respiratory: 0.4,
      workHours: 0.0,
    }
  },
  {
    date: 21,
    value: {
      sleep: 7,
      hrv: 85,
      temp: 36.6 ,
      activity: 23,
      respiratory: 22 ,
      workHours: 7.5 ,
    },
    intensities: {
      sleep: 0.1 ,
      hrv: 0.3 ,
      temp: 0.0,
      activity: 0.3,
      respiratory: 0.3,
      workHours: 0.0,
    }
  },
]