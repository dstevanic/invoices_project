let invTable,
    baseUrl = "https://c7xj8b7r70.execute-api.us-east-1.amazonaws.com/latest/invoices/";

$(document).ready(function () {
    invTable = $("#invoices-table");
    getInvoices(renderTable);
    console.log('test');
})


function linkToForm() {
    window.location.href = "add-invoices.html";
}
function linkToEditForm(invIdForEdit) {
    window.location.href = "add-invoices.html?invId=" + invIdForEdit;
}


function renderTable(invoices) {
    //TODO: funkcija za iscrtavanje HTML tabele na osnovu podataka dobijenih sa servera
    cleanTable();

    for (let i = 0; i < invoices.length; i++) {
        let invoice = invoices[i];

        addInvoiceToTable(invoice);
        //addInvoiceToTable(invoice.val, invoice.name, invoice.date, invoice.date);
    }

}
function cleanTable() {
    let rows = $("tr", invTable),
        rowIndex = 0;

    for (rowIndex; rowIndex < rows.length; rowIndex++) {
        if (rowIndex == 0) continue;
        invTable[0].deleteRow(rowIndex);

    };

}

function getInvoices(callback) {
    //TODO: funkcija za preuzimanje svih zapisa sa servera
    ajaxRequest('GET', baseUrl, null, function (invoicesResponse) {
         console.log('invoicesResponse',    invoicesResponse);
        callback(invoicesResponse);
        ///return invoicesResponse;

    });
}



function deleteInvoice(invoiceForDelete) {
    //TODO: funkcija brisanje podataka sa servera(za izabrani zapis)
    ajaxRequest('DELETE', baseUrl + invoiceForDelete, undefined, function () {
        getInvoices(renderTable);

    });

}



function addInvoiceToTable(invoice) {
    //TODO: funkcija koja dodaje novi red u HTML tabelu

    let foundTables = document.getElementsByTagName('table');
    if (foundTables.length < 1) return;//throw 'No table found';

    let table = foundTables[0]

    let tr = document.createElement('tr');
    // tr.className = 'attendee-row';
    let idCell = document.createElement('td'),
        idText = document.createTextNode(invoice.invoicesid);
    idCell.appendChild(idText);

    let nameCell = document.createElement('td'),
        nameText = document.createTextNode(invoice.name);
    nameCell.appendChild(nameText);

    let valCell = document.createElement('td'),
        valText = document.createTextNode(invoice.val);
    valCell.appendChild(valText);


    let dateCell = document.createElement('td'),
        dateText = document.createTextNode(invoice.date);
    dateCell.appendChild(dateText);

    let actionCell = document.createElement('td'),
        actionButtonEdit = document.createElement('button'),
        actionButtonDelete = document.createElement('button');
    actionButtonEdit.id = "btnEdit";
    actionButtonEdit.innerText = "Edit";
    actionButtonEdit.className = 'btn';
    actionButtonDelete.innerText = "Delete";
    actionButtonDelete.className = 'btn';
    actionButtonDelete.onclick = function () { deleteInvoice(invoice.invoicesid) };// function () { deleteRow(currentRowId) };===>drugi nacin , kada imamo id// deleteRow(acttionButtonDelete);//function(){deleteRow(this);};
    actionButtonEdit.onclick = function () { linkToEditForm(invoice.invoicesid) };

    actionCell.appendChild(actionButtonEdit);
    actionCell.appendChild(actionButtonDelete);

    tr.appendChild(idCell)
    tr.appendChild(nameCell)
    tr.appendChild(valCell)
    tr.appendChild(dateCell)
    tr.appendChild(actionCell)


    table.appendChild(tr)

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

