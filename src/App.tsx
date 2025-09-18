import { Component, type ErrorInfo } from 'react';
import type { stateType } from '@/utils/types';
import Container from './components/Container/Constainer';
import Button from './components/Button/Button';

export default class App extends Component<
  { contacts: stateType[]; filter: string },
  {}
> {
  state = {};

  componentDidMount(): void {}

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {}

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log('component catched error', this.state);
  }

  render() {
    return (
      <Container>
        <Button>test btn</Button>
      </Container>
    );
  }
}
