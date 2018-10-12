import React, { PureComponent } from 'react'
import s from './index.less'

export default class ListView extends PureComponent {

  static defaultProps = {
    height: window.innerHeight,
    onEndReached: () => null,
    onEndReachedThreshold: 300,
    onScroll: () => null,
    onStartReached: () => null,
    onStartReachedThreshold: 300,
  }

  render() {
    const {data, renderItem, height, refProp, paddingTop} = this.props
    return (
      <div
        className={s.wrapper}
        style={{height}}
      >
        <div
          ref={refProp}
          className={s.container}
          onScroll={this.handleScroll}>
          <ul className={s.list}>
            <div style={{height: paddingTop[paddingTop.length - 1]}}/>
            {data.map((i, index) => {
              return renderItem({
                index,
                item: i,
              })
            })}
          </ul>
        </div>
      </div>
    )
  }

  handleScroll = (e) => {
    const {onEndReached, onStartReached, onScroll, onEndReachedThreshold, onStartReachedThreshold, paddingTop} = this.props
    const {scrollTop, scrollHeight, clientHeight} = e.currentTarget

    // 判断是否触发onEndReached事件
    if (scrollHeight - clientHeight - scrollTop <= onEndReachedThreshold) {
      onEndReached()
    }

    if (scrollTop <= paddingTop[paddingTop.length - 1] + onStartReachedThreshold) {
      onStartReached()
    }

    onScroll(e.currentTarget)
  }
}
