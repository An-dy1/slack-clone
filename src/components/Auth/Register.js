import React from 'react';
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import md5 from 'md5';
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
    errors: [],
    loading: false,
  };

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: 'Please fill in all fields' };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: `Passwords don't match or are invalid` };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    // if a field is empty, then its length will be 0 and falsy
    // return the opposite of this, which would return true if any field's length is 0
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleUserFormEntry = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  updateCurrentUserProfile = (currentUser) => {
    firebase.auth().onAuthStateChanged(function (currentUser) {
      currentUser.user.updateProfile({
        displayName: 'blue',
        photoURL: `http://gravatar.com/avatar/${md5(
          currentUser.user.email
        )}?d=identicon`,
      });
    });
  };

  handleSubmit = (event) => {
    // prevent the default submit action, which is to reload the page
    event.preventDefault();
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((createdUser) => {
          // this code doesn't work
          // might be solveable: https://stackoverflow.com/questions/59546023/firebase-javascript-auth-user-displaying-null-even-though-user-is-signed-in
          createdUser.user
            .updateProfile({
              displayName: 'blue',
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`,
            })
            .then(() => {
              this.setState({ loading: false });
            })
            .catch((err) => {
              console.error(err);
              this.setState({
                error: this.state.errors.concat(err),
                loading: false,
              });
            });
        })
        .catch((err) => {
          console.error(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false,
          });
        });
    }
  };

  handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? 'error'
      : '';
  };

  render() {
    const { username, email, password, passwordConfirmation, errors, loading } =
      this.state;

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
                className={this.handleInputError(errors, 'email')}
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
                className={this.handleInputError(errors, 'password')}
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
                className={this.handleInputError(errors, 'password')}
              ></Form.Input>

              <Button
                disabled={loading}
                className={loading ? 'loading' : ''}
                color='orange'
                fluid
                size='large'
              >
                Submit
              </Button>
            </Segment>
          </Form>

          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}

          <Message>
            Already a user?<Link to='/login'> Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
