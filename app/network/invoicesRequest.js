import BaseRequest from './baseRequest';
import Settings from '../../settings';

class InvoicesRequest extends BaseRequest {
    getAllInvoices() {
        var options = {};

        var path = '/invoices/' + Settings.getConnectedUser().Id;

        return this.get(options, path);
    }

    getInvoicesByType(invoiceTypeId) {
        var options = {};

        var path = '/invoices/' + Settings.getConnectedUser().Id + '/' + invoiceTypeId;

        return this.get(options, path);
    }
}

let invoicesRequest = new InvoicesRequest();
export default invoicesRequest;