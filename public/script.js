$(function(){

	//Кеширование некоторых селекторов

	var clock = $('#clock'),
		time_is_up = $('#time-is-up').parent();

	//Сопоставление цифр с их именами (это будет массив)
	var digit_to_name = 'zero one two three four five six seven eight nine'.split(' ');

	//Этот объект будет содержать элементы цифр
	var digits = {};

	//Позиции часов, минут и секунд
	var positions = [
		'h1', 'h2', ':', 'm1', 'm2', ':', 's1', 's2'
	];

	//Генерация цифр с нужной разметкой и добавление их в часы
	var digit_holder = clock.find('.digits');

	$.each(positions, function() {

		if(this == ':'){
			digit_holder.append('<div class="dots">');
		}
		else {

			var pos = $('<div>');

			for(var i=1; i<8; i++) {
				pos.append('<span class="d' + i + '">');
			}

			//Установка цифр как пары "ключ-значение" в объекте цифр
			digits[this] = pos;

			//Добавление элементов цифры на страницу
			digit_holder.append(pos);
		}

	});

	//Запуск таймера каждую секунду и обновление часов

	(function update_time() {

		//Использование moment.js для вывода текущего времени в виде строки, где hh - часы, мм - минуты, сс - секунды

		var now = moment().format("HHmmss");

		digits.h1.attr('class', digit_to_name[now[0]]);
		digits.h2.attr('class', digit_to_name[now[1]]);
		digits.m1.attr('class', digit_to_name[now[2]]);
		digits.m2.attr('class', digit_to_name[now[3]]);
		digits.s1.attr('class', digit_to_name[now[4]]);
		digits.s2.attr('class', digit_to_name[now[5]]);

		//Запланированный повторный запуск этой функции через 1 секунду
		setTimeout(update_time, 1000);
	})();
});