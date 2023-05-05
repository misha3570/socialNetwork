import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profileReducer";
import { useLocation, useNavigate, useParams} from "react-router-dom";
import {compose} from "redux";
// import { RouteComponentProps } from 'react-router';
import {ProfileType} from '../../types/types';
import {AppStateType} from "../../redux/reduxStore";
// import { RouteComponentProps } from "react-router";
import { createBrowserHistory, History } from 'history';

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  getUserProfile: (userId: number) => void
  getStatus: (userId: number) => void
  updateStatus: (status: string) => void
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
}

type PathParamsType = {
  userId: string
}

interface RouteParams {
  [key: string]: string;
}

interface RouteComponentProps<P extends RouteParams = RouteParams> {
  match: {
    params: P;
    path: string;
    url: string;
  };
  history: {
    push: (path: string) => void;
  };
  location: {
    pathname: string;
    search: string;
    hash: string;
    state: any;
  };
}


export function withRouter<ComponentProps>(Component: React.FunctionComponent<ComponentProps>) {
  function ComponentWithRouterProp(props: ComponentProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const match = useParams()
    const ParamsForType = useParams()
    console.log(params, navigate, location, match)
    console.log( match)

    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}
// type PropsType = MapPropsType & DispatchPropsType & {
//
//   history: History;
//   match: {
//     params: PathParamsType;
//     isExact: boolean;
//     path: string;
//     url: string;
//   };
// };

// type RouteComponentProps<T> = {
//   match: {
//     params: T;
//     isExact: boolean;
//     path: string;
//     url: string;
//   };
//   location: {
//     hash: string;
//     key: string;
//     pathname: string;
//     search: string;
//     state: any;
//   };
//   history: {
//     push: (path: string, state?: any) => void;
//     replace: (path: string, state?: any) => void;
//     goBack: () => void;
//     // другие методы, если необходимо
//   };
// };

// type PropsType = MapPropsType & DispatchPropsType;
// type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>; // строчка которая должна тут быть но не работает из-за react router dom 6
type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>; // строчка которая должна тут быть но не работает из-за react router dom 6
// type PropsType = MapPropsType & DispatchPropsType & ParamsForType<PathParamsType>;


class ProfileContainer extends React.Component<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  refreshProfile() {
    let userId: number | null = +this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        this.props.history.push("/login");
      }
    }

    if (!userId) {
      console.error("ID should exists in URI params or in state ('authorizedUserId')");
    } else {
      this.props.getUserProfile(userId)
      this.props.getStatus(userId)
    }
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
    if (this.props.match.params.userId != prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  componentWillUnmount(): void {
  }

  render() {
    console.log(this.props, this.props.match)
    return (
      <Profile {...this.props}
               // isOwner={!this.props.match.params.userId}
               profile={this.props.profile}
               status={this.props.status}
               updateStatus={this.props.updateStatus}
               savePhoto={this.props.savePhoto}
               saveProfile={this.props.saveProfile}/>

    )
  }
}

let mapStateToProps = (state: AppStateType) => {
  //console.log('mapStateToProps PROFILE')
  return ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
  })
}

export default compose<React.ComponentType>(
  connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
  withRouter
)(ProfileContainer);

























//
// import React, {Component} from 'react';
// import {Profile} from "./Profile";
// import axios from "axios";
// import {connect} from "react-redux";
// import {
//   getStatus,
//   getUserProfile,
//   savePhoto,
//   saveProfile,
//   setUserProfile,
//   updateStatus
// } from "../../redux/profileReducer";
// import {Navigate, useParams} from 'react-router-dom';
// import {useNavigate} from "react-router-dom";
// import {withAuthRedirect} from "../hoc/withAuthRedirect";
// import {compose} from "redux";
//
// export function withRouter(Children) {
//   return (props) => {
//     const match = {params: useParams()};
//     console.log(match)
//     return <Children {...props} match={match}/>
//   }
// }
//
// class ProfileContainer extends Component {
//
//   refreshProfile() {
//     let userId = this.props.match.params.userId
//     if (!userId) {
//       userId = this.props.authorizedUserId
//       if(!userId) {
//         return <Navigate to='/login'/>
//       }
//     }
//     this.props.getStatus(userId)
//     this.props.getUserProfile(userId)
//   }
//
//   componentDidMount() {
//     this.refreshProfile()
//   }
//
//   componentDidUpdate(prevProps, prevState, snapshot) {
//     if(this.props.match.params.userId !== prevProps.match.params.userId) {
//       this.refreshProfile()
//     }
//   }
//
//   render() {
//     return (
//       <Profile
//         {...this.props}
//         isOwner={!this.props.match.params.userId}
//         profile={this.props.profile}
//         status={this.props.status}
//         updateStatus={this.props.updateStatus}
//         savePhoto={this.props.savePhoto}
//         saveProfile={this.props.saveProfile}
//       />
//     );
//   }
// }
//
// // let AuthRedirectComponent = withAuthRedirect(ProfileContainer)
//
// let mapStateToProps = state => ({
//   profile: state.profilePage.profile,
//   status: state.profilePage.status,
//   authorizedUserId: state.auth.userId,
//   isAuth: state.auth.isAuth
// })
//
// // let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)
//
// export default compose(
//   connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
//   withRouter,
//   // withAuthRedirect
// )(ProfileContainer)
//
// // export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);