import Card from 'react-bootstrap/Card';
import LoginForm from '../LoginForm';

function Login() {
    return (
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <Card>
              <Card.Body>
                <LoginForm></LoginForm>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  
  export default Login;