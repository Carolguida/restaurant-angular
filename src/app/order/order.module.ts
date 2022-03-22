import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from 'app/shared/shared.module'
import { DeliveryCostsComponent } from './delivery-costs/delivery-costs.component'
import { LeaveOrderGuard } from './leave-order.guard'
import { OrderItemsComponent } from './order-items/order-items.component'
import { OrderComponent } from './order.component'

const routes: Routes = [
    {path: '', component: OrderComponent, canDeactivate: [LeaveOrderGuard]}
]

@NgModule({
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [],
    declarations: [OrderComponent, OrderItemsComponent, DeliveryCostsComponent],
})

export class OrderModule {}