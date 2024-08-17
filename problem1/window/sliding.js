class SlidingWindow {
  constructor(size) {
      this.size = size;
      this.window = [];
  }

  addNumber(number) {
      if (this.window.length >= this.size) {
          this.window.shift(); // Remove the oldest number to maintain the window size
      }
      this.window.push(number);
  }

  getNumbers() {
      return this.window;
  }

  getPreviousNumbers() {
      return this.window.slice(0, this.window.length - 1);
  }

  getCurrentState() {
      return [...this.window];
  }
}

module.exports = SlidingWindow;
