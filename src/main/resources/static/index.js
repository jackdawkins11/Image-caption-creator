var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var UploadAndDisplayImages = function (_React$Component) {
	_inherits(UploadAndDisplayImages, _React$Component);

	function UploadAndDisplayImages(props) {
		_classCallCheck(this, UploadAndDisplayImages);

		var _this = _possibleConstructorReturn(this, (UploadAndDisplayImages.__proto__ || Object.getPrototypeOf(UploadAndDisplayImages)).call(this, props));

		_this.state = { image: null, caption: "", memes: [] };
		return _this;
	}

	_createClass(UploadAndDisplayImages, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			setInterval(function () {
				return _this2.getMemes();
			}, 500);
		}
	}, {
		key: "getMemes",
		value: function getMemes() {
			var _this3 = this;

			var loaded = [];
			fetch('/memes').then(function (r) {
				return r.json();
			}).then(function (r) {
				_this3.setState({ memes: r });
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
			var _this4 = this;

			return React.createElement(
				"div",
				{ style: { display: "flex", flexDirection: "column", alignItems: "stretch" } },
				React.createElement(UploadMeme, { image: this.state.image, caption: this.state.caption,
					onInputChange: function onInputChange(e) {
						_this4.onInputChange(e);
					},
					onTextAreaChange: function onTextAreaChange(e) {
						_this4.onTextAreaChange(e);
					},
					onTextAreaKeyUp: function onTextAreaKeyUp(e) {
						_this4.onTextAreaKeyUp(e);
					} }),
				this.state.memes.map(function (meme, idx) {
					return React.createElement(Meme, { image: "/" + meme.id, caption: meme.caption, key: idx, idx: idx });
				})
			);
		}
	}]);

	return UploadAndDisplayImages;
}(React.Component);

;

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(UploadAndDisplayImages, null));