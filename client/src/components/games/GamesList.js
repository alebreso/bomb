import React, {PureComponent} from 'react'
import {getGames, createGame} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import './GamesList.css'

class GamesList extends PureComponent {
  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.games === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  renderGame = (game) => {
    const {users, history} = this.props

    return (<Card key={game.id} className="game-card">
      <CardContent style={{backgroundColor: 'lightgrey', border: '3px solid black'}}>
        <Typography style={{fontFamily: 'Chakra Petch', fontSize: '15px'}}>
          This game is played by&nbsp;
          {
            game.players
              .map(player => users[player.userId].firstName)
              .join(' and ')
          }
        </Typography>
        <Typography style={{fontFamily: 'Chakra Petch', fontSize: '25px', fontStyle: 'bolder', fontWeight: '900'}}>
          Game #{game.id}
        </Typography>
        <Typography style={{fontFamily: 'Chakra Petch', fontSize: '20px'}}>
          Status: {game.status}
        </Typography>
      </CardContent>
      <CardActions style={{fontFamily: 'Chakra Petch', fontSize: '15px', backgroundColor: 'darkgreen', border: '2px solid black'}}>
        <Button 
          size="small"
          onClick={() => history.push(`/games/${game.id}`)}
        >
          Join
        </Button>
      </CardActions>
    </Card>)
  }

  render() {
    const {games, users, authenticated, createGame} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (games === null || users === null) return null

    return (
    <Paper className="outer-paper" style={{paddingBottom: '50px', paddingTop: '50px', backgroundColor: 'gray' }}>
      <Button
        color="primary"
        variant="raised"
        onClick={createGame}
        className="create-game"
        style={{backgroundColor: 'darkolivegreen'}}
      >
      <i class="material-icons md-36">add</i>
        Create Game
      </Button>

      <div>
        {games.map(game => this.renderGame(game))}
      </div>
    </Paper>)
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  users: state.users === null ? null : state.users,
  games: state.games === null ?
    null : Object.values(state.games).sort((a, b) => b.id - a.id)
})

export default connect(mapStateToProps, {getGames, getUsers, createGame})(GamesList)
