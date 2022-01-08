import axios from "axios";
export const LOGIN = "LOGIN";
export const REGISTER = "REGISTER";
export const  LOGOUT = "LOGOUT";
export const ALLUSERS ="ALLUSERS";
export const EDITUSER ="EDITUSER";
export const TOGGLE_DIALOG ="TOGGLE_DIALOG";
export const FAILED ="FAILED";
export const RESET ="RESET";
export const getAuthToken = () => {
    return "Bearer " + localStorage.getItem("authToken");
  };

export const login = ({ email, password }) => {
    return async (dispatch, getState) => {
      // action for login user
      try {
        const res = await axios.post("http://localhost:3000/users/login", {
          email,
          password,
        });
  
        if (res.status === 200 && res.statusText === "OK") {
          const { token } = res.data;
          const emp = {
            ...res.data.emp,
          };
          localStorage.setItem("authToken", token);
          dispatch({
            type: LOGIN,
            payload: emp,
          });
        }
  
        return res.status;
      } catch (error) {
        // console.log("Error", error);
        dispatch({
          type: FAILED,
          payload: "something happened wrong ...!",
        });
      }
    };
  };

  export const register = ({ name,email,phone,password}) => {
    return async (dispatch, getState) => {
      try {
        const resp = await axios.post("http://localhost:3000/users/register", {
           name,
           email,
          password,
          phone,
        });
        if (resp.status === 201) {
          localStorage.setItem("authToken", resp.data.token);
          dispatch({
            type: REGISTER,
            payload: resp.data.user,
          });
        }
        return resp.status;
      } catch (error) {
        dispatch({
          type: FAILED,
          payload: "Email already taken",
        });
      }
    };
  };

  export const logout = () => {
    return async (dispatch, getState) => {
      try {
        const token = getAuthToken();
        const resp = await axios.get("http://localhost:3000/users/logout", {
          headers: {
            Authorization: token,
          },
        });
        console.log("logout resposne", resp);
        if (resp.status === 200 && resp.statusText === "OK") {
          localStorage.removeItem("authToken");
          dispatch({
            type: LOGOUT,
          });
          return true;
        }
      } catch (error) {

      }
    };
  };
export const getAllUsers = ()=>{
    return async (dispatch,getState)=>{
       try{
      const token = getAuthToken();  
      let resp = await axios.get(`http://localhost:3000/users/all`, {
        headers:{
          Authorization: token,
        }
       });
       dispatch({
           type:ALLUSERS,
           payload:{
              users: resp.data.users,
            }
       });
    }
       catch(e){

       } 
    }
}
export const toggleDialog = () => {
    return (dispatch) => {
      dispatch({
        type: TOGGLE_DIALOG,
        payload: null,
      });
    };
  };
export const getDataForEdit = (userId) => {
    return async (dispatch, getState) => {
    try{
        // const token = getAuthToken();  
        // let resp = await axios.get(`http://localhost:3000/users/${userId}`);
//    if (resp.status === 200) {
        dispatch({
          type: TOGGLE_DIALOG,
          payload: userId,
        });
    //   }
    }catch(error){

    } }
}
export const updateUser = (userId,values) => {
    return async (dispatch, getState) => {
    try{
      const {name,email,password,phone}  = values;   
        const token = getAuthToken(); 
        let resp = await axios.put(`http://localhost:3000/users/update`,{
          id:userId,
          name,
          email,
          password,
          phone
        },{
          headers:{
              Authorization: token,
              }
        });
        if(resp.status===200){
          dispatch({
            type:EDITUSER,
            payload:resp.data.updatedUser
          })
       }
    }catch(error){
         
    } 
  }
}
export const reset =()=>{
  return (dispatch)=>{
    dispatch({
      type:RESET
    })
  }
}