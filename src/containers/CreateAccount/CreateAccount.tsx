import * as React from 'react';
import {Dispatch} from 'redux';
import Axios from 'axios';
import {ADDRESS} from '../../herokuProxy';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import RequestError from '../../components/Alerts/RequestError/RequestError';
import Backdrop from '../../components/Alerts/Backdrop/Backdrop';
import {RouteComponentProps} from "react-router"

interface Props {
    firstName: string
    initUser: (user: any) => void;
}

type myState = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    button1: boolean,
    requestError: boolean,
    errorMessage: string
}

const inputName = {
    firstName: "firstName",
    lastName: "lastName",
    email: "email",
    phone: "phone",
    password: "password"
}

class CreateAccount extends React.Component<Props & RouteComponentProps> {
    // ** disable button on mount, because there's no values in input field ** //
    componentDidMount(){
        (document.querySelector('#button1') as HTMLInputElement).disabled = false;
    }

    // ** everytime input field is enter, component will update ** //
    componentDidUpdate(){
        if(this.state.firstName !== '' && this.state.lastName !== '' && this.state.email !== '' && this.state.phone !== '' && this.state.password !== ''){
            (document.querySelector('#button1') as HTMLInputElement).disabled = false;
        }
        // ** enable button when all input field complete ** //
        else{
            (document.querySelector('#button1') as HTMLInputElement).disabled = true;
        }
    }

    state: myState = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        button1: false,
        requestError: false,
        errorMessage: ""
    }

    resetRequestError = ():void => {
        this.setState({requestError: false})
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        this.setState({
           ...this.state,
           [e.target.name]: e.target.value
        })
    }

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault()

        let myURL: string;

        if( process.env.NODE_ENV === 'production'){
            myURL = ADDRESS + '/api/createUser';
        }
        else {
            myURL = '/api/createUser';
        }
        
        try{
            // ** if you try to create duplicate User-email, user.token.data will equal to "" ** //
            const user = await Axios.post(myURL,{
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                phone: this.state.phone,
                password: this.state.password,
                rewardPoints: 0
            });

            if(user.data.token === ""){
                this.setState({requestError: true, errorMessage: "Sorry, this Email address is already taken!"});
            }
            else if(user.data.emailStatus){
                localStorage.setItem("token", user.data.token);
                this.props.initUser(user.data);
                this.props.history.push('/');
            }
            else if(!user.data.emailStatus){
                this.setState({requestError: true, errorMessage: "Sorry!, this Email format is invalid"});
            }
        }
        catch(err){
            console.log("ERR: CreateAccount.tsx: ", err);
            this.setState({requestError: true, errorMessage: "Oops! there might be a connection error. Please try again."});
        }
    };

    render(){
        let requestError;

        if(this.state.requestError){
            requestError = (
                <div className={`d-flex justify-content-center`}>
                    <Backdrop />
                    <RequestError resetRequestError={this.resetRequestError} errorMessage={this.state.errorMessage} />
                </div>
            )
        }

        return(
            <div className="container bg-background col-md-10 col-lg-8 col-xl-6 d-flex flex-column p-0 mt-5 genericClasses">
                {requestError}
                <div className="align-self-end"><Link to="/"><span className="badge  x-button">X</span></Link></div>
                <div className="CreateAccount p-5">
                    <div className="title">
                        <h2>Create Your Account</h2>
                        <hr></hr>
                    </div>
                    <form className="form" autoComplete="off" method="POST" onSubmit={(e: React.FormEvent<HTMLFormElement>) => this.handleSubmit(e)}>
                        <label htmlFor="firstName">First Name *</label>
                        <input type="text" name={inputName.firstName} value={this.state.firstName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChange(e)} />

                        <label htmlFor="lastName">Last Name *</label>
                        <input type="text" name={inputName.lastName} value={this.state.lastName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChange(e)} />

                        <label htmlFor="Email">Email *</label>
                        <input type="text" name={inputName.email} value={this.state.email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChange(e)} />

                        <label htmlFor="Phone">Phone *</label>
                        <input type="text" name={inputName.phone} value={this.state.phone}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChange(e)} />

                        <label htmlFor="Password">Password *</label>
                        <input type="password" name={inputName.password} value={this.state.password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChange(e)} />
                        <button className="btn inputButton border mb-4" id="button1" value="Submit">Create Your Account</button>      
                    </form>
                </div>
            </div>
        )
    };
};

interface Interfacestate {
    firstName: string
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        initUser: (payload: any) => dispatch({type: 'INIT_USER', payload: payload}),
    }
}

const mapStateToProps = (state: Interfacestate) =>{
    return {
        firstName: state.firstName
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateAccount));



