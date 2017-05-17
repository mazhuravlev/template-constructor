/*	scripts.js
	
	© ПИК-Проект, 2017
*/
$(document).ready(initializing);

/* Доработка контента web-страницы, отправленной клиенту. */
function initializing(){

	// Регистрация календаря
	$("#datepicker").datepicker();
	
	// Настройка формата даты
	$("#datepicker").datepicker().datepicker( "option", "dateFormat", 
	    "dd.mm.yy");
}
