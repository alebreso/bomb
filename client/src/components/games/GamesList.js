import React, { PureComponent } from "react";
import { getGames, createGame } from "../../actions/games";
import { getUsers } from "../../actions/users";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import Card, { CardActions } from "material-ui/Card";
import Typography from "material-ui/Typography";
import "./GamesList.css";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "material-ui";
import { withStyles } from "@material-ui/core/styles";

const StyledButton = withStyles({
  root: {
    background: "linear-gradient(45deg, #2a4004 30%, #83995a 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 21,
    padding: "0 30px"
    // boxShadow: '0 3px 5px 2px #2a4004',
  },
  label: {
    textTransform: "capitalize"
  }
})(Button);

class GamesList extends PureComponent {
  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.games === null) this.props.getGames();
      if (this.props.users === null) this.props.getUsers();
    }
  }

  renderGame = game => {
    const { users, history } = this.props;

    return (
      <Card key={game.id} className="game-card">
        <ExpansionPanel style={{ backgroundColor: "lightgrey" }}>
          <ExpansionPanelSummary
            expandIcon={<i class="material-icons">details</i>}
          >
            <Typography
              style={{
                fontFamily: "Chakra Petch",
                fontSize: "25px",
                fontStyle: "bolder",
                fontWeight: "900"
              }}
            >
              Game #{game.id}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography
              style={{ fontFamily: "Chakra Petch", fontSize: "15px" }}
            >
              This game is played by&nbsp;
              {game.players
                .map(player => users[player.userId].firstName)
                .join(" and ")}
            </Typography>
            <Typography
              style={{ fontFamily: "Chakra Petch", fontSize: "20px" }}
            >
              Status: {game.status}
            </Typography>
            <CardActions
              style={{ fontFamily: "Chakra Petch", fontSize: "15px" }}
            >
              <StyledButton
                size="small"
                onClick={() => history.push(`/games/${game.id}`)}
              >
                JOIN
              </StyledButton>
            </CardActions>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Card>
    );
  };

  render() {
    const { games, users, authenticated, createGame } = this.props;

    if (!authenticated) return <Redirect to="/login" />;

    if (games === null || users === null) return null;

    return (
      <Paper
        className="outer-paper"
        style={{
          paddingBottom: "50px",
          paddingTop: "50px",
          backgroundColor: "gray"
        }}
      >
        <Button
          color="primary"
          variant="raised"
          onClick={createGame}
          className="create-game"
          style={{ backgroundColor: "darkolivegreen" }}
        >
          <i class="material-icons md-36">add</i>
          Create Game
        </Button>

        <div>{games.map(game => this.renderGame(game))}</div>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  users: state.users === null ? null : state.users,
  games:
    state.games === null
      ? null
      : Object.values(state.games).sort((a, b) => b.id - a.id)
});

export default connect(
  mapStateToProps,
  { getGames, getUsers, createGame }
)(GamesList);
