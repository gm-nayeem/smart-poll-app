import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap'

import Sidebar from './components/sidebar';
import MainContent  from './components/main-content'
import POLLS from './components/data/polls'
import shortid from 'shortid';

class App extends Component {

  state = {
    polls: [],
    selectedPoll: {},
    searchTerm: ''
  }

  componentDidMount() {
    this.setState({polls: POLLS})
  }

  addNewPoll = (poll) => {
    poll.id = shortid.generate()
    poll.created = new Date()
    poll.totalVote = 0
    poll.opinion = []

    this.setState({
      polls: this.state.polls.concat(poll)
    })
  }

  updatePoll = (updatedPoll) => {
    const {polls} = this.state
    const poll = polls.filter(poll => poll.id === updatedPoll.id)

    poll.title = updatedPoll.title
    poll.description = updatedPoll.description
    poll.options = updatedPoll.options

    this.setState({polls})
  }

  deletePoll = (pollId) => {
    const polls = this.state.polls.filter(poll => poll.id !== pollId)
    this.setState({polls})
  }

  selectPoll = (pollId) => {
    const poll = this.state.polls.find(poll => poll.id !== pollId)
    this.setState({selectedPoll: poll})
  }

  handleSearch = (searchValue) => {

  }
  

  render() {
    return (
      <Container className='my-5'>
        <Row>
          <Col md={4}>
            <Sidebar 
              polls={this.state.polls} 
              selectPoll={this.selectPoll}
              searchTerm={this.state.searchTerm}
              handleSearch={this.handleSearch}
              addNewPoll={this.addNewPoll}
            />
          </Col>
          <Col md={4}>
            <MainContent />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
