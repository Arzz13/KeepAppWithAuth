//For authenticating user .
import React,{useState,useEffect} from "react";
import Input from "./Input";
import {useNavigate} from "react-router-dom"; //To navigate to a url when asomething happens.
import axios from "axios";



function Login(){

   

    const initialstate = {
        username:"",
        password:"",
        confirm_password:"",
        usernameCorrect:"",
        passwordCondition:"",
        confirm_passwordCondition:"", //When password and confirm password doesn't match in register mode.
        data_from_db:[]
    }

    //to keep track of user_inputs
    const [userDetails,setUserDetails] = useState(initialstate);

    //to keep track of login and register
    const[state,toggleState]=useState(true)
    
    
    useEffect(() => {
 
        axios.get("http://localhost:4000/getdata")
        .then((response)=> {
            setUserDetails(prev_value => {
                return({
                    ...prev_value,
                    data_from_db:response.data
                })
            })
           })
        .catch((err)=>(console.log(err)));
        console.log("render")
    },[state]);  //UseEffect executes whenever the state(login mode or register mode) toggles.
 
    function changeUserMode(){
        toggleState(prev_value =>(!prev_value));
        setUserDetails(()=>{
            return initialstate;
        }); 
    }

    function handleChange(event){
        const {name,value} = event.target;
        setUserDetails(prev_value =>{
            return({
                ...prev_value,
                [name]:value
            });
        })
    }

    function validate(){
    
        //Initial conditions
        let usernameCorrect=true;
        let passwordCondition=true;
        let confirm_passwordCondition=true;
        let user_name_exits=false;
        let passwordCorrect=false;

       // to remove errors everytime the user attempts to login or register
        setUserDetails(prev_value =>{
            return({
                ...prev_value,
                usernameCorrect:"",
                passwordCondition:"",
                confirm_passwordCondition:""
            });
        })
        
        //check whether username already exists in db and password matches
        userDetails.data_from_db.forEach( item => {
            if(item.username === userDetails.username){
                user_name_exits=true;
                if(item.password === userDetails.password){
                    passwordCorrect=true;
                }
            }
        });



        if(userDetails.username.length < 3){
            usernameCorrect=false;
            setUserDetails(prev_value =>{
                return({
                    ...prev_value,
                    usernameCorrect:"Username should consist atleast 3 characters!"
                });
            })
        }
       
        
        if(userDetails.password.length < 8){
            passwordCondition=false;
            setUserDetails(prev_value =>{
                return({
                    ...prev_value,
                    passwordCondition:"Password field should consist atleast 8 characters!"
                });
            })
        }

        if(userDetails.password === userDetails.username){
            passwordCondition=false;
            setUserDetails(prev_value =>{
                return({
                    ...prev_value,
                    passwordCondition:"Username cannot be password"
                });
            })
        }

        if(state)
        {

            if(!user_name_exits){
                usernameCorrect=false;
                setUserDetails(prev_value =>
                    {
                    return({
                        ...prev_value,
                        usernameCorrect:"Username does'nt exist"
                    })
                    })

            }
            if(user_name_exits && !passwordCorrect)
            {
                passwordCondition=false;
                setUserDetails(prev_value =>
                    {
                    return({
                        ...prev_value,
                        passwordCondition:"password does'nt match"
                    })
                    })
            }

        }


        if(state === false)
        {
            if(user_name_exits){
                usernameCorrect=false;
                setUserDetails(prev_value => {
                    return({
                        ...prev_value,
                        usernameCorrect:"Username already exits"
                    })
                } )
            }

            if( userDetails.password !== userDetails.confirm_password){
                confirm_passwordCondition=false;
                setUserDetails(prev_value =>{
                    return({
                        ...prev_value,
                        confirm_passwordCondition:"Passwords does'nt match"
                    });
                })
            }
           
            if(userDetails.confirm_password.length===0){
                confirm_passwordCondition=false;
                setUserDetails(prev_value =>{
                    return({
                        ...prev_value,
                        confirm_passwordCondition:"Confirm your password"
                    });
                })
            }
        
        }
 
        if(state){
            if(usernameCorrect && passwordCondition)  {
                return true;
            }
        }
        if(!state){
            if(usernameCorrect && passwordCondition && confirm_passwordCondition)  {
                return true;
            }
        }
        else{
            return false;
        }
    }

    const navigate = useNavigate();
    const navigateTo = () => navigate('/note');

    function validate_user(event){
        event.preventDefault()
        if(validate()){ 
            var dat=userDetails.username;
            localStorage.setItem("name",dat);  //Storing the logged in user's name to browser, So that he can remain logged in even when refreshed.
            
            
            setUserDetails(()=>{
                return initialstate;
            });
            //if the user is in registeration page
            if(!state){
                
        
                axios({
                    url:"http://localhost:4000/add",
                    method:"POST",
                    data:userDetails
                })
                .then(function(response) {
                    console.log(response.data);
                    console.log(response.status);
                  })

                  .catch((err)=>(console.log(err)))

                navigateTo();
            }
            //If already registered user then directly go into the page
            else{
                navigateTo();
            }
            
        }
    }

    return(
        <div>
        <div class="vertical"></div>
        <div className="login">
        
          <h1 style={{marginBottom:"7vh" ,color:"#65393A"}}>
          {state ? "Login" : "Register"}
          </h1>
          <form onSubmit={validate_user}>
          <Input 
              placeholder="Username"
              type="text"
              func={handleChange}
              name="username"
              value={userDetails.username}
          />
            <div style={{color:"#65393A", fontSize:15,marginBottom:7 }} >
              {userDetails.usernameCorrect}
            </div>
            
              <Input 
              placeholder="Your password"
              type="password"
              func={handleChange}
              name="password"
              value={userDetails.password}
            />
          <div style={{color:"#65393A", fontSize:15,marginBottom:7 }} >
              {userDetails.passwordCondition}
            </div>

            {state ? null :   
             <div>   
            <Input 
              placeholder="Confirm password"
              type="password"
              func={handleChange}
              name="confirm_password"
              value={userDetails.confirm_password}
             />
            <div style={{color:"#65393A", fontSize:15,marginBottom:7 }} >
              {userDetails.confirm_passwordCondition}</div> 
            </div>}

            <button className="loginbutton" type="submit">
            {state ? "Login" : "Register"}
            </button>
          </form>
          
          {/* href present only to avoid warnings .You can omit href too. href="/#"  refreshes the page  */}
          {state ? <div><a href="/#"   onClick={changeUserMode} > Register </a></div> : 
           <div><a href="/#" onClick={changeUserMode} > Login </a></div>}
          
          
        </div>
        </div>
    );
}



export default Login;

