componentDidMount(){
     fetch('https://industrial-devices.app.khomp.com/modelos')
    .then(Response => Response.json())
    .then(data => this.setState({items:data}));
}
