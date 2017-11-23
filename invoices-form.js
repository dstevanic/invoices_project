
$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    else {
        return decodeURI(results[1]) || 0;
    }
}

let form,
    invIdForEdit,
    baseUrl = 'https://c7xj8b7r70.execute-api.us-east-1.amazonaws.com/latest/invoices/';



$(document).ready(function () {
    let testObjekat = { name: 'invName.value', val: 'invVal.value', date: 'invDate.value' };

    for (var property in testObjekat) {
        if (testObjekat.hasOwnProperty(property)) {
            console.log('testObjekat[i]', property);
        }
    }





    invIdForEdit = $.urlParam('invId');
    console.log('invIdForEdit', invIdForEdit);

    if (invIdForEdit == null) {
        let btnAdd = document.getElementById('btnAdd'),
            btnSave = document.getElementById('btnSave');

        btnAdd.style.display = 'block';
        btnSave.style.display = 'none';

    } else {
        let btnAdd = document.getElementById('btnAdd'),
            btnSave = document.getElementById('btnSave');

        btnAdd.style.display = 'none';
        btnSave.style.display = 'block';
        getInvoice(invIdForEdit);
    }

    form = $("#invoices-form");
    // invName = $("name", form).val();
    //  invVal = $("val", form).val();
    //  invDate = $("date", form).val();
})

function postInvoice() {
    //TODO: funkcija za slanje podataka na server

    let invName = document.getElementById('name'),
        invVal = document.getElementById('val'),
        invDate = document.getElementById('date');
    let newInvoice = JSON.stringify({ invoicesid: "", name: invName.value, val: invVal.value, date: invDate.value });

    ajaxRequest('POST', baseUrl, newInvoice, function (invoiceResponse) {
        window.location.href = "invoices.html";

        //console.log('newInvoice', newInvoice);

    });
}


function getInvoice(invIdForEdit) {
    //TODO: funkcija za preuzimanje izabranog zapisa sa servera
    ajaxRequest('GET', baseUrl + invIdForEdit, null, function (Response) {
        invoice = Response;
        console.log(Response);
        let invId = document.getElementById('invId'),
            invName = document.getElementById('name'),
            invVal = document.getElementById('val'),
            invDate = document.getElementById('date');
        invId.value = invoice.invoicesid;
        invName.value = invoice.name;
        invVal.value = invoice.val;
        invDate.value = invoice.date;

    });

}




function putInvoice() {
    //TODO: funkcija za slanje editovanih podataka na server
    let invId = document.getElementById('invId'),
        invName = document.getElementById('name'),
        invVal = document.getElementById('val'),
        invDate = document.getElementById('date');
    let editedInvoice = JSON.stringify({ invoicesid: invId.value, name: invName.value, val: invVal.value, date: invDate.value });
    console.log("editedInvoice ===>", editedInvoice);

    ajaxRequest('PUT', baseUrl + invId.value, editedInvoice, function () {
        window.location.href = "invoices.html";
    });
}

function addNewField() {

    let newLabel = $(" <label for='invoice-name' class='label'  id = 'newLabel'>New label</label>")
    $('#date').after(newLabel);
    let newInput = $("<input name='new_field' type='text' class= 'invoices-input'>");
    $('#newLabel').after(newInput);
}


function ajaxRequest(reqType, url, data, callback) {
    $.ajax({
        type: reqType,
        contentType: "application/json",
        url: url,
        data: data,
        success: function (response) {
            callback(response)
        }
    })

}