var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *   background
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

//An asteroid stores a location,
//a velocity, and details about drawing it
var Asteroid = function () {
  //Initialize a new asteroid
  function Asteroid(x, y, vx, vy, MAXRADIUS) {
    _classCallCheck(this, Asteroid);

    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.r = Math.random() * MAXRADIUS;

    var rand = Math.random();
    if (rand <= 0.5) {
      this.fillStyle = "rgba(255, 255, 255, 1)";
      this.shadowColor = "rgba(255, 255, 255, 0.5)";
      this.shadowBlur = 3;
    } else if (rand > 0.75) {
      this.fillStyle = "rgba(255, 254, 196, 1)";
      this.shadowColor = "rgba(255, 254, 196, 0.5)";
      this.shadowBlur = 4;
    } else {
      this.fillStyle = "rgba(192, 247, 255, 1)";
      this.shadowColor = "rgba(192, 247, 255, 0.5)";
      this.shadowBlur = 7;
    }
  }

  //Move it as if one unit of time has passed


  _createClass(Asteroid, [{
    key: "update",
    value: function update() {
      this.x += this.vx;
      this.y += this.vy;
    }

    //Check if the asteroid has left the screen

  }, {
    key: "inBounds",
    value: function inBounds(w, h) {
      return this.x < w && this.y < h;
    }

    //Draw the asteroid to the canvas

  }, {
    key: "draw",
    value: function draw(canvas, ctx, simulWidth, simulHeight) {

      var px = this.x / simulWidth * canvas.width * 1.05;
      var py = this.y / simulHeight * canvas.height * 1.05;

      ctx.beginPath();
      ctx.arc(px, py, this.r, 0, 2 * Math.PI, false);
      ctx.fillStyle = this.fillStyle;
      ctx.shadowColor = this.shadowColor;
      ctx.shadowBlur = this.shadowBlur;
      ctx.fill();
    }
  }]);

  return Asteroid;
}();

