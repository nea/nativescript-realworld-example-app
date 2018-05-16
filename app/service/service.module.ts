import { NgModule, ModuleWithProviders, Optional, SkipSelf } from "@angular/core";
import { ConduitService } from "~/service/ConduitService";
import { UserService } from "~/service/UserService";

@NgModule({
    providers: [ConduitService]
})
export class ServiceModule {
    /**
     *
     * @param parentModule
     */
    constructor(
        @Optional()
        @SkipSelf()
        parentModule: ServiceModule
    ) {
        if (parentModule) {
            throw new Error("ServiceModule is already loaded. Import it in the AppModule only");
        }
    }
    /**
     *
     */
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: ServiceModule,
            providers: [UserService]
        };
    }
}
