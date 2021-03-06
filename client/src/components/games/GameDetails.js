import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getGames, joinGame, updateGame } from '../../actions/games';
import { getUsers } from '../../actions/users';
import { userId } from '../../jwt';
import Paper from 'material-ui/Paper';
import Board from './Board';
import './GameDetails.css';
import { Button } from 'material-ui';

class GameDetails extends PureComponent {
  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames();
      if (this.props.users === null) this.props.getUsers();
    }
  }

  joinGame = () => this.props.joinGame(this.props.game.id);

  makeMove = (toRow, toCell) => {
    const { game, updateGame } = this.props;
    const clickedCell = [toRow, toCell];
    const winnerArray = game.winningCell

    const board = game.board.map((row, rowIndex) =>
      row.map((cell, cellIndex) => {
        if (rowIndex === toRow && cellIndex === toCell) {
          let index = 0
          let symbol = ''
          while(index!==winnerArray.length){
            if(toRow === winnerArray[index][0] && toCell === winnerArray[index][1]) return 'o'
            if((toRow-1 === winnerArray[index][0] && toCell-1 === winnerArray[index][1]) ||
            (toRow-1 === winnerArray[index][0] && toCell === winnerArray[index][1]) || 
            (toRow-1 === winnerArray[index][0] && toCell+1 === winnerArray[index][1]) || 
            (toRow === winnerArray[index][0] && toCell-1 === winnerArray[index][1]) ||
            (toRow === winnerArray[index][0] && toCell+1 === winnerArray[index][1]) ||
            (toRow+1 === winnerArray[index][0] && toCell-1 === winnerArray[index][1]) ||
            (toRow+1 === winnerArray[index][0] && toCell === winnerArray[index][1]) || 
            (toRow+1 === winnerArray[index][0] && toCell+1 === winnerArray[index][1])) symbol= 'h'
            index++
          }
          if(symbol==='') return 'x'
          else return symbol

        }
        else return cell;
      })
    );
    updateGame(game.id, board, clickedCell);
  };

  render() {
    const { game, users, authenticated, userId } = this.props;

    if (!authenticated) return <Redirect to="/login" />;

    if (game === null || users === null) return 'Loading...';
    if (!game) return 'Not found';

    const player = game.players.find(p => p.userId === userId);

    const winner = game.players
      .filter(p => p.symbol === game.winner)
      .map(p => p.userId)[0];

    return (
      <div>
      <Paper className="outer-paper" style={{ border: '10px dashed black', backgroundColor: 'rgb(102, 106, 94)'}}>
        <h1 class='title'>Game #{game.id}</h1>

        <p>Status: {game.status}</p>

        {game.status === 'started' &&
          player &&
          player.symbol === game.turn && <div>It's your turn!</div>}

        {game.status === 'pending' &&
          game.players.map(p => p.userId).indexOf(userId) === -1 && (
            <Button variant="raised" style={{flex: 1, backgroundColor: 'darkolivegreen', color: 'white'}} onClick={this.joinGame}>Join Game</Button>
          )}

        {winner && <p>Winner: {users[winner].firstName}</p>}

        <hr />

        {game.status !== 'pending' && (
          <div className="board-container">
            <Board board={game.board} makeMove={this.makeMove} />
          </div>
        )}
      </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  game: state.games && state.games[props.match.params.id],
  users: state.users
});

const mapDispatchToProps = {
  getGames,
  getUsers,
  joinGame,
  updateGame
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameDetails);
