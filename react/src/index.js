
//we need props.image and props.caption and props.onInputChange and props.onTextAreaChange and props.onTextAreaKeyUp
function UploadMeme(props){
	return <div style={{display: "flex", flexDirection: "row", backgroundColor: "gainsboro" }} >

		{props.image && ( <img alt="not found" style={{height:"100px", width:"100px"}} src={URL.createObjectURL(props.image)} /> )}
		
	{!props.image && (<label htmlFor={"input"} style={{height:"100px", width:"100px"}} >Choose file
		<input type="file" style={{display: "none"}}
		name="myImage" id={"input"} onChange={props.onInputChange} /></label> )}

	{<textarea placeholder={"Talk shit here..."} value={props.caption} onChange={props.onTextAreaChange}
		onKeyUp={props.onTextAreaKeyUp}
		style={{border: "none", outline: "none", resize: "none", flex: "auto", background: "transparent"}} />}

		</div>
}

//we need props.image and props.caption
function Meme(props){
	return <div style={{display: "flex", flexDirection: "row", backgroundColor: props.idx % 2 == 1 ? "gainsboro" : "darkGrey" }} >

		<img alt="not found" style={{height:"100px", width:"100px"}} src={props.image} />
		
		<p>{props.caption}</p>

		</div>
}

class UploadAndDisplayImages extends React.Component {

	constructor(props){
		super(props)
		this.state = { image: null, caption: "", memes: [ ] }
	}

	componentDidMount(){
		setInterval( () => this.getMemes(), 500 );
	}

	getMemes(){
		let loaded = []
		fetch('/memes' ).then( (r) => r.json() ).then( (r) => {
			this.setState({ memes: r })
		})
	}

	onTextAreaKeyUp(e){
		if( e.keyCode == 13 ) {
			var data = new FormData()
			data.append('file', this.state.image)
			data.append('caption', this.state.caption)
			fetch('/meme', {
				method: 'POST',
				body: data
			})
			this.setState( { image: null, caption: this.state.caption } )
		}
	}

	onTextAreaChange(e){
		this.setState({ image: this.state.image, caption: e.target.value } )
	}

	onInputChange(e){
		this.setState( { image: e.target.files[0], caption: this.state.caption } )
	}

	render(){
		return <div style={{display: "flex", flexDirection: "column", alignItems: "stretch" }} >
			<UploadMeme image={this.state.image} caption={this.state.caption}
				onInputChange={ (e) => { this.onInputChange( e ) } }
				onTextAreaChange={ (e) => { this.onTextAreaChange( e ) } }
				onTextAreaKeyUp={ (e) => { this.onTextAreaKeyUp( e ) } } />
			{this.state.memes.map( (meme, idx) => {
				return <Meme image={"/" + meme.id} caption={meme.caption} key={idx} idx={idx} />
			})}
			</div>
	}
};

ReactDOM.createRoot(document.getElementById('root')).render( <UploadAndDisplayImages /> )
