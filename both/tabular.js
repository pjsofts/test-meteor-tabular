import Tabular from 'meteor/aldeed:tabular';
import { Template } from 'meteor/templating';
import moment from 'moment';
import { Meteor } from 'meteor/meteor';
import { Books } from '../imports/api/books.js';


new Tabular.Table({
    name: "Books",
    collection: Books,
    columns: [
        {data: "title", title: "Title"},
        {data: "author", title: "Author"},
        {data: "copies", title: "Copies Available"},
        {
            data: "lastCheckedout",
            title: "Last Checkout",
            render: function (val, type, doc) {
                if (val instanceof Date) {
                    return moment(val).calendar();
                } else {
                    return "Never";
                }
            }

        },
        {data: "summary", title: "Summary"},
        {
            tmpl: Meteor.isClient && Template.bookCheckoutCell
        }
    ],
    selector() {
        return {author: "Some girl"}
    },
    createdRow(row, data, dataIndex) {

        console.log(data);

        if (dataIndex % 3==0)
            $(row).addClass("success");
    },
    changeSelector(selector, userId){
        return selector;
    },
    allow(userId){
        console.log("inside allow:" + userId);
        return true;
    },
    allowFields(userId, fields){
        console.log("inside allowFields: ", userId, fields)
        return true;
    },
    stateSave: true,
    sub: new SubsManager(),

    responsive: true, //didn't work, why? should I add the extension
    autoWidth: false, //didn't work, should I add the extension

});
