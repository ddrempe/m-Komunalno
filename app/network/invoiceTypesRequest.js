import BaseRequest from './baseRequest';

class InvoiceTypesRequest extends BaseRequest {
    getAllInvoiceTypes() {
        var options = {};

        var path = '/invoices/types';

        return this.get(options, path);
    }
}

let invoiceTypesRequest = new InvoiceTypesRequest();
export default invoiceTypesRequest;