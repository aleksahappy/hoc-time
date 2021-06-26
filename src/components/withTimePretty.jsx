import React from 'react';

function declOfNum(number, titles) {
  var cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

export const withTimePretty = Component => {
  return class extends React.Component {
    state = {};

    static get displayName() {
      const name = Component.displayName || Component.name || 'Component';
      return `withTimePretty(${name})`;
    }

    componentDidMount() {
      this.timePretty(this.props);
    }

    componentDidUpdate(prevProps) {
      if (this.props.date !== prevProps.date) {
        this.timePretty(this.props);
      }
    }

    timePretty({date}) {
      const curDate = new Date();
      date = new Date(date);
      const diff = curDate.getTime() - date.getTime();

      let timePretty = '';
      if (diff < 1000) { // меньше 1 секунды
        timePretty = 'прямо сейчас';
      }
      const seconds = Math.floor(diff / 1000); // разница в секундах
      if (seconds < 60) {
        timePretty =  `${seconds} ${declOfNum(seconds, ['секунду', 'секунды', 'секунд'])} назад`;
      }
      const minutes = Math.floor(diff / (1000 * 60)); // разница в минутах
      if (minutes < 60) {
        timePretty =  `${minutes} ${declOfNum(minutes, ['минуту', 'минуты', 'минут'])} назад`;
      }
      const hours = Math.floor(diff / (1000 * 60 * 60)); // разница в часах
      if (hours < 24) {
        timePretty =  `${minutes} ${declOfNum(minutes, ['минуту', 'минуты', 'минут'])} назад`;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24)); // разница в днях
      if (days >= 1) {
        timePretty =  `${days} ${declOfNum(days, ['день', 'дня', 'дней'])} назад`;
      }
      this.setState({date: timePretty});
    }

    render() {
      return <Component {...this.props} {...this.state}/>
    }
  }
}
