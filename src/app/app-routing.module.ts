import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventListPage} from "./components/event-list/event-list.page";


const routes: Routes = [{
  path: "events",
  component: EventListPage
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
