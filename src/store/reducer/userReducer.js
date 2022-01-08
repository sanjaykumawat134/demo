import * as Actions from "../action/userActions";
const initialState = {
    isLoggedIn: localStorage.getItem("authToken")?true: false,
    activeUser: null,
    users:[], 
    editUserData:null,
    isDialogOpen:false,
    errorMessage:null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.LOGIN: {
            return {
              ...state,
              isLoggedIn: true,
              activeUser: action.payload,
            };
          }
          case Actions.REGISTER: {
            return {
              ...state,
            //   isLoggedIn: true,
            //   activeUser: action.payload,
            };
          }
          case Actions.LOGOUT: {
            return {
              ...state,
              isLoggedIn: false,
              activeUser: null,
            };
          }
        case Actions.ALLUSERS:{
            return {
                ...state,
               users:state.users.concat(action.payload.users),
             
            }
        }
        case Actions.TOGGLE_DIALOG:{
            return {
                ...state,
                isDialogOpen: !state.isDialogOpen,
                editUserData:
                  action.payload == null
                    ? null
                    : {
                        ...state.editUserData,
                        ...state.users.find((user)=>user._id===action.payload),
                      },

            }
        }
        case Actions.EDITUSER:{
            return {
                ...state,
                users:state.users.map((user)=>{
                    if(user._id!==action.payload._id){
                        return user;
                    }
                    return {
                        ...user,
                        ...action.payload
                    }
                })
            }

        }
        case Actions.FAILED:{
            return {
                ...state,
                errorMessage:action.payload
            }
        }
        case Actions.RESET:{
            return {
                ...state,
                errorMessage:null
            }
        }
        default: {
            return state;
          }
        }
}

export default userReducer;