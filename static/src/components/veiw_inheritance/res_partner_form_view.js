/** @odoo-module */

import { registry } from "@web/core/registry"
import { formView } from "@web/views/form/form_view"
import { FormController } from "@web/views/form/form_controller"
import { useService } from "@web/core/utils/hooks"
import { portrait_header } from "@reports_templates/js/headers"
import { useState } from "@odoo/owl";
import { Dropdown } from "@web/core/dropdown/dropdown";
import { DropdownItem } from "@web/core/dropdown/dropdown_item";

class ResPartnerFormController extends FormController {
    setup() {
        super.setup()
        console.log("This is res partner form controller")
        this.action = useService("action")
        
    }
    
    openWebsite(url) {
        
        html2canvas(document.querySelector(".o_form_sheet")).then(function (canvas) {
            var data = canvas.toDataURL();
            var docDefinition = {
                pageSize: 'A4',
                // by default we use portrait, you can change it to landscape if you wish
                pageOrientation: 'portrait',

                // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
                header: portrait_header(),
                footer: function(currentPage, pageCount) { return currentPage.toString() + ' of ' + pageCount; },
                pageMargins: [40, 40, 40, 40],
                
            };
            const pdfDocGenerator = pdfMake.createPdf(docDefinition);
            pdfDocGenerator.getDataUrl().then((dataUrl) =>{
                const targetElement = document.querySelector('#iframeContainer');
                targetElement.src = dataUrl;
            })
            /*pdfDocGenerator.getDataUrl((dataUrl) => {
                
            });*/
        });
    }
}


ResPartnerFormController.template = "owl.ResPartnerFormView"

export const resPartnerFormView = {
    ...formView,
    Controller: ResPartnerFormController,
}

registry.category("views").add("res_partner_form_view", resPartnerFormView)