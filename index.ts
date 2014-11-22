/// <reference path='types.d.ts' />

/**
 * TypeScript dependencies.
 */

import Command = require('command');
import currentRange = require('current-range');
import currentSelection = require('current-selection');
import isBackward = require('selection-is-backward');
import setRange = require('selection-set-range');

/**
 * Abstract `Command` base class to make implementing custom commands easier.
 *
 * @class
 * @public
 */

class AbstractCommand implements Command {
  document: Document;

  constructor(doc: Document = document) {
    this.document = doc;
  }

  execute(range?: Range, value?: any): void {
    var hasRange: boolean = !!(range && range instanceof Range);
    var backward: boolean;
    var selection: Selection;

    if (!hasRange) {
      selection = currentSelection(this.document);
      backward = isBackward(selection);
      range = currentRange(selection);
    }

    // if there's no Range at this point, then we can bail
    if (!range) return;

    this._execute(range, value);

    if (!hasRange) {
      // when no Range was explicitly passed in then we must reset
      // the document's Selection
      setRange(selection, range, backward);
    }
  }

  queryEnabled(range?: Range): boolean {
    if (!range) range = currentRange(this.document);
    if (!range) return false;
    return Boolean(this._queryEnabled(range));
  }

  queryState(range?: Range): boolean {
    if (!range) range = currentRange(this.document);
    if (!range) return false;
    return Boolean(this._queryState(range));
  }

  protected _execute(range: Range, value?: any): void {
    throw new Error('implement _execute()!');
  }

  protected _queryEnabled(range: Range): void {
    throw new Error('implement _queryEnabled()!');
  }

  protected _queryState(range: Range): void {
    throw new Error('implement _queryState()!');
  }
}

export = AbstractCommand;
