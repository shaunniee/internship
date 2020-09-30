import {  REGISTER,REST,CLEAR} from '../actions/types';

const initialState = {
  restaurants:null,
  regg:null
};

export default function (state = initialState, action) {

  const {type,payload} = action;

  switch (type) {
    case REGISTER:
      return{
        ...state,
        regg:payload
      }
      case REST:
        return{
          ...state,
          restaurants: payload
        }

        case CLEAR:
      return{ ...state,
      restaurants:null,
    regg:null}

   

    default:
      return state;
  }
}
