'use strict';

var React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  Share = require('../src/share'),
  Todos = require('../src/todos'),
  render = TestUtils.renderIntoDocument;

describe('Component: Share', function () {
  beforeEach(function () {
    var store = jasmine.createSpyObj('store', ['get', 'set']);
    var todos = new Todos(store);
    todos.add('one');
    todos.add('two').completed = true;

    this.share = render(<Share items={todos.get()} window={{}} />);
  });

  describe('email method', function () {
    it('should preventDefault', function () {
      var e = jasmine.createSpyObj('event', ['preventDefault']);
      this.share.email(e);
      expect(e.preventDefault).toHaveBeenCalledWith();
    });

    it('sets redirects to email link', function () {
      var expected = this.share.linkTemplate +
        encodeURIComponent(this.share.bodyTemplate +
          '\t(X)\ttwo\n\t(_)\tone\n');

      TestUtils.Simulate.click(this.share.getDOMNode().firstChild);
      expect(this.share.props.window.location).toBe(expected);
    });
  });
});
