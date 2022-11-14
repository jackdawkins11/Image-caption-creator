
/*
 * image file + text == meme
 */
function Meme(props){
	return <div> 
		<img alt="not found" width={"250px"} src={URL.createObjectURL(props.meme.image)} />
		<p>{props.meme.caption}</p>
		</div>
}

function UploadMeme(props){
	return <div>
			{props.memes[0].image && ( <img alt="not found" width={"250px"} src={URL.createObjectURL(props.memes[0].image)} /> )}
			<input type="file" name="myImage" onChange={props.onInputChange} />
			<textarea placeholder={"Talk shit here..."} value={props.memes[0].caption} onChange={props.onTextAreaChange}
				onKeyUp={props.onTextAreaKeyUp}/>
		</div>
}

class UploadAndDisplayImages extends React.Component {

	constructor(props){
		super(props)
		this.state = { memes: [ {image: null, caption: '' } ] }
	}

	onTextAreaKeyUp(e){
		console.log( e.keyCode )
		if( e.keyCode == 13 ){
			let memes = [ {image: null, caption: '' } ].concat( this.state.memes )
			this.setState( {memes: memes} )
			return
		}
	}

	onTextAreaChange(e){
		let memes = this.state.memes.slice()
		memes[0] = { image: memes[0].image, caption: e.target.value }
		this.setState( {memes: memes} )
	}

	onInputChange(e){
		let memes = this.state.memes.slice()
		memes[0] = { image: e.target.files[0], caption: memes[0].caption }
		this.setState( {memes: memes} )
	}

	render(){
		console.log( this.state )
		return <div>
			<h1>Upload and Display Image usign React Hooks</h1>
			<UploadMeme onTextAreaChange={this.onTextAreaChange.bind(this)} onInputChange={this.onInputChange.bind(this)}
				memes={this.state.memes} onTextAreaKeyUp={this.onTextAreaKeyUp.bind(this)}/> 
			{this.state.memes.slice(1).map((meme, idx) => { return <Meme meme={meme} key={idx} /> })}
			</div>
	}
};

ReactDOM.createRoot(document.getElementById('root')).render( <UploadAndDisplayImages /> )
