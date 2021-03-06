import React from "react";
import Timer from "../layout/Timer";
import axios from "axios";
import {ImageLoader} from "react-image-file";
import {apiBaseUrl} from "../../constants";
import {getImage} from "../Helper";
import "./contestsList.scss";
class ContestsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contests: [],
            images: {}
        };
        this.AuthStr = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = this.AuthStr;
    }

    componentDidMount() {
        axios.get(apiBaseUrl + "/contest").then(res => {
            const contests = res.data;
            contests.forEach(c => {
                getImage(c.imageId).then(
                    data => {
                        this.setState({
                            images: {
                                ...this.state.images,
                                [c.imageId]: "data:image/jpeg;base64," + data
                            }
                        });
                    }
                ).catch(
                    error => console.log(error)
                );

            });
            this.setState({contests: res.data});
            console.log(res.data);
        })
            .catch(e => console.log(e))
        ;
    }

    onContestClick(id) {
        this.props.history.push("/contest/" + id);
    }

    render() {
        return (
            <div className="constestList">

                {this.state.contests.map(contest => {
                    return <div key={contest.id} className="constestBlock">
                        <img className="topImage" onClick={() => this.onContestClick(contest.id)}
                            src={this.state.images[contest.imageId]}
                        />
                        <div className="shortInfo">
                            <h2 onClick={() => this.onContestClick(i)}>{contest.name}</h2>
                            <div className="briefDesc">{contest.description.substring(0, 35)}</div>
                            <div className="info"><span>{contest.address}</span><span className="timer"><img
                                src={require("../../assets/images/timer.png")}/><Timer
                                expirationTime={contest.expirationTime}/></span>
                            </div>
                        </div>
                    </div>;
                })}
                {[1,2,3].map(i => {
                    return <div key={i} className="constestBlock">
                        <img className="topImage" onClick={() => this.onContestClick(i)}
                             src={require("../../assets/images/contests/"+i+".png")}
                        />
                        <div className="shortInfo">
                            <h2 onClick={() => this.onContestClick(i)}>Bershka</h2>
                            <div className="briefDesc">test</div>
                            <div className="info"><span>Adress</span><span className="timer"><img
                                src={require("../../assets/images/timer.png")}/><Timer
                                expirationTime={0}/></span>
                            </div>
                        </div>
                    </div>;
                })}
            </div>
        );
    }
}

export default ContestsList;
