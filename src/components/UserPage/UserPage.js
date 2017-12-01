import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { fetchUserRequest } from "../../actions/users";
import { getData, getFetching } from "../../reducers/users";
import Followers from "../Followers";
import Preloader from "../Preloader";
import "./UserPage.css";

class UserPage extends Component {
  componentDidMount() {
    const name = this.props.match.params.name;
    this.props.fetchUserRequest(name);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.name !== nextProps.match.params.name) {
      this.props.fetchUserRequest(nextProps.match.params.name);
    }
  }
  appLogout = () => {
    this.props.logout();
  };

  render() {
    const { data, fetching } = this.props;
    return (
      <div className="user-container">
        <div className="user__button">
          <button onClick={this.appLogout} className="logout-button">
            LOGOUT
          </button>
        </div>
        {fetching ? (
          <Preloader />
        ) : (
          <div className="user-wrapper">
            {!data ? (
              <div>Такого пользователя не существует!</div>
            ) : (
              <div className="user-page">
                <div className="user">
                  <div className="user__photo">
                    <img src={data.avatar_url} alt="" />
                  </div>
                  <div className="user__description">
                    <div className="user__props user__name">{data.login}</div>
                    <div className="user__props user__followers">
                      Followers: {data.followers}
                    </div>
                    <div className="user__props user__repos">
                      Public repos: {data.public_repos}
                    </div>
                  </div>
                </div>
                <div className="user__followers">
                  <Followers user={data.login} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: getData(state),
  fetching: getFetching(state)
});

const mapDispatchToProps = {
  fetchUserRequest,
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);