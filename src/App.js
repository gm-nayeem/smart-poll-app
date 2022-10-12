import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap'

import Sidebar from './components/sidebar';
import MainContent  from './components/main-content'
import Polls from './components/data/polls'
import shortid from 'shortid';

class App extends Component {

  state = {
    polls: [],
    selectedPoll: {},
    searchTerm: ''
  }

  componentDidMount() {
    this.setState({polls: Polls})
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
    const poll = polls.find(poll => poll.id === updatedPoll.id)

    poll.title = updatedPoll.title
    poll.description = updatedPoll.description
    poll.options = updatedPoll.options

    this.setState({polls})
  }

  deletePoll = (pollId) => {
    const polls = this.state.polls.filter(poll => poll.id !== pollId)
    this.setState({polls, selectedPoll: {}})
  }

  selectPoll = (pollId) => {
    const poll = this.state.polls.find(poll => poll.id === pollId)
    this.setState({selectedPoll: poll})
  }

  handleSearch = (searchValue) => {
    this.setState({
      searchTerm: searchValue
    })
  }

  performSearch = () => {
    return this.state.polls.filter(poll => {
      return poll.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    })
  }
  
  getOpinion = (response) => {
    const {polls} = this.state
    const poll = polls.find(poll => poll.id === response.pollId)
    const option = poll.options.find(option => option.id === response.selectedOption)

    poll.totalVote++
    option.vote++
    
    const opinion = {
      id: shortid.generate(),
      name: response.name,
      selectedOption: response.selectedOption
    }

    poll.opinions.push(opinion)
    this.setState({polls})
  }

  render() {

    const polls = this.performSearch()
    console.log(this.state)

    return (
      <Container className='my-5'>
        <Row>
          <Col md={4}>
            <Sidebar 
              polls={polls} 
              selectPoll={this.selectPoll}
              searchTerm={this.state.searchTerm}
              handleSearch={this.handleSearch}
              addNewPoll={this.addNewPoll}
            />
          </Col>
          <Col md={8}>
            <MainContent 
              poll={this.state.selectedPoll}
              getOpinion={this.getOpinion}
              updatePoll={this.updatePoll}
              deletePoll={this.deletePoll}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
