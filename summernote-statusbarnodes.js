(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('jquery'));
  } else {
    factory(window.jQuery);
  }
}
(function($) {
	var dom = $.summernote.dom;
	var range = $.summernote.range;
	$.extend($.summernote.plugins, {
		'nodes': function (context) {
			var $statusBar = context.layoutInfo.statusbar;
			const container = $('<div class="note-nodes"></div>');
			$statusBar.find('.note-status-output').append(container);

			this.do = function() {
				let rng = range.createFromSelection();
				if (!!rng && rng.isOnEditable() && rng.getStartPoint().node === rng.getEndPoint().node) {
					let theNode = rng.getEndPoint().node;
					let ancestors = dom.listAncestor(theNode).filter(n => dom.isElement(n)).reverse();
					let nodeNames = ancestors.map((n) => n.nodeName);
					container.empty();
					$.each(nodeNames, (index,value) => {
						container.append($('<button class="note-node-button">'+value+'</button>'));
						if (index + 1 < nodeNames.length)
							container.append('»');
					});
				}
			}

			this.initialize = function() {
				$(document).on('selectionchange', (event) => {
					this.do();					
				})
			}

			this.destroy = function() {
				$(document).off('selectionchange');
			}
		}
	})
}));