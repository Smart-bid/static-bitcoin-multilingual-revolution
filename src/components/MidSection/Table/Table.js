import React, {Component} from 'react'

import yellowTick from './tick.png'

export default class Table extends Component {
    constructor(props) {
        super(props);
        var random = this.rand();
        this.state = {
            random: random,
            tableArr: []
        }
    }

    rand() {
        const random = Math.floor(Math.random() * 26);
        return random;
    }
    componentDidMount() {
        let languageManager = this.props.languageManager();
        var testArr = [];
        testArr.push(languageManager.tableList);
        this.setState({
            tableArr: testArr[0]
        })

        const _this = this;
        this.timer = setInterval(() => {
            var random = _this.rand();
            testArr[0].unshift(testArr[0][random]);
            testArr[0].length = languageManager.tableList.length;
            testArr.push(languageManager.tableList);
            _this.setState({
                tableArr: testArr[0],
                random: random
            })
        },4500)
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        let languageManager = this.props.languageManager();
        return(
            <section className="live-results-section text-center" id="table">
                <div className="container relative">
                    <div className="live-results-table-wrapper">
                        <button className="yellow-btn join-now-btn scroll-top-btn" onClick={()=>window.location.href='#'}>
                            <span>{languageManager.tableBtn}</span>
                        </button>
                        <h3 className="dark-purple bold live-results-header" id="live_results">{languageManager.tableName}</h3>
                        <div className="table-responsive">
                            <table className="live-results-table">
                                <thead className="thead">
                                    <tr>
                                    {
                                        languageManager.tableMenuItems.map((item, index) => {
                                            return(
                                                <th className="dark-purple padding-left-td" key={index}>{item.name}</th>
                                            )
                                        })
                                    }
                                    </tr>
                                </thead>
                                <tbody className="tbody">
                                {
                                    this.state.tableArr.map((item, index) => {
                                        return(
                                            <tr key={index}>
                                                <td className="bold">
                                                    {item.name}
                                                    {/*{item.descr}*/}
                                                </td>
                                                <td className="bold">{item.price}</td>
                                                <td>{item.date}</td>
                                                <td>{item.currency}</td>
                                                <td>
                                                    <img src={yellowTick} width="20" alt=""/>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}