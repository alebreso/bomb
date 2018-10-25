import React, {PureComponent} from 'react'
import './LoginForm.css'
import { Input, Button } from 'material-ui';

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
  			<form onSubmit={this.handleSubmit}>
  				<label>
            Email<br/>
            <Input color="primary" type="email" name="email" value={
  						this.state.email || ''
  					} onChange={ this.handleChange } autoFocus="true"/>
          </label>

  				<label>
            Password<br/>
            <Input color="primary" type="password" name="password" value={
  						this.state.password || ''
  					} onChange={ this.handleChange } />
          </label><br/>

  				<Button variant="raised" color="primary" type="submit">Login</Button>
  			</form>
		  </div>)
	}
}
