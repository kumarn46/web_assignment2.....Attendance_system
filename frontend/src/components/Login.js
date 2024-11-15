import {Link} from 'react-router-dom';
import Header from "./Header";

function Login() {
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h5 className="card-header">User Login</h5>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label For="exampleInputEmail1" className="form-label">Username</label>
                                    <input type="email" className="form-control"/>
                                </div>
                                <div className="mb-3">
                                    <label For="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" />
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" For="exampleCheck1">Remember Me</label>
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;