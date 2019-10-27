import React, { Component } from 'react';
import axios from 'axios';
import './ContactBox.css';



class ContactBox extends Component {
    constructor(props){
    super(props)
    this.state = {
        name: '',
        nameError: '',
        email: '',
        emailError: '',
        subject: '',
        subjectError: '',
        text: '',
        textError: '',
        disabled: false,
        emailSent: null,
        
    }
    }

    resetForm = () => {

        this.setState({
            name: '',
            email: '',
            subject: '',
            text: '',
        })
    
    }

    formComplete = (e) => {
        e.preventDefault()
        const isValid = this.validate()

        if(isValid === false ){
            document.getElementById('alert').innerHTML = 'Please Complete Form!'
        } else {
            document.getElementById('alert').innerHTML = ' Message Sent, Thank You!'
            this.handleSubmit()
        }
    }
 
    validate = (correct) => {

       if(this.state.name === ''){
         this.setState({nameError : "invalid text"})
           return correct = false
       }  else {
        this.setState({nameError : ""})
        correct = true
      }

       if(this.state.email === ''|| !this.state.email.includes("@")){
        this.setState({emailError : "invalid text"})
          return correct = false
      } else {
        this.setState({emailError : ""})
        correct = true
      }

      if(this.state.subject  === '' || this.state.subject.length <= 1){
        this.setState({subjectError : "invalid text"})
          return correct = false
      } else {
        this.setState({subjectError : ""})
        correct = true
      }

      if(this.state.text  === '' || this.state.text.length <= 1){
        this.setState({textError : "invalid text"})
          return correct = false
      } else {
        this.setState({textError : ""})
        correct = true
      }

     

    }

    handleSubmit = () => {
        

        this.setState({
            disabled: true
        })


        axios.post('http://localhost:4000/api/email', this.state)
         .then(res => {
             if(res.data.success){
             this.setState({
                 disabled: false,
                 emailSent: true
             })
             } else {
            this.setState({
                disabled: false,
                emailSent: false
            })
            }
         })
         .catch(err => {
             console.log(err)

             this.setState({
                disabled: false,
                emailSent: false
            })
         })

        
         this.resetForm()
         
    }


    render(){
 
     return (
    
        <form className="Contact-Box" method='POST'>
                <div id="alert"></div>
                <div className="Contact-Top-Input">
                    <div className="Left">
                        <h3 className="Contact-Input-subtitle">Name</h3>
                        <input className="Contact-Input-Name" 
                            type="text" 
                            id="name" 
                            value={this.state.name}
                            onChange={e => this.setState({ name: e.target.value })} />
                            <div>{this.state.nameError}</div>
                    </div>
                    <div>
                        <h3 className="Contact-Input-subtitle">Email</h3>
                        <input className="Contact-Input-Name" 
                            type="email" 
                            id="email" 
                            value={this.state.email}
                            onChange={e => this.setState({email: e.target.value })} />
                         <div>{this.state.emailError}</div>
                    </div>
                </div>
                <div className="Email" >
                    <div>
                        <h3 className="Contact-Input-subtitle">Subject</h3>
                        <input className="Contact-Input-Subject"
                            type="text"
                            id="subject"
                            value={this.state.subject} 
                            onChange={e => this.setState({ subject : e.target.value })}/>
                        <div>{this.state.subjectError}</div>
                    </div>
                    
                </div>
                    <div className="Contact-Bottom-Input">
                        <h3 className="Contact-Input-subtitle-message">Message</h3>
                        <textarea className="Contact-Input-Message" 
                            id="text"
                            value={this.state.text}
                            onChange={e => this.setState({text : e.target.value })}> 
                        </textarea>
                        <div>{this.state.textError}</div>
                        <button  className="Contact-Button" 
                            type="submit" 
                            value="Submit"
                            onClick={e => this.formComplete(e)}>
                            Submit
                        </button>
                    </div>
            </form>
        )
    }
}

export default ContactBox