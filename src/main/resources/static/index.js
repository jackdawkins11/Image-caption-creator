var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * image file + text == meme
 */
function Meme(props) {
	return React.createElement(
		"div",
		null,
		React.createElement("img", { alt: "not found", width: "250px", src: URL.createObjectURL(props.meme.image) }),
		React.createElement(
			"p",
			null,
			props.meme.caption
		)
	);
}

function UploadMeme(props) {
	return React.createElement(
		"div",
		null,
		props.memes[0].image && React.createElement("img", { alt: "not found", width: "250px", src: URL.createObjectURL(props.memes[0].image) }),
		React.createElement("input", { type: "file", name: "myImage", onChange: props.onInputChange }),
		React.createElement("textarea", { placeholder: "Talk shit here...", value: props.memes[0].caption, onChange: props.onTextAreaChange,
			onKeyUp: props.onTextAreaKeyUp })
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
		value: function onTextAreaKeyUp(e) {
			console.log(e.keyCode);
			if (e.keyCode == 13) {
				var memes = [{ image: null, caption: '' }].concat(this.state.memes);
				this.setState({ memes: memes });
				return;
			}
		}
	}, {
		key: "onTextAreaChange",
		value: function onTextAreaChange(e) {
			var memes = this.state.memes.slice();
			memes[0] = { image: memes[0].image, caption: e.target.value };
			this.setState({ memes: memes });
		}
	}, {
		key: "onInputChange",
		value: function onInputChange(e) {
			var memes = this.state.memes.slice();
			memes[0] = { image: e.target.files[0], caption: memes[0].caption };
			this.setState({ memes: memes });
		}
	}, {
		key: "render",
		value: function render() {
			console.log(this.state);
			return React.createElement(
				"div",
				null,
				React.createElement(
					"h1",
					null,
					"Upload and Display Image usign React Hooks"
				),
				React.createElement(UploadMeme, { onTextAreaChange: this.onTextAreaChange.bind(this), onInputChange: this.onInputChange.bind(this),
					memes: this.state.memes, onTextAreaKeyUp: this.onTextAreaKeyUp.bind(this) }),
				this.state.memes.slice(1).map(function (meme, idx) {
					return React.createElement(Meme, { meme: meme, key: idx });
				})
			);
		}
	}]);

	return UploadAndDisplayImages;
}(React.Component);

;

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(UploadAndDisplayImages, null));