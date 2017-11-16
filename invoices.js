let invTable,
    baseUrl = "https://c7xj8b7r70.execute-api.us-east-1.amazonaws.com/latest/invoices",
    invoices = [];

$(document).ready(function () {
    invTable = $("#invoices-table");
    renderTable();
    console.log('test');
})


function linkToForm() {
    window.location.href = "add-invoices.html";
}

function renderTable(invoices) {
    //TODO: funkcija za iscrtavanje HTML tabele na osnovu podataka dobijenih sa servera
    cleanTable();

    for (let i = 0; i < invoices.length; i++) {
        let invoice = invoices[i];
        addInvoiceToTable(invoiceId, invoiceName, invoiceValue, invoiceDate);
    }

}
function cleanTable() {
    invTable.reset();
}

function getInvoices() {
    //TODO: funkcija za preuzimanje svih zapisa sa servera
    ajaxRequest('GET', baseUrl, null, function (invoicesResponse) {
        invoices = invoicesResponse;

        for (let i = 0; i < invoices.length; i++) {
            let invoice = invoices[i];
            addInvoiceToTable(invoice.invoicesid, invoice.name, invoice.val, invoice.date);
        };
    });
}

function ajaxRequest(reqType, url, data, callback) {
    $ajax({
        type: reqType,
        contentType: "aplicaton/json",
        url: url,
        data: data,
        success: function (response) {
            callback(response)
        }
    })

}

