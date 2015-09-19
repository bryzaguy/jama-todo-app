'use strict';

var React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  Footer = require('../src/footer');

function render(element) {
  return TestUtils
    .renderIntoDocument(element)
    .getDOMNode();
}

describe('Component: Footer', function () {
  describe('total active span', function () {
    function getSpan(element) {
      return render(element).firstChild;
    }

    it('displays number of active items', function () {
      var span = getSpan(<Footer totalActive={2} />);
      expect(span.innerText).toBe('2 items left');
    });

    it('says "item" (not plural) when count is 1', function () {
      var span = getSpan(<Footer totalActive={1} />);
      expect(span.innerText).toBe('1 item left');
    });
  });

  describe('restore removed items button', function () {
    function getButton(element) {
      return render(element).lastChild;
    }

    it('shows number of removed items', function () {
      var button = getButton(<Footer totalRemoved={3} />);
      expect(button.innerText).toBe('Restore 3 removed items');
    });

    it('does not appear if no removed items', function () {
      var button = getButton(<Footer totalRemoved={0} />);
      expect(button.className).not.toBe('clear-completed');
    });

    it('says "item" (not plural) when count is 1', function () {
      var button = getButton(<Footer totalRemoved={1} />);
      expect(button.innerText).toBe('Restore 1 removed item');
    });

    it('calls restore when clicked', function () {
      var restore = jasmine.createSpy();
      var button = getButton(<Footer totalRemoved={1} restore={restore} />);
      TestUtils.Simulate.click(button);
      expect(restore).toHaveBeenCalled();
    });
  });
});
