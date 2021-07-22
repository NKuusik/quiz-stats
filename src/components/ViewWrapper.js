import React, {useState} from 'react';
import TeamView from './TeamView';
import CategoryView from './CategoryView';


class ViewWrapper extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTeam: null
        }
    };
    chooseTeam(chosenTeam) {
        this.setState({
            activeTeam: chosenTeam
        });    
    }

    render() {
        if (this.state.activeTeam == null) {
            return <CategoryView chooseTeam={this.chooseTeam.bind(this)} teams={this.props.teams}/>;
        } else {
            return <TeamView chooseTeam={this.chooseTeam.bind(this)} team={this.state.activeTeam} />;
        }
    }
}



export default ViewWrapper;