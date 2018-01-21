import BaseRequest from './baseRequest';

class InvoicesRequest extends BaseRequest {
    getAllInvoices() {
        var options = {};

        var path = '/invoices/{connectedUserId}';

        return this.get(options, path);
    }

    getAllInvoiceTypes() {
        var options = {};

        var path = '/invoices/types';

        return this.get(options, path);
    }

    getInvoicesByType(invoiceTypeId) {
        var options = {};

        var path = '/invoices/{connectedUserId}/' + invoiceTypeId;

        return this.get(options, path);
    }
}

let invoicesRequest = new InvoicesRequest();
export default invoicesRequest;