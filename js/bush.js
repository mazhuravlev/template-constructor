"use strict"
/* bush.js
 * (C) PIK Company, 2017
 * Programmer: Andrey Bushman
 * Date: 2017-05-13
 *
 * This file defines the functions for using by RobotIRA client side.
 */


function User(name, middleName, surname, post, index = 0){

    this.name = name;
    this.middleName = middleName;
    this.surname = surname;
    this.post = post;
    this.index = index; // user's index on the web-page items

    this.shortName = function(){ 

        let first = '';

        if(this.name.length > 0){

            first = this.name[0] + '.';
        }

        let second = '';

        if(this.middleName.length > 0){

            second = this.middleName[0] + '.';
        }

        let third = '';

        if(this.surname.length > 0){

            third = ' ' + this.surname;
        }

        let result = first + second + third;
        return result;
    }
    
    /* creates html-wrapper for this user. */
    this.html = function(){
        
        let tr = $('<tr></tr>');
        tr.attr('id', 'approver_' + this.index);
        
        let tdFst = $('<td></td>');
        tr.append(tdFst);
        
        let inputFst = $('<input/>');
        tdFst.append(inputFst);
        
        inputFst.attr('id', 'approver_' + this.index + '_post');
        inputFst.addClass('form-control');
        inputFst.attr('placeholder', 'Должность согласователя');
        inputFst.attr('value', this.post);
        
        let inputSnd = inputFst.clone();;
        tdFst.append(inputSnd);
        
        inputSnd.attr('id', 'approver_' + this.index + '_fullName');
        inputSnd.attr('placeholder', 'ФИО согласователя');
        inputSnd.attr('value', this.shortName());
        
        let tdSnd = $('<td></td>');
        tr.append(tdSnd);
        
        tdSnd.css({
            'width' : '1%',
            'white-space' : 'nowrap'
            });
        
        let div = $('<div></div>');
        div.addClass('btn-group');
        div.addClass('pull-right');
        div.css({
            'width' : 'auto', 
            'min-width' : '80px', 
            'margin-left' : '10px'
        });
        
        tdSnd.append(div);
        
        let btnFst = $('<button></button>');
        div.append(btnFst);
        
        btnFst.attr('type', 'button');
        btnFst.addClass('btn');
        btnFst.addClass('btn-default');
        btnFst.attr('onclick', 'addUserAfter(\'#approver_' + this.index + 
            '\')');
        btnFst.attr('title','Добавить позицию ниже');
        
        let spanFst = $('<span></span>');
        btnFst.append(spanFst);
        
        spanFst.addClass('glyphicon');
        spanFst.addClass('glyphicon-plus');
        spanFst.attr('aria-hidden', true);
        
        let btnSnd = btnFst.clone();
        div.append(btnSnd);
        
        btnSnd.attr('onclick', 'removeUser(\'#approver_' + this.index + '\')');
        btnSnd.attr('title','Удалить позицию');
        
        let spanSnd = btnSnd.children('span');
        spanSnd.removeClass('glyphicon-plus');
        spanSnd.addClass('glyphicon-remove');
        
        return tr;
    }
}

function addUserAfter(prewUserId, newUser = new User('','','', '', 0)){

    $(prewUserId).after(newUser.html());
    $('#approvers button[onclick^="removeUser"]').show();
    updateUserIds();
}

function removeUser(index){

    let filter = '#approvers tr';
    
    if($(filter).length > 1){
        $(index).remove();
        updateUserIds();
    }
         
    if($(filter).length == 1){
    
        $('#approvers button[onclick^="removeUser"]').hide();
    }
}

function updateUserIds(){
    
    let container = $('#approvers');
    let index = 0;
    
    container.children('tr').each(function(){
    
            $(this).attr('id', 'approver_' + index);
            
            $(this).find('input[id$="_post"]').attr('id', 'approver_' + 
                index + '_post');
            
            $(this).find('input[id$="_fullName"]').attr('id', 'approver_' + 
                index + '_fullName');
                
            $(this).find('button[onclick^="addUserAfter(\'#approver_"]')
                .attr('onclick', 'addUserAfter(\'#approver_' + index + '\')');
            
            $(this).find('button[onclick^="removeUser(\'#approver_"]')
                .attr('onclick', 'removeUser(\'#approver_' + index + '\')');
                
            ++index;
        });
}

