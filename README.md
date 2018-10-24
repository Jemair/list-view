# react-recycle-list

> It is a more economic infinite scroll list.

## Features
* Recycle list item automatically
* Unlimited item height
* Easily adjust item height dynamically

## Example
see [here](./demo/src/index.js)

## API
### ListView
This is a base list-component without recycle.

**Props**

* data: PropTypes.arrayOf(`ListData`).isRequired.

    Data of the list

* renderItem: PropTypes.func.isRequired.

    ({index, item: ListData}) => JSX.Element

    Function used to render list item. You will receive each exact item in `data` one by one

* height: PropTypes.number. Default: window.innerHeight

    Height of the scroll container

* onEndReached: PropTypes.func.

    () => null

    A function will be called when end reached

* onEndReachedThreshold: PropTypes.number. Default: 300

    Distance before the bottom of the list when `onEndReached` called

* onScroll: PropTypes.func.

    (Element: theScrollingElement) => null

    A function will be called when scrolling. You can read current scrollHeight from the params.

* onStartReached: PropTypes.func

    PropTypes.func

    A function will be called when the start of the list reached

* onStartReachedThreshold: PropTypes.number. Default: 300

* paddingTop: PropTypes.number.

    Padding top added on the scrolling element. Mainly used in the `Virtual` component

* refProp: PropTypes.any.

    A ref for the scrolling element.






















