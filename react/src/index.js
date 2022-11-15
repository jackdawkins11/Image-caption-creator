
function Meme(props){
	return <div style={{display: "flex", flexDirection: "row", backgroundColor: props.idx % 2 == 0 ? "gainsboro" : "darkGrey" }} >

		{props.meme.image && ( <img alt="not found" style={{height:"100px", width:"100px"}} src={URL.createObjectURL(props.meme.image)} /> )}

		{!props.meme.image && (<label htmlFor={"input" + props.idx} style={{height:"100px", width:"100px"}} >Choose file
			<input type="file" style={{display: "none"}}
				name="myImage" id={"input"+props.idx} onChange={props.onInputChange} /></label> )}

		{props.idx == 0 && <textarea placeholder={"Talk shit here..."} value={props.meme.caption} onChange={props.onTextAreaChange}
			onKeyUp={props.onTextAreaKeyUp}
			style={{border: "none", outline: "none", resize: "none", flex: "auto", background: "transparent"}} />}

		{props.idx != 0 && <p>{props.meme.caption}</p>}

		</div>
}

class UploadAndDisplayImages extends React.Component {

	constructor(props){
		super(props)
		this.state = { memes: [ {image: null, caption: '' } ] }
	}

	onTextAreaKeyUp(e, idx){
		if( idx == 0 && e.keyCode == 13 ){
			let memes = [ {image: null, caption: '' } ].concat( this.state.memes )
			this.setState( {memes: memes} )
			return
		}
	}

	onTextAreaChange(e, idx){
		let memes = this.state.memes.slice()
		memes[idx] = { image: memes[idx].image, caption: e.target.value }
		this.setState( {memes: memes} )
	}

	onInputChange(e, idx){
		let memes = this.state.memes.slice()
		memes[idx] = { image: e.target.files[0], caption: memes[idx].caption }
		this.setState( {memes: memes} )
	}

	render(){
		console.log( this.state )
		return <div style={{display: "flex", flexDirection: "column", alignItems: "stretch" }} >
			{this.state.memes.map( (meme, idx) => {
				return <Meme meme={meme} key={idx} idx={idx}
					onInputChange={ (e) => { this.onInputChange( e, idx ) } }
					onTextAreaChange={ (e) => { this.onTextAreaChange( e, idx ) } }
					onTextAreaKeyUp={ (e) => { this.onTextAreaKeyUp( e, idx ) } } />
			})}
			</div>
	}
};

ReactDOM.createRoot(document.getElementById('root')).render( <UploadAndDisplayImages /> )
