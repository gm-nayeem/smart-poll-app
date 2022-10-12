import React, { Component } from 'react'
import { Input, Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import PollForm from '../poll-form'
import PollList from './poll-list'

export default class Sidebar extends Component {

  state = {
    openModal: false
  }

  toggleModal = () => {
    this.setState({ openModal: !this.state.openModal })
  }


  render() {
    return (
      <div style={{ background: '#efefef', padding: '10px' }}>
        <div className='d-flex mb-5'>
          <Input
            type='search'
            placeholder='Search'
            value={this.props.searchTerm}
            onChange={(e) => this.props.handleSearch(e.target.value)}
          />
          <Button
            color='success'
            style={{ marginLeft: '10px' }}
            onClick={this.toggleModal}
          >
            New
          </Button>
        </div>
        <h3>List of Polls</h3>
        <hr />
        <PollList
          polls={this.props.polls}
          selectPoll={this.props.selectPoll}
        />
        <Modal
          isOpen={this.state.openModal}
          toggle={this.toggleModal}
          unmountOnClose={true}
        >
          <ModalHeader toggle={this.toggleModal}>
            Creae A New Poll
          </ModalHeader>
          <ModalBody>
            <PollForm 
              submit={this.props.addNewPoll}
            />
          </ModalBody>
        </Modal>
      </div>
    )
  }
}
