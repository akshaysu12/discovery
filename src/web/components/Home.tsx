import React, { Component, ReactNode } from 'react';
import { Visualization } from './Visualization';

 interface State {
   code: string;
   data: number[][];
 }

 interface Props {

}

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      code: undefined,
      data: undefined,
    };

  }

  public async componentDidMount(): Promise<void> {
    const cache = JSON.parse(localStorage.getItem('data'));
    if (cache) {
      this.setState({data: cache});
    } else {
      const params = new URLSearchParams(window.location.search);
      if (params.get('error')) {
        this.setState({code: 'error'});
      }
      if (params.get('code')) {
        const code = params.get('code');
        const data = await this.createVisualization(code);
        if (data) {
          this.setState({code, data });
          localStorage.setItem('data', JSON.stringify(data));
        }
      }
    }
  }

  public render(): ReactNode {
    return (
      <div>
        {this.state.data && <Visualization data={this.state.data} />}

      </div> );
  }

  private async createVisualization(code: string): Promise<any> {
    const url = `/api/visualize?code=${code}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data;
  }

}