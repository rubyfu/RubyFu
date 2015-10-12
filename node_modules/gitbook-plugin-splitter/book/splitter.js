/// <reference path="../typings/tsd.d.ts" />

require(['gitbook', 'jQuery'], function (gitbook, $) {

	gitbook.events.bind('start', function () {
	});

	gitbook.events.bind('page.change', function () {

		var KEY_SPLIT_STATE = 'plugin_gitbook_split';

		var dividerWidth = null;
		var isDraggable = false;
		var dividerCenterOffsetLeft = null;
		var splitState = null;
		var grabPointWidth = null;

		var $body = $('body');
		var $book = $('.book');
		var $summary = $('.book-summary');
		var $bookBody = $('.book-body');
		var $toggleSummary = $('.toggle-summary');
		var $divider = $('<div class="divider-content-summary">' +
			               '<div class="divider-content-summary__icon">' +
			                 '<i class="fa fa-ellipsis-v"></i>' +
			               '</div>' +
			             '</div>');

		$summary.append($divider);

		dividerWidth = $divider.outerWidth();
		dividerCenterOffsetLeft = $divider.outerWidth() / 2;

		// restore split state from localStrage
		splitState = getSplitState();
		setSplitState(
			splitState.summaryWidth,
			splitState.summaryOffset,
			splitState.bookBodyOffset
		);
		
		$toggleSummary.on('click', function () {

			var summaryOffset  = null;
			var bookBodyOffset = null;
	
			if ($book.hasClass('with-summary')) {
				summaryOffset  = -($summary.outerWidth());
				bookBodyOffset = 0;
			} else {
				summaryOffset  = 0;
				bookBodyOffset = $summary.outerWidth();
			}

			setSplitState($summary.outerWidth(), summaryOffset, bookBodyOffset);
			saveSplitState($summary.outerWidth(), summaryOffset, bookBodyOffset);
		});

		$divider.on('mousedown', function (event) {
			event.stopPropagation();
			isDraggable = true;
			grabPointWidth = $summary.outerWidth() - event.pageX;
		});

		$body.on('mouseup', function (event) {
			event.stopPropagation();
			isDraggable = false;
			saveSplitState(
				$summary.outerWidth(),
				$summary.position().left,
				$bookBody.position().left
			);
		});

		$body.on('mousemove', function (event) {
			if (!isDraggable) {
				return;
			}
			event.stopPropagation();
			event.preventDefault();
			$summary.outerWidth(event.pageX + grabPointWidth);
			$bookBody.offset({ left: event.pageX + grabPointWidth });
		});

		function getSplitState() {
			var splitState = JSON.parse(localStorage.getItem(KEY_SPLIT_STATE));
			splitState || (splitState = {});
			splitState.summaryWidth || (splitState.summaryWidth = $summary.outerWidth());
			splitState.summaryOffset || (splitState.summaryOffset = $summary.position().left);
			splitState.bookBodyOffset || (splitState.bookBodyOffset = $bookBody.position().left);
			return splitState;
		}

		function saveSplitState(summaryWidth, summaryWidthOffset, bookBodyOffset) {
			localStorage.setItem(KEY_SPLIT_STATE, JSON.stringify({
				summaryWidth: summaryWidth,
				summaryOffset: summaryWidthOffset,
				bookBodyOffset: bookBodyOffset,
			}));
		}

		function setSplitState(summaryWidth, summaryOffset, bookBodyOffset) {
			$summary.outerWidth(summaryWidth);
			$summary.offset({ left: summaryOffset });
			$bookBody.offset({ left: bookBodyOffset });
		}
	});
});
