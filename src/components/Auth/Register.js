import React from 'react';
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const firebaseConfig = {
  apiKey: 'AIzaSyDJ4DJ-drwe9MyhK4rsGGXnSZ-5QQQm86A',
  authDomain: 'slack-clone-e9e5e.firebaseapp.com',
  projectId: 'slack-clone-e9e5e',
  storageBucket: 'slack-clone-e9e5e.appspot.com',
  messagingSenderId: '533918331382',
  appId: '1:533918331382:web:0bdd62ae25b1fb9ff917d7',
  measurementId: 'G-XBN8S3TZQK',
};

const firebase = initializeApp(firebaseConfig);

class Register extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  handleUserFormEntry = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    // prevent the default submit action, which is to reload the page
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((createdUser) => {
        console.log(createdUser);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    const { username, email, password, passwordConfirmation } = this.state;

    return (
      <Grid textAlign='center' verticalAlign='middle' className='app'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' icon color='orange' textAlign='center'>
            <Icon name='puzzle piece' color='purple'></Icon>
            Register for my Slack Clone
          </Header>
          <Form onSubmit={this.handleSubmit} size='large'>
            <Segment stacked>
              <Form.Input
                fluid
                name='username'
                icon='user'
                iconPosition='left'
                placeholder='username'
                onChange={this.handleUserFormEntry}
                value={username}
                type='text'
              ></Form.Input>
              <Form.Input
                fluid
                name='email'
                icon='mail'
                iconPosition='left'
                placeholder='enter email'
                onChange={this.handleUserFormEntry}
                value={email}
                type='text'
              ></Form.Input>
              <Form.Input
                fluid
                name='password'
                icon='lock'
                iconPosition='left'
                placeholder='password'
                onChange={this.handleUserFormEntry}
                value={password}
                type='password'
              ></Form.Input>
              <Form.Input
                fluid
                name='passwordConfirmation'
                icon='repeat'
                iconPosition='left'
                placeholder='confirm password'
                onChange={this.handleUserFormEntry}
                value={passwordConfirmation}
                type='password'
              ></Form.Input>

              <Button color='orange' fluid size='large'>
                Submit
              </Button>
            </Segment>
          </Form>
          <Message>
            Already a user?<Link to='/login'> Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
