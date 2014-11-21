
var assert = require('assert');
var AbstractCommand = require('../');

describe('AbstractCommand', function () {
  var div;

  afterEach(function () {
    if (div) {
      // clean up...
      document.body.removeChild(div);
      div = null;
    }
  });

  describe('new AbstractCommand()', function () {

    it('should create an `AbstractCommand` instance', function () {
      var c = new AbstractCommand();

      assert(c instanceof AbstractCommand);
      assert(c.document === document);
    });

    describe('execute()', function () {

      it('should throw an Error', function () {
        div = document.createElement('div');
        div.innerHTML = '<p>hello</p><p>world!</p>';
        div.setAttribute('contenteditable', 'true');
        document.body.appendChild(div);

        // set current selection
        var range = document.createRange();
        range.setStart(div.firstChild.firstChild, 1);
        range.setEnd(div.firstChild.firstChild, 1);
        assert(range.collapsed);

        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);

        var c = new AbstractCommand();

        assert.throws(function () {
          c.execute();
        }, /implement/);
      });

    });

    describe('queryState()', function () {

      it('should throw an Error', function () {
        div = document.createElement('div');
        div.innerHTML = '<p>hello</p><p>world!</p>';
        div.setAttribute('contenteditable', 'true');
        document.body.appendChild(div);

        // set current selection
        var range = document.createRange();
        range.setStart(div.firstChild.firstChild, 1);
        range.setEnd(div.firstChild.firstChild, 1);
        assert(range.collapsed);

        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);

        var c = new AbstractCommand();

        assert.throws(function () {
          c.queryState();
        }, /implement/);
      });

    });

    describe('queryEnabled()', function () {

      it('should throw an Error', function () {
        div = document.createElement('div');
        div.innerHTML = '<p>hello</p><p>world!</p>';
        div.setAttribute('contenteditable', 'true');
        document.body.appendChild(div);

        // set current selection
        var range = document.createRange();
        range.setStart(div.firstChild.firstChild, 1);
        range.setEnd(div.firstChild.firstChild, 1);
        assert(range.collapsed);

        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);

        var c = new AbstractCommand();

        assert.throws(function () {
          c.queryEnabled();
        }, /implement/);
      });

    });

  });

});
