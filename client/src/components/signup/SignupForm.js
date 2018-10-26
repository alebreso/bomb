import React, {PureComponent} from 'react'
import './SignupForm.css'
import { Input, Button, CardContent, Paper } from 'material-ui';


const primary = '#224a07'

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
	  	<Paper style={{paddingBottom: '50px', paddingTop: '50px', backgroundColor: 'gray' }}>	
		  <h1 className="title">Sign up!</h1>
			<CardContent style={{fontSize: '20px', fontFamily: 'Chakra Petch'}}>
  			<form onSubmit={this.handleSubmit}>
					<label>
					Email<br/>
            <Input style={{color: 'black'}} type="email" name="email" value={
  						this.state.email || ''
  					} onChange={ this.handleChange } 
						autoFocus="false"/>
          </label>
  					
  				<label>
					Password<br/>
  					<Input style={{color: 'black'}} type="password" name="password" value={
  						this.state.password || ''
  					} onChange={ this.handleChange } />
  				</label>

  				<label> 
					Confirm password<br/>
  					<Input style={{color: 'black'}} type="password" name="confirmPassword" value={
  						this.state.confirmPassword || ''
  					} onChange={ this.handleChange } />
  				</label><br/>

  				{
  					this.state.password &&
  					this.state.confirmPassword &&
  					this.state.password !== this.state.confirmPassword &&
  					<p style={{color:'red'}}>The passwords do not match!</p>
  				}

  				<Button style={{backgroundColor: 'darkgrey',color: 'darkgreen', fontSize: '15px', fontFamily: 'Chakra Petch', fontWeight: 'bolder'}} variant="raised" color={primary} type="submit">Sign up!</Button>
  			</form>
				</CardContent>
			</Paper>	
      </div>
		)
	}
}
