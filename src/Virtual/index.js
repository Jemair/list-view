import React, { PureComponent } from 'react'
import ListView from '../ListView/index'

export default class Virtual extends PureComponent {
  state = {
    listData: this.props.data,
    paddingTop: [],
    recycledAheadData: [],
    recycledBehindData: [],
  }

  firstUpload = 1

  scroller = React.createRef()

  refreshData = () => {
    this.setState({
      listData: this.props.data
    })
  }

  onStartReached = () => {
    const { recycledAheadData, recycledBehindData, paddingTop, listData } = this.state
    const { pageSize } = this.props

    if (paddingTop.length === 0) { return }
    const popCount = recycledAheadData.length > pageSize ? pageSize : recycledAheadData.length
    const popData = recycledAheadData.splice(recycledAheadData.length - popCount, popCount)
    let newPaddingTop = [...paddingTop]
    const recycledData = listData.splice(listData.length - popCount, popCount)
    if (recycledAheadData.length === 0) {
      this.firstUpload = 1
      newPaddingTop = []
    }
    this.setState({
      listData: [...popData, ...listData],
      paddingTop: newPaddingTop,
      recycledAheadData,
      recycledBehindData: [...recycledData, ...recycledBehindData],
    })
  }

  onEndReached = async () => {
    const { recycledAheadData, recycledBehindData, paddingTop, listData } = this.state
    const { onEndReached, pageSize, recycleStartCount } = this.props
    const recycleNum = this.firstUpload ? Math.ceil(pageSize / 2) : pageSize

    if (listData.length < pageSize) {
      onEndReached()
      return
    }

    // 列表中新的数据
    const newData = recycledBehindData.length > 0 ?
      // 如果回收列表中仍有数据 则从回收列表中放出数据
      [...listData, ...recycledBehindData.splice(0, recycleNum)] :
      // 如果回收列表已经为空 则从服务端拉取数据
      [...listData, ...await onEndReached()]

    let newRecycledData = [...recycledAheadData]
    let newPaddingTop = []
    this.firstUpload = 0
    if (newData.length > recycleStartCount) {
      newPaddingTop = [...paddingTop, this.scroller.current.querySelectorAll('li')[recycleNum].offsetTop]
      newRecycledData = [...recycledAheadData, ...newData.splice(0, recycleNum)]
    }
    this.setState({
      listData: newData,
      paddingTop: newPaddingTop,
      recycledAheadData: newRecycledData,
      recycledBehindData,
    })
  }

  render () {
    return (
      <ListView
        refProp={this.scroller}
        data={this.state.listData}
        paddingTop={this.state.paddingTop}
        onEndReached={this.onEndReached}
        onStartReached={this.onStartReached}
        renderItem={this.renderItem}
      />
    )
  }

  renderItem = ({ item }) => {
    return <li
      key={item.key}
      style={{
        backgroundColor: item.title % 2 ? '#999' : '#ccc',
        height: item.title % 3 * 100 || 30,
      }}>{item.title}</li>
  }
}
