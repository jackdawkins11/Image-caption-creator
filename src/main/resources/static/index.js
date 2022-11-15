var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Meme(props) {
	return React.createElement(
		"div",
		{ style: { display: "flex", flexDirection: "row", backgroundColor: props.idx % 2 == 0 ? "gainsboro" : "darkGrey" } },
		props.meme.image && React.createElement("img", { alt: "not found", style: { height: "100px", width: "100px" }, src: URL.createObjectURL(props.meme.image) }),
		!props.meme.image && React.createElement(
			"label",
			{ htmlFor: "input" + props.idx, style: { height: "100px", width: "100px" } },
			"Choose file",
			React.createElement("input", { type: "file", style: { display: "none" },
				name: "myImage", id: "input" + props.idx, onChange: props.onInputChange })
		),
		props.idx == 0 && React.createElement("textarea", { placeholder: "Talk shit here...", value: props.meme.caption, onChange: props.onTextAreaChange,
			onKeyUp: props.onTextAreaKeyUp,
			style: { border: "none", outline: "none", resize: "none", flex: "auto", background: "transparent" } }),
		props.idx != 0 && React.createElement(
			"p",
			null,
			props.meme.caption
		)
	);
}

var UploadAndDisplayImages = function (_React$Component) {
	_inherits(UploadAndDisplayImages, _React$Component);

	function UploadAndDisplayImages(props) {
		_classCallCheck(this, UploadAndDisplayImages);

		var _this = _possibleConstructorReturn(this, (UploadAndDisplayImages.__proto__ || Object.getPrototypeOf(UploadAndDisplayImages)).call(this, props));

		_this.state = { memes: [{ image: null, caption: '' }] };
		return _this;
	}

	_createClass(UploadAndDisplayImages, [{
		key: "onTextAreaKeyUp",
		value: function onTextAreaKeyUp(e, idx) {
			if (idx == 0 && e.keyCode == 13) {
				var memes = [{ image: null, caption: '' }].concat(this.state.memes);
				this.setState({ memes: memes });
				return;
			}
		}
	}, {
		key: "onTextAreaChange",
		value: function onTextAreaChange(e, idx) {
			var memes = this.state.memes.slice();
			memes[idx] = { image: memes[idx].image, caption: e.target.value };
			this.setState({ memes: memes });
		}
	}, {
		key: "onInputChange",
		value: function onInputChange(e, idx) {
			var memes = this.state.memes.slice();
			memes[idx] = { image: e.target.files[0], caption: memes[idx].caption };
			this.setState({ memes: memes });
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			console.log(this.state);
			return React.createElement(
				"div",
				{ style: { display: "flex", flexDirection: "column", alignItems: "stretch" } },
				this.state.memes.map(function (meme, idx) {
					return React.createElement(Meme, { meme: meme, key: idx, idx: idx,
						onInputChange: function onInputChange(e) {
							_this2.onInputChange(e, idx);
						},
						onTextAreaChange: function onTextAreaChange(e) {
							_this2.onTextAreaChange(e, idx);
						},
						onTextAreaKeyUp: function onTextAreaKeyUp(e) {
							_this2.onTextAreaKeyUp(e, idx);
						} });
				})
			);
		}
	}]);

	return UploadAndDisplayImages;
}(React.Component);

;

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(UploadAndDisplayImages, null));