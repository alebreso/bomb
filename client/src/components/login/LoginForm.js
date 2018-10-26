import React, {PureComponent} from 'react'
import './LoginForm.css'
import { Input, Button, Paper } from 'material-ui';

const primary = '#224a07'

export default class LoginForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}

	handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

	render() {
		return (
      <div className="login-form">
			<Paper style={{paddingBottom: '50px', paddingTop: '50px', backgroundColor: 'gray' }}>
			<h1>Login</h1>
  			<form onSubmit={this.handleSubmit}>
  				<label>
            Email<br/>
            <Input color="black" type="email" name="email" value={
  						this.state.email || ''
  					} onChange={ this.handleChange }/>
          </label>

  				<label>
            Password<br/>
            <Input color="black" type="password" name="password" value={
  						this.state.password || ''
  					} onChange={ this.handleChange } />
          </label><br/>

  				<Button style={{backgroundColor: 'darkgrey',color: 'darkgreen', fontSize: '15px', fontFamily: 'Chakra Petch', fontWeight: 'bolder'}} variant="raised" color={primary} type="submit">Login</Button>
  			</form>
				</Paper>
		  </div>)
	}
}
