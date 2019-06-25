import React, { Component } from 'react';
import { ResponsiveContainer, ComposedChart, ScatterChart, Scatter, XAxis, YAxis, Tooltip } from 'recharts';
import moment from 'moment'

class BurndownChart extends Component {
  constructor(props){
    super(props);

    this.state = {
      restTaskPoint: 0,
    };

    this.handleRestTaskPointChange = this.handleRestTaskPointChange.bind(this);
  }

  handleRestTaskPointChange (e) {
    this.setState({restTaskPoint: e.target.value});
  }

  render() {
    const {
      title,
    } = this.props;

    var startDate = new Date(process.env.REACT_APP_START_DATE).getTime();
    var deliveryDate = new Date(process.env.REACT_APP_DELIVERY_DATE).getTime();
    var today = new Date().getTime();

    var sprintCapacity = 25;
    var sprintLength = 7 * 2;
    var totalCapacity = sprintCapacity * (deliveryDate - startDate) / (1000 * 60 * 60 *24) / sprintLength;
    var restCapacity = sprintCapacity * (deliveryDate - today) / (1000 * 60 * 60 *24) / sprintLength;

    const capacityData = [
      {time: startDate, capacityValue: totalCapacity},
      {time: today, capacityValue: restCapacity},
      {time: deliveryDate, capacityValue: 0}
    ]

    const restTaskPointData = [
      {time: today, restValue: this.state.restTaskPoint},
      {time: deliveryDate, restValue: 0}
    ]

    const data = capacityData.concat(restTaskPointData)
  
    const options = {
      options: {
        responsive: true,
        showLine: true,
      }
    } 

    console.log(data)  

    return (
      <div className="BurndownChart">
        <div>
          {title}
          {startDate.toString()}
          {deliveryDate.toString()}
          {today.toString()}<br/>
          {totalCapacity}<br/>
          {restCapacity}<br/>
          {this.state.restTaskPoint}
        </div>
        <div>
          <ResponsiveContainer width={'100%'} height={300}>
            <ComposedChart  data={data}>
              <XAxis
                dataKey="time"
                type='number'
                domain={['auto', 'auto']}
                tickFormatter={(unixTime) => moment(unixTime).format('YYYY/MM/DD')}
              />
              <YAxis 
                //dataKey="value"
                type='number'
                domain={['auto', 'auto']}
              />
              <Tooltip labelFormatter={(unixTime) => moment(unixTime).format('YYYY/MM/DD')} />
              <Scatter line dataKey="capacityValue" fill="#8884d8" />
              <Scatter line dataKey="restValue" fill="#555555" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div>
          <input value={this.state.restTaskPoint} onChange={this.handleRestTaskPointChange} />
        </div>
      </div>
    );
  }
}

export default BurndownChart;
