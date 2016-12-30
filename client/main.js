import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { $ } from 'meteor/jquery';
import dataTablesBootstrap from 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';
dataTablesBootstrap(window, $);

Template.body.helpers({
    selector(){
        return {author: "Some girl"};
    }
})

Template.body.events({
    'click tbody > tr': function (event){
        var dataTable = $(event.target).closest('table').DataTable();
        var rowData = dataTable.row(event.currentTarget).data();
        if (!rowData) return;
        console.log(rowData);
    }
})

Template.bookCheckoutCell.events({
    'click .check-out'(){
        console.log("Checkout:" +  this._id);
    }
})

import './main.html';
