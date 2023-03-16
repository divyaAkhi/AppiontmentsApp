// Write your code here
import {Component} from 'react'

import {format} from 'date-fns'

import {v4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    text: '',
    calender: '',
    arrayList: [],
    isTrue: false,
  }

  changeText = event => {
    this.setState({
      text: event.target.value,
    })
  }

  changeCalender = event => {
    this.setState({
      calender: event.target.value,
    })
  }

  formSubmit = event => {
    event.preventDefault()
    const {text, calender} = this.state
    const rightFormat = calender
      ? format(new Date(calender), `dd MMMM yyy, EEE`)
      : ''

    const object = {
      id: v4(),
      title: text,
      dateTime: rightFormat,
      isFavorite: false,
    }
    this.setState(prevState => ({
      arrayList: [...prevState.arrayList, object],
      text: '',
      calender: '',
    }))
  }

  starFavorite = id => {
    this.setState(prevState => ({
      arrayList: prevState.arrayList.map(eachValue => {
        if (eachValue.id === id) {
          return {...eachValue, isFavorite: !eachValue.isFavorite}
        }
        return eachValue
      }),
    }))
  }

  isActiveStar = () => {
    const {isTrue} = this.state
    if (isTrue) {
      this.setState({isTrue: false})
    } else {
      this.setState({isTrue: true})
    }
  }

  render() {
    const {text, calender, isTrue} = this.state
    let {arrayList} = this.state
    if (isTrue) {
      const newList = arrayList.filter(
        eachValue => eachValue.isFavorite === true,
      )
      arrayList = newList
    }

    return (
      <div className="main-container">
        <div className="inner-container">
          <div className="divider">
            <div className="content-holder">
              <h1 className="heading">Add Appointment</h1>
              <form className="form" onSubmit={this.formSubmit}>
                <label htmlFor="input1" className="input-title">
                  TITLE
                </label>
                <input
                  type="text"
                  id="input1"
                  className="input"
                  placeholder="TITLE"
                  value={text}
                  onChange={this.changeText}
                />
                <label htmlFor="input2" className="input-title">
                  DATE
                </label>
                <input
                  id="input2"
                  type="date"
                  className="input"
                  value={calender}
                  onChange={this.changeCalender}
                />
                <button type="submit" className="button">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="line" />
          <div className="joint">
            <h1 className="head2">Appointments</h1>
            <button
              className="button2"
              type="button"
              onClick={this.isActiveStar}
            >
              Starred
            </button>
          </div>
          <ul className="card">
            {arrayList.map(eachObject => (
              <AppointmentItem
                key={eachObject.id}
                objectDetails={eachObject}
                starFavorite={this.starFavorite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
