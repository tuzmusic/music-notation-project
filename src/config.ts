export const config = {
  page: {
    topMargin: 40
  },
  staff: {
    baseLineSize: 1,
    baseSpaceSize: 10,
    lines: 5
  },
  barline: {
    baseThickness: 3
  }
} as const


export const noteSpacing = {
  systemStart: {
    to: {
      clef: 2
    }
  },
  clef: {
    to: {
      notehead: 4
    }
  },
  notehead: {
    to: {
      notehead: 2
    }
  }
}
