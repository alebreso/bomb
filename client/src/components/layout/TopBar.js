import React from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import {withRouter} from 'react-router'
import {userId} from '../../jwt'
import {connect} from 'react-redux'

const TopBar = (props) => {
  const { location, history, user } = props

  return (
    <AppBar position="absolute" color="primary" style={{zIndex:10}}>
      <Toolbar>
        <Typography variant="title" color="inherit" style={{flex: 1, fontSize: '20px', fontFamily: 'Chakra Petch'}}>
        Mine-field
        </Typography>
        {
          user &&
          <Button color="inherit" ><i className="material-icons">check_circle_outline</i> { user.firstName }</Button>
        }

        {
          location.pathname.indexOf('signup') > 0 &&
          <Button style={{flex: 1, fontSize: '20px', fontFamily: 'Chakra Petch'}} variant="raised" color="primary" onClick={() => history.push('/login')}><i class="material-icons">fingerprint</i>Login</Button>
        }
        {
          location.pathname.indexOf('login') > 0 &&
          <Button style={{color: 'Venom Green', fontSize: '15px', fontFamily: 'Chakra Petch'}} variant="raised" color="primary" onClick={() => history.push('/signup')}><i class="material-icons">account_circle</i>Sign up</Button>
        }
        {
          location.pathname.indexOf('games/') > 0 &&
          <Button style={{fontSize: '15px', fontFamily: 'Chakra Petch'}}variant="raised" color="primary" onClick={() => history.push('/games')}>All Games</Button>
        }
        {
          /games$/.test(location.pathname) &&
          <Button variant="raised" color="primary" onClick={() => history.push('/logout')}><i class="material-icons">exit_to_app</i>Log out</Button>
        }
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = state => ({
  user: state.currentUser && state.users &&
    state.users[userId(state.currentUser.jwt)]
})

export default withRouter(
  connect(mapStateToProps)(TopBar)
)
