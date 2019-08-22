import React, { Component } from 'react';
import bagua from './assets/bagua1.gif';
import './App.scss';

import {
  getResult,
  pullGua,
  pullShu,
  getGua1,
  getGua2,
  getShu
} from './utilities';
import { Qian } from '../models';

interface OwnStates {
  gua1: string;
  gua2: string;
  shu: string;
  currentIndex: number;
  history: Array<Qian>;
}
class App extends Component<{}, OwnStates> {
  constructor(props: {}) {
    super(props);

    this.state = {
      gua1: '',
      gua2: '',
      shu: '',
      currentIndex: -1,
      history: []
    };
  }

  render() {
    const currentIndex = this.state.currentIndex;
    const history = this.state.history;
    const before = history.slice(0, currentIndex);
    const after = history.slice(currentIndex + 1);
    const qian = history[currentIndex];

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
            《周易测事》取自汉蜀诸葛武侯著，浙南刘伯温批的《未来预知术》<br></br>
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
        {qian && (
          <section className="result">
            <h4 className="yao">
              {qian.indexText} {qian.yao}
            </h4>
            <p className="qian">{qian.qian}</p>
            <p className="explanation">
              {qian.explanation}
            </p>
            {qian.moreInfo &&
              qian.moreInfo.longInfo && (
                <div className="longInfo">
                  {qian.moreInfo.longInfo.map(
                    (infoParagraph, idx) => (
                      <p key={idx}>{infoParagraph}</p>
                    )
                  )}
                </div>
              )}
          </section>
        )}
        <section className="controls">
          <button
            onClick={() => {
              this.goToHistory(currentIndex - 1);
            }}
            disabled={currentIndex <= 0}
          >
            Back
          </button>
          <button
            onClick={() => {
              this.goToHistory(currentIndex + 1);
            }}
            disabled={currentIndex == history.length - 1}
          >
            Forward
          </button>
        </section>
        <section className="history">
          <div>
            {before.map((qian: Qian, i) => (
                <div
                  key={i}
                  onClick={() => {
                    this.goToHistory(i);
                  }}
                >
                  {qian.indexText} {qian.yao}
                </div>
              ))
              .reverse()}
          </div>
          <div>
            {after.map((qian: Qian, i) => (
              <div
                key={i}
                onClick={() => {
                  this.goToHistory(before.length + 1 + i);
                }}
              >
                {qian.indexText} {qian.yao}
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  private pullGua1 = () => {
    this.goToHistory(this.state.history.length-1);
    this.setState({
      gua1: pullGua()
    });
  };

  private pullGua2 = () => {
    this.goToHistory(this.state.history.length-1);
    this.setState({
      gua2: pullGua()
    });
  };

  private pullShu = () => {
    this.goToHistory(this.state.history.length-1);
    this.setState({
      shu: pullShu()
    });
  };

  private submit = () => {
    this.goToHistory(this.state.history.length-1);
    const qian: Qian = getResult(
      this.state.gua1 + this.state.gua2 + this.state.shu
    );
    const history: Array<Qian> = this.state.history.concat([qian]);
    const currentIndex = history.length - 1;

    this.setState({
      gua1: '',
      gua2: '',
      shu: '',
      currentIndex,
      history
    });
  };

  private goToHistory = (index: number) => {
    if (
      index >= 0 &&
      index < this.state.history.length
    ) {
      this.setState({
        currentIndex: index
      });
    }
  };
}

export default App;
