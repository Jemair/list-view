import React, {Component} from 'react'
import {render} from 'react-dom'
import { Virtual } from '../../src'
import './index.less'

let index = 0

function renderListData(num = 16) {
  return Array(num).fill(0).map(() => {
    index++
    return {
      key: index,
      title: index,
    }
  })
}

class Demo extends Component {
  virtual = React.createRef()

  state = {
    listData: renderListData(70)
  }

  onEndReached = () => {
    const {listData} = this.state
    const newData = renderListData()
    this.setState({
      listData: [...listData, ...newData]
    })
    return newData
  }

  render() {
    return (
      <Virtual
        ref={this.virtual}
        pageSize={16}
        recycleStartCount={100}
        data={this.state.listData}
        onEndReached={this.onEndReached}
        renderItem={this.renderItem}
      />
    )
  }

  renderItem = ({item}) => {
    return <li
      key={item.key}
      style={{
        backgroundColor: item.title % 2 ? '#999' : '#ccc',
        height: item.title % 3 * 100 || 30,
      }}>{item.title}</li>
  }
}

render(<Demo/>, document.querySelector('#demo'))
