import React, { Component } from 'react';
import bagua from './assets/bagua1.gif';
import './App.scss';

import { getResult, pullGua, pullShu } from './utilities';
import { Qian } from '../models';

interface OwnStates {
  gua1: string;
  gua2: string;
  shu: string;
  qian?: Qian;
}
class App extends Component<{}, OwnStates> {
  constructor(props: {}) {
    super(props);
    this.state = {
      gua1: '',
      gua2: '',
      shu: ''
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            <img
              src={bagua}
              className="App-logo"
              alt="logo"
            />
            <span>周易未来预知</span>
          </h1>
        </header>
        <section className="intro">
          <p>
            《周易测事》取自汉蜀诸葛武侯著，浙南刘伯温批的《未来预知术》
          </p>
          <p>
            古人行事，践行为主，占卦辅之，以防不测，即谓之人算不如天算也。
          </p>
        </section>
        <section className="form">
          <button
            onClick={this.pullGua1}
            disabled={!!this.state.gua1}
          >
            1
          </button>
          <button
            onClick={this.pullGua2}
            disabled={!this.state.gua1 || !!this.state.gua2}
          >
            2
          </button>
          <button
            onClick={this.pullShu}
            disabled={
              !this.state.gua1 ||
              !this.state.gua2 ||
              !!this.state.shu
            }
          >
            3
          </button>
          <label>
            {this.state.gua1 +
              this.state.gua2 +
              this.state.shu}
          </label>
          <button
            onClick={this.submit}
            disabled={
              !this.state.gua1 ||
              !this.state.gua2 ||
              !this.state.shu
            }
          >
            Submit
          </button>
        </section>
        {this.state.qian &&
        <section className="result">
          <h3>{this.state.qian.indexText} {this.state.qian.yao}</h3>
          <p>{this.state.qian.qian}</p>
          <p>{this.state.qian.explanation}</p>
        </section>
        }
      </div>
    );
  }

  private pullGua1 = () => {
    this.setState({
      gua1: pullGua(),
      qian: undefined
    });
  };

  private pullGua2 = () => {
    this.setState({
      gua2: pullGua()
    });
  };

  private pullShu = () => {
    this.setState({
      shu: pullShu()
    });
  };

  private submit = () => {
    const qian: Qian = getResult(
      this.state.gua1 + this.state.gua2 + this.state.shu
    );
    this.setState({
      gua1: '',
      gua2: '',
      shu: '',
      qian
    });
  };
}

export default App;
