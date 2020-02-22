const O = [
  [
    [1, 1],
    [1, 1]
  ]
];

const I = [[[1], [1], [1], [1]], [[1, 1, 1, 1]]];

const Z = [
  [
    [1, 1, 0],
    [0, 1, 1]
  ],
  [
    [0, 1],
    [1, 1],
    [1, 0]
  ]
];

const S = [
  [
    [0, 1, 1],
    [1, 0, 0]
  ],
  [
    [1, 0],
    [1, 1],
    [0, 1]
  ]
];

const L = [
  [
    [1, 0],
    [1, 0],
    [1, 1]
  ],
  [
    [0, 0, 1],
    [1, 1, 1]
  ],
  [
    [1, 1],
    [0, 1],
    [0, 1]
  ],
  [
    [1, 1, 1],
    [1, 0, 0]
  ]
];
const J = [
  [
    [0, 1],
    [0, 1],
    [1, 1]
  ],
  [
    [1, 1, 1],
    [0, 0, 1]
  ],
  [
    [1, 1],
    [1, 0],
    [1, 0]
  ],
  [
    [1, 0, 0],
    [1, 1, 1]
  ]
];

const T = [
  [
    [1, 1, 1],
    [0, 1, 0]
  ],
  [
    [1, 0],
    [1, 1],
    [1, 0]
  ],
  [
    [0, 1, 0],
    [1, 1, 1]
  ],
  [
    [0, 1],
    [1, 1],
    [0, 1]
  ]
];

module.exports.pieces = [T, O, I, Z, S, L, J];
