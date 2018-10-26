import React, {PureComponent} from 'react'
import './SignupForm.css'
import { Input, Button, CardContent, Paper } from 'material-ui';

export default class SignupForm extends PureComponent {
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

      <div className="signup-form">
	  	<Paper style={{fontSize: '20px', fontFamily: 'Chakra Petch'}}>	
		  <h1 className="title">Sign up</h1>
			<CardContent style={{fontSize: '20px', fontFamily: 'Chakra Petch'}}>
  			<form onSubmit={this.handleSubmit}>
					<label>
					Email<br/>
            <Input color="primary" type="email" name="email" value={
  						this.state.email || ''
  					} onChange={ this.handleChange } 
						autoFocus="true"/>
          </label>
  					
  				<label>
					Password<br/>
  					<Input color="primary" type="password" name="password" value={
  						this.state.password || ''
  					} onChange={ this.handleChange } />
  				</label>

  				<label> 
					Confirm password<br/>
  					<Input color="primary" type="password" name="confirmPassword" value={
  						this.state.confirmPassword || ''
  					} onChange={ this.handleChange } />
  				</label><br/>

  				{
  					this.state.password &&
  					this.state.confirmPassword &&
  					this.state.password !== this.state.confirmPassword &&
  					<p style={{color:'red'}}>The passwords do not match!</p>
  				}

  				<Button style={{color: 'green', fontSize: '15px', fontFamily: 'Chakra Petch'}} variant="raised" type="submit">Sign up</Button>
  			</form>
				</CardContent>
			</Paper>	
      </div>
		)
	}
}
