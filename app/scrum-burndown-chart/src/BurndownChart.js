import React, { Component } from 'react';
import { ResponsiveContainer, ComposedChart, ScatterChart, Scatter, XAxis, YAxis, Tooltip } from 'recharts';
import moment from 'moment'

class BurndownChart extends Component {
  constructor(props){
    super(props);

    this.state = {
      data: [],
      avg: 0,
      lastItem: NaN,
      currentClosedPoint: NaN,
      currentCapacity: NaN
    };

    this.handleRestTaskPointChange = this.handleRestTaskPointChange.bind(this);
  }

  handleRestTaskPointChange (e) {
    this.setState({restTaskPoint: e.target.value});
  }

  getScrumCapacity() {
    const data = this.state.data;
    const deliveryDate = new Date(process.env.REACT_APP_DELIVERY_DATE).getTime();
    var scrumCapacity = 0;
    if (data.length != 0 ) {
      var lastDate = data[data.length - 1].time;
      var sprintAvg = this.state.avg;

      scrumCapacity = (deliveryDate - lastDate)  / (1000 * 60 * 60 *24 * 14) * sprintAvg;

      var currentClosedPoint = data[data.length - 1].closedPoint;
      var lastItem = {'time': deliveryDate, 'closedPoint': scrumCapacity};
      data.push(lastItem);
      var currentCapacity = lastItem.closedPoint - currentClosedPoint;
    
      this.setState({
        data: data,
        lastItem: lastItem,
        currentClosedPoint: currentClosedPoint,
        currentCapacity: currentCapacity
      })
    }
  }

  componentDidMount() {
    fetch('https://us-central1-valiant-house-244503.cloudfunctions.net/ob-openpj-sprint-point')
      .then((response) => response.json())
      .then((responseJson) => {
        var data = responseJson.data;
        var avg  = responseJson.avg;

        this.setState({
          data: data,
          avg: avg,
        })
        this.getScrumCapacity()   
      })
   }

  render() {
    const {
      title,
    } = this.props;

    console.log(this.state.data)
    return (
      <div className="BurndownChart">
        <div>
          現在までにCloseしたStoryPoint {this.state.currentClosedPoint} <br/>
          最終的にCloseできるStoryPointの予測 {this.state.lastItem.closedPoint} <br/>
          直近のSprintの平均Capacity {this.state.avg} <br/>
          現在のCapacity {this.state.currentCapacity} <br/>
        </div>
        <div>
          <ResponsiveContainer width={'100%'} height={300}>
            <ComposedChart  data={this.state.data.slice()}>
              <XAxis
                dataKey="time"
                type='number'
                domain={['auto', 'auto']}
                tickFormatter={(unixTime) => moment(unixTime).format('YYYY/MM/DD')}
              />
              <YAxis 
                type='number'
                domain={['auto', 'auto']}
              />
              <Tooltip labelFormatter={(unixTime) => moment(unixTime).format('YYYY/MM/DD')} />
              <Scatter line dataKey="closedPoint" fill="#5a5a5a" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div>
        </div>
      </div>
    );
  }
}

export default BurndownChart;
