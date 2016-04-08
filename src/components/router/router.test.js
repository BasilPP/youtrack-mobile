import Router from './router';
import sinon from 'sinon';

describe('Router', () => {
  let fakeNavigator;

  beforeEach(() => {
    fakeNavigator = {
      push: sinon.spy(),
      pop: sinon.spy(),
      replace: sinon.spy(),
      resetTo: sinon.spy()
    }
  });

  it('should init', () => {
    Router.should.be.defined;
  });

  it('should accept navigator instance', () => {
    Router.setNavigator(fakeNavigator);
    Router._navigator.should.equal(fakeNavigator);
  });

  it('should register route', () => {
    Router.registerRoute({
      name: 'foo',
      component: {barr: 'bar'},
      animation: 'fake-animation',
      props: {some: 'prop'}
    });
    Router.routes.foo.component.barr.should.equal('bar');
    Router.routes.foo.animation.should.equal('fake-animation');
    Router.routes.foo.props.some.should.equal('prop');
  });

  it('should allow to call route right on Router', () => {
    Router.registerRoute({
      name: 'foo',
      component: {barr: 'bar'},
      animation: 'fake-animation'
    });

    Router.foo();

    fakeNavigator.push.should.have.been.called;
  });

  it('should navigate', () => {
    Router.registerRoute({
      name: 'foo',
    });

    Router.navigate('foo');

    fakeNavigator.push.should.have.been.called;
  });
});