function Requirement(type = 'requirementGroup', text = '', value = '', 
    children = []){

    this.type = type;
    this.childern = children;
    this.text = text;
    this.parent = null;
    this.value = value;
    
    this.position = function(){
    
        let pos = '1.';
        
        if (null != this.parent){
        
            pos = this.parent.position() + (this.parent.index(this) + 1) + '.';
        }
        
        return pos;
    }
    
    this.html = function() {
    
        switch(this.type){
        
        case 'requirementGroup':
            
            let tr = $('<tr></tr>');
			
            // let id = 'req_' + this.position().replace('.', '_');
            // tr.attr('id', id);
			
            tr.attr('background-color', '#b3ff99');
            
            let dom = tr.get(0);
			dom.dataset['reqLevel'] = 0;
            
            let tdFst = $('<td></td>');
            tr.append(tdFst);
            
            tdFst.addClass('tableGroupRow');
            tdFst.html(this.position());
            
            let tdSnd = $('<td></td>');
            tr.append(tdSnd);
            
            tdSnd.addClass('tableGroupRow');
            tdSnd.attr('colspan', 2);
            
            let tdSndInput = $('<input></input>');
            tdSnd.append(tdSndInput);
            
            tdSndInput.addClass('form-control');
            tdSndInput.attr('placeholder','Наименование группы требований');
            
            let tdThr = $('<td></td>');
            tr.append(tdThr);
            
            tdThr.css({
                'width' : '1%',
                'white-space' : 'nowrap'
            });
            
            let tdThrDiv = $('<div></div>');
            tdThr.append(tdThrDiv);
            
            tdThrDiv.addClass('btn-group').addClass('pull-right');
            tdThrDiv.css({
                'width' : 'auto',
                'min-width' : '85px'
            });
            
            let btnFst = $('<button></button>');
            tdThrDiv.append(btnFst);
            
            btnFst.attr('type', 'button');
            btnFst.addClass('btn').addClass('btn-default');
            btnFst.attr('title', 'Добавить новую запись ниже');
            
            let btnFstSpan = $('<span></span>');
            btnFst.append(btnFstSpan);
            
            btnFstSpan.addClass('glyphicon').addClass('glyphicon-plus');
            btnFstSpan.attr('aria-hidden', true);
            
            let btnSnd = $('<a></a>');
            tdThrDiv.append(btnSnd);
            
            btnSnd.attr('href', '#');
            btnSnd.addClass('btn').addClass('btn-default');
            btnSnd.attr('title', 'Удалить позицию');
            
            let btnSndSpan = $('<span></span>');
            btnSnd.append(btnSndSpan);
            
            btnSndSpan.addClass('glyphicon').addClass('glyphicon-remove');
            btnSndSpan.attr('aria-hidden', true);
            
			tr.uniqueId();
			btnFst.click(function(){ 
				addRequirementGroupAfter(tr.attr('id'));
				});
			
            return tr;
        break;
        
        case 'requirementGroupItem':
        break;
        
        case 'contentGroup':
        break;
        
        case 'contentGroupItem':
        break;
        
        default:
        break;
        }
    }
}
// $0.dataset['n'] = 5 - записать пользовательские данные в DOM
// $0.dataset['n'] - прочитать пользовательские данные из DOM
// $($0).data('n', 5) - записать пользовательские данные в jQuery
// $($0).data('n', 5) - прочитать пользовательские данные из jQuery

function addRequirementGroupAfter(prewElementId){

    let group = new Requirement();
    
    let prew = $(prewElementId).next('tr[data-req-level="0"]');
    
    if(0 != prew.length){
    
        prew.before(group.html());
    }
    else{
		
        $('#requirements').append(group.html());
    }
    
    updateRequirementsNumeration();
}

function updateRequirementsNumeration(){

    let i = 0, j = 0;
    
    $('#requirements > tr').each(function(){
        
        let value = $(this).children('td').first().text();
        
        if(value.endsWith('.')){
        
            value = value.substring(0, value.length - 1);
        }
        
        let  items = value.split('.');
        let count = items.length;
        let newValue = '';
		
        if(count == 1){
            
			newValue += (++i + '.');
            j = 0;
        }
        else if(count == 2){
            
            newValue = newValue + i + '.' + ++j + '.';
        }
        
        $(this).children('td').first().text(newValue);
    });
}
