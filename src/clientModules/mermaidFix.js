import 'd3-transition';
import { selection } from 'd3-selection';

// Polyfill and safety guard for Mermaid flowchart/diagram tooltips
if (typeof window !== 'undefined') {
  if (selection && selection.prototype) {
    const originalTransition = selection.prototype.transition;
    if (!originalTransition) {
      selection.prototype.transition = function() {
        const sel = this;
        return {
          duration() { return this; },
          style(key, value) {
            sel.style(key, value);
            return this;
          },
          attr(key, value) {
            sel.attr(key, value);
            return this;
          },
          text(val) {
            sel.text(val);
            return this;
          },
          html(val) {
            sel.html(val);
            return this;
          },
          selection() {
            return sel;
          },
        };
      };
    }
  }
}
