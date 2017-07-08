(function ($, D, W) {
	"use strict";

	var _script = {};

	_script = {
		/**
		 * Run script
		 */
		init: function () {
			_script.zoom_area.waiting_for_click();
			_script.zoom_area.move_the_area();
		}
	};

	_script.zoom_area = {
		/**
		 * Is it possible to move back image to change selection area.
		 */
		isActive: false,
		/**
		 * Waiting click on image stack to allow to move the back image.
		 */
		waiting_for_click: function () {

			$('.zone_zoom').click(function() {
				if (_script.zoom_area.isActive)
				{
					$(this).css({
						'cursor': 'pointer'
					});

					_script.zoom_area.isActive = false;
				}
				else
				{
					$(this).css({
						'cursor': 'move'
					});

					_script.zoom_area.isActive = true;
				}
			});
		},
		/**
		 * Move the back image if is active.
		 */
		move_the_area: function() {

			$('.zone_zoom').mousemove(function(event) {

				if (_script.zoom_area.isActive) {

					var $zoom_image = $(".image");

					$zoom_image.css({
						"left": Number(event.pageX) - Number($(this).offset().left) - Number($zoom_image.width() / 2),
						"top": Number(event.pageY) - Number($(this).offset().top) - Number($zoom_image.height() / 2)
					});

					_script.zoom_area.check_position_validity($zoom_image);
					_script.zoom_area.find_coordinates($zoom_image);
				}
			});
		},
		/**
		 *
		 */
		check_position_validity: function($zoom_image) {

			/**
			 * Check if top/left corner is in the crop zone, else adjust
			 */

			var image_x = Number($zoom_image.offset().left);
			var image_y = Number($zoom_image.offset().top);

			var $crop_image = $(".image1");
			var crop_zone_x = Number($crop_image.offset().left) + 104;
			var crop_zone_y = Number($crop_image.offset().top) + 90;

//						_script.zoom_area.drop_a_dot(crop_zone_y, crop_zone_x, 'red');

			if (Number(image_x) > Number(crop_zone_x)) {

				$zoom_image.offset({
					top: Number($zoom_image.offset().top),
					left: Number(crop_zone_x)
				});

			}

			if (Number(image_y) > Number(crop_zone_y)) {

				$zoom_image.offset({
					top: Number(crop_zone_y),
					left: Number($zoom_image.offset().left)
				});

			}

			/**
			 * Check if bottom/left corner is in the crop zone, else adjust
			 */

			var image_bottom_y = Number($zoom_image.offset().top) + $zoom_image.height();

			var crop_zone_bottom_y = Number($crop_image.offset().top) + 311;

//						_script.zoom_area.drop_a_dot(crop_zone_bottom_y, crop_zone_x, 'orange');

			if (Number(crop_zone_bottom_y) > Number(image_bottom_y)) {

				$zoom_image.offset({
					top: Number(crop_zone_bottom_y) - $zoom_image.height(),
					left: Number($zoom_image.offset().left)
				});

			}

			/**
			 * Check if top/right corner is in the crop zone, else adjust
			 */

			var image_right_x = Number($zoom_image.offset().left) + $zoom_image.width();

			var crop_zone_right_x = Number($crop_image.offset().left) + 395;

//						_script.zoom_area.drop_a_dot(crop_zone_y, crop_zone_right_x, 'blue');

			if (Number(crop_zone_right_x) > Number(image_right_x)) {

				$zoom_image.offset({
					top: Number($zoom_image.offset().top),
					left: Number(crop_zone_right_x) - $zoom_image.width()
				});

			}

			/**
			 * Check if bottom/right corner is in the crop zone, else adjust
			 */

//						_script.zoom_area.drop_a_dot(crop_zone_bottom_y, crop_zone_right_x, 'green');

		},
		/**
		 *
		 */
		find_coordinates: function($zoom_image) {

			var image_x = Number($zoom_image.offset().left);
			var image_y = Number($zoom_image.offset().top);

			var $crop_image = $(".image1");
			var crop_zone_x = Number($crop_image.offset().left) + 104;
			var crop_zone_y = Number($crop_image.offset().top) + 90;

			$('input[name="crop_x"]')
				.val(Number(crop_zone_x - image_x));
			$('input[name="crop_y"]')
				.val(Number(crop_zone_y  - image_y));
		},
		/**
		 * Drop a dot on the zoom area to highlight an x/y coordinate couple.
		 *
		 * @param top
		 * @param left
		 * @param color
		 */
		drop_a_dot: function(top, left, color) {

			var size = '5px';

			$("body").append(
				$('<div></div>')
					.css('position', 'absolute')
					.css('top', top + 'px')
					.css('left', left + 'px')
					.css('width', size)
					.css('height', size)
					.css('background-color', color)
			);
		}
	};

	$(D).ready(function () {
		_script.init();
	});

})(jQuery, document, window);
