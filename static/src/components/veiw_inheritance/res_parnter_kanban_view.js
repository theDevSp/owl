/** @odoo-module */

import { registry } from "@web/core/registry"
import { kanbanView } from "@web/views/kanban/kanban_view"
import { KanbanController } from "@web/views/kanban/kanban_controller"
import { useService } from "@web/core/utils/hooks"

const { onWillStart } = owl

class ResPartnerKanbanController extends KanbanController {
    setup(){
        super.setup()
        console.log("This is res partner kanban controller")
        this.action = useService("action")
        this.orm = useService("orm")

        onWillStart(async ()=>{
            this.customerLocations = await this.orm.readGroup("res.partner", [], ['state_id'], ['state_id'])
            console.log(this.props)
        })
    }

    openSalesView(){
        console.log("Open Sales view")
        console.log(this.props)
    }

    selectLocations(state){
        const id = state[0]
        const name = state[1]

        this.env.searchModel.setDomainParts({
            state: {
                domain: [['state_id', '=', id]],
                facetLabel: name
            }
        })
    }
}

ResPartnerKanbanController.template = "owl.ResPartnerKanbanView"

export const resPartnerKanbanView = {
    ...kanbanView,
    Controller: ResPartnerKanbanController,
    buttonTemplate: "owl.ResPartnerKanbanView.Buttons",
}

registry.category("views").add("res_partner_kanban_view", resPartnerKanbanView)