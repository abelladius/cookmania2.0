import React, { Component } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import "../App.css";

export default class CreateRecipe extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeIngredients = this.onChangeIngredients.bind(this);
        this.onChangePrep = this.onChangePrep.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            title: '',
            ingredients: '',
            prep: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })

    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }
    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }
    onChangeIngredients(e) {
        this.setState({
            ingredients: e.target.value
        })
    }
    onChangePrep(e) {
        this.setState({
            prep: e.target.value
        })
    }
    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }
    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const recipe = {
            username: this.state.username,
            title: this.state.title,
            ingredients: this.state.ingredients,
            prep: this.state.prep,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(recipe)

        axios.post('http://localhost:5000/recipes/add', recipe)
            .then(res => console.log(res.data));

        window.location = '/'
    }



    render() {
        return (
            <div>
                <h3>Adauga o reteta!</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function (user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Titlul retetei: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.title}
                            onChange={this.onChangeTitle}
                        />
                    </div>
                    <div className="form-group">
                        <label>Ingrediente: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.ingredients}
                            onChange={this.onChangeIngredients}
                        />
                    </div>
                    <div className="form-group">
                        <label>Mod de preparare: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.prep}
                            onChange={this.onChangePrep}
                        />
                    </div>
                    <div className="form-group">
                        <label>Timp de preparare: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Data: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Adauga reteta" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}