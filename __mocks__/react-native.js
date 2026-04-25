module.exports = {
  View: 'View',
  Text: 'Text',
  Image: 'Image',
  Animated: {
    View: 'Animated.View',
    timing: jest.fn(() => ({ start: jest.fn(), stop: jest.fn() })),
    loop: jest.fn(() => ({ start: jest.fn(), stop: jest.fn() })),
    sequence: jest.fn(() => ({ start: jest.fn(), stop: jest.fn() })),
    Value: jest.fn(() => ({
      interpolate: jest.fn(),
      setValue: jest.fn(),
    })),
  },
  StyleSheet: {
    create: (s) => s,
    flatten: (s) => (Array.isArray(s) ? Object.assign({}, ...s) : s),
  },
  Platform: {
    OS: 'ios',
  },
};