var Simulation = function () {
  //This stores the state of the simulation
  function Simulation(width, height) {
    _classCallCheck(this, Simulation);

    //
    this.asteroids = [];
    this.width = width;
    this.height = height;
    this.paused = false;

    this.MAXVELOCITY = 5;
    this.AVGSLOPE = 10;
    this.PROBNEWASTEROID = 0.5;
    this.MAXRADIUS = 15;
  }

  //Draw the current state of the simulation to the screen


  _createClass(Simulation, [{
    key: "paint",
    value: function paint(canvas, ctx) {
      //clear the screen
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      //draw each asteroid
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.asteroids[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var asteroid = _step.value;

          asteroid.draw(canvas, ctx, this.width, this.height);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    //Calls update on each asteroid
    //Deletes all out of bounds asteroids
    //Possibly creates a new asteroid

  }, {
    key: "update",
    value: function update() {
      var _this = this;

      if (this.paused) {
        return;
      }
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.asteroids[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var asteroid = _step2.value;

          asteroid.update();
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      this.asteroids = this.asteroids.filter(function (asteroid) {
        return asteroid.inBounds(_this.width, _this.height);
      });
      this.randomAsteroids();
    }

    //Possibly adds a new asteroid

  }, {
    key: "randomAsteroids",
    value: function randomAsteroids() {
      if (Math.random() <= this.PROBNEWASTEROID) {
        this.asteroids.push(new Asteroid(Math.random() * this.width, //random x
        0, //top of screen
        (Math.random() * 0.5 - 0.25) * this.MAXVELOCITY, //vx in (-0.25 , 0.25)
        Math.random() * this.MAXVELOCITY, //vy in (0, 1)
        this.MAXRADIUS));
      }
    }
  }]);

  return Simulation;
}();

var BackgroundCanvas = function (_React$Component) {
  _inherits(BackgroundCanvas, _React$Component);

  function BackgroundCanvas(props) {
    _classCallCheck(this, BackgroundCanvas);

    var _this2 = _possibleConstructorReturn(this, (BackgroundCanvas.__proto__ || Object.getPrototypeOf(BackgroundCanvas)).call(this, props));

    _this2.simul = new Simulation(1000, 1000);
    _this2.simul.randomAsteroids();
    _this2.canvasRef = React.createRef();
    return _this2;
  }

  _createClass(BackgroundCanvas, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      //window.addEventListener( 'keydown', this.onKeyDown.bind(this) )
      //Start the animation loop
      requestAnimationFrame(this.updateBackgroundSimulation.bind(this));
    }

    //Updates the simulation

  }, {
    key: "updateBackgroundSimulation",
    value: function updateBackgroundSimulation() {
      this.simul.update();
      this.canvas = this.canvasRef.current;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.simul.paint(this.canvas, this.canvas.getContext('2d'));
      requestAnimationFrame(this.updateBackgroundSimulation.bind(this));
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(e) {
      if (e.keyCode == 37) {
        //left
        this.simul.MAXVELOCITY /= 2;
      } else if (e.keyCode == 38) {
        //up
        this.simul.PROBNEWASTEROID += 0.1;
        if (this.simul.PROBNEWASTEROID > 1) {
          this.simul.PROBNEWASTEROID = 1;
        }
      } else if (e.keyCode == 39) {
        //right
        this.simul.MAXVELOCITY *= 2;
      } else if (e.keyCode == 40) {
        //down
        this.simul.PROBNEWASTEROID -= 0.1;
        if (this.simul.PROBNEWASTEROID < 0) {
          this.simul.PROBNEWASTEROID = 0;
        }
      } else if (e.keyCode == 32) {
        //enter
        this.simul.paused = !this.simul.paused;
      }
    }
  }, {
    key: "render",
    value: function render() {
      //Render the background simulation
      return React.createElement("canvas", { ref: this.canvasRef,
        style: {
          backgroundColor: "#2e2e2e",
          position: "fixed",
          zIndex: -100,
          top: 0,
          left: 0
        }
      });
    }
  }]);

  return BackgroundCanvas;
}(React.Component);

/*
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *	TEXT SERVER
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * */

//we need props.image and props.caption and props.onInputChange and props.onTextAreaChange and props.onTextAreaKeyUp


function UploadMeme(props) {
  return React.createElement(
    "div",
    { style: { display: "flex", flexDirection: "row", backgroundColor: "gainsboro" } },
    props.image && React.createElement("img", { alt: "not found", style: { height: "100px", width: "100px" }, src: URL.createObjectURL(props.image) }),
    !props.image && React.createElement(
      "label",
      { htmlFor: "input", style: { height: "100px", width: "100px" } },
      "Choose file",
      React.createElement("input", { type: "file", style: { display: "none" },
        name: "myImage", id: "input", onChange: props.onInputChange })
    ),
    React.createElement("textarea", { placeholder: "Talk shit here...", value: props.caption, onChange: props.onTextAreaChange,
      onKeyUp: props.onTextAreaKeyUp,
      style: { border: "none", outline: "none", resize: "none", flex: "auto", background: "transparent" } })
  );
}

//we need props.image and props.caption
function Meme(props) {
  return React.createElement(
    "div",
    { style: { display: "flex", flexDirection: "row", backgroundColor: props.idx % 2 == 1 ? "gainsboro" : "darkGrey" } },
    React.createElement("img", { alt: "not found", style: { height: "100px", width: "100px" }, src: props.image }),
    React.createElement(
      "p",
      null,
      props.caption
    )
  );
}

var UploadAndDisplayImages = function (_React$Component2) {
  _inherits(UploadAndDisplayImages, _React$Component2);

  function UploadAndDisplayImages(props) {
    _classCallCheck(this, UploadAndDisplayImages);

    var _this3 = _possibleConstructorReturn(this, (UploadAndDisplayImages.__proto__ || Object.getPrototypeOf(UploadAndDisplayImages)).call(this, props));

    _this3.state = { image: null, caption: "", memes: [] };
    return _this3;
  }

  _createClass(UploadAndDisplayImages, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this4 = this;

      setInterval(function () {
        return _this4.getMemes();
      }, 500);
    }
  }, {
    key: "getMemes",
    value: function getMemes() {
      var _this5 = this;

      var loaded = [];
      fetch('/memes').then(function (r) {
        return r.json();
      }).then(function (r) {
        _this5.setState({ memes: r });
      });
    }
  }, {
    key: "onTextAreaKeyUp",
    value: function onTextAreaKeyUp(e) {
      if (e.keyCode == 13) {
        var data = new FormData();
        data.append('file', this.state.image);
        data.append('caption', this.state.caption);
        fetch('/meme', {
          method: 'POST',
          body: data
        });
        this.setState({ image: null, caption: this.state.caption });
      }
    }
  }, {
    key: "onTextAreaChange",
    value: function onTextAreaChange(e) {
      this.setState({ image: this.state.image, caption: e.target.value });
    }
  }, {
    key: "onInputChange",
    value: function onInputChange(e) {
      this.setState({ image: e.target.files[0], caption: this.state.caption });
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      return React.createElement(
        "div",
        null,
        React.createElement(BackgroundCanvas, null),
        React.createElement(
          "div",
          { style: { display: "flex", flexDirection: "column", alignItems: "stretch", opacity: "0.7" } },
          React.createElement(UploadMeme, { image: this.state.image, caption: this.state.caption,
            onInputChange: function onInputChange(e) {
              _this6.onInputChange(e);
            },
            onTextAreaChange: function onTextAreaChange(e) {
              _this6.onTextAreaChange(e);
            },
            onTextAreaKeyUp: function onTextAreaKeyUp(e) {
              _this6.onTextAreaKeyUp(e);
            } }),
          this.state.memes.map(function (meme, idx) {
            return React.createElement(Meme, { image: "/uploads/" + meme.id, caption: meme.caption, key: idx, idx: idx });
          })
        )
      );
    }
  }]);

  return UploadAndDisplayImages;
}(React.Component);

;

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(UploadAndDisplayImages, null));